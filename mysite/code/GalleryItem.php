<?php
class GalleryItem extends DataObject {

	public static $db = array(
		'ItemNumber' => 'Int',
		'Title' => 'Varchar(100)',
		'SmsKeyword' => 'Varchar',
		'Content' => 'Text',
		'CustomStyles' => 'Text',
		'FullRecipe' => 'HTMLText',
		'BroughtToYouBy' => 'Varchar(200)'
	);

	public static $has_one = array(
		"GalleryImage" => "Image",
		"Thumbnail" => "Image",
		"ThumbnailActive" => "Image"
	);

	static $summary_fields = array(
		'ItemNumber' => 'ItemNumber',
		'Title' => 'Title',
	);


}

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
	
	public function s($arguments){
		return $this->renderWith('SGallerPage');
	}
}