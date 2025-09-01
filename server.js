// server.js (только для локального запуска)
require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Local server running on port ${port}`);
});
