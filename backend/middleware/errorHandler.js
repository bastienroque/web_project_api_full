const errorHandler = (err, req, res, next) => {
  // Verificar tipo de erro
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "Dados inválidos" });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(404).json({ message: "Recurso não encontrado" });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Token inválido" });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token expirado" });
  }
  console.error(err);
  res.status(500).json({ message: "Erro interno do servidor" });
};

module.exports = errorHandler;
