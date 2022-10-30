const express = require("express");
var cors = require('cors');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const passengersRoute = require("./routes/passengers");

const app = express();

dotenv.config(); // necessary to use .env variables


//mongo db connection connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database Connection Successfull!"))
.catch((err) =>{
    console.log(err);
});

//check api
app.get("/", (req, res)=>{
    console.log("test is successfull");
    res.send("Connected");
});

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/passengers", passengersRoute);

app.listen(process.env.PORT_NO, ()=>{
    console.log("backend asdasd server is running at: ", process.env.PORT_NO);
});
