if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise(async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()})),r.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},r=(r,s)=>{Promise.all(r.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(r)};self.define=(r,n,i)=>{s[r]||(s[r]=Promise.resolve().then(()=>{let s={};const t={uri:location.origin+r.slice(1)};return Promise.all(n.map(r=>{switch(r){case"exports":return s;case"module":return t;default:return e(r)}})).then(e=>{const r=i(...e);return s.default||(s.default=r),s})}))}}define("./sw.js",["./workbox-6934fb59"],(function(e){"use strict";e.setCacheNameDetails({prefix:"FLY-11ty"}),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"css/styles.c580fa99ed7d48782008.css",revision:"f2b869d31cc739e4a8e3fa137abf2fd2"},{url:"main.04381b4ab7ede113a7b6.js",revision:"4fe69f34a8aff43ba2f5768e0addbe4b"},{url:"index.html",revision:"82ae05007e5bc99b749e666792687e96"}],{ignoreURLParametersMatching:[/./]}),e.registerRoute(/(?:\/)$/,new e.StaleWhileRevalidate({cacheName:"flyweb-html",plugins:[new e.ExpirationPlugin({maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.(?:png|jpg|jpeg|gif|bmp|webp|svg)$/,new e.CacheFirst({cacheName:"flyweb-images",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET")}));
