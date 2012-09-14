
var idx = 0;
var url = "";
var uploader = "";
var tmOut = null;

function playInit() {
	setTdElementText("versionInfo", versionStr);
	var imgDiv = document.getElementById("imageDiv");
	var img = document.getElementById("image");
	var height = img.height;
	var width = img.width;
	
	//adjust size
	var hRate = height / 720;; 
	var wRate = width / 1280; 
	var mag = 0;
	if(hRate > wRate) {
		mag = 720 / height;
	} else {
		mag = 1280 / width;
	}
	var fWidth = Math.floor(width * mag);
	var fHeight = Math.floor(height * mag);
	var l = (1280 - fWidth) / 2;
	var t = (720 - fHeight) / 2;
	var imgStr = "";
	if (l == 0) {
		imgStr = '<img id="image" src="'+url+'" style="position: absolute; left: 0px; top: 0px; height: '+fHeight+'px; width: '+fWidth+'px; margin-left: 0px; margin-top: '+t+'px;"/>';
	} else {
		imgStr = '<img id="image" src="'+url+'" style="position: absolute; left: 0px; top: 0px; height: '+fHeight+'px; width: '+fWidth+'px;margin-left: '+l+'px; margin-top: 0px;"/>';
	}
	imgDiv.innerHTML = imgStr;
	
	//uploader
	setTdElementText("uploader", uploader + "'s Photo");
	doHighlightButtomMenu("btn_01", false);
	doHighlightArrow("btn_aa", true);
	currentKeyId = "btn_aa";
	checkNextPrevObj(idx);
	if(ctrlViewCnt == "0") {
		doHighlightButtomMenu("btn_01", false);
		doHighlightArrow("btn_aa", true);
		currentKeyId = "btn_aa";
		viewControls(false);
	}
	tmOut = setInterval("timeControl();", 1000);
	if(isSlideshow == "true") {
		setImgSrc("img_ss", "../image/play/BTN_ICON_STOP_NORMAL.png");
		isSlideshow = false;
		execKey("btn_01");
		if(ctrlViewCnt == "0") {
			doHighlightButtomMenu("btn_01", false);
			doHighlightArrow("btn_aa", true);
			currentKeyId = "btn_aa";
		} else {
			currentKeyId = "btn_01";
			doHighlightButtomMenu("btn_01", true);
			doHighlightArrow("btn_aa", false);
		}
	}
	
	//added as ux change
	//display next and previous index
	var currentIndex = Number(idx) + 1;
	var prevIdxString = "";
	if(Number(currentIndex) > 1){prevIdxString = (Number(currentIndex) - 1) + " / " + sampleArray.length;}
	document.getElementById("prev_idx").innerHTML = prevIdxString;
	var nextIdxString = "";
	if(Number(currentIndex) < sampleArray.length){nextIdxString = (Number(currentIndex) + 1) + " / " + sampleArray.length;}
	document.getElementById("next_idx").innerHTML = nextIdxString;

}

function playUnload() {
	if ( tmOut != null ) {
		clearInterval(tmOut);
	}
	if ( slideTmOut != null ) {
		clearInterval(slideTmOut);
	}
}

var ctrlViewCnt = 1;

function timeControl() {
	if(ctrlViewCnt == 0 ) {
		// control is hiding.. 
		return;
	} else if (ctrlViewCnt == 1) {
		viewControls(true);
		ctrlViewCnt++;
	} else if (ctrlViewCnt >= 13) {
		doHighlight(null,"btn_aa");
		viewControls(false);
		ctrlViewCnt = 0;
		window.NetCastMouseOff();
		return;
	} else {
		ctrlViewCnt++;
	}
}

var slideTmOut = null;
var isSlideshow = false;
var slideInterval = 6;

function slideTimeControl() {
	slideInterval --;
	if(slideInterval == 0) {
		slideInterval = 6;
		var rv = showNextPhoto();
		if(rv == -1) {
			execKey("btn_01");
		}
	}
}

function showNextPhoto() {
	idx++;
	if(idx > sampleArray.length -1) {
		idx = sampleArray.length -1;
		return -1;
	} else {
		checkNextPrevObj(idx);
	}
	var obj = sampleArray[idx];
	url = obj.url;
	uploader = obj.uploader;
	//displayPhoto(url, uploader, 0);
	document.location.href="play.html?idx="+idx+"&ctrlViewCnt="+ctrlViewCnt+"&isSlideshow="+isSlideshow;
	return 0;
}


