
var pause;
var data = [
[13.2,236],
[10,263],
[8.1,294],
[8.8,190],
[9,276],
[7.9,204],
[3.3,110],
[5.9,238],
[15.4,335],
[17.4,211],
[5.3,46],
[2.6,120],
[10.4,249],
[7.2,113],
[2.2,56],
[6,115],
[9.7,109],
[15.4,249],
[2.1,83],
[11.3,300],
[4.4,149],
[12.1,255],
[2.7,72],
[16.1,259],
[9,178],
[6,109],
[4.3,102],
[12.2,252],
[2.1,57],
[7.4,159],
[11.4,285],
[11.1,254],
[13,337],
[0.8,45],
[7.3,120],
[6.6,151],
[4.9,159],
[6.3,106],
[3.4,174],
[14.4,279],
[3.8,86],
[13.2,188],
[12.7,201],
[3.2,120],
[2.2,48],
[8.5,156],
[4,145],
[5.7,81],
[2.6,53],
[6.8,161]
];

var minx = 0.3;
var maxx = 17.4;
var miny = 45;
var maxy = 337;
var offset = 50;

var n = 2;
var centroids = Array(n);
var c = ["BLUE", "RED", "YELLOW", "PURPLE", "GREEN", "#55ddcc", "BLACK", "#33ff22"];

var screen = 600;

function setup() {
  createCanvas(screen, screen);
  background("#333");
  pause = false;
  frameRate(5);

  for(var i=0; i < data.length; i++){
    data[i] = [((data[i][0] - minx)/(maxx - minx))*(width-(2*offset))+(offset), ((data[i][1] - miny)/(maxy - miny))*(height-(2*offset))+(offset), "#38F1ED"];
  }

  for(var i=0; i < centroids.length; i++){
    centroids[i] = [random((width/2)-offset, (width/2)+offset), random((height/2)-offset, (height/2)+offset)];
  }
}

function draw() {
  
  if(!pause) {
    background("#333");
    display();
    update();
  }
}

function display() {
  var i;

  for(var i=0; i < data.length; i++){
    fill(data[i][2]);
    ellipse(data[i][0], data[i][1], 10, 10);
  }

  for(var i=0; i < centroids.length; i++){
    fill("#fff");
    rect(centroids[i][0], centroids[i][1], 10, 10);
  }
}

function update() {

  for(var i=0; i < data.length; i++) {
    data[i][2] = nearestCentroid(data[i][0], data[i][1]);
  }

  repositionCentroids();
}

function nearestCentroid(x, y) {
  var group = "YELLOW";
  var minDist = 0;
  var dist = 0;

  for(var i=0; i < centroids.length; i++){
    dist = sqrt(pow((x-centroids[i][0]), 2) + pow(y-centroids[i][1], 2));

    if((dist < minDist) || (minDist === 0)){
      group = c[i];
      minDist = dist;
    }
  }

  return group;
}

function repositionCentroids(){
  var calc = Array(centroids.length);

  for(var i=0; i < c.length; i++){
    calc[i] = [0, 0, 0];
  }

  for(var i=0; i < data.length; i++){
    for(var j=0; j < c.length; j++) {
      if(data[i][2] === c[j]){
        calc[j][0] += data[i][0];
        calc[j][1] += data[i][1];
        calc[j][2]++;
      }
    }
  }

  for(var i=0; i < centroids.length; i++){
    centroids[i][0] = calc[i][0]/calc[i][2];
    centroids[i][1] = calc[i][1]/calc[i][2];
  }
}

function keyPressed() {
  if(keyCode === ENTER) {
    pause = !pause;
  }
}