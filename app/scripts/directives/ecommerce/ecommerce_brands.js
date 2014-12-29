'use strict';
webApp.directive('ecommercebrands',['$rootScope','$http', function ($scope,$http) {
	return {
		restrict: 'E',
		transclude: true,
		controller : function(){
			$scope.ecommerce_barnd_loading = true;
			$http({
				url		: sp['shop_barnds'],
				method 	: 'get',
				cache 	: true,
				headers : {'content-type': 'application/x-www-form-urlencoded'}
				
			}).success(function(data){
				$scope.ecommerce_brands = data.ecommerce_brands;
				$scope.error_message = '';
				$scope.ecommerce_barnd_loading = false;
			}).error(function(status){
				$scope.error_message = 'Network Error occured. Please reload page.';
			});
			
			$scope.$watch('ecommerce_brands',function(nv,ov){
				if(nv != ov){
					$scope.ecommerce_brands = nv;
				}
			})
		},
		templateUrl : 'views/directives/ecommerce/ecommerce_brands.html'
	};
  }]);