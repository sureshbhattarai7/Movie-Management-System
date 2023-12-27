const nodemailer = require('nodemailer');

const sendEmail = async options => {
    //Create a transporter
    const transporter = nodemailer.createTransport({
        // host: process.env.EMAIL_HOST,
        // port: process.env.EMAIL_PORT,
        // secure: false,
        // auth: {
        //     user: process.env.EMAIL_USERNAME,
        //     host: process.env.EMAIL_PASSWORD,
        // }

        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    //Define the email options
    const mailOptions = {
        from: 'Suresh Bhattarai <admin@movie.co',
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    //Actually send the email with the nodemailer
    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;