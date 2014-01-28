var __bind=function(a,b){return function(){return a.apply(b,arguments)}},__indexOf=[].indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(b in this&&this[b]===a)return b;return-1};define(["calendarController"],function(a){var b;return b=function(){function b(){this.hideTranslationsList=__bind(this.hideTranslationsList,this),this.showTranslationsList=__bind(this.showTranslationsList,this),this.addTranslation=__bind(this.addTranslation,this),this.hideTranslationForm=__bind(this.hideTranslationForm,this),this.changeTranslationURL=__bind(this.changeTranslationURL,this),this.showTranslationForm=__bind(this.showTranslationForm,this),this.confirmRemoveConfirmation=__bind(this.confirmRemoveConfirmation,this),this.denyRemoveConfirmation=__bind(this.denyRemoveConfirmation,this),this.showRemoveConfirmation=__bind(this.showRemoveConfirmation,this),this.denyLogin=__bind(this.denyLogin,this),this.showLoginPopup=__bind(this.showLoginPopup,this),this.closeEditArticleForm=__bind(this.closeEditArticleForm,this),this.resetEditArticleForm=__bind(this.resetEditArticleForm,this),this.saveEditArticleForm=__bind(this.saveEditArticleForm,this),this.changeEditArticleForm=__bind(this.changeEditArticleForm,this),this.showEditArticleForm=__bind(this.showEditArticleForm,this),this.openCalendar=__bind(this.openCalendar,this),this.toggleTranslationArticleForm=__bind(this.toggleTranslationArticleForm,this),this.toggleFilter=__bind(this.toggleFilter,this),this.clearFilter=__bind(this.clearFilter,this),this.filterBy=__bind(this.filterBy,this),this.showAddArticleForm=__bind(this.showAddArticleForm,this);var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D;if(__indexOf.call(document.createElement("template"),"content")<0)for(D=document.querySelectorAll("template"),l=0,p=D.length;p>l;l++)j=D[l],j.content=j.childNodes[0];for(this.lang="ru",i=document.querySelectorAll(".show-list"),f=document.querySelectorAll(".hide-list"),g=document.querySelectorAll(".likes.disabled"),a=document.querySelectorAll(".add"),h=document.querySelectorAll(".remove"),c=document.querySelectorAll(".edit"),k=document.querySelectorAll(".translate"),this.addArticleForm=document.querySelector(".add-article-form"),this.addArticleFormInput=this.addArticleForm.querySelector("input"),this.addArticleButton=document.getElementById("add-article-button"),this.iWantToTranslateTemplate=document.querySelector("#i-want-to-translate"),this.iDontWantToTranslateTemplate=document.querySelector("#i-dont-want-to-translate"),this.addTranslationFormTemplate=document.querySelector("#add-translation-form"),this.confirmArticleRemoveTemplate=document.querySelector("#confirm-article-remove"),this.loginPopupTemplate=document.querySelector("#login-popup"),this.editArticleTemplate=document.querySelector("#edit-article-form"),this.articleList=document.querySelector(".article-list"),m=0,q=k.length;q>m;m++)b=k[m],b.addEventListener("click",this.toggleTranslationArticleForm);for(n=0,r=c.length;r>n;n++)b=c[n],b.addEventListener("click",this.showEditArticleForm);for(o=0,s=i.length;s>o;o++)b=i[o],b.addEventListener("click",this.showTranslationsList);for(y=0,t=f.length;t>y;y++)b=f[y],b.addEventListener("click",this.hideTranslationsList);for(z=0,u=a.length;u>z;z++)b=a[z],b.addEventListener("click",this.showTranslationForm);for(A=0,v=h.length;v>A;A++)b=h[A],b.addEventListener("click",this.showRemoveConfirmation);for(B=0,w=g.length;w>B;B++)b=g[B],b.addEventListener("click",this.showLoginPopup);for(this.addArticleFormInput.addEventListener("keyup",this.changeTranslationURL),this.addArticleButton.addEventListener("click",this.showAddArticleForm),this.filterButton=document.querySelector(".filter"),this.filterButton.addEventListener("click",this.toggleFilter),this.filterList=document.querySelector(".tag-list "),this.filterList.querySelector(".clear").addEventListener("click",this.clearFilter),e=this.filterList.querySelectorAll("a"),C=0,x=e.length;x>C;C++)d=e[C],d.addEventListener("click",this.filterBy)}return b.prototype.showAddArticleForm=function(a){var b;return a.preventDefault(),b=a.currentTarget,b.classList.add("open"),this.addArticleForm.classList.add("open"),this.addArticleFormInput.focus()},b.prototype.filterBy=function(a){var b;return a.preventDefault(),b=a.currentTarget,b.classList.toggle("selected")},b.prototype.clearFilter=function(a){var b,c,d,e,f;for(a.preventDefault(),b=this.filterList.querySelectorAll(".selected"),f=[],d=0,e=b.length;e>d;d++)c=b[d],f.push(c.classList.remove("selected"));return f},b.prototype.toggleFilter=function(a){return a.preventDefault(),this.filterButton.classList.toggle("selected"),this.filterList.classList.toggle("open")},b.prototype.toggleTranslationArticleForm=function(a){var b,c,d;return a.preventDefault(),b=a.currentTarget,d=b.parentNode,b.classList.contains("my")?(c=this.iWantToTranslateTemplate.content.cloneNode(!0),console.log("больше не переводишь")):(c=this.iDontWantToTranslateTemplate.content.cloneNode(!0),console.log("перевод за тобой")),d.insertBefore(c,b),d.removeChild(b),d.querySelector(".translate").addEventListener("click",this.toggleTranslationArticleForm)},b.prototype.openCalendar=function(b){var c,d,e;for(e=b.currentTarget;"FORM"!==e.tagName;)e=e.parentNode;return d=e.querySelector("[name='date']").value.trim(),0===d.length&&(d=null),c=new a(d,"DD MMMM YYYY",function(a){var b;return b=a.format("DD MMMM YYYY"),e.querySelector("[name='date']").value!==b&&e.classList.add("changed"),e.querySelector("[name='date']").value=b,e.style.display="block"},this.lang),e.style.display="none",c.insertAfter(e)},b.prototype.showEditArticleForm=function(a){var b,c,d,e,f,g,h;for(a.preventDefault(),c=a.currentTarget,b=c.parentNode.parentNode,d=this.editArticleTemplate.content.cloneNode(!0),d.querySelector("button.close").addEventListener("click",this.closeEditArticleForm),d.querySelector("button.reset").addEventListener("click",this.resetEditArticleForm),d.querySelector(".open-calendar").addEventListener("click",this.openCalendar),this.resetEditArticleForm(null,d,b),h=d.querySelectorAll("input"),f=0,g=h.length;g>f;f++)e=h[f],e.addEventListener("change",this.changeEditArticleForm);return b.style.display="none",null===b.nextSibling?b.parentNode.appendChild(d):b.parentNode.insertBefore(d,b.nextSibling),b.nextSibling.addEventListener("submit",this.saveEditArticleForm)},b.prototype.changeEditArticleForm=function(a){var b;for(b=a.currentTarget;"FORM"!==b.tagName;)b=b.parentNode;return b.classList.add("changed")},b.prototype.saveEditArticleForm=function(a){var b,c,d,e,f,g,h,i,j,k;if(a.preventDefault(),c=a.currentTarget,!c.classList.contains("changed"))return void console.log("ничего не изменилось");for(console.log("отправляем данные на сервер"),b=c.previousSibling,b.querySelector(".title a").innerHTML=c.querySelector("[name='title']").value,b.querySelector(".title a").setAttribute("href",c.querySelector("[name='url']").value),b.querySelector(".domain a").innerHTML=c.querySelector("[name='domain']").value,b.querySelector("time").innerHTML=c.querySelector("[name='date']").value,b.querySelector("time").setAttribute("datetime",moment(c.querySelector("[name='date']").value,"DD MMMM YYYY").format("YYYY-MM-DD")),b.querySelector(".language a").innerHTML=c.querySelector("[name='language']").value,b.querySelector(".author").innerHTML=c.querySelector("[name='author']").value,f=document.createElement("MENU"),f.className="tags",h=c.querySelector("[name='tags']").value.split(","),d=!1,j=0,k=h.length;k>j;j++)g=h[j],d===!0&&f.appendChild(document.createTextNode(", ")),e=document.createElement("A"),e.setAttribute("href","/search/tags/"+g.trim()),e.appendChild(document.createTextNode(g.trim())),f.appendChild(e),d=!0;return i=b.querySelector(".tags"),i.parentNode.insertBefore(f,i),i.parentNode.removeChild(i),c.parentNode.removeChild(c),b.style.display="block"},b.prototype.resetEditArticleForm=function(a,b,c){var d,e,f,g,h,i;if(null!==a){for(a.preventDefault(),b=a.currentTarget;"FORM"!==b.tagName;)b=b.parentNode;c=b.previousSibling,b.classList.remove("changed")}for(b.querySelector("[name='title']").value=c.querySelector(".title a").innerHTML,b.querySelector("[name='url']").value=c.querySelector(".title a").getAttribute("href"),b.querySelector("[name='domain']").value=c.querySelector(".domain").innerHTML,b.querySelector("[name='date']").value=c.querySelector("time").innerHTML,b.querySelector("[name='language']").value=c.querySelector(".language").innerHTML,d=c.querySelector(".author"),null!==d&&(b.querySelector("[name='author']").value=d.innerHTML),g=c.querySelectorAll(".tags a"),e=[],h=0,i=g.length;i>h;h++)f=g[h],e.push(f.innerHTML);return b.querySelector("[name='tags']").value=e.join(", ")},b.prototype.closeEditArticleForm=function(a){var b,c,d;return a.preventDefault(),c=a.currentTarget,d=c.parentNode.parentNode,b=d.previousSibling,d.parentNode.removeChild(d),b.style.display="block"},b.prototype.showLoginPopup=function(a){var b,c,d;return a.preventDefault(),c=a.currentTarget,b=c.parentNode.parentNode,b.appendChild(this.loginPopupTemplate.content.cloneNode(!0)),d=b.querySelector(".login-popup"),d.querySelector(".deny").addEventListener("click",this.denyLogin)},b.prototype.denyLogin=function(a){var b,c,d;return a.preventDefault(),c=a.currentTarget,d=c.parentNode.parentNode,b=d.parentNode,b.removeChild(d)},b.prototype.showRemoveConfirmation=function(a){var b,c,d;return a.preventDefault(),b=a.currentTarget,d=b.parentNode.parentNode,d.appendChild(this.confirmArticleRemoveTemplate.content.cloneNode(!0)),c=d.querySelector(".confirm-article-remove"),c.querySelector(".confirm").addEventListener("click",this.confirmRemoveConfirmation),c.querySelector(".deny").addEventListener("click",this.denyRemoveConfirmation)},b.prototype.denyRemoveConfirmation=function(a){var b,c,d;return a.preventDefault(),c=a.currentTarget,d=c.parentNode.parentNode,b=d.parentNode,b.removeChild(d)},b.prototype.confirmRemoveConfirmation=function(a){var b,c,d;return a.preventDefault(),c=a.currentTarget,d=c.parentNode.parentNode,b=d.parentNode,b.removeChild(d),b.parentNode.removeChild(b)},b.prototype.showTranslationForm=function(a){var b,c,d,e;return a.preventDefault(),b=a.currentTarget,b.style.display="none",d=b.parentNode.parentNode,d.appendChild(this.addTranslationFormTemplate.content.cloneNode(!0)),c=d.querySelector(".add-translation-form"),c.addEventListener("submit",this.addTranslation),e=c.querySelector("input"),e.addEventListener("keyup",this.changeTranslationURL),e.focus(),c.querySelector("button[type='reset']").addEventListener("click",this.hideTranslationForm)},b.prototype.changeTranslationURL=function(a){var b;return b=a.currentTarget,b.value.trim().length>0?b.classList.add("non-empty"):b.classList.remove("non-empty")},b.prototype.hideTranslationForm=function(a){var b,c,d;return a.preventDefault(),c=a.currentTarget,d=c.parentNode.parentNode,b=d.parentNode,b.removeChild(d),b.querySelector(".add").style.display="inline"},b.prototype.addTranslation=function(a){return a.preventDefault()},b.prototype.showTranslationsList=function(a){var b,c,d;return a.preventDefault(),c=a.currentTarget,b=c.parentNode.parentNode,d=b.querySelector(".translations"),d.style.display="block",b.querySelector(".hide-list").style.display="inline",c.style.display="none"},b.prototype.hideTranslationsList=function(a){var b,c,d;return a.preventDefault(),c=a.currentTarget,b=c.parentNode.parentNode,d=b.querySelector(".translations"),d.style.display="none",c.style.display="none",b.querySelector(".show-list").style.display="inline"},b}()});