import axios from 'axios';

export const getYoutubeTitle = async (url: string): Promise<string | null> => {
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
}
