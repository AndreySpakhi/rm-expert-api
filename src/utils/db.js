const mysql = require('mysql2/promise');
require('dotenv').config();

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'rm-expert',
// });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  // ssl: { ca: fs.readFileSync('{ca-cert filename}') },
});

async function insertAlarm(deviceId, data) {
  const {
    timestamp,
    ConditionID,
    Event,
    Condition_name,
    Input_channel,
    Condition_type,
    Threshold,
    Value,
  } = data;

  try {
    const connection = await pool.getConnection();
    const result = await connection.query(
      'INSERT INTO alarms (timestamp, ConditionID, Event, Condition_name, Input_channel, Condition_type, Threshold, Value, DeviceID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        timestamp,
        ConditionID,
        Event,
        Condition_name,
        Input_channel,
        Condition_type,
        Threshold,
        Value,
        deviceId,
      ]
    );
    connection.release();
    return result;
  } catch (err) {
    console.error('Error inserting data into database:', err);
    throw err;
  }
}

async function insertData(deviceId, data) {
  const { timestamp, FO1, FO2, FO3, FO4, TopOil, Load_A, Load_B, Load_C } =
    data;

  try {
    const connection = await pool.getConnection();
    const result = await connection.query(
      'INSERT INTO measurements (timestamp, FO1, FO2, FO3, FO4, TopOil, Load_A, Load_B, Load_C, DeviceID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [timestamp, FO1, FO2, FO3, FO4, TopOil, Load_A, Load_B, Load_C, deviceId]
    );
    connection.release();
    return result;
  } catch (err) {
    console.error('Error inserting data into database:', err);
    throw err;
  }
}

module.exports = {
  insertAlarm,
  insertData,
};