function showPrevPhoto() {
	idx --;
	if(idx < 0) {
		idx = 0;
		return -1;
	} else {
		checkNextPrevObj(idx);
	}
	var obj = sampleArray[idx];
	url = obj.url;
	uploader = obj.uploader;
	//displayPhoto(url, uploader, 0);
	document.location.href="play.html?idx="+idx;
	return 0;
}

function checkNextPrevObj(inputIdx) {
	var on = sampleArray[new Number(inputIdx)+1];
	var op = sampleArray[new Number(inputIdx)-1];
	if(on == null) {
		setElementVisibility("btn_al", true);
		setElementVisibility("btn_ar", false);
	} else if(op == null){
		setElementVisibility("btn_al", false);
		setElementVisibility("btn_ar", true);
	} else {
		setElementVisibility("btn_ar", true);
		setElementVisibility("btn_al", true);
	}
}

function displayPhoto(inputUrl, uploaderId, degree) {
	var imgDiv = document.getElementById("imageDiv");
	imgDiv.innerHTML = '<img id="image" src = "'+inputUrl+'"/>';
	var img = imgDiv.firstChild;
	if(degree == 0 || degree == 180) {
		var height = img.height;
		var width = img.width;
		var hRate = height / 720; 
		var wRate = width / 1280; 
		var mag = 0;
		if(hRate > wRate) {
			mag = 720 / height;
		} else {
			mag = 1280 / width;
		}
		var fWidth = Math.floor(width * mag);
		var fHeight = Math.floor(height * mag);
		var l = (1280 - fWidth) / 2;
		var t = (720 - fHeight) / 2;
		var imgStr = "";
		if (l == 0) {
			imgStr = '<img id="image" alt="" src="'+inputUrl+'" style="position: absolute; left: 0px; top: 0px; height: '+fHeight+'px; width: '+fWidth+'px; margin-left: 0px; margin-top: '+t+'px;';
		} else {
			imgStr = '<img id="image" alt="" src="'+inputUrl+'" style="position: absolute; left: 0px; top: 0px; height: '+fHeight+'px; width: '+fWidth+'px;margin-left: '+l+'px; margin-top: 0px;';
		}
		if(degree == 180) {
			imgStr += '-webkit-transform:rotate(180deg);';
		}
		imgStr += '"/>';
	} else {
		var height = img.width;
		var width = img.height;
		var hRate = height / 720;; 
		var wRate = width / 1280; 
		var mag = 0;
		if(hRate > wRate) {
			mag = 720 / height;
		} else {
			mag = 1280 / width;
		}
		var fWidth = Math.floor(width * mag);
		var fHeight = Math.floor(height * mag);
		var l = (1280 - fWidth) / 2;
		var t = (720 - fHeight) / 2;
		var imgStr = "";
		if (l == 0) {
			imgStr = '<img id="image" alt="" src="'+inputUrl+'" style="position: absolute; left: 0px; top: '+t+'px; height: '+fHeight+'px; width: '+fWidth+'px;';
		} else {
			imgStr = '<img id="image" alt="" src="'+inputUrl+'" style="position: absolute; left: '+l+'px; top: 0px; height: '+fHeight+'px; width: '+fWidth+'px;';
		}
		imgStr += '-webkit-transform:rotate('+degree+'deg);"/>';
	}
	imgDiv.innerHTML = imgStr;
	setTdElementText("uploader", uploaderId + "'s Photo"); 
}

