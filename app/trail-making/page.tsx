"use client";
import { useState, useEffect } from 'react';
import styles from "../page.module.css";
import Button from '@mui/material/Button';

export default function TrailMakingTask() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h2>Trail-making task!</h2>
        <p>Below is a trail making test, common in neuropsychology and related fields. The idea is to click on the dots in order, as fast and as accurately as you can.
        The timer will start as soon as you click on the circle labeled "1," and will end when you click on the final circle.
        </p>
        <p>Make sure to keep a list of your times!</p>
      </div>
      {TrailMakingExperiment()}
    </main>
  );
}

function TrailMakingExperiment() {
  const totalCircles = 13;
  const [positions, setPositions] = useState([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [current, setCurrent] = useState(1);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const newPositions = [];
    const radius = 30;
    const spacing = 100;
    const width = 600;
    const height = 500;
    const minDist = 80;

    while (newPositions.length < totalCircles) {
      const x = Math.random() * (width - 2 * radius);
      const y = Math.random() * (height - 2 * radius);
      const tooClose = newPositions.some(p => {
        const dx = p.x - x;
        const dy = p.y - y;
        return Math.sqrt(dx * dx + dy * dy) < minDist;
      });
      if (!tooClose) {
        newPositions.push({ x, y });
      }
    }

    setPositions(newPositions);
  }, [complete]);

  const handleClick = (index: number) => {
    if (index + 1 === current) {
      if (current === 1) {
        setStartTime(Date.now());
      }
      if (current === totalCircles) {
        setEndTime(Date.now());
        setComplete(true);
      }
      setCurrent(c => c + 1);
    }
  };

  const handleReset = () => {
    setCurrent(1);
    setEndTime(null);
    setStartTime(null);
    setComplete(false);
  };

  return (
    <div>
    <div style={{ position: 'relative', width: '600px', height: '500px', background: '#eee', border: '1px solid #ccc' }}>
      {positions.map((pos, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          style={{
            position: 'absolute',
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            width: '40px',
            height: '40px',
            borderRadius: '20px',
            background: index + 1 < current ? '#ccc' : 'skyblue',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            cursor: index + 1 === current && !complete ? 'pointer' : 'default',
            pointerEvents: complete || index + 1 > current ? 'none' : 'auto',
          }}
        >
          {index + 1}
        </div>
      ))}
    </div>

    {complete && (
    <div style={{ marginTop: '20px' }}>
      <p><strong>Completed in {(endTime! - startTime!) / 1000} seconds</strong></p>
      <Button variant="contained" onClick={handleReset}>Reset</Button>
    </div>
    )}
  </div>

  );
}