const nodemailer = require("nodemailer");
const path = require("path");

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.temp,
    attachments: [
      {
        filename: options.filename,
        path: path.join(__dirname, `../${options.filename}`),
        contentType: "application/pdf",
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;