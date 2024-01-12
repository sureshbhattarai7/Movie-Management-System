const express = require('express');

const AppError = require('./Utils/appError');
const globalErrorHandler = require('./Controller/errorController');

const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });

const movieRoute = require('./Route/movieRoute');
const userRoute = require('./Route/userRoute');
const actorRoute = require('./Route/actorRoute');
const reviewRoute = require('./Route/reviewRoute');
const bookingRoute = require('./Route/bookingRoute');

const app = express();
app.use(express.json());

app.use('/api/v1/movies', movieRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/actors', actorRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/bookings', bookingRoute);


app.all('*', (req, res, next) => {
    next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;