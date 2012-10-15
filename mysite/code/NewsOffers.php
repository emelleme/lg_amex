<?php
class NewsOffers extends DataObject {

	public static $db = array(
		'Panel' => 'Varchar',
		'Title' => 'Varchar',
		'Month' => 'Varchar'
	);

	public static $has_one = array(
		"PanelImage" => "Image"
	);

	static $summary_fields = array(
		'Panel' => 'Panel',
		'Title' => 'Title',
		'Month' => 'Varchar'
	);


}
