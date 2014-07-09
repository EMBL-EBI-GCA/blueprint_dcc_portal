function to_reactome(event) {
  target = $(event.target);
  event.preventDefault();
  
  target.addClass("to_reactome_started");
  target.removeClass("to_reactome");

  target.after("<img class='to_reactome_spinner' src='/img/ajax-loader.gif' /> ")
  
  // load expression data
  $.get(target.attr("href"),
    // send data to reactome
    function(data) {
      $.ajax("http://www.reactome.org/AnalysisService/identifiers/projection",{
        data: data,
        processData: false,
        type: "POST",
        contentType: "application/json",
        success: function(response,status,jqXHR) {
          var token = response.summary.token;
          var url = "http://www.reactome.org/PathwayBrowser/#DTAB=AN&TOOL=AT&ANALYSIS=" + token;
          target.attr("href", url);
          target.attr("target","_blank");
          target.addClass("to_reactome_done");
          target.text("View in Reactome");
          target.click();
        },
        error: function(jqXHR,status,errorThrown){
          target.addClass("to_reactome_failed");
          target.text("Failed to push data to Reactome");
          target.removeAttr("href");
        },
        complete: function(jqXHR, status) {
          target.siblings(".to_reactome_spinner").remove();
          target.removeClass("to_reactome_started");
        }
      });
    });
}

$(document).ready(function(){$("body").delegate("a.to_reactome","click",to_reactome)});