const Student = require("../models/Student")
const Admin = require("../models/Admin")
const Faculty = require("../models/Faculty")
const Course = require("../models/Course")
const csvtojson = require('csvtojson');
const mongoose = require('mongoose');
const multer = require('multer');

const addstudent = async (request, response) => {
    try 
    {
      const input = request.body;
      const student = new Student(input);
      await student.save();
      response.send('Registered Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };

 const viewstudents = async (request, response) => 
 {
    try 
    {
      const students = await Student.find();
      if(students.length==0)
      {
        response.send("DATA NOT FOUND");
      }
      else
      {
        response.json(students);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };


  const deletestudent = async (request, response) => 
 {
    try 
    {
      const id = request.params.id
      const student = await Student.findOne({"id":id})
      if(student!=null)
      {
        await Student.deleteOne({"id":id})
        response.send("Deleted Successfully")
      }
      else
      {
        response.send("ID Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const checkadminlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       const admin = await Admin.findOne(input)
       if(admin){
        response.status(200).json(admin)
       }
       else{
        response.status(404).send("No Admin Found")
       }
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const addfaculty = async (request, response) => {
    try 
    {
      const input = request.body;
      const faculty = new Faculty(input);
      await faculty.save();
      response.send('Added Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };

  const viewfaculties = async (request, response) => 
  {
     try 
     {
       const faculties = await Faculty.find();
       if(faculties.length==0)
       {
         response.send("DATA NOT FOUND");
       }
       else
       {
         response.json(faculties);
       }
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const viewcourses = async (request, response) => 
  {
     try 
     {
       const courses = await Course.find();
       if(courses.length==0)
       {
         response.send("DATA NOT FOUND");
       }
       else
       {
         response.json(courses);
       }
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const viewStudentById = async (request, response) => {
    try {
      const id = request.params.id;
      const student = await Student.findById(id);
      if (!student) {
        response.status(404).send("Student not found");
      } else {
        response.json(student);
      }
    } catch (error) {
      response.status(500).send(error.message);
    }
  };
  
  const viewFacultyById = async (request, response) => {
    try {
      const id = request.params.id;
      const faculty = await Faculty.findById(id);
      if (!faculty) {
        response.status(404).send("faculty not found");
      } else {
        response.json(faculty);
      }
    } catch (error) {
      response.status(500).send(error.message);
    }
  };

  const viewCourseById = async (request, response) => {
    try {
      const courseId = request.params.courseId;
      const course = await Course.findById(courseId);
      if (!course) {
        response.status(404).send("Course not found");
      } else {
        response.json(course);
      }
    } catch (error) {
      response.status(500).send(error.message);
    }
  };
  

   const deletefaculty = async (request, response) => 
 {
    try 
    {
      const id = request.params.id
      const faculty = await Faculty.findOne({"id":id})
      if(faculty!=null)
      {
        await Faculty.deleteOne({"id":id})
        response.send("Deleted Successfully")
      }
      else
      {
        response.send("ID Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const deletecourse = async (request, response) => 
 {
    try 
    {
      const courseid = request.params.courseid
      const course = await Course.findOne({"courseid":courseid})
      if(course!=null)
      {
        await Course.deleteOne({"courseid":courseid})
        response.send("Deleted Successfully")
      }
      else
      {
        response.send("ID Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const addcourse = async (request, response) => {
    try 
    {
      const input = request.body;
      const course = new Course(input);
      await course.save();
      response.send('Registered Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };


  const changeadminpwd = async (request, response) => {
    try 
    {
      const { username, oldpassword, newpassword } = request.body;

      const admin = await Admin.findOne({ username, password: oldpassword });
      
       if (!admin) 
      {
        response.status(400).send('Invalid Old Password');
      }
      else
      {
          if(oldpassword==newpassword)
          {
            response.status(400).send('Both Passwords are Same');
          }
          else
          {
            await Admin.updateOne({username},{ $set: { password: newpassword } });
             response.json('Password Updated Successfully');
          }
        
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };
  
  
const analysis = async (req, res) => {
  try 
  {
      const CourseCount = await Course.countDocuments();
      const FacultyCount = await Faculty.countDocuments();
      const StudentCount = await Student.countDocuments();
      res.json({CourseCount,StudentCount,FacultyCount});
  } 
  catch (error) 
  {
      res.status(500).send(error.message);
  }
};





  module.exports = {viewFacultyById,viewStudentById,viewcourses,deletecourse,addcourse,addstudent,viewstudents,deletestudent,checkadminlogin,addfaculty,viewfaculties,deletefaculty,changeadminpwd,analysis,viewCourseById}
