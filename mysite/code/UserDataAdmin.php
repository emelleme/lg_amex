<?php

	class UserDataAdmin extends ModelAdmin {
    
    public static $managed_models = array(
        'UserData'
    );
 
    static $url_segment = 'users';
    static $menu_title = 'User Data';
}

?>
