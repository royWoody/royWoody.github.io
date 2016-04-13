$(function(){
	// 首屏淡入
	$('.s_products').animate({top: '240px',opacity: 1},500);
	$('.t_products').animate({top: '314px',opacity: 1},500);
	$('.occupation_products').animate({top: '242px',opacity: 1},500);
	
	var $section = $('#content .section');
	var $topLi = $('.top_nav li');
	var $li = $('#pro_nav li');
	var iNow = 0;
	var indexInow = 0;
	var flag = true;	
	
	// 点击右侧按钮，屏幕滚动切换，tab伴随滚动
	$li.on('click',function(){		
		var liNow = $(this);
		indexInow = liNow.index();
		var moveNum = indexInow*100;
		
		if(iNow == 0){									
			$('#content').animate({top: '-='+moveNum+'%'},900,function(){
				if(indexInow == 1){
					$('#con_home li').attr('style','');

					$('#con_introduce .win_win').animate({top: '162px',left: '894px',opacity: 1},500);
					$('#con_introduce .innovation').animate({bottom: '194px',left: '856px',opacity: 1},500);
					$('#con_introduce .pragmatic').animate({top: '106px',right: '190px',opacity: 1},500);
					$('#con_introduce .sincerity').animate({bottom: '164px',right: '170px',opacity: 1},500);
					$('#con_introduce .create_value').animate({top: '178px',opacity: 1},500,function(){
						$('#con_introduce .hand').animate({bottom: '0',opacity: 1},500);
					});
				}				
			});

			if(moveNum != 0){
				iNow = moveNum;

				$('.action li').fadeOut();
				if(indexInow > 1){
					// li渐入					
					$('.action').eq(indexInow-2).find('li').fadeIn(2000);

					$('#con_home li').attr('style','');

					$('#con_introduce li').attr('style','');
				}
				if(indexInow == 1){
					$('#con_introduce li').attr('style','');
				}
			}
			
		}else if(iNow > 0){
			$('.action li').fadeOut();
			$('#content').animate({top: '-='+(moveNum-iNow)+'%'},900,function(){
				if(indexInow == 0){
					$('.s_products').animate({top: '240px',opacity: 1},500);
					$('.t_products').animate({top: '314px',opacity: 1},500);
					$('.occupation_products').animate({top: '242px',opacity: 1},500);
				}

				if(indexInow == 1){
					$('#con_introduce .win_win').animate({top: '162px',left: '894px',opacity: 1},500);
					$('#con_introduce .innovation').animate({bottom: '194px',left: '856px',opacity: 1},500);
					$('#con_introduce .pragmatic').animate({top: '106px',right: '190px',opacity: 1},500);
					$('#con_introduce .sincerity').animate({bottom: '164px',right: '170px',opacity: 1},500);
					$('#con_introduce .create_value').animate({top: '178px',opacity: 1},500,function(){
						$('#con_introduce .hand').animate({bottom: '0',opacity: 1},500);
					});
				}

				if(indexInow > 1){
					// li渐入					
					$('.action').eq(indexInow-2).find('li').fadeIn(500);

					$('#con_introduce li').attr('style','');
				}
			});
			iNow = moveNum;						
		}

		$li.removeClass('current');
		$li.eq(indexInow).addClass('current');
		var tempin=0
				if(indexInow==0){tempin=indexInow}else if(indexInow==1){tempin=4}else{tempin=indexInow-1}
				$(".top_nav li").removeClass('active');
				$(".top_nav li").eq(tempin).addClass('active');

	});

	// 鼠标滚动，屏幕滚动切换，tab伴随滚动
	$(document).on('mousewheel',function(){
		if (window.event.wheelDelta < 0) {
			if(iNow < 400 && indexInow < 4 && flag){
				flag = false;
				$('.action li').fadeOut();
				$('#content').animate({top: '-=100%'},900,function(){
					if(indexInow > 1){
						// li渐入					
						$('.action').eq(indexInow-2).find('li').fadeIn(500);

						$('#con_introduce li').attr('style','');
						flag = true;
					}
					$('#con_home li').attr('style','');

					if(indexInow == 1){
						$('#con_introduce .win_win').animate({top: '162px',left: '894px',opacity: 1},500);
						$('#con_introduce .innovation').animate({bottom: '194px',left: '856px',opacity: 1},500);
						$('#con_introduce .pragmatic').animate({top: '106px',right: '190px',opacity: 1},500);
						$('#con_introduce .sincerity').animate({bottom: '164px',right: '170px',opacity: 1},500);
						$('#con_introduce .create_value').animate({top: '178px',opacity: 1},1300,function(){
							$('#con_introduce .hand').animate({bottom: '0',opacity: 1},500,function(){
								flag = true;
							});
						});
					}					
				});			
				iNow += 100;
				
				indexInow ++;
				$li.removeClass('current');
				$li.eq(indexInow).addClass('current');
				var tempin=0
				if(indexInow==0){tempin=indexInow}else if(indexInow==1){tempin=4}else{tempin=indexInow-1}
				$(".top_nav li").removeClass('active');
				$(".top_nav li").eq(tempin).addClass('active');
			}
		}else{
			if(iNow > 0 && indexInow > 0 && flag){
				flag = false;
				$('.action li').fadeOut();
				$('#content').animate({top: '+=100%'},900,function(){
					if(indexInow <= 4){
						// li渐入					
						$('.action').eq(indexInow-2).find('li').fadeIn(500);
					}

					if(indexInow == 0){
						$('.s_products').animate({top: '240px',opacity: 1},500);
						$('.t_products').animate({top: '314px',opacity: 1},500);
						$('.occupation_products').animate({top: '242px',opacity: 1},500);

						$('#con_introduce li').attr('style','');
					}

					if(indexInow == 1){
						$('#con_introduce .win_win').animate({top: '162px',left: '894px',opacity: 1},500);
						$('#con_introduce .innovation').animate({bottom: '194px',left: '856px',opacity: 1},500);
						$('#con_introduce .pragmatic').animate({top: '106px',right: '190px',opacity: 1},500);
						$('#con_introduce .sincerity').animate({bottom: '164px',right: '170px',opacity: 1},500);
						$('#con_introduce .create_value').animate({top: '178px',opacity: 1},500,function(){
							$('#con_introduce .hand').animate({bottom: '0',opacity: 1},500,function(){
								flag = true;
							});
						});
					}
					if(indexInow != 1){
						flag = true;
					}
				});
				iNow -= 100;

				indexInow --;
				$li.removeClass('current');
				$li.eq(indexInow).addClass('current');
				var tempin=0
				if(indexInow==0){tempin=indexInow}else if(indexInow==1){tempin=4}else{tempin=indexInow-1}
				$(".top_nav li").removeClass('active');
				$(".top_nav li").eq(tempin).addClass('active');
			}			
		}
		
	});
	// 兼容火狐
	var ua = navigator.userAgent.toLowerCase();
	if(ua.indexOf('firefox') > 0){
		document.addEventListener('DOMMouseScroll',function(event){
			if (event.detail > 0) {
				if(iNow < 400 && indexInow < 4 && flag){
					flag = false;
					$('.action li').fadeOut();
					$('#content').animate({top: '-=100%'},900,function(){
						if(indexInow <= 4){
							// li渐入					
							$('.action').eq(indexInow-2).find('li').fadeIn(500);
						}
						$('#con_home li').attr('style','');

						if(indexInow == 1){
							$('#con_introduce .win_win').animate({top: '162px',left: '894px',opacity: 1},500);
							$('#con_introduce .innovation').animate({bottom: '194px',left: '856px',opacity: 1},500);
							$('#con_introduce .pragmatic').animate({top: '106px',right: '190px',opacity: 1},500);
							$('#con_introduce .sincerity').animate({bottom: '164px',right: '170px',opacity: 1},500);
							$('#con_introduce .create_value').animate({top: '178px',opacity: 1},500,function(){
								$('#con_introduce .hand').animate({bottom: '0',opacity: 1},500,function(){
									flag = true;
								});
							});
						}

						if(indexInow > 1){
							$('#con_introduce li').attr('style','');
						}
						if(indexInow != 1){
							flag = true;
						}
					});			
					iNow += 100;
					
					indexInow ++;
					$li.removeClass('current');
					$li.eq(indexInow).addClass('current');
					var tempin=0
					if(indexInow==0){tempin=indexInow}else if(indexInow==1){tempin=4}else{tempin=indexInow-1}
					$(".top_nav li").removeClass('active');
					$(".top_nav li").eq(tempin).addClass('active');			
				}
			}else{
				if(iNow > 0 && indexInow > 0 && flag){
					flag = false;
					$('.action li').fadeOut();
					$('#content').animate({top: '+=100%'},900,function(){
						if(indexInow <= 4){
							// li渐入					
							$('.action').eq(indexInow-2).find('li').fadeIn(500);
						}

						if(indexInow == 0){
							$('.s_products').animate({top: '240px',opacity: 1},500);
							$('.t_products').animate({top: '314px',opacity: 1},500);
							$('.occupation_products').animate({top: '242px',opacity: 1},500);

							$('#con_introduce li').attr('style','');
						}

						if(indexInow == 1){
							$('#con_introduce .win_win').animate({top: '162px',left: '894px',opacity: 1},500);
							$('#con_introduce .innovation').animate({bottom: '194px',left: '856px',opacity: 1},500);
							$('#con_introduce .pragmatic').animate({top: '106px',right: '190px',opacity: 1},500);
							$('#con_introduce .sincerity').animate({bottom: '164px',right: '170px',opacity: 1},500);
							$('#con_introduce .create_value').animate({top: '178px',opacity: 1},500,function(){
								$('#con_introduce .hand').animate({bottom: '0',opacity: 1},500);
								flag = true;
							});
						}
						if(indexInow != 1){
							flag = true;
						}
					});
					iNow -= 100;

					indexInow --;
					$li.removeClass('current');
					$li.eq(indexInow).addClass('current');
					var tempin=0
					if(indexInow==0){tempin=indexInow}else if(indexInow==1){tempin=4}else{tempin=indexInow-1}
					$(".top_nav li").removeClass('active');
					$(".top_nav li").eq(tempin).addClass('active');
				}			
			}		
		});
	}

	// 登录框
	$('.action li').on('click',function(){
		var txt = $(this).find('span').eq(1).text();
		$('.login').find('h3').text(txt);
		$('.login').show();
	});
	$('.login_close').on('click',function(){
		$('.login').hide();
	});

	$(".con_introduce_inner").mCustomScrollbar({
								autoHideScrollbar:false,
								theme:"light-thin"
							});
});

function goto(n){$("#pro_nav li").eq(n).click();}	
