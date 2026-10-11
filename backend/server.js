require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

// Only this one origin may call the API — not every origin.
app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('To-Do List API is running.');
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
