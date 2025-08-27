
// Node mailer used to send mail in Node.js...
const nodeMailer = require("nodemailer");

const sendEmail = async ({email, message, subject}) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        service: process.env.SMTP_SERVICE,
        port: process.env.SMTP_PORT,
        auth:{
            user:process.env.SMTP_EMAIL,
            pass:process.env.SMTP_PASSWORD,
        },
    });

    const options = {
        from: process.env.SMTP_EMAIL,
        to: email,
        subject,
        html: message,              // our message sent in html form, So we use html key...
    };

    await transporter.sendMail(options);
    return true;
}


module.exports = { sendEmail };

