import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

const App = () => {
  const viewRef = useRef(null);
  const [downloadedImage, setDownloadedImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  
  // Function to convert image to base64
  const convertToBase64 = (imgUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const base64String = canvas.toDataURL("image/jpeg");
        resolve(base64String);
      };
      img.onerror = (error) => reject(error);
      img.src = imgUrl;
    });
  };

  // Function to load and process the external image
  const startImageDownload = async () => {
    const imageURL = "https://greeting-studio-mini-app-cards.s3.ap-south-1.amazonaws.com/good+morning+temp/2.jpg";
    const imageDescription = "The Mozilla logo";
    
    try {
      // Convert image to base64 first
      const base64String = await convertToBase64(imageURL);
      setBase64Image(base64String);
      
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.alt = imageDescription;
      img.onload = () => {
        setDownloadedImage(img);
      };
      img.src = base64String;
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  };

  // Function to capture and download the card
  const captureAndDownload = async () => {
    try {
      const element = document.getElementById("captureView");
      if (element) {
        const canvas = await html2canvas(element, {
          useCORS: true,
          allowTaint: true,
        });
        
        // Convert to base64 and trigger download
        const base64Image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = base64Image;
        link.download = 'birthday_card_base64.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Log base64 string to console
        console.log("Base64 Image String:", base64Image);
      }
    } catch (error) {
      console.error("Error capturing card:", error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#fde4e4',
        minHeight: '100vh',
      }}
    >
      {/* Banner */}
      <div
        style={{
          backgroundColor: '#ff6699',
          width: '100%',
          padding: '15px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ color: '#fff', fontSize: '22px', margin: 0 }}>
          Happy Birthday
        </h1>
      </div>

      {/* Capturable View */}
      <div
        id="captureView"
        ref={viewRef}
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          margin: '20px 0',
          border: '5px solid #ff6699',
          borderRadius: '15px',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
          width: '90%',
          maxWidth: '600px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontSize: '18px', color: '#333', fontWeight: 'bold' }}>
          On your special day, I wish you all the happiness,
        </p>
        <p style={{ fontSize: '18px', color: '#333', fontWeight: 'bold' }}>
          success, and fulfillment your heart can hold.
        </p>
        
        {/* Display either the base64 image or the original image */}
        {base64Image ? (
          <img
            src={base64Image}
            alt="Base64 Card"
            style={{
              width: '300px',
              height: '200px',
              margin: '10px 0',
              borderRadius: '10px',
              objectFit: 'contain',
            }}
          />
        ) : (
          <img
            src="https://public.canva.site/logo/media/c289b2d78d92c9574fad91c4319e8e60.png"
            alt="Birthday Card"
            style={{
              width: '300px',
              height: '200px',
              margin: '10px 0',
              borderRadius: '10px',
              objectFit: 'contain',
            }}
          />
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: '#000066',
          width: '100%',
          padding: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ color: '#fff', fontSize: '16px' }}>
          Somaskaher Rao and Family
        </span>
        <div
          style={{
            backgroundColor: '#fff',
            padding: '5px',
            borderRadius: '5px',
          }}
        >
          <span style={{ fontSize: '12px' }}>📷 Make your card</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button
          onClick={startImageDownload}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Load New Image (Base64)
        </button>
        <button
          onClick={captureAndDownload}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Download Card (Base64)
        </button>
      </div>
    </div>
  );
};

export default App;