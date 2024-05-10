// глобальные переменные для слайдера(arrow)

var slickPrevArrow = '<button type="button" class="slick-arrow slick-prev"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.7 24L10.6667 15.9667L18.7 7.93335L20.1333 9.36668L13.5333 15.9667L20.1333 22.5667L18.7 24Z" fill="#2D2D2D"/></svg></button>',
slickNextArrow = '<button type="button" class="slick-arrow slick-next"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3 7.99998L21.3333 16.0333L13.3 24.0667L11.8667 22.6333L18.4667 16.0333L11.8667 9.43332L13.3 7.99998Z" fill="#2D2D2D"/></svg></button>'

// === функция для преобразования
// window.location.search = "?sort_name=price&sort_method=ASC&lol=kek"
let getObjFromWindowLocationSearch = (locationSearch) => {

	// === результат
	let objResult = new Object();

	if (locationSearch.length === 0) {
		return objResult;
	}

	// === исключить первый символ ?
	if (locationSearch[0] === '?') {
		locationSearch = locationSearch.slice(1);
	}

	// === получить массив с разбивкой строки по символу '&'
	let arTmp = locationSearch.split('&');


	// === перебрать массив и получить из него объект
	arTmp.forEach((element, index) => {

		// === получить массив с разбивкой строки по символу '='
		let arTmp = element.split('=');
		objResult[arTmp[0]] = arTmp[1];

	});

	return objResult;
};


// === функция для обратного преобразования

// в строку "?sort_name=price&sort_method=ASC&lol=kek" для window.location.search
let getWindowLocationSearchFromObj = (obj) => {

	// === результат
	let strResult = '';

	// === добавить в строку первым символом '?'
	strResult += '?';

	// === перебрать объект
	for (let i in obj) {
		strResult += i;
		strResult += '=';
		strResult += obj[i];
		strResult += '&';
	}

	// === если последний символ '&'
	// отрезать его
	if (strResult.slice(-1) === '&') {
		strResult = strResult.slice(0, -1);
	}

	return strResult;

};


// === изменение URL в адресной строке без перезагрузки страницы
let updateURL = function (newUrl) {
	if (history.pushState) {
		history.pushState(null, null, newUrl);
	} else {
		console.warn('Dаш браузер не поддерживает History API');
	}
}


