$().ready(function(){
	// 列表自动选择效果
	var len = $(".apply-li li").length;
	var i = 0;
	var timer = setTimeout(function(){
		if(i == len) i = 0;
		if(screen.width > 600) {
			$(".apply-li li").eq(i).css('font-size', '24px').siblings().css('font-size', '18px');
		} else {
			$(".apply-li li").eq(i).css('color', '#55A92E').siblings().css('color','#389AC8'); 
		}
		
		$(".apply-img img").css('top', -282*i+"px");
		i++;
		setTimeout(arguments.callee,3000);
	},50)
	$(".apply-li li").click(function(event) {
		/* Act on the event */
		i = $(this).index();
		$(this).css('font-size', '24px').siblings().css('font-size', '18px');
		$(".apply-img img").css('top', -282*i+"px");
	});

	// 箭头点击滑动效果
	$(".arrow").click(function(event) {
		if (document.body.clientWidth < 900) return;
		var tar = $(this).attr("data-target");
		var h = $("header").height();
		var dif = $(tar).offset().top - h;
		$("html,body").animate({ scrollTop: dif}, 1000);
	});

	// 隐藏二级菜单效果；
	$(".more:not('.subnav-mobile')").click(function(event) {
		$(".subnav-mobile").toggle("fast");
	});

})

// footer部分兼容IE9
$(function(){
	var version = navigator.appVersion;
	if (version.match(/MSIE\s9/)) {
		$("footer ul").css({
			'text-align':'center',
			height:'auto',
			'line-height':'2em'
		});
		$("footer").css('height', 'auto');
	}
})
