import React from "react";
import './InputBase.css';

const InputBase = (props) => (
   //the spread operator props allow us to carry over the available
   //attributes in input field and add them into input base component
   <label>
      {/* wrapping it in label to be able to have a prop in future for our inputs*/}
      <input className="input-root" {...props} />
   </label>

);


export default InputBase;