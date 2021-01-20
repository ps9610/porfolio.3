    ;(function($,window,document,undefined){
    var airport = {
        init : function(){
            var that = this;
                that.mobileFn();
                that.popupFn();
                that.headerFn();
                that.section01Fn();
                that.section02Fn();
                that.section03Fn();
                //that.footerFn();
        },
        mobileFn :function(){
            
            var _window = $(window);
            var _windowH = _window.innerHeight();
            
            var _mobile = $("#mobile");
            var _wholeWrap = _mobile.find(".whole-wrap");
            var _mobileTitle = _mobile.find(".mobile-title");
            var _mobileSide = _mobile.find(".mobile-side");
            var _closeBtn = _mobile.find(".closeBtn");
            var _moblieMenu = $("#mobile #mobile-menu");
            var _mobileMenuBtn = _mobile.find(".mMenuBtn");
            var _mMenuMain = _moblieMenu.find(".mMenu-main");
            var _mMenuHeader = _moblieMenu.find(".mMenu-header");
            var _mMenuHeaderH = _mMenuHeader.innerHeight();
            var _mMenuMainH = _windowH - _mMenuHeaderH;
            var _popUp = $(".pop-up");
            var _html = $("html");
            var t = 0;
            
            //아코디언메뉴 -> 오류수정확인! 토글변수사용시 조건문에 논리형으로 쓰는것!
            _mobileTitle.each(function(idx){
                var _this = $(this);
                _this.on("click", function(e){
                    e.preventDefault();
                    // console.log(_this);
                    _mobileTitle.removeClass("addSide");
                    if(t==0){
                        t=1;
                        _this.addClass("addSide");
                    }
                    else if(t==1){
                        _this.removeClass("addSide");
                        t=0;
                    }
                    //alert(t);
                    _mobileSide.stop().slideUp(100);
                    _this.next().stop().slideToggle(100);
                })
            })

            //모바일 메뉴(햄버거버튼) 클릭이벤트
            _mobileMenuBtn.on("click", function(e){
                e.preventDefault();
                _wholeWrap.stop().animate({ left:0 },300);
                _mobile.addClass("addMoMenu");
                /* _moblieMenu.css({zIndex : 3, height : _windowH}); */
                _moblieMenu.css({zIndex : 3, height : _mMenuMainH});
                console.log(_mMenuMainH);
                _popUp.css({zIndex : 2});

                _html.addClass("addScroll");
            })

            //모바일 메뉴 닫기버튼 클릭이벤트
            _closeBtn.on("click", function(e){
                e.preventDefault();
                _wholeWrap.stop().animate({ left:-1000 },300);
                _mobile.removeClass("addMoMenu");
                _moblieMenu.css({zIndex : 1, height : 0});
                _popUp.css({zIndex : 4});
                _html.removeClass("addScroll");
            })

            //⭐모바일 메뉴 높이 반응형 조정

            _window.scroll(function(){
                _moblieMenu.css({ top : _window.scrollTop() });   
                //console.log(_window.scrollTop())
            })

            setTimeout(resizeFn,10);
            function resizeFn(){
                _mMenuMain.css({ height : _mMenuMainH });
            }
        
            _window.resize(function(){
                resizeFn();
            })
        },

        popupFn : function(){
            
            var _window = $(window);
            var _winW = $(window).innerWidth();
            var _popUp = $(".pop-up");
            var _slideWrap = _popUp.find(".slide-wrap");
            var _pageWrap = _popUp.find(".page-wrap");

            var _popCloseBtn = $(".pop-close-btn")
            var _closeBtn = _popCloseBtn.find(".closeBtn");
            var _pageBtn = _pageWrap.find(".pageBtn");
            var _header = $("#header");

            var cnt = 0;
            var setId = null;
            var _slideCon = $(".pop-up .slide-container");
            var _slideView = $(".pop-up .slide-view");
            var _slide = $(".pop-up .slide");
            var n = _slide.length;
            var _slideW = _slide.innerWidth();
            var _leftBtn = _popUp.find(".leftBtn");
            var _rightBtn = _popUp.find(".rightBtn");
            var _addPage = _pageWrap.find(".addPage");
            var _playBtn = _pageWrap.find(".pagePlay");
            var _stopBtn = _pageWrap.find(".pageStop");
            var cnt2 = 0;
            var setId2 = 0;
            
            //⭐섹션1에서만 팝업창 실행
/*              if( !_window.offset().top == 0 ){
                _popUp.stop().hide(0);
            }
            else{
                _popUp.stop().show(0);
            }
            console.log( _window.offset().top )  */

            setTimeout(resizeFn,10);
            function resizeFn(){
                // 창넓이 1200이하부터 팝업창 자동없어짐
                if( _winW < 1201 ){
                    _popUp.addClass("addClose");
                    _popUp.css({top : -17});
                    _slide.css({ maxWidth : _winW });
                    _slideWrap.css({ width : _winW*n, marginLeft:-_winW });
                    _slideView.css({ maxWidth : _winW});
                }
                else if( _winW < 801 ){
                    _popUp.addClass("addClose");
                    _slide.css({ maxWidth : _winW });
                    _slideWrap.css({ width : _winW*n, marginLeft:-_winW });
                    _slideView.css({ maxWidth : _winW});
                    _popUp.css({top : -242});
                }
                else{
                    _popUp.removeClass("addClose");
                    _popUp.css({top : 0});
                }
            }
            
            _window.resize(function(){
                resizeFn();
            });


            // 팝업창 닫기 버튼
            _closeBtn
            .on("click", function(e){
                e.preventDefault();
                var _this = $(this);
                    _this.toggleClass("addClose");
                    _popUp.toggleClass("addClose");
                    _header.toggleClass("addClose");
            });

            //팝업창 슬라이드
            function popMainSlideFn(){
                _slideWrap.stop().animate({ left : -(_slideW*cnt) },600,function(){
                    if(cnt>2){cnt=0};
                    if(cnt<0){cnt=2};
                    _slideWrap.stop().animate({ left : -(_slideW*cnt) },0);
                });
                if (_winW <= 1200){
                    _slideW = _winW;
                }
                paginationFn();
            };

            function popNextSlideFn(){
                cnt++;
                popMainSlideFn();
            };

            function popPrevSlideFn(){
                cnt--;
                popMainSlideFn();
            };
            
            //팝업창 슬라이드 arrow 버튼 클릭 이벤트
            _rightBtn
            .on("click", function(e){
                e.preventDefault();
                TimerFn();
                if( !_slideWrap.is(":animated") ){
                    popNextSlideFn();
                }
            
            });
            
            _leftBtn
            .on("click", function(e){
                e.preventDefault();
                TimerFn();
                if( !_slideWrap.is(":animated") ){
                    popPrevSlideFn();
                }
            });

            //팝업창 슬라이드 스와이프 
            _slideCon.swipe({
                swipeRight : function(e){
                    e.preventDefault();
                    TimerFn();
                    if( !_slideWrap.is(":animated") ){
                        popPrevSlideFn();
                    }
                },
                swipeLeft : function(e){
                    e.preventDefault();
                    TimerFn();
                    if( !_slideWrap.is(":animated") ){
                        popNextSlideFn();
                    }
                }
            })

            //팝업창 슬라이드 재생/일시정지 버튼클릭이벤트
            _stopBtn.on("click", function(e){
                e.preventDefault();
                clearInterval(setId);
            });

            _playBtn.on("click", function(e){
                e.preventDefault();
                clearInterval(setId2);
                autoTimerFn();
                popNextSlideFn();
            });

            //팝업창 슬라이드 페이지네이션
            function paginationFn(){
                var z = cnt;
                z > 2 ? z=0 : z;
                z < 0 ? z=2 : z;
                //console.log(z+1);
                _pageBtn.eq(0).addClass("addPage");
                _addPage.text(z+1);
            }

            // 팝업창 슬라이드 타이머
            setTimeout( autoTimerFn,100 );
            function autoTimerFn(){
                setId = setInterval(popNextSlideFn,8000)
            }

            function TimerFn(){
                clearInterval(setId);
                clearInterval(setId2);
                cnt2 = 0;
                setId2 = setInterval(function(){
                    cnt2++;
                    if(cnt2 > 7){
                        clearInterval(setId2);
                        autoTimerFn();
                        popNextSlideFn();
                    }
                },1000)
            }
        },

        headerFn : function(){
            var _header = $("#header");
            var _language = $("#header .languageBtn");
            var _multi = $("#header .multi");
            var _nav = $("#header .mainBtn");
            var _subBg = $("#header .sub-bg");
            var _navSubBg = $("#header .mainBtn, #header .sub-bg");
            var _window = $(window);
            var _wheelNav = $("#wheel-nav");
            var _wheelNavBtn = $("#wheel-nav .mainBtn");
            var _wheelEvent = $(".wheel_event")
            var n = _wheelEvent.length;
            var _delta = null;
            var _htmlBody = $("html, body");
            var _footer = $("#footer");
            var _popUp = $(".pop-up");
            var _section03 = $("#section03");


            //헤더 오른쪽 다국어 select 클릭이벤트
            _language.on("click", function(){
                _multi.toggleClass("addLang");
            });

            // 메인메뉴에 hover시 서브메뉴 보이고 없어지기
            _nav
            .on("mouseenter", function(){
                _header.addClass("addSub");
            })
            .on("focusin", function(){
                _header.addClass("addSub");
            });

            _wheelNavBtn
            .on("mouseenter", function(){
                _header.addClass("addSub");
                _subBg.css({ marginTop : 50 });
            })
            .on("focusin", function(){
                _header.addClass("addSub");
                _subBg.css({ marginTop : 0 });
            });
            
            _subBg.on("mouseenter", function(){
                _header.addClass("addSub");
            })
            
            _navSubBg
            .on("mouseleave", function(){
                _header.removeClass("addSub");
            })
            .on("focusout", function(){
                _header.removeClass("addSub");
            });

            //휠이벤트
            _window.scroll(function(){
                if( _window.scrollTop()>30 ){
                    _header.addClass("addHeader");
                    _wheelNav.addClass("addHeader");
                }
                else{
                    _header.removeClass("addHeader");
                    _wheelNav.removeClass("addHeader");
                }
            })

            //휠 마우스 이벤트
            _wheelEvent.each(function(i){
                var _this = $(this);
                _this.on("mousewheel DOMMouseScroll", function(e){
                    e.preventDefault();
                    
                    //섹션2부터 팝업창 없어짐
                    _window.scroll(function(){
                        if(_delta < 0){
                            _popUp.css({top:-300});
                        }
                        else{
                            _popUp.css({top:0});
                        }
                    })

                    //섹션별 휠마우스 이벤트 if. else 쓸 때 비어있는 줄 없이 쓰기!!!
                    if(e.detail){
                        _delta = e.detail * (-40);
                    }
                    else{
                        _delta = e.originalEvent.wheelDelta;
                    }
                    if(_delta < 0){
                        if(i<n-1){
                            if(i==n-2){
                                _htmlBody.stop().animate({ scrollTop : _footer.offset().top },1000,"easeInOutBack")
                            }
                            else {
                                _htmlBody.stop().animate({ scrollTop : _this.next().offset().top },1000,"easeInOutBack")
                            }
                            _header.addClass("addHeader");
                            _wheelNav.addClass("addHeader");
                        }
                    }
                    else{
                        if(i==n-1){
                            _htmlBody.stop().animate({ scrollTop : _section03.offset().top },1000,"easeInOutBack")
                        }
                        else {
                            _htmlBody.stop().animate({ scrollTop : _this.prev().offset().top },1000,"easeInOutBack")
                        }
                    }
                    console.log(i);
                })
            })
            
        },

        section01Fn : function(){

            var _window = $(window);
            var _section01 = $("#section01");
            var _winH = _window.innerHeight();
            var cnt = 0;
            var setId = null;
            var _slide = $("#section01 .slide");
            var n = _slide.length-1;
            var _nextBtn = _section01.find(".nextBtn");
            var _prevBtn = _section01.find(".prevBtn");
            var _playBtn = _section01.find(".playBtn");
            var cnt2 = 0;
            var setId2 = 0;
            var _pageBtn = _section01.find(".pageBtn");
            var url = null;

            //섹션1 높이 설정
            setTimeout(resizeFn, 10);
            function resizeFn(){
                _winH = _window.innerHeight();
                _section01.css({ height : _winH });
            }

            _window.resize(function(){
                resizeFn();
            })

            //슬라이드 문구 애니메이션 효과주기
            function titleNextMovingFn(){
                _slide.eq(cnt).find("h2").stop().animate({ marginTop : -60, opacity : 1 },800,function(){
                    _slide.eq(cnt).find("h3").stop().animate({ marginTop : -20, opacity : 1 },900)
                });
            }
            function titlePrevMovingFn(){
                _slide.eq(cnt).find("h2").stop().animate({ marginTop : -60, opacity : 1 },800,function(){
                    _slide.eq(cnt).find("h3").stop().animate({ marginTop : -20, opacity : 1 },900)
                });
                //console.log(cnt);
            }
            
            //페이드 인 아웃 슬라이드

            setTimeout(autoTimerFn,10);
            function autoTimerFn(){
                setId = setInterval(nextSlideCountFn,9000);
            }

            function mainNextSlideFn(){ //눈에 보여야 하는게 z-index 3
                _slide.css({zIndex:1});
                _slide.eq(cnt==0? n:cnt-1).css({zIndex:2});
                _slide.eq(cnt).css({zIndex:3}).stop().animate({ opacity:0 },0).stop().animate({ opacity:1 },800,function(){
                    titleNextMovingFn();
                });
                paginationFn();
            }
            function mainPrevSildeFn(){ //현재 눈에 보이는게 없어져야함
                _slide.css({zIndex:1}).stop().animate({ opacity:1 },0);
                _slide.eq(cnt).css({zIndex:2});
                _slide.eq(cnt==n? 0:cnt+1).css({zIndex:3}).stop().animate({ opacity:0 },800,function(){
                    titlePrevMovingFn();
                });
                paginationFn();
            }

            function nextSlideCountFn(){
                cnt++;
                if(cnt>n)cnt=0;
                mainNextSlideFn();
            };
            function prevSlideCountFn(){
                cnt--;
                if(cnt<0)cnt=n;
                mainPrevSildeFn();
            };

            _nextBtn.on({
                click : function(e){
                    e.preventDefault();
                    if( !_slide.is(":animated") ){
                        nextSlideCountFn();
                        timerFn();
                    }
                }
            });

            _prevBtn.on({
                click : function(e){
                    e.preventDefault();
                    if( !_slide.is(":animated") ){
                        prevSlideCountFn();
                        timerFn();
                    }
                }
            });

            //페이지네이션
            function paginationFn(){
                var z = cnt;
                z>n? z=0 : cnt;
                _pageBtn.removeClass("addEffect");
                _pageBtn.eq(z).addClass("addEffect");
            }

            _pageBtn.each(function(i){
                var _this = $(this);
                _this.on({
                    click : function(e){
                        e.preventDefault();
                        timerFn();
                        var _temporary = cnt;
                        cnt = i;
                        //console.log("tem",_temporary);
                        //console.log("cnt",cnt);
                        //console.log("i",i);
                        if( !_slide.is(":animated") ){
                            if(_temporary<i)mainNextSlideFn();
                            if(_temporary>i)mainPrevSildeFn();
                        }
                    }
                })
            })

            function timerFn(){
                clearInterval(setId);
                clearInterval(setId2);
                cnt2 = 0;
                setId2 = setInterval(function(){
                    cnt2++;
                    console.log(cnt2);
                    if(cnt2>7){
                        clearInterval(setId2);
                        autoTimerFn();
                        nextSlideCountFn();
                    }
                },1000)
            }

            _playBtn.on({
                click : function(){
                    clearInterval(setId);
                    var _this = $(this);
                    _this.addClass("addPlay");
                    timerFn();
                }
            })
        },
        section02Fn : function(){
            var _win = $(window);
            var _winH = _win.innerHeight();
            var _section02 = $("#section02");
            
            function resizeFn(){
                _section02.css({ height : _winH });
            }

            _win.resize(function(){
                resizeFn();
            })
        },
        section03Fn : function(){
            var _win = $(window);
            var _winH = _win.innerHeight();
            var _section03 = $("#section03");
            
            function resizeFn(){
                _section03.css({ height : _winH });
            }

            _win.resize(function(){
                resizeFn();
            })
        }
    }

    airport.init();
})(jQuery,window,document);