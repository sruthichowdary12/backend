const Student = require("../models/Student")
const multer = require('multer');
const Course = require("../models/Course")
  
const checkstudentlogin = async (request, response) => 
{
   try 
   {
     const input = request.body
     const student = await Student.findOne(input)
     if(student){
      response.status(200).json(student)
     }
     else{
      response.status(404).send("No Student Found")
     }
   } 
   catch (error) 
   {
     response.status(500).send(error.message);
   }
 };

 const changestudentpwd = async (request, response) => {
  try 
  {
    const { username, oldpassword, newpassword } = request.body;

    const student = await Student.findOne({ username, password: oldpassword });
    
     if (!student) 
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
          await Student.updateOne({username},{ $set: { password: newpassword } });
           response.json('Password Updated Successfully');
        }
      
    }
  } 
  catch (error) 
  {
    response.status(500).send(error.message);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './media/'); // Destination folder
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // File naming convention
  }
});

const upload = multer({ storage: storage }).single('file');

const addassignment = async (req, res) =>
{
  try 
  {
    upload(req, res, async function (err) 
    {
      if (err) 
      {
        console.error(err);
        return res.status(500).send(err.message);
      }
      
      const { courseid, coursename } = req.body;
      const fileName = req.file ? req.file.filename : undefined; // Extracting file name

      const newassignemnt = new Course({
        courseid,
        coursename,
        file: fileName // Save only the file name
      });

      await newassignemnt.save();
      res.status(200).send('Assignment Added Successfully');
    });
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).send(error.message);
  }
};

  module.exports = {addassignment,checkstudentlogin,changestudentpwd}