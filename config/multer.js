const multer = require("multer");

module.exports = multerConf = {
  storage: multer.diskStorage({
    destination: (req, file, next) => next(null, "./public/img"),
    filename: (req, file, next) => {
      const ext = file.mimetype.split("/")[1];
      const newName = file.fieldname + "-" + Date.now() + "." + ext;

      req.body.img = "img/" + newName;
      next(null, newName);
    },
  }),
  fileFilter: (req, file, next) => {
    const isImg = file.mimetype.startsWith("image/");
    if (!file) next();
    if (isImg) next(null, true);
    else {
      next({ message: "Extension not supported!", error: "wrong extension" }, false);
    }
  },
};
