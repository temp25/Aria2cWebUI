$(document).ready(function() {

	//alert('document ready :-)__');
	var count=0;
	
	$('a').on("click", function (e) {
        e.preventDefault();
    });
	
	function postRequest(url, data) {
		
		return new Promise(function(resolve, reject) {
			$.post(url, data, function(data, status, xhr){
				/* console.log(data);
				console.log(status);
				console.log(xhr); */
				if(xhr.status == 200) {
					resolve(xhr);
				} else {
					reject(new Error(xhr.responseText));
				}
			})
			.done(function(xhr, status, error) {
				console.log("done callback called");
				console.log(xhr);
				console.log(status);
				console.log(error);
			})
			.fail(function(xhr, status, error) {
				// error handling
				console.log("fail callback called");
				console.log(xhr);
				console.log(status);
				console.log(error);
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
		rowElement += "<td>";
		rowElement += percent;
		rowElement += "</td>";
		rowElement += "<td>";
		rowElement += completed;
		rowElement += "</td>";
		rowElement += "<td>";
		rowElement += size;
		rowElement += "</td>";
		rowElement += "<td>";
		rowElement += download_speed;
		rowElement += "</td>";
		rowElement += "<td>";
		rowElement += status;
		rowElement += "</td>";
		rowElement += "</tr>"
		$('tbody').append(rowElement);
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
		.then( function (xhr) {
			console.log('xhr Contents: \n' );
			console.log(xhr);
		},
		function (error) {
			console.error('Something went wrong', error);
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