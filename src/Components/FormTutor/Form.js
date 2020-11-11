import React, { useState } from 'react';
import './Form.css';
import FormRegister from './FormRegister';

//Tutor Registration Form Container
const Form = ({setShowModal}) => {

  //Function of closing the modal
  function closeModal () {
      //changes the state of the modal 
      setShowModal(false);
  }


  //Definition of form submission status
  const [isSubmitted, setIsSubmitted] = useState(false);

  //Change form status
  function submitForm (res){
    setIsSubmitted(res);
  }
  
  return (
    <>
      <div className='form-container'>
        <div className='form-content-left'>
          <p>Ragistrarse como Tutor</p>
        </div>
        {!isSubmitted ? (
          <FormRegister submitForm={submitForm} setIsSubmitted = {setIsSubmitted}/>
        ) : closeModal()}
      </div>
    </>
  );
};

export default Form;