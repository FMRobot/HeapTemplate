require.config({
    paths: {
        heapController: 'heapController'
    }
});

requirejs(['heapController'],function(heapController){
  new heapController()
});