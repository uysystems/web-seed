'use strict';
webApp.directive('authview',['$rootScope','$window','$compile',function ($scope,$window,$compile) {
	return {
		restrict	: 'E',
		transclude	: true,
		templateUrl : 'views/directives/authView.html',
		link		: function(scope,element,attrs){
			var logged_data = $window.sessionStorage.getItem('loginDetails');
			if(logged_data == null){
				$('#login-register-block').html($compile(angular.element('<a data-ng-href="/#/register">Register</a> / <a data-ng-href="/#/login">Login</a>'))(scope))
			}else{
				var user_data = JSON.parse(logged_data);
				var user_personal_data = JSON.parse(user_data.Client.details);
				var html = '<span>Welcome <a data-ng-href="/#/profile">'+ user_personal_data.first_name+' '+user_personal_data.last_name + '</a></span> | <span><a data-ng-href="/#/shop/shoping_history">History</a></span> | <span><a data-ng-href="/#/logout">Logout</a><span>';
				$('#login-register-block').html($compile(html)(scope));
			}
			
		}
	};
  }]);