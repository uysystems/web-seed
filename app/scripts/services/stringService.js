'use strict';

webApp.service('stringService',['$rootScope','$http','$sce',function($scope,$http,$sce){
	//string html to safe html
	this.textToSafeHtml = function(data) {
		return $sce.trustAsHtml(data);
	}
	
}]);
