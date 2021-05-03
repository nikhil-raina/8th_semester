//
// fill in code that creates the triangles for a cube with dimensions 1x1x1
// on each side (and the origin in the center of the cube). with an equal
// number of subdivisions along each cube face as given by the parameter
//subdivisions
//
function makeCube (subdivisions)  {
    // fill in your code here.
    // delete the code below first.
    var side_len = 1 / subdivisions

    var start = 0.5
    for(var row = 0; row < subdivisions; row++) {
        for(var col = 0; col < subdivisions; col++) {
            // front
            addTriangle (-start + (col * side_len), start - (row * side_len), start, 
                        -start + side_len + (col * side_len), start - side_len - (row * side_len), start, 
                        -start + side_len + (col * side_len), start - (row * side_len), start);
            addTriangle (-start + (col * side_len), start - (row * side_len), start, 
                        -start + (col * side_len), start - side_len - (row * side_len), start,
                        -start + side_len + (col * side_len), start - side_len - (row * side_len), start);

            // back
            addTriangle (-start + side_len + (col * side_len), start - side_len - (row * side_len), -start, 
                        -start + (col * side_len), start - (row * side_len), -start,             
                        -start + side_len + (col * side_len), start - (row * side_len), -start);
            addTriangle (-start + (col * side_len), start - side_len - (row * side_len), -start,
                        -start + (col * side_len), start - (row * side_len), -start,             
                        -start + side_len + (col * side_len), start - side_len - (row * side_len), -start);
            
            // left
            addTriangle (-start, start - (row * side_len), -start + (col * side_len), 
                        -start, start - side_len - (row * side_len), -start + side_len + (col * side_len),             
                        -start, start - (row * side_len), -start + side_len + (col * side_len));
            addTriangle (-start, start - (row * side_len), -start + (col * side_len), 
                        -start,  start - side_len- (row * side_len), -start + (col * side_len), 
                        -start, start - side_len - (row * side_len), -start + side_len + (col * side_len));

            // right
            addTriangle (start, start - side_len - (row * side_len), -start + side_len + (col * side_len),
                        start, start - (row * side_len), -start + (col * side_len), 
                        start, start - (row * side_len), -start + side_len + (col * side_len));
            addTriangle (start,  start - side_len- (row * side_len), -start + (col * side_len), 
                        start, start - (row * side_len), -start + (col * side_len), 
                        start, start - side_len - (row * side_len), -start + side_len + (col * side_len));

            // top
            addTriangle (-start + (col * side_len), start, -start + (row * side_len), 
                        -start + side_len + (col * side_len), start, -start + side_len + (row * side_len),             
                        -start + side_len + (col * side_len), start, -start + (row * side_len));
            addTriangle (-start + (col * side_len), start, -start + (row * side_len), 
                        -start + (col * side_len), start, -start + side_len + (row * side_len),
                        -start + side_len + (col * side_len), start, -start + side_len + (row * side_len));
            
            // bottom
            addTriangle (-start + side_len + (col * side_len), -start, -start + side_len + (row * side_len),
                        -start + (col * side_len), -start, -start + (row * side_len), 
                        -start + side_len + (col * side_len), -start, -start + (row * side_len));
            addTriangle (-start + (col * side_len), -start, -start + side_len + (row * side_len),
                        -start + (col * side_len), -start, -start + (row * side_len), 
                        -start + side_len + (col * side_len), -start, -start + side_len + (row * side_len));            
        }
    }
}


function baseMaker(divisions, rads, baseStart, isTwoBase) {
    for (var degree = 0; degree <= rads; degree += divisions) {
        addTriangle(baseStart * Math.cos(degree), -baseStart, baseStart * Math.sin(degree), 
                    0, -baseStart, 0,
                    baseStart * Math.cos(degree - divisions), -baseStart, baseStart * Math.sin(degree - divisions));

        if (isTwoBase) {
            addTriangle(baseStart * Math.cos(degree - divisions), baseStart, baseStart * Math.sin(degree - divisions),
                    0, baseStart, 0,
                    baseStart * Math.cos(degree), baseStart, baseStart * Math.sin(degree));
        }
    }
}


//
// fill in code that creates the triangles for a cylinder with diameter 1
// and height of 1 (centered at the origin) with the number of subdivisions
// around the base and top of the cylinder (given by radialdivision) and
// the number of subdivisions along the surface of the cylinder given by
//heightdivision.
//
function makeCylinder (radialDivision, heightDivision){
    // fill in your code here.
    var heightDivTransformed = 1 / heightDivision;
    var rads = radians(360);
    var radDivision = rads / radialDivision;
    var start = 0.5;
    var radius = 0.5;
    // makes the base of the cylinder at the top 
    baseMaker(radDivision, rads, 0.5, true);
    for (var yCoor = -start; yCoor <= start - (heightDivTransformed / 2); yCoor += heightDivTransformed) {
        for (var unit = 0; unit <= rads; unit += radDivision) {
            addTriangle(radius * Math.cos(unit + radDivision), yCoor, radius * Math.sin(unit + radDivision),
                        radius * Math.cos(unit), yCoor, radius * Math.sin(unit),
                        radius * Math.cos(unit), yCoor + heightDivTransformed, radius * Math.sin(unit));
            addTriangle(radius * Math.cos(unit + radDivision), yCoor, radius * Math.sin(unit + radDivision),
                        radius * Math.cos(unit), yCoor + heightDivTransformed, radius * Math.sin(unit),
                        radius * Math.cos(unit + radDivision), yCoor + heightDivTransformed, radius * Math.sin(unit + radDivision));
        }
    }
}

