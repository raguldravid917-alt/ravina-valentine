import { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
import "./App.css";

// --- WINDOW SIZE HOOK ---
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

// --- BACKGROUND PARTICLES ---
const BackgroundParticles = () => {
  const particles = Array.from({ length: 35 });
  return (
    <div className="floating-hearts">
      {particles.map((_, i) => (
        <div 
          key={i} 
          className="heart-particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 15 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            color: i % 2 === 0 ? '#ff69b4' : '#fff' // Mix of pink and white hearts
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noBtnPosition, setNoBtnPosition] = useState({}); 
  const audioRef = useRef(null);
  const { width, height } = useWindowSize();

  // --- 2026 LATEST TRENDY CONTENT FOR UDAYARAVINA ---
  const slides = [
    {
      id: 1,
      title: "Hey Queen... 👑",
      content: (
        <>
          My life got a major upgrade the moment I met <span className="highlight-name">Udayaravina</span>
        </>
      ),
      image: "/first.jpg" 
    },
    {
      id: 2,
      title: "My Vibe Check ✅",
      content: "Your energy is my favorite notification. Life just hits different with you.",
      image: "/fall.jpg"
    },
    {
      id: 3,
      title: "The Forever Plot? ♾️",
      content: "Not just for the stories, but for the whole journey. You in?",
      image: "/happy.jpg"
    }
  ];

  // IMAGE PRELOAD
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
    new Image().src = "/us.jpg";
  }, []);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
    if (currentStep === 0 && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play error:", e));
    }
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  // --- TELEPORT LOGIC ---
  const moveNoButton = (e) => {
    if(e) e.preventDefault();
    const safeX = Math.max(20, Math.min(Math.random() * (window.innerWidth - 100), window.innerWidth - 100));
    const safeY = Math.max(20, Math.min(Math.random() * (window.innerHeight - 80), window.innerHeight - 80));
    
    setNoBtnPosition({ 
      position: "fixed", left: `${safeX}px`, top: `${safeY}px`, zIndex: 9999 
    });
  };

  const handleNoClick = (e) => {
      e.preventDefault();
      alert("Oops! That option is locked for Udayaravina! 🔒😉");
      moveNoButton(e);
  };

  return (
    <div className="container">
      <audio ref={audioRef} src="/music.mp3" loop />
      <BackgroundParticles />

      {/* FULLSCREEN CONFETTI */}
      {accepted && (
        <div className="fullscreen-confetti-wrapper">
          <Confetti 
            width={width} height={height} 
            numberOfPieces={1500} gravity={0.15}
            colors={['#ff1493', '#ff69b4', '#ffd700', '#ffffff']} // Pink/Gold Theme
          />
        </div>
      )}

      {/* --- PINK GLASS CARD --- */}
      <div className="glass-card">
        
        {/* VIEW 1: SLIDESHOW */}
        {!accepted && currentStep < slides.length && (
          <>
            <div className="photo-frame">
              <img src={slides[currentStep].image} alt="bg" className="photo-blur-bg" />
              <img src={slides[currentStep].image} alt="Memory" className="slide-image" />
            </div>
            <h2>{slides[currentStep].title}</h2>
            <p>{slides[currentStep].content}</p>
            <button className="yes-btn" onClick={handleNext}>Next Level ❤️</button>
          </>
        )}

        {/* VIEW 2: PROPOSAL */}
        {!accepted && currentStep === slides.length && (
          <>
            <div className="photo-frame" style={{height: '35vh', minHeight: '250px'}}>
               <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDUyOWc4OWlzOHg2bzI3eHV1Ync3Z3J3Y3J6OG45bGd3anp5Y3l6biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/cLS1cfxvGOPVpf9g3y/giphy.gif" alt="bg" className="photo-blur-bg" />
               <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDUyOWc4OWlzOHg2bzI3eHV1Ync3Z3J3Y3J6OG45bGd3anp5Y3l6biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/cLS1cfxvGOPVpf9g3y/giphy.gif" alt="Cute Bear" className="slide-image" style={{objectFit: 'contain'}} />
            </div>
            <h2>Ready to be my Valentine? 💖</h2>
            <span className="highlight-name">Udayaravina</span>
            <p style={{marginTop: '10px'}}>Say yes and let's make it official! 🥺</p>
            
            <div className="btn-group">
              <button className="yes-btn" onClick={handleYesClick}>YES! 💯</button>
              <button 
                className="no-btn" 
                style={noBtnPosition} 
                onMouseEnter={moveNoButton} 
                onTouchStart={moveNoButton} 
                onClick={handleNoClick} 
              >
                No 😢
              </button>
            </div>
          </>
        )}

        {/* VIEW 3: SUCCESS */}
        {accepted && (
          <>
            <div className="photo-frame">
              <img src="/us.jpg" alt="bg" className="photo-blur-bg" />
              <img src="/us.jpg" alt="Us" className="slide-image" />
            </div>
            <h2>Best Decision Ever! 💖</h2>
            <p>My world, my love...</p>
            <span className="highlight-name">Udayaravina</span>
            <p style={{marginTop: '10px', fontSize: '0.9rem', opacity: 0.9}}>Happy Valentine's Day Baby! ✨</p>
          </>
        )}

      </div>
    </div>
  );
}

export default App;