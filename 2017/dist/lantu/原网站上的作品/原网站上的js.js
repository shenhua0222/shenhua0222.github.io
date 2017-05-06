//index页面banner图淡入淡出效果
$(function () {
    var index = 0,
        $dot_ul = $(".d_b_dot").find("ul"),
        $dot_li = $dot_ul.find("li"),
        dot_len = $dot_li.length;

    function a(x) {
        $dot_li.eq(x).addClass("d_b_dot_s").siblings().removeClass("d_b_dot_s");
        $(".d_b").eq(x).stop(true, true).fadeIn(function () {
            $(this).siblings().fadeOut()
        });
    }
    $dot_li.bind("click",(function () {
        index = $(this).index();
        a(index);
    }));
    $dot_ul.mouseenter(function () {
        clearInterval(show);
    }).mouseleave(function () {
        show = setInterval(function () {
            a(index);
            index++;
            if (index == dot_len)index = 0;
        }, 5000);
    }).mouseleave();
    $(".d_b").mouseenter(function () {
        clearInterval(show);
    }).mouseleave(function () {
        $dot_ul.trigger('mouseleave');
    })
});
//index页面播放
$(function () {
    $(".play_icon").on('click',function () {
        $(".d_b3_video").find("video").css({"display":"block"});
        $(this).css({"display":"none"});
        $(".d_b3_video").find("video").trigger('play');
    });
});
//index页面iphone轮播效果
$(function () {
    $(window).resize(function () {
        $ul.attr('style', '');            //动画前后，变化的是标签内style属性 所以直接消除掉style即可
        o = 0;
        scaleImage(o);
        flag = 2;
        $(".d_c_dot_s").removeClass("d_c_dot_s");
        $(".d_c_dot").find("li").eq(flag).addClass("d_c_dot_s");
    });
    var
        $ul = $(".d_c_ct ul"),
        $li = $ul.children(),
        flag = 2,
        l_w = null,
        o = 0,
        li_l = $li.length;      // 5

    $li.clone(true).appendTo($ul);
    $ul.children("li:lt(5)").clone(true).prependTo($ul);
    $li_all = $ul.children();
    $(window).scroll(function () {
        if ($(window).scrollTop() > $(".container").height() / 2) {
            scaleImage(o);
        }
    });

    //向左滑动按钮
    $(".t_l").click(function () {
        l_w = $li.css("width");
        if (!$ul.is(":animated")) {
            o--;
            $ul
                .stop(true, false)
                .animate({
                    "left": "+=" + l_w
                }, 500, function () {
                    if ($ul[0].style.left == "0px") {
                        o = 0;
                        $ul.css("left", -parseInt(l_w) * li_l + "px");
                    }
                    if ($ul[0].style.left == "-150px") {
                        o = 0;
                        $ul.css("left", -parseInt(l_w) * li_l - 150 + "px");
                    }
                    if ($ul[0].style.left == "-350px") {
                        o = 0;
                        $ul.css("left", -parseInt(l_w) * li_l - 350 + "px");
                    }
                    scaleImage(o);
                    toggleSize();
                });
            if (flag == 0)
                flag = 5;
            $(".d_c_dot_s").removeClass("d_c_dot_s");
            $(".d_c_dot").find("li").eq(flag - 1).addClass("d_c_dot_s");
            flag--;
        }
    });
    //向右滑动按钮
    $(".t_r").click(function () {
        l_w = $li.css("width");
        if (!$ul.is(":animated")) {
            o++;
            $ul
                .stop(true, false)
                .animate({
                    "left": "-=" + l_w
                }, 500, function () {
                    if ($ul[0].style.left == -parseInt(l_w) * 10 + "px") {
                        o = 0;
                        $ul.css("left", -parseInt(l_w) * 5 + "px");
                    }
                    if ($ul[0].style.left == "-1950px") {
                        o = 0;
                        $ul.css("left", -parseInt(l_w) * 5 - 150 + "px");
                    }
                    if ($ul[0].style.left == "-2150px") {
                        o = 0;
                        $ul.css("left", -parseInt(l_w) * 5 - 350 + "px");
                    }
                    scaleImage(o);
                    toggleSize();
                });
            if (flag == 4)
                flag = -1;
            $(".d_c_dot_s").removeClass("d_c_dot_s");
            $(".d_c_dot").find("li").eq(flag + 1).addClass("d_c_dot_s");
            flag++;
        }
    });
    //加不同的scale
    function scaleImage(o) {
        if (document.body.clientWidth > 600) {
            var x = li_l + Math.ceil(li_l / 2) + o;
            $li.siblings(".centerify").removeClass("centerify");
            $li.siblings(".sideify").removeClass("sideify");
            $li_all.eq(x).addClass("sideify");
            $li_all.eq(x - 1).addClass("centerify");
            $li_all.eq(x - 2).addClass("sideify");
        }
    }

    //预先给未来的加scale，达到无缝动画连接
    function toggleSize() {
        if (document.body.clientWidth > 600) {
            if ($ul[0].style.left == "-" + l_w || $ul[0].style.left == "-330px" || $ul[0].style.left == "-530px") {
                $li_all.eq(7).addClass("sideify");
                $li_all.eq(8).addClass("centerify");
                $li_all.eq(9).addClass("sideify");
            }
            if ($ul[0].style.left == -parseInt(l_w) * 9 + "px" || $ul[0].style.left == "-1770px" || $ul[0].style.left == "-1970px") {
                $li_all.eq(7).addClass("sideify");
                $li_all.eq(6).addClass("centerify");
                $li_all.eq(5).addClass("sideify");
            }
        }
    }

});
//导航点击切换效果
$(function () {
    $(".nav_img").click(function () {
        $(this).find("ul").fadeToggle();
    });
});
//campus页面banner高度自适应
$(function () {
    var h = $(window).height() - $(".header").height();
    var h_m = ($(window).height() - $(".header").height()) * 0.7;
    $m = $(".cam_ct>div:nth-of-type(2n+1):not(.cam-m01)");
    if (document.body.clientWidth > 900) {
        $(".cam-m01").height(h);
        $m.height(Math.max(530, h_m));
        $(window).resize(function () {
            var h_size = $(window).height() - $(".header").height();
            $(".cam-m01").height(h_size);    //h=400
            var h_m_size = ($(window).height() - $(".header").height()) * 0.7;
            $m.height(Math.max(530, h_m_size));
        });
    }
});
//campus页面应用群动画效果
$(function () {
    var index = 0;
    var len = $(".m05_d_list").find("li").length;

    function show(index) {
        $(".m05_d_list").find("li").eq(index).addClass("m05_d_list_selected").siblings().removeClass("m05_d_list_selected");
        $(".cam-m05-box").find("li").eq(index).stop(true, true).show().siblings().stop(true, true).hide();
    }

    $(".m05_img").mouseover(function () {
        clearInterval(circle);
    }).mouseout(function () {
        show(index);
        circle = setInterval(x = function () {
            show(index);
            index++;
            if (index == len) {
                index = 0;
            }
        }, 4000);
    }).mouseout();
    $(".m05_d_list").find("li").each(function () {
        $(this).click(function () {
            index = $(this).index();
            show(index);
        });
    });


});
//campus页面点击下拉效果
$(function () {
    if (document.body.clientWidth > 600) {
        $(".cam_a_d").each(function () {
                $(this).bind("click", function () {
                        var tar = $(this).attr("data-target"),
                            c_h = $(".header").height(),
                            w_h = $(window).height(),
                            i_h = $(".cam-m05").height(),
                            h = (w_h + c_h - i_h) / 2,
                            o = $(tar).offset().top - h;
                        $("html,body").animate({
                            scrollTop: o
                        }, 2000, "easeInOutCubic")
                    }
                )
            }
        );
    }
});


