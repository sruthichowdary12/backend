const Faculty = require("../models/Faculty")
const multer = require('multer');
const path = require('path')
const fs = require('fs')
const Material = require("../models/Material")

const checkfacultylogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       const faculty = await Faculty.findOne(input)
       if(faculty){
        response.status(200).json(faculty)
       }
       else{
        response.status(404).send("No Faculty Found")
       }
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const changefacultypwd = async (request, response) => {
    try 
    {
      const { username, oldpassword, newpassword } = request.body;

      const faculty = await Faculty.findOne({ username, password: oldpassword });
      
       if (!faculty) 
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
            await Faculty.updateOne({username},{ $set: { password: newpassword } });
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
  const uploadmaterial = async (req, res) =>
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
          
          const { title, description } = req.body;
          const fileName = req.file ? req.file.filename : undefined; // Extracting file name
    
          const newmaterial = new Material({
            
            title,
            description,
            file: fileName // Save only the file name
          });
    
          await newmaterial.save();
          res.status(200).send('materail Added Successfully');
        });
      } 
      catch (error) 
      {
        console.error(error);
        res.status(500).send(error.message);
      }
    };
 module.exports = {uploadmaterial,checkfacultylogin,changefacultypwd}