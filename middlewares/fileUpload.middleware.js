const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'temp/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png|gif/;
      const mimeType = fileTypes.test(file.mimetype);
      const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  
      if (mimeType && extName) {
        return cb(null, true);
      }
      cb(new Error('Only images are allowed'));
    },
  });

  module.exports ={
    upload
  }