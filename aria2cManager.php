<?php
	require_once("vendor/autoload.php");
	$aria2c = new Aria2('http://localhost:6800/jsonrpc');
	
	function addDownload($inputUrl) {
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
								$aria2c_class_methods = get_class_methods($aria2c);
								$aria2c_class_method_str = "";
								foreach ($aria2c_class_methods as $method_name) {
									$aria2c_class_method_str = "$aria2c_class_method_str\n$method_name\n";
								}
								echo "Var export : \n" . var_export($aria2c, true) . "\n\n\naria2c_class_method_str : \n\n$aria2c_class_method_str";//addDownload($_POST["inputUrl"]);
								break;
			default:	echo "Action not defined";
		}
		
	} else {
		die("Invalid script invocation");
	}
	
?>