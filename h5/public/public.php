<?
//setCookieWithSession('hid');
//setCookieWithSession('tsid');
if($_GET['getdata']=='public'){
	//print_r($_SESSION['arrLogin']);
	$arrReturn['logo']['data']=listCoreByWhere("t_qdglzx","lanmu=468","","ID,wenjian1");
	$arrReturn['gouwu']['data']=listCoreByWhere("t_qdglzx","lanmu=473","","ID,wblj,biaoti");
	$arrReturn['gouwu']['name']='购物指南';
	$arrReturn['peisong']['data']=listCoreByWhere("t_qdglzx","lanmu=474","","ID,wblj,biaoti");
	$arrReturn['peisong']['name']='配送方式';
	$arrReturn['zhifu']['data']=listCoreByWhere("t_qdglzx","lanmu=475","","ID,wblj,biaoti");
	$arrReturn['zhifu']['name']='支付方式';
	$arrReturn['shouhou']['data']=listCoreByWhere("t_qdglzx","lanmu=476","","ID,wblj,biaoti");
	$arrReturn['shouhou']['name']='售后服务';
	$arrReturn['tese']['data']=listCoreByWhere("t_qdglzx","lanmu=477","","ID,wblj,biaoti");
	$arrReturn['tese']['name']='特色服务';
	$arrReturn['banquan']['data']=listCoreByWhere("t_qdglzx","lanmu=478","","ID,neirong");
	$arrReturn['banquan']['name']='版权所有';
	$arrReturn['chengnuo']['data'] = listCoreByWhere("t_qdglzx","lanmu=507","","ID,biaoti,fubiaoti,wenjian1,wblj");
	$arrReturn['chengnuo']['name'] = '我的承诺';
	$arrReturn['hezuohuoban']['data']=listCoreByWhere("t_qdglzx","lanmu=471","","ID,wblj,wenjian1");
    $arrReturn['hezuohuoban']['name']='合作伙伴';
	$arrReturn['guanyuwomen']['data']=listCoreByWhere("t_qdglzx","lanmu=509","","ID,biaoti,wblj");
    $arrReturn['guanyuwomen']['name']='关于我们';
	
	$arrReturn['arrLogin']['data']=array('ID'=>$_SESSION['arrLogin']['ID'],'shoujihao'=>$_SESSION['arrLogin']['mobile'],'xingming'=>$_SESSION['arrLogin']['xingming']);
    $arrReturn['arrLogin']['name']='会员信息';
	die(json_encode($arrReturn));
}

?>