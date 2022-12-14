import React from "react";
import InputBase from "../InputBase/InputBase";
import './Form.css';
import { OTHERCARDS } from '../constants';
import { cardExpireValidation, 
   cardNumberValidation, 
   onlyTextValidation, 
   securityCodeValidation } 
   from "../validations";

const INIT_CARD = {
   card: '',
   cardHolder: '',
   expiry: '',
   securityCode: '',
}

class Form extends React.Component {
   constructor() {
      super();

      this.state = {
         cardData: INIT_CARD,
         maxLength: OTHERCARDS.length,
         // maxLength: 19,
         error: {},
         cardType: null,
      }
   }

   findDebitCardType = (cardNumber) => {
      const regexPattern = {
         MASTERCARD: /^5[1-5][0-9]{1,}^[2-7][0-9]{1,}$/,
         VISA: /^4[0-9]{2,}$/,
         AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
         DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
      };
      for(const card in regexPattern){
         if(cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) return card;
      }
      return '';
   }



   //take these functions and break it out into multiple func that run a specific piece of logic
   //capture a name and value 
   handleValidations= (type, value) => {
      let errorText;

      switch(type) {
         case 'card':
            errorText = cardNumberValidation(value)
            this.setState((prevState) => ({
               cardType: this.findDebitCardType(value),
               error: {
                  ...prevState.error,
                  cardError: errorText,
               },
            }));
            //find card type 
            //setState to cardType.error 
            break;
         case 'cardHolder':
            errorText = onlyTextValidation(value);
            this.setState((prevState) => ({ error: { ...prevState.error, cardHolderError: errorText}}));
            break;
         case 'expiry': 
            errorText = cardExpireValidation(value);
            this.setState((prevState) => ({ error: { ...prevState.error, expiryError: errorText}}));
            break;
         case 'securityCode':
            errorText = securityCodeValidation(3, value);
            this.setState((prevState) => ({ error: { ...prevState.error, securityCodeError: errorText}}));
            break;
         default:
            break;
      } 
   } 

   handleBlur = ({ target: { name, value}}) => this.handleValidations(name, value);
   

   handleInputData = ({ target: { name, value}}) => {

      if (name === 'card') {
         let mask = value.split(' ').join('');
         if (mask.length) {
            mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ');
         this.setState((prevState) => ({ 
            cardData: {
            ...prevState.cardData, 
            [name]: mask,
               },
            }));
         } else {
            this.setState((prevState) => ({ 
            cardData: {
            ...prevState.cardData, 
            [name]: '',
                  },
               }));
            }
      } else {
         this.setState((prevState) => ({ 
            cardData: {
            ...prevState.cardData, 
            [name]: value
            },
         }));
      }
      //prevState gets the previous state of all the other properties and adds it with the new state
      //because youre bringing in all of th data within th object nd you dont want it to reset
   }

   checkErrorBeforeSave = () => {

      const { cardData } = this.state;
      let errorValue = {};
      let isError = false;
      Object.keys(cardData).forEach((val) => {
         if (!cardData[val].length) {
            errorValue = { ...errorValue, [`${val}Error`]: 'Required'};
            isError = true;
         }
      });
      // this.setState({ error: errorValue });
      this.setState((prevState) => ({
         error: {
            ...prevState.error,
            ...errorValue,
         }
      }));
      return isError;
   }

   handleAddCard = (e) => {
      e.preventDefault();

      const errorCheck = this.checkErrorBeforeSave();

      if (!errorCheck && !Object.values(this.state.error).filter((val) => val !== undefined).length) {
         this.setState({
            cardDate: INIT_CARD,
            cardType: null,
         });
      }

      /* if (!errorCheck) {
         this.setState({
            cardDate: INIT_CARD,
            cardType: null,
         });
      } */


   }


   render() {

      const { cardData, error, cardType, maxLength} = this.state;

      const inputData = [
         {label: 'Card Number', name: 'card', type: 'text', error:'cardError'},
         {label: 'CardHolder\'s', name: 'cardHolder', type: 'text', error:'cardHolderError' },
         {label: 'Expiry State (MM/YY)', name: 'expiry', type: 'text', error:'expiryError' },
         {label: 'Security Code', name: 'securityCode', type: 'text', error:'securityCodeError' },
      ]

      return (
         <div>
            <h1>Add New Card</h1>
            <form onSubmit={this.handleAddCard}>
               {inputData.length ? inputData.map((item) =>(
                  <InputBase 
                  placeholder={item.label}
                  type={item.type}
                  value={cardData && cardData[item.name]}
                  onChange={this.handleInputData}
                  autoComplete='off'
                  maxLength={maxLength}
                  name={item.name}
                  onBlur={this.handleBlur}
                  error={error}
                  cardType={cardType}
                  isCard={item.name === 'card'}
                  errorM={
                     (error
                     && error[item.error]
                     && error[item.error].length > 1)
                     ? error[item.error]
                     : null
                  }
                  />
               )): null } 
               
               <div className="btn-wrapper">
                  <InputBase type="submit" value="Add Card"/>
               </div>
            </form>
         </div>
      )
   }
}

export default Form;