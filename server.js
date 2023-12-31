const mongoose = require('mongoose');
const app = require('./app');

process.on('uncaughtException', err => {
    console.log('UNHANDLED EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    //'0' stands for success, '1' stands for uncaught exception.
    process.exit(1);
});

const DB = process.env.DATABASE;
const DB2 = process.env.DATABASE2;


if (process.env.NODE_ENV.trim() === 'production') {
    mongoose.connect(DB, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database connected successfully!');
    }).catch((err) => {
        console.log(err);
        console.log('Database connection failed!');
    });
} else {
    mongoose.connect(DB2, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database connected successful!');
    }).catch(() => {
        console.log('Database connection failed!');
    });
};

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`App is running at PORT ${PORT}`);
});

// //UNHANDLED REJECTION
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        //'0' stands for success, '1' stands for uncaught exception.
        process.exit(1);
    });
});