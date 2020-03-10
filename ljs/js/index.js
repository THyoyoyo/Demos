//触屏轮播图
touchBanner();
//动态设置 ul 宽度
setWidth();

// touchBanner 函数封装：
function touchBanner() {
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    var banner = $('.wjs-banner');
    banner.on('touchstart', function(e) {
        startX = e.originalEvent.targetTouches[0].clientX;


    })
    banner.on('touchmove', function(e) {
        moveX = e.originalEvent.targetTouches[0].clientX;
        distanceX = moveX - startX;
        console.log(distanceX);
    })
    banner.on('touchend', function(e) {
        if (distanceX > 0) {
            $('.carousel').carousel('prev')
        }
        if (distanceX < 0) {
            $('.carousel').carousel('next')
        }
        var startX = 0;
        var moveX = 0;
        var distanceX = 0;
    })
}
//setWidth 函数封装;
function setWidth() {
    var w = 0;
    $('.wjs-tabs li').each(function(index, ele) {
        w += $(ele).outerWidth(true);
    })
    $('.wjs-tabs').width(w);
}