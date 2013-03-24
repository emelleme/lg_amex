<?php
class UserAction extends DataObject {

	public static $db = array(
		'ActionName' => 'Varchar',
		'PageTitle' => 'Varchar',
		'PageDuration' => 'Int',
		'ButtonPressed' => 'Varchar',
		'SessionID' => 'Int'
	);

	public static $has_one = array(
		'Visitor' => 'Visitor'
	);

	static $summary_fields = array(
		'Created' => 'Created',
		'ActionName' => 'ActionName',
		'PageTitle' => 'PageTitle',
		'PageDuration' => 'PageDuration',
		'ButtonPressed' => 'ButtonPressed'
	);
}