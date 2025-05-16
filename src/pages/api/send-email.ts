import nodemailer from "nodemailer";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    try {
      // Configure the transporter
      const transporter = nodemailer.createTransport({
        service: "gmail", // Use Gmail or another email service
        auth: {
          user: process.env.EMAIL_USER, // Your email address
          pass: process.env.EMAIL_PASS, // Your email password or app-specific password
        },
      });

      console.log("EMAIL_USER:", process.env.EMAIL_USER);
      console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

      // Email options
      const mailOptions = {
        from: process.env.EMAIL_USER, // Use the sender's email address
        to: "danmark.chemuren@gmail.com", // Your email address
        replyTo: email, // Set the user's email address for replies
        subject: `New massage from ${name} @ BMG | Official Website`,
        text: `Replying to: ${email}\n${name}'s message: ${message}`,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      return res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send email." });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed." });
  }
}