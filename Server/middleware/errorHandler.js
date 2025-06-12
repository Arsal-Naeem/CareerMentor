import multer from "multer";

export const errorHandler = (err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      message: "Image size should not exceed 5 MB",
    });
  }

  if (err.message && err.message.includes("Only JPG")) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  console.error("Unhandled error:", err);
  return res.status(500).json({
    success: false,
    message: "Something went wrong on the server",
  });
};