const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const restaurantsRouter = require('./routes/restaurants');
const menuRouter = require('./routes/menu');
const ordersRouter = require('./routes/orders');

require('dotenv').config();
require('./config/database');

require('./config/passport');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
    res.locals.user = req.user;
    next();
});
app.use(methodOverride('_method'));
app.use('/favicon.ico', (req, res) => res.status(204));

app.use('/', indexRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/', menuRouter);
app.use('/', ordersRouter);

app.listen(process.env.PORT || 3000);

module.exports = app;