$(document).ready(function() {

	// Подмена хедера по скроллу
	$(window).scroll(function(){
		if ((window.innerWidth >= 1281) && ($(this).scrollTop() > 151)) {
			$('.header').addClass('header-active');
		} else if ((window.innerWidth <= 1280) && ($(this).scrollTop() > 120)) {
			$('.header').addClass('header-active');
		} else if ((window.innerWidth <= 768) && ($(this).scrollTop() > 67)) {
			$('.header').addClass('header-active');
		} else if ((window.innerWidth <= 576) && ($(this).scrollTop() > 56)) {
			$('.header').addClass('header-active');
		} else {
			$('.header').removeClass('header-active');
		}
	}).scroll();


	if ($(".cabinet-section").length > 0){
		$(".breadcrumbs").addClass("breadcrumbs--cabinet")
	}	

	if ($(".orders-item").length > 0){
		$(".orders-item__head").on("click",function(){
			$(this).toggleClass("opened").next(".orders-item__body").stop().slideToggle()
		})
	}

	if ($(".icon-eye").length > 0){
		$(".icon-eye").on("click",function(){
			let input = $(this).parents(".input-item").find("input")
			let attr = input.attr('type')

			if (attr === "password"){
				input.attr("type","text")
			}else{
				input.attr("type","password")
			}
		})
	}

	$('.cards-slider').on('setPosition', function () {
		$(this).find('.cards-slider .product-card').height('auto');
		var slickTrack = $(this).find('.slick-track');
		var slickTrackHeight = $(slickTrack).height();
		$(this).find('.cards-slider .product-card').css('height', slickTrackHeight + 'px');
	});

	initSliderCardImage()

	// $(document).on("click",".product-card__favorite",function() {
	// 	$(this).toggleClass('product-card__favorite-active');
	// });

	// $(document).on("click",".project-card__favorite",function() {
	// 	$(this).toggleClass('project-card__favorite-active');
	// });
	//
	// $(document).on("click",".product-info__favorite",function() {
	// 	$(this).toggleClass('product-info__favorite-active');
	// });

	$('.cards-slider').slick({
		slidesToShow: 6,
		slidesToScroll: 4,
		speed: 1000,
		swipeToSlide: false,
		dots: true,
		arrows: true,
		infinite: false,
		rows: 1,
		prevArrow: slickPrevArrow,
		nextArrow: slickNextArrow,
		responsive: [
			{
				breakpoint: 1920,
				settings: {
					slidesToShow: 5,
				}
			},
			{
				breakpoint: 1281,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 577,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},
		]
	});

	$('.brands-slider').slick({
		slidesToShow: 6.86,
		swipeToSlide: true,
		dots: false,
		arrows: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 1441,
				settings: {
					slidesToShow: 5.5,
				}
			},
			{
				breakpoint: 1281,
				settings: {
					slidesToShow: 3.66,
				}
			},
			{
				breakpoint: 769,
				settings: {
					slidesToShow: 4.27,
				}
			},
			{
				breakpoint: 577,
				settings: {
					slidesToShow: 3.36,
				}
			},
		]
	});

	$('.illustrations-slider').slick({
		slidesToShow: 2,
		swipeToSlide: true,
		dots: true,
		arrows: true,
		infinite: false,
		rows: 0,
		prevArrow: slickPrevArrow,
		nextArrow: slickNextArrow,
		responsive: [
			{
				breakpoint: 577,
				settings: {
					slidesToShow: 1,
				}
			},
		]
	});

	$('.project-article__slider').slick({
		slidesToShow: 1,
		swipeToSlide: true,
		dots: true,
		arrows: true,
		infinite: true,
		rows: 0,
		prevArrow: slickPrevArrow,
		nextArrow: slickNextArrow,
		speed: 500,
		fade: true,
		cssEase: 'linear'
	});

	$('.main-block__slider').slick({
		slidesToShow: 1,
		swipeToSlide: true,
		dots: false,
		arrows: false,
		infinite: true,
		rows: 0,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 2500,
	});

	$('.more-articles__list').slick({
		slidesToShow: 5,
		swipeToSlide: true,
		dots: true,
		arrows: true,
		infinite: false,
		rows: 1,
		prevArrow: slickPrevArrow,
		nextArrow: slickNextArrow,
		responsive: [
			{
				breakpoint: 1441,
				settings: {
					slidesToShow: 4,
				}
			},
			{
				breakpoint: 1281,
				settings: {
					slidesToShow: 4,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 577,
				settings: {
					slidesToShow: 2,
				}
			},
		]
	});

	$('#contactsSlider1').slick({
		slidesToShow: 1,
		swipeToSlide: true,
		dots: true,
		arrows: true,
		infinite: false,
		rows: 1,
		prevArrow: slickPrevArrow,
		nextArrow: slickNextArrow,
		appendDots: $('.contacts__nav1'),
		appendArrows: $('.contacts__nav1'),
	});

	$('#contactsSlider2').slick({
		slidesToShow: 1,
		swipeToSlide: true,
		dots: true,
		arrows: true,
		infinite: false,
		rows: 1,
		prevArrow: slickPrevArrow,
		nextArrow: slickNextArrow,
		appendDots: $('.contacts__nav2'),
		appendArrows: $('.contacts__nav2'),
	});

	$('.index-social__slider').slick({
		slidesToShow: 5,
		slidesToScroll: 3,
		speed: 1000,
		swipeToSlide: false,
		dots: false,
		arrows: true,
		infinite: false,
		rows: 1,
		prevArrow: slickPrevArrow,
		nextArrow: slickNextArrow,
		appendArrows: $('.index-social__container'),
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 769,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 577,
				settings: {
					slidesToShow: 2,
				}
			},
		]
	});

	$('.index-reviews__slider').slick({
		slidesToShow: 3,
		swipeToSlide: true,
		dots: true,
		arrows: true,
		infinite: false,
		rows: 1,
		prevArrow: slickPrevArrow,
		nextArrow: slickNextArrow,
		responsive: [
			{
				breakpoint: 577,
				settings: {
					slidesToShow: 2,
				}
			},
		]
	});

	$('.index-reviews__slider-video').slick({
		slidesToShow: 2,
		swipeToSlide: true,
		dots: true,
		arrows: true,
		infinite: false,
		rows: 1,
		prevArrow: slickPrevArrow,
		nextArrow: slickNextArrow,
		responsive: [
			{
				breakpoint: 577,
				settings: {
					slidesToShow: 1,
				}
			},
		]
	});

	if ( $('.product-info__for').length > 0) {

		let productInfoNav = new Swiper(".product-info__nav", {
			spaceBetween: 15,
			slidesPerView:5,
			freeMode: true,
			watchSlidesProgress: true,
			breakpoints: {
				320: {
					slidesPerView:4,
				},
				769: {
					slidesPerView:2,
				},
				1024: {
					slidesPerView:3,
				},
				1281: {
					slidesPerView:4,
				},
				1441: {
					slidesPerView:5,
				},				
			},
			on: {
				init: function (swiper) {

					let countVisible = 5

					if ($(window).width() < 1440 ){
						countVisible = 4
					}

					if ($(window).width() <= 1280 ){
						countVisible = 3
					}

					if ($(window).width() < 1024 ){
						countVisible = 2
					}

					if ($(window).width() < 769 ){
						countVisible = 4
					}

					if (swiper.slides.length < countVisible){
						$(".product-info__nav").addClass('centered');
					}						
						
				},
			},
		  });
		  
		let productInfoFor = new Swiper(".product-info__for", {
			navigation: {
				nextEl: ".swiper-next",
				prevEl: ".swiper-prev",
			},
			thumbs: {
				swiper: productInfoNav,
			},
		})
	}

	$(document).on("click",".added-popup__toggle",function() {
		$(this).toggleClass('opened');
		$('.added-popup__list').toggleClass('show');

		if ($(this).hasClass('opened')){
			$(this).children('span').text($(this).attr('data-text-active'))
		}else{
			$(this).children('span').text($(this).attr('data-text'))
		}
	});

	function locationPopup() {
		let popup = $('.added-popup');
		let overlay = $('.overlay');
		let menu = $('.header-menu ');
		$(document).on("click",".product-card__basket",function() {
			$('body').addClass('hidden');
			popup.addClass('active');
			overlay.addClass('active-v2');
			menu.removeClass('active');
		});

		$(document).on("click",".popup-close",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active-v2');
		});

		$(document).on("click",".overlay",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active-v2');
		});
	}
	
	locationPopup();

	$(document).on("click",".project-card__marker",function() {
		$(this).parent().toggleClass('active');
	});

	$(document).on('mouseup', function (e) {
		let s = $('.project-card__item.active');
		if (!s.is(e.target) && s.has(e.target).length === 0) {
			s.removeClass('active')
		}
	});

	$(document).on("click",".header-location__button",function() {
		$(this).parent().toggleClass('opened');
		$(".header-premises").removeClass('opened');
		$(".header-lang").removeClass('opened');
		$(".header-catalog").removeClass('opened');
	});

	$(document).on("click",".header-lang__button",function() {
		$(this).parent().toggleClass('opened');
		$(".header-premises").removeClass('opened');
		$(".header-location").removeClass('opened');
		$(".header-catalog").removeClass('opened');
	});

	$(document).on("click",".header-catalog__button",function() {
		$(this).parent().toggleClass('opened');
		$(".header-premises").removeClass('opened');
		$(".header-lang").removeClass('opened');
		$(".header-location").removeClass('opened');
	});

	$(document).on("click",".header-premises__button",function() {
		$(this).parent().toggleClass('opened');
		$(".header-catalog").removeClass('opened');
		$(".header-lang").removeClass('opened');
		$(".header-location").removeClass('opened');
	});

	$(document).on("click",".header-menu__location-button",function() {
		$(".header-menu__location-dropdown").toggleClass('opened');
		$(".header-menu__lang-dropdown").removeClass('opened');
		$(".header-menu__lang-button").removeClass('active');
	});

	$(document).on("click",".header-menu__lang-button",function() {
		$(this).toggleClass('active');
		$(".header-menu__lang-dropdown").toggleClass('opened');
		$(".header-menu__location-dropdown").removeClass('opened');
	});

	function menuPopup() {
		let popup = $('.header-menu');
		let overlay = $('.overlay');

		$(document).on("click",".header-menu-button",function() {
			$('body').addClass('hidden');
			popup.addClass('active');
			overlay.addClass('active-v2');
		});

		$(document).on("click",".header-menu__close",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active-v2');
		});

		$(document).on("click",".overlay",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active-v2');
		});
	}
	menuPopup();

	function searchMobile() {
		let popup = $('.header-center .search-form');

		$(document).on("click",".header-search",function() {
			popup.addClass('opened');
		});

		$(document).on("click",".search-form__close",function() {
			popup.removeClass('opened');
		});
	}
	searchMobile();

	function backCall() {
		let popup = $('.back-call');
		let menu = $('.header-menu ');
		let overlay = $('.overlay');

		$(document).on("click",".back-call-button",function() {
			$('body').addClass('hidden');
			popup.addClass('active');
			overlay.addClass('active-v2');
			menu.removeClass('active');
		});

		$(document).on("click",".popup__close",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active-v2');
		});

		$(document).on("click",".overlay",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active-v2');
		});
	}
	backCall();

	function buyClick() {
		let popup = $('.buy-click');
		let overlay = $('.overlay');

		$(document).on("click",".product-info__buy",function() {
			$('body').addClass('hidden');
			popup.addClass('active');
			overlay.addClass('active-v2');
		});

		$(document).on("click",".popup__close",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active-v2');
		});

		$(document).on("click",".overlay",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active-v2');
		});
	}
	buyClick();

	function success() {
		let popup = $('.success');
		let overlay = $('.overlay');

		$(document).on("click",".popup__close",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active-v2');
		});

		$(document).on("click",".overlay",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active-v2');
		});
	}
	success();

	function successReview() {
		let popup = $('.success-review');
		let overlay = $('.overlay');

		$(document).on("click",".reviews-form__fields .form__submit",function() {
			$('body').addClass('hidden');
			popup.addClass('active');
			overlay.addClass('active-v2');
		});

		$(document).on("click",".popup__close",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active-v2');
		});

		$(document).on("click",".overlay",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active-v2');
		});
	}
	successReview();
	function cartPopup() {
		let popup = $('.items-cart');
		let overlay = $('.overlay');
		let header = $('.header-base, .header-new');
	
		$('.header-center__basket').hover(
			function() {
				itemsCart();
				popup.addClass('active');
				overlay.addClass('active');
				header.addClass('active');
			}, function() {
				popup.removeClass('active');
				overlay.removeClass('active');
				header.removeClass('active');
			}
		);

		$('.items-cart').hover(
			function() {
				$('body').addClass('hidden');
				$(this).addClass('active');
				overlay.addClass('active');
				header.addClass('active');
			}, function() {
				$('body').removeClass('hidden');
				$(this).removeClass('active');
				overlay.removeClass('active');
				header.removeClass('active');

			}
		);

		$(document).on("click",".items-cart__close",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active');
			header.removeClass('active');
		});

		$(document).on("click",".overlay",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active');
			header.removeClass('active');
		});
	}
	cartPopup();

	function itemsCart(){
		$.ajax({
			url: '/local/templates/azimut/ajax/get-to-basket.php',
			method: 'post',
			dataType: 'json',
			success: function (response) {
				createPopupBasked(response)
			},
			error: function (error) {

				console.log('ajax error', error.responseText)

				$('body').removeClass('hidden');
				$('.added-popup').removeClass('active');
				$('.overlay').removeClass('active-v2');
			}

		});
	}

	function projectPopup() {
		let popup = $('.project-article__popup');
		let overlay = $('.overlay');
		let parent = $('.project-article');

		$(document).on("click",".project-article__slide img",function() {
			$('body').addClass('hidden');
			popup.addClass('active');
			overlay.addClass('active-v2');
			parent.addClass('active');
		});

		$(document).on("click",".project-article__close",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active-v2');
			parent.removeClass('active');
		});

		$(document).on("click",".overlay",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active-v2');
			parent.removeClass('active');
		});
	}
	projectPopup();

	function reviewPopup() {
		let popup = $('.review-popup');
		let overlay = $('.overlay');

		$(document).on("click",".text-review__link",function() {
			$('body').addClass('hidden');
			popup.addClass('active');
			overlay.addClass('active-v2');
		});

		$(document).on("click",".review-popup .popup__close",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active-v2');
		});

		$(document).on("click",".overlay",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active-v2');
		});
	}
	reviewPopup();

	function filter() {
		let popup = $('.catalog-info__filters');
		let overlay = $('.overlay');

		$(document).on("click",".catalog-items__filter",function() {
			$('body').addClass('hidden');
			popup.addClass('active');
			overlay.addClass('active-v2');
		});

		$(document).on("click",".catalog-filters__close",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active-v2');
		});

		$(document).on("click",".overlay",function() {
			$('body').removeClass('hidden');
			popup.removeClass('active');
			overlay.removeClass('active-v2');
		});
	}
	filter();

	$('.another-article__descr').each(function() {
		if ($(window).width() >= 1281) {
			if ( $(this).height() >= 144 ) {
				$(this).addClass('hide');
			}
		}
		if ($(window).width() >= 769) {
			if ( $(this).height() >= 176 ) {
				$(this).addClass('hide');
			}
		}
		if ($(window).width() <= 768) {
			if ( $(this).height() >= 200 ) {
				$(this).addClass('hide');
			}
		}
	});

	$(document).on("click",".brands__more",function() {
		
		$(this).closest('.brands__item').toggleClass('opened');

		let ul = $(this).parents('.brands__content').find('.brands__categories');
		let defaultHeight = 175
		let newHeight = 0

		if ($(this).closest('.brands__item').hasClass('opened')){
			$(this).text($(this).attr('data-text-active'))

			ul.children().map(function(){
				newHeight = newHeight + $(this).outerHeight(true)
			})		
	
			ul.height(newHeight)

		}else{
			$(this).text($(this).attr('data-text'))
			ul.scrollTop(0)
			ul.height(defaultHeight)
		}
	});

	var $tabs = $('.history__tab');
	var $tabContent = $('.history__item');

	// активация дефолтной закладки
	activateTab(0);

	// обработчик событий для вкладок
	$tabs.on('click', function() {
		var tabIndex = $(this).index();
		activateTab(tabIndex);
	});

	// обработчики событий для кнопок переключения
	$('.history__prev').on('click', function() {
		var activeIndex = $tabs.filter('.active').index();
		var prevIndex = activeIndex === 0 ? $tabs.length - 1 : activeIndex - 1;
		activateTab(prevIndex);
	});

	$('.history__next').on('click', function() {
		var activeIndex = $tabs.filter('.active').index();
		var nextIndex = activeIndex === $tabs.length - 1 ? 0 : activeIndex + 1;
		activateTab(nextIndex);
	});

	function activateTab(index) {
		$tabs.removeClass('active');
		$tabContent.removeClass('active');

		$($tabs[index]).addClass('active');
		$($tabContent[index]).addClass('active');
	}

	function categoryTabs() {
		$('#categoryTabs').each(function () {
			let ths = $(this);
			ths.find('.popular-categories__item').not(':first').hide();
			ths.find('.popular-categories__tab').click(function () {
				ths.find('.popular-categories__tab').removeClass('active').eq($(this).index()).addClass('active');
				ths.find('.popular-categories__item').hide().eq($(this).index()).fadeIn();
				$(".popular-categories__slider").slick('setPosition');
				$(".product-card__image").slick('setPosition');
			}).eq(0).addClass('active');
		});
	}
	categoryTabs();

	$(document).on("click",".history__mobile-button, .history__mobile-date, .history__mobile-title, .history__mobile-icon",function() {
		$(this).parent().toggleClass('opened');
		$(this).closest('.history__mobile-item').children('.history__mobile-button').text($(this).closest('.history__mobile-item').children('.history__mobile-button').text() == 'Подробнее' ? 'Скрыть' : 'Подробнее');
	});

	$(document).on("click",".product-info__sizes button",function() {
		$(this).parent().toggleClass('open');
	});

	if ($(window).width() <= 1280) {
		$('.product-info__info-list').appendTo('.product-info__wrapper');
		$('.product-info__sizes').appendTo('.product-info__wrapper');
	}

	if ($(window).width() <= 768) {
		$('.product-info__price').appendTo('.product-info__container');
		$('.product-info__favorite').appendTo('.product-info__images');
	}

	if ($(window).width() <= 577) {
		$('.product-info__price').appendTo('.product-info__info');

		$(window).scroll(function() {
			let position = $('.product-info__buy').offset().top - 100;

			if ($(window).scrollTop() >= position) {
				$('.product-info__info').addClass('fix');
			}
		});
	}

	$(document).on("click",".catalog-info__categories-button",function() {
		$(this).parent().toggleClass('opened');

		if ($(this).parent().hasClass('opened')){
			$(this).text($(this).attr('data-text-active'))
		}else{
			$(this).text($(this).attr('data-text'))
		}
	});

	$('.catalog-items__sort, .catalog-items__show').on('click', function() {
		$(this).toggleClass('active');
	});

	$(document).on('mouseup', function(e){
		let s = $('.catalog-items__sort.active, .catalog-items__show.active');
		if(!s.is(e.target) && s.has(e.target).length === 0) {
			s.removeClass('active');
		}
	});

	$('.catalog-filters__list').each(function() {
		if ($(window).width() >= 769) {
			if ( $(this).height() >= 184 ) {
				$(this).addClass('hide');
			}
		}
	});

	function toggleCard() {
		$(document).on("click",".catalog-filters__header",function() {
			$(this).parent().toggleClass('open');
		});
	}
	toggleCard();

	$(document).on("click",".header-menu__item > .header-menu__button",function() {
		if ($(this).parent().hasClass('open')){
			$(this).parent().removeClass('open');
		} else {
		$('.header-menu__item').removeClass('open');
			$(this).parent().addClass('open');
		}
	})

	$(document).on("click",".header-menu__dropdown-item > .header-menu__button",function() {
		if ($(this).parent().hasClass('open')){
			$(this).parent().removeClass('open');
		} else {
		$('.header-menu__dropdown-item').removeClass('open');
			$(this).parent().addClass('open');
		}
	})

	$(document).on("click",".menu-dropdown__item > .header-menu__button" ,function() {
		if ($(this).parent().hasClass('open')){
			$(this).parent().removeClass('open');
		} else {
		$('.menu-dropdown__item').removeClass('open');
			$(this).parent().addClass('open');
		}
	})

	if( $('a[href*="#"]').length ){
		$('a[href*="#"]').map(function(){
			let attribute = $(this).attr("href")
			if (attribute.length > 1 && attribute.includes("#") && attribute[0] === "#"){
				smoothScroll();
				return false
			}
		})
	}

	if ($('input[type="tel"]').length){
		$('input[type="tel"]').inputmask({"mask": "+7 (999) 999-99-99"});
	}

	if ($('.addPopup').length){
		$('.addPopup').click(function(){
			appendPopup()
		})
	}
	
	$('.reviews-rating__star input').change(function () {
		var $radio = $(this);
		$('.reviews-rating__star.selected').removeClass('selected');
		$radio.closest('label').addClass('selected');
	});

	$('.project-card__marker').each(function () {
		const parentWidth = $(this).parent().width();
		const leftPos = $(this).position().left;
		if (leftPos > parentWidth * 0.5) {
			$(this).addClass('right');
		}
	});

	$('.project-card__marker').each(function () {
		const parentHeight = $(this).parent().height();
		const topPos = $(this).position().top;
		if (topPos > parentHeight * 0.5) {
			$(this).addClass('top');
		}
	});

	if ($('#tabs').length){
		initTabs()
	}

	if ($('.header-location__dropdown').length){

		let cookieDate = new Date(Date.now() + 86400e3);
		cookieDate = cookieDate.toUTCString();

		let cookieCity = document.cookie.match(/city=(.+?)(;|$)/);

		if (cookieCity == null){	
			let city = $($('.header-location__dropdown li')[0]).text().trim()		
			$('.header-location__button span').text(city)
			document.cookie = `city=${city};path=/;${cookieDate}`;
			setInBasketCity(city)
		}else{
			$('.header-location__button span').text(cookieCity[1])
			$('.header-location__dropdown a').map(function(){
				if ($(this).text().trim() === cookieCity[1]){
					$('.header-location__dropdown a').removeClass('active')
					$(this).addClass('active')
				}
			})
			setInBasketCity(cookieCity[1])
		}

		$('.header-location__dropdown a').on('click',function(){
			$('.header-location__dropdown a').removeClass('active')
			$(this).addClass('active')
			$('.header-location__button span').text($(this).text())
			$('.header-top__location').removeClass('opened')

			let cookie = `city=${$(this).text().trim()};path=/;${cookieDate}`;
			document.cookie = cookie;
			setInBasketCity($(this).text().trim())
		})

		function setInBasketCity(city){
			if ($('.input__city').length){
				$('.input__city').val(city);
			}
		}
	
	}

	if ($(window).width() <= 767) {
		$('.project-card__box').each(function() {
			$(this).appendTo($(this).closest('.project-card__item'));
		});
	}
	
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.button-top').addClass('active');
		} else {
			$('.button-top').removeClass('active');
		}
	}).scroll();

	$(document).on("click",".button-top",function() {
		$('html,body').animate({
			scrollTop: 0
		}, 1000);

	})

	if ($('.menu-catalog__link').length > 0){
		let minHeight = $('.menu-catalog').height() 

		$('.menu-catalog__link').hover(function(){
			let parents = $(this).parents('ul')
			let currentHeight = $(this).siblings('.menu-catalog__catalog').height() || $(this).siblings('.menu-catalog__subcatalog').height();

			if (currentHeight === undefined) {
				if (parents.hasClass('menu-catalog__catalog')){
					$('.menu-catalog').height(parents.height())
				}else{
					$('.menu-catalog').height(minHeight)
				}			
				return false
			}

			if (currentHeight <= minHeight){
				$('.menu-catalog').height(minHeight)
				$(this).siblings('.menu-catalog__catalog').height(minHeight)
			}else{
				$('.menu-catalog').height(currentHeight)
			}
		})
	}

	if ( $('.popular-categories').length > 0 ){
		console.log('123')
	}


});

