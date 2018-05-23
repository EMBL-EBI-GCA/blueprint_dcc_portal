// Injects the Data Protection notice onto sites
// For guidance on using: https://www.ebi.ac.uk/style-lab/websites/patterns/banner-data-protection.html
function ebiFrameworkCreateDataProtectionBanner() {
  var banner = document.createElement('div');
  var wrapper = document.createElement('div');
  var inner = document.createElement('div');

  // don't accidently create two banners
  if (document.getElementById("data-protection-banner") != null) {
    document.getElementById("data-protection-banner").remove();
  }

  banner.id = "data-protection-banner";
  banner.className = "data-protection-banner";
  banner.style = "position: fixed; background-color: #111; width: 100%; padding: 1.75rem; left: 0; bottom: 0; color: #eee;"
  wrapper.className = "row";
  wrapper.innerHTML = "" +
    "<div class='columns medium-8 large-9'>" +
    dataProtectionSettings.message +
    "</div>" +
    "<div class='columns medium-4 large-3 text-right white-color'><a id='data-protection-agree' class='' style='cursor: pointer'>OK</a></div>" +
    "";

  document.body.appendChild(banner);
  banner.appendChild(wrapper);

  openDataProtectionBanner();
}

function openDataProtectionBanner() {
  var height = document.getElementById('data-protection-banner').offsetHeight || 0;
  document.getElementById('data-protection-banner').style.display = 'block';
  document.body.style.paddingBottom = height+'px';

  document.getElementById('data-protection-agree').onclick = function() {
    closeDataProtectionBanner();
    return false;
  };
}

function closeDataProtectionBanner() {
  var height = document.getElementById('data-protection-banner').offsetHeight;
  document.getElementById('data-protection-banner').style.display = 'none';
  document.body.style.paddingBottom = '0';
  ebiFrameworkSetCookie(dataProtectionSettings.cookieName, 'true', 90);
}

function ebiFrameworkSetCookie(c_name, value, exdays) {
  var exdate = new Date();
  var c_value;
  exdate.setDate(exdate.getDate() + exdays);
  // c_value = escape(value) + ((exdays===null) ? "" : ";expires=" + exdate.toUTCString()) + ";domain=.ebi.ac.uk;path=/";
  // document.cookie = c_name + "=" + c_value;
  c_value = escape(value) + ((exdays===null) ? "" : ";expires=" + exdate.toUTCString()) + ";domain=" + document.domain + ";path=/";
  document.cookie = c_name + "=" + c_value;
}

function ebiFrameworkGetCookie(c_name) {
  var i, x, y, ARRcookies=document.cookie.split(";");
  for (i=0; i<ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x = x.replace(/^\s+|\s+$/g,"");
    if (x===c_name) {
      return unescape(y);
    }
  }
}

var dataProtectionSettings =  new Object();

function ebiFrameworkRunDataProtectionBanner() {
  try {
    dataProtectionSettings.message = 'This website requires cookies, and the limited processing of your personal data in order to function. By using the site you are agreeing to this as outlined in our <a target="_blank" href="https://www.ebi.ac.uk/data-protection/privacy-notice/blueprint-dcc" class="white-color">Privacy Notice</a>';
    dataProtectionSettings.serviceId = 'ebi';
    dataProtectionSettings.dataProtectionVersion = '1.0';

    // If there's a div#data-protection-message-configuration, override defaults
    var divDataProtectionBanner = document.getElementById('data-protection-message-configuration');
    if (divDataProtectionBanner !== null) {
      if (typeof divDataProtectionBanner.dataset.message !== "undefined") {
        dataProtectionSettings.message = divDataProtectionBanner.dataset.message;
      }
      if (typeof divDataProtectionBanner.dataset.serviceId !== "undefined") {
        dataProtectionSettings.serviceId = divDataProtectionBanner.dataset.serviceId;
      }
      if (typeof divDataProtectionBanner.dataset.dataProtectionVersion !== "undefined") {
        dataProtectionSettings.dataProtectionVersion = divDataProtectionBanner.dataset.dataProtectionVersion;
      }
    }

    dataProtectionSettings.cookieName = dataProtectionSettings.serviceId + "-v" + dataProtectionSettings.dataProtectionVersion + "-data-protection-accepted";

    // If this version of banner not accpeted, show it:
    if (ebiFrameworkGetCookie(dataProtectionSettings.cookieName) != "true") {
      ebiFrameworkCreateDataProtectionBanner();
    }

  } catch(err) { setTimeout(ebiFrameworkRunDataProtectionBanner, 100); }
}

function resetDataProtectionBanner() {
  document.cookie = dataProtectionSettings.cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=" + document.domain + ";path=/";
  ebiFrameworkRunDataProtectionBanner();
}

// execute
ebiFrameworkRunDataProtectionBanner();
