import React from 'react';
import { FaSync, FaArrowUp, FaArrowDown } from 'react-icons/fa'; // Icons from FontAwesome
import './ControlPanel.css';

const ControlPanel = ({ onRotate, onBringForward, onSendBackward }) => {
  return (
    <div className="control-panel">
      <button onClick={onRotate} title="Rotate">
        <FaSync />
      </button>
      <button onClick={onBringForward} title="Bring Forward">
        <FaArrowUp />
      </button>
      <button onClick={onSendBackward} title="Send Backward">
        <FaArrowDown />
      </button>
    </div>
  );
};

export default ControlPanel;
