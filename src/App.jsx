import { useRef, useState } from "react";
import "./App.css";
import Slider from "./components/Slider";
import { slides } from "./data/slides";

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const swipeThreshold = 50;

  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX.current;

    if (swipeDistance < -swipeThreshold) {
      setCurrentIndex((index) => Math.min(slides.length - 1, index + 1));
      return;
    }

    if (swipeDistance > swipeThreshold) {
      setCurrentIndex((index) => Math.max(0, index - 1));
    }
  };

  const handleNext = () => {
    setCurrentIndex((index) => Math.min(slides.length - 1, index + 1));
  };

  return (
    <div className="app">
      <Slider
        slides={slides}
        currentIndex={currentIndex}
        onNext={handleNext}
        onSetIndex={setCurrentIndex}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
}
