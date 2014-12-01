'use strict';
webApp.directive('gallery',['$rootScope', function ($scope) {
	return {
	    restrict: 'E',
	    templateUrl: 'views/directives/gallery/gallery.html',
	    replace: true,
	    scope: {
	    	ngModel : '=',
	    	gallerydata: '@'
	    },
	    link:function(scope, element, attrs){
	    	console.log(scope.gallerydata)
	    }
	  }
	
	
  }]);

/*
$scope.processItems = function(data){
	console.log(data)
	
	var html ='';
	angular.forEach(data,function(val,ind){
		html += '<li class="uy-data-background">\
						<span>\
							<h1>dsf}</h1>\
							<p>df</p>\
							<a data-ng-href="">Go to</a>\
						</span>\
					</li>';
		
	})
	//$('.uy-gallery-data').append(html);
}*/