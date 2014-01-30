var __bind=function(a,b){return function(){return a.apply(b,arguments)}};define(["moment"],function(a){var b;return b=function(){function b(b,c,d,e){null==b&&(b=null),null==c&&(c=null),null==d&&(d=null),null==e&&(e="ru"),this.prevMonth=__bind(this.prevMonth,this),this.nextMonth=__bind(this.nextMonth,this),this.generateMonth=__bind(this.generateMonth,this),this.selectDay=__bind(this.selectDay,this),this.insertBefore=__bind(this.insertBefore,this),this.insertAfter=__bind(this.insertAfter,this),this.appendTo=__bind(this.appendTo,this),this.registerCallback=__bind(this.registerCallback,this),this.close=__bind(this.close,this),this.closeCalendar=__bind(this.closeCalendar,this),a.lang(e),this.moment=null===b?a():a(b,c),this.callbackFunction=d,this.calendar=document.getElementById("calendar-template").content.cloneNode(!0),this.next=this.calendar.querySelector(".next-month"),this.prev=this.calendar.querySelector(".prev-month"),this.closeButton=this.calendar.querySelector(".close"),this.next.addEventListener("click",this.nextMonth),this.prev.addEventListener("click",this.prevMonth),this.closeButton.addEventListener("click",this.closeCalendar),this.generateMonth()}return b.prototype.closeCalendar=function(){return null!==this.callbackFunction&&this.callbackFunction.call(this,null),this.calendar.parentNode.removeChild(this.calendar)},b.prototype.close=function(){return null!==this.callbackFunction&&this.callbackFunction.call(this,this.moment),this.calendar.parentNode.removeChild(this.calendar)},b.prototype.registerCallback=function(a){return this.callbackFunction=a},b.prototype.appendTo=function(a){return a.appendChild(this.calendar),this.calendar=a.lastChild},b.prototype.insertAfter=function(a){return null!==a.nextSibling?(a.parentNode.insertBefore(this.calendar,a.nextSibling),this.calendar=a.nextSibling):this.appendTo(a)},b.prototype.insertBefore=function(a){return a.parentNode.insertBefore(this.calendar,a),this.calendar=a.previousSibling},b.prototype.selectDay=function(b){var c;return c=b.currentTarget,this.moment=a(c.getAttribute("data-date"),"YYYY-MM-DD"),this.calendar.querySelector(".today").classList.remove("today"),c.classList.add("today"),this.close()},b.prototype.generateMonth=function(){var b,c,d,e,f,g;for(this.calendar.querySelector(".month").innerHTML=this.moment.format("MMMM YYYY"),c=this.calendar.querySelector(".days"),c.parentNode.removeChild(c),c=document.createElement("DIV"),c.className="days",d=this.moment.daysInMonth(),e=g=1;d>=1?d>=g:g>=d;e=d>=1?++g:--g)f=a(this.moment.format("YYYY")+"-"+this.moment.format("MM")+"-"+e,"YYYY-MM-D"),b=document.createElement("DIV"),b.className="day",b.setAttribute("data-date",f.format("YYYY-MM-DD")),b.addEventListener("click",this.selectDay),f.isSame(this.moment,"day")&&b.classList.add("today"),b.appendChild(document.createTextNode(e)),c.appendChild(b);return this.calendar.querySelector("header").parentNode.appendChild(c)},b.prototype.nextMonth=function(){return this.moment.add("months",1),this.generateMonth()},b.prototype.prevMonth=function(){return this.moment.subtract("months",1),this.generateMonth()},b}()});