<?php
#doc
#	classname:	LgPage
#	scope:		PUBLIC
#
#/doc

class ShopSmallPage extends Page
{
	#	internal variables
	public static $db = array(
	);

	public static $has_one = array(
	);

}
#doc
#	classname:	LgPage_Controller
#	scope:		PUBLIC
#
#/doc

class ShopSmallPage_Controller extends Page_Controller
{
	#	internal variables
	
	#	Constructor
	public function init() {
		parent::init();
		//header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
		//header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past

		// Note: you should use SS template require tags inside your templates 
		// instead of putting Requirements calls here.  However these are 
		// included so that our older themes still work
		Requirements::set_write_js_to_body(false);
	}
	
	public function index(){
		return $this->renderWith('ShopSmallPage');
	}

	function test(){
		$r = new RestfulService('http://api.ipinfodb.com/v3/ip-city/?key=b523a1c1dad4ce9197dd215aab56aafb58460e236e6625808235ba771aefaebd&ip=' . $_SERVER['REMOTE_ADDR']);
		$d = $r->request()->getBody();
		$data = explode(';',$d);
		$state = $data[5];
var_dump($state);
	}
	function layout(){
		$r = new RestfulService('http://api.ipinfodb.com/v3/ip-city/?key=b523a1c1dad4ce9197dd215aab56aafb58460e236e6625808235ba771aefaebd&ip=' . $_SERVER['REMOTE_ADDR']);
		$d = $r->request()->getBody();
		$data = explode(';',$d);
		$state = $data[5];
		$state = strtolower($state);
		switch ($state) {
			case 'pennsylvania':
				$l = 'PAShopSmall';
				break;
			case 'connecticut':
				$l = 'CTShopSmall';
				break;
			case 'new york':
				$l = 'NYShopSmall';
				break;
			case 'new jersey':
				$l = 'NJShopSmall';
				break;
			default:
				$l = 'ShopSmallLayout';
				break;
		}
		return $this->renderWith($l);
	}

	public function pa(){
		return $this->renderWith('PAShopSmall');
	}
	public function ny(){
		return $this->renderWith('NYShopSmall');
	}
	public function ct(){
		return $this->renderWith('CTShopSmall');
	}
	public function nj(){
		return $this->renderWith('NJShopSmall');
	}

}
###
###
