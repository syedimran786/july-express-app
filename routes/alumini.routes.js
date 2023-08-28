const express = require('express')
const { addAlumini, getAluminis, addAluminiFromExcel } = require('../controllers/alumini.controller')
const multer = require('multer')

let router=express.Router();

//! image upload code starts
// const mystorage = multer.diskStorage({
    
//     destination: function (req, file, cb) {
//         cb(null, './public/uploads')
//       },
//       filename: function (req, file, cb) {
        
//         cb(null, file.originalname)
//       }
// })

 //! image upload code ends

//! exel Upload
const mystorage = multer.diskStorage({
    
  destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
})

const upload = multer({ storage: mystorage })


  

router.post("/addalumini",upload.single("profile"),addAlumini)
router.get("/getaluminis",getAluminis)
router.post("/addexcelalumini",upload.single("excel"),addAluminiFromExcel)




module.exports=router
