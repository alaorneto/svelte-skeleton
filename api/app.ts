import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import { fileURLToPath } from 'url';
import passport from 'passport';
import authRouter from './routes/authRoutes.js';
import defaultRouter from './routes/indexRoutes.js';
import { connect } from './db/conn.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.join(__dirname, '.env')});

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

await connect();

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_KEY || "default",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
        mongoUrl: process.env.DATABASE_URI || "mongodb://localhost:27017/",
        dbName: process.env.DATABASE_NAME || "skeleton"
    })
}));

app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.use('/api/', defaultRouter); 
app.use('/api/', authRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}.`);
});
