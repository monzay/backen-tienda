import jwt from 'jsonwebtoken';
  const autenticarUser = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ error: 'No se proporcionó un token de autenticación' });
      }
      const user = jwt.verify(token, 'secret');
      req.user = user;
      next();
    } catch (error) {
      console.error('Error en autenticación:', error);
      return res.status(401).json({ error: 'Token de autenticación inválido' });
    }
  };

  export default autenticarUser

