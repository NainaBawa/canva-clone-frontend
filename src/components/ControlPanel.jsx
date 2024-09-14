import React, { useRef } from "react";
import "./ControlPanel.css";

const ControlPanel = ({ addElement }) => {
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleMediaUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        addElement(type, event.target.result); // Pass the media (image/video) URL as content
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="control-panel">
      <button onClick={() => addElement("text")}>Add Text</button>
      <button onClick={() => imageInputRef.current.click()}>Add Image</button>
      <input
        type="file"
        ref={imageInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={(e) => handleMediaUpload(e, "image")}
      />
      <button onClick={() => videoInputRef.current.click()}>Add Video</button>
      <input
        type="file"
        ref={videoInputRef}
        style={{ display: "none" }}
        accept="video/*"
        onChange={(e) => handleMediaUpload(e, "video")}
      />
    </div>
  );
};

export default ControlPanel;
