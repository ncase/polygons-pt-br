function simpleCanvasGenerator(target, type) {
  var canvas = document.querySelector(target);
  var ctx = canvas.getContext("2d");
  var windowSize = window.innerWidth;
  var halfWindow = windowSize / 2;
  canvas.width = windowSize;

  var assetsLeft = 0;
  var onImageLoaded = function(){
  	assetsLeft--;
  };

  var images = {};
  function addAsset(name,src){
  	assetsLeft++;
  	images[name] = new Image();
  	images[name].onload = onImageLoaded;
  	images[name].src = src;
  }

  addAsset("mehTriangle","play/img/meh_triangle.png");
  addAsset("mehSquare","play/img/meh_square.png");

  addAsset("yayTriangle","play/img/yay_triangle.png");
  addAsset("yaySquare","play/img/yay_square.png");
  addAsset("yayPentagon","play/img/yay_pentagon.png");

  var cordXandY = 0;
  var defaultWidthAndHeight = 55;
  var shapes = type === 'happy' ? ['yaySquare', 'yayTriangle', 'yayPentagon'] : ['mehTriangle', 'mehSquare'];
  var randomShape = function(){
    return Math.floor(Math.random()*items.length);
  };


  function Swinger(){

  	var self = this;

  	self.swing = 0;
  	self.baseRotation = 0;

  	self.color = (Math.random()<0.5) ? 0 : 1;

  	self.update = function(){

  		var dx = Mouse.x - self.x;
  		var dy = Mouse.y - (self.y+220+window.SCROLL*0.5);
  		var dist = Math.sqrt(dx*dx+dy*dy);

  		self.swing += 0.05;
  		if(dist<320){
  			var t = (320-dist)/320;
  			self.swing += 0.3 * t;
  		}

  	};

  	self.draw = function(ctx){

  		ctx.save();

  		ctx.translate(self.x,self.y);

  		ctx.translate(0,20);
  		ctx.rotate(self.baseRotation + Math.sin(self.swing)*Math.PI*0.05);
  		ctx.translate(0,-20);

  		var img;
      if(type === 'sad'){
        img = self.x>halfWindow ? images.mehSquare : images.mehTriangle;
      }
      else {
        switch (self.color) {
          case 0:
          img = images[shapes[0]];
          break;

          case 1:
          img = images[shapes[1]];
          break;

          case 2:
          img = images[shapes[2]];
          break;

          default:
          img = images[randomShape()];
        }
      }

      if (windowSize > 1200) {
        cordXandY = -30;
        defaultWidthAndHeight = 60;
      }

  		ctx.drawImage(img, cordXandY, cordXandY, defaultWidthAndHeight, defaultWidthAndHeight);
  		ctx.restore();

  	};

  }

  var PENTAGON = false;

  var swingers = [];
  for(var i=0;i<canvas.width;i+=50){

  	var tt = (i-halfWindow)/halfWindow;
  	var num;
  	if(i>halfWindow){
  		num = Math.ceil(tt*tt*4);
  	}else{
  		num = Math.ceil(tt*tt*7);
  	}

  	for(var j=0;j<num+1;j++){

  		var x = i + Math.random()*1-10;
  		var y = 220 - 170*Math.pow(t,2);

  		if(i>halfWindow){
  			y += j*50 + Math.random()*20-10;
  		}else{
  			y += j*30 + Math.random()*20-10;
  		}

      var maximumSizeOfSides = halfWindow - 130;
  		if(x>maximumSizeOfSides && x<canvas.width-maximumSizeOfSides) continue;

  		var t = (x-halfWindow)/halfWindow;

  		var s = new Swinger();
  		s.x = x;
  		s.swing = x*0.1;
  		s.y = y;
  		s.baseRotation = (Math.random()*0.2-0.1);
  		if(!PENTAGON && s.x>1000 && j>=num){
  			PENTAGON = true;
  			s.color = 2;
  		}

  		if(!isNaN(s.y)){
  			swingers.push(s);
  		}

  	}

  }

  var s = new Swinger();
  s.x = halfWindow-30;
  s.swing = s.x*0.1;
  s.y = 210;
  s.color = 1;
  swingers.push(s);

  var s = new Swinger();
  s.x = halfWindow+30;
  s.swing = x*0.1;
  s.y = 210;
  s.color = 0;
  swingers.push(s);

  /*var s = new Swinger();
  s.x = halfWindow+30;
  s.swing = x*0.1;
  s.y = 210;
  s.color = 2;
  swingers.push(s);
  window.PENTAGON = s;*/

  swingers = swingers.sort(function(a,b){
  	return a.y-b.y;
  });


  window.SCROLL = 0;
  function render(){

  	if(assetsLeft>0 || window.SCROLL>550) return;

  	// Update
  	for(var i=0;i<swingers.length;i++){
  		swingers[i].update();
  	}

  	// Draw
  	canvas.style.top = (-window.SCROLL*0.5+250)+"px";
  	ctx.clearRect(0,0,canvas.width,canvas.height);
  	ctx.save();
  	ctx.translate(0,0);
  	for(i=0;i<swingers.length;i++){
  		swingers[i].draw(ctx);
  	}
  	ctx.restore();

  }

  ////////////////////
  // ANIMATION LOOP //
  ////////////////////
  window.requestAnimFrame = window.requestAnimationFrame ||
  	window.webkitRequestAnimationFrame ||
  	window.mozRequestAnimationFrame ||
  	function(callback){ window.setTimeout(callback, 1000/60); };
  (function animloop(){
  	requestAnimFrame(animloop);
  	render();
  })();

}
