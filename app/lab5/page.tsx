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

let target_string = "the quick brown fox jumps over the lazy dog"
let num_trials = 3

let msd_data : any[] = [];
let msd_start = Date.now();
let msd_first = false;
let cur_trial = 1
let msd_trials : any[] = [];

let kspc_data : any[] = [];
let kspc_start = Date.now();
let kspc_first = false;
let cur_kspc_trial = 1
let kspc_trials : any[] = [];
let keystrokes = 0

const levenshteinDistance = (s: string, t: string) => {
  if (!s.length) return t.length;
  if (!t.length) return s.length;
  const arr = [];
  for (let i = 0; i <= t.length; i++) {
    arr[i] = [i];
    for (let j = 1; j <= s.length; j++) {
      arr[i][j] =
        i === 0
          ? j
          : Math.min(
              arr[i - 1][j] + 1,
              arr[i][j - 1] + 1,
              arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
            );
    }
  }
  return arr[t.length][s.length];
};

function MSDResults() {
  console.log(msd_data.length)
  let total_time = 0
  let total_chars = target_string.length*num_trials
  let total_msd = 0
  console.log(msd_trials)
  for (let i = 0; i < msd_trials.length; i++) {
    total_time += msd_trials[i].data[msd_trials[i].data.length-1].time
    total_msd += levenshteinDistance(msd_trials[i].input, target_string)
  }
  let wpm = ((total_chars - 1)/(total_time/1000))*60*(1/5)
  let average_msd = total_msd / num_trials
  return (
    <div>
      <p><b>Total time:</b> {total_time} milliseconds! (or {total_time/1000} seconds)</p>
      <p><b>WPM: </b> {wpm}</p>
      <p><b>Average MSD: </b> {average_msd}</p>
    </div>
  )
}

export default function Lab5() {
  return(
    <main className={styles.main}>
      <div className={styles.card}>
        <h2>Lab 5: Text Entry Evaluation</h2>
        <p>In this lab, you'll be thinking about different ways of evaluating text entry techniques. Below are two different versions of 
          a text entry evaluation. In the first version, you are not allowed to use "backspace", and your error rate is calculated based 
          on minimum string distance (MSD). In the second version, you are not allowed to complete a trial until your input matches the 
          target string exactly, and your error rate is calculated based on keystrokes per character (KSPC).
        </p>
        <br></br>
        <p><b>To do this lab, complete the following:</b></p>
        <ol>
          <li>Complete both versions of the text entry evaluation. Make note of the results you get.</li>
          <li>Reflect on the difference between the two tasks. What are the advantages or disadvantages of each approach?</li>
          <li>Do you think there are certain types of input that would be better suited to one type of evaluation or the other? Why or why not?</li>
        </ol>
      </div>
      <MSDExperiment></MSDExperiment>
      <KSPCExperiment></KSPCExperiment>
    </main>
  )
}

function MSDExperiment() {
  const [done, setDone] = useState(false);
  const [msdInput, setMSDInput] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Backspace') {
      event.preventDefault(); // Prevent default behavior of backspace
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (cur_trial == num_trials){
        msd_trials.push({data: msd_data, input: msdInput})
        setDone(true);
      } else {
        msd_first = false;
        msd_trials.push({data: msd_data, input: msdInput})
        msd_data = []
      }
      setMSDInput('');
      cur_trial += 1;
    } else if (!msd_first) {
      msd_start = Date.now();
      msd_first = true;
    } else {
      msd_data.push({time: Date.now() - msd_start, character: event.key})
    }
  };
  const handleMSDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = (event.target as HTMLInputElement).value
    setMSDInput(newValue)
  };

  if (!done){
     return (
      <div>
        <br></br>
        <div className={styles.card}>
          <h2>No corrections allowed</h2>
         <p>In this task, you cannot press "backspace." Your accuracy will be calculated using minimum string distance (MSD). Your trial will
            start as soon as you type the first character. When you're done, press the "enter" button to get your results.
         </p>
          <br></br>
          <p><b>Trial</b> {cur_trial} out of {num_trials}</p>
          <p><b>Copy: "{target_string}"</b></p>
          <br></br>
          <TextField
            id="outlined-multiline-static"
            label="the quick brown fox"
            multiline
            rows={4}
            value={msdInput}
            placeholder="the quick brown fox jumps over the lazy dog"
            onKeyDown={handleKeyDown}
            onChange={handleMSDChange}
          />
        </div>
      </div>
    );} else {
    return (
    <div>
      <div className={styles.card}>
        <h2>No corrections allowed</h2>
        <p>In this task, you cannot press "backspace." Your accuracy will be calculated using minimum string distance (MSD). Your trial will
          start as soon as you type the first character. When you're done, press the "enter" button to get your results.
        </p>
        <br></br>
        <p><b>Trial</b> {cur_trial} out of {num_trials}</p>
        <p><b>Copy: "the quick brown fox jumps over the lazy dog"</b></p>
        <br></br>
        <TextField
          id="outlined-multiline-static"
          label="the quick brown fox"
          multiline
          rows={4}
          value={msdInput}
          placeholder="the quick brown fox jumps over the lazy dog"
          onKeyDown={handleKeyDown}
        />
        <MSDResults></MSDResults>
      </div>
    </div>)
  }
}

