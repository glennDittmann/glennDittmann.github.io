function setup() {
    let canvas = createCanvas(650, 350);
    canvas.parent('left');
}
  
function draw() {
    background(100, 60, 60);
}

let rightSketch = function(p) {
    p.setup = function () {
        let canvas = p.createCanvas(650, 350);
        canvas.parent('right');
    }

    p.draw = function () {
        p.background(60, 100, 100);
    }
}

let myp5 = new p5(rightSketch);