function processKeyDown(event) {
	//lert("currentKeyId : " + currentKeyId);
	var keyCode;
	if(window.event) { // IE
		keyCode = event.keyCode;
	} else if(event.which) { // Netscape/Firefox/Opera
		keyCode = event.which;
	} else {
		alert("Unknown event type.");
		return ;
	}
	clickScreen(null);
	if(keyCode == VK_INFO) {
		document.location.reload();
		return;
	} else if(keyCode == VK_BACK) {
		document.location.href = "homelist.html";
		return;
	}
	if(currentKeyId == null) {
		doHighlight(null,"btn_aa");
		return;
	}
	var type = currentKeyId.charAt(4);
	switch(type) {
		//arrow
		case "a" :
			if(currentKeyId.charAt(5)=="a") {
				switch(keyCode) {
					case VK_LEFT :
						isSlideshow = false;
						execKey("btn_al");
						break;
					case VK_RIGHT :
						isSlideshow = false;
						execKey("btn_ar");
						break;
					case VK_UP :
						//do nothing
						break;
					case VK_DOWN :
						cancelHighlight("btn_aa");
						doHighlight(null,"btn_00");
						break;
					default :
						break;
				}
			} else {
				switch(keyCode) {
					case VK_LEFT :
						cancelHighlight(currentKeyId);
						doHighlight(null,"btn_aa");
						break;
					case VK_RIGHT :
						cancelHighlight(currentKeyId);
						doHighlight(null,"btn_aa");
						break;
					case VK_UP :
						cancelHighlight(currentKeyId);
						doHighlight(null,"btn_aa");
						break;
					case VK_DOWN :
						cancelHighlight(currentKeyId);
						doHighlight(null,"btn_00");
						break;
					case VK_ENTER :
						execKey(currentKeyId);
						break;
					default :
						break;
				}
			}
			break;
		//back
		case "b" :
		//bottom menus
			switch(keyCode) {
				case VK_LEFT :
				case VK_RIGHT :
				case VK_UP :
				case VK_DOWN :
					cancelHighlight(currentKeyId);
					doHighlight(null,"btn_aa");
					break;
				case VK_ENTER :
					execKey(currentKeyId);
					break;
				default :
					break;
			}
			break;
		case "0" :
			switch(keyCode) {
				case VK_UP :
					cancelHighlight(currentKeyId);
					doHighlight(null,"btn_aa");
					break;
				case VK_DOWN :
					//do nothing?
					break;
				case VK_RIGHT :
				case VK_LEFT :
					var nextKeyId = getNextKeyId(keyCode, currentKeyId);
					if(nextKeyId != null) {
						cancelHighlight(currentKeyId);
						doHighlight(null,nextKeyId);
					}
					break;
				case VK_ENTER :
					execKey(currentKeyId);
					break;
				default :
					break;
			}
			
			break;
		default :
			break;
	}
}

function clickScreen(event) {
	if(event != null && hideKeyPressed) {
		//do nothing
		hideKeyPressed = false;
	} else {
		ctrlViewCnt = 1;
		timeControl();
	}
}


function getNextKeyId(keyCode, keyId) {
	var nextKey = null;
	var idx = keyId.charAt(5); //btn_00
	switch(keyCode) {
		case VK_LEFT :
			idx--;
			if(idx < 0) {
				idx = 0;
			}
			nextKey = keyId.substring(0,5) + ""+ idx;
			break;
		case VK_RIGHT :
			idx++;
			//if(idx > 4) {
			//	idx = 4;
			if(idx > 5) {
				idx = 5;
			}
			nextKey = keyId.substring(0,5) + ""+ idx;
			break;
		default :
			return null;
	}
	return nextKey;
}

function doHighlightArrow(keyId, isHighlight) {
	if(isHighlight) {
		if(keyId.charAt(5)=="a") {
			setInnerHtml("btn_al", '<img alt="" src="../image/play/PHOTO_ARROW_FOCUS_L.png" style="position: absolute; top: 0px; left: 0px;" onmousedown="execKey(\'btn_al\');"/>');
			setInnerHtml("btn_ar", '<img alt="" src="../image/play/PHOTO_ARROW_FOCUS_R.png" style="position: absolute; top: 0px; left: 0px;" onmousedown="execKey(\'btn_ar\');"/>');
		} else {
			if(keyId.charAt(5)=="l") {
				setInnerHtml("btn_al", '<img alt="" src="../image/play/PHOTO_ARROW_FOCUS_L.png" style="position: absolute; top: 0px; left: 0px;" onmousedown="execKey(\'btn_al\');"/>');
			} else if(keyId.charAt(5)=="r") {
				setInnerHtml("btn_ar", '<img alt="" src="../image/play/PHOTO_ARROW_FOCUS_R.png" style="position: absolute; top: 0px; left: 0px;" onmousedown="execKey(\'btn_ar\');" />');
			}
		}
	} else {
		if(keyId.charAt(5)=="a") {
			setInnerHtml("btn_al", '<img alt="" src="../image/play/PHOTO_ARROW_NORMAL_L.png" style="position: absolute; top: 0px; left: 0px;"/>');
			setInnerHtml("btn_ar", '<img alt="" src="../image/play/PHOTO_ARROW_NORMAL_R.png" style="position: absolute; top: 0px; left: 0px;"/>');
		} else {
			if(keyId.charAt(5)=="l") {
				setInnerHtml("btn_al", '<img alt="" src="../image/play/PHOTO_ARROW_NORMAL_L.png" style="position: absolute; top: 0px; left: 0px;"/>');
			} else if(keyId.charAt(5)=="r") {
				setInnerHtml("btn_ar", '<img alt="" src="../image/play/PHOTO_ARROW_NORMAL_R.png" style="position: absolute; top: 0px; left: 0px;"/>');
			}
		}
	}
}

