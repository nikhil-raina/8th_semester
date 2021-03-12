


void myColorTriangle (int x0, int y0, int r0, int g0, int b0, 
                      int x1, int y1, int r1, int g1, int b1,
                      int x2, int y2, int r2, int g2, int b2)
{
  // insert your code here to draw a triangle with vertices (x0, y0), (x1, y1) and (x2, y2) 
  // with colors (r0, g0, b0), (r1, g1, b1) and (r2, g2, b2) attached to each vertex respectively.
  //
  // Your implementation should interpolate the colors accross the triangle.
  //
  // Only use calls to the function drawColorPoint() which is below the do not edit line
  // This function has the following signature
  
  // your code should be an extension of the myTrangle function from Assignment 2.
}


PMatrix2D transformTheHouse()
{
  // return a matrix that has all of the transformations of the highest level you reached in the 
  // transformation game of last week's online assignment
  //
  
  // start with the identity matrix
  PMatrix2D retval = new PMatrix2D();
  
  // Add your transformations here....remember you must preMultiply
  // Also recall, in Processing +y is down (in transformation game +y is up)
  // in processing: +rotation is clockwise (and in radians)....in transformation game +rotation is counter-clockwise (and in degrees).
  
 
  // return the result
  return retval;
}

// --------------------------------------------------------------------------------------------
//
//  Do not edit below this lne
//
// --------------------------------------------------------------------------------------------

boolean doMine = true;
int scene = 1;
color backgroundColor = color (150, 150, 150);

void setup () 
{
  size (500, 500);
  background (backgroundColor);
}

void draw ()
{
  if (scene == 1) doHouse();
  if (scene == 2) doTriangle();
}

//
// fills in the pixel (x, y) with the color (r,g,b)
//
void drawColorPoint (int x, int y, int r, int g, int b)
{
  stroke (r, g, b);
  point (x,y);
}

void doHouse()
{
  PMatrix2D trn = new PMatrix2D();
 
  
  stroke (0,0,0);
  line (0, 250, 500, 250);
  line (250, 0, 250, 500);
  
  trn.translate (250, 250);  
  trn.apply (transformTheHouse());

    applyMatrix (trn);
    
    fill (255, 0, 0);
    stroke (255,0,0);
    triangle (-25, 25, 25, -25, -25, -25);
    triangle (25, 25, 25, -25, -25, 25);
    
    fill (0, 255, 0);
    stroke (0,255,0);
    triangle (-25,-25, 25, -25, 0, -50);
    
    stroke (0,0,255);
    fill (0,0,255);
   triangle (10, 0, 10, 25, 20, 25);
   triangle (10, 0, 20, 25, 20, 0);
}

void doTriangle ()
{
  myColorTriangle (300, 400, 0, 0, 255,
                   400, 100, 0, 255, 0,
                   50, 50, 255, 0, 0);
}

void keyPressed()
{
  if (key == '1') 
  {
    background (backgroundColor);
    scene = 1;
  }
  
  if (key == '2') 
  {
    background (backgroundColor);
    scene = 2;
  }

  
  if (key == 'q') exit();
}
