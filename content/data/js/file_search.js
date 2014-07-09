function init_facetlize() {
  $.getJSON("../files.json", function(data) {
    var item_template =
    '<tr class="item">' +
      '<td><a href="<%= obj.FILE %>"</a>Download</a></td>' +
      '<td><%= obj.FILE_TYPE %></td>' +
      '<td><%= obj.SAMPLE_DESC_1 %></td>' +
      '<td><%= obj.SAMPLE_DESC_2 %> </td>' +
      '<td><%= obj.SAMPLE_DESC_3 %></td>' +
      '<td><%= obj.DONOR_SEX %></td>' +
      '<td><%= obj.LIBRARY_STRATEGY %></td>' +
      '<td><%= obj.EXPERIMENT_TYPE %></td>' +
      '<td><%= obj.CENTER_NAME %></td>' +
    '</tr>';
    settings = {
      items: data,
      facets: {
        'CENTER_NAME': 'Analysis center',
        'LIBRARY_STRATEGY': 'Library strategy',
        'EXPERIMENT_TYPE': 'Experiment type',
        'SAMPLE_DESC_1': 'Sample description 1',
        'SAMPLE_DESC_2': 'Sample description 2',
        'SAMPLE_DESC_3': 'Sample description 3',
        'DONOR_SEX': 'Sex',
        'TYPE': 'Type'
      },
      resultSelector: '#results',
      facetSelector: '#facets',
      resultTemplate: item_template,
      paginationCount: 50,
      orderByOptions: {
        'CENTER_NAME': 'Analysis center',
        'LIBRARY_STRATEGY': 'Library strategy',
        'EXPERIMENT_TYPE': 'Experiment type',
        'SAMPLE_DESC_1': 'Sample description 1',
        'SAMPLE_DESC_2': 'Sample description 2',
        'SAMPLE_DESC_3': 'Sample description 3',
        'DONOR_SEX': 'Sex',
        'TYPE': 'Type'
      }
    };

    // use them!
    $.facetelize(settings);
    $("#loading").hide();
    $("#facet_content").show();
  });
}

$(document).ready(init_facetlize);