$(document).on("click",".tags__more",function() {
	$('.tags li').show();
	$('.tags__more').hide();

});

// Плавный скролл на якори
function smoothScroll() {
	new SmoothScroll('a[href*="#"]', {
		speed: 600,
		after: function() {
			$('body').css('overflow', '');
		}
	});
}
$('#callback').validate({
	rules: {
		username: {
			required: true,
		},
		email: {
			required: true,
			email: true,
		},
		phone: {
			required: true,
		},
	},
	messages: {
		username: {
			required: "Необходимо заполнить поле",
		},
		email: {
			required: "Необходимо заполнить поле",
			email: "Некорректный email",
		},
		phone: {
			required: "Необходимо заполнить поле",
		},
	},
});
$(document).on("submit","#callback",function(e) {
	$(this).find('.sp').val('nospam');
	e.preventDefault();
	$.ajax({
		type: 'post',
		url: '/local/templates/azimut/ajax/callback.php',
		dataType: 'html',
		data: $(this).serialize(),
		success: function (response) {
			if(response.length > 0) {

				$('body').addClass('hidden');
				$('.popup.success').addClass('active');
				$('.overlay').addClass('active-v2');
				$('.back-call').removeClass('active');
			}

		}
	});
});
$('#form-questions').validate({
	rules: {
		username: {
			required: true,
		},
		email: {
			required: true,
			email: true,
		},
		phone: {
			required: true,
		},
	},
	messages: {
		username: {
			required: "Необходимо заполнить поле",
		},
		email: {
			required: "Необходимо заполнить поле",
			email: "Некорректный email",
		},
		phone: {
			required: "Необходимо заполнить поле",
		},
	},
});
$(document).on("submit","#form-questions",function(e) {
	$(this).find('.sp').val('nospam');
	e.preventDefault();
	$.ajax({
		type: 'post',
		url: '/local/templates/azimut/ajax/questions.php',
		dataType: 'html',
		data: $(this).serialize(),
		success: function (response) {
			if(response.length > 0) {

				$('body').addClass('hidden');
				$('.popup.success').addClass('active');
				$('.overlay').addClass('active-v2');
				$('.back-call').removeClass('active');
			}

		}
	});
});
$('#buyclick').validate({
	rules: {
		username: {
			required: true,
		},

		phone: {
			required: true,
		},
	},
	messages: {
		username: {
			required: "Необходимо заполнить поле",
		},
		phone: {
			required: "Необходимо заполнить поле",
		},
	},
});
$(document).on("submit","#buyclick",function(e) {

	$(this).find('.sp').val('nospam');

	e.preventDefault();

	let articul = $('.product-info__buy').data('product-id');
	$('.product-id').val(articul);
	$.ajax({
		type: 'post',
		url: '/local/templates/azimut/ajax/byoneclick.php',
		dataType: 'html',
		data: $(this).serialize(),
		success: function (response) {
			if(response.length > 0) {

				$('body').addClass('hidden');
				$('.popup.success').addClass('active');
				$('.overlay').addClass('active-v2');
				$('.back-call').removeClass('active');
			}

		}
	});
});
$(document).on('click', '.load_more', function () {

	var targetContainer = $('.catalog-section-js'),          //  Контейнер, в котором хранятся элементы
		url = $('.load_more').attr('data-url');    //  URL, из которого будем брать элементы

	// console.log(targetContainer);
	if (url !== undefined) {
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			success: function (data) {

				window.history.pushState('', '', url);

				//  Удаляем старую навигацию
				$('.load_more').remove();
				$('.page-nav__list').remove();
				$('.product-card__basket').off()

				var elements = $(data).find('.catalog-section-js li'),  //  Ищем элементы
					pagination = $(data).find('.load_more'),//  Ищем навигацию
					paginationNav = $(data).find('.page-nav__list');//  Ищем навигацию

				$('.product-card__image').slick('unslick');

				targetContainer.append(elements);   //  Добавляем посты в конец контейнера
				$('.page-nav').prepend(pagination); //  добавляем навигацию следом
				$('.page-nav').append(paginationNav);   //  Добавляем посты в конец контейнера

				initSliderCardImage()

				setClickAddToBasket()

			}
		})
	}

});
$(document).on('click', '.load_more_brands', function () {

	var targetContainer = $('.brands__list'),          //  Контейнер, в котором хранятся элементы
		url = $('.load_more_brands').attr('data-url');    //  URL, из которого будем брать элементы

	// console.log(targetContainer);
	if (url !== undefined) {
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			success: function (data) {

				window.history.pushState('', '', url);

				//  Удаляем старую навигацию
				$('.load_more_brands').remove();
				$('.page-nav__list').remove();

				var elements = $(data).find('.brands__list li'),  //  Ищем элементы
					pagination = $(data).find('.load_more_brands'),//  Ищем навигацию
					paginationNav = $(data).find('.page-nav__list');//  Ищем навигацию

				targetContainer.append(elements);   //  Добавляем посты в конец контейнера
				$('.page-nav').prepend(pagination); //  добавляем навигацию следом
				$('.page-nav').append(paginationNav);   //  Добавляем посты в конец контейнера



			}
		})
	}

});

