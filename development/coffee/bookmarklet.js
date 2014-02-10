(function sendToHeap() {
  var user = 'Anonymous',
      scr = document.createElement('SCR' + 'IPT'),
      scrn = document.createElement('DIV'),
      message = document.createElement('DIV'),
      style = document.createElement('STY'+'LE'),
      body = document.body,
      location = document.location;
  style.innerHTML = '\
  @-webkit-keyframes pulse {\
    50% {-webkit-transform: scale(1.4);\
        transform: scale(1.4);\
      }}\
  @-moz-keyframes pulse {\
    50% {\
        -moz-transform: scale(1.4);\
        transform: scale(1.4);\
      }}\
  @-ms-keyframes pulse {\
    50% {\
      -ms-transform: scale(1.4);\
        transform: scale(1.4);\
      }}\
  @keyframes pulse {\
    50% {\
        -webkit-transform: scale(1.4);\
        -moz-transform: scale(1.4);\
        -ms-transform: scale(1.4);\
        transform: scale(1.4);\
      }}\
      ';
  style.setAttribute('id','heapScreenStyle');
  scrn.setAttribute('style','\
    position: fixed;\
    top: 0;\
    left: 0;\
    right: 0;\
    bottom: 0;\
    margin: 0;\
    background-color: rgba(255,255,255,.95);\
    opacity: 0;\
    -webkit-transition: opacity .5s;\
    -moz-transition: opacity .5s;\
    transition: opacity .5s;\
    z-index: 32000;\
    overflow:hidden;\
    ');
  scrn.setAttribute('id','heapScreen');
  message.setAttribute('style','\
    position: fixed;\
    top: 0;\
    left: 0;\
    right: 0;\
    bottom: 0;\
    margin: auto;\
    height: 24px;\
    width: 24px;\
    border-radius:100%;\
    background-color: #000;\
    -webkit-animation: pulse .8s infinite;\
    -moz-animation: pulse .8s infinite;\
    -ms-animation: pulse .8s infinite;\
    animation: pulse .8s infinite;\
    -webkit-transform: scale(1);\
    transform: scale(1);\
    ');
  scrn.appendChild(message);
  try {
    if (!body) throw (0);
    scr.setAttribute('src', location.protocol + '//heap.frontender.info/add/?user='+user+'&+url=' + encodeURIComponent(location.href));
    body.appendChild(scr);
    body.appendChild(scrn);
    body.appendChild(style);
    window.setTimeout(function(){
      document.getElementById('heapScreen').style.opacity="1";
    },0);
    heapScreen.setAttribute('timer',
    window.setTimeout(function(){
      document.getElementById('heapScreen').style.opacity="0";
      window.setTimeout(function(){
        body.removeChild(scrn);
        body.removeChild(style);
      },600);
    },10000));
  } catch (exception) {
    alert('Пожалуйста подождите полной загрузки страницы.');
  }
})();
void(0)