function Project(uid,title,description,tasks,statistic,id)
{
	
	this.id=null;
	this.uid=null;
	this.title=null;
	this.description=null;
	this.tasks=null;
	this.statistic=null;
	this.dlg=null;
this.id=id?id:0; this.uid=uid?uid:''; this.title=title?title:''; this.description=description?description:''; this.tasks=tasks?tasks:[]; this.statistic=statistic?statistic:new Statistic();
};



Project.list=null;
Project.activeObject=null;
Project.table='projects';


Project.save=function(o)
{
	var n=new NetData();
	n.url="client/Project/save/";
	n.add('data',JSON.stringify(o));
	n.callback=LU.globalCallback?LU.globalCallback:Project.onSaveCallback;
	LU.globalCallback=null;
	_ajaxQ.add(n); _ajaxQ.run();
};
Project.search=function(uid,param,dl,ul)
{
	var n=new NetData();
	n.url="client/Project/search/";
	n.add("param",param,true);
	n.callback=LU.globalCallback?LU.globalCallback:Project.listItems;
	LU.globalCallback=null;
	_ajaxQ.add(n); _ajaxQ.run();
};
Project.remove=function(id,uid)
{
	var n=new NetData();
	n.url="client/Project/remove/";
	n.add('id',id);
	_ajaxQ.add(n); _ajaxQ.run();
};
Project.config=function()
{
	Jet.App.register('Project',Project);
	Jet.App.form.Project={};
	Jet.App.form.Project[1]="Define a new Project<table><tr><td>Name</td> <td><input type=\"text\" placeholder=\"The Project Name\" id=\"titleTxb\" value=\"%title%\"/></td></tr><tr><td>Description</td> <td><textarea id=\"descriptionTxb\">%description%</textarea></td></tr></table><button id=\"nextBtn\" style=\"position: absolute;bottom: 5vh;right: 5vh\" class=\"blue btn\" onclick=\"Project.onSave(); Libre.work.clear(); Project.buildForm(Project.activeObject,3,'workPan');\">Next</button>";
	Jet.App.form.Project[2]="%title%";
	Jet.App.form.Project[3]="<div onclick=\"Project.onAddTask()\" id=\"createTaskBtn\"><img src=\"res/images/svg/add.svg\"/><span style=\"vertical-align: middle;font-size:0.95em\">Add Task</span></div><p>%title%</p><div id=\"taskArea\"></div><div id=\"taskEdit\"></div>";
	
	Jet.App.form.Project1par="div"; Jet.App.form.Project1cssClass="simpleDialog";
	Jet.App.form.Project2par="div"; Jet.App.form.Project2cssClass="project2";
	
	Jet.App.form.Project3par="div"; Jet.App.form.Project3cssClass="simpleDialog normalDialog";
	Jet.App.form.Project.userOperation="";
	Jet.App.form.Project.ownerOperation=Jet.App.form.Project.userOperation+
	"";
};
Project.buildForm=function(o,view,par)
{
	Project.activeObject=o;
	o.dlg=Jet.App.buildForm(o,view,par,'Project');
	if(view==3)Task.listItems(o.tasks);
	return o.dlg;
};
Project.bind=function(o,ctrl,view)
{
	if(view==2){
		ctrl.setAttribute("onclick","Project.select("+o.id+");");
	}
};
Project.listItems=function(res)
{
	if(typeof(res)=="string"){
		var ls=JSON.parse(res);
		Project.list=ls;
	}else ls=res;
	//show items
	_("#projectArea").source.innerHTML="";
	for(var i=0;i<ls.length;i++){
		ls[i].jetapprow=i;
		Project.buildForm(ls[i],2,"projectArea");
	}
};
Project.onSave=function()
{
	var o=Project.activeObject;
	o.title=_("#titleTxb").value();
	o.description=_("#descriptionTxb").value();
	
	LU.globalCallback=Project.onSaveCallback;
	Project.save(o);
};
Project.onAddTask=function()
{
	var o=new Task('New task');
	o.project=Project.activeObject.id;
	o.jetapprow=Project.activeObject.tasks.length;
	Project.activeObject.tasks.push(o);
	Task.buildForm(o,2,"taskArea");
	
};
Project.onSaveCallback=function(res)
{
	var id=parseInt(res);
	if(id>0){
		Project.activeObject.id=id;
	}
};
Project.select=function(id)
{
	Libre.work.clear();
	LU.globalCallback=Project.onReadCallback;
	Project.read(null,id);
};
Project.onReadCallback=function(res)
{
	Project.buildForm(JSON.parse(res),3,"workPan");
};
Project.read=function(uid,id)
{
	var n=new NetData();
	n.url="client/Project/read/";
	n.add('id',id);
	n.callback=LU.globalCallback?LU.globalCallback:null;
	_ajaxQ.add(n); _ajaxQ.run();
};
function Task(title,status,jobs,description,statistic,project,id)
{
	
	this.id=null;
	this.title=null;
	this.status=null;
	this.jobs=null;
	this.description=null;
	this.statistic=null;
	this.dlg1=null;
	this.dlg2=null;
	this.selected=null;
	this.project=null;
this.id=id?id:0; this.title=title?title:''; this.status=status?status:0; this.jobs=jobs?jobs:[]; this.description=description?description:'';
this.statistic=statistic?statistic:new Statistic(); this.project=project?project:0;
};



