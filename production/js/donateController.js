var __bind=function(a,b){return function(){return a.apply(b,arguments)}},__indexOf=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};define(["MutationObserver-polyfil"],function(){var a;return a=function(){function a(){this.keyDown=__bind(this.keyDown,this),this.setAmount=__bind(this.setAmount,this),this.registerCallback=__bind(this.registerCallback,this),this.keyUp=__bind(this.keyUp,this),this.getAmount=__bind(this.getAmount,this),this.getFromText=__bind(this.getFromText,this),this.pseudoLabel=__bind(this.pseudoLabel,this),this.insertBefore=__bind(this.insertBefore,this),this.insertAfter=__bind(this.insertAfter,this),this.appendTo=__bind(this.appendTo,this),this.demo=__bind(this.demo,this),this.toggleSource=__bind(this.toggleSource,this),this.closeForm=__bind(this.closeForm,this),this.enter=13,this.esc=27,this.dash=189,this.ctrl=17,this.cmd=91,this.shift=16,this.alt=18,this.space=32,this.r=82,this.numbers=[48,49,50,51,52,53,54,55,56,57],this.controls=[8,9,45,46,39,37,this.esc,this.ctrl,this.alt,this.shift,this.enter,this.cmd],this.controlsPressed=[],this.donate=document.getElementById("donate-template").content.cloneNode(!0),this.donateLabel=this.donate.querySelector(".label"),this.donateAmount=this.donate.querySelector(".amount_due"),this.donateSource=this.donate.querySelector(".money_source"),this.deny=this.donate.querySelector(".deny"),this.donateAmount.addEventListener("keydown",this.keyDown),this.donateAmount.addEventListener("keyup",this.savePageValue),this.donateAmount.addEventListener("focus",this.savePageValue),this.donateAmount.addEventListener("blur",this.setAmount),this.donateLabel.addEventListener("click",this.pseudoLabel),this.deny.addEventListener("click",this.closeForm),this.wallet=!0,this.card=!1,this.donateSource.addEventListener("click",this.toggleSource)}return a.prototype.closeForm=function(){return this.donate.parentNode.removeChild(this.donate)},a.prototype.toggleSource=function(){return this.donateSource.classList.toggle("wallet"),this.wallet=!this.wallet,this.card=!this.card},a.prototype.demo=function(){var a=this;return null===window.localStorage.getItem("first_time")?(window.setTimeout(function(){return a.toggleSource()},300),window.setTimeout(function(){return a.toggleSource()},1100),window.localStorage.setItem("first_time",!1)):void 0},a.prototype.appendTo=function(a){return a.appendChild(this.donate),this.donate=a.lastChild,this.demo()},a.prototype.insertAfter=function(a){return null!==a.nextSibling?(a.parentNode.insertBefore(this.donate,a.nextSibling),this.donate=a.nextSibling):this.appendTo(a.parentNode)},a.prototype.insertBefore=function(a){return a.parentNode.insertBefore(this.donate,a),this.donate=a.previousSibling},a.prototype.pseudoLabel=function(){return this.donateAmount.focus()},a.prototype.getFromText=function(a){return a=a.replace("/[^d]/ig",""),a=parseInt(a,10),(isNaN(a)||1>a)&&(a=1),a},a.prototype.getAmount=function(){return this.getFromText(this.donateAmount.innerHTML)},a.prototype.keyUp=function(a){var b;return b=this.controlsPressed.indexOf(a.which),b>-1?this.controlsPressed.splice(b,1):void 0},a.prototype.registerCallback=function(a){return this.callbackFunction=a},a.prototype.setAmount=function(){return this.controlsPressed=[],this.donateAmount.innerHTML=this.getFromText(this.donateAmount.innerHTML),"function"==typeof this.callbackFunction?this.callbackFunction.call(this):void 0},a.prototype.keyDown=function(a){var b,c,d,e,f,g,h;if(e=a.which,__indexOf.call(this.controls,e)<0&&(f=a.which,__indexOf.call(this.numbers,f)<0)&&a.which!==this.r&&a.preventDefault(),g=a.which,__indexOf.call(this.controls,g)>=0&&this.controlsPressed.indexOf(a.which)<0&&this.controlsPressed.push(a.which),h=a.which,__indexOf.call(this.numbers,h)>=0&&(this.controlsPressed.indexOf(this.shift)>-1||this.donateAmount.innerHTML.length>4))return void a.preventDefault();switch(a.which){case this.r:if(c=this.controlsPressed.indexOf(this.cmd)>-1,d=this.controlsPressed.indexOf(this.ctrl)>-1,!c&&!d)return a.preventDefault();break;case this.enter:if(a.preventDefault(),this.setAmount(),this.donateAmount.blur(),b=this.controlsPressed.indexOf(a.which),b>-1)return this.controlsPressed.splice(b,1);break;case this.esc:return a.preventDefault(),this.donateAmount.innerHTML=this.donateAmount.getAttribute("data-pages"),this.donateAmount.blur()}},a}()});