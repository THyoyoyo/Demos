window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var upbtn = document.querySelector('.upbtn');
    var downbtn = document.querySelector('.downbtn');
    var ul = document.querySelector('ul');
    //鼠标进过显示按钮
    focus.addEventListener('mouseenter', function() {
            upbtn.style.display = 'block';
            downbtn.style.display = 'block';
            //清除自动动画
            clearInterval(time);
            time = null;
        })
        //鼠标移除隐藏按钮
    focus.addEventListener('mouseleave', function() {
            upbtn.style.display = 'none';
            downbtn.style.display = 'none';
            //启动自动动画
            time = setInterval(function() {
                downbtn.click();
            }, 2000)
        })
        //创建动态小圆点
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    //获取focus宽度
    var focusWidth = focus.offsetWidth;
    //  此循环是控制小圆点
    for (var i = 0; i < ul.children.length; i++) {
        //创建元素 li
        var li = document.createElement('li');
        //给每个li创建 index属性
        li.setAttribute('index', i)
            //在ol插入元素li
        ol.appendChild(li);
        //绑定 li点击事件
        li.addEventListener('click', function() {
            //先清除小圆点的 背景色 类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //给点击当前的 小圆点添加 背景色 类名
            this.className = 'bj';
            //获取index值
            var index = this.getAttribute('index');
            num = index;
            nmu = circle;
            //给小圆点添加动画函数
            animate(ul, -index * focusWidth)
        })
    }
    //给第一个圆点设置背景类
    ol.children[0].className = 'bj';
    //克隆第一张图片
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);



    //右侧按钮事件
    var num = 0; //图片
    var circle = 0; //圆点
    downbtn.addEventListener('click', function() {
        //判断 num值 是否 是 ul最大值 ， 
        if (num == ul.children.length - 1) {
            //如果到达则，left 返回到 第一张图
            ul.style.left = 0;
            //num重新赋值0
            num = 0;
        }
        // 点击一次 num +1
        num++;
        // 执行动画   动画移动距离= num值 * focus盒子的宽度
        animate(ul, -num * focusWidth);
        // 记录圆点值+1
        circle++;
        // 判断 圆点值是否到达最大值
        if (circle == ol.children.length - 1) {
            // 如果达到就 重新赋值0
            circle = 0
        }
        //先清除小圆点的 背景色 类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 给circle值的 圆点添加背景类
        ol.children[circle].className = 'bj';

    })

    //左键按钮事件        ----判断条件跟右键相反么，赋值也是
    upbtn.addEventListener('click', function() {
        // 判断是否是第一张图
        if (num == 0) {
            // 如果是则移动到最后一张图
            ul.style.left = (ul.children.length - 1) * focusWidth + 'px';
            // num值 赋值最大值
            num = ul.children.length - 1;
        }
        // 点击一次 num -1
        num--;
        // 执行动画   动画移动距离= num值 * focus盒子的宽度
        animate(ul, -num * focusWidth);
        // 记录圆点值-1
        circle--;
        // 判断 circle值是否比 0 小 
        if (circle < 0) {
            // 如果是则 赋值 最大
            circle = ol.children.length - 1;
        }
        //先清除小圆点的 背景色 类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 给circle值的 圆点添加背景类
        ol.children[circle].className = 'bj';

    })

    //    自动播放
    var time = setInterval(function() {
        downbtn.click();
    }, 2000)















})