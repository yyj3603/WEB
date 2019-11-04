/**
 *
 * @param obj 传入的对象
 * @param target 目标位置
 * @param speed 速度
 * str 要执行动画的样式 比如：left top width height
 * callback 回调函数，将会在动画执行完毕以后执行
 */
function move(obj,target,speed,str,callback) {
//关闭上一个定时器
    clearInterval(obj.timmer);
    //获取元素目前的位置
    var current=parseInt(getStyle(obj,str));
    if(current>target){
        speed=-speed;
    }

    //定时器
    //向执行动画的对象中添加一个timmer属性，用来保存它自己的定时器的标识
    obj.timmer=setInterval(function () {
        //获取块旧的水平偏移量
        var oldValue=parseInt(getStyle(obj,str));

        //新的水平偏移量
        var newValue=oldValue+speed;
        /**
         * 判断newValue是否大于800
         *  从800向0移动
         *  向左移动时，需要判断newValue是否小于target
         *  向右移动时，需要判断newValue是否大于target
         */
        if((speed<0 && newValue<target)||(speed>0 && newValue>target)){
            newValue=target;
        }
        //将新的赋给box
        obj.style[str]=newValue+"px";
        //达到目标，关闭定时器
        if(newValue==target){
            clearInterval(obj.timmer);
            //动画执行完毕，调用回调函数
            callback && callback();
        }
    },30);

}
function getStyle(obj,name) {
    if(window.getComputedStyle){
        //正常浏览器的方式，具有getComputedStyle()方法
        return getComputedStyle(obj,null)[name];
    }else{
        //IE8的方式，没有getComputedStyle方法
        return obj.currentStyle[name];
    }
}

//类的操作：
/**
 * 定义一个函数，用来向一个元素中添加指定的属性值
 * @param obj 要添加class属性的元素
 * @param cn  要添加的class值
 */
function addClass(obj,cn){
    //检查obj中是否含有cn,没有才加
    if(!haseClass(obj,cn)){
        obj.className+=" "+cn;
    }

}

/**
 * 定义一个函数，判断一个元素中是否含有指定的属性值
 */
function haseClass(obj,cn) {
    //创建一个正则表达式
    var reg=new RegExp("\\b"+cn+"\\b");// “\b”为字符边界，第一个\为转义字符
    return reg.test(obj.className);

}
//移除元素中指定的class属性
function removeClass(obj,cn){
    var reg=new RegExp("\\b"+cn+"\\b");
    //删除class
    obj.className=obj.className.replace(reg,"");
}
//定义一个函数，判断有这个class属性则删除，没有则添加
function toggleClass(obj,cn) {
    if (haseClass(obj,cn)){
        removeClass(obj,cn)
    }else {
        addClass(obj,cn)
    }
}