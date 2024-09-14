import React, { useState, useEffect, useRef } from "react";
import { useDraggable } from "@dnd-kit/core";

const DraggableElement = ({
  id,
  type,
  style,
  rotation,
  content,
  isSelected,
  onSelect,
  onTextChange,
}) => {
  const { setNodeRef, transform } = useDraggable({ id });
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const draggableStyle = {
    ...style,
    transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0) rotate(${rotation}deg)`,
  };

  const handleClick = () => {
    onSelect();
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

  return (
    <div ref={setNodeRef} style={draggableStyle} onClick={handleClick}>
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
        <img
          src={content}
          alt={`Draggable Image ${id}`}
          style={{ width: "100px", height: "100px" }}
        />
      ) : type === "video" ? (
        <video
          src={content}
          controls
          style={{ width: "150px", height: "100px" }}
        />
      ) : null}
    </div>
  );
};

export default DraggableElement;
