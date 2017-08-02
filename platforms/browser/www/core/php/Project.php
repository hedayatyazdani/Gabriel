<?php
class Project
{
	
	var $id=null;
	var $uid=null;
	var $title=null;
	var $description=null;
	var $tasks=null;
	var $statistic=null;
	var $dlg=null;
	
	public static $list=null;
	public static $activeObject=null;
	public static $table='projects';
	
	public function __construct( $uid,$title='',$description='', $tasks=null, $statistic=null,$id=0)
	{
		$this->id=$id; $this->uid=$uid; $this->title=$title; $this->description=$description; $this->tasks=$tasks; $this->statistic=$statistic;
	}
	
	public static function install()
	{
		global $defdb;
		$table=Project::$table;
		
		$q="create table if not exists $table(id_fl int primary key auto_increment,uid_fl varchar(20),title_fl varchar(255),desc_fl text,t_fl int,c_fl int,i_fl int,d_fl int,s_fl int,e_fl int,l_fl int)";
		$defdb->run($q);
	}
	public static function save( &$o)
	{
		global $defdb;
		$table=Project::$table;
		
		if($o->id!=0)
		{
			$q="update $table set title_fl ='$o->title',desc_fl ='$o->description',t_fl ={$o->statistic->total},c_fl ={$o->statistic->completed},i_fl ={$o->statistic->issues},d_fl ={$o->statistic->depricated},s_fl ={$o->statistic->start},e_fl ={$o->statistic->end},l_fl ={$o->statistic->last} where id_fl=$o->id and uid_fl='$o->uid'";
			$defdb->run($q);
		}
		else
		{
			$q="insert into $table (uid_fl ,title_fl ,desc_fl ,t_fl ,c_fl ,i_fl ,d_fl ,s_fl ,e_fl ,l_fl )values('$o->uid', '$o->title', '$o->description', {$o->statistic->total}, {$o->statistic->completed}, {$o->statistic->issues}, {$o->statistic->depricated}, {$o->statistic->start}, {$o->statistic->end}, {$o->statistic->last})";
			$defdb->run($q);
			$o->id=$defdb->auto_increment;
		}
		
		/*foreach($o->tasks as &$task)$taks->project=$o->id;
		Task::save($o->tasks);
		*/
	}
	public static function search( $uid,$param='',$dl=0,$ul=20)
	{
		global $defdb;
		$table=Project::$table;
		
		$cond=array();
		array_push($cond,"uid_fl='$uid'");
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
				new Project($r['uid_fl'],$r['title_fl'],$r['desc_fl'],null,
					new Statistic($r['t_fl'],$r['c_fl'],$r['i_fl'],$r['d_fl'],$r['s_fl'],$r['e_fl'],$r['l_fl'])
				,$r['id_fl'])
			);
		}
		return $ret;
	}
	public static function remove( $id, $uid)
	{
		global $defdb;
		$table=Project::$table;
		
		$q="delete from $table where id_fl=$o->id and uid_fl='$uid'";
		$defdb->run($q);
	}
	public static function read( $uid, $id)
	{
		global $defdb;
		$table=Project::$table;
		
		$cond=array();
		array_push($cond,"uid_fl='$uid'");
		array_push($cond,"id_fl=$id");
		
		$cond=implode(" and ",$cond);
		if($cond!="")$cond="where $cond";
		
		$q="select * from $table $cond limit 1";
		$defdb->run($q);
		$ret=null;
		if($r=$defdb->fetch())
		{
			$ret=new Project($r['uid_fl'],$r['title_fl'],$r['desc_fl'],null,null,$r['id_fl']);
			$ret->tasks=Task::search($ret->id);
		}
		return $ret;
	}
}
?>