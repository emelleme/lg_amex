<?php
#doc
#	classname:	LgPage
#	scope:		PUBLIC
#
#/doc

class GalleryPage extends NewsOffersPage
{
	#	internal variables
	public static $db = array(
	);

	public static $many_many = array(
		'GalleryItems' => 'GalleryItem'
	);

	public function getCMSFields() {
		$fields = parent::getCMSFields();
		$fields->removeFieldFromTab('Root.Main', 'Content');
		//$fields->addFieldToTab('Root.Main', new LiteralField('BenefitManager','<h2><a href="/admin/benefits/">Click Here to manage Benefits</a></h2>'));

		$voting = new GridField(
			'GalleryItems',
			'Gallery Items',
			$this->GalleryItems(),
			GridFieldConfig_RelationEditor::create());
		$fields->addFieldToTab('Root.GalleryItems',$voting);
		return $fields;
		
	}

}
#doc
#	classname:	LgPage_Controller
#	scope:		PUBLIC
#
#/doc

class GalleryPage_Controller extends NewsOffersPage_Controller
{
	#	internal variables
	
	#	Constructor
	public function init() {
		parent::init();
		$d = $this->getUrlParams();
		$data = GalleryPage::get()->filter(array('URLSegment' =>$d['URLSegment']))->first()->getManyManyComponents('GalleryItems');
		//header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
		//header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past

		// Note: you should use SS template require tags inside your templates 
		// instead of putting Requirements calls here.  However these are 
		// included so that our older themes still work
		Requirements::set_write_js_to_body(false);
		Requirements::customCSS(<<<CSS
			  .galleryContent {
			    width: 942px;
				height: 400px;
				margin: 27px 0 0 45px;
				overflow: hidden;
			  }
			  a.backbtn{
			  	position: absolute;
				top: 380px;
				left: 60px;
			  }
CSS
			);
		foreach ($data as $v) {
			$id=$v->ItemNumber;
			$img =$v->getComponent('GalleryContentBackground')->Filename;
			$panelimg = $v->getComponent('GalleryImage')->Filename;
			if($v->getComponent('GalleryContentBackground')->Name){
			Requirements::customCSS(<<<CSS
			  #gallery-item-$id {
			    background-image: url($img);
			    width:942px;
			    height:400px;
			  }
CSS
			);
			}
			Requirements::customCSS(<<<CSS
			  #panel$id-content{
			  	 background-image: url($panelimg);
			  	 width:642px;
			     height:400px;
			}
CSS
			);	
		}
		
	}
	public function galleryPanels(){
		$d = $this->getUrlParams();
		$data = GalleryPage::get()->filter(array('URLSegment' =>$d['URLSegment']))->first()->getManyManyComponents('GalleryItems');

		return $data;
	}

	function test(){
		$d = $this->getUrlParams();
		$data = GalleryPage::get()->filter(array('URLSegment' =>$d['URLSegment']))->first()->getManyManyComponents('GalleryItems');
		foreach ($data as $v) {
			$id='gallery-item-'.$v->ID;
			$img =$v->GalleryContentBackground;
			var_dump($v->getComponent('GalleryContentBackground')->Name);
		}
	}
	public function index(){
		return $this->renderWith('GalleryPage');
	}
	
	public function item(){
		return $this->renderWith(array('GalleryLayoutPage','GalleryPage'));
	}

	public function samsung(){
		return $this->renderWith('SGalleryPage');
	}

	public function items(){
		return $this->renderWith('GalleryLayoutPage');
	}

	public function layout(){
		return $this->renderWith('GalleryLayoutPage');
	}


}
###
###
