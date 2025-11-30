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
const fontSize = 13;
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

	bgColour = "#330000";
	resize();
	
	window.addEventListener("beforeunload",quit);
	
	document.addEventListener("keydown",keydown);
	document.addEventListener("keyup",keyup);
	
	document.addEventListener("mousedown",mousedown);
	document.addEventListener("mouseup",mouseup);
	document.addEventListener("mousemove",mousemove);
	document.addEventListener("wheel",mousewheel);
	document.addEventListener("click",mouseclick);
	document.addEventListener("dbleclick",mousedouble);
	document.addEventListener("contextmenu",rightclick);

	document.addEventListener("touchstart",touchstart);
	document.addEventListener("touchmove",touchmove);
	document.addEventListener("touchend",touchend);
	document.addEventListener("touchcancel",touchcancel);
	document.addEventListener("gesturestart",gesturestart);
	document.addEventListener("gesturechange",gesturechange);
	document.addEventListener("gestureend",gestureend);
	
	window.setTimeout(tick, 0);
}

function tick(){
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
	
	//Blank screen	
	display.fillStyle=bgColour;
	display.fillRect(0, 0, 999999, 999999);
	
	//Render stuff

	
	//Text overlay
	display.fillStyle="white";
	display.fillText(FPSDisplay,0,fontSize);
	display.fillText(canvas.width + "x" + canvas.height ,0,fontSize*2);
	display.fillText(touch.length,0,fontSize*3);
	display.fillText(window.devicePixelRatio,0,fontSize*4);
	display.fillText("bottom",0,canvas.height);
	
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
	canvas.style.width = window.innerWidth;
	canvas.style.height = window.innerHeight;
	canvas.width = window.innerWidth	 * window.devicePixelRatio;
	canvas.height = window.innerHeight	* window.devicePixelRatio;
	display = canvas.getContext("2d");
	display.scale( window.devicePixelRatio, window.devicePixelRatio);
	display.font = fontSize +"px Arial";
	
	console.log(canvas.width, canvas.height);
}

function keydown(e){
	console.log("keydown",e.which);
	
	//Dont block
	if(e.which == 116){return;} //F5
	if(e.which == 122){return;} //F11
	if(e.which == 123){return;} //F12

	
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

function mouseclick(e){
	console.log("click");
	
	e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
}

function mousedouble(e){
	console.log("double click");
	
	e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
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
	
	e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
}

function touchmove(e){
	console.log("touch move");
	
	bgColour = "#00FF00";
	touch = e.touches;
	
	e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
}

function touchend(e){
	console.log("touch end");
	
	bgColour = "#0000FF";
	touch = e.touches;
	
//	e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
}

function touchcancel(e){
	console.log("touch cancel");
	
	bgColour = "#AAAAAA";
	touch = e.touches;
	
	e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
}

function gesturestart(e){
	console.log("gesture start");

	e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
}

function gesturechange(e){
	console.log("gesture change");

	e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
}

function gestureend(e){
	console.log("gesture end");
	
	e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
}
