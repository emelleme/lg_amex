<?php
#doc
#	classname:	LgPage
#	scope:		PUBLIC
#
#/doc

class LgPage extends Page
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

class LgPage_Controller extends Page_Controller
{
	#	internal variables
	
	#	Constructor
	public function init() {
		parent::init();
		header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
		header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past

		// Note: you should use SS template require tags inside your templates 
		// instead of putting Requirements calls here.  However these are 
		// included so that our older themes still work
		Requirements::set_write_js_to_body(false);
	}
	
	public function index($arguments){
		return $this->renderWith('IntroPage');
	}
	
	public function benefits($arguments){
		return $this->renderWith('BenefitsPage');
	
	}
	
	public function cards($arguments){
		return $this->renderWith('CardsPage');
	}
	
	public function news($arguments){
		return $this->renderWith('NewsPage');
	}
	
	public function live($arguments){
		return $this->renderWith('LiveVideoPage');
	
	}
	
	public function terms($arguments){
		return $this->renderWith('TermsPage');
	}

	public function concert($arguments){
		return $this->renderWith(array('ConcertPage','BenefitsPage'));
	}
	###	

	public function userData($arguments){
		/* Retrieve User Data and save */
		$logger = $arguments->requestVars();
		$keys = $logger['keys'];
		$version = ($logger['version'] != Null) ? $logger['version'] : '' ;
		$page = $version = $logger['page'];
		$user = new UserData();
		$user->Keystrokes = implode(',',$keys); // sets property on object
		$user->Version = $version;
		$user->Page = $page;
		$user->write();
		var_dump($version);
	}

	public function userStats($arguments){
		if ($member = Member::currentUser()) {
			$data = UserData::get();
			$d = array(
				'Data' => $data);
			return $this->customise($d)->renderWith('UserStats');
		}else{
			Director::redirect('Security/login?BackURL=%2Flg%2FuserStats');
		}
	}

}
###
###