$(document).on('click', '.load_more_blog', function () {

	var targetContainer = $('.blog__list'),          //  Контейнер, в котором хранятся элементы
		url = $('.load_more_blog').attr('data-url');    //  URL, из которого будем брать элементы

	// console.log(targetContainer);
	if (url !== undefined) {
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			success: function (data) {

				window.history.pushState('', '', url);

				//  Удаляем старую навигацию
				$('.load_more_blog').remove();
				$('.page-nav__list').remove();

				var elements = $(data).find('.blog__list li'),  //  Ищем элементы
					pagination = $(data).find('.load_more_blog'),//  Ищем навигацию
					paginationNav = $(data).find('.page-nav__list');//  Ищем навигацию

				$('.blog__list').append(elements);   //  Добавляем посты в конец контейнера
				$('.page-nav').prepend(pagination); //  добавляем навигацию следом
				$('.page-nav').append(paginationNav);   //  Добавляем посты в конец контейнера



			}
		})
	}

});
$(document).on('click', '.load_more_project', function () {

	var targetContainer = $('.completed-project__list'),          //  Контейнер, в котором хранятся элементы
		url = $('.load_more_project').attr('data-url');    //  URL, из которого будем брать элементы

	// console.log(targetContainer);
	if (url !== undefined) {
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			success: function (data) {

				window.history.pushState('', '', url);

				//  Удаляем старую навигацию
				$('.load_more_project').remove();
				$('.page-nav__list').remove();

				var elements = $(data).find('.completed-project__list li'),  //  Ищем элементы
					pagination = $(data).find('.load_more_project'),//  Ищем навигацию
					paginationNav = $(data).find('.page-nav__list');//  Ищем навигацию

				$('.completed-project__list').append(elements);   //  Добавляем посты в конец контейнера
				$('.page-nav').prepend(pagination); //  добавляем навигацию следом
				$('.page-nav').append(paginationNav);   //  Добавляем посты в конец контейнера



			}
		})
	}

});
$(document).on('click', '.load_more_designer', function () {

	var targetContainer = $('.designers__list'),          //  Контейнер, в котором хранятся элементы
		url = $('.load_more_designer').attr('data-url');    //  URL, из которого будем брать элементы

	// console.log(targetContainer);
	if (url !== undefined) {
		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'html',
			success: function (data) {

				window.history.pushState('', '', url);

				//  Удаляем старую навигацию
				$('.load_more_designer').remove();
				$('.page-nav__list').remove();

				var elements = $(data).find('.designers__list li'),  //  Ищем элементы
					pagination = $(data).find('.load_more_designer'),//  Ищем навигацию
					paginationNav = $(data).find('.page-nav__list');//  Ищем навигацию

				$('.designers__list').append(elements);   //  Добавляем посты в конец контейнера
				$('.page-nav').prepend(pagination); //  добавляем навигацию следом
				$('.page-nav').append(paginationNav);   //  Добавляем посты в конец контейнера



			}
		})
	}

});
setClickAddToBasket()

