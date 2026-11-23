import { NextFunction, Request, Response, Router } from 'express';
import auth from './auth';
import { createUser, getCurrentUser, login, updateUser } from './auth.service';

const router = Router();

/**
 * Create an user
 * @auth none
 * @route {POST} /users
 * @bodyparam user User
 * @returns user User
 */
router.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await createUser({ ...req.body.user, demo: false });
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
});

/**
 * Login
 * @auth none
 * @route {POST} /users/login
 * @bodyparam user User
 * @returns user User
 */
router.post('/users/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await login(req.body.user);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

/**
 * Get current user
 * @auth required
 * @route {GET} /user
 * @returns user User
 */
router.get('/user', auth.required, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await getCurrentUser(req.auth?.user?.id);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

/**
 * Update user
 * @auth required
 * @route {PUT} /user
 * @bodyparam user User
 * @returns user User
 */
router.put('/user', auth.required, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await updateUser(req.body.user, req.auth?.user?.id);
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

export default router;


// SENTINEL AI Fix: Implement and apply a rate-limiting middleware specifically for the login route to restrict consecutive failed attempts and overall request frequency per IP address.
// TODO: Apply this patch:
// // import rateLimit from 'express-rate-limit';
// 
// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minute window
//   max: 5, // limit each IP to 5 login requests per window
//   message: 'Too many login attempts from this IP, please try again after 15 minutes',
//   standardHeaders: true,
//   legacyHeaders: false,
// });
// 
// // In the controller or router configuration:
// // @Post('/login')
// // @UseBefore(loginLimiter)
// export const loginHandler = [loginLimiter, async (req: Request, res: Response) => {
//   // existing login logic
// }];