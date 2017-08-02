<?php
	require "../../../config.php";
	require "../../../core/php/Statistic.php";
	require "../../../core/php/Project.php";
	$res=Project::search($uc->uid);
	echo json_encode($res);
?>