class cgIShape {
    constructor () {
        this.points = [];
        this.bary = [];
        this.indices = [];
    }

    baseMaker(divisions, rads, baseStart, isTwoBase) {
        for (var degree = 0; degree <= rads; degree += divisions) {
            this.addTriangle(baseStart * Math.cos(degree), -baseStart, baseStart * Math.sin(degree), 
                        0, -baseStart, 0,
                        baseStart * Math.cos(degree - divisions), -baseStart, baseStart * Math.sin(degree - divisions));
    
            if (isTwoBase) {
                this.addTriangle(baseStart * Math.cos(degree - divisions), baseStart, baseStart * Math.sin(degree - divisions),
                        0, baseStart, 0,
                        baseStart * Math.cos(degree), baseStart, baseStart * Math.sin(degree));
            }
        }
    }
    
    
    addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {
        var nverts = this.points.length / 4;
        
        // push first vertex
        this.points.push(x0);  this.bary.push (1.0);
        this.points.push(y0);  this.bary.push (0.0);
        this.points.push(z0);  this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
        
        // push second vertex
        this.points.push(x1); this.bary.push (0.0);
        this.points.push(y1); this.bary.push (1.0);
        this.points.push(z1); this.bary.push (0.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++
        
        // push third vertex
        this.points.push(x2); this.bary.push (0.0);
        this.points.push(y2); this.bary.push (0.0);
        this.points.push(z2); this.bary.push (1.0);
        this.points.push(1.0);
        this.indices.push(nverts);
        nverts++;
    }
}

class Cube extends cgIShape {
    
    constructor (subdivisions) {
        super();
        this.makeCube (subdivisions);
    }
    
    makeCube (subdivisions)  {
        
        // fill in your cube code here.
        var side_len = 1 / subdivisions

        var start = 0.5
        for(var row = 0; row < subdivisions; row++) {
            for(var col = 0; col < subdivisions; col++) {
                // front
                this.addTriangle (-start + (col * side_len), start - (row * side_len), start, 
                            -start + side_len + (col * side_len), start - side_len - (row * side_len), start, 
                            -start + side_len + (col * side_len), start - (row * side_len), start);
                this.addTriangle (-start + (col * side_len), start - (row * side_len), start, 
                            -start + (col * side_len), start - side_len - (row * side_len), start,
                            -start + side_len + (col * side_len), start - side_len - (row * side_len), start);

                // back
                this.addTriangle (-start + side_len + (col * side_len), start - side_len - (row * side_len), -start, 
                            -start + (col * side_len), start - (row * side_len), -start,             
                            -start + side_len + (col * side_len), start - (row * side_len), -start);
                this.addTriangle (-start + (col * side_len), start - side_len - (row * side_len), -start,
                            -start + (col * side_len), start - (row * side_len), -start,             
                            -start + side_len + (col * side_len), start - side_len - (row * side_len), -start);
                
                // left
                this.addTriangle (-start, start - (row * side_len), -start + (col * side_len), 
                            -start, start - side_len - (row * side_len), -start + side_len + (col * side_len),             
                            -start, start - (row * side_len), -start + side_len + (col * side_len));
                this.addTriangle (-start, start - (row * side_len), -start + (col * side_len), 
                            -start,  start - side_len- (row * side_len), -start + (col * side_len), 
                            -start, start - side_len - (row * side_len), -start + side_len + (col * side_len));

                // right
                this.addTriangle (start, start - side_len - (row * side_len), -start + side_len + (col * side_len),
                            start, start - (row * side_len), -start + (col * side_len), 
                            start, start - (row * side_len), -start + side_len + (col * side_len));
                this.addTriangle (start,  start - side_len- (row * side_len), -start + (col * side_len), 
                            start, start - (row * side_len), -start + (col * side_len), 
                            start, start - side_len - (row * side_len), -start + side_len + (col * side_len));

                // top
                this.addTriangle (-start + (col * side_len), start, -start + (row * side_len), 
                            -start + side_len + (col * side_len), start, -start + side_len + (row * side_len),             
                            -start + side_len + (col * side_len), start, -start + (row * side_len));
                this.addTriangle (-start + (col * side_len), start, -start + (row * side_len), 
                            -start + (col * side_len), start, -start + side_len + (row * side_len),
                            -start + side_len + (col * side_len), start, -start + side_len + (row * side_len));
                
                // bottom
                this.addTriangle (-start + side_len + (col * side_len), -start, -start + side_len + (row * side_len),
                            -start + (col * side_len), -start, -start + (row * side_len), 
                            -start + side_len + (col * side_len), -start, -start + (row * side_len));
                this.addTriangle (-start + (col * side_len), -start, -start + side_len + (row * side_len),
                            -start + (col * side_len), -start, -start + (row * side_len), 
                            -start + side_len + (col * side_len), -start, -start + side_len + (row * side_len));            
            }
        }
    }
}


class Cylinder extends cgIShape {

