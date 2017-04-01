var frame = 480;
var bins = 5;
var board = Array.apply(null, Array(bins)).map(Number.prototype.valueOf,0);
var n = 1000000000;
var start_n = n;
var fix_val = 4/3;
var fill_size = 10;
var pause = false;

function setup() {
  createCanvas(frame*(4/3), frame);
  background("#333");
  noStroke();
  grid();
  if(n>100000){
    fill_size = 1/250;
    bins = bins*3;
    board = Array.apply(null, Array(bins)).map(Number.prototype.valueOf,0);
  }else if(n>10000){
    fill_size = 1/50;
    bins = bins*3;
    board = Array.apply(null, Array(bins)).map(Number.prototype.valueOf,0);
  }
  textSize(30);
  textAlign(CENTER);
  frameRate(60);
}

function draw() {
  background("#333");
  grid();
  text(n + " " + (round(int(frameRate())/10))*10, width/2, height/2);
  text(int(Math.max.apply(null, board)*(1/fill_size)), width/2, height/1.5);

  for(var i = 0; (n > 0) && (i <= start_n/(log(start_n)**2)); i++){
    if(!pause){
      place();
      n--;
    }
  }
}

function grid(){
  for(var i = 0; i < bins+1; i++) {
    //rect(i*(width/bins)+4, 0, 4, height);
    fill("#2897B7");
    rect(i*(width/bins)+8, height-board[i], (width/bins)-2, board[i]);
    fill("#fff");
  }
}

// n number of balls
function place(){

  var j = 0;
  var loc = floor(bins/2);

  while(j < (bins-1)){
    loc += random([0.5, -0.5]);
    j++;
  }

  round(loc);
  board[loc] += fill_size;
  //console.log(board[loc]);

  if(Math.max.apply(null, board) >= height*0.6){
    fill_size = fill_size/fix_val;
    //console.log(board);
    board.forEach(normalize);
    //console.log(board);
  }
}

function normalize(item, index){
  board[index] = item/fix_val;
}

function keyPressed(){
  if(keyCode === 32){
    pause = !pause;
  }
}