Task.list=null;
Task.activeObject=null;
Task.table='tasks';


Task.save=function(o)
{
	var n=new NetData();
	n.url="client/Task/save/";
	n.add('data',JSON.stringify(o));
	n.callback=LU.globalCallback?LU.globalCallback:Task.onSaveCallback;
	LU.globalCallback=null;
	_ajaxQ.add(n); _ajaxQ.run();
};
Task.search=function(project,param,dl,ul)
{
	//
};
Task.remove=function(id,project)
{
	var n=new NetData();
	n.url="client/Task/remove/";
	if(id)n.add('id',id);
	n.add('project',project);
	_ajaxQ.add(n); _ajaxQ.run();
};
Task.config=function()
{
	Jet.App.register('Task',Task);
	Jet.App.form.Task={};
	Jet.App.form.Task[1]="<p>title:<input type=\"text\" id=\"titleTxb\" value=\"%title%\" onchange=\"Task.onSave()\"></p><p>description:<textarea id=\"descriptionTxb\" onchange=\"Task.onSave()\">%description%</textarea></p><p>status:<select id=\"statusCmb\" onchange=\"Task.onSave()\"><option value=\"0\">in progress</option><option value=\"1\">completed</option><option value=\"2\">issued</option><option value=\"3\">depricated</option></select></p><p>Check List:<input type=\"text\" id=\"newJobTxb\" placeholder=\"write your check list and press enter\" onkeypress=\"Task.onAddJob(event)\"/><hr/><div id=\"jobArea\"></div></p><p><button class=\"blue btn\" onclick=\"Project.activeObject.dlg.setAttribute('class','simpleDialog normalDialog');\">close</button></p>";
	Jet.App.form.Task[2]="%title%";
	
	Jet.App.form.Task2par="div";
	Jet.App.form.Task.userOperation="";
	Jet.App.form.Task.ownerOperation=Jet.App.form.Task.userOperation+
	"";
};
Task.buildForm=function(o,view,par)
{
	Task.activeObject=o;
	o["dlg"+view]= Jet.App.buildForm(o,view,par,'Task');
	return o["dlg"+view];
};
Task.bind=function(o,ctrl,view)
{
	if(view==2){
		var statClass="task_stat0";
		switch(o.status){
			case 1:statClass="task_stat1"; break;
			case 2:statClass="task_stat2"; break;
			case 3:statClass="task_stat3"; break;
			case 4:statClass="task_stat4"; break;
		}
		var selectedClass="";
		if(o==Task.selected){
			selectedClass="selected"+o.status;
		}
		ctrl.setAttribute("class","task2 "+statClass+" "+selectedClass);
		ctrl.setAttribute("onclick","Task.select("+o.jetapprow+");");
	}
};
Task.listItems=function(res)
{
	if(typeof(res)=="string"){
		var ls=JSON.parse(res);
		Task.list=ls;
	}else ls=res;
	//show items
	_("#taskArea").source.innerHTML="";
	for(var i=0;i<ls.length;i++){
		ls[i].jetapprow=i;
		Task.buildForm(ls[i],2,"taskArea");
	}
};
Task.select=function(index)
{
	Task.diselect();
	Task.selected=Project.activeObject.tasks[index];
	_("#taskEdit").source.innerHTML="";
	Task.buildForm(Task.selected,1,"taskEdit");
	var cl=Task.selected.dlg2.getAttribute("class");
	cl+=" selected"+Task.selected.status;
	Task.selected.dlg2.setAttribute("class",cl);
	Project.activeObject.dlg.setAttribute("class","simpleDialog detailDialog");
};
Task.diselect=function()
{
	if(Task.selected){
		var cl=Task.selected.dlg2.getAttribute("class");
		cl=cl.replace(/\s*selected\d\s*/ig,"");
		Task.selected.dlg2.setAttribute("class",cl);
		Task.selected=null;
		Project.activeObject.dlg.setAttribute("class","simpleDialog normalDialog");
	}
};
Task.onSave=function()
{
	var o=Task.activeObject;
	o.title=_("#titleTxb").value();
	o.description=_("#descriptionTxb").value();
	o.status=parseInt(_("#statusCmb").value());
	
	//update ui in task area
	o.dlg2.innerHTML="";
	o.dlg2.appendChild(document.createTextNode(o.title));
	
	Task.bind(o,o.dlg2,2);
	
	LU.globalCallback=Task.onSaveCallback;
	Task.save(o);
};
Task.onAddJob=function(event)
{
	if(event.keyCode==13){
		var title=_("#newJobTxb").value();
		if(title){
			var j=new Job(title);
			j.jetapprow=Task.activeObject.jobs.length;
			Task.activeObject.jobs.push(j);
			Job.buildForm(j,2,"jobArea");
		}
	}
};
Task.onSaveCallback=function(res)
{
	var id=parseInt(res);
	if(id>0){
		Task.activeObject.id=id;
	}
};
function Job(title,status,task)
{
	
	this.title=null;
	this.status=null;
	this.task=null;
this.title=title?title:''; this.status=status?status:0; this.task=task?task:0;
};



