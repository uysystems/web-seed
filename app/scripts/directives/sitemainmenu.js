'use strict';
webApp.directive('sitemainmenu',['$rootScope','$http', function ($scope,$http) {
	$http({
		method 	: 'get',
		url		: sp['layout'],
		cache 	: true,
		headers : {'content-type': 'application/x-www-form-urlencoded'}
		
	}).success(function(data){
		$scope.menu =data.menu;
		var footerMenuData = data.menu.footer;
		var chunkedFooterMenu = new Array();
		var i,j,temparray,chunk = 3;
		for (i=0,j=footerMenuData.length; i<j; i+=chunk) {
		    temparray = footerMenuData.slice(i,i+chunk);
		    chunkedFooterMenu.push(temparray)
		    // do whatever
		}
		//console.log(chunkedFooterMenu)
		$scope.menuFooter = chunkedFooterMenu
		
		
	}).error(function(status){
		$scope.error_message = 'Network Error occured. Please reload page.';
	})
	return {
		restrict: 'E',
		transclude: true,
		templateUrl : 'views/directives/mainmenu.html'
	};
  }]);