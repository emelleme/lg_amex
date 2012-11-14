var widgetAPI = new Common.API.Widget();
var tvKey = new Common.API.TVKeyValue();
var nextPage = 'shop-small.html';

//Define Levels
level = {};
level.NEWS = 1;
level.MENU = 2;

MENU_POS = 0;
NEWS_POS = 3;
//Current Index
curIndex = 3;

//Current Level
curLevel = level.NEWS;

function clearActive(){
    $('.activeImage').removeClass('activeImage');
    $('.hover').removeClass('hover');
}

var Main =
{

};

Main.onLoad = function()
{
    // Enable key event processing
    this.enableKeys();
    widgetAPI.sendReadyEvent();
    $('body').css('padding-top','0px');
    $('#news_arrowleft').addClass('activeImage');
    
    $('.panelHeader').on('hover', function(e){
        //console.log($(this).children('h3'));
        $(this).children('h3').children('span').toggleClass('panelHover');
        
    });
    
    $('.navbtn').on('click', function(e){
        e.preventDefault();
        var link = $(this);      
    });
    
    $('#showcase-container').on('click',function(){
        //Clear active
        clearActive();
        //Set level to news
        curLevel = level.NEWS;
    })
    $('.arrows2, #showcase').on('hover',function(){
        //Clear active
        clearActive();
        //Set level to news
        curLevel = level.NEWS;
    });
    
    $('.panelHeader').on('click', function(e){
        var a = $(this).attr('id');
        $('.panelHeader').show();
        $('.showcaseimage').hide();
        NEWS_POS = Number(a.charAt(a.length-1));
        if(NEWS_POS == 1){
            //Hide left arrow
            $('#news_arrowleft').hide();
            $('#news_arrowright').show();
        }else if (NEWS_POS < 5) {
            //show both arrows
            $('#news_arrowleft').show();
            $('#news_arrowright').show();
        }else{
            //hide right arrow
            $('#news_arrowright').hide();
            $('#news_arrowleft').show();
        }
        $('#panel'+NEWS_POS).hide();
        $('#panel'+NEWS_POS+'_content').show();
        console.log(NEWS_POS);
        logger.keys.push("news-"+NEWS_POS+":click");
    });
    
    $('#panel3,#panel2_content, #panel4_content, #panel1_content').hide();
    $('#news_arrowleft').on('click', function(){
        slideLeft('click');
    });

    $('#news_arrowright').on('click', function(){
        slideRight('click');
    });
};

Main.onUnload = function()
{
    
};

function slideRight(keyCode){
    if($('#panel'+Number(NEWS_POS+1)+'_content').html()!=null){
        $('.panelHeader').show();
        $('#panel'+NEWS_POS).show();
        $('#panel'+NEWS_POS+'_content').hide();
        NEWS_POS = NEWS_POS+1;
        $('#panel'+NEWS_POS+'_content').show();
        $('#panel'+NEWS_POS).hide();
        if (NEWS_POS > 1) {
            //Show Left Arrow
            $('#news_arrowleft').show();
            console.log(NEWS_POS)
        };
        if($('#panel'+Number(NEWS_POS+1)+'_content').html()==null){
        $('#news_arrowright').hide();
        }
    }
    //logger.keys.push("news-"+NEWS_POS+":"+keyCode);
}

function slideLeft(keyCode){
    if(NEWS_POS > 0){
        if($('#panel'+Number(NEWS_POS-1)+'_content').html()!=null){
            $('#panel'+NEWS_POS).show();
            $('#panel'+NEWS_POS+'_content').hide();
            NEWS_POS = NEWS_POS-1;
            $('#panel'+NEWS_POS+'_content').show();
            $('#panel'+NEWS_POS).hide();
            if (NEWS_POS > 0) {
                //Show Right Arrow
                $('#news_arrowright').show();
                console.log(NEWS_POS);
            };
            if($('#panel'+Number(NEWS_POS-1)+'_content').html()==null){
            $('#news_arrowleft').hide();
            }
        }
    //logger.keys.push("news-"+NEWS_POS+":"+keyCode);
    }
}

Main.enableKeys = function()
{
    document.getElementById("anchor").focus();
};

Main.keyDown = function()
{
    var keyCode = event.keyCode;

    switch(keyCode)
    {
        case tvKey.KEY_RETURN:
        case tvKey.KEY_PANEL_RETURN:
            alert("RETURN");
            widgetAPI.sendReturnEvent();
            break;
        case tvKey.KEY_LEFT:
            if (curLevel == level.MENU) {
                if (MENU_POS > 0){
                    //Move left
                    $('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
                    MENU_POS = MENU_POS-1;
                    clearActive();
                    $('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
                    //}
                }
            }
            if (curLevel == level.NEWS) {
                $('#news_arrowleft').addClass('activeImage');
                $('#news_arrowright').removeClass('activeImage');
                setTimeout(function(){$('#news_arrowleft').removeClass('activeImage');},200);
                slideLeft('left');
            }
            
            break;
        case tvKey.KEY_RIGHT:
            alert("RIGHT");
            if (curLevel == level.MENU) {
                if (MENU_POS < 2){
                    //Move Right
                    $('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
                    MENU_POS = MENU_POS+1;
                    clearActive();
                    $('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
                    //}
                }
            }
            if (curLevel == level.NEWS) {
                $('#news_arrowright').addClass('activeImage');
                $('#news_arrowleft').removeClass('activeImage');
                setTimeout(function(){$('#news_arrowright').removeClass('activeImage');},200);
                slideRight('right');
            }
            break;
        case tvKey.KEY_UP:
            alert("UP");
            if (curLevel == level.MENU) {
                //return to matrix
                if(NEWS_POS > 4){
                    $('#news_arrowleft').show();
                }else if(NEWS_POS == 1){
                    $('#news_arrowright').show();
                }else{
                    $('#news_arrowright').show();
                    $('#news_arrowleft').show();
                }
                    $('.navbar .container ul li:eq('+MENU_POS+') a').removeClass('hover');
                    curLevel = level.NEWS;
                    clearActive();
                
            }else {
                
            }
            break;
        case tvKey.KEY_DOWN:
            alert("DOWN");
            if (curLevel == level.MENU) {
                //chill
            }
            if (curLevel == level.NEWS) {
                //On Terms, go to Menu
                curLevel = level.MENU;
                $('.arrows2').hide();
                $('.arrows2').removeClass('activeImage');
                $('.navbar .container ul li:eq('+MENU_POS+') a').addClass('hover');
            }
            break;
        case tvKey.KEY_ENTER:
        case tvKey.KEY_PANEL_ENTER:
            
            if (curLevel == level.MENU) {
                var goto = $('.navbar .container ul li:eq('+MENU_POS+') a').attr('href');
                window.location =goto;
                alert(goto);
            }
            break;
        default:
            alert("Unhandled key");
            break;
    }
}