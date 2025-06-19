import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";

type emailType = "VERIFY" | "RESET";
type emailPayload = {
  email: string;
  emailType: emailType;
  userId: string;
};

export const sendEmail = async ({ email, emailType, userId }: emailPayload) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "4729f067a8830f",
        pass: "****47b2",
      },
    });

    const mailOptions = {
      from: "rohanbairagi40@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <p>Click <a href="${
          process.env.DOMAIN
        }/verifyEmail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }.</p>
      `,
    };

    const mailResponse = transport.sendMail(mailOptions);
    console.log("mail sent successfully", mailResponse);
    return mailResponse;
  } catch (error) {
    console.log("error in sending mail", error);
  }
};
