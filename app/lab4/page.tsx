"use client";
import styles from "../page.module.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { mkConfig, generateCsv, download } from "export-to-csv";
import { VictoryScatter, VictoryLine, VictoryChart, VictoryLabel, VictoryAxis } from 'victory';

export default function Lab4() {
  return (
    <main className={styles.main}>
      <div className={styles.card}>
        <h2>Lab 4: Conjunctive Search</h2>
        <p>In this week's lab, you will designing the most difficult search task you can:</p>
        <ol>
          <li>Use the options below to adjust the features of both the target and the distractors for this experiment. You get two types of distractors to use. You may NOT make them identical (that would be cheating!)
          </li>
          <li>Swap with a classmate, and have them try your search task. Make note of their time. Whose was more difficult? Why?
          </li>
        </ol>
        <br></br>
        <p>Once you've done that, answer the following questions:</p>
        <ol>
          <li>Describe the setup you used (what were the features of your target, and your distractor?)
          </li>
          <li>How long did it take your partner to finish the task? Explain with reference to either the lecture or the reading.</li>
        </ol>
        <br></br>
        <p>To conduct the experiment, set up the parameters below, then click "begin experiment." You will alternate between clicking a 
          square in the top-left corner, and a target. Try to click the targets as fast as you can. There is no penalty for inaccuracy.
          When you're done, you'll have the option to download a CSV of your data. 
        </p>
      </div>
      {ExpOptions()}
      {Experiment()}
    </main>
  );
}

let alpha = 1;
let r = 200;
let b = 200;
let g = 200;

let maxSize = 80;
let minSize = 10;
let maxDist = 240;
let minDist = 30

let globalSizes = [20, 40, 80]
let globalDists = [50, 200, 400]

let numTrials = 25;
let curTrial = 0;

let dataRows : any[] = [];

let globTColor = "black"
let globTAngle = "0deg"
let globTShape = "0%"

let globd1Color = "black"
let globd1Angle = "0deg"
let globd1Shape = "0%"

let globd2Color = "black"
let globd2Angle = "0deg"
let globd2Shape = "0%"

