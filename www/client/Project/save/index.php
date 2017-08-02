<?php
	require "../../../config.php";
	require "../../../core/php/Statistic.php";
	require "../../../core/php/Project.php";
	$o=json_decode($_REQUEST['data']);
	$o->uid=$uc->uid;print_r($o);
	Project::save($o);
	echo $o->id;
?>