//
// fill in code that creates the triangles for a cone with diameter 1
// and height of 1 (centered at the origin) with the number of
// subdivisions around the base of the cone (given by radialdivision)
// and the number of subdivisions along the surface of the cone
//given by heightdivision.
//
function makeCone (radialDivision, heightDivision) {
    // fill in your code here.
    var heightDivTransformed = 1 / heightDivision;
    var rads = radians(360);
    var radDivision = rads / radialDivision;
    var start = 0.5;
    var innerRadius = 0.5;
    var outerRadius = 0.5;
    // makes the base of the cylinder at the top 
    baseMaker(radDivision, rads, 0.5, false);
    for (var yCoor = -start; yCoor <= start - (heightDivTransformed / 2); yCoor += heightDivTransformed) {
        for (var unit = 0; unit <= rads; unit += radDivision) {
            outerRadius = (0.5 - yCoor) / 2;
            innerRadius = (0.5 - yCoor - heightDivTransformed) / 2;
            addTriangle(outerRadius * Math.cos(unit + radDivision), yCoor, outerRadius * Math.sin(unit + radDivision),
                        outerRadius * Math.cos(unit), yCoor, outerRadius * Math.sin(unit),
                        innerRadius * Math.cos(unit), yCoor + heightDivTransformed, innerRadius * Math.sin(unit));
            
            addTriangle(outerRadius * Math.cos(unit + radDivision), yCoor, outerRadius * Math.sin(unit + radDivision),
                        innerRadius * Math.cos(unit), yCoor + heightDivTransformed, innerRadius * Math.sin(unit),
                        innerRadius * Math.cos(unit + radDivision), yCoor + heightDivTransformed, innerRadius * Math.sin(unit + radDivision));
        }
    }
}
    
//
// fill in code that creates the triangles for a sphere with diameter 1
// (centered at the origin) with number of slides (longitude) given by
// slices and the number of stacks (lattitude) given by stacks.
// For this function, you will implement the tessellation method based
// on spherical coordinates as described in the video (as opposed to the
//recursive subdivision method).
//
function makeSphere (slices, stacks) {
    // fill in your code here.
    var sliceDivision = radians(360) / slices;
    var stackDivision = radians(180) / stacks;
    var radius = 0.5;

    for (var longitude = 0; longitude < radians(360); longitude += sliceDivision) {
        for (var latitude = 0; latitude < radians(180); latitude += stackDivision) {
            addTriangle(radius * Math.cos(longitude) * Math.sin(latitude + stackDivision), radius * Math.sin(longitude) * Math.sin(latitude + stackDivision), radius * Math.cos(latitude + stackDivision), 
            radius * Math.cos(longitude) * Math.sin(latitude), radius * Math.sin(longitude) * Math.sin(latitude), radius * Math.cos(latitude), 
            radius * Math.cos(longitude + sliceDivision) * Math.sin(latitude + stackDivision), radius * Math.sin(longitude + sliceDivision) * Math.sin(latitude + stackDivision), radius * Math.cos(latitude + stackDivision));
            
            addTriangle(radius * Math.cos(longitude + sliceDivision) * Math.sin(latitude + stackDivision), radius * Math.sin(longitude + sliceDivision) * Math.sin(latitude + stackDivision), radius * Math.cos(latitude + stackDivision), 
            radius * Math.cos(longitude) * Math.sin(latitude), radius * Math.sin(longitude) * Math.sin(latitude), radius * Math.cos(latitude), 
            radius * Math.cos(longitude + sliceDivision) * Math.sin(latitude), radius * Math.sin(longitude + sliceDivision) * Math.sin(latitude), radius * Math.cos(latitude));

        }
    }
}


////////////////////////////////////////////////////////////////////
//
//  Do not edit below this line
//
///////////////////////////////////////////////////////////////////

function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {

    
    var nverts = points.length / 4;
    
    // push first vertex
    points.push(x0);  bary.push (1.0);
    points.push(y0);  bary.push (0.0);
    points.push(z0);  bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
    
    // push second vertex
    points.push(x1); bary.push (0.0);
    points.push(y1); bary.push (1.0);
    points.push(z1); bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++
    
    // push third vertex
    points.push(x2); bary.push (0.0);
    points.push(y2); bary.push (0.0);
    points.push(z2); bary.push (1.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
}