function ExpOptions(){
  const [tColor, setTColor] = useState("black")
  const handleTColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newColor = (event.target as HTMLInputElement).value
    setTColor(newColor);
    globTColor = newColor;
  };

  const [tAngle, setTAngle] = useState("0deg")
  const handleTAngle = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = (event.target as HTMLInputElement).value
    setTAngle(newValue);
    globTAngle = newValue
  };

  const [tShape, setTShape] = useState("0%")
  const handleTShape = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = (event.target as HTMLInputElement).value
    setTShape(newValue);
    globTShape = newValue
  };

  const [d1Color, setd1Color] = useState("black")
  const handled1Color = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newColor = (event.target as HTMLInputElement).value
    setd1Color(newColor);
    globd1Color = newColor;
  };

  const [d1Angle, setd1Angle] = useState("0deg")
  const handled1Angle = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = (event.target as HTMLInputElement).value
    setd1Angle(newValue);
    globd1Angle = newValue;
  };

  const [d1Shape, setd1Shape] = useState("0%")
  const handled1Shape = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = (event.target as HTMLInputElement).value
    setd1Shape(newValue);
    globd1Shape = newValue;
  };

  const [d2Shape, setd2Shape] = useState("0%")
  const handled2Shape = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = (event.target as HTMLInputElement).value
    setd2Shape(newValue);
    globd2Shape = newValue;
  };

  const [d2Color, setd2Color] = useState("black")
  const handled2Color = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newColor = (event.target as HTMLInputElement).value
    setd2Color(newColor);
    globd2Color = newColor;
  };

  const [d2Angle, setd2Angle] = useState("0deg")
  const handled2Angle = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = (event.target as HTMLInputElement).value
    setd2Angle(newValue);
    globd2Angle = newValue;
  };


  const [numberTrials, setNumTrials] = useState(25)
  const handleNumTrials = (event: Event, newValue: number | number[]) => {
    setNumTrials(newValue as number);
    numTrials = (newValue as number);
  }

  return (
    <div>
      <h2>Target Features</h2>
      <br></br>
      <div style = {{width: `50px`, height: `50px`,  rotate: `${tAngle}`, background: `${tColor}`, borderRadius: `${tShape}`}}></div>
      <br></br>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Color</FormLabel>
          <RadioGroup
           aria-labelledby="demo-radio-buttons-group-label"
           defaultValue="black"
           name="radio-buttons-group"
           onChange={handleTColor}
          >
          <FormControlLabel value="black" control={<Radio />} label="Black" />
          <FormControlLabel value="blue" control={<Radio />} label="Blue" />
          <FormControlLabel value="red" control={<Radio />} label="Red" />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Angle</FormLabel>
          <RadioGroup
           aria-labelledby="demo-radio-buttons-group-label"
           defaultValue="black"
           name="radio-buttons-group"
           onChange={handleTAngle}
          >
          <FormControlLabel value="0deg" control={<Radio />} label="0 degrees" />
          <FormControlLabel value="45deg" control={<Radio />} label="45 degrees" />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Corners</FormLabel>
          <RadioGroup
           aria-labelledby="demo-radio-buttons-group-label"
           defaultValue="black"
           name="radio-buttons-group"
           onChange={handleTShape}
          >
          <FormControlLabel value="0%" control={<Radio />} label="Sharp" />
          <FormControlLabel value="30%" control={<Radio />} label="Soft" />
        </RadioGroup>
      </FormControl>

      <h2>Distractor type 1</h2>
      <br></br>
      <div style = {{width: `50px`, height: `50px`,  rotate: `${d1Angle}`, background: `${d1Color}`, borderRadius: `${d1Shape}`}}></div>
      <br></br>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Color</FormLabel>
          <RadioGroup
           aria-labelledby="demo-radio-buttons-group-label"
           defaultValue="black"
           name="radio-buttons-group"
           onChange={handled1Color}
          >
          <FormControlLabel value="black" control={<Radio />} label="Black" />
          <FormControlLabel value="blue" control={<Radio />} label="Blue" />
          <FormControlLabel value="red" control={<Radio />} label="Red" />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Angle</FormLabel>
          <RadioGroup
           aria-labelledby="demo-radio-buttons-group-label"
           defaultValue="black"
           name="radio-buttons-group"
           onChange={handled1Angle}
          >
          <FormControlLabel value="0deg" control={<Radio />} label="0 degrees" />
          <FormControlLabel value="45deg" control={<Radio />} label="45 degrees" />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Corners</FormLabel>
          <RadioGroup
           aria-labelledby="demo-radio-buttons-group-label"
           defaultValue="black"
           name="radio-buttons-group"
           onChange={handled1Shape}
          >
          <FormControlLabel value="0%" control={<Radio />} label="Sharp" />
          <FormControlLabel value="30%" control={<Radio />} label="Soft" />
        </RadioGroup>
      </FormControl>

      <h2>Distractor type 2</h2>
      <br></br>
      <div style = {{width: `50px`, height: `50px`,  rotate: `${d2Angle}`, background: `${d2Color}`, borderRadius: `${d2Shape}`}}></div>
      <br></br>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Color</FormLabel>
          <RadioGroup
           aria-labelledby="demo-radio-buttons-group-label"
           defaultValue="black"
           name="radio-buttons-group"
           onChange={handled2Color}
          >
          <FormControlLabel value="black" control={<Radio />} label="Black" />
          <FormControlLabel value="blue" control={<Radio />} label="Blue" />
          <FormControlLabel value="red" control={<Radio />} label="Red" />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Angle</FormLabel>
          <RadioGroup
           aria-labelledby="demo-radio-buttons-group-label"
           defaultValue="black"
           name="radio-buttons-group"
           onChange={handled2Angle}
          >
          <FormControlLabel value="0deg" control={<Radio />} label="0 degrees" />
          <FormControlLabel value="45deg" control={<Radio />} label="45 degrees" />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Corners</FormLabel>
          <RadioGroup
           aria-labelledby="demo-radio-buttons-group-label"
           defaultValue="black"
           name="radio-buttons-group"
           onChange={handled2Shape}
          >
          <FormControlLabel value="0%" control={<Radio />} label="Sharp" />
          <FormControlLabel value="30%" control={<Radio />} label="Soft" />
        </RadioGroup>
      </FormControl>

      <h3>Number of trials</h3>
      <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Number of trials'}
        value={numberTrials}
        onChange={handleNumTrials}
        valueLabelDisplay="auto"
      />
    </Box>
    <p>Trial {curTrial} out of {numTrials}</p>
    </div>
  )
}

