const express = require('express');
const path = require('path');

const server = express();
const PORT = 3000;

// server.use(express.static(path.join(__dirname, '../client/dist')));

server.get('*', (req,res) => res.send('hello from server!'));

server.listen(PORT, () => console.log(`Listening on PORT ${PORT}!`));

