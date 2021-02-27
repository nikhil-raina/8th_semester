


void drawNameWithLines ()
{
  // insert your code here to draw the letters of your name 
  // using only lines()
  // [N]
  line (90, 50, 90, 150);
  // add thickness to straight line
  line (89, 50, 89, 150);
  line (90, 50, 130, 150);
  line (130, 50, 130, 150);
  // add thickness to straight line
  line (131, 50, 131, 150);
  
  // [R]
  line (150, 50, 150, 150);
  // add thickness to straight line
  line (149, 50, 149, 150);
  line (150, 50, 170, 50);
  // add thickness to straight line
  line (150, 49, 170, 49);
  line (170, 50, 175, 60);
  line (175, 60, 175, 80);
  // add thickness to straight line
  line (176, 60, 176, 80);
  line (175, 80, 170, 90);
  line (170, 90, 150, 90);
  // add thickness to straight line
  line (170, 91, 150, 91);
  line (150, 90, 175, 150);
}

void drawNameWithTriangles ()
{
  // insert your code here to draw the letters of your name 
  // using only ltriangles()
  // [N]
  triangle (90, 200, 120, 200, 105, 300);
  triangle (120, 200, 100, 230, 175, 300);
  triangle (160, 200, 190, 200, 175, 300);
  
  // [R]
  triangle (210, 300, 240, 300, 225, 200);
  triangle (225, 200, 225, 240, 280, 240);
  triangle (230, 240, 260, 300, 280, 300);
}

// --------------------------------------------------------------------------------------------
//
//  Do not edit below this lne
//
// --------------------------------------------------------------------------------------------

boolean doLine = false;
boolean doTri = false;
color backgroundColor = color (150, 150, 150);
color lineColor = color (0, 0, 0);
color fillColor = color (255, 0, 0);

void setup () 
{
  size (500, 500);
  background (backgroundColor);
}

void draw ()
{
  if (doLine) stroke(lineColor); else stroke (backgroundColor);
  drawNameWithLines();
  
  if (doTri) {
     fill(fillColor);
     stroke(fillColor);
  }
  else {
    fill(backgroundColor);
    stroke(backgroundColor);
  }
  drawNameWithTriangles();
}

void keyPressed()
{
  if (key == 'l') doLine = !doLine;
  if (key == 't') doTri = !doTri;
  if (key == 'q') exit();
}