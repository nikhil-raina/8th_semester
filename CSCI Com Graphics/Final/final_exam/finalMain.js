'use strict';

// Global variables that are set and used
// across the application
let gl;

// The programs
let perFragmentProgram;

// VAOs for the objects
var mySpherePerVertex = null;
var mySpherePerFragment = null;
var myCylinder = null;
var myCone = null;
var myCube = null

// the texture
let worldTexture;
let woodenTableTexture;


// what is currently showing
let nowShowing = 'Vertex';
let baseColor;

//
// Creates a VAO for a given object and return it.
//
// shape is the object to be bound
// program is the program (vertex/fragment shaders) to use in this VAO
//
//
// Note that the program object has member variables that store the
// location of attributes and uniforms in the shaders.  See the function
// initProgram for details.
//
// You can see the definition of the shaders themselves in the
// HTML file assn6-shading.html.   Though there are 2 sets of shaders
// defined (one for per-vertex shading and one for per-fragment shading,
// each set does have the same list of attributes and uniforms that
// need to be set
//
function bindVAO(shape, program) {

  //create and bind VAO
  gl.useProgram(program);

  let theVAO = gl.createVertexArray();
  gl.bindVertexArray(theVAO);

  // create, bind, and fill buffer for vertex locations
  // vertex locations can be obtained from the points member of the
  // shape object.  3 floating point values (x,y,z) per vertex are
  // stored in this array.\

  let myVertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, myVertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.points), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(program.aVertexPosition);
  gl.vertexAttribPointer(program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);


  // create, bind, and fill buffer for normal values
  // normals can be obtained from the normals member of the
  // shape object.  3 floating point values (x,y,z) per vertex are
  // stored in this array.

  let myNormalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, myNormalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.normals), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(program.aNormal);
  gl.vertexAttribPointer(program.aNormal, 3, gl.FLOAT, false, 0, 0);


  // create, bind, and fill buffer for uv's
  // uvs can be obtained from the uv member of the
  // shape object.  2 floating point values (u,v) per vertex are
  // stored in this array.
  let uvBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(shape.uv), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(program.aUV);
  gl.vertexAttribPointer(program.aUV, 2, gl.FLOAT, false, 0, 0);
    

  // Setting up element array
  // element indicies can be obtained from the indicies member of the
  // shape object.  3 values per triangle are stored in this
  // array.

  let myIndexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, myIndexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(shape.indices), gl.STATIC_DRAW);

  // Do cleanup
  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  // return the VAO

  return theVAO;

}


//
// In this function, you must set up all of the uniform variables
// in the shaders required for the implememtation of the Phong
// Illumination model.
//
// Check out the source of the vertex shader in the HTML file
// assn6-shading.html taking note of the types of each of the
// uniforms.
//
// Note that the program object has member variables that store the
// location of attributes and uniforms in the shaders.  See the function
// initProgram for details.
//
//
//  You should also set up your Model transform here.

// have a string check here for colors of different objects.
function setUpPhong(program, baseColor, ambientLightVec) {


  // Recall that you must set the program to be current using
  // the gl useProgram function
  gl.useProgram(program);
  if (!ambientLightVec) ambientLightVec = glMatrix.vec3.fromValues(0.2, 0.1, 0.0);
  //
  // set values for all your uniform variables
  // including the model transform
  // but not your view and projection transforms as
  // they are set in setUpCamera()
  //
  gl.uniform3fv(program.ambientLight, ambientLightVec);

  // a vec3 or an array of values
  let lightPosition = [0, 10, 10];
  gl.uniform3fv(program.lightPosition, lightPosition);

  // how bright the "room" is where the object is in
  let lightColor = glMatrix.vec3.fromValues(1, 1, 1);
  gl.uniform3fv(program.lightColor, lightColor);

  // the object's color gets affected 
  gl.uniform3fv(program.baseColor, baseColor);

  // point of light on the object
  let specHighlightColor = glMatrix.vec3.fromValues(1.0, 1.0, 1.0);
  gl.uniform3fv(program.specHighlightColor, specHighlightColor);

  // ambient coefficient [0 - 1]
  let ka = 0.9;
  gl.uniform1f(program.ka, ka);

  // diffuse coefficient [0 - 1]
  let kd = 0.6;
  gl.uniform1f(program.kd, kd);

  // specular coefficient [0 - 1]
  let ks = 0.4;
  gl.uniform1f(program.ks, ks);

  // specular exponent coefficient [smaller the value, wider the light]
  let ke = 10;
  gl.uniform1f(program.ke, ke);


  // set up your model transform...Add transformations
  // if you are moving, scaling, or rotating the object.
  // Default is no transformations at all (identity matrix).
  //
  let modelMatrix = glMatrix.mat4.create();
  gl.uniformMatrix4fv(program.uModelT, false, modelMatrix);
}

