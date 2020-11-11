import React, {useState}from 'react';
import styled from 'styled-components';
import { Modal } from '../Modal';
import { GlobalStyle } from './GlobalStyles';

//style of the entire modal container
const Container = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #F7F3E6;
`;

//button style to register as a tutor
const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #C38346;
  color: #fff;
  font-size:24px;
  cursor: pointer;
`;

function Tutor() {

  //Definition of modal states
  const [showModal, setShowModal] = useState(false);

  //Function that changes the state of the modal 
  const openModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <>
      <Container>
        <Button onClick = {openModal}>Registrarse</Button>
        <Modal showModal={showModal} setShowModal={setShowModal}/>
        <GlobalStyle />
      </Container>
    </>
  );

}

export default Tutor;