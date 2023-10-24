/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import express from 'express';
import path, { dirname } from 'path';
import cookieParser from 'cookie-parser';
import sessions from 'express-session';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import indexRouter from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// set up application configuration and session
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  sessions({
    secret: 'r0dAz8{p=qwJZSGowL&giz-oUd=Rp#',
    saveUninitialized: true,
    cookie: { maxAge: 86400000 },
    resave: false,
  })
);

// define routes to be used
app.use('/', indexRouter);
// define error handling for invalid pages and other error scenarios
app.use((req, res) => {
  res.render('error', { title: 'Ticket - error' });
});
// define port for app to run on
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
