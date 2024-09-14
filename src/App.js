import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import ControlPanel from "./components/ControlPanel";
import Canvas from "./components/Canvas";
import DraggableElement from "./components/DraggableElement";
import RotationControls from "./components/RotationControls";
import DragControl from "./components/DragControls";
import "./App.css";

const App = () => {
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const canvasRef = React.useRef(null);

  const addElement = (type) => {
    const newElement = {
      id: `element-${elements.length}`,
      type,
      style: {
        position: "absolute",
        top: Math.random() * 300,
        left: Math.random() * 300,
      },
      rotation: 0,
      content: type === "text" ? "Editable text" : "", // Default content for text
    };
    setElements([...elements, newElement]);
  };

  const handleDragEnd = (event) => {
    const { active, delta } = event;
    const { id } = active;

    const canvas = canvasRef.current;
    const canvasRect = canvas.getBoundingClientRect();

    setElements((prevElements) =>
      prevElements.map((el) => {
        if (el.id === id) {
          const newTop = el.style.top + delta.y;
          const newLeft = el.style.left + delta.x;

          const adjustedTop = Math.max(
            0,
            Math.min(canvasRect.height - 100, newTop)
          );
          const adjustedLeft = Math.max(
            0,
            Math.min(canvasRect.width - 100, newLeft)
          );

          return {
            ...el,
            style: {
              ...el.style,
              top: adjustedTop,
              left: adjustedLeft,
            },
          };
        }
        return el;
      })
    );
  };

  const updateElementRotation = (id, newRotation) => {
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === id ? { ...el, rotation: newRotation } : el
      )
    );
  };

  const handleTextChange = (id, newText) => {
    setElements((prevElements) =>
      prevElements.map((el) =>
        el.id === id ? { ...el, content: newText } : el
      )
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="App">
        <ControlPanel addElement={addElement} />
        <Canvas ref={canvasRef}>
          {elements.map((el) => (
            <div
              className="elementsWrapper"
              key={el.id}
              onClick={() => console.log("clicked")}
            >
              <DraggableElement
                id={el.id}
                type={el.type}
                style={el.style}
                rotation={el.rotation}
                content={el.content}
                isSelected={selectedElementId === el.id}
                onSelect={() => setSelectedElementId(el.id)}
                onTextChange={(newText) => handleTextChange(el.id, newText)}
              />
              <RotationControls
                id={el.id}
                updateRotation={updateElementRotation}
                position={el.style}
              />
              <DragControl id={el.id} position={el.style} />
            </div>
          ))}
        </Canvas>
      </div>
    </DndContext>
  );
};

export default App;
