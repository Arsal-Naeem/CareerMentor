import jwt from "jsonwebtoken";

const generateTokenSetCookie = (res, userId,role) => {
  // Generate JWT token
  const token = jwt.sign({ userId,role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Set the cookie in the response
  res.cookie("token", token, {
    httpOnly: true, //XSS atack protection
    secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateTokenSetCookie;