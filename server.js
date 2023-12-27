const mongoose = require('mongoose');
const app = require('./app');

process.on('uncaughtException', err => {
    console.log('UNHANDLED EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    //'0' stands for success, '1' stands for uncaught exception.
    process.exit(1);
});

const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected successfully!');
}).catch(() => {
    console.log('Database connection failed!');
});

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

