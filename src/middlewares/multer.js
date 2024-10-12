import multer from "multer";
import path from "path"

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory to store the uploaded files
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    // Create a unique filename using the original name and a timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname).toLowerCase();
    cb(null, uniqueSuffix + fileExtension);
  },
});

// Initialize multer with the storage configuration
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Allow only image files
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed'));
  },
});

export default upload;