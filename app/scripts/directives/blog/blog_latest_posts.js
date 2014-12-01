'use strict';
webApp.directive('bloglatestposts',['$rootScope','$http', function ($scope,$http) {
	$scope.blog_latest_post_list_loading = true;
	$http({
		method 	: 'post',
		url		: sp['blog_latest_posts'],
		cache 	: false,
		responseType : 'json',
		headers : {'content-type': 'application/x-www-form-urlencoded'}
		
	}).success(function(data){
		$scope.blog_latest_posts = data.blog_latest_post;
		//console.log(data);
		$scope.blog_latest_post_list_loading = false;
		$scope.error_message = '';
	}).error(function(status){
		$scope.error_message = 'Network Error occured. Please reload page.';
	})
	;
	return {
		restrict: 'E',
		transclude: true,
		templateUrl : 'views/directives/blog/blog_latest_posts.html'
	};
  }]);