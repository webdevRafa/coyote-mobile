import React, { useState, useEffect, useRef } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const VideoComponent: React.FC = () => {
  const [videoURL, setVideoURL] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.5 } // Video must be at least 50% visible to trigger play/pause
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [videoURL]); // Runs once video URL is set

  return (
    <div className="flex justify-center h-[400px] md:h-[500px] shadow-xl">
      {videoURL ? (
        <video ref={videoRef} controls width="600" muted>
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
