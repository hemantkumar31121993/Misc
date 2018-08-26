
var canvas = document.getElementById('test1')
var overlay = document.getElementById('overlay')
canvas.setAttribute("width", document.querySelector("body").scrollWidth)
canvas.setAttribute("height", document.querySelector("body").scrollHeight)

overlay.setAttribute("width", canvas.scrollWidth)
overlay.setAttribute("height", canvas.scrollHeight)
overlay.setAttribute("style", "top:0;left:"+canvas.offsetLeft+";margin-top:"+canvas.offsetTop+"px;")

var coordinate = document.getElementById('coordinate')
coordinate.setAttribute("width", canvas.scrollWidth)
coordinate.setAttribute("height", canvas.scrollHeight)
coordinate.setAttribute("style", "top:0;left:"+canvas.offsetLeft+";margin-top:"+canvas.offsetTop+"px;")

var suggestion = document.getElementById('suggestion')
suggestion.setAttribute("width", canvas.scrollWidth)
suggestion.setAttribute("height", canvas.scrollHeight)
suggestion.setAttribute("style", "top:0;left:"+canvas.offsetLeft+";margin-top:"+canvas.offsetTop+"px;")

function drawBoard(){
	var octx = overlay.getContext('2d')
	var bw = canvas.scrollWidth;
	var bh = canvas.scrollHeight;
	var p=0;

	octx.beginPath()
	for (var x = 0; x <= bw; x += 5) {
	    octx.moveTo(x + p, p);
	    octx.lineTo(x + p, bh + p);
	}


	for (var x = 0; x <= bh; x += 5) {
	    octx.moveTo(p, x + p);
	    octx.lineTo(bw + p, x + p);
	}

	octx.strokeStyle = "#EEEEEE";
	octx.lineWidth = 0.5;
	octx.stroke();

	octx.beginPath()
	for (var x = 0; x <= bw; x += 25) {
	    octx.moveTo(x + p, p);
	    octx.lineTo(x + p, bh + p);
	}


	for (var x = 0; x <= bh; x += 25) {
	    octx.moveTo(p, x + p);
	    octx.lineTo(bw + p, x + p);
	}

	octx.strokeStyle = "#BBEEBB";
	octx.lineWidth = 0.5;
	octx.stroke();	

	octx.beginPath()
	for (var x = 0; x <= bw; x += 50) {
	    octx.moveTo(x + p, p);
	    octx.lineTo(x + p, bh + p);
	}


	for (var x = 0; x <= bh; x += 50) {
	    octx.moveTo(p, x + p);
	    octx.lineTo(bw + p, x + p);
	}

	octx.strokeStyle = "#00EE00";
	octx.lineWidth = 0.5;
	octx.stroke();

}

drawBoard();


var ctx = canvas.getContext('2d')

ctx.fillStyle = '#CC0000A0'
ctx.fillRect(10,10,50,50)

ctx.fillStyle = '#0000CCA0'
ctx.fillRect(30,30,50,50)

var isAlive = false;
var doTool = function(e) {
	// console.log(isAlive)
	tool = document.getElementById('tool').value;
	// console.log(tool)
	if (isAlive === false) {
		if(tool === "0") {
			// // console.log("here")
			isAlive = {}
			isAlive.func = drawLine
			isAlive.lastxy =  {x: e.clientX - canvas.offsetLeft, y: e.clientY-canvas.offsetTop}
			isAlive.tool = 0
			ctx.moveTo(isAlive.lastxy.x, isAlive.lastxy.y)
			// console.log(isAlive)
		} else if (tool === "1") {
			isAlive = {}
			isAlive.func = drawCircle;
			isAlive.lastxy = {x: e.clientX - canvas.offsetLeft, y: e.clientY-canvas.offsetTop}
			isAlive.tool = 1
		}
	} else {
		isAlive.func(e)
	}
}

