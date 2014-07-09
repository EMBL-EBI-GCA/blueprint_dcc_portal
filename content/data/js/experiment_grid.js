function init_facetlize() {
  $.getJSON("../experiments.json", function(data) {
    var item_template =
    '<tr class="item">' +
      '<td><%= obj.sample_desc_1 %></td>' +
      '<td><%= obj.sample_desc_2 %></td>' +
      '<td><%= obj.sample_desc_3 %></td>' +
      '<td><%= obj.sample_desc_3 %></td>' +
			<th class="assays"><div><span>Bisulfite</span></div></th>
			<th class="assays"><div><span>DNaseI</span></div></th>
			<th class="assays"><div><span>RNA</span></div></th>
			<th class="assays"><div><span>Input</span></div></th>
			<th class="assays"><div><span>H3K4me3</span></div></th>
			<th class="assays"><div><span>H3K4me1</span></div></th>
			<th class="assays"><div><span>H3K9me3</span></div></th>
			<th class="assays"><div><span>H3K27ac</span></div></th>
			<th class="assays"><div><span>H3K27me3</span></div></th>
			<th class="assays"><div><span>H3K36me3</span></div></th>
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
    $("#loading").hide();
    $("#facet_content").show();
  });
}

$(document).ready(init_facetlize);
