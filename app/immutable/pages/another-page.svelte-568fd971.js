import{S as k,i as y,s as I,l as g,m as p,p as v,h as f,r as _,q as R,b as d,n as E,f as u,g as P,t as m,d as S,G as V,H as q,I as Y,J as j,L as z,M as G,N as H,y as w,a as J,z as A,c as K,A as C,K as O,D as M,u as F,v as Q}from"../chunks/index-ad4d38d1.js";import{b as T,l as W,g as X}from"../chunks/LinkPage-e1ad2dce.js";import"../chunks/singletons-0c0466c6.js";function Z(o){let e;return{c(){e=g("div"),this.h()},l(n){e=p(n,"DIV",{style:!0,class:!0}),v(e).forEach(f),this.h()},h(){_(e,"--color",o[0]),R(e,"class","svelte-pvffjk")},m(n,t){d(n,e,t)},p(n,[t]){t&1&&_(e,"--color",n[0])},i:E,o:E,d(n){n&&f(e)}}}function x(o,e,n){let{color:t}=e;return o.$$set=a=>{"color"in a&&n(0,t=a.color)},[t]}class ee extends k{constructor(e){super(),y(this,e,x,Z,I,{color:0})}}function N(o){let e,n,t,a;const r=o[6].default,s=V(r,o,o[5],null);return{c(){e=g("div"),s&&s.c(),this.h()},l(l){e=p(l,"DIV",{class:!0,style:!0});var c=v(e);s&&s.l(c),c.forEach(f),this.h()},h(){R(e,"class","main svelte-nclmae"),_(e,"--color",o[0]),_(e,"--PI",Math.PI)},m(l,c){d(l,e,c),s&&s.m(e,null),a=!0},p(l,c){s&&s.p&&(!a||c&32)&&q(s,r,l,l[5],a?j(r,l[5],c,null):Y(l[5]),null),(!a||c&1)&&_(e,"--color",l[0])},i(l){a||(u(s,l),z(()=>{t&&t.end(1),n=G(e,o[2],{}),n.start()}),a=!0)},o(l){m(s,l),n&&n.invalidate(),t=H(e,o[3],{}),a=!1},d(l){l&&f(e),s&&s.d(l),l&&t&&t.end()}}}function te(o){let e,n,t=!o[1]&&N(o);return{c(){e=g("div"),t&&t.c(),this.h()},l(a){e=p(a,"DIV",{class:!0});var r=v(e);t&&t.l(r),r.forEach(f),this.h()},h(){R(e,"class","outer svelte-nclmae")},m(a,r){d(a,e,r),t&&t.m(e,null),n=!0},p(a,[r]){a[1]?t&&(P(),m(t,1,1,()=>{t=null}),S()):t?(t.p(a,r),r&2&&u(t,1)):(t=N(a),t.c(),u(t,1),t.m(e,null))},i(a){n||(u(t),n=!0)},o(a){m(t),n=!1},d(a){a&&f(e),t&&t.d()}}}function ne(o,e,n){let{$$slots:t={},$$scope:a}=e,{color:r="white"}=e,{backURL:s}=e;const l=(i,h)=>L(i,h,!0),c=(i,h)=>L(i,h,!1),L=(i,h,U)=>{let B=[{transform:"translateY(calc(100% + var(--margin)))"},{transform:"translateY(0)"}];U||B.reverse();const D=i.animate(B,{duration:500,easing:"ease-in-out",fill:"forwards"});return D.commitStyles(),D.onfinish=oe=>{!U&&b&&X(b)},{duration:500}};let $=!1,b;return T(i=>{i.to!=null&&i.to.pathname==W(s)&&($||(b=i.to.href,i.cancel(),n(1,$=!0)))}),o.$$set=i=>{"color"in i&&n(0,r=i.color),"backURL"in i&&n(4,s=i.backURL),"$$scope"in i&&n(5,a=i.$$scope)},[r,$,l,c,s,a,t]}class ae extends k{constructor(e){super(),y(this,e,ne,te,I,{color:0,backURL:4})}}function se(o){let e;return{c(){e=F("Content")},l(n){e=Q(n,"Content")},m(n,t){d(n,e,t)},d(n){n&&f(e)}}}function le(o){let e,n,t,a,r;return n=new ee({props:{color:"lime"}}),a=new ae({props:{backURL:"",$$slots:{default:[se]},$$scope:{ctx:o}}}),{c(){e=g("main"),w(n.$$.fragment),t=J(),w(a.$$.fragment)},l(s){e=p(s,"MAIN",{});var l=v(e);A(n.$$.fragment,l),t=K(l),A(a.$$.fragment,l),l.forEach(f)},m(s,l){d(s,e,l),C(n,e,null),O(e,t),C(a,e,null),r=!0},p(s,[l]){const c={};l&1&&(c.$$scope={dirty:l,ctx:s}),a.$set(c)},i(s){r||(u(n.$$.fragment,s),u(a.$$.fragment,s),r=!0)},o(s){m(n.$$.fragment,s),m(a.$$.fragment,s),r=!1},d(s){s&&f(e),M(n),M(a)}}}class fe extends k{constructor(e){super(),y(this,e,null,le,I,{})}}export{fe as default};