function createPopupAdded(response){

	let popup = {}

	if (response.LANG === "RUS"){

		popup = {
			title :'Товар добавлен в корзину',
			textID:'ID товара:',
			textCount:{
				prefix:'У Вас в корзине еще',
				postfix:'товара:',
				textAll:"Товары в корзине:"
			},
			moreText:'Показать&nbsp;все',
			moreTextActive:'Свернуть',
			buttons:{
				shop:'Продолжить покупки',
				check:'Оформить заказ',
			},

			current__card:{
				id:response.NEW.PROPERTY_NAME_RUS_VALUE_ID,
				url: response.NEW.SRC,
				link:response.NEW.DETAIL_PAGE_URL,
				name:response.NEW.PROPERTY_NAME_RUS_VALUE,
				price:{
					current:(response.NEW.PRICE !== '0 тенге') ? response.NEW.PRICE : 'Цена по запросу',
					old:(response.NEW.OLD_PRICE ? response.NEW.OLD_PRICE : '')
				},
			},
		}
	}

	if (response.LANG === "ENG"){

		popup = {
			title :'Product added to cart',
			textID:'Product ID:',
			textCount:{
				prefix:'You are still in the cart',
				postfix:'products:',
				textAll:"Items in cart:"
			},
			moreText:'Show&nbsp;all',
			moreTextActive:'Hide',
			buttons:{
				shop:'Continue Shopping',
				check:'Checkout',
			},

			current__card:{
				id:response.NEW.PROPERTY_NAME_ENG_VALUE_ID,
				url: response.NEW.SRC,
				link:response.NEW.DETAIL_PAGE_URL,
				name:response.NEW.PROPERTY_NAME_ENG_VALUE,
				price:{
					current:(response.NEW.PRICE !== '0 тенге') ? response.NEW.PRICE : 'Price on request',
					old:(response.NEW.OLD_PRICE ? response.NEW.OLD_PRICE : '')
				},
			},

		}
	}

	if (response.LANG === "KAZ"){
		popup = {
			title :'Өнім себетке қосылды',
			textID:'Өнім идентификаторы:',
			textCount:{
				prefix:'Сіздің арбаңызда әлі бар',
				postfix:'өнім:',
				textAll:"Себеттегі заттар:"
			},
			moreText:'барлығын&nbsp;көрсету',
			moreTextActive:'Жыйрату',
			buttons:{
				shop:'Сатып алуды жалғастыру',
				check:'Шығу',
			},

			current__card:{
				id:response.NEW.PROPERTY_NAME_KAZ_VALUE_ID,
				url: response.NEW.SRC,
				link:response.NEW.DETAIL_PAGE_URL,
				name:response.NEW.PROPERTY_NAME_KAZ_VALUE,
				price:{
					current:(response.NEW.PRICE !== '0 тенге') ? response.NEW.PRICE : 'Бағасы сұраныс бойынша',
					old:(response.NEW.OLD_PRICE ? response.NEW.OLD_PRICE : '')
				},
			},
		}
	}

	function cardList(){

		let code = ``

		if (response.CART !== undefined){
			for (let i=0; i < response.CART.length;i++){
				code = code + `
				<li class="another-card">
					<a href="${response.CART[i].DETAIL_PAGE_URL}" class="another-card__image">
						<img src="${response.CART[i].SRC}" alt="">
					</a>
					<div class="another-card__content">
						<a href="${response.CART[i].DETAIL_PAGE_URL}" class="another-card__name">${ (response.LANG === 'RUS') ? response.CART[i].PROPERTY_NAME_RUS_VALUE : (response.LANG === 'ENG') ? response.CART[i].PROPERTY_NAME_ENG_VALUE : (response.LANG === 'KAZ') ? response.CART[i].PROPERTY_NAME_KAZ_VALUE : ''  }</a>
						<span class="another-card__price">${ (response.CART[i].PRICE === "0 тенге") ? notPriceLang() : response.CART[i].PRICE  }</span>
					</div>
				</li>
				`
			}
		}

		function notPriceLang(){
			return (response.LANG === 'RUS') ? 'Цена по запросу' : (response.LANG === 'ENG') ? 'Price on request' : (response.LANG === 'KAZ') ? 'Бағасы сұраныс бойынша' : ''
		}

		return code
	}

	// let countCards = `${popup.textCount.prefix} ${ (response.CART !== undefined) ? response.CART.length : '0'} ${popup.textCount.postfix}`
	let countCards = `${popup.textCount.textAll}`

	let html = `
	<div class='popup added-popup'>
		<div class="popup__wrapper">
				<button class="popup__close added-popup__close" type="button">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M6.22499 18.8248L5.17499 17.7748L10.95 11.9998L5.17499 6.2248L6.22499 5.1748L12 10.9498L17.775 5.1748L18.825 6.2248L13.05 11.9998L18.825 17.7748L17.775 18.8248L12 13.0498L6.22499 18.8248Z" fill="#333333"></path>
					</svg>
				</button>
				<h2 class="title title-small">${popup.title}</h2>
				<div class="added-popup__card">
					<a href="${popup.current__card.link}" class="added-popup__image">
						<img src="${popup.current__card.url}" alt="">
					</a>
					<div class="added-popup__content">
						<div class="added-popup__info">
							<a href="${popup.current__card.link}" class="added-popup__name">${popup.current__card.name}</a>
							<div class="added-popup__parameter">
								<span class="name">${popup.textID}</span>
								<span>${popup.current__card.id}</span>
							</div>
						</div>
						<div class="added-popup__price">
							<span class="old">${popup.current__card.price.old && popup.current__card.price.old}</span>
							<span class="price">${popup.current__card.price.current}</span>
						</div>
					</div>
				</div>
				${(response.CART !== undefined && response.CART.length > 0 ) ? `
				<div class="added-popup__more">
					<h3 class="added-popup__subtitle">${countCards}</h3>
					<ul class="added-popup__list list-reset">
					${cardList()}
					</ul>
					<button class="added-popup__toggle" data-text=${popup.moreText} data-text-active=${popup.moreTextActive}>
						<span>${popup.moreText}</span>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M5.9998 9.3748L7.0748 8.2998L12.0248 13.2498L16.9748 8.2998L18.0498 9.3748L12.0248 15.3998L5.9998 9.3748Z"
								fill="#2D2D2D" />
						</svg>
					</button>
				</div>` : '' }
				<div class="added-popup__buttons">
					<a class="button button-white" href="/catalog/">${popup.buttons.shop}</a>
					<a class="button button-color" href="/cart/">${popup.buttons.check}</a>
				</div>
			</div>
		</div>
	`

	$( "body" ).append(html);
	$('body').addClass('hidden');
	$('.added-popup').addClass('active')
	$('.overlay').addClass('active-v2');
	$('.added-popup__close').off('click')

	function closeAddedPopup(){
		$('body').removeClass('hidden');
		$('.added-popup').removeClass('active');
		$('.overlay').removeClass('active-v2');
		$('.added-popup').remove();
	}

	$('.added-popup__close').on("click",function() {
		closeAddedPopup()
	});

	$('.overlay').on("click",function() {
		closeAddedPopup()
	});

}

