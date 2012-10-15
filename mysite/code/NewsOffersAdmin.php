<?php

	class NewsOffersAdmin extends ModelAdmin {
    
    public static $managed_models = array(
        'NewsOffers','NewsOffersContent'
    );
 
    static $url_segment = 'news';
    static $menu_title = 'News and Offers';
}

?>
