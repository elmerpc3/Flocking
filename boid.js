class boid
{
    constructor()
    {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2,4));
        this.accceleration = createVector();
        this.maxForce = 1;
        this.maxSpeed = 4;
    }

    edges()
    {
        if (this.position.x > width)
        {
          this.position.x = 0;
        }
        else if (this.position.x < 0)
        {
          this.position.x = width;
        }
        if (this.position.y > height)
        {
          this.position.y = 0;
        }
        else if (this.position.y < 0)
        {
          this.position.y = height;
        }
    }

    boids_group(boids)
    {
        //this.accceleration.set(0,0);

        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);

        separation.mult(separationSlider.value());
        cohesion.mult(cohesionSlider.value());
        alignment.mult(alignSlider.value());

        


        this.accceleration.add(separation);
        this.accceleration.add(alignment);
        this.accceleration.add(cohesion);
    }

    align(boids)
    {
        let perception = 50;
        let avg = createVector();
        let total = 0;
        for(let other of boids)
        {
            let distanc = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if(distanc < perception && other != this)
            {
                avg.add(other.velocity);
                total++;
            }    
        }
        if(total > 0)
        {
            avg.div(total);
            avg.setMag(this.maxSpeed);
            avg.sub(this.velocity);
            avg.limit(this.maxForce);
        }
        return avg;
    }

    cohesion(boids)
    {
        let perception = 100;
        let avg = createVector();
        let total = 0;
        for(let other of boids)
        {
            let distanc = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if(distanc < perception && other != this)
            {
                avg.add(other.position);
                total++;
            }    
        }
        if(total > 0)
        {
            avg.div(total);
            avg.sub(this.position);
            avg.setMag(this.maxSpeed);
            
            avg.sub(this.velocity);
            avg.limit(this.maxForce);
            

        }
        return avg;
    }

    separation(boids)
    {
        let perception = 50;
        let avg = createVector();
        let total = 0;
        for(let other of boids)
        {
            let distanc = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            if(distanc < perception && other != this)
            {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(distanc);
                avg.add(diff);
                total++;
            }    
        }
        if(total > 0)
        {
            avg.div(total);
            avg.setMag(this.maxSpeed);
            
            avg.sub(this.velocity);
            avg.limit(this.maxForce);
            

        }
        return avg;
    }

    update()
    {   
        this.position.add(this.velocity);
        this.velocity.add(this.accceleration);
        this.velocity.limit(this.maxSpeed);
        this.accceleration.mult(0);
    }

    show()
    {
        strokeWeight(3);
        stroke(0);
        point(this.position.x, this.position.y);

        let theta = this.velocity.heading() + radians(90);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        //triangle(this.position.x-2, this.position.y, this.position.x+2, this.position.y, this.position.x, this.position.y-8);
        triangle(-2, 0, 2, 0, 0, -8);
        pop();
    }
}