function lge() {
    var _this = this;
    var fullScreenMode = null;
    var leftTopPos = null;
    var containerDiv = 0;
    var containerWidth = null;
    var containerHeight = null;
    var ratioWidth = null;
    var ratioHeight = null;
    var videoPath = "";
    var video = null;
    var cntIndex = 1;
    var minPlayerHeight = 180;
    var minPlayerWidth = 320;
    var supportedMimeTypes = [".mp4", ".mpeg", ".wmv", ".asf"];
    var playTimerId = null;
    var hideTimerId = null;
    var objectFocussed = null;
    var rowID = 1;
    var dragged = false;
    var bufferWidthRatio = 0;
	var bControlsAdded=false;
    // Constructor
    this._construct = function() {
        fullScreenMode = false;
        currentIndex = 0;
    };

    // Public Function
     /*
     * Function createVideoPlayer() @param -container - div container,
     * where video will be player will be displayed. @Description - This function create VideoPlayer for the
     * given container div Returns -void
     */
    this.createVideoPlayer = function(container, controls, videoPath) {
        $(container).append('<video width=100% height=100% id="video" class="video" style="background-color:gray;"></video>');
        video = getVideo();
        containerDiv = container;
        leftTopPos = [$(containerDiv).offset().left, $(containerDiv).offset().top];
        containerWidth = $(containerDiv).width();
        containerHeight = $(containerDiv).height();
        checkPlayerDimensions();
		bControlsAdded = controls;
        if (controls) {
            addControls(container);
            key_naviObj = keyNavigation();
        }
        getSupportedVideoFiles(videoPath);
        mouseControl();
        addEventListeners();
    };

    /*
	 * Function addEventListeners() @parag-none @Description- Add event listeners
	 *  for different control buttons
	 * @returns - none
	 */
    function addEventListeners() {
        video.addEventListener("play", function() {
            triggerHide();
            getVideoPlayInfo();
            $("#playBtn > img").remove();
            $('#playBtn').append('<img src="ui/images/player_btn_icon/movie_btn_icon_pause_n.png" alt="pauseImg" class="playBtn" align="center" />');
            if ($('#progressBall').hasClass("progressBallInitial")) {
                $('#progressBall').attr('class', 'progressBall');
                $(".progressBall").css({
                    "width": ratioWidth * 71,
                    "height": ratioHeight * 44
                });
            }
        });

        /*
		 * Event: pause @Description - event is triggerd, when the video has
		 * been paused, when paused, changes the pause image to play image
		 * Returns -void
		 */
        video.addEventListener("pause", function() {
            $("#playBtn > img").remove();
            $('#playBtn').append('<img src="ui/images/player_btn_icon/movie_btn_icon_play_n.png" alt="pauseImg" class="playBtn" align="center" />');
        });
        video.addEventListener("progress", function() {
            buffering();
        });
        /*
		 * Event: ended @Description - event is trigerred, if the video has
		 * ended or not, if ended resets all the functionalties Returns -void
		 */

        video.addEventListener("ended", endPlay, false);

        /*
		 * Event: timeupdate @Description - event is triggerd, when the video's
		 * currentTime is changed, it may be due to, forward, rewind or by
		 * dragging the progressBall Returns -void
		 */
        video.addEventListener("timeupdate", function() {
            getVideoPlayInfo();
        });
    }

    /*
	 * Function endPlay() @parag-none @Description-when video ends, reset player UI
	 * @returns - none
	 */
    function endPlay() {
        video.src = " ";
        flag = false;
        resetProgress();
        $("#play > img").remove();
        $('#play').append('<img src="ui/images/player_btn_icon/movie_btn_icon_play_n.png" class="center" />');

    }
     /*
     * Function fastForward() @param - @Description - function forwards the video playback 
     * to 10 sec. Returns -void
     */
    this.fastForward = function() {
        if (video.currentTime < video.duration) {
            video.currentTime += 10;

        }
        if (video.paused) {
            // play
            video.play();
        }
        return;
    };

     /*
     * Function rewind() @param - @Description - function rewinds the video playback 
     * to 10 sec. Returns -void
     */
    this.rewind = function() {
        if (video.currentTime > 0) {
            video.currentTime -= 10;

        }
        if (video.paused) {
            // play
            video.play();
        }
        return;
    };

    /*
     * Function play() @param - @Description - This function plays & pauses 
	 the video. Returns -void
     */
    this.play = function() {
        if (video.readyState == 0) {
            loadDataSrc(true);
            video.play();
        }
        if (video.readyState == 4) {
            if (video.paused) {
                // play
                video.play();
            } else {
                // pause
                video.pause();
            }
        }
        $('#progressBall').attr('class', 'progressBall');
    };
    /*
	 * Function loadDataSrc() @param- autoplay, to start the video without
	 * clicking play button @Description- sets the source to video object
	 * Returns- none
	 */
    function loadDataSrc(auto) {
        video.src = "media/" + videoPath;
        video.type = "video/mp4";
        video.autoplay = auto;
        flag = true;
    }

     /*
     * Function stop() @param - @Description - This function stops currently
     * playing video. Returns -void
     */
    this.stop = function() {
        video.currentTime = video.duration;
        resetProgress();
    };

	/*
     * Function switchToFullScreenMode() @param - @Description - This function
     * toggles the fullscreen display. Returns -void
     */
    this.switchToFullScreenMode = function() {
        if (!fullScreenMode) {
            $(containerDiv).css({
                "position": "absolute",
                width: 1280,
                height: 720,
                });
            fullScreenMode = true;
            showControl();
            setControlButton();
        } else if (fullScreenMode) {
            $(containerDiv).css({
                "position": "absolute",
                left: leftTopPos[0],
                top: leftTopPos[1],
                width: containerWidth,
                height: containerHeight
            });
            fullScreenMode = false;
            showControl();
            setControlButton();
        }
    };

    /*
	 * Function optionMedia() @param- none @Description- opens window for
	 * settings Returns- none
	 */
    this.optionMedia = function() {
        if (window.NetCastLaunchQMENU) {
            window.NetCastLaunchQMENU();
        }
    }

    /*
	 * Function getVideoPlayInfo() @parag-none @Description- gets running
	 * video's time info @returns - none
	 */
    getVideoPlayInfo = function() {
        if (video.duration > 0) {
            $("#remainingTime").text(getTimeFromMS(video.currentTime));
            $("#totalTime").text(" / " + getTimeFromMS(video.duration));
            var pos = Math.ceil((video.currentTime / video.duration) * $(".progressBg").width());
            setPosition(pos);
        }
    };
    /*
	 * Function getTimeFromMS() @param- none @Description- to convert the
	 * millisecond in hr:min:sec formatted way Returns- none
	 */
    getTimeFromMS = function(msec) {
        var time = Math.round(msec);
        var hours = Math.floor(time / 3600);
        var mins = Math.floor((time % 3600) / 60);
        var secs = Math.floor((time % 3600) % 60);
        if (hours < 10)
            hours = "0" + hours;
        if (mins < 10)
            mins = "0" + mins;
        if (secs < 10)
            secs = "0" + secs;
        return hours + ":" + mins + ":" + secs;
    };
    /*
	 * Function setPosition() @param - position @Description - to show the
	 * running video progress, it keeps track of progress status bar & progress
	 * ball as video runs. Returns -void
	 */
    function setPosition(position) {
        $("#progressBarStatus").addClass("progress progressBarStatus");
        $("#progressBarStatus").css("width", position + 'px');
        if (rowID == 2) {
            $('#progressBall').css("left", position - 14 * ratioWidth + 'px');
        } else {
            $('#progressBall').css("left", position + 'px');
        }
    }
    /*
	 * Function buffering() @param - none @Description - It implements the
	 * buffering of the video. As video buffers, the progress bar will gradually
	 * increases with light pink color, showing the buffering progress Returns
	 * -void
	 */
    buffering = function() {
        if (video) {
            var bufferPos = Math.ceil((video.buffered.end(0) / video.duration) * $(".progressBg").width());
            var notNaN = isNaN(bufferPos);
            if (!notNaN) {
                setBufferPosition(bufferPos);
            }
        }
    };
    /*
	 * Function setBufferPosition() @param - position @Description - to show the
	 * buffering progress Returns -void
	 */
    function setBufferPosition(position) {
        $("#progressBuffer").addClass("progress progressBuffer");
        $("#progressBuffer").css("width", position + 'px');
        bufferWidthRatio = position / $(".progressBg").width();
    }

    /*
	 * Function setControlButton() @param - @Description - This function
	 * positions control buttons. Returns -void
	 */
    setControlButton = function() {
        var controlBtnleft = $(containerDiv).width();
        $(".playerBottom").css({
            "position": "absolute",
            width: $(containerDiv).width() * .99,
            height: $(containerDiv).height() * .24,
            top: $(containerDiv).height() - $(".playerBottom").height(),
            "border": "none",
            "margin": "auto",
            "display": "block",
            });
        $(".playerBottom").css({
            top: $(containerDiv).height() - $(".playerBottom").height(),
            left: ($(containerDiv).width() - $(".playerBottom").width()) / 2
        });
        $(".playerButtonLayout").css({
            width: $(containerDiv).width() * .975,
            "border": "none",
            "margin": "auto",
            "text-align": "center",
            "display": "block"
        });
        $(".progressBarLayout").css({
            "position": "absolute",
            left: controlBtnleft * .015,
            "border": "none",
            "margin": "auto",
            "padding": "0px",
            "text-align": "center",
            "display": "block"
        });
        $(".progressBar").css({
            "position": "absolute",
            left: controlBtnleft * .015,
            width: $(".progressBarLayout").width(),
            height: $(".progressBarLayout").height() * .63,
            "border": "none",
            "margin": "auto",
            "padding": "0px",
            "text-align": "center",
            "display": "block"
        });
        $(".progress").css({
            "position": "absolute",
            height: $(".progressBar").height() * .10,
            top: ($(".progress").parent().height()) * .85,
            "border": "none",
            "margin": "auto",
            "padding": "0px",
            "text-align": "center",
            "display": "block"
        });
        $(".progressBarClick").css({
            width: $(".progressBg").width(),
            height: "35%",
            top: ($(".progress").parent().height()) * .65,
            });
        $(".runningMovieInfo").css({
            "position": "absolute",
            left: controlBtnleft * .015,
            width: $(".progressBarLayout").width(),
            height: $(".progressBarLayout").height() * .37,
            top: $(".progressBar").height(),
            "border": "none",
            "margin": "auto",
            "padding": "0px",
            "text-align": "center",
            "display": "block"
        });
        $(".runningMovieName").css({
            "font-size": ($(".runningMovieName").height()) * .95 + "px"
        });
        $(".runningTime").css({
            "width": "16%",
            "height": $(".progressBar").height() / 2,
            "margin-top": $(".progressBar").height() / 2,
            "margin-left": $(".progressBar").height() - 10,
            "margin-right": "3%",
            "float": "right",
            "text-align": "right",
            "display": "block"
        });
        $(".runningTime").css({
            "font-size": ($(".runningTime").height()) * .90 + "px"
        });
        $("#lgImg_control").css({
            "position": "absolute",
            top: ($("#lgImg_control").parent().height()) * .595,
            left: controlBtnleft * .0135,
            "border": "none",
            "margin": "0px",
            "padding": "0px",
            "text-align": "center",
            "display": "block"
        });
        ratioWidth = ($(containerDiv).width() / 1280);
        ratioHeight = ($(containerDiv).height() / 720);
        if (rowID == 2) {
            $('#progressBall').css("width", ratioWidth * 104);
            $('#progressBall').css("height", ratioHeight * 60);
        } else {
            $('#progressBall').css("width", ratioWidth * 71);
            $('#progressBall').css("height", ratioHeight * 60);
        }
        if (bufferWidthRatio != 0) {
            $("#progressBuffer").css("width", bufferWidthRatio * $(".progressBg").width());
        }
        if ((containerWidth == 1280) && (containerHeight == 720)) {
            $("#switchToFullScreenMode").css("display", "none");
            $("#option").css("display", "block");
            $("#lgImg_control").children().each(function(i) {
                $(this).css({
                    "width": "20%"
                });
            });
        }
        clearTimeout(playTimerId);
        getVideoPlayInfo();
    };

    /*
	 * Function addControls() @param -container- div container @Description -
	 * it will add all the control buttons and their handlers method. Returns
	 * -void
	 */

    addControls = function(container) {
        $(container).append('<div class="playerBottom">' + '<div class="playerButtonLayout">' + '<div class="progressBarLayout">' + '<div class="progressBar">' + '<div id="progressBg" class="progress progressBg"></div>' + '<div id="progressBuffer" class="progress progressBuffer" ></div>' + '<div id="progressBarStatus" class="progress progressBarStatus"></div>' + '<div id="progressBarClick" class="progress progressBarClick"></div>' + '<div class="runningTime"> <span id="remainingTime"></span> <span id="totalTime" ></span> </div>' + '</div>' + '<div class="runningMovieInfo">' + '<div class="runningMovieName"> </div>' + '</div>' + '</div>' + '<div id="lgImg_control">' + '<div id="stop" class="ctrlButtonNormalLeft"><div class="bottomControlBtn" align="center" ><img src="ui/images/player_btn_icon/movie_btn_icon_stop_n.png" alt="stopImg" class="stopBtn"/></div></div>' + '<div id="play" class="ctrlButtonNormal"><div id="playBtn" class="bottomControlBtn" align="center" ><img src="ui/images/player_btn_icon/movie_btn_icon_play_n.png" alt="playImg"  class="playBtn" align="center" /></div></div>' + '<div id="rewind" class="ctrlButtonNormal"><div class="bottomControlBtn" align="center"><img src="ui/images/player_btn_icon/movie_btn_icon_rewind_n.png" alt="rewindImg" class="rewindBtn"/></div></div>' + '<div id="forward" class="ctrlButtonNormal"><div class="bottomControlBtn" align="center"><img src="ui/images/player_btn_icon/movie_btn_icon_forward_n.png" alt="forwardImg" class="forwardBtn"/></div></div>' + '<div id="switchToFullScreenMode" class="ctrlButtonNormal"><div class="bottomControlBtn" align="center"><img src="ui/images/player_btn_icon/movie_btn_icon_chapter_n.png" alt="screenImg" class="switchToFullScreenModeBtn"/></div></div>' + '<div id="option" class="ctrlButtonNormal"><div class="bottomControlBtn" align="center"><img src="ui/images/player_btn_icon/movie_btn_icon_option_n.png" alt="optionImg" class="optionBtn"/></div></div>' + '</div>' + '</div>' + ' <div id="ballCoverage"><div id="progressBall" class="progressBallInitial" > </div></div>' + '</div>');
        $("#lgImg_control").children().each(function(i) {
            switch ($(this).attr("id")) {
            case "stop":
                addEventHandler(this, "click", function() {
                    _this.stop();
                });
                break;
            case "play":
                addEventHandler(this, "click", function() {
                    _this.play();
                });
                break;
            case "forward":
                addEventHandler(this, "click", function() {
                    _this.fastForward();
                });
                break;
            case "rewind":
                addEventHandler(this, "click", function() {
                    _this.rewind();
                });
                break;
            case "switchToFullScreenMode":
                addEventHandler(this, "click", function() {
                    _this.switchToFullScreenMode();
                });
                break;
            case "option":
                addEventHandler(this, "click", function() {
                    _this.optionMedia();
                });

                break;
            }
        });
        setControlButton();
    };

    /*
	 * Function addEventHandler() @param -elem- control button element @param
	 * -eventType-type of event @param -handler- event handler method
	 * @Description - it will call event handler method. Returns -void
	 */

    addEventHandler = function(elem, eventType, handler) {
        if (elem.addEventListener)
            elem.addEventListener(eventType, handler, false);
        else if (elem.attachEvent)
            elem.attachEvent('on' + eventType, handler);
    };

    /*
	 * Function toast() @param -msg-the message shows to user @Description - it
	 * will inform user about functionalities and error by message. Returns
	 * -void
	 */

    toast = function(msg) {
        var container = containerDiv;
        var maxW = $(container).width();
        var maxH = $(container).height();
        var msgW = 0.2 * maxW;
        var msgH = 0.2 * maxH;
        $("<div>" + msg + "</div>").css({
            "display": "block",
            "width": msgW,
            "heigth": msgH,
            "opacity": 0.86,
            "border-radius": "10px",
            "top": (maxH / 2) - (msgH / 2),
            "left": (maxW / 2) - (msgW / 2),
            "overflow": "hidden",
            "position": "absolute",
            "background-color": "#111",
            "z-index": "auto",
            "text-align": "center",
            "color": "#EEE",
            "border": "#BBB 1px solid"
        }).appendTo(container).delay(1500).fadeOut(400, function() {
            $(this).remove();
        });
    };
    /*
	 * Function showControl() @param -str-the slideShow mode is activated or not
	 * @Description - it will show and hide cotrol buttons based on the
	 * slideshow status. Returns -void
	 */
    showControl = function() {
        if (fullScreenMode) {
            $("#option").css("display", "block");
            $("#lgImg_control").children().each(function(i) {
                $(this).css({
                    "width": "16.66%"
                });
            });
        } else {
            $("#option").css("display", "none");
            $("#lgImg_control").children().each(function(i) {
                $(this).css({
                    "width": "20%"
                });
            });
        }
    };
    mouseControl = function() {
        /*
		 * on mouseenter of progressBall class, change to progressBallHover
		 * class
		 */
        $("#progressBall").on("mouseenter", 
function(event) {
            if (video.currentTime > 0 && video.paused || video.play) {
                resetFocus();
                $(this).toggleClass("progressBallHover");
                $(".progressBallHover").css({
                    "width": ratioWidth * 104,
                    "height": ratioHeight * 60
                });
                rowID = 2;
                /*
						 * to drag progressBall using mouse & update the video's
						 * currentTime depending upon position of mouse
						 */
                $(".progressBallHover").draggable({
                    axis: 'x',
                    disabled: false,
                    containment: '#ballCoverage',
                    start: function(event, ui) {
                        dragged = true;
                    },
                    stop: function(event, ui) {
                        var xmove = ui.position.left;
                        video.currentTime = (xmove / $(".progressBg").width()) * video.duration;
                        video.paused ? _this.play() : "";
                    }
                });
            }
        });
        $("#progressBall").on("mouseleave", function(event) {
            $(".progressBallHover").draggable("disable");
        });
        /*
		 * on clicking on progressBar, progressBall moves & video plays from
		 * where progressBall will be pointing
		 */
        $("#progressBarClick").on("click", 
function(e) {
            if (!video.paused) {
                var xmove = e.pageX - $(this).offset().left;
                video.currentTime = (xmove / $(".progressBg").width()) * video.duration;
            }
        });
    };
    /*
	 * Function getVideo() @param- none @Description- gets the object of video
	 * Returns- video object
	 */
    getVideo = function() {
        return document.getElementById('video');
    };

    checkPlayerDimensions = function() {
        // check if player dimensions are not less than minimum height and width
        if ((containerWidth < minPlayerWidth) || (containerHeight < minPlayerHeight)) {
            $(containerDiv).css({
                height: minPlayerHeight,
                width: minPlayerWidth
            });
            return;
        }
        var t = containerWidth / 16;
        if (containerHeight != (t * 9)) {
            $(containerDiv).css('height', (t * 9));
        }
        containerHeight = $(containerDiv).height();
    };
    checkFileExtensions = function(url) {
        // .mp4, .mpeg, .wmv, .asf
        for (var i = 0; i < supportedMimeTypes.length; i++) {
            if (url.lastIndexOf(supportedMimeTypes[i]) > 0) {
                return true;
            }
        }
        return false;
    };
    getSupportedVideoFiles = function(vidPath) {
        videoPath = vidPath;
        checkFileExtensions(videoPath) ? _this.play() : toast("Video File not Supported");
    };
    keyNavigation = function() {
        var allMenuObject = new Array();
        // on mousemove, show player controls
        $(containerDiv).on("mousemove", function(event) {
            showPlayer();
            triggerHide();
        });
        $("#lgImg_control").children().each(function(i) {
            allMenuObject.push($(this));
        });
        $(allMenuObject[1]).toggleClass("ctrlButtonHover");
        objectFocussed = allMenuObject[1];
        // on mouseenter change the button color using classes of each control
        // button respectively
        $("#lgImg_control").children().each(function(i) {
            $(this).on("mouseenter", function(event) {
                resetFocus();
                $(this).toggleClass("ctrlButtonHover");
                rowID = 1;
                cntIndex = i;
                objectFocussed = allMenuObject[i];
            });
        });
        $(document).keydown(function(event) {
            showPlayer();
            triggerHide();
            var key = event.keycode || event.which;
            switch (key) {
            case VK_RIGHT:
                setFocus(1)
                    break;
            case VK_LEFT:
                setFocus( - 1)
                    break;
            case VK_UP:
                if (rowID < 2) {
                    rowID++;
                }
                setFocus(0);
                break;
            case VK_DOWN:
                if (rowID > 1) {
                    rowID--;
                }
                setFocus(0);
                break;
            case VK_ENTER:
                buttonClicked();
                break;
            }
        });

        /*
		 * Function setFocus() @param -button index @Description - This changes
		 * the color of the button from normal to focus (mouse over or remote
		 * keynavigation) Returns -void
		 */
        setFocus = function(idx) {
            if (rowID == 1) {
                if (allMenuObject[cntIndex + idx] != undefined && allMenuObject[cntIndex + idx].is(':visible')) {
                    resetFocus();
                    cntIndex = cntIndex + idx;
                    $(allMenuObject[cntIndex]).addClass("ctrlButtonHover");
                    // "viewButtonHover");
                    objectFocussed = allMenuObject[cntIndex];
                }
            } else if (rowID == 2) {
                if (idx != 0) {
                    idx == 1 ? _this.fastForward() : _this.rewind();
                } else {
                    resetFocus();
                    $("#progressBall").addClass("progressBallHover");
                    $(".progressBallHover").css({
                        "width": ratioWidth * 104,
                        "height": ratioHeight * 60
                    });
                }
            }
        };
        /*
		 * Function buttonClicked() @param -chnlNo-the current selected HTML
		 * object @Description - This function implements the on Enter function
		 * of remote. Returns -void
		 */
        buttonClicked = function() {
            if (rowID != 2) {
                var buttonId = $(objectFocussed).attr("id");
                var event = document.createEvent("MouseEvent");
                event.initEvent("click", true, true);
                document.getElementById(buttonId).dispatchEvent(event);
            }
        };
    };
    /*
	 * Function resetFocus() @param - none @Description - This changes the color
	 * of the button from focus to noramal (mouse over or remote keynavigation)
	 * Returns -void
	 */
    resetFocus = function() {
        $("#lgImg_control").children().each(function(i) {
            $(this).removeClass("ctrlButtonHover");
        });
        $(this).toggleClass("progressBallHover");
        $(".progressBallHover").css({
            "width": ratioWidth * 71,
            "height": ratioHeight * 44
        });
        $(".progressBallHover").is(".ui-draggable") ? $('.progressBallHover').draggable("disable") : "";
        $("#progressBall").removeClass("progressBallHover");
    };

    /*
	 * Function resetProgress() @param- none @Description- resets all the
	 * functionalities, when video is stopped or video is finished Returns- none
	 */
    resetProgress = function() {
		if(bControlsAdded){
			clearTimeout(playTimerId);
			clearTimeout(hideTimerId);
			$("#progressBarStatus").css("width", '0px');
			$('#progressBall').attr('class', 'progressBallInitial');
			if (dragged) {
				$('.progressBallInitial').draggable("disable");
			}
			dragged = false;
			$('#progressBall').css("left", '5px');
			$("#progressBuffer").css("width", '0px');
			$("#playBtn > img").remove();
			$('#playBtn').append('<img src="ui/images/player_btn_icon/movie_btn_icon_play_n.png" alt="playImg" class="playBtn" align="center" />');
			$("#remainingTime").text("");
			$("#totalTime").text("");
			$(".runningMovieName").text("");
			resetFocus();
			cntIndex = 1;
			rowID = 1;
			objectFocussed = $('#play');
			$('#play').toggleClass("ctrlButtonHover");
		}
    };

    /*
	 * Function triggerHide() @param -none @Description - This triggers the hide
	 * function in 5 seconds Returns -void
	 */
    function triggerHide() {
        if (video.currentTime > 0) {
            clearTimeout(hideTimerId);
            hideTimerId = setTimeout("hidePlayer()", 5000);
        }
    }
    /*
	 * Function hidePlayer() @param -none @Description - function to hide the
	 * player controls Returns -void
	 */
    hidePlayer = function() {
        $(".playerBottom").hide(100);
    };

    /*
	 * Function showPlayer() @param -none @Description - function to show the
	 * player controls Returns -void
	 */
    showPlayer = function() {
        $(".playerBottom").show();
    };

    // Constructor invoke
    this._construct();

}