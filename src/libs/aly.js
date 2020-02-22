/**
 *
 * @type wechat  type 随便写,弃置
 *
 */
function alywx(type,params,callback){
    var url,appid;
    loadjs(function () {
        if(env=="localdevelop"){ //开发环境
            url = 'http://web-agent.imcoming.com.cn/wechat/jssdk/shareconf';
        }else if(env=="development"){ //测试环境
            url = 'http://web-agent.imcoming.com/wechat/jssdk/shareconf';
        }else{ //线上
            url = 'https://web-agent.anlaiye.com/wechat/jssdk/shareconf';
        }
        var mergeJSON = function(json1,json2){
            var json = eval('('+(JSON.stringify(json1)+JSON.stringify(json2)).replace(/}{/,',')+')');
            return json;
        }
        var weixinDict = {
            link: window.location.href,
            appid: appid
        }
        var weixinDict = mergeJSON(weixinDict,params);
        callback = callback ? callback : function(){};
        var u  = encodeURIComponent(window.location.href.split('#')[0]);
        $.get(url,{
            url:url
        },function(redata){
            //redata.data.debug = true;
            wx.config(redata.data);

            wx.ready(function(){

                wx.onMenuShareTimeline({
                    title: weixinDict.desc,
                    link: weixinDict.link,
                    desc: weixinDict.desc,
                    imgUrl: weixinDict.img,
                    success: function(){
                        callback();
                    },
                    cancle: function(){

                    }
                });

                wx.onMenuShareAppMessage({
                    title: weixinDict.title,
                    link: weixinDict.link,
                    desc: weixinDict.desc,
                    imgUrl: weixinDict.img,
                    success: function(){
                        callback();
                    },
                    cancle: function(){

                    }
                });
                //分享给朋友
                wx.onMenuShareAppMessage({
                    title: weixinDict.title, // 分享标题
                    desc: weixinDict.desc, // 分享描述
                    link: weixinDict.link, // 分享链接
                    imgUrl: weixinDict.img, // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        callback();
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                //分享qq
                wx.onMenuShareQQ({
                    title: weixinDict.title, // 分享标题
                    desc: weixinDict.desc, // 分享描述
                    link: weixinDict.link, // 分享链接
                    imgUrl: weixinDict.img, // 分享图标
                    success: function () {
                        callback();
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                //分享到微博
                wx.onMenuShareWeibo({
                    title: weixinDict.title, // 分享标题
                    desc: weixinDict.desc, // 分享描述
                    link: weixinDict.link, // 分享链接
                    imgUrl: weixinDict.img, // 分享图标
                    success: function () {
                        callback();
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                //分享到QQ空间
                wx.onMenuShareQZone({
                    title: weixinDict.title, // 分享标题
                    desc: weixinDict.desc, // 分享描述
                    link: weixinDict.link, // 分享链接
                    imgUrl: weixinDict.img, // 分享图标
                    success: function () {
                        callback();
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });
        });
    })
}

var loadjs = function(callback){
    var oHead = document.getElementsByTagName('HEAD').item(0);
    var oScript= document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src="../../config.js";
    oHead.appendChild( oScript);
    oScript.onload = function(){
        if(callback && !oScript.readyState){
            callback();
        }
    }
};

var params = {
    img:'http://special.anlaiye.com/theme/v1/h5/new_users/styles/images/share.png',
    link: "http://192.168.2.116:8086/",
    desc: '俺来也新用户福利来袭，百分百中奖！好礼等你拿！更多惊喜尽在俺来也APP，优惠福利快人一步！',
    title: '今夏，俺来也为你准备了一份厚礼…'
}
alywx(1,params,function(){});



 