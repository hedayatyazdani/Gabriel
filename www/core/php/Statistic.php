<?php
class Statistic
{
	
	var $total=null;
	var $completed=null;
	var $issues=null;
	var $depricated=null;
	var $start=null;
	var $end=null;
	var $last=null;
	
	public static $activeObject=null;
	
	public function __construct($total=0,$completed=0,$issues=0,$deprecated=0,$start=0,$end=0,$last=0)
	{
		$this->total=$total; $this->completed=$completed; $this->issues=$issues; $this->depricated=$deprecated; $this->start=$start; $this->end=$end; $this->last=$last;
	}
}
?>