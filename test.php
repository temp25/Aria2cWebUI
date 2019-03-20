<?php
	require_once("vendor/autoload.php");
	shell_exec("zip -r vendor.zip vendor");
	$fileDownload = Apfelbox\FileDownload\FileDownload::createFromFilePath("/app/vendor.zip");
	$fileDownload->sendDownload("vendor.zip");
?>