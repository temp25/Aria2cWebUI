$(document).ready(function() {

	//alert('document ready :-)__');
	var count=0;
	
	$('a').on("click", function (e) {
        e.preventDefault();
    });
	
	function postRequest(url, data) {
		$.post(url, data, function(data, status, xhr){
			console.log(data);
			console.log(status);
			console.log(xhr);
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
		
		postRequest(url, {
			action: "addDownload",
			inputUrl: url,
		});
		
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