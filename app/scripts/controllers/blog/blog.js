'use strict';

/**
 * @ngdoc function
 * @name webSeedApp.controller:BlogCtrl
 * @description
 * # BlogCtrl
 * Controller of the webSeedApp
 */
webApp.controller('BlogCtrl',['$scope','$http','$sce','$routeParams', function ($scope,$http,$sce,$routeParams) {
	$scope.blog_loading = true;
	if($routeParams.catid != undefined){
		var post_url = sp['blog_post_lists'] +'/'+$routeParams.catid+'.json';
	}else if($routeParams.id !=undefined){
		var post_url = sp['blog_post_single']+'/'+$routeParams.id+'.json';
	}else{
		var post_url = sp['blog_post_lists']+'.json';
	}
	$http({
		method 	: 'post',
		url		: post_url,
		cache 	: false,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
		
	}).success(function(data){
		$scope.blog_post_default_list = data.blog_post_default_list;
		$scope.blog_writers = data.users;
		$scope.blog_loading = false;
		$scope.error_message = '';
	}).error(function(status){
		$scope.error_message = 'Network Error occured. Please reload page.';
	});
	
	$scope.shortDescription = function(data,length){
		var short_html  =  (data.replace(/<\/?[^>]+>/gi, '')).substr(0,length) + ' ...';
		var returnable = $sce.trustAsHtml(short_html);
		return returnable;
	}
	
	$scope.textToSafeHtml = function(data){
		return $sce.trustAsHtml(data);
	}
	
	$scope.getUserName = function (data){
		var data_object = angular.fromJson(data);
		return data_object.first_name+ ' ' +data_object.last_name
	}
  }]);
