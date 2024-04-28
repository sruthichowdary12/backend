const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  file: {
    type: String, //URL
    required: true,
  },
});

const material = mongoose.model('Material', materialSchema);

module.exports = material;