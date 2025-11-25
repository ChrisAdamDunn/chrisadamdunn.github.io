"use strict";

window.onload = init;

let FPS;
let FPSDisplay;
const FPSTarget = 60;
let lastFPSTime;
let FPSTargetInterval;

let canvas;
let display;

function init(){
	FPS = 0;
	FPSDisplay = 0;
	FPSTargetInterval = 1000 / FPSTarget;
	lastFPSTime = window.performance.now();
	
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	display = canvas.getContext("2d");
	display.font = "30px Arial";
	
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
	console.log("beat");
	console.log(canvas.width,canvas.height);
	
	display.fillStyle="red";
	display.fillRect(0, 0, 999999, 999999);
	display.fillStyle="white";
	display.fillText(FPSDisplay,0,30);
	
	//Setup next tick
	window.setTimeout(tick,((thisFrameTime + FPSTargetInterval) - window.performance.now()))
}
