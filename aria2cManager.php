<?php
	require_once("vendor/autoload.php");
	$aria2c = new Aria2('http://localhost:6800/jsonrpc');
	
	if(isset($_POST)) {
		$action = $_POST["action"];
		
		switch($action) {
			case "addDownload": echo "Add download invoked with url, " . $_POST["inputUrl"];
								break;
			default:	echo "Action not defined";
		}
		
	} else {
		die("Invalid script invocation");
	}
?>