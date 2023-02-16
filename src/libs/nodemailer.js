const nodemailer = require('nodemailer');

function initializeNodemailer() {
  const transporter = nodemailer.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'AKIA5D7ZGSXPNYDNKH6E',
      pass: 'BFM1+MRFBJUu39NjTpgyjzzRjink90JiEcCY7pDLFe4q',
    },
  });
  return transporter;
}

module.exports = initializeNodemailer
