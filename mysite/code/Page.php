<?php
class Page extends SiteTree {

	public static $db = array(
	);

	public static $has_one = array(
	);
	public function allPagesToCache() {
    // Get each page type to define its sub-urls
    $urls = array();
 
    /* memory intensive depending on number of pages */
    $pages = SiteTree::get();
 
    foreach($pages as $page) {
      $urls = array_merge($urls, (array)$page->subPagesToCache());
    }
    
     
    /* add any custom URLs which are not SiteTree instances
    $urls[] = "lg";
    $urls[] = "lg/benefits";
    $urls[] = "lg/news";
    $urls[] = "lg/cards";
    $urls[] = "lg/live";
    $urls[] = "lg/terms";
 	*/
    return $urls;
  }
 
 /**
   * Get a list of URLs to cache related to this page
   */
  public function subPagesToCache() {
    $urls = array();
 
    // add current page
    $urls[] = $this->Link();
     
    return $urls;
  }


  public function pagesAffectedByChanges() {
    $urls = $this->subPagesToCache();
    if($p = $this->Parent) $urls = array_merge((array)$urls, (array)$p->subPagesToCache());
    return $urls;
  }


}
class Page_Controller extends ContentController {

	/**
	 * An array of actions that can be accessed via a request. Each array element should be an action name, and the
	 * permissions or conditions required to allow the user to access it.
	 *
	 * <code>
	 * array (
	 *     'action', // anyone can access this action
	 *     'action' => true, // same as above
	 *     'action' => 'ADMIN', // you must have ADMIN permissions to access this action
	 *     'action' => '->checkAction' // you can only access this action if $this->checkAction() returns true
	 * );
	 * </code>
	 *
	 * @var array
	 */
	public static $allowed_actions = array (
	);

  /**
  

  **/

  public static $initialText = 'Initial Load';

  public static $timezones = array(
    "0" => "USA NEWFOUNDLAND",
    "1" => "Atlantic",
    "2" => 'Eastern',
    "3" => 'Central',
    "4" => 'Moutain',
    "5" => 'Pacific',
    '6' => 'Alaska',
    '7' => 'Hawaii',
    '100' => 'Korea',
    '209' => 'Developer'
  );

	public function init() {
		parent::init();

		// Note: you should use SS template require tags inside your templates 
		// instead of putting Requirements calls here.  However these are 
		// included so that our older themes still work
		Requirements::set_write_js_to_body(false);
	}

  public function track($arguments){
    //get Device ID and check if exists
    $action = (!$arguments->requestVar('action')) ? '' : $arguments->requestVar('action') ;
    $id = ($arguments->requestVar('deviceid')) ? $arguments->requestVar('deviceid') : 'anonymous' ;
    $now = date("Y-m-d H:i:s");
    //var_dump($id);
    $v = Visitor::get()->filter(array('DeviceID'=>$id))->first();

    if($v){
      //Update visitor last visit time
      $v->LastVisit = date("Y-m-d H:i:s"); 
      $v->write();
      //Get Last Action
      //$lastaction = ($v->getComponents('Actions','','Created Asc')->Last()) ? $v->getComponents('Actions','','Created Asc')->Last() : 0 ;
      $lastaction = $v->getComponents('Actions','','Created Asc')->Last();
      //var_dump($lastaction->Created);
      
      $a = new UserAction();
      $a->ActionName = $action;
      $a->ButtonPressed = ($arguments->requestVar('button')) ? $arguments->requestVar('button') : null ;
      $a->PageTitle = ($arguments->requestVar('title')) ? trim($arguments->requestVar('title'),'._') : 'Unknown' ;
      //Calculate Duration based on previous page. If current action is Initial Load, duration is 0
      
      if ($a->ActionName == 'Page Load') {
        //Calculate Duration
        $d1 = strtotime($lastaction->Created);
        $d2 = strtotime($now);
        $diff = round(abs($d2-$d1),2 );
        $a->PageDuration = $diff;
        //var_dump($diff);exit;
      }else if($a->ActionName == 'stop'){
        $d1 = strtotime($lastaction->Created);
        $d2 = strtotime($now);
        $diff = round(abs($d2-$d1),2 );
        $a->PageDuration = $diff;
      }else if($a->ActionName == 'Initial Load'){
        $v->SessionID = $v->SessionID+1;
        $v->write();
      }
      $a->SessionID = $v->SessionID;
      $a->VisitorID = $v->ID;
      $a->write();
      
      //Make sure Analytics init is set in _config file
      Analytics::track($id, $a->PageTitle, array(
          "action"  =>  $a->ActionName,
          'buttonPressed' =>  $a->ButtonPressed,
          'pageTitle' =>  $a->PageTitle,
          'duration' =>  $a->PageDuration,
          'productCode' => $v->ProductCode,
          'deviceType' => $v->DeviceType,
          'timeZone' => $v->TimeZone,
          'session' => $v->SessionID
      ));
    }else{
      //New Visitor!
      $a = new UserAction();
      
      $v = new Visitor();
      $v->DeviceID = $id;
      $v->LastVisit = date("Y-m-d H:i:s"); 
      $v->DeviceType = ($arguments->requestVar('devicetype')) ? $arguments->requestVar('devicetype') : null;
      $v->TimeZone = ($arguments->requestVar('timezone')) ? $arguments->requestVar('timezone') : null;
      $v->ProductCode = ($arguments->requestVar('productcode')) ? $arguments->requestVar('productcode') : null;
      $v->SessionID = 1;
      $v->write();

      $a->ActionName = "Initial Load";
      $a->VisitorID = $v->ID;
      $a->PageTitle = ($arguments->requestVar('title')) ? trim($arguments->requestVar('title'),'._') : 'Home Page' ;
      $a->write();
      /* Todo move to cron task */
      Analytics::init("hcnazc14jbrgf3cfgt3m");
      Analytics::track($id, $a->PageTitle, array(
          "action"  =>  $a->ActionName,
          'pageTitle' =>  $a->PageTitle,
          'productCode' => $v->ProductCode,
          'deviceType' => $v->DeviceType,
          'timeZone' => $v->TimeZone,
          'firstVisit' => 1,
          'session' => $v->SessionID
      ));
    }
    echo 'ok';
  }

  public function trackold(){
    Analytics::init("hcnazc14jbrgf3cfgt3m");
    Analytics::track("amex-test", $this->Title, array(
        "hit"         => '1'
    ));
    echo 'Tracking success:'.$this->Title;
  }

	public function analyticstest(){
  	$d = SiteConfig::get()->first();
  	if($d->DevAnalytics){
  		//Development Analytics
  		$p = "<h2>Development Analytics Script Active</h2>";
  		$p .= "<a href='/themes/v1/javascript/dev-analytics.js'>Analytics source file</a>";
  	}else{
  		//Development Analytics
  		$p = "<h2>Production Analytics Script Active</h2>";
  		$p .= "<a href='/themes/v1/javascript/analytics.js'>Analytics source file</a>";
  	}
  	echo $p;
  }
	
}
