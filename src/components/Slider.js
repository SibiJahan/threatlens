import React, { useEffect, useRef, useState } from "react";
import "./Slider.css"; 

const points = [
  {
    topic: "Cut incident response time to minutes",
    description:
      "Stop manual file analysis and URL investigations. Get instant verdicts on suspicious files and URLs.",
  },
  {
    topic: "Get ahead of emerging threats",
    description:
      "Access intelligence from thousands of security teams globally. See new malware families before they spread.",
  },
  {
    topic: "Save up to $90,000 per analyst per year",
    description:
      "Replace 3-4 hours of daily triage with automated analysis. One API call does what takes analysts half a day.",
  },
  {
    topic: "Focus on real business risk",
    description:
      "Get dollar estimates for potential losses, not just technical severity scores. Prioritize threats that could cost you millions.",
  },
  {
    topic: "Access enterprise-ready security",
    description:
      "Multi-tenant architecture, API-first design, and role-based access built in. No complex setup or infrastructure changes required.",
  },
  {
    topic: "Handle 10x volume without hiring",
    description:
      "Process 100,000+ samples daily with the same team size. Built for in-house SOCs and global MSSPs managing dozens of clients.",
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const timeoutRef = useRef(null);
  const interval = 4000;

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      goToNext();
    }, interval);
  };

  useEffect(() => {
    resetTimer();
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);

  const goToPrev = () => {
    clearTimeout(timeoutRef.current);
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev - 1 + points.length) % points.length);
  };

  const goToNext = () => {
    clearTimeout(timeoutRef.current);
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % points.length);
  };

  return (
    <div className="slider-demo-section">
    <div className="app-wrapper">
      <div className="slider-container">
        <h2 className="slider-heading">Real Business Impact</h2>

        <div className="slider">
          <div className="slide-wrapper">
            {points.map((point, i) => {
              let className = "slide";
              if (i === currentIndex) className += " active";
              else if (i === prevIndex) className += " exit-left";
              return (
                <div key={i} className={className}>
                  <div className="slide-content">
                    <h3 className="point-topic">{point.topic}</h3>
                    <p className="point-description">{point.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="arrow left-arrow" onClick={goToPrev}>
            &#8249;
          </button>
          <button className="arrow right-arrow" onClick={goToNext}>
            &#8250;
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Slider;

// const Slider = ({ images, interval = 3000 }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const timeoutRef = useRef(null);

//   const resetTimer = () => {
//     if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     timeoutRef.current = setTimeout(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length);
//     }, interval);
//   };

//   useEffect(() => {
//     resetTimer();
//     return () => clearTimeout(timeoutRef.current);
//   }, [currentIndex]);

//   const goToPrev = () => {
//     clearTimeout(timeoutRef.current);
//     setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   const goToNext = () => {
//     clearTimeout(timeoutRef.current);
//     setCurrentIndex((prev) => (prev + 1) % images.length);
//   };

//   return (
//     <div className="slider">
//       <div className="slide-wrapper">
//         {images.map((src, i) => (
//           <div
//             key={i}
//             className={`slide ${i === currentIndex ? "active" : ""}`}
//           >
//             <img src={src} alt={`Slide ${i + 1}`} className="slide-image" />
//           </div>
//         ))}
//       </div>

//       <button className="arrow left-arrow" onClick={goToPrev}>
//         &#8249;
//       </button>
//       <button className="arrow right-arrow" onClick={goToNext}>
//         &#8250;
//       </button>
//     </div>
//   );
// };