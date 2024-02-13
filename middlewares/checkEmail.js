import User from "../models/User.js";

export const checkEmail = async (req, res, next) => {
  let email = req.body.email;

  const data = await User.findOne({ email: email });

  if (req.method === "POST") {
    if (data) {
      res.status(409).send('From Middleware: User aready exists');
    } else {
      next();
    }
  }

  if (req.method === "GET") {
    if (data) {
      req.data = data;
      next();
    } else {
      res.status(404).send('From Middleware: User not available');
    }
  }
};
