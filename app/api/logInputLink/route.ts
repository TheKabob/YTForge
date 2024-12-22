import { NextResponse } from "next/server";
import prisma from "@/client";
import { getYoutubeTitle } from "./getYoutubeTitle";

export default async function POST(req: Request) {
  try {
    const { link } = await req.json();
    const youtubeTitle = await getYoutubeTitle(link);
    console.log(youtubeTitle, link);

    await prisma.history.create({
      data: {
        link: link,
        video_name: youtubeTitle,
      }
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // Adjust as necessary for your environment
    const apiUrl = new URL(`/api/download?url=${encodeURIComponent(link)}`, baseUrl);

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
    });
    
    const data = await response.arrayBuffer();
    // const responseData = { 
    //   message: "Link logged successfully",
    //   youtubeTitle: youtubeTitle || "No title available"
    // };

    return new NextResponse(data, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename="downloaded_video.mp4"',
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to log link" },
      { status: 500 }
    );
  }
}


// module.exports = {
//   getYoutubeTitle: getYoutubeTitle,
// }
