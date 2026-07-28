import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendMail = ({ to, subject, html }) => {

  return transporter.sendMail({
    from: `"VRKSS Membership" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html
  });

};

export default sendMail;
