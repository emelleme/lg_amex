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
	);

	public static $has_one = array(
	);
	
	public function getCMSFields() {
		$fields = parent::getCMSFields();
		$fields->removeFieldFromTab('Root.Main', 'Content');
		$fields->addFieldToTab('Root.Main', new LiteralField('BenefitManager','<h2><a href="/admin/benefits/">Click Here to manage Benefits</a></h2>'));
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
	
	public function index($arguments){
		return $this->renderWith('BenefitsPage');
	}

	public function layout($arguments){
		return $this->renderWith('BenefitsLayoutPage');
	}

	public function samsung($arguments){
		return $this->renderWith('SBenefitsPage');
	}

	public function all($arguments){
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
