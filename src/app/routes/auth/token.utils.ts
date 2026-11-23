import * as jwt from 'jsonwebtoken';

const generateToken = (id: number): string =>
  jwt.sign({ user: { id } }, process.env.JWT_SECRET || 'superSecret', {
    expiresIn: '60d',
  });

export default generateToken;


// SENTINEL AI Fix: Implement a rate-limiting middleware using 'express-rate-limit' (or equivalent) specifically for the login route to throttle requests from the same IP address after a threshold of failed attempts is reached.
// TODO: Apply this patch:
// // import rateLimit from 'express-rate-limit';
// 
// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minute window
//   max: 5, // Limit each IP to 5 login requests per window
//   message: {
//     errors: { 'login': ['Too many failed attempts. Please try again in 15 minutes.'] }
//   },
//   standardHeaders: true,
//   legacyHeaders: false,
// });
// 
// router.post('/users/login', loginLimiter, (req, res, next) => {
//   // ... existing login logic
// });