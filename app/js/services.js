'use strict';

/* Services */

var services = angular.module('dccPortal.services', ['ngResource']);

services.factory('List', ['$resource',
  function($resource) {
    return $resource('data/:name.json', {}, {
      //default to load all experiments if no id is supplied
      query: {
        method: 'GET',
        params: {
          name: 'experiments'
        },
        isArray: true
      }
    });
  }
]);

services.factory('Item', ['$resource',
  function($resource) {
    return $resource('data/:name.json', {}, {
      query: {
        method: 'GET',
        isArray: false,
        params: {
          name: 'experiment_counts'
        }
      }
    });
  }
]);