function Results() {
  let total_time = 0
  for (let i = 0; i < dataRows.length; i++){
    total_time = dataRows[i]["seconds"] + total_time
  }
  return (
    <div>
      <p><b>Total time:</b> {total_time} seconds!</p>
    </div>
  )
}

let locations = [{
  "left": 20,
  "top": 20
  },
  {
    "left": 60,
    "top": 20
  },
  {
    "left": 100,
    "top": 20
  },
  {
    "left": 140,
    "top": 20
  },
  {
    "left": 180,
    "top": 20
  },
  {
    "left": 240,
    "top": 20
  },
  {
    "left": 280,
    "top": 20
  },
  {
    "left": 320,
    "top": 20
  },
  {
    "left": 360,
    "top": 20
  },
  {
    "left": 400,
    "top": 20
  },
  {
    "left": 440,
    "top": 20
  },
  {
    "left": 480,
    "top": 20
  },
  {
    "left": 520,
    "top": 20
  },
  {
    "left": 560,
    "top": 20
  },
  {
    "left": 20,
    "top": 80
    },
    {
      "left": 60,
      "top": 80
    },
    {
      "left": 100,
      "top": 80
    },
    {
      "left": 140,
      "top": 80
    },
    {
      "left": 180,
      "top": 80
    },
    {
      "left": 240,
      "top": 80
    },
    {
      "left": 280,
      "top": 80
    },
    {
      "left": 320,
      "top": 80
    },
    {
      "left": 360,
      "top": 80
    },
    {
      "left": 400,
      "top": 80
    },
    {
      "left": 440,
      "top": 80
    },
    {
      "left": 480,
      "top": 80
    },
    {
      "left": 520,
      "top": 80
    },
    {
      "left": 560,
      "top": 160
    },
    {
      "left": 20,
      "top": 160
      },
      {
        "left": 60,
        "top": 160
      },
      {
        "left": 100,
        "top": 160
      },
      {
        "left": 140,
        "top": 160
      },
      {
        "left": 180,
        "top": 160
      },
      {
        "left": 240,
        "top": 160
      },
      {
        "left": 280,
        "top": 160
      },
      {
        "left": 320,
        "top": 160
      },
      {
        "left": 360,
        "top": 160
      },
      {
        "left": 400,
        "top": 160
      },
      {
        "left": 440,
        "top": 160
      },
      {
        "left": 480,
        "top": 160
      },
      {
        "left": 520,
        "top": 160
      },
      {
        "left": 560,
        "top": 160
      },
      {
        "left": 20,
        "top": 240
        },
        {
          "left": 60,
          "top": 240
        },
        {
          "left": 100,
          "top": 240
        },
        {
          "left": 140,
          "top": 240
        },
        {
          "left": 180,
          "top": 240
        },
        {
          "left": 240,
          "top": 240
        },
        {
          "left": 280,
          "top": 240
        },
        {
          "left": 320,
          "top": 240
        },
        {
          "left": 360,
          "top": 240
        },
        {
          "left": 400,
          "top": 240
        },
        {
          "left": 440,
          "top": 240
        },
        {
          "left": 480,
          "top": 240
        },
        {
          "left": 520,
          "top": 240
        },
        {
          "left": 560,
          "top": 240
        },
        {
          "left": 20,
          "top": 340
          },
          {
            "left": 60,
            "top": 340
          },
          {
            "left": 100,
            "top": 340
          },
          {
            "left": 140,
            "top": 340
          },
          {
            "left": 180,
            "top": 340
          },
          {
            "left": 240,
            "top": 340
          },
          {
            "left": 280,
            "top": 340
          },
          {
            "left": 320,
            "top": 340
          },
          {
            "left": 360,
            "top": 340
          },
          {
            "left": 400,
            "top": 340
          },
          {
            "left": 440,
            "top": 340
          },
          {
            "left": 480,
            "top": 340
          },
          {
            "left": 520,
            "top": 340
          },
          {
            "left": 560,
            "top": 340
          },
          {
            "left": 20,
            "top": 420
            },
            {
              "left": 60,
              "top": 420
            },
            {
              "left": 100,
              "top": 420
            },
            {
              "left": 140,
              "top": 420
            },
            {
              "left": 180,
              "top": 420
            },
            {
              "left": 240,
              "top": 420
            },
            {
              "left": 280,
              "top": 420
            },
            {
              "left": 320,
              "top": 420
            },
            {
              "left": 360,
              "top": 420
            },
            {
              "left": 400,
              "top": 420
            },
            {
              "left": 440,
              "top": 420
            },
            {
              "left": 480,
              "top": 420
            },
            {
              "left": 520,
              "top": 420
            },
            {
              "left": 560,
              "top": 420
            }
]

