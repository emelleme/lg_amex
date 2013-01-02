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

