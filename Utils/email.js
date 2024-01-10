const nodemailer = require('nodemailer');
const sendEmail = async options => {
    //Create a transporter(IN MAILTRAP)
    // const transporter = nodemailer.createTransport({
    //     host: process.env.EMAIL_HOST,
    //     port: process.env.EMAIL_PORT,
    //     auth: {
    //         user: process.env.EMAIL_USERNAME,
    //         pass: process.env.EMAIL_PASSWORD
    //     }
    // });

    //IN GMAIL
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    //DEFINE THE EMAIL OPTIONS 
    const mailOptions = {
        from: `Suresh Bhattarai <${process.env.EMAIL_FROM}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    //ACTUALLY SEND THE EMAIL
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;