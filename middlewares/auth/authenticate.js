const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("token");
  try {
    const decode = jwt.verify(token, "key-cua-hung");
    console.log(" decode : ", decode);
    if (decode) {
      req.user = decode;
      return next();
    } else {
      res.status(401).send("Bạn Chưa Đăng Nhập");
    }
  } catch (error) {
    res.status(401).send("Token cua you dau?");
  }
};

module.exports = {
  authenticate,
};
