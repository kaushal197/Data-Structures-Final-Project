"use strict";

//Global vars
let times_per_step, board_raw, board, running;

// Normalization values
const fix_val = 4/3;
let fill_size = 10;

//Config
let config = {
  framerate: 60,
  width: 600,
  height: 400,
  n_bins: parseInt(document.getElementById("bins").value), //Start values
  n_balls: parseInt(document.getElementById("balls").value),
  n_seconds: parseFloat(document.getElementById("seconds").value),
}

let setup = () => {
  //Create Canvas
  createCanvas(config.width, config.height).parent("galton-container");
  
  frameRate(config.framerate);
  background("#333");
  noStroke();
  textSize(width / 20);
  textAlign(CENTER);
  runTrial();
}

document.getElementById("run").onclick = () => {
  config.n_balls = parseInt(document.getElementById("balls").value);
  config.n_bins = parseInt(document.getElementById("bins").value);
  config.n_seconds = parseFloat(document.getElementById("seconds").value);
  runTrial();
}

let runTrial = () => {
  const {n_balls, n_bins, n_seconds} = config;
  //Calculate how many are to be dropped per step
  times_per_step = Math.floor(n_balls / config.framerate / n_seconds);
  //Empty the bins
  board = new Array(n_bins).fill(0);
  board_raw = new Array(n_bins).fill(0);
  //Start the simulation
  running = true;
}

//This is run every step
let draw = () => {
  background("#333");
  fill("#ffb76e");


  if (running) {
    for (let i = Math.min(times_per_step, config.n_balls); i > 0; --i, --config.n_balls) {
      place();
    }

    //Normalize board
    while (Math.max.apply(null, board) >= height * 0.6) {
      fill_size = fill_size / fix_val;
      board.forEach(normalize);
    }
  }

  // Stop if we're out of balls  
  running = config.n_balls > 0;
  grid();
}

let grid = () => {
  //Draws the histogram
  const bins = config.n_bins;
  for (let i = 0; i < bins + 1; i++) {
    fill("#86e3ff");
    stroke("#fff");
    strokeWeight(4);
    rect(i * (width / bins), height - board[i], (width / bins), board[i]);
    fill("#ffb76e");  
    noStroke();
    text(int(board_raw[i] || 0), i * (width / bins) + (width / bins / 2), height/4);
  }
}

let place = () => {
  const bins = config.n_bins;
  let j = 0;
  let loc = floor(bins / 2);

  while (j < (bins - 1)) {
    loc += random([0.5, -0.5]);
    j++;
  }

  if ((loc * 10) % 10 >= 5) {
    loc = int(loc) + 1;
  } else {
    loc = int(loc);
  }

  board[loc] += fill_size;
  board_raw[loc] += 1; //This is the raw value without normalization
}

//Fixes vertical sizing of each bin
let normalize = (item, index) => {
  board[index] = item / fix_val;
}

//Sanity check for the number of bins (must be odd number of bins)
let bin_field = document.getElementById("bins");
bin_field.onchange = () => {
  if (parseInt(bin_field.value) % 2 === 0)
    bin_field.value++;
}
