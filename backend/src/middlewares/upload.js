import multer from "multer";
import fs from "fs";

// Ensure folder exists
const ensureFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

// CATEGORY STORAGE
ensureFolder("src/uploads/categories");
const categoryStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/uploads/categories"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

export const uploadCategory = multer({ storage: categoryStorage });

// BRAND STORAGE
ensureFolder("src/uploads/brandLogo");
ensureFolder("src/uploads/brandImage");

const brandStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "brandLogo") cb(null, "src/uploads/brandLogo");
    if (file.fieldname === "brandImage") cb(null, "src/uploads/brandImage");
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

// PROFILE STORAGE
ensureFolder("src/uploads/profileDocuments");
ensureFolder("src/uploads/profilePhotos");

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "qualificationDoc") cb(null, "src/uploads/profileDocuments");
    if (file.fieldname === "photo") cb(null, "src/uploads/profilePhotos");
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const profileUpload = multer({ storage: profileStorage });

export const uploadProfile = (req, res, next) => {

  profileUpload.any()(req, res, function (err) {
    if (err) return res.status(400).json({ msg: "File upload error", err });
    next();
  });
};



export const uploadBrand = multer({ storage: brandStorage });