function createPopupBasked(response){

	let popup = {}

	if (response.LANG === "RUS"){

		popup = {
			title :'Товары в корзине',		
			buttons:{
				basket:'Посмотреть корзину',
				check:'Оформить заказ',
				delete:'Удалить',
			},
		}
	}

	if (response.LANG === "ENG"){

		popup = {
			title :'Items in the cart',		
			buttons:{
				basket:'View Cart',
				check:'Checkout',
				delete:'Delete',
			},
		}
	}

	if (response.LANG === "KAZ"){
		popup = {
			title :'Себеттегі заттар',		
			buttons:{
				basket:'Арбаны көру',
				check:'Шығу',
				delete:'Жою',
			},
		}
	}

	function cardList(){

		let code = ``

		if (response.CART !== undefined){
			for (let i=0; i < response.CART.length;i++){
				code = code + `
				<div class="items-cart__item">
					<a href="${response.CART[i].DETAIL_PAGE_URL}" class="items-cart__image">
						<img src="${response.CART[i].SRC}" alt="">
					</a>
					<div class="items-cart__content">
						<a href="${response.CART[i].DETAIL_PAGE_URL}" class="items-cart__name">${ (response.LANG === 'RUS') ? response.CART[i].PROPERTY_NAME_RUS_VALUE : (response.LANG === 'ENG') ? response.CART[i].PROPERTY_NAME_ENG_VALUE : (response.LANG === 'KAZ') ? response.CART[i].PROPERTY_NAME_KAZ_VALUE : ''  }</a>
						<span class="items-cart__price">${ (response.CART[i].PRICE === "0 тенге") ? notPriceLang() : response.CART[i].PRICE  }</span>
						<button class="items-cart__del">
							<span>${popup.buttons.delete}</span>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M6.22499 18.825L5.17499 17.775L10.95 12L5.17499 6.22505L6.22499 5.17505L12 10.95L17.775 5.17505L18.825 6.22505L13.05 12L18.825 17.775L17.775 18.825L12 13.05L6.22499 18.825Z"
									fill="#2D2D2D" fill-opacity="0.6"/>
							</svg>
						</button>
					</div>
				</div>
				`
			}
		}

		function notPriceLang(){
			return (response.LANG === 'RUS') ? 'Цена по запросу' : (response.LANG === 'ENG') ? 'Price on request' : (response.LANG === 'KAZ') ? 'Бағасы сұраныс бойынша' : ''
		}

		return code
	}

	let html = `
	<div class="items-cart">
		<div class="items-cart__top">
			<h2 class="items-cart__title title title-small">${popup.title}</h2>
			<button class="items-cart__close">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M6.22499 18.825L5.17499 17.775L10.95 12L5.17499 6.22505L6.22499 5.17505L12 10.95L17.775 5.17505L18.825 6.22505L13.05 12L18.825 17.775L17.775 18.825L12 13.05L6.22499 18.825Z"
						fill="#333333"/>
				</svg>
			</button>
		</div>
		<div class="items-cart__items">`  + cardList() + `</div>
		<div class="items-cart__links">
			<a href="/order/" class="items-cart__checkout button button-color">${popup.buttons.check}</a>
			<a href="/cart/" class="items-cart__basket button button-white">${popup.buttons.basket}</a>
		</div>
	</div>
	`

	if ($('.header').hasClass('header-active') && $(window).width() >= 1024){
		$(".header-new__wrapper").append(html);
	}else{
		$(".header-center__wrapper").append(html);
	}

	let popupAppend = $('.items-cart');
	let overlay = $('.overlay');
	let header = $('.header-base, .header-new');

	popupAppend.addClass('active');
	overlay.addClass('active');
	header.addClass('active');
	
	$('.header-center__basket').hover(
		function() {
			popupAppend.addClass('active');
			overlay.addClass('active');
			header.addClass('active');
		},function(){

		}
	);

	popupAppend.hover(
		function() {
			$(this).addClass('active');
			popupAppend.addClass('active');
			overlay.addClass('active');
			header.addClass('active');
		
		}, function() {
			closePopup()
			$(this).removeClass('active');		
		}
	);

	$('.items-cart__close').on("click",function() {
		closePopup()
	});

	$('.overlay').on("click",function() {
		closePopup()
	});

	function closePopup(){
		$('body').removeClass('hidden');
		popupAppend.removeClass('active');
		overlay.removeClass('active');
		header.removeClass('active');
		popupAppend.remove()
	}

}

