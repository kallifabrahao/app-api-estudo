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
    req.token?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Token não fornecido" });
    return;
  }

  const validToken = decodificarToken(token);

  if (!validToken.message) {
    req.token = token;
    req.user = validToken;

    next();
  } else {
    res.status(401).json({ message: "Token inválido" });
    return;
  }
};
