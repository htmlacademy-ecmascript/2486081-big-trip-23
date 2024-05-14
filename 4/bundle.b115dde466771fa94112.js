(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",l="month",u="quarter",c="year",d="date",p="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},_={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,a=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:c,w:o,d:a,D:d,h:r,m:s,s:i,ms:n,Q:u}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",$={};$[y]=v;var g=function(t){return t instanceof w},b=function t(e,n,i){var s;if(!e)return y;if("string"==typeof e){var r=e.toLowerCase();$[r]&&(s=r),n&&($[r]=n,s=r);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var o=e.name;$[o]=e,s=o}return!i&&s&&(y=s),s||!i&&y},M=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new w(n)},D=_;D.l=b,D.i=g,D.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var w=function(){function v(t){this.$L=b(t.locale,null,!0),this.parse(t)}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(f);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return D},m.isValid=function(){return!(this.$d.toString()===p)},m.isSame=function(t,e){var n=M(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return M(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<M(t)},m.$g=function(t,e,n){return D.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,u=!!D.u(e)||e,p=D.p(t),f=function(t,e){var i=D.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return u?i:i.endOf(a)},h=function(t,e){return D.w(n.toDate()[t].apply(n.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(p){case c:return u?f(1,0):f(31,11);case l:return u?f(1,m):f(0,m+1);case o:var $=this.$locale().weekStart||0,g=(v<$?v+7:v)-$;return f(u?_-g:_+(6-g),m);case a:case d:return h(y+"Hours",0);case r:return h(y+"Minutes",1);case s:return h(y+"Seconds",2);case i:return h(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var o,u=D.p(t),p="set"+(this.$u?"UTC":""),f=(o={},o[a]=p+"Date",o[d]=p+"Date",o[l]=p+"Month",o[c]=p+"FullYear",o[r]=p+"Hours",o[s]=p+"Minutes",o[i]=p+"Seconds",o[n]=p+"Milliseconds",o)[u],h=u===a?this.$D+(e-this.$W):e;if(u===l||u===c){var v=this.clone().set(d,1);v.$d[f](h),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else f&&this.$d[f](h);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[D.p(t)]()},m.add=function(n,u){var d,p=this;n=Number(n);var f=D.p(u),h=function(t){var e=M(p);return D.w(e.date(e.date()+Math.round(t*n)),p)};if(f===l)return this.set(l,this.$M+n);if(f===c)return this.set(c,this.$y+n);if(f===a)return h(1);if(f===o)return h(7);var v=(d={},d[s]=t,d[r]=e,d[i]=1e3,d)[f]||1,m=this.$d.getTime()+n*v;return D.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=D.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,u=n.months,c=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},d=function(t){return D.s(r%12||12,t,"0")},f=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:D.s(o+1,2,"0"),MMM:c(n.monthsShort,o,u,3),MMMM:c(u,o),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(n.weekdaysMin,this.$W,l,2),ddd:c(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:D.s(r,2,"0"),h:d(1),hh:d(2),a:f(r,a,!0),A:f(r,a,!1),m:String(a),mm:D.s(a,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:s};return i.replace(h,(function(t,e){return e||v[t]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,p){var f,h=D.p(d),v=M(n),m=(v.utcOffset()-this.utcOffset())*t,_=this-v,y=D.m(this,v);return y=(f={},f[c]=y/12,f[l]=y,f[u]=y/3,f[o]=(_-m)/6048e5,f[a]=(_-m)/864e5,f[r]=_/e,f[s]=_/t,f[i]=_/1e3,f)[h]||_,p?y:D.a(y)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return $[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=b(t,e,!0);return i&&(n.$L=i),n},m.clone=function(){return D.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),S=w.prototype;return M.prototype=S,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",l],["$y",c],["$D",d]].forEach((function(t){S[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,w,M),t.$i=!0),M},M.locale=b,M.isDayjs=g,M.unix=function(t){return M(1e3*t)},M.en=$[y],M.Ls=$,M.p={},M}()}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";function t(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function e(t,e,n="beforeend"){e.insertAdjacentElement(n,t.getElement())}class i{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n      <div class="trip-filters__filter">\n        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n        <label class="trip-filters__filter-label" for="filter-future">Future</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n        <label class="trip-filters__filter-label" for="filter-present">Present</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n        <label class="trip-filters__filter-label" for="filter-past">Past</label>\n      </div>\n\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class s{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n       <div class="trip-sort__item  trip-sort__item--day">\n         <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n         <label class="trip-sort__btn" for="sort-day">Day</label>\n       </div>\n\n       <div class="trip-sort__item  trip-sort__item--event">\n         <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n         <label class="trip-sort__btn" for="sort-event">Event</label>\n       </div>\n\n       <div class="trip-sort__item  trip-sort__item--time">\n         <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n         <label class="trip-sort__btn" for="sort-time">Time</label>\n       </div>\n\n       <div class="trip-sort__item  trip-sort__item--price">\n         <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n         <label class="trip-sort__btn" for="sort-price">Price</label>\n       </div>\n\n       <div class="trip-sort__item  trip-sort__item--offer">\n         <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n         <label class="trip-sort__btn" for="sort-offer">Offers</label>\n       </div>\n       </form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class r{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const a=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],o=["Amsterdam","Geneva","Chamonix"],l=["Add luggage","Switch to comfort","Add meal","Choose seats","Travel by train","Order Uber","Add breakfast"],u=["Lorem ipsum dolor sit amet, consectetur adipiscing elit.","Cras aliquet varius magna, non porta ligula feugiat eget.","Fusce tristique felis at fermentum pharetra.","Aliquam id orci ut lectus varius viverra.","Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.","Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.","Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.","Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.","Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus."];var c=n(484),d=n.n(c);function p(t){return t[Math.floor(Math.random()*t.length)]}function f(t,e){return d()(t).format(e)}class h{constructor(t,e,n){this.points=t,this.offers=e,this.destinations=n}getTemplate(){return function(t,e,n){const{type:i,basePrice:s,dateFrom:r,dateTo:l}=t,u=n.find((e=>e.id===t.destination)),c=f(r,"YY/MM/DD HH:mm"),d=f(l,"YY/MM/DD HH:mm");return`<li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n        <div class="event__type-wrapper">\n          <label class="event__type  event__type-btn" for="event-type-toggle-1">\n            <span class="visually-hidden">Choose event type</span>\n            <img class="event__type-icon" width="17" height="17" src="img/icons/${i}.png" alt="Event type icon">\n          </label>\n          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n          <div class="event__type-list">\n            <fieldset class="event__type-group">\n              <legend class="visually-hidden">Event type</legend>\n              ${a.map((t=>`<div class="event__type-item">\n                <input id="event-type-${t}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}" ${t===i?"checked":" "}>\n                <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-1">${t}</label>\n              </div>`)).join(" ")}\n            </fieldset>\n          </div>\n        </div>\n\n        <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-1">\n            ${i}\n          </label>\n          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${u.name}" list="destination-list-1">\n          <datalist id="destination-list-1">\n          ${o.map((t=>`\n          <option value="${t}"></option>\n          `)).join(" ")}\n          </datalist>\n        </div>\n\n        <div class="event__field-group  event__field-group--time">\n          <label class="visually-hidden" for="event-start-time-1">From</label>\n          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${c}">\n          &mdash;\n          <label class="visually-hidden" for="event-end-time-1">To</label>\n          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${d}">\n        </div>\n\n        <div class="event__field-group  event__field-group--price">\n          <label class="event__label" for="event-price-1">\n            <span class="visually-hidden">Price</span>\n            &euro;\n          </label>\n          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${s}">\n        </div>\n\n        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n        <button class="event__reset-btn" type="reset">Delete</button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </header>\n      <section class="event__details">\n        <section class="event__section  event__section--offers">\n          <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n          <div class="event__available-offers">\n          ${e.slice(Math.floor(7*Math.random())).map((({offers:t})=>t.map((({title:t,price:e})=>`\n            <div class="event__offer-selector">\n              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${e>160?"checked":""}>\n              <label class="event__offer-label" for="event-offer-luggage-1">\n                <span class="event__offer-title">${t}</span>\n                &plus;&euro;&nbsp;\n                <span class="event__offer-price">${e}</span>\n              </label>\n            </div>\n          `)))).join("")}\n          </div>\n        </section>\n\n        <section class="event__section  event__section--destination">\n          <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n          <p class="event__destination-description">${n.map((({description:t})=>t)).join(" ")}</p>\n        </section>\n      </section>\n      </form>\n      </li>`}(this.points,this.offers,this.destinations)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class v{constructor(t,e,n){this.point=t,this.offers=e,this.destinations=n}getTemplate(){return function(t,e,n){const{type:i,isFavorite:s,basePrice:r,dateFrom:a,dateTo:o}=t,l=n.find((e=>e.id===t.destination)),u=f(a,"D MMM"),c=f(a,"YYYY-MM-DD"),p=f(a,"HH:mm"),h=f(o,"HH:mm"),v=function(t,e){const n=d()(t).diff(d()(e),"hours",!0),i=Math.floor(n),s=Math.floor(60*(n-i));return 0===i?`${s}M`:`${i}H ${s}M`}(o,a);return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="${c}">${u}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${i.toLowerCase()}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${i} ${l.name}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="${a}">${p}</time>\n            &mdash;\n            <time class="event__end-time" datetime="${o}">${h}</time>\n          </p>\n          <p class="event__duration">${v}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${r}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n        ${e.map((({offers:t})=>t.slice(Math.floor(5*Math.random())).map((({title:t,price:e})=>`\n          <li class="event__offer">\n            <span class="event__offer-title">${t}</span>\n            &plus;&euro;&nbsp;\n            <span class="event__offer-price">${e}</span>\n          </li>`)))).join("")}\n        </ul>\n        <button class="event__favorite-btn${s?" event__favorite-btn--active":""}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`}(this.point,this.offers,this.destinations)}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const m=[{id:"1",basePrice:Math.floor(200*Math.random()),dateFrom:"2019-03-19T14:00",dateTo:"2019-03-19T14:30",destination:"1",isFavorite:!0,offers:["1"],type:p(a)},{id:"2",basePrice:Math.floor(200*Math.random()),dateFrom:"2019-03-11T12:30",dateTo:"2019-03-11T19:30",destination:"2",isFavorite:!0,offers:["2"],type:p(a)},{id:"3",basePrice:Math.floor(200*Math.random()),dateFrom:"2019-03-10T10:00",dateTo:"2019-03-10T21:30",destination:"3",isFavorite:!1,offers:["3"],type:p(a)}],_=[{type:p(a),offers:[{id:"1",title:p(l),price:Math.floor(200*Math.random())}]},{type:p(a),offers:[{id:"2",title:p(l),price:Math.floor(200*Math.random())}]},{type:p(a),offers:[{id:"3",title:p(l),price:Math.floor(200*Math.random())}]},{type:p(a),offers:[{id:"4",title:p(l),price:Math.floor(200*Math.random())}]},{type:p(a),offers:[{id:"5",title:p(l),price:Math.floor(200*Math.random())}]},{type:p(a),offers:[{id:"6",title:p(l),price:Math.floor(200*Math.random())}]},{type:p(a),offers:[{id:"7",title:p(l),price:Math.floor(200*Math.random())}]}],y=[{id:"1",description:p(u),name:p(o),pictures:[{src:"https://loremflickr.com/248/152?random=11",description:"description photo11"}]},{id:"2",description:p(u),name:p(o),pictures:[{src:"https://loremflickr.com/248/152?random=22",description:"description photo22"}]},{id:"3",description:p(u),name:p(o),pictures:[{src:"https://loremflickr.com/248/152?random=33",description:"description photo33"}]},{id:"4",description:p(u),name:p(o),pictures:[{src:"https://loremflickr.com/248/152?random=29",description:"description photo29"}]}],$=document.querySelector(".trip-controls__filters"),g=document.querySelector(".trip-events"),b=new class{constructor(){this.points=m,this.offers=_,this.destinations=y}getPoints(){return this.points}getOffers(){return this.offers}getDestinations(){return this.destinations}},M=new class{constructor({filterContainer:t}){this.filterContainer=t}init(){e(new i,this.filterContainer)}}({filterContainer:$}),D=new class{listEventComponent=new r;constructor({listContainer:t,pointsModel:e}){this.listContainer=t,this.pointsModel=e}init(){const t=[...this.pointsModel.getPoints()],n=[...this.pointsModel.getOffers()],i=[...this.pointsModel.getDestinations()];e(new s,this.listContainer),e(this.listEventComponent,this.listContainer),e(new h(t[Math.floor(3*Math.random())],n,i),this.listEventComponent.getElement()),t.forEach((t=>{e(new v(t,n,i),this.listEventComponent.getElement())}))}}({listContainer:g,pointsModel:b});M.init(),D.init()})()})();
//# sourceMappingURL=bundle.b115dde466771fa94112.js.map