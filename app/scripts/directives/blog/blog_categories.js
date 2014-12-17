'use strict';
webApp.directive('blogcategories',['$rootScope','$http', function ($scope,$http) {
	
	$scope.blog_category_loading = true;
	
	$http({
		method 	: 'post',
		url		: sp['blog_categories'],
		cache 	: true,
		responseType : 'json',
		headers : {'content-type': 'application/x-www-form-urlencoded'}
		
	}).success(function(data){
		$scope.blog_categories = data.blog_categories;
		$scope.blog_category_loading = false;
		$scope.error_message = '';
	}).error(function(status){
		$scope.error_message = 'Network Error occured. Please reload page.';
	})
	;
	return {
		restrict: 'E',
		transclude: true,
		templateUrl : 'views/directives/blog/blog_categories.html'
	};
  }]);
