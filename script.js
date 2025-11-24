"use strict";

window.onload = init;

let FPS;
const FPSTarget = 60;
let lastFPSTime;
let FPSTargetInterval;



function init(){
	FPS = 0;
	FPSTargetInterval = 1000 / FPSTarget;
	lastFPSTime = window.performance.now();
	
	window.setTimeout(tick, 0);
}

function tick(){
	//FPS counter
	let thisFrameTime = window.performance.now();
	if(thisFrameTime > lastFPSTime + 1000){
		console.log("FPS ",FPS);
document.getElementById("tl").innerHTML=FPS;
		FPS = 0;
		lastFPSTime = thisFrameTime;
	}
	FPS++;
	
	//logic
	console.log("beat");
	
	draw();
	
	//Setup next tick
	window.setTimeout(tick,((thisFrameTime + FPSTargetInterval) - window.performance.now()))
}

function draw(){

}