<?php

	class GalleryItemAdmin extends ModelAdmin {
    
    public static $managed_models = array(
        'GalleryItem'
    );
 
    static $url_segment = 'gallery';
    static $menu_title = 'Party Recipes';
}

?>
