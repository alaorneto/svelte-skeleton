import express, { Request, Response } from 'express';
import passport from 'passport';
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
    res.json({message: "Hello, world!"});
});

export default router;