<?php
class Job
{
	
	var $title=null;
	var $status=null;
	var $task=null;
	
	public static $list=null;
	public static $activeObject=null;
	public static $table='jobs';
	
	public function __construct($title='',$status=0,$task=0)
	{
		$this->title=$title; $this->status=$status; $this->task=$task;
	}
	
	public static function install()
	{
		global $defdb;
		$table=Job::$table;
		
		$q="create table if not exists $table(title_fl varchar(255),status_fl int,task_fl int,constraint i$table unique(task_fl,title_fl))";
		$defdb->run($q);
	}
	public static function save( $o)
	{
		global $defdb;
		$table=Job::$table;
		if(!is_array($o))$o=[$o];
		$taks_id=0;
		$q="insert into $table (title_fl ,status_fl ,task_fl )values";
		$vals="";
		foreach($o as $cur){
			if($vals)$vals.=","; $task_id=$cur->taks;
			$vals.="( '$cur->title', $cur->status, $cur->task)";
		}
		$q="delete from $table taks_fl=$task_id";
		$defdb->run($q);
		$q.=$vals;
		$defdb->run($q);
	}
	public static function search( $task,$param='',$dl=0,$ul=20)
	{
		global $defdb;
		$table=Job::$table;
		
		$cond=array();
		array_push($cond,"task_fl=$task");
		if($param)array_push($cond,"title_fl like('%$param%')");
		
		$cond=implode(" and ",$cond);
		if($cond!="")$cond="where $cond";
		
		$lim=($dl>=0)?"limit $dl,$ul":"";
		$q="select * from $table $cond $lim";
		$defdb->run($q);
		$ret=array();
		while($r=$defdb->fetch())
		{
			array_push($ret,
				new Job($r['title_fl'],$r['status_fl'],$r['task_fl'])
			);
		}
		return $ret;
	}
	public static function remove( $title, $task)
	{
		global $defdb;
		$table=Job::$table;
		
		$q="delete from $table where task_fl=$task and title_fl='$title'";
		$defdb->run($q);
	}
}
?>