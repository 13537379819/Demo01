(function(){
	function Recoder(){
		this.getMediaStream();
	}
	
	Recoder.prototype.getMediaStream = function(){
		var config = {video:true};
		
		var self = this;
		
		//缓存数组
		this.buffers = [];
		function success(stream){
			self.mediaRecorder = new MediaRecorder(stream);
			self.mediaRecorder.addEventListener("dataavailable",function(event){
				console.log(event);
				self.buffers.push(event.data);
			});

			self.addEventListener();
		}
		
		function fail(error){
			console.log(error);
		}
		
		navigator.mediaDevices.getUserMedia(config).then(success).catch(fail);
	}
	
	Recoder.prototype.addEventListener = function(){
		var self = this;
		this.mediaRecorder.addEventListener("stop",function(){
			var blob = new Blob(self.buffers,{mimeType:"video/mp4"});
			var url = URL.createObjectURL(blob);
			var video = document.createElement("video");
			video.src = url;
			document.body.appendChild(video);
			video.autoplay = true;
			video.onended = function(){
				document.body.removeChild(this);
			}
			
			var downloadButton = document.createElement("a");
			downloadButton.textContent = "保存到本地"
			downloadButton.href = url;
			downloadButton.download = url;
			document.body.appendChild(downloadButton);
		});
	}
	
	Recoder.prototype.start = function(){
		if(this.mediaRecorder.state == "recording"){
			return;
		}
		this.mediaRecorder.start();
		
	}
	
	Recoder.prototype.recoder = function(){
		if(this.mediaRecorder.state == "paused"){
			this.mediaRecorder.resume();
		}else{
			this.start();
		}
	}
	
	Recoder.prototype.pause = function(){
		this.mediaRecorder.pause();
	}
	
	Recoder.prototype.stop = function(){
		this.mediaRecorder.stop();
	}
	
	window.Recoder = Recoder;
})();
