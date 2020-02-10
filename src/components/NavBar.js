import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { NavLink as Link } from "react-router-dom";
import AuthModal from './AuthModal';
import Image from "react-graceful-image";

const NavBar = ({ loggedIn, setLoggedIn, currentUser, setCurrentUser }) => {
  console.log(currentUser)
  const [isOpen, setIsOpen] = useState(false);


  const toggle = () => setIsOpen(!isOpen);
  const logOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser(!currentUser);
  }

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Nextagram</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
          
          {currentUser ? (
            <>
            <Image
            src={currentUser.profile_picture}
            style={{ borderRadius: "50%", height: "40px" }}
            />
            <NavItem>
              <NavLink activeClassName="active" tag={Link} to="/profile">
                My Profile
              </NavLink>
            </NavItem>
                <NavItem>
                  <NavLink activeClassName="active" tag={Link} to="/" onClick={logOut}>
                    Sign Out
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <NavItem>
                <AuthModal
                  buttonLabel="Login"
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  loggedIn={loggedIn}
                  setLoggedIn={setLoggedIn}
                />
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
        };
        
        
        export default NavBar;
        