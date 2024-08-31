import { Axios } from "axios";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import axios from "axios";
// Function to handle the POST request
export async function POST(request: NextRequest) {
  try {
    // const { email, otp } = await req.json();
    const body = await request.json();
    const { email, otpp } = body;

    // const { email, otp } = req.body();

    // Set up the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ramuksampath5@gmail.com",
        pass: "dnpr rzlw dajn uprp",
      },
    });

    const mailOptions = {
      from: "builditdreamz@gmail.com",
      to: email,
      // to: JSON.stringify(body.email),

      subject: "Email Verification from BUilditdreamz",
      text: `Your OTP is: ${otpp}`,
      // text: JSON.stringify(body.otp),
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    // const errorMessage =
    //   (error as Error).message || "An unknown error occurred";

    // console.error("Failed to send email:", error.message);
    // return NextResponse.json(
    //   { message: "Failed to send email", error },
    //   { status: 500 }
    return NextResponse.json({
      // error: error.message,
      error: error as string,
    });
  }
}
