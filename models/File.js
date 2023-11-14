const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

//post middlewere..
fileSchema.post("save", async function(doc){
    try{
      console.log("doc",doc)

      //transporter
      let transpoter = nodemailer.createTransport({
        host:process.env.MAIL_HOST,
        auth:{
             user:process.env.MAIL_USER,
             pass: process.env.MAIL_PASS,
        },
      });

      let info = await transpoter.sendMail({
        from:`shantanu from skk`,
        to:doc.email,
        sunject:"new file uploaded at cloudinary",
        html:`<h2>hello dosto</h2> <p>file uploaded</p> view here <a herf="${doc.imageUrl}">${doc.imageUrl}</a>`,
      })
      console.log("INFO",info);
    }
    catch(error){
      console.log(error)
    }
})

const File = mongoose.model("File",fileSchema);
module.exports = File;