import React, { useState }from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import './Form.css';
import axios from 'axios';
import swal from 'sweetalert';

//definition of the post url 
const url = "http://localhost:8080/API/registrar";

//definition of the password field visibility icon 
const eye =<FontAwesomeIcon icon = {faEye} />;

const FormRegister = ({ submitForm }) => {

  //sending the values of the form fields to be validated
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  //definition of password field states
  const [passwordShown, setPasswordShown] = useState (false);
  const [passwordShown2, setPasswordShown2] = useState (false);

  //functions that change the status of passwords
  const togglePasswordVisibility1 = () => {
    setPasswordShown (passwordShown ? false : true);
  }
  const togglePasswordVisibility2 = () => {
    setPasswordShown2 (passwordShown2 ? false : true);
  }

  //definition of axios 
  const axiosInstance = axios.create({
    headers:{
      "Acess-Control-Allow-Origin": "*"
    }
  });
  //alerts
  const alertSuccess=() =>{
    swal({
      text:"Usted se ha registrado exitosamente",
      icon:"success",
    });
  }

  const showAlertErrors=() =>{
    swal({
      text:"El formulario no fue llenado correctamente!",
      icon:"warning",
    });
  }
  const showAlertExistingAccount=() =>{
    swal({
      text:"Existe otra cuenta registrada con este correo",
      icon:"warning",
    });
  }
  const showAlertExistingNameUser=() =>{
    swal({
      text:"Existe otra cuenta registrada con este nombre de usuario",
      icon:"warning",
    });
  }

  const showAlertErrorBd=() =>{
    swal({
      text:"Error de conexión con la base de datos",
      icon:"warning",
    });
  }

  //function that sends the validated data of the form to backend 
  const post = async () =>{
    console.log(values);
    await axiosInstance.post (url, values).then( response =>{
        console.log(response.data);
        if(response.data === 0){
          showAlertErrorBd();
        }else if(response.data === 17 ){
          showAlertErrors();
        }else if(response.data === 29){
          submitForm(false);
          showAlertExistingAccount();
        }else if(response.data === 11){
          submitForm(true);
          alertSuccess();
        }else if(response.data === 37){
          submitForm(false);
          showAlertExistingNameUser();
          
        }
    }).catch(error => {
      console.log(error.message);
    })
  }

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
      <div className='form-inputs'>
          <label className='form-label'>Nombre(s)<h1> *</h1></label>
          <input
            className='form-input'
            type='text'
            name='name'
            placeholder='Ingresa tu(s) nombre(s)'
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Apellidos<h1> *</h1></label>
          <input
            className='form-input'
            type='text'
            name='lastname'
            placeholder='Ingresa tus apellidos'
            value={values.lastname}
            onChange={handleChange}
          />
          {errors.lastname && <p>{errors.lastname}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Número de teléfono<h1> *</h1></label>
          <input
            className='form-input'
            type='text'
            name='telephone'
            placeholder='Ingresa numero de telefono'
            value={values.telephone}
            onChange={handleChange}
          />
          {errors.telephone && <p>{errors.telephone}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Correo<h1> *</h1></label>
          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='Ingresa tu correo electronico'
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Usuario<h1> *</h1></label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Ingresa tu nombre de usuario'
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        
        <div className='form-inputs'>
          <label className='form-label'>Contraseña<h1>*</h1></label>
          <input
            className='form-input'
            type={passwordShown ? "text" : "password"}
            name='password'
            placeholder='Ingresa tu contraseña'
            value={values.password}
            onChange={handleChange}
          />
            <i onClick = {togglePasswordVisibility1}>{eye}</i>
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className='form-inputs'>
          <label className='form-label'>Confirmar contraseña<h1> *</h1></label>
          <input
            className='form-input'
            type={passwordShown2 ? "text" : "password"}
            name='password2'
            placeholder='Confirma tu contraseña'
            value={values.password2}
            onChange={handleChange}
          /> 
          <i onClick = {togglePasswordVisibility2}>{eye}</i>
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button className='form-input-btn' type='submit' onClick = {post}>
          Registrarse
        </button>
        
      </form>
    </div>
  );
};
export default FormRegister;
