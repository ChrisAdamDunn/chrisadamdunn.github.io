"use strict";

window.onload = init;
let blockQuit = false;

let FPS;
let FPSDisplay;
const FPSTarget = 60;
let lastFPSTime;
let FPSTargetInterval;

let canvas;
let display;
let bgColour;

let mouseX,mouseY;

let touch = [];
// touch[i].identifier
// touch[i].clientX
// touch[i].clientY

function init(){
	FPS = 0;
	FPSDisplay = 0;
	FPSTargetInterval = 1000 / FPSTarget;
	lastFPSTime = window.performance.now();

	bgColour = "#110000";
	resize();
	
	window.addEventListener("beforeunload",quit);
	
	document.addEventListener("keydown",keydown);
	document.addEventListener("keyup",keyup);
	
	document.addEventListener("mousedown",mousedown);
	document.addEventListener("mouseup",mouseup);
	document.addEventListener("mousemove",mousemove);
	document.addEventListener("wheel",mousewheel);
	document.addEventListener("contextmenu",rightclick);

	document.addEventListener("touchstart",touchstart);
	document.addEventListener("touchmove",touchmove);
	document.addEventListener("touchend",touchend);
	document.addEventListener("touchcancel",touchcancel);
	
	
	window.setTimeout(tick, 0);
}

function tick(){
	//Blank screen

	//FPS counter
	let thisFrameTime = window.performance.now();
	if(thisFrameTime > lastFPSTime + 1000){
		console.log("FPS ",FPS);
		FPSDisplay = FPS;
		FPS = 0;
		lastFPSTime = thisFrameTime;
	}
	FPS++;
	
	//logic
	//console.log("beat"); 
	
	display.fillStyle=bgColour;
	display.fillRect(0, 0, 999999, 999999);
	
	display.fillStyle="white";
	display.fillText(FPSDisplay,0,24);
	display.fillText(canvas.width + "x" + canvas.height ,0,48);
	display.fillText(touch.length,0,72);
	display.fillText("",0,100);
	
	display.fillStyle="#111111";
	display.fillRect(mouseX-10,mouseY-10,20,20);
	
	//Setup next tick
	window.setTimeout(tick,((thisFrameTime + FPSTargetInterval) - window.performance.now()))
}

function quit(e){
	console.log("quit");
	
	if(blockQuit){e.returnValue = true;}
}

function resize(){
	console.log("resize");
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth-6;
	canvas.height = window.innerHeight-6;
	display = canvas.getContext("2d");
	display.font = "24px Arial";
	console.log(canvas.width, canvas.height);
}

function keydown(e){
	console.log("keydown",e.which);
	
	//Dont block
	if(e.which == 123){return;} //F12
	if(e.which == 116){return;} //F5
	
	e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
}

function keyup(e){
	console.log("keyup",e.which);
	
	e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
}

function mousedown(e){
	console.log("mousedown");
	
	e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
}

function mouseup(e){
	console.log("mouseup");
	
	e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
}

function mousemove(e){
	console.log("mousemove",e.clientX,e.clientY);
	
	mouseX = e.clientX;
	mouseY = e.clientY;
	
	e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
}

function mousewheel(e){
	console.log("mousewheel",e.deltaY);
}

function rightclick(e){
	console.log("rightclick");
	e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
}

function touchstart(e){
	console.log("touch start");
	
	bgColour = "#AF0000";
	touch = e.touches;
	
	//e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
}

function touchmove(e){
	console.log("touch move");
	
	bgColour = "#00FF00";
	touch = e.touches;
	
	//e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
}

function touchend(e){
	console.log("touch end");
	
	bgColour = "#0000FF";
	touch = e.touches;
	
	//e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
}

function touchcancel(e){
	console.log("touch cancel");
	
	bgColour = "#AAAAAA";
	touch = e.touches;
	
	//e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
}