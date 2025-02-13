const express = require("express");
const axios = require("axios");
const app = express();

app.get("/proxy-image", async (req, res) => {
  try {
    const imageUrl =
      "https://greeting-studio-mini-app-cards.s3.ap-south-1.amazonaws.com/good+morning+temp/2.jpg";
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    res.setHeader("Content-Type", "image/jpeg");
    res.send(response.data);

    console.log(response.data);
  } catch (error) {
    res.status(500).send("Error fetching image");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
