$(document).ready(function(){

	//메인 배너롤링 스크립트
	$(".noscript").remove();
	$('#slide').cycle({
		fx:'fade',
		speed:2500,
		timeout:5000,
		easing:'easeOutExpo',
		pager:'#navigator',
		slideExpr: 'div'
	});
	$('#control a:nth-child(1)').click(function(){
		$('#slide').cycle('resume');
		$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_off', '_on'));
		$('#control a:nth-child(2)').find('img').attr('src', $('#control a:nth-child(2)').find('img').attr('src').replace('_on', '_off'));
	});
	$('#control a:nth-child(2)').click(function(){
		$('#slide').cycle('pause');
		$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_off', '_on'));
		$('#control a:nth-child(1)').find('img').attr('src', $('#control a:nth-child(1)').find('img').attr('src').replace('_on', '_off'));
	});

	//GNB 스크립트
	$('#gnb > li > h2 > a').bind('mouseenter focusin',function(){
		$("#header").animate({'height':'500px'},'2500', 'easeOutExpo'); // 2015-02-26 높이 수정  530px
		$(this).parent().parent().find('.depth2').css('background','#00bae3');
		var $img = $(this).parent().parent().find('.depth2 img')
		$img.each(function(){
			var _this = $(this)
			_this.attr('src', _this.attr('src').replace('_off', '_on'));
		});

		$('.depth2').bind('mouseenter focusin',function(){
			$(this).css('background','#00bae3');
			var $img = $(this).find('img')
				$img.each(function(){
				var _this = $(this)
				_this.attr('src', _this.attr('src').replace('_off', '_on'));
			});
		});
	});
	$('img.depth3_over').each(function() {
		$(this).mouseenter(function() {
			if ($(this).attr('src').match('_on')) {
				$(this).attr('src', $(this).attr('src').replace('_on', '_on2'));
				$(this).mouseleave(function() {
				$(this).attr('src', $(this).attr('src').replace('_on2', '_on'));
				});
			};
		});
	});
	$('.parentImg').each(function() {
		$(this).mouseenter(function(){
			$(this).parent().parent().find('li:first-child').find('img').attr('src', $(this).parent().parent().find('li:first-child').find('img').attr('src').replace('_on', '_on2'));
		}).mouseleave(function(){
			$(this).parent().parent().find('li:first-child').find('img').attr('src', $(this).parent().parent().find('li:first-child').find('img').attr('src').replace('_on2', '_on'));
		});
	});
	$('.depth3 > li').each(function() {
		$(this).mouseenter(function(){
			$(this).parent().parent().find('.parentImg').attr('src', $(this).parent().parent().find('.parentImg').attr('src').replace('_on', '_on2'));
		}).mouseleave(function(){
			$(this).parent().parent().find('.parentImg').attr('src', $(this).parent().parent().find('.parentImg').attr('src').replace('_on2', '_on'));
		});
	});
	$('#gnb > li > h2 > a').bind('mouseleave focusout',function(){
		$(this).parent().parent().find('.depth2').css('background','none');
		var $img = $(this).parent().parent().find('.depth2 img')
		$img.each(function(){
			var _this = $(this)
			_this.attr('src', _this.attr('src').replace('_on', '_off'));
		});
		$('.depth2').bind('mouseleave focusout',function(){
			$(this).css('background','none');
			var $img = $(this).find('img')
			$img.each(function(){
				var _this = $(this)
				_this.attr('src', _this.attr('src').replace('_on', '_off'));
			});
		});
	});
	$('#header').bind('mouseleave',function(){
		$("#header").animate({'height':'157px'},'2500','easeOutExpo'); /* GNB 높이 */
	});
	$('#gnbClose').bind('click focusout',function(){
		$("#header").animate({'height':'157px'},'fast','easeOutExpo'); /* GNB 높이 */
	});

	// GNB 메뉴 고정 2015-04-01
	$(function(){ 
		$(window).scroll(function(){ 
			if($(window).scrollTop() >= 40) { 
			$("#fixed").addClass('fixed');
			}else{
			$("#fixed").removeClass('fixed');
			}
		});
	}); 

	// 공통 이미지 롤오버 스크립트
	$('img.overImg').each(function() {
		$(this).mouseenter(function() {
			if ($(this).attr('src').match('_off')) {
				$(this).attr('src', $(this).attr('src').replace('_off', '_on'));
				$(this).mouseleave(function() {
				$(this).attr('src', $(this).attr('src').replace('_on', '_off'));
				});
			};
		});
	});
/*
	//메인 탭 컨텐츠
	$("#tabSection > div").hide().filter("div:first").show();
	$('#tabSection h3 a').bind("mouseover focus",function(){
		var mainNum = $("#tabSection h3 a").index($(this));
		$("#tabSection h3 a img").each(function(){
		$(this).attr("src", $(this).attr("src").replace("_on.", "_off."));
	});
		//메인 탭 구분선 처리
		if(mainNum == 0){
			$('.tab02, .tab03').css('background','url(images/common/bg_line03.gif) right center no-repeat');
		}else if(mainNum == 1){
			$('.tab03').css('background','url(images/common/bg_line03.gif) right center no-repeat');
			$('.tab01').css('background','none');
		}else if(mainNum == 2){
			$('.tab01').css('background','url(images/common/bg_line03.gif) right center no-repeat');
			$('.tab02').css('background','none');
		}else if(mainNum == 3){
			$('.tab01, .tab02').css('background','url(images/common/bg_line03.gif) right center no-repeat');
			$('.tab03').css('background','none');
		};
		$(this).find("img").attr("src", $(this).find("img").attr("src").replace("_off.", "_on."));
		$("#tabSection > div").hide();
		$($("#tabSection > div")[mainNum]).show();
		return false;
	});
*/
	//서브 탭 컨텐츠
	$("#tabSection_sub > div").hide().filter("div:first").show();
	$('#tabSection_sub h4 a').bind("click focus",function(){
		var subNum = $("#tabSection_sub h4 a").index($(this));
		$("#tabSection_sub h4 a img").each(function(){
			$(this).attr("src", $(this).attr("src").replace("_on.", "_off."));
		});
		$(this).find("img").attr("src", $(this).find("img").attr("src").replace("_off.", "_on."));
		$("#tabSection_sub > div").hide();
		$($("#tabSection_sub > div")[subNum]).show();
		return false;
	});

	//상품
	$('.product').each(function() {
		var product = $(this);
		var play = product.parent().parent().find('.play');
		var stop = product.parent().parent().find('.stop');
		product.cycle({
			speed:'slow',
			timeout:3000,
			fx:'fade',
			slideExpr: 'img',
			before:function(curr,next, opts) {
				$(opts.caption).html( "<a href='javascript:openWin("+$(next).attr('seq')+")'>" + $(next).attr('alt') + "</a>" );
			},
				caption:product.parent().find('.productName')
		});
		play.click(function(){
			product.cycle('resume');
		});
		stop.click(function(){
			product.cycle('pause');
		});
	});

	//와츠뉴 공지 
	whatsnew = $('.whatsnew').bxSlider({
		controls: false,
		pager:false,
		maxSlides: 3,
		moveSlides: 1,
		slideWidth: 400,
		auto: true,
		autoDelay:5000,
		speed:1000
	});

	if(whatsnew.find('li').not('.bx-clone').length > 2){
		whatsnew.find('li').not('.bx-clone').width('300');
	};

	$('#whatsnew-Prev').click(function(){
		whatsnew.goToPrevSlide();
	});
	$('#whatsnew-Next').click(function(){
		whatsnew.goToNextSlide();
	});
	$('#whatsnew-Toggle').toggle(
		function(){
			 $(this).find('img').attr({
				src: 'images/btns/btn_whatnewPlay.gif',
				alt: '와츠뉴 공지 재생'
			});
			whatsnew.stopAuto();
		},
		function(){
			 $(this).find('img').attr({
				src: 'images/btns/btn_whatnewStop.gif',
				alt: '와츠뉴 공지 정지'
			});
			whatsnew.startAuto();
	});

	//패밀리 사이트
	$('.familySite h3').toggle(
			function(){
				$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_off', '_on'));
				 $(this).find('img').attr('alt','패밀리 사이트 닫기');
				$(this).parent().find('ul').fadeIn();
			},
			function(){
				$(this).find('img').attr('src', $(this).find('img').attr('src').replace('_on', '_off'));
				 $(this).find('img').attr('alt','패밀리 사이트 펼치기');
				$(this).parent().find('ul').fadeOut();
	});

	//placeholder 처리
	$('[placeholder]').on({
	focus: function() {
		if( $(this).val() == $(this).attr('placeholder') ) {
			$(this).val('');
		}
	},
	blur: function(){
		if( !$(this).val() ) {
			$(this).val( $(this).attr('placeholder') );
		}
	}
	}).each( function() {
		$(this).val( $(this).attr('placeholder') ) ;
	});

	//iframe 리사이징
	function reSizeIframe()
	{
		var theFrame = $("#recruitFrame", parent.document.body);
		theFrame.height($(document.body).height());
	}
	reSizeIframe();

/*
	//textarea text제거
	$('#txtCont').focus(function(){
		$(this).text('');
	});

	*/
});


