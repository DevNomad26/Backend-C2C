import { Router } from 'express';
import passport from '../config/passport';
import { signToken,verifyToken} from '../utils/jwt';
import { env } from '../config/env';

const router = Router();

//user hits this route, gets redirected to Google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

//Google redirects back here after login
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${env.FRONTEND_URL}/login?error=unauthorized`,
  }),
  (req, res) => {
    const user = req.user as any;

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    res.cookie('token', token, {
      httpOnly: true,   // JS cannot read this
      secure: env.NODE_ENV === 'production', 
      sameSite: 'lax',  // protects against CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    
    res.redirect(`${env.FRONTEND_URL}/dashboard`);
  }
);

//logout endpoint
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out successfully' });
});


//getting jwt payload of logged in users
router.get('/me', (req, res) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not logged in' });
  }

  try {
    const payload = verifyToken(token);
    res.json({ success: true, data: payload });
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
});

export default router;