import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import HomePage from "./pages/HomePage";
import UserProfile from "./pages/UserProfile";
import NavBar from "./components/NavBar";
import MyProfilePage from "./pages/MyProfilePage";
import UploadPage from "./pages/UploadPage";
import { Route } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components"


toast.configure();

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("jwt") !== null,
    );
    
    // state = {
      //   users: [],
      //   images: [],
      //   profilePic: "",
      // }
      
      // this.state.users = "blah blah blah"
      // this.setState("something else")
      
      // this.props.users = "something new"
      // this.props.users.setState = 
      
      // const [currentUser, setCurrentUser] = useState({
        //   jwt: localStorage.getItem("jwt") !== null, // boolean
        //   userDetails: localStorage.getItem("user") // object
        // })
        
        console.log(currentUser);
        useEffect(() => {
          axios.get("https://insta.nextacademy.com/api/v1/users/").then(result => {
            setUsers(result.data)
            setIsLoading(false)
          });
        }, []);
        
        const signUpUser = (username, email, password) => {
          console.log(username, email, password)
        }
        
        // <StyledHeader>Hello World</StyledHeader>
        return (
          <div className="App">
          <NavBar signUpUser={signUpUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn}
          currentUser={currentUser} setCurrentUser={setCurrentUser} />
          <header className="App-header">
            <Route exact path="/">
              <HomePage users={users} isLoading={isLoading} />
            </Route>
            <Route path="/user/:id/:username">
              <UserProfile users={users} />
            </Route>
            <Route exact path="/profile">
              <MyProfilePage />
            </Route>
            <Route exact path="/uploadImage">
              <UploadPage />
            </Route>


          </header>
          </div>
          );
        }
        
        
        
        export default App;
        
        const StyledHeader = styled.h1`
        color: orange;
        font-size: 1.6rem;
        `