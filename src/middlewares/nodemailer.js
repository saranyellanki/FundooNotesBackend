import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const mailId = process.env.EMAIL
const password = process.env.PASS

export const main = async (email, token) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: mailId,
            pass: password,
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: mailId, // sender address
        to: email, // list of receivers
        subject: "Hello", // Subject line
        text: "Test", // plain text body
        html: `<b>Hello</b>
        <p>To reset your password <a href="http://localhost:3000/ResetPassword/${token}">Click here</a></p>`, // html body
    });
    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
}

export const register = async (email,data) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: mailId,
            pass: password,
        },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: mailId, // sender address
        to: email, // list of receivers
        subject: "Hello", // Subject line
        text: "Test", // plain text body
        html: `<b>Hello</b>
        <p>Registration successful</p>`, // html body
    });

    console.log(`DATA ${data}`);
    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
}