import { useEffect, useState } from "react";

export default function AnimatedClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Calculate rotation angles
  const secondsRotation = (seconds / 60) * 360;
  const minutesRotation = ((minutes + seconds / 60) / 60) * 360;
  const hoursRotation = ((hours % 12 + minutes / 60) / 12) * 360;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
      >
        {/* Clock face */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
        />

        {/* Hour markers */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="10"
            x2="50"
            y2="15"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}

        {/* Hour hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="25"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-primary origin-center"
          style={{
            transform: `rotate(${hoursRotation}deg)`,
            transition: 'transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
          }}
        />

        {/* Minute hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-primary origin-center"
          style={{
            transform: `rotate(${minutesRotation}deg)`,
            transition: 'transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
          }}
        />

        {/* Second hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          className="text-red-500 origin-center"
          style={{
            transform: `rotate(${secondsRotation}deg)`,
            transition: 'transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)'
          }}
        />

        {/* Center dot */}
        <circle
          cx="50"
          cy="50"
          r="2"
          fill="currentColor"
          className="text-primary"
        />
      </svg>
      
      {/* Digital time display */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-lg font-mono">
        {time.toLocaleTimeString()}
      </div>
    </div>
  );
}
