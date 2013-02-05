<?php
class GalleryOldItem extends DataObject {

	public static $db = array(
		'ItemNumber' => 'Int',
		'Title' => 'Varchar(100)',
		'SmsKeyword' => 'Varchar',
		'Content' => 'Text',
		'CustomStyles' => 'Text',
		'FullContent' => 'HTMLText',
		'BroughtToYouBy' => 'Varchar(200)',
		'FieldDd' => 'Text'
	);

	public static $has_one = array(
		"GalleryImage" => "Image",
		"Thumbnail" => "Image",
		"ThumbnailActive" => "Image"
	);

	public static$belongs_many_many = array(
		'GalleryPages' => 'GalleryPage'
	);


	static $summary_fields = array(
		'ItemNumber' => 'ItemNumber',
		'Title' => 'Title',
	);


}

