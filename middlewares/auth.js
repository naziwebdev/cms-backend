const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const token = req.cookies["token"];

  if (!token) {
    return res.redirect("http://localhost:5173/login");
  }

  try {
    const payloadToken = jwt.verify(token, process.env.SECRET_KEY);

    const user = await userModel
      .findOne({ _id: payloadToken.id }, "-password")
      .lean();

    req.user = user;

    next();
  } catch (err) {
    return res.json(err);
  }
};
