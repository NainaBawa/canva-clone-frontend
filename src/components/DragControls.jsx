//import React, { useState, useRef } from "react";
import { FaArrowsAlt } from "react-icons/fa";
import "./DragControls.css";

import { useDraggable } from "@dnd-kit/core";

const DragControl = ({ id, position }) => {
  const { attributes, listeners } = useDraggable({ id });
  const controlStyle = {
    position: "absolute",
    top: position.top - 40,
    left: position.left + 60,
    zIndex: 100, // Ensure it's on top
    cursor: "pointer",
  };
  return (
    <div
      className="drag-controls"
      style={controlStyle}
      {...listeners}
      {...attributes}
    >
      <div className="drag-handle">
        <FaArrowsAlt className="drag-icon" />
      </div>
    </div>
  );
};

export default DragControl;
