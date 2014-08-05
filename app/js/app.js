'use strict';


// Declare app level module which depends on filters, and services
var dccPortal = angular.module('dccPortal', [
  'ngRoute',
  'ngSanitize',
  'dccPortal.filters',
  'dccPortal.services',
  'dccPortal.directives',
  'dccPortal.controllers',
  'uiFacets',
  'dangle',
  'markdown'
]);


dccPortal.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/experiments', {
      templateUrl: 'partials/experiment-list.html',
      controller: 'ExperimentListCtrl'
    }).
    when('/experiments/:experimentId', {
      templateUrl: 'partials/experiment-detail.html',
      controller: 'ExperimentDetailCtrl'
    }).
    when('/files', {
      templateUrl: 'partials/file-list.html',
      controller: 'FileListCtrl'
    }).
    when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    }).
    when('/md/:name', {
      templateUrl: 'partials/markdown.html',
      controller: 'MarkdownCtrl'
    }).
    otherwise({
      redirectTo: '/home'
    });
  }
]);
