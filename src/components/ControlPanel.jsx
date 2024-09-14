import React from "react";
import "./ControlPanel.css";

const ControlPanel = ({ addElement }) => {
  return (
    <div className="control-panel">
      <button onClick={() => addElement("text")}>Add Text</button>
      <button onClick={() => addElement("image")}>Add Image</button>
    </div>
  );
};

export default ControlPanel;