function doHighlightButtomMenu(keyId, isHighlight) {
	var focusUrlString = "url('../image/play/PHOTO_BTN_FOCUS_200.png')";
	var normalUrlString = "url('../image/play/PHOTO_BTN_NORMAL_200.png')";
	for(var i = 0 ; i < 6 ; i++){
		var curKeyId = "btn_0" + i;
		if(curKeyId == keyId && isHighlight){
	    document.getElementById(curKeyId).style.backgroundImage = focusUrlString;
		}else{
	    document.getElementById(curKeyId).style.backgroundImage = normalUrlString;
		}
	}
	return;
//	var e = document.getElementById("btn_0f");
//	if(isHighlight) {
//		if(e != null) {
//			var keyE = document.getElementById(keyId);
//			var left = keyE.offsetLeft;
//			e.style.left = left + "px";
//			switch(keyId.charAt(5)) {
//				case "0" :
//					//e.innerHTML = '<table cellpadding=0 cellspacing=0 border=0> <Tr> <td height="39" valign="top"> <img id="img_aff"alt="" src="../image/play/PHOTO_BTN_ICON_ADD_FOCUS.png" class="btnImgStyle"/> </td> <td width="9px"> </td> <td valign="bottom"> Add Friend </td> </tr> </table>';
//					break;
//				case "1" :
//					if(isSlideshow) {
//						e.innerHTML = '<table cellpadding=0 cellspacing=0 border=0> <Tr> <td height="39" valign="top"> <img id="img_ssf"alt="" src="../image/play/BTN_ICON_STOP_FOCUS.png" class="btnImgStyle"/> </td> <td width="9px"> </td> <td valign="bottom"> Slideshow </td> </tr> </table>';
//					} else {
//						e.innerHTML = '<table cellpadding=0 cellspacing=0 border=0> <Tr> <td height="39" valign="top"> <img id="img_ssf"alt="" src="../image/play/PHOTO_BTN_ICON_PLAY_FOCUS.png" class="btnImgStyle"/> </td> <td width="9px"> </td> <td valign="bottom"> Slideshow </td> </tr> </table>';
//					}
//					break;
//				case "2" :
//					e.innerHTML = '<table cellpadding=0 cellspacing=0 border=0> <Tr> <td height="39" valign="top"> <img id="img_rof"alt="" src="../image/play/PHOTO_BTN_ICON_RE_FOCUS.png" class="btnImgStyle"/> </td> <td width="9px"> </td> <td valign="bottom"> Rotate </td> </tr> </table>';
//					break;
//				case "3" :
//					e.innerHTML = '<table cellpadding=0 cellspacing=0 border=0> <Tr> <td height="39" valign="top"> <img id="img_zmf"alt="" src="../image/play/PHOTO_BTN_ICON_SERCH_FOCUS.png" class="btnImgStyle"/> </td> <td width="9px"> </td> <td valign="bottom"> Zoom </td> </tr> </table>';
//					break;
//				case "4" :
//					e.innerHTML = '<table cellpadding=0 cellspacing=0 border=0> <Tr> <td height="39" valign="top"> <img id="img_hif"alt="" src="../image/play/PHOTO_BTN_ICON_HIDE_FOCUS.png" class="btnImgStyle"/> </td> <td width="9px"> </td> <td valign="bottom"> Hide </td> </tr> </table>';
//					break;
//				default :
//					e.innerHTML = '';
//					break;
//			}
//			e.style.visibility="";
//		}
//	} else {
//		e.style.visibility="hidden";
//	}
}

function doHighlightBackMenu(isHighlight) {
	if(isHighlight) {
		setElementBackground("btn_bk", "url('../image/play/PHOTO_BTN_EXIT_FOCUS.png')");
	} else {
		setElementBackground("btn_bk", "url('../image/play/PHOTO_BTN_EXIT_NORMAL.png')");
	}
}

var currentKeyId = null;

