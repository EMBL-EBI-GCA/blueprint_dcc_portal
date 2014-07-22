$().ready(function() {
  $.get("/experiment_counts.json", function(data) {

    var labels = _.keys(data).sort();
    var counts = [];

    for (var i = 0; i < labels.length; i++) {
      var count = [labels[i],data[labels[i]]];
      counts[i] = count;
    }

    var plot1 = jQuery.jqplot ('chart_container', [counts], 
      { 
        seriesDefaults: {
          // Make this a pie chart.
          renderer: jQuery.jqplot.PieRenderer, 
          rendererOptions: {
            // Put data labels on the pie slices.
            // By default, labels show the percentage of the slice.
            showDataLabels: true
          }
        }, 
        legend: { show:true, location: 'e' },
        title: 'Data summary'
      }
    );

  });

});