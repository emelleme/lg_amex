/**
 * common util function 
 */

NAV_HOVER = false;
$(document).ready(function() {
	$('#versionInfo').html(versionStr);
	$.preloadCssImages();
	$('.termsbtn').hover(function(){
		clearActive();
		$('#termsconditions a').addClass('hover');
	});
	$('.navbtn').hover(function(){
		clearActive();
		NAV_HOVER = true;
		$(this).addClass('hover');
		curLevel = level.MENU;
		MENU_POS = $(this).parent().index();
	},function(){
		NAV_HOVER = false;
	});
	$('.backbtn').hover(function(){
		clearActive();
		$('#termsconditions a').addClass('hover');
		$('.backbtn').addClass('hover');
		curLevel = 2;
		console.log('Hoover')
	},function(){
		$('.backbtn').removeClass('hover');
	})
});

function clearActive(){
	$('.activeImage').removeClass('activeImage');
	$('.arrows').hide();
	$('.hover').removeClass('hover');
}
function getParams() {
	var idx = document.URL.indexOf('?');
	var params = new Array();

	if (idx != -1) {
		var pairs = document.URL.substring(idx+1, document.URL.length).split('&');
		for (var i=0; i<pairs.length; i++) {
			var nameVal = pairs[i].split('=');
			params[nameVal[0]] = nameVal[1];
		}
	}
	return params;
}

function setTdElementText(elementId, text) {
	var e = document.getElementById(elementId);
	if( e != null) {
		e.firstChild.nodeValue = text;
	}
}

function setElementBgColor(elementId, color) {
	var e = document.getElementById(elementId);
	if(e != null) {
		e.style.backgroundColor = color;
	}
}

function setElementCursor(elementId, cursor) {
	var e = document.getElementById(elementId);
	if(e != null) {
		e.style.cursor = cursor;
	}
}

function setElementBackground(elementId, backGround) {
	var e = document.getElementById(elementId);
	if(e != null) {
		e.style.background = backGround;
	}
}

function setElementFontSize(elementId, fontSize) {
	var e = document.getElementById(elementId);
	if(e != null) {
		e.style.fontSize = fontSize;
	}
}

function setInnerHtml(elementId, html) {
	var e = document.getElementById(elementId);
	if(e != null) {
		e.innerHTML = html;
	}
}

function setImgSrc(elementId, src) {
	var e = document.getElementById(elementId);
	if(e != null) {
		e.src = src;
	}
}

function replaceAll(source, searchValue, replaceValue) {
	var toIdx = source.indexOf(searchValue, idx);
	if(toIdx < 0) {
		return source;
	}
	var rtnVal = "";
	var idx = 0;
	while(toIdx > -1) {
		rtnVal += source.substring(idx, toIdx);
		rtnVal += replaceValue;
		idx = toIdx + searchValue.length;
		toIdx = source.indexOf(searchValue, idx);
	}
	rtnVal += source.substring(idx, source.length);
	return rtnVal;
}

function setElementVisibility(elementId, isVisible) {
	var e = document.getElementById(elementId);
	if(e != null) {
		if (isVisible) {
			e.style.visibility="";		
		} else {
			e.style.visibility="hidden";
		}
	}
}

function addEvent(object, eventStr, func) {
	try {
		object.addEventListener(eventStr, func, false);
	} catch (e) {
		alert("addEvent["+eventStr+"]["+func+"] ["+e.message+"]");
	}
}

function removeEvent(object, eventStr, func) {
	try {
		object.removeEventListener(eventStr, func);
	} catch (e) {
		alert("removeEvent["+eventStr+"]["+func+"] ["+e.message+"] ");
	}
}

//add KeyHelp
//add KeyHelp

function processKeyHelpOver(elementId, prefix) {		
	//outFocusing		
		
	if(prefix != null && prefix != 'undefined') {	
		document.getElementById(prefix+'kh_'+elementId).style.width = "197px";
		document.getElementById(prefix+'kh_'+elementId).style.height = "59px";
		setElementBackground(prefix+"kh_"+elementId,"url(../image/keyhelp/KEYHELP_FOCUS.png)");
	} else {
		if (document.getElementById('khImg'+elementId) == null || 
				document.getElementById('khImg'+elementId).style.visibility != 'hidden') {	
			
			document.getElementById('kh_'+elementId).style.width = "197px";
			document.getElementById('kh_'+elementId).style.height = "59px";
			setElementBackground("kh_"+elementId,"url(../image/keyhelp/KEYHELP_FOCUS.png)");
		}
	}
}

