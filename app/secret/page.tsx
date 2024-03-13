"use client";
import styles from "../page.module.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import { mkConfig, generateCsv, download } from "export-to-csv";
import ahoy from './ahoy.jpg'

export default function Secret() {
  return (
    <main className={styles.main}>
       <img src={ahoy.src} alt="An image of Mr. Krabs from Spongebob saying Ahoy matey, ye made it to the secret page."/>
    </main>
  );
}

