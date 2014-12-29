'use strict';
webApp.directive('bloglatestposts',['$rootScope','$http', function ($scope,$http) {
	
	return {
		restrict: 'E',
		transclude: true,
		controller : function(){
			$scope.blog_latest_post_list_loading = true;
			$http({
				method 	: 'get',
				url		: sp['blog_latest_posts'],
				cache 	: false,
				headers : {'content-type': 'application/x-www-form-urlencoded'}
				
			}).success(function(data){
				$scope.blog_latest_posts = data.blog_latest_post;
				//console.log(data);
				$scope.blog_latest_post_list_loading = false;
				$scope.error_message = '';
			}).error(function(status){
				$scope.error_message = 'Network Error occured. Please reload page.';
			});
			
			$scope.$watch('blog_latest_posts',function(nv,ov){
				if(nv != ov){
					$scope.blog_latest_posts = nv;
				}
			})
		},
		templateUrl : 'views/directives/blog/blog_latest_posts.html'
	};
  }]);