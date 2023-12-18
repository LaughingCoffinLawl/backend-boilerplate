import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [clickPositions, setClickPositions] = useState({ x: "", y: "" });
  const victory = { x: 100, y: 100 };
  const tolerance = 25;

  useEffect(() => {
    const mousePosition = (event) => {
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left; // x position within the element.
      const y = event.clientY - rect.top; // y position within the element.
      setClickPositions({ x, y });

      if (
        Math.abs(x - victory.x) <= tolerance &&
        Math.abs(y - victory.y) <= tolerance
      ) {
        console.log("Victory!");
      }
    };
    window.addEventListener("click", mousePosition);

    return () => {
      window.removeEventListener("click", mousePosition);
    };
  }, []);

  return (
    <div className="container">
      <div className="waldo">
        <div
          style={{
            position: "absolute",
            top: `${clickPositions.y - 20}px`, // Subtract half the height
            left: `${clickPositions.x - 20}px`, // Subtract half the width
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "5px solid red",
          }}
        />
        <p className="mouse">
          {clickPositions.x}, {clickPositions.y}
        </p>
      </div>
    </div>
  );
}

export default App;
