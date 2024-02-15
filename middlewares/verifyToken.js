import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const secretToken = process.env.SECRET_TOKEN;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secretToken, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });

  // CHECKING FOR ADMIN => SHOULD GO IN SEPARATE MIDDLEWARE

  // if (token) {
  //   const decoded = jwt.verify(token, secretToken, (err, decoded) => {
  //     if (err) {
  //       return res.status(403).send("Forbidden. Invalid token");
  //     }
  //     if (!decoded.admin) {
  //       return res.status(403).send("Forbidden. Only admins can access.");
  //     }
  //     if (decoded.admin) {
  //       req.user = decoded;
  //       next();
  //     }
  //   });
  // } else {
  //   return res
  //     .status(403)
  //     .send("You are not allowed to add new Students or Countries.");
  // }
};
