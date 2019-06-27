const boids = [];

let alignSlider, cohesionSlider, separationSlider;



function setup() {
  textSize(48 );
  // put setup code here
  createCanvas(1280, 720);

  label = createDiv('Align');
  label.position(1350,100);
  label2 = createDiv('Cohesion');
  label2.position(1350,200);
  label3 = createDiv('Separation');
  label3.position(1350,300);

  alignSlider = createSlider(0, 5, 1, 0.1); 
  cohesionSlider = createSlider(0, 5, 1, 0.1); 
  separationSlider = createSlider(0, 5, 1, 0.1); 

  alignSlider.parent(label);
  cohesionSlider.parent(label2);
  separationSlider.parent(label3);
  
  
  
  for(let i=0;i<100;i++)
  {
    boids.push(new boid());
  }
}

function draw() {
  // put drawing code here
  background(255);

  if (mouseIsPressed == true)
  {
    let aux = new boid();
    aux.position.x = mouseX;
    aux.position.y = mouseY;
    boids.push(aux);
  }

  for(let boid of boids)
  {
    boid.boids_group(boids);
    boid.edges();
    boid.update();
    boid.show();
  }

}