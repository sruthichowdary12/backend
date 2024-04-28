const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

//MongoDB Compass Connection
const dburl = process.env.mongodburl
mongoose.connect(dburl).then(() => {
    console.log("Connected to MongoDB Atlas Successfully")
}).catch((err) => {
    console.log(err.message)
});

// mongoose.connect(dburl).then(() => {
//     console.log("Connected to DB Successfully")
// }).catch((err) => {
//     console.log(err.message)
// });


const app = express() 
app.use(cors())
app.use(express.json())  // to parse JSON data

const adminrouter = require("./routes/adminroutes")
const studentrouter = require("./routes/studentroutes")
const facultyrouter = require("./routes/facultyroutes")

app.use("",adminrouter) // to include all admin routes
app.use("",studentrouter) // to include all job seeker routes
app.use("",facultyrouter) // to include all recruiter routes

const port=2014
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})