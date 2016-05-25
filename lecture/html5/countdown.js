var WINDOW_WIDTH;
var WINDOW_HEIGHT;
var RADIUS;
var MARGIN_TOP;
var MARGIN_LEFT;

const endTime=new Date(2016,2,19,12,45,52);
var CurShowTimeSeconds=0;

var balls=[];
var colors=["#abcdef","#F26DC5","#066FE8","#00ECFF","#521F9A","#AED900","#B23CC2","red"];

window.onload=function(){

	WINDOW_WIDTH=document.body.clientWidth;
	WINDOW_HEIGHT= document.documentElement.clientHeight||document.body.clientHeight;

	MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
	MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);
	RADIUS=Math.round(WINDOW_WIDTH*4/5/108)- 1;


	var canvas=document.getElementById("canvas");
	var context=canvas.getContext("2d");

	canvas.width= WINDOW_WIDTH;
	canvas.height= WINDOW_HEIGHT;

	CurShowTimeSeconds=getCurrentShowTimeSeconds();
	setInterval(function(){
		render(context);
		update();
	},50)
	

}
function getCurrentShowTimeSeconds(){
	var curTime=new Date();
	var ret=endTime.getTime()-curTime.getTime();
	ret=Math.round(ret/1000);

	return ret>=0? ret:0;
}
function update(){
	var nextShowTimeSeconds=getCurrentShowTimeSeconds();

	var nextHours=parseInt(nextShowTimeSeconds/3600);
	var nextMinutes=parseInt( (nextShowTimeSeconds- nextHours*3600)/60);
	var nextSeconds=nextShowTimeSeconds%60;

	var hours=parseInt(CurShowTimeSeconds/3600);
	var minutes=parseInt( (CurShowTimeSeconds- hours*3600)/60);
	var seconds=CurShowTimeSeconds%60;

	if(CurShowTimeSeconds!=nextShowTimeSeconds){
		if(parseInt(hours/10)!=parseInt(nextHours/10)){
			addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10));
		}
		if(parseInt(hours%10)!=parseInt(nextHours%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10));
		}
		if(parseInt(minutes/10)!=parseInt(nextMinutes/10)){
			addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10));
		}
		if(parseInt(minutes%10)!=parseInt(nextMinutes%10)){
			addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10));
		}
		if(parseInt(seconds/10)!=parseInt(nextSeconds/10)){
			addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10));
		}
		if(parseInt(seconds%10)!=parseInt(nextSeconds%10)){
			addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds%10));
		}
		CurShowTimeSeconds=nextShowTimeSeconds;
	}
	updateBalls();


// -----------------------------性能优化---------------------------
	var banu=0;
	for(var i=0;i<balls.length;i++){
		if(balls[i].x+ RADIUS>0&&balls[i].x- RADIUS<WINDOW_WIDTH){
			balls[banu++]= balls[i];
		}
	}
	while(balls.length>banu){
		balls.pop();
	}
}
function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;

		if(balls[i].y>=WINDOW_HEIGHT- RADIUS){
			balls[i].y=WINDOW_HEIGHT - RADIUS;
			balls[i].vy=-balls[i].vy*0.65;
		}
	}
}
function addBalls(x,y,number){
	for(var i=0;i<digit[number].length;i++){
		for(var j=0;j<digit[number][i].length;j++){
			if(digit[number][i][j] == 1){
				var ball={
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(ball);
			}
		}
	}
}
function render(cxt){

	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	var hours=parseInt(CurShowTimeSeconds/3600);
	var minutes=parseInt( (CurShowTimeSeconds- hours*3600)/60);
	var seconds=CurShowTimeSeconds%60;

	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),cxt);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),cxt);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),cxt);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);
	renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);

	for(var i=0;i<balls.length;i++){
		cxt.fillStyle=balls[i].color;

		cxt.beginPath();
		cxt.arc( balls[i].x, balls[i].y, RADIUS, 0, 2*Math.PI, true);
		cxt.closePath();

		cxt.fill();
	}
}
function renderDigit(x,y,number,cxt){
	cxt.fillStyle="#005588";
	for(var i=0;i<digit[number].length;i++){
		for(var j=0;j<digit[number][i].length;j++){
			if(digit[number][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();

				cxt.fill();
			}
		}
	}
}