import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { register_local, verify_local, cookie_extractor } from '../services/authServices.js';
import { User } from '../models/authModels.js';
import { UserRepository } from '../repositories/authRepositories.js';
import jwt from 'jsonwebtoken';
const router = express.Router();
const _repository = new UserRepository(User);
let local_strategy = new LocalStrategy(verify_local);
let jwt_strategy = new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken(), cookie_extractor]),
    secretOrKey: process.env.SECRET_KEY || "secret"
}, async (token, done) => {
    try {
        const user = await _repository.findById(token.user._id);
        return done(null, user);
    }
    catch (error) {
        done(error);
    }
});
passport.use('local', local_strategy);
passport.use('jwt', jwt_strategy);
router.post('/login/local', passport.authenticate('local', { failureMessage: true }), (req, res) => {
    res.status(200).json(req.user);
});
router.post('/login/jwt', async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An error occurred.');
                return next(error);
            }
            req.login(user, { session: false }, async (error) => {
                if (error)
                    return next(error);
                const body = { _id: user._id, username: user.username };
                const token = jwt.sign({ user: body }, process.env.SECRET_KEY || "secret");
                return res.json({ token });
            });
        }
        catch (error) {
            return next(error);
        }
    })(req, res, next);
});
router.post('/register', async (req, res) => {
    try {
        let result = await register_local(req.body.username, req.body.email, req.body.password);
        res.json({ message: result.message });
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
router.post('/signout', async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.json({ message: "User signed out." });
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
passport.serializeUser((user, callback) => {
    process.nextTick(() => {
        callback(null, user._id);
    });
});
passport.deserializeUser((id, callback) => {
    process.nextTick(async () => {
        const user = await _repository.findById(id);
        const data = {
            _id: user?._id,
            username: user?.username,
            isAdmin: user?.isAdmin
        };
        return callback(null, data);
    });
});
export default router;
