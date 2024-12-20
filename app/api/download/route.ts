import { spawn } from "child_process";
import { readFileSync, unlinkSync } from "fs";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const videoUrl = searchParams.get("url");
  const fileName = "downloaded_video.mp4";

  if (!videoUrl) {
    return NextResponse.json(
      { error: "Missing 'url' parameter!!" },
      { status: 400 },
    );
  }

  try {
    await new Promise((resolve, reject) => {
      const ytdlp = spawn("yt-dlp", [
        "-o", fileName,
        videoUrl,
        "-f", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",]);

      ytdlp.stdout.on("data", (data) => console.log(`stdout: ${data}`));
      // ytdlp.stdout.on("data", (data) => console.log(`stderr: ${data}`));
    
      ytdlp.on("close", (code) => {
        if (code === 0) resolve(`yt-dlp succeed with code ${code}`);
        else reject(new Error(`yt-dlp failed with code ${code}`));
      });

      ytdlp.on("error", (err) => {
        reject(err);
      });
    });
    const videoData = readFileSync(fileName);
    unlinkSync(fileName);
    return new NextResponse(videoData, {
      status: 200,
      headers: {
        "Content-Disposition": `attachment; filename=${fileName}`,
        "Content-Type": "video/mp4",
      }
    });
  } catch(error) {
    console.error("Error downloading video. ", error);
    return NextResponse.json(
      {error: "Failed to download video"},
      {status:500}
    );
  }
}
