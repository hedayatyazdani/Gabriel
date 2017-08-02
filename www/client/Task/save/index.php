<?php
	require "../../../config.php";
	require "../../../core/php/Statistic.php";
	require "../../../core/php/Task.php";
	$o=json_decode($_REQUEST['data']);
	Task::save($o);
	echo $o->id;
?>