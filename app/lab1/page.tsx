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
        <h2>Lab 1: Affordances</h2>
        <p>In this week's lab, you will be thinking about the idea of an affordance. For <b>each</b> example below, answer the following questions</p>
        <ol>
          <li>What interactions are <i>possible</i>?</li>
          <li>What interactions would you <i>expect</i> to be possible ?</li>
          <li>What are the <i>affordances</i> of the example, if any? Why do you consider them to be affordances?</li>
          <li>If an interaction that's possible or expected is NOT an affordance, why not?</li>
        </ol>
      </div>
      <h3>...</h3>
      <div className={styles.card}>
        <h2>Example 1</h2>
        <p>Have you heard that there's a secret page somewhere on this website?</p>
      </div>
      <h3>...</h3>
      <div className={styles.card}>
        <h2>Example 2</h2>
        <p>Have you heard that there's a <a
          href="secret"
          target="_blank"
          rel="noopener noreferrer"
        >secret page</a> somewhere on this website?</p>
      </div>
      <h3>...</h3>
      <div className={styles.card}>
        <h2>Example 3</h2>
        <p>Have you heard that there's a <a
          href="secret"
          style={{color: 'blue'}}
          target="_blank"
          rel="noopener noreferrer"
        >secret page</a> somewhere on this website?</p>
      </div>
      <h3>...</h3>
      <div className={styles.card}>
        <h2>Example 4</h2>
        <p style = {{padding: "10px"}}>Have you heard that there's a 
          <Button href="secret" variant="contained" color="primary" style={{marginLeft: "10px", marginRight: "10px"}}>Secret Page</Button> 
        somewhere on this website?</p>
      </div>
      <h3>...</h3>
      <div className={styles.card}>
        <h2>Example 5</h2>
        <p style = {{padding: "10px"}}>Have you heard that there's a 
          <Button variant="contained" color="primary" style={{marginLeft: "10px", marginRight: "10px"}}>Secret Page</Button> 
        somewhere on this website?</p>
      </div>
      <h3>...</h3>
      <div className={styles.card}>
        <h2>Example 6</h2>
        <p>Have you heard that there's a <a
          href="secret"
          target="_blank"
          rel="noopener noreferrer"
        >secret page</a> somewhere on this website?</p>
        <br></br>
        <p><b>Note:</b> to find the secret page, click the words "secret page" above. </p>
      </div>
    </main>
  );
}

