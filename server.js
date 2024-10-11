const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const quoteRoutes = require('./routes/quoteRoutes');
const sequelize = require('./db'); // Use the new db.js

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files
app.use('/quotes', quoteRoutes);

// Sync database and start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
