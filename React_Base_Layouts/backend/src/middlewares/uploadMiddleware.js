import multer from "multer";
import path from "path";

// File validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "video/mp4"];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error(`Unsupported file type: ${file.mimetype}`), false);
};

// Disk storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

// Helper for route fields
export const uploadFields = (fields) => upload.fields(fields);
