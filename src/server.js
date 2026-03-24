const express = require("express");
const cors = require("cors");

const { sendPriceUpdate } = require("./notificationService");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-price", async (req, res) => {
  const { cropName, tamilName, minPrice, maxPrice } = req.body;
  const price = minPrice === maxPrice ? minPrice : minPrice + " - " + maxPrice;
  const message = `
📢 Gandhi Market Price Update

Crop: ${cropName} (${tamilName})
Price: ₹${price} 
Date: ${new Date().toLocaleDateString()}

View trends:
https://localhost:3000
`;

  try {
    await sendPriceUpdate(message);

    res.json({ status: "sent" });
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: "Failed to send message" });
  }
});

app.listen(4000, () => {
  console.log("WhatsApp service running on port 4000");
});
