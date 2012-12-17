<?php
class NewsOffersContent extends DataObject {

	public static $db = array(
		'LeftContent' => 'HTMLText',
		'RightContent' => 'HTMLText'
	);

	public static $has_one = array(
	);

	static $summary_fields = array(
	);


}
