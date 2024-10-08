import React, { useState, useEffect, useRef } from "react";
import { useDraggable } from "@dnd-kit/core";

const DraggableElement = ({
  id,
  type,
  style,
  rotation,
  content,
  onTextChange,
  updateSize, // <-- Add updateSize prop to save the size
  // onDelete, // Uncomment if using
}) => {
  const { setNodeRef, transform } = useDraggable({ id });
  const [isEditing, setIsEditing] = useState(false);
  const [size, setSize] = useState({ width: style.width || 100, height: style.height || 100 }); // Initialize from style
  const [isResizing, setIsResizing] = useState(false);
  const inputRef = useRef(null);
  const draggableRef = useRef(null);

  const draggableStyle = {
    ...style,
    width: `${size.width}px`,
    height: `${size.height}px`,
    transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0) rotate(${rotation}deg)`,
  };

  const handleClick = () => {
    if (type === "text") {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    onTextChange(e.target.value);
  };

  // Handle resize start
  const handleResizeMouseDown = (e) => {
    e.stopPropagation(); // Prevent drag event when resizing
    setIsResizing(true);
  };

  const handleResizeMouseMove = (e) => {
    if (!isResizing) return;
    const newWidth = Math.max(50, e.clientX - draggableRef.current.getBoundingClientRect().left);
    const newHeight = Math.max(50, e.clientY - draggableRef.current.getBoundingClientRect().top);
    setSize({ width: newWidth, height: newHeight });
    updateSize(id, { width: newWidth, height: newHeight }); // <-- Save size globally
  };

  const handleResizeMouseUp = () => {
    setIsResizing(false);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        handleBlur();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Attach event listeners for resizing
  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleResizeMouseMove);
      window.addEventListener("mouseup", handleResizeMouseUp);
    } else {
      window.removeEventListener("mousemove", handleResizeMouseMove);
      window.removeEventListener("mouseup", handleResizeMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleResizeMouseMove);
      window.removeEventListener("mouseup", handleResizeMouseUp);
    };
  }, [isResizing]);

  return (
    <div ref={(node) => { setNodeRef(node); draggableRef.current = node; }} style={draggableStyle} onClick={handleClick}>
      {type === "text" ? (
        isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={content}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
            }}
          />
        ) : (
          <p>{content}</p>
        )
      ) : type === "image" ? (
        <>
          <img
            src={content}
            alt={`Draggable Image ${id}`}
            style={{ width: `${size.width}px`, height: `${size.height}px` }}
          />
          <div
            className="resize-handle"
            onMouseDown={handleResizeMouseDown}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "10px",
              height: "10px",
              backgroundColor: "blue",
              cursor: "nwse-resize",
            }}
          />
        </>
      ) : type === "video" ? (
        <>
          <video
            src={content}
            controls
            autoPlay
            loop
            style={{ width: `${size.width}px`, height: `${size.height}px` }}
          />
          <div
            className="resize-handle"
            onMouseDown={handleResizeMouseDown}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "10px",
              height: "10px",
              backgroundColor: "blue",
              cursor: "nwse-resize",
            }}
          />
        </>
      ) : null}
    </div>
  );
};

export default DraggableElement;
