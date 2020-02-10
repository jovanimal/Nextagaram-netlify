import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { toast } from "react-toastify";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const LoginForm = ({
  toggle,
  currentUser,
  setCurrentUser,
  loggedIn,
  setLoggedIn
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();

    axios({
      method: "post",
      url: "https://insta.nextacademy.com/api/v1/login",
      data: {
        username: username,
        password: password
      }
    }).then(result => {
      console.log(result);
      localStorage.setItem("jwt", result.data.auth_token);
      toggle();
      history.push("/");
      setTimeout(() => {
        notify();
      }, 1000);
      setLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(result.data.user))
      setCurrentUser(JSON.parse(localStorage.getItem("user")));

      /**
 * Example response:
{
  "auth_token": "<auth token string>",
  "message": "Successfully signed in.",
  "status": "success",
  "user": {
    "id": 3,
    "profile_picture": "<profile-pic-url>",
    "username": "blake"
  }
}
*/
    });
  };

  const notify = () => toast("You have logged in successfully!");

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Username</Label>
          <Input
            type="text"
            placeholder="Enter username..."
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button className="mx-auto d-block" outline color="primary">
          Login
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
