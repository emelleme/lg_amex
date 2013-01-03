var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var pluginObj = new Common.API.Plugin();
var leftCount = 0;
var rightCount = 0;
var upCount = 0;
curIndex = 0;
var Main =
{
	level:{
		MOSAIC: 1,
		NEWS: 2,
		GALLERY: 3,
		VIDEO: 4,
		CARDS: 5,
		TERMS: 6,
		TERMSPAGE:7,
		MENU: 8,
		NOSTATE: 9
	},
	MENU_POS: 0,
	MAX_ITEMS:5,
	CUR_POS: 1,
	CUR_ROW: 4,
	CUR_COL: 1,
	PREV_ROW:4,
	PREV_COL:1,
	NEWS_POS: 1,
	curLevel: 1,
	prevLevel: 1,
	prevPage: 'travel',
	selectedVideo : 0,
    mode : 0,
    mute : 0,
    
    UP : 0,
    DOWN : 1,

    WINDOW : 0,
    FULLSCREEN : 1,
    
    NMUTE : 0,
    YMUTE : 1,
	clearActive: function(){
		$('.activeImage').removeClass('activeImage');
		$('.arrows').hide();
		$('.hover, .backbtn').removeClass('hover');
		$('#termsconditions a').removeClass('hover');
		$('#icon-'+Main.NEWS_POS).css('background-image',"url("+$('#icon-'+Main.NEWS_POS).attr('data-thumbnailinactive')+")");
		$('.navbar .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
	},
	IMAGE_MATRIX: {
	1: {
		1: "2-1",
		2: "1-2",
		3: "3-4",
		4: null
	},
	2: {
		1: "2-1",
		2: "1-2",
		3: "1-2",
		4: "1-2"
	},
	3: {
		1: "2-1",
		2: "3-2",
		3: "3-4",
		4: "3-4"
	},
	4: {
		1: "4-1",
		2: "4-1",
		3: "4-3",
		4: "4-4"
	},
	5: {
		1: "4-1",
		2: "4-1",
		3: "4-3",
		4: "4-4"
	},
	6: {
		1:"6-2",
		2: "6-2",
		3:"6-3",
		4:"6-3"
	}
}
};


var hideDiv = function(){
	this.hide();
}
Main.showHandler = function()
{
	var NNaviPlugin = document.getElementById("pluginObjectNNavi");
	alert("[APPS] : setBannerstate : 2")
	NNaviPlugin.SetBannerState(2);
	pluginObj.unregistKey(tvKey.KEY_VOL_UP);
	pluginObj.unregistKey(tvKey.KEY_VOL_DOWN);
	pluginObj.unregistKey(tvKey.KEY_MUTE);
}

Main.onLoad = function()
{
	window.onShow = Main.showHandler;
	if ( Player.init() && Audio.init() && Server.init() )
    {

        
        Player.stopCallback = function()
        {
            /* Return to windowed mode when video is stopped
                (by choice or when it reaches the end) */
            Main.setWindowMode();
        }

        // Start retrieving data from server
        Server.dataReceivedCallback = function()
            {
                /* Use video information when it has arrived */
                Main.updateCurrentVideo();
            }
        Server.fetchVideoList(); /* Request video information from server */

        // Enable key event processing
        this.enableKeys();

        widgetAPI.sendReadyEvent();    
    }
    else
    {
        alert("Failed to initialise");
    }
    var WIDGET_ID = curWidget.id;
    alert("#################################################################################");
    alert("############################################################################WIDGET_ID =" + WIDGET_ID);
    alert("#################################################################################");
    alert("#################################################################################");
	$('#inactive').hide();

	// Enable key event processing
	widgetAPI.sendReadyEvent();


};

Main.firstLoad = function(){
	$('#main-copy').hide().html($('#benefit_'+Main.CUR_ROW+'-'+Main.CUR_COL).html()).show();//Wing Color
	$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
	$('.uguu').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
	$('.ugum').css('border-top','76px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
	$('.ugum').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
	$('.uguv').css('border-top','130px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
	alert(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]);
/* Set initial keydown function */
	document.getElementById('anchor').onkeydown = Main.travelKeys;
}

Main.onUnload = function()
{
	Player.deinit();
};

Main.enableKeys = function()
{
	
};

var app = angular.module('amex', [])
.service( 'MainService', [ '$rootScope', function( $rootScope ) {
//   var widgetAPI = new Common.API.Widget();
//  var tvKey = new Common.API.TVKeyValue();
	$rootScope.$watch('title',function(value){
		alert('rootvalue updated');
	});
  	return {
  		title: 'AMEX Experience',
  		setTitle: function( newTitle ){
  			this.title = newTitle;
  		},
  		loadApp: function() { 
  			document.getElementById("anchor").focus();
  			widgetAPI.sendReadyEvent(); 
  		},
  		travelUrl: "http://s.amxp.cc/travel/layout.html",
  		recipesUrl: "http://s.amxp.cc/recipes/layout.html",
  		videosUrl:"http://s.amxp.cc/videos/layout.html",
  		cardsUrl:"http://s.amxp.cc/cards/layout.html",
  		termsUrl:"http://s.amxp.cc/terms/layout.html",
  		viewCount: 0,
  		views:[{
  			id: 'travelView',
  			hideDiv: 'false',
  			layout:'http://s.amxp.cc/travel/layout.html',
  			keyFunction: 'travelKeys'},
  			{
  				id: 'videosView',
  				hideDiv: 'true',
  				layout:'http://s.amxp.cc/videos/layout.html',
  			keyFunction: 'videosKeys'},
  			{
  				id: 'recipesView',
  				hideDiv: 'true',
  				layout: 'http://s.amxp.cc/recipes/layout.html',
  			keyFunction: 'recipesKeys'},{
  				id: 'cardsView',
  				hideDiv: 'true',
  				layout:'http://s.amxp.cc/cards/layout.html', 
  				keyFunction:'cardsKeys'}]
  
  
  	};
 }])
 .controller( 'MainController', [ 'MainService', '$scope', function( MainService, $scope ) {

   $scope.countUp = function(){
   	$scope.viewCount=1;
   }
   $scope.title = Main.title;
   $scope.viewCount = MainService.viewCount;
   $scope.setTitle = function( newTitle ){
		$scope.title = newTitle;
	}
	$scope.views = MainService.views;
	$scope.firstLoad = function(){
		$('#main-copy').hide().html($('#benefit_'+Main.CUR_ROW+'-'+Main.CUR_COL).html()).show();//Wing Color
		$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
		$('.uguu').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
		$('.ugum').css('border-top','76px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
		$('.ugum').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
		$('.uguv').css('border-top','130px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
		alert(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL])
		document.getElementById('anchor').onkeydown = Main.travelKeys;
	}
   
	

	$scope.travelUrl = MainService.travelUrl;
	$scope.videosUrl = MainService.videosUrl;
	$scope.recipesUrl = MainService.recipesUrl;
	$scope.cardsUrl = MainService.cardsUrl;
	$scope.termsUrl = MainService.termsUrl;
	$scope.$on( 'MainService.update', function( event, title ) {
     $scope.title = title;
   });

	$scope.$watch('viewCount',function(value){
		alert('View Loaded'+ $scope.viewCount);
	});
	$(document).ready(function(){
		document.getElementById("anchor").focus();
		$scope.doms = document.getElementsByTagName('*').length
		alert($scope.doms)
		$('#cardsView').hide();
		$('#recipesView').hide();
		$('#videosView').hide();
		$('#termsView').hide();
	});

 }]);

