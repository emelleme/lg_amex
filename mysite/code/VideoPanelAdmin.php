<?php

	class VideoPanelAdmin extends ModelAdmin {
    
    public static $managed_models = array(
        'VideoPanel'
    );
 
    static $url_segment = 'videos';
    static $menu_title = 'Video Gallery';
}

?>
