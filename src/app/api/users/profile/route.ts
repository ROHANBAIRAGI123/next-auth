import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("request recieved");
  const userId = await getDataFromToken(request);
  return NextResponse.json({ userId });
}
//   } catch (error) {
//     console.log("error in profile", error);
//     return NextResponse.json(
//       { error: "Something went wrong in profile" },
//       { status: 409 }
//     );
//   }
