


void myLine (int x1, int y1, int x2, int y2)
{
  // insert your code here to draw a line from (x1, y1) to (x2, y2) 
  // using only calls to point().
  
  // your code should implement the Midpoint algorithm
  int dE, dNE, x, y, d; //<>//
  int dy = y2 - y1; // difference between the y points
  int dx = x2 - x1; // difference between the x points  
  dE = 2*dy;
  dNE = 2*(dy - dx); //<>//
  d = dE - dx;
  x = x1;
  y = y1;
  while (x <= x2) {
    point(x, y);
    ++x;
    if (d <= 0) {
      d += dE;
      if (dy < 0) {
        --y;
      }
    } else {
      ++y;
      d += dNE;
    }
  }
  if (dy < 0) {   // assuming the change in y is less than 0. The points should be going UP
    while (y >= y2) { // if there are anymore y points to reach y2
      point(x, y);
      --y;
    }
  }
  while (y <= y2) { // if there are anymore y points to reach y2
    point(x, y);
    ++y;
  }
}


void myTriangle (int x0, int y0, int x1, int y1, int x2, int y2)
{
  // insert your code here to draw a triangle with vertices (x0, y0), (x1, y1) and (x2, y2) 
  // using only calls to point().
  
  // your code should implement the the algorithm presented in the video
  
  float side_1, side_2, side_3, area_triangle;
  int max_x = find_max(x0, x1, x2);
  int max_y = find_max(y0, y1, y2);
  int min_x = find_min(x0, x1, x2);  // starting point of "floor" on one side
  int min_y = find_min(y0, y1, y2);  // starting point of "floor" on the other side
  
  // finds the area of triangle for comparison
  area_triangle = (x0 * (y1 - y2) + x1 * (y2 - y0) + x2 * (y0 - y1)) / 2.0;
  
  for (int x_coor = min_x; x_coor <= max_x; x_coor++) {  // builds the x-coordinates till the top
    for (int y_coor = min_y; y_coor <= max_y; y_coor++) {  // builds the y-coordinates till the top
      
      // finds the "relative area" within the triangle
      side_1 = (x_coor * (y2 - y0) + x2 * (y0 - y_coor) + x0 * (y_coor - y2)) / 2.0;
      side_2 = (x_coor * (y1 - y2) + x1 * (y2 - y_coor) + x2 * (y_coor - y1)) / 2.0;
      side_3 = (x_coor * (y0 - y1) + x0 * (y1 - y_coor) + x1 * (y_coor - y0)) / 2.0;
      
      // if the total area qualifies, then plot that point on the screen
      // This implies that the pixel is within the area of the actual triangle entered
      if (Math.abs(side_1) + Math.abs(side_2) + Math.abs(side_3) == Math.abs(area_triangle)) {
        point(x_coor, y_coor);
      }
    }
  }
  
}

// Finds the min number
int find_min(int num1, int num2, int num3) {
  return Math.min(num3, Math.min(num1, num2));
}

// Finds the max number
int find_max(int num1, int num2, int num3) {
  return Math.max(num3, Math.max(num1, num2));
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
  fill (0,0,0);
    if (doMine) text ("my solution", 20, 475);
    else text ("reference", 20, 475);
    
  if (scene == 1) doLines();
  if (scene == 2) doHouse();
  
}

void doHouse()
{
  if (!doMine) {
    fill (255, 0, 0);
    stroke (255,0,0);
    triangle (200, 300, 300, 200, 200, 200);
    triangle (300, 300, 300, 200, 200, 300);
    fill (0, 0, 255);
    stroke (0,0,255);
    triangle (200,200, 300, 200, 250, 150);
    stroke (0,255,0);
    fill (0,255,0);
    triangle (250, 300, 275, 300, 250, 250);
    triangle (275, 300, 275, 250, 250, 250);
  }
  else {
    fill (128, 0, 0);
    stroke (128,0,0);
    myTriangle (200, 300, 300, 200, 200, 200);
    myTriangle (300, 300, 300, 200, 200, 300);
    fill (0, 0, 128);
    stroke (0,0,128);
    myTriangle (200,200, 300, 200, 250, 150);
    stroke (0,128,0);
    fill (0,128,0);
    myTriangle (250, 300, 275, 300, 250, 250);
    myTriangle (275, 300, 275, 250, 250, 250);
  }
}

void doLines()
{
  if  (!doMine) {
    stroke (255, 255, 255);
    line (50, 250, 450, 250);
    line (250, 50, 250, 450);
    line (50, 450, 450, 50);
    line (50, 50, 450, 450);
  }
  else {
    stroke (0, 0, 0);
    myLine (50, 250, 450, 250);    // works horizontal
    myLine (250, 50, 250, 450);    // works vertical
    myLine (50, 450, 450, 50);     // lower left to upper right
    myLine (50, 50, 450, 450);     // works upper left to lower right
  }
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
  
  if (key == 'm') 
  {
    background (backgroundColor);
    doMine = !doMine;
  }
  
  if (key == 'q') exit();
}
