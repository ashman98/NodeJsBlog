require('dotenv').config();

const app = require('./app');         // твой Express-приложение
const connectDB = require('./server/config/db');  // подключение к Mongo

const port = process.env.PORT || 3000;

// Сначала подключаемся к базе данных
connectDB()
  .then(() => {
    // Только после успешного подключения запускаем сервер
    app.listen(port, () => {
      console.log(`✅ Local server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // Останавливаем процесс, если база не подключена
  });
