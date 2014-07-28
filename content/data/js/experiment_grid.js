function init_facetlize() {
  
  var popup_template =
        '<div class="entry_data">' +
         '<h1><%= obj.SAMPLE_DESC_1 %> <%= obj.SAMPLE_DESC_2 %>  <%= obj.SAMPLE_DESC_3 %> </h1>' +
         '<h2><%= dt %></h2>' +
         '<ul>'+
         '<li><a href="<%= obj.ftp_path[dt] %>">Go to FTP site</a></li>' +
         '<% if (obj.archive_path && obj.archive_path[dt]) { %> '+
           '<li><a class="to_archive" href="<%= obj.archive_path[dt] %>">Go to data archive</a></li>'+
         '<% } %>' +
         '<% if (obj.reactome && obj.reactome[dt]) { %> '+
           '<li><a class="to_reactome" href="<%= obj.reactome[dt] %>">View in Reactome</a></li>'+
         '<% } %>' +
         '</ul>'+
        '</div>';
  
  
  $.getJSON("../experiments.json", function(data) {
    var item_template =
    '<% var datatypes = ["Bisulfite-Seq","DNase-Hypersensitivity","RNA-Seq","Input","H3K4me3","H3K4me1","H3K9me3","H3K27ac","H3K27me3","H3K36me3"] %>' +
    '<tr class="item">' +
      '<td><%= obj.SAMPLE_DESC_1 %></td>' +
      '<td><%= obj.SAMPLE_DESC_2 %></td>' +
      '<td><%= obj.SAMPLE_DESC_3 %></td>' +
      '<% _.each(datatypes, function(dt) { %> <td class="assays"><% if (obj.got_data[dt]) { %>' + 
      '<a class="show_popup" href="#">&#x25cf;</a>' +
      popup_template +
      '<% } %></td> <% }); %>' +
    '</tr>';
    settings = {
      items: data,
      facets: {
        'SAMPLE_DESC_1': 'Sample Description (1)',
        'SAMPLE_DESC_2': 'Sample Description (2)',
        'SAMPLE_DESC_3': 'Sample Description (3)'
      },
      resultSelector: '#results',
      facetSelector: '#facets',
      resultTemplate: item_template,
      paginationCount: 50,
      orderByOptions: {
        'SAMPLE_DESC_1': 'Sample Description (1)',
        'SAMPLE_DESC_2': 'Sample Description (2)',
        'SAMPLE_DESC_3': 'Sample Description (3)'
      }
    };
    // show the popup content 
    $("#facet_content").delegate('.show_popup','click', function(event){
      event.preventDefault();
      var target = $(event.target);
      var popup_content = target.siblings(".entry_data");      
      $.fancybox.open(popup_content);
    });
    //open a new window to load the data into reactome
    $("#facet_content").delegate('a.to_reactome','click', function(event){
      var target = $(event.target);
      var url = target.attr("href");
      var real_url = 'to_reactome#'+encodeURIComponent(url);
      window.open(real_url,'_blank');
    });
    // use them!
    $.facetelize(settings);
    $("#loading").hide();
    $("#facet_content").show();    
  });
}



$(document).ready(init_facetlize);