function KSPCResults() {
  let total_time = 0
  let total_chars = target_string.length*num_trials
  let total_ks = 0
  for (let i = 0; i < kspc_trials.length; i++) {
    total_time += kspc_trials[i].data[kspc_trials[i].data.length-1].time
    total_ks += kspc_trials[i].ks
  }
  let wpm = ((total_chars - 1)/(total_time/1000))*60*(1/5)
  let kspc = total_chars / total_ks
  return (
    <div>
      <p><b>Total time:</b> {total_time} milliseconds! (or {total_time/1000} seconds)</p>
      <p><b>WPM: </b> {wpm}</p>
      <p><b>KSPC: </b> {kspc}</p>
    </div>
  )
}

function KSPCExperiment() {
  const [done, setDone] = useState(false);
  const [kspcInput, setKSPCInput] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (kspcInput == target_string) {
        if (cur_kspc_trial == num_trials){
          kspc_trials.push({data: kspc_data, input: kspcInput, ks: keystrokes})
          setDone(true);
        } else {
          kspc_first = false;
          kspc_trials.push({data: kspc_data, input: kspcInput, ks: keystrokes})
          kspc_data = []
          keystrokes = 0
        }
        setKSPCInput('');
        cur_kspc_trial += 1;
      }   
    } else if (!kspc_first) {
      keystrokes += 1;
      kspc_start = Date.now();
      kspc_first = true;
    } else {
      keystrokes += 1;
      kspc_data.push({time: Date.now() - kspc_start, character: event.key})
    }
    console.log(kspc_data)
  };
  const handleKSPCChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = (event.target as HTMLInputElement).value
    console.log(newValue)
    setKSPCInput(newValue)
  };

  if (!done){
     return (
      <div>
        <br></br>
        <div className={styles.card}>
          <h2>No mistakes allowed</h2>
         <p>In this task, you cannot complete a trial without the string being totally correct. Your accuracy will be calculated 
          using minimum keystrokes per character (KSPC). Your trial will start as soon as you type the first character. When you're done,
          press the "enter" button to get your results.
         </p>
          <br></br>
          <p><b>Trial</b> {cur_kspc_trial} out of {num_trials}</p>
          <p><b>Copy: "{target_string}"</b></p>
          <br></br>
          <TextField
            id="outlined-multiline-static"
            label="the quick brown fox"
            multiline
            rows={4}
            value={kspcInput}
            placeholder="the quick brown fox jumps over the lazy dog"
            onKeyDown={handleKeyDown}
            onChange={handleKSPCChange}
          />
        </div>
      </div>
    );} else {
    return (
    <div>
      <div className={styles.card}>
        <h2>No corrections allowed</h2>
        <p>In this task, you cannot press "backspace." Your accuracy will be calculated using minimum string distance (MSD). Your trial will
          start as soon as you type the first character. When you're done, press the "enter" button to get your results.
        </p>
        <br></br>
        <p><b>Trial</b> {cur_kspc_trial} out of {num_trials}</p>
        <p><b>Copy: "the quick brown fox jumps over the lazy dog"</b></p>
        <br></br>
        <TextField
          id="outlined-multiline-static"
          label="the quick brown fox"
          multiline
          rows={4}
          value={kspcInput}
          placeholder="the quick brown fox jumps over the lazy dog"
          onKeyDown={handleKeyDown}
        />
        <KSPCResults></KSPCResults>
      </div>
    </div>)
  }
}

