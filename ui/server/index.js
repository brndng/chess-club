const express = require('express');
const path = require('path');

const server = express();
const PORT = 3000;

server.use(express.static(path.join(__dirname, '../client/dist')));

// server.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client/dist/index.html')));

server.listen(PORT, () => console.log('serving static files on port ', PORT));