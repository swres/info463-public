"use client";
import styles from "../page.module.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import { mkConfig, generateCsv, download } from "export-to-csv";

export default function Lab1() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h2>Lab 6: Working with pens</h2>
        <p>Imagine you're working on a AR drawing system that lets the user draw images in the air while wearing VR goggles, 
          using a pen/stylus. How do you know where the "surface" is? How do we know when we are in state 2 (i.e., dragging state) vs. state 0 (out of range)? 
        </p>
        <br></br>
        <p><b>For this lab,</b> draw a short flipbook (~5 sketches) to demonstrate how a user might interact with such a system to draw in 
        mid-air. This is to give you practice thinking about touch/pen input, and also working with flip books for your group project! You can submit a list of sketches, a google slide deck, etc.</p>
      </div>
    </main>
  );
}

