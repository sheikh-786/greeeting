const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Import cors
const app = express();

app.use(cors()); // Enable CORS for all routes

app.get("/proxy-image", async (req, res) => {
  try {
    const imageUrl =
      "https://greeting-studio-mini-app-cards.s3.ap-south-1.amazonaws.com/birthday+templates/2.jpg";
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    res.setHeader("Content-Type", "image/jpeg");
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching image");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));