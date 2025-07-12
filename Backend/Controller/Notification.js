require("dotenv").config(); 
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Route to trigger SMS
exports.SendNotification = async (req, res) => {
  const { to, message } = req.body;
  try {
    const msg = await client.messages.create({
      body: message,
      from: "+12513363551", // Your Twilio number
      to: to, // Receiver's phone number
    });

    res.status(200).json({ success: true, sid: msg.sid });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
