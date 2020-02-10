import React, { useState } from "react";
import { Form, FormGroup, FormText, Input, Container, Button } from "reactstrap";
import axios from'axios'

const UploadPage = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);

  const handleUpload = e => {
    e.preventDefault ();

    let formData = new FormData();
    formData.append("image", uploadImage);
    let jwt = localStorage.getItem("authToken");
    console.log(jwt)

  }

  const handleImage = (e) => {
    let imageFile = e.target.files[0];
    let newImage = URL.createObjectURL(imageFile);

    setPreviewImage(newImage);
    setUploadImage(newImage);
  }
  

  return (
    <Container className="pt-5">
      <h6>Upload New Image</h6>
      <div
        className="border border-light rounded mx-auto d-block mt-4"
        style={{ height: "500px", width: "500px", position: "relative" }}
      >
      {previewImage ? (
        <img
          className="w-75"
          style={{
            position: "relative",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
          }}
          src={previewImage}
          alt="preview"
        />
      ) : (
        <h2
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          Choose image to preview
        </h2>
      )}
      </div>
      <Form onSubmit={handleUpload}>
        <FormGroup>
          <Input type="file" name="image-file" onChange={handleImage} />
          <FormText color="muted">
            Make sure the image being uploaded is a supported format.
          </FormText>
        </FormGroup>
        <Button type="submit" color="primary">
          Upload
        </Button>
      </Form>
    </Container>
  );
}

export default UploadPage
