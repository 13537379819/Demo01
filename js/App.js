(function(){
	function init(){
		var recoder = new Recoder();
		
		document.querySelector(".startButton").onclick = function(){
			recoder.recoder();
		}
		
		document.querySelector(".stopButton").onclick = function(){
			recoder.stop();
		}
	}
	
	init();
})();
