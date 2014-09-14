/////////////////////////////////////////////////////////
//                   Plan and Design                   //
/////////////////////////////////////////////////////////

// I will be making a simple puzzle game.
// The only manipulatable object will be the canvas.
// You will be able to rotate it left, right, and invert it.
// The goal will be to use those options to bring a ball to a goal on the canvas.
// The ball will always fall downwards with respect to the screen.
// There will be a bit of thinking with the position of the objects 
// because of the rotations and whatnot, but it's nothing too complex.


/////////////////////////////////////////////////////////
//                     Pseudocode                      //
/////////////////////////////////////////////////////////

// Make a Canvas class with default properties
// Make a Ball class with default properties
// Make a Block class with default properties
// Make a Goal class with default properties
// Make a Block array
// Make the different rotate functions for the Canvas
// Make a Reset() function
// Make a function that updates the x,y coordinates of the blocks/ball/goal post-rotate
// Make a fall() function for the ball
// Make a function that checks if the goal was reached
// Make a render() function that displays the Canvas
// Optional: animate the ball falling



/////////////////////////////////////////////////////////
//                Objects and Interface                //
/////////////////////////////////////////////////////////

// main object
function Canvas(width, height) {
	this.width = width;
	this.height = height;
	// the "player"
	this.ball = {
		x: 0,
		y: 0
	}
	// bring the ball here
	this.goal = {
		x: 0,
		y: 0
	}
	this.blocks = [];
	this.rotateRight = rotateRight;
	this.rotate180 = rotate180;
	this.rotateLeft = rotateLeft;
	this.fall = fall;
	this.render = render;
	this.isBlock = isBlock;
	this.isBall = isBall;
	this.isGoal = isGoal;
}

// makes it easier to make new blocks this way
function Block(x, y) {
	this.x = x;
	this.y = y;
}

// Buttons for ease of use
function toggleControls(){
	document.getElementById("start_button").style.display = "none";
	document.getElementById("left_button").style.display = "inline";
	document.getElementById("right_button").style.display = "inline";
	document.getElementById("flip_button").style.display = "inline";
}

// triggers won state
function hasWon() {
	document.getElementById("left_button").style.display = "none";
	document.getElementById("right_button").style.display = "none";
	document.getElementById("flip_button").style.display = "none";
	document.getElementById("win").style.display = "inline";
}

/////////////////////////////////////////////////////////
//       Manipulating the canvas and the objects       //
/////////////////////////////////////////////////////////

function rotateRight() {
	var width = this.width;
	var height = this.height;
	var i;
	this.width = height;
	this.height = width;
	for (i = 0; i < this.blocks.length; i++){
		rotateObjectRight(this.blocks[i], this.width, this.height);
	}
	rotateObjectRight(this.goal, this.width, this.height);
	rotateObjectRight(this.ball, this.width, this.height);
	this.fall(this.ball, this.blocks);
	this.render();
	if (isWin(this.ball, this.goal))
		hasWon();
}

function rotateLeft() {
	var width = this.width;
	var height = this.height;
	var i;
	this.width = height;
	this.height = width;
	for (i = 0; i < this.blocks.length; i++){
		rotateObjectLeft(this.blocks[i], this.width, this.height);
	}
	rotateObjectLeft(this.goal, this.width, this.height);
	rotateObjectLeft(this.ball, this.width, this.height);
	this.fall(this.ball, this.blocks);
	this.render();
	if (isWin(this.ball, this.goal))
		hasWon();
}

function rotate180() {
	var i;
	for (i = 0; i < this.blocks.length; i++){
		rotateObject180(this.blocks[i], this.width, this.height);
	}
	rotateObject180(this.goal, this.width, this.height);
	rotateObject180(this.ball, this.width, this.height);
	this.fall(this.ball, this.blocks);
	this.render();
	if (isWin(this.ball, this.goal))
		hasWon();
}

function rotateObjectRight(obj, w, h) {
	var x = obj.x;
	var y = obj.y;
	obj.x = y;
	obj.y = h - 1 - x; //this is after the canvas height/width have been switched
}

function rotateObjectLeft(obj, w, h) {
	var x = obj.x;
	var y = obj.y;
	obj.x = w - 1 - y; //this is after the canvas height/width have been switched
	obj.y = x;
}

function rotateObject180(obj, w, h) {
	obj.y = h - 1 - obj.y;
}

// After you've rotated, calculates where the ball should fall and repositions it
function fall(ball, blocks){
	blocks.sort(function(a, b) {
		if (a.x > b.x)
			return 1;
		if (a.x < b.x)
			return -1;
		if (a.x == b.x) {
			// we want higher y blocks to be first
			if (a.y < b.y)
				return 1;
			if (a.y > b.y)
				return -1;
			else return 0;
		}
	})
	var i;
	for (i = 0; i < blocks.length; i++){
		if ((blocks[i].x == ball.x) && (blocks[i].y < ball.y)) {
			ball.y = blocks[i].y + 1;
			// once we get here, we want to exit
			return 1;
		}
	}
	// no blocks on our y axis, so it hits the floor
	ball.y = 0;

}

function isWin(ball,goal) {
	if ((ball.x == goal.x) && (ball.y == goal.y))
		return true;
	else return false;
}

/////////////////////////////////////////////////////////
//          Rendering the canvas and objects           //
/////////////////////////////////////////////////////////

