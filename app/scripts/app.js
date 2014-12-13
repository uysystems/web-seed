'use strict';
/**
 * @ngdoc overview
 * @name webSeedApp
 * @description
 * # webSeedApp
 *
 * Main module of the application.
 */
var sp = new Array();
sp['host'] 			= 'http://www.timeoutstore.com/uycms_service/';
sp['layout']		= sp['host']+'sites/data_layout.json'
sp['single_page']	= sp['host']+'sites/web_page_by_id/';

//clients
sp['client_registration']	= sp['host']+'timeout/sites/client_registration.json';
sp['client_login']	= sp['host']+'timeout/sites/client_login.json';
sp['client_profile']	= sp['host']+'timeout/sites/client_profile.json';
sp['client_check_current_password'] =  sp['host']+'timeout/sites/check_current_password.json'
sp['client_update_password'] = sp['host']+'timeout/sites/update_password.json'

//blog
sp['blog_categories']		= sp['host']+'blog/sites/blog_categories.json';
sp['blog_latest_posts']		= sp['host']+'blog/sites/blog_latest_post.json';
sp['blog_post_lists']		= sp['host']+'blog/sites/blog_default_list';
sp['blog_post_single']		= sp['host']+'blog/sites/blog_single_post/';

//shop

sp['product_image_root']		= sp['host']+'img/site/products/';

sp['shop_barnds']				= sp['host']+'ecommerce/sites/brand_list.json';
sp['shop_barnds_image']			= sp['host']+'ecommerce/sites/brand_list_image.json';
sp['shop_barnd_tree']			= sp['host']+'ecommerce/sites/brandTree.json';
sp['shop_category']				= sp['host']+'ecommerce/sites/category_list.json';
sp.shop_category_tree			= sp.host+'ecommerce/sites/category_tree.json';
sp['shop_random_product_list']	= sp['host']+'ecommerce/sites/random_product_list.json';
sp['shop_product_by_category']	= sp['host']+'ecommerce/sites/product_list_by_category/';
sp['shop_product_by_brand']		= sp['host']+'ecommerce/sites/product_list_by_brand/';

sp['shop_product_details']		= sp['host']+'ecommerce/sites/product_details.json';
sp['shop_product_attributes']	= sp['host']+'ecommerce/sites/product_attribute_list.json';
sp['shop_stores']				= sp['host']+'ecommerce/sites/getStores.json';
sp.getAttrByCatId				= sp['host']+'ecommerce/sites/getAttrByCatId.json';
sp.getProductsByAttrFilter		= sp['host']+'ecommerce/sites/getProductsByAttrFilter.json';


sp['shop_order']		= sp['host']+'ecommerce/sites/order.json';
sp['shop_order_status']		= sp['host']+'ecommerce/sites/order_update_by_icepay.json';
sp['shop_history']		= sp['host']+'ecommerce/sites/shoping_history.json';

sp['shop_payment_methods'] = sp['host'] + 'ecommerce/sites/payment_methods.json';

// site
sp['contact_email'] = sp['host'] + 'timeout/sites/contact.json';
sp['lookbook'] = sp['host'] + 'timeout/sites/lookbook.json';
sp['homeblock'] = sp['host'] + 'timeout/sites/homeblock.json';
sp['gallery'] = sp['host'] + 'timeout/sites/gallery.json';


var webApp = angular.module('webSeedApp', [
    'ngAnimate',
    'ngRoute',
    'ngTouch',
    'ngResource'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
    	 // redirectTo: '/shop'
        templateUrl: 'views/site/home.html',
        controller: 'HomeCtrl'
      })
      .when('/contact', {
    	 // redirectTo: '/shop'
        templateUrl: 'views/site/contact.html',
        controller: 'ContactCtrl'
      })

      .when('/lookbook', {
    	 // redirectTo: '/shop'
        templateUrl: 'views/site/lookbook.html',
        controller: 'LookBookCtrl'
      })

      .when('/page/:id', {
          templateUrl: 'views/site/single.html',
          controller: 'PageCtrl'
        })
       //shop 
      .when('/shop', {
        templateUrl: 'views/site/ecommerce/shop.html',
        controller: 'ShopCtrl'
      })
      .when('/shop/brands', {
    	  templateUrl: 'views/site/ecommerce/brands.html',
    	  controller: 'ShopBrandsCtrl'
      })
		.when('/shop/stores', {
		  templateUrl: 'views/site/ecommerce/stores.html',
		  controller: 'ShopStoresCtrl'
		})
      .when('/shop/category_view/:catid', {
        templateUrl: 'views/site/ecommerce/shop.html',
        controller: 'ShopCtrl'
      })
       .when('/shop/brand_view/:brandid', {
        templateUrl: 'views/site/ecommerce/shop.html',
        controller: 'ShopCtrl'
      })
      .when('/shop/product/details/:id', {
        templateUrl: 'views/site/ecommerce/shop_product_details.html',
        controller: 'ShopProductDetailsCtrl'
      })
      .when('/shop/buy', {
        templateUrl: 'views/site/ecommerce/buy.html',
        controller: 'ShopBuyCtrl'
      })
      .when('/shop/proceed', {
        templateUrl: 'views/site/ecommerce/proceed.html',
        controller: 'ShopProceedCtrl'
      })
      .when('/shop/order/:order_id', {
        templateUrl: 'views/site/ecommerce/order_status.html',
        controller: 'ShopOrderCtrl'
      })
      .when('/shop/order/:order_id', {
        templateUrl: 'views/site/ecommerce/order_status.html',
        controller: 'ShopOrderCtrl'
      })
      .when('/shop/shoping_history', {
        templateUrl: 'views/site/ecommerce/shoping_history.html',
        controller: 'ShopingHistoryCtrl'
      })
      //blog
      .when('/blog', {
        templateUrl: 'views/site/blog/blog.html',
        controller: 'BlogCtrl'
      })
      .when('/blog/category_view/:catid', {
        templateUrl: 'views/site/blog/blog.html',
        controller: 'BlogCtrl'
      })
      .when('/blog/:id', {
        templateUrl: 'views/site/blog/single_blog.html',
        controller: 'BlogCtrl'
      })
      
      //client section
      .when('/register', {
        templateUrl: 'views/site/register.html',
        controller: 'RegisterCtrl'
      })
      .when('/login/:redirect', {
        templateUrl: 'views/site/login.html',
        controller: 'LoginCtrl'
      })
      .when('/login', {
        templateUrl: 'views/site/login.html',
        controller: 'LoginCtrl'
      })
      .when('/logout', {
    	templateUrl: 'views/site/home.html',
        controller: 'LogoutCtrl'
      })
      .when('/profile', {
      	templateUrl: 'views/site/profile.html',
          controller: 'ProfileCtrl'
        })
      .otherwise({
        redirectTo: '/'
      })
  }).config(function($locationProvider){
	  //$locationProvider.html5Mode(true);
  })
  
  $(document).ready(function(){
	  $('img').on('load',function(){
        console.log('foo')
	  });
	  
	 
  })	
  

