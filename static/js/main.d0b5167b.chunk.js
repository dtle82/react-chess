(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,function(e,t,a){e.exports=a(13)},,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(3),i=a.n(c);a(10),a(11);var o=function(){for(var e=[],t=8;t>=1;t--)e.push(n.a.createElement("div",{key:t,className:"side-notation"},t));return n.a.createElement("div",{className:"side-notation"},e)},l=a(1),s=function(e,t,a,r,n,c,i,o){return Object.assign(Object.create({isFree:!0,getName:function(){return this.name},getColor:function(){return this.color},getMoveset:function(){return this.moveset},getCaptureSet:function(){return this.captureSet},getEmoji:function(){return this.emoji},getLocation:function(){return this.location},setLocation:function(e){this.location=e},updateHistory:function(e){this.history.push(e)},setStatus:function(e){this.status=e},getIsFree:function(){return this.isFree},setBlocked:function(){this.isFree=!1},setFree:function(){this.isFree=!0},validate:function(){switch(this.setFree(),this.emoji){case"\u265f":this.history.length>0&&(this.moveset=[8]),this.captureSet=[7,9];break;case"\u2659":this.history.length>0&&(this.moveset=[-8]),this.captureSet=[-7,-9]}}}),{name:e,emoji:t,color:a,moveset:r,location:n,history:c,captureSet:i,status:o})},u=function(e){var t,a,r=document.getElementById("chessboard"),n=Array.prototype.indexOf.call(r.children,e);t=[8,7,6,5,4,3,2,1][Math.floor(n/8)];var c=(a=["a","b","c","d","e","f","g","h"][n%8])+t;return console.log("algebraic notation",a+t),{notation:c,index:n}},f=function(e){return e%2},h=function(e){return e="black"===e?"white":"black"},m=n.a.createContext(),v=n.a.createContext(),d=function(e){var t=e.children,a=Object(r.useState)([]),c=Object(l.a)(a,2),i=c[0],o=c[1],s=Object(r.useState)(!0),u=Object(l.a)(s,2),f=u[0],h=u[1];return n.a.createElement(m.Provider,{value:[i,o]},n.a.createElement(v.Provider,{value:[f,h]},t))},p=["a","b","c","d","e","f","g","h"],y=Array(8).fill("\u2659").map(function(e,t){return s("pawn",e,"white",[-8,-16],t+48,[],[],"active")}).concat(["\u2656","\u2658","\u2657","\u2655","\u2654","\u2657","\u2658","\u2656"]),b=Array(32).fill(""),E=Array(8).fill("\u265f").map(function(e,t){return s("pawn",e,"black",[8,16],t+8,[],[],"active")}),g=["\u265c","\u265e","\u265d","\u265b","\u265a","\u265d","\u265e","\u265c"].concat(E);var j=function(){var e=Object(r.useContext)(m),t=Object(l.a)(e,2),a=t[0],c=t[1],i=Object(r.useContext)(v),o=Object(l.a)(i,2),s=o[0],d=o[1],E=Object(r.useState)(g.concat(b).concat(y)),j=Object(l.a)(E,2),O=j[0],k=j[1],w=Object(r.useState)(Array(64).fill(!1)),C=Object(l.a)(w,2),A=C[0],x=C[1],S=Object(r.useState)(Array(64).fill(!1)),N=Object(l.a)(S,2),F=N[0],B=N[1],P=function(e){var t=u(e.target).index,r=O.slice();if(r[t]=O[t],k(r),!1===A[t]){var n=Array(64).fill(!1);n[t]=!0,x(n);var i=Array(64).fill(!1);B(i)}if("object"==typeof O[t]){if(I(O[t],"white"))return void x(Array(64).fill(!1));if(I(O[t],"black"))return void x(Array(64).fill(!1));var o=Array(64).fill(!1);O[t].validate(),O[t].getMoveset().forEach(function(e){!r[t+e]&&O[t].getIsFree()?o[t+e]=!0:O[t].setBlocked()}),O[t].getCaptureSet().forEach(function(e){var a,n;a=r[t+e],n=O[t],a.hasOwnProperty("color")&&n.hasOwnProperty("color")&&a.getColor()!==n.getColor()&&(o[t+e]=!0)}),B(o)}if(F[t]){var l=O.slice(),f=Array.prototype.indexOf.call(A,!0);l[f]=!1,l[t]=O[f],O[f].setLocation(t),O[f].updateHistory(f);var h=a.slice(),m=u(document.getElementById("chessboard").children[f]).notation;h.push(m+" (".concat(O[f].getColor(),")")),c(h),k(l);var v=Array(64).fill(!1);B(v),x(Array(64).fill(!1)),d(!s)}};function I(e,t){switch(t){case"white":return"white"===e.getColor()&&!s;case"black":return!("black"!==e.getColor()||!s)}}function M(e){return e.hasOwnProperty("emoji")?e.getEmoji():e}function H(e,t){return t?n.a.createElement("div",{key:e,className:h(W)+(A[e]?" selected":"")+(F[e]?" black-moves":"")+(F[e]&&O[e]?" capture-moves":""),onClick:P},M(O[e])):n.a.createElement("div",{key:e,className:W+(A[e]?" selected":"")+(F[e]?" black-moves":"")+(F[e]&&O[e]?" capture-moves":""),onClick:P},M(O[e]))}for(var L=[],J=0;J<=63;J++){var W="black",R=Math.floor(J/8);f(R)?J%2?L.push(H(J,!0)):L.push(H(J,!1)):J%2?L.push(H(J,!1)):L.push(H(J,!0))}return n.a.createElement("div",{id:"chessboard"},L,p.map(function(e,t){return n.a.createElement("div",{key:t,className:"bottom-notation"},e)}))};var O=function(){var e=Object(r.useContext)(m),t=Object(l.a)(e,1)[0];return n.a.createElement("div",{id:"history"},n.a.createElement("h2",null,"Move History"),t.map(function(e,t){return n.a.createElement("li",{key:t},e)}))};var k=function(){var e=Object(r.useContext)(v),t=Object(l.a)(e,1)[0];return console.log("isWhiteNext",t),n.a.createElement("div",{id:"playerturn"},n.a.createElement("h2",null,"Player Turn"),n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:t?"turn-display current":"turn-display"},"White"),n.a.createElement("div",{className:t?"turn-display":"turn-display current"},"Black")))};var w=function(){return n.a.createElement("div",{id:"sideinfo"},n.a.createElement(k,null),n.a.createElement(O,null))};a(12);var C=function(){return n.a.createElement(d,null,n.a.createElement("div",{className:"App"},n.a.createElement("h1",null,"React Chess"),n.a.createElement(o,null),n.a.createElement(j,null),n.a.createElement(w,null)))};i.a.render(n.a.createElement(C,null),document.getElementById("root"))}],[[4,1,2]]]);
//# sourceMappingURL=main.d0b5167b.chunk.js.map