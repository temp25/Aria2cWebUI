<?php
	require("vendor/autoload.php");
	$aria2c = new Aria2('http://localhost:6800/jsonrpc');
	echo print_r($aria2c->getGlobalStat(), true);
?>