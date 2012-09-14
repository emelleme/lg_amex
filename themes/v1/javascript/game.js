var dataCount = sampleArray.length;
var fCnt = 0;
function goBack()
  {
  window.history.back()
  }
//Define Levels
level = {};
level.MOSAIC = 1;
level.MAIN_COPY = 2;
level.FOOTER = 3;

MENU_MATRIX = {
	1: "1,2,3,4"
	}
//Define each Image Position within matrix
IMAGE_MATRIX = {
	1: {
		1: "2-1",
		2: "1-2",
		3: null,
		4: null
	},
	2: {
		1: "2-1",
		2: "1-2",
		3: "1-2",
		4: null
	},
	3: {
		1: "2-1",
		2: "3-2",
		3: "3-3",
		4: null
	},
	4: {
		1: "4-1",
		2: "4-1",
		3: "3-3",
		4: "3-3"
	},
	5: {
		1: "5-1",
		2: "5-2",
		3: "5-3",
		4: "5-4"
	},
	6: {
		1:"5-1",
		2: "5-2",
		3:"termsconditions",
		4:"termsconditions"
	}
}

FOOTER_MATRIX = {
		1: "playgame",
		2: "newsoffers",
		3: "findacard",
		4: "exit"
}

START_IMAGE = 2;
CUR_ROW = 2;
CUR_COL = 1;
MAX_ROW = 4;
MAX_COL = 4;
MENU_POS = 1;
//Current Index
curIndex = 1;

//Current Level
curLevel = level.MENU;
$(document).ready(function() {

	$('.backButton').on('click', function(e){
		window.history.back();
		return false;
	});
	$('.mosaicImage').on('click',function(e){
		if(!$(this).hasClass('activeImage')){
			var t = $(this).attr('id').replace('image_', 'benefit_');
			$('#main-copy').hide().html($('#'+t).html()).show();
			//Set active.
			clearActive();
			$(this).addClass('activeImage');
			//Active Image Matrix
			var n=$(this).attr('id').split("_");
			var pos = n[1].split("-")
			CUR_ROW = Number(pos[0]);

			CUR_COL = Number(pos[1]);
			//console.log(CUR_COL);

			
		}

	})
});
function homeInit() {
	//Start by setting the Start Image as active
	$('#footer_'+FOOTER_MATRIX[MENU_POS]).addClass('activeImage');

	//
}

function clearActive(){
	$('.activeImage').removeClass('activeImage');
}

