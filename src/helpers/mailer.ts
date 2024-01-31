import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrpytjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  const hashedToken = await bcrpytjs.hash(userId.toString(), 10);

  if (emailType === "VERIFY") {
    await User.findByIdAndUpdate(userId, {
      verifyToken: hashedToken,
      verifyTokenExpiry: Date.now() + 360000,
    });
  } else if (emailType === "RESET") {
    await User.findByIdAndUpdate(userId, {
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: Date.now() + 360000,
    });
  }

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "76d9699d01ea53",
      pass: "30f8c20c907cc3",
    },
  });

  const mailOptions = {
    from: "amitasdf246@gmail.com",
    to: email,
    subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    html: `<p> Click <a href = "${
      process.env.DOMAIN
    }/verifyemail?token=${hashedToken}">here</a> to ${
      emailType === "VERIFY" ? "verify your email" : "reset your password"
    } 
    or copy and paste the link below in your browser. <br> ${
      process.env.DOMAIN
    }/verifyemail?token=${hashedToken}
    </p>`,
  };

  const mailResponse = await transport.sendMail(mailOptions);

  return mailResponse;
};
