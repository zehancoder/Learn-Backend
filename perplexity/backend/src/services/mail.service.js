import "dotenv/config"; // ← এটা সবার প্রথম line হতে হবে!
import nodeMailer from "nodemailer";

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_APP_PASSWORD, // শুধু এটাই দরকার
  },
  // OAuth2 এর কিছুই লাগবে না
});

transporter
  .verify()
  .then(() => console.log("Email transporter is ready to send emails"))
  .catch((err) => console.log(err));

export async function sendEmail({ to, subject, html, text }) {
  const mailOption = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text,
  };
  const details = await transporter.sendMail(mailOption);
  console.log("email sent: ", details);
}