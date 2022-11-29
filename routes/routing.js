const express = require('express');
const bodyParser = require('body-parser');
const Router = express.Router();
const {registration} = require("../db/registration-model");
const {newPost} = require("../db/registration-model");
const app = express();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const exp = require('constants');

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now()+file.originalname)
    }
});
  

  const upload = multer({ storage: storage })

Router.route('/signup').post((req,res,next)=>{
    console.log("in signup route")
    console.log(req.body);
    data = registration.find()
    console.log(`printing data using ${data}`);
    console.log(data);
    // console.log(req);
    registration.create(req.body,(error,data)=>{
        if(error){
            return next(error)
        }else{
            res.json(data)
        }
    })
})

Router.route('/feed').get((req,res)=>{
    console.log("in feeds page")
    newPost.find((error,result)=>{
        if(error){
            console.log("getting a error");
            return next(error)
        }else{
            console.log(result);
            res.json(result);
        }
    });
})

Router.route('/login/:id').get((req,res,next)=>{
    id = req.params.id;
    console.log(id);
    registration.findOne({username:id},(error,data)=>{
        if(error){
            console.log("getting a error");
            return next(error)
        }else{
            res.json(data)
        }
    })
})

Router.route('/newpost/:username').post(upload.single('file'),(req, res, next)=>{
    console.log(req.params);
    console.log(req.file);
    // console.log(path.normalize(__dirname + '//..//uploads/' + req.file.filename));
    console.log(`http://localhost:3000/${req.file.filename}`)
    imageFilePath = `http://localhost:3000/${req.file.filename}`
    const post = new newPost({
        userName: req.params.username,
        description: req.body.description,
        post : imageFilePath,
        profileImage : req.body.profileImage
      });
     
      post.save(function (err, result) {
        if (err){
          console.log(err);
        }
        console.log("result")
      });
      userName = req.params.username;
      description = req.body.description;
      console.log(req.body);
    res.json({'username':userName,'description':description})
})

Router.route('/like-post/:id').post((req,res,next)=>{
    console.log("====================Yaha tk aa gaye")
    postId = req.params.id
    like = req.body.like;
    console.log(postId,like);
    let filter = { _id: postId };
    let update = { like: like };
    // newPost.findOne({_id:'636e9ecc7ce3a187c1a7c1cb'},function(err,res){
    //     console.log(res);
    // })
    newPost.findOneAndUpdate(filter,update,{new : true},function(err,res){
        console.log(res);
    });
    // console.log(doc.like);

    res.json({"chala bsdk":"gaand marao"});
})

Router.route('/add-profile-picture/:id').post(upload.single('file'),(req,res,next)=>{
    imageFilePath = `http://localhost:3000/${req.file.filename}`
    userName = req.params.id;
    let filter = { username : userName };
    let update = { profileImage: imageFilePath };
    console.log()
    registration.findOneAndUpdate(filter,update,{new : true},function(err,res){
        console.log(res);
    });
    res.json({"success":"true"})
})

Router.route('/get-all-users').get((req,res,next)=>{
    console.log("Getting a get all user request")
    registration.find((error,result)=>{
        if(error){
            console.log("getting a error");
            return next(error)
        }else{
            console.log(result);
            res.json(result);
        }
    });
})

module.exports = Router;


 // console.log(req.file.filename);
 