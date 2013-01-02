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
		//header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
		//header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past

		// Note: you should use SS template require tags inside your templates 
		// instead of putting Requirements calls here.  However these are 
		// included so that our older themes still work
		Requirements::set_write_js_to_body(false);
		/* LG Page Deprecated. Create Pages in CMS and uncomment below for fix */
		
		//Director::redirect('/');
		
	}
	
	public function lg(){
		Director::redirect('/');
	}
	
	public function index($arguments){
		Director::redirect('/');
	}
	
	public function benefits($arguments){
		Director::redirect('/benefits');
	}
	
	public function manage($arguments){
		if ($member = Member::currentUser()) {
			Director::redirect('benefits');
		}else{
			Director::redirect('Security/login?BackURL=%2Flg%2Fbenefits');
		}
	}
	
	public function allBenefits(){
		$data = Benefit::get();
		return $data;
	}
	
	public function newsPanels(){
		$data = NewsOffers::get();
		return $data;
	}
	
	public function cards($arguments){
		Director::redirect('/cards');
	}
	
	public function news($arguments){
		Director::redirect('/news');
	}
	
	public function live($arguments){
		Director::redirect('/live');
	
	}
	
	public function terms($arguments){
		Director::redirect('/terms');
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
		$page = $logger['page'];
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
			$m = new ArrayList();
			foreach($data as $b){
				//convert key strokes to html?
				$strokes = new ArrayList();
				$s = explode(',',$b->Keystrokes);
				$count = 0;
				if($b->Keystrokes != ''){
				foreach($s as $t){
				
					$x = explode(":",$t);
					$button = $x[1];
					$button = ($button == 'click') ? 'mouse' : $button;
					$position = $x[0];
					if($position != null){
					if(strstr($position, 'footer')){
						$image = null;
					}else{
					$image = "mosaic-".$position.'.jpg';
					}
					}
					$strokes->add(new ArrayData(array(
					'Button'=>$button,
					"Position"=>$position,
					"Image"=>$image))); 
					$count = $count +1;
				}
				}
				$c = array(
				'Created' => date('m-j-Y h:i:s A',strtotime($b->Created)),
				'Version' => $b->Version,
				'Page' => $b->Page,
				'Keys' => $strokes,
				'Count' => $count);
				$m->add(new ArrayData($c));
				
			}
			//var_dump($m);
			$d = array(
				'Data' => $m);
			$l = $arguments->requestVars();
			$csv = (array_key_exists('csv',$l)) ? true : false;
			if(!$csv){
			return $this->customise($d)->renderWith('UserStats');
			}else{
			header_remove("Content-type");
			header('Content-type: text/csv');
			header('Content-Disposition: attachment; filename="userstats.csv"');
			return $this->customise($d)->renderWith('UserStatsCSV');
			}
		}else{
			Director::redirect('Security/login?BackURL=%2Flg%2FuserStats');
		}
	}

}
