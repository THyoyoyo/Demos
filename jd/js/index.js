window.addEventListener('load', function() {



    //倒计时
    dowmTime();
    //头部滚动变色
    header();

    news();
    banner();

})

//倒计时
function dowmTime() {
    //指定目标时间
    var spans = document.querySelectorAll('.time span:nth-child(odd)');
    var target = new Date('2020-2-11 20:00:00');


    var timer = setInterval(function() {
        var now = new Date();
        var t = (target - now) / 1000;
        if (t <= 0) {
            clearInterval(timer);
            return;
        }
        var h = Math.floor(t / 3600); //小时
        h = h < 10 ? '0' + h : h
        var m = Math.floor(t % 3600 / 60); //分
        m = m < 10 ? '0' + m : m;
        var s = Math.floor(t % 60) //秒
        s = s < 10 ? '0' + s : s;
        spans[0].innerText = h;
        spans[1].innerText = m;
        spans[2].innerText = s;
    }, 1000)
}
//头部滚动变色
function header() {
    var head = document.querySelector('.jd-header');
    window.onscroll = function() {
        //滚动高度
        var top = window.pageYOffset;
        // 目标值
        var target = 400;
        var value = top / target;
        if (value > 1) {
            value = 1;
        }
        head.style.backgroundColor = 'rgba(222, 24, 27,' + value + ')';
    }
}

//快播模块
function news() {
    var index = 0;
    var ul = document.querySelector('.cur ul');
    var li = ul.querySelectorAll('li').length;
    setInterval(function() {
        index++;
        var y = -index * 30;
        ul.style.transition = 'all 0.1s';
        ul.style.transform = 'translateY(' + y + 'px)';
        if (index >= li - 1) {
            index = 0;
            ul.style.transition = 'none';
            ul.style.transform = 'translateY(0px)';
        }
    }, 2000)
}


//轮播图  ()
function banner() {
    var index = 1;
    var curr = 0;
    var banner = document.querySelector('.jd-banner');
    var ul = document.querySelector('.jd-banner ul');
    var ol = document.querySelector('.jd-banner ol');
    var lis = document.querySelectorAll('.jd-banner ul li');
    var ols = document.querySelectorAll('.jd-banner ol li');
    var bannerWidth = banner.offsetWidth; //父盒子宽度
    console.log(lis.length);

    // -----------------------------------------------------------------------------
    //如果是左 动态数据，这里应该先对 第一张复制 到最后插入 ，最后一张复制到第一张前插入
    // -----------------------------------------------------------------------------



    var times = setInterval(function() {
            index++; //图片的索引值
            curr++; //控制小圆点索引值
            var x = -index * bannerWidth; //根据 图片索引值 * 父盒子的宽 =应该移动距离
            ul.style.transition = 'all 0.4s'; //添加过度
            // ul 移动距离
            ul.style.transform = 'translateX(' + x + 'px)';

        },
        2000);

    // 监听事件 transitionend ：完成过度后触发
    ul.addEventListener('transitionend', function() {
        if (index >= lis.length - 1) {
            index = 1;
        }
        if (index <= 0) {
            index = lis.length - 2; // 2 是 复制 出来的两张图
        }
        ul.style.transition = 'none';
        var x = -index * bannerWidth;
        ul.style.transform = 'translateX(' + x + 'px)';
        setPoint(index - 1)
    })

    // 切换小圆点
    function setPoint(k) {
        //排他思想 删除其他 ols 的 类名
        for (var i = 0; i < ols.length; i++) {
            ols[i].classList.remove("current");
        }
        // 给当前加上 类名
        ols[k].classList.add("current");
    }

    var starX = 0;
    var moveX = 0;
    var distanceX = 0;
    // 点击时
    banner.ontouchstart = function(e) {
            clearInterval(times);
            starX = e.targetTouches[0].clientX;

        }
        // 移动中
    banner.ontouchmove = function(e) {
            moveX = e.targetTouches[0].clientX;
            distanceX = moveX - starX;
            x = -index * bannerWidth + distanceX
            ul.style.transform = 'translateX(' + x + 'px)';
        }
        //松开后
    banner.ontouchend = function(e) {
        //判断滑动方向
        if (Math.abs(distanceX) > bannerWidth / 3) {
            if (distanceX > 0) {
                index--;
                console.log('左');

            }
            if (distanceX < 0) {
                index++;
                console.log('右');
            }
        }
        var x = -index * bannerWidth
        ul.style.transition = 'all 0.4s'; //添加过度
        ul.style.transform = 'translateX(' + x + 'px)';
        starX = 0;
        moveX = 0;
        distanceX = 0;
        times = setInterval(function() {
                index++; //图片的索引值
                curr++; //控制小圆点索引值
                var x = -index * bannerWidth; //根据 图片索引值 * 父盒子的宽 =应该移动距离
                ul.style.transition = 'all 0.4s'; //添加过度
                // ul 移动距离
                ul.style.transform = 'translateX(' + x + 'px)';

            },
            2000);
    }
}