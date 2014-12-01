'use strict';

webApp.controller('LogoutCtrl', ['$rootScope', '$scope','$window','$compile',function ($rootScope,$scope,$window,$compile) {
		$window.sessionStorage.removeItem('loginDetails');
		$('#login-register-block').html($compile('<a data-ng-href="/#/register">Register</a> / <a data-ng-href="/#/login">Login</a>')($scope));
		$window.location.href = '/#/';
		
	
  }]);
