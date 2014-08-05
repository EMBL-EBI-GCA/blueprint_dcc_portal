'use strict';

/* Filters */
var filters = angular.module('dccPortal.filters', []);

filters.filter('pager', function() {
    return function(input, page, pageSize) {
        page = +page;
        pageSize = +pageSize;
        var start = (page-1)*pageSize;
        var end = start+pageSize;
        return input.slice(start,end);
    }
});