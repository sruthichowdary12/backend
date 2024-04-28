const mongoose = require("mongoose")
const teacherschema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        },
    fullname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required:true,
      enum: ['male', 'female', 'others']
    },
    qualification: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      default:"klef1234"
    },
  });

const teacher = mongoose.model('teacher', teacherschema);

module.exports = teacher;