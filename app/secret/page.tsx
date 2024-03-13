"use client";
import styles from "../page.module.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import { mkConfig, generateCsv, download } from "export-to-csv";

export default function Secret() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h2>You found the secret page!</h2>
        <p>:)</p>
      </div>
    </main>
  );
}

