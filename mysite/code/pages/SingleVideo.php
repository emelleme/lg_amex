<?php
#doc
#	classname:	LgPage
#	scope:		PUBLIC
#
#/doc

class SingleVideo extends LivePage
{
	#	internal variables
	public static $db = array(
		"CDN" => "Varchar(150)",
		"Filename" => "Varchar(150)"
	);

	public static $defaults = array(
		"CDN" => "http://3b8ffb0b6ca1c4312d7a-f6478897881b831aa0d618e78a4be408.r12.cf1.rackcdn.com/"
	);

	public static $has_one = array(
		"StaticImage" => "Image"
	);

	public function getCMSFields() {
		$fields = parent::getCMSFields();
		
		return $fields;
	}

}
#doc
#	classname:	LgPage_Controller
#	scope:		PUBLIC
#
#/doc

class SingleVideo_Controller extends LivePage_Controller
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
		return $this->renderWith('SingleVideoPage');
	}

}
###
###
