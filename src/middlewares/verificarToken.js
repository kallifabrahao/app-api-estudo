import jwt from "jsonwebtoken";

const decodificarToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    return decodedToken;
  } catch (error) {
    return error;
  }
};

export const verifyToken = async (req, res, next) => {
  const token =
    req.headers.authorization?.replace("Bearer ", "") ||
    req.query.token ||
    req.token?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const validToken = decodificarToken(token);

  if (!validToken?.message) {
    req.token = token;
    req.user = validToken;
    return next();
  }

  return res.status(401).json({ message: "Token inválido" });
};
