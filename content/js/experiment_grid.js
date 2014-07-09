function init_facetlize() {
  $.getJSON("./data/all_decorated.json", function(data) {
    var item_template =
    '<tr class="item">' +
      '<td class="accession"><%= obj.full_accession %></td>' +
      '<td><%= obj.project %></td>' +
      '<td><%= obj.md_species %></td>' +
      '<td><%= obj.auto_desc %> </td>' +
      '<td><%= obj.type %></td>' +
    '</tr>';
    settings = {
      items: data,
      facets: {
        'project': 'Project',
        'status': 'Status',
        'md_species': 'Species',
        'md_disease': 'Disease',
        'md_donor_health_status': 'Health Status',
        'md_tissue_type': 'Tissue',
        'md_cell_type': 'Cell Type',
      },
      resultSelector: '#results',
      facetSelector: '#facets',
      resultTemplate: item_template,
      paginationCount: 50,
      orderByOptions: {
        'accession': 'Accession',
        'project': 'Project',
        'species': 'Species',
        'auto_desc': 'Description'
      }
    };

    // use them!
    $.facetelize(settings);
  });
}

$(document).ready(init_facetlize);
