import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  const updateScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    setScrollWidth(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${scrollWidth}%`,
        height: "5px",
        background: "linear-gradient(90deg, #ff758c, #ff7eb3)",
        zIndex: 9999,
        boxShadow: "0 0 10px rgba(255, 120, 150, 0.6)"
      }}
    />
  );
};

export default ScrollToTop;
