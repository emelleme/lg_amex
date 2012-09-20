<?php
class UserData extends DataObject {

	public static $db = array(
		'Version' => 'Varchar',
		'Page' => 'Varchar',
		'Keystrokes' => 'Text'

	);

	public static $has_one = array(
	);

	static $summary_fields = array(
		'Version' => 'Version',
		'Page' => 'Page',
		'Keystrokes' => 'Keystrokes'
	);


}