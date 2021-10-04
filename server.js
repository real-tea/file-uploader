const express = require('express');
const upload = require("express-fileupload")

const app = express();

app.use(upload);

app.post('/uplaod',(req,res)=>{
    if(req.files === null){
        return res.status(400).json({message : "File not found"})
    }
    const file = req.files.file;
    
    file.mv(`${__dirname}/client/public/uploads/{file.name}`,err => {
        if(err){
            console.log(err)
            return res.status(500).send(err)
        }
        res.send({fileName : file.name, filePath : `/uploads/{file.name}`})
    })
})

app.listen(5000,()=>{console.log("server started")})