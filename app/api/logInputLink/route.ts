import { NextResponse } from "next/server";
import prisma from "@/client";
import axios from 'axios';

const getYoutubeTitle = async (url: string): Promise<string | null> => {
  const videoId = new URL(url).searchParams.get('v');
  const apiKey = "AIzaSyBmxIE32sHKSBHuNTcy88gQCcecUnkflqM";
  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

  try {
    const response = await axios.get(apiUrl);
    const title = response.data.items[0].snippet.title; 
    return title;
  } catch (error) {
    console.error("Error fetching the Youtube title: ", error);
    return null;
  }
};

export async function POST(req: Request) {
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

    await NextResponse.json({message: " Link logged succesfully "});
    return (
      new Response(data, {
          headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename="downloaded_video.mp4"',
          }
        })
      );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to log link" },
      { status: 500 }
    );
  }
}
