'use strict';

/* Services */

var services = angular.module('dccPortal.services', ['ngResource', 'elasticsearch']);

services.service('esClient', ['esFactory',
  function(esFactory) {
      return esFactory({
          host: '127.0.0.1:3000',
          apiVersion: '1.3'
      });
  }
]);

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

services.factory('sharedProperty',[function(){
  var property = null;
  
  return {
    getProperty: function() {
      return property;
    },
    setProperty: function(value){
      property = value;
    },
    clearProperty: function() {
      property = null;
    }
  };
}]);
