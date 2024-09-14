import React, { useRef } from "react";
import "./ControlPanel.css";

const ControlPanel = ({ addElement }) => {
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        addElement("image", event.target.result); // Pass the image URL as content
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="control-panel">
      <button onClick={() => addElement("text")}>Add Text</button>
      <button onClick={() => fileInputRef.current.click()}>Add Image</button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default ControlPanel;