//
// set up the view and projections transformations and
// send to the program (shaders) as uniforms.
//
// Note that the program object has member variables that store the
// location of attributes and uniforms in the shaders.  See the function
// initProgram for details.
function setUpCamera(program) {

  // Recall you must set the program to be current using the gl
  // function useProgram.
  gl.useProgram(program);

  // set up your projection
  let projMatrix = glMatrix.mat4.create();
  // glMatrix.mat4.perspective(projMatrix, radians(90), 1, 1, 15);
  glMatrix.mat4.ortho(projMatrix, -5, 5, -5, 5, 1, 15); // Real
  gl.uniformMatrix4fv(program.uProjT, false, projMatrix);

  // set up your view
  let viewMatrix = glMatrix.mat4.create();
  // glMatrix.mat4.lookAt(viewMatrix, [-15, 0, -3], [0, 0, 0], [0, 1, 0]);
  glMatrix.mat4.lookAt(viewMatrix, [0, 1, -3], [0, 0, 0], [0, 1, 0]); // Real
  gl.uniformMatrix4fv(program.uViewT, false, viewMatrix);

}



//
// load up the textures you will use in the shader(s)
// The setup for the globe texture is done for you
// Any additional images that you include will need to
// set up as well.
function setUpTextures() {
  // get some texture space from the gpu
  
  // flip Y for WebGL
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  var worldImage = null;
  var woodenTableImage = null;
  worldTexture = gl.createTexture();

  // bind the texture so we can perform operations on it
  gl.bindTexture(gl.TEXTURE_2D, worldTexture);

  // load the actual image
  worldImage = document.getElementById('world-texture');
  worldImage.crossOrigin = "";

  // load the texture data
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, worldImage.width, worldImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, worldImage);

  // set texturing parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

  // Adds the wooden table texture
  woodenTableTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, woodenTableTexture);
  woodenTableImage = document.getElementById('wooden-table-texture');
  woodenTableImage.crossOrigin = "";
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, woodenTableImage.width, woodenTableImage.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, woodenTableImage);
  
  // set texturing parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  
}


///////////////////////////////////////////////////////////////////
//
//  No need to edit below this line.
//
////////////////////////////////////////////////////////////////////

// general call to make and bind a new object based on current
// settings..Basically a call to shape specfic calls in cgIshape.js
function createShapes() {

  mySpherePerVertex = new Sphere(20, 20);
  mySpherePerVertex.VAO = bindVAO(mySpherePerVertex, perFragmentProgram);

  myCylinder = new Cylinder(20, 20);
  myCylinder.VAO = bindVAO(myCylinder, perFragmentProgram);

  myCube = new Cube(20);
  myCube.VAO = bindVAO(myCube, perFragmentProgram);

  myCone = new Cone(20, 20);
  myCone.VAO = bindVAO(myCone, perFragmentProgram);
}


// Given an id, extract the content's of a shader script
// from the DOM and return the compiled shader
function getShader(id) {
  const script = document.getElementById(id);
  const shaderString = script.text.trim();

  // Assign shader depending on the type of shader
  let shader;
  if (script.type === 'x-shader/x-vertex') {
    shader = gl.createShader(gl.VERTEX_SHADER);
  }
  else if (script.type === 'x-shader/x-fragment') {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  }
  else {
    return null;
  }

  // Compile the shader using the supplied shader code
  gl.shaderSource(shader, shaderString);
  gl.compileShader(shader);

  // Ensure the shader is valid
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Compiling shader " + id + " " + gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}


// Create a program with the appropriate vertex and fragment shaders
function initProgram(vertexid, fragmentid) {
  // set up the per-vertex program
  const vertexShader = getShader(vertexid);
  const fragmentShader = getShader(fragmentid);

  // Create a program
  let program = gl.createProgram();

  // Attach the shaders to this program
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Could not initialize shaders');
  }

  // Use this program instance
  gl.useProgram(program);
  // We attach the location of these shader values to the program instance
  // for easy access later in the code
  program.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
  program.aNormal = gl.getAttribLocation(program, 'aNormal');

  // uniforms
  program.uModelT = gl.getUniformLocation(program, 'modelT');
  program.uViewT = gl.getUniformLocation(program, 'viewT');
  program.uProjT = gl.getUniformLocation(program, 'projT');
  program.ambientLight = gl.getUniformLocation(program, 'ambientLight');
  program.lightPosition = gl.getUniformLocation(program, 'lightPosition');
  program.lightColor = gl.getUniformLocation(program, 'lightColor');
  program.baseColor = gl.getUniformLocation(program, 'baseColor');
  program.specHighlightColor = gl.getUniformLocation(program, 'specHighlightColor');
  program.ka = gl.getUniformLocation(program, 'ka');
  program.kd = gl.getUniformLocation(program, 'kd');
  program.ks = gl.getUniformLocation(program, 'ks');
  program.ke = gl.getUniformLocation(program, 'ke');
  
  // Texture related
  program.aUV = gl.getAttribLocation(program, 'aUV');
  program.uTheTexture = gl.getUniformLocation (program, 'theTexture');
  program.useColor = gl.getUniformLocation (program, 'useColor');

  return program;
}


