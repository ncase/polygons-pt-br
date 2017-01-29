var playables = document.querySelectorAll("iframe[playable]");

window.onscroll = function(){

	// Playables - PAUSE & UNPAUSE
	var scrollY = window.scrollY;
	var innerHeight = window.innerHeight;
	for(var i=0;i<playables.length;i++){
		var p = playables[i];
		p.contentWindow.IS_IN_SIGHT = (p.offsetTop<scrollY+innerHeight && p.offsetTop+parseInt(p.height)>scrollY);
		//p.contentWindow.IS_IN_SIGHT = false;
	}

};

window.onload = function(){
	window.onscroll();
};
