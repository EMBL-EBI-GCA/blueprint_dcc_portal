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
  'markdown',
  'angulartics',
  'angulartics.google.analytics'
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
    when('/datasets/:datasetId', {
      templateUrl: 'partials/dataset-detail.html',
      controller: 'DatasetDetailCtrl'
    }).
    when('/datasets', {
      templateUrl: 'partials/dataset-list.html',
      controller: 'DatasetListCtrl'
    }).
    when('/home', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    }).
    when('/md/:dir/:name', {
      templateUrl: 'partials/markdown.html',
      controller: 'MarkdownCtrl'
    }).
    when('/md/:name', {
      templateUrl: 'partials/markdown.html',
      controller: 'MarkdownCtrl'
    }).
    when('/news', {
      templateUrl: 'partials/news.html',
      controller: 'NewsCtrl'
    }).
    otherwise({
      redirectTo: '/home'
    });
  }
]);
