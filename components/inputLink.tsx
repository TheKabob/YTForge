"use client";

import { useState } from "react";

export default function InputLink() {
  const [link, setLink] = useState("");

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        
        try {
          const response = await fetch("/api/logInputLink", {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ link }),
          });

          const data = await response.json();
          console.log(data.message);
        } catch (error) {
          console.log("Error sending link to server", error);
        }
      }}>
        <input id="link" name="link" value={link} onChange={(e) => {
          setLink(e.target.value);
        }} placeholder="Enter your link"/>
        <button type="submit">Search</button>
      </form>
    </div>
  )
}
