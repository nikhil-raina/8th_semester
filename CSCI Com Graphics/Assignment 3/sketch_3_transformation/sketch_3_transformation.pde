

// Finds the min number
int find_min(int num1, int num2, int num3) {
  return Math.min(num3, Math.min(num1, num2));
}

// Finds the max number
int find_max(int num1, int num2, int num3) {
  return Math.max(num3, Math.max(num1, num2));
}



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
  float side_1, side_2, side_3, area_triangle, lambda_1, lambda_2, lambda_3;
  int max_x = find_max(x0, x1, x2);
  int max_y = find_max(y0, y1, y2);
  int min_x = find_min(x0, x1, x2);  // starting point of "floor" on one side
  int min_y = find_min(y0, y1, y2);  // starting point of "floor" on the other side
  
  // finds the area of triangle for comparison
  area_triangle = (x0 * (y1 - y2) + x1 * (y2 - y0) + x2 * (y0 - y1)) / 2.0; // V0
  
  for (int x_coor = min_x; x_coor <= max_x; x_coor++) {  // builds the x-coordinates till the top
    for (int y_coor = min_y; y_coor <= max_y; y_coor++) {  // builds the y-coordinates till the top
      
      // finds the "relative area" within the triangle
      side_1 = (x_coor * (y2 - y0) + x2 * (y0 - y_coor) + x0 * (y_coor - y2)) / 2.0;
      side_2 = (x_coor * (y1 - y2) + x1 * (y2 - y_coor) + x2 * (y_coor - y1)) / 2.0;
      side_3 = (x_coor * (y0 - y1) + x0 * (y1 - y_coor) + x1 * (y_coor - y0)) / 2.0;
      
      lambda_1 = side_1 / area_triangle;
      lambda_2 = side_2 / area_triangle;
      lambda_3 = side_3 / area_triangle;
      
      // if the total area qualifies, then plot that point on the screen
      // This implies that the pixel is within the area of the actual triangle entered
      if (Math.abs(side_1) + Math.abs(side_2) + Math.abs(side_3) == Math.abs(area_triangle)) {
        drawColorPoint(x_coor, y_coor, int(lambda_1 * 255), int(lambda_2 * 255), int(lambda_3 * 255));
      }
    }
  }

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
  
  retval.preApply(1, 0, 0, 0, 1, -25);
  retval.preApply(cos(10 * PI/ 180), sin(10 * PI / 180), 0, -sin(10 * PI / 180), cos(10 * PI / 180), 0);
  
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
