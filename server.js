const express = require('express');
const path = require('path');
const http = require('http');
const app = express();

// Angular DIST output folder
app.use(express.static(path.join(__dirname, '')));

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'maytinh.html'));
});

const port = process.env.PORT || '3001';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Running on localhost:${port}`);
}); 