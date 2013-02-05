<?php
class GalleryItem extends DataObject {

	public static $db = array(
		'ItemNumber' => 'Int',
		'Title' => 'Varchar(100)',
		'SmsKeyword' => 'Varchar',
		'CustomStyles' => 'Text',
		'GalleryPanelContent' => 'HTMLText',
		'FullContent' => 'HTMLText',
		'BroughtToYouBy' => 'Varchar(200)'
	);

	public static $has_one = array(
		"GalleryImage" => "Image",
		'GalleryPanelImage' => 'Image',
		'GalleryContentBackground' => 'Image'
	);

	public static$belongs_many_many = array(
		'GalleryPages' => 'GalleryPage'
	);


	static $summary_fields = array(
		'Title' => 'Title',
	);


}

