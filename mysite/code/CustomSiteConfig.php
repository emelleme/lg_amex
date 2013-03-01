<?php

class CustomSiteConfig extends DataExtension {

	static $db = array(
		'DevAnalytics' => 'Boolean'
	);

	public function updateCMSFields(FieldList $fields){
		$fields->addFieldToTab('Root.Main', new CheckboxField('DevAnalytics', 'Use Dev Analytics?'));
	}
}