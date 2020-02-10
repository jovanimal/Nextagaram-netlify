import React, { useState } from "react";
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, FormText, FormFeedback } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [delay, setDelay] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
  }

  const submitSignup = () => {
    const notify = () => toast("You have signed up successfully!");
    axios({
    method: 'POST',
    url: 'https://insta.nextacademy.com/api/v1/users/',
    data: {
      username: username,
      email: email,
      password: password
  }
  })
    .then(response => {
      console.log(response)
      notify();
    })
    .catch(error => {
      console.error(error.response) // so that we know what went wrong if the request failed
    })
  };
  
  /*-------------------------Username ----------------------*/
  const checkUsername = newUsername => {
    // this should only trigger after you stop typing for 500ms
    console.log("Making API call to check username!");
    axios
      .get(
        `https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`
      )
      .then(response => {
        console.log(response.data);
        if (response.data.valid) {
          setUsernameValid(true);
        } else {
          setUsernameValid(false);
        }
      });
  };

  const handleUsernameInput = e => {
    // clears queue so that the old keystrokes don't trigger axios call
    clearTimeout(delay);
    const newUsername = e.target.value;
    setUsername(newUsername);

    // put each new keystroke into the queue
    const newDelay = setTimeout(() => {
      checkUsername(newUsername);
    }, 500);

    setDelay(newDelay);
  };

  const handleConfirmPassInput = e => {
    clearTimeout(delay);
    const newConfirmPassword = e.target.value
    setConfirmPassword(newConfirmPassword)

    const newDelay = setTimeout(() => {
      if (confirmPassword == password) {
        console.log("SAME")
        // alert("Password must be the same")
        // return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
      } else {
        console.log("NO")
        console.log(confirmPassword)
      }
    }, 500);
     setDelay(newDelay);
  }

  const getInputProp = () => {
    if (!username.length) {
      return null;
    }

    if (username.length < 6) {
      return { invalid: true };
    }

    if (usernameValid) {
      return { valid: true };
    } else {
      return { invalid: true };
    }
  };

  const getFormFeedback = () => {
    if (!username.length) {
      return null;
    }

    if (username.length < 6) {
      return <FormFeedback invalid>Must be at least 6 characters</FormFeedback>;
    }

    if (usernameValid) {
      return <FormFeedback valid>Sweet! That name is available</FormFeedback>;
    } else {
      return <FormFeedback invalid>Sorry! Username is taken</FormFeedback>;
    }
  };

  /*-------------------------Password ----------------------*/
   const getPassProp = () => {
     if (!password.length) {
       return null;
     }

     if (password.length < 6) {
       return { invalid: true };
     }

     if (passwordValid) {
       return { valid: true };
     } else {
       return { invalid: true };
     }
   }; 

  const getPassFeedback = () => {
    if (!password.length) {
      return null;
    }

    if (password.length < 6) {
      return <FormFeedback invalid>Must be at least 6 characters for your password</FormFeedback>;
    }

    else {
      return <FormFeedback invalid>Sweet! </FormFeedback>;
    }
  };
  
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Email Address</Label>
        <Input
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label>Username</Label>
        <Input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={handleUsernameInput}
          {...getInputProp()}
        />
        {getFormFeedback()}
        <FormText>Enter a username between 6 and 20 characters</FormText>
      </FormGroup>
      <FormGroup>
        <Label>Password</Label>
        <Input
          type="password"
          placeholder="Choose a password, min 6 characters"
          value={password}
          onChange={e => setPassword(e.target.value)}
          {...getPassProp()}
        />
        {getPassFeedback()}
      </FormGroup>
      <FormGroup>
        <Label>Confirm Password</Label>
        <Input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={handleConfirmPassInput}
        />
      </FormGroup>
      <Button
        className="mx-auto d-block"
        outline
        color="primary"
        onClick={submitSignup}
      >
        Sign Up
      </Button>
    </Form>
  );
};

export default SignUpForm;
