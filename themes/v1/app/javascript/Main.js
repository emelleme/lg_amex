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
		NOSTATE: 9,
		BUFFERING: 10
	},
	MENU_POS: 0,
	MAX_ITEMS:5,
	CUR_POS: 1,
	CUR_ROW: 2,
	CUR_COL: 1,
	PREV_ROW:2,
	PREV_COL:1,
	MAX_ROW: 4,
	NEWS_POS: 1,
	VIDEO_POS: 1,
	MAX_VIDEO: 3,
	CDN: 'http://3b8ffb0b6ca1c4312d7a-f6478897881b831aa0d618e78a4be408.r12.cf1.rackcdn.com/',
	INTROVIDEO: 'http://3b8ffb0b6ca1c4312d7a-f6478897881b831aa0d618e78a4be408.r12.cf1.rackcdn.com/amex_fashion_app_carolinaHerrera_2mbps.mp4',
	HARPERSVIDEO: 'http://3b8ffb0b6ca1c4312d7a-f6478897881b831aa0d618e78a4be408.r12.cf1.rackcdn.com/amex_fashion_app_ch5_2mbps.mp4',
	GALLERYITEMACTIVE:0,
	GOBACK: 0,
	curLevel: 1,
	prevLevel: 1,
	prevPage: ["travel"],
	pageDepth: 0,
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
		4: "4-3"
	},
	5: {
		1: "4-1",
		2: "4-1",
		3: "4-3",
		4: "4-3"
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
	pluginObj.registKey(tvKey.KEY_EXIT);
}
Main.CountDownTimer = function (dt, id)
{
    var end = new Date(dt);

    var _second = 1000;
    var _minute = _second * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var timer;

    function showRemaining() {
        var now = new Date();
        var distance = end - now;
        if (distance < 0) {

            clearInterval(timer);
            // document.getElementById(id).innerHTML = 'EXPIRED!';

            return;
        }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);
        $('.num-days').html(days);
        $('.num-hours').html(hours);
        $('.num-mins').html(minutes);
    }

    timer = setInterval(showRemaining, 1000);
}

Main.onLoad = function()
{
	$('body').css('background-color','#000000');
	$('.videoDetails').css('height','0px');
	$.preloadCssImages();
	//Main.CountDownTimer('02/15/2013 12:15 AM GMT', 'countdown');
	window.onShow = Main.showHandler;
	if ( Player.init() && Audio.init() )
    {

        
        Player.stopCallback = function()
        {
            /* Return to windowed mode when video is stopped
                (by choice or when it reaches the end) */
            Main.setWindowMode();
        }

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
	alert(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]);
/* Set initial keydown function */
	document.getElementById('anchor').onkeydown = Main.travelKeys;
	analytics.pageview('tipstrends');
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
  		recipesUrl: "http://s.amxp.cc/designerspotlight/layout.html",
  		videosUrl:"http://s.amxp.cc/videos/layout.html",
  		cardsUrl:"http://s.amxp.cc/shopsmall/slayout.html",
  		termsUrl:"http://s.amxp.cc/terms/layout.html"
  	}
  }])
 .controller( 'MainController', [ 'MainService', '$scope', function( MainService, $scope ) {
   $scope.title = Main.title;
   $scope.viewCount = MainService.viewCount;
   $scope.setTitle = function( newTitle ){
		$scope.title = newTitle;
	}
	$scope.firstLoad = function(){
		$('#main-copy').hide().html($('#benefit_'+Main.CUR_ROW+'-'+Main.CUR_COL).html()).show();//Wing Color
		$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
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
	$(document).ready(function(){
		document.getElementById("anchor").focus();
		$('#cardsView').hide();
		$('#recipesView').hide();
		$('#videosView').hide();
		$('#termsView').hide();
	});

 }]);