//email notification to user when their demand is fulfilled

// to be implemented

import nodemailer from 'nodemailer';

//below is notfying user full function
export async function notifyUser(email, subject, message) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '' ,
            pass: '' ,
        }
    });
   
    console.log('Message sent');
    return info;
}