var drawCircle = function(e) {
	if(isAlive.tool === 1) {
		var x = (e.clientX - canvas.offsetLeft) - isAlive.lastxy.x
		var y = (e.clientY - canvas.offsetTop) - isAlive.lastxy.y
		r = Math.sqrt(x*x + y*y)
		ctx.beginPath()
		ctx.arc(isAlive.lastxy.x, isAlive.lastxy.y, r,0, Math.PI*2, true)
		ctx.lineWidth=2
		ctx.stroke()
		reset()
	}
}

function drawLine(e) {
	// console.log("Last Point");
	// console.log(isAlive)
	var x = e.clientX-canvas.offsetLeft
	var y = e.clientY-canvas.offsetTop
	//ctx.beginPath();
	//ctx.moveTo(isAlive.lastxy.x, isAlive.lastxy.y)
	ctx.lineTo(x,y)
	ctx.lineWidth=2
	ctx.lineJoin="round"
	ctx.stroke();
	isAlive.lastxy = {x:x, y:y}
	// console.log("New Point");
	// console.log(isAlive)
}

var reset = function(e) {
	isAlive = false;
	var sctx = suggestion.getContext('2d')
	sctx.clearRect(0, 0, suggestion.width, suggestion.height)
	//ctx.stroke()
}

var showCoordinate = function(e) {
	var x = (e.clientX - canvas.offsetLeft)
	var y = (e.clientY - canvas.offsetTop)
	if(isAlive) {
		var dx = (e.clientX - canvas.offsetLeft) - isAlive.lastxy.x
		var dy = (e.clientY - canvas.offsetTop) - isAlive.lastxy.y
		var l = Math.sqrt(dx*dx+dy*dy)
		var theta = Math.atan(dy/dx)
	}
	var cctx = coordinate.getContext('2d')
	cctx.clearRect(0, 0, coordinate.width, coordinate.height);
	cctx.font = "12px Arial"
	cctx.fillText("x:"+(x/50).toFixed(2)+", y:"+(y/50).toFixed(2), x+12, y);
	if(isAlive) {
		cctx.fillText("dx:"+(dx/50).toFixed(2)+", dy:"+(dy/50).toFixed(2), x+12, y+14);
		cctx.fillText("l:"+(l/50).toFixed(2)+", theta:"+(theta).toFixed(2), x+12, y+28);
	}
}

var showSuggestion = function(e) {
	if(isAlive) {
		if(isAlive.tool == 0) {
			var sctx = suggestion.getContext('2d')
			sctx.clearRect(0, 0, suggestion.width, suggestion.height)
			var x = (e.clientX - canvas.offsetLeft)
			var y = (e.clientY - canvas.offsetTop)
			sctx.beginPath()
			sctx.moveTo(isAlive.lastxy.x, isAlive.lastxy.y)
			sctx.lineTo(x, y);
			sctx.strokeStyle="#CC0000"
			sctx.lineWidth=1
			sctx.stroke()
		} else if(isAlive.tool == 1) {
			var sctx = suggestion.getContext('2d')
			sctx.clearRect(0, 0, suggestion.width, suggestion.height)
			var x = (e.clientX - canvas.offsetLeft) - isAlive.lastxy.x
			var y = (e.clientY - canvas.offsetTop) - isAlive.lastxy.y
			r = Math.sqrt(x*x + y*y)
			sctx.beginPath()
			sctx.arc(isAlive.lastxy.x, isAlive.lastxy.y, r,0, Math.PI*2, true)
			sctx.strokeStyle="#CC0000"
			sctx.lineWidth=1
			sctx.stroke()
			sctx.beginPath()
			sctx.moveTo(isAlive.lastxy.x-10, isAlive.lastxy.y)
			sctx.lineTo(isAlive.lastxy.x+10, isAlive.lastxy.y)
			sctx.moveTo(isAlive.lastxy.x, isAlive.lastxy.y-10)
			sctx.lineTo(isAlive.lastxy.x, isAlive.lastxy.y+10)
			sctx.strokeStyle="#CC0000"
			sctx.lineWidth=1
			sctx.stroke()
		}
	}
}