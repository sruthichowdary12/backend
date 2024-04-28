const mongoose = require("mongoose")

const subjectschema = new mongoose.Schema({
    courseid: {
    type: String,
    required: true,
    },
    coursename: {
      type: String,
      required: true,
    },
   hours: {
      type: String,
      required: true
    },
    file: {
    type: String, //URL
    required: true,
  },
  });

const student = mongoose.model('subject', subjectschema);

module.exports = student;