function Experiment() {
  const [active, setActive] = useState(false);
  const [trial, setTrial] = useState(false);
  //Are we running an experiment?
  if (active){
    //Are we in a trial?
    if (trial){
      //Random locations
      let slots = []
      for (var i=0;i<locations.length;i++) {
        slots.push(i);
      }
      let d1a_slot_ind = slots.splice(Math.floor(Math.random()*slots.length), 1)[0]
      let d1b_slot_ind = slots.splice(Math.floor(Math.random()*slots.length), 1)[0]
      let d1c_slot_ind = slots.splice(Math.floor(Math.random()*slots.length), 1)[0]
      let d1d_slot_ind = slots.splice(Math.floor(Math.random()*slots.length), 1)[0]
      let d1e_slot_ind = slots.splice(Math.floor(Math.random()*slots.length), 1)[0]
      let d2a_slot_ind = slots.splice(Math.floor(Math.random()*slots.length), 1)[0]
      let d2b_slot_ind = slots.splice(Math.floor(Math.random()*slots.length), 1)[0]
      let d2c_slot_ind = slots.splice(Math.floor(Math.random()*slots.length), 1)[0]
      let d2d_slot_ind = slots.splice(Math.floor(Math.random()*slots.length), 1)[0]
      let d2e_slot_ind = slots.splice(Math.floor(Math.random()*slots.length), 1)[0]
      let target_slot_ind = slots.splice(Math.floor(Math.random()*slots.length), 1)[0]
      let d1a_slot = locations[d1a_slot_ind]
      let d1b_slot = locations[d1b_slot_ind]
      let d1c_slot = locations[d1c_slot_ind]
      let d1d_slot = locations[d1d_slot_ind]
      let d1e_slot = locations[d1e_slot_ind]
      let d2a_slot = locations[d2a_slot_ind]
      let d2b_slot = locations[d2b_slot_ind]
      let d2c_slot = locations[d2c_slot_ind]
      let d2d_slot = locations[d2d_slot_ind]
      let d2e_slot = locations[d2e_slot_ind]
      let target_slot = locations[target_slot_ind]
      let start = Date.now();
      return (
        <div style = {{justifyContent: 'center', width: '600px'}}>
          <div style={{display: 'inline-block', width: '100%', height: '500px', background: `rgb(${r},${g},${b})`, position: 'relative'}}>
            <div style = {{position: 'absolute',  width: `30px`, height: `30px`, left: `${target_slot.left}px`, top:`${target_slot.top}px`, rotate: `${globTAngle}`, background: `${globTColor}`, borderRadius: `${globTShape}`}} 
            onClick={() => {
              curTrial += 1;
              setTrial(false);
              dataRows.push({seconds: (Date.now()-start)/1000}
                             )
            }}
            >
            </div>
            <div style = {{position: 'absolute',  width: `30px`, height: `30px`, 
            left: `${d1a_slot.left}px`, top:`${d1a_slot.top}px`, 
            rotate: `${globd1Angle}`, background: `${globd1Color}`, borderRadius: `${globd1Shape}`}}>
            </div>
            <div style = {{position: 'absolute',  width: `30px`, height: `30px`, 
            left: `${d1b_slot.left}px`, top:`${d1b_slot.top}px`, 
            rotate: `${globd1Angle}`, background: `${globd1Color}`, borderRadius: `${globd1Shape}`}}>
            </div>
            <div style = {{position: 'absolute',  width: `30px`, height: `30px`, 
            left: `${d1c_slot.left}px`, top:`${d1c_slot.top}px`, 
            rotate: `${globd1Angle}`, background: `${globd1Color}`, borderRadius: `${globd1Shape}`}}>
            </div>
            <div style = {{position: 'absolute',  width: `30px`, height: `30px`, 
            left: `${d1d_slot.left}px`, top:`${d1d_slot.top}px`, 
            rotate: `${globd1Angle}`, background: `${globd1Color}`, borderRadius: `${globd1Shape}`}}>
            </div>
            <div style = {{position: 'absolute',  width: `30px`, height: `30px`, 
            left: `${d1e_slot.left}px`, top:`${d1e_slot.top}px`, 
            rotate: `${globd1Angle}`, background: `${globd1Color}`, borderRadius: `${globd1Shape}`}}>
            </div>
            <div style = {{position: 'absolute',  width: `30px`, height: `30px`, 
            left: `${d2a_slot.left}px`, top:`${d2a_slot.top}px`, 
            rotate: `${globd2Angle}`, background: `${globd2Color}`, borderRadius: `${globd2Shape}`}}>
            </div>
            <div style = {{position: 'absolute',  width: `30px`, height: `30px`, 
            left: `${d2b_slot.left}px`, top:`${d2b_slot.top}px`, 
            rotate: `${globd2Angle}`, background: `${globd2Color}`, borderRadius: `${globd2Shape}`}}>
            </div>
            <div style = {{position: 'absolute',  width: `30px`, height: `30px`, 
            left: `${d2c_slot.left}px`, top:`${d2c_slot.top}px`, 
            rotate: `${globd2Angle}`, background: `${globd2Color}`, borderRadius: `${globd2Shape}`}}>
            </div>
            <div style = {{position: 'absolute',  width: `30px`, height: `30px`, 
            left: `${d2d_slot.left}px`, top:`${d2d_slot.top}px`, 
            rotate: `${globd2Angle}`, background: `${globd2Color}`, borderRadius: `${globd2Shape}`}}>
            </div>
            <div style = {{position: 'absolute',  width: `30px`, height: `30px`, 
            left: `${d2e_slot.left}px`, top:`${d2e_slot.top}px`, 
            rotate: `${globd2Angle}`, background: `${globd2Color}`, borderRadius: `${globd2Shape}`}}>
            </div>
           
          </div>
        </div>
      )
    } else {
      //Are we finished all the trials? If not, keep going!
      if (curTrial < numTrials) {
        //Return reset screen
        return (
        <div style = {{justifyContent: 'center', width: '600px'}}>
          <div style={{display: 'inline-block', width: '100%', height: '500px', background: `rgb(${r},${g},${b}, ${alpha})`, position: 'relative'}}>
            <div style = {{position: 'absolute',  width: `25px`, height: `25px`, background: 'black'}} 
            onClick={() => {
              setTrial(true);
            }}
            >
            </div>
          </div>
        </div>
      )
      }
      //If so, we end!
      else {
        const csvConfig = mkConfig({ useKeysAsHeaders: true });
        const csv = generateCsv(csvConfig)(dataRows);
        const csvBtn = document.getElementById("csv_button");
        return (
          <div style = {{justifyContent: 'center', width: '600px'}}>
            <br></br>
            <Button style = {{background: "rgb(0,200,0"}}
              onClick={() => {
              setActive(false);
              curTrial = 0;
              }}
              >
              Reset
            </Button>
            <div style={{display: 'inline-block', width: '100%', height: '500px', background: `rgb(${r},${g},${b})`, position: 'relative'}}>
            </div>
            <Button
              onClick={() => {
                download(csvConfig)(csv);
              }}
              >
              Download CSV of results
            </Button>
            <Results/>
          </div>
          )
      }
    }
  } else {
    return (
      <div style = {{justifyContent: 'center', width: '600px'}}>
        <br></br>
        <Button style = {{background: "rgb(0,200,0"}}
          onClick={() => {
            setActive(true);
          }}
          >
          Begin Experiment
        </Button>
        <br></br>
        <div style={{display: 'inline-block', width: '100%', height: '500px', background: `rgb(${r},${g},${b})`, position: 'relative'}}>
        </div>
      </div>
      )}
}
