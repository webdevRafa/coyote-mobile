import { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const BackgroundVideo: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  useEffect(() => {
    const fetchVideo = async () => {
      const storage = getStorage();
      const videoRef = ref(storage, "scrubs.mp4");
      try {
        const url = await getDownloadURL(videoRef);
        setVideoUrl(url);
      } catch (error) {
        console.error("Error fetching video URL:", error);
      }
    };

    fetchVideo();
  }, []);

  if (!videoUrl) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      className="opacity-20 translate-y-[-50%] md:translate-y-0 blur-sm"
      style={{
        position: "relative",
        top: 0,
        left: 0,
        width: "100%",
        height: "600px",
        objectFit: "cover",
        zIndex: -1,
      }}
    >
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};
