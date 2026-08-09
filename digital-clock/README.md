🕐 Digital Timezone Clock
========================

A beautiful, real-time digital clock that displays the current time in multiple time zones around the world.

## Features

✨ **Real-time Updates** - Clock updates every second
🌍 **Multiple Timezones** - Display times from any timezone in the world
➕ **Add Custom Timezones** - Easily add or remove timezones
📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
🎨 **Modern UI** - Beautiful gradient backgrounds and smooth animations
🔌 **REST API** - Full backend API for time zone queries
📅 **Date & Day Display** - Shows date and day of the week for each timezone

## Requirements

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone or navigate to the project directory:
```bash
cd digital-clock
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Start the Server

```bash
npm start
```

The server will run at `http://localhost:3000`

### Development Mode (with auto-reload)

```bash
npm run dev
```

Requires `nodemon` to be installed (included in devDependencies).

## API Endpoints

### Get Times for Default Timezones
```
GET /api/times
```

Response:
```json
{
  "times": [
    {
      "timezone": "America/New_York",
      "time": "14:30:45",
      "date": "2024-01-15",
      "displayName": "Monday, January 15th 2024",
      "offset": "-05:00"
    }
  ]
}
```

### Get Times for Specific Timezones
```
GET /api/times?timezones=America/New_York,Asia/Tokyo,Europe/London
```

### Get Time for Single Timezone
```
GET /api/time/:timezone
```

Example: `/api/time/Asia/Bangkok`

Response:
```json
{
  "timezone": "Asia/Bangkok",
  "time": "02:30:45",
  "date": "2024-01-16",
  "displayName": "Tuesday, January 16th 2024",
  "offset": "+07:00",
  "unix": 1705366245
}
```

### Get All Available Timezones
```
GET /api/timezones
```

Returns an array of all valid IANA timezone identifiers.

## Default Timezones

The application displays these timezones by default:
- America/New_York (EST)
- Europe/London (GMT)
- Asia/Tokyo (JST)
- Australia/Sydney (AEDT)
- America/Los_Angeles (PST)
- Asia/Dubai (GST)
- Asia/Singapore (SGT)
- America/Toronto (EST)

## Adding Custom Timezones

1. Type a timezone name in the input field (e.g., `Asia/Bangkok`, `Europe/Paris`)
2. Click "Add Timezone" or press Enter
3. The timezone will be added to the display and updates in real-time

Popular timezone examples:
- `America/Chicago`
- `Europe/Paris`
- `Asia/Shanghai`
- `Australia/Melbourne`
- `Pacific/Auckland`
- `Africa/Cairo`
- `America/Mexico_City`
- `Asia/Bangkok`

## File Structure

```
digital-clock/
├── server.js              # Express server with API endpoints
├── package.json          # Project dependencies
├── public/
│   ├── index.html        # Main HTML template
│   ├── styles.css        # CSS styling
│   └── script.js         # Client-side JavaScript
└── README.md             # This file
```

## Technologies Used

- **Backend**: Express.js, moment-timezone
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: CSS Grid, Flexbox, CSS Animations
- **Time Handling**: moment-timezone library

## Customization

### Change Default Timezones

Edit the `DEFAULT_TIMEZONES` array in `server.js`:

```javascript
const DEFAULT_TIMEZONES = [
  'America/New_York',
  'Europe/London',
  'Asia/Tokyo',
  // Add your preferred timezones here
];
```

### Customize Colors

Edit the gradient colors in `public/styles.css`:

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Change Update Interval

Edit the interval in `public/script.js`:

```javascript
// Update clocks every second (1000ms)
setInterval(loadClocks, 1000);
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Responsive Breakpoints

- Desktop: Full grid layout with multiple columns
- Tablet: 2-column layout
- Mobile: Single column layout

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Troubleshooting

### Invalid Timezone Error
Make sure you're using IANA timezone identifiers. Check the full list at `/api/timezones`.

### Times Not Updating
Ensure the server is running and JavaScript is enabled in your browser.

### Port Already in Use
Change the PORT in `server.js` or set the environment variable:
```bash
PORT=3001 npm start
```

## Future Enhancements

- [ ] Save favorite timezones to local storage
- [ ] Add analog clock display option
- [ ] Support for 12-hour format preference
- [ ] Timezone search autocomplete
- [ ] DST (Daylight Saving Time) indicators
- [ ] Time zone conversion calculator
- [ ] Export/share timezone groups

---

Made with ❤️ for global teams and world travelers!