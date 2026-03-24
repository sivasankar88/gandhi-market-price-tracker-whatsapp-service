const client = require("./whatsappClient");

const GROUP_ID = "120363409211412963@g.us";

async function sendPriceUpdate(message) {
  try {
    const chat = await client.getChatById(GROUP_ID);

    await chat.sendMessage(message);

    console.log("Message sent successfully");
  } catch (err) {
    console.error("Failed to send message:", err);
  }
}

module.exports = {
  sendPriceUpdate,
};
