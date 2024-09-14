import React from "react";
import "./Canvas.css";

const Canvas = React.forwardRef((props, ref) => {
  return (
    <div className="canvas" ref={ref}>
      {props.children}
    </div>
  );
});

export default Canvas;
