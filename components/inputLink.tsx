"use client";

import { useState } from "react";

export default function InputLink() {
  const [link, setLink] = useState("");
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
            method: 'GET',
            // headers: {
            //   "Content-Type": "application/json"
            // },
            // body: JSON.stringify({ link }),
          });

          const data = await response.json();
          console.log(data.message);
        } catch (error) {
          console.log("Error sending link to server", error);
        }
  }

  return (
    <div className="flex justify-center">
      <form onSubmit={handleOnSubmit} className="flex flex-col items-center gap-2 w-full max-w-md px-4">
        <input id="link" name="link" value={link} onChange={(e) => {
          setLink(e.target.value);
        }} placeholder="Enter your link"
        className="outline-none rounded-md text-slate-900 font-semibold w-full"/>
        <button type="submit"
          className="bg-slate-400 rounded-md px-2 font-bold text-slate-900">Search</button>
      </form>
      {/* <form onSubmit={handleDownload}>
        <button type="submit"
          className="bg-slate-400 rounded-md px-2 font-bold text-slate-900"
        > Download Video</button>
      </form> */}
    </div>
  )
}
