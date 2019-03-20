<<<<<<< HEAD
$(document).ready(function() {

	//alert('document ready :-)__');
	var count=0;
	var progressTimerBuffer = new Object();
	
	$('a').on("click", function (e) {
        e.preventDefault();
    });
    
    function formatBytes(a,b){
    	if(0 == a)
    		return "0 Bytes";
    	var c=1000/*Since base 10 values*/, d=b||2, e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"], f= Math.floor(Math.log(a)/Math.log(c));
    	return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f];
    }
	
	function postRequest(postUrl, postData) {
		
		return new Promise(function(resolve, reject) {
			
			$.post(postUrl, postData)
				.done(function(data, status, xhr) {
					/* console.log("done callback called");
					console.log(data);
					console.log(status);
					console.log(xhr); */
					resolve(data);
				})
				.fail(function(xhr, status, error) {
					// error handling
					/* console.log("fail callback called");
					console.log(xhr);
					console.log(status);
					console.log(error); */
					reject(error);
				});
				
		});
		
	}
	
	function addDownload(gid, url, position, percent, completed, size, download_speed, status){
		var rowElement = "<tr>";
		rowElement += "<td>";
		rowElement +=  gid;
		rowElement += "</td>";
		rowElement += "<td>";
		rowElement += url;
		rowElement += "</td>";
		rowElement += "<td>";
		rowElement += position;
		rowElement += "</td>";
		rowElement += "<td id='"+gid+"_percent'>";
		rowElement += percent;
		rowElement += "</td>";
		rowElement += "<td id='"+gid+"_completed'>";
		rowElement += completed;
		rowElement += "</td>";
		rowElement += "<td id='"+gid+"_size'>";
		rowElement += size;
		rowElement += "</td>";
		rowElement += "<td id='"+gid+"_download_speed'>";
		rowElement += download_speed;
		rowElement += "</td>";
		rowElement += "<td id='"+gid+"_status'>";
		rowElement += status;
		rowElement += "</td>";
		rowElement += "</tr>"
		$('tbody').append(rowElement);
	}
	
	function updateProgressInBackground(id) {
		var timerId = setInterval(() => {
			postRequest("aria2cManager.php", {
				action: "tellStatus",
				gid: id,
			})
			.then( function (data) {
				//console.log("data : "+data);
				var jsonData = JSON.parse(data);
				var totalLength = jsonData.totalLength;
				var completedLength = jsonData.completedLength;
				var percent = Math.round(((completedLength/totalLength).toFixed(2) * 100));
				var downloadSpeed = jsonData.downloadSpeed;
				var status = jsonData.status;
				var gid = jsonData.gid;
				console.debug("\n\n\ncompletedLength : "+completedLength+"\tdownloadSpeed : "+downloadSpeed+"\ttotalLength : "+totalLength+"\tstatus : "+status+"\tgid : "+gid);
				$("#"+gid+"_percent").text(percent+"%");
				$("#"+gid+"_completed").text(formatBytes(completedLength));
				$("#"+gid+"_size").text(formatBytes(totalLength));
				$("#"+gid+"_download_speed").text(formatBytes(downloadSpeed));
				$("#"+gid+"_status").text(status);
				if(status=="error" || status=="complete" || status=="removed") {
					console.debug("stopping progress update for gid, "+gid+" as status is "+status);
					clearInterval(progressTimerBuffer[gid]);
					delete progressTimerBuffer[gid];
				}
			},
			function (error) {
				console.error('Something went wrong with addDownload call', error);
			});
		}, 1000);
		progressTimerBuffer[id] = timerId;
	}

	$("#addDownload").click(function(e){
		//alert('Add New Download__');
		//addDownload("gid"+(++count), "url", "position", "percent", "completed", "size", "download_speed", "status");
		var url = $('#inputUrl').val();
		
		$("#modalForm").modal("toggle");
		
		//alert("Entered url is : __"+url+"__");
		
		postRequest("aria2cManager.php", {
			action: "addDownload",
			inputUrl: url,
		})
		.then( function (gid) {
			/* console.log('xhr Contents: \n' );
			console.log(xhr); */
			//console.log("Query for gid : "+gid);
			addDownload(gid, url, gid, "0%", "0 MiB", "N/A", "N/A", "N/A");
			updateProgressInBackground(gid);
		},
		function (error) {
			console.error('Something went wrong with addDownload call', error);
		});
		
		return false;
	});

	$("#pauseAllDownload").click(function(e){
		alert('Pause All__');
	});

	$("#resumeAllDownload").click(function(e){
		alert('Resume  All__');
	});

	$("#reDownloadFailed").click(function(e){
		alert('Re-download Failed__');
	});

	$("#saveSession").click(function(e){
		alert('Save Session__');
	});

	$("#clearCompleted").click(function(e){
		alert('Clear Completed__');
	});

	$("#downloadFiles").click(function(e){
		alert('Downloaded Files__');
	});

});
=======
$(document).ready(function() {

	//alert('document ready :-)__');
	var count=0;
	
	$('a').on("click", function (e) {
        e.preventDefault();
    });
	
	function postRequest(postUrl, postData) {
		
		return new Promise(function(resolve, reject) {
			
			$.post(postUrl, postData)
				.done(function(data, status, xhr) {
					/* console.log("done callback called");
					console.log(data);
					console.log(status);
					console.log(xhr); */
					resolve(data);
				})
				.fail(function(xhr, status, error) {
					// error handling
					/* console.log("fail callback called");
					console.log(xhr);
					console.log(status);
					console.log(error); */
					reject(error);
				});
				
		});
		
	}
	
	function addDownload(gid, url, position, percent, completed, size, download_speed, status){
		var rowElement = "<tr>";
		rowElement += "<td>";
		rowElement +=  gid;
		rowElement += "</td>";
		rowElement += "<td>";
		rowElement += url;
		rowElement += "</td>";
		rowElement += "<td>";
		rowElement += position;
		rowElement += "</td>";
		rowElement += "<td id='"+gid+"_percent'>";
		rowElement += percent;
		rowElement += "</td>";
		rowElement += "<td id='"+gid+"_completed'>";
		rowElement += completed;
		rowElement += "</td>";
		rowElement += "<td id='"+gid+"_size'>";
		rowElement += size;
		rowElement += "</td>";
		rowElement += "<td id='"+gid+"_download_speed'>";
		rowElement += download_speed;
		rowElement += "</td>";
		rowElement += "<td id='"+gid+"_status'>";
		rowElement += status;
		rowElement += "</td>";
		rowElement += "</tr>"
		$('tbody').append(rowElement);
	}
	
	function updateProgressInBackground(id) {
		var timerId = setInterval(() => {
			postRequest("aria2cManager.php", {
				action: "tellStatus",
				gid: id,
			})
			.then( function (data) {
				console.log("data : "+data);
			},
			function (error) {
				console.error('Something went wrong with addDownload call', error);
			});
		}, 1000);
	}

	$("#addDownload").click(function(e){
		//alert('Add New Download__');
		//addDownload("gid"+(++count), "url", "position", "percent", "completed", "size", "download_speed", "status");
		var url = $('#inputUrl').val();
		//alert("Entered url is : __"+url+"__");
		
		postRequest("aria2cManager.php", {
			action: "addDownload",
			inputUrl: url,
		})
		.then( function (gid) {
			/* console.log('xhr Contents: \n' );
			console.log(xhr); */
			//console.log("Query for gid : "+gid);
			addDownload(gid, url, gid, "0%", "0 MiB", "N/A", "N/A", "N/A");
			updateProgressInBackground(gid);
		},
		function (error) {
			console.error('Something went wrong with addDownload call', error);
		});
		
		return true;
	});

	$("#pauseAllDownload").click(function(e){
		alert('Pause All__');
	});

	$("#resumeAllDownload").click(function(e){
		alert('Resume  All__');
	});

	$("#reDownloadFailed").click(function(e){
		alert('Re-download Failed__');
	});

	$("#saveSession").click(function(e){
		alert('Save Session__');
	});

	$("#clearCompleted").click(function(e){
		alert('Clear Completed__');
	});

	$("#downloadFiles").click(function(e){
		alert('Downloaded Files__');
	});

});
>>>>>>> db9ce577f35af2f1d0bbd48180fae351c568fee2
