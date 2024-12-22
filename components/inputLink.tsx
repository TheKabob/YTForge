"use client";

import { useState } from "react";
import { getYoutubeTitle } from "@/app/api/logInputLink/route";

export default function InputLink() {
  const [link, setLink] = useState("");
  const [youtubeTitle, setYoutubeTitle] = useState("");
  // const [videoUrl, setVideoUrl] = useState("");

  // const handleDownload = async (e) => {
  //   e.preventDefault();
  //
  //   if(!videoUrl) {
  //     alert("please enter a video url")
  //     return;
  //   }
  //   setVideoUrl("a");
  // }

  async function handleOnSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        try {
          const response = await fetch(`/api/logInputLink`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ link }),
          });

          const blob = await response.blob();
              const downloadLink = document.createElement('a');
              downloadLink.href = URL.createObjectURL(blob);
              downloadLink.download = 'downloaded_video.mp4';
              downloadLink.click();

              // Clean up the object URL
              URL.revokeObjectURL(downloadLink.href);

          if (response.ok) { 
            setYoutubeTitle(`Title: ${await getYoutubeTitle(link)}`);
            console.log(`Title: ${await getYoutubeTitle(link)}`);
          } else {
            console.error('an error occured');
          }
        } catch (error) {
          console.log("Error sending link to server", error);
        }
  };

  return (
    <div className="flex justify-center items-center h-screen grid-cols gap-4 flex-col">
      <form onSubmit={handleOnSubmit} className="flex flex-col items-center gap-2 w-full max-w-md px-4">
        <input id="link" name="link" value={link} onChange={(e) => {
          setLink(e.target.value);
        }} placeholder="Enter your link"
        className="outline-none rounded-md text-slate-900 font-semibold w-full border-double border-4 border-blue-100"/>
        <button type="submit"
          className="bg-blue-200 rounded-md px-2 font-bold text-slate-900 border-double border-4 border-blue-100">Download</button>
      </form> 
      <p id="youtubeTitle" className="text-white font-semibold">{youtubeTitle || 'Video Title goes here! (will appear once downloaded)'}</p><br/>
      {/* <form onSubmit={handleDownload}>
        <button type="submit"
          className="bg-slate-400 rounded-md px-2 font-bold text-slate-900"
        > Download Video</button>
      </form> */}
    </div>
  )
}
