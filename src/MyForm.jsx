import React from "react";

class MyForm extends React.Component {
   constructor() {
      super();
      this.state = {
         person: {name: '', comments: '', animal: ''}
      }
   }

   onSubmit = (e) => {
      // prevent default prevents you frm refreshing the page
      e.preventDefault();
      //did something with data
      this.setState({value: ''});
      // console.log(this.state.value)
   }

   //
   onChange = (e) => {
      e.preventDefault();
      // this.setState({value: ''})
      const value = e.target.value;
      const name = e.target.name;
      //doing in this syntax would capture all the previous keys and add it into the object
      //if not then the present keys would override the other keys and you will not get
      //the other keys from the person.state
      this.setState((previousState) => ({ person: {...previousState.person, [name]: value} }));
      
   }

   render() {
      console.log(this.state)
      return (
         <form onSubmit={this.onSubmit}>
            <label >
               Name:
               <input onChange={this.onChange} 
               type="text" name ="name" value={this.state.name}
               />
            </label>
            <br/>
            <label htmlFor="">Comments</label>
            <textarea onChange={this.onChange} name="comments"value={this.state.value}/>
            <br/>
            <label htmlFor="">Choose Animal</label>
            <select name="animal" onChange={this.onChange}>
               <option value="dog">dog</option>
               <option value="cat">cat</option>
               <option value="bird">bird</option>
               <option value="pig">pig</option>
            </select>
            <input type="submit" value="submit"/>

         </form> 
      )
   }
}

export default MyForm;