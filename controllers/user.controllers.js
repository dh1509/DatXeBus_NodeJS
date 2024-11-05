const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  try {
    // tạo ra một chuỗi ngẫu nhiên
    const salt = bcrypt.genSaltSync(10);
    // mã hóa salt + password
    const hashPassword = bcrypt.hashSync(password, salt);
    const newUser = await User.create({ name, email, password : hashPassword ,phoneNumber});
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // b1 : tìm ra user đang đăng nhập dựa trên trên email
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    // b2 : kiểm mật khẩu có đúng hay không

    const isAuth = bcrypt.compareSync(password, user.password);
    console.log("isAuth : ", isAuth);
    if (isAuth) {
      const token = jwt.sign({ email: user.email, type: user.type }, "key-cua-hung", { expiresIn: 60 * 60 });
      res.status(200).send({ message: "Đăng Nhập Thành Công ! ", token });
    } else {
      res.status(500).send({ message: "Tài khoãng hoặc mật khẩu không đúng" });
    }
  } else {
    res.status(404).send({ message: "Không tìm thấy email phù hợp" });
  }
};

module.exports = {
  register,
  login,
};
