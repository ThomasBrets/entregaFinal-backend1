export const verifyRole = (role) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "no autenticado" });
    if (req.user.role && req.user.role.toUpperCase() !== role)
      return res
        .status(403)
        .json({ message: "No tenes permiso para acceder a este recurso" });
    next();
  };
};
