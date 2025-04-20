import express from 'express'
import passport from 'passport';
import oauthCallback from '../../controllers/OAuthController.js'

const router = express.Router();

// Gửi người dùng đến Google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google redirect về
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/dashboards/Info',session:false }),
  oauthCallback
);

export const OauthRouter = router