
import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {

  //Definition of the states and fields of the form to be verified
  const [values, setValues] = useState({
    name: '',
    lastname: '',
    telephone:'',
    email:'',
    username:'',
    password: '',
    password2: ''
  });

  //Definicion de los estados de los errores 
  const [errors, setErrors] = useState({});

  //Definition of the sending status of the form
  const [isSubmitting, setIsSubmitting] = useState(false);

  //Controls the change of entries in the form fields
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  //Controls the status of the shipment, validates first before accepting to send
  const handleSubmit = e => {
    e.preventDefault();
    //Changes the status of errors in case of failure to comply with the validation 
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [callback, errors, isSubmitting]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;