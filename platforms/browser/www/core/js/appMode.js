function initAppMode(){
  if(cordova)if(cordova.InAppBrowser){
    delete window.open;
    window.open=cordova.InAppBrowser.open;
  }
}
function login(){
  //http://jointab.net/?apsi=%3DYDNzgTO5ETO0EDfxwXNxwnK&auth=1&forwardUrl=http%3A%2F%2Fabrapp2.gq%2FGabriel%2F#login
  window.open("http://jointab.com/?apsi=%3DYDNzgTO5ETO0EDfxwXNxwnK&auth=1&forwardUrl="+Libre.systemUrl,"_system");
}
