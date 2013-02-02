<?php
#doc
#	classname:	LgPage
#	scope:		PUBLIC
#
#/doc

class BenefitsPage extends Page
{
	#	internal variables
	public static $db = array(
		'CurrentPhase' => "Enum('voting, pre, live, post')"
	);

	public static $many_many = array(
		'VotingMosaic' => 'Benefit',
		 'PreStreamMosaic' => 'Benefit',
		 'LiveStreamMosaic' => 'Benefit',
		 'PostStreamMosaic' => 'Benefit'
	);

	public static $defaults = array(
		'CurrentPhase' => 'voting'
	);
	
	public function getCMSFields() {
		$fields = parent::getCMSFields();
		$fields->removeFieldFromTab('Root.Main', 'Content');
		$fields->addFieldToTab("Root.Main", new DropdownField('CurrentPhase', 'CurrentPhase',$this->dbObject('CurrentPhase')->enumValues('BenefitsPage')),'MenuTitle');
		//$fields->addFieldToTab('Root.Main', new LiteralField('BenefitManager','<h2><a href="/admin/benefits/">Click Here to manage Benefits</a></h2>'));

		$voting = new GridField(
			'VotingMosaic',
			'Voting Mosiac Items',
			$this->VotingMosaic(),
			GridFieldConfig_RelationEditor::create());
		$fields->addFieldToTab('Root.VotingPhase',$voting);

		$pre = new GridField(
			'PreStreamMosaic',
			'Pre-Stream Mosiac Items',
			$this->PreStreamMosaic(),
			GridFieldConfig_RelationEditor::create());
		$fields->addFieldToTab('Root.PreStreamPhase',$pre);

		$live = new GridField(
			'LiveStreamMosaic',
			'Live Stream Mosiac Items',
			$this->PreStreamMosaic(),
			GridFieldConfig_RelationEditor::create());
		$fields->addFieldToTab('Root.LiveStreamPhase',$live);

		$post = new GridField(
			'PostStreamPhase',
			'Post-Stream Mosiac Items',
			$this->PostStreamMosaic(),
			GridFieldConfig_RelationEditor::create());
		$fields->addFieldToTab('Root.PostStreamPhase',$post);
		return $fields;
		
	}

}
#doc
#	classname:	LgPage_Controller
#	scope:		PUBLIC
#
#/doc

class BenefitsPage_Controller extends Page_Controller
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
	
	public function allBenefits(){
		$data = Benefit::get();
		return $data;
	}

	function test(){
		$d = $this->getUrlParams();
		$benefits = BenefitsPage::get()->filter(array('URLSegment' =>$d['URLSegment']))->first()->getManyManyComponents('VotingMosaic');
		var_dump($benefits->first());
	}
	
	public function index(){
		return $this->renderWith('BenefitsPage');
	}

	public function layout(){
		return $this->renderWith('BenefitsLayoutPage');
	}

	public function samsung(){
		return $this->renderWith('SBenefitsPage');
	}

	public function displayItems($phase = 'voting'){
		$d = $this->getUrlParams();
		$benefits = BenefitsPage::get()->filter(array('URLSegment' =>$d['URLSegment']));
		switch ($phase) {
			case 'voting':
				# code...
				$benefits = BenefitsPage::get()->filter(array('URLSegment' =>$d['URLSegment']))->first()->getManyManyComponents('VotingMosaic');
				break;
			case 'pre':
				# code...
				$benefits = BenefitsPage::get()->filter(array('URLSegment' =>$d['URLSegment']))->first()->getManyManyComponents('PreStreamMosaic');
				break;
			case 'live':
				# code...
				$benefits = BenefitsPage::get()->filter(array('URLSegment' =>$d['URLSegment']))->first()->getManyManyComponents('LiveStreamMosaic');
				break;
			case 'post':
				# code...
				$benefits = BenefitsPage::get()->filter(array('URLSegment' =>$d['URLSegment']))->first()->getManyManyComponents('PostStreamMosaic');
				break;
			default:
				# code...
				break;
		}
		return $benefits;
	}

	public function all(){
		/* return all benefit data in json format for angular */
		$id = Director::URLParam('ID');
		$benefits = Benefit::get();
		$a = array();
		$count = 0;
		foreach ($benefits as $b) {
			$c = array(
			"Title" => $b->Title,
			"WingColor" => $b->WingColor,
			"Position" => $b->Position,
			"BoxColor" => $b->BoxColor,
			"BoxClass" => $b->BoxClass,
			"MainClass" =>  ($b->Position =="2-1") ? "mainImage activeImage" : "mainImage",
			"Description" => str_replace(array("\r\n","<br>"), array(""," "), $b->Description)
			);
			array_push($a, $c);
			$count++;
		}
		
		$j = json_encode($a);
		return $j;
	}

}
###
###
