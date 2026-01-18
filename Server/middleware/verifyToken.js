import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized- Invalid token" });

    req.userId = decode.userId;
    req.role = decode.role;

    next();
  } catch (error) {
    console.log("Error in verifyToken", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const isAdmin = (req, res, next) => {
  //console.log("User Role:", req.role);
  if (req.role !== "admin") {
    return res
      .status(403)
      .json({ success: false, message: "Forbidden - Admins only" });
  }
  next();
};

export const checkTokenOptional = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    req.userId = null;
    req.role = null;
    return next();
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode.userId;
    req.role = decode.role;
    next();
  } catch (err) {
    req.userId = null;
    req.role = null;
    next();
  }
};
