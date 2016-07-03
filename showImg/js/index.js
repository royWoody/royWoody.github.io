(function(window, $){
    $(document).ready(function(){
        /* 右侧漂浮-返回顶部 */
        $(window).scroll(function(){
            var wh = $(window).height();
          if($(window).scrollTop()>wh){
             $('.return').fadeIn(100)
          }
          else {
             $('.return').fadeOut(100);
          };
        });
        $('.return').on('click',function(){
           var wh = $(window).height();
            if($(window).scrollTop()>wh){
               $('html,body').animate({'scrollTop':'0'},500);
            };
        });

        // 固定右侧最后一个栏目
        $(window).scroll(function(){
            /*
            // 固定新鲜事
            var $sidebarNews = $('.sidebar-news-wrap'),
            $sidebarV = $('.sidebar-v'),
            offsetHeight = $sidebarV.offset().top,
            height = $sidebarV.height(),
            top = offsetHeight + height,
            scrollTop = $(document).scrollTop();

            if ( scrollTop >= top ) {console.log('true'+top);
                $sidebarNews.css({'position': 'fixed', 'top': '-20px', 'z-index': 3});
            } else {console.log('false'+top);
                $sidebarNews.css({'position': 'static', 'top': 0, 'z-index': 0});
            }*/
            var $sidebarLast = $('.sidebar-last'),
                isCircleIndex = $sidebarLast.is('.circle-index'),
                isV = $sidebarLast.is('.sidebar-v');
            if ( $sidebarLast.length > 0 ) {
                var $sidebarLastPrev = $sidebarLast.prev();

                if ( $sidebarLastPrev.length > 0 ) {

                    var topFix = 0;
                    if ( isCircleIndex ) {
                        topFix = 20;    // 圈子主页
                    } else {
                        topFix = 56;    // 其他页面
                    }

                    var offsetHeight = $sidebarLastPrev.offset().top + $sidebarLastPrev.height() + topFix,
                        blockTop = '-20px';

                } else {
                    var $parent = $sidebarLast.parent(),
                        offsetHeight = $parent.offset().top,
                        blockTop = 0;
                }
                
                    //height = $sidebarLast.height(),
                var top = offsetHeight,
                    scrollTop = $(document).scrollTop(),
                    pageHeight = document.body.scrollHeight,
                    viewHeight = getViewRect().height;

                if ( scrollTop >= top ) {

                    $sidebarLast.css({'position': 'fixed', 'top': blockTop, 'z-index': 3});
                    if ( isV ) {
                        if ( pageHeight == scrollTop + viewHeight ) {
                            $sidebarLast.css({'position': 'static', 'top': 0, 'z-index': 0});
                        }
                    }
                } else {
                    $sidebarLast.css({'position': 'static', 'top': 0, 'z-index': 0});
                }
            }
        });

        // 输入框字数限制
        $('#comment-con').on('keyup focus',function(){
            var $this = $(this),
                length = $this.val().length,
                $introduceNum = $this.parents('.comment-area').find('.introduce-num'),
                $num = $introduceNum.find('strong'),
                charLimit = 200;

            if ( length < charLimit ) {
                $num.text( charLimit - length )
                        .css('color', '#999');
            } else {
                $num.text( 0 )
                        .css('color', '#ff7900');
                $this.val( $this.val().substring(0, charLimit) );
            }
        });

        // 初始化表情功能
        initSmileList();
        $('.smile').click(function(event){
            event.stopPropagation();
            var $this = $(this),
                $list = $this.parent().find('.phiz-list'),
                isHidden = $list.is(':hidden');

            $('.add-pic').hide();

            if ( isHidden ) {
                $list.show();
            } else {
                $list.hide();
            }

        });
        $(document).click(function(){
            $('.phiz-list').hide();
        });
        window.lang = [];// 富文本的中文名
        $('.phiz-list img').click(function(){
            /*var $this = $(this),
                url = $this.attr('src'),
                img = '';
            if ( smileList ) {
                var list = smileList.list,
                    prefix = smileList.prefix;
                img = '<img src="'+ url +'">';
                
                $.each(list, function(i, con){
                    if ( (prefix + con.url) == url && con.type == 2 ) {
                        lang.push(con['zh_CN']);
                        img = '<img class="j-lang-img" src="'+ url +'">';
                    }
                });
                
                $('.send-text-div').append(img).focus();
            }*/
            var $this = $(this),
                imgText = $this.data('zh');
            $('.send-text-div').val( $('.send-text-div').val() + imgText )
                                .focus();
        });

        // 图片预览功能       
        var num = 0;    // 缩略图片序数
        $('.user-upload-img a').click(function(){
            var $this = $(this),
                $imgSlide = $this.parents('.show-img-content').find('.upload-img-slide'),
                distance = 60,
                index = $this.index();
            num = index;
            $this.parents('.user-upload-img')
                    .addClass('none');
            $imgSlide.removeClass('none')
                        .find('.img-s-item')
                        .eq( index )
                        .click();

            var $imgConBottomList = $imgSlide.find('.img-con-bottom-list'),
                imgConBottomWidth = $imgSlide.find('.img-con-bottom-inner').width(),
                imgBottomLength = $imgConBottomList.find('a').length;

            if ( imgConBottomWidth < imgBottomLength*60 ) {
                $imgConBottomList.width( imgBottomLength*60 );
            }
            
            if ( index + 1 > 6 ) {
                $imgConBottomList.css('left', - distance*6 +'px');
                $imgSlide.find('.next-btn')
                        .addClass('disable')
                        .end()
                        .find('.prev-btn')
                        .removeClass('disable');
            } else {
                $imgConBottomList.css('left', 0);
            }               
            
        });
        $('.img-con-top-inner').click(function(){
            var $this = $(this),
                $parent = $this.parents('.upload-img-slide');
            
                $parent.addClass('none')
                        .prev()
                        .removeClass('none');

            $parent.find('.prev-btn')
                    .addClass('disable')
                    .next()
                    .removeClass('disable');
        });
        $('.img-s-item').click(function(){
            var $this = $(this),
                isActive = $this.is('.active'),
                index = $this.index(),
                $parent = $this.parents('.img-con-bottom'),
                imgBottomLength = $parent.find('.img-s-item').length;

            if ( !isActive ) {
                num = index;
                
                $this.addClass('active')
                        .siblings()
                        .removeClass('active');

                var url = $this.data('url');
                $this.parents('.img-slide-inner')
                        .find('.img-con-top-inner img')
                        .attr('src', url);
            }
        });
        // 点击切换图片       
        $('.prev-btn, .next-btn').click(function(){
            var $this = $(this),
                isDisablde = $this.is('.disable'),
                isPrev = $this.is('.prev-btn'),
                isNext = $this.is('.next-btn');

            if ( !isDisablde ) {
                var $parent = $this.parents('.img-con-bottom'),
                    $imgList = $parent.find('.img-con-bottom-list'),
                    $imgItem = $imgList.find('.img-s-item'),
                    length = $imgItem.length,
                    //diffLength = length - iFlag - 6,
                    distance = 60,
                    index = $imgList.find('.active').index()/*,
                    diffActive = length - iFlag - (index - iFlag + 1)*/;

                if ( isNext ) {

                    $imgList.animate({'left': - distance*6 +'px'}, 300, function(){
                            $imgItem.eq( 6 )
                                    .click();
                            $this.addClass('disable');
                            $parent.find('.prev-btn')
                                    .removeClass('disable');
                        });
                } else if ( isPrev ) {
                    $imgList.animate({'left': 0}, 300, function(){
                            $imgItem.eq( 0 )
                                    .click();
                            $this.addClass('disable');
                            $parent.find('.next-btn')
                                    .removeClass('disable');
                        });
                }
            }
        });
        $('.prev-btn-big, .next-btn-big').click(function(){
            var $this = $(this),
                isPrev = $this.is('.prev-btn-big'),
                isNext = $this.is('.next-btn-big'),
                $parent = $this.parents('.img-slide-inner'),
                $imgList = $parent.find('.img-con-bottom-list'),
                $imgItem = $parent.find('.img-s-item'),
                length = $imgItem.length,
                $prev = $parent.find('.prev-btn'),
                $next = $parent.find('.next-btn');
            if ( isPrev ) {
                
                if ( num == 6 ) {
                    num --;
                    $imgList.animate({'left': 0}, 300, function(){
                            $imgItem.eq( num )
                                    .click();
                            $prev.addClass('disable');
                            $next.removeClass('disable');
                        });
                } else if ( num > 0 ) {
                        num --;
                        $imgItem.eq(num)
                                .click();
                }
            } else if ( isNext ) {
                
                if ( num == 5 ) {
                    $next.click();
                } else if ( num < length - 1 ) {
                        num ++;
                        $imgItem.eq(num)
                                .click();
                }
            }
        });
    });

    // 表情功能
    var smileList = {
            "prefix":"./",
            "list":[
                {"icon":"emotion\\chat.gift.png","url":"images/expression/chat.gift.png","zh_CN":"【礼物】","en":"[gift]","type":3,"zh_TW":"【禮物】","ja":"【ギフト】","st":"$^lw^"}
                ,{"icon":"emotion\\emotion.angerly.gif","url":"images/expression/emotion.angerly.gif","zh_CN":"【愤怒】","en":"[angry]","type":1,"zh_TW":"【憤怒】","ja":"【怒り】","st":"$^fn^"}
                ,{"icon":"emotion\\emotion.bs.gif","url":"images/expression/emotion.bs.gif","zh_CN":"【鄙视】","en":"[despise]","type":1,"zh_TW":"【鄙視】","ja":"【軽蔑】","st":"$^qm^"}
                ,{"icon":"emotion\\emotion.cry.gif","url":"images/expression/emotion.cry.gif","zh_CN":"【伤心】","en":"[sad]","type":1,"zh_TW":"【傷心】","ja":"【悲しい】","st":"$^sx^"}
                ,{"icon":"emotion\\emotion.goodbye.gif","url":"images/expression/emotion.goodbye.gif","zh_CN":"【再见】","en":"[bye]","type":1,"zh_TW":"【再見】","ja":"【さようなら】","st":"$^zj^"}
                ,{"icon":"emotion\\emotion.laugh.gif","url":"images/expression/emotion.laugh.gif","zh_CN":"【高兴】","en":"[happy]","type":1,"zh_TW":"【高興】","ja":"【ハッピー】","st":"$^gx^"}
                ,{"icon":"emotion\\emotion.lh.gif","url":"images/expression/emotion.lh.gif","zh_CN":"【流汗】","en":"[sweat]","type":1,"zh_TW":"【流汗】","ja":"【汗】","st":"$^lh^"}
                ,{"icon":"emotion\\emotion.nod.gif","url":"images/expression/emotion.nod.gif","zh_CN":"【无聊】","en":"[bored]","type":1,"zh_TW":"【無聊】","ja":"【退屈した】","st":"$^wl^"}
                ,{"icon":"emotion\\emotion.question.gif","url":"images/expression/emotion.question.gif","zh_CN":"【疑问】","en":"[doubt]","type":1,"zh_TW":"【疑問】","ja":"【疑い】","st":"$^yw^"}
                ,{"icon":"emotion\\emotion.smile.gif","url":"images/expression/emotion.smile.gif","zh_CN":"【你好】","en":"[hello]","type":1,"zh_TW":"【你好】","ja":"【こんにちは】","st":"$^nh^"}
                ,{"icon":"emotion\\feedback.against.gif","url":"images/expression/feedback.against.gif","zh_CN":"【反对】","en":"[oppose]","type":2,"zh_TW":"【反對】","ja":"【反対】","st":"$^fd^"}
                ,{"icon":"emotion\\feedback.agreed.png","url":"images/expression/feedback.agreed.png","zh_CN":"【赞同】","en":"[agree]","type":2,"zh_TW":"【贊同】","ja":"【承認】","st":"$^zt^"}
                ,{"icon":"emotion\\feedback.applaud.png","url":"images/expression/feedback.applaud.png","zh_CN":"【鼓掌】","en":"[clap]","type":2,"zh_TW":"【鼓掌】","ja":"【クラップ】","st":"$^gz^"}
                ,{"icon":"emotion\\feedback.quickly.png","url":"images/expression/feedback.quickly.png","zh_CN":"【太快了】","en":"[too fast]","type":2,"zh_TW":"【太快了】","ja":"【速い】","st":"$^tk^"}
                ,{"icon":"emotion\\feedback.slowly.png","url":"images/expression/feedback.slowly.png","zh_CN":"【太慢了】","en":"[too slow]","type":2,"zh_TW":"【太慢了】","ja":"【遅すぎる】","st":"$^tm^"}
                ,{"icon":"emotion\\feedback.think.png","url":"images/expression/feedback.think.png","zh_CN":"【值得思考】","en":"[be consideration]","type":2,"zh_TW":"【值得思考】","ja":"【約ワース思考】","st":"$^sk^"}
                ,{"icon":"emotion\\rose.down.png","url":"images/expression/rose.down.png","zh_CN":"【凋谢】","en":"[wither]","type":3,"zh_TW":"【凋謝】","ja":"【枯れて落ちる】","st":"$^dx^"}
                ,{"icon":"emotion\\rose.up.png","url":"images/expression/rose.up.png","zh_CN":"【鲜花】","en":"[flower]","type":3,"zh_TW":"【鮮花】","ja":"【フラワーズ】","st":"$^xh^"}
                ,{"icon":"emotion\\emotion.bz.gif","url":"images/expression/emotion.bz.gif","zh_CN":"【闭嘴】","en":"[Silence]","type":1,"zh_TW":"【閉嘴】","ja":"【シャット】","st":"$^bz^"}
                ,{"icon":"emotion\\emotion.fd.gif","url":"images/expression/emotion.fd.gif","zh_CN":"【奋斗】","en":"[Strive]","type":1,"zh_TW":"【奮鬥】","ja":"【闘争】","st":"$^fed^"}
                ,{"icon":"emotion\\emotion.gg.gif","url":"images/expression/emotion.gg.gif","zh_CN":"【尴尬】","en":"[Embarrassed]","type":1,"zh_TW":"【尷尬】","ja":"【厄介な】","st":"$^gg^"}
                ,{"icon":"emotion\\emotion.gz.gif","url":"images/expression/emotion.gz.gif","zh_CN":"【鼓掌】","en":"[Applause]","type":1,"zh_TW":"【鼓掌】","ja":"【拍手を送る】","st":"$^ps^"}
                ,{"icon":"emotion\\emotion.hx.gif","url":"images/expression/emotion.hx.gif","zh_CN":"【害羞】","en":"[Shy]","type":1,"zh_TW":"【害羞】","ja":"【シャイ】","st":"$^hx^"}
                ,{"icon":"emotion\\emotion.jk.gif","url":"images/expression/emotion.jk.gif","zh_CN":"【惊恐】","en":"[Panic]","type":1,"zh_TW":"【驚恐】","ja":"【ショック】","st":"$^jk^"}
                ,{"icon":"emotion\\emotion.jy.gif","url":"images/expression/emotion.jy.gif","zh_CN":"【惊讶】","en":"[Surprised]","type":1,"zh_TW":"【驚訝】","ja":"【驚き】","st":"$^jy^"}
                ,{"icon":"emotion\\emotion.kb.gif","url":"images/expression/emotion.kb.gif","zh_CN":"【抠鼻】","en":"[Pick Nose]","type":1,"zh_TW":"【摳鼻】","ja":"【鼻を引いて】","st":"$^kb^"}
                ,{"icon":"emotion\\emotion.kl.gif","url":"images/expression/emotion.kl.gif","zh_CN":"【可怜】","en":"[Whimper]","type":1,"zh_TW":"【可憐】","ja":"【哀れな】","st":"$^kl^"}
                ,{"icon":"emotion\\emotion.ll.gif","url":"images/expression/emotion.ll.gif","zh_CN":"【流泪】","en":"[Sob]","type":1,"zh_TW":"【流淚】","ja":"【涙】","st":"$^ll^"}
                ,{"icon":"emotion\\emotion.qd.gif","url":"images/expression/emotion.qd.gif","zh_CN":"【敲打】","en":"[Hammer]","type":1,"zh_TW":"【敲打】","ja":"【ビート】","st":"$^qd^"}
                ,{"icon":"emotion\\emotion.qh.gif","url":"images/expression/emotion.qh.gif","zh_CN":"【强悍】","en":"[Thumbs Up]","type":1,"zh_TW":"【強悍】","ja":"【ダウティ】","st":"$^qh^"}
                ,{"icon":"emotion\\emotion.qq.gif","url":"images/expression/emotion.qq.gif","zh_CN":"【亲亲】","en":"[Pucker]","type":1,"zh_TW":"【親親】","ja":"【キス】","st":"$^qq^"}
                ,{"icon":"emotion\\emotion.rb.gif","url":"images/expression/emotion.rb.gif","zh_CN":"【弱爆】","en":"[Thumbs Down]","type":1,"zh_TW":"【弱爆】","ja":"【弱いバースト】","st":"$^rb^"}
                ,{"icon":"emotion\\emotion.se.gif","url":"images/expression/emotion.se.gif","zh_CN":"【色】","en":"[Drooling]","type":1,"zh_TW":"【色】","ja":"【色】","st":"$^se^"}
                ,{"icon":"emotion\\emotion.tx.gif","url":"images/expression/emotion.tx.gif","zh_CN":"【偷笑】","en":"[Chuckle]","type":1,"zh_TW":"【偷笑】","ja":"【クスクス笑い】","st":"$^tx^"}
                ,{"icon":"emotion\\emotion.xu.gif","url":"images/expression/emotion.xu.gif","zh_CN":"【嘘】","en":"[Shh]","type":1,"zh_TW":"【噓】","ja":"【ヒス】","st":"$^xu^"}
                ,{"icon":"emotion\\emotion.yun.gif","url":"images/expression/emotion.yun.gif","zh_CN":"【晕】","en":"[Hypnotized]","type":1,"zh_TW":"【暈】","ja":"【目まいがする】","st":"$^yun^"}
            ]
        };
    function initSmileList() {
        var li = '',
            list = smileList.list,
            prefix = smileList.prefix;
        $.each(list, function(i, con){
            li += '<li><a href="javascript: void(0);" title="'+ con.zh_CN +'"><img src="'+ prefix + con.url +'" data-zh="'+ con.zh_CN +'" alt="'+ con.zh_CN +'"></a></li>';
        });
        
        $('.phiz-list').append(li);
    }

    //获取页面视口宽高
    function getViewRect() {
        var pageWidth = window.innerWidth
            ,pageHeight = window.innerHeight;

        if ( typeof pageWidth != 'number' ) {
            if ( document.compatMode == 'CSS1Compat') {
                pageWidth = document.documentElement.clientWidth;
                pageHeight = document.documentElement.clientHeight;
            } else {
                pageWidth = document.body.clientWidth;
                pageHeight = document.body.clientHeight;
            }
        }
        return {
            width: pageWidth,
            height: pageHeight
        };
    }
})(window, jQuery);