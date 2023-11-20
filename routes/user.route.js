const express = require('express');

const router = express.Router();
const multer = require('multer');
const diskStroage = multer.diskStorage({
 destination : (req,file,cb)=>{
  cb(null , 'uploads/profile')
 },
 filename : (req , file , cb)=>{
  console.log(file.originalname.split('.')[0]);
  const ext = file.mimetype.split('/')[1];
  const fileName = `user-profile-${file.originalname.split('.')[0]}-${Date.now()}.${ext}`
  cb(null , fileName)
 }
});
const fileFilter = (req , file , cb)=>{
 const imageType = file.mimetype.split('/')[0];
 if (imageType === 'image') {
  return cb(null , true)
 }else{
  cb("this file must be an image" , false)
 }
}
const upload = multer({storage : diskStroage , fileFilter})

const {getAllUsers , register , login , updateUser , deleteUser} = require('../controller/user.controller');
const verifyToken = require('../middleWare/verifyToken');

router.route('/')
.get(verifyToken,getAllUsers);

router.route('/register')
.post(upload.single('profile'),register);

router.route('/login')
.post(login);

router.route('/update-profile/:id')
.patch(verifyToken , upload.single('profile'),updateUser);

router.route('/delete-profile/:id')
.delete(verifyToken,deleteUser);

module.exports = router;