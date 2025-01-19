import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const VideoComponent: React.FC = () => {
  const [videoURL, setVideoURL] = useState<string>("");

  useEffect(() => {
    const fetchVideoURL = async () => {
      const storage = getStorage();
      const videoRef = ref(storage, "chiro.mp4"); // Replace with your file name

      try {
        const url = await getDownloadURL(videoRef);
        setVideoURL(url);
      } catch (error) {
        console.error("Error fetching video URL:", error);
      }
    };

    fetchVideoURL();
  }, []);

  return (
    <div className="flex justify-center h-[400px] md:h-[500px]">
      {videoURL ? (
        <video controls width="600">
          <source src={videoURL} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default VideoComponent;
