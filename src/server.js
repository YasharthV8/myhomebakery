const express = require('express');
const path = require('path');
const routes = require('./routes/routes')

const PORT = 8000;

const app = express();

// Rouets
app.use('/', routes)

app.use(express.static(path.join(__dirname, '../public')));
app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`)
});