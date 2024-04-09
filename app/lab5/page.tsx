"use client";
import styles from "../page.module.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import { mkConfig, generateCsv, download } from "export-to-csv";
import Keyboard from 'simple-keyboard';
import 'simple-keyboard/build/css/index.css';

let msd_data : any[] = [];
let msd_start = Date.now();
let msd_first = false;

function MSDResults() {
  console.log(msd_data.length)
  let total_time = msd_data[msd_data.length-1].time
  return (
    <div>
      <p><b>Total time:</b> {total_time} milliseconds! (or {total_time/1000} seconds)</p>
    </div>
  )
}

export default function Lab5() {
  const [done, setDone] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Backspace') {
      event.preventDefault(); // Prevent default behavior of backspace
    } else if (event.key === 'Enter') {
      event.preventDefault();
      setDone(true);
    } else if (!msd_first) {
      msd_start = Date.now();
      msd_first = true;
    } else {
      msd_data.push({time: Date.now() - msd_start, character: event.key})
    }
    console.log(msd_data)
  };
  if (!done){
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h2>Lab 5: Text Entry Evaluation</h2>
        <p>Sorry, this lab is still under construction!</p>
      </div>
      <br></br>
      <div className={styles.card}>
        <h2>No corrections allowed</h2>
        <p>In this task, you cannot press "backspace." Your accuracy will be calculated using minimum string distance (MSD). Your trial will
          start as soon as you type the first character. When you're done, press the "enter" button to get your results.
        </p>
        <br></br>
        <p><b>Copy: "the quick brown fox jumps over the lazy dog"</b></p>
        <br></br>
        <TextField
          id="outlined-multiline-static"
          label="the quick brown fox"
          multiline
          rows={4}
          placeholder="the quick brown fox jumps over the lazy dog"
          onKeyDown={handleKeyDown}
        />
      </div>
    </main>
  );} else {
    return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h2>Lab 5: Text Entry Evaluation</h2>
        <p>Sorry, this lab is still under construction!</p>
      </div>
      <div className={styles.card}>
        <h2>No corrections allowed</h2>
        <p>In this task, you cannot press "backspace." Your accuracy will be calculated using minimum string distance (MSD). Your trial will
          start as soon as you type the first character. When you're done, press the "enter" button to get your results.
        </p>
        <p><b>Copy: "the quick brown fox jumps over the lazy dog"</b></p>
        <TextField
          id="outlined-multiline-static"
          label="the quick brown fox"
          multiline
          rows={4}
          placeholder="the quick brown fox jumps over the lazy dog"
          onKeyDown={handleKeyDown}
        />
        <MSDResults></MSDResults>
      </div>
    </main>)
  }
}

