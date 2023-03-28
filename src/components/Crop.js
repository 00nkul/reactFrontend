import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import PlantDisease from './PlantDisease'
import Card from 'react-bootstrap/Card';
// import fs from 'fs';

const Crop = () => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [data, setData] = useState(null);
  const fileSelectedHandler = (e) => {
    // setSelectedFile(e.target.files[0]);
    setSelectedFile([...e.target.files]);
  };
  const fileUploadHandler = () => {
    const promises = selectedFile.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const res = event.target.result;
          resolve(res);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then((base64files) => {
        const data = {
          api_key:
            "4yg1tNyAXg1NNMxNncFDkBruLFUsKbuFZ20nBRL8gwud4R1pe3",
          images: base64files,
          modifiers: ["crops_fast", "similar_images"],
          language: "en",
          disease_details: [
            "cause",
            "common_names",
            "classification",
            "description",
            "treatment",
            "url",
          ],
        };

        fetch("https://api.plant.id/v2/health_assessment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data.health_assessment);
            setData(data.health_assessment);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="about_us">
      <h2 style={{ color: 'black' }} className="text-center">
        KNOW YOUR CROP !
      </h2>
      <div className="mission">
        <span>Doubt of Plant Disease?</span>
        <p>
          We use artificial intelligence to predict the crop disease that can
          degrade agricultural output. Upload the plant image to be scanned by
          our machine learning model and get information about plant disease and
          remedies.
        </p>
        <br />
        <label
          for="file-upload"
          class="custom-file-upload btn btn-primary rounded-button"
        >
          <i class="fa fa-cloud-upload"></i> Upload Plant Image
        </label>

        <input id="file-upload" type="file" onChange={fileSelectedHandler} />
        {selectedFile[0] ? selectedFile[0].name ?selectedFile[0].name :"" : null}
        {/* <input type= "file" onChange= {fileSelectedHandler} /> */}
        {/* <button onClick= {fileUploadHandler}>upload</button> */}
        <br />
        <br />
        <div className="text-center">
          <Button variant="success" onClick={fileUploadHandler}>
            Submit
          </Button>
        </div>
      </div>
      {data && (
        // <Card style={{ width: '25rem', margin: 'auto' }}>
        //   <Card.Img
        //     variant="top"
        //     src="https://res.cloudinary.com/annadata/image/upload/v1619869415/plantDiseaseDetected_juzeyf.png"
        //     height="200"
        //     width="200"
        //   />
        //   <Card.Body>
        //     <h2>Plant Name: {data.plant_name}</h2>
        //     <h2>Disease: {data.disease ? 'true' : 'false'}</h2>
        //     {data.disease_name && <h2>Disease Name: {data.disease_name}</h2>}
        //   </Card.Body>
        // </Card>
        < PlantDisease data={data}/>
    )}
      <br />
    </div>
  );
};
export default Crop;
