<?php
	require_once("vendor/autoload.php");
	
	function addDownload($inputUrl) {
		$aria2c = new Aria2('http://localhost:6800/jsonrpc');
		$result = $aria2c->addUri(
			[$inputUrl],
			['dir'=>'/app/downloads']
		);
		return $result["result"];
	}
	
	if(isset($_POST)) {
		$action = $_POST["action"];
		
		switch($action) {
			case "addDownload": //echo "Add download invoked with url, " . $_POST["inputUrl"];
								addDownload($_POST["inputUrl"]);
								break;
			default:	echo "Action not defined";
		}
		
	} else {
		die("Invalid script invocation");
	}
	
?>