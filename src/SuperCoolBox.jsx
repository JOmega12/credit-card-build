import React from "react";
import style from './SuperCoolBox.module.css';


const SuperCoolBox = () => {


//module css would help with getting a specificity for the react code by
//adding a class name with a hash number

// for css in react, it turns everything into objects, so you have to camel case it

   return (

      <div className={style.box}>
         <h2 className={style.header}>
         The Coolest SuperBox in the world! </h2>
         <p className={style.para}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
      </div>
   )
}

export default SuperCoolBox;