function setClickAddToBasket(){
	$('.js-add-to-basket').on('click', function () {

		const $self = $(this);
		const productId = $self.data('product-id');

		if (productId) {

			console.log(productId)

			// if ($('.header__buttons-item-basket span').length > 0){
			// 	var num =  $('.header__buttons-item-basket span').html();
			// 	var numRes = parseInt(num) + 1;
			// 	$('.header__buttons-item-basket span').html(numRes);
			// }
			// else {
			// 	$('.header__buttons-item-basket').prepend('<span class="amount amount-js">1</span>');
			// 	$('.header__buttons-item-basket').addClass('header__buttons-item-basket-active');
			// }

			$.ajax({
				url: '/local/templates/azimut/ajax/add-to-basket.php',
				method: 'post',
				dataType: 'json',
				data: {
					productId: $self.data('product-id'),
					quantity: 1,
				},
				success: function (response) {

					console.log(response);

					createPopupAdded(response);
				},
				error: function (error) {

					console.log('ajax error', error.responseText)

					$('body').removeClass('hidden');
					$('.added-popup').removeClass('active');
					$('.overlay').removeClass('active-v2');
				}

			});
		}
	});
}

function initSliderCardImage(){
	$('.product-card__image').each(function (idx, item) {
		var carouselId = "carousel" + idx;
		this.id = carouselId;

		$(this).slick({
			appendArrows: $(this).parent('.product-card__images'),
			prevArrow: slickPrevArrow,
			nextArrow: slickNextArrow,
			swipeToSlide: true,
			dots: false,
			variableWidth: false,
		});

	});
}

