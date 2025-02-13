
    //const imageURL = "https://greeting-studio-mini-app-cards.s3.ap-south-1.amazonaws.com/good+morning+temp/2.jpg";
    import React, { useRef, useEffect, useState } from "react";

    const imageUrl =
    "https://greeting-studio-mini-app-cards.s3.ap-south-1.amazonaws.com/good+morning+temp/2.jpg";
    const CanvasDrawing = () => {
      const canvasRef = useRef(null);
      const ctxRef = useRef(null);
      const imageRef = useRef(new Image());
      const [drawing, setDrawing] = useState(false);
      const [base64Image, setBase64Image] = useState("");
    
      useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctxRef.current = ctx;
    
        // Set CORS to prevent tainting
        imageRef.current.crossOrigin = "anonymous";
        imageRef.current.src = imageUrl;
    
        imageRef.current.onload = () => {
          // Draw image on canvas
          ctx.drawImage(imageRef.current, 50, 50, canvas.width - 100, canvas.height - 100);
    
          // Add Banner (Upper Text)
          ctx.fillStyle = "darkblue";
          ctx.fillRect(0, 0, canvas.width, 40);
          ctx.font = "bold 20px Arial";
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.fillText("🌞 शुभ प्रभात 🌞", canvas.width / 2, 25);
    
          // Add Footer (Bottom Text)
          ctx.fillStyle = "darkblue";
          ctx.fillRect(0, canvas.height - 40, canvas.width, 40);
          ctx.font = "bold 16px Arial";
          ctx.fillStyle = "white";
          ctx.fillText("Have a Great Day!", canvas.width / 2, canvas.height - 15);
    
          // Draw Frame (Border)
          ctx.strokeStyle = "gold"; 
          ctx.lineWidth = 10;
          ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
          // Convert to Base64
          setBase64Image(canvas.toDataURL("image/png"));
        };
      }, []);
    
      // Start Drawing
      const startDrawing = (e) => {
        setDrawing(true);
        const ctx = ctxRef.current;
        ctx.beginPath();
        ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      };
    
      // Draw on Canvas
      const draw = (e) => {
        if (!drawing) return;
        const ctx = ctxRef.current;
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.stroke();
      };
    
      // Stop Drawing
      const stopDrawing = () => {
        setDrawing(false);
        ctxRef.current.closePath();
      };
    
      // Save Image
      const saveImage = () => {
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL("image/png");
        setBase64Image(dataUrl);
    
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "modified-image.png";
        link.click();
      };
    
      return (
        <div style={{ textAlign: "center", backgroundColor: "#f0f0f0", padding: "20px" }}>
          <h2>Draw on Image & Save</h2>
          <canvas
            ref={canvasRef}
            width={500}
            height={350}
            style={{ border: "2px solid black", cursor: "crosshair", background: "white" }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          <br />
          <button onClick={saveImage} style={{ marginTop: "10px", padding: "10px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}>
            Save Image
          </button>
          <br />
          {base64Image && (
            <div style={{ marginTop: "20px" }}>
              <h3>Base64 Image:</h3>
              <textarea readOnly value={base64Image} style={{ width: "80%", height: "100px" }} />
              <br />
              <img src={base64Image} alt="Captured Drawing" width={300} style={{ border: "2px solid black" }} />
            </div>
          )}
        </div>
      );
    };
    
    export default CanvasDrawing;