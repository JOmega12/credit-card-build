import React from 'react';

class StyleComp extends React.Component {

   render () {
      return(
         <div style={{backgroundColor: "white", border: '2px solid black', boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.75)', color: 'black'}}>
            <h1 style ={{fontSize: 'larger'}}>Captain Kickflip 🛹</h1>
            <p style ={{fontSize: 'larger'}}>Full-Stack <strike>Developer</strike> of Pancakes</p>
            <div>{'⭐️'.repeat(4)}</div>
         </div>
      )
   }

}


export default StyleComp;