function initTabs(){
	let tabs = $('.tabs-nav .tab');
	let tabContent = $('.tabs-item');

	checkoutTab(0);

	tabs.on('click', function() {
		console.log($(this).index())
		checkoutTab($(this).index());
	});

	function checkoutTab(index) {
		tabs.removeClass('active');
		tabContent.removeClass('active');

		$(tabs[index]).addClass('active');
		$(tabContent[index]).addClass('active');
	}
}

function initPopularSlider(){

	let data = {}

	let html = `
	
	`


}

$('.popular-categories__tab').on('click', function () {

	const $self = $(this);
	const SectionId = $self.data('id');

	if (SectionId) {

		console.log(SectionId)

		// if ($('.header__buttons-item-basket span').length > 0){
		// 	var num =  $('.header__buttons-item-basket span').html();
		// 	var numRes = parseInt(num) + 1;
		// 	$('.header__buttons-item-basket span').html(numRes);
		// }
		// else {
		// 	$('.header__buttons-item-basket').prepend('<span class="amount amount-js">1</span>');
		// 	$('.header__buttons-item-basket').addClass('header__buttons-item-basket-active');
		// }

		$.ajax({
			url: '/local/templates/azimut/ajax/get-main-products.php',
			method: 'post',
			dataType: 'json',
			data: {
				sectionId: SectionId,

			},
			success: function (response) {

				console.log(response)
			},
			error: function (error) {


			}

		});
	}
});