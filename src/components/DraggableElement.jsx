import { useDraggable } from '@dnd-kit/core';
import ControlPanel from './ControlPanel';
import './DraggableElement.css'; // Add CSS file for hover and positioning

const DraggableElement = ({ element, onRotate, onBringForward, onSendBackward }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${element.rotate}deg)`
      : `rotate(${element.rotate}deg)`,
    position: 'absolute',
    top: element.top,
    left: element.left,
    zIndex: element.zIndex,
  };

  const handleRotateClick = () => {
    onRotate((prevElements) =>
      prevElements.map((el) =>
        el.id === element.id ? { ...el, rotate: el.rotate + 45 } : el
      )
    );
  };

  const handleBringForwardClick = () => {
    onBringForward(element.id);
  };

  const handleSendBackwardClick = () => {
    onSendBackward(element.id);
  };

  return (
    <div className="draggable-element" ref={setNodeRef} style={style}>
      <div {...listeners} {...attributes}>
        {element.type === 'image' && (
          <img src="https://via.placeholder.com/150" alt="placeholder" />
        )}
        {element.type === 'video' && (
          <video src="path/to/video.mp4" controls width="150"></video>
        )}
        {element.type === 'text' && <div>Sample Text</div>}
      </div>
      {/* Control panel stays outside the draggable div */}
      <ControlPanel
        onRotate={handleRotateClick}
        onBringForward={handleBringForwardClick}
        onSendBackward={handleSendBackwardClick}
      />
    </div>
  );
};

export default DraggableElement;
