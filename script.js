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
let fullscreen;

let image, imageX, imageY;
let alphaImage;

let keyboard = [];

let mouseX,mouseY;

let touch = [];
// touch[i].identifier
// touch[i].clientX
// touch[i].clientY

class clsButton {
	constructor(label = "", x = 0, y = 0, w = 30, h = 30) {
		this.label = label;
		this.x = x; this.y = y;
		this.w = w; this.h = h;
		this.down = 0; this.up = 0; this.held = 0;
		this.keycode = 0;
	}
}

class clsUI{
	constructor(){
		console.log("ui constructor");
		
		this.button = [];
	}
	
	resize(){
	
	}
	
	hitTest(x,y){
		for(let i = 0; i < this.button.length; i++){
			if(x < this.button[i].x){continue;}
			if(y < this.button[i].y){continue;}
			if(x > this.button[i].x+this.button[i].w){continue;}
			if(y > this.button[i].y+this.button[i].h){continue;}
			return this.button[i];
		}
		return null;
	}
	
	draw(){
		//Buttons
		for(let i = 0; i < this.button.length; i++){
			const btn = this.button[i];
			
			// Draw button background
			display.fillStyle = "#C0C0F0";
			display.fillRect(btn.x, btn.y, btn.w, btn.h);
			
			// Draw button border
			display.strokeStyle = "#FFFFFF";
			display.lineWidth = 3;
			display.strokeRect(btn.x, btn.y, btn.w, btn.h);
			
			// Draw label centered
			display.fillStyle = "#000000";
			display.textAlign = "center";
			display.textBaseline = "middle";
			const centerX = btn.x + btn.w / 2;
			const centerY = btn.y + btn.h / 2;
			display.fillText(btn.label, centerX, centerY);
		}
	}
}
let ui = new clsUI;

function init(){
	FPS = 0;
	FPSDisplay = 0;
	FPSTargetInterval = 1000 / FPSTarget;
	lastFPSTime = window.performance.now();

	resize();
	bgColour = "#330000"
	fullscreen = false;
	
	ui.button.push(new clsButton("Fullscreen",(canvas.width/2)-50,0,100,30));
		ui.button[ui.button.length-1].up = toggleFullscreen;
	ui.button.push(new clsButton("W",32,(canvas.height/2)-32,30,30));
		ui.button[ui.button.length-1].keycode = 87;
		ui.button[ui.button.length-1].down = function(){keyboard[87] = 1;};
		ui.button[ui.button.length-1].held = function(){keyboard[87] = 1;};
		ui.button[ui.button.length-1].up = function(){keyboard[87] = 0;};
	ui.button.push(new clsButton("A",0,(canvas.height/2),30,30));
		ui.button[ui.button.length-1].keycode = 65;
		ui.button[ui.button.length-1].down = function(){keyboard[65] = 1;};
		ui.button[ui.button.length-1].held = function(){keyboard[65] = 1;};
		ui.button[ui.button.length-1].up = function(){keyboard[65] = 0;};
	ui.button.push(new clsButton("S",32,(canvas.height/2),30,30));
		ui.button[ui.button.length-1].keycode = 83;
		ui.button[ui.button.length-1].down = function(){keyboard[83] = 1;};
		ui.button[ui.button.length-1].held = function(){keyboard[83] = 1;};
		ui.button[ui.button.length-1].up = function(){keyboard[83] = 0;};
	ui.button.push(new clsButton("D",64,(canvas.height/2),30,30));
		ui.button[ui.button.length-1].keycode = 68;
		ui.button[ui.button.length-1].down = function(){keyboard[68] = 1;};
		ui.button[ui.button.length-1].held = function(){keyboard[68] = 1;};
		ui.button[ui.button.length-1].up = function(){keyboard[68] = 0;};
		
	
	image = new Image();
	alphaImage = new Image();
	image.src = "test.bmp";
	alphaImage.src = "alpha.png";
	imageX = canvas.width/2;
	imageY = canvas.height/2;
	
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

function quit(e){
	console.log("quit");
	
	if(blockQuit){e.returnValue = true;}
}

function tick(){
	//FPS counter logic
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
	//ui.button[1].hold();
	
	draw();
	
	//Setup next tick
	window.setTimeout(tick,((thisFrameTime + FPSTargetInterval) - window.performance.now()))
}

function draw(){
	//Blank screen	
	display.fillStyle=bgColour;
	display.fillRect(0, 0, 999999, 999999);
	
	display.drawImage(image,imageX,imageY);
	display.drawImage(alphaImage,132,164);
	
	ui.draw();
	
	//Text overlay
	display.textAlign = "left";
	display.textBaseline = "top";
	display.fillStyle="white";
	display.fillText(FPSDisplay,0,0);
	display.fillText(canvas.width + "x" + canvas.height ,0,fontSize);
	display.fillText(touch.length,0,fontSize*2);
	display.fillText(window.devicePixelRatio,0,fontSize*3);
	display.fillText("bottom",0,canvas.height-fontSize);
	
	//track cursor
	display.fillStyle="#111111";
	display.fillRect(mouseX-10,mouseY-10,20,20);
}

function resize(){
	console.log("resize");
	canvas = document.getElementById("canvas");
	canvas.style.width = window.innerWidth;
	canvas.style.height = window.innerHeight;
	canvas.width = window.innerWidth	;//* window.devicePixelRatio;
	canvas.height = window.innerHeight	;//* window.devicePixelRatio;
	display = canvas.getContext("2d");
	//display.scale( 1/window.devicePixelRatio,1/window.devicePixelRatio);
	display.font = fontSize +"px Arial";
	
	ui.resize();
	
	console.log(canvas.width, canvas.height);
}

function toggleFullscreen(){
	if(fullscreen){
		console.log("exit fullscreen");
		if(document.exitFullscreen) {
			document.exitFullscreen();
		}else if(document.webkitExitFullscreen) { /* Safari */
			document.webkitExitFullscreen();
		}else if(document.msExitFullscreen) { /* IE11 */
			document.msExitFullscreen();
		}
	}else{
		console.log("enter fullscreen");
		if(canvas.requestFullscreen){
			canvas.requestFullscreen();
		}else if(canvas.webkitRequestFullscreen) { /* Safari */
			canvas.webkitRequestFullscreen();
		}else if(canvas.msRequestFullscreen) { /* IE11 */
			canvas.msRequestFullscreen();
		}
	}
	fullscreen = !fullscreen;
}

function keydown(e){
	console.log("keydown",e.which);
	
	//Dont block
	if(e.which == 116){return;} //F5
	if(e.which == 122){return;} //F11
	if(e.which == 123){return;} //F12

	keyboard[e.which] = 1;
	
	e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
}

function keyup(e){
	console.log("keyup",e.which);
	
	keyboard[e.which] = 0;
	
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
	
	const btn = ui.hitTest(e.clientX,e.clientY);
	if(btn){if(btn.up){btn.up();}}
	
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
	
	for(let i = 0; i < e.changedTouches.length; i++){
		const btn = ui.hitTest(e.changedTouches[i].clientX,e.changedTouches[i].clientY);
		if(btn){if(btn.up){btn.up();}}
	}
	
	e.preventDefault();
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


