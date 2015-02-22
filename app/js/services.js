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
    return $resource('http://127.0.0.1:9200/blueprint/:type/:name', {}, {
      query: {
        method: 'GET',
        isArray: false,
        params: {
          name: '_count',
          type: 'experiment',
        },
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
