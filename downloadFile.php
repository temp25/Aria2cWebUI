<?php
	require_once("vendor/autoload.php");
	
	if(isset($_POST)){
		$fileName = $_POST["fileName"];
		$absoluteFilePath = $_POST["absolutePath"];
		//$absoluteFilePath = getcwd() . DIRECTORY_SEPARATOR . $fileName;
		if(!file_exists($absoluteFilePath)) {
			//die("File $fileName doesn't exists in directory, " . getcwd());
			die("File $absoluteFilePath doesn't exists");
		}
		$fileDownload = Apfelbox\FileDownload\FileDownload::createFromFilePath($absoluteFilePath);
		$fileDownload->sendDownload($fileName);
	} else {
		die("Invalid script invocation");
	}
?>