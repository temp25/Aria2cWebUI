<?php
	require("vendor/autoload.php");
	
	function addDownload($aria2c, $inputUrl) {
		
		/* $result = $aria2c->addUri(
			[$inputUrl],
			['dir'=>'/app/downloads']
		); */
		
		return var_export($aria2c->getGlobalStat(), true);//$result["result"];
	}
	
	if(isset($_POST)) {
		$action = $_POST["action"];
		$aria2c = new Aria2('http://localhost:6800/jsonrpc');
		
		switch($action) {
			case "addDownload": //echo "Add download invoked with url, " . $_POST["inputUrl"];
								addDownload($aria2c, $_POST["inputUrl"]);
								break;
			default:	echo "Action not defined";
		}
		
	} else {
		die("Invalid script invocation");
	}
	
?>