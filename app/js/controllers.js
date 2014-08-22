'use strict';

/* Controllers */

var controllers = angular.module('dccPortal.controllers', []);

/* Experiment List */
controllers.controller('ExperimentListCtrl', ['$scope', 'List','sharedProperty',
  function($scope, List,sharedProperty) {
    $scope.items = List.query({
      name: 'experiments'
    });
    $scope.items.$promise.then(function(data) {
      $scope.items = data;
    });
    $scope.datatypes = ["Bisulfite-Seq", "DNase-Seq", "RNA-Seq", "ChIP Input", "H3K4me3", "H3K4me1", "H3K9me3", "H3K27ac", "H3K27me3", "H3K36me3","H2A.Zac","H3K9/14ac"];
    
    $scope.initialExpValues = [];
    if (sharedProperty.getProperty() && sharedProperty.getProperty() == 'ChIP-Seq') {
      $scope.initialExpValues = ["ChIP Input", "H3K4me3", "H3K4me1", "H3K9me3", "H3K27ac", "H3K27me3", "H3K36me3","H2A.Zac","H3K9/14ac"];
    }
    else if (sharedProperty.getProperty()) {
      $scope.initialExpValues.push(sharedProperty.getProperty());
    }
    sharedProperty.clearProperty();
    
    $scope.orderProp = 'SAMPLE_DESC_1';
    $scope.numPages = 5;
    $scope.pageSize = 35;
    $scope.currentPage = 1;
    $scope.order = function(order){
      if ($scope.orderProp == order){
        $scope.orderProp = '-'+order;
      }
      else {
        $scope.orderProp = order;
      }
    };
  }
]);

controllers.controller('ExperimentDetailCtrl', ['$scope', '$routeParams', 'Item', function($scope, $routeParams, Item) {
    $scope.data = Item.get({
      name: $routeParams.experimentId
    });
    $scope.data.$promise.then(function(exp){
      $scope.data = exp;
    });
  }
]);

/* File List */
controllers.controller('FileListCtrl', ['$scope', 'List',
  function($scope, List) {
    $scope.items = List.query({
      name: 'files'
    });
    $scope.items.$promise.then(function(data) {
      $scope.items = data;
    });
    $scope.orderProp = 'SAMPLE_DESC_1';
    $scope.numPages = 5;
    $scope.pageSize = 35;
    $scope.currentPage = 1;
    $scope.order = function(order){
      if ($scope.orderProp == order){
        $scope.orderProp = '-'+order;
      }
      else {
        $scope.orderProp = order;
      }
    } 
  }
]);

/* Home */
controllers.controller('HomeCtrl', ['$scope', 'List', 'Item','Modernizr','$location','sharedProperty',
  function($scope, List, Item, Modernizr,$location,sharedProperty) {
    $scope.counts = {
      terms: List.query({
        name: 'experiment_count'
      })
    };
    $scope.progress = {
      terms: List.query({
        name: 'progress'
      })
    };
    $scope.supportsSvg = Modernizr.svg;

    $scope.counts.terms.$promise.then(function(data) {
      $scope.counts = {
        terms: data
      };
    });
    $scope.progress.terms.$promise.then(function(data) {
      $scope.progress = {
        terms: data
      };
    });
    
    $scope.hackety = function(field, term){
      sharedProperty.setProperty(term);
      $location.path('experiments');
    }
  }
]);

/* Markdown */
controllers.controller('MarkdownCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('static/' + $routeParams.name + '.md', {
      responseType: 'text'
    }).success(function(data) {
      $scope.content = data;
    });
  }
]);
