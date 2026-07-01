const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

const uploadImage = async (req,res) =>{
    try{
        if(!req.file){
            return res.status(400).json({
                message : "No file uploaded"
            })
        }
        const stream = cloudinary.uploader.upload_stream(
            {
                folder : "AUCart",
            },
            (error,result) => {
                if(error){
                    return res.status(500).json(error);
                }
                res.json({
                    imageUrl : result.secure_url
                });
            }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
    }
    catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}

module.exports = { uploadImage };