var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();

var Main =
{

};


var fCnt = 0;

//Define Levels
level = {};
leftCount = 0;
rightCount = 0;
upCount = 0;
level.MOSAIC = 1;
level.MAIN_COPY = 2;
level.FOOTER = 3;
level.VIDEO = 4;
level.INTROVIDEO = 5;
level.TERMS = 6;
NAV_HOVER = false;
//logger.page = 'benefits';
//Define each Image Position within matrix
IMAGE_MATRIX = {
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

CUR_ROW = 2;
CUR_COL = 1;
PREV_ROW = 2;
PREV_COL = 1;
MAX_ROW = 4;
MAX_COL = 4;
MENU_POS = 0;
ACTIVE_PAGE = 0;
//Current Index
curIndex = 1;
playclickcount = 0;

//Current Level
curLevel = level.MOSAIC;

Main.onLoad = function()
{
	// Enable key event processing
	this.enableKeys();
	widgetAPI.sendReadyEvent();
	
	$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
	$('#main-copy').hide().html($('#benefit_2-1').html()).show();
	//$('body').css('padding-top','0px');
	$('#livePlayer').hide();
	$('#beforeImage').hide();
	
	$('.backbtn').on('click',function(e){
		$('#beforeImage').hide();
		curLevel = level.MOSAIC;
		//jwplayer().stop();
		$('body').css('padding-top','48px');
		console.log('closed');
	});
	$('#closeVideo').on('click',function(e){
		$('#livePlayer').hide();
		curLevel = level.MOSAIC;
		//jwplayer().stop();
		console.log('closed');
	});
/*
	Player Actions
	$('#fullscreenButton').on('click',function(e){
		jwplayer().setFullscreen(true);
		console.log('fullscreenButton');
	});
	*/
	$('.termsbtn').hover(function(){
		clearActive();
		$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).removeClass('activeImage');
		$('#image_6-3 a').addClass('hover');
		$('#image_6-3').addClass('activeImage');
		curLevel = level.MOSAIC;
		CUR_ROW = 6;
		CUR_COL = 3;
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
	
	$('.navbtn').on('click', function(e){
		e.preventDefault();
		var link = $(this);
			window.location = link.attr('href');
			return false;
		nowLoading(this);		
	});

	$('#wrapper').on('click', function(e){
		if(leftCount == 2 && rightCount == 2 && upCount == 1){
			window.location = "intro/sbs/";
			console.log('test');
		}	
	});
	
	$('.mosaicImage').hover(function(){
		
		if(IMAGE_MATRIX[PREV_ROW][PREV_COL] != '6-3'){
			CUR_COL = PREV_COL;
			CUR_ROW = PREV_ROW;
			clearActive();
			curLevel = level.MOSAIC;
			$('#image_'+IMAGE_MATRIX[PREV_ROW][PREV_COL]).addClass('activeImage');
			//Terms and condition
			$('#image_6-3').removeClass('activeImage');
			$(this).addClass('mosaicImagehover');
		}else{
			//Prev Col is terms;
			clearActive();
			curLevel = level.MOSAIC;
			$('#image_'+IMAGE_MATRIX[PREV_ROW][PREV_COL]).addClass('activeImage');
			//Terms and condition
			$('#image_6-3').removeClass('activeImage');
			$(this).addClass('mosaicImagehover');
		}
		},function(){
		$(this).removeClass('mosaicImagehover');
		PREV_ROW = CUR_ROW;
		PREV_COL = CUR_COL;
		});
	$('.mosaicImage').on('click',function(e){
		//logger.keys.push(IMAGE_MATRIX[CUR_ROW][CUR_COL]+':click');
		if(!$(this).hasClass('activeImage')){
			//Set the item active
			var t = $(this).attr('id').replace('image_', 'benefit_');
			$('#main-copy').hide().html($('#'+t).html()).show();
			
			//Wing Color
			$('.uguu').css('border-left','100px solid '+$(this).attr('data-wingcolor'));
			$('.ugum').css('border-top','76px solid '+$(this).attr('data-wingcolor'));
			$('.ugum').css('border-left','100px solid '+$(this).attr('data-wingcolor'));
			$('.uguv').css('border-top','130px solid '+$(this).attr('data-wingcolor'));
			//Set active.
			clearActive();
			$(this).addClass('activeImage');
			//Active Image Matrix
			var n=$(this).attr('id').split("_");
			var pos = n[1].split("-")
			CUR_ROW = Number(pos[0]);
			CUR_COL = Number(pos[1]);
			//console.log(CUR_COL);
		}else{
			//Check if the First item is active
			var t = $(this).attr('id');
			if(t == "image_2-1"){
				//Show Media Player
					window.location ="videos.html";
				
			}
		}

	})
};

Main.onUnload = function()
{

};

Main.enableKeys = function()
{
	document.getElementById("anchor").focus();
};

Main.keyDown = function()
{
	var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("RETURN");
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			alert("LEFT");
			leftCount++;

			if (curLevel == level.MENU) {
				if (MENU_POS != 0){
					//Move left
					$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
					MENU_POS = MENU_POS-1;
					clearActive();
					$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
				}
			}
			if (curLevel == level.MOSAIC) {
				$('.mosaicImage').removeClass('mosaicImagehover');
				if(CUR_ROW >= 6){
					//At terms
					if(IMAGE_MATRIX[CUR_ROW][CUR_COL] == '6-3'){
					CUR_COL = CUR_COL - 1;
					clearActive();
					$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
					$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
					
					//Wing Color
					$('.uguu').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					
				}
					
				}else if (CUR_COL == 1) {
					//First Column
				}else if(IMAGE_MATRIX[CUR_ROW][CUR_COL-1] == IMAGE_MATRIX[CUR_ROW][CUR_COL]){
					//Same as current. Move 2.
					clearActive();
					CUR_COL = CUR_COL - 2;
					$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
					$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
					
					//Wing Color
					$('.uguu').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					var spl = IMAGE_MATRIX[CUR_ROW][CUR_COL].split("-");
						CUR_ROW = Number(spl[0]);
						CUR_COL = Number(spl[1]);
				}else{
					//Move to next Postion
					clearActive();
					if(IMAGE_MATRIX[CUR_ROW][CUR_COL-1] != null){
						CUR_COL = CUR_COL - 1;
						$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
						
						//Wing Color
					$('.uguu').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
						var spl = IMAGE_MATRIX[CUR_ROW][CUR_COL].split("-");
						CUR_ROW = Number(spl[0]);
						CUR_COL = Number(spl[1]);
						curIndex--;
					}
				}
			}
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			if(leftCount == 2){
				rightCount++
			}else{
				leftCount =0;
				rightCount = 0;
			}
			if (curLevel == level.VIDEO) {
				$('.backbtn').addClass('hover');
			};
			if (curLevel == level.MENU) {
				if (MENU_POS < 2){
					//Move Right
					$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
					MENU_POS = MENU_POS+1;
					clearActive();
					$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
					
				}
			}
			if (curLevel == level.MOSAIC) {
			$('.mosaicImage').removeClass('mosaicImagehover');
				if ( IMAGE_MATRIX[CUR_ROW][CUR_COL] == '2-1') {
					//Move to next Postion
					clearActive();
					CUR_COL = CUR_COL + 1;
					//Set First item in footer Active
					$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
					$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
					
					//Wing Color
					$('.uguu').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					var spl = IMAGE_MATRIX[CUR_ROW][CUR_COL].split("-");
					CUR_ROW = Number(spl[0]);
					CUR_COL = Number(spl[1]);
					curIndex++;
				}else if (CUR_COL >= 4) {
					//Do nothing
				}else if(IMAGE_MATRIX[CUR_ROW][CUR_COL+1] == IMAGE_MATRIX[CUR_ROW][CUR_COL]){
					//Same as current. move two positions down
					
					if(IMAGE_MATRIX[CUR_ROW][CUR_COL+2] != null){
						clearActive();
						CUR_COL = CUR_COL + 2;
						$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
						
						//Wing Color
					$('.uguu').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
						var spl = IMAGE_MATRIX[CUR_ROW][CUR_COL].split("-");
						CUR_ROW = Number(spl[0]);
						CUR_COL = Number(spl[1]);
					}
					
					
				}else{
					if(CUR_COL+1 > MAX_COL){
						// Reached the end of the row, move to next Row
						if(CUR_ROW+1 > MAX_ROW){
							//End of the line.
							
							
						}else{
							//Move to first position of next row
							curIndex++;
							clearActive();
							CUR_ROW = CUR_ROW;
							CUR_COL = 1;
							//Set First item in footer Active
							$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
							var spl = IMAGE_MATRIX[CUR_ROW][CUR_COL].split("-");
							CUR_ROW = Number(spl[0]);
							CUR_COL = Number(spl[1]);
						}
					}else{
						//Move position to right
						if(IMAGE_MATRIX[CUR_ROW][CUR_COL+1] == null){
							//No Image in this position. Do Nothing
							if(IMAGE_MATRIX[CUR_ROW][CUR_COL+2] != null){
								//Move over two positions if its not null
								clearActive();
								CUR_COL = CUR_COL + 2;
								$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
								$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
								
								//Wing Color
					$('.uguu').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
								var spl = IMAGE_MATRIX[CUR_ROW][CUR_COL].split("-");
								CUR_ROW = Number(spl[0]);
								CUR_COL = Number(spl[1]);
							}
						}else if(IMAGE_MATRIX[CUR_ROW][CUR_COL+1] == IMAGE_MATRIX[CUR_ROW][CUR_COL]){
							//Same as current. Move over 2

clearActive();
							CUR_COL = CUR_COL + 2;
							$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
							$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
							
							//Wing Color
					$('.uguu').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
							var spl = IMAGE_MATRIX[CUR_ROW][CUR_COL].split("-");
							CUR_ROW = Number(spl[0]);
							CUR_COL = Number(spl[1]);
							console.log(CUR_COL);
						}else{
							//Move into position
							clearActive();
							CUR_COL = CUR_COL+1;
							$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
							$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
							
							//Wing Color
					$('.uguu').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','130px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
							var spl = IMAGE_MATRIX[CUR_ROW][CUR_COL].split("-");
							CUR_ROW = Number(spl[0]);
							CUR_COL = Number(spl[1]);
							
						}
					}

				} 
				
			}
			break;
		case tvKey.KEY_UP:
			alert("UP");
			if(rightCount == 2){
				upCount++;
			}else{
				leftCount = 0;
				rightCount = 0;
			}
			if (curLevel == level.MENU) {
				//return to matrix
				$('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
				curLevel = level.MOSAIC;
				clearActive();
				$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
			}else {
			$('.mosaicImage').removeClass('mosaicImagehover');
				if(CUR_ROW == 1){
					//At the top. Do nothing
				}else{
					if(IMAGE_MATRIX[CUR_ROW-1][CUR_COL] == null){
						//null space. do nothing
					}else if(IMAGE_MATRIX[CUR_ROW-1][CUR_COL] == IMAGE_MATRIX[CUR_ROW][CUR_COL]){
						//same as current. move two positions
						if(CUR_ROW > 2){
							if(IMAGE_MATRIX[CUR_ROW-2][CUR_COL] != IMAGE_MATRIX[CUR_ROW][CUR_COL]){
								clearActive();
								CUR_ROW = CUR_ROW - 2;
								$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
								$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
								var spl = IMAGE_MATRIX[CUR_ROW][CUR_COL].split("-");
								if(IMAGE_MATRIX[CUR_ROW-2][CUR_COL] == '6-3'){
									PREV_COL = CUR_COL;
									PREV_ROW = CUR_ROW;
									
								}else{
									CUR_ROW = Number(spl[0]);
									CUR_COL = Number(spl[1]);
									PREV_COL = CUR_COL;
									PREV_ROW = CUR_ROW;
								}
								//console.log(IMAGE_MATRIX[CUR_ROW][CUR_COL])
							}
						}else{
							//Move to 1-2
							clearActive();
							CUR_ROW = 1;
							CUR_COL = 2;
							$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
							$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
							$('.uguu').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
						}
					}else{
						clearActive();
						CUR_ROW = CUR_ROW - 1;
						$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
						$('.uguu').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
						var spl = IMAGE_MATRIX[CUR_ROW][CUR_COL].split("-");
						
							CUR_ROW = Number(spl[0]);
							CUR_COL = Number(spl[1]);
							if(IMAGE_MATRIX[CUR_ROW][CUR_COL] == '6-3'){
							PREV_COL = CUR_COL;
							PREV_ROW = CUR_ROW;
							
						}else{
							PREV_COL = CUR_COL;
							PREV_ROW = CUR_ROW;
						}
						//console.log(CUR_ROW)
					}
				}
			}
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			if (curLevel == level.MENU) {
				//chill
			}
			if (curLevel == level.MOSAIC) {
			$('.mosaicImage').removeClass('mosaicImagehover');
				if(CUR_ROW == 6){
					clearActive();
					CUR_ROW = CUR_ROW;
					curLevel = level.MENU;
					$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
				}else if (CUR_ROW == 5){
					//At the bottom, move to the footer or terms of service
					if(CUR_COL > 2){
						clearActive();
						CUR_ROW = CUR_ROW + 1;
						$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
					}else{
						clearActive();
						CUR_ROW = CUR_ROW;
						curLevel = level.MENU;
						$('.termsbtn').removeClass('hover');
						$('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
					}
				}else{
					//Move to next Postion
					if(IMAGE_MATRIX[CUR_ROW+1][CUR_COL] == null){
						//
					}else if(IMAGE_MATRIX[CUR_ROW+1][CUR_COL] == IMAGE_MATRIX[CUR_ROW][CUR_COL]){
						//Same as current. move two positions down
						clearActive();
						
						CUR_ROW = CUR_ROW + 2;
						$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
						$('.uguu').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
						var spl = IMAGE_MATRIX[CUR_ROW][CUR_COL].split("-");
						CUR_ROW = Number(spl[0]);
						CUR_COL = Number(spl[1]);
						
					}else{
						clearActive();
						CUR_ROW = CUR_ROW + 1;
						$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
						$('.uguu').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','100px solid '+$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).attr('data-wingcolor'));
						var spl = IMAGE_MATRIX[CUR_ROW][CUR_COL].split("-");
						CUR_ROW = Number(spl[0]);
						CUR_COL = Number(spl[1]);
						//console.log(IMAGE_MATRIX[CUR_ROW][CUR_COL])
						curIndex--;
					}
				}
			}
			break;
		case tvKey.KEY_ENTER:
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			if(upCount == 1){
				//window.location = "/intro/sbs/";
			}else{
				upCount = 0;
				leftCount = 0;
				rightCount = 0;
			}
			//added as ux change
			if(curLevel == level.MOSAIC){
				
			  if(IMAGE_MATRIX[CUR_ROW][CUR_COL] == "2-1"){
			  	//Open video modal
			  		window.location ="live";
			  	
			  }else if (IMAGE_MATRIX[CUR_ROW][CUR_COL] == "6-3") {
			  		var goto = $('#image_6-3 a').attr('href');
					window.location =goto;
			  }
			}	
			else if (curLevel == level.MENU) {
					var goto = $('.navbar .container ul li:eq('+MENU_POS+') a').attr('href');
					window.location =goto;
				
			} else if (curLevel = level.VIDEO) {
				//$('body').css('padding-top','48px');
					window.location = 'benefits';
				
			}else if (curLevel = level.INTROVIDEO) {
					window.location = 'benefits';
				
			}
			break;
		default:
			alert("Unhandled key");
			break;
	}
};
