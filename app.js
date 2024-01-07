const path = require('path');
const express = require('express');

const AppError = require('./Utils/appError');
const globalErrorHandler = require('./Controller/errorController');

const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });

const movieRoute = require('./Route/movieRoute');
const userRoute = require('./Route/userRoute');
const actorRoute = require('./Route/actorRoute');
const reviewRoute = require('./Route/reviewRoute');

const app = express();
app.use(express.json());

// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'Views'));
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.status(200).render('base', {
//         movie: 'Kabaddi',
//         user: 'Suresh'
//     });
// })

app.use('/api/v1/movies', movieRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/actors', actorRoute);
app.use('/api/v1/reviews', reviewRoute);


app.all('*', (req, res, next) => {
    next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;