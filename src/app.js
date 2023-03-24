const express = require('express');
const app = express();
const jsonParser = express.json();
const { validateData } = require('./utils/validateReqData');
const { sendSMS } = require('./utils/sms');
const db = require('./utils/db');
const {
  REQUIRED_FIELDS_ALARM,
  REQUIRED_FIELDS_MEASUREMENT,
} = require('./constants/requiredFields');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 3000;

// Create a router instance
// const inboxRouter = express.Router();

// Define routes for the inboxRouter
// inboxRouter.get('/', (req, res) => {
app.get('/', (req, res) => {
  res.send('Welcome to the RM EXPERT ASSISTANT home page');
});

app.get('/api/inbox', (req, res) => {
  res.send('Welcome to the RM EXPERT ASSISTANT inbox');
});

app.post('/api/inbox/alarms', jsonParser, async (req, res) => {
  const deviceId = 1;

  try {
    validateData(req.body, REQUIRED_FIELDS_ALARM);
    console.log('Alarm data is valid');
    db.insertAlarm(deviceId, req.body)
      .then((result) => {
        const message = 'ALERT: High temperature detected!';
        const to = '+380992521472';
        sendSMS(message, to);
        return res.status(200).json({ message: 'Data inserted into database' });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ message: 'Error inserting data into database' });
      });
  } catch (err) {
    console.error('Error validating data:', err.message);
    return res.status(400).json({ message: err.message });
  }
});

app.post('/api/inbox/datas', jsonParser, async (req, res) => {
  const deviceId = 1;

  try {
    validateData(req.body, REQUIRED_FIELDS_MEASUREMENT);
    console.log('Measurement data is valid');
    db.insertData(deviceId, req.body)
      .then((result) => {
        return res.status(200).json({ message: 'Data inserted into database' });
      })
      .catch((err) => {
        return res
          .status(500)
          .json({ message: 'Error inserting data into database' });
      });
  } catch (err) {
    console.error('Error validating data:', err.message);
    return res.status(400).json({ message: err.message });
  }
});

// Mount the router to the /api/inbox route
// app.use('/api/inbox', inboxRouter);

// Start the server on port 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
