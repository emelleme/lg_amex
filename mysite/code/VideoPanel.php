<?php
class VideoPanel extends DataObject {

	public static $db = array(
		'PanelNumber' => 'Varchar',
		'Title' => 'Varchar',
		'PlainTitle' => 'Varchar',
		'CustomStyles' => 'Text',
		'Filename' => 'Varchar(120)',
		'SamsungFilename' => 'Varchar(120)'
	);

	public static $has_one = array(
		"PanelImage" => "Image",
		"PanelImageBW" => "Image",
		"PanelIcon" => "Image"
	);

	static $summary_fields = array(
		'PanelNumber' => 'Panel',
		'Title' => 'Title',
	);


}
