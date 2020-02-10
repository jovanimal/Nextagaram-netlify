import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavLink
} from "reactstrap";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const AuthModal = ({
  buttonLabel,
  currentUser,
  setCurrentUser,
  loggedIn,
  setLoggedIn
}) => {
  const [modal, setModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const toggle = () => {
    setModal(!modal);
    setShowLogin(true);
  };

  const toggleLogin = () => setShowLogin(!showLogin);

  return (
    <div>
      <NavLink style={{ cursor: "pointer" }} onClick={toggle}>
        {buttonLabel}
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          {showLogin ? "Login" : "Sign Up"}
        </ModalHeader>
        <ModalBody>
          {showLogin ? (
            <LoginForm
              toggle={toggle}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
          ) : (
            <SignUpForm />
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="link" onClick={toggleLogin}>
            {showLogin
              ? "Not registered? Sign Up Now"
              : "Already a user? Sign In"}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AuthModal;
