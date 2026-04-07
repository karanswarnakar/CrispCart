import { useRef, useState } from "react";
import "./App.css";

const slides = [
  {
    src: "/IMAGE/1.webm",
    text: "Always give people more than what they expect to get.",
  },
  {
    src: "/IMAGE/2.webm",
    text: "Add this to your cart and enjoy a delightful shopping experience!",
  },
  {
    src: "/IMAGE/3.webm",
    text: "Let's Make It Yours!",
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showNameForm, setShowNameForm] = useState(false);
  const touchStartX = useRef(0);
  const swipeThreshold = 50;

  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX.current;

    if (swipeDistance < -swipeThreshold) {
      if (currentIndex + 1 >= slides.length) {
        setShowLogin(true);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
      return;
    }

    if (swipeDistance > swipeThreshold) {
      setCurrentIndex((index) => Math.max(0, index - 1));
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= slides.length) {
      setShowLogin(true);
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };

  const handleBack = () => {
    setShowLogin(false);
    setCurrentIndex(0);
  };

  const handleStaySignedOut = (event) => {
    event.preventDefault();
    setShowNameForm(true);
  };

  return (
    <div className="app">
      {!showLogin && (
        <section
          className="slider"
          id="index-s1"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="slider-card">
            <div className="slider-media">
              {slides.map((slide, index) => (
                <div
                  key={slide.src}
                  className={`slide-item ${
                    index === currentIndex ? "disActive" : ""
                  }`}
                >
                  <video src={slide.src} autoPlay loop muted playsInline />
                </div>
              ))}
            </div>

            <p id="index-Sub_line">{slides[currentIndex]?.text}</p>

            <div className="slider-actions">
              <button id="slide_button" type="button" onClick={handleNext}>
                <i className="fa-sharp fa-solid fa-arrow-right"></i>
              </button>
              <div className="item-count-chaker">
                {slides.map((_, index) => (
                  <div
                    key={index}
                    className={`item-count ${
                      index === currentIndex ? "item_width_entence" : "item_width_none"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        setCurrentIndex(index);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {showLogin && (
        <section className="login" id="index-s2">
          <header>
            <button className="back_slider" type="button" onClick={handleBack}>
              <i className="fa-sharp fa-solid fa-arrow-left"></i>
            </button>
            <h1>login</h1>
            <p>For more features</p>
          </header>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="lable">
              <label>Email</label>
            </div>
            <input type="text" placeholder="Enter Email" />
            <div className="lable">
              <label>Password</label>
            </div>
            <input type="password" placeholder="Enter Password" />

            <div className="chakeBoxAndForgot">
              <span>
                <input type="checkbox" />Remember me
              </span>
              <span>
                <a href="#">Forgot Password</a>
              </span>
            </div>
            <button className="loginBtn" type="button">
              Login
            </button>
            <div className="singOut">
              <hr />
              <span>
                <a href="/UI.html" id="openNameGattingOpner" onClick={handleStaySignedOut}>
                  Stay sing out
                </a>
              </span>
              <hr />
            </div>
            <div className="googleAndFecbookLogin">
              <button className="styleButton" type="button">
                <img src="/IMAGE/google.png" className="google" alt="Google" />
                <p>Google</p>
              </button>
              <button className="styleButton" type="button">
                <img src="/IMAGE/fecbook.png" className="fecbook" alt="Fecbook" />
                <p>Fecbook</p>
              </button>
            </div>
            <p>
              Dont have an account <a href="#">Singup</a>
            </p>
          </form>
        </section>
      )}

      <section
        className={`openNameGattingSection ${showNameForm ? "is-open" : ""}`}
        id="index-s3"
      >
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="lable">
            <label>First Name</label>
          </div>
          <input type="text" placeholder="Enter First Name" />
          <div className="lable">
            <label>Last Name</label>
          </div>
          <input type="text" placeholder="Enter Last Name" />
          <div className="group-age-time">
            <div className="lable">
              <label>Age</label>
              <input
                type="number"
                placeholder="Enter Age"
                min="2"
                max="99"
                onInput={(event) => {
                  event.target.value = event.target.value.slice(0, 2);
                }}
              />
            </div>
            <div className="lable">
              <label>
                Time <span className="optional">(optional)</span>
              </label>
              <input type="time" />
            </div>
          </div>
          <button className="loginBtn" type="button">
            Lest's go
          </button>
        </form>
      </section>
    </div>
  );
}
