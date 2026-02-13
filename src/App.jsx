import { useState, useRef, useEffect } from "react";
import Confetti from "react-confetti";
import "./App.css";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

const BackgroundParticles = () => {
  const particles = Array.from({ length: 20 });
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
      {particles.map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          fontSize: '25px',
          opacity: 0.2,
          animation: `floatUp ${Math.random() * 10 + 10}s infinite linear`
        }}>❤️</div>
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

  const slides = [
    {
      id: 1,
      title: "Hey Queen... 👑",
      content: <>My world was a standard movie, until <span className="highlight-name">Udayaravina</span> entered as the Main Lead.</>,
      image: "/first.jpg" 
    },
    {
      id: 2,
      title: "Vibe Check! ✨",
      content: "Udayaravina, your energy is my favorite notification. I'm addicted to us.",
      image: "/fall.jpg"
    },
    {
      id: 3,
      title: "Forever Plot? ♾️",
      content: "Let's skip the small talk and build a kingdom together. You in?",
      image: "/happy.jpg"
    }
  ];

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
    if (currentStep === 0 && audioRef.current) audioRef.current.play().catch(e => console.log(e));
  };

  const handleYesClick = () => setAccepted(true);

  const moveNoButton = (e) => {
    if(e) e.preventDefault();
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 60;
    const randomX = Math.max(20, Math.random() * maxX);
    const randomY = Math.max(20, Math.random() * maxY);
    setNoBtnPosition({ position: "fixed", left: `${randomX}px`, top: `${randomY}px`, zIndex: 9999 });
  };

  return (
    <div className="container">
      <audio ref={audioRef} src="/music.mp3" loop />
      <BackgroundParticles />

      {accepted && (
        <div className="fullscreen-confetti-wrapper">
          <Confetti width={width} height={height} numberOfPieces={1500} gravity={0.15} colors={['#ff1493', '#ff69b4', '#ffd700', '#ffffff']} />
        </div>
      )}

      <div className="glass-card">
        {!accepted && currentStep < slides.length && (
          <>
            <div className="photo-frame">
              <img src={slides[currentStep].image} alt="bg" className="photo-blur-bg" />
              <img src={slides[currentStep].image} alt="Main" className="slide-image" />
            </div>
            <h2>{slides[currentStep].title}</h2>
            <p>{slides[currentStep].content}</p>
            <button className="yes-btn" onClick={handleNext}>Next Level ❤️</button>
          </>
        )}

        {!accepted && currentStep === slides.length && (
          <>
            <div className="photo-frame" style={{height: '30vh', minHeight: '220px'}}>
               <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDUyOWc4OWlzOHg2bzI3eHV1Ync3Z3J3Y3J6OG45bGd3anp5Y3l6biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/cLS1cfxvGOPVpf9g3y/giphy.gif" alt="Cute" className="slide-image" style={{objectFit: 'contain'}} />
            </div>
            <h2>Be My Valentine? 💖</h2>
            <span className="highlight-name">Udayaravina</span>
            <p style={{marginTop: '10px'}}>Only YES is an option today! 🥺</p>
            <div className="btn-group">
              <button className="yes-btn" onClick={handleYesClick}>YES! 💯</button>
              <button 
                className="no-btn" 
                style={noBtnPosition} 
                onMouseEnter={moveNoButton} 
                onTouchStart={moveNoButton} 
                onClick={(e) => { e.preventDefault(); alert("Option locked! 😉"); moveNoButton(e); }} 
              >No 😢</button>
            </div>
          </>
        )}

        {accepted && (
          <>
            <div className="photo-frame">
              <img src="/us.jpg" alt="bg" className="photo-blur-bg" />
              <img src="/us.jpg" alt="Success" className="slide-image" />
            </div>
            <h2>Officially Mine! 💖</h2>
            <p>Ready for a 4K Blockbuster life?</p>
            <span className="highlight-name">Udayaravina</span>
            <p style={{marginTop: '10px', fontSize: '0.9rem', opacity: 0.9}}>Happy Valentine's Day My Queen! ✨</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;