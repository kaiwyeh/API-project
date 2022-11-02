import React from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import "./LoginFormModal.css";

function LoginFormModal({ showMenu, logIn, setLogIn }) {

 const closeModal = () => {
  setLogIn(false);
  showMenu(false);
 };

 return (
  <>
   {logIn && (
    <Modal onClose={() => closeModal()}>
     <LoginForm closeModal={closeModal} />
    </Modal>
   )}
  </>
 );
}

export default LoginFormModal;
