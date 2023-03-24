const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

function sendSMS(message, to) {
  const from = '+15794002815';
  client.messages
    .create({
      body: message,
      from: from,
      to: to,
    })
    .then((message) =>
      console.log(`Message SID ${message.sid} sent to ${message.to}`)
    )
    .catch((err) => console.error(`Error sending SMS: ${err}`));
}

module.exports = { sendSMS };