function doHighlight(event, keyId) {
	//lert("event : " + event + "\nkeyId : " + keyId);
	if(keyId == null) {
		return;
	}
	clickScreen(event);
	if(currentKeyId != null) {
		cancelHighlight(currentKeyId);
	}
	var type = keyId.charAt(4);
	switch(type) {
		//arrow
		case "a" :
			doHighlightArrow(keyId, true);
			doHighlightButtomMenu(null, false);
			doHighlightBackMenu(false);
			break;
		case "b" :
			//back : do nothing
			doHighlightBackMenu(true);
			doHighlightArrow("btn_aa", false);
			doHighlightButtomMenu(null, false);
			break;
		case "0" :
			//setElementBgColor(keyId, "yellow");
			doHighlightButtomMenu(keyId, true);
			doHighlightArrow("btn_aa", false);
			doHighlightBackMenu(false);
			break;
		default :
			currentKeyId = null;
			return;
	}
	currentKeyId = keyId;
}

function cancelHighlight(keyId) {
	var type = keyId.charAt(4);
	switch(type) {
		//arrow
		case "a" :
			doHighlightArrow(keyId, false);
			break;
		case "b" :
			//back : do nothing
			doHighlightBackMenu(false);
			break;
		case "0" :
			doHighlightButtomMenu(keyId, false);
			break;
		default :
			break;
	}
	if(currentKeyId != null) {
		var type = currentKeyId.charAt(4);
		switch(type) {
			//arrow
			case "a" :
				doHighlightArrow(currentKeyId, false);
				break;
			case "b" :
				//back : do nothing
				doHighlightBackMenu(false);
				break;
			case "0" :
				doHighlightButtomMenu(currentKeyId, false);
				break;
			default :
				break;
		}
	}
	currentKeyId = null;
}


var deg = 0;
var hideKeyPressed = false;

function execKey(keyId) {

	if(keyId == "btn_0f") {
		keyId = currentKeyId;
	}
	var type = keyId.charAt(4);
	hideKeyPressed = false;
	switch(type) {
		case "a" :
			//arrow
			if(keyId.charAt(5)=="a") {
				// do nothing?
			} else {
				if(keyId.charAt(5)=="r") {
					showNextPhoto();
				} else if (keyId.charAt(5)=="l") {
					showPrevPhoto();
				}
			}
			break;
		case "b" :
			//back
			document.location.href = "homelist.html";
			break;
		case "0" :
			//bottom menus
			if(keyId.charAt(5)=="0") {
				//Add Friend : not available
				alert("Not available.");
			} else if(keyId.charAt(5)=="1") {
				//Slide show
				if(isSlideshow) {
					clearInterval(slideTmOut);
					isSlideshow = false;
					//setImgSrc("img_ss", "../image/play/BTN_ICON_PLAY_NORMAL.png");
					//setImgSrc("img_ssf", "../image/play/BTN_ICON_PLAY_FOCUS.png");
					document.getElementById("btn_01_img").src="../image/play/PHOTO_BTN_ICON_PLAY_NORMAL.png";
				} else {
					slideTmOut = setInterval("slideTimeControl();", 1000);
					isSlideshow = true;
					//setImgSrc("img_ss", "../image/play/BTN_ICON_STOP_NORMAL.png");
					//setImgSrc("img_ssf", "../image/play/BTN_ICON_STOP_FOCUS.png");
  	      document.getElementById("btn_01_img").src="../image/play/BTN_ICON_STOP_NORMAL.png";
				}
			} else if(keyId.charAt(5)=="2") {
				//rotate : not available
				alert("Not available.");
				/*
				deg = (new Number(deg)+90) % 360;
				displayPhoto(url, uploader, deg);
				*/
			} else if(keyId.charAt(5)=="3") {
				//zoom : not available
				alert("Not available.");
			} else if(keyId.charAt(5)=="4") {
				//hide
				viewControls(false);
				ctrlViewCnt = 0;
				currentKeyId = "btn_aa";
				hideKeyPressed = true;
				doHighlightButtomMenu("btn_04", false);
				doHighlightArrow("btn_aa", true);
			} else if(keyId.charAt(5)=="5") {
				document.location.href = "homelist.html";
			}
			break;
		default :
			break;
	}
}

function viewControls(isShow) {
	if(isShow) {
		setElementVisibility("controlDiv", true);
		setElementVisibility("controlDivBg", true);
	} else {
		setElementVisibility("controlDiv", false);
		setElementVisibility("controlDivBg", false);
	}
}

function setMenuFocus(){
	
}