function keyDown(event) {
	//alert(event.keyCode);
	switch (event.keyCode) {
		case VK_LEFT:
		{
			if (curLevel == level.MENU) {
				if (MENU_POS != 1){
					//Move Right
					MENU_POS = MENU_POS-1;
					clearActive();
					$('#footer_'+FOOTER_MATRIX[MENU_POS]).addClass('activeImage');
				}
			}

			if (curLevel == level.MOSAIC) {
				if(CUR_ROW >= 6){
					//At terms
					CUR_COL = CUR_COL - 1;
					CUR_ROW = CUR_ROW - 1;
					clearActive();
					$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
					$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
						console.log(IMAGE_MATRIX[CUR_ROW][CUR_COL])
					
				}else if(IMAGE_MATRIX[CUR_ROW][CUR_COL-1] == IMAGE_MATRIX[CUR_ROW][CUR_COL]){
					//Same as current. Move 2.
					clearActive();
					CUR_COL = CUR_COL - 2;
					$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
					$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
					console.log(IMAGE_MATRIX[CUR_ROW][CUR_COL])
				}else{
					//Move to next Postion
					clearActive();
					if(IMAGE_MATRIX[CUR_ROW][CUR_COL-1] != null){
						CUR_COL = CUR_COL - 1;
						$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
						console.log(IMAGE_MATRIX[CUR_ROW][CUR_COL])
						curIndex--;
					}
				}
			}
			break;
		}
		case VK_RIGHT:
		{
			if (curLevel == level.MENU) {
				if (MENU_POS < 4){
					//Move Right
					MENU_POS = MENU_POS+1;
					clearActive();
					$('#footer_'+FOOTER_MATRIX[MENU_POS]).addClass('activeImage');
					console.log(MENU_POS);
				}
			}
			if (curLevel == level.MOSAIC) {
				if ( IMAGE_MATRIX[CUR_ROW][CUR_COL] == '2-1') {
					//Move to next Postion
					clearActive();
					CUR_COL = CUR_COL + 1;
					//Set First item in footer Active
					$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
					$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
					console.log(IMAGE_MATRIX[CUR_ROW][CUR_COL])
					curIndex++;
				}else if(IMAGE_MATRIX[CUR_ROW][CUR_COL+1] == IMAGE_MATRIX[CUR_ROW][CUR_COL]){
					//Same as current. move two positions down
					
					console.log(IMAGE_MATRIX[CUR_ROW][CUR_COL+2])
					if(IMAGE_MATRIX[CUR_ROW][CUR_COL+2] != null){
						clearActive();
						CUR_COL = CUR_COL + 2;
						$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
					}
					
					
				}else{
					if(CUR_COL+1 > MAX_COL){
						// Reached the end of the row, move to next Row
						if(CUR_ROW+1 > MAX_ROW){
							//End of the line.
							
							console.log(IMAGE_MATRIX[CUR_ROW][CUR_COL])
						}else{
							//Move to first position of next row
							curIndex++;
							clearActive();
							CUR_ROW = CUR_ROW+1;
							CUR_COL = 1;
							//Set First item in footer Active
							$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
							console.log(IMAGE_MATRIX[CUR_ROW][CUR_COL])
						}
					}else{
						//Move position to right
						if(IMAGE_MATRIX[CUR_ROW][CUR_COL+1] == null){
							//No Image in this position. Do Nothing
							if(IMAGE_MATRIX[CUR_ROW][CUR_COL+2] != null){
								//Move over two positions if its not null
								clearActive();
								console.log(IMAGE_MATRIX[4][CUR_COL])
								CUR_COL = CUR_COL + 2;
								$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
								$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
							}
						}else if(IMAGE_MATRIX[CUR_ROW][CUR_COL+1] == IMAGE_MATRIX[CUR_ROW][CUR_COL]){
							//Same as current. Move over 2
							console.log(IMAGE_MATRIX[CUR_ROW][CUR_COL+1])
							clearActive();
							CUR_COL = CUR_COL + 2;
							$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
							$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
						}else{
							//Move into position
							console.log(IMAGE_MATRIX[CUR_ROW][CUR_COL+1])
							clearActive();
							CUR_COL = CUR_COL+1;
							$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
							$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
						}
					}

				} 
				
			}
			break;
		}
		case VK_DOWN:
		{
			if (curLevel == level.MENU) {
				//chill
			}
			if (curLevel == level.MOSAIC) {
				if(CUR_ROW == 6){
					clearActive();
					CUR_ROW = CUR_ROW;
					curLevel = level.MENU;
					$('#footer_'+FOOTER_MATRIX[MENU_POS]).addClass('activeImage');
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
						$('#footer_'+FOOTER_MATRIX[MENU_POS]).addClass('activeImage');
						//console.log(FOOTER_MATRIX[MENU_POS]);
					}
				}else{
					//Move to next Postion
					console.log(CUR_ROW);
					if(IMAGE_MATRIX[CUR_ROW+1][CUR_COL] == null){
						//
					}else if(IMAGE_MATRIX[CUR_ROW+1][CUR_COL] == IMAGE_MATRIX[CUR_ROW][CUR_COL]){
						//Same as current. move two positions down
						clearActive();
						
						CUR_ROW = CUR_ROW + 2;
						$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
						console.log(IMAGE_MATRIX[CUR_ROW][CUR_COL])
						
					}else{
						clearActive();
						CUR_ROW = CUR_ROW + 1;
						$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
						//console.log(IMAGE_MATRIX[CUR_ROW][CUR_COL])
						console.log(IMAGE_MATRIX[CUR_ROW][CUR_COL])
						curIndex--;
					}
				}
			}
			break;
		}
		case VK_UP:
		{
			if (curLevel == level.MENU) {
				//return to matrix
				//curLevel = level.MOSAIC;
				//clearActive();
				//$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
			}else {
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
								console.log(IMAGE_MATRIX[CUR_ROW][CUR_COL])
							}
						}
					}else{
						clearActive();
						CUR_ROW = CUR_ROW - 1;
						$('#image_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+IMAGE_MATRIX[CUR_ROW][CUR_COL]).html()).show();
						//console.log(IMAGE_MATRIX[CUR_ROW][CUR_COL])
						console.log(IMAGE_MATRIX[CUR_ROW][CUR_COL])
					}
				}
			}
			break;
		}
		case VK_ENTER:
		{
			//added as ux change
			if(curLevel == level.BOTTOM_BUTTON){
			  if(window.NetCastBack){window.NetCastBack();}
			}
			else if (curLevel != level.MENU) {
				viewOrgImage();
			} else {
				var playIndex = -1;
				if (curFocus == 'play_now') {
					playIndex = 0;
				} else {
					playIndex = curIndex; 
				}
				if (playIndex != -1) {
					viewOrgImage(playIndex);
				}
			}
			break;
		}
		case VK_INFO:		
			window.location.reload();		
			break;

		case VK_0:		
			window.location.reload();		
			break;
		//add
		case VK_BACK:
		  if(window.NetCastBack){window.NetCastBack();}
		break;
	}
}