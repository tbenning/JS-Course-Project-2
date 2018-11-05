//I split the app's JS files into 2 because I wanted to try out using namespaces
// I might have overdone the abstraction and used too many functions, but let me know! 

// Tyler's First Namespace 💁🏼‍
const slideApp = {};

const slideData = [
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    '7.png',
    '8.png',
    '9.png'
]

let slideIndex = 0;

slideApp.changeSlide = function(newSlideIndex){
    let slideImg = $('.currentSlide img');

    // Change the image. Check if the index is less than or greater than, and stop image from changing
    if (newSlideIndex > slideData.length - 1){
        slideIndex = slideData.length - 1;
        slideImg.attr('src', `assets/${slideData[slideIndex]}`);
        $('.slideNumber .first').text(slideIndex+1);
    }else if(newSlideIndex < 0){
        slideIndex = 0;
        $('.slideNumber .first').text(slideIndex+1);
        slideImg.attr('src', `assets/${slideData[slideIndex]}`);

    }else{
        slideImg.attr('src', `assets/${slideData[newSlideIndex]}`);
        $('.slideNumber .first').text(slideIndex+1);
    }
}

slideApp.nextSlide = function(){
    //change image to next slide in the array
    console.log("next slide");
    slideIndex += 1;
    slideApp.changeSlide(slideIndex);
}

slideApp.prevSlide = function(){
    //change image to previous slide in array
    console.log("prev slide");
    slideIndex -= 1;
    slideApp.changeSlide(slideIndex);
}

slideApp.toggleFullScreen = function(elem){
    //Got This code from here, to get the browser to go to full screen:
    //https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
    //https://stackoverflow.com/questions/7179535/set-window-to-fullscreen-real-fullscreen-f11-functionality-by-javascript
    //I copied it because it covers as many browsers as possible

    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem[0].requestFullScreen) {
            elem[0].requestFullScreen();
            $('button.fullScreen img').attr('src', `assets/fulscreen-exit.svg`);
        } else if (elem[0].mozRequestFullScreen) {
            elem[0].mozRequestFullScreen();
            $('button.fullScreen img').attr('src', `assets/fulscreen-exit.svg`);
        } else if (elem[0].webkitRequestFullScreen) {
            elem[0].webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            $('button.fullScreen img').attr('src', `assets/fulscreen-exit.svg`);
        } else if (elem[0].msRequestFullscreen) {
            elem[0].msRequestFullscreen();
            $('button.fullScreen img').attr('src', `assets/fulscreen-exit.svg`);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
            $('button.fullScreen img').attr('src', `assets/fullscreen.svg`);
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            $('button.fullScreen img').attr('src', `assets/fullscreen.svg`);
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
            $('button.fullScreen img').attr('src', `assets/fullscreen.svg`);
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
            $('button.fullScreen img').attr('src', `assets/fullscreen.svg`);
        }
    }
}

slideApp.toggleControl = function(){
    $('.slideControl').toggleClass('show')
    //if you hover over NOT the toolbar then
    
    // setTimeout(function(){
    //      $('.slideControl').removeClass('show')
    // }, 1500);
}

slideApp.listenControlBar = function(){
    //Listeners to fade in the control bar UI 
    $('#slidesContainer .currentSlide').on('click', function(){
        slideApp.toggleControl('show');
    });

    $('#slidesContainer .currentSlide').mouseover(function(){
        $('.slideControl').addClass('show');
    });
    $('#slidesContainer .currentSlide').mousemove(function(){
        //slideApp.addClass();
        console.log('move mouse');
        $('.slideControl').removeClass('show');
    });

    $('.slideControl, .slideControl button').mouseover(function(){
        $('.slideControl').addClass('show');
    })
    $('.slideControl, .slideControl button').mousemove(function(){
        $('.slideControl').addClass('show');
    });
}

slideApp.init = function(){
    console.log('init');

    //Listen for left and right 
    $('.leftButton').on('click', function(){
        slideApp.prevSlide();
    })
    $('.rightButton').on('click', function(){
        slideApp.nextSlide();
    })
    //Listen for arrow keys
    $('html').keydown(function(e){
        let keyValue = e.which;
        if (keyValue == 37){
            slideApp.prevSlide();
        }else if (keyValue == 39){
            slideApp.nextSlide();
        }
    })

    //Listen for fullscreen button
    $('button.fullScreen').on('click', function(){
        slideApp.toggleFullScreen($('#slidesContainer'));
    })    
    //optional: also listen for double click on image to open fscrn

    // Set the number of slides in slide label
    $('.slideNumber .last').text(slideData.length);

    // Listen control bar
    slideApp.listenControlBar();
}

$(function(){
    slideApp.init();
})