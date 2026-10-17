const express = require('express');
const Router = express.Router();
const path = require('path');

Router.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../public/index.html'));
})

module.exports = Router;