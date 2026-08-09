const express = require('express');
const moment = require('moment-timezone');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Default time zones to display
const DEFAULT_TIMEZONES = [
  'America/New_York',
  'Europe/London',
  'Asia/Tokyo',
  'Australia/Sydney',
  'America/Los_Angeles',
  'Asia/Dubai',
  'Asia/Singapore',
  'America/Toronto'
];

// Get current time for all time zones
app.get('/api/times', (req, res) => {
  const timezones = req.query.timezones ? req.query.timezones.split(',') : DEFAULT_TIMEZONES;
  
  const times = timezones.map(tz => {
    try {
      const time = moment().tz(tz);
      return {
        timezone: tz,
        time: time.format('HH:mm:ss'),
        date: time.format('YYYY-MM-DD'),
        displayName: time.format('dddd, MMMM Do YYYY'),
        offset: time.format('Z')
      };
    } catch (error) {
      return {
        timezone: tz,
        error: `Invalid timezone: ${tz}`
      };
    }
  });
  
  res.json({ times });
});

// Get list of all available timezones
app.get('/api/timezones', (req, res) => {
  const allTimezones = moment.tz.names();
  res.json({ timezones: allTimezones });
});

// Get time for a specific timezone
app.get('/api/time/:timezone', (req, res) => {
  const tz = req.params.timezone;
  
  try {
    const time = moment().tz(tz);
    res.json({
      timezone: tz,
      time: time.format('HH:mm:ss'),
      date: time.format('YYYY-MM-DD'),
      displayName: time.format('dddd, MMMM Do YYYY'),
      offset: time.format('Z'),
      unix: time.unix()
    });
  } catch (error) {
    res.status(400).json({
      error: `Invalid timezone: ${tz}`
    });
  }
});

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🕐 Digital Timezone Clock running at http://localhost:${PORT}`);
});