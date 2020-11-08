window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-H24MW5PLZ1');

function switchToMobile(locale) {
  let localeData = false;

  try {
    localeData = JSON.parse(locale);

    var mobileAppEvent = new CustomEvent('mobileApp', {
      detail: {
        isMobileApp: true,
        localeData
      }
    });

    window.dispatchEvent(mobileAppEvent);
  } catch (error) {
    console.log(error);
  }
}

// [START log_event]
function logEvent(name, params) {
  if (!name) {
    return;
  }

  gtag('event', name, params);

  if (window.AnalyticsWebInterface) {
    // Call Android interface
    window.AnalyticsWebInterface.logEvent(name, JSON.stringify(params));
  } else if (window.webkit
      && window.webkit.messageHandlers
      && window.webkit.messageHandlers.firebase) {
    // Call iOS interface
    var message = {
      command: 'logEvent',
      name: name,
      parameters: params
    };
    window.webkit.messageHandlers.firebase.postMessage(message);
  } else {
    // No Android or iOS interface found
    console.log("No native APIs found.");
  }
}
// [END log_event]

// [START set_user_property]
function setUserProperty(name, value) {
  if (!name || !value) {
    return;
  }

  if (window.AnalyticsWebInterface) {
    // Call Android interface
    window.AnalyticsWebInterface.setUserProperty(name, value);
  } else if (window.webkit
      && window.webkit.messageHandlers
      && window.webkit.messageHandlers.firebase) {
    // Call iOS interface
    var message = {
      command: 'setUserProperty',
      name: name,
      value: value
   };
    window.webkit.messageHandlers.firebase.postMessage(message);
  } else {
    // No Android or iOS interface found
    console.log("No native APIs found.");
  }
}
// [END set_user_property]
