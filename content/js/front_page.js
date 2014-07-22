$().ready(function(){
  $.get("/experiment_counts.json", function(data) {

    //var labels = _.keys(data).sort();
    //var counts = [];

    //for (var i = 0; i < labels.length; i++) {
      counts[i] = data[labels[i]];
    }

    var counts = [55, 20, 13, 32, 5, 1, 2, 10];
    var labels =  ["%%.%% - Enterprise Users", "IE Users"];

    var r = Raphael("raphael_holder");

    pie = r.piechart(10, 10, 100, counts, {
      legend: labels,
      legendpos: "west"
    });

    r.text(320, 100, "Experiment Counts").attr({
      font: "20px sans-serif"
    });

    pie.hover(function() {
      this.sector.stop();
      this.sector.scale(1.1, 1.1, this.cx, this.cy);

      if (this.label) {
        this.label[0].stop();
        this.label[0].attr({
          r: 7.5
        });
        this.label[1].attr({
          "font-weight": 800
        });
      }
    },
    function() {
      this.sector.animate({
        transform: 's1 1 ' + this.cx + ' ' + this.cy
      }, 500, "bounce");

      if (this.label) {
        this.label[0].animate({
          r: 5
        }, 500, "bounce");
        this.label[1].attr({
          "font-weight": 400
        });
      }
    });
  });

});
