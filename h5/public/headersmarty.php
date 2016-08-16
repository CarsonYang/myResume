<?
//die(var_dump($_SERVER));
DEFINE('FILEROOTPATH', trim($_SERVER["DOCUMENT_ROOT"],"/"));
$intWWWPos=strpos(FILEROOTPATH,'/www');
if($intWWWPos==false){
	die("please confirm the project in www folder!");
}else{
	DEFINE('WWWROOTPATH', substr(FILEROOTPATH,0,$intWWWPos+4));
}
if(is_dir(WWWROOTPATH.'/gdweb')){
	DEFINE('COREROOTPATH', "D:/wamp/www/gdweb");
}else{
	DEFINE('COREROOTPATH', FILEROOTPATH);
}
require(COREROOTPATH."/core/headersmarty.php");
if($_GET['debugtime']!='')	showDebugTime("require headersmarty.php");
require("public.php");
if($_GET['debugtime']!='')	showDebugTime("require public.php");
?>