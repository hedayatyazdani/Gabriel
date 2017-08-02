<?php
class Task
{
	
	var $id=null;
	var $title=null;
	var $status=null;
	var $jobs=null;
	var $description=null;
	var $statistic=null;
	var $dlg1=null;
	var $dlg2=null;
	var $selected=null;
	var $project=null;
	
	public static $list=null;
	public static $activeObject=null;
	public static $table='tasks';
	
	public function __construct($title='',$status=0, $jobs=null,$description='', $statistic=null,$project=0,$id=0)
	{
		$this->id=$id; $this->title=$title; $this->status=intval($status); $this->jobs=$jobs; $this->description=$description; $this->statistic=$statistic; $this->project=$project;
	}
	
	public static function install()
	{
		global $defdb;
		$table=Task::$table;
		
		$q="create table if not exists $table(id_fl int primary key auto_increment,title_fl varchar(255),status_fl int,desc_fl text,proj_fl int,t_fl int,c_fl int,i_fl int,d_fl int,s_fl int,e_fl int,l_fl int)";
		$defdb->run($q);
	}
	public static function save( $o)
	{
		global $defdb;
		$table=Task::$table;
		
		if($o->id!=0)
		{
			$q="update $table set title_fl ='$o->title',status_fl =$o->status,desc_fl ='$o->description',t_fl ={$o->statistic->total},c_fl ={$o->statistic->completed},i_fl ={$o->statistic->issues},d_fl ={$o->statistic->depricated},s_fl ={$o->statistic->start},e_fl ={$o->statistic->end},l_fl ={$o->statistic->last} where id_fl=$o->id";
			$defdb->run($q);
		}
		else
		{
		$q="insert into $table (title_fl ,status_fl ,desc_fl ,proj_fl ,t_fl ,c_fl ,i_fl ,d_fl ,s_fl ,e_fl ,l_fl )values('$o->title', $o->status, '$o->description', $o->project, {$o->statistic->total}, {$o->statistic->completed}, {$o->statistic->issues}, {$o->statistic->depricated}, {$o->statistic->start}, {$o->statistic->end}, {$o->statistic->last})";
			$defdb->run($q);
			$o->id=$defdb->auto_increment;
		}
		
	}
	public static function search( $project,$param='',$dl=0,$ul=20)
	{
		global $defdb;
		$table=Task::$table;
		
		$cond=array();
		array_push($cond,"proj_fl=$project");
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
				new Task($r['title_fl'],$r['status_fl'],[],$r['desc_fl'],
					new Statistic($r['t_fl'],$r['c_fl'],$r['i_fl'],$r['d_fl'],$r['s_fl'],$r['e_fl'],$r['l_fl'])
				,$r['proj_fl'],$r['id_fl'])
			);
		}
		return $ret;
	}
	public static function remove( $id, $project)
	{
		global $defdb;
		$table=Task::$table;
		if($id)
			$q="delete from $table where id_fl=$id and proj_fl=$project";
		else
			$q="delete from $table where proj_fl=$project";
		$defdb->run($q);
	}
}
?>