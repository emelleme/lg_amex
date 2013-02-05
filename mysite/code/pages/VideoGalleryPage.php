<?php
#doc
#	classname:	LgPage
#	scope:		PUBLIC
#
#/doc

class VideoGalleryPage extends Page
{
	#	internal variables
	public static $db = array(
			'LiveStream1' => 'Text',
			'LGLiveStream' => 'Text',
			'SamsungLiveStream' => 'Text'
	);

	public static $has_one = array(
	);

	public function getCMSFields() {
		$fields = parent::getCMSFields();
		$fields->removeFieldFromTab('Root.Main', 'Content');
		$fields->addFieldToTab('Root.Main', new TextField('LiveStream1','LiveStream1'));
		$fields->addFieldToTab('Root.Main', new TextField('LGLiveStream','LGLiveStream'));
		$fields->addFieldToTab('Root.Main', new TextField('SamsungLiveStream','SamsungLiveStream'));
		return $fields;
		
	}

}
#doc
#	classname:	LgPage_Controller
#	scope:		PUBLIC
#
#/doc

class VideoGalleryPage_Controller extends Page_Controller
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
		return $this->renderWith('VideoGallery');
	}

	public function samsung(){
		return $this->renderWith(array('VideoGalleryLayout','SVideoGallery'));
	}

	public function items(){
		return $this->renderWith('VideoGalleryLayout');
	}

	public function layout(){
		return $this->renderWith('SVideoGalleryLayout');
	}

}
###
###
