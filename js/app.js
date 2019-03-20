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
	
	function baseName(path) {
		return path.split(/[\\/]/).pop();
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
	
	function downloadFileToLocal(event) {
		var absolutePath = event.data.absolute_path;
		var fileName = event.data.file_name;
		var field;
		
		console.debug("Debugging event object");
		console.debug(event);
		
		/* var form = $('<form></form>');
        form.attr("method", "POST");
        form.attr("action", "downloadFile.php");
		
		field = $('<input></input>');
		field.attr("type", "hidden");
		field.attr("name", "fileName");
		field.attr("value", fileName);
		form.append(field);
		
		field = $('<input></input>');
		field.attr("type", "hidden");
		field.attr("name", "absolutePath");
		field.attr("value", absolutePath);
		form.append(field);
        
        $(form).appendTo('body').submit(); */
		
		var downloadFileUrl = window.location.href.replace("index.html", "");
		if(downloadFileUrl[downloadFileUrl.length-1] != "/"){
			downloadFileUrl += "/";
		}
		
		downloadFileUrl += 'downloadFile.php?absolutePath='+absolutePath+'&fileName='+fileName;
		//downloadFileUrl = encodeURIComponent(downloadFileUrl);
		
		var downloadFileElement = document.createElement('a');
		downloadFileElement.setAttribute('href', downloadFileUrl);
		downloadFileElement.setAttribute('download', fileName);
		downloadFileElement.click();
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
				var path = jsonData.files[0]["path"];
				var fileName = baseName(path);
				//console.debug("\n\n\ncompletedLength : "+completedLength+"\tdownloadSpeed : "+downloadSpeed+"\ttotalLength : "+totalLength+"\tstatus : "+status+"\tgid : "+gid+"\tpath : "+path);
				$("#"+gid+"_percent").text(percent+"%");
				$("#"+gid+"_completed").text(formatBytes(completedLength));
				$("#"+gid+"_size").text(formatBytes(totalLength));
				$("#"+gid+"_download_speed").text(formatBytes(downloadSpeed));
				$("#"+gid+"_status").text(status);
				if(status=="error" || status=="complete" || status=="removed") {
					console.debug("stopping progress update for gid, "+gid+" as status is "+status);
					if(status=="complete"){
						$("#"+gid+"_status").append("&nbsp;&nbsp;");
						$( '<button />' , {
							'class': 'btn btn-default btn-xs glyphicon',
							type: 'button',
							id: gid+'_downloadFileToLocal',
							html: '<span class="fa fa-cloud-download">&nbsp;</span>Download'
						})
							.click({'param1': "my param1", 'param2': "my param2"}, downloadFileToLocal)
							.appendTo("#"+gid+"_status");
					}
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
	
	$()

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
