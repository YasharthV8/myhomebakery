const express = require('express');
const path = require('path');
const routes = require('./routes/routes')

const app = express();

import { inject } from '@vercel/analytics';
 
inject();

// Rouets
app.use('/', routes);

module.exports = app;

app.use(express.static(path.join(__dirname, '../public')));
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}