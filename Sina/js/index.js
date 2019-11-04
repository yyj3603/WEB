$(function () {
    /**
     * delegate() 方法为指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序，并规定当这些事件发生时运行的函数。
     */
    //监听内容实时输入（事件委托）
    $("body").delegate(".comment","propertychange input",function () {
        //判断是否输入内容
        if($(this).val().length>0){
            //让按钮可用（操作属性节点disabled）
            $(".send").prop("disabled",false);
        }else{
            //让按钮不可用
            $(".send").prop("disabled",true);
        }
    });
    //监听发布按钮的点击
    $(".send").click(function () {
        //获取微博内容
        $weibo=$(".comment").val();
        //添加节点
        $(".messageList").prepend(createEle($weibo));
        console.log($(".infoHandle>a").html()+1);

    });
    //监听顶点击
    $("body").delegate(".infoTop","click",function () {
        $(this).text(parseInt($(this).text())+1);
    });
    //监听踩点击
    $("body").delegate(".infoDown","click",function () {
        $(this).text(parseInt($(this).text())+1);
    });
    //监听删除点击
    $("body").delegate(".infoDel","click",function () {
        $(this).parents(".info").remove();
    });
    //创建节点方法
    function createEle(text) {
        var $weibo=$(" <div class=\"info\">\n" +
            "            <p class=\"infoText\">"+text+"</p>\n" +
            "            <p class=\"infoOperation\">\n" +
            "                <span class=\"infoTime\">"+getDate()+"</span>\n" +
            "                <span class=\"infoHandle\">\n" +
            "                    <a href=\"javaScript:;\" class='infoTop'>0</a>\n" +
            "                    <a href=\"javaScript:;\" class='infoDown'>0</a>\n" +
            "                    <a href=\"javaScript:;\" class='infoDel'>0</a>\n" +
            "                </span>\n" +
            "            </p>\n" +
            "        </div>")
        return $weibo;
    }
    //获取时间方法
    function getDate() {
        var date=new Date();
        var arr=[date.getFullYear()+"-",date.getMonth()+1+"-",date.getDate()+" ",date.getHours()+":",date.getMinutes()+":",date.getSeconds()];
        return arr.join("");

    }


});