//为新闻动态增加分页
/**
 * 为新闻页面增加新的翻页插件
 * create by santree on 2016/9/7
 * usage: $("your className").pageBean({
 *      perPageNum : 4  //每页现实的数量
 *      nowPage    : 1  //初始显示的页码
 *      pageClass  : "your pageClass" //你用来放置页码的div
 *      list       : [
 *          {
 *              imgUrl: "图片地址",
 *              url   : "跳转页面地址",
 *              title : "新闻标题",
 *              detail: "新闻描述",
 *              time  : "发布时间"
 *          }
 *          //每个新闻动态都按照以上对象格式封装作为数组
 *      ]
 * })
 * PS : 在录入新闻是记住时间最近的放在最前面，永远按照在头部加入新闻的原则，时间顺序是从上到下
 *
 */
(function ($) {
    $.fn.extend({
        "pageBean" : function (options) {
            //合并默认配置和自定义配置
            var opts = $.extend({}, defaults, options);
            //设定新闻模版
            var tmpl =
                "<div class='n_ct_m'>"
                + "<div class='n_ct_img'>" + "<img src='' alt=''/>" + "</div>"
                + "<div class='new_ct_d'>"
                + "<h1>" + "<a href='' target='_blank'>" + "</a>" + "</h1>"
                + "<time>" + "</time>"
                + "<p>" + "</p>"
                + "</div>"
                + "</div>";
            //设定分页数字模板
            var tmplPage = "<a class='pg_num' href='javascript:void(0);'>" + "</a>";

            this.each(function () {
                var $this = $(this);
                //获取总页数
                var allPageNum = $.fn.pageBean.getPageNum(opts.list, opts.perPageNum);

                //传入页码数目
                for (var i = 0; i < allPageNum; i++) {
                    var nowPage = $(tmplPage).text(i + 1);
                    $this.find(opts.pageClass).append(nowPage);
                }
                //为每一页的页码绑定事件
                $this.find(opts.pageClass).children("a").on('click', function () {
                    $(this).addClass("select");
                    $(this).siblings().removeClass("select");
                    var nowPage = parseInt($(this).text());
                    addNewpage(nowPage);
                });
                //触发默认第一页的点击时间
                $this.find(opts.pageClass).children("a").eq(opts.nowPage - 1).trigger('click');
                //为当前页数传入内容
                function addNewpage(nowPage) {
                    $this.find(".n_ct_m").remove();
                    var nowPageArr = $.fn.pageBean.pagination(opts.list, nowPage, opts.perPageNum);
                    for (var i = 0; i < nowPageArr.length ; i++) {
                        $this.append(tmpl);
                    }
                    for (var j = 0; j < nowPageArr.length; j++){
                        $(".n_ct_m").eq(j).find(".n_ct_img img").attr("src", nowPageArr[j].imgUrl);
                        $(".n_ct_m").eq(j).find(".new_ct_d h1 a").attr("href", nowPageArr[j].url);
                        $(".n_ct_m").eq(j).find(".new_ct_d h1 a").text(nowPageArr[j].title);
                        $(".n_ct_m").eq(j).find(".new_ct_d time").text(nowPageArr[j].time);
                        $(".n_ct_m").eq(j).find(".new_ct_d p").text(nowPageArr[j].detail);
                    }
                }
            })
        }
    });
    //定义默认配置
    var defaults ={
        perPageNum : 4,
        nowPage    : 1,
        pageClass  : ".pgNum",
        list: [
            {
                imgUrl: "img/news/ct1.jpg",
                url   : "http://www.ccidnet.com/2016/0129/10092455.shtml",
                title : "兰途科技，移动校园门户的黑马",
                detail: "在15年三月十二届全国人大三次会议上，李克强总理在政府工作报告中首次提出“互联网+”行动计划。7月，经李克强总理签批，国务院日前印发《关于积极推进...",
                time  : "2016.01.29"
            },
            {
                imgUrl: "img/news/ct2.jpg",
                url   : "http://it.msn.com.cn/077636/555560998284b.shtml",
                title : "兰途科技:搭建互联网+校园移动门户平台",
                detail: "2016年1月8日，河南省教育科研网2016年工作会议在新乡医学院成功召开。本次会议以“‘互联网+’时代网络中心的定位与发展”为主题，由河南省教育科研网主办...",
                time  : "2016.01.21"
            },
            {
                imgUrl: "img/news/ct3.jpg",
                url   : "http://www.ccidnet.com/2016/0115/10083737.shtml",
                title : "我叫兰途科技，这是我的年终报告",
                detail: "伴随着岁月急匆匆的步履，2015年已进入倒计时。回首这一年，发生了好多大事儿，抗战70周年93大阅兵、北京申冬奥成功、世界那么大我想去看看、屠呦呦...",
                time  : "2016.01.15"
            },
            {
                imgUrl: "img/news/ct5.jpg",
                url   : "http://edu.21cn.com/news/terminal/10/11489.html",
                title : "兰途科技参加中国高教学会教育信息化分会理事会议",
                detail: "11月20日，中国高等教育学会教育信息化分会理事会议与江苏省教育信息化10周年年会在江苏南京召开。会上，兰途科技随新开普电子作为理事单位代表，与江苏省...",
                time  : "2015.11.24"
            }
        ]
    };

    /**
     *  根据总的list和每页数目以及当前页数来确定当夜的list为什么
     * @param arr
     * @param pgNum
     * @param perPageNum
     * @returns {Array.<T>|ArrayBuffer|Blob|string|*}
     */
    $.fn.pageBean.pagination = function (arr, pgNum, perPageNum) {
        var perPageArr = arr.slice( (pgNum-1) * perPageNum, pgNum * perPageNum );
        return perPageArr;
    };

    /**
     *  根据总的list和每页数目来确定总页数
     * @param arr
     * @param perPageNum
     * @returns {number}
     */
    $.fn.pageBean.getPageNum = function (arr, perPageNum) {
        var allPageNum = Math.ceil( arr.length / perPageNum );
        return allPageNum;
    };

})(jQuery);
$(function () {
    $(".n_ct_list").pageBean({
        list : [
            {
                imgUrl: "img/news/ct4.jpg",
                url   : "http://edu.enorth.com.cn/system/2016/10/14/031229082.shtml",
                title : "兰途科技 为高校构建长久持续的移动信息化服务",
                detail: "　随着网络基础设施的不断完善，以及信息系统的不断上线，当前多数高校信息化服务管理开始向移动端发展。移动信息化服务平台(APP、微信端)为高校信息化服务管理拓展了一种新的模式，是校园未来信息化管理和服务的重要平台。",
                time  : "2016-10-14"
            },
            {
                imgUrl: "img/news/ct5.jpg",
                url   : "http://sanwen8.cn/p/553c6z6.html",
                title : "兰途科技洪叶：保持专注 只为更好的智慧校园体验 | 晓数专访",
                detail: "在移动互联浪潮与“十三五”规划中教育部提出加快教育信息化发展的双重推动下，“互联网+教育”概念被迅速传播，高校逐渐启程踏上智慧校园之路，而越来越多的厂商、资本也纷纷瞄准了这一巨大潜力的市场。",
                time  : "2016-11-07"
            },
            {
                imgUrl: "img/news/ct8.png",
                url   : "http://edu.enorth.com.cn/system/2016/08/22/031118032.shtml",
                title : "兰途科技，运用企业号提供智慧校园解决方案",
                detail: "据了解，由兰途科技筹建的北建移动门户微信企业号2.5.9已于近日正式上线。该企业号是基于智慧校园推出的微信第三方应用。根据学生反映，自北建移动门户上线以来，全校部分师生已经关注并绑定了此微信企业号...",
                time  : "2016-08-22"
            },
            {
                imgUrl: "img/news/ct7.png",
                url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822255&idx=1&sn=78803a2334935c00c97e04abaa652824&scene=23&srcid=08033ger5lTW8DS1OAkBzDpb#rd",
                title : "兰途出品 | 中财移动门户上线！",
                detail: "中财掌上校园正式开学了！兰途科技承建的中央财经大学官方移动门户正式上线，现已登陆苹果、安卓各大应用市场，在校师生可第一时间前往下载使用...",
                time  : "2016.05.30"
            },
            {
                imgUrl: "img/news/ct6.png",
                url   : "http://edu.enorth.com.cn/system/2016/05/26/030988669.shtml",
                title : "兰途科技出品：中青政“移动校园”上线",
                detail: "昨日，中国青年政治学院“移动校园”正式上线，成为中青政“智慧校园”发展又一里程碑。同时，兰途科技“移动智慧校园”家族正式增添一名新成员...",
                time  : "2016.05.26"
            },
            {
                imgUrl: "img/news/ct1.jpg",
                url   : "http://www.ccidnet.com/2016/0129/10092455.shtml",
                title : "兰途科技，移动校园门户的黑马",
                detail: "在15年三月十二届全国人大三次会议上，李克强总理在政府工作报告中首次提出“互联网+”行动计划。7月，经李克强总理签批，国务院日前印发《关于积极推进...",
                time  : "2016.01.29"
            },
            {
                imgUrl: "img/news/ct3.jpg",
                url   : "http://www.ccidnet.com/2016/0115/10083737.shtml",
                title : "我叫兰途科技，这是我的年终报告",
                detail: "伴随着岁月急匆匆的步履，2015年已进入倒计时。回首这一年，发生了好多大事儿，抗战70周年93大阅兵、北京申冬奥成功、世界那么大我想去看看、屠呦呦...",
                time  : "2016.01.15"
            },
            {
                imgUrl: "img/news/ct5.jpg",
                url   : "http://edu.21cn.com/news/terminal/10/11489.html",
                title : "兰途科技参加中国高教学会教育信息化分会理事会议",
                detail: "11月20日，中国高等教育学会教育信息化分会理事会议与江苏省教育信息化10周年年会在江苏南京召开。会上，兰途科技随新开普电子作为理事单位代表，与江苏省...",
                time  : "2015.11.24"
            }
        ]
    });
    $(".first_pg").on('click', function () {
        $(".pgNum a:first-child").trigger('click');
    });
    $(".last_pg").on('click', function () {
        $(".pgNum a:last-child").trigger('click');
    });
    $(".pre_pg").on('click', function () {
        $(".pg_num.select").prev().trigger('click');
    });
    $(".next_pg").on('click', function () {
        $(".pg_num.select").next().trigger('click');
    })
});