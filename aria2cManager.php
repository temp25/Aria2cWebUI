<?php
	require("vendor/autoload.php");
	
	function addDownload($aria2c, $inputUrl) {
		
		$result = $aria2c->addUri(
			[$inputUrl],
			['dir'=>'/app/downloads']
		);
		
		return $result["result"];
	}
	
	function tellStatus($aria2c, $gid) {
		
		$result = $aria2c->tellStatus($gid);
		$status = [];
		if(array_key_exists("error", $result)) {
			$status["status"] = "error";
			$status["message"] = $result["error"]["message"];
		} else {
			$status = $result["result"];
		}
		return json_encode($status, true);
	}
	
	if(isset($_POST)) {
		$action = $_POST["action"];
		$aria2c = new Aria2('http://localhost:6800/jsonrpc');
		
		switch($action) {
			case "addDownload": //echo "Add download invoked with url, " . $_POST["inputUrl"];
								echo addDownload($aria2c, $_POST["inputUrl"]);
								break;
			
			case "tellStatus": echo tellStatus($aria2c, $_POST["gid"]);
								break;
								
			default:	echo "Action not defined";
		}
		
	} else {
		die("Invalid script invocation");
	}
?>
