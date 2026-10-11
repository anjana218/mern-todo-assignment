const mongoose = require('mongoose');

// A Task has a title, a completed flag, and a creation timestamp.
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', taskSchema);
