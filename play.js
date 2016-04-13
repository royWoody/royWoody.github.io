
var App = function ($item) {
		// console.log('app init');

		//定义属性对象
		this._$app = $item;							//app容器包装对象
		this._$pages = this._$app.find('.page');	//app中所有的页面集合
		this.$currentPage = this._$pages.eq(0);		//当前显示的页面
		this._isFirstShowPage = true;				//是否第一次显示页面
		this._isInitComplete = false;				//是否初始化已经完成
		this._isDisableFlipPage = false;			//是否禁止翻页
		this._isDisableFlipPrevPage = false;		//是否禁止向上翻页
		this._isDisableFlipNextPage = false;		//是否禁止向下翻页

		//定义变量
		var theClass = this;
		var $win = $(window);

		//禁用不需要的浏览器默认行为
		(function () {
			//禁止ios的浏览器容器弹性
			$win.on('scroll.elasticity', function (e) {
				e.preventDefault();
			}).on('touchmove.elasticity', function (e) {
				e.preventDefault();
			});

			//禁止拖动图片
			$win.delegate('img', 'mousemove', function (e) {
				e.preventDefault();
			});
		})();

		//初始化页面切换效果
		$win.on('load', function (e) {
			//定义临时变量
			var currentPage = null,
				activePage = null;
			var triggerLoop = false;
			var startX = 0,
				startY = 0,
				moveDistanceX = 0,
				moveDistanceY = 0,
				isStart = false,
				isNext = false,
				isFirstTime = true;
			//为theClass._$app添加事件
			theClass._$app.on('mousedown touchstart', function (e) {
				//动画正在运行时或禁止翻页时不进行下一轮切换
				var e = event || e;
				if(theClass._isDisableFlipPage){
					return;
				}
				//获取当前显示的页面和将要显示的页面
				currentPage = theClass._$pages.filter('.z-current').get(0);
				activePage = null;
				//初始化切换变量、属性
				if(currentPage){
					isStart = true;
					isNext = false;
					isFirstTime = true;
					moveDistanceX = 0;
					moveDistanceY = 0;
					if(e.type == 'mousedown'){
						startX = e.pageX;
						startY = e.pageY;
					}else{
						startX = e.touches[0].pageX;
						startY = e.touches[0].pageY;
					}
					currentPage.classList.add('z-move');
					currentPage.style.webkitTransition = 'none';
				}
			}).on('mousemove touchmove', function (e) {
				//当启动新一轮切换并且将要显示的页面不为null或者为启动后第一次进入move事
				var e = event || e;
				if(isStart && (activePage || isFirstTime)){
					//获取移动距离
					if(e.type == 'mousemove'){
						moveDistanceX = e.pageX - startX;
						moveDistanceY = e.pageY - startY;
					}else{
						moveDistanceX = e.touches[0].pageX - startX;
						moveDistanceY = e.touches[0].pageY - startY;
					}

					//如果Y移动的距离大于X移动的距离，则进行翻页操作
					if(Math.abs(moveDistanceY) > Math.abs(moveDistanceX)){
						//判断用户是向上还是向下拉
						if(moveDistanceY > 0){
							//判断是否已经禁用向下翻页
							if(theClass._isDisableFlipPrevPage){
								return;
							}
							//向下拉：显示上一页
							if(isNext || isFirstTime){
								//设置临时变量值
								isNext = false;
								isFirstTime = false;
								//清除上次将要显示的页面
								if(activePage){
									activePage.classList.remove('z-active');
									activePage.classList.remove('z-move');
								}
								//获取当前将要显示的上一页
								if(currentPage.previousElementSibling && currentPage.previousElementSibling.classList.contains('page')){
									activePage = currentPage.previousElementSibling;
								} else {
									if(triggerLoop) {
										activePage = theClass._$pages.last().get(0)
									} else {
										activePage = false;
									}
								}
								if(activePage && activePage.classList.contains('page')){
										//获取成功：初始化上一页
										activePage.classList.add('z-active')
										activePage.classList.add('z-move');
										activePage.style.webkitTransition = 'none';
										activePage.style.webkitTransform = 'translateY(-100%)';
										$(activePage).trigger('active');
										currentPage.style.webkitTransformOrigin = 'bottom center';
								}else{
									//获取失败：重置当前页
									currentPage.style.webkitTransform = 'translateY(0px) scale(1)';
									activePage = null;
								}
							}else{
								//移动时设置样式
								currentPage.style.webkitTransform = 'scale('+ (window.innerHeight / (window.innerHeight + moveDistanceY)).toFixed(3) +')';
								activePage.style.webkitTransform = 'translateY(-'+ (window.innerHeight - moveDistanceY) +'px)';
							}
						}else if(moveDistanceY < 0){
							//判断是否已经禁用向上翻页
							if(theClass._isDisableFlipNextPage){
								return;
							}
							//向上拉：显示下一页
							if(!isNext || isFirstTime){
								//设置临时变量值
								isNext = true;
								isFirstTime = false;
								//清除上次将要显示的页面
								if(activePage){
									activePage.classList.remove('z-active');
									activePage.classList.remove('z-move');
								}
								//获取当前将要显示的下一页
								if(currentPage.nextElementSibling && currentPage.nextElementSibling.classList.contains('page')) {
									activePage =  currentPage.nextElementSibling;
								} else {
									activePage =  theClass._$pages.first().get(0);
									triggerLoop = true;
								}
								if(activePage && activePage.classList.contains('page')){
									//获取成功：初始化下一页
									activePage.classList.add('z-active');
									activePage.classList.add('z-move');
									activePage.style.webkitTransition = 'none';
									activePage.style.webkitTransform = 'translateY('+window.innerHeight+'px)';
									$(activePage).trigger('active');
									currentPage.style.webkitTransformOrigin = 'top center';
								}else{
									//获取失败：重置当前页
									currentPage.style.webkitTransform = 'translateY(0px) scale(1)';
									activePage = null;
								}
							}else{
								//移动时设置样式
								currentPage.style.webkitTransform = 'scale('+ ((window.innerHeight + moveDistanceY) / window.innerHeight).toFixed(3) +')';
								activePage.style.webkitTransform = 'translateY('+ (window.innerHeight + moveDistanceY) +'px)';
							}
						}
					}
				}
			}).on('mouseup touchend', function (e) {
				if(isStart){
					//设置临时变量
					isStart = false;
					if(activePage){
						theClass._isDisableFlipPage = true;
						//启动转场动画
						currentPage.style.webkitTransition = '-webkit-transform 0.4s ease-out';
						activePage.style.webkitTransition = '-webkit-transform 0.4s ease-out';
						//判断移动距离是否超过100
						if(Math.abs(moveDistanceY) > Math.abs(moveDistanceX) && Math.abs(moveDistanceY) > 100){
							//切换成功：设置当前页面动画
							if(isNext){
								currentPage.style.webkitTransform = 'scale(0.2)';
								activePage.style.webkitTransform = 'translateY(0px)';
							}else{
								currentPage.style.webkitTransform = 'scale(0.2)';
								activePage.style.webkitTransform = 'translateY(0px)';
							}
							if($(activePage).index() == 1){
								$("ul.m-cascadingTeletex").addClass("z-viewArea");
								$(".u-guidePrev, .u-guideNext").css("display","block");
							}else{
								$("ul.m-cascadingTeletex").removeClass("z-viewArea");
								$(".u-guidePrev, .u-guideNext").css("display","none")
							}
							if ($(activePage).index() == 0) {
							    $("body").css("background-color", "#efa194");
							} else if ($(activePage).index() == 1) {
							    $("body").css("background-color", "#1e6075");
							    $("#telTip").css("color", "#fff");
							} else if ($(activePage).index() == 2) {
							    $("body").css("background-color", "#b9d052");
							    $("#telTip").css("color", "#fff");
							} else if ($(activePage).index() == 3) {
							    $("body").css("background-color", "#9facbd");
							    $("#telTip").css("color", "#fff");
							} else if ($(activePage).index() == 4) {
							    $("body").css("background-color", "#fe6027");
							    $("#telTip").css("color", "#fff");
							} else if ($(activePage).index() == 5) {
							    $("body").css("background-color", "#1c94ad");
							    $("#telTip").css("color", "#fff");
							} else if ($(activePage).index() == 6) {
							    $("body").css("background-color", "#1c94ad");
							    $("#telTip").css("color", "#fff");
							} else if ($(activePage).index() == 7) {
							    $("body").css("background-color", "#1c94ad");
							    $("#telTip").css("color", "#fff");
							} else if ($(activePage).index() == 8) {
							    $("body").css("background-color", "#ff944d");
							    $("#telTip").css("color", "#fff");
							} else if ($(activePage).index() == 9) {
							    $("body").css("background-color", "#64bf7c");
							    $("#telTip").css("color", "#fff");
							}
							//页面动画运行完成后处理
							setTimeout(function () {
								activePage.classList.remove('z-active');
								activePage.classList.remove('z-move');
								activePage.classList.add('z-current');
								currentPage.classList.remove('z-current');
								currentPage.classList.remove('z-move');
								theClass._isDisableFlipPage = false;
								//保存当前页面，并触发页面事件
								theClass.$currentPage = $(activePage).trigger('current');
								$(currentPage).trigger('hide');
							},500);
						}else{
							//切换取消：设置当前页面动画
							if(isNext){
								currentPage.style.webkitTransform = 'scale(1)';
								activePage.style.webkitTransform = 'translateY(100%)';
							}else{
								currentPage.style.webkitTransform = 'scale(1)';
								activePage.style.webkitTransform = 'translateY(-100%)';
							}
							//页面动画运行完成后处理
							setTimeout(function () {
								activePage.classList.remove('z-active');
								activePage.classList.remove('z-move');
								theClass._isDisableFlipPage = false;
							},500);
						}
					}else{
						currentPage.classList.remove('z-move');
					}
				}
			});
		});
		
		// console.log('加载成功\n____________');
}

