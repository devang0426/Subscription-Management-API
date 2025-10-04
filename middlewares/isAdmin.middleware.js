const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next(); // Allow access
  }

  return res.status(403).json({
    success: false,
    message: "Access denied. Admins only.",
  });
};

export default isAdmin;
