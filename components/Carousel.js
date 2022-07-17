import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { GrNext, GrPrevious } from "react-icons/gr";

export const CarouselItem = ({ children, width }) => {
  return (
    <div className="carouselItem" style={{ width: width }}>
      {children}
    </div>
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 2000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  return (
    <div
      {...handlers}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="carousel"
    >
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: "100%" });
        })}
      </div>
      <div className="indicators">
        <div
          className="buttonPrev"
          onClick={() => updateIndex(activeIndex - 1)}
        >
          <GrPrevious className="nextBtn" />
        </div>
        {React.Children.map(children, (child, index) => {
          return (
            <div
              className={`${index === activeIndex ? "active" : "unActive"}`}
              onClick={() => updateIndex(index)}
            >
              {/* {index + 1} */}
            </div>
          );
        })}
        <div
          className="buttonNext"
          onClick={() => updateIndex(activeIndex + 1)}
        >
          <GrNext className="nextBtn" />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
