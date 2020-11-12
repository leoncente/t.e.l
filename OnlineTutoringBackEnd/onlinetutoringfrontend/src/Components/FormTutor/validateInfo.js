export default function validateInfo(values) {
  
  let errors = {};

  //Name validation 
  if (!values.name.trim()) {
    errors.name = 'Este campo no puede quedar vacío';
  }else if(!(values.name.length<=20 && values.name.length>=3)){
    errors.name = 'Este campo debe tener entre 3 y 20 caracteres';
  }else if(values.name.charAt(0)==" " || values.name.charAt(values.name.length-1)==" " ){
    errors.name='Su nombre no puede iniciar ni terminar en espacio';
  } else if(!(/^[a-zA-Z\s\u00f1\u00d1]+$/.test(values.name))){
      errors.name = 'Sólo se aceptan caracteres afabéticos';
  }

  //Lastname validation 
  if (!values.lastname.trim()) {
    errors.lastname = 'Este campo no puede quedar vacío';
  }else if(!(values.lastname.length<=20 && values.lastname.length>=3)){
    errors.lastname = 'Este campo debe tener entre 3 y 20 caracteres';
  }else if(values.lastname.charAt(0)==" " || values.lastname.charAt(values.lastname.length-1)==" " ){
    errors.lastname='Su apellido no puede iniciar ni terminar en espacio';
  }else if(!(/^[a-zA-Z\s\u00f1\u00d1]+$/.test(values.lastname))){
    errors.lastname = 'Solo se aceptan caracteres afabéticos';
  }

  //Telephone validation
  if(!values.telephone.trim()){
    errors.telephone = 'Este campo no puede quedar vacío'
  }else if(!(values.telephone.length<=8 && values.telephone.length>=7)){
    errors.telephone = 'Ingrese un número de 7 u 8 dígitos'
  }else if(!(/^[0-9]+$/.test(values.telephone))){
    errors.telephone = "Ingrese un número de 7 u 8 dígitos";
  }

  //Email validation
  if (!values.email.trim()) {
    errors.email = 'Este campo no puede quedar vacio';
  } else{
    var datos= {posArroba:-1,j:0, aux:''};
    for( datos.j=0;datos.j<values.email.length;datos.j++){
      datos.aux = values.email.charAt(datos.j);
      if(datos.aux =='@'){
          datos.posArroba = datos.j;
      }
    }
    if(values.email.charAt(0)=="." || values.email.charAt(datos.posArroba-1)=="." || 
    values.email.charAt(datos.posArroba+1)=="." || values.email.charAt(values.email.length-1)=="." ){
      errors.email = 'Correo invalido';
    }else if (!(/^([a-zA-Z0-9_\.\-])+\@+([a-zA-Z\.\-])+$/.test(values.email))){
      errors.email = 'Correo invalido';
    }
  }

  //Username validation
  if(!values.username.trim()){
    errors.username = 'Este campo no puede quedar vacío';
  }else if(!(values.username.length>=5 && values.username.length<=20)){
    errors.username = 'Este campo debe tener entre 5 y 20 caracteress'
  }else{
    var dat= {hayEspacio:false,k:0, aux:''};
    for( dat.k=0;dat.k<values.username.length && !dat.hayEspacio;dat.k++){
      dat.aux = values.username.charAt(dat.k);
      if(dat.aux ==' '){
          dat.hayEspacio = true;
      }
    }
    if(dat.hayEspacio){
      errors.username = 'No se permiten espacios';
    }
  }

  //Password validation
  if (!values.password.trim()) {
    errors.password = 'Este campo no puede quedar vacío';
  } else if (!(values.password.length >= 7 && values.password.length <=16)) {
    errors.password = 'Este campo debe tener entre 7 y 16 caracteres';
  }else if(values.password.toUpperCase()===values.password){
    errors.password ='La contraseña debe tener al menos una letra minúscula';
  }else if(values.password.toLowerCase()===values.password){
    errors.password ='La contraseña debe tener al menos una letra mayúscula';
  }else{
    var array = {thereIsANumber: false, aux: " ", i: 0};
    for( array.i=0;array.i<values.password.length && !array.thereIsANumber ;array.i++){
      array.aux = values.password.charAt(array.i);
      if(array.aux === "0" || array.aux === "1" || array.aux === "2" || array.aux === "3" || array.aux === "4" || 
        array.aux === "5" || array.aux === "6" || array.aux === "7" || array.aux === "8" || array.aux === "9"){
          array.thereIsANumber = true;
      }
    }
    if(!array.thereIsANumber){
      errors.password ='La contraseña debe tener al menos un número';
    } 
  }

  //Confirm password validation
  if (!values.password2) {
    errors.password2 = 'Este campo no puede quedar vacío';
  } else if (values.password2 !== values.password) {
    errors.password2 = 'Las contraseñas no coinciden';
  }
  return errors;
}