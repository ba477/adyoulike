'use strict';
/**
 * @ngdoc overview
 * @name adyoulikeApp
 * @description
 * # adyoulikeApp
 *
 * Main module of the application.
 */
(function(){
    angular
        .module('adyoulikeApp', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'ngMaterial',
            'ngMessages',
            'ui.bootstrap'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'MainCtrl',
                    controllerAs: 'main'
                })
                .when('/about', {
                    templateUrl: 'views/about.html',
                    controller: 'AboutCtrl',
                    controllerAs: 'about'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });


})();
