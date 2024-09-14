import React, { useState, useRef } from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import "./RotationControls.css";

import { useDraggable } from "@dnd-kit/core";

const RotationControls = ({ id, updateRotation, position }) => {
  const [isRotating, setIsRotating] = useState(false);
  const centerRef = useRef(null);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  // Adjust control style to ensure it's on top and clickable
  const controlStyle = {
    position: "absolute",
    top: position.top - 40,
    left: position.left + 20,
    zIndex: 100, // Ensure it's on top
    cursor: "pointer",
  };

  const handleMouseDown = (event) => {
    setIsRotating(true);
    event.preventDefault();
    console.log("Rotation started"); // Log to check if clicked
  };

  const handleMouseMove = (event) => {
    if (!isRotating) return;

    const center = centerRef.current.getBoundingClientRect();
    const centerX = center.left + center.width / 2;
    const centerY = center.top + center.height / 2;

    const angle =
      Math.atan2(event.clientY - centerY, event.clientX - centerX) *
      (180 / Math.PI);
    updateRotation(id, angle);
    console.log("Rotating: New angle:", angle);
  };

  const handleMouseUp = () => {
    setIsRotating(false);
    console.log("Rotation ended");
  };

  // Attach event listeners for mousemove and mouseup
  React.useEffect(() => {
    if (isRotating) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isRotating]);

  return (
    <div className="rotation-controls" style={controlStyle} ref={centerRef}>
      <div className="rotation-handle" onMouseDown={handleMouseDown}>
        <FaArrowsRotate className="rotation-icon" />
      </div>
    </div>
  );
};

export default RotationControls;
