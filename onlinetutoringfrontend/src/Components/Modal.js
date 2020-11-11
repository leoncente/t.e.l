import React, {useRef, useEffect, useCallback} from 'react';
import {useSpring, animated} from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import Form from './FormTutor/Form' ;
import swal from 'sweetalert';

//Modal bottom stylus 
const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//Modal Container Style
const ModalWrapper = styled.div`
  width: 800px;
  height: 580px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index:10;
  border-radius: 10px;
`
//Style of the button that closes the modal
const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: -15vh;
    width: 20px;
    height: 32px;
    padding: 0;
    z-index: 10;
`;


export const Modal = ({showModal, setShowModal}) =>{
  
  const modalRef = useRef();

  //Function that gives the effect of animation as soon as the modal is opened 
  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(-8%)` : `translateY(-100%)`
  });

  //Function that closes the modal 
  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  //Function that shows the alert message 
  const showAlert=() =>{
    swal({
      text:"¿Seguro que desea cancelar su registro?",
      icon:"warning",
      buttons: ["NO", "SI"]
    }).then(res =>{
      if(res){
        setShowModal(false);
      }
    })
  }

  //Function that closes the modal in case of pressing the escape key 
  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );
  
  //Function that closes the modal in case of pressing the escape key and in case of clicking outside the modal  
  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );


    return (
        <> 
            {showModal ? (
                <Background onClick={closeModal} ref={modalRef}>
                    <animated.div style={animation}>
                    <ModalWrapper showModal={showModal}>
                    <Form setShowModal={setShowModal}/>
                    <CloseModalButton aria-label='Close modal' onClick = {()=> showAlert()}/>
                    </ModalWrapper>
                    </animated.div>
                </Background>
            ) : null}
        </>
    );
}