    constructor (radialdivision,heightdivision) {
        super();
        this.makeCylinder (radialdivision,heightdivision);
    }
    
    makeCylinder (radialDivision,heightDivision){
        // fill in your cylinder code here
        var heightDivTransformed = 1 / heightDivision;
        var rads = radians(360);
        var radDivision = rads / radialDivision;
        var start = 0.5;
        var radius = 0.5;
        // makes the base of the cylinder at the top 
        this.baseMaker(radDivision, rads, 0.5, true);
        for (var yCoor = -start; yCoor <= start - (heightDivTransformed / 2); yCoor += heightDivTransformed) {
            for (var unit = 0; unit <= rads; unit += radDivision) {
                this.addTriangle(radius * Math.cos(unit + radDivision), yCoor, radius * Math.sin(unit + radDivision),
                            radius * Math.cos(unit), yCoor, radius * Math.sin(unit),
                            radius * Math.cos(unit), yCoor + heightDivTransformed, radius * Math.sin(unit));
                this.addTriangle(radius * Math.cos(unit + radDivision), yCoor, radius * Math.sin(unit + radDivision),
                            radius * Math.cos(unit), yCoor + heightDivTransformed, radius * Math.sin(unit),
                            radius * Math.cos(unit + radDivision), yCoor + heightDivTransformed, radius * Math.sin(unit + radDivision));
            }
        }

    }
}

class Cone extends cgIShape {

    constructor (radialdivision, heightdivision) {
        super();
        this.makeCone (radialdivision, heightdivision);
    }
    
    
    makeCone (radialDivision, heightDivision) {
    
        // Fill in your cone code here.

        var heightDivTransformed = 1 / heightDivision;
        var rads = radians(360);
        var radDivision = rads / radialDivision;
        var start = 0.5;
        var innerRadius = 0.5;
        var outerRadius = 0.5;
        // makes the base of the cylinder at the top 
        this.baseMaker(radDivision, rads, 0.5, false);
        for (var yCoor = -start; yCoor <= start - (heightDivTransformed / 2); yCoor += heightDivTransformed) {
            for (var unit = 0; unit <= rads; unit += radDivision) {
                outerRadius = (0.5 - yCoor) / 2;
                innerRadius = (0.5 - yCoor - heightDivTransformed) / 2;
                this.addTriangle(outerRadius * Math.cos(unit + radDivision), yCoor, outerRadius * Math.sin(unit + radDivision),
                            outerRadius * Math.cos(unit), yCoor, outerRadius * Math.sin(unit),
                            innerRadius * Math.cos(unit), yCoor + heightDivTransformed, innerRadius * Math.sin(unit));
                
                this.addTriangle(outerRadius * Math.cos(unit + radDivision), yCoor, outerRadius * Math.sin(unit + radDivision),
                            innerRadius * Math.cos(unit), yCoor + heightDivTransformed, innerRadius * Math.sin(unit),
                            innerRadius * Math.cos(unit + radDivision), yCoor + heightDivTransformed, innerRadius * Math.sin(unit + radDivision));
            }
        }
    }
}
    
class Sphere extends cgIShape {

    constructor (slices, stacks) {
        super();
        this.makeSphere (slices, stacks);
    }
    
    makeSphere (slices, stacks) {
        // fill in your sphere code here
        var sliceDivision = radians(360) / slices;
        var stackDivision = radians(180) / stacks;
        var radius = 0.5;

        for (var longitude = 0; longitude < radians(360); longitude += sliceDivision) {
            for (var latitude = 0; latitude < radians(180); latitude += stackDivision) {
                this.addTriangle(radius * Math.cos(longitude) * Math.sin(latitude + stackDivision), radius * Math.sin(longitude) * Math.sin(latitude + stackDivision), radius * Math.cos(latitude + stackDivision), 
                radius * Math.cos(longitude) * Math.sin(latitude), radius * Math.sin(longitude) * Math.sin(latitude), radius * Math.cos(latitude), 
                radius * Math.cos(longitude + sliceDivision) * Math.sin(latitude + stackDivision), radius * Math.sin(longitude + sliceDivision) * Math.sin(latitude + stackDivision), radius * Math.cos(latitude + stackDivision));
                
                this.addTriangle(radius * Math.cos(longitude + sliceDivision) * Math.sin(latitude + stackDivision), radius * Math.sin(longitude + sliceDivision) * Math.sin(latitude + stackDivision), radius * Math.cos(latitude + stackDivision), 
                radius * Math.cos(longitude) * Math.sin(latitude), radius * Math.sin(longitude) * Math.sin(latitude), radius * Math.cos(latitude), 
                radius * Math.cos(longitude + sliceDivision) * Math.sin(latitude), radius * Math.sin(longitude + sliceDivision) * Math.sin(latitude), radius * Math.cos(latitude));

            }
        }
    }

}


function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

