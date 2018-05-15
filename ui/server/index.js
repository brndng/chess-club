const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client/dist/index.html')));

app.listen(PORT, () => console.log(`serving static files on port: ${PORT}`));