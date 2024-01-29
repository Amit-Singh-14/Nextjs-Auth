import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email, password } = reqBody;
  console.log(reqBody);

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: "User foes not exists." }, { status: 400 });
  }

  const validPassword = await bcryptjs.compare(password, user.password);

  if (!validPassword) {
    return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
  }

  const tokenData = {
    id: user._id,
    email: user.email,
    username: user.username,
  };

  const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1hr" });

  const response = NextResponse.json({
    message: "Login Successfull",
    success: true,
  });

  response.cookies.set("token", token, { httpOnly: true });

  return response;
}
