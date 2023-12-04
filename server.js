const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');

require('dotenv').config();
require('./config/database');

// require('./config/passport');

const indexRouter = require('./routes/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// app.use(
//     session({
//         secret: process.env.SECRET,
//         resave: false,
//         saveUninitialized: true,
//     })
// );

// app.use(passport.initialize());
// app.use(passport.session());

app.use('/', indexRouter);

app.listen(process.env.PORT || 3002);

module.exports = app;
