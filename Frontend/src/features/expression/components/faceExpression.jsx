import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function setup() {
      try {
        await init({ landmarkerRef, videoRef, streamRef });

   
        const interval = setInterval(() => {
          if (videoRef.current && videoRef.current.readyState >= 2) {
            setReady(true);
            clearInterval(interval);
            console.log("Video ready");
          }
        }, 500);
      } catch (err) {
        console.error("Init error:", err);
      }
    }

    setup();

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // 🔥 SAFE DETECT
  async function handleClick() {
    if (!ready) {
      alert("Camera not ready");
      return;
    }

    if (!videoRef.current || videoRef.current.readyState < 2) {
      console.log("Video not ready");
      return;
    }

    if (!landmarkerRef.current) {
      console.log("Model not ready");
      return;
    }

    try {
      const result = await detect({
        landmarkerRef,
        videoRef,
        setExpression,
      });

      console.log("Detected:", result);
      onClick(result);
    } catch (err) {
      console.error("Detection error:", err);
    }
  }

  return (
    <div className="face-expression">
      <video
        ref={videoRef}
        className="face-expression__video"
        autoPlay
        playsInline
        muted
      />

      <h2 className="face-expression__text">{expression}</h2>

      <button
        className="face-expression__btn"
        onClick={handleClick}
        disabled={!ready}
      >
        {ready ? "Detect Expression" : "Loading Camera..."}
      </button>
    </div>
  );
}
