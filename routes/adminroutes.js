//admin routes

const admincontroller = require("../controllers/admincontroller")

const express = require("express")
const admin = require("../models/Admin")
const adminrouter  = express.Router()


adminrouter.get("/viewstudents",admincontroller.viewstudents)
adminrouter.delete("/deletestudent/:id",admincontroller.deletestudent)
adminrouter.post("/checkadminlogin",admincontroller.checkadminlogin)
adminrouter.post("/addstudent",admincontroller.addstudent)
adminrouter.post("/addfaculty",admincontroller.addfaculty)
adminrouter.get("/viewfaculties",admincontroller.viewfaculties)
adminrouter.delete("/deletefaculty/:id",admincontroller.deletefaculty)
adminrouter.post("/addcourse",admincontroller.addcourse)
adminrouter.get("/viewcourses",admincontroller.viewcourses)
adminrouter.delete("/deletecourse/:courseid",admincontroller.deletecourse)
adminrouter.put("/changeadminpwd",admincontroller.changeadminpwd)
adminrouter.get("/analysis",admincontroller.analysis)
adminrouter.get("/viewcoursebyid/:courseid",admincontroller.viewCourseById)
adminrouter.get("/viewstudentbyid/:id",admincontroller.viewStudentById)
adminrouter.get("/viewfacultybyid/:id",admincontroller.viewFacultyById)
module.exports = adminrouter