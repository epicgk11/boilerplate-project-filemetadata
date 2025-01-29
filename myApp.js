const express = require("express");
const fileRouter = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: './uploads/'
})

const upload = multer({storage:storage}).single("upfile");

fileRouter.post("/api/fileanalyse",(req,res)=>{
    upload(req,res,(err)=>{
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'Please send file' });
        }
        res.json({name:req.file.originalname,
                  type:req.file.mimetype,
                  size:req.file.size});
    })
})

module.exports = {fileRouter};