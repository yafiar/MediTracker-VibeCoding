const multer = require('multer');
const path = require('path');
const imagekit = require('../config/imagekit');

// Use memory storage (don't save to disk)
const storage = multer.memoryStorage();

// File filter (only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter
});

// Helper function to upload buffer to ImageKit
async function uploadToImageKit(req, file) {
  const userId = req.user?._id?.toString?.() || req.user?.id?.toString?.() || 'anonymous';
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const ext = path.extname(file.originalname).toLowerCase();
  const fileName = `${userId}/${uniqueSuffix}${ext}`;

  if (!imagekit || !process.env.IMAGEKIT_URL_ENDPOINT) {
    throw new Error('ImageKit is not configured properly');
  }

  const result = await imagekit.upload({
    file: file.buffer, // Use buffer from memory storage
    fileName,
    folder: process.env.IMAGEKIT_FOLDER || '/meditracker',
    useUniqueFileName: false,
    isPrivateFile: false
  });

  return {
    url: result.url,
    fileId: result.fileId
  };
}

module.exports = {
  upload,
  uploadToImageKit
};