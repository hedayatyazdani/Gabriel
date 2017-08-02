function __init__(){
  Jet.config();
  LU.config();
  Libre.menu.clearItems();
  Libre.menu.clearTools();
  Libre.menu.addItem("<li onclick=\"Libre.sidebar.visible();\"><img id=\"sidebarBtn\" src=\"res/images/svg/white-menu.svg\"/></li>");
  Libre.menu.addItem("<li onclick=\"Libre.sidebar.pin();\"><img id=\"pinBtn\" src=\"res/images/svg/white-pin.svg\"/></li>");

  Libre.menu.addTool("<li onclick=\"Libre\"><img id=\"settingsBtn\" src=\"res/images/svg/white-settings.svg\"/></li>");
  Libre.menu.addTool("<li id=\"searchPan\" onclick=\"Libre\"><input type=\"text\" placeholder=\"search...\" id=\"searchTxb\"/></li>");
  Libre.sidebar.visible(false);

  //added by Gabriel Project Manager
  Libre.menu.addItem("<li style=\"margin-left:4vw\" onclick=\"onProjectMenu();\"><img id=\"projectBtn\" src=\"res/images/svg/screen.svg\"/></li>");
  Libre.appMode=true;
  if(Libre.appMode){
    _("#loginDlg").source.style.display="block";
  }else{
    onProjectMenu();
  }
}
Libre.images={
  'normalPin':'res/images/svg/white-pin.svg',
  'setPin':'res/images/svg/pink-pin.svg',
  'normalSidebar':'res/images/svg/white-menu.svg',
  'setSidebar':'res/images/svg/pink-menu.svg'
};