//지도 프린트
function content_print(){
	var initBody = document.body.innerHTML;
		window.onbeforeprint = function(){
		document.body.innerHTML = document.getElementById('printArea').innerHTML;
	};
		window.onafterprint = function(){
		document.body.innerHTML = initBody;
	};
	window.print()
	location.reload();
}
//오시는길 trintArea 오류 - 지도 프린트 재설정
function contentPrint(){
	var initBody = document.body.innerHTML;
		window.onbeforeprint = function(){
		document.body.innerHTML = document.getElementById('skipCont').innerHTML;
	};
		window.onafterprint = function(){
		document.body.innerHTML = initBody;
	};
	window.print();
	location.reload();
}

//시뮬레이션 숫자만 받기
var rgx1 = /\D/g;
var rgx2 = /(\d+)(\d{3})/;
function getNumber(obj){
	var num01;
	var num02;
	num01 = obj.value;
	num02 = num01.replace(rgx1,"");
	num01 = setComma(num02);
	if(num01.indexOf("0")==0){
		num01 = num01.replace(num01.indexOf("0"),'');
	}
	obj.value =  num01;
}
function setComma(inNum){
	var outNum;
	outNum = inNum; 
	while (rgx2.test(outNum)) {
		outNum = outNum.replace(rgx2, '$1' + ',' + '$2');
	}
	return outNum;
}

