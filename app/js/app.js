'use strict';

var dependencies = [
  'ngRoute',
  'ngSanitize',
  'dccPortal.filters',
  'dccPortal.services',
  'dccPortal.directives',
  'dccPortal.controllers',
  'uiFacets',
  'ui.bootstrap',
  'markdown'
];

if (Modernizr.svg) {
  dependencies.push('dangle');
}

// Declare app level module which depends on filters, and services
var dccPortal = angular.module('dccPortal', dependencies);
dccPortal.constant("Modernizr", Modernizr);

dccPortal.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/experiments/:experimentId', {
      templateUrl: 'partials/experiment-detail.html',
      controller: 'ExperimentDetailCtrl'
    }).
    when('/experiments', {
      templateUrl: 'partials/experiment-list.html',
      controller: 'ExperimentListCtrl'
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



$().ready(function() {
  //Pass clicks on td through to any link it contains
  $('body').on('click','td.hasdata',function(event){
    $(event.target).find("a").click();
  });
});