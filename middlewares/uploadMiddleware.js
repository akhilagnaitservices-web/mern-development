import multer from "multer";
import path from "path";
import fs from "fs";

// DYNAMIC STORAGE
const storage = (folderName) => {

  return multer.diskStorage({

    destination: (req, file, cb) => {

      const uploadPath = path.join(
        "uploads",
        folderName
      );

      fs.mkdirSync(uploadPath, {
        recursive: true
      });

      cb(null, uploadPath);

    },

    filename: (req, file, cb) => {

      const uniqueName =
        Date.now() +
        "-" +
        Math.round(Math.random() * 1E9) +
        path.extname(file.originalname);

      cb(null, uniqueName);

    }

  });

};



// FILE FILTER
const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp"
  ];

  if (allowedTypes.includes(file.mimetype)) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed"
      ),
      false
    );

  }

};



// DYNAMIC UPLOAD FUNCTION
const upload = (folderName) => {

  return multer({

    storage: storage(folderName),

    limits: {
      fileSize: 2 * 1024 * 1024 // 5MB
    },

    fileFilter

  });

};

export default upload;