//상품 상세 팝업 열기
function openWin(){
	window.open("../popup/popProduct.asp", "", "width=425, height=685, toolbar=no, menubar=no, scrollbars=no, resizable=yes" );
};

/* 2015-02-27 */
$(function(){
	$('ul.tabNew h4').each(function(i) {
		$(this).click(function(e) {
			e.preventDefault();
			$('ul.tabNew h4').each(function(j){
				$(this).find("img").attr("src", $(this).find("img").attr("src").replace("_on","_off"));
			});
			$(this).find("img").attr("src", $(this).find("img").attr("src").replace("_off","_on"));
			$(".lieftCont").hide();
			$(".lieftCont").eq(i).show();
			
		});
	});
	$('div.lieftCont').each(function() {
		$(this).find('div.cont:first').show();
	});

	$('h5 a').click(function() {
		if(!$(this).hasClass('on')) {
			$(this).addClass('on').parent('h5').siblings ('h5').find('a.on').removeClass('on');
			$($(this).attr('href')).show().siblings('div.cont').hide();
			}
		this.blur();
		return false;
	});
});

/* 2015-03-09 */
$(function(){
	$('.differentCont h4 a').each(function(i) {
		$(this).click(function(e) {
			e.preventDefault();
			$('.differentCont h4 a').each(function(j){
				$(this).find("img").attr("src", $(this).find("img").attr("src").replace("_on","_off"));
			});
			$(this).find("img").attr("src", $(this).find("img").attr("src").replace("_off","_on"));
		});
	});
	$('div.differentCont').each(function() {
		$(this).find('div.cont:first').show();
	});

	$('.differentCont h4 a').click(function() {
		if(!$(this).hasClass('on')) {
			$(this).addClass('on').parent('.differentCont h4').siblings ('.differentCont h4').find('a.on').removeClass('on');
			$($(this).attr('href')).show().siblings('div.cont').hide();
			}
		this.blur();
		return false;
	});
});

function opencenter(winNM,width,height)
		{
		var sw=screen.availWidth;                           
		var sh=screen.availHeight;                         

		var px=(sw-width)/2;
		var py=(sh-height)/2;

		var set='top='+py+',left='+px;
		set+=',width='+width+',height='+height+
		',toobar=0,resizable=0,status=0,scrollbars=10';

		window.open(winNM,'',set);
	}
	
	
	/* 2017-08-24*/
	;(function($, window) {
	'use strict';
	var APP = window.APP || {};
	window.APP = APP;

	$(function(){
		APP.select.init();
		var visual = $(".banner_area .bxslider").bxSlider({ 
			auto: ($('.banner_area .bxslider').children().length < 2) ? false : true,
			speed : 500,
			autoControls: true
		});
		$(".gnb_list li").on('mouseover' , function(){
			$(".gnb_list li").removeClass("on");
			$(this).addClass("on");
			TweenMax.to('.gnb', .5, { height:"250px", ease: Expo.easeOut});
		});
		$(".gnb").mouseleave(function(){
			$(".gnb_list li").removeClass("on");
			TweenMax.to(this, .5, { height:"90px", ease: Expo.easeOut});
		});
		var last = 0;
		$(window).scroll(function(e){ e.preventDefault();
			var this_top = $(this).scrollTop()
			// 스크롤 시작
			if( this_top > 0 ) { 
				$(".header").addClass("fixed")
			}
			else if( this_top == 0 ){ 
				$(".header").removeClass("fixed")
			}
			last = this_top;
		});
	});
	APP.select = { // 셀렉트 박스
		target : ".select_wrap select",
		init : function(target) {
			var self = this;
			default_select();
			$(this.target).on({ "change" : function() { self.change($(this)) } });
		},
		change : function( target ) {
			var select_txt = target.find("option:selected").text();
			target.prev("em").text(select_txt);
		}
	};
	function default_select(){ 
		$(".select_wrap").each(function(){
			var default_txt = $(this).find("select option").eq(0).text();
			$(this).find("em").text(default_txt);
		});
	}
})(window.jQuery, window);
