const multer = require("multer");
const { userRouter } = require("../../routers/user.routers");
const { mkdirp } = require("mkdirp");

const uploadImage = (type) => {
  const made = mkdirp.sync(`./public/images/${type}`);
  const storage = multer.diskStorage({
    destination: function (req , file , cb) {
      cb(null,`./public/images/${type}`); //setup chỗ lưu file
    },
    filename: function (req , file , cb) {
      cb(null,Date.now() + "_" + file.originalname); //đặt lại tên cho file
    }
  });
  const upload = multer({ 
    storage : storage, 
    fileFilter: function (req , file , cb) {
      const extensionImageList = [".png" , ".jpg"];
      const extension = file.originalname.slice(-4);
      const check = extensionImageList.includes(extension);
      if (check) {
        cb(null,true);
      }
      else{
        cb(new Error("Khong hop le!!!"));
      }
    }
  });

  return upload.single(type)
};

module.exports = {
  uploadImage,
};

