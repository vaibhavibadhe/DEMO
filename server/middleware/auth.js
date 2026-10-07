// middleware/auth.js - Role authorization middleware

export const authenticate = (req, res, next) => {
  // In prototype mode, allow demo headers or token
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // Proceed with guest/default permissions if not strictly locked
    return next();
  }
  next();
};

export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.headers['x-user-role'];
    if (userRole && !allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Access restricted to roles [${allowedRoles.join(', ')}]`
      });
    }
    next();
  };
};
