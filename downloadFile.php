<?php
	require_once("vendor/autoload.php");
	
	if(isset($_GET)){
		$fileName = $_GET["fileName"];
		//$absoluteFilePath = $_GET["absolutePath"];
		$absoluteFilePath = "/app/downloads/$fileName";
		if(!file_exists($absoluteFilePath)) {
			//die("File $fileName doesn't exists in directory, " . getcwd());
			die("File $absoluteFilePath doesn't exists");
		}
		echo "\nfileName : $fileName\n\nabsoluteFilePath : $absoluteFilePath";
		//$fileDownload = Apfelbox\FileDownload\FileDownload::createFromFilePath($absoluteFilePath);
		//$fileDownload->sendDownload($fileName);
		
		/*header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="'.basename($fileName).'"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($absoluteFilePath));
        flush(); // Flush system output buffer
        readfile($absoluteFilePath);
        exit;
		*/
		
	} else {
		die("Invalid script invocation");
	}
?>