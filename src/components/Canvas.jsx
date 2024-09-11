// src/components/Canvas.js
import React, { useRef, useState } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [elements, setElements] = useState([]);

  const addElement = (type) => {
    const newElement = {
      id: Math.random().toString(36).substr(2, 9),
      type: type, 
      top: 50, 
      left: 50, 
      rotate: 0
    };
    setElements([...elements, newElement]);
  };

  return (
    <div>
      <div>
        <button onClick={() => addElement('image')}>Add Image</button>
        <button onClick={() => addElement('video')}>Add Video</button>
        <button onClick={() => addElement('text')}>Add Text</button>
      </div>
      <div
        ref={canvasRef}
        style={{
          position: 'relative',
          width: '800px',
          height: '600px',
          border: '1px solid black'
        }}
      >
        {elements.map((el) => (
          <div key={el.id} style={{ position: 'absolute', top: el.top, left: el.left }}>
            {el.type === 'image' && <img src="https://via.placeholder.com/150" alt="placeholder" />}
            {el.type === 'video' && <video src="path/to/video.mp4" controls width="150"></video>}
            {el.type === 'text' && <div>Sample Text</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Canvas;
