'use strict';
webApp.directive('ecommercecart',['$rootScope','$window','$compile', function ($scope,$window,$compile) {
	return {
		restrict: 'E',
		templateUrl : 'views/directives/ecommerce/ecommerce_cart.html',
		link : function(scope,element,attrs){
			if($window.sessionStorage.getItem('uycart') != null){
				var cart_data = JSON.parse($window.sessionStorage.getItem('uycart'));
				$('.productNoInCart').html(cart_data.length+' items')
				var total_value = 0;
				var cartHtml ='';
				$.each(cart_data,function(ind,val){
					total_value += parseFloat(val.cost);
				});
				$('.totalPriceInCart').html('$'+total_value)
				
			}
		}
	};
  }]);