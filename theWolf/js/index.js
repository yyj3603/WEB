$(function () {
    //游戏规则点击事件
    $(".rules").click(function () {
        $(".rule").stop().fadeIn(100);
    });
    $(".close").click(function () {
        $(".rule").stop().fadeOut(100);
    });
    //游戏开始点击事件
    $(".start").click(function () {
        $(".start").stop().fadeOut(10);
        //调用处理进度条的方法
        progressHandler();
        //调用灰太狼动画方法
        startWolfAnimation();
    });
    //重新开始点击事件
    $(".again").click(function () {
        $(".mask").stop().fadeOut(100);
        progressHandler();
        //将得分重置为0
        $(".score").text(0);
        startWolfAnimation();
    });
    var wolfTimer;
    //处理进度条的方法
    function progressHandler() {
        //重新设置进度条的宽度
        $(".progress").css({
            width:180
        });
        //创建一个定时器控制进度条
        var timmer=setInterval(function () {
            var progressWidth=$(".progress").width();
            progressWidth-=10;
            $(".progress").css({
                width:progressWidth
            });
            //监督进度条是否走完
            if(progressWidth<=0){
                //关闭计时器
                clearInterval(timmer);
                //显示重新开始界面
                $(".mask").stop().fadeIn(100);
                //停止灰太狼动画
                stopWolfAnimation();
                //进度条走完后若游戏规则还打开则自动关闭
                $(".rule").stop().fadeOut(100);

            }
        },300);
    }
    //处理灰太狼动画的方法
    function startWolfAnimation(){
        // 1.定义两个数组保存所有灰太狼和小灰灰的图片
        var wolf_1=['../img/h0.png','../img/h1.png','../img/h2.png','../img/h3.png','../img/h4.png','../img/h5.png','../img/h6.png','../img/h7.png','../img/h8.png','../img/h9.png'];
        var wolf_2=['../img/x0.png','../img/x1.png','../img/x2.png','../img/x3.png','../img/x4.png','../img/x5.png','../img/x6.png','../img/x7.png','../img/x8.png','../img/x9.png'];
        //2.定义一个数组保存所有灰太狼和小灰灰出现的位置
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];
        //3.创建一个图片
        var $wolfImage=$("<img src='' class='wolfImage'>");
        //随机获取图片位置
        var posIndex=Math.round(Math.random()*8);

        //4.设置图片显示的位置
        $wolfImage.css({
            position:"absolute",
            left:arrPos[posIndex].left,
            top:arrPos[posIndex].top
        });
        //随机获取数组类型
        var wolfType=Math.round(Math.random())==0?wolf_1:wolf_2;
        window.wolfIndex=0;
        window.wolfEnd=5;
        wolfTimer=setInterval(function () {
            if(wolfIndex>wolfEnd){
                $wolfImage.remove();
                clearInterval(wolfTimer);
                //第一次动画做完，继续做下一个动画
                startWolfAnimation();
            }
            //5.设置图片的内容
            $wolfImage.attr("src",wolfType[wolfIndex]);
            wolfIndex++;

        },150);

        //6.将图片添加到界面上
        $(".container").append($wolfImage);
        //7.调用处理游戏规则的方法
        gameRules($wolfImage);

    }
    //游戏规则处理方法
    function gameRules($wolfImage) {
        //修改图片索引

        $wolfImage.one("click",function () {
            window.wolfIndex=5;
            window.wolfEnd=9;
            //拿到当前点击图片的地址
            var $src=$(this).attr("src");
            //根据图片地址判断是灰太狼还是小灰灰
            var flag=$src.indexOf("h")>=0;//>0为灰太狼
            if(flag){
                $(".score").text(parseInt($(".score").text())+10);
            }else{
                $(".score").text(parseInt($(".score").text())-10);
            }
        })
    }
    //关闭灰太狼动画的方法
    function stopWolfAnimation() {
        $(".wolfImage").remove();
        clearInterval(wolfTimer);
    }
    /*共有九个位置 Math.random()取0-9随机数,Math.round()四舍五入
     0  * 8 = 0   == 0
     0.1* 8 = 0.8 == 1
     0.2* 8 = 1.6 == 2
     0.3* 8 = 2.4 == 2
     0.4* 8 = 3.2 == 3
     0.5* 8 = 4.0 == 4
     0.6* 8 = 4.8 == 5
     0.7* 8 = 5.6 == 6
     0.8* 8 = 6.4 == 6
     0.9* 8 = 7.2 == 7
     1* 8 =  8    == 8
     */

})