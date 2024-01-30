import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  const token = request.cookies.get("token")?.value || "";

  const decodedtoken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

  return decodedtoken.id;
};