function drawCylinderStand(object, program, xShift, yShift, clockwiseTilt, verticalStretch, horizontalStretch, thickness) {
  // set up your uniform variables for drawing
  gl.useProgram(program);

  if (!verticalStretch) verticalStretch = 0;
  if (!horizontalStretch) horizontalStretch = 0;
  if (!thickness) thickness = 0;
  if (!clockwiseTilt) clockwiseTilt = 0;

  var modelCubeMatrix = glMatrix.mat4.create();
  var translation = glMatrix.vec3.create();
  glMatrix.vec3.set(translation, xShift, yShift, 0.0);
  var result = glMatrix.mat4.create();

  glMatrix.mat4.rotateZ(modelCubeMatrix, modelCubeMatrix, radians(clockwiseTilt));
  glMatrix.mat4.translate(result, modelCubeMatrix, translation);
  glMatrix.mat4.scale(result, result, [0.08 + horizontalStretch, 2 + verticalStretch, 0.2 + thickness]);

  // sends the model to be shaded. Waits to be drawn
  gl.uniformMatrix4fv(program.uModelT, false, result);

  //Bind the VAO and draw
  gl.bindVertexArray(object.VAO);
  gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);

}


function drawConeLamp(object, program, xShift, yShift, clockwiseTilt, verticalStretch, horizontalStretch, thickness) {
  gl.useProgram(program);

  if (!verticalStretch) verticalStretch = 0;
  if (!horizontalStretch) horizontalStretch = 0;
  if (!thickness) thickness = 0;
  if (!clockwiseTilt) clockwiseTilt = 0;

  var modelCubeMatrix = glMatrix.mat4.create();
  var translation = glMatrix.vec3.create();
  glMatrix.vec3.set(translation, xShift, yShift, -0.2);
  var result = glMatrix.mat4.create();

  glMatrix.mat4.rotateZ(modelCubeMatrix, modelCubeMatrix, radians(clockwiseTilt));
  glMatrix.mat4.rotateX(modelCubeMatrix, modelCubeMatrix, radians(30));
  glMatrix.mat4.translate(result, modelCubeMatrix, translation);
  glMatrix.mat4.scale(result, result, [1 + horizontalStretch, 1 + verticalStretch, 1 + thickness]);

  // sends the model to be shaded. Waits to be drawn
  gl.uniformMatrix4fv(program.uModelT, false, result);

  //Bind the VAO and draw
  gl.bindVertexArray(object.VAO);
  gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);
}


function drawCubeTableBase(object, program, xShift, yShift) {
  // set up your uniform variables for drawing
  gl.useProgram(program);

  var modelCubeMatrix = glMatrix.mat4.create();
  var translation = glMatrix.vec3.create();
  glMatrix.vec3.set(translation, xShift, yShift, 0.0);
  var result = glMatrix.mat4.create();

  glMatrix.mat4.translate(result, modelCubeMatrix, translation);
  glMatrix.mat4.scale(result, result, [10, 1.2, 7.0]);

  // sends the model to be shaded. Waits to be drawn
  gl.uniformMatrix4fv(program.uModelT, false, result);


  //Bind the VAO and draw
  gl.bindVertexArray(object.VAO);
  gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);

}


function drawCubeStandBase(object, program, xShift, yShift) {
  // set up your uniform variables for drawing
  gl.useProgram(program);

  var modelCubeMatrix = glMatrix.mat4.create();
  var translation = glMatrix.vec3.create();
  glMatrix.vec3.set(translation, xShift, yShift, 0.0);
  var result = glMatrix.mat4.create();

  glMatrix.mat4.translate(result, modelCubeMatrix, translation);
  glMatrix.mat4.scale(result, result, [3, 0.2, 1.5]);

  // sends the model to be shaded. Waits to be drawn
  gl.uniformMatrix4fv(program.uModelT, false, result);


  //Bind the VAO and draw
  gl.bindVertexArray(object.VAO);
  gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);

}


