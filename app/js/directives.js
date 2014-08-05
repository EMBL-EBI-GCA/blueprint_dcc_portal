'use strict';

/* Directives */
var directives = angular.module('dccPortal.directives', []);

directives.directive('reactome', function($http,$window) {
  return {
    restrict: 'E',
    scope: {
      url: '='
    },
    link: function(scope, element, attrs, controller) {
      scope.init = function(){
        scope.text = "Load in Reactome";
        scope.href = "";
      }
     
      //reset the state if the url changes
      scope.$watch('url', function() {
         scope.init();
      });
    },
    controller: function($scope, $http, $window) {
      $scope.reactomeLoad = function($event) {
        if (!$scope.href) {
		  $event.stopPropagation();
          $http
            .post('http://www.reactome.org/AnalysisService/identifiers/projection?pageSize=0&page=1', $scope.url, {headers:{"Content-Type": "text/plain" }})
            .success(function(data) {
              var token = data.summary.token;
              var newUrl = "http://www.reactome.org/PathwayBrowser/#DTAB=AN&TOOL=AT&ANALYSIS=" + token;
              $scope.href = newUrl;
              $scope.text = "View in Reactome";
              $window.open(newUrl);
              
            }).error(function(data, status, headers, config) {
              $scope.text = "Failed to load";
              $scope.href= "";
              console.log("failed to load url in reactome", $scope.url, $)
            });
           
        }
        
      };
    },
    template: '<a href="{{href}}" target="_blank" ng-click="reactomeLoad($event)">{{text}}</a>'
  }
});


var uiFacet = angular.module('uiFacets', []);
uiFacet.directive('uiFacets', function() {
  return {
    restrict: 'A',
    transclude: true,
    scope: {
      items: '='
    },
    link: function(scope, element, attrs, controller) {
      scope.$watch('originalItems', function() {
        controller.filter();
      });
      scope.$watch('originalItems.$resolved', function() {
        controller.filter();
      });
    },
    controller: function($scope) {
      var controller = this;

      controller.init = function() {
        $scope.originalItems = $scope.items;
        $scope.items = [];
        $scope.facets = [];
        $scope.terms = {};
      }

      controller.clearFilters = function() {
        for (var i = 0, l = $scope.facets.length; i < l; i++) {
          $scope.facets[i].clearState();
        }
      };

      controller.addFacet = function(facet) {
        $scope.facets.push(facet);
        facet.$watch('selectedValues', function() {
          controller.filter();
        });
      };

      //get possible values for a property
      controller.getTerms = function(property) {
        var termContainer = {
          _type: "terms",
          total: $scope.originalItems.length,
          other: 0,
          missing: 0
        };

        var counts = $scope.terms[property];
        var tuples = [];
        for (var k in counts) {
          if (counts.hasOwnProperty(k)) {
            var v = counts[k];
            tuples.push({
              term: k,
              count: v
            });
          }
        }
        termContainer.terms = tuples.sort(function(a, b) {
          if (a.count < b.count) return 1;
          if (a.count > b.count) return -1;
          return a.term.localeCompare(b.term);
        });

        return termContainer;
      };

      controller.filter = function() {
        //filter the items based on the facets
        //also collect the terms in the same pass
        //terms are collected from all items and incremented on matches
        var passedItems = [];
        var newTerms = {};

        for (var i = 0, il = $scope.originalItems.length; i < il; i++) {
          //check each item to see if it matches the filters in each facet
          var item = $scope.originalItems[i];
          var match = true;
          var propValHolder = {};

          //check each facet until we find one it doesn't match
          for (var j = 0, fl = $scope.facets.length; j < fl; j++) {
            var facet = $scope.facets[j];

            var facetMatch = facet.match(item);
            var itemHasProperty = item.hasOwnProperty(facet.property);
            var itemVal;

            if (itemHasProperty) {
              itemVal = item[facet.property].toString();
            }

            if (!newTerms.hasOwnProperty(facet.property)) {
              newTerms[facet.property] = {};
            }

            if (itemHasProperty && !newTerms[facet.property].hasOwnProperty(itemVal)) {
              newTerms[facet.property][itemVal] = 0;
            }

            if (itemHasProperty) {
              propValHolder[facet.property] = itemVal;
            }

            if (!facetMatch) {
              match = false;
            }
          }

          if (match) {
            passedItems.push(item);

            for (var k = 0, kl = $scope.facets.length; k < fl; k++) {
              var prop = $scope.facets[k].property;
              if (propValHolder.hasOwnProperty(prop)) {
                var val = propValHolder[prop];
                newTerms[prop][val]++;
              }
            }
          }
        }
        $scope.items = passedItems;
        $scope.terms = newTerms;
      };
      controller.init();
      controller.filter();
    },
    template: '<div class="ui-facets ng-transclude"></div>'
  };
});
uiFacet.directive('uiFacetsClear', function() {
  return {
    restrict: 'E',
    require: '^uiFacets',
    scope: {
      'text': '@'
    },
    link: function(scope, element, attrs, parentController) {
      scope.clearParent = function($event) {
        parentController.clearFilters();
      };
    },
    template: '<button ng-click="clearParent($event)">{{text}}</button>'
  };
});
uiFacet.directive('uiFacet', function() {
  return {
    restrict: 'E',
    template: 
      '<div class="panel panel-default facet">' + '<div class="panel-heading"><h3  class="panel-title">{{title}}</h3></div>' + '<div class="panel-body"><ul class="nav nav-pills"><li ng-repeat="item in termContainer.terms"  ng-class="{active: selected.hasOwnProperty(item.term)}"><a ng-click="handleClick($event)" ui-facet-value="{{item.term}}">{{item.term}} <span class="badge">{{item.count}}</span></a></li></ul></div>' + '</div>',
    scope: {
      title: '@',
      property: '@'
    },
    require: '^uiFacets',
    link: function(scope, element, attrs, parentController) {
      parentController.addFacet(scope);

      scope.$parent.$watch('items', function() {
        scope.termContainer = parentController.getTerms(scope.property);
      });
    },
    controller: function($scope) {
      $scope.handleClick = function($event) {
        var target = $event.target;
        if (target && target.attributes["ui-facet-value"]) {
          var term = target.attributes['ui-facet-value'].value;

          if ($scope.selected[term]) {
            delete $scope.selected[term];
          } else {
            $scope.selected[term] = true;
          }

          var newSelection = [];

          for (var k in $scope.selected) {
            if ($scope.selected.hasOwnProperty(k)) {
              newSelection.push(k);
            }
          }
          $scope.selectedValues = newSelection;
        }
      };

      $scope.match = function(item) {
        if (!$scope.selectedValues || $scope.selectedValues.length === 0) {
          return true;
        }

        if (!item.hasOwnProperty($scope.property)) {
          return false;
        }
        var itemVal = item[$scope.property].toString();

        for (var i = 0, vl = $scope.selectedValues.length; i < vl; i++) {
          if (itemVal == $scope.selectedValues[i]) {
            return true;
          }
        }

        return false;
      };
      $scope.clearState = function() {
        $scope.selected = {};
        $scope.selectedValues = [];
      };
      $scope.clearState(); //initialise the facet
    }
  };
});
