var frame = 480;
var bins = 13;
var board = Array.apply(null, Array(bins)).map(Number.prototype.valueOf,0);
var n = 500;
var start_n = n;
var fix_val = 4/3;
var fill_size = 10;
var pause = false;
var animate = true;

function setup() {
  createCanvas(frame*(4/3), frame);

  var params = getURLParams();
  n = params.n;
  animate = params.animate;
  start_n = n;

  background("#333");
  noStroke();

  textSize(int(frame/20));
  textAlign(CENTER);
  frameRate(60);
}

function draw() {
  background("#333");
  fill("#ffb76e");
  text(n + " " + (round(int(frameRate())/10))*10, width/2, height/4);
  text("Max Value: " + int(Math.max.apply(null, board)*(1/fill_size)) + "/" + start_n, width/2, height/3);

  if(!pause){
    if(animate === "true"){
      for(var i = 0; (n > 0) && (i <= start_n/(n)); i++){
        if(!pause){
          place();
          n--;
        }
      }
    }else{
      console.time("place");
      for(var i = 0; n > 0; i++){
        place();
        n--;
      }
      console.timeEnd("place");
      pause = true;
    } 
  }


  while(Math.max.apply(null, board) >= height*0.6){
    fill_size = fill_size/fix_val;
    board.forEach(normalize);
  }

  grid();
}

function grid(){
  //Draws the histogram
  for(var i = 0; i < bins+1; i++) {
    fill("#86e3ff");
    stroke("#fff");
    strokeWeight(4);
    rect(i*(width/bins), height-board[i], (width/bins), board[i]);
    noStroke();
  }
}

// n number of balls to be dropped
function place(){

  var loc = floor(bins/2);

  for(var j=0; j < (bins-1); j++){
    loc += random([0.5, -0.5]);
  }

  if((loc*10)%10 >= 5){
    loc = int(loc) + 1;
  } else {
    loc = int(loc);
  }

  board[loc] += fill_size;
}

//Fixes vertical sizing of each bin
function normalize(item, index){
  board[index] = item/fix_val;
}

function keyPressed(){
  if(keyCode === 32){
    pause = !pause;
  }
}