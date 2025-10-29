import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({
      status: 108,
      message: "Token tidak valid atau kadaluwarsa",
      data: "null",
    });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ status: 108, message: "Token tidak valid", data: "null" });

    const now = Math.floor(Date.now() / 1000);
    const maxAge = 12 * 60 * 60;

    if (user.iat && now - user.iat > maxAge) {
      return res.status(401).json({
        status: 108,
        message: "Token tidak valid atau kadaluwarsa",
        data: "null",
      });
    }

    req.user = user;
    next();
  });
};
