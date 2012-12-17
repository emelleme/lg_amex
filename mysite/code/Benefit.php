<?php
class Benefit extends DataObject {

	public static $db = array(
		'Position' => 'Varchar',
		'Title' => 'Varchar',
		'Description' => 'Text',
		'LegalCopy' => 'Text',
		'BoxText' => 'HTMLText',
		'BoxClass' => 'Varchar',
		'BoxColor' => 'Varchar',
		'WingColor' => 'Varchar'

	);

	public static $has_one = array(
	);

	static $summary_fields = array(
		'Position' => 'Position',
		'Title' => 'Title'
	);


}
