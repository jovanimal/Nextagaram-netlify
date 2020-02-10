import React, { useEffect, useState } from 'react';
import axios from "axios";
import Image from "react-graceful-image";
import { Button } from "reactstrap"
import { NavLink as Link } from "react-router-dom";

const MyProfilePage = () => {

  const [images, setImages] = useState([])

  useEffect(() => {
    axios({
      method: "get",
      url: "https://insta.nextacademy.com/api/v1/images/me",
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` }
    }).then(result => {
      setImages(result.data)
    });
  }, []);  
  
  return (
    <>
      {images.map(image => {
        return (
          <div>
            <Image
              src={image}
              style={{
                display: "inline-block",
                margin: "0 0 1em",
                width: "300px",
                height: "300px"
              }}
            />
          </div>
        );
      })}
      <Button color="link" tag={Link} to="/uploadImage" >
        Upload Image
      </Button>
    </>
  );
}

export default MyProfilePage