Job.list=null;
Job.activeObject=null;
Job.table='jobs';


Job.save=function(o)
{
	var n=new NetData();
	n.url="client/Job/save/";
	n.add("data",JSON.stringify(o));
	_ajaxQ.add(n); _ajaxQ.run();
};
Job.search=function(task,param,dl,ul)
{
	var n=new NetData();
	n.url="client/Job/search/";
	n.add('task',task);
	if(param)n.add("param",param,true);
	n.callback=LU.globalCallback?LU.globalCallback:Job.listItems;
	LU.globalCallback=null;
	_ajaxQ.add(n); _ajaxQ.run();
};
Job.remove=function(title,task)
{
	var n=new NetData();
	n.url="client/Job/remove/";
	n.add('title',title,true);
	n.add('task',task);
	_ajaxQ.add(n); _ajaxQ.run();
};
Job.config=function()
{
	Jet.App.register('Job',Job);
	Jet.App.form.Job={};
	Jet.App.form.Job[1]="";
	Jet.App.form.Job[2]="<input type=\"checkbox\" id=\"job\"/> %title%";
	
	Jet.App.form.Job.userOperation="";
	Jet.App.form.Job.ownerOperation=Jet.App.form.Job.userOperation+
	"";
};
Job.buildForm=function(o,view,par)
{
	Job.activeObject=o;
	return Jet.App.buildForm(o,view,par,'Job');
};
Job.bind=function(o,ctrl,view)
{
	//
};
Job.listItems=function(res)
{
	if(typeof(res)=="string"){
		var ls=JSON.parse(res);
		Job.list=ls;
	}else ls=res;
	//show items
};
function Statistic(total,completed,issues,deprecated,start,end,last)
{
	
	this.total=null;
	this.completed=null;
	this.issues=null;
	this.depricated=null;
	this.start=null;
	this.end=null;
	this.last=null;
this.total=total?total:0; this.completed=completed?completed:0; this.issues=issues?issues:0; this.depricated=deprecated?deprecated:0; this.start=start?start:0;
this.end=end?end:0; this.last=last?last:0;
};



Statistic.activeObject=null;


Statistic.config=function()
{
	Jet.App.register('Statistic',Statistic);
	Jet.App.form.Statistic={};
	Jet.App.form.Statistic[1]="";
	Jet.App.form.Statistic[2]="";
	
	Jet.App.form.Statistic.userOperation="";
	Jet.App.form.Statistic.ownerOperation=Jet.App.form.Statistic.userOperation+
	"";
};
Statistic.buildForm=function(o,view,par)
{
	Statistic.activeObject=o;
	return Jet.App.buildForm(o,view,par,'Statistic');
};
Statistic.bind=function(o,ctrl,view)
{
	if(typeof(res)=="string"){
		var ls=JSON.parse(res);
		Task.list=ls;
	}else ls=res;
	//show items
	_("#taskArea").source.innerHTML="";
	for(var i=0;i<ls.length;i++){
		ls[i].jetapprow=i;
		Task.buildForm(ls[i],2,"taskArea");
	}
};
function LU()
{
	
	this.globalCallback=null;
};




LU.config=function()
{
	Project.config();
	Task.config();
	Job.config();
};
