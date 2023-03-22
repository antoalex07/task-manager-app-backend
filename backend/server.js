const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const Task = require("./models/taskModel");
const taskRoute = require("./routes/taskRoute");
const cors = require("cors");

const app = express();

//create Middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000/", "https://task-manager-app-my06.onrender.com"]
}));
app.use("/api/tasks", taskRoute);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://task-manager-app-my06.onrender.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// create Routes

app.get("/" , (req , res) => {
    res.send("Home Page");
});

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT , () => {
            console.log('Server running on port ' + PORT);
        });
    })
    .catch((err) => {
        console.log(err);
    }); 

// const logger = (req , res , next) => {
//     console.log("Middleware ran");
//     console.log(req.method);
//     next();
// };

// Use this inside server.js to connect to mongoDB and start Server(Index Page);    

// const startServer = async () => {
//     try {
//         await connectDB();

//         app.listen(PORT , () => {
//             console.log('Server running on port ' + PORT);
//         });

//     } catch (error) {
//         console.log(error);
//     }
// };
// startServer();
