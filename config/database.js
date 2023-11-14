const mongoose = require("mongoose");
require("dotenv").config();
exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then( ()=>{
        console.log("db connected successfully");
    })

    .catch((error)=>{
        console.log("Issues in the database connection");
        console.error(error.message);
        process.exit(1);
    })
}