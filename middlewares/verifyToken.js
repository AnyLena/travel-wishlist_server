import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  const secretToken = process.env.SECRET_TOKEN;
  try {
    if (token) {
      const decoded = jwt.verify(token, secretToken, (err, decoded) => {
        if (err) {
          return res.status(403).send("Forbidden. Invalid token");
        }
        if (!decoded.admin) {
          return res
            .status(403)
            .send(
              "Forbidden. Only admins can access."
            );
        }
        if (decoded.admin) {
          req.user = decoded;
          next();
        }
      });
    } else {
      return res
        .status(403)
        .send("You are not allowed to add new Students or Countries.");
    }
  } catch (error) {
    res.sendStatus(403);
  }
};
