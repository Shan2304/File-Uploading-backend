const { restart } = require("nodemon");
const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localfileupload -> handler function

exports.localFileUpload = async (req, res) => {
    try {

        //fetch filefrom request
        const file = req.files.file;
        console.log("FILE AAGYI JEE -> ",file);


        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH-> ", path)

        //add path to the move fucntion
        file.mv(path , (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true,
            message:'Local File Uploaded Successfully',
        });

    }
    catch(error) {
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}

function isFileTypeSupported(type,supportedType){
    return supportedType.includes(type);
}

async function uploadFileToCloudinary(file, folder,quality){
    const options = {folder};
    options.resource_type="auto";
    if(quality){
        options.quality=quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}
//image upload handler....

exports.imageUpload = async (req,res) => {
    try{
        //data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;

        //validation
        const supportedType = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
       // if the file formate is not supported
        if(!isFileTypeSupported(fileType,supportedType)){
            return res.status(400).json({
                success:false,
                message:'file formate is not supported',
            })
        }

        // if the file formate is supported
        const response = await uploadFileToCloudinary(file, "ShanKK");
        console.log(response);

       // set a entry in db also
      
       const fileData = await File.create({
        name,
        tags,
        email,
        imageUrl:response.secure_url,
       })

      res.json({
        success:true,
        imageUrl:response.secure_url,
        message:'image is successfully uploaded',
      })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:'not able to upload the image at the cloudinary',
        })
    }
}

// vider upload handler...

exports.videoUpload = async (req,res)=>{
    try{
          //data fetch
          const {name,tags,email} = req.body;
          console.log(name,tags,email);
          const file = req.files.videoFile;

          //validation
        const supportedType = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
       // if the file formate is not supported
        if(!isFileTypeSupported(fileType,supportedType)){
            return res.status(400).json({
                success:false,
                message:'file formate is not supported',
            })
        }

      // if the file formate is supported
      const response = await uploadFileToCloudinary(file, "ShanKK");
      console.log(response);

       // set a entry in db also
      
       const fileData = await File.create({
        name,
        tags,
        email,
        videoUrl:response.secure_url,
       })
      
       res.json({
        success:true,
        videoUrl:response.secure_url,
        message:'Video is successfully uploaded',
      })
  
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:'not able to upload the vider at the cloudinary',
        })
    }
}


exports.imageSizeReducer = async (req,res) =>{
    try{
          //data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;

        //validation
        const supportedType = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
       // if the file formate is not supported
        if(!isFileTypeSupported(fileType,supportedType)){
            return res.status(400).json({
                success:false,
                message:'file formate is not supported',
            })
        }

        // if the file formate is supported
        const response = await uploadFileToCloudinary(file, "ShanKK",30);
        console.log(response);

       // set a entry in db also
      
       const fileData = await File.create({
        name,
        tags,
        email,
        imageUrl:response.secure_url,
       })

      res.json({
        success:true,
        imageUrl:response.secure_url,
        message:'image is successfully uploaded',
      })
    }
    catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:'not able to upload the reduced file at the cloudinary',
        })
    }
} 