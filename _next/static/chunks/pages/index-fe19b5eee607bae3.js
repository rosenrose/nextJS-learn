(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8581:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(3678)}])},819:function(e,n,t){"use strict";t.d(n,{Z:function(){return r}});var s=t(5893),a=t(9008);function r(e){var n=e.title;return(0,s.jsx)(a.default,{children:(0,s.jsxs)("title",{children:[n," | Next Movies"]})})}},3678:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return p}});var s=t(4051),a=t.n(s),r=t(5893),i=t(5988),c=t.n(i),o=t(7294),u=t(1664),d=t(1163),l=t(819);function x(e,n,t,s,a,r,i){try{var c=e[r](i),o=c.value}catch(u){return void t(u)}c.done?n(o):Promise.resolve(o).then(s,a)}function p(e){e.data;var n=(0,o.useState)(),t=n[0],s=n[1];(0,o.useEffect)((function(){var e;(e=a().mark((function e(){var n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://www.googleapis.com/youtube/v3/playlistItems?key=".concat("AIzaSyDjjx-wgYbQK-hua00Wk9C1nCiiMSS8VDI","&playlistId=").concat("UUyWiQldYO_-yeLJC0j5oq2g","&part=snippet,contentDetails&maxResults=20"));case 2:return e.next=4,e.sent.json();case 4:n=e.sent,s(n.items);case 6:case"end":return e.stop()}}),e)})),function(){var n=this,t=arguments;return new Promise((function(s,a){var r=e.apply(n,t);function i(e){x(r,s,a,i,c,"next",e)}function c(e){x(r,s,a,i,c,"throw",e)}i(void 0)}))})()}),[]);var i=(0,d.useRouter)();return(0,r.jsxs)("div",{className:"jsx-412dabee16831c19 container",children:[(0,r.jsx)(l.Z,{title:"home"}),t?null===t||void 0===t?void 0:t.map((function(e){var n=e.contentDetails.videoId,t=e.snippet.title.replace(/\[DJMax Respect V\] | \(M\/V 4K 60FPS\)/g,""),s="/movies/".concat(encodeURIComponent(t),"/").concat(n);return(0,r.jsxs)("div",{onClick:function(){return function(e,n){i.push("/movies/".concat(encodeURIComponent(n),"/").concat(e))}(n,t)},className:"jsx-412dabee16831c19 movie",children:[(0,r.jsx)("img",{src:e.snippet.thumbnails[Object.keys(e.snippet.thumbnails).at(-1)].url,alt:n,className:"jsx-412dabee16831c19"}),(0,r.jsx)("h4",{className:"jsx-412dabee16831c19",children:(0,r.jsx)(u.default,{href:s,as:s,children:(0,r.jsx)("a",{className:"jsx-412dabee16831c19",children:t})})})]},n)})):(0,r.jsx)("h1",{className:"jsx-412dabee16831c19",children:"\ub85c\ub529..."}),(0,r.jsx)(c(),{id:"412dabee16831c19",children:".container.jsx-412dabee16831c19{display:grid;\ngrid-template-columns:1fr 1fr;\npadding:20px;\ngap:20px}\n.movie.jsx-412dabee16831c19{cursor:pointer}\n.movie.jsx-412dabee16831c19 img.jsx-412dabee16831c19{max-width:100%;\nborder-radius:12px;\n-webkit-transition:-webkit-transform 0.2s ease-in-out;\ntransition:transform 0.2s ease-in-out;\nbox-shadow:rgba(0, 0, 0, 0.1) 0px 4px 12px}\n.movie.jsx-412dabee16831c19:hover img.jsx-412dabee16831c19{-webkit-transform:scale(1.05) translateY(-10px);\n-moz-transform:scale(1.05) translateY(-10px);\n-ms-transform:scale(1.05) translateY(-10px);\ntransform:scale(1.05) translateY(-10px)}\n.movie.jsx-412dabee16831c19 h4.jsx-412dabee16831c19{font-size:18px;\ntext-align:center}"})]})}},9008:function(e,n,t){e.exports=t(5443)}},function(e){e.O(0,[774,888,179],(function(){return n=8581,e(e.s=n);var n}));var n=e.O();_N_E=n}]);