const express = require("express");

const router = express.Router();
const multer = require('multer');
const diskStorage = multer.diskStorage({
 destination : (req,file,cb)=>{
  cb(null , 'uploads/image-book');
 },
 filename : (req , file , cb)=>{
  // console.log(file.originalname.split('.')[0]);
  console.log(file);
  const ext = file.mimetype.split('/')[1];
  const fileName = `book-image-${file.originalname.split('.')[0]}-${Date.now()}.${ext}`
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
const uploadImage = multer({storage : diskStorage , fileFilter });

// const diskStoragePdf = multer.diskStorage({
//  destination : (req,file,cb)=>{
//   cb(null , 'uploads/book/pdf')
//  },
//  filename : (req , file , cb)=>{
//   // console.log(file.originalname.split('.')[0]);
//   console.log(file);

//   const ext = file.mimetype.split('/')[1];
//   const fileName = `files-${file.originalname.split('.')[0]}-${Date.now()}.${ext}`
//   cb(null , fileName)
//  }
// });
// const fileFilterPdf = (req , file , cb)=>{
//  console.log(file);
//  const fileType = file.mimetype.split('/')[0];
//  if (fileType === 'application') {
//   return cb(null , true)
//  }else{
//   cb("this file must be an file" , false)
//  }
// }
// const uploadFile = multer({storage : diskStoragePdf , fileFilter : fileFilterPdf});


const {addBook , getAllBooks , get_single_book , update_book , delete_book} = require('../controller/books.controller');
const verifyToken = require("../middleWare/verifyToken");
const allowedTo = require("../middleWare/allowedTo");

router.route('/add-book')
.post(verifyToken,allowedTo('admin', 'manager') , uploadImage.single('image') , addBook);

router.route('/')
.get(verifyToken,getAllBooks);

router.route('/view/:id')
.get(verifyToken, get_single_book); 

router.route('/update/:id')
.patch(verifyToken,allowedTo('admin', 'manager') , uploadImage.single('image') , update_book);

router.route('/delete/:id')
.delete(verifyToken, allowedTo('admin', 'manager') ,  delete_book)

module.exports = router;