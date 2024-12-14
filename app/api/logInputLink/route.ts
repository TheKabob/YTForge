import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { link } = await req.json();
    console.log(link);
    return NextResponse.json({ message: "Link logged succesfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to log link" },
      { status: 500 }
    );
  }
}
