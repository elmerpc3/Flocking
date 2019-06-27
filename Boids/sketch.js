const boids = [];

let alignSlider, cohesionSlider, separationSlider;



function setup() {
  // put setup code here
  createCanvas(1280, 720);
  alignSlider = createSlider(0, 5, 1, 0.1); 
  cohesionSlider = createSlider(0, 5, 1, 0.1); 
  separationSlider = createSlider(0, 5, 1, 0.1); 
  
  for(let i=0;i<100;i++)
  {
    boids.push(new boid());
  }
}

function draw() {
  // put drawing code here
  background(255);

  for(let boid of boids)
  {
    boid.boids_group(boids);
    boid.edges();
    boid.update();
    boid.show();
  }
}