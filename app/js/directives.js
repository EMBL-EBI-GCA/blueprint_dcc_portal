'use strict';

/* Directives */
var directives = angular.module('dccPortal.directives', []);

directives.directive('download', function() {
  return {
    restrict: 'E',
    scope: {
      href: '@'
    },
    template: '<a class="download" ng-href="{{href}}" title="Download file">&#8659;</a>'
  }
});

directives.directive('reactome', function($http, $window) {
  return {
    restrict: 'E',
    scope: {
      url: '='
    },
    link: function(scope, element, attrs, controller) {
      scope.init = function() {
        scope.text = "Load in Reactome";
        scope.href = "";
        scope.state = false;
        scope.errored = false;
        scope.success = false;
      }

      //reset the state if the url changes
      scope.$watch('url', function() {
        scope.init();
      });
    },
    controller: function($scope, $http, $window) {
      $scope.reactomeClick = function() {
        if (!$scope.href) {
          $scope.text = 'Loading...'
          $http.post('http://www.reactome.org/AnalysisService/identifiers/url/projection?pageSize=0&page=1', $scope.url, {
            headers: {
              "Content-Type": "text/plain"
            }
          }).success(function(data) {
            var token = data.summary.token;
            var newUrl = "http://www.reactome.org/PathwayBrowser/#DTAB=AN&TOOL=AT&ANALYSIS=" + token;
            $scope.href = newUrl;
            $scope.loaded = true;
            $scope.text = "View in Reactome";
            $window.open(newUrl, '_blank');

          }).error(function(data, status, headers, config) {
            $scope.text = "Error";
            $scope.href = "";
            $scope.loaded = true;
            $scope.errored = true;
            console.log("failed to load url in reactome", $scope.url, $)
          });
        }
      };
    },
    template: '<button class="btn btn-xs btn-primary" ng-hide="loaded" ng-click="reactomeClick()">{{text}}</button>' + '<a class="btn btn-xs btn-success" ng-show="success" ng-href="{{href}}" target="_blank">{{text}}</a>' + '<button class="btn btn-xs btn-warning" ng-show="errored">{{text}}</button>'
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

            var facetResults = facet.match(item);

            var facetMatch = facetResults.match;
            var itemVals = facetResults.vals;
            //var itemHasProperty = item.hasOwnProperty(facet.property);
            //var itemVal;
            if (!facetMatch) {
              match = false;
            }


            if (!newTerms.hasOwnProperty(facet.property)) {
              newTerms[facet.property] = {};
            }
            if (itemVals != null) {
              for (var index in itemVals) {
                var itemVal = itemVals[index];

                if (itemVal && !newTerms[facet.property].hasOwnProperty(itemVal)) {
                  newTerms[facet.property][itemVal] = 0;
                }

                if (!propValHolder[facet.property]) {
                  propValHolder[facet.property] = [];
                }
                propValHolder[facet.property].push(itemVal);
              }
            }

          }

          if (match) {
            passedItems.push(item);

            for (var k = 0, kl = $scope.facets.length; k < fl; k++) {
              var prop = $scope.facets[k].property;

              if (propValHolder.hasOwnProperty(prop)) {
                var vals = propValHolder[prop];
                for (var n = 0, nl = vals.length; n < nl; n++) {
                  var val = vals[n];
                  newTerms[prop][val]++;
                }
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
    template: '<button class="btn btn-primary" ng-click="clearParent($event)">{{text}}</button>'
  };
});
uiFacet.directive('uiFacet', function() {
  return {
    restrict: 'E',
    template: '<div class="facet">' + '<ul class="list-group" ng-class="{collapsed: collapsed}">' + '<li class="list-group-item heading">' + '<h3 class="panel-title">{{title}}</h3>' + '<button type="button" class="btn btn-xs btn-primary" ng-show="buttonRequired" ng-click="toggleCollapse()">{{buttonText}}</button>' + '</li>' + '<li ng-repeat="item in termContainer.terms" class="list-group-item facet-term" ng-class="{active: selected.hasOwnProperty(item.term)}" ng-click="handleClick($event)" ui-facet-value="{{item.term}}">' + '{{item.term}} <span class="badge">{{item.count}}</span>' + '</li>' + '</ul>' + '' + '</div>',
    scope: {
      title: '@',
      property: '@'
    },
    require: '^uiFacets',
    link: function(scope, element, attrs, parentController) {
      scope.collapsed = true;
      scope.buttonText = '+'
      scope.buttonRequired = false;

      scope.list = element.find("ul").first();
      parentController.addFacet(scope);

      scope.$watch('list')

      scope.toggleCollapse = function() {
        scope.collapsed = !scope.collapsed;
        if (scope.collapsed) {
          scope.buttonText = '+';
        } else {
          scope.buttonText = '-';
        }
      }

      scope.$parent.$watch('items', function() {
        scope.termContainer = parentController.getTerms(scope.property);
        if (scope.list.prop('scrollHeight') > scope.list.height()) {
          scope.buttonRequired = true;
        }
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
      $scope.getVals = function(item) {
        if (!item.hasOwnProperty($scope.property)) {
          return null;
        }
        var val = item[$scope.property];
        if (val === null || val == "") {
          return null;
        }
        if (val instanceof Array) {
          return val;
        }
        if (typeof val == 'string' || val instanceof String || typeof val == 'number' || val instanceof Number || typeof val == 'boolean' || val instanceof Boolean) {
          return [val];
        }
        var vals = [];
        for (var p in val) {
          if (val.hasOwnProperty(p)) {
            vals.push(p);
          }
        }
        return vals;
      }
      $scope.match = function(item) {
        var vals = $scope.getVals(item);
        var results = {
          vals: vals,
          match: true
        };

        if (!$scope.selectedValues || $scope.selectedValues.length === 0) {
          return results;
        }

        if (vals === null) {
          results.match = false;
          return false;
        }

        for (var v in vals) {
          var itemVal = vals[v].toString();

          for (var i = 0, vl = $scope.selectedValues.length; i < vl; i++) {
            if (itemVal == $scope.selectedValues[i]) {
              results.match = true;
              return results;
            }
          }
        }
        results.match = false;
        return results;
      };
      $scope.clearState = function() {
        $scope.selected = {};
        $scope.selectedValues = [];
      };
      $scope.clearState(); //initialise the facet
    }
  };
});
