import React from "react";
import './InputBase.css';
import {CARD, CARDICON} from '../constants';


const InputBase = ({errorM, error, cardType, isCard, ...props}) => (
   //the spread operator props allow us to carry over the available
   //attributes in input field and add them into input base component
   <label>
      {/* wrapping it in label to be able to have a prop in future for our inputs*/}
      <input className="input-root" {...props} />
      {errorM && <div className="error">{errorM}</div>}
      {(!error || !error.cardError) && isCard && CARD.includes(cardType) && (
         <img
         style={{
            position: "absolute",
            top: "5px",
            right: "10px",
            width: "50px",
            height: "33px"
         }}
         src={CARDICON[cardType]}
         alt="card" 
         />
      )}
   </label>

);


export default InputBase;