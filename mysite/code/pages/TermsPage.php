<?php
#doc
#	classname:	LgPage
#	scope:		PUBLIC
#
#/doc

class TermsPage extends Page
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

class TermsPage_Controller extends Page_Controller
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
	
	public function index($arguments){
		return $this->renderWith('TermsPage');
	}
	public function samsung($arguments){
		return $this->renderWith('STermsPage');
	}

	public function items($arguments){
		return $this->renderWith('TermsLayoutPage');
	}

	public function layout($arguments){
		return $this->renderWith('TermsLayoutPage');
	}

}
###
###
