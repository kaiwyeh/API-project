import React from "react";
import { Modal } from "../../context/Modal";
import SignupFormPage from ".";
import "./SignupForm.css";

function SignUpModal({ menu, showMenu, signUp, setSignUp }) {

  const closeAll = () => {
    setSignUp(false);
    showMenu(false);
  };

  return (
    <>
      {signUp && (
        <Modal onClose={() => closeAll()}>
          <SignupFormPage closeModal={closeAll} />
        </Modal>
      )}
    </>
  );
}

export default SignUpModal;
