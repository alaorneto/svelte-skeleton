import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { register_local, verify_local } from '../services/authServices.js';
const router = express.Router();
let local_strategy = new LocalStrategy(verify_local);
passport.use('local', local_strategy);
router.post('/login/password', passport.authenticate('local', { failureMessage: true }), (req, res) => {
    res.status(200).json({ success: true });
});
router.post('/register', async (req, res) => {
    let result = await register_local(req.body.username, req.body.email, req.body.password);
    if (result.success) {
        res.json({ success: true, message: result.message });
    }
    else {
        res.status(400).json({ success: false, message: result.message, error: result.detail });
    }
});
passport.serializeUser((user, callback) => {
    process.nextTick(function () {
        callback(null, { id: user._id, username: user.username });
    });
});
passport.deserializeUser(function (user, callback) {
    process.nextTick(function () {
        return callback(null, user);
    });
});
export default router;
