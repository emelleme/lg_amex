<?php

	class BenefitAdmin extends ModelAdmin {
    
    public static $managed_models = array(
        'Benefit'
    );
 
    static $url_segment = 'benefits';
    static $menu_title = 'Benefits';
}

?>
