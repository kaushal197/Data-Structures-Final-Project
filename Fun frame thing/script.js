var pause;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB);
  background("#fff");
  noStroke();
  fill("#3418aa");
  pause = false;
}

function draw() {
  if (!pause){
    //background("#fff");
    i = 0;
    while(i < 10){
      x = random(50, 550);
      y = random(50, 550);

      if(x > 300) {
        var sx = map(x, 301, 550, 250, 0);
      } else {
        var sx = map(x, 50, 300, 0, 250); 
      }

      if(y > 300) {
        var sy = map(y, 301, 550, 250, 0);
      } else {
        var sy = map(y, 50, 300, 0, 250); 
      }

      s = min(sx, sy);

      if(s < 50) {
        fill(map(x, 50, 550, 0, 100), 75, 100);
        stroke(map(x, 50, 550, 0, 100), 100, 100);
        ellipse(x, y, s, s);
      }
      /*stroke(map(x, 50, 550, 0, 100), map(y, 50, 550, 0, 100), 80);
      noFill();
      rect(x-s/2, y-s/2, s, s);*/
      i++;
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER){
    pause = !pause;
  }
}