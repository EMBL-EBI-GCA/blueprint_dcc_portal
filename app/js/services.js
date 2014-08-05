'use strict';

/* Services */

var services = angular.module('dccPortal.services', ['ngResource']);

services.factory('Experiment', ['$resource',
  function($resource) {
    return $resource('data/:experimentId.json', {}, {
      //default to load all experiments if no id is supplied
      query: {
        method: 'GET',
        params: {
          experimentId: 'experiments'
        },
        isArray: true
      }
    });
  }
]);

services.factory('File', ['$resource',
  function($resource) {
    return $resource('data/files.json', {}, {
      query: {
        method: 'GET',
        isArray: true
      }
    });
  }
]);

services.factory('SummaryStats', ['$resource',
  function($resource) {
    return $resource('data/experiment_counts.json', {}, {
      query: {
        method: 'GET',
        isArray: false
      }
    });
  }
]);
