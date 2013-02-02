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
		'MosaicTileOn' => 'Image',
		'MosaicTileOff' => 'Image'
	);

	public static$belongs_many_many = array(
		'VotingMosaics' => 'BenefitsPage',
		'PreStreamMosaics' => 'BenefitsPage',
	);

	static $summary_fields = array(
		'Position' => 'Position',
		'Title' => 'Title'
	);


}