function drawCubeStandToBaseConnector(object, program, xShift, yShift, verticalStretch, horizontalStretch, thickness) {
  gl.useProgram(program);

  if (!verticalStretch) verticalStretch = 0;
  if (!horizontalStretch) horizontalStretch = 0;
  if (!thickness) thickness = 0;
  var modelCubeMatrix = glMatrix.mat4.create();
  var translation = glMatrix.vec3.create();
  glMatrix.vec3.set(translation, xShift, yShift, -0.2);
  var result = glMatrix.mat4.create();

  glMatrix.mat4.translate(result, modelCubeMatrix, translation);
  glMatrix.mat4.scale(result, result, [0.6 + horizontalStretch, 0.1 + verticalStretch, 0.5 + thickness]);

  // sends the model to be shaded. Waits to be drawn
  gl.uniformMatrix4fv(program.uModelT, false, result);


  //Bind the VAO and draw
  gl.bindVertexArray(object.VAO);
  gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);

}


function drawCylinderStandToBaseConnector(object, program, xShift, yShift) {
  gl.useProgram(program);

  var modelCubeMatrix = glMatrix.mat4.create();
  var translation = glMatrix.vec3.create();
  glMatrix.vec3.set(translation, xShift, yShift, 0.0);
  var result = glMatrix.mat4.create();

  glMatrix.mat4.translate(result, modelCubeMatrix, translation);
  glMatrix.mat4.scale(result, result, [0.1, 0.3, 1.0]);

  // sends the model to be shaded. Waits to be drawn
  gl.uniformMatrix4fv(program.uModelT, false, result);


  //Bind the VAO and draw
  gl.bindVertexArray(object.VAO);
  gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);

}


function drawConeArmConnector(object, program, xShift, yShift, clockwiseTilt, verticalStretch, horizontalStretch, thickness) {
  gl.useProgram(program);

  if (!verticalStretch) verticalStretch = 0;
  if (!horizontalStretch) horizontalStretch = 0;
  if (!thickness) thickness = 0;
  if (!clockwiseTilt) clockwiseTilt = 0;

  var modelCubeMatrix = glMatrix.mat4.create();
  var translation = glMatrix.vec3.create();
  glMatrix.vec3.set(translation, xShift, yShift, -0.2);
  var result = glMatrix.mat4.create();

  glMatrix.mat4.rotateZ(modelCubeMatrix, modelCubeMatrix, radians(clockwiseTilt));
  glMatrix.mat4.translate(result, modelCubeMatrix, translation);
  glMatrix.mat4.scale(result, result, [1 + horizontalStretch, 1 + verticalStretch, 1 + thickness]);

  // sends the model to be shaded. Waits to be drawn
  gl.uniformMatrix4fv(program.uModelT, false, result);

  //Bind the VAO and draw
  gl.bindVertexArray(object.VAO);
  gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);
}


function drawSphereBall(object, program, xShift, yShift, clockwiseTilt, verticalStretch, horizontalStretch, thickness) {

  // set up your uniform variables for drawing
  gl.useProgram(program);

  if (!verticalStretch) verticalStretch = 0;
  if (!horizontalStretch) horizontalStretch = 0;
  if (!thickness) thickness = 0;
  if (!clockwiseTilt) clockwiseTilt = 0;

  var modelCubeMatrix = glMatrix.mat4.create();
  var translation = glMatrix.vec3.create();
  glMatrix.vec3.set(translation, xShift, yShift, 0.0);
  var result = glMatrix.mat4.create();

  glMatrix.mat4.rotateZ(modelCubeMatrix, modelCubeMatrix, radians(clockwiseTilt));
  glMatrix.mat4.translate(result, modelCubeMatrix, translation);
  glMatrix.mat4.scale(result, result, [1 + horizontalStretch, 0.75 + verticalStretch, 2.0 + thickness]);

  // sends the model to be shaded. Waits to be drawn
  gl.uniformMatrix4fv(program.uModelT, false, result);


  //Bind the VAO and draw
  gl.bindVertexArray(object.VAO);
  gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT, 0);

}


