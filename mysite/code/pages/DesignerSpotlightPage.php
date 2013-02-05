<?php
#doc
#	classname:	LgPage
#	scope:		PUBLIC
#
#/doc

class DesignerSpotlightPage extends GalleryPage
{
	#	internal variables
	public static $db = array(
	);

	public static $has_one = array(
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

class DesignerSpotlightPage_Controller extends GalleryPage_Controller
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
	
	public function videoPanels(){
		$data = VideoPanel::get();
		return $data;
	}
	
	public function index(){
		return $this->renderWith('DesignerSpotlightPage');
	}

	public function samsung(){
		return $this->renderWith(array('VideoGalleryLayout','SVideoGallery'));
	}

	public function items(){
		return $this->renderWith('DesignerSpotlightLayout');
	}

	public function layout(){
		return $this->renderWith('DesignerSpotlightLayout');
	}

}
###
###
