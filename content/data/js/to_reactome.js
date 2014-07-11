function to_reactome(src) {
  // load expression data
  $.get(src,
    // send data to reactome

    function(data) {
      $.ajax("http://www.reactome.org/AnalysisService/identifiers/projection?pageSize=0&page=1", {
        data: data,
        processData: false,
        type: "POST",
        contentType: "application/json",
        success: function(response, status, jqXHR) {
          var token = response.summary.token;
          var url = "http://www.reactome.org/PathwayBrowser/#DTAB=AN&TOOL=AT&ANALYSIS=" + token;
          location.href = url;
        },
        error: function(jqXHR, status, errorThrown) {
          $("#loading").hide();
          $("#messages").text("Failed to push data to Reactome.");
        }
      });
    });
}

$().ready(function() {
  var split_url = document.URL.split("#");
  if (split_url[1]) {
    to_reactome(split_url[1])
  } else {
    $("#loading").hide();
    $("#messages").text("No src URL found, cannot proceed.");
  }
});
