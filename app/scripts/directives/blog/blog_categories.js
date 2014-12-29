'use strict';
webApp.directive('blogcategories',['$rootScope','$http', function ($scope,$http) {
	return {
		restrict: 'E',
		transclude: true,
		controller : function(){
			$scope.blog_category_loading = true;
			$http({
				method 	: 'post',
				url		: sp['blog_categories'],
				cache 	: false,
				headers : {'content-type': 'application/x-www-form-urlencoded'}
			}).success(function(data){
				$scope.blog_categories = data.blog_categories;
				$scope.blog_category_loading = false;
				$scope.error_message = '';
			}).error(function(status){
				$scope.error_message = 'Network Error occured. Please reload page.';
			});
			
			//check all time
			$scope.$watch('blog_categories',function(nv,ov){
				if(nv != ov){
					$scope.blog_categories = nv;
				}
			})
		},
		templateUrl : 'views/directives/blog/blog_categories.html'
	};
  }]);