// We call draw to render to our canvas
function draw() {
  // Clear the scene
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // draw your shapes
  // RED
  baseColor = [0.9, 0.1, 0.1];
  setUpPhong(perFragmentProgram, baseColor)
  gl.uniform1i(perFragmentProgram.useColor, true);

  // Wooden Table
  gl.uniform1i(perFragmentProgram.useColor, false);
  gl.activeTexture (gl.TEXTURE0);
  gl.bindTexture (gl.TEXTURE_2D, woodenTableTexture);
  gl.uniform1i (perFragmentProgram.uTheTexture, 0);  
  drawCubeTableBase(myCube, perFragmentProgram, 0, -4.5, 0);
  
  // Ball
  gl.uniform1i(perFragmentProgram.useColor, false);
  gl.activeTexture (gl.TEXTURE0);
  gl.bindTexture (gl.TEXTURE_2D, worldTexture);
  gl.uniform1i (perFragmentProgram.uTheTexture, 0);  
  drawSphereBall(mySpherePerVertex, perFragmentProgram, -2, -3.4, 0);

  // Ball shadow
  baseColor = [0.2, 0.2, 0.2];
  setUpPhong(perFragmentProgram, baseColor)
  gl.uniform1i(perFragmentProgram.useColor, true);
  drawSphereBall(mySpherePerVertex, perFragmentProgram, -2.5, -3.9, 0, -0.73, 0.5, -1.5);


  // GREY
  baseColor = [1, 1, 1]
  gl.uniform1i(perFragmentProgram.useColor, true);
  setUpPhong(perFragmentProgram, baseColor)

  // Light Stand Base
  drawCubeStandBase(myCube, perFragmentProgram, 2, -3.6)

  // Small square base that connects the stand with the main base
  drawCubeStandToBaseConnector(myCube, perFragmentProgram, 2, -3.1);

  // Small square base that connects the stand with the main base
  drawCylinderStandToBaseConnector(myCylinder, perFragmentProgram, 2, -3.3)

  // Initial Stant Sticks
  drawCylinderStand(myCylinder, perFragmentProgram, 1.8, -2.3, 5, 0.2);
  drawCylinderStand(myCylinder, perFragmentProgram, 2.25, -2, 0);
  drawCylinderStand(myCylinder, perFragmentProgram, 1.85, -2, 0);

  // Small connector of initial stand with arms
  drawCubeStandToBaseConnector(myCube, perFragmentProgram, 2, -1, 0, -0.1, -0.4);

  // Arm Stand Sticks
  drawCylinderStand(myCylinder, perFragmentProgram, 0.05, -1.1, 60);
  drawCylinderStand(myCylinder, perFragmentProgram, 0.45, -1.3, 55, 0.2);
  
  // Triangle connector for the arms
  drawConeArmConnector(myCone, perFragmentProgram, 0.33, 0.1, 47, -0.7, -0.55);

  // Connects the light cone and the arm cone
  drawCylinderStand(myCylinder, perFragmentProgram, 0.3, 0.1, 85, -1.6);

  // Lamp Cone
  drawConeLamp(myCone, perFragmentProgram, -0.5, 0, -20, -0.1, 0.7);

  // Light bulb
  baseColor = [1, 1, 0.65];
  let ambientLightVec = [1, 1, 0.9];
  gl.uniform1i(perFragmentProgram.useColor, true);
  setUpPhong(perFragmentProgram, baseColor, ambientLightVec);
  drawConeLamp(myCone, perFragmentProgram, -0.5, -0.05, -20, -0.1, 0.6);

  setUpPhong(perFragmentProgram, baseColor);
  // Lamp back Bulb
  drawCylinderStand(myCylinder, perFragmentProgram, -0.5, 0.3, -20, -1.5, 0.4);

  // Lamp Button for Bulb
  drawCylinderStand(myCylinder, perFragmentProgram, -0.5, 0.4, -20, -1.5, 0.02);


  // Clean
  gl.bindVertexArray(null);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

// Entry point to our application
function init() {

  // Retrieve the canvas
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas) {
    console.error(`There is no canvas with id ${'webgl-canvas'} on this page.`);
    return null;
  }


  // deal with keypress
  window.addEventListener('keydown', gotKey, false);

  // Retrieve a WebGL context
  gl = canvas.getContext('webgl2');
  if (!gl) {
    console.error(`There is no WebGL 2.0 context`);
    return null;
  }

  // Set the clear color to be black
  gl.clearColor(0, 0, 0, 1);

  // some GL initialization
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);

  gl.cullFace(gl.BACK);
  gl.frontFace(gl.CCW);
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  gl.depthFunc(gl.LEQUAL)
  gl.clearDepth(1.0)

  // Read, compile, and link your shaders
  perFragmentProgram = initProgram('phong-per-fragment-V', 'phong-per-fragment-F');

  setUpTextures();

  // create and bind your current object
  createShapes();

  // set up your camera
  setUpCamera(perFragmentProgram);

  // do a draw
  draw();
}
