import React, { useState } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';


const DraggableElement = ({ element, onRotate, onBringForward, onSendBackward }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
  });

  // Combine translation and rotation
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${element.rotate}deg)`
      : `rotate(${element.rotate}deg)`,  // If there's no drag, just apply rotation
    position: 'absolute',
    top: element.top,
    left: element.left,
    zIndex: element.zIndex,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {element.type === 'image' && (
        <img src="https://via.placeholder.com/150" alt="placeholder" />
      )}
      {element.type === 'video' && (
        <video src="path/to/video.mp4" controls width="150"></video>
      )}
      {element.type === 'text' && <div>Sample Text</div>}
      <button onClick={() => onRotate(element.id)}>Rotate</button>
      <button onClick={() => onBringForward(element.id)}>Bring Forward</button>
      <button onClick={() => onSendBackward(element.id)}>Send Backward</button>
    </div>
  );
};

export default DraggableElement;
