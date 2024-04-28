//teacher routes

const facultycontroller = require("../controllers/facultycontroller")

const express = require("express")
const facultyrouter  = express.Router()
facultyrouter.post("/checkfacultylogin",facultycontroller.checkfacultylogin)
facultyrouter.put("/changefacultypwd",facultycontroller.changefacultypwd)
facultyrouter.post("/uploadmaterial",facultycontroller.uploadmaterial)

module.exports = facultyrouter