function processKeyHelpOut(elementId, prefix) {
	
	if(prefix != null && prefix != 'undefined') {
		document.getElementById(prefix+'kh_'+elementId).style.width = "191px";
		document.getElementById(prefix+'kh_'+elementId).style.height = "56px";
		setElementBackground(prefix+"kh_"+elementId,"url(../image/keyhelp/KEYHELP_NORMAL.png)");
	} else {
		if (document.getElementById('kh_'+elementId) != null){
			document.getElementById('kh_'+elementId).style.width = "191px";
			document.getElementById('kh_'+elementId).style.height = "56px";
		}
		setElementBackground("kh_"+elementId,"url(../image/keyhelp/KEYHELP_NORMAL.png)");
	}
}

function processKeyHelp(actionId) {
	fullModeCtrlView = 1;
	switch(actionId) {
		case 'option' :
			//full screen mode auto??
			break;
		case 'full' :
			//alert('full screen');
			break;
		case 'scan' :
			//alert('scan screen');
			break;
		case 'back' :			
			window.history.back();
			break;
		case 'home' :
			window.NetCastReturn(VK_BACK);
			break;
		case 'exit' :
			//window.NetCastExit();
			alert("window.NetCastExit() is not recommended to use");
			break;
		case 'nextPage' :
		{
			if (pageNo+1 < dataCount/5) {
				clickArr('true');
			}
			break;
		} 
		case 'prevPage' :
		{
			if (pageNo > 0) {
				clickArr('false');
			}
			break;
		}
		default :
			break;
	}
}

function zoomIn(index, depth) {
//	alert(index + " " + depth);
	curIndex = index;
	document.getElementById('thumbFocus').style.visibility = 'visible';
	document.getElementById('focusFrame').style.visibility = 'visible';
	
	document.getElementById('thumbFocus').style.left = 68 + (index -1) * 102 + 'px';
	document.getElementById('focusFrame').style.left = 68 + (index -1) * 102 + 'px';
	
	document.getElementById('thumbFocus').style.top = 215 + (depth -1) * 102 + 'px';
	document.getElementById('focusFrame').style.top = 215 + (depth -1) * 102 + 'px';
	
	curLevel = depth;
	document.getElementById('menu0').className = 'selectedMenuFirst';
	document.getElementById('thumbFocusImg').innerHTML = "<img src='"+ sampleArray[pageNo * DISPLAY_COUNT + (index-1)*3 + (depth-1)].thumbUrl+ 
	"' style='width: 110px; height: 110px; '></img>";
	
	moveScrollByKey(Math.ceil(pageNo * DISPLAY_COUNT / 3) + new Number(curIndex) -1);
}

function zoomOut() {
//	alert(index);
	document.getElementById('thumbFocus').style.visibility = 'hidden';
	document.getElementById('focusFrame').style.visibility = 'hidden';
	
}

function changeImage(id, img, position) {

	document.getElementById(id).style.background = img;
	document.getElementById(id).style.backgroundRepeat = 'no-repeat';
	document.getElementById(id).style.backgroundPosition = position;

/*	document.getElementById(id).innerHTML = img;*/
}

function viewOrgImage() {
	var index = pageNo * DISPLAY_COUNT + (curIndex - 1) * 3 + curLevel -1;
	location.href = 'play.html?idx='+ index;
}



function getUserAgent() {
	userAgent = new String(navigator.userAgent);
	var LG_TV = document.getElementById("versionInfo");
	var LG_TV_BG = document.getElementById("key_tv_bg");
	var LG_MEDIA = document.getElementById("key_bdp");
	var LG_MEDIA_BG = document.getElementById("key_bdp_bg");

	if (userAgent.search("LG NetCast.TV") > -1 ) {			
		versionStr = "v 1.003 (20110310) -TV";	
	} else if (userAgent.search("LG NetCast.Media") > -1 ){
		versionStr = "v 1.003 (20110310) -BDP";
	} else {	
		versionStr = "v 1.003 (20110310) -TV";	
	}
	console.log(versionStr);
}

var pageLoading = false;
function nowLoading(e) {

	if(pageLoading) return false;
	pageLoading = true;
}

/**
 * version set
 */
var versionStr;
getUserAgent();
var logger = {};
logger.keys = [];
logger.version = versionStr;
var menu = {"HOME": 0};
//var level = {"MENU":0, "IMG_1":1, "IMG_2":2, "IMG_3": 3};
var level = {"MENU":0, "IMG_1":1, "IMG_2":2, "IMG_3": 3, "BOTTOM_BUTTON":4};
var curLevel = level.MENU;
var pageNo = 0;
var curIndex = 1;
