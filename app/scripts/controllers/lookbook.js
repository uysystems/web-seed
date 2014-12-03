'use strict';

webApp.controller('LookBookCtrl', ['$scope','$http',function ($scope,$http) {
	$scope.lookbook_image_location = sp.host+'/img/site/lookbooks/';
	
	$http({
		method 	: 'get',
		url		: sp['lookbook'],
		cache 	: false,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
		
	}).success(function(data){
		$scope.lookbook = data.lookbook;
	}).error(function(){
		$scope.error_message = 'Network Error occured. Please reload page.';
	});
	
	$scope.slide = function(params){
		var activeSlide = $('.uy-gallery-data-active');
		
		var leftSlide = $(activeSlide).prev('li');
		
		var rightSlide =  $(activeSlide).next('li');
		console.log(rightSlide);
		
		if(params == 'left'){
			if(leftSlide.length != 0){
				$(activeSlide).removeClass('uy-gallery-data-active').addClass('uy-gallery-data-inactive');
				$(leftSlide).removeClass('uy-gallery-data-inactive').addClass('uy-gallery-data-active');
			}
			
		}else if(params == 'right'){
			if(rightSlide.length != 0){
				$(activeSlide).removeClass('uy-gallery-data-active').addClass('uy-gallery-data-inactive');
				$(rightSlide).removeClass('uy-gallery-data-inactive').addClass('uy-gallery-data-active');
			}
			
		}else{
			$(activeSlide).removeClass('uy-gallery-data-active').addClass('uy-gallery-data-inactive');
			$('.uy-gallery-data li:eq('+params+')').removeClass('uy-gallery-data-inactive').addClass('uy-gallery-data-active');
		}
		
	}
	
	
}]);

