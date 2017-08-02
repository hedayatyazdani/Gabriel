<?php
	require "../../../config.php";
	require "../../../core/php/Statistic.php";
	require "../../../core/php/Project.php";
	require "../../../core/php/Task.php";
	$res=Project::read($uc->uid,$_GET['id']);
	echo json_encode($res);
?>