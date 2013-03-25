<?php

	class UserDataAdmin extends ModelAdmin {
    
    public static $managed_models = array(
        'Visitor'
    );
 
    static $url_segment = 'users';
    static $menu_title = 'Visitor Stats';
}

?>
