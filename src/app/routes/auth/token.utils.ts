import * as jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

const generateToken = (id: number): string =>
  jwt.sign({ user: { id } }, process.env.JWT_SECRET || 'superSecret', {
    expiresIn: '60d',
  });

export default generateToken;
