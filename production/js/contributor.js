requirejs(['domReady','contributorController'],function(domReady, contributorController){
 
  domReady(function () {
  	new contributorController();
  });

});