function render(){
	var wi;
	var he;
	var i;

	//deletes previous state
	var old = document.getElementsByClassName("canvasElement");
	var len = old.length;
	for (i = 0; i < len; i++){
		// array is being updated dynamically so we just remove the first element repeatedly
		old[0].parentNode.removeChild(old[0]);
	}

	//draw the new state
	for (he = this.height - 1; he >= 0; he--){
		for (wi = 0; wi < this.width; wi++){
			if (this.isBall(wi,he)) {
				makeObj(wi,he,"red",true,"ball");
			}
			else if (this.isGoal(wi,he)) {
				makeObj(wi,he,"yellow",false,"goal");
			}
			else if (this.isBlock(wi,he)) {
				makeObj(wi,he,"gray",false,null);
			}
			else {
			}
		}
	}
}


function isGoal(x,y) {
	if ((this.goal.x == x) && (this.goal.y == y)) {
		return true;
	}
	else {
		return false;
	}
}

function isBall(x,y) {
	if ((this.ball.x == x) && (this.ball.y == y)) {
		return true;
	}
	else {
		return false;
	}
}

function isBlock(x,y) {
	var i;
	for (i = 0; i < this.blocks.length; i++) {
		if ((this.blocks[i].x == x) && (this.blocks[i].y == y)) {
			return true;
		}
	}
	return false;
}

// makes the divs and inserts them inside the html
function makeObj(x,y,color,round,id){
	var obj = document.createElement("div");
	var e = document.getElementById("canvas"); 
	obj.className = "canvasElement";
	if (id != null)
		obj.id = id;
	if (round)
		obj.style.borderRadius = "20px";
	obj.style.background = color;
	obj.style.width = "40px";
	obj.style.height = "40px";;
	obj.style.position = "fixed";
	obj.style.top = ((this.can.height - 1 - y) * 40).toString() + "px";
	obj.style.left = (x*40).toString() + "px";
	e.appendChild(obj);
}

// makes a border of blocks around the canvas
function makeBorder(arr, w, h) {
	var i;
	var j;
	for (i=0;i<w;i++) {
		arr.push(new Block(i,0));
		arr.push(new Block(i,h-1));
	}
	for (j=1;j<h-1;j++) {
		arr.push(new Block(0,j));
		arr.push(new Block(w-1,j));
	}
}


//// Deprecated
//// Outputs to the console with ASCII art
////
// function renderDebug(){
// 	var wi;
// 	var he;
// 	for (he = 3 * (this.height) - 1; he >= 0; he--){
// 		for (wi = 0; wi < this.width; wi++){
// 			if (this.isBall(wi,Math.floor(he/3))) {
// 				process.stdout.write("///");
// 			}
// 			else if (this.isGoal(wi,Math.floor(he/3))) {
// 				process.stdout.write("***");
// 			}
// 			else if (this.isBlock(wi,Math.floor(he/3))) {
// 				process.stdout.write("###");
// 			}
// 			else {
// 				process.stdout.write("   ");
// 			}
// 		}
// 		process.stdout.write("\n");
// 	}
// }


// Initial state
var can = new Canvas(11, 9);
can.ball.x = 1;
can.ball.y = 2;
can.goal.x = 9;
can.goal.y = 7;
makeBorder(can.blocks,11,9);
can.blocks.push(new Block(1,1));
can.blocks.push(new Block(1,6));
can.blocks.push(new Block(1,7));
can.blocks.push(new Block(2,1));
can.blocks.push(new Block(2,2));
can.blocks.push(new Block(4,4));
can.blocks.push(new Block(5,3));
can.blocks.push(new Block(5,4));
can.blocks.push(new Block(5,5));
can.blocks.push(new Block(6,4));
can.blocks.push(new Block(7,1));
can.blocks.push(new Block(8,6));
can.blocks.push(new Block(8,7));
can.blocks.push(new Block(9,3));


/////////////////////////////////////////////////////////
//                     Refactored                      //
/////////////////////////////////////////////////////////

// I was actually working on this in a separate file and didnt realize
// that I had to keep track of my initial and refactored code. The
// above is my refactored version. I'll try to explain what my
// original version was like. It had 3 different HTML constructors
// for ball, goal, and block instead of just one now. I also started
// out initially with just having it render to the console, and didn't
// have any buttons to manipulate the canvas. The functions were ordered
// strangely. I also had a state property in my canvas object which kept
// track of the current orientation of the canvas, but I realized I never
// used it so I simply deleted it. The canvas didn't have a border, so it
// looked kinda silly.


/////////////////////////////////////////////////////////
//                     Reflection                      //
/////////////////////////////////////////////////////////

// This was a lot of fun for me. I was able to focus on JS and do some
// more traditional backend coding, with only minimal effort with the
// interface. I do regret not being able to animate the ball, but that
// would have been a pretty significant amount of extra effort.
// Some things I had trouble with: function scope (particularly with the
// this keyword). In the end, I felt like it was easier just passing the
// arguments I needed to the function. Second problem was to set the
// attributes of the divs for rendering. Turns out the DOM API has specific
// names for things like class (className). Also, manipulating CSS properties
// goes through the HTML style attribute first. So you must do something like
// e.style.width = 40px and not e.width = 40px. I feel like I coded this very
// close to what I would have in say, C, but overall I still feel comfortable
// enough with JS.