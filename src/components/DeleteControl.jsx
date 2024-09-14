import React from 'react'
import { MdDelete } from "react-icons/md";
import "./DeleteControl.css";
const DeleteControl = ({onDelete, position}) => {
 const controlStyle = {
  position: "absolute",
  top: position.top - 40,
  left: position.left + 80,
  zIndex: 100, // Ensure it's on top
  cursor: "pointer",
};
  return ( 
   <div className='delete-controls'>
   <button className='delete-handle'
   onClick={(e) => {
     e.stopPropagation(); // Prevent triggering selection
     onDelete(); // Call the delete handler
   }}
   style={controlStyle}
 >
   <MdDelete className='delete-icon'/>
 </button>
 </div>
  )
}

export default DeleteControl