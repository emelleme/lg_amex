<?php
class Visitor extends DataObject {

	public static $db = array(
		'DeviceID' => 'Varchar(50)',
		'DeviceType' => 'Varchar(35)',
		'IPAddress' => 'Varchar(50)',
		'TimeZone' => 'Varchar(50)',
		'ProductCode' => 'Varchar(60)',
		'Name' => 'Varchar(80)',
		'Description' => 'Text',
		'LastVisit' => 'Datetime',
		'SessionID' => 'Int'
	);

	public static $has_many = array(
		'Actions' => 'UserAction'
	);

	static $summary_fields = array(
		'DeviceID',
		'IPAddress'
	);


}