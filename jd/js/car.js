var dels = document.querySelectorAll('.del');
var winBox = document.querySelector('.win-box');
var ok = document.querySelector('.ok');
var cancel = document.querySelector('.cancel');
//给垃圾桶绑定事件
dels.forEach(function(v, i) {
        v.onclick = function() {
            //添加动画
            this.children[0].classList.add('open');
            //显示模态框
            winBox.style.display = 'block';
        }
    })
    //模态框取消/确定事件
cancel.onclick = function() {
    winBox.style.display = 'none';
    document.querySelector('.open').classList.remove('open')
        // dels.forEach(function(v, i) {
        //     v.children[0].classList.remove('open');
        // })
}