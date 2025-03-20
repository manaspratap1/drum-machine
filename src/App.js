import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

const drumPads = [
  { key: "Q", id: "Heater-1", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { key: "W", id: "Heater-2", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { key: "E", id: "Heater-3", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { key: "A", id: "Heater-4", src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { key: "S", id: "Clap", src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3" },
  { key: "D", id: "Open-HH", src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3" },
  { key: "Z", id: "Kick-n'-Hat", src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { key: "X", id: "Kick", src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3" },
  { key: "C", id: "Closed-HH", src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3" }
];

const App = () => {
  const [display, setDisplay] = useState("");

  const playSound = (key) => {
    const pad = drumPads.find(pad => pad.key === key);
    if (pad) {
      const audio = document.getElementById(key);
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(error => console.error("Play error:", error));
        setDisplay(pad.id); // Update display with the drum pad name
      }
    }
  };

  const handleKeyPress = useCallback((event) => {
    const key = event.key.toUpperCase();
    playSound(key);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div id="drum-machine">
      <div id="display">{display}</div>
      <div className="drum-pad-container">
        {drumPads.map(pad => (
          <button key={pad.key} className="drum-pad" id={pad.id} onClick={() => playSound(pad.key)}>
            {pad.key}
            <audio className="clip" id={pad.key} src={pad.src} preload="auto"></audio>
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