if(/Android (\d+\.\d+)/.test(navigator.userAgent)){
		var version = parseFloat(RegExp.$1);
		if(version>2.3){
			var phoneScale = parseInt(window.screen.width)/640;
			document.write('<meta name="viewport" content="width=640, minimum-scale = '+ phoneScale +', maximum-scale = '+ phoneScale +', target-densitydpi=device-dpi">');
		}else{
			document.write('<meta name="viewport" content="width=640, target-densitydpi=device-dpi">');
		}
}else{
	document.write('<meta name="viewport" content="width=640, user-scalable=no">');
}

$(function(){
	var bid = $("#backgroundid").val();
	var pageUrl=$("#pageImg").val();
	$(".appBg1").css("backgroundImage","url("+pageUrl+")");
	/*统计*/
	// istat(0,0,1,'浏览量');
	var isrageffect = $("#isrageffect").val();
	//alert(isrageffect);
	if(isrageffect < 1){
		var app = new App($('body'));
	}
	$(".leftLayerTrigger").on("touchstart",function(e){
			 var e  =  event || e;
		      x  =  e.touches[0].pageX;//获取点击X位置
		}).on("touchmove",function(e){
		var _this = $(this).eq(0);
			var e  =  event || e;
			moveDistanceX =  e.touches[0].pageX - x;//获取手指滑行距离
			if(moveDistanceX < -200 && moveDistanceX != 0){
				console.log(moveDistanceX);
				$(".u-guideTop").addClass("noOp");
				var othPath = $(this).find(".othPath").val();
				$(".leftLayerTrigger").find(".leftLayer").empty();
				$(this).find(".leftLayer").append('<img class="close-icon" onclick="closeImage(this)" src="Close-Icon.png"><iframe width="100%" height="100%" src="'+othPath+'" frameborder=0 allowfullscreen></iframe>	');
		 		_this.find(".leftLayer").animate({
			 		'left':0+"px",
			 		'opacity':"1",
			 		"display":"block"
			 	});
			}		
	 	})
});

function closeImage(obj){
 $(obj).parent(".leftLayer").stop().animate({
	"left":"100%",
	"opacity":0,
	"display":"none"
 }).empty();
 $(".u-guideTop").removeClass("noOp");
}			
function aa(data){
	this.removeClass("op");
	$("#i_"+data).show();
	$("#d_"+data).show();
}
