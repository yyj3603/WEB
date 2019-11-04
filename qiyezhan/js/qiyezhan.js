$(document).ready(function () {
   //获取api新闻图片和文本
   axios.get('https://5dbd26ee30411e0014f2732e.mockapi.io/news')
   .then(function (res) {
       /*如果成功进入.then*/
       console.log('data', res.data[0].url);
       //循环res.data的数据将每一条数据存入#goods里
       for (var i = 0; i < res.data.length; i++) {
           console.log(res.data[i]);
           $('#new').append("<li class='new'>" +"<img src='" + res.data[i].url +"'><p class='new_title'>"+res.data[i].tit+"</p><p class='new_content'>"+res.data[i].cont+"</p></li>");

              
       }
      
   }).catch(function (res) {
       console.log('error', err);
   })
    //每个固定时间移动图片
    var timer = setInterval(picLoop, 1000);
    var index = 0;

    function picLoop() {
        index++;
        if (index == 5) {
            index = 0
        }
        $('#imgList').animate({
            "left": -1519 * index
        }, 300);
        $('.navDiv a').eq(index).css("background-color", "#262626").siblings().css("background-color",
            "rgba(100,100,100,0.3)");
    }
    //定时器的控制
    //移入图片区显示左右>和<
    $("#imgList").hover(function () {
        clearInterval(timer);
        $(".left").show();
        $(".right").show();
    }, function () {
        timer = setInterval(picLoop, 1000);
        $(".left").hide();
        $(".right").hide();
    })
    //此处改为鼠标点击再切换
    $('.navDiv a').mouseover(function () {
        clearInterval(timer);
        $(this).css("background-color", "#262626").siblings().css("background-color",
            "rgba(100,100,100,0.3)");
        index = $(this).index();
        $('#imgList').animate({
            "left": -1519 * index
        }, 300);
    })
    $('.navDiv a').mouseout(function () {
        timer = setInterval(picLoop, 1000);
    })
    $(".left").mouseover(function () {
        clearInterval(timer);
        $(".left").show();
        $(".right").show();
    });

    $(".left").click(function () {
        index--;
        if (index == -1) {
            index = 4;
        }
        $("#imgList").animate({
            "left": -1519 * index
        }, 300);
        $('.navDiv a').eq(index).css("background-color", "#262626")
            .siblings().css("background-color", "rgba(100,100,100,0.3)");
    })
    $(".right").mouseover(function () {
        clearInterval(timer);
        $(".left").show();
        $(".right").show();
    })
    $(".right").click(function () {
        index++;
        if (index == 5) {
            index = 0
        }
        $("#imgList").animate({
            "left": -1519 * index
        }, 300);
        $('.navDiv a').eq(index).css("background-color", "#262626")
            .siblings().css("background-color", "rgba(100,100,100,0.3)");
    })
})