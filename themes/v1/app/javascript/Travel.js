Main.travelLoad = function(){
	Main.MENU_POS = 0;
	Main.curLevel = Main.level.MOSAIC;
	Main.CUR_ROW = 4;
	Main.CUR_COL = 1;
	Main.PREV_ROW = Main.CUR_ROW;
	Main.PREV_COL = Main.PREV_COL;
	Main.CUR_POS = 1;
	Main.clearActive();
	document.getElementById('anchor').onkeydown = Main.travelKeys; 
	$('#main-copy').hide().html($('#benefit_'+Main.CUR_ROW+'-'+Main.CUR_COL).html()).show();//Wing Color
	$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
	$('.uguu').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
	$('.ugum').css('border-top','76px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
	$('.ugum').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
	$('.uguv').css('border-top','130px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
	$('#cardsView').hide();
	$('#recipesView').hide();
	$('#videosView').hide();
	$('#termsView').hide();
	$('#travelView').show();
}

Main.travelKeys = function(event){
var keyCode = event.keyCode;
	alert("Key pressed: " + keyCode);

	switch(keyCode)
	{
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("RETURN");
			event.preventDefault();
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			alert("LEFT");
			leftCount++;

			if (Main.curLevel == Main.level.MENU) {
				if (Main.MENU_POS != 0){
					//Move left
					$('.navbar .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
					Main.MENU_POS = Main.MENU_POS-1;
					Main.clearActive();
					$('.navbar .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
				}
			}else if (Main.curLevel == Main.level.MOSAIC) {
				$('.mosaicImage').removeClass('mosaicImagehover');
				if(Main.CUR_ROW >= 6){
					//At terms
					if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL] == '6-3'){
					Main.CUR_COL = Main.CUR_COL - 1;
					Main.clearActive();
					$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
					$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
					
					//Wing Color
					$('.uguu').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','130px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					
				}
					
				}else if (Main.CUR_COL == 1) {
					//First Column
				}else if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL-1] == Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]){
					//Same as current. Move 2.
					Main.clearActive();
					Main.CUR_COL = Main.CUR_COL - 2;
					$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
					$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
					
					//Wing Color
					$('.uguu').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','130px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
						Main.CUR_ROW = Number(spl[0]);
						Main.CUR_COL = Number(spl[1]);
				}else{
					//Move to next Postion
					Main.clearActive();
					if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL-1] != null){
						Main.CUR_COL = Main.CUR_COL - 1;
						$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
						
						//Wing Color
					$('.uguu').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','130px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
						var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
						Main.CUR_ROW = Number(spl[0]);
						Main.CUR_COL = Number(spl[1]);
						curIndex--;
					}
				}
			}else if (curLevel == Main.level.GALLERY) {
				$('#news_arrowleft').addClass('activeImage');
				$('#news_arrowright').removeClass('activeImage');
				setTimeout(function(){$('#news_arrowleft').removeClass('activeImage');},200);
				slideLeft('left');
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
			if (Main.curLevel == Main.level.VIDEO) {
				$('.backbtn').addClass('hover');
			}else if (Main.curLevel == Main.level.MENU) {
				if (Main.MENU_POS < 2){
					//Move Right
					$('.navbar .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
					Main.MENU_POS = Main.MENU_POS+1;
					Main.clearActive();
					$('.navbar .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
					
				}
			}else if (Main.curLevel == Main.level.MOSAIC) {
				$('.mosaicImage').removeClass('mosaicImagehover');
				if ( Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL] == '2-1') {
					//Move to next Postion
					Main.clearActive();
					Main.CUR_COL = Main.CUR_COL + 1;
					//Set First item in footer Active
					$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
					$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
					
					//Wing Color
					$('.uguu').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','130px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
					Main.CUR_ROW = Number(spl[0]);
					Main.CUR_COL = Number(spl[1]);
					curIndex++;
				}else if (Main.CUR_COL >= 4) {
					//Do nothing
				}else if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL+1] == Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]){
					//Same as current. move two positions down
					
					if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL+2] != null){
						Main.clearActive();
						Main.CUR_COL = Main.CUR_COL + 2;
						$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
						
						//Wing Color
					$('.uguu').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','130px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
						var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
						Main.CUR_ROW = Number(spl[0]);
						Main.CUR_COL = Number(spl[1]);
					}
					
					
				}else{
					if(Main.CUR_COL+1 > Main.MAX_COL){
						// Reached the end of the row, move to next Row
						if(Main.CUR_ROW+1 > Main.MAX_ROW){
							//End of the line.
							
							
						}else{
							//Move to first position of next row
							curIndex++;
							Main.clearActive();
							Main.CUR_ROW = Main.CUR_ROW;
							Main.CUR_COL = 1;
							//Set First item in footer Active
							$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
							var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
							Main.CUR_ROW = Number(spl[0]);
							Main.CUR_COL = Number(spl[1]);
						}
					}else{
						//Move position to right
						if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL+1] == null){
							//No Image in this position. Do Nothing
							if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL+2] != null){
								//Move over two positions if its not null
								Main.clearActive();
								Main.CUR_COL = Main.CUR_COL + 2;
								$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
								$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
								
								//Wing Color
					$('.uguu').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','130px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
								var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
								Main.CUR_ROW = Number(spl[0]);
								Main.CUR_COL = Number(spl[1]);
							}
						}else if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL+1] == Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]){
							//Same as current. Move over 2

Main.clearActive();
							Main.CUR_COL = Main.CUR_COL + 2;
							$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
							$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
							
							//Wing Color
					$('.uguu').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','130px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
							var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
							Main.CUR_ROW = Number(spl[0]);
							Main.CUR_COL = Number(spl[1]);
							console.log(Main.CUR_COL);
						}else{
							//Move into position
							Main.clearActive();
							Main.CUR_COL = Main.CUR_COL+1;
							$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
							$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
							
							//Wing Color
					$('.uguu').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','130px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
							var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
							Main.CUR_ROW = Number(spl[0]);
							Main.CUR_COL = Number(spl[1]);
							
						}
					}

				} 
				
			}else if (Main.curLevel == Main.level.GALLERY) {
				$('#news_arrowright').addClass('activeImage');
				$('#news_arrowleft').removeClass('activeImage');
				setTimeout(function(){$('#news_arrowright').removeClass('activeImage');},200);
				slideRight('right');
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
			if (Main.curLevel == Main.level.MENU) {
				//return to matrix
				$('.navbar .container ul li:eq('+Main.MENU_POS+') a').removeClass('hover');
				Main.curLevel = Main.level.MOSAIC;
				Main.clearActive();
				$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
			}else {
			$('.mosaicImage').removeClass('mosaicImagehover');
				if(Main.CUR_ROW == 1){
					//At the top. Do nothing
				}else{
					if(Main.IMAGE_MATRIX[Main.CUR_ROW-1][Main.CUR_COL] == null){
						//null space. do nothing
					}else if(Main.IMAGE_MATRIX[Main.CUR_ROW-1][Main.CUR_COL] == Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]){
						//same as current. move two positions
						if(Main.CUR_ROW > 2){
							if(Main.IMAGE_MATRIX[Main.CUR_ROW-2][Main.CUR_COL] != Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]){
								Main.clearActive();
								Main.CUR_ROW = Main.CUR_ROW - 2;
								$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
								$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
								var spl = IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
								if(Main.IMAGE_MATRIX[Main.CUR_ROW-2][Main.CUR_COL] == '6-3'){
									Main.PREV_COL = Main.CUR_COL;
									Main.PREV_ROW = Main.CUR_ROW;
									
								}else{
									Main.CUR_ROW = Number(spl[0]);
									Main.CUR_COL = Number(spl[1]);
									Main.PREV_COL = Main.CUR_COL;
									Main.PREV_ROW = Main.CUR_ROW;
								}
								//console.log(IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL])
							}
						}else{
							//Move to 1-2
							Main.clearActive();
							Main.CUR_ROW = 1;
							Main.CUR_COL = 2;
							$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
							$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
							$('.uguu').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','130px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
						}
					}else{
						Main.clearActive();
						Main.CUR_ROW = Main.CUR_ROW - 1;
						$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
						$('.uguu').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','130px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
						var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
						
							Main.CUR_ROW = Number(spl[0]);
							Main.CUR_COL = Number(spl[1]);
							if(Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL] == '6-3'){
							Main.PREV_COL = Main.CUR_COL;
							Main.PREV_ROW = Main.CUR_ROW;
							
						}else{
							Main.PREV_COL = Main.CUR_COL;
							Main.PREV_ROW = Main.CUR_ROW;
						}
						//console.log(Main.CUR_ROW)
					}
				}
			}
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			if (Main.curLevel == Main.level.MENU) {
				//chill
			}else if (Main.curLevel == Main.level.MOSAIC) {
				$('.mosaicImage').removeClass('mosaicImagehover');
				if(Main.CUR_ROW == 6){
					Main.clearActive();
					Main.CUR_ROW = Main.CUR_ROW;
					Main.curLevel = Main.level.MENU;
					alert("menu");
					$('#travelNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
				}else if (Main.CUR_ROW == 5){
					//At the bottom, move to the footer or terms of service
					if(Main.CUR_COL > 2){
						Main.clearActive();
						Main.CUR_ROW = Main.CUR_ROW + 1;
						$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
					}else{
						Main.clearActive();
						Main.CUR_ROW = Main.CUR_ROW;
						Main.curLevel = Main.level.MENU;
						alert("menu");
						$('.termsbtn').removeClass('hover');
						$('#travelNav .container ul li:eq('+Main.MENU_POS+') a').addClass('hover');
					}
				}else{
					//Move to next Postion
					if(Main.IMAGE_MATRIX[Main.CUR_ROW+1][Main.CUR_COL] == null){
						//
					}else if(Main.IMAGE_MATRIX[Main.CUR_ROW+1][Main.CUR_COL] == Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]){
						//Same as current. move two positions down
						Main.clearActive();
						
						Main.CUR_ROW = Main.CUR_ROW + 2;
						$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
						$('.uguu').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','130px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
						var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
						Main.CUR_ROW = Number(spl[0]);
						Main.CUR_COL = Number(spl[1]);
						
					}else{
						Main.clearActive();
						Main.CUR_ROW = Main.CUR_ROW + 1;
						$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).addClass('activeImage');
						$('#main-copy').hide().html($('#benefit_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).html()).show();
						$('.uguu').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-top','76px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.ugum').css('border-left','100px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
					$('.uguv').css('border-top','130px solid '+$('#image_'+Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL]).attr('data-wingcolor'));
						var spl = Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL].split("-");
						Main.CUR_ROW = Number(spl[0]);
						Main.CUR_COL = Number(spl[1]);
						//console.log(IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL])
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
			if(Main.curLevel == Main.level.MOSAIC){
				if (Main.IMAGE_MATRIX[Main.CUR_ROW][Main.CUR_COL] == "6-3") {
			  		Main.prevPage = 'travel';
					Main.termsLoad();
				}	
			}else if (Main.curLevel == Main.level.MENU) {
				
				var g = $('#travelNav .container ul li:eq('+Main.MENU_POS+') a').attr('data-page');
				if(g == 'recipes'){
					Main.prevPage = 'travel';
		  			Main.recipesLoad();
				}else if(g == 'videos'){
					alert('VIDEOS!');
					Main.prevPage = 'travel';
					Main.videosLoad();
				}else if(g == 'cards'){
					Main.prevPage = 'travel';
					Main.cardsLoad();
				}
			} 
			break;
		default:
			alert("Unhandled key");
			break;
	}
};
