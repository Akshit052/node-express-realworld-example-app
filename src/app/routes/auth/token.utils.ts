import * as jwt from 'jsonwebtoken';

const generateToken = (id: number): string =>
  jwt.sign({ user: { id } }, process.env.JWT_SECRET || (() => { throw new Error('JWT_SECRET must be set in environment variables'); })(), {
    expiresIn: '60d',
  });

export default generateToken;
