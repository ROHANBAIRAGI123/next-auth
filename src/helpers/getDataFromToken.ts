import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const encodedToken = request.cookies.get("token")?.value || "";

    const decodedToken: any = jwt.verify(
      encodedToken,
      process.env.JWT_SECRET_TOKEN!
    );
    console.log("token id", decodedToken.id);
    return decodedToken.id;
  } catch (error) {
    console.log("error on getDataFromToken", error);
  }
};
