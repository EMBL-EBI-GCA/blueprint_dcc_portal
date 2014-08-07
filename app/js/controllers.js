'use strict';

/* Controllers */

var controllers = angular.module('dccPortal.controllers', []);

/* Experiment List */
controllers.controller('ExperimentListCtrl', ['$scope', 'Experiment',
  function($scope, Experiment) {
    $scope.items = Experiment.query();
    $scope.items.$promise.then(function(data) {
      $scope.items = data;
    });
    $scope.datatypes = ["Bisulfite-Seq", "DNase-Hypersensitivity", "RNA-Seq", "Input", "H3K4me3", "H3K4me1", "H3K9me3", "H3K27ac", "H3K27me3", "H3K36me3"];
    $scope.orderProp = 'SAMPLE_DESC_1';
    $scope.numPages = 5;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
  }
]);

/* File List */
controllers.controller('FileListCtrl', ['$scope', 'File',
  function($scope, File) {
    $scope.items = File.query();
    $scope.items.$promise.then(function(data) {
      $scope.items = data;
    });
    $scope.orderProp = 'SAMPLE_DESC_1';
    $scope.numPages = 5;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
  }
]);

/* Home */
controllers.controller('HomeCtrl', ['$scope', 'SummaryStats',
  function($scope, SummaryStats) {
    $scope.stats = {};
    var stats = SummaryStats.query();
    stats.$promise.then(function(data) {
      $scope.stats = data;
    });
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
