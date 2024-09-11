import React, { useState } from 'react';
import { DndContext, useDraggable } from '@dnd-kit/core';
import DraggableElement from './DraggebleElement';

const Canvas = () => {
 const [elements, setElements] = useState([]);

 const addElement = (type) => {
   const newElement = {
     id: Math.random().toString(36).substr(2, 9),
     type: type,
     top: 50,
     left: 50,
     rotate: 0,
     zIndex: elements.length + 1, // Set initial zIndex
   };
   setElements([...elements, newElement]);
 };

 const handleDragEnd = (event) => {
   const { active, delta } = event;
   const { id } = active;

   setElements((prevElements) =>
     prevElements.map((el) =>
       el.id === id
         ? {
             ...el,
             top: el.top + delta.y,
             left: el.left + delta.x,
           }
         : el
     )
   );
 };

 const handleRotate = (id) => {
   setElements((prevElements) =>
     prevElements.map((el) =>
       el.id === id ? { ...el, rotate: el.rotate + 45 } : el
     )
   );
 };

 const handleBringForward = (id) => {
   setElements((prevElements) =>
     prevElements.map((el) =>
       el.id === id ? { ...el, zIndex: el.zIndex + 1 } : el
     )
   );
 };

 const handleSendBackward = (id) => {
   setElements((prevElements) =>
     prevElements.map((el) =>
       el.id === id && el.zIndex > 0 ? { ...el, zIndex: el.zIndex - 1 } : el
     )
   );
 };

 return (
   <div>
     <div>
       <button onClick={() => addElement('image')}>Add Image</button>
       <button onClick={() => addElement('video')}>Add Video</button>
       <button onClick={() => addElement('text')}>Add Text</button>
     </div>
     <DndContext onDragEnd={handleDragEnd}>
       <div
         style={{
           position: 'relative',
           width: '800px',
           height: '600px',
           border: '1px solid black',
         }}
       >
         {elements.map((el) => (
           <DraggableElement
             key={el.id}
             element={el}
             onRotate={handleRotate}
             onBringForward={handleBringForward}
             onSendBackward={handleSendBackward}
           />
         ))}
       </div>
     </DndContext>
   </div>
 );
};

export default Canvas;
