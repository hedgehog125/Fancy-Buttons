import{S as b,i as y,s as C,l as A,m as v,p as x,h as u,b as m,f as i,t as f,d as g,e as h,g as k,V as w,y as B,z as F,A as M,D as N,u as S,v as q}from"../../chunks/index-ad4d38d1.js";import{F as z}from"../../chunks/FancyButton-24c9f499.js";function p(s,n,l){const e=s.slice();return e[2]=n[l],e}function $(s){let n,l,e=new Array(100),t=[];for(let o=0;o<e.length;o+=1)t[o]=d(p(s,e,o));const c=o=>f(t[o],1,1,()=>{t[o]=null});return{c(){for(let o=0;o<t.length;o+=1)t[o].c();n=h()},l(o){for(let a=0;a<t.length;a+=1)t[a].l(o);n=h()},m(o,a){for(let r=0;r<t.length;r+=1)t[r].m(o,a);m(o,n,a),l=!0},p(o,a){if(a&2){e=new Array(100);let r;for(r=0;r<e.length;r+=1){const _=p(o,e,r);t[r]?(t[r].p(_,a),i(t[r],1)):(t[r]=d(_),t[r].c(),i(t[r],1),t[r].m(n.parentNode,n))}for(k(),r=e.length;r<t.length;r+=1)c(r);g()}},i(o){if(!l){for(let a=0;a<e.length;a+=1)i(t[a]);l=!0}},o(o){t=t.filter(Boolean);for(let a=0;a<t.length;a+=1)f(t[a]);l=!1},d(o){w(t,o),o&&u(n)}}}function D(s){let n;return{c(){n=S(`Click to delete all the buttons
			`)},l(l){n=q(l,`Click to delete all the buttons
			`)},m(l,e){m(l,n,e)},d(l){l&&u(n)}}}function d(s){let n,l;return n=new z({props:{onAfterClick:s[1],$$slots:{default:[D]},$$scope:{ctx:s}}}),{c(){B(n.$$.fragment)},l(e){F(n.$$.fragment,e)},m(e,t){M(n,e,t),l=!0},p(e,t){const c={};t&32&&(c.$$scope={dirty:t,ctx:e}),n.$set(c)},i(e){l||(i(n.$$.fragment,e),l=!0)},o(e){f(n.$$.fragment,e),l=!1},d(e){N(n,e)}}}function E(s){let n,l,e=s[0]&&$(s);return{c(){n=A("main"),e&&e.c()},l(t){n=v(t,"MAIN",{});var c=x(n);e&&e.l(c),c.forEach(u)},m(t,c){m(t,n,c),e&&e.m(n,null),l=!0},p(t,[c]){t[0]?e?(e.p(t,c),c&1&&i(e,1)):(e=$(t),e.c(),i(e,1),e.m(n,null)):e&&(k(),f(e,1,1,()=>{e=null}),g())},i(t){l||(i(e),l=!0)},o(t){f(e),l=!1},d(t){t&&u(n),e&&e.d()}}}function I(s,n,l){let e=!0;return[e,c=>{l(0,e=!1),setTimeout(o=>{l(0,e=!0)},500)}]}class V extends b{constructor(n){super(),y(this,n,I,E,C,{})}}export{V as default};