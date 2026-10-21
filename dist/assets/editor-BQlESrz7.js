(function(){"use strict";const vl=n=>String(n).padStart(2,"0"),au=(n="",t={})=>({name:n,switch:"",switchPort:"",...t});function lu(n,t){const e=/^(.*?)(\d+)(\D*)$/.exec(String(n));if(!e)return String(n);const i=String(Number(e[2])+t).padStart(e[2].length,"0");return`${e[1]}${i}${e[3]}`}function cu(n){return!n.switch&&!n.switchPort?"":[n.switch,n.switchPort&&`Port ${n.switchPort}`].filter(Boolean).join(" · ")}const hu=(n,t)=>`P${vl(n)}/${vl(t)}`;function ps(n){const t=/^\s*P(\d+)\s*\/\s*(\d+)\s*$/i.exec(n??"");return t?{panel:Number(t[1]),port:Number(t[2])}:null}function Xs({panel:n,port:t}){return t>=24?{panel:n+1,port:1}:{panel:n,port:t+1}}function qs(n,t){const e=[];let i={panel:Math.max(1,n.panel),port:Math.min(Math.max(1,n.port),24)};for(let s=0;s<t;s++)e.push(au(hu(i.panel,i.port))),i=Xs(i);return e}function Ml(n,t){if(t<=n.length)return n.slice(0,t);const e=[...n].reverse().map(s=>ps(s.name)).find(Boolean),i=e?Xs(e):{panel:1,port:1};return[...n,...qs(i,t-n.length)]}function ms(){const a={name:"Testbüro",floors:[{id:"f-eg",name:"Erdgeschoss",height:3,rooms:[{id:"r-flur",name:"Flur",type:"corridor",x:0,z:5.5,width:30,depth:2.2,color:null,occupant:"",description:"Hauptflur"},{id:"r-101",name:"Büro 101",type:"office",x:1.5,z:0,width:9,depth:5.5,color:null,occupant:"Team Vertrieb",description:"4 Arbeitsplätze"},{id:"r-102",name:"Büro 102",type:"office",x:10.5,z:0,width:9,depth:5.5,color:null,occupant:"Team Marketing",description:"4 Arbeitsplätze"},{id:"r-103",name:"Büro 103",type:"office",x:19.5,z:0,width:9,depth:5.5,color:null,occupant:"Geschäftsleitung",description:"2 Arbeitsplätze"},{id:"r-104",name:"Büro 104",type:"office",x:1.5,z:7.7,width:9,depth:5.5,color:null,occupant:"Team IT",description:"5 Arbeitsplätze"},{id:"r-105",name:"Besprechung 105",type:"meeting",x:10.5,z:7.7,width:9,depth:5.5,color:null,occupant:"",description:"12 Sitzplätze, Beamer"},{id:"r-106",name:"Teeküche 106",type:"kitchen",x:19.5,z:7.7,width:9,depth:5.5,color:null,occupant:"",description:"Kaffee, Kühlschrank, Spülmaschine"}]}]},l={"r-101":[6,6],"r-102":[6,6],"r-103":[6,6],"r-104":[6,6],"r-105":[4,4],"r-106":[2]};let c={panel:1,port:1};for(const d of a.floors[0].rooms){const g=l[d.id]??[];d.tanks=g.map((_,v)=>{const m=qs(c,_);return c=Xs(ps(m[m.length-1].name)),{id:`t-${d.id.slice(2)}-${v+1}`,name:`BT ${v+1}`,x:Math.round(d.width*(v+1)/(g.length+1)*100)/100,z:Math.round(d.depth/2*100)/100,ports:m}})}for(const d of a.floors[0].rooms)for(const g of d.tanks)for(const _ of g.ports){const{panel:v,port:m}=ps(_.name);_.switch=`Switch ${Math.ceil(v/2)}`,_.switchPort=String((v-1)%2*24+m)}const h=1;a.floors[0].openings=a.floors[0].rooms.filter(d=>d.type!=="corridor").map(d=>{const g=d.x+d.width/2,_=d.z===0?5.5:7.7;return{id:`o-${d.id.slice(2)}`,type:"door",swing:d.z===0?2:0,x1:g-h/2,z1:_,x2:g+h/2,z2:_}});const u=Object.fromEntries(a.floors[0].rooms.map(d=>[d.id,d]));for(const d of a.floors[0].rooms)d.printers=[];return u["r-flur"].printers.push({id:"p-flur",name:"Drucker Flur",ip:"192.168.10.50",x:15,z:.45}),u["r-102"].printers.push({id:"p-102",name:"Drucker Marketing",ip:"192.168.10.51",x:8.3,z:.5}),a}const Ys={office:{label:"Büro",color:"#7fa8d6"},meeting:{label:"Besprechung",color:"#e5a55f"},corridor:{label:"Flur",color:"#cfc9bf"},kitchen:{label:"Küche",color:"#8fc28a"},wc:{label:"WC",color:"#9fcbd4"},stairs:{label:"Treppenhaus",color:"#aab3bf"},storage:{label:"Lager / Technik",color:"#b7a8cc"},other:{label:"Sonstiges",color:"#d8d2c6"}},Zs=n=>{var t;return n.color||((t=Ys[n.type])==null?void 0:t.color)||Ys.other.color},uu={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},se=n=>String(n??"").replace(/[&<>"']/g,t=>uu[t]),Xe=(n,t=1)=>Number(n).toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}),bn=(n,t,e)=>Math.min(e,Math.max(t,n));function Ge(n="id"){var e,i;const t=((i=(e=globalThis.crypto)==null?void 0:e.randomUUID)==null?void 0:i.call(e))??Math.random().toString(36).slice(2)+Date.now().toString(36);return`${n}-${t.slice(0,8)}`}const yl={rect:"Rechteck",l:"L-Form",chamfer:"Schräge Wand",poly:"Polygon"},lo={nw:"oben links",ne:"oben rechts",se:"unten rechts",sw:"unten links"},Ai=["nw","ne","se","sw"],co=.5,du=.5,we=1e-6,ye=n=>{const t=Number(n.rotation)||0;return Math.abs(t)<1e-9?0:t};function ho(n){let t=((Number(n)||0)%360+360)%360;return t>180&&(t-=360),Math.round(t*10)/10||0}const Ri=n=>[n.x+n.width/2,n.z+n.depth/2];function Pi([n,t],[e,i],s){if(!s)return[n,t];const r=s*Math.PI/180,o=Math.cos(r),a=Math.sin(r),l=n-e,c=t-i;return[e+l*o-c*a,i+l*a+c*o]}const Bn=(n,t)=>Pi(t,Ri(n),ye(n)),gs=(n,t)=>Pi(t,Ri(n),-ye(n)),uo=(n,t)=>Pi(t,[0,0],-ye(n));function Fe(n){return n.type==="stairs"?"rect":n.shape==="poly"?Array.isArray(n.points)&&n.points.length>=3?"poly":"rect":n.shape==="l"||n.shape==="chamfer"?n.shape:"rect"}function _s(n){const t=n.shape==="l"?du:0,e=(i,s)=>{const r=Math.max(co,s-t);return Math.round(Math.min(Math.max(Number(i)||0,Math.min(co,r)),r)*100)/100};n.cutW=e(n.cutW,n.width),n.cutD=e(n.cutD,n.depth)}function fu(n){const t=e=>Math.max(co,Math.round(e/2/.5)*.5);return{cutW:t(n.width),cutD:t(n.depth)}}function mn(n){const t=En(n);return ye(n)?t.map(e=>Bn(n,e)):t}function En(n){const t=n.x,e=n.z,i=n.x+n.width,s=n.z+n.depth,r={nw:[t,e],ne:[i,e],se:[i,s],sw:[t,s]},o=Fe(n);if(o==="rect")return Ai.map(m=>r[m]);if(o==="poly")return n.points.map(([m,p])=>[t+m,e+p]);const a=Math.max(0,Ai.indexOf(n.cutCorner)),l=r[Ai[a]],c=r[Ai[(a+3)%4]],h=r[Ai[(a+1)%4]],u=m=>{const p=m[1]===l[1],P=p?n.cutW:n.cutD;return p?[Math.sign(m[0]-l[0])*P,0]:[0,Math.sign(m[1]-l[1])*P]},d=u(c),g=u(h),_=[[l[0]+d[0],l[1]+d[1]]];o==="l"&&_.push([l[0]+d[0]+g[0],l[1]+d[1]+g[1]]),_.push([l[0]+g[0],l[1]+g[1]]);const v=[];for(let m=0;m<4;m++){const p=Ai[(a+m)%4];m===0?v.push(..._):v.push(r[p])}return v.filter((m,p)=>{const P=v[(p+1)%v.length];return Math.abs(m[0]-P[0])>we||Math.abs(m[1]-P[1])>we})}function js(n){const t=pu(n);return ye(n)?t.map(e=>e.map(i=>Bn(n,i))):t}function pu(n){if(Fe(n)==="poly")return yu(En(n));if(Fe(n)!=="l")return[En(n)];const{x:t,z:e,width:i,depth:s,cutW:r,cutD:o}=n,a=n.cutCorner,l=(g,_,v,m)=>[[g,_],[g+v,_],[g+v,_+m],[g,_+m]],c=a==="ne"||a==="se",h=a==="nw"||a==="ne",u=l(c?t:t+r,e,i-r,s),d=l(c?t+i-r:t,h?e+o:e,r,s-o);return[u,d]}function xs(n){let t=0;for(let e=0;e<n.length;e++){const[i,s]=n[e],[r,o]=n[(e+1)%n.length];t+=i*o-r*s}return Math.abs(t)/2}const vs=n=>xs(mn(n));function Sl(n){let t=0,e=0,i=0;for(let s=0;s<n.length;s++){const[r,o]=n[s],[a,l]=n[(s+1)%n.length],c=r*l-a*o;t+=c,e+=(r+a)*c,i+=(o+l)*c}return Math.abs(t)<we?n[0]:[e/(3*t),i/(3*t)]}function bl(n){if(Fe(n)==="poly"){const i=mn(n),s=Sl(i);if(fo(s,i)&&oi(i,s).dist>.5)return s}const t=js(n),e=t.reduce((i,s)=>xs(s)>xs(i)?s:i,t[0]);return Sl(e)}function fo([n,t],e){let i=!1;for(let s=0,r=e.length-1;s<e.length;r=s++){const[o,a]=e[s],[l,c]=e[r];a>t!=c>t&&n<(l-o)*(t-a)/(c-a)+o&&(i=!i)}return i}function mu(n,t){const e=gs(n,t);if(e[0]<n.x-we||e[0]>n.x+n.width+we||e[1]<n.z-we||e[1]>n.z+n.depth+we)return!1;if(Fe(n)==="rect")return!0;const i=En(n);return fo(e,i)||oi(i,e).dist<.001}function oi(n,[t,e]){let i=null;for(let s=0;s<n.length;s++){const[r,o]=n[s],[a,l]=n[(s+1)%n.length],c=a-r,h=l-o,u=c*c+h*h||1,d=Math.min(1,Math.max(0,((t-r)*c+(e-o)*h)/u)),g=r+c*d,_=o+h*d,v=Math.hypot(t-g,e-_);if(!i||v<i.dist){const m=Math.sqrt(u);i={point:[g,_],normal:[-h/m,c/m],dist:v}}}return i}function gu(n,t,e){for(const i of[n,t])for(let s=0;s<i.length;s++){const[r,o]=i[s],[a,l]=i[(s+1)%i.length],c=Math.hypot(a-r,l-o)||1,h=-(l-o)/c,u=(a-r)/c,d=v=>v.map(([m,p])=>m*h+p*u),g=d(n),_=d(t);if(Math.max(...g)<=Math.min(..._)+e||Math.max(..._)<=Math.min(...g)+e)return!0}return!1}function po(n){if(!ye(n))return{minX:n.x,minZ:n.z,maxX:n.x+n.width,maxZ:n.z+n.depth};const t=mn(n),e=t.map(s=>s[0]),i=t.map(s=>s[1]);return{minX:Math.min(...e),minZ:Math.min(...i),maxX:Math.max(...e),maxZ:Math.max(...i)}}function _u(n,t,e=.01){const i=po(n),s=po(t),r=Math.min(i.maxX,s.maxX)-Math.max(i.minX,s.minX),o=Math.min(i.maxZ,s.maxZ)-Math.max(i.minZ,s.minZ);return r<=e||o<=e?!1:js(n).some(a=>js(t).some(l=>!gu(a,l,e)))}function xu(n,t){let e=0;for(let o=0;o<t.length;o++){const[a,l]=t[o],[c,h]=t[(o+1)%t.length];e+=a*h-c*l}const i=e<0?[...t].reverse():t,s=[];let r=n;for(let o=0;o<i.length&&r;o++){const a=i[o],l=i[(o+1)%i.length],c=El(r,l,a);c&&s.push(c),r=El(r,a,l)}return s}function El(n,t,e){const i=-(e[1]-t[1]),s=e[0]-t[0],r=([a,l])=>(a-t[0])*i+(l-t[1])*s,o=[];for(let a=0;a<n.length;a++){const l=n[a],c=n[(a+1)%n.length],h=r(l),u=r(c);if(h>=-we&&o.push(l),h>=-we!=u>=-we){const d=h/(h-u);o.push([l[0]+(c[0]-l[0])*d,l[1]+(c[1]-l[1])*d])}}return o.length>=3&&xs(o)>1e-6?o:null}const mo=n=>{let t=0;for(let e=0;e<n.length;e++){const[i,s]=n[e],[r,o]=n[(e+1)%n.length];t+=i*o-r*s}return t/2};function vu(n,t,e,i){const s=(c,h,u)=>(h[0]-c[0])*(u[1]-c[1])-(h[1]-c[1])*(u[0]-c[0]),r=s(e,i,n),o=s(e,i,t),a=s(n,t,e),l=s(n,t,i);return(r>we&&o<-we||r<-we&&o>we)&&(a>we&&l<-we||a<-we&&l>we)}function Mu(n){const t=n.length;for(let e=0;e<t;e++)for(let i=e+2;i<t;i++)if(!(e===0&&i===t-1)&&vu(n[e],n[(e+1)%t],n[i],n[(i+1)%t]))return!0;return!1}function wl(n){let t=n.filter((i,s)=>{const r=n[(s+1)%n.length];return Math.hypot(i[0]-r[0],i[1]-r[1])>.001}),e=!0;for(;e&&t.length>3;){e=!1;for(let i=0;i<t.length;i++){const s=t[(i+t.length-1)%t.length],r=t[i],o=t[(i+1)%t.length],a=(r[0]-s[0])*(o[1]-r[1])-(r[1]-s[1])*(o[0]-r[0]),l=Math.hypot(r[0]-s[0],r[1]-s[1])*Math.hypot(o[0]-r[0],o[1]-r[1])||1;if(Math.abs(a)/l<1e-4){t.splice(i,1),e=!0;break}}}return t}const Ks=n=>n.length>=3&&Math.abs(mo(n))>.05&&!Mu(n);function Js(n){const t=mo(n)<0?[...n].reverse():n,e=t.map(a=>a[0]),i=t.map(a=>a[1]),s=Math.min(...e),r=Math.min(...i),o=a=>Math.round(a*1e3)/1e3;return{x:o(s),z:o(r),width:o(Math.max(...e)-s),depth:o(Math.max(...i)-r),shape:"poly",points:t.map(([a,l])=>[o(a-s),o(l-r)])}}function Tl(n,t){const e=Js(t),[i,s]=Bn(n,[e.x+e.width/2,e.z+e.depth/2]),r=o=>Math.round(o*1e3)/1e3;Object.assign(n,e,{x:r(i-e.width/2),z:r(s-e.depth/2)})}function yu(n){const t=mo(n)<0?[...n].reverse():[...n];if(t.length<=3)return[t];const e=[],i=(o,a,l)=>(a[0]-o[0])*(l[1]-a[1])-(a[1]-o[1])*(l[0]-a[0])>we,s=(o,a,l,c)=>{const h=(l[0]-a[0])*(o[1]-a[1])-(l[1]-a[1])*(o[0]-a[0]),u=(c[0]-l[0])*(o[1]-l[1])-(c[1]-l[1])*(o[0]-l[0]),d=(a[0]-c[0])*(o[1]-c[1])-(a[1]-c[1])*(o[0]-c[0]);return h>=-we&&u>=-we&&d>=-we};let r=t.length*t.length;for(;t.length>3&&r-- >0;){let o=!1;for(let a=0;a<t.length;a++){const l=t[(a+t.length-1)%t.length],c=t[a],h=t[(a+1)%t.length];if(i(l,c,h)&&!t.some(u=>u!==l&&u!==c&&u!==h&&s(u,l,c,h))){e.push([l,c,h]),t.splice(a,1),o=!0;break}}if(!o)break}return e.push(t),e.filter(o=>xs(o)>1e-9)}const kn=.12,Su=.04,je=.001;function Al(n){return n.map((t,e)=>{const i=n[(e+1)%n.length],s=Math.hypot(i[0]-t[0],i[1]-t[1])||1,r=[(i[0]-t[0])/s,(i[1]-t[1])/s];return{p:t,len:s,u:r,n:[-r[1],r[0]]}})}function bu(n,t){if(n.u[0]*t.u[0]+n.u[1]*t.u[1]>-1+1e-6)return null;const e=(t.p[0]-n.p[0])*n.n[0]+(t.p[1]-n.p[1])*n.n[1];if(Math.abs(e)>je)return null;const s=(l=>(l[0]-n.p[0])*n.u[0]+(l[1]-n.p[1])*n.u[1])(t.p),r=s-t.len,o=Math.max(0,Math.min(s,r)),a=Math.min(n.len,Math.max(s,r));return a-o>je?[o,a]:null}function Rl(n,t){const e=t.x2-t.x1,i=t.z2-t.z1,s=Math.hypot(e,i);if(s<je||Math.abs((e*n.u[1]-i*n.u[0])/s)>.001)return null;const r=(t.x1-n.p[0])*n.n[0]+(t.z1-n.p[1])*n.n[1];if(Math.abs(r)>.02)return null;const o=(u,d)=>(u-n.p[0])*n.u[0]+(d-n.p[1])*n.u[1],a=o(t.x1,t.z1),l=o(t.x2,t.z2),c=Math.max(0,Math.min(a,l)),h=Math.min(n.len,Math.max(a,l));return h-c>je?[c,h]:null}const Pl=(n,t,e)=>n[1]>t+je&&n[0]<e-je;function Qs(n,t){let e=n;for(const[i,s]of t){const r=[];for(const[o,a]of e){if(s<=o+je||i>=a-je){r.push([o,a]);continue}i>o+je&&r.push([o,i]),s<a-je&&r.push([s,a])}e=r}return e.filter(([i,s])=>s-i>je)}function Eu(n,t=[],e=[]){const i=[],s=u=>u.type==="corridor",r=n.map(u=>({room:u,edges:Al(mn(u))})),o=kn,a=Su;function l(u,d,g,_,v=[[0,u.len]]){const m=d.filter(T=>T.type==="door").map(T=>T.range),p=d.filter(T=>T.type==="glass").map(T=>T.range),P=T=>p.some(I=>Pl(I,T[0],T[1])),w=m.filter(T=>!P(T)),M=m.filter(P),F=Qs(p,m);for(const T of Qs(v,[...m,...p]))i.push({quad:g(T),len:T[1]-T[0],kind:"wall"});for(const T of w)i.push({quad:g(T),len:T[1]-T[0],kind:"lintel"});for(const T of F){const I=_(T);I&&i.push({quad:I,len:T[1]-T[0],kind:"glass"})}for(const T of M){const I=_(T);I&&i.push({quad:I,len:T[1]-T[0],kind:"transom"})}}const c=(u,d)=>[u.p[0]+u.u[0]*d,u.p[1]+u.u[1]*d],h=(u,d,g)=>{const[_,v]=c(u,d);return[_+u.n[0]*g,v+u.n[1]*g]};for(const{room:u,edges:d}of r){const g=d.map((_,v)=>{const m=d[(v+d.length-1)%d.length],p=o/(1+m.n[0]*_.n[0]+m.n[1]*_.n[1]);return[_.p[0]+(m.n[0]+_.n[0])*p,_.p[1]+(m.n[1]+_.n[1])*p]});d.forEach((_,v)=>{const m=[];for(const T of r)if(T.room!==u)for(const I of T.edges){const N=bu(_,I);N&&m.push({a:N[0],b:N[1],corridor:s(T.room),id:T.room.id})}let p=t.map(T=>({type:T.type,range:Rl(_,T)})).filter(T=>T.range),P=[[0,_.len]];if(s(u)){const T=m.map(I=>[I.a,I.b]);P=Qs(P,T),p=p.flatMap(I=>Qs([I.range],T).map(N=>({type:I.type,range:N})))}const w=T=>T<je?g[v]:T>_.len-je?g[(v+1)%d.length]:h(_,T,o);l(_,p,([T,I])=>[c(_,T),c(_,I),w(I),w(T)],([T,I])=>{const N=m.find(U=>!U.corridor&&Pl([T,I],U.a,U.b));if(N&&N.id<u.id)return null;const[A,b]=N?[-a/2,a/2]:[o/2-a/2,o/2+a/2];return[h(_,T,A),h(_,I,A),h(_,I,b),h(_,T,b)]},P)})}for(const u of e){const[d]=Al([[u.x1,u.z1],[u.x2,u.z2]]),g=t.map(v=>({type:v.type,range:Rl(d,v)})).filter(v=>v.range),_=(v,m)=>([p,P])=>[h(d,p,v),h(d,P,v),h(d,P,m),h(d,p,m)];l(d,g,_(-o/2,o/2),_(-a/2,a/2))}return i}const Cl={"u-left":"Zweiläufig, Antritt links","u-right":"Zweiläufig, Antritt rechts",straight:"Einläufig (gerade)"},Dl={n:"nach oben (Norden)",e:"nach rechts (Osten)",s:"nach unten (Süden)",w:"nach links (Westen)"},go=["n","e","s","w"],wu=n=>go[(go.indexOf(n)+1)%4]??"n",Tu=.18,Au=.15,Ru=.15,Pu=1.1,Cu=1.8,Du=1.8,tr=.1,Lu=.12,Ll=.9,Il=.8,Ul=2*Il+Pu+2*tr;function Nl(n){return!n.elevator||n.stairShape==="straight"?!1:(n.stairDir==="n"||n.stairDir==="s"?n.width:n.depth)-kn*2>=Ul-1e-6}function Ms(n,t){const e=go.includes(n.stairDir)?n.stairDir:"n",i=e==="n"||e==="s",s=n.x+kn,r=n.z+kn,o=Math.max(.2,n.width-kn*2),a=Math.max(.2,n.depth-kn*2),l=i?o:a,c=i?a:o,h=n.stairShape==="u-right",u=(M,F)=>{const T=h?l-M:M;switch(e){case"s":return[s+o-T,r+F];case"n":return[s+T,r+a-F];case"e":return[s+F,r+T];default:return[s+o-F,r+a-T]}},d=(M,F,T,I,N)=>{const[A,b]=u(M,F),[U,J]=u(M+T,F+I);return{x:Math.min(A,U),z:Math.min(b,J),w:Math.abs(U-A),d:Math.abs(J-b),top:N}},g=Math.max(2,Math.round(t/Tu)),_=t/g,v=[],m=[];let p,P,w=null;if(n.stairShape==="straight"){const M=Math.min(1,c*.2),F=c-M,T=F/g;for(let I=0;I<g;I++)v.push(d(0,I*T,l,T,(I+1)*_));p=[[l/2,Ru],[l/2,F+M/2]],P=d(0,0,l,F)}else{const M=Nl(n),F=M?Math.min(Cu,l-2*Il-2*tr):0,T=M?F+2*tr:Au,I=Math.max(.3,(l-T)/2),N=Math.min(Math.max(I,.8),c*.3),A=c-N*2,b=Math.ceil(g/2),U=g-b,J=A/b;for(let X=0;X<b;X++)v.push(d(0,N+X*J,I,J,(X+1)*_));const $=b*_;m.push(d(0,c-N,l,N,$));const Z=A/U;for(let X=0;X<U;X++)v.push(d(l-I,c-N-(X+1)*Z,I,Z,$+(X+1)*_));const rt=c-N/2;if(p=[[I/2,N/2],[I/2,rt],[l-I/2,rt],[l-I/2,N/2]],P=d(0,N,l,c-N),M){const X=I+tr,ht=N,j=Math.min(Du,A),st=Lu,at=(F-Ll)/2;w={shaft:d(X,ht,F,j),walls:[d(X,ht+j-st,F,st),d(X,ht+st,st,j-2*st),d(X+F-st,ht+st,st,j-2*st),d(X,ht,at,st),d(X+F-at,ht,at,st)],door:d(X+at,ht,Ll,st)};for(const Ct of[w.shaft,...w.walls,w.door])delete Ct.top}}return delete P.top,{steps:v,landings:m,opening:P,elevator:w,path:p.map(([M,F])=>u(M,F))}}const er=.3;function zl(n={}){return{id:Ge("w"),x1:0,z1:0,x2:1,z2:0,...n}}function Iu(n){const t=[n==null?void 0:n.x1,n==null?void 0:n.z1,n==null?void 0:n.x2,n==null?void 0:n.z2].map(Number);return!t.every(Number.isFinite)||Math.hypot(t[2]-t[0],t[3]-t[1])<.05?null:{id:n.id||Ge("w"),x1:t[0],z1:t[1],x2:t[2],z2:t[3]}}const _o=n=>Math.hypot(n.x2-n.x1,n.z2-n.z1);function Ol(n,[t,e]){const i=n.x2-n.x1,s=n.z2-n.z1,r=i*i+s*s||1,o=Math.min(1,Math.max(0,((t-n.x1)*i+(e-n.z1)*s)/r));return Math.hypot(t-(n.x1+i*o),e-(n.z1+s*o))}const Ne=(n,t)=>Number.isFinite(Number(n))?Number(n):t;function Uu(n={}){return{id:Ge("r"),name:"Raum",type:"office",x:0,z:0,width:4,depth:4,rotation:0,shape:"rect",cutCorner:"ne",cutW:2,cutD:2,color:null,occupant:"",description:"",tanks:[],printers:[],stairShape:"u-left",stairDir:"n",elevator:!1,...n}}const ys=(n,t)=>Bn(n,[n.x+t.x,n.z+t.z]),ai=.4;function Nu(n={}){return{id:Ge("t"),name:"BT 1",x:1,z:1,ports:[],...n}}function zu(n){const t=n.tanks.map(e=>{var i;return Number(((i=/(\d+)\s*$/.exec(e.name))==null?void 0:i[1])??0)});return`BT ${Math.max(0,...t)+1}`}const li=.6,Ss=.5;function Ou(n={}){return{id:Ge("p"),name:"Drucker",ip:"",x:1,z:1,...n}}function Fu(n){const t=n.floors.flatMap(e=>e.rooms.flatMap(i=>i.printers.map(s=>{var r;return Number(((r=/^Drucker (\d+)$/.exec(s.name))==null?void 0:r[1])??0)})));return`Drucker ${Math.max(0,...t)+1}`}const Fl=n=>/^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/.test(String(n).trim()),nr=(n,t,e)=>Math.round(Math.min(Math.max(n,t),Math.max(t,e-t))*100)/100;function Bl(n,t,e,i){const s=[t.x+n.x,t.z+n.z];if(fo(s,e)){const{dist:r,normal:o}=oi(e,s);if(r>=i)return;n.x+=o[0]*(i-r),n.z+=o[1]*(i-r)}else{const{point:r,normal:o}=oi(e,s);n.x=r[0]+o[0]*i-t.x,n.z=r[1]+o[1]*i-t.z}n.x=Math.round(n.x*100)/100,n.z=Math.round(n.z*100)/100}function wn(n){const t=Fe(n)==="rect"?null:En(n);for(const e of n.tanks)t&&Bl(e,n,t,ai/2),e.x=nr(e.x,ai/2,n.width),e.z=nr(e.z,ai/2,n.depth);for(const e of n.printers)t&&Bl(e,n,t,li/2),e.x=nr(e.x,li/2,n.width),e.z=nr(e.z,Ss/2,n.depth)}function kl(n,t={}){return{...n,id:Ge("r"),tanks:n.tanks.map(e=>({...e,id:Ge("t"),ports:e.ports.map(i=>({...i}))})),printers:n.printers.map(e=>({...e,id:Ge("p")})),...n.points?{points:n.points.map(e=>[...e])}:{},...t}}function ir(n={}){return{id:Ge("f"),name:"Etage",height:3,rooms:[],...n}}function Hl(n){return!n||typeof n.src!="string"||!n.src?null:{src:n.src,x:Ne(n.x,0),z:Ne(n.z,0),width:Math.max(.5,Ne(n.width,20)),ratio:Math.max(.01,Ne(n.ratio,.75)),opacity:Math.min(1,Math.max(.02,Ne(n.opacity,.15))),visible:n.visible!==!1}}function xo(n){if(n.shape!=="poly"||!Array.isArray(n.points))return null;const t=n.points.map(i=>[Number(i==null?void 0:i[0]),Number(i==null?void 0:i[1])]);if(!t.every(i=>i.every(Number.isFinite)))return null;const e=wl(t);return Ks(e)?e:null}function Bu(n){const t=[n==null?void 0:n.x1,n==null?void 0:n.z1,n==null?void 0:n.x2,n==null?void 0:n.z2].map(Number);return!t.every(Number.isFinite)||Math.hypot(t[2]-t[0],t[3]-t[1])<.05?null:{id:n.id||Ge("o"),type:n.type==="glass"?"glass":"door",x1:t[0],z1:t[1],x2:t[2],z2:t[3],swing:[0,1,2,3].includes(n.swing)?n.swing:0}}function ku(n){const t=xo(n);if(!t)return{};const{x:e,z:i,width:s,depth:r,points:o}=Js(t);return{x:Ne(n.x,0)+e,z:Ne(n.z,0)+i,width:s,depth:r,points:o}}function sr(n){return n===0?"Erdgeschoss":n>0?`${n}. Obergeschoss`:`${-n}. Untergeschoss`}function vo(n){return Math.max(0,n.floors.findIndex(t=>t.id===n.groundFloorId))}function Mo(n){var e;if(!n.rooms.length&&!((e=n.walls)!=null&&e.length))return null;const t={minX:1/0,minZ:1/0,maxX:-1/0,maxZ:-1/0};for(const i of n.rooms){const s=po(i);t.minX=Math.min(t.minX,s.minX),t.minZ=Math.min(t.minZ,s.minZ),t.maxX=Math.max(t.maxX,s.maxX),t.maxZ=Math.max(t.maxZ,s.maxZ)}for(const i of n.walls??[])t.minX=Math.min(t.minX,i.x1,i.x2),t.minZ=Math.min(t.minZ,i.z1,i.z2),t.maxX=Math.max(t.maxX,i.x1,i.x2),t.maxZ=Math.max(t.maxZ,i.z1,i.z2);return t}function Hn(n){if(!n||!Array.isArray(n.floors))throw new Error('Ungültige Gebäudedatei: Feld "floors" fehlt.');const t=n.floors.map((i,s)=>({id:i.id||Ge("f"),name:String(i.name??sr(s)),height:Math.max(2,Ne(i.height,3)),...Hl(i.underlay)?{underlay:Hl(i.underlay)}:{},...Array.isArray(i.openings)&&i.openings.length?{openings:i.openings.map(Bu).filter(Boolean)}:{},...Array.isArray(i.walls)&&i.walls.length?{walls:i.walls.map(Iu).filter(Boolean)}:{},rooms:(Array.isArray(i.rooms)?i.rooms:[]).map(r=>({id:r.id||Ge("r"),name:String(r.name??"Raum"),type:Ys[r.type]?r.type:"other",x:Ne(r.x,0),z:Ne(r.z,0),width:Math.max(.5,Ne(r.width,4)),depth:Math.max(.5,Ne(r.depth,4)),rotation:ho(r.rotation),shape:yl[r.shape]&&(r.shape!=="poly"||xo(r))?r.shape:"rect",cutCorner:lo[r.cutCorner]?r.cutCorner:"ne",cutW:Ne(r.cutW,2),cutD:Ne(r.cutD,2),color:r.color||null,occupant:String(r.occupant??""),description:String(r.description??""),stairShape:Cl[r.stairShape]?r.stairShape:"u-left",stairDir:Dl[r.stairDir]?r.stairDir:"n",elevator:!!r.elevator,...xo(r)?ku(r):{},tanks:(Array.isArray(r.tanks)?r.tanks:[]).map((o,a)=>({id:o.id||Ge("t"),name:String(o.name??`BT ${a+1}`),x:Ne(o.x,1),z:Ne(o.z,1),ports:(Array.isArray(o.ports)?o.ports:[]).map(l=>({name:String(typeof l=="string"?l:(l==null?void 0:l.name)??""),switch:String((l==null?void 0:l.switch)??""),switchPort:String((l==null?void 0:l.switchPort)??"")}))})),printers:(Array.isArray(r.printers)?r.printers:[]).map((o,a)=>({id:o.id||Ge("p"),name:String(o.name??`Drucker ${a+1}`),ip:String(o.ip??""),x:Ne(o.x,1),z:Ne(o.z,1)}))}))}));for(const i of t)for(const s of i.rooms)_s(s);t.length||t.push(ir({name:sr(0)}));const e=t.some(i=>i.id===n.groundFloorId)?n.groundFloorId:t[0].id;return{name:String(n.name??"Gebäude"),groundFloorId:e,floors:t}}const Hu={standard:"standard.json"},Gu={name:"Testbüro",floors:[{id:"f-eg",name:"Erdgeschoss",height:3,rooms:[{id:"r-flur",name:"Flur",type:"corridor",x:0,z:5.5,width:30,depth:2.2,color:null,occupant:"",description:"Hauptflur",tanks:[],printers:[{id:"p-flur",name:"Drucker Flur",ip:"192.168.10.50",x:15,z:.45}]},{id:"r-101",name:"Büro 101",type:"office",x:1.5,z:0,width:9,depth:5.5,color:null,occupant:"Team Vertrieb",description:"4 Arbeitsplätze",tanks:[{id:"t-101-1",name:"BT 1",x:3,z:2.75,ports:[{name:"P01/01",switch:"Switch 1",switchPort:"1"},{name:"P01/02",switch:"Switch 1",switchPort:"2"},{name:"P01/03",switch:"Switch 1",switchPort:"3"},{name:"P01/04",switch:"Switch 1",switchPort:"4"},{name:"P01/05",switch:"Switch 1",switchPort:"5"},{name:"P01/06",switch:"Switch 1",switchPort:"6"}]},{id:"t-101-2",name:"BT 2",x:6,z:2.75,ports:[{name:"P01/07",switch:"Switch 1",switchPort:"7"},{name:"P01/08",switch:"Switch 1",switchPort:"8"},{name:"P01/09",switch:"Switch 1",switchPort:"9"},{name:"P01/10",switch:"Switch 1",switchPort:"10"},{name:"P01/11",switch:"Switch 1",switchPort:"11"},{name:"P01/12",switch:"Switch 1",switchPort:"12"}]}],printers:[]},{id:"r-102",name:"Büro 102",type:"office",x:10.5,z:0,width:9,depth:5.5,color:null,occupant:"Team Marketing",description:"4 Arbeitsplätze",tanks:[{id:"t-102-1",name:"BT 1",x:3,z:2.75,ports:[{name:"P01/13",switch:"Switch 1",switchPort:"13"},{name:"P01/14",switch:"Switch 1",switchPort:"14"},{name:"P01/15",switch:"Switch 1",switchPort:"15"},{name:"P01/16",switch:"Switch 1",switchPort:"16"},{name:"P01/17",switch:"Switch 1",switchPort:"17"},{name:"P01/18",switch:"Switch 1",switchPort:"18"}]},{id:"t-102-2",name:"BT 2",x:6,z:2.75,ports:[{name:"P01/19",switch:"Switch 1",switchPort:"19"},{name:"P01/20",switch:"Switch 1",switchPort:"20"},{name:"P01/21",switch:"Switch 1",switchPort:"21"},{name:"P01/22",switch:"Switch 1",switchPort:"22"},{name:"P01/23",switch:"Switch 1",switchPort:"23"},{name:"P01/24",switch:"Switch 1",switchPort:"24"}]}],printers:[{id:"p-102",name:"Drucker Marketing",ip:"192.168.10.51",x:8.3,z:.5}]},{id:"r-103",name:"Büro 103",type:"office",x:19.5,z:0,width:9,depth:5.5,color:null,occupant:"Geschäftsleitung",description:"2 Arbeitsplätze",tanks:[{id:"t-103-1",name:"BT 1",x:3,z:2.75,ports:[{name:"P02/01",switch:"Switch 1",switchPort:"25"},{name:"P02/02",switch:"Switch 1",switchPort:"26"},{name:"P02/03",switch:"Switch 1",switchPort:"27"},{name:"P02/04",switch:"Switch 1",switchPort:"28"},{name:"P02/05",switch:"Switch 1",switchPort:"29"},{name:"P02/06",switch:"Switch 1",switchPort:"30"}]},{id:"t-103-2",name:"BT 2",x:6,z:2.75,ports:[{name:"P02/07",switch:"Switch 1",switchPort:"31"},{name:"P02/08",switch:"Switch 1",switchPort:"32"},{name:"P02/09",switch:"Switch 1",switchPort:"33"},{name:"P02/10",switch:"Switch 1",switchPort:"34"},{name:"P02/11",switch:"Switch 1",switchPort:"35"},{name:"P02/12",switch:"Switch 1",switchPort:"36"}]}],printers:[]},{id:"r-104",name:"Büro 104",type:"office",x:1.5,z:7.7,width:9,depth:5.5,color:null,occupant:"Team IT",description:"5 Arbeitsplätze",tanks:[{id:"t-104-1",name:"BT 1",x:3,z:2.75,ports:[{name:"P02/13",switch:"Switch 1",switchPort:"37"},{name:"P02/14",switch:"Switch 1",switchPort:"38"},{name:"P02/15",switch:"Switch 1",switchPort:"39"},{name:"P02/16",switch:"Switch 1",switchPort:"40"},{name:"P02/17",switch:"Switch 1",switchPort:"41"},{name:"P02/18",switch:"Switch 1",switchPort:"42"}]},{id:"t-104-2",name:"BT 2",x:6,z:2.75,ports:[{name:"P02/19",switch:"Switch 1",switchPort:"43"},{name:"P02/20",switch:"Switch 1",switchPort:"44"},{name:"P02/21",switch:"Switch 1",switchPort:"45"},{name:"P02/22",switch:"Switch 1",switchPort:"46"},{name:"P02/23",switch:"Switch 1",switchPort:"47"},{name:"P02/24",switch:"Switch 1",switchPort:"48"}]}],printers:[]},{id:"r-105",name:"Besprechung 105",type:"meeting",x:10.5,z:7.7,width:9,depth:5.5,color:null,occupant:"",description:"12 Sitzplätze, Beamer",tanks:[{id:"t-105-1",name:"BT 1",x:3,z:2.75,ports:[{name:"P03/01",switch:"Switch 2",switchPort:"1"},{name:"P03/02",switch:"Switch 2",switchPort:"2"},{name:"P03/03",switch:"Switch 2",switchPort:"3"},{name:"P03/04",switch:"Switch 2",switchPort:"4"}]},{id:"t-105-2",name:"BT 2",x:6,z:2.75,ports:[{name:"P03/05",switch:"Switch 2",switchPort:"5"},{name:"P03/06",switch:"Switch 2",switchPort:"6"},{name:"P03/07",switch:"Switch 2",switchPort:"7"},{name:"P03/08",switch:"Switch 2",switchPort:"8"}]}],printers:[]},{id:"r-106",name:"Teeküche 106",type:"kitchen",x:19.5,z:7.7,width:9,depth:5.5,color:null,occupant:"",description:"Kaffee, Kühlschrank, Spülmaschine",tanks:[{id:"t-106-1",name:"BT 1",x:4.5,z:2.75,ports:[{name:"P03/09",switch:"Switch 2",switchPort:"9"},{name:"P03/10",switch:"Switch 2",switchPort:"10"}]}],printers:[]}],openings:[{id:"o-101",type:"door",swing:2,x1:5.5,z1:5.5,x2:6.5,z2:5.5},{id:"o-102",type:"door",swing:2,x1:14.5,z1:5.5,x2:15.5,z2:5.5},{id:"o-103",type:"door",swing:2,x1:23.5,z1:5.5,x2:24.5,z2:5.5},{id:"o-104",type:"door",swing:0,x1:5.5,z1:7.7,x2:6.5,z2:7.7},{id:"o-105",type:"door",swing:0,x1:14.5,z1:7.7,x2:15.5,z2:7.7},{id:"o-106",type:"door",swing:0,x1:23.5,z1:7.7,x2:24.5,z2:7.7}]}]},Vu=100,Wu=300,Gl="config.json",yo={standard:"standard.json"},rr="buero3d.building.v2",$u=location.protocol==="file:",or=n=>JSON.stringify(n),ar=new Map,Vl=new Map,So=n=>JSON.stringify(n,(t,e)=>{if(t!=="src"||typeof e!="string"||!e.startsWith("data:"))return e;let i=Vl.get(e);return i||(i=`pool:${ar.size+1}`,ar.set(i,e),Vl.set(e,i)),i}),Wl=n=>JSON.parse(n,(t,e)=>t==="src"&&ar.has(e)?ar.get(e):e);function bo(){try{const n=localStorage.getItem(rr);if(!n)return null;const t=JSON.parse(n);return t.building?t:{building:t,basedOn:null}}catch{return null}}async function $l(n){if($u){if(n===Gl)return Hu;if(n===yo.standard)return Gu;throw new Error(`${n}: über file:// nicht ladbar, nur die beim Build eingebettete standard.json`)}const t=await fetch(n,{cache:"no-store"});if(!t.ok)throw new Error(`${n}: HTTP ${t.status}`);return t.json()}class Xu extends EventTarget{constructor(){super(),this.config={...yo},this.building=Hn(ms()),this.standard=null,this.standardError=null,this.isDraft=!1,this.draftOutdated=!1,this.undoStack=[],this.redoStack=[],this.saveTimer=null,this.status={state:"loading"}}async init(){try{this.config={...yo,...await $l(Gl)}}catch{}await this.loadStandard();const t=bo();t?(this.building=Hn(t.building),this.isDraft=!0,this.draftOutdated=!!this.standard&&t.basedOn!==or(this.standard)):this.building=structuredClone(this.standard??Hn(ms())),this.updateStatus(),window.addEventListener("storage",e=>{e.key===rr&&this.reloadFromStorage()})}async loadStandard(){try{const t=await $l(this.config.standard);this.standard=Hn(t.building??t),this.standardError=null}catch(t){this.standard=null,this.standardError=t.message}}reloadFromStorage(){const t=bo();this.isDraft=!!t,this.building=t?Hn(t.building):structuredClone(this.standard??Hn(ms())),this.undoStack=[],this.redoStack=[],this.updateStatus(),this.emit("remote")}get canUndo(){return this.undoStack.length>0}get canRedo(){return this.redoStack.length>0}checkpoint(){this.undoStack.push(So(this.building)),this.undoStack.length>Vu&&this.undoStack.shift(),this.redoStack=[]}mutate(t,{checkpoint:e=!0}={}){e&&this.checkpoint(),t(this.building),this.commit("mutate")}replace(t){const e=Hn(t);this.checkpoint(),this.building=e,this.commit("replace")}undo(){this.canUndo&&(this.redoStack.push(So(this.building)),this.building=Wl(this.undoStack.pop()),this.commit("undo"))}redo(){this.canRedo&&(this.undoStack.push(So(this.building)),this.building=Wl(this.redoStack.pop()),this.commit("redo"))}commit(t){this.isDraft||(this.isDraft=!0,this.draftOutdated=!1,this.updateStatus()),this.emit(t),clearTimeout(this.saveTimer),this.saveTimer=setTimeout(()=>this.saveDraft(),Wu)}saveDraft(){var e;if(clearTimeout(this.saveTimer),!this.isDraft)return;const t=((e=bo())==null?void 0:e.basedOn)??(this.standard?or(this.standard):null);try{localStorage.setItem(rr,JSON.stringify({basedOn:t,savedAt:new Date().toISOString(),building:this.building})),this.updateStatus()}catch(i){this.setStatus("error",`Entwurf konnte nicht gespeichert werden: ${i.message}`)}}async discardDraft(){clearTimeout(this.saveTimer),await this.loadStandard();try{localStorage.removeItem(rr)}catch{}this.checkpoint(),this.building=structuredClone(this.standard??Hn(ms())),this.isDraft=!1,this.draftOutdated=!1,this.updateStatus(),this.emit("replace")}get matchesStandard(){return!!this.standard&&or(this.building)===or(this.standard)}updateStatus(){this.isDraft?this.setStatus("draft"):this.standardError?this.setStatus("fallback",this.standardError):this.setStatus("standard")}setStatus(t,e=""){this.status={state:t,message:e},this.dispatchEvent(new CustomEvent("status",{detail:this.status}))}emit(t){this.dispatchEvent(new CustomEvent("change",{detail:{source:t}}))}subscribe(t){const e=i=>t(i.detail);return this.addEventListener("change",e),()=>this.removeEventListener("change",e)}on(t,e){const i=s=>e(s.detail);return this.addEventListener(t,i),()=>this.removeEventListener(t,i)}}const wt=new Xu,qu={loading:"Lädt …",standard:"Standard",draft:"Entwurf (nur in diesem Browser)",fallback:"Testgebäude",error:"Entwurf nicht gespeichert"},Eo={standard:()=>`Veröffentlichter Stand aus ${wt.config.standard}`,draft:()=>"Änderungen sind nur in diesem Browser gespeichert. Zum Veröffentlichen im Editor exportieren.",fallback:()=>`Standard-Datei nicht gefunden (${wt.config.standard}) – es wird das Testgebäude gezeigt.`};async function Yu(n,t){const e=document.getElementById("app"),i=document.getElementById("banner");function s(){document.getElementById("building-name").textContent=wt.building.name}function r(){var h;const a=document.getElementById("sync-status"),{state:l,message:c}=wt.status;a.className=`sync-status is-${l}`,a.textContent=qu[l]??l,a.title=[(h=Eo[l])==null?void 0:h.call(Eo),c].filter(Boolean).join(`
`)}function o(){const a=[];wt.isDraft&&wt.draftOutdated?a.push(`
        <div class="banner banner-warn">
          <span>Der <strong>Standard wurde geändert</strong>, seit dein Entwurf begonnen wurde. Dein Entwurf enthält diese Änderungen nicht.</span>
          <button class="btn sm" data-banner="discard">Neuen Standard laden</button>
          <button class="btn sm" data-banner="dismiss">Entwurf behalten</button>
        </div>`):wt.isDraft,wt.status.state==="fallback"&&n==="editor"&&a.push(`
        <div class="banner banner-warn">
          <span>Standard-Datei <strong>${se(wt.config.standard)}</strong> nicht gefunden – es wird das Testgebäude gezeigt.</span>
        </div>`),i.innerHTML=a.join(""),i.hidden=!a.length}i.addEventListener("click",async a=>{var c;const l=(c=a.target.closest("[data-banner]"))==null?void 0:c.dataset.banner;if(l==="discard"){if(!wt.matchesStandard&&!confirm("Entwurf verwerfen und den Standard laden? (Rückgängig ist im Editor möglich)"))return;await wt.discardDraft()}l==="dismiss"&&(wt.draftOutdated=!1),o()}),wt.subscribe(s),wt.on("status",()=>{r(),o()}),e.innerHTML='<div class="app-loading">Lädt …</div>',r(),await wt.init(),s(),r(),e.innerHTML="",t(e),o()}const Xl={door:"Tür",glass:"Glaswand"},Zu=1,bs=.3,Es=.02;function ql(n={}){return{id:Ge("o"),type:"door",x1:0,z1:0,x2:1,z2:0,swing:0,...n}}const ws=n=>Math.hypot(n.x2-n.x1,n.z2-n.z1);function lr(n){const t=ws(n)||1;return[(n.x2-n.x1)/t,(n.z2-n.z1)/t]}function ju(n,[t,e],i,s=[]){let r=null;const o=(a,l,c)=>{var v;const h=Math.hypot(l[0]-a[0],l[1]-a[1]);if(h<1e-6)return;const u=[(l[0]-a[0])/h,(l[1]-a[1])/h],d=Math.min(h,Math.max(0,(t-a[0])*u[0]+(e-a[1])*u[1])),g=Math.hypot(t-(a[0]+u[0]*d),e-(a[1]+u[1]*d)),_=!r||g<r.dist-1e-6||g<r.dist+1e-6&&((v=r.room)==null?void 0:v.type)==="corridor";g<=i&&_&&(r={room:c,p:a,u,len:h,t:d,dist:g})};for(const a of n){const l=mn(a);l.forEach((c,h)=>o(c,l[(h+1)%l.length],a))}for(const a of s)o([a.x1,a.z1],[a.x2,a.z2],null);return r}const Ci=(n,t)=>[n.p[0]+n.u[0]*t,n.p[1]+n.u[1]*t];function wo(n,t){const e=mn(t);return oi(e,[n.x1,n.z1]).dist<Es&&oi(e,[n.x2,n.z2]).dist<Es&&oi(e,[(n.x1+n.x2)/2,(n.z1+n.z2)/2]).dist<Es}const To=(n,t)=>Ol(t,[n.x1,n.z1])<Es&&Ol(t,[n.x2,n.z2])<Es,cr=(n,t)=>t.rooms.some(e=>wo(n,e))||(t.walls??[]).some(e=>To(n,e));function Gn(n,t,e){n.x1=he(n.x1+t),n.z1=he(n.z1+e),n.x2=he(n.x2+t),n.z2=he(n.z2+e)}const he=n=>Math.round(n*1e3)/1e3;/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ao="170",Di={ROTATE:0,DOLLY:1,PAN:2},Li={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ku=0,Yl=1,Ju=2,Zl=1,jl=2,Tn=3,Vn=0,qe=1,An=2,Wn=0,Ii=1,Kl=2,Jl=3,Ql=4,Qu=5,ci=100,td=101,ed=102,nd=103,id=104,sd=200,rd=201,od=202,ad=203,Ro=204,Po=205,ld=206,cd=207,hd=208,ud=209,dd=210,fd=211,pd=212,md=213,gd=214,Co=0,Do=1,Lo=2,Ui=3,Io=4,Uo=5,No=6,zo=7,tc=0,_d=1,xd=2,$n=0,vd=1,Md=2,yd=3,Sd=4,bd=5,Ed=6,wd=7,ec=300,Ni=301,zi=302,Oo=303,Fo=304,hr=306,Bo=1e3,hi=1001,ko=1002,on=1003,Td=1004,ur=1005,gn=1006,Ho=1007,ui=1008,Rn=1009,nc=1010,ic=1011,Ts=1012,Go=1013,di=1014,Pn=1015,As=1016,Vo=1017,Wo=1018,Oi=1020,sc=35902,rc=1021,oc=1022,an=1023,ac=1024,lc=1025,Fi=1026,Bi=1027,cc=1028,$o=1029,hc=1030,Xo=1031,qo=1033,dr=33776,fr=33777,pr=33778,mr=33779,Yo=35840,Zo=35841,jo=35842,Ko=35843,Jo=36196,Qo=37492,ta=37496,ea=37808,na=37809,ia=37810,sa=37811,ra=37812,oa=37813,aa=37814,la=37815,ca=37816,ha=37817,ua=37818,da=37819,fa=37820,pa=37821,gr=36492,ma=36494,ga=36495,uc=36283,_a=36284,xa=36285,va=36286,Ad=3200,Rd=3201,dc=0,Pd=1,Xn="",tn="srgb",ki="srgb-linear",_r="linear",ge="srgb",Hi=7680,fc=519,Cd=512,Dd=513,Ld=514,pc=515,Id=516,Ud=517,Nd=518,zd=519,mc=35044,gc="300 es",Cn=2e3,xr=2001;class fi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let _c=1234567;const Gi=Math.PI/180,Rs=180/Math.PI;function pi(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ke[n&255]+ke[n>>8&255]+ke[n>>16&255]+ke[n>>24&255]+"-"+ke[t&255]+ke[t>>8&255]+"-"+ke[t>>16&15|64]+ke[t>>24&255]+"-"+ke[e&63|128]+ke[e>>8&255]+"-"+ke[e>>16&255]+ke[e>>24&255]+ke[i&255]+ke[i>>8&255]+ke[i>>16&255]+ke[i>>24&255]).toLowerCase()}function ze(n,t,e){return Math.max(t,Math.min(e,n))}function Ma(n,t){return(n%t+t)%t}function Od(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Fd(n,t,e){return n!==t?(e-n)/(t-n):0}function Ps(n,t,e){return(1-e)*n+e*t}function Bd(n,t,e,i){return Ps(n,t,1-Math.exp(-e*i))}function kd(n,t=1){return t-Math.abs(Ma(n,t*2)-t)}function Hd(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Gd(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Vd(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Wd(n,t){return n+Math.random()*(t-n)}function $d(n){return n*(.5-Math.random())}function Xd(n){n!==void 0&&(_c=n);let t=_c+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function qd(n){return n*Gi}function Yd(n){return n*Rs}function Zd(n){return(n&n-1)===0&&n!==0}function jd(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Kd(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Jd(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+i)/2),h=o((t+i)/2),u=r((t-i)/2),d=o((t-i)/2),g=r((i-t)/2),_=o((i-t)/2);switch(s){case"XYX":n.set(a*h,l*u,l*d,a*c);break;case"YZY":n.set(l*d,a*h,l*u,a*c);break;case"ZXZ":n.set(l*u,l*d,a*h,a*c);break;case"XZX":n.set(a*h,l*_,l*g,a*c);break;case"YXY":n.set(l*g,a*h,l*_,a*c);break;case"ZYZ":n.set(l*_,l*g,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Vi(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ve(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Cs={DEG2RAD:Gi,RAD2DEG:Rs,generateUUID:pi,clamp:ze,euclideanModulo:Ma,mapLinear:Od,inverseLerp:Fd,lerp:Ps,damp:Bd,pingpong:kd,smoothstep:Hd,smootherstep:Gd,randInt:Vd,randFloat:Wd,randFloatSpread:$d,seededRandom:Xd,degToRad:qd,radToDeg:Yd,isPowerOfTwo:Zd,ceilPowerOfTwo:jd,floorPowerOfTwo:Kd,setQuaternionFromProperEuler:Jd,normalize:Ve,denormalize:Vi};class xt{constructor(t=0,e=0){xt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ze(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class te{constructor(t,e,i,s,r,o,a,l,c){te.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],g=i[5],_=i[8],v=s[0],m=s[3],p=s[6],P=s[1],w=s[4],M=s[7],F=s[2],T=s[5],I=s[8];return r[0]=o*v+a*P+l*F,r[3]=o*m+a*w+l*T,r[6]=o*p+a*M+l*I,r[1]=c*v+h*P+u*F,r[4]=c*m+h*w+u*T,r[7]=c*p+h*M+u*I,r[2]=d*v+g*P+_*F,r[5]=d*m+g*w+_*T,r[8]=d*p+g*M+_*I,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*r*h+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,g=c*r-o*l,_=e*u+i*d+s*g;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return t[0]=u*v,t[1]=(s*c-h*i)*v,t[2]=(a*i-s*o)*v,t[3]=d*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-a*e)*v,t[6]=g*v,t[7]=(i*l-c*e)*v,t[8]=(o*e-i*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ya.makeScale(t,e)),this}rotate(t){return this.premultiply(ya.makeRotation(-t)),this}translate(t,e){return this.premultiply(ya.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ya=new te;function xc(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function vr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Qd(){const n=vr("canvas");return n.style.display="block",n}const vc={};function Ds(n){n in vc||(vc[n]=!0,console.warn(n))}function tf(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function ef(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function nf(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ue={enabled:!0,workingColorSpace:ki,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ge&&(n.r=Dn(n.r),n.g=Dn(n.g),n.b=Dn(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ge&&(n.r=Wi(n.r),n.g=Wi(n.g),n.b=Wi(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Xn?_r:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Dn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Wi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const Mc=[.64,.33,.3,.6,.15,.06],yc=[.2126,.7152,.0722],Sc=[.3127,.329],bc=new te().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ec=new te().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ue.define({[ki]:{primaries:Mc,whitePoint:Sc,transfer:_r,toXYZ:bc,fromXYZ:Ec,luminanceCoefficients:yc,workingColorSpaceConfig:{unpackColorSpace:tn},outputColorSpaceConfig:{drawingBufferColorSpace:tn}},[tn]:{primaries:Mc,whitePoint:Sc,transfer:ge,toXYZ:bc,fromXYZ:Ec,luminanceCoefficients:yc,outputColorSpaceConfig:{drawingBufferColorSpace:tn}}});let $i;class sf{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{$i===void 0&&($i=vr("canvas")),$i.width=t.width,$i.height=t.height;const i=$i.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=$i}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=vr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Dn(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Dn(e[i]/255)*255):e[i]=Dn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let rf=0;class wc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:rf++}),this.uuid=pi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Sa(s[o].image)):r.push(Sa(s[o]))}else r=Sa(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function Sa(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?sf.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let of=0;class Ye extends fi{constructor(t=Ye.DEFAULT_IMAGE,e=Ye.DEFAULT_MAPPING,i=hi,s=hi,r=gn,o=ui,a=an,l=Rn,c=Ye.DEFAULT_ANISOTROPY,h=Xn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:of++}),this.uuid=pi(),this.name="",this.source=new wc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new xt(0,0),this.repeat=new xt(1,1),this.center=new xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new te,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==ec)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Bo:t.x=t.x-Math.floor(t.x);break;case hi:t.x=t.x<0?0:1;break;case ko:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Bo:t.y=t.y-Math.floor(t.y);break;case hi:t.y=t.y<0?0:1;break;case ko:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ye.DEFAULT_IMAGE=null,Ye.DEFAULT_MAPPING=ec,Ye.DEFAULT_ANISOTROPY=1;class Te{constructor(t=0,e=0,i=0,s=1){Te.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],g=l[5],_=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(_+m)<.1&&Math.abs(c+g+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(c+1)/2,M=(g+1)/2,F=(p+1)/2,T=(h+d)/4,I=(u+v)/4,N=(_+m)/4;return w>M&&w>F?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=T/i,r=I/i):M>F?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=T/s,r=N/s):F<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(F),i=I/r,s=N/r),this.set(i,s,r,e),this}let P=Math.sqrt((m-_)*(m-_)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(P)<.001&&(P=1),this.x=(m-_)/P,this.y=(u-v)/P,this.z=(d-h)/P,this.w=Math.acos((c+g+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class af extends fi{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Te(0,0,t,e),this.scissorTest=!1,this.viewport=new Te(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Ye(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new wc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mi extends af{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class Tc extends Ye{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class lf extends Ye{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class gi{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3];const d=r[o+0],g=r[o+1],_=r[o+2],v=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=g,t[e+2]=_,t[e+3]=v;return}if(u!==v||l!==d||c!==g||h!==_){let m=1-a;const p=l*d+c*g+h*_+u*v,P=p>=0?1:-1,w=1-p*p;if(w>Number.EPSILON){const F=Math.sqrt(w),T=Math.atan2(F,p*P);m=Math.sin(m*T)/F,a=Math.sin(a*T)/F}const M=a*P;if(l=l*m+d*M,c=c*m+g*M,h=h*m+_*M,u=u*m+v*M,m===1-a){const F=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=F,c*=F,h*=F,u*=F}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[o],d=r[o+1],g=r[o+2],_=r[o+3];return t[e]=a*_+h*u+l*g-c*d,t[e+1]=l*_+h*d+c*u-a*g,t[e+2]=c*_+h*g+a*d-l*u,t[e+3]=h*_-a*u-l*d-c*g,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(s/2),u=a(r/2),d=l(i/2),g=l(s/2),_=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*g*_,this._y=c*g*u-d*h*_,this._z=c*h*_+d*g*u,this._w=c*h*u-d*g*_;break;case"YXZ":this._x=d*h*u+c*g*_,this._y=c*g*u-d*h*_,this._z=c*h*_-d*g*u,this._w=c*h*u+d*g*_;break;case"ZXY":this._x=d*h*u-c*g*_,this._y=c*g*u+d*h*_,this._z=c*h*_+d*g*u,this._w=c*h*u-d*g*_;break;case"ZYX":this._x=d*h*u-c*g*_,this._y=c*g*u+d*h*_,this._z=c*h*_-d*g*u,this._w=c*h*u+d*g*_;break;case"YZX":this._x=d*h*u+c*g*_,this._y=c*g*u+d*h*_,this._z=c*h*_-d*g*u,this._w=c*h*u-d*g*_;break;case"XZY":this._x=d*h*u-c*g*_,this._y=c*g*u-d*h*_,this._z=c*h*_+d*g*u,this._w=c*h*u+d*g*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=i+a+u;if(d>0){const g=.5/Math.sqrt(d+1);this._w=.25/g,this._x=(h-l)*g,this._y=(r-c)*g,this._z=(o-s)*g}else if(i>a&&i>u){const g=2*Math.sqrt(1+i-a-u);this._w=(h-l)/g,this._x=.25*g,this._y=(s+o)/g,this._z=(r+c)/g}else if(a>u){const g=2*Math.sqrt(1+a-i-u);this._w=(r-c)/g,this._x=(s+o)/g,this._y=.25*g,this._z=(l+h)/g}else{const g=2*Math.sqrt(1+u-i-a);this._w=(o-s)/g,this._x=(r+c)/g,this._y=(l+h)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ze(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-s*a,this._w=o*h-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const g=1-e;return this._w=g*o+e*this._w,this._x=g*i+e*this._x,this._y=g*s+e*this._y,this._z=g*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=i*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(t=0,e=0,i=0){O.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ac.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ac.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),h=2*(a*e-r*s),u=2*(r*i-o*e);return this.x=e+l*c+o*u-a*h,this.y=i+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return ba.copy(this).projectOnVector(t),this.sub(ba)}reflect(t){return this.sub(ba.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(ze(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ba=new O,Ac=new gi;class _i{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,ln):ln.fromBufferAttribute(r,o),ln.applyMatrix4(t.matrixWorld),this.expandByPoint(ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Mr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Mr.copy(i.boundingBox)),Mr.applyMatrix4(t.matrixWorld),this.union(Mr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ln),ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ls),yr.subVectors(this.max,Ls),Xi.subVectors(t.a,Ls),qi.subVectors(t.b,Ls),Yi.subVectors(t.c,Ls),qn.subVectors(qi,Xi),Yn.subVectors(Yi,qi),xi.subVectors(Xi,Yi);let e=[0,-qn.z,qn.y,0,-Yn.z,Yn.y,0,-xi.z,xi.y,qn.z,0,-qn.x,Yn.z,0,-Yn.x,xi.z,0,-xi.x,-qn.y,qn.x,0,-Yn.y,Yn.x,0,-xi.y,xi.x,0];return!Ea(e,Xi,qi,Yi,yr)||(e=[1,0,0,0,1,0,0,0,1],!Ea(e,Xi,qi,Yi,yr))?!1:(Sr.crossVectors(qn,Yn),e=[Sr.x,Sr.y,Sr.z],Ea(e,Xi,qi,Yi,yr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ln),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Ln=[new O,new O,new O,new O,new O,new O,new O,new O],ln=new O,Mr=new _i,Xi=new O,qi=new O,Yi=new O,qn=new O,Yn=new O,xi=new O,Ls=new O,yr=new O,Sr=new O,vi=new O;function Ea(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){vi.fromArray(n,r);const a=s.x*Math.abs(vi.x)+s.y*Math.abs(vi.y)+s.z*Math.abs(vi.z),l=t.dot(vi),c=e.dot(vi),h=i.dot(vi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const cf=new _i,Is=new O,wa=new O;class br{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):cf.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Is.subVectors(t,this.center);const e=Is.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Is,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(wa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Is.copy(t.center).add(wa)),this.expandByPoint(Is.copy(t.center).sub(wa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const In=new O,Ta=new O,Er=new O,Zn=new O,Aa=new O,wr=new O,Ra=new O;class Tr{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,In)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=In.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(In.copy(this.origin).addScaledVector(this.direction,e),In.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Ta.copy(t).add(e).multiplyScalar(.5),Er.copy(e).sub(t).normalize(),Zn.copy(this.origin).sub(Ta);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Er),a=Zn.dot(this.direction),l=-Zn.dot(Er),c=Zn.lengthSq(),h=Math.abs(1-o*o);let u,d,g,_;if(h>0)if(u=o*l-a,d=o*a-l,_=r*h,u>=0)if(d>=-_)if(d<=_){const v=1/h;u*=v,d*=v,g=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),g=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),g=-u*u+d*(d+2*l)+c;else d<=-_?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),g=-u*u+d*(d+2*l)+c):d<=_?(u=0,d=Math.min(Math.max(-r,-l),r),g=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),g=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),g=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ta).addScaledVector(Er,d),g}intersectSphere(t,e){In.subVectors(t.center,this.origin);const i=In.dot(this.direction),s=In.dot(In)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(i=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,In)!==null}intersectTriangle(t,e,i,s,r){Aa.subVectors(e,t),wr.subVectors(i,t),Ra.crossVectors(Aa,wr);let o=this.direction.dot(Ra),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Zn.subVectors(this.origin,t);const l=a*this.direction.dot(wr.crossVectors(Zn,wr));if(l<0)return null;const c=a*this.direction.dot(Aa.cross(Zn));if(c<0||l+c>o)return null;const h=-a*Zn.dot(Ra);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Me{constructor(t,e,i,s,r,o,a,l,c,h,u,d,g,_,v,m){Me.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,h,u,d,g,_,v,m)}set(t,e,i,s,r,o,a,l,c,h,u,d,g,_,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=g,p[7]=_,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Me().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/Zi.setFromMatrixColumn(t,0).length(),r=1/Zi.setFromMatrixColumn(t,1).length(),o=1/Zi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,g=o*u,_=a*h,v=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=g+_*c,e[5]=d-v*c,e[9]=-a*l,e[2]=v-d*c,e[6]=_+g*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,g=l*u,_=c*h,v=c*u;e[0]=d+v*a,e[4]=_*a-g,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=g*a-_,e[6]=v+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,g=l*u,_=c*h,v=c*u;e[0]=d-v*a,e[4]=-o*u,e[8]=_+g*a,e[1]=g+_*a,e[5]=o*h,e[9]=v-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,g=o*u,_=a*h,v=a*u;e[0]=l*h,e[4]=_*c-g,e[8]=d*c+v,e[1]=l*u,e[5]=v*c+d,e[9]=g*c-_,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,g=o*c,_=a*l,v=a*c;e[0]=l*h,e[4]=v-d*u,e[8]=_*u+g,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=g*u+_,e[10]=d-v*u}else if(t.order==="XZY"){const d=o*l,g=o*c,_=a*l,v=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+v,e[5]=o*h,e[9]=g*u-_,e[2]=_*u-g,e[6]=a*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(hf,t,uf)}lookAt(t,e,i){const s=this.elements;return Ke.subVectors(t,e),Ke.lengthSq()===0&&(Ke.z=1),Ke.normalize(),jn.crossVectors(i,Ke),jn.lengthSq()===0&&(Math.abs(i.z)===1?Ke.x+=1e-4:Ke.z+=1e-4,Ke.normalize(),jn.crossVectors(i,Ke)),jn.normalize(),Ar.crossVectors(Ke,jn),s[0]=jn.x,s[4]=Ar.x,s[8]=Ke.x,s[1]=jn.y,s[5]=Ar.y,s[9]=Ke.y,s[2]=jn.z,s[6]=Ar.z,s[10]=Ke.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],g=i[13],_=i[2],v=i[6],m=i[10],p=i[14],P=i[3],w=i[7],M=i[11],F=i[15],T=s[0],I=s[4],N=s[8],A=s[12],b=s[1],U=s[5],J=s[9],$=s[13],Z=s[2],rt=s[6],X=s[10],ht=s[14],j=s[3],st=s[7],at=s[11],Ct=s[15];return r[0]=o*T+a*b+l*Z+c*j,r[4]=o*I+a*U+l*rt+c*st,r[8]=o*N+a*J+l*X+c*at,r[12]=o*A+a*$+l*ht+c*Ct,r[1]=h*T+u*b+d*Z+g*j,r[5]=h*I+u*U+d*rt+g*st,r[9]=h*N+u*J+d*X+g*at,r[13]=h*A+u*$+d*ht+g*Ct,r[2]=_*T+v*b+m*Z+p*j,r[6]=_*I+v*U+m*rt+p*st,r[10]=_*N+v*J+m*X+p*at,r[14]=_*A+v*$+m*ht+p*Ct,r[3]=P*T+w*b+M*Z+F*j,r[7]=P*I+w*U+M*rt+F*st,r[11]=P*N+w*J+M*X+F*at,r[15]=P*A+w*$+M*ht+F*Ct,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],g=t[14],_=t[3],v=t[7],m=t[11],p=t[15];return _*(+r*l*u-s*c*u-r*a*d+i*c*d+s*a*g-i*l*g)+v*(+e*l*g-e*c*d+r*o*d-s*o*g+s*c*h-r*l*h)+m*(+e*c*u-e*a*g-r*o*u+i*o*g+r*a*h-i*c*h)+p*(-s*a*h-e*l*u+e*a*d+s*o*u-i*o*d+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],g=t[11],_=t[12],v=t[13],m=t[14],p=t[15],P=u*m*c-v*d*c+v*l*g-a*m*g-u*l*p+a*d*p,w=_*d*c-h*m*c-_*l*g+o*m*g+h*l*p-o*d*p,M=h*v*c-_*u*c+_*a*g-o*v*g-h*a*p+o*u*p,F=_*u*l-h*v*l-_*a*d+o*v*d+h*a*m-o*u*m,T=e*P+i*w+s*M+r*F;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/T;return t[0]=P*I,t[1]=(v*d*r-u*m*r-v*s*g+i*m*g+u*s*p-i*d*p)*I,t[2]=(a*m*r-v*l*r+v*s*c-i*m*c-a*s*p+i*l*p)*I,t[3]=(u*l*r-a*d*r-u*s*c+i*d*c+a*s*g-i*l*g)*I,t[4]=w*I,t[5]=(h*m*r-_*d*r+_*s*g-e*m*g-h*s*p+e*d*p)*I,t[6]=(_*l*r-o*m*r-_*s*c+e*m*c+o*s*p-e*l*p)*I,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*g+e*l*g)*I,t[8]=M*I,t[9]=(_*u*r-h*v*r-_*i*g+e*v*g+h*i*p-e*u*p)*I,t[10]=(o*v*r-_*a*r+_*i*c-e*v*c-o*i*p+e*a*p)*I,t[11]=(h*a*r-o*u*r-h*i*c+e*u*c+o*i*g-e*a*g)*I,t[12]=F*I,t[13]=(h*v*s-_*u*s+_*i*d-e*v*d-h*i*m+e*u*m)*I,t[14]=(_*a*s-o*v*s-_*i*l+e*v*l+o*i*m-e*a*m)*I,t[15]=(o*u*s-h*a*s+h*i*l-e*u*l-o*i*d+e*a*d)*I,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+i,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,g=r*h,_=r*u,v=o*h,m=o*u,p=a*u,P=l*c,w=l*h,M=l*u,F=i.x,T=i.y,I=i.z;return s[0]=(1-(v+p))*F,s[1]=(g+M)*F,s[2]=(_-w)*F,s[3]=0,s[4]=(g-M)*T,s[5]=(1-(d+p))*T,s[6]=(m+P)*T,s[7]=0,s[8]=(_+w)*I,s[9]=(m-P)*I,s[10]=(1-(d+v))*I,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=Zi.set(s[0],s[1],s[2]).length();const o=Zi.set(s[4],s[5],s[6]).length(),a=Zi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],cn.copy(this);const c=1/r,h=1/o,u=1/a;return cn.elements[0]*=c,cn.elements[1]*=c,cn.elements[2]*=c,cn.elements[4]*=h,cn.elements[5]*=h,cn.elements[6]*=h,cn.elements[8]*=u,cn.elements[9]*=u,cn.elements[10]*=u,e.setFromRotationMatrix(cn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=Cn){const l=this.elements,c=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),d=(i+s)/(i-s);let g,_;if(a===Cn)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===xr)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=Cn){const l=this.elements,c=1/(e-t),h=1/(i-s),u=1/(o-r),d=(e+t)*c,g=(i+s)*h;let _,v;if(a===Cn)_=(o+r)*u,v=-2*u;else if(a===xr)_=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-g,l[2]=0,l[6]=0,l[10]=v,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Zi=new O,cn=new Me,hf=new O(0,0,0),uf=new O(1,1,1),jn=new O,Ar=new O,Ke=new O,Rc=new Me,Pc=new gi;class _n{constructor(t=0,e=0,i=0,s=_n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],g=s[10];switch(e){case"XYZ":this._y=Math.asin(ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,g),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,g),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ze(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,g),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,g));break;case"XZY":this._z=Math.asin(-ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Rc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Rc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Pc.setFromEuler(this),this.setFromQuaternion(Pc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_n.DEFAULT_ORDER="XYZ";class Pa{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let df=0;const Cc=new O,ji=new gi,Un=new Me,Rr=new O,Us=new O,ff=new O,pf=new gi,Dc=new O(1,0,0),Lc=new O(0,1,0),Ic=new O(0,0,1),Uc={type:"added"},mf={type:"removed"},Ki={type:"childadded",child:null},Ca={type:"childremoved",child:null};class Pe extends fi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:df++}),this.uuid=pi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pe.DEFAULT_UP.clone();const t=new O,e=new _n,i=new gi,s=new O(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Me},normalMatrix:{value:new te}}),this.matrix=new Me,this.matrixWorld=new Me,this.matrixAutoUpdate=Pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ji.setFromAxisAngle(t,e),this.quaternion.multiply(ji),this}rotateOnWorldAxis(t,e){return ji.setFromAxisAngle(t,e),this.quaternion.premultiply(ji),this}rotateX(t){return this.rotateOnAxis(Dc,t)}rotateY(t){return this.rotateOnAxis(Lc,t)}rotateZ(t){return this.rotateOnAxis(Ic,t)}translateOnAxis(t,e){return Cc.copy(t).applyQuaternion(this.quaternion),this.position.add(Cc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Dc,t)}translateY(t){return this.translateOnAxis(Lc,t)}translateZ(t){return this.translateOnAxis(Ic,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Rr.copy(t):Rr.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Us.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(Us,Rr,this.up):Un.lookAt(Rr,Us,this.up),this.quaternion.setFromRotationMatrix(Un),s&&(Un.extractRotation(s.matrixWorld),ji.setFromRotationMatrix(Un),this.quaternion.premultiply(ji.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Uc),Ki.child=t,this.dispatchEvent(Ki),Ki.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(mf),Ca.child=t,this.dispatchEvent(Ca),Ca.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Un.multiply(t.parent.matrixWorld)),t.applyMatrix4(Un),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Uc),Ki.child=t,this.dispatchEvent(Ki),Ki.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Us,t,ff),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Us,pf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),g=o(t.animations),_=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),g.length>0&&(i.animations=g),_.length>0&&(i.nodes=_)}return i.object=s,i;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Pe.DEFAULT_UP=new O(0,1,0),Pe.DEFAULT_MATRIX_AUTO_UPDATE=!0,Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const hn=new O,Nn=new O,Da=new O,zn=new O,Ji=new O,Qi=new O,Nc=new O,La=new O,Ia=new O,Ua=new O,Na=new Te,za=new Te,Oa=new Te;class en{constructor(t=new O,e=new O,i=new O){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),hn.subVectors(t,e),s.cross(hn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){hn.subVectors(s,e),Nn.subVectors(i,e),Da.subVectors(t,e);const o=hn.dot(hn),a=hn.dot(Nn),l=hn.dot(Da),c=Nn.dot(Nn),h=Nn.dot(Da),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,g=(c*l-a*h)*d,_=(o*h-a*l)*d;return r.set(1-g-_,_,g)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,zn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,zn.x),l.addScaledVector(o,zn.y),l.addScaledVector(a,zn.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return Na.setScalar(0),za.setScalar(0),Oa.setScalar(0),Na.fromBufferAttribute(t,e),za.fromBufferAttribute(t,i),Oa.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Na,r.x),o.addScaledVector(za,r.y),o.addScaledVector(Oa,r.z),o}static isFrontFacing(t,e,i,s){return hn.subVectors(i,e),Nn.subVectors(t,e),hn.cross(Nn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return hn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),hn.cross(Nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return en.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return en.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return en.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return en.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return en.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;Ji.subVectors(s,i),Qi.subVectors(r,i),La.subVectors(t,i);const l=Ji.dot(La),c=Qi.dot(La);if(l<=0&&c<=0)return e.copy(i);Ia.subVectors(t,s);const h=Ji.dot(Ia),u=Qi.dot(Ia);if(h>=0&&u<=h)return e.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(Ji,o);Ua.subVectors(t,r);const g=Ji.dot(Ua),_=Qi.dot(Ua);if(_>=0&&g<=_)return e.copy(r);const v=g*c-l*_;if(v<=0&&c>=0&&_<=0)return a=c/(c-_),e.copy(i).addScaledVector(Qi,a);const m=h*_-g*u;if(m<=0&&u-h>=0&&g-_>=0)return Nc.subVectors(r,s),a=(u-h)/(u-h+(g-_)),e.copy(s).addScaledVector(Nc,a);const p=1/(m+v+d);return o=v*p,a=d*p,e.copy(i).addScaledVector(Ji,o).addScaledVector(Qi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const zc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kn={h:0,s:0,l:0},Pr={h:0,s:0,l:0};function Fa(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class ae{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=tn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ue.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=ue.workingColorSpace){return this.r=t,this.g=e,this.b=i,ue.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=ue.workingColorSpace){if(t=Ma(t,1),e=ze(e,0,1),i=ze(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Fa(o,r,t+1/3),this.g=Fa(o,r,t),this.b=Fa(o,r,t-1/3)}return ue.toWorkingColorSpace(this,s),this}setStyle(t,e=tn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=tn){const i=zc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Dn(t.r),this.g=Dn(t.g),this.b=Dn(t.b),this}copyLinearToSRGB(t){return this.r=Wi(t.r),this.g=Wi(t.g),this.b=Wi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=tn){return ue.fromWorkingColorSpace(He.copy(this),t),Math.round(ze(He.r*255,0,255))*65536+Math.round(ze(He.g*255,0,255))*256+Math.round(ze(He.b*255,0,255))}getHexString(t=tn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ue.workingColorSpace){ue.fromWorkingColorSpace(He.copy(this),e);const i=He.r,s=He.g,r=He.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ue.workingColorSpace){return ue.fromWorkingColorSpace(He.copy(this),e),t.r=He.r,t.g=He.g,t.b=He.b,t}getStyle(t=tn){ue.fromWorkingColorSpace(He.copy(this),t);const e=He.r,i=He.g,s=He.b;return t!==tn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Kn),this.setHSL(Kn.h+t,Kn.s+e,Kn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Kn),t.getHSL(Pr);const i=Ps(Kn.h,Pr.h,e),s=Ps(Kn.s,Pr.s,e),r=Ps(Kn.l,Pr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const He=new ae;ae.NAMES=zc;let gf=0;class ts extends fi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gf++}),this.uuid=pi(),this.name="",this.blending=Ii,this.side=Vn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ro,this.blendDst=Po,this.blendEquation=ci,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ae(0,0,0),this.blendAlpha=0,this.depthFunc=Ui,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=fc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hi,this.stencilZFail=Hi,this.stencilZPass=Hi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ii&&(i.blending=this.blending),this.side!==Vn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ro&&(i.blendSrc=this.blendSrc),this.blendDst!==Po&&(i.blendDst=this.blendDst),this.blendEquation!==ci&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ui&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==fc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Hi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Hi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ba extends ts{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.combine=tc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Re=new O,Cr=new xt;class un{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=mc,this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Cr.fromBufferAttribute(this,e),Cr.applyMatrix3(t),this.setXY(e,Cr.x,Cr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix3(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Re.fromBufferAttribute(this,e),Re.applyMatrix4(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Re.fromBufferAttribute(this,e),Re.applyNormalMatrix(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Re.fromBufferAttribute(this,e),Re.transformDirection(t),this.setXYZ(e,Re.x,Re.y,Re.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Vi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ve(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Vi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Vi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Vi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Vi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ve(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),i=Ve(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),i=Ve(i,this.array),s=Ve(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Ve(e,this.array),i=Ve(i,this.array),s=Ve(s,this.array),r=Ve(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==mc&&(t.usage=this.usage),t}}class Oc extends un{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Fc extends un{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Be extends un{constructor(t,e,i){super(new Float32Array(t),e,i)}}let _f=0;const nn=new Me,ka=new Pe,es=new O,Je=new _i,Ns=new _i,Oe=new O;class Qe extends fi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_f++}),this.uuid=pi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(xc(t)?Fc:Oc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new te().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return nn.makeRotationFromQuaternion(t),this.applyMatrix4(nn),this}rotateX(t){return nn.makeRotationX(t),this.applyMatrix4(nn),this}rotateY(t){return nn.makeRotationY(t),this.applyMatrix4(nn),this}rotateZ(t){return nn.makeRotationZ(t),this.applyMatrix4(nn),this}translate(t,e,i){return nn.makeTranslation(t,e,i),this.applyMatrix4(nn),this}scale(t,e,i){return nn.makeScale(t,e,i),this.applyMatrix4(nn),this}lookAt(t){return ka.lookAt(t),ka.updateMatrix(),this.applyMatrix4(ka.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(es).negate(),this.translate(es.x,es.y,es.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Be(i,3))}else{for(let i=0,s=e.count;i<s;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _i);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];Je.setFromBufferAttribute(r),this.morphTargetsRelative?(Oe.addVectors(this.boundingBox.min,Je.min),this.boundingBox.expandByPoint(Oe),Oe.addVectors(this.boundingBox.max,Je.max),this.boundingBox.expandByPoint(Oe)):(this.boundingBox.expandByPoint(Je.min),this.boundingBox.expandByPoint(Je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new br);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){const i=this.boundingSphere.center;if(Je.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Ns.setFromBufferAttribute(a),this.morphTargetsRelative?(Oe.addVectors(Je.min,Ns.min),Je.expandByPoint(Oe),Oe.addVectors(Je.max,Ns.max),Je.expandByPoint(Oe)):(Je.expandByPoint(Ns.min),Je.expandByPoint(Ns.max))}Je.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Oe.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Oe));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Oe.fromBufferAttribute(a,c),l&&(es.fromBufferAttribute(t,c),Oe.add(es)),s=Math.max(s,i.distanceToSquared(Oe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new un(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let N=0;N<i.count;N++)a[N]=new O,l[N]=new O;const c=new O,h=new O,u=new O,d=new xt,g=new xt,_=new xt,v=new O,m=new O;function p(N,A,b){c.fromBufferAttribute(i,N),h.fromBufferAttribute(i,A),u.fromBufferAttribute(i,b),d.fromBufferAttribute(r,N),g.fromBufferAttribute(r,A),_.fromBufferAttribute(r,b),h.sub(c),u.sub(c),g.sub(d),_.sub(d);const U=1/(g.x*_.y-_.x*g.y);isFinite(U)&&(v.copy(h).multiplyScalar(_.y).addScaledVector(u,-g.y).multiplyScalar(U),m.copy(u).multiplyScalar(g.x).addScaledVector(h,-_.x).multiplyScalar(U),a[N].add(v),a[A].add(v),a[b].add(v),l[N].add(m),l[A].add(m),l[b].add(m))}let P=this.groups;P.length===0&&(P=[{start:0,count:t.count}]);for(let N=0,A=P.length;N<A;++N){const b=P[N],U=b.start,J=b.count;for(let $=U,Z=U+J;$<Z;$+=3)p(t.getX($+0),t.getX($+1),t.getX($+2))}const w=new O,M=new O,F=new O,T=new O;function I(N){F.fromBufferAttribute(s,N),T.copy(F);const A=a[N];w.copy(A),w.sub(F.multiplyScalar(F.dot(A))).normalize(),M.crossVectors(T,A);const U=M.dot(l[N])<0?-1:1;o.setXYZW(N,w.x,w.y,w.z,U)}for(let N=0,A=P.length;N<A;++N){const b=P[N],U=b.start,J=b.count;for(let $=U,Z=U+J;$<Z;$+=3)I(t.getX($+0)),I(t.getX($+1)),I(t.getX($+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new un(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,g=i.count;d<g;d++)i.setXYZ(d,0,0,0);const s=new O,r=new O,o=new O,a=new O,l=new O,c=new O,h=new O,u=new O;if(t)for(let d=0,g=t.count;d<g;d+=3){const _=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,_),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(_,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,g=e.count;d<g;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Oe.fromBufferAttribute(t,e),Oe.normalize(),t.setXYZ(e,Oe.x,Oe.y,Oe.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let g=0,_=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?g=l[v]*a.data.stride+a.offset:g=l[v]*h;for(let p=0;p<h;p++)d[_++]=c[g++]}return new un(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Qe,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],g=t(d,i);l.push(g)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const g=c[u];h.push(g.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,g=u.length;d<g;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Bc=new Me,Mi=new Tr,Dr=new br,kc=new O,Lr=new O,Ir=new O,Ur=new O,Ha=new O,Nr=new O,Hc=new O,zr=new O;class be extends Pe{constructor(t=new Qe,e=new Ba){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Nr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(Ha.fromBufferAttribute(u,t),o?Nr.addScaledVector(Ha,h):Nr.addScaledVector(Ha.sub(e),h))}e.add(Nr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Dr.copy(i.boundingSphere),Dr.applyMatrix4(r),Mi.copy(t.ray).recast(t.near),!(Dr.containsPoint(Mi.origin)===!1&&(Mi.intersectSphere(Dr,kc)===null||Mi.origin.distanceToSquared(kc)>(t.far-t.near)**2))&&(Bc.copy(r).invert(),Mi.copy(t.ray).applyMatrix4(Bc),!(i.boundingBox!==null&&Mi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Mi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,g=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,v=d.length;_<v;_++){const m=d[_],p=o[m.materialIndex],P=Math.max(m.start,g.start),w=Math.min(a.count,Math.min(m.start+m.count,g.start+g.count));for(let M=P,F=w;M<F;M+=3){const T=a.getX(M),I=a.getX(M+1),N=a.getX(M+2);s=Or(this,p,t,i,c,h,u,T,I,N),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const _=Math.max(0,g.start),v=Math.min(a.count,g.start+g.count);for(let m=_,p=v;m<p;m+=3){const P=a.getX(m),w=a.getX(m+1),M=a.getX(m+2);s=Or(this,o,t,i,c,h,u,P,w,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,v=d.length;_<v;_++){const m=d[_],p=o[m.materialIndex],P=Math.max(m.start,g.start),w=Math.min(l.count,Math.min(m.start+m.count,g.start+g.count));for(let M=P,F=w;M<F;M+=3){const T=M,I=M+1,N=M+2;s=Or(this,p,t,i,c,h,u,T,I,N),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const _=Math.max(0,g.start),v=Math.min(l.count,g.start+g.count);for(let m=_,p=v;m<p;m+=3){const P=m,w=m+1,M=m+2;s=Or(this,o,t,i,c,h,u,P,w,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function xf(n,t,e,i,s,r,o,a){let l;if(t.side===qe?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===Vn,a),l===null)return null;zr.copy(a),zr.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(zr);return c<e.near||c>e.far?null:{distance:c,point:zr.clone(),object:n}}function Or(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,Lr),n.getVertexPosition(l,Ir),n.getVertexPosition(c,Ur);const h=xf(n,t,e,i,Lr,Ir,Ur,Hc);if(h){const u=new O;en.getBarycoord(Hc,Lr,Ir,Ur,u),s&&(h.uv=en.getInterpolatedAttribute(s,a,l,c,u,new xt)),r&&(h.uv1=en.getInterpolatedAttribute(r,a,l,c,u,new xt)),o&&(h.normal=en.getInterpolatedAttribute(o,a,l,c,u,new O),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new O,materialIndex:0};en.getNormal(Lr,Ir,Ur,d.normal),h.face=d,h.barycoord=u}return h}class dn extends Qe{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,g=0;_("z","y","x",-1,-1,i,e,t,o,r,0),_("z","y","x",1,-1,i,e,-t,o,r,1),_("x","z","y",1,1,t,i,e,s,o,2),_("x","z","y",1,-1,t,i,-e,s,o,3),_("x","y","z",1,-1,t,e,i,s,r,4),_("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Be(c,3)),this.setAttribute("normal",new Be(h,3)),this.setAttribute("uv",new Be(u,2));function _(v,m,p,P,w,M,F,T,I,N,A){const b=M/I,U=F/N,J=M/2,$=F/2,Z=T/2,rt=I+1,X=N+1;let ht=0,j=0;const st=new O;for(let at=0;at<X;at++){const Ct=at*U-$;for(let Kt=0;Kt<rt;Kt++){const de=Kt*b-J;st[v]=de*P,st[m]=Ct*w,st[p]=Z,c.push(st.x,st.y,st.z),st[v]=0,st[m]=0,st[p]=T>0?1:-1,h.push(st.x,st.y,st.z),u.push(Kt/I),u.push(1-at/N),ht+=1}}for(let at=0;at<N;at++)for(let Ct=0;Ct<I;Ct++){const Kt=d+Ct+rt*at,de=d+Ct+rt*(at+1),it=d+(Ct+1)+rt*(at+1),_t=d+(Ct+1)+rt*at;l.push(Kt,de,_t),l.push(de,it,_t),j+=6}a.addGroup(g,j,A),g+=j,d+=ht}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ns(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function We(n){const t={};for(let e=0;e<n.length;e++){const i=ns(n[e]);for(const s in i)t[s]=i[s]}return t}function vf(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Gc(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ue.workingColorSpace}const Mf={clone:ns,merge:We};var yf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Jn extends ts{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yf,this.fragmentShader=Sf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ns(t.uniforms),this.uniformsGroups=vf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Vc extends Pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Me,this.projectionMatrix=new Me,this.projectionMatrixInverse=new Me,this.coordinateSystem=Cn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Qn=new O,Wc=new xt,$c=new xt;class sn extends Vc{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Rs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Gi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Rs*2*Math.atan(Math.tan(Gi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z),Qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Qn.x,Qn.y).multiplyScalar(-t/Qn.z)}getViewSize(t,e){return this.getViewBounds(t,Wc,$c),e.subVectors($c,Wc)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Gi*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const is=-90,ss=1;class bf extends Pe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new sn(is,ss,t,e);s.layers=this.layers,this.add(s);const r=new sn(is,ss,t,e);r.layers=this.layers,this.add(r);const o=new sn(is,ss,t,e);o.layers=this.layers,this.add(o);const a=new sn(is,ss,t,e);a.layers=this.layers,this.add(a);const l=new sn(is,ss,t,e);l.layers=this.layers,this.add(l);const c=new sn(is,ss,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===Cn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===xr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),g=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,d,g),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Xc extends Ye{constructor(t,e,i,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Ni,super(t,e,i,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ef extends mi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Xc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:gn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new dn(5,5,5),r=new Jn({name:"CubemapFromEquirect",uniforms:ns(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:qe,blending:Wn});r.uniforms.tEquirect.value=e;const o=new be(s,r),a=e.minFilter;return e.minFilter===ui&&(e.minFilter=gn),new bf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}const Ga=new O,wf=new O,Tf=new te;class ti{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Ga.subVectors(i,e).cross(wf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Ga),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||Tf.getNormalMatrix(t),s=this.coplanarPoint(Ga).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const yi=new br,Fr=new O;class Va{constructor(t=new ti,e=new ti,i=new ti,s=new ti,r=new ti,o=new ti){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Cn){const i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],g=s[8],_=s[9],v=s[10],m=s[11],p=s[12],P=s[13],w=s[14],M=s[15];if(i[0].setComponents(l-r,d-c,m-g,M-p).normalize(),i[1].setComponents(l+r,d+c,m+g,M+p).normalize(),i[2].setComponents(l+o,d+h,m+_,M+P).normalize(),i[3].setComponents(l-o,d-h,m-_,M-P).normalize(),i[4].setComponents(l-a,d-u,m-v,M-w).normalize(),e===Cn)i[5].setComponents(l+a,d+u,m+v,M+w).normalize();else if(e===xr)i[5].setComponents(a,u,v,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),yi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),yi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(yi)}intersectsSprite(t){return yi.center.set(0,0,0),yi.radius=.7071067811865476,yi.applyMatrix4(t.matrixWorld),this.intersectsSphere(yi)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Fr.x=s.normal.x>0?t.max.x:t.min.x,Fr.y=s.normal.y>0?t.max.y:t.min.y,Fr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Fr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function qc(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Af(n){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),a.onUploadCallback();let g;if(c instanceof Float32Array)g=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?g=n.HALF_FLOAT:g=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=n.SHORT;else if(c instanceof Uint32Array)g=n.UNSIGNED_INT;else if(c instanceof Int32Array)g=n.INT;else if(c instanceof Int8Array)g=n.BYTE;else if(c instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){const h=l.array,u=l.updateRanges;if(n.bindBuffer(c,a),u.length===0)n.bufferSubData(c,0,h);else{u.sort((g,_)=>g.start-_.start);let d=0;for(let g=1;g<u.length;g++){const _=u[d],v=u[g];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++d,u[d]=v)}u.length=d+1;for(let g=0,_=u.length;g<_;g++){const v=u[g];n.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class ei extends Qe{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,g=[],_=[],v=[],m=[];for(let p=0;p<h;p++){const P=p*d-o;for(let w=0;w<c;w++){const M=w*u-r;_.push(M,-P,0),v.push(0,0,1),m.push(w/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let P=0;P<a;P++){const w=P+c*p,M=P+c*(p+1),F=P+1+c*(p+1),T=P+1+c*p;g.push(w,M,T),g.push(M,F,T)}this.setIndex(g),this.setAttribute("position",new Be(_,3)),this.setAttribute("normal",new Be(v,3)),this.setAttribute("uv",new Be(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ei(t.width,t.height,t.widthSegments,t.heightSegments)}}var Rf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Cf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Df=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,If=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Uf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Nf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Of=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ff=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Hf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Gf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Vf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Wf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$f=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Yf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Zf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,jf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Kf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Jf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Qf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,tp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ep=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,np=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ip=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sp="gl_FragColor = linearToOutputTexel( gl_FragColor );",rp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,op=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ap=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,lp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,cp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,up=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,dp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,gp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_p=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Mp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,yp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Sp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,bp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ep=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Tp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ap=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Rp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Pp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Dp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Lp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ip=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Up=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Np=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Op=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Bp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,kp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Hp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Gp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Wp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$p=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Xp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,qp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,jp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Kp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Jp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Qp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,tm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,em=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,nm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,im=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,om=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,am=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,cm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,hm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,um=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,dm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,fm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,pm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,mm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,gm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,_m=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ym=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Sm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,bm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Em=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Tm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ne={alphahash_fragment:Rf,alphahash_pars_fragment:Pf,alphamap_fragment:Cf,alphamap_pars_fragment:Df,alphatest_fragment:Lf,alphatest_pars_fragment:If,aomap_fragment:Uf,aomap_pars_fragment:Nf,batching_pars_vertex:zf,batching_vertex:Of,begin_vertex:Ff,beginnormal_vertex:Bf,bsdfs:kf,iridescence_fragment:Hf,bumpmap_pars_fragment:Gf,clipping_planes_fragment:Vf,clipping_planes_pars_fragment:Wf,clipping_planes_pars_vertex:$f,clipping_planes_vertex:Xf,color_fragment:qf,color_pars_fragment:Yf,color_pars_vertex:Zf,color_vertex:jf,common:Kf,cube_uv_reflection_fragment:Jf,defaultnormal_vertex:Qf,displacementmap_pars_vertex:tp,displacementmap_vertex:ep,emissivemap_fragment:np,emissivemap_pars_fragment:ip,colorspace_fragment:sp,colorspace_pars_fragment:rp,envmap_fragment:op,envmap_common_pars_fragment:ap,envmap_pars_fragment:lp,envmap_pars_vertex:cp,envmap_physical_pars_fragment:Mp,envmap_vertex:hp,fog_vertex:up,fog_pars_vertex:dp,fog_fragment:fp,fog_pars_fragment:pp,gradientmap_pars_fragment:mp,lightmap_pars_fragment:gp,lights_lambert_fragment:_p,lights_lambert_pars_fragment:xp,lights_pars_begin:vp,lights_toon_fragment:yp,lights_toon_pars_fragment:Sp,lights_phong_fragment:bp,lights_phong_pars_fragment:Ep,lights_physical_fragment:wp,lights_physical_pars_fragment:Tp,lights_fragment_begin:Ap,lights_fragment_maps:Rp,lights_fragment_end:Pp,logdepthbuf_fragment:Cp,logdepthbuf_pars_fragment:Dp,logdepthbuf_pars_vertex:Lp,logdepthbuf_vertex:Ip,map_fragment:Up,map_pars_fragment:Np,map_particle_fragment:zp,map_particle_pars_fragment:Op,metalnessmap_fragment:Fp,metalnessmap_pars_fragment:Bp,morphinstance_vertex:kp,morphcolor_vertex:Hp,morphnormal_vertex:Gp,morphtarget_pars_vertex:Vp,morphtarget_vertex:Wp,normal_fragment_begin:$p,normal_fragment_maps:Xp,normal_pars_fragment:qp,normal_pars_vertex:Yp,normal_vertex:Zp,normalmap_pars_fragment:jp,clearcoat_normal_fragment_begin:Kp,clearcoat_normal_fragment_maps:Jp,clearcoat_pars_fragment:Qp,iridescence_pars_fragment:tm,opaque_fragment:em,packing:nm,premultiplied_alpha_fragment:im,project_vertex:sm,dithering_fragment:rm,dithering_pars_fragment:om,roughnessmap_fragment:am,roughnessmap_pars_fragment:lm,shadowmap_pars_fragment:cm,shadowmap_pars_vertex:hm,shadowmap_vertex:um,shadowmask_pars_fragment:dm,skinbase_vertex:fm,skinning_pars_vertex:pm,skinning_vertex:mm,skinnormal_vertex:gm,specularmap_fragment:_m,specularmap_pars_fragment:xm,tonemapping_fragment:vm,tonemapping_pars_fragment:Mm,transmission_fragment:ym,transmission_pars_fragment:Sm,uv_pars_fragment:bm,uv_pars_vertex:Em,uv_vertex:wm,worldpos_vertex:Tm,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},At={common:{diffuse:{value:new ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new te}},envmap:{envMap:{value:null},envMapRotation:{value:new te},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new te}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new te}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new te},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new te},normalScale:{value:new xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new te},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new te}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new te}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new te}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0},uvTransform:{value:new te}},sprite:{diffuse:{value:new ae(16777215)},opacity:{value:1},center:{value:new xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}}},xn={basic:{uniforms:We([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.fog]),vertexShader:ne.meshbasic_vert,fragmentShader:ne.meshbasic_frag},lambert:{uniforms:We([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new ae(0)}}]),vertexShader:ne.meshlambert_vert,fragmentShader:ne.meshlambert_frag},phong:{uniforms:We([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new ae(0)},specular:{value:new ae(1118481)},shininess:{value:30}}]),vertexShader:ne.meshphong_vert,fragmentShader:ne.meshphong_frag},standard:{uniforms:We([At.common,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.roughnessmap,At.metalnessmap,At.fog,At.lights,{emissive:{value:new ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag},toon:{uniforms:We([At.common,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.gradientmap,At.fog,At.lights,{emissive:{value:new ae(0)}}]),vertexShader:ne.meshtoon_vert,fragmentShader:ne.meshtoon_frag},matcap:{uniforms:We([At.common,At.bumpmap,At.normalmap,At.displacementmap,At.fog,{matcap:{value:null}}]),vertexShader:ne.meshmatcap_vert,fragmentShader:ne.meshmatcap_frag},points:{uniforms:We([At.points,At.fog]),vertexShader:ne.points_vert,fragmentShader:ne.points_frag},dashed:{uniforms:We([At.common,At.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ne.linedashed_vert,fragmentShader:ne.linedashed_frag},depth:{uniforms:We([At.common,At.displacementmap]),vertexShader:ne.depth_vert,fragmentShader:ne.depth_frag},normal:{uniforms:We([At.common,At.bumpmap,At.normalmap,At.displacementmap,{opacity:{value:1}}]),vertexShader:ne.meshnormal_vert,fragmentShader:ne.meshnormal_frag},sprite:{uniforms:We([At.sprite,At.fog]),vertexShader:ne.sprite_vert,fragmentShader:ne.sprite_frag},background:{uniforms:{uvTransform:{value:new te},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ne.background_vert,fragmentShader:ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new te}},vertexShader:ne.backgroundCube_vert,fragmentShader:ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ne.cube_vert,fragmentShader:ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ne.equirect_vert,fragmentShader:ne.equirect_frag},distanceRGBA:{uniforms:We([At.common,At.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ne.distanceRGBA_vert,fragmentShader:ne.distanceRGBA_frag},shadow:{uniforms:We([At.lights,At.fog,{color:{value:new ae(0)},opacity:{value:1}}]),vertexShader:ne.shadow_vert,fragmentShader:ne.shadow_frag}};xn.physical={uniforms:We([xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new te},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new te},clearcoatNormalScale:{value:new xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new te},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new te},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new te},sheen:{value:0},sheenColor:{value:new ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new te},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new te},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new te},transmissionSamplerSize:{value:new xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new te},attenuationDistance:{value:0},attenuationColor:{value:new ae(0)},specularColor:{value:new ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new te},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new te},anisotropyVector:{value:new xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new te}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag};const Br={r:0,b:0,g:0},Si=new _n,Am=new Me;function Rm(n,t,e,i,s,r,o){const a=new ae(0);let l=r===!0?0:1,c,h,u=null,d=0,g=null;function _(P){let w=P.isScene===!0?P.background:null;return w&&w.isTexture&&(w=(P.backgroundBlurriness>0?e:t).get(w)),w}function v(P){let w=!1;const M=_(P);M===null?p(a,l):M&&M.isColor&&(p(M,1),w=!0);const F=n.xr.getEnvironmentBlendMode();F==="additive"?i.buffers.color.setClear(0,0,0,1,o):F==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||w)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(P,w){const M=_(w);M&&(M.isCubeTexture||M.mapping===hr)?(h===void 0&&(h=new be(new dn(1,1,1),new Jn({name:"BackgroundCubeMaterial",uniforms:ns(xn.backgroundCube.uniforms),vertexShader:xn.backgroundCube.vertexShader,fragmentShader:xn.backgroundCube.fragmentShader,side:qe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(F,T,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Si.copy(w.backgroundRotation),Si.x*=-1,Si.y*=-1,Si.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Si.y*=-1,Si.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Am.makeRotationFromEuler(Si)),h.material.toneMapped=ue.getTransfer(M.colorSpace)!==ge,(u!==M||d!==M.version||g!==n.toneMapping)&&(h.material.needsUpdate=!0,u=M,d=M.version,g=n.toneMapping),h.layers.enableAll(),P.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new be(new ei(2,2),new Jn({name:"BackgroundMaterial",uniforms:ns(xn.background.uniforms),vertexShader:xn.background.vertexShader,fragmentShader:xn.background.fragmentShader,side:Vn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=ue.getTransfer(M.colorSpace)!==ge,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(u!==M||d!==M.version||g!==n.toneMapping)&&(c.material.needsUpdate=!0,u=M,d=M.version,g=n.toneMapping),c.layers.enableAll(),P.unshift(c,c.geometry,c.material,0,0,null))}function p(P,w){P.getRGB(Br,Gc(n)),i.buffers.color.setClear(Br.r,Br.g,Br.b,w,o)}return{getClearColor:function(){return a},setClearColor:function(P,w=1){a.set(P),l=w,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(P){l=P,p(a,l)},render:v,addToRenderList:m}}function Pm(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null);let r=s,o=!1;function a(b,U,J,$,Z){let rt=!1;const X=u($,J,U);r!==X&&(r=X,c(r.object)),rt=g(b,$,J,Z),rt&&_(b,$,J,Z),Z!==null&&t.update(Z,n.ELEMENT_ARRAY_BUFFER),(rt||o)&&(o=!1,M(b,U,J,$),Z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function l(){return n.createVertexArray()}function c(b){return n.bindVertexArray(b)}function h(b){return n.deleteVertexArray(b)}function u(b,U,J){const $=J.wireframe===!0;let Z=i[b.id];Z===void 0&&(Z={},i[b.id]=Z);let rt=Z[U.id];rt===void 0&&(rt={},Z[U.id]=rt);let X=rt[$];return X===void 0&&(X=d(l()),rt[$]=X),X}function d(b){const U=[],J=[],$=[];for(let Z=0;Z<e;Z++)U[Z]=0,J[Z]=0,$[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:J,attributeDivisors:$,object:b,attributes:{},index:null}}function g(b,U,J,$){const Z=r.attributes,rt=U.attributes;let X=0;const ht=J.getAttributes();for(const j in ht)if(ht[j].location>=0){const at=Z[j];let Ct=rt[j];if(Ct===void 0&&(j==="instanceMatrix"&&b.instanceMatrix&&(Ct=b.instanceMatrix),j==="instanceColor"&&b.instanceColor&&(Ct=b.instanceColor)),at===void 0||at.attribute!==Ct||Ct&&at.data!==Ct.data)return!0;X++}return r.attributesNum!==X||r.index!==$}function _(b,U,J,$){const Z={},rt=U.attributes;let X=0;const ht=J.getAttributes();for(const j in ht)if(ht[j].location>=0){let at=rt[j];at===void 0&&(j==="instanceMatrix"&&b.instanceMatrix&&(at=b.instanceMatrix),j==="instanceColor"&&b.instanceColor&&(at=b.instanceColor));const Ct={};Ct.attribute=at,at&&at.data&&(Ct.data=at.data),Z[j]=Ct,X++}r.attributes=Z,r.attributesNum=X,r.index=$}function v(){const b=r.newAttributes;for(let U=0,J=b.length;U<J;U++)b[U]=0}function m(b){p(b,0)}function p(b,U){const J=r.newAttributes,$=r.enabledAttributes,Z=r.attributeDivisors;J[b]=1,$[b]===0&&(n.enableVertexAttribArray(b),$[b]=1),Z[b]!==U&&(n.vertexAttribDivisor(b,U),Z[b]=U)}function P(){const b=r.newAttributes,U=r.enabledAttributes;for(let J=0,$=U.length;J<$;J++)U[J]!==b[J]&&(n.disableVertexAttribArray(J),U[J]=0)}function w(b,U,J,$,Z,rt,X){X===!0?n.vertexAttribIPointer(b,U,J,Z,rt):n.vertexAttribPointer(b,U,J,$,Z,rt)}function M(b,U,J,$){v();const Z=$.attributes,rt=J.getAttributes(),X=U.defaultAttributeValues;for(const ht in rt){const j=rt[ht];if(j.location>=0){let st=Z[ht];if(st===void 0&&(ht==="instanceMatrix"&&b.instanceMatrix&&(st=b.instanceMatrix),ht==="instanceColor"&&b.instanceColor&&(st=b.instanceColor)),st!==void 0){const at=st.normalized,Ct=st.itemSize,Kt=t.get(st);if(Kt===void 0)continue;const de=Kt.buffer,it=Kt.type,_t=Kt.bytesPerElement,Bt=it===n.INT||it===n.UNSIGNED_INT||st.gpuType===Go;if(st.isInterleavedBufferAttribute){const St=st.data,Gt=St.stride,jt=st.offset;if(St.isInstancedInterleavedBuffer){for(let Xt=0;Xt<j.locationSize;Xt++)p(j.location+Xt,St.meshPerAttribute);b.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let Xt=0;Xt<j.locationSize;Xt++)m(j.location+Xt);n.bindBuffer(n.ARRAY_BUFFER,de);for(let Xt=0;Xt<j.locationSize;Xt++)w(j.location+Xt,Ct/j.locationSize,it,at,Gt*_t,(jt+Ct/j.locationSize*Xt)*_t,Bt)}else{if(st.isInstancedBufferAttribute){for(let St=0;St<j.locationSize;St++)p(j.location+St,st.meshPerAttribute);b.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let St=0;St<j.locationSize;St++)m(j.location+St);n.bindBuffer(n.ARRAY_BUFFER,de);for(let St=0;St<j.locationSize;St++)w(j.location+St,Ct/j.locationSize,it,at,Ct*_t,Ct/j.locationSize*St*_t,Bt)}}else if(X!==void 0){const at=X[ht];if(at!==void 0)switch(at.length){case 2:n.vertexAttrib2fv(j.location,at);break;case 3:n.vertexAttrib3fv(j.location,at);break;case 4:n.vertexAttrib4fv(j.location,at);break;default:n.vertexAttrib1fv(j.location,at)}}}}P()}function F(){N();for(const b in i){const U=i[b];for(const J in U){const $=U[J];for(const Z in $)h($[Z].object),delete $[Z];delete U[J]}delete i[b]}}function T(b){if(i[b.id]===void 0)return;const U=i[b.id];for(const J in U){const $=U[J];for(const Z in $)h($[Z].object),delete $[Z];delete U[J]}delete i[b.id]}function I(b){for(const U in i){const J=i[U];if(J[b.id]===void 0)continue;const $=J[b.id];for(const Z in $)h($[Z].object),delete $[Z];delete J[b.id]}}function N(){A(),o=!0,r!==s&&(r=s,c(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:N,resetDefaultState:A,dispose:F,releaseStatesOfGeometry:T,releaseStatesOfProgram:I,initAttributes:v,enableAttribute:m,disableUnusedAttributes:P}}function Cm(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function o(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];e.update(g,i,1)}function l(c,h,u,d){if(u===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let _=0;_<c.length;_++)o(c[_],h[_],d[_]);else{g.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let _=0;for(let v=0;v<u;v++)_+=h[v]*d[v];e.update(_,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Dm(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const I=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(I){return!(I!==an&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){const N=I===As&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(I!==Rn&&i.convert(I)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==Pn&&!N)}function l(I){if(I==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),g=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),P=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),M=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),F=_>0,T=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:g,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:P,maxVaryings:w,maxFragmentUniforms:M,vertexTextures:F,maxSamples:T}}function Lm(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new ti,a=new te,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const g=u.length!==0||d||i!==0||s;return s=d,i=u.length,g},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,g){const _=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=n.get(u);if(!s||_===null||_.length===0||r&&!m)r?h(null):c();else{const P=r?0:i,w=P*4;let M=p.clippingState||null;l.value=M,M=h(_,d,w,g);for(let F=0;F!==w;++F)M[F]=e[F];p.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=P}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,g,_){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,_!==!0||m===null){const p=g+v*4,P=d.matrixWorldInverse;a.getNormalMatrix(P),(m===null||m.length<p)&&(m=new Float32Array(p));for(let w=0,M=g;w!==v;++w,M+=4)o.copy(u[w]).applyMatrix4(P,a),o.normal.toArray(m,M),m[M+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function Im(n){let t=new WeakMap;function e(o,a){return a===Oo?o.mapping=Ni:a===Fo&&(o.mapping=zi),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Oo||a===Fo)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Ef(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class Yc extends Vc{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const rs=4,Zc=[.125,.215,.35,.446,.526,.582],bi=20,Wa=new Yc,jc=new ae;let $a=null,Xa=0,qa=0,Ya=!1;const Ei=(1+Math.sqrt(5))/2,os=1/Ei,Kc=[new O(-Ei,os,0),new O(Ei,os,0),new O(-os,0,Ei),new O(os,0,Ei),new O(0,Ei,-os),new O(0,Ei,os),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)];class Jc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){$a=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel(),Ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=eh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=th(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget($a,Xa,qa),this._renderer.xr.enabled=Ya,t.scissorTest=!1,kr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ni||t.mapping===zi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),$a=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel(),Ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:gn,minFilter:gn,generateMipmaps:!1,type:As,format:an,colorSpace:ki,depthBuffer:!1},s=Qc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Qc(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Um(r)),this._blurMaterial=Nm(r,t,e)}return s}_compileMaterial(t){const e=new be(this._lodPlanes[0],t);this._renderer.compile(e,Wa)}_sceneToCubeUV(t,e,i,s){const a=new sn(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(jc),h.toneMapping=$n,h.autoClear=!1;const g=new Ba({name:"PMREM.Background",side:qe,depthWrite:!1,depthTest:!1}),_=new be(new dn,g);let v=!1;const m=t.background;m?m.isColor&&(g.color.copy(m),t.background=null,v=!0):(g.color.copy(jc),v=!0);for(let p=0;p<6;p++){const P=p%3;P===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):P===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const w=this._cubeSize;kr(s,P*w,p>2?w:0,w,w),h.setRenderTarget(s),v&&h.render(_,a),h.render(t,a)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Ni||t.mapping===zi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=eh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=th());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new be(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;kr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,Wa)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Kc[(s-r-1)%Kc.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new be(this._lodPlanes[s],c),d=c.uniforms,g=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*bi-1),v=r/_,m=isFinite(r)?1+Math.floor(h*v):bi;m>bi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${bi}`);const p=[];let P=0;for(let I=0;I<bi;++I){const N=I/v,A=Math.exp(-N*N/2);p.push(A),I===0?P+=A:I<m&&(P+=2*A)}for(let I=0;I<p.length;I++)p[I]=p[I]/P;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:w}=this;d.dTheta.value=_,d.mipInt.value=w-i;const M=this._sizeLods[s],F=3*M*(s>w-rs?s-w+rs:0),T=4*(this._cubeSize-M);kr(e,F,T,3*M,2*M),l.setRenderTarget(e),l.render(u,Wa)}}function Um(n){const t=[],e=[],i=[];let s=n;const r=n-rs+1+Zc.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-rs?l=Zc[o-n+rs-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],g=6,_=6,v=3,m=2,p=1,P=new Float32Array(v*_*g),w=new Float32Array(m*_*g),M=new Float32Array(p*_*g);for(let T=0;T<g;T++){const I=T%3*2/3-1,N=T>2?0:-1,A=[I,N,0,I+2/3,N,0,I+2/3,N+1,0,I,N,0,I+2/3,N+1,0,I,N+1,0];P.set(A,v*_*T),w.set(d,m*_*T);const b=[T,T,T,T,T,T];M.set(b,p*_*T)}const F=new Qe;F.setAttribute("position",new un(P,v)),F.setAttribute("uv",new un(w,m)),F.setAttribute("faceIndex",new un(M,p)),t.push(F),s>rs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Qc(n,t,e){const i=new mi(n,t,e);return i.texture.mapping=hr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function kr(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Nm(n,t,e){const i=new Float32Array(bi),s=new O(0,1,0);return new Jn({name:"SphericalGaussianBlur",defines:{n:bi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function th(){return new Jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function eh(){return new Jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Za(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function zm(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Oo||l===Fo,h=l===Ni||l===zi;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Jc(n)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const g=a.image;return c&&g&&g.height>0||h&&g&&s(g)?(e===null&&(e=new Jc(n)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function Om(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Ds("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Fm(n,t,e,i){const s={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const _ in d.attributes)t.remove(d.attributes[_]);for(const _ in d.morphAttributes){const v=d.morphAttributes[_];for(let m=0,p=v.length;m<p;m++)t.remove(v[m])}d.removeEventListener("dispose",o),delete s[d.id];const g=r.get(d);g&&(t.remove(g),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const _ in d)t.update(d[_],n.ARRAY_BUFFER);const g=u.morphAttributes;for(const _ in g){const v=g[_];for(let m=0,p=v.length;m<p;m++)t.update(v[m],n.ARRAY_BUFFER)}}function c(u){const d=[],g=u.index,_=u.attributes.position;let v=0;if(g!==null){const P=g.array;v=g.version;for(let w=0,M=P.length;w<M;w+=3){const F=P[w+0],T=P[w+1],I=P[w+2];d.push(F,T,T,I,I,F)}}else if(_!==void 0){const P=_.array;v=_.version;for(let w=0,M=P.length/3-1;w<M;w+=3){const F=w+0,T=w+1,I=w+2;d.push(F,T,T,I,I,F)}}else return;const m=new(xc(d)?Fc:Oc)(d,1);m.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const g=u.index;g!==null&&d.version<g.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Bm(n,t,e){let i;function s(d){i=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,g){n.drawElements(i,g,r,d*o),e.update(g,i,1)}function c(d,g,_){_!==0&&(n.drawElementsInstanced(i,g,r,d*o,_),e.update(g,i,_))}function h(d,g,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,g,0,r,d,0,_);let m=0;for(let p=0;p<_;p++)m+=g[p];e.update(m,i,1)}function u(d,g,_,v){if(_===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,g[p],v[p]);else{m.multiDrawElementsInstancedWEBGL(i,g,0,r,d,0,v,0,_);let p=0;for(let P=0;P<_;P++)p+=g[P]*v[P];e.update(p,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function km(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Hm(n,t,e){const i=new WeakMap,s=new Te;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=i.get(a);if(d===void 0||d.count!==u){let A=function(){I.dispose(),i.delete(a),a.removeEventListener("dispose",A)};d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],P=a.morphAttributes.color||[];let w=0;g===!0&&(w=1),_===!0&&(w=2),v===!0&&(w=3);let M=a.attributes.position.count*w,F=1;M>t.maxTextureSize&&(F=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);const T=new Float32Array(M*F*4*u),I=new Tc(T,M,F,u);I.type=Pn,I.needsUpdate=!0;const N=w*4;for(let b=0;b<u;b++){const U=m[b],J=p[b],$=P[b],Z=M*F*4*b;for(let rt=0;rt<U.count;rt++){const X=rt*N;g===!0&&(s.fromBufferAttribute(U,rt),T[Z+X+0]=s.x,T[Z+X+1]=s.y,T[Z+X+2]=s.z,T[Z+X+3]=0),_===!0&&(s.fromBufferAttribute(J,rt),T[Z+X+4]=s.x,T[Z+X+5]=s.y,T[Z+X+6]=s.z,T[Z+X+7]=0),v===!0&&(s.fromBufferAttribute($,rt),T[Z+X+8]=s.x,T[Z+X+9]=s.y,T[Z+X+10]=s.z,T[Z+X+11]=$.itemSize===4?s.w:1)}}d={count:u,texture:I,size:new xt(M,F)},i.set(a,d),a.addEventListener("dispose",A)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let v=0;v<c.length;v++)g+=c[v];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function Gm(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class nh extends Ye{constructor(t,e,i,s,r,o,a,l,c,h=Fi){if(h!==Fi&&h!==Bi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Fi&&(i=di),i===void 0&&h===Bi&&(i=Oi),super(null,s,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:on,this.minFilter=l!==void 0?l:on,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const ih=new Ye,sh=new nh(1,1),rh=new Tc,oh=new lf,ah=new Xc,lh=[],ch=[],hh=new Float32Array(16),uh=new Float32Array(9),dh=new Float32Array(4);function as(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=lh[s];if(r===void 0&&(r=new Float32Array(s),lh[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Ce(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function De(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Hr(n,t){let e=ch[t];e===void 0&&(e=new Int32Array(t),ch[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Vm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Wm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;n.uniform2fv(this.addr,t),De(e,t)}}function $m(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;n.uniform3fv(this.addr,t),De(e,t)}}function Xm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;n.uniform4fv(this.addr,t),De(e,t)}}function qm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),De(e,t)}else{if(Ce(e,i))return;dh.set(i),n.uniformMatrix2fv(this.addr,!1,dh),De(e,i)}}function Ym(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),De(e,t)}else{if(Ce(e,i))return;uh.set(i),n.uniformMatrix3fv(this.addr,!1,uh),De(e,i)}}function Zm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ce(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),De(e,t)}else{if(Ce(e,i))return;hh.set(i),n.uniformMatrix4fv(this.addr,!1,hh),De(e,i)}}function jm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Km(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;n.uniform2iv(this.addr,t),De(e,t)}}function Jm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;n.uniform3iv(this.addr,t),De(e,t)}}function Qm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;n.uniform4iv(this.addr,t),De(e,t)}}function tg(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function eg(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;n.uniform2uiv(this.addr,t),De(e,t)}}function ng(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;n.uniform3uiv(this.addr,t),De(e,t)}}function ig(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;n.uniform4uiv(this.addr,t),De(e,t)}}function sg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(sh.compareFunction=pc,r=sh):r=ih,e.setTexture2D(t||r,s)}function rg(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||oh,s)}function og(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||ah,s)}function ag(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||rh,s)}function lg(n){switch(n){case 5126:return Vm;case 35664:return Wm;case 35665:return $m;case 35666:return Xm;case 35674:return qm;case 35675:return Ym;case 35676:return Zm;case 5124:case 35670:return jm;case 35667:case 35671:return Km;case 35668:case 35672:return Jm;case 35669:case 35673:return Qm;case 5125:return tg;case 36294:return eg;case 36295:return ng;case 36296:return ig;case 35678:case 36198:case 36298:case 36306:case 35682:return sg;case 35679:case 36299:case 36307:return rg;case 35680:case 36300:case 36308:case 36293:return og;case 36289:case 36303:case 36311:case 36292:return ag}}function cg(n,t){n.uniform1fv(this.addr,t)}function hg(n,t){const e=as(t,this.size,2);n.uniform2fv(this.addr,e)}function ug(n,t){const e=as(t,this.size,3);n.uniform3fv(this.addr,e)}function dg(n,t){const e=as(t,this.size,4);n.uniform4fv(this.addr,e)}function fg(n,t){const e=as(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function pg(n,t){const e=as(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function mg(n,t){const e=as(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function gg(n,t){n.uniform1iv(this.addr,t)}function _g(n,t){n.uniform2iv(this.addr,t)}function xg(n,t){n.uniform3iv(this.addr,t)}function vg(n,t){n.uniform4iv(this.addr,t)}function Mg(n,t){n.uniform1uiv(this.addr,t)}function yg(n,t){n.uniform2uiv(this.addr,t)}function Sg(n,t){n.uniform3uiv(this.addr,t)}function bg(n,t){n.uniform4uiv(this.addr,t)}function Eg(n,t,e){const i=this.cache,s=t.length,r=Hr(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),De(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||ih,r[o])}function wg(n,t,e){const i=this.cache,s=t.length,r=Hr(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),De(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||oh,r[o])}function Tg(n,t,e){const i=this.cache,s=t.length,r=Hr(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),De(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||ah,r[o])}function Ag(n,t,e){const i=this.cache,s=t.length,r=Hr(e,s);Ce(i,r)||(n.uniform1iv(this.addr,r),De(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||rh,r[o])}function Rg(n){switch(n){case 5126:return cg;case 35664:return hg;case 35665:return ug;case 35666:return dg;case 35674:return fg;case 35675:return pg;case 35676:return mg;case 5124:case 35670:return gg;case 35667:case 35671:return _g;case 35668:case 35672:return xg;case 35669:case 35673:return vg;case 5125:return Mg;case 36294:return yg;case 36295:return Sg;case 36296:return bg;case 35678:case 36198:case 36298:case 36306:case 35682:return Eg;case 35679:case 36299:case 36307:return wg;case 35680:case 36300:case 36308:case 36293:return Tg;case 36289:case 36303:case 36311:case 36292:return Ag}}class Pg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=lg(e.type)}}class Cg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Rg(e.type)}}class Dg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const ja=/(\w+)(\])?(\[|\.)?/g;function fh(n,t){n.seq.push(t),n.map[t.id]=t}function Lg(n,t,e){const i=n.name,s=i.length;for(ja.lastIndex=0;;){const r=ja.exec(i),o=ja.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){fh(e,c===void 0?new Pg(a,n,t):new Cg(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new Dg(a),fh(e,u)),e=u}}}class Gr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Lg(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function ph(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const Ig=37297;let Ug=0;function Ng(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const mh=new te;function zg(n){ue._getMatrix(mh,ue.workingColorSpace,n);const t=`mat3( ${mh.elements.map(e=>e.toFixed(4))} )`;switch(ue.getTransfer(n)){case _r:return[t,"LinearTransferOETF"];case ge:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function gh(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Ng(n.getShaderSource(t),o)}else return s}function Og(n,t){const e=zg(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Fg(n,t){let e;switch(t){case vd:e="Linear";break;case Md:e="Reinhard";break;case yd:e="Cineon";break;case Sd:e="ACESFilmic";break;case Ed:e="AgX";break;case wd:e="Neutral";break;case bd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Vr=new O;function Bg(){ue.getLuminanceCoefficients(Vr);const n=Vr.x.toFixed(4),t=Vr.y.toFixed(4),e=Vr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function kg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(zs).join(`
`)}function Hg(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Gg(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function zs(n){return n!==""}function _h(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function xh(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Vg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ka(n){return n.replace(Vg,$g)}const Wg=new Map;function $g(n,t){let e=ne[t];if(e===void 0){const i=Wg.get(t);if(i!==void 0)e=ne[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ka(e)}const Xg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function vh(n){return n.replace(Xg,qg)}function qg(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Mh(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Yg(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Zl?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===jl?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Tn&&(t="SHADOWMAP_TYPE_VSM"),t}function Zg(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ni:case zi:t="ENVMAP_TYPE_CUBE";break;case hr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function jg(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case zi:t="ENVMAP_MODE_REFRACTION";break}return t}function Kg(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case tc:t="ENVMAP_BLENDING_MULTIPLY";break;case _d:t="ENVMAP_BLENDING_MIX";break;case xd:t="ENVMAP_BLENDING_ADD";break}return t}function Jg(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Qg(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Yg(e),c=Zg(e),h=jg(e),u=Kg(e),d=Jg(e),g=kg(e),_=Hg(r),v=s.createProgram();let m,p,P=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(zs).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(zs).join(`
`),p.length>0&&(p+=`
`)):(m=[Mh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(zs).join(`
`),p=[Mh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==$n?"#define TONE_MAPPING":"",e.toneMapping!==$n?ne.tonemapping_pars_fragment:"",e.toneMapping!==$n?Fg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ne.colorspace_pars_fragment,Og("linearToOutputTexel",e.outputColorSpace),Bg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(zs).join(`
`)),o=Ka(o),o=_h(o,e),o=xh(o,e),a=Ka(a),a=_h(a,e),a=xh(a,e),o=vh(o),a=vh(a),e.isRawShaderMaterial!==!0&&(P=`#version 300 es
`,m=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===gc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===gc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const w=P+m+o,M=P+p+a,F=ph(s,s.VERTEX_SHADER,w),T=ph(s,s.FRAGMENT_SHADER,M);s.attachShader(v,F),s.attachShader(v,T),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function I(U){if(n.debug.checkShaderErrors){const J=s.getProgramInfoLog(v).trim(),$=s.getShaderInfoLog(F).trim(),Z=s.getShaderInfoLog(T).trim();let rt=!0,X=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(rt=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,F,T);else{const ht=gh(s,F,"vertex"),j=gh(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+J+`
`+ht+`
`+j)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):($===""||Z==="")&&(X=!1);X&&(U.diagnostics={runnable:rt,programLog:J,vertexShader:{log:$,prefix:m},fragmentShader:{log:Z,prefix:p}})}s.deleteShader(F),s.deleteShader(T),N=new Gr(s,v),A=Gg(s,v)}let N;this.getUniforms=function(){return N===void 0&&I(this),N};let A;this.getAttributes=function(){return A===void 0&&I(this),A};let b=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(v,Ig)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ug++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=F,this.fragmentShader=T,this}let t_=0;class e_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new n_(t),e.set(t,i)),i}}class n_{constructor(t){this.id=t_++,this.code=t,this.usedTimes=0}}function i_(n,t,e,i,s,r,o){const a=new Pa,l=new e_,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let g=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(A){return c.add(A),A===0?"uv":`uv${A}`}function m(A,b,U,J,$){const Z=J.fog,rt=$.geometry,X=A.isMeshStandardMaterial?J.environment:null,ht=(A.isMeshStandardMaterial?e:t).get(A.envMap||X),j=ht&&ht.mapping===hr?ht.image.height:null,st=_[A.type];A.precision!==null&&(g=s.getMaxPrecision(A.precision),g!==A.precision&&console.warn("THREE.WebGLProgram.getParameters:",A.precision,"not supported, using",g,"instead."));const at=rt.morphAttributes.position||rt.morphAttributes.normal||rt.morphAttributes.color,Ct=at!==void 0?at.length:0;let Kt=0;rt.morphAttributes.position!==void 0&&(Kt=1),rt.morphAttributes.normal!==void 0&&(Kt=2),rt.morphAttributes.color!==void 0&&(Kt=3);let de,it,_t,Bt;if(st){const fe=xn[st];de=fe.vertexShader,it=fe.fragmentShader}else de=A.vertexShader,it=A.fragmentShader,l.update(A),_t=l.getVertexShaderID(A),Bt=l.getFragmentShaderID(A);const St=n.getRenderTarget(),Gt=n.state.buffers.depth.getReversed(),jt=$.isInstancedMesh===!0,Xt=$.isBatchedMesh===!0,ie=!!A.map,lt=!!A.matcap,vt=!!ht,L=!!A.aoMap,Ht=!!A.lightMap,ft=!!A.bumpMap,Ut=!!A.normalMap,bt=!!A.displacementMap,Wt=!!A.emissiveMap,Lt=!!A.metalnessMap,D=!!A.roughnessMap,y=A.anisotropy>0,V=A.clearcoat>0,tt=A.dispersion>0,ct=A.iridescence>0,Q=A.sheen>0,kt=A.transmission>0,Rt=y&&!!A.anisotropyMap,It=V&&!!A.clearcoatMap,re=V&&!!A.clearcoatNormalMap,mt=V&&!!A.clearcoatRoughnessMap,zt=ct&&!!A.iridescenceMap,qt=ct&&!!A.iridescenceThicknessMap,$t=Q&&!!A.sheenColorMap,Ot=Q&&!!A.sheenRoughnessMap,le=!!A.specularMap,Qt=!!A.specularColorMap,xe=!!A.specularIntensityMap,B=kt&&!!A.transmissionMap,Tt=kt&&!!A.thicknessMap,K=!!A.gradientMap,nt=!!A.alphaMap,Dt=A.alphaTest>0,Pt=!!A.alphaHash,Jt=!!A.extensions;let ve=$n;A.toneMapped&&(St===null||St.isXRRenderTarget===!0)&&(ve=n.toneMapping);const Ie={shaderID:st,shaderType:A.type,shaderName:A.name,vertexShader:de,fragmentShader:it,defines:A.defines,customVertexShaderID:_t,customFragmentShaderID:Bt,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:g,batching:Xt,batchingColor:Xt&&$._colorsTexture!==null,instancing:jt,instancingColor:jt&&$.instanceColor!==null,instancingMorph:jt&&$.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:St===null?n.outputColorSpace:St.isXRRenderTarget===!0?St.texture.colorSpace:ki,alphaToCoverage:!!A.alphaToCoverage,map:ie,matcap:lt,envMap:vt,envMapMode:vt&&ht.mapping,envMapCubeUVHeight:j,aoMap:L,lightMap:Ht,bumpMap:ft,normalMap:Ut,displacementMap:d&&bt,emissiveMap:Wt,normalMapObjectSpace:Ut&&A.normalMapType===Pd,normalMapTangentSpace:Ut&&A.normalMapType===dc,metalnessMap:Lt,roughnessMap:D,anisotropy:y,anisotropyMap:Rt,clearcoat:V,clearcoatMap:It,clearcoatNormalMap:re,clearcoatRoughnessMap:mt,dispersion:tt,iridescence:ct,iridescenceMap:zt,iridescenceThicknessMap:qt,sheen:Q,sheenColorMap:$t,sheenRoughnessMap:Ot,specularMap:le,specularColorMap:Qt,specularIntensityMap:xe,transmission:kt,transmissionMap:B,thicknessMap:Tt,gradientMap:K,opaque:A.transparent===!1&&A.blending===Ii&&A.alphaToCoverage===!1,alphaMap:nt,alphaTest:Dt,alphaHash:Pt,combine:A.combine,mapUv:ie&&v(A.map.channel),aoMapUv:L&&v(A.aoMap.channel),lightMapUv:Ht&&v(A.lightMap.channel),bumpMapUv:ft&&v(A.bumpMap.channel),normalMapUv:Ut&&v(A.normalMap.channel),displacementMapUv:bt&&v(A.displacementMap.channel),emissiveMapUv:Wt&&v(A.emissiveMap.channel),metalnessMapUv:Lt&&v(A.metalnessMap.channel),roughnessMapUv:D&&v(A.roughnessMap.channel),anisotropyMapUv:Rt&&v(A.anisotropyMap.channel),clearcoatMapUv:It&&v(A.clearcoatMap.channel),clearcoatNormalMapUv:re&&v(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:mt&&v(A.clearcoatRoughnessMap.channel),iridescenceMapUv:zt&&v(A.iridescenceMap.channel),iridescenceThicknessMapUv:qt&&v(A.iridescenceThicknessMap.channel),sheenColorMapUv:$t&&v(A.sheenColorMap.channel),sheenRoughnessMapUv:Ot&&v(A.sheenRoughnessMap.channel),specularMapUv:le&&v(A.specularMap.channel),specularColorMapUv:Qt&&v(A.specularColorMap.channel),specularIntensityMapUv:xe&&v(A.specularIntensityMap.channel),transmissionMapUv:B&&v(A.transmissionMap.channel),thicknessMapUv:Tt&&v(A.thicknessMap.channel),alphaMapUv:nt&&v(A.alphaMap.channel),vertexTangents:!!rt.attributes.tangent&&(Ut||y),vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!rt.attributes.color&&rt.attributes.color.itemSize===4,pointsUvs:$.isPoints===!0&&!!rt.attributes.uv&&(ie||nt),fog:!!Z,useFog:A.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:A.flatShading===!0,sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Gt,skinning:$.isSkinnedMesh===!0,morphTargets:rt.morphAttributes.position!==void 0,morphNormals:rt.morphAttributes.normal!==void 0,morphColors:rt.morphAttributes.color!==void 0,morphTargetsCount:Ct,morphTextureStride:Kt,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:A.dithering,shadowMapEnabled:n.shadowMap.enabled&&U.length>0,shadowMapType:n.shadowMap.type,toneMapping:ve,decodeVideoTexture:ie&&A.map.isVideoTexture===!0&&ue.getTransfer(A.map.colorSpace)===ge,decodeVideoTextureEmissive:Wt&&A.emissiveMap.isVideoTexture===!0&&ue.getTransfer(A.emissiveMap.colorSpace)===ge,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===An,flipSided:A.side===qe,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:Jt&&A.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Jt&&A.extensions.multiDraw===!0||Xt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return Ie.vertexUv1s=c.has(1),Ie.vertexUv2s=c.has(2),Ie.vertexUv3s=c.has(3),c.clear(),Ie}function p(A){const b=[];if(A.shaderID?b.push(A.shaderID):(b.push(A.customVertexShaderID),b.push(A.customFragmentShaderID)),A.defines!==void 0)for(const U in A.defines)b.push(U),b.push(A.defines[U]);return A.isRawShaderMaterial===!1&&(P(b,A),w(b,A),b.push(n.outputColorSpace)),b.push(A.customProgramCacheKey),b.join()}function P(A,b){A.push(b.precision),A.push(b.outputColorSpace),A.push(b.envMapMode),A.push(b.envMapCubeUVHeight),A.push(b.mapUv),A.push(b.alphaMapUv),A.push(b.lightMapUv),A.push(b.aoMapUv),A.push(b.bumpMapUv),A.push(b.normalMapUv),A.push(b.displacementMapUv),A.push(b.emissiveMapUv),A.push(b.metalnessMapUv),A.push(b.roughnessMapUv),A.push(b.anisotropyMapUv),A.push(b.clearcoatMapUv),A.push(b.clearcoatNormalMapUv),A.push(b.clearcoatRoughnessMapUv),A.push(b.iridescenceMapUv),A.push(b.iridescenceThicknessMapUv),A.push(b.sheenColorMapUv),A.push(b.sheenRoughnessMapUv),A.push(b.specularMapUv),A.push(b.specularColorMapUv),A.push(b.specularIntensityMapUv),A.push(b.transmissionMapUv),A.push(b.thicknessMapUv),A.push(b.combine),A.push(b.fogExp2),A.push(b.sizeAttenuation),A.push(b.morphTargetsCount),A.push(b.morphAttributeCount),A.push(b.numDirLights),A.push(b.numPointLights),A.push(b.numSpotLights),A.push(b.numSpotLightMaps),A.push(b.numHemiLights),A.push(b.numRectAreaLights),A.push(b.numDirLightShadows),A.push(b.numPointLightShadows),A.push(b.numSpotLightShadows),A.push(b.numSpotLightShadowsWithMaps),A.push(b.numLightProbes),A.push(b.shadowMapType),A.push(b.toneMapping),A.push(b.numClippingPlanes),A.push(b.numClipIntersection),A.push(b.depthPacking)}function w(A,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),A.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reverseDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),A.push(a.mask)}function M(A){const b=_[A.type];let U;if(b){const J=xn[b];U=Mf.clone(J.uniforms)}else U=A.uniforms;return U}function F(A,b){let U;for(let J=0,$=h.length;J<$;J++){const Z=h[J];if(Z.cacheKey===b){U=Z,++U.usedTimes;break}}return U===void 0&&(U=new Qg(n,b,A,r),h.push(U)),U}function T(A){if(--A.usedTimes===0){const b=h.indexOf(A);h[b]=h[h.length-1],h.pop(),A.destroy()}}function I(A){l.remove(A)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:F,releaseProgram:T,releaseShaderCache:I,programs:h,dispose:N}}function s_(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function r_(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function yh(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Sh(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u,d,g,_,v,m){let p=n[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:g,groupOrder:_,renderOrder:u.renderOrder,z:v,group:m},n[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=g,p.groupOrder=_,p.renderOrder=u.renderOrder,p.z=v,p.group=m),t++,p}function a(u,d,g,_,v,m){const p=o(u,d,g,_,v,m);g.transmission>0?i.push(p):g.transparent===!0?s.push(p):e.push(p)}function l(u,d,g,_,v,m){const p=o(u,d,g,_,v,m);g.transmission>0?i.unshift(p):g.transparent===!0?s.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||r_),i.length>1&&i.sort(d||yh),s.length>1&&s.sort(d||yh)}function h(){for(let u=t,d=n.length;u<d;u++){const g=n[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function o_(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Sh,n.set(i,[o])):s>=r.length?(o=new Sh,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function a_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new O,color:new ae};break;case"SpotLight":e={position:new O,direction:new O,color:new ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new ae,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new ae,groundColor:new ae};break;case"RectAreaLight":e={color:new ae,position:new O,halfWidth:new O,halfHeight:new O};break}return n[t.id]=e,e}}}function l_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let c_=0;function h_(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function u_(n){const t=new a_,e=l_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new O);const s=new O,r=new Me,o=new Me;function a(c){let h=0,u=0,d=0;for(let A=0;A<9;A++)i.probe[A].set(0,0,0);let g=0,_=0,v=0,m=0,p=0,P=0,w=0,M=0,F=0,T=0,I=0;c.sort(h_);for(let A=0,b=c.length;A<b;A++){const U=c[A],J=U.color,$=U.intensity,Z=U.distance,rt=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)h+=J.r*$,u+=J.g*$,d+=J.b*$;else if(U.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(U.sh.coefficients[X],$);I++}else if(U.isDirectionalLight){const X=t.get(U);if(X.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const ht=U.shadow,j=e.get(U);j.shadowIntensity=ht.intensity,j.shadowBias=ht.bias,j.shadowNormalBias=ht.normalBias,j.shadowRadius=ht.radius,j.shadowMapSize=ht.mapSize,i.directionalShadow[g]=j,i.directionalShadowMap[g]=rt,i.directionalShadowMatrix[g]=U.shadow.matrix,P++}i.directional[g]=X,g++}else if(U.isSpotLight){const X=t.get(U);X.position.setFromMatrixPosition(U.matrixWorld),X.color.copy(J).multiplyScalar($),X.distance=Z,X.coneCos=Math.cos(U.angle),X.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),X.decay=U.decay,i.spot[v]=X;const ht=U.shadow;if(U.map&&(i.spotLightMap[F]=U.map,F++,ht.updateMatrices(U),U.castShadow&&T++),i.spotLightMatrix[v]=ht.matrix,U.castShadow){const j=e.get(U);j.shadowIntensity=ht.intensity,j.shadowBias=ht.bias,j.shadowNormalBias=ht.normalBias,j.shadowRadius=ht.radius,j.shadowMapSize=ht.mapSize,i.spotShadow[v]=j,i.spotShadowMap[v]=rt,M++}v++}else if(U.isRectAreaLight){const X=t.get(U);X.color.copy(J).multiplyScalar($),X.halfWidth.set(U.width*.5,0,0),X.halfHeight.set(0,U.height*.5,0),i.rectArea[m]=X,m++}else if(U.isPointLight){const X=t.get(U);if(X.color.copy(U.color).multiplyScalar(U.intensity),X.distance=U.distance,X.decay=U.decay,U.castShadow){const ht=U.shadow,j=e.get(U);j.shadowIntensity=ht.intensity,j.shadowBias=ht.bias,j.shadowNormalBias=ht.normalBias,j.shadowRadius=ht.radius,j.shadowMapSize=ht.mapSize,j.shadowCameraNear=ht.camera.near,j.shadowCameraFar=ht.camera.far,i.pointShadow[_]=j,i.pointShadowMap[_]=rt,i.pointShadowMatrix[_]=U.shadow.matrix,w++}i.point[_]=X,_++}else if(U.isHemisphereLight){const X=t.get(U);X.skyColor.copy(U.color).multiplyScalar($),X.groundColor.copy(U.groundColor).multiplyScalar($),i.hemi[p]=X,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=At.LTC_FLOAT_1,i.rectAreaLTC2=At.LTC_FLOAT_2):(i.rectAreaLTC1=At.LTC_HALF_1,i.rectAreaLTC2=At.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;const N=i.hash;(N.directionalLength!==g||N.pointLength!==_||N.spotLength!==v||N.rectAreaLength!==m||N.hemiLength!==p||N.numDirectionalShadows!==P||N.numPointShadows!==w||N.numSpotShadows!==M||N.numSpotMaps!==F||N.numLightProbes!==I)&&(i.directional.length=g,i.spot.length=v,i.rectArea.length=m,i.point.length=_,i.hemi.length=p,i.directionalShadow.length=P,i.directionalShadowMap.length=P,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=P,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=M+F-T,i.spotLightMap.length=F,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=I,N.directionalLength=g,N.pointLength=_,N.spotLength=v,N.rectAreaLength=m,N.hemiLength=p,N.numDirectionalShadows=P,N.numPointShadows=w,N.numSpotShadows=M,N.numSpotMaps=F,N.numLightProbes=I,i.version=c_++)}function l(c,h){let u=0,d=0,g=0,_=0,v=0;const m=h.matrixWorldInverse;for(let p=0,P=c.length;p<P;p++){const w=c[p];if(w.isDirectionalLight){const M=i.directional[u];M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),u++}else if(w.isSpotLight){const M=i.spot[g];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(m),g++}else if(w.isRectAreaLight){const M=i.rectArea[_];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),o.identity(),r.copy(w.matrixWorld),r.premultiply(m),o.extractRotation(r),M.halfWidth.set(w.width*.5,0,0),M.halfHeight.set(0,w.height*.5,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),_++}else if(w.isPointLight){const M=i.point[d];M.position.setFromMatrixPosition(w.matrixWorld),M.position.applyMatrix4(m),d++}else if(w.isHemisphereLight){const M=i.hemi[v];M.direction.setFromMatrixPosition(w.matrixWorld),M.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:i}}function bh(n){const t=new u_(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function d_(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new bh(n),t.set(s,[a])):r>=o.length?(a=new bh(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}class f_ extends ts{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Ad,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class p_ extends ts{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const m_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,g_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function __(n,t,e){let i=new Va;const s=new xt,r=new xt,o=new Te,a=new f_({depthPacking:Rd}),l=new p_,c={},h=e.maxTextureSize,u={[Vn]:qe,[qe]:Vn,[An]:An},d=new Jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xt},radius:{value:4}},vertexShader:m_,fragmentShader:g_}),g=d.clone();g.defines.HORIZONTAL_PASS=1;const _=new Qe;_.setAttribute("position",new un(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new be(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zl;let p=this.type;this.render=function(T,I,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const A=n.getRenderTarget(),b=n.getActiveCubeFace(),U=n.getActiveMipmapLevel(),J=n.state;J.setBlending(Wn),J.buffers.color.setClear(1,1,1,1),J.buffers.depth.setTest(!0),J.setScissorTest(!1);const $=p!==Tn&&this.type===Tn,Z=p===Tn&&this.type!==Tn;for(let rt=0,X=T.length;rt<X;rt++){const ht=T[rt],j=ht.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",ht,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;s.copy(j.mapSize);const st=j.getFrameExtents();if(s.multiply(st),r.copy(j.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/st.x),s.x=r.x*st.x,j.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/st.y),s.y=r.y*st.y,j.mapSize.y=r.y)),j.map===null||$===!0||Z===!0){const Ct=this.type!==Tn?{minFilter:on,magFilter:on}:{};j.map!==null&&j.map.dispose(),j.map=new mi(s.x,s.y,Ct),j.map.texture.name=ht.name+".shadowMap",j.camera.updateProjectionMatrix()}n.setRenderTarget(j.map),n.clear();const at=j.getViewportCount();for(let Ct=0;Ct<at;Ct++){const Kt=j.getViewport(Ct);o.set(r.x*Kt.x,r.y*Kt.y,r.x*Kt.z,r.y*Kt.w),J.viewport(o),j.updateMatrices(ht,Ct),i=j.getFrustum(),M(I,N,j.camera,ht,this.type)}j.isPointLightShadow!==!0&&this.type===Tn&&P(j,N),j.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(A,b,U)};function P(T,I){const N=t.update(v);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,g.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,g.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new mi(s.x,s.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(I,null,N,d,v,null),g.uniforms.shadow_pass.value=T.mapPass.texture,g.uniforms.resolution.value=T.mapSize,g.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(I,null,N,g,v,null)}function w(T,I,N,A){let b=null;const U=N.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(U!==void 0)b=U;else if(b=N.isPointLight===!0?l:a,n.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0){const J=b.uuid,$=I.uuid;let Z=c[J];Z===void 0&&(Z={},c[J]=Z);let rt=Z[$];rt===void 0&&(rt=b.clone(),Z[$]=rt,I.addEventListener("dispose",F)),b=rt}if(b.visible=I.visible,b.wireframe=I.wireframe,A===Tn?b.side=I.shadowSide!==null?I.shadowSide:I.side:b.side=I.shadowSide!==null?I.shadowSide:u[I.side],b.alphaMap=I.alphaMap,b.alphaTest=I.alphaTest,b.map=I.map,b.clipShadows=I.clipShadows,b.clippingPlanes=I.clippingPlanes,b.clipIntersection=I.clipIntersection,b.displacementMap=I.displacementMap,b.displacementScale=I.displacementScale,b.displacementBias=I.displacementBias,b.wireframeLinewidth=I.wireframeLinewidth,b.linewidth=I.linewidth,N.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const J=n.properties.get(b);J.light=N}return b}function M(T,I,N,A,b){if(T.visible===!1)return;if(T.layers.test(I.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&b===Tn)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,T.matrixWorld);const $=t.update(T),Z=T.material;if(Array.isArray(Z)){const rt=$.groups;for(let X=0,ht=rt.length;X<ht;X++){const j=rt[X],st=Z[j.materialIndex];if(st&&st.visible){const at=w(T,st,A,b);T.onBeforeShadow(n,T,I,N,$,at,j),n.renderBufferDirect(N,null,$,at,T,j),T.onAfterShadow(n,T,I,N,$,at,j)}}}else if(Z.visible){const rt=w(T,Z,A,b);T.onBeforeShadow(n,T,I,N,$,rt,null),n.renderBufferDirect(N,null,$,rt,T,null),T.onAfterShadow(n,T,I,N,$,rt,null)}}const J=T.children;for(let $=0,Z=J.length;$<Z;$++)M(J[$],I,N,A,b)}function F(T){T.target.removeEventListener("dispose",F);for(const N in c){const A=c[N],b=T.target.uuid;b in A&&(A[b].dispose(),delete A[b])}}}const x_={[Co]:Do,[Lo]:No,[Io]:zo,[Ui]:Uo,[Do]:Co,[No]:Lo,[zo]:Io,[Uo]:Ui};function v_(n,t){function e(){let B=!1;const Tt=new Te;let K=null;const nt=new Te(0,0,0,0);return{setMask:function(Dt){K!==Dt&&!B&&(n.colorMask(Dt,Dt,Dt,Dt),K=Dt)},setLocked:function(Dt){B=Dt},setClear:function(Dt,Pt,Jt,ve,Ie){Ie===!0&&(Dt*=ve,Pt*=ve,Jt*=ve),Tt.set(Dt,Pt,Jt,ve),nt.equals(Tt)===!1&&(n.clearColor(Dt,Pt,Jt,ve),nt.copy(Tt))},reset:function(){B=!1,K=null,nt.set(-1,0,0,0)}}}function i(){let B=!1,Tt=!1,K=null,nt=null,Dt=null;return{setReversed:function(Pt){if(Tt!==Pt){const Jt=t.get("EXT_clip_control");Tt?Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.ZERO_TO_ONE_EXT):Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.NEGATIVE_ONE_TO_ONE_EXT);const ve=Dt;Dt=null,this.setClear(ve)}Tt=Pt},getReversed:function(){return Tt},setTest:function(Pt){Pt?St(n.DEPTH_TEST):Gt(n.DEPTH_TEST)},setMask:function(Pt){K!==Pt&&!B&&(n.depthMask(Pt),K=Pt)},setFunc:function(Pt){if(Tt&&(Pt=x_[Pt]),nt!==Pt){switch(Pt){case Co:n.depthFunc(n.NEVER);break;case Do:n.depthFunc(n.ALWAYS);break;case Lo:n.depthFunc(n.LESS);break;case Ui:n.depthFunc(n.LEQUAL);break;case Io:n.depthFunc(n.EQUAL);break;case Uo:n.depthFunc(n.GEQUAL);break;case No:n.depthFunc(n.GREATER);break;case zo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}nt=Pt}},setLocked:function(Pt){B=Pt},setClear:function(Pt){Dt!==Pt&&(Tt&&(Pt=1-Pt),n.clearDepth(Pt),Dt=Pt)},reset:function(){B=!1,K=null,nt=null,Dt=null,Tt=!1}}}function s(){let B=!1,Tt=null,K=null,nt=null,Dt=null,Pt=null,Jt=null,ve=null,Ie=null;return{setTest:function(fe){B||(fe?St(n.STENCIL_TEST):Gt(n.STENCIL_TEST))},setMask:function(fe){Tt!==fe&&!B&&(n.stencilMask(fe),Tt=fe)},setFunc:function(fe,$e,rn){(K!==fe||nt!==$e||Dt!==rn)&&(n.stencilFunc(fe,$e,rn),K=fe,nt=$e,Dt=rn)},setOp:function(fe,$e,rn){(Pt!==fe||Jt!==$e||ve!==rn)&&(n.stencilOp(fe,$e,rn),Pt=fe,Jt=$e,ve=rn)},setLocked:function(fe){B=fe},setClear:function(fe){Ie!==fe&&(n.clearStencil(fe),Ie=fe)},reset:function(){B=!1,Tt=null,K=null,nt=null,Dt=null,Pt=null,Jt=null,ve=null,Ie=null}}}const r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,g=[],_=null,v=!1,m=null,p=null,P=null,w=null,M=null,F=null,T=null,I=new ae(0,0,0),N=0,A=!1,b=null,U=null,J=null,$=null,Z=null;const rt=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,ht=0;const j=n.getParameter(n.VERSION);j.indexOf("WebGL")!==-1?(ht=parseFloat(/^WebGL (\d)/.exec(j)[1]),X=ht>=1):j.indexOf("OpenGL ES")!==-1&&(ht=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),X=ht>=2);let st=null,at={};const Ct=n.getParameter(n.SCISSOR_BOX),Kt=n.getParameter(n.VIEWPORT),de=new Te().fromArray(Ct),it=new Te().fromArray(Kt);function _t(B,Tt,K,nt){const Dt=new Uint8Array(4),Pt=n.createTexture();n.bindTexture(B,Pt),n.texParameteri(B,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(B,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Jt=0;Jt<K;Jt++)B===n.TEXTURE_3D||B===n.TEXTURE_2D_ARRAY?n.texImage3D(Tt,0,n.RGBA,1,1,nt,0,n.RGBA,n.UNSIGNED_BYTE,Dt):n.texImage2D(Tt+Jt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Dt);return Pt}const Bt={};Bt[n.TEXTURE_2D]=_t(n.TEXTURE_2D,n.TEXTURE_2D,1),Bt[n.TEXTURE_CUBE_MAP]=_t(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Bt[n.TEXTURE_2D_ARRAY]=_t(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Bt[n.TEXTURE_3D]=_t(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),St(n.DEPTH_TEST),o.setFunc(Ui),ft(!1),Ut(Yl),St(n.CULL_FACE),L(Wn);function St(B){h[B]!==!0&&(n.enable(B),h[B]=!0)}function Gt(B){h[B]!==!1&&(n.disable(B),h[B]=!1)}function jt(B,Tt){return u[B]!==Tt?(n.bindFramebuffer(B,Tt),u[B]=Tt,B===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=Tt),B===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=Tt),!0):!1}function Xt(B,Tt){let K=g,nt=!1;if(B){K=d.get(Tt),K===void 0&&(K=[],d.set(Tt,K));const Dt=B.textures;if(K.length!==Dt.length||K[0]!==n.COLOR_ATTACHMENT0){for(let Pt=0,Jt=Dt.length;Pt<Jt;Pt++)K[Pt]=n.COLOR_ATTACHMENT0+Pt;K.length=Dt.length,nt=!0}}else K[0]!==n.BACK&&(K[0]=n.BACK,nt=!0);nt&&n.drawBuffers(K)}function ie(B){return _!==B?(n.useProgram(B),_=B,!0):!1}const lt={[ci]:n.FUNC_ADD,[td]:n.FUNC_SUBTRACT,[ed]:n.FUNC_REVERSE_SUBTRACT};lt[nd]=n.MIN,lt[id]=n.MAX;const vt={[sd]:n.ZERO,[rd]:n.ONE,[od]:n.SRC_COLOR,[Ro]:n.SRC_ALPHA,[dd]:n.SRC_ALPHA_SATURATE,[hd]:n.DST_COLOR,[ld]:n.DST_ALPHA,[ad]:n.ONE_MINUS_SRC_COLOR,[Po]:n.ONE_MINUS_SRC_ALPHA,[ud]:n.ONE_MINUS_DST_COLOR,[cd]:n.ONE_MINUS_DST_ALPHA,[fd]:n.CONSTANT_COLOR,[pd]:n.ONE_MINUS_CONSTANT_COLOR,[md]:n.CONSTANT_ALPHA,[gd]:n.ONE_MINUS_CONSTANT_ALPHA};function L(B,Tt,K,nt,Dt,Pt,Jt,ve,Ie,fe){if(B===Wn){v===!0&&(Gt(n.BLEND),v=!1);return}if(v===!1&&(St(n.BLEND),v=!0),B!==Qu){if(B!==m||fe!==A){if((p!==ci||M!==ci)&&(n.blendEquation(n.FUNC_ADD),p=ci,M=ci),fe)switch(B){case Ii:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Kl:n.blendFunc(n.ONE,n.ONE);break;case Jl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ql:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Ii:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Kl:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Jl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ql:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}P=null,w=null,F=null,T=null,I.set(0,0,0),N=0,m=B,A=fe}return}Dt=Dt||Tt,Pt=Pt||K,Jt=Jt||nt,(Tt!==p||Dt!==M)&&(n.blendEquationSeparate(lt[Tt],lt[Dt]),p=Tt,M=Dt),(K!==P||nt!==w||Pt!==F||Jt!==T)&&(n.blendFuncSeparate(vt[K],vt[nt],vt[Pt],vt[Jt]),P=K,w=nt,F=Pt,T=Jt),(ve.equals(I)===!1||Ie!==N)&&(n.blendColor(ve.r,ve.g,ve.b,Ie),I.copy(ve),N=Ie),m=B,A=!1}function Ht(B,Tt){B.side===An?Gt(n.CULL_FACE):St(n.CULL_FACE);let K=B.side===qe;Tt&&(K=!K),ft(K),B.blending===Ii&&B.transparent===!1?L(Wn):L(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);const nt=B.stencilWrite;a.setTest(nt),nt&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Wt(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?St(n.SAMPLE_ALPHA_TO_COVERAGE):Gt(n.SAMPLE_ALPHA_TO_COVERAGE)}function ft(B){b!==B&&(B?n.frontFace(n.CW):n.frontFace(n.CCW),b=B)}function Ut(B){B!==Ku?(St(n.CULL_FACE),B!==U&&(B===Yl?n.cullFace(n.BACK):B===Ju?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Gt(n.CULL_FACE),U=B}function bt(B){B!==J&&(X&&n.lineWidth(B),J=B)}function Wt(B,Tt,K){B?(St(n.POLYGON_OFFSET_FILL),($!==Tt||Z!==K)&&(n.polygonOffset(Tt,K),$=Tt,Z=K)):Gt(n.POLYGON_OFFSET_FILL)}function Lt(B){B?St(n.SCISSOR_TEST):Gt(n.SCISSOR_TEST)}function D(B){B===void 0&&(B=n.TEXTURE0+rt-1),st!==B&&(n.activeTexture(B),st=B)}function y(B,Tt,K){K===void 0&&(st===null?K=n.TEXTURE0+rt-1:K=st);let nt=at[K];nt===void 0&&(nt={type:void 0,texture:void 0},at[K]=nt),(nt.type!==B||nt.texture!==Tt)&&(st!==K&&(n.activeTexture(K),st=K),n.bindTexture(B,Tt||Bt[B]),nt.type=B,nt.texture=Tt)}function V(){const B=at[st];B!==void 0&&B.type!==void 0&&(n.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function tt(){try{n.compressedTexImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ct(){try{n.compressedTexImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Q(){try{n.texSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function kt(){try{n.texSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Rt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function It(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function re(){try{n.texStorage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function mt(){try{n.texStorage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function zt(){try{n.texImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function qt(){try{n.texImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function $t(B){de.equals(B)===!1&&(n.scissor(B.x,B.y,B.z,B.w),de.copy(B))}function Ot(B){it.equals(B)===!1&&(n.viewport(B.x,B.y,B.z,B.w),it.copy(B))}function le(B,Tt){let K=c.get(Tt);K===void 0&&(K=new WeakMap,c.set(Tt,K));let nt=K.get(B);nt===void 0&&(nt=n.getUniformBlockIndex(Tt,B.name),K.set(B,nt))}function Qt(B,Tt){const nt=c.get(Tt).get(B);l.get(Tt)!==nt&&(n.uniformBlockBinding(Tt,nt,B.__bindingPointIndex),l.set(Tt,nt))}function xe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},st=null,at={},u={},d=new WeakMap,g=[],_=null,v=!1,m=null,p=null,P=null,w=null,M=null,F=null,T=null,I=new ae(0,0,0),N=0,A=!1,b=null,U=null,J=null,$=null,Z=null,de.set(0,0,n.canvas.width,n.canvas.height),it.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:St,disable:Gt,bindFramebuffer:jt,drawBuffers:Xt,useProgram:ie,setBlending:L,setMaterial:Ht,setFlipSided:ft,setCullFace:Ut,setLineWidth:bt,setPolygonOffset:Wt,setScissorTest:Lt,activeTexture:D,bindTexture:y,unbindTexture:V,compressedTexImage2D:tt,compressedTexImage3D:ct,texImage2D:zt,texImage3D:qt,updateUBOMapping:le,uniformBlockBinding:Qt,texStorage2D:re,texStorage3D:mt,texSubImage2D:Q,texSubImage3D:kt,compressedTexSubImage2D:Rt,compressedTexSubImage3D:It,scissor:$t,viewport:Ot,reset:xe}}function Eh(n,t,e,i){const s=M_(i);switch(e){case rc:return n*t;case ac:return n*t;case lc:return n*t*2;case cc:return n*t/s.components*s.byteLength;case $o:return n*t/s.components*s.byteLength;case hc:return n*t*2/s.components*s.byteLength;case Xo:return n*t*2/s.components*s.byteLength;case oc:return n*t*3/s.components*s.byteLength;case an:return n*t*4/s.components*s.byteLength;case qo:return n*t*4/s.components*s.byteLength;case dr:case fr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case pr:case mr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Zo:case Ko:return Math.max(n,16)*Math.max(t,8)/4;case Yo:case jo:return Math.max(n,8)*Math.max(t,8)/2;case Jo:case Qo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case ta:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case ea:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case na:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case ia:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case sa:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case ra:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case oa:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case aa:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case la:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case ca:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case ha:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case ua:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case da:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case fa:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case pa:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case gr:case ma:case ga:return Math.ceil(n/4)*Math.ceil(t/4)*16;case uc:case _a:return Math.ceil(n/4)*Math.ceil(t/4)*8;case xa:case va:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function M_(n){switch(n){case Rn:case nc:return{byteLength:1,components:1};case Ts:case ic:case As:return{byteLength:2,components:1};case Vo:case Wo:return{byteLength:2,components:4};case di:case Go:case Pn:return{byteLength:4,components:1};case sc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function y_(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new xt,h=new WeakMap;let u;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(D,y){return g?new OffscreenCanvas(D,y):vr("canvas")}function v(D,y,V){let tt=1;const ct=Lt(D);if((ct.width>V||ct.height>V)&&(tt=V/Math.max(ct.width,ct.height)),tt<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const Q=Math.floor(tt*ct.width),kt=Math.floor(tt*ct.height);u===void 0&&(u=_(Q,kt));const Rt=y?_(Q,kt):u;return Rt.width=Q,Rt.height=kt,Rt.getContext("2d").drawImage(D,0,0,Q,kt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ct.width+"x"+ct.height+") to ("+Q+"x"+kt+")."),Rt}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ct.width+"x"+ct.height+")."),D;return D}function m(D){return D.generateMipmaps}function p(D){n.generateMipmap(D)}function P(D){return D.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?n.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(D,y,V,tt,ct=!1){if(D!==null){if(n[D]!==void 0)return n[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let Q=y;if(y===n.RED&&(V===n.FLOAT&&(Q=n.R32F),V===n.HALF_FLOAT&&(Q=n.R16F),V===n.UNSIGNED_BYTE&&(Q=n.R8)),y===n.RED_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.R8UI),V===n.UNSIGNED_SHORT&&(Q=n.R16UI),V===n.UNSIGNED_INT&&(Q=n.R32UI),V===n.BYTE&&(Q=n.R8I),V===n.SHORT&&(Q=n.R16I),V===n.INT&&(Q=n.R32I)),y===n.RG&&(V===n.FLOAT&&(Q=n.RG32F),V===n.HALF_FLOAT&&(Q=n.RG16F),V===n.UNSIGNED_BYTE&&(Q=n.RG8)),y===n.RG_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.RG8UI),V===n.UNSIGNED_SHORT&&(Q=n.RG16UI),V===n.UNSIGNED_INT&&(Q=n.RG32UI),V===n.BYTE&&(Q=n.RG8I),V===n.SHORT&&(Q=n.RG16I),V===n.INT&&(Q=n.RG32I)),y===n.RGB_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),V===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),V===n.UNSIGNED_INT&&(Q=n.RGB32UI),V===n.BYTE&&(Q=n.RGB8I),V===n.SHORT&&(Q=n.RGB16I),V===n.INT&&(Q=n.RGB32I)),y===n.RGBA_INTEGER&&(V===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),V===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),V===n.UNSIGNED_INT&&(Q=n.RGBA32UI),V===n.BYTE&&(Q=n.RGBA8I),V===n.SHORT&&(Q=n.RGBA16I),V===n.INT&&(Q=n.RGBA32I)),y===n.RGB&&V===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),y===n.RGBA){const kt=ct?_r:ue.getTransfer(tt);V===n.FLOAT&&(Q=n.RGBA32F),V===n.HALF_FLOAT&&(Q=n.RGBA16F),V===n.UNSIGNED_BYTE&&(Q=kt===ge?n.SRGB8_ALPHA8:n.RGBA8),V===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),V===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function M(D,y){let V;return D?y===null||y===di||y===Oi?V=n.DEPTH24_STENCIL8:y===Pn?V=n.DEPTH32F_STENCIL8:y===Ts&&(V=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===di||y===Oi?V=n.DEPTH_COMPONENT24:y===Pn?V=n.DEPTH_COMPONENT32F:y===Ts&&(V=n.DEPTH_COMPONENT16),V}function F(D,y){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==on&&D.minFilter!==gn?Math.log2(Math.max(y.width,y.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?y.mipmaps.length:1}function T(D){const y=D.target;y.removeEventListener("dispose",T),N(y),y.isVideoTexture&&h.delete(y)}function I(D){const y=D.target;y.removeEventListener("dispose",I),b(y)}function N(D){const y=i.get(D);if(y.__webglInit===void 0)return;const V=D.source,tt=d.get(V);if(tt){const ct=tt[y.__cacheKey];ct.usedTimes--,ct.usedTimes===0&&A(D),Object.keys(tt).length===0&&d.delete(V)}i.remove(D)}function A(D){const y=i.get(D);n.deleteTexture(y.__webglTexture);const V=D.source,tt=d.get(V);delete tt[y.__cacheKey],o.memory.textures--}function b(D){const y=i.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),i.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let tt=0;tt<6;tt++){if(Array.isArray(y.__webglFramebuffer[tt]))for(let ct=0;ct<y.__webglFramebuffer[tt].length;ct++)n.deleteFramebuffer(y.__webglFramebuffer[tt][ct]);else n.deleteFramebuffer(y.__webglFramebuffer[tt]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[tt])}else{if(Array.isArray(y.__webglFramebuffer))for(let tt=0;tt<y.__webglFramebuffer.length;tt++)n.deleteFramebuffer(y.__webglFramebuffer[tt]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let tt=0;tt<y.__webglColorRenderbuffer.length;tt++)y.__webglColorRenderbuffer[tt]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[tt]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const V=D.textures;for(let tt=0,ct=V.length;tt<ct;tt++){const Q=i.get(V[tt]);Q.__webglTexture&&(n.deleteTexture(Q.__webglTexture),o.memory.textures--),i.remove(V[tt])}i.remove(D)}let U=0;function J(){U=0}function $(){const D=U;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),U+=1,D}function Z(D){const y=[];return y.push(D.wrapS),y.push(D.wrapT),y.push(D.wrapR||0),y.push(D.magFilter),y.push(D.minFilter),y.push(D.anisotropy),y.push(D.internalFormat),y.push(D.format),y.push(D.type),y.push(D.generateMipmaps),y.push(D.premultiplyAlpha),y.push(D.flipY),y.push(D.unpackAlignment),y.push(D.colorSpace),y.join()}function rt(D,y){const V=i.get(D);if(D.isVideoTexture&&bt(D),D.isRenderTargetTexture===!1&&D.version>0&&V.__version!==D.version){const tt=D.image;if(tt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(tt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{it(V,D,y);return}}e.bindTexture(n.TEXTURE_2D,V.__webglTexture,n.TEXTURE0+y)}function X(D,y){const V=i.get(D);if(D.version>0&&V.__version!==D.version){it(V,D,y);return}e.bindTexture(n.TEXTURE_2D_ARRAY,V.__webglTexture,n.TEXTURE0+y)}function ht(D,y){const V=i.get(D);if(D.version>0&&V.__version!==D.version){it(V,D,y);return}e.bindTexture(n.TEXTURE_3D,V.__webglTexture,n.TEXTURE0+y)}function j(D,y){const V=i.get(D);if(D.version>0&&V.__version!==D.version){_t(V,D,y);return}e.bindTexture(n.TEXTURE_CUBE_MAP,V.__webglTexture,n.TEXTURE0+y)}const st={[Bo]:n.REPEAT,[hi]:n.CLAMP_TO_EDGE,[ko]:n.MIRRORED_REPEAT},at={[on]:n.NEAREST,[Td]:n.NEAREST_MIPMAP_NEAREST,[ur]:n.NEAREST_MIPMAP_LINEAR,[gn]:n.LINEAR,[Ho]:n.LINEAR_MIPMAP_NEAREST,[ui]:n.LINEAR_MIPMAP_LINEAR},Ct={[Cd]:n.NEVER,[zd]:n.ALWAYS,[Dd]:n.LESS,[pc]:n.LEQUAL,[Ld]:n.EQUAL,[Nd]:n.GEQUAL,[Id]:n.GREATER,[Ud]:n.NOTEQUAL};function Kt(D,y){if(y.type===Pn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===gn||y.magFilter===Ho||y.magFilter===ur||y.magFilter===ui||y.minFilter===gn||y.minFilter===Ho||y.minFilter===ur||y.minFilter===ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(D,n.TEXTURE_WRAP_S,st[y.wrapS]),n.texParameteri(D,n.TEXTURE_WRAP_T,st[y.wrapT]),(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)&&n.texParameteri(D,n.TEXTURE_WRAP_R,st[y.wrapR]),n.texParameteri(D,n.TEXTURE_MAG_FILTER,at[y.magFilter]),n.texParameteri(D,n.TEXTURE_MIN_FILTER,at[y.minFilter]),y.compareFunction&&(n.texParameteri(D,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(D,n.TEXTURE_COMPARE_FUNC,Ct[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===on||y.minFilter!==ur&&y.minFilter!==ui||y.type===Pn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");n.texParameterf(D,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function de(D,y){let V=!1;D.__webglInit===void 0&&(D.__webglInit=!0,y.addEventListener("dispose",T));const tt=y.source;let ct=d.get(tt);ct===void 0&&(ct={},d.set(tt,ct));const Q=Z(y);if(Q!==D.__cacheKey){ct[Q]===void 0&&(ct[Q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,V=!0),ct[Q].usedTimes++;const kt=ct[D.__cacheKey];kt!==void 0&&(ct[D.__cacheKey].usedTimes--,kt.usedTimes===0&&A(y)),D.__cacheKey=Q,D.__webglTexture=ct[Q].texture}return V}function it(D,y,V){let tt=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(tt=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(tt=n.TEXTURE_3D);const ct=de(D,y),Q=y.source;e.bindTexture(tt,D.__webglTexture,n.TEXTURE0+V);const kt=i.get(Q);if(Q.version!==kt.__version||ct===!0){e.activeTexture(n.TEXTURE0+V);const Rt=ue.getPrimaries(ue.workingColorSpace),It=y.colorSpace===Xn?null:ue.getPrimaries(y.colorSpace),re=y.colorSpace===Xn||Rt===It?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,re);let mt=v(y.image,!1,s.maxTextureSize);mt=Wt(y,mt);const zt=r.convert(y.format,y.colorSpace),qt=r.convert(y.type);let $t=w(y.internalFormat,zt,qt,y.colorSpace,y.isVideoTexture);Kt(tt,y);let Ot;const le=y.mipmaps,Qt=y.isVideoTexture!==!0,xe=kt.__version===void 0||ct===!0,B=Q.dataReady,Tt=F(y,mt);if(y.isDepthTexture)$t=M(y.format===Bi,y.type),xe&&(Qt?e.texStorage2D(n.TEXTURE_2D,1,$t,mt.width,mt.height):e.texImage2D(n.TEXTURE_2D,0,$t,mt.width,mt.height,0,zt,qt,null));else if(y.isDataTexture)if(le.length>0){Qt&&xe&&e.texStorage2D(n.TEXTURE_2D,Tt,$t,le[0].width,le[0].height);for(let K=0,nt=le.length;K<nt;K++)Ot=le[K],Qt?B&&e.texSubImage2D(n.TEXTURE_2D,K,0,0,Ot.width,Ot.height,zt,qt,Ot.data):e.texImage2D(n.TEXTURE_2D,K,$t,Ot.width,Ot.height,0,zt,qt,Ot.data);y.generateMipmaps=!1}else Qt?(xe&&e.texStorage2D(n.TEXTURE_2D,Tt,$t,mt.width,mt.height),B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,mt.width,mt.height,zt,qt,mt.data)):e.texImage2D(n.TEXTURE_2D,0,$t,mt.width,mt.height,0,zt,qt,mt.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Qt&&xe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Tt,$t,le[0].width,le[0].height,mt.depth);for(let K=0,nt=le.length;K<nt;K++)if(Ot=le[K],y.format!==an)if(zt!==null)if(Qt){if(B)if(y.layerUpdates.size>0){const Dt=Eh(Ot.width,Ot.height,y.format,y.type);for(const Pt of y.layerUpdates){const Jt=Ot.data.subarray(Pt*Dt/Ot.data.BYTES_PER_ELEMENT,(Pt+1)*Dt/Ot.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,Pt,Ot.width,Ot.height,1,zt,Jt)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,Ot.width,Ot.height,mt.depth,zt,Ot.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,K,$t,Ot.width,Ot.height,mt.depth,0,Ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Qt?B&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,K,0,0,0,Ot.width,Ot.height,mt.depth,zt,qt,Ot.data):e.texImage3D(n.TEXTURE_2D_ARRAY,K,$t,Ot.width,Ot.height,mt.depth,0,zt,qt,Ot.data)}else{Qt&&xe&&e.texStorage2D(n.TEXTURE_2D,Tt,$t,le[0].width,le[0].height);for(let K=0,nt=le.length;K<nt;K++)Ot=le[K],y.format!==an?zt!==null?Qt?B&&e.compressedTexSubImage2D(n.TEXTURE_2D,K,0,0,Ot.width,Ot.height,zt,Ot.data):e.compressedTexImage2D(n.TEXTURE_2D,K,$t,Ot.width,Ot.height,0,Ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qt?B&&e.texSubImage2D(n.TEXTURE_2D,K,0,0,Ot.width,Ot.height,zt,qt,Ot.data):e.texImage2D(n.TEXTURE_2D,K,$t,Ot.width,Ot.height,0,zt,qt,Ot.data)}else if(y.isDataArrayTexture)if(Qt){if(xe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Tt,$t,mt.width,mt.height,mt.depth),B)if(y.layerUpdates.size>0){const K=Eh(mt.width,mt.height,y.format,y.type);for(const nt of y.layerUpdates){const Dt=mt.data.subarray(nt*K/mt.data.BYTES_PER_ELEMENT,(nt+1)*K/mt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,nt,mt.width,mt.height,1,zt,qt,Dt)}y.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,mt.width,mt.height,mt.depth,zt,qt,mt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,$t,mt.width,mt.height,mt.depth,0,zt,qt,mt.data);else if(y.isData3DTexture)Qt?(xe&&e.texStorage3D(n.TEXTURE_3D,Tt,$t,mt.width,mt.height,mt.depth),B&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,mt.width,mt.height,mt.depth,zt,qt,mt.data)):e.texImage3D(n.TEXTURE_3D,0,$t,mt.width,mt.height,mt.depth,0,zt,qt,mt.data);else if(y.isFramebufferTexture){if(xe)if(Qt)e.texStorage2D(n.TEXTURE_2D,Tt,$t,mt.width,mt.height);else{let K=mt.width,nt=mt.height;for(let Dt=0;Dt<Tt;Dt++)e.texImage2D(n.TEXTURE_2D,Dt,$t,K,nt,0,zt,qt,null),K>>=1,nt>>=1}}else if(le.length>0){if(Qt&&xe){const K=Lt(le[0]);e.texStorage2D(n.TEXTURE_2D,Tt,$t,K.width,K.height)}for(let K=0,nt=le.length;K<nt;K++)Ot=le[K],Qt?B&&e.texSubImage2D(n.TEXTURE_2D,K,0,0,zt,qt,Ot):e.texImage2D(n.TEXTURE_2D,K,$t,zt,qt,Ot);y.generateMipmaps=!1}else if(Qt){if(xe){const K=Lt(mt);e.texStorage2D(n.TEXTURE_2D,Tt,$t,K.width,K.height)}B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,zt,qt,mt)}else e.texImage2D(n.TEXTURE_2D,0,$t,zt,qt,mt);m(y)&&p(tt),kt.__version=Q.version,y.onUpdate&&y.onUpdate(y)}D.__version=y.version}function _t(D,y,V){if(y.image.length!==6)return;const tt=de(D,y),ct=y.source;e.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+V);const Q=i.get(ct);if(ct.version!==Q.__version||tt===!0){e.activeTexture(n.TEXTURE0+V);const kt=ue.getPrimaries(ue.workingColorSpace),Rt=y.colorSpace===Xn?null:ue.getPrimaries(y.colorSpace),It=y.colorSpace===Xn||kt===Rt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);const re=y.isCompressedTexture||y.image[0].isCompressedTexture,mt=y.image[0]&&y.image[0].isDataTexture,zt=[];for(let nt=0;nt<6;nt++)!re&&!mt?zt[nt]=v(y.image[nt],!0,s.maxCubemapSize):zt[nt]=mt?y.image[nt].image:y.image[nt],zt[nt]=Wt(y,zt[nt]);const qt=zt[0],$t=r.convert(y.format,y.colorSpace),Ot=r.convert(y.type),le=w(y.internalFormat,$t,Ot,y.colorSpace),Qt=y.isVideoTexture!==!0,xe=Q.__version===void 0||tt===!0,B=ct.dataReady;let Tt=F(y,qt);Kt(n.TEXTURE_CUBE_MAP,y);let K;if(re){Qt&&xe&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Tt,le,qt.width,qt.height);for(let nt=0;nt<6;nt++){K=zt[nt].mipmaps;for(let Dt=0;Dt<K.length;Dt++){const Pt=K[Dt];y.format!==an?$t!==null?Qt?B&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,0,0,Pt.width,Pt.height,$t,Pt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,le,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Qt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,0,0,Pt.width,Pt.height,$t,Ot,Pt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt,le,Pt.width,Pt.height,0,$t,Ot,Pt.data)}}}else{if(K=y.mipmaps,Qt&&xe){K.length>0&&Tt++;const nt=Lt(zt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Tt,le,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(mt){Qt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,zt[nt].width,zt[nt].height,$t,Ot,zt[nt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,le,zt[nt].width,zt[nt].height,0,$t,Ot,zt[nt].data);for(let Dt=0;Dt<K.length;Dt++){const Jt=K[Dt].image[nt].image;Qt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,0,0,Jt.width,Jt.height,$t,Ot,Jt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,le,Jt.width,Jt.height,0,$t,Ot,Jt.data)}}else{Qt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,$t,Ot,zt[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,le,$t,Ot,zt[nt]);for(let Dt=0;Dt<K.length;Dt++){const Pt=K[Dt];Qt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,0,0,$t,Ot,Pt.image[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Dt+1,le,$t,Ot,Pt.image[nt])}}}m(y)&&p(n.TEXTURE_CUBE_MAP),Q.__version=ct.version,y.onUpdate&&y.onUpdate(y)}D.__version=y.version}function Bt(D,y,V,tt,ct,Q){const kt=r.convert(V.format,V.colorSpace),Rt=r.convert(V.type),It=w(V.internalFormat,kt,Rt,V.colorSpace),re=i.get(y),mt=i.get(V);if(mt.__renderTarget=y,!re.__hasExternalTextures){const zt=Math.max(1,y.width>>Q),qt=Math.max(1,y.height>>Q);ct===n.TEXTURE_3D||ct===n.TEXTURE_2D_ARRAY?e.texImage3D(ct,Q,It,zt,qt,y.depth,0,kt,Rt,null):e.texImage2D(ct,Q,It,zt,qt,0,kt,Rt,null)}e.bindFramebuffer(n.FRAMEBUFFER,D),Ut(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,tt,ct,mt.__webglTexture,0,ft(y)):(ct===n.TEXTURE_2D||ct>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ct<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,tt,ct,mt.__webglTexture,Q),e.bindFramebuffer(n.FRAMEBUFFER,null)}function St(D,y,V){if(n.bindRenderbuffer(n.RENDERBUFFER,D),y.depthBuffer){const tt=y.depthTexture,ct=tt&&tt.isDepthTexture?tt.type:null,Q=M(y.stencilBuffer,ct),kt=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Rt=ft(y);Ut(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Rt,Q,y.width,y.height):V?n.renderbufferStorageMultisample(n.RENDERBUFFER,Rt,Q,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,Q,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,kt,n.RENDERBUFFER,D)}else{const tt=y.textures;for(let ct=0;ct<tt.length;ct++){const Q=tt[ct],kt=r.convert(Q.format,Q.colorSpace),Rt=r.convert(Q.type),It=w(Q.internalFormat,kt,Rt,Q.colorSpace),re=ft(y);V&&Ut(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,re,It,y.width,y.height):Ut(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,re,It,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,It,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Gt(D,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,D),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const tt=i.get(y.depthTexture);tt.__renderTarget=y,(!tt.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),rt(y.depthTexture,0);const ct=tt.__webglTexture,Q=ft(y);if(y.depthTexture.format===Fi)Ut(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ct,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ct,0);else if(y.depthTexture.format===Bi)Ut(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ct,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ct,0);else throw new Error("Unknown depthTexture format")}function jt(D){const y=i.get(D),V=D.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==D.depthTexture){const tt=D.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),tt){const ct=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,tt.removeEventListener("dispose",ct)};tt.addEventListener("dispose",ct),y.__depthDisposeCallback=ct}y.__boundDepthTexture=tt}if(D.depthTexture&&!y.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");Gt(y.__webglFramebuffer,D)}else if(V){y.__webglDepthbuffer=[];for(let tt=0;tt<6;tt++)if(e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[tt]),y.__webglDepthbuffer[tt]===void 0)y.__webglDepthbuffer[tt]=n.createRenderbuffer(),St(y.__webglDepthbuffer[tt],D,!1);else{const ct=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=y.__webglDepthbuffer[tt];n.bindRenderbuffer(n.RENDERBUFFER,Q),n.framebufferRenderbuffer(n.FRAMEBUFFER,ct,n.RENDERBUFFER,Q)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),St(y.__webglDepthbuffer,D,!1);else{const tt=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ct),n.framebufferRenderbuffer(n.FRAMEBUFFER,tt,n.RENDERBUFFER,ct)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Xt(D,y,V){const tt=i.get(D);y!==void 0&&Bt(tt.__webglFramebuffer,D,D.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),V!==void 0&&jt(D)}function ie(D){const y=D.texture,V=i.get(D),tt=i.get(y);D.addEventListener("dispose",I);const ct=D.textures,Q=D.isWebGLCubeRenderTarget===!0,kt=ct.length>1;if(kt||(tt.__webglTexture===void 0&&(tt.__webglTexture=n.createTexture()),tt.__version=y.version,o.memory.textures++),Q){V.__webglFramebuffer=[];for(let Rt=0;Rt<6;Rt++)if(y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer[Rt]=[];for(let It=0;It<y.mipmaps.length;It++)V.__webglFramebuffer[Rt][It]=n.createFramebuffer()}else V.__webglFramebuffer[Rt]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){V.__webglFramebuffer=[];for(let Rt=0;Rt<y.mipmaps.length;Rt++)V.__webglFramebuffer[Rt]=n.createFramebuffer()}else V.__webglFramebuffer=n.createFramebuffer();if(kt)for(let Rt=0,It=ct.length;Rt<It;Rt++){const re=i.get(ct[Rt]);re.__webglTexture===void 0&&(re.__webglTexture=n.createTexture(),o.memory.textures++)}if(D.samples>0&&Ut(D)===!1){V.__webglMultisampledFramebuffer=n.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let Rt=0;Rt<ct.length;Rt++){const It=ct[Rt];V.__webglColorRenderbuffer[Rt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,V.__webglColorRenderbuffer[Rt]);const re=r.convert(It.format,It.colorSpace),mt=r.convert(It.type),zt=w(It.internalFormat,re,mt,It.colorSpace,D.isXRRenderTarget===!0),qt=ft(D);n.renderbufferStorageMultisample(n.RENDERBUFFER,qt,zt,D.width,D.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Rt,n.RENDERBUFFER,V.__webglColorRenderbuffer[Rt])}n.bindRenderbuffer(n.RENDERBUFFER,null),D.depthBuffer&&(V.__webglDepthRenderbuffer=n.createRenderbuffer(),St(V.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Q){e.bindTexture(n.TEXTURE_CUBE_MAP,tt.__webglTexture),Kt(n.TEXTURE_CUBE_MAP,y);for(let Rt=0;Rt<6;Rt++)if(y.mipmaps&&y.mipmaps.length>0)for(let It=0;It<y.mipmaps.length;It++)Bt(V.__webglFramebuffer[Rt][It],D,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Rt,It);else Bt(V.__webglFramebuffer[Rt],D,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Rt,0);m(y)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(kt){for(let Rt=0,It=ct.length;Rt<It;Rt++){const re=ct[Rt],mt=i.get(re);e.bindTexture(n.TEXTURE_2D,mt.__webglTexture),Kt(n.TEXTURE_2D,re),Bt(V.__webglFramebuffer,D,re,n.COLOR_ATTACHMENT0+Rt,n.TEXTURE_2D,0),m(re)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let Rt=n.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Rt=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Rt,tt.__webglTexture),Kt(Rt,y),y.mipmaps&&y.mipmaps.length>0)for(let It=0;It<y.mipmaps.length;It++)Bt(V.__webglFramebuffer[It],D,y,n.COLOR_ATTACHMENT0,Rt,It);else Bt(V.__webglFramebuffer,D,y,n.COLOR_ATTACHMENT0,Rt,0);m(y)&&p(Rt),e.unbindTexture()}D.depthBuffer&&jt(D)}function lt(D){const y=D.textures;for(let V=0,tt=y.length;V<tt;V++){const ct=y[V];if(m(ct)){const Q=P(D),kt=i.get(ct).__webglTexture;e.bindTexture(Q,kt),p(Q),e.unbindTexture()}}}const vt=[],L=[];function Ht(D){if(D.samples>0){if(Ut(D)===!1){const y=D.textures,V=D.width,tt=D.height;let ct=n.COLOR_BUFFER_BIT;const Q=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,kt=i.get(D),Rt=y.length>1;if(Rt)for(let It=0;It<y.length;It++)e.bindFramebuffer(n.FRAMEBUFFER,kt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+It,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,kt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+It,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,kt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,kt.__webglFramebuffer);for(let It=0;It<y.length;It++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(ct|=n.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(ct|=n.STENCIL_BUFFER_BIT)),Rt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,kt.__webglColorRenderbuffer[It]);const re=i.get(y[It]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,re,0)}n.blitFramebuffer(0,0,V,tt,0,0,V,tt,ct,n.NEAREST),l===!0&&(vt.length=0,L.length=0,vt.push(n.COLOR_ATTACHMENT0+It),D.depthBuffer&&D.resolveDepthBuffer===!1&&(vt.push(Q),L.push(Q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,L)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,vt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Rt)for(let It=0;It<y.length;It++){e.bindFramebuffer(n.FRAMEBUFFER,kt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+It,n.RENDERBUFFER,kt.__webglColorRenderbuffer[It]);const re=i.get(y[It]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,kt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+It,n.TEXTURE_2D,re,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,kt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const y=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function ft(D){return Math.min(s.maxSamples,D.samples)}function Ut(D){const y=i.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function bt(D){const y=o.render.frame;h.get(D)!==y&&(h.set(D,y),D.update())}function Wt(D,y){const V=D.colorSpace,tt=D.format,ct=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||V!==ki&&V!==Xn&&(ue.getTransfer(V)===ge?(tt!==an||ct!==Rn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),y}function Lt(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=$,this.resetTextureUnits=J,this.setTexture2D=rt,this.setTexture2DArray=X,this.setTexture3D=ht,this.setTextureCube=j,this.rebindTextures=Xt,this.setupRenderTarget=ie,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=Ht,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=Bt,this.useMultisampledRTT=Ut}function S_(n,t){function e(i,s=Xn){let r;const o=ue.getTransfer(s);if(i===Rn)return n.UNSIGNED_BYTE;if(i===Vo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Wo)return n.UNSIGNED_SHORT_5_5_5_1;if(i===sc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===nc)return n.BYTE;if(i===ic)return n.SHORT;if(i===Ts)return n.UNSIGNED_SHORT;if(i===Go)return n.INT;if(i===di)return n.UNSIGNED_INT;if(i===Pn)return n.FLOAT;if(i===As)return n.HALF_FLOAT;if(i===rc)return n.ALPHA;if(i===oc)return n.RGB;if(i===an)return n.RGBA;if(i===ac)return n.LUMINANCE;if(i===lc)return n.LUMINANCE_ALPHA;if(i===Fi)return n.DEPTH_COMPONENT;if(i===Bi)return n.DEPTH_STENCIL;if(i===cc)return n.RED;if(i===$o)return n.RED_INTEGER;if(i===hc)return n.RG;if(i===Xo)return n.RG_INTEGER;if(i===qo)return n.RGBA_INTEGER;if(i===dr||i===fr||i===pr||i===mr)if(o===ge)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===dr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===dr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===fr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===pr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===mr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Yo||i===Zo||i===jo||i===Ko)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Yo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Zo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===jo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ko)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Jo||i===Qo||i===ta)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Jo||i===Qo)return o===ge?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ta)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===ea||i===na||i===ia||i===sa||i===ra||i===oa||i===aa||i===la||i===ca||i===ha||i===ua||i===da||i===fa||i===pa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ea)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===na)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===ia)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===sa)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ra)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===oa)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===aa)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===la)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ca)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ha)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ua)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===da)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===fa)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===pa)return o===ge?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===gr||i===ma||i===ga)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===gr)return o===ge?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ma)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ga)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===uc||i===_a||i===xa||i===va)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===gr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===_a)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===xa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===va)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Oi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class b_ extends sn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class vn extends Pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const E_={type:"move"};class Ja{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,i),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),g=.02,_=.005;c.inputState.pinching&&d>g+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=g-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(E_)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new vn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const w_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,T_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class A_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new Ye,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Jn({vertexShader:w_,fragmentShader:T_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new be(new ei(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class R_ extends fi{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,g=null,_=null;const v=new A_,m=e.getContextAttributes();let p=null,P=null;const w=[],M=[],F=new xt;let T=null;const I=new sn;I.viewport=new Te;const N=new sn;N.viewport=new Te;const A=[I,N],b=new b_;let U=null,J=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(it){let _t=w[it];return _t===void 0&&(_t=new Ja,w[it]=_t),_t.getTargetRaySpace()},this.getControllerGrip=function(it){let _t=w[it];return _t===void 0&&(_t=new Ja,w[it]=_t),_t.getGripSpace()},this.getHand=function(it){let _t=w[it];return _t===void 0&&(_t=new Ja,w[it]=_t),_t.getHandSpace()};function $(it){const _t=M.indexOf(it.inputSource);if(_t===-1)return;const Bt=w[_t];Bt!==void 0&&(Bt.update(it.inputSource,it.frame,c||o),Bt.dispatchEvent({type:it.type,data:it.inputSource}))}function Z(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",rt);for(let it=0;it<w.length;it++){const _t=M[it];_t!==null&&(M[it]=null,w[it].disconnect(_t))}U=null,J=null,v.reset(),t.setRenderTarget(p),g=null,d=null,u=null,s=null,P=null,de.stop(),i.isPresenting=!1,t.setPixelRatio(T),t.setSize(F.width,F.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(it){r=it,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(it){a=it,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(it){c=it},this.getBaseLayer=function(){return d!==null?d:g},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(it){if(s=it,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",rt),m.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(F),s.renderState.layers===void 0){const _t={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,e,_t),s.updateRenderState({baseLayer:g}),t.setPixelRatio(1),t.setSize(g.framebufferWidth,g.framebufferHeight,!1),P=new mi(g.framebufferWidth,g.framebufferHeight,{format:an,type:Rn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let _t=null,Bt=null,St=null;m.depth&&(St=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,_t=m.stencil?Bi:Fi,Bt=m.stencil?Oi:di);const Gt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(Gt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),P=new mi(d.textureWidth,d.textureHeight,{format:an,type:Rn,depthTexture:new nh(d.textureWidth,d.textureHeight,Bt,void 0,void 0,void 0,void 0,void 0,void 0,_t),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}P.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),de.setContext(s),de.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function rt(it){for(let _t=0;_t<it.removed.length;_t++){const Bt=it.removed[_t],St=M.indexOf(Bt);St>=0&&(M[St]=null,w[St].disconnect(Bt))}for(let _t=0;_t<it.added.length;_t++){const Bt=it.added[_t];let St=M.indexOf(Bt);if(St===-1){for(let jt=0;jt<w.length;jt++)if(jt>=M.length){M.push(Bt),St=jt;break}else if(M[jt]===null){M[jt]=Bt,St=jt;break}if(St===-1)break}const Gt=w[St];Gt&&Gt.connect(Bt)}}const X=new O,ht=new O;function j(it,_t,Bt){X.setFromMatrixPosition(_t.matrixWorld),ht.setFromMatrixPosition(Bt.matrixWorld);const St=X.distanceTo(ht),Gt=_t.projectionMatrix.elements,jt=Bt.projectionMatrix.elements,Xt=Gt[14]/(Gt[10]-1),ie=Gt[14]/(Gt[10]+1),lt=(Gt[9]+1)/Gt[5],vt=(Gt[9]-1)/Gt[5],L=(Gt[8]-1)/Gt[0],Ht=(jt[8]+1)/jt[0],ft=Xt*L,Ut=Xt*Ht,bt=St/(-L+Ht),Wt=bt*-L;if(_t.matrixWorld.decompose(it.position,it.quaternion,it.scale),it.translateX(Wt),it.translateZ(bt),it.matrixWorld.compose(it.position,it.quaternion,it.scale),it.matrixWorldInverse.copy(it.matrixWorld).invert(),Gt[10]===-1)it.projectionMatrix.copy(_t.projectionMatrix),it.projectionMatrixInverse.copy(_t.projectionMatrixInverse);else{const Lt=Xt+bt,D=ie+bt,y=ft-Wt,V=Ut+(St-Wt),tt=lt*ie/D*Lt,ct=vt*ie/D*Lt;it.projectionMatrix.makePerspective(y,V,tt,ct,Lt,D),it.projectionMatrixInverse.copy(it.projectionMatrix).invert()}}function st(it,_t){_t===null?it.matrixWorld.copy(it.matrix):it.matrixWorld.multiplyMatrices(_t.matrixWorld,it.matrix),it.matrixWorldInverse.copy(it.matrixWorld).invert()}this.updateCamera=function(it){if(s===null)return;let _t=it.near,Bt=it.far;v.texture!==null&&(v.depthNear>0&&(_t=v.depthNear),v.depthFar>0&&(Bt=v.depthFar)),b.near=N.near=I.near=_t,b.far=N.far=I.far=Bt,(U!==b.near||J!==b.far)&&(s.updateRenderState({depthNear:b.near,depthFar:b.far}),U=b.near,J=b.far),I.layers.mask=it.layers.mask|2,N.layers.mask=it.layers.mask|4,b.layers.mask=I.layers.mask|N.layers.mask;const St=it.parent,Gt=b.cameras;st(b,St);for(let jt=0;jt<Gt.length;jt++)st(Gt[jt],St);Gt.length===2?j(b,I,N):b.projectionMatrix.copy(I.projectionMatrix),at(it,b,St)};function at(it,_t,Bt){Bt===null?it.matrix.copy(_t.matrixWorld):(it.matrix.copy(Bt.matrixWorld),it.matrix.invert(),it.matrix.multiply(_t.matrixWorld)),it.matrix.decompose(it.position,it.quaternion,it.scale),it.updateMatrixWorld(!0),it.projectionMatrix.copy(_t.projectionMatrix),it.projectionMatrixInverse.copy(_t.projectionMatrixInverse),it.isPerspectiveCamera&&(it.fov=Rs*2*Math.atan(1/it.projectionMatrix.elements[5]),it.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(d===null&&g===null))return l},this.setFoveation=function(it){l=it,d!==null&&(d.fixedFoveation=it),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=it)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(b)};let Ct=null;function Kt(it,_t){if(h=_t.getViewerPose(c||o),_=_t,h!==null){const Bt=h.views;g!==null&&(t.setRenderTargetFramebuffer(P,g.framebuffer),t.setRenderTarget(P));let St=!1;Bt.length!==b.cameras.length&&(b.cameras.length=0,St=!0);for(let jt=0;jt<Bt.length;jt++){const Xt=Bt[jt];let ie=null;if(g!==null)ie=g.getViewport(Xt);else{const vt=u.getViewSubImage(d,Xt);ie=vt.viewport,jt===0&&(t.setRenderTargetTextures(P,vt.colorTexture,d.ignoreDepthValues?void 0:vt.depthStencilTexture),t.setRenderTarget(P))}let lt=A[jt];lt===void 0&&(lt=new sn,lt.layers.enable(jt),lt.viewport=new Te,A[jt]=lt),lt.matrix.fromArray(Xt.transform.matrix),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale),lt.projectionMatrix.fromArray(Xt.projectionMatrix),lt.projectionMatrixInverse.copy(lt.projectionMatrix).invert(),lt.viewport.set(ie.x,ie.y,ie.width,ie.height),jt===0&&(b.matrix.copy(lt.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),St===!0&&b.cameras.push(lt)}const Gt=s.enabledFeatures;if(Gt&&Gt.includes("depth-sensing")){const jt=u.getDepthInformation(Bt[0]);jt&&jt.isValid&&jt.texture&&v.init(t,jt,s.renderState)}}for(let Bt=0;Bt<w.length;Bt++){const St=M[Bt],Gt=w[Bt];St!==null&&Gt!==void 0&&Gt.update(St,_t,c||o)}Ct&&Ct(it,_t),_t.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:_t}),_=null}const de=new qc;de.setAnimationLoop(Kt),this.setAnimationLoop=function(it){Ct=it},this.dispose=function(){}}}const wi=new _n,P_=new Me;function C_(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Gc(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,P,w,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&g(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),_(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,P,w):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===qe&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===qe&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const P=t.get(p),w=P.envMap,M=P.envMapRotation;w&&(m.envMap.value=w,wi.copy(M),wi.x*=-1,wi.y*=-1,wi.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(wi.y*=-1,wi.z*=-1),m.envMapRotation.value.setFromMatrix4(P_.makeRotationFromEuler(wi)),m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,P,w){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*P,m.scale.value=w*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function g(m,p,P){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===qe&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=P.texture,m.transmissionSamplerSize.value.set(P.width,P.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const P=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(P.matrixWorld),m.nearDistance.value=P.shadow.camera.near,m.farDistance.value=P.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function D_(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(P,w){const M=w.program;i.uniformBlockBinding(P,M)}function c(P,w){let M=s[P.id];M===void 0&&(_(P),M=h(P),s[P.id]=M,P.addEventListener("dispose",m));const F=w.program;i.updateUBOMapping(P,F);const T=t.render.frame;r[P.id]!==T&&(d(P),r[P.id]=T)}function h(P){const w=u();P.__bindingPointIndex=w;const M=n.createBuffer(),F=P.__size,T=P.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,F,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,M),M}function u(){for(let P=0;P<a;P++)if(o.indexOf(P)===-1)return o.push(P),P;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(P){const w=s[P.id],M=P.uniforms,F=P.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let T=0,I=M.length;T<I;T++){const N=Array.isArray(M[T])?M[T]:[M[T]];for(let A=0,b=N.length;A<b;A++){const U=N[A];if(g(U,T,A,F)===!0){const J=U.__offset,$=Array.isArray(U.value)?U.value:[U.value];let Z=0;for(let rt=0;rt<$.length;rt++){const X=$[rt],ht=v(X);typeof X=="number"||typeof X=="boolean"?(U.__data[0]=X,n.bufferSubData(n.UNIFORM_BUFFER,J+Z,U.__data)):X.isMatrix3?(U.__data[0]=X.elements[0],U.__data[1]=X.elements[1],U.__data[2]=X.elements[2],U.__data[3]=0,U.__data[4]=X.elements[3],U.__data[5]=X.elements[4],U.__data[6]=X.elements[5],U.__data[7]=0,U.__data[8]=X.elements[6],U.__data[9]=X.elements[7],U.__data[10]=X.elements[8],U.__data[11]=0):(X.toArray(U.__data,Z),Z+=ht.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,J,U.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function g(P,w,M,F){const T=P.value,I=w+"_"+M;if(F[I]===void 0)return typeof T=="number"||typeof T=="boolean"?F[I]=T:F[I]=T.clone(),!0;{const N=F[I];if(typeof T=="number"||typeof T=="boolean"){if(N!==T)return F[I]=T,!0}else if(N.equals(T)===!1)return N.copy(T),!0}return!1}function _(P){const w=P.uniforms;let M=0;const F=16;for(let I=0,N=w.length;I<N;I++){const A=Array.isArray(w[I])?w[I]:[w[I]];for(let b=0,U=A.length;b<U;b++){const J=A[b],$=Array.isArray(J.value)?J.value:[J.value];for(let Z=0,rt=$.length;Z<rt;Z++){const X=$[Z],ht=v(X),j=M%F,st=j%ht.boundary,at=j+st;M+=st,at!==0&&F-at<ht.storage&&(M+=F-at),J.__data=new Float32Array(ht.storage/Float32Array.BYTES_PER_ELEMENT),J.__offset=M,M+=ht.storage}}}const T=M%F;return T>0&&(M+=F-T),P.__size=M,P.__cache={},this}function v(P){const w={boundary:0,storage:0};return typeof P=="number"||typeof P=="boolean"?(w.boundary=4,w.storage=4):P.isVector2?(w.boundary=8,w.storage=8):P.isVector3||P.isColor?(w.boundary=16,w.storage=12):P.isVector4?(w.boundary=16,w.storage=16):P.isMatrix3?(w.boundary=48,w.storage=48):P.isMatrix4?(w.boundary=64,w.storage=64):P.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",P),w}function m(P){const w=P.target;w.removeEventListener("dispose",m);const M=o.indexOf(w.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function p(){for(const P in s)n.deleteBuffer(s[P]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class L_{constructor(t={}){const{canvas:e=Qd(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;const _=new Uint32Array(4),v=new Int32Array(4);let m=null,p=null;const P=[],w=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=tn,this.toneMapping=$n,this.toneMappingExposure=1;const M=this;let F=!1,T=0,I=0,N=null,A=-1,b=null;const U=new Te,J=new Te;let $=null;const Z=new ae(0);let rt=0,X=e.width,ht=e.height,j=1,st=null,at=null;const Ct=new Te(0,0,X,ht),Kt=new Te(0,0,X,ht);let de=!1;const it=new Va;let _t=!1,Bt=!1;const St=new Me,Gt=new Me,jt=new O,Xt=new Te,ie={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let lt=!1;function vt(){return N===null?j:1}let L=i;function Ht(E,H){return e.getContext(E,H)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ao}`),e.addEventListener("webglcontextlost",nt,!1),e.addEventListener("webglcontextrestored",Dt,!1),e.addEventListener("webglcontextcreationerror",Pt,!1),L===null){const H="webgl2";if(L=Ht(H,E),L===null)throw Ht(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let ft,Ut,bt,Wt,Lt,D,y,V,tt,ct,Q,kt,Rt,It,re,mt,zt,qt,$t,Ot,le,Qt,xe,B;function Tt(){ft=new Om(L),ft.init(),Qt=new S_(L,ft),Ut=new Dm(L,ft,t,Qt),bt=new v_(L,ft),Ut.reverseDepthBuffer&&d&&bt.buffers.depth.setReversed(!0),Wt=new km(L),Lt=new s_,D=new y_(L,ft,bt,Lt,Ut,Qt,Wt),y=new Im(M),V=new zm(M),tt=new Af(L),xe=new Pm(L,tt),ct=new Fm(L,tt,Wt,xe),Q=new Gm(L,ct,tt,Wt),$t=new Hm(L,Ut,D),mt=new Lm(Lt),kt=new i_(M,y,V,ft,Ut,xe,mt),Rt=new C_(M,Lt),It=new o_,re=new d_(ft),qt=new Rm(M,y,V,bt,Q,g,l),zt=new __(M,Q,Ut),B=new D_(L,Wt,Ut,bt),Ot=new Cm(L,ft,Wt),le=new Bm(L,ft,Wt),Wt.programs=kt.programs,M.capabilities=Ut,M.extensions=ft,M.properties=Lt,M.renderLists=It,M.shadowMap=zt,M.state=bt,M.info=Wt}Tt();const K=new R_(M,L);this.xr=K,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const E=ft.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=ft.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(E){E!==void 0&&(j=E,this.setSize(X,ht,!1))},this.getSize=function(E){return E.set(X,ht)},this.setSize=function(E,H,q=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=E,ht=H,e.width=Math.floor(E*j),e.height=Math.floor(H*j),q===!0&&(e.style.width=E+"px",e.style.height=H+"px"),this.setViewport(0,0,E,H)},this.getDrawingBufferSize=function(E){return E.set(X*j,ht*j).floor()},this.setDrawingBufferSize=function(E,H,q){X=E,ht=H,j=q,e.width=Math.floor(E*q),e.height=Math.floor(H*q),this.setViewport(0,0,E,H)},this.getCurrentViewport=function(E){return E.copy(U)},this.getViewport=function(E){return E.copy(Ct)},this.setViewport=function(E,H,q,Y){E.isVector4?Ct.set(E.x,E.y,E.z,E.w):Ct.set(E,H,q,Y),bt.viewport(U.copy(Ct).multiplyScalar(j).round())},this.getScissor=function(E){return E.copy(Kt)},this.setScissor=function(E,H,q,Y){E.isVector4?Kt.set(E.x,E.y,E.z,E.w):Kt.set(E,H,q,Y),bt.scissor(J.copy(Kt).multiplyScalar(j).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(E){bt.setScissorTest(de=E)},this.setOpaqueSort=function(E){st=E},this.setTransparentSort=function(E){at=E},this.getClearColor=function(E){return E.copy(qt.getClearColor())},this.setClearColor=function(){qt.setClearColor.apply(qt,arguments)},this.getClearAlpha=function(){return qt.getClearAlpha()},this.setClearAlpha=function(){qt.setClearAlpha.apply(qt,arguments)},this.clear=function(E=!0,H=!0,q=!0){let Y=0;if(E){let G=!1;if(N!==null){const Mt=N.texture.format;G=Mt===qo||Mt===Xo||Mt===$o}if(G){const Mt=N.texture.type,f=Mt===Rn||Mt===di||Mt===Ts||Mt===Oi||Mt===Vo||Mt===Wo,x=qt.getClearColor(),S=qt.getClearAlpha(),R=x.r,C=x.g,z=x.b;f?(_[0]=R,_[1]=C,_[2]=z,_[3]=S,L.clearBufferuiv(L.COLOR,0,_)):(v[0]=R,v[1]=C,v[2]=z,v[3]=S,L.clearBufferiv(L.COLOR,0,v))}else Y|=L.COLOR_BUFFER_BIT}H&&(Y|=L.DEPTH_BUFFER_BIT),q&&(Y|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",nt,!1),e.removeEventListener("webglcontextrestored",Dt,!1),e.removeEventListener("webglcontextcreationerror",Pt,!1),It.dispose(),re.dispose(),Lt.dispose(),y.dispose(),V.dispose(),Q.dispose(),xe.dispose(),B.dispose(),kt.dispose(),K.dispose(),K.removeEventListener("sessionstart",Ue),K.removeEventListener("sessionend",fn),pe.stop()};function nt(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),F=!0}function Dt(){console.log("THREE.WebGLRenderer: Context Restored."),F=!1;const E=Wt.autoReset,H=zt.enabled,q=zt.autoUpdate,Y=zt.needsUpdate,G=zt.type;Tt(),Wt.autoReset=E,zt.enabled=H,zt.autoUpdate=q,zt.needsUpdate=Y,zt.type=G}function Pt(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Jt(E){const H=E.target;H.removeEventListener("dispose",Jt),ve(H)}function ve(E){Ie(E),Lt.remove(E)}function Ie(E){const H=Lt.get(E).programs;H!==void 0&&(H.forEach(function(q){kt.releaseProgram(q)}),E.isShaderMaterial&&kt.releaseShaderCache(E))}this.renderBufferDirect=function(E,H,q,Y,G,Mt){H===null&&(H=ie);const f=G.isMesh&&G.matrixWorld.determinant()<0,x=ds(E,H,q,Y,G);bt.setMaterial(Y,f);let S=q.index,R=1;if(Y.wireframe===!0){if(S=ct.getWireframeAttribute(q),S===void 0)return;R=2}const C=q.drawRange,z=q.attributes.position;let k=C.start*R,W=(C.start+C.count)*R;Mt!==null&&(k=Math.max(k,Mt.start*R),W=Math.min(W,(Mt.start+Mt.count)*R)),S!==null?(k=Math.max(k,0),W=Math.min(W,S.count)):z!=null&&(k=Math.max(k,0),W=Math.min(W,z.count));const et=W-k;if(et<0||et===1/0)return;xe.setup(G,Y,x,q,S);let ot,Et=Ot;if(S!==null&&(ot=tt.get(S),Et=le,Et.setIndex(ot)),G.isMesh)Y.wireframe===!0?(bt.setLineWidth(Y.wireframeLinewidth*vt()),Et.setMode(L.LINES)):Et.setMode(L.TRIANGLES);else if(G.isLine){let yt=Y.linewidth;yt===void 0&&(yt=1),bt.setLineWidth(yt*vt()),G.isLineSegments?Et.setMode(L.LINES):G.isLineLoop?Et.setMode(L.LINE_LOOP):Et.setMode(L.LINE_STRIP)}else G.isPoints?Et.setMode(L.POINTS):G.isSprite&&Et.setMode(L.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)Et.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(ft.get("WEBGL_multi_draw"))Et.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const yt=G._multiDrawStarts,ut=G._multiDrawCounts,pt=G._multiDrawCount,Nt=S?tt.get(S).bytesPerElement:1,ce=Lt.get(Y).currentProgram.getUniforms();for(let me=0;me<pt;me++)ce.setValue(L,"_gl_DrawID",me),Et.render(yt[me]/Nt,ut[me])}else if(G.isInstancedMesh)Et.renderInstances(k,et,G.count);else if(q.isInstancedBufferGeometry){const yt=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,ut=Math.min(q.instanceCount,yt);Et.renderInstances(k,et,ut)}else Et.render(k,et)};function fe(E,H,q){E.transparent===!0&&E.side===An&&E.forceSinglePass===!1?(E.side=qe,E.needsUpdate=!0,yn(E,H,q),E.side=Vn,E.needsUpdate=!0,yn(E,H,q),E.side=An):yn(E,H,q)}this.compile=function(E,H,q=null){q===null&&(q=E),p=re.get(q),p.init(H),w.push(p),q.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),E!==q&&E.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),p.setupLights();const Y=new Set;return E.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const Mt=G.material;if(Mt)if(Array.isArray(Mt))for(let f=0;f<Mt.length;f++){const x=Mt[f];fe(x,q,G),Y.add(x)}else fe(Mt,q,G),Y.add(Mt)}),w.pop(),p=null,Y},this.compileAsync=function(E,H,q=null){const Y=this.compile(E,H,q);return new Promise(G=>{function Mt(){if(Y.forEach(function(f){Lt.get(f).currentProgram.isReady()&&Y.delete(f)}),Y.size===0){G(E);return}setTimeout(Mt,10)}ft.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let $e=null;function rn(E){$e&&$e(E)}function Ue(){pe.stop()}function fn(){pe.start()}const pe=new qc;pe.setAnimationLoop(rn),typeof self<"u"&&pe.setContext(self),this.setAnimationLoop=function(E){$e=E,K.setAnimationLoop(E),E===null?pe.stop():pe.start()},K.addEventListener("sessionstart",Ue),K.addEventListener("sessionend",fn),this.render=function(E,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(H),H=K.getCamera()),E.isScene===!0&&E.onBeforeRender(M,E,H,N),p=re.get(E,w.length),p.init(H),w.push(p),Gt.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),it.setFromProjectionMatrix(Gt),Bt=this.localClippingEnabled,_t=mt.init(this.clippingPlanes,Bt),m=It.get(E,P.length),m.init(),P.push(m),K.enabled===!0&&K.isPresenting===!0){const Mt=M.xr.getDepthSensingMesh();Mt!==null&&si(Mt,H,-1/0,M.sortObjects)}si(E,H,0,M.sortObjects),m.finish(),M.sortObjects===!0&&m.sort(st,at),lt=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,lt&&qt.addToRenderList(m,E),this.info.render.frame++,_t===!0&&mt.beginShadows();const q=p.state.shadowsArray;zt.render(q,E,H),_t===!0&&mt.endShadows(),this.info.autoReset===!0&&this.info.reset();const Y=m.opaque,G=m.transmissive;if(p.setupLights(),H.isArrayCamera){const Mt=H.cameras;if(G.length>0)for(let f=0,x=Mt.length;f<x;f++){const S=Mt[f];us(Y,G,E,S)}lt&&qt.render(E);for(let f=0,x=Mt.length;f<x;f++){const S=Mt[f];io(m,E,S,S.viewport)}}else G.length>0&&us(Y,G,E,H),lt&&qt.render(E),io(m,E,H);N!==null&&(D.updateMultisampleRenderTarget(N),D.updateRenderTargetMipmap(N)),E.isScene===!0&&E.onAfterRender(M,E,H),xe.resetDefaultState(),A=-1,b=null,w.pop(),w.length>0?(p=w[w.length-1],_t===!0&&mt.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,P.pop(),P.length>0?m=P[P.length-1]:m=null};function si(E,H,q,Y){if(E.visible===!1)return;if(E.layers.test(H.layers)){if(E.isGroup)q=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(H);else if(E.isLight)p.pushLight(E),E.castShadow&&p.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||it.intersectsSprite(E)){Y&&Xt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Gt);const f=Q.update(E),x=E.material;x.visible&&m.push(E,f,x,q,Xt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||it.intersectsObject(E))){const f=Q.update(E),x=E.material;if(Y&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Xt.copy(E.boundingSphere.center)):(f.boundingSphere===null&&f.computeBoundingSphere(),Xt.copy(f.boundingSphere.center)),Xt.applyMatrix4(E.matrixWorld).applyMatrix4(Gt)),Array.isArray(x)){const S=f.groups;for(let R=0,C=S.length;R<C;R++){const z=S[R],k=x[z.materialIndex];k&&k.visible&&m.push(E,f,k,q,Xt.z,z)}}else x.visible&&m.push(E,f,x,q,Xt.z,null)}}const Mt=E.children;for(let f=0,x=Mt.length;f<x;f++)si(Mt[f],H,q,Y)}function io(E,H,q,Y){const G=E.opaque,Mt=E.transmissive,f=E.transparent;p.setupLightsView(q),_t===!0&&mt.setGlobalState(M.clippingPlanes,q),Y&&bt.viewport(U.copy(Y)),G.length>0&&ri(G,H,q),Mt.length>0&&ri(Mt,H,q),f.length>0&&ri(f,H,q),bt.buffers.depth.setTest(!0),bt.buffers.depth.setMask(!0),bt.buffers.color.setMask(!0),bt.setPolygonOffset(!1)}function us(E,H,q,Y){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[Y.id]===void 0&&(p.state.transmissionRenderTarget[Y.id]=new mi(1,1,{generateMipmaps:!0,type:ft.has("EXT_color_buffer_half_float")||ft.has("EXT_color_buffer_float")?As:Rn,minFilter:ui,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ue.workingColorSpace}));const Mt=p.state.transmissionRenderTarget[Y.id],f=Y.viewport||U;Mt.setSize(f.z,f.w);const x=M.getRenderTarget();M.setRenderTarget(Mt),M.getClearColor(Z),rt=M.getClearAlpha(),rt<1&&M.setClearColor(16777215,.5),M.clear(),lt&&qt.render(q);const S=M.toneMapping;M.toneMapping=$n;const R=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),p.setupLightsView(Y),_t===!0&&mt.setGlobalState(M.clippingPlanes,Y),ri(E,q,Y),D.updateMultisampleRenderTarget(Mt),D.updateRenderTargetMipmap(Mt),ft.has("WEBGL_multisampled_render_to_texture")===!1){let C=!1;for(let z=0,k=H.length;z<k;z++){const W=H[z],et=W.object,ot=W.geometry,Et=W.material,yt=W.group;if(Et.side===An&&et.layers.test(Y.layers)){const ut=Et.side;Et.side=qe,Et.needsUpdate=!0,Fn(et,q,Y,ot,Et,yt),Et.side=ut,Et.needsUpdate=!0,C=!0}}C===!0&&(D.updateMultisampleRenderTarget(Mt),D.updateRenderTargetMipmap(Mt))}M.setRenderTarget(x),M.setClearColor(Z,rt),R!==void 0&&(Y.viewport=R),M.toneMapping=S}function ri(E,H,q){const Y=H.isScene===!0?H.overrideMaterial:null;for(let G=0,Mt=E.length;G<Mt;G++){const f=E[G],x=f.object,S=f.geometry,R=Y===null?f.material:Y,C=f.group;x.layers.test(q.layers)&&Fn(x,H,q,S,R,C)}}function Fn(E,H,q,Y,G,Mt){E.onBeforeRender(M,H,q,Y,G,Mt),E.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),G.onBeforeRender(M,H,q,Y,E,Mt),G.transparent===!0&&G.side===An&&G.forceSinglePass===!1?(G.side=qe,G.needsUpdate=!0,M.renderBufferDirect(q,H,Y,G,E,Mt),G.side=Vn,G.needsUpdate=!0,M.renderBufferDirect(q,H,Y,G,E,Mt),G.side=An):M.renderBufferDirect(q,H,Y,G,E,Mt),E.onAfterRender(M,H,q,Y,G,Mt)}function yn(E,H,q){H.isScene!==!0&&(H=ie);const Y=Lt.get(E),G=p.state.lights,Mt=p.state.shadowsArray,f=G.state.version,x=kt.getParameters(E,G.state,Mt,H,q),S=kt.getProgramCacheKey(x);let R=Y.programs;Y.environment=E.isMeshStandardMaterial?H.environment:null,Y.fog=H.fog,Y.envMap=(E.isMeshStandardMaterial?V:y).get(E.envMap||Y.environment),Y.envMapRotation=Y.environment!==null&&E.envMap===null?H.environmentRotation:E.envMapRotation,R===void 0&&(E.addEventListener("dispose",Jt),R=new Map,Y.programs=R);let C=R.get(S);if(C!==void 0){if(Y.currentProgram===C&&Y.lightsStateVersion===f)return ro(E,x),C}else x.uniforms=kt.getUniforms(E),E.onBeforeCompile(x,M),C=kt.acquireProgram(x,S),R.set(S,C),Y.uniforms=x.uniforms;const z=Y.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(z.clippingPlanes=mt.uniform),ro(E,x),Y.needsLights=ao(E),Y.lightsStateVersion=f,Y.needsLights&&(z.ambientLightColor.value=G.state.ambient,z.lightProbe.value=G.state.probe,z.directionalLights.value=G.state.directional,z.directionalLightShadows.value=G.state.directionalShadow,z.spotLights.value=G.state.spot,z.spotLightShadows.value=G.state.spotShadow,z.rectAreaLights.value=G.state.rectArea,z.ltc_1.value=G.state.rectAreaLTC1,z.ltc_2.value=G.state.rectAreaLTC2,z.pointLights.value=G.state.point,z.pointLightShadows.value=G.state.pointShadow,z.hemisphereLights.value=G.state.hemi,z.directionalShadowMap.value=G.state.directionalShadowMap,z.directionalShadowMatrix.value=G.state.directionalShadowMatrix,z.spotShadowMap.value=G.state.spotShadowMap,z.spotLightMatrix.value=G.state.spotLightMatrix,z.spotLightMap.value=G.state.spotLightMap,z.pointShadowMap.value=G.state.pointShadowMap,z.pointShadowMatrix.value=G.state.pointShadowMatrix),Y.currentProgram=C,Y.uniformsList=null,C}function so(E){if(E.uniformsList===null){const H=E.currentProgram.getUniforms();E.uniformsList=Gr.seqWithValue(H.seq,E.uniforms)}return E.uniformsList}function ro(E,H){const q=Lt.get(E);q.outputColorSpace=H.outputColorSpace,q.batching=H.batching,q.batchingColor=H.batchingColor,q.instancing=H.instancing,q.instancingColor=H.instancingColor,q.instancingMorph=H.instancingMorph,q.skinning=H.skinning,q.morphTargets=H.morphTargets,q.morphNormals=H.morphNormals,q.morphColors=H.morphColors,q.morphTargetsCount=H.morphTargetsCount,q.numClippingPlanes=H.numClippingPlanes,q.numIntersection=H.numClipIntersection,q.vertexAlphas=H.vertexAlphas,q.vertexTangents=H.vertexTangents,q.toneMapping=H.toneMapping}function ds(E,H,q,Y,G){H.isScene!==!0&&(H=ie),D.resetTextureUnits();const Mt=H.fog,f=Y.isMeshStandardMaterial?H.environment:null,x=N===null?M.outputColorSpace:N.isXRRenderTarget===!0?N.texture.colorSpace:ki,S=(Y.isMeshStandardMaterial?V:y).get(Y.envMap||f),R=Y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,C=!!q.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),z=!!q.morphAttributes.position,k=!!q.morphAttributes.normal,W=!!q.morphAttributes.color;let et=$n;Y.toneMapped&&(N===null||N.isXRRenderTarget===!0)&&(et=M.toneMapping);const ot=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Et=ot!==void 0?ot.length:0,yt=Lt.get(Y),ut=p.state.lights;if(_t===!0&&(Bt===!0||E!==b)){const dt=E===b&&Y.id===A;mt.setState(Y,E,dt)}let pt=!1;Y.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==ut.state.version||yt.outputColorSpace!==x||G.isBatchedMesh&&yt.batching===!1||!G.isBatchedMesh&&yt.batching===!0||G.isBatchedMesh&&yt.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&yt.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&yt.instancing===!1||!G.isInstancedMesh&&yt.instancing===!0||G.isSkinnedMesh&&yt.skinning===!1||!G.isSkinnedMesh&&yt.skinning===!0||G.isInstancedMesh&&yt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&yt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&yt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&yt.instancingMorph===!1&&G.morphTexture!==null||yt.envMap!==S||Y.fog===!0&&yt.fog!==Mt||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==mt.numPlanes||yt.numIntersection!==mt.numIntersection)||yt.vertexAlphas!==R||yt.vertexTangents!==C||yt.morphTargets!==z||yt.morphNormals!==k||yt.morphColors!==W||yt.toneMapping!==et||yt.morphTargetsCount!==Et)&&(pt=!0):(pt=!0,yt.__version=Y.version);let Nt=yt.currentProgram;pt===!0&&(Nt=yn(Y,H,G));let ce=!1,me=!1,Se=!1;const ee=Nt.getUniforms(),Ft=yt.uniforms;if(bt.useProgram(Nt.program)&&(ce=!0,me=!0,Se=!0),Y.id!==A&&(A=Y.id,me=!0),ce||b!==E){bt.buffers.depth.getReversed()?(St.copy(E.projectionMatrix),ef(St),nf(St),ee.setValue(L,"projectionMatrix",St)):ee.setValue(L,"projectionMatrix",E.projectionMatrix),ee.setValue(L,"viewMatrix",E.matrixWorldInverse);const gt=ee.map.cameraPosition;gt!==void 0&&gt.setValue(L,jt.setFromMatrixPosition(E.matrixWorld)),Ut.logarithmicDepthBuffer&&ee.setValue(L,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&ee.setValue(L,"isOrthographic",E.isOrthographicCamera===!0),b!==E&&(b=E,me=!0,Se=!0)}if(G.isSkinnedMesh){ee.setOptional(L,G,"bindMatrix"),ee.setOptional(L,G,"bindMatrixInverse");const dt=G.skeleton;dt&&(dt.boneTexture===null&&dt.computeBoneTexture(),ee.setValue(L,"boneTexture",dt.boneTexture,D))}G.isBatchedMesh&&(ee.setOptional(L,G,"batchingTexture"),ee.setValue(L,"batchingTexture",G._matricesTexture,D),ee.setOptional(L,G,"batchingIdTexture"),ee.setValue(L,"batchingIdTexture",G._indirectTexture,D),ee.setOptional(L,G,"batchingColorTexture"),G._colorsTexture!==null&&ee.setValue(L,"batchingColorTexture",G._colorsTexture,D));const Vt=q.morphAttributes;if((Vt.position!==void 0||Vt.normal!==void 0||Vt.color!==void 0)&&$t.update(G,q,Nt),(me||yt.receiveShadow!==G.receiveShadow)&&(yt.receiveShadow=G.receiveShadow,ee.setValue(L,"receiveShadow",G.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(Ft.envMap.value=S,Ft.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1),Y.isMeshStandardMaterial&&Y.envMap===null&&H.environment!==null&&(Ft.envMapIntensity.value=H.environmentIntensity),me&&(ee.setValue(L,"toneMappingExposure",M.toneMappingExposure),yt.needsLights&&oo(Ft,Se),Mt&&Y.fog===!0&&Rt.refreshFogUniforms(Ft,Mt),Rt.refreshMaterialUniforms(Ft,Y,j,ht,p.state.transmissionRenderTarget[E.id]),Gr.upload(L,so(yt),Ft,D)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Gr.upload(L,so(yt),Ft,D),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&ee.setValue(L,"center",G.center),ee.setValue(L,"modelViewMatrix",G.modelViewMatrix),ee.setValue(L,"normalMatrix",G.normalMatrix),ee.setValue(L,"modelMatrix",G.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const dt=Y.uniformsGroups;for(let gt=0,Zt=dt.length;gt<Zt;gt++){const Yt=dt[gt];B.update(Yt,Nt),B.bind(Yt,Nt)}}return Nt}function oo(E,H){E.ambientLightColor.needsUpdate=H,E.lightProbe.needsUpdate=H,E.directionalLights.needsUpdate=H,E.directionalLightShadows.needsUpdate=H,E.pointLights.needsUpdate=H,E.pointLightShadows.needsUpdate=H,E.spotLights.needsUpdate=H,E.spotLightShadows.needsUpdate=H,E.rectAreaLights.needsUpdate=H,E.hemisphereLights.needsUpdate=H}function ao(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return N},this.setRenderTargetTextures=function(E,H,q){Lt.get(E.texture).__webglTexture=H,Lt.get(E.depthTexture).__webglTexture=q;const Y=Lt.get(E);Y.__hasExternalTextures=!0,Y.__autoAllocateDepthBuffer=q===void 0,Y.__autoAllocateDepthBuffer||ft.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,H){const q=Lt.get(E);q.__webglFramebuffer=H,q.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(E,H=0,q=0){N=E,T=H,I=q;let Y=!0,G=null,Mt=!1,f=!1;if(E){const S=Lt.get(E);if(S.__useDefaultFramebuffer!==void 0)bt.bindFramebuffer(L.FRAMEBUFFER,null),Y=!1;else if(S.__webglFramebuffer===void 0)D.setupRenderTarget(E);else if(S.__hasExternalTextures)D.rebindTextures(E,Lt.get(E.texture).__webglTexture,Lt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const z=E.depthTexture;if(S.__boundDepthTexture!==z){if(z!==null&&Lt.has(z)&&(E.width!==z.image.width||E.height!==z.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(E)}}const R=E.texture;(R.isData3DTexture||R.isDataArrayTexture||R.isCompressedArrayTexture)&&(f=!0);const C=Lt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(C[H])?G=C[H][q]:G=C[H],Mt=!0):E.samples>0&&D.useMultisampledRTT(E)===!1?G=Lt.get(E).__webglMultisampledFramebuffer:Array.isArray(C)?G=C[q]:G=C,U.copy(E.viewport),J.copy(E.scissor),$=E.scissorTest}else U.copy(Ct).multiplyScalar(j).floor(),J.copy(Kt).multiplyScalar(j).floor(),$=de;if(bt.bindFramebuffer(L.FRAMEBUFFER,G)&&Y&&bt.drawBuffers(E,G),bt.viewport(U),bt.scissor(J),bt.setScissorTest($),Mt){const S=Lt.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+H,S.__webglTexture,q)}else if(f){const S=Lt.get(E.texture),R=H||0;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,S.__webglTexture,q||0,R)}A=-1},this.readRenderTargetPixels=function(E,H,q,Y,G,Mt,f){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let x=Lt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&f!==void 0&&(x=x[f]),x){bt.bindFramebuffer(L.FRAMEBUFFER,x);try{const S=E.texture,R=S.format,C=S.type;if(!Ut.textureFormatReadable(R)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ut.textureTypeReadable(C)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=E.width-Y&&q>=0&&q<=E.height-G&&L.readPixels(H,q,Y,G,Qt.convert(R),Qt.convert(C),Mt)}finally{const S=N!==null?Lt.get(N).__webglFramebuffer:null;bt.bindFramebuffer(L.FRAMEBUFFER,S)}}},this.readRenderTargetPixelsAsync=async function(E,H,q,Y,G,Mt,f){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let x=Lt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&f!==void 0&&(x=x[f]),x){const S=E.texture,R=S.format,C=S.type;if(!Ut.textureFormatReadable(R))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ut.textureTypeReadable(C))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=E.width-Y&&q>=0&&q<=E.height-G){bt.bindFramebuffer(L.FRAMEBUFFER,x);const z=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,z),L.bufferData(L.PIXEL_PACK_BUFFER,Mt.byteLength,L.STREAM_READ),L.readPixels(H,q,Y,G,Qt.convert(R),Qt.convert(C),0);const k=N!==null?Lt.get(N).__webglFramebuffer:null;bt.bindFramebuffer(L.FRAMEBUFFER,k);const W=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await tf(L,W,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,z),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,Mt),L.deleteBuffer(z),L.deleteSync(W),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,H=null,q=0){E.isTexture!==!0&&(Ds("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,E=arguments[1]);const Y=Math.pow(2,-q),G=Math.floor(E.image.width*Y),Mt=Math.floor(E.image.height*Y),f=H!==null?H.x:0,x=H!==null?H.y:0;D.setTexture2D(E,0),L.copyTexSubImage2D(L.TEXTURE_2D,q,0,0,f,x,G,Mt),bt.unbindTexture()},this.copyTextureToTexture=function(E,H,q=null,Y=null,G=0){E.isTexture!==!0&&(Ds("WebGLRenderer: copyTextureToTexture function signature has changed."),Y=arguments[0]||null,E=arguments[1],H=arguments[2],G=arguments[3]||0,q=null);let Mt,f,x,S,R,C,z,k,W;const et=E.isCompressedTexture?E.mipmaps[G]:E.image;q!==null?(Mt=q.max.x-q.min.x,f=q.max.y-q.min.y,x=q.isBox3?q.max.z-q.min.z:1,S=q.min.x,R=q.min.y,C=q.isBox3?q.min.z:0):(Mt=et.width,f=et.height,x=et.depth||1,S=0,R=0,C=0),Y!==null?(z=Y.x,k=Y.y,W=Y.z):(z=0,k=0,W=0);const ot=Qt.convert(H.format),Et=Qt.convert(H.type);let yt;H.isData3DTexture?(D.setTexture3D(H,0),yt=L.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(D.setTexture2DArray(H,0),yt=L.TEXTURE_2D_ARRAY):(D.setTexture2D(H,0),yt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,H.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,H.unpackAlignment);const ut=L.getParameter(L.UNPACK_ROW_LENGTH),pt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Nt=L.getParameter(L.UNPACK_SKIP_PIXELS),ce=L.getParameter(L.UNPACK_SKIP_ROWS),me=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,et.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,et.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,S),L.pixelStorei(L.UNPACK_SKIP_ROWS,R),L.pixelStorei(L.UNPACK_SKIP_IMAGES,C);const Se=E.isDataArrayTexture||E.isData3DTexture,ee=H.isDataArrayTexture||H.isData3DTexture;if(E.isRenderTargetTexture||E.isDepthTexture){const Ft=Lt.get(E),Vt=Lt.get(H),dt=Lt.get(Ft.__renderTarget),gt=Lt.get(Vt.__renderTarget);bt.bindFramebuffer(L.READ_FRAMEBUFFER,dt.__webglFramebuffer),bt.bindFramebuffer(L.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let Zt=0;Zt<x;Zt++)Se&&L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Lt.get(E).__webglTexture,G,C+Zt),E.isDepthTexture?(ee&&L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Lt.get(H).__webglTexture,G,W+Zt),L.blitFramebuffer(S,R,Mt,f,z,k,Mt,f,L.DEPTH_BUFFER_BIT,L.NEAREST)):ee?L.copyTexSubImage3D(yt,G,z,k,W+Zt,S,R,Mt,f):L.copyTexSubImage2D(yt,G,z,k,W+Zt,S,R,Mt,f);bt.bindFramebuffer(L.READ_FRAMEBUFFER,null),bt.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else ee?E.isDataTexture||E.isData3DTexture?L.texSubImage3D(yt,G,z,k,W,Mt,f,x,ot,Et,et.data):H.isCompressedArrayTexture?L.compressedTexSubImage3D(yt,G,z,k,W,Mt,f,x,ot,et.data):L.texSubImage3D(yt,G,z,k,W,Mt,f,x,ot,Et,et):E.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,G,z,k,Mt,f,ot,Et,et.data):E.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,G,z,k,et.width,et.height,ot,et.data):L.texSubImage2D(L.TEXTURE_2D,G,z,k,Mt,f,ot,Et,et);L.pixelStorei(L.UNPACK_ROW_LENGTH,ut),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,pt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Nt),L.pixelStorei(L.UNPACK_SKIP_ROWS,ce),L.pixelStorei(L.UNPACK_SKIP_IMAGES,me),G===0&&H.generateMipmaps&&L.generateMipmap(yt),bt.unbindTexture()},this.copyTextureToTexture3D=function(E,H,q=null,Y=null,G=0){return E.isTexture!==!0&&(Ds("WebGLRenderer: copyTextureToTexture3D function signature has changed."),q=arguments[0]||null,Y=arguments[1]||null,E=arguments[2],H=arguments[3],G=arguments[4]||0),Ds('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,H,q,Y,G)},this.initRenderTarget=function(E){Lt.get(E).__webglFramebuffer===void 0&&D.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?D.setTextureCube(E,0):E.isData3DTexture?D.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?D.setTexture2DArray(E,0):D.setTexture2D(E,0),bt.unbindTexture()},this.resetState=function(){T=0,I=0,N=null,bt.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ue._getDrawingBufferColorSpace(t),e.unpackColorSpace=ue._getUnpackColorSpace()}}class I_ extends Pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _n,this.environmentIntensity=1,this.environmentRotation=new _n,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Qa extends ts{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Wr=new O,$r=new O,wh=new Me,Os=new Tr,Xr=new br,tl=new O,Th=new O;class U_ extends Pe{constructor(t=new Qe,e=new Qa){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Wr.fromBufferAttribute(e,s-1),$r.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Wr.distanceTo($r);t.setAttribute("lineDistance",new Be(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Xr.copy(i.boundingSphere),Xr.applyMatrix4(s),Xr.radius+=r,t.ray.intersectsSphere(Xr)===!1)return;wh.copy(s).invert(),Os.copy(t.ray).applyMatrix4(wh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){const g=Math.max(0,o.start),_=Math.min(h.count,o.start+o.count);for(let v=g,m=_-1;v<m;v+=c){const p=h.getX(v),P=h.getX(v+1),w=qr(this,t,Os,l,p,P);w&&e.push(w)}if(this.isLineLoop){const v=h.getX(_-1),m=h.getX(g),p=qr(this,t,Os,l,v,m);p&&e.push(p)}}else{const g=Math.max(0,o.start),_=Math.min(d.count,o.start+o.count);for(let v=g,m=_-1;v<m;v+=c){const p=qr(this,t,Os,l,v,v+1);p&&e.push(p)}if(this.isLineLoop){const v=qr(this,t,Os,l,_-1,g);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function qr(n,t,e,i,s,r){const o=n.geometry.attributes.position;if(Wr.fromBufferAttribute(o,s),$r.fromBufferAttribute(o,r),e.distanceSqToSegment(Wr,$r,tl,Th)>i)return;tl.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(tl);if(!(l<t.near||l>t.far))return{distance:l,point:Th.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}const Ah=new O,Rh=new O;class Ph extends U_{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Ah.fromBufferAttribute(e,s),Rh.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Ah.distanceTo(Rh);t.setAttribute("lineDistance",new Be(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Mn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let s=0;const r=i.length;let o;e?o=e:o=t*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);const h=i[s],d=i[s+1]-h,g=(o-h)/d;return(s+g)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new xt:new O);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new O,s=[],r=[],o=[],a=new O,l=new Me;for(let g=0;g<=t;g++){const _=g/t;s[g]=this.getTangentAt(_,new O)}r[0]=new O,o[0]=new O;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),d<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let g=1;g<=t;g++){if(r[g]=r[g-1].clone(),o[g]=o[g-1].clone(),a.crossVectors(s[g-1],s[g]),a.length()>Number.EPSILON){a.normalize();const _=Math.acos(ze(s[g-1].dot(s[g]),-1,1));r[g].applyMatrix4(l.makeRotationAxis(a,_))}o[g].crossVectors(s[g],r[g])}if(e===!0){let g=Math.acos(ze(r[0].dot(r[t]),-1,1));g/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(g=-g);for(let _=1;_<=t;_++)r[_].applyMatrix4(l.makeRotationAxis(s[_],g*_)),o[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class el extends Mn{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new xt){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,g=c-this.aY;l=d*h-g*u+this.aX,c=d*u+g*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class N_ extends el{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function nl(){let n=0,t=0,e=0,i=0;function s(r,o,a,l){n=r,t=a,e=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,g=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,g*=h,s(o,a,d,g)},calc:function(r){const o=r*r,a=o*r;return n+t*r+e*o+i*a}}}const Yr=new O,il=new nl,sl=new nl,rl=new nl;class z_ extends Mn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new O){const i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(Yr.subVectors(s[0],s[1]).add(s[0]),c=Yr);const u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Yr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Yr),this.curveType==="centripetal"||this.curveType==="chordal"){const g=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(u),g),v=Math.pow(u.distanceToSquared(d),g),m=Math.pow(d.distanceToSquared(h),g);v<1e-4&&(v=1),_<1e-4&&(_=v),m<1e-4&&(m=v),il.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,_,v,m),sl.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,_,v,m),rl.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,_,v,m)}else this.curveType==="catmullrom"&&(il.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),sl.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),rl.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return i.set(il.calc(l),sl.calc(l),rl.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new O().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Ch(n,t,e,i,s){const r=(i-t)*.5,o=(s-e)*.5,a=n*n,l=n*a;return(2*e-2*i+r+o)*l+(-3*e+3*i-2*r-o)*a+r*n+e}function O_(n,t){const e=1-n;return e*e*t}function F_(n,t){return 2*(1-n)*n*t}function B_(n,t){return n*n*t}function Fs(n,t,e,i){return O_(n,t)+F_(n,e)+B_(n,i)}function k_(n,t){const e=1-n;return e*e*e*t}function H_(n,t){const e=1-n;return 3*e*e*n*t}function G_(n,t){return 3*(1-n)*n*n*t}function V_(n,t){return n*n*n*t}function Bs(n,t,e,i,s){return k_(n,t)+H_(n,e)+G_(n,i)+V_(n,s)}class Dh extends Mn{constructor(t=new xt,e=new xt,i=new xt,s=new xt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new xt){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Bs(t,s.x,r.x,o.x,a.x),Bs(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class W_ extends Mn{constructor(t=new O,e=new O,i=new O,s=new O){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new O){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Bs(t,s.x,r.x,o.x,a.x),Bs(t,s.y,r.y,o.y,a.y),Bs(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Lh extends Mn{constructor(t=new xt,e=new xt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new xt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new xt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class $_ extends Mn{constructor(t=new O,e=new O){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new O){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new O){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ih extends Mn{constructor(t=new xt,e=new xt,i=new xt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new xt){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(Fs(t,s.x,r.x,o.x),Fs(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class X_ extends Mn{constructor(t=new O,e=new O,i=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new O){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(Fs(t,s.x,r.x,o.x),Fs(t,s.y,r.y,o.y),Fs(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Uh extends Mn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new xt){const i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return i.set(Ch(a,l.x,c.x,h.x,u.x),Ch(a,l.y,c.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new xt().fromArray(s))}return this}}var ol=Object.freeze({__proto__:null,ArcCurve:N_,CatmullRomCurve3:z_,CubicBezierCurve:Dh,CubicBezierCurve3:W_,EllipseCurve:el,LineCurve:Lh,LineCurve3:$_,QuadraticBezierCurve:Ih,QuadraticBezierCurve3:X_,SplineCurve:Uh});class q_ extends Mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ol[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new ol[s.type]().fromJSON(s))}return this}}class Nh extends q_{constructor(t){super(),this.type="Path",this.currentPoint=new xt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new Lh(this.currentPoint.clone(),new xt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new Ih(this.currentPoint.clone(),new xt(t,e),new xt(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){const a=new Dh(this.currentPoint.clone(),new xt(t,e),new xt(i,s),new xt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new Uh(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,i,s,r,o,a,l),this}absellipse(t,e,i,s,r,o,a,l){const c=new el(t,e,i,s,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}const Zr=new O,jr=new O,al=new O,Kr=new en;class Y_ extends Qe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(Gi*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},g=[];for(let _=0;_<l;_+=3){o?(c[0]=o.getX(_),c[1]=o.getX(_+1),c[2]=o.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);const{a:v,b:m,c:p}=Kr;if(v.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),Kr.getNormal(al),u[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,u[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,u[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let P=0;P<3;P++){const w=(P+1)%3,M=u[P],F=u[w],T=Kr[h[P]],I=Kr[h[w]],N=`${M}_${F}`,A=`${F}_${M}`;A in d&&d[A]?(al.dot(d[A].normal)<=r&&(g.push(T.x,T.y,T.z),g.push(I.x,I.y,I.z)),d[A]=null):N in d||(d[N]={index0:c[P],index1:c[w],normal:al.clone()})}}for(const _ in d)if(d[_]){const{index0:v,index1:m}=d[_];Zr.fromBufferAttribute(a,v),jr.fromBufferAttribute(a,m),g.push(Zr.x,Zr.y,Zr.z),g.push(jr.x,jr.y,jr.z)}this.setAttribute("position",new Be(g,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class ll extends Nh{constructor(t){super(t),this.uuid=pi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(new Nh().fromJSON(s))}return this}}const Z_={triangulate:function(n,t,e=2){const i=t&&t.length,s=i?t[0]*e:n.length;let r=zh(n,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,d,g;if(i&&(r=t0(n,t,r,e)),n.length>80*e){a=c=n[0],l=h=n[1];for(let _=e;_<s;_+=e)u=n[_],d=n[_+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);g=Math.max(c-a,h-l),g=g!==0?32767/g:0}return ks(r,o,e,a,l,g,0),o}};function zh(n,t,e,i,s){let r,o;if(s===u0(n,t,e,i)>0)for(r=t;r<e;r+=i)o=Bh(r,n[r],n[r+1],o);else for(r=e-i;r>=t;r-=i)o=Bh(r,n[r],n[r+1],o);return o&&Jr(o,o.next)&&(Gs(o),o=o.next),o}function Ti(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Jr(e,e.next)||Ee(e.prev,e,e.next)===0)){if(Gs(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function ks(n,t,e,i,s,r,o){if(!n)return;!o&&r&&r0(n,i,s,r);let a=n,l,c;for(;n.prev!==n.next;){if(l=n.prev,c=n.next,r?K_(n,i,s,r):j_(n)){t.push(l.i/e|0),t.push(n.i/e|0),t.push(c.i/e|0),Gs(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=J_(Ti(n),t,e),ks(n,t,e,i,s,r,2)):o===2&&Q_(n,t,e,i,s,r):ks(Ti(n),t,e,i,s,r,1);break}}}function j_(n){const t=n.prev,e=n,i=n.next;if(Ee(t,e,i)>=0)return!1;const s=t.x,r=e.x,o=i.x,a=t.y,l=e.y,c=i.y,h=s<r?s<o?s:o:r<o?r:o,u=a<l?a<c?a:c:l<c?l:c,d=s>r?s>o?s:o:r>o?r:o,g=a>l?a>c?a:c:l>c?l:c;let _=i.next;for(;_!==t;){if(_.x>=h&&_.x<=d&&_.y>=u&&_.y<=g&&ls(s,a,r,l,o,c,_.x,_.y)&&Ee(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function K_(n,t,e,i){const s=n.prev,r=n,o=n.next;if(Ee(s,r,o)>=0)return!1;const a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,d=o.y,g=a<l?a<c?a:c:l<c?l:c,_=h<u?h<d?h:d:u<d?u:d,v=a>l?a>c?a:c:l>c?l:c,m=h>u?h>d?h:d:u>d?u:d,p=cl(g,_,t,e,i),P=cl(v,m,t,e,i);let w=n.prevZ,M=n.nextZ;for(;w&&w.z>=p&&M&&M.z<=P;){if(w.x>=g&&w.x<=v&&w.y>=_&&w.y<=m&&w!==s&&w!==o&&ls(a,h,l,u,c,d,w.x,w.y)&&Ee(w.prev,w,w.next)>=0||(w=w.prevZ,M.x>=g&&M.x<=v&&M.y>=_&&M.y<=m&&M!==s&&M!==o&&ls(a,h,l,u,c,d,M.x,M.y)&&Ee(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;w&&w.z>=p;){if(w.x>=g&&w.x<=v&&w.y>=_&&w.y<=m&&w!==s&&w!==o&&ls(a,h,l,u,c,d,w.x,w.y)&&Ee(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;M&&M.z<=P;){if(M.x>=g&&M.x<=v&&M.y>=_&&M.y<=m&&M!==s&&M!==o&&ls(a,h,l,u,c,d,M.x,M.y)&&Ee(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function J_(n,t,e){let i=n;do{const s=i.prev,r=i.next.next;!Jr(s,r)&&Oh(s,i,i.next,r)&&Hs(s,r)&&Hs(r,s)&&(t.push(s.i/e|0),t.push(i.i/e|0),t.push(r.i/e|0),Gs(i),Gs(i.next),i=n=r),i=i.next}while(i!==n);return Ti(i)}function Q_(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&l0(o,a)){let l=Fh(o,a);o=Ti(o,o.next),l=Ti(l,l.next),ks(o,t,e,i,s,r,0),ks(l,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function t0(n,t,e,i){const s=[];let r,o,a,l,c;for(r=0,o=t.length;r<o;r++)a=t[r]*i,l=r<o-1?t[r+1]*i:n.length,c=zh(n,a,l,i,!1),c===c.next&&(c.steiner=!0),s.push(a0(c));for(s.sort(e0),r=0;r<s.length;r++)e=n0(s[r],e);return e}function e0(n,t){return n.x-t.x}function n0(n,t){const e=i0(n,t);if(!e)return t;const i=Fh(e,n);return Ti(i,i.next),Ti(e,e.next)}function i0(n,t){let e=t,i=-1/0,s;const r=n.x,o=n.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>i&&(i=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,l=s.x,c=s.y;let h=1/0,u;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&ls(o<c?r:i,o,l,c,o<c?i:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),Hs(e,n)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&s0(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function s0(n,t){return Ee(n.prev,n,t.prev)<0&&Ee(t.next,n,n.next)<0}function r0(n,t,e,i){let s=n;do s.z===0&&(s.z=cl(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,o0(s)}function o0(n){let t,e,i,s,r,o,a,l,c=1;do{for(e=n,n=null,r=null,o=0;e;){for(o++,i=e,a=0,t=0;t<c&&(a++,i=i.nextZ,!!i);t++);for(l=c;a>0||l>0&&i;)a!==0&&(l===0||!i||e.z<=i.z)?(s=e,e=e.nextZ,a--):(s=i,i=i.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;e=i}r.nextZ=null,c*=2}while(o>1);return n}function cl(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function a0(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function ls(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function l0(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!c0(n,t)&&(Hs(n,t)&&Hs(t,n)&&h0(n,t)&&(Ee(n.prev,n,t.prev)||Ee(n,t.prev,t))||Jr(n,t)&&Ee(n.prev,n,n.next)>0&&Ee(t.prev,t,t.next)>0)}function Ee(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Jr(n,t){return n.x===t.x&&n.y===t.y}function Oh(n,t,e,i){const s=to(Ee(n,t,e)),r=to(Ee(n,t,i)),o=to(Ee(e,i,n)),a=to(Ee(e,i,t));return!!(s!==r&&o!==a||s===0&&Qr(n,e,t)||r===0&&Qr(n,i,t)||o===0&&Qr(e,n,i)||a===0&&Qr(e,t,i))}function Qr(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function to(n){return n>0?1:n<0?-1:0}function c0(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Oh(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Hs(n,t){return Ee(n.prev,n,n.next)<0?Ee(n,t,n.next)>=0&&Ee(n,n.prev,t)>=0:Ee(n,t,n.prev)<0||Ee(n,n.next,t)<0}function h0(n,t){let e=n,i=!1;const s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Fh(n,t){const e=new hl(n.i,n.x,n.y),i=new hl(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function Bh(n,t,e,i){const s=new hl(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Gs(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function hl(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function u0(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}class ni{static area(t){const e=t.length;let i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return ni.area(t)<0}static triangulateShape(t,e){const i=[],s=[],r=[];kh(t),Hh(i,t);let o=t.length;e.forEach(kh);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,Hh(i,e[l]);const a=Z_.triangulate(i,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function kh(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Hh(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class ul extends Qe{constructor(t=new ll([new xt(.5,.5),new xt(-.5,.5),new xt(-.5,-.5),new xt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const i=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new Be(s,3)),this.setAttribute("uv",new Be(r,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,g=e.bevelThickness!==void 0?e.bevelThickness:.2,_=e.bevelSize!==void 0?e.bevelSize:g-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,P=e.UVGenerator!==void 0?e.UVGenerator:d0;let w,M=!1,F,T,I,N;p&&(w=p.getSpacedPoints(h),M=!0,d=!1,F=p.computeFrenetFrames(h,!1),T=new O,I=new O,N=new O),d||(m=0,g=0,_=0,v=0);const A=a.extractPoints(c);let b=A.shape;const U=A.holes;if(!ni.isClockWise(b)){b=b.reverse();for(let lt=0,vt=U.length;lt<vt;lt++){const L=U[lt];ni.isClockWise(L)&&(U[lt]=L.reverse())}}const $=ni.triangulateShape(b,U),Z=b;for(let lt=0,vt=U.length;lt<vt;lt++){const L=U[lt];b=b.concat(L)}function rt(lt,vt,L){return vt||console.error("THREE.ExtrudeGeometry: vec does not exist"),lt.clone().addScaledVector(vt,L)}const X=b.length,ht=$.length;function j(lt,vt,L){let Ht,ft,Ut;const bt=lt.x-vt.x,Wt=lt.y-vt.y,Lt=L.x-lt.x,D=L.y-lt.y,y=bt*bt+Wt*Wt,V=bt*D-Wt*Lt;if(Math.abs(V)>Number.EPSILON){const tt=Math.sqrt(y),ct=Math.sqrt(Lt*Lt+D*D),Q=vt.x-Wt/tt,kt=vt.y+bt/tt,Rt=L.x-D/ct,It=L.y+Lt/ct,re=((Rt-Q)*D-(It-kt)*Lt)/(bt*D-Wt*Lt);Ht=Q+bt*re-lt.x,ft=kt+Wt*re-lt.y;const mt=Ht*Ht+ft*ft;if(mt<=2)return new xt(Ht,ft);Ut=Math.sqrt(mt/2)}else{let tt=!1;bt>Number.EPSILON?Lt>Number.EPSILON&&(tt=!0):bt<-Number.EPSILON?Lt<-Number.EPSILON&&(tt=!0):Math.sign(Wt)===Math.sign(D)&&(tt=!0),tt?(Ht=-Wt,ft=bt,Ut=Math.sqrt(y)):(Ht=bt,ft=Wt,Ut=Math.sqrt(y/2))}return new xt(Ht/Ut,ft/Ut)}const st=[];for(let lt=0,vt=Z.length,L=vt-1,Ht=lt+1;lt<vt;lt++,L++,Ht++)L===vt&&(L=0),Ht===vt&&(Ht=0),st[lt]=j(Z[lt],Z[L],Z[Ht]);const at=[];let Ct,Kt=st.concat();for(let lt=0,vt=U.length;lt<vt;lt++){const L=U[lt];Ct=[];for(let Ht=0,ft=L.length,Ut=ft-1,bt=Ht+1;Ht<ft;Ht++,Ut++,bt++)Ut===ft&&(Ut=0),bt===ft&&(bt=0),Ct[Ht]=j(L[Ht],L[Ut],L[bt]);at.push(Ct),Kt=Kt.concat(Ct)}for(let lt=0;lt<m;lt++){const vt=lt/m,L=g*Math.cos(vt*Math.PI/2),Ht=_*Math.sin(vt*Math.PI/2)+v;for(let ft=0,Ut=Z.length;ft<Ut;ft++){const bt=rt(Z[ft],st[ft],Ht);St(bt.x,bt.y,-L)}for(let ft=0,Ut=U.length;ft<Ut;ft++){const bt=U[ft];Ct=at[ft];for(let Wt=0,Lt=bt.length;Wt<Lt;Wt++){const D=rt(bt[Wt],Ct[Wt],Ht);St(D.x,D.y,-L)}}}const de=_+v;for(let lt=0;lt<X;lt++){const vt=d?rt(b[lt],Kt[lt],de):b[lt];M?(I.copy(F.normals[0]).multiplyScalar(vt.x),T.copy(F.binormals[0]).multiplyScalar(vt.y),N.copy(w[0]).add(I).add(T),St(N.x,N.y,N.z)):St(vt.x,vt.y,0)}for(let lt=1;lt<=h;lt++)for(let vt=0;vt<X;vt++){const L=d?rt(b[vt],Kt[vt],de):b[vt];M?(I.copy(F.normals[lt]).multiplyScalar(L.x),T.copy(F.binormals[lt]).multiplyScalar(L.y),N.copy(w[lt]).add(I).add(T),St(N.x,N.y,N.z)):St(L.x,L.y,u/h*lt)}for(let lt=m-1;lt>=0;lt--){const vt=lt/m,L=g*Math.cos(vt*Math.PI/2),Ht=_*Math.sin(vt*Math.PI/2)+v;for(let ft=0,Ut=Z.length;ft<Ut;ft++){const bt=rt(Z[ft],st[ft],Ht);St(bt.x,bt.y,u+L)}for(let ft=0,Ut=U.length;ft<Ut;ft++){const bt=U[ft];Ct=at[ft];for(let Wt=0,Lt=bt.length;Wt<Lt;Wt++){const D=rt(bt[Wt],Ct[Wt],Ht);M?St(D.x,D.y+w[h-1].y,w[h-1].x+L):St(D.x,D.y,u+L)}}}it(),_t();function it(){const lt=s.length/3;if(d){let vt=0,L=X*vt;for(let Ht=0;Ht<ht;Ht++){const ft=$[Ht];Gt(ft[2]+L,ft[1]+L,ft[0]+L)}vt=h+m*2,L=X*vt;for(let Ht=0;Ht<ht;Ht++){const ft=$[Ht];Gt(ft[0]+L,ft[1]+L,ft[2]+L)}}else{for(let vt=0;vt<ht;vt++){const L=$[vt];Gt(L[2],L[1],L[0])}for(let vt=0;vt<ht;vt++){const L=$[vt];Gt(L[0]+X*h,L[1]+X*h,L[2]+X*h)}}i.addGroup(lt,s.length/3-lt,0)}function _t(){const lt=s.length/3;let vt=0;Bt(Z,vt),vt+=Z.length;for(let L=0,Ht=U.length;L<Ht;L++){const ft=U[L];Bt(ft,vt),vt+=ft.length}i.addGroup(lt,s.length/3-lt,1)}function Bt(lt,vt){let L=lt.length;for(;--L>=0;){const Ht=L;let ft=L-1;ft<0&&(ft=lt.length-1);for(let Ut=0,bt=h+m*2;Ut<bt;Ut++){const Wt=X*Ut,Lt=X*(Ut+1),D=vt+Ht+Wt,y=vt+ft+Wt,V=vt+ft+Lt,tt=vt+Ht+Lt;jt(D,y,V,tt)}}}function St(lt,vt,L){l.push(lt),l.push(vt),l.push(L)}function Gt(lt,vt,L){Xt(lt),Xt(vt),Xt(L);const Ht=s.length/3,ft=P.generateTopUV(i,s,Ht-3,Ht-2,Ht-1);ie(ft[0]),ie(ft[1]),ie(ft[2])}function jt(lt,vt,L,Ht){Xt(lt),Xt(vt),Xt(Ht),Xt(vt),Xt(L),Xt(Ht);const ft=s.length/3,Ut=P.generateSideWallUV(i,s,ft-6,ft-3,ft-2,ft-1);ie(Ut[0]),ie(Ut[1]),ie(Ut[3]),ie(Ut[1]),ie(Ut[2]),ie(Ut[3])}function Xt(lt){s.push(l[lt*3+0]),s.push(l[lt*3+1]),s.push(l[lt*3+2])}function ie(lt){r.push(lt.x),r.push(lt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return f0(e,i,t)}static fromJSON(t,e){const i=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];i.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new ol[s.type]().fromJSON(s)),new ul(i,t.options)}}const d0={generateTopUV:function(n,t,e,i,s){const r=t[e*3],o=t[e*3+1],a=t[i*3],l=t[i*3+1],c=t[s*3],h=t[s*3+1];return[new xt(r,o),new xt(a,l),new xt(c,h)]},generateSideWallUV:function(n,t,e,i,s,r){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[i*3],h=t[i*3+1],u=t[i*3+2],d=t[s*3],g=t[s*3+1],_=t[s*3+2],v=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new xt(o,1-l),new xt(c,1-u),new xt(d,1-_),new xt(v,1-p)]:[new xt(a,1-l),new xt(h,1-u),new xt(g,1-_),new xt(m,1-p)]}};function f0(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){const r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class dl extends Qe{constructor(t=new ll([new xt(0,.5),new xt(-.5,-.5),new xt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],s=[],r=[],o=[];let a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(i),this.setAttribute("position",new Be(s,3)),this.setAttribute("normal",new Be(r,3)),this.setAttribute("uv",new Be(o,2));function c(h){const u=s.length/3,d=h.extractPoints(e);let g=d.shape;const _=d.holes;ni.isClockWise(g)===!1&&(g=g.reverse());for(let m=0,p=_.length;m<p;m++){const P=_[m];ni.isClockWise(P)===!0&&(_[m]=P.reverse())}const v=ni.triangulateShape(g,_);for(let m=0,p=_.length;m<p;m++){const P=_[m];g=g.concat(P)}for(let m=0,p=g.length;m<p;m++){const P=g[m];s.push(P.x,P.y,0),r.push(0,0,1),o.push(P.x,P.y)}for(let m=0,p=v.length;m<p;m++){const P=v[m],w=P[0]+u,M=P[1]+u,F=P[2]+u;i.push(w,M,F),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return p0(e,t)}static fromJSON(t,e){const i=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];i.push(o)}return new dl(i,t.curveSegments)}}function p0(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const s=n[e];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t}class Gh extends ts{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ae(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dc,this.normalScale=new xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _n,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Vh extends Pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ae(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class m0 extends Vh{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ae(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const fl=new Me,Wh=new O,$h=new O;class g0{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xt(512,512),this.map=null,this.mapPass=null,this.matrix=new Me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Va,this._frameExtents=new xt(1,1),this._viewportCount=1,this._viewports=[new Te(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Wh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Wh),$h.setFromMatrixPosition(t.target.matrixWorld),e.lookAt($h),e.updateMatrixWorld(),fl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(fl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class _0 extends g0{constructor(){super(new Yc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class x0 extends Vh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.target=new Pe,this.shadow=new _0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Xh=new Me;class v0{constructor(t,e,i=0,s=1/0){this.ray=new Tr(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Pa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Xh.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Xh),this}intersectObject(t,e=!0,i=[]){return pl(t,this,i,e),i.sort(qh),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)pl(t[s],this,i,e);return i.sort(qh),i}}function qh(n,t){return n.distance-t.distance}function pl(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)pl(r[o],t,e,!0)}}class Yh{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(ze(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class M0 extends Ph{constructor(t=10,e=10,i=4473924,s=8947848){i=new ae(i),s=new ae(s);const r=e/2,o=t/e,a=t/2,l=[],c=[];for(let d=0,g=0,_=-a;d<=e;d++,_+=o){l.push(-a,0,_,a,0,_),l.push(_,0,-a,_,0,a);const v=d===r?i:s;v.toArray(c,g),g+=3,v.toArray(c,g),g+=3,v.toArray(c,g),g+=3,v.toArray(c,g),g+=3}const h=new Qe;h.setAttribute("position",new Be(l,3)),h.setAttribute("color",new Be(c,3));const u=new Qa({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class y0 extends fi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ao}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ao);const Zh={type:"change"},ml={type:"start"},jh={type:"end"},eo=new Tr,Kh=new ti,S0=Math.cos(70*Cs.DEG2RAD),Le=new O,Ze=2*Math.PI,_e={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},gl=1e-6;class b0 extends y0{constructor(t,e=null){super(t,e),this.state=_e.NONE,this.enabled=!0,this.target=new O,this.cursor=new O,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Di.ROTATE,MIDDLE:Di.DOLLY,RIGHT:Di.PAN},this.touches={ONE:Li.ROTATE,TWO:Li.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new O,this._lastQuaternion=new gi,this._lastTargetPosition=new O,this._quat=new gi().setFromUnitVectors(t.up,new O(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Yh,this._sphericalDelta=new Yh,this._scale=1,this._panOffset=new O,this._rotateStart=new xt,this._rotateEnd=new xt,this._rotateDelta=new xt,this._panStart=new xt,this._panEnd=new xt,this._panDelta=new xt,this._dollyStart=new xt,this._dollyEnd=new xt,this._dollyDelta=new xt,this._dollyDirection=new O,this._mouse=new xt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=w0.bind(this),this._onPointerDown=E0.bind(this),this._onPointerUp=T0.bind(this),this._onContextMenu=I0.bind(this),this._onMouseWheel=P0.bind(this),this._onKeyDown=C0.bind(this),this._onTouchStart=D0.bind(this),this._onTouchMove=L0.bind(this),this._onMouseDown=A0.bind(this),this._onMouseMove=R0.bind(this),this._interceptControlDown=U0.bind(this),this._interceptControlUp=N0.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Zh),this.update(),this.state=_e.NONE}update(t=null){const e=this.object.position;Le.copy(e).sub(this.target),Le.applyQuaternion(this._quat),this._spherical.setFromVector3(Le),this.autoRotate&&this.state===_e.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Ze:i>Math.PI&&(i-=Ze),s<-Math.PI?s+=Ze:s>Math.PI&&(s-=Ze),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Le.setFromSpherical(this._spherical),Le.applyQuaternion(this._quatInverse),e.copy(this.target).add(Le),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Le.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new O(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new O(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Le.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(eo.origin.copy(this.object.position),eo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(eo.direction))<S0?this.object.lookAt(this.target):(Kh.setFromNormalAndCoplanarPoint(this.object.up,this.target),eo.intersectPlane(Kh,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>gl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>gl||this._lastTargetPosition.distanceToSquared(this.target)>gl?(this.dispatchEvent(Zh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ze/60*this.autoRotateSpeed*t:Ze/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Le.setFromMatrixColumn(e,0),Le.multiplyScalar(-t),this._panOffset.add(Le)}_panUp(t,e){this.screenSpacePanning===!0?Le.setFromMatrixColumn(e,1):(Le.setFromMatrixColumn(e,0),Le.crossVectors(this.object.up,Le)),Le.multiplyScalar(t),this._panOffset.add(Le)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Le.copy(s).sub(this.target);let r=Le.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ze*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ze*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(Ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-Ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(Ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-Ze*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ze*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ze*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new xt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function E0(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function w0(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function T0(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(jh),this.state=_e.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function A0(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Di.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=_e.DOLLY;break;case Di.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=_e.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=_e.ROTATE}break;case Di.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=_e.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=_e.PAN}break;default:this.state=_e.NONE}this.state!==_e.NONE&&this.dispatchEvent(ml)}function R0(n){switch(this.state){case _e.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case _e.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case _e.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function P0(n){this.enabled===!1||this.enableZoom===!1||this.state!==_e.NONE||(n.preventDefault(),this.dispatchEvent(ml),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(jh))}function C0(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function D0(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Li.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=_e.TOUCH_ROTATE;break;case Li.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=_e.TOUCH_PAN;break;default:this.state=_e.NONE}break;case 2:switch(this.touches.TWO){case Li.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=_e.TOUCH_DOLLY_PAN;break;case Li.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=_e.TOUCH_DOLLY_ROTATE;break;default:this.state=_e.NONE}break;default:this.state=_e.NONE}this.state!==_e.NONE&&this.dispatchEvent(ml)}function L0(n){switch(this._trackPointer(n),this.state){case _e.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case _e.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case _e.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case _e.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=_e.NONE}}function I0(n){this.enabled!==!1&&n.preventDefault()}function U0(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function N0(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class no extends Pe{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new xt(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const cs=new O,Jh=new Me,Qh=new Me,tu=new O,eu=new O;class z0{constructor(t={}){const e=this;let i,s,r,o;const a={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:i,height:s}},this.render=function(_,v){_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),v.parent===null&&v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),Jh.copy(v.matrixWorldInverse),Qh.multiplyMatrices(v.projectionMatrix,Jh),h(_,_,v),g(_)},this.setSize=function(_,v){i=_,s=v,r=i/2,o=s/2,l.style.width=_+"px",l.style.height=v+"px"};function c(_){_.isCSS2DObject&&(_.element.style.display="none");for(let v=0,m=_.children.length;v<m;v++)c(_.children[v])}function h(_,v,m){if(_.visible===!1){c(_);return}if(_.isCSS2DObject){cs.setFromMatrixPosition(_.matrixWorld),cs.applyMatrix4(Qh);const p=cs.z>=-1&&cs.z<=1&&_.layers.test(m.layers)===!0,P=_.element;P.style.display=p===!0?"":"none",p===!0&&(_.onBeforeRender(e,v,m),P.style.transform="translate("+-100*_.center.x+"%,"+-100*_.center.y+"%)translate("+(cs.x*r+r)+"px,"+(-cs.y*o+o)+"px)",P.parentNode!==l&&l.appendChild(P),_.onAfterRender(e,v,m));const w={distanceToCameraSquared:u(m,_)};a.objects.set(_,w)}for(let p=0,P=_.children.length;p<P;p++)h(_.children[p],v,m)}function u(_,v){return tu.setFromMatrixPosition(_.matrixWorld),eu.setFromMatrixPosition(v.matrixWorld),tu.distanceToSquared(eu)}function d(_){const v=[];return _.traverseVisible(function(m){m.isCSS2DObject&&v.push(m)}),v}function g(_){const v=d(_).sort(function(p,P){if(p.renderOrder!==P.renderOrder)return P.renderOrder-p.renderOrder;const w=a.objects.get(p).distanceToCameraSquared,M=a.objects.get(P).distanceToCameraSquared;return w-M}),m=v.length;for(let p=0,P=v.length;p<P;p++)v[p].element.style.zIndex=m-p}}}function nu(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,l=new Qe;let c=0;for(let h=0;h<n.length;++h){const u=n[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const g in u.attributes){if(!i.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+g+'" attribute exists among all geometries, or in none of them.'),null;r[g]===void 0&&(r[g]=[]),r[g].push(u.attributes[g]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const g in u.morphAttributes){if(!s.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[g]===void 0&&(o[g]=[]),o[g].push(u.morphAttributes[g])}if(t){let g;if(e)g=u.index.count;else if(u.attributes.position!==void 0)g=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,g,h),c+=g}}if(e){let h=0;const u=[];for(let d=0;d<n.length;++d){const g=n[d].index;for(let _=0;_<g.count;++_)u.push(g.getX(_)+h);h+=n[d].attributes.position.count}l.setIndex(u)}for(const h in r){const u=iu(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const g=[];for(let v=0;v<o[h].length;++v)g.push(o[h][v][d]);const _=iu(g);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(_)}}return l}function iu(n){let t,e,i,s=-1,r=0;for(let c=0;c<n.length;++c){const h=n[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),a=new un(o,e,i);let l=0;for(let c=0;c<n.length;++c){const h=n[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let d=0,g=h.count;d<g;d++)for(let _=0;_<e;_++){const v=h.getComponent(d,_);a.setComponent(d+u,_,v)}}else o.set(h.array,l);l+=h.count*e}return s!==void 0&&(a.gpuType=s),a}const ii=.2,Vs=2.1,O0=1.1,Ws="#e2001a";function _l(n,t){const e=n.map(s=>(t?new dn(s.w,t,s.d):new ei(s.w,s.d).rotateX(-Math.PI/2)).translate(s.x+s.w/2,0,s.z+s.d/2));if(!e.length)return new ei(0,0);if(e.length===1)return e[0];const i=nu(e);return e.forEach(s=>s.dispose()),i}const su=n=>new ll(n.map(([t,e])=>new xt(t,-e)));function $s(n,t){return new ul(su(n),{depth:t,bevelEnabled:!1}).rotateX(-Math.PI/2)}function ru(n,t){let e=n;for(const i of t)e=e.flatMap(s=>xu(s,i));return e}function ou(n,t){if(!n.length)return new ei(0,0);const e=n.map(s=>t?$s(s,t):new dl(su(s)).rotateX(-Math.PI/2));if(e.length===1)return e[0];const i=nu(e);return e.forEach(s=>s.dispose()),i}function F0(n,t){const{x:e,z:i,w:s,d:r}=Ms(n,t).opening;return[[e,i],[e+s,i],[e+s,i+r],[e,i+r]].map(o=>Bn(n,o))}function B0(n){const t=new vn,[e,i]=Ri(n);t.position.set(e,0,i),t.rotation.y=-Cs.degToRad(ye(n));const s=new vn;return s.position.set(-e,0,-i),t.add(s),{frame:t,inner:s}}const k0=n=>n<.5?4*n*n*n:1-Math.pow(-2*n+2,3)/2;class H0{constructor(t,e={}){this.container=t,this.options={wallMode:"full",explode:0,labels:!0,background:"#eef1f5",onRoomClick:null,onTankClick:null,onPrinterClick:null,...e},this.building=null,this.focusFloorId=null,this.selectedRoomId=null,this.hoverRoomId=null,this.selectedTankId=null,this.hoverTankId=null,this.selectedPrinterId=null,this.hoverPrinterId=null,this.rooms=new Map,this.tanks=new Map,this.printers=new Map,this.floors=new Map,this.selectionObj=null,this.anim=null,this.hasFitted=!1;const i=t.clientWidth||1,s=t.clientHeight||1,r=this.renderer=new L_({antialias:!0});r.setPixelRatio(Math.min(window.devicePixelRatio,2)),r.setSize(i,s),r.shadowMap.enabled=!0,r.shadowMap.type=jl,t.appendChild(r.domElement),this.labelRenderer=new z0,this.labelRenderer.setSize(i,s),this.labelRenderer.domElement.className="label-layer",t.appendChild(this.labelRenderer.domElement),this.scene=new I_,this.scene.background=new ae(this.options.background),this.camera=new sn(45,i/s,.1,2e3),this.camera.position.set(30,28,38);const o=this.controls=new b0(this.camera,r.domElement);o.enableDamping=!0,o.dampingFactor=.08,o.maxPolarAngle=Math.PI*.48,o.minDistance=3,o.maxDistance=400,o.addEventListener("start",()=>this.anim=null),this.scene.add(new m0(16777215,11121599,1.5));const a=this.sun=new x0(16777215,2.2);a.castShadow=!0,a.shadow.mapSize.set(2048,2048),a.shadow.bias=-4e-4,a.shadow.normalBias=.03,this.scene.add(a,a.target),this.ground=new be(new ei(1e3,1e3),new Gh({color:14672873,roughness:1,opacity:.55})),this.ground.rotation.x=-Math.PI/2,this.ground.position.y=-ii-.01,this.ground.receiveShadow=!0,this.scene.add(this.ground),this.grid=new M0(300,300,13225943,14015200),this.grid.position.y=-ii-.005,this.scene.add(this.grid),this.buildingGroup=new vn,this.scene.add(this.buildingGroup),this.raycaster=new v0,this.bindPointer(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(t),this.tick=this.tick.bind(this),this.raf=requestAnimationFrame(this.tick)}setBuilding(t){this.building=t,this.clear();const e=vo(t);let i=-t.floors.slice(0,e).reduce((s,r)=>s+r.height,0);t.floors.forEach((s,r)=>{const o=t.floors[r-1],a={hasFloorAbove:r<t.floors.length-1,openings:o?o.rooms.filter(c=>c.type==="stairs").map(c=>F0(c,o.height)):[]},l=this.buildFloor(s,a);l.userData.elevation=i,l.userData.index=r-e,this.floors.set(s.id,l),this.buildingGroup.add(l),i+=s.height}),this.layoutFloors(),this.applyFocus(),this.applyHighlight(),this.hasFitted||(this.fitAll(!1),this.hasFitted=!0)}setFocusFloor(t){this.focusFloorId=t,this.applyFocus(),this.applyHighlight()}setSelectedRoom(t){this.selectedRoomId=t,this.applyHighlight()}setSelectedPrinter(t){this.selectedPrinterId=t,this.applyHighlight()}setSelectedTank(t){this.selectedTankId=t,this.applyHighlight()}setWallMode(t){this.options.wallMode=t,this.building&&this.setBuilding(this.building)}setExplode(t){this.options.explode=t,this.layoutFloors()}setLabels(t){this.options.labels=t,this.applyFocus()}focusRoom(t){const e=this.rooms.get(t);if(!e)return;const i=this.floors.get(e.floorId),s=e.room,r=new O(s.x+s.width/2,i.position.y+.5,s.z+s.depth/2),o=this.camera.position.clone().sub(this.controls.target).normalize();o.y=Math.max(o.y,.75),o.normalize();const a=Math.max(s.width,s.depth)*1.5+8;this.flyTo(r.clone().addScaledVector(o,a),r)}fitAll(t=!0){var l;const e=new _i;for(const c of this.floors.values()){const{state:h,bounds:u,height:d}=c.userData;!u||h==="hidden"||h==="ghost"&&this.focusFloorId||(e.expandByPoint(new O(u.minX,c.position.y,u.minZ)),e.expandByPoint(new O(u.maxX,c.position.y+d,u.maxZ)))}if(e.isEmpty()){const c=((l=this.floors.get(this.focusFloorId))==null?void 0:l.position.y)??0;e.set(new O(-5,c,-5),new O(5,c+3,5))}const i=e.getCenter(new O),s=e.getSize(new O).length()/2,r=Cs.degToRad(this.camera.fov/2),o=s/Math.sin(r)*Math.max(.85,.85/this.camera.aspect),a=new O(.45,.8,1).normalize();this.flyTo(i.clone().addScaledVector(a,o),i,t)}dispose(){cancelAnimationFrame(this.raf),this.resizeObserver.disconnect(),this.controls.dispose(),this.clear(),this.ground.geometry.dispose(),this.ground.material.dispose(),this.grid.geometry.dispose(),this.grid.material.dispose(),this.renderer.dispose(),this.renderer.domElement.remove(),this.labelRenderer.domElement.remove()}buildFloor(t,{hasFloorAbove:e=!1,openings:i=[]}={}){const s=new vn,r=[],o=m=>{const p=new Gh(m);return r.push(p),p},a=[],l=Mo(t),c=this.options.wallMode==="low",h=t.height-ii,u=c?Math.min(O0,h):h,d=[];if(l){const[p,P,w,M]=[l.minX-.15,l.minZ-.15,l.maxX+.15,l.maxZ+.15],F=[[p,P],[w,P],[w,M],[p,M]],T=new be(ou(ru([F],i),ii),o({color:13883615,roughness:.9}));T.position.y=-ii,T.receiveShadow=!0,T.castShadow=!0,s.add(T);const I=document.createElement("div");I.className="floor-tag",I.textContent=t.name;const N=new no(I);N.position.set(l.minX-.4,0,l.maxZ+.4),s.add(N),a.push(N)}for(const m of t.rooms){const p=new be(ou(ru(js(m),i),0),o({color:Zs(m),roughness:.85}));p.position.y=.01,p.receiveShadow=!0,p.userData={roomId:m.id,floorId:t.id},s.add(p);const P=document.createElement("div");P.className="room-label"+(m.type==="corridor"?" is-corridor":""),P.innerHTML=`<span class="rl-name">${se(m.name)}</span>`+(m.occupant?`<span class="rl-sub">${se(m.occupant)}</span>`:"");const w=new no(P),[M,F]=bl(m);if(w.position.set(M,1.2,F),s.add(w),a.push(w),this.rooms.set(m.id,{mesh:p,label:w,floorId:t.id,room:m}),m.type==="stairs"){const{frame:T,inner:I}=B0(m);s.add(T),e&&d.push(...this.buildStairs(I,m,t,o,u)),this.buildElevator(I,m,t,o,u)}for(const T of m.tanks){const[I,N]=ys(m,T),A=new be(new dn(ai,.03,ai),o({color:7305090,roughness:.35,metalness:.6}));A.position.set(I,.025,N),A.rotation.y=-Cs.degToRad(ye(m)),A.castShadow=!0,A.userData={tankId:T.id,roomId:m.id,floorId:t.id},s.add(A);const b=document.createElement("button");b.type="button",b.className="tank-label",b.title=`${T.name} – ${T.ports.length} Ports`,b.innerHTML=`<span class="tl-icon"></span>${se(T.name)}<span class="tl-count">${T.ports.length}</span>`,b.addEventListener("click",J=>{var $,Z;J.stopPropagation(),(Z=($=this.options).onTankClick)==null||Z.call($,T.id,m.id,t.id)});const U=new no(b);U.position.set(I,.35,N),s.add(U),a.push(U),this.tanks.set(T.id,{mesh:A,label:U,floorId:t.id,roomId:m.id})}for(const T of m.printers){const[I,N]=ys(m,T),A=.42,b=new vn;b.position.set(I,0,N),b.rotation.y=-Cs.degToRad(ye(m));const U=new be(new dn(li*.9,A,Ss*.9),o({color:15330544,roughness:.6}));U.position.set(0,A/2,0),U.castShadow=!0,U.receiveShadow=!0,U.userData={printerId:T.id,roomId:m.id,floorId:t.id};const J=new be(new dn(li*.9,.06,Ss*.9),o({color:3883858,roughness:.5}));J.position.set(0,A+.03,0),J.castShadow=!0;const $=new be(new dn(li*.6,.02,.12),o({color:16777215,roughness:.9}));$.position.set(0,A*.55,Ss*.45+.05),b.add(U,J,$),s.add(b);const Z=document.createElement("button");Z.type="button",Z.className="printer-label",Z.title=`${T.name}${T.ip?` – ${T.ip}`:""}`,Z.innerHTML=`<span class="pl-icon"></span>${se(T.name)}`,Z.addEventListener("click",X=>{var ht,j;X.stopPropagation(),(j=(ht=this.options).onPrinterClick)==null||j.call(ht,T.id,m.id,t.id)});const rt=new no(Z);rt.position.set(I,.85,N),s.add(rt),a.push(rt),this.printers.set(T.id,{mesh:U,label:rt,floorId:t.id,roomId:m.id})}}const g=o({color:16514041,roughness:.7});let _=null,v=null;for(const m of Eu(t.rooms,t.openings??[],t.walls??[])){if(m.len<.01)continue;if(m.kind==="glass"||m.kind==="transom"){const w=m.kind==="transom"?Math.min(Vs,u):0;if(u-w<.02)continue;_??(_=o({color:10274784,roughness:.05,metalness:.1,transparent:!0,opacity:.32,depthWrite:!1})),v??(v=o({color:5989747,roughness:.5,metalness:.4}));const M=Math.min(.05,(u-w)/4),F=new be($s(m.quad,u-w-M*2),_);F.position.y=w+M,s.add(F);for(const T of[w,u-M]){const I=new be($s(m.quad,M),v);I.position.y=T,I.castShadow=!0,s.add(I)}continue}if(m.kind==="lintel"&&(c||u<=Vs+.05))continue;const p=m.kind==="wall"?u:u-Vs,P=new be($s(m.quad,p),g);P.position.y=m.kind==="wall"?0:Vs,P.castShadow=!0,P.receiveShadow=!0,s.add(P)}return s.userData={floorId:t.id,mats:r,labels:a,bounds:l,stairTops:d,height:t.height,state:"full"},s}buildStairs(t,e,i,s,r){const{steps:o,landings:a}=Ms(e,i.height),l=[s({color:12896720,roughness:.8}),s({color:12107462,roughness:.8})],c=[],h=(u,d)=>{const g=new be(new dn(u.w,u.top,u.d),d);g.position.set(u.x+u.w/2,u.top/2+.01,u.z+u.d/2),g.castShadow=!0,g.receiveShadow=!0,t.add(g),u.top>r+.01&&c.push(g)};return o.forEach((u,d)=>h(u,l[d%2])),a.forEach(u=>h(u,l[0])),c}buildElevator(t,e,i,s,r){const o=Ms(e,i.height).elevator;if(!o)return;const a=new be(_l(o.walls,r),s({color:14278114,roughness:.8})),l=Math.min(Vs,r),c=new be(_l([o.door],l),s({color:10134445,roughness:.3,metalness:.7}));a.position.y=r/2,c.position.y=l/2;for(const h of[a,c])h.castShadow=!0,h.receiveShadow=!0,t.add(h);if(r>l+.01){const h=new be(_l([o.door],r-l),a.material);h.position.y=l+(r-l)/2,t.add(h)}}clear(){this.clearSelection();for(const t of this.floors.values())t.traverse(e=>{var i;e.isCSS2DObject&&e.element.remove(),(i=e.geometry)==null||i.dispose()}),t.userData.mats.forEach(e=>e.dispose()),this.buildingGroup.remove(t);this.floors.clear(),this.rooms.clear(),this.tanks.clear(),this.printers.clear()}layoutFloors(){for(const t of this.floors.values())t.position.y=t.userData.elevation+t.userData.index*this.options.explode;this.fitShadow(),this.applyGround()}applyFocus(){if(!this.building)return;const t=this.building.floors,e=this.focusFloorId?t.findIndex(i=>i.id===this.focusFloorId):-1;t.forEach((i,s)=>{var a;const r=this.floors.get(i.id);if(!r)return;let o="full";e>=0&&(o=s===e?"full":s<e?"ghost":"hidden"),r.userData.state=o,r.visible=o!=="hidden";for(const l of r.userData.mats){const c=o==="ghost";(a=l.userData).base??(a.base={opacity:l.opacity,transparent:l.transparent,depthWrite:l.depthWrite});const h=l.userData.base,u=c||h.transparent;l.transparent!==u&&(l.needsUpdate=!0),l.transparent=u,l.opacity=c?Math.min(.14,h.opacity):h.opacity,l.depthWrite=!c&&h.depthWrite}for(const l of r.userData.labels)l.visible=o==="full"&&this.options.labels}),this.applyGround(),t.forEach((i,s)=>{var o;const r=t[s+1]&&this.floors.get(t[s+1].id);for(const a of((o=this.floors.get(i.id))==null?void 0:o.userData.stairTops)??[])a.visible=!!(r!=null&&r.visible)})}applyGround(){if(!this.building)return;const t=this.building.floors.map(a=>this.floors.get(a.id)).filter(Boolean),e=t.find(a=>a.userData.floorId===this.focusFloorId),i=e&&e.userData.index<0,s=i?e.position.y-ii-.01:-ii-.01,r=!i&&t.some(a=>a.userData.index<0&&a.visible);this.ground.position.y=s,this.grid.position.y=s+.005;const o=this.ground.material;o.transparent!==r&&(o.needsUpdate=!0),o.transparent=r,o.depthWrite=!r}applyHighlight(){for(const[t,e]of this.rooms){const i=e.mesh.material;t===this.selectedRoomId?(i.emissive.set(Ws),i.emissiveIntensity=.25):t===this.hoverRoomId?(i.emissive.set(16777215),i.emissiveIntensity=.2):i.emissive.set(0),e.label.element.classList.toggle("is-selected",t===this.selectedRoomId)}for(const[t,e]of this.tanks){const i=e.mesh.material,s=t===this.selectedTankId;s?(i.emissive.set(Ws),i.emissiveIntensity=.8):t===this.hoverTankId?(i.emissive.set(16777215),i.emissiveIntensity=.35):i.emissive.set(0),e.label.element.classList.toggle("is-selected",s)}for(const[t,e]of this.printers){const i=e.mesh.material,s=t===this.selectedPrinterId;s?(i.emissive.set(Ws),i.emissiveIntensity=.45):t===this.hoverPrinterId?(i.emissive.set(16777215),i.emissiveIntensity=.25):i.emissive.set(0),e.label.element.classList.toggle("is-selected",s)}this.updateSelection()}updateSelection(){this.clearSelection();const t=this.rooms.get(this.selectedRoomId);if(!t)return;const e=this.floors.get(t.floorId);if(e.userData.state!=="full")return;const i=t.room,s=e.userData.height-ii,r=$s(mn(i),s),o=new be(r,new Ba({color:Ws,transparent:!0,opacity:.1,depthWrite:!1})),a=new Ph(new Y_(r),new Qa({color:Ws})),l=new vn;l.add(o,a),l.position.y=.02,e.add(l),this.selectionObj=l}clearSelection(){this.selectionObj&&(this.selectionObj.traverse(t=>{var e,i;(e=t.geometry)==null||e.dispose(),(i=t.material)==null||i.dispose()}),this.selectionObj.removeFromParent(),this.selectionObj=null)}fitShadow(){const t=new _i;for(const r of this.floors.values()){const o=r.userData.bounds;o&&(t.expandByPoint(new O(o.minX,r.position.y,o.minZ)),t.expandByPoint(new O(o.maxX,r.position.y+r.userData.height,o.maxZ)))}if(t.isEmpty())return;const e=t.getCenter(new O),i=Math.max(10,t.getSize(new O).length()/2);this.sun.position.copy(e).add(new O(i*.7,i*1.6,i*.5)),this.sun.target.position.copy(e);const s=this.sun.shadow.camera;s.left=s.bottom=-i*1.3,s.right=s.top=i*1.3,s.near=.5,s.far=i*5,s.updateProjectionMatrix()}bindPointer(){const t=this.renderer.domElement;let e=null;t.addEventListener("pointerdown",i=>e={x:i.clientX,y:i.clientY}),t.addEventListener("pointerup",i=>{var o,a,l,c,h,u;if(!e||i.button!==0)return;const s=Math.hypot(i.clientX-e.x,i.clientY-e.y);if(e=null,s>5)return;const r=this.pick(i);r!=null&&r.tankId?(a=(o=this.options).onTankClick)==null||a.call(o,r.tankId,r.roomId,r.floorId):r!=null&&r.printerId?(c=(l=this.options).onPrinterClick)==null||c.call(l,r.printerId,r.roomId,r.floorId):(u=(h=this.options).onRoomClick)==null||u.call(h,(r==null?void 0:r.roomId)??null,(r==null?void 0:r.floorId)??null)}),t.addEventListener("pointermove",i=>{if(i.buttons)return;const s=this.pick(i),r=(s==null?void 0:s.tankId)??null,o=(s==null?void 0:s.printerId)??null,a=r||o?null:(s==null?void 0:s.roomId)??null;t.style.cursor=s?"pointer":"",(a!==this.hoverRoomId||r!==this.hoverTankId||o!==this.hoverPrinterId)&&(this.hoverRoomId=a,this.hoverTankId=r,this.hoverPrinterId=o,this.applyHighlight())}),t.addEventListener("pointerleave",()=>{(this.hoverRoomId||this.hoverTankId||this.hoverPrinterId)&&(this.hoverRoomId=null,this.hoverTankId=null,this.hoverPrinterId=null,this.applyHighlight())})}pick(t){const e=this.renderer.domElement.getBoundingClientRect(),i=new xt((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1);this.raycaster.setFromCamera(i,this.camera);const s=h=>{var u;return((u=this.floors.get(h.floorId))==null?void 0:u.userData.state)==="full"},r=[...[...this.tanks.values()].filter(s).map(h=>({mesh:h.mesh,size:ai})),...[...this.printers.values()].filter(s).map(h=>({mesh:h.mesh,size:li}))],o=this.raycaster.ray;let a=null;for(const{mesh:h,size:u}of r){const d=h.getWorldPosition(new O),g=o.distanceToPoint(d),_=Math.max(u*.7,o.origin.distanceTo(d)*.012);g<_&&(!a||g<a.dist)&&(a={dist:g,mesh:h})}if(a)return a.mesh.userData;const l=[...this.rooms.values()].filter(s).map(h=>h.mesh),c=this.raycaster.intersectObjects(l,!1)[0];return c?c.object.userData:null}flyTo(t,e,i=!0){if(!i){this.camera.position.copy(t),this.controls.target.copy(e),this.anim=null;return}this.anim={p0:this.camera.position.clone(),p1:t,t0:this.controls.target.clone(),t1:e,start:performance.now(),duration:750}}resize(){const t=this.container.clientWidth,e=this.container.clientHeight;!t||!e||(this.renderer.setSize(t,e),this.labelRenderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix())}tick(){if(this.raf=requestAnimationFrame(this.tick),this.anim){const t=Math.min(1,(performance.now()-this.anim.start)/this.anim.duration),e=k0(t);this.camera.position.lerpVectors(this.anim.p0,this.anim.p1,e),this.controls.target.lerpVectors(this.anim.t0,this.anim.t1,e),t>=1&&(this.anim=null)}this.controls.update(),this.renderer.render(this.scene,this.camera),this.labelRenderer.render(this.scene,this.camera)}}const hs=1,G0=["nw","n","ne","e","se","s","sw","w"],On=.1,xl=96,V0=2400,W0=.15;function $0(n){var Mt;n.innerHTML=`
    <div class="editor-layout">
      <div class="toolbar">
        <div class="tb-group">
          <span class="tb-label">Etage</span>
          <select id="e-floor" class="input sm"></select>
          <button class="btn sm" data-act="floor-add" title="Neues Obergeschoss oben anlegen">+ OG</button>
          <button class="btn sm" data-act="floor-add-below" title="Neues Untergeschoss unten anlegen">+ UG</button>
          <button class="btn sm" data-act="floor-dup" title="Aktuelle Etage darüber kopieren">Duplizieren</button>
          <button class="btn sm" data-act="floor-up" title="Etage nach oben verschieben">↑</button>
          <button class="btn sm" data-act="floor-down" title="Etage nach unten verschieben">↓</button>
          <button class="btn sm danger" data-act="floor-del" title="Etage löschen">Löschen</button>
        </div>
        <div class="tb-sep"></div>
        <div class="tb-group">
          <div class="seg">
            <button class="btn sm" data-act="tool-select" data-tool="select" title="Auswählen / Verschieben (V)">Auswählen</button>
            <button class="btn sm" data-act="tool-draw" data-tool="draw" title="Raum aufziehen (R)">Raum zeichnen</button>
            <button class="btn sm" data-act="tool-poly" data-tool="poly" title="Raum mit beliebigem Umriss Punkt für Punkt zeichnen (F)">Polygon-Raum</button>
            <button class="btn sm" data-act="tool-stairs" data-tool="stairs" title="Treppenhaus aufziehen (S)">Treppenhaus</button>
            <button class="btn sm" data-act="tool-door" data-tool="door" title="Tür auf eine Wand setzen (D)">Tür</button>
            <button class="btn sm" data-act="tool-glass" data-tool="glass" title="Glaswand entlang einer Wand ziehen (G)">Glaswand</button>
            <button class="btn sm" data-act="tool-wall" data-tool="wall" title="Freie Wand ziehen (W)">Wand</button>
            <button class="btn sm" data-act="tool-tank" data-tool="tank" title="Bodentank in einen Raum setzen (T)">Bodentank setzen</button>
            <button class="btn sm" data-act="tool-printer" data-tool="printer" title="Drucker in einen Raum oder Flur setzen (P)">Drucker setzen</button>
          </div>
          <button class="btn sm" data-act="room-add" title="Raum in der Mitte einfügen">+ Raum</button>
          <span class="tb-label">Raster</span>
          <select id="e-snap" class="input sm">
            <option value="0.1">0,1 m</option>
            <option value="0.25">0,25 m</option>
            <option value="0.5" selected>0,5 m</option>
            <option value="1">1 m</option>
          </select>
        </div>
        <div class="tb-sep"></div>
        <div class="tb-group">
          <button class="btn sm" data-act="undo" title="Rückgängig (Strg+Z)">↶</button>
          <button class="btn sm" data-act="redo" title="Wiederholen (Strg+Y)">↷</button>
        </div>
        <div class="tb-group tb-right">
          <button class="btn sm" data-act="import" title="Exportierte Gebäudedatei in den Entwurf laden">Import</button>
          <button class="btn sm btn-primary" data-act="export" title="Entwurf als Datei speichern – auf dem Server als Standard-Datei ablegen, damit alle ihn sehen">Export</button>
          <button class="btn sm" data-act="standard" title="Entwurf verwerfen und den veröffentlichten Standard laden">Standard laden</button>
          <button class="btn sm" data-act="reset" title="Testgebäude wiederherstellen">Beispiel laden</button>
          <input type="file" id="e-file" accept="application/json,.json" hidden>
        </div>
      </div>
      <div class="editor-main">
        <div class="plan-wrap" id="e-plan-wrap">
          <svg id="e-plan" xmlns="http://www.w3.org/2000/svg">
            <g id="e-plan-bg"></g>
            <image id="e-plan-underlay" class="underlay" preserveAspectRatio="none" style="display:none"/>
            <g id="e-plan-fg"></g>
          </svg>
          <input type="file" id="e-underlay-file" accept="image/*" hidden>
          <div class="plan-hud">
            <button class="icon-btn" data-act="zoom-in" title="Hineinzoomen">+</button>
            <button class="icon-btn" data-act="zoom-out" title="Herauszoomen">−</button>
            <button class="icon-btn" data-act="zoom-fit" title="Einpassen">⤢</button>
            <span class="hud-coords" id="e-coords"></span>
          </div>
          <div class="plan-help" id="e-help"></div>
        </div>
        <div class="preview-wrap">
          <div class="view3d" id="e-3d"></div>
          <div class="preview-badge">3D-Vorschau</div>
        </div>
        <aside class="sidebar sidebar-right">
          <div id="e-props"></div>
          <section class="panel">
            <h2 class="panel-title">Räume dieser Etage</h2>
            <div class="room-list" id="e-rooms"></div>
          </section>
        </aside>
      </div>
      <div class="modal-backdrop" id="e-modal" hidden></div>
    </div>`;const t=f=>n.querySelector(f),e=t("#e-plan"),i=t("#e-plan-wrap"),s=t("#e-plan-bg"),r=t("#e-plan-fg"),o=t("#e-plan-underlay");let a=null;const l={floorId:wt.building.groundFloorId??((Mt=wt.building.floors[0])==null?void 0:Mt.id),selectedRoomId:null,selectedTankId:null,selectedPrinterId:null,selectedOpeningId:null,selectedWallId:null,tool:"select",snap:.5,tankModal:!1},c={cx:15,cz:6,scale:30};let h=null,u=null,d=null,g=null,_=null,v=null,m={index:-1,time:0},p=null,P={id:null,time:0};const w=new H0(t("#e-3d"),{background:"#f2f4f7",onRoomClick:(f,x)=>{f&&x===l.floorId&&Ue(f)},onTankClick:(f,x,S)=>{S===l.floorId&&(Ue(x,f),Tt())},onPrinterClick:(f,x,S)=>{S===l.floorId&&Ue(x,null,f)}}),M=()=>wt.building.floors,F=()=>M().find(f=>f.id===l.floorId)??M()[0],T=()=>{var f;return((f=F())==null?void 0:f.rooms.find(x=>x.id===l.selectedRoomId))??null},I=()=>{var f;return((f=T())==null?void 0:f.tanks.find(x=>x.id===l.selectedTankId))??null},N=(f,x)=>{var S;return(S=f.floors.find(R=>R.id===l.floorId))==null?void 0:S.rooms.find(R=>R.id===x)},A=f=>{var x;return(x=N(f,l.selectedRoomId))==null?void 0:x.tanks.find(S=>S.id===l.selectedTankId)},b=()=>{var f;return((f=T())==null?void 0:f.printers.find(x=>x.id===l.selectedPrinterId))??null},U=f=>{var x;return(x=N(f,l.selectedRoomId))==null?void 0:x.printers.find(S=>S.id===l.selectedPrinterId)},J=()=>{var f;return((f=F())==null?void 0:f.openings)??[]},$=()=>J().find(f=>f.id===l.selectedOpeningId)??null,Z=f=>{var x,S;return(S=(x=f.floors.find(R=>R.id===l.floorId))==null?void 0:x.openings)==null?void 0:S.find(R=>R.id===l.selectedOpeningId)},rt=()=>{var f;return((f=F())==null?void 0:f.walls)??[]},X=()=>rt().find(f=>f.id===l.selectedWallId)??null,ht=f=>{var x,S;return(S=(x=f.floors.find(R=>R.id===l.floorId))==null?void 0:x.walls)==null?void 0:S.find(R=>R.id===l.selectedWallId)},j=f=>ju(F().rooms,[f.x,f.z],Math.max(.25,14/c.scale),rt()),st=(f,x,S=l.snap)=>x?Math.round(f*100)/100:Math.round(f/S)*S,at=f=>Math.round(f*100)/100;function Ct(f,x,S=null,R=!1,C=null){let z=[st(f.x,x),st(f.z,x)];if(!x){const k=10/c.scale,W=[...F().rooms.filter(ot=>ot.id!==C).flatMap(ot=>mn(ot)),...rt().flatMap(ot=>[[ot.x1,ot.z1],[ot.x2,ot.z2]])];let et=k;for(const ot of W){const Et=Math.hypot(ot[0]-f.x,ot[1]-f.z);Et<et&&(et=Et,z=[he(ot[0]),he(ot[1])])}}return S&&R&&(Math.abs(z[0]-S[0])>=Math.abs(z[1]-S[1])?z[1]=S[1]:z[0]=S[0]),z}function Kt(f){const x=e.getBoundingClientRect();return{x:c.cx+(f.clientX-x.left-x.width/2)/c.scale,z:c.cz+(f.clientY-x.top-x.height/2)/c.scale}}function de(f){const x=F().rooms.filter(S=>mu(S,[f.x,f.z]));return x.find(S=>S.type!=="corridor")??x[0]??null}function it(){const f=F();let x=f&&Mo(f);if(!x){const z=M().map(Mo).filter(Boolean);x=z.length?{minX:Math.min(...z.map(k=>k.minX)),minZ:Math.min(...z.map(k=>k.minZ)),maxX:Math.max(...z.map(k=>k.maxX)),maxZ:Math.max(...z.map(k=>k.maxZ))}:{minX:0,minZ:0,maxX:20,maxZ:12}}const S=e.clientWidth||600,R=e.clientHeight||400,C=3;c.scale=bn(Math.min(S/(x.maxX-x.minX+C*2),R/(x.maxZ-x.minZ+C*2)),4,200),c.cx=(x.minX+x.maxX)/2,c.cz=(x.minZ+x.maxZ)/2}function _t(f,x,S){const R=e.getBoundingClientRect(),C=(x??R.left+R.width/2)-R.left-R.width/2,z=(S??R.top+R.height/2)-R.top-R.height/2,k=c.cx+C/c.scale,W=c.cz+z/c.scale;c.scale=bn(c.scale*f,4,300),c.cx=k-C/c.scale,c.cz=W-z/c.scale,L()}function Bt(f,x){const S=(R,C)=>{const[z,k]=gs(f,ys(x,C));R.x=at(z-f.x),R.z=at(k-f.z)};f.tanks.forEach((R,C)=>S(R,x.tanks[C])),f.printers.forEach((R,C)=>S(R,x.printers[C])),wn(f)}function St(f){const x=T();if(!x||x.points.length<=3)return;const S=En(x);if(S.splice(f,1),!Ks(S))return;const R={...x,tanks:x.tanks.map(C=>({...C})),printers:x.printers.map(C=>({...C}))};wt.mutate(C=>{const z=N(C,l.selectedRoomId);Tl(z,S),Bt(z,R)})}function Gt(f,x){const[S,R]=Pi([-f.width/2,-f.depth/2],[0,0],ye(f));f.x=he(x[0]-S-f.width/2),f.z=he(x[1]-R-f.depth/2)}const jt=f=>{const x=ye(f);if(!x)return"";const[S,R]=Ri(f);return`transform="rotate(${x} ${S} ${R})"`};function Xt(f){const x=f.cutCorner==="ne"||f.cutCorner==="se",S=f.cutCorner==="nw"||f.cutCorner==="ne",R=[x?f.x+f.width:f.x,S?f.z:f.z+f.depth],C=[R[0]+(x?-f.cutW:f.cutW),R[1]+(S?f.cutD:-f.cutD)];return{corner:R,point:C,east:x,north:S}}const ie=f=>`${Xe(f,2)} m²`,lt=f=>f.rooms.reduce((x,S)=>x+vs(S),0);function vt(f){const x=new Set;for(let S=0;S<f.length;S++)for(let R=S+1;R<f.length;R++)_u(f[S],f[R])&&x.add(f[S].id).add(f[R].id);return x}function L(){const f=F(),x=e.clientWidth,S=e.clientHeight;if(!f||!x||!S)return;const R=c.scale,C=1/R,z=c.cx-x/2/R,k=c.cz-S/2/R;e.setAttribute("viewBox",`${z} ${k} ${x/R} ${S/R}`);const W=R<10?5:1,et=R<10?25:5,ot=[],Et=`
      <defs>
        <pattern id="g-minor" width="${W}" height="${W}" patternUnits="userSpaceOnUse">
          <path d="M ${W} 0 L 0 0 0 ${W}" fill="none" stroke="#e4e8ee" stroke-width="${C}"/>
        </pattern>
        <pattern id="g-major" width="${et}" height="${et}" patternUnits="userSpaceOnUse">
          <path d="M ${et} 0 L 0 0 0 ${et}" fill="none" stroke="#cdd3dc" stroke-width="${C}"/>
        </pattern>
      </defs>
      <rect x="${z}" y="${k}" width="${x/R}" height="${S/R}" fill="url(#g-minor)"/>
      <rect x="${z}" y="${k}" width="${x/R}" height="${S/R}" fill="url(#g-major)"/>
      <path d="M ${z} 0 H ${z+x/R} M 0 ${k} V ${k+S/R}" stroke="#aeb7c3" stroke-width="${C}"/>`,yt=M().indexOf(f),ut=M()[yt-1];if(ut)for(const gt of ut.rooms)ot.push(`<polygon class="ref-room" points="${mn(gt).join(" ")}"
            stroke-width="${C}" stroke-dasharray="${4*C} ${3*C}"/>`);const pt=yt<M().length-1,Nt=vt(f.rooms),ce=[...f.rooms].sort((gt,Zt)=>(gt.type==="corridor"?-1:0)-(Zt.type==="corridor"?-1:0));for(const gt of ce){const Zt=gt.id===l.selectedRoomId,Yt=gt.width*R>44&&gt.depth*R>26,[oe,Ae]=Fe(gt)==="rect"?Bn(gt,[gt.x+gt.width/2,gt.z+(ye(gt)?gt.depth/2-7*C:16*C)]):bl(gt).map((pn,Sn)=>pn-(Sn?7*C:0));ot.push(`
        <g class="room${Zt?" selected":""}${Nt.has(gt.id)?" overlap":""}" data-room="${gt.id}">
          <polygon class="room-shape" points="${mn(gt).join(" ")}"
            fill="${Zs(gt)}" fill-opacity="${gt.type==="corridor"?.35:.55}"
            stroke-width="${(Zt?2.5:1.25)*C}" stroke-linejoin="round"/>
          ${gt.type==="stairs"?`<g ${jt(gt)}>${pt?zt(gt,f.height,C):""}${qt(gt,f.height,C)}</g>`:""}
          ${Yt?`<text x="${oe}" y="${Ae}" font-size="${13*C}" class="room-name">${se(gt.name)}</text>
                 <text x="${oe}" y="${Ae+15*C}" font-size="${11*C}" class="room-area">${ie(vs(gt))}</text>`:""}
        </g>`)}for(const gt of rt())ot.push(Wt(gt,C));_&&ot.push(Wt({..._,id:""},C,!0));const me=[...J()].sort((gt,Zt)=>(gt.type==="glass"?0:1)-(Zt.type==="glass"?0:1));for(const gt of me)ot.push(Ht(gt,f,C));g&&ot.push(Ht({...g,id:"",type:"glass"},f,C,!0));const Se=Math.max(ai,12*C),ee=R>18;for(const gt of f.rooms)for(const Zt of gt.tanks){const[Yt,oe]=ys(gt,Zt),Ae=Zt.id===l.selectedTankId,pn=ye(gt)?`transform="rotate(${ye(gt)} ${Yt} ${oe})"`:"";ot.push(`
          <g class="tank${Ae?" selected":""}" data-tank="${Zt.id}" data-tank-room="${gt.id}">
            <rect x="${Yt-Se/2}" y="${oe-Se/2}" width="${Se}" height="${Se}" rx="${2*C}"
              stroke-width="${(Ae?2:1.25)*C}" ${pn}/>
            <path d="M ${Yt-Se/4} ${oe} H ${Yt+Se/4} M ${Yt} ${oe-Se/4} V ${oe+Se/4}" stroke-width="${1.25*C}" ${pn}/>
            ${ee?`<text x="${Yt}" y="${oe+Se/2+9*C}" font-size="${10*C}">${se(Zt.name)} · ${Zt.ports.length}</text>`:""}
          </g>`)}const Ft=Math.max(li,16*C),Vt=Math.max(Ss,13*C);for(const gt of f.rooms)for(const Zt of gt.printers){const[Yt,oe]=ys(gt,Zt),Ae=Zt.id===l.selectedPrinterId,pn=ye(gt)?`transform="rotate(${ye(gt)} ${Yt} ${oe})"`:"";ot.push(`
          <g class="printer${Ae?" selected":""}" data-printer="${Zt.id}" data-printer-room="${gt.id}">
            <rect x="${Yt-Ft/2}" y="${oe-Vt/2}" width="${Ft}" height="${Vt}" rx="${3*C}"
              stroke-width="${(Ae?2:1.25)*C}" ${pn}/>
            <rect class="paper" x="${Yt-Ft*.28}" y="${oe-Vt*.18}" width="${Ft*.56}" height="${Vt*.36}" ${pn}/>
            ${ee?`<text x="${Yt}" y="${oe+Vt/2+9*C}" font-size="${10*C}">${se(Zt.name)}</text>`:""}
          </g>`)}const dt=T();if(dt&&!l.selectedTankId&&!l.selectedPrinterId&&l.tool==="select"){const gt=9*C,Zt={nw:[dt.x,dt.z],n:[dt.x+dt.width/2,dt.z],ne:[dt.x+dt.width,dt.z],e:[dt.x+dt.width,dt.z+dt.depth/2],se:[dt.x+dt.width,dt.z+dt.depth],s:[dt.x+dt.width/2,dt.z+dt.depth],sw:[dt.x,dt.z+dt.depth],w:[dt.x,dt.z+dt.depth/2]},Yt=dt.x+dt.width/2,oe=dt.z-26*C;if(ot.push(`<g ${jt(dt)}>
        <path class="rot-guide" d="M ${Yt} ${dt.z} V ${oe}" stroke-width="${C}"/>
        <circle class="handle handle-rot" data-handle="rotate" cx="${Yt}" cy="${oe}" r="${5.5*C}" stroke-width="${1.5*C}">
          <title>Drehen (Raster 15°, Alt = frei)</title></circle>
        <text class="dim" x="${dt.x+dt.width/2}" y="${dt.z-10*C}" font-size="${11*C}">${Xe(dt.width,2)} m</text>
        <text class="dim" x="${dt.x-10*C}" y="${dt.z+dt.depth/2}" font-size="${11*C}"
          transform="rotate(-90 ${dt.x-10*C} ${dt.z+dt.depth/2})">${Xe(dt.depth,2)} m</text>`),Fe(dt)==="poly")ot.push(ft(dt,C));else for(const Ae of G0){const[pn,Sn]=Zt[Ae];ot.push(`<rect class="handle h-${Ae}" data-handle="${Ae}" x="${pn-gt/2}" y="${Sn-gt/2}"
              width="${gt}" height="${gt}" stroke-width="${1.5*C}"/>`)}if(Fe(dt)==="l"||Fe(dt)==="chamfer"){const{corner:Ae,point:pn}=Xt(dt),[Sn,fs]=pn,X0=Fe(dt)==="chamfer"?`<path class="cut-guide" d="M ${Sn} ${Ae[1]} L ${Sn} ${fs} L ${Ae[0]} ${fs}"
                stroke-width="${C}" stroke-dasharray="${4*C} ${3*C}"/>`:"";ot.push(`
          ${X0}
          <path class="handle handle-cut" data-handle="cut"
            d="M ${Sn} ${fs-gt*.75} L ${Sn+gt*.75} ${fs} L ${Sn} ${fs+gt*.75} L ${Sn-gt*.75} ${fs} Z"
            stroke-width="${1.5*C}"/>`)}ye(dt)&&ot.push(`<text class="dim" x="${Yt}" y="${oe-13*C}" font-size="${11*C}">${Xe(ye(dt),1)}°</text>`),ot.push("</g>")}if(v&&ot.push(Ut(C)),u){const{x:gt,z:Zt,width:Yt,depth:oe}=u;ot.push(`
        <rect class="draft" x="${gt}" y="${Zt}" width="${Yt}" height="${oe}"
          stroke-width="${2*C}" stroke-dasharray="${6*C} ${4*C}"/>
        <text class="dim" x="${gt+Yt/2}" y="${Zt+oe/2}" font-size="${12*C}">
          ${Xe(Yt,2)} × ${Xe(oe,2)} m</text>`)}if(d){const[gt,Zt]=d.a,[Yt,oe]=d.b??d.hover;ot.push(`
        <g class="calib">
          <path d="M ${gt} ${Zt} L ${Yt} ${oe}" stroke-width="${2*C}"/>
          <circle cx="${gt}" cy="${Zt}" r="${4*C}" stroke-width="${1.5*C}"/>
          <circle cx="${Yt}" cy="${oe}" r="${4*C}" stroke-width="${1.5*C}"/>
          <text class="dim" x="${(gt+Yt)/2}" y="${(Zt+oe)/2-12*C}" font-size="${12*C}">${Xe(Math.hypot(Yt-gt,oe-Zt),2)} m</text>
        </g>`)}s.innerHTML=Et,r.innerHTML=ot.join(""),Rt(f),i.dataset.tool=l.tool}function Ht(f,x,S,R=!1){const C=f.id&&f.id===l.selectedOpeningId,z=!R&&!cr(f,x),k=`M ${f.x1} ${f.z1} L ${f.x2} ${f.z2}`;let W;if(f.type==="door"){const ot=ws(f),[Et,yt]=lr(f),ut=f.swing&2?-1:1,pt=f.swing&1,[Nt,ce]=pt?[f.x2,f.z2]:[f.x1,f.z1],[me,Se]=pt?[f.x1,f.z1]:[f.x2,f.z2],ee=Nt-yt*ut*ot,Ft=ce+Et*ut*ot,Vt=(ee-Nt)*(Se-ce)-(Ft-ce)*(me-Nt);W=`
        <path class="op-gap" d="${k}" stroke-width="${5*S}"/>
        <path class="op-leaf" d="M ${Nt} ${ce} L ${ee} ${Ft}" stroke-width="${2*S}"/>
        <path class="op-swing" d="M ${ee} ${Ft} A ${ot} ${ot} 0 0 ${Vt>0?1:0} ${me} ${Se}"
          stroke-width="${S}" stroke-dasharray="${3*S} ${2*S}"/>`}else W=`
        <path class="op-gap" d="${k}" stroke-width="${5*S}"/>
        <path class="op-glass" d="${k}" stroke-width="${3.5*S}"/>`;const et=C?[["a",f.x1,f.z1],["b",f.x2,f.z2]].map(([ot,Et,yt])=>`<circle class="handle op-handle" data-ohandle="${ot}" cx="${Et}" cy="${yt}" r="${4.5*S}" stroke-width="${1.5*S}"/>`).join(""):"";return`
      <g class="opening op-${f.type}${C?" selected":""}${z?" detached":""}${R?" draft-op":""}"
        ${f.id?`data-opening="${f.id}"`:""}>
        ${W}
        <path class="op-hit" d="${k}" stroke-width="${14*S}"/>
        ${et}
      </g>`}function ft(f,x){const S=En(f),R=5*x,C=S.map((k,W)=>{const et=S[(W+1)%S.length],[ot,Et]=[(k[0]+et[0])/2,(k[1]+et[1])/2];return Math.hypot(et[0]-k[0],et[1]-k[1])*c.scale<30?"":`<g class="handle-add" data-vadd="${W}">
            <circle cx="${ot}" cy="${Et}" r="${4*x}" stroke-width="${1.25*x}"/>
            <path d="M ${ot-2*x} ${Et} H ${ot+2*x} M ${ot} ${Et-2*x} V ${Et+2*x}" stroke-width="${1.25*x}"/>
            <title>Ziehen = neue Ecke</title></g>`}).join(""),z=S.map(([k,W],et)=>`<circle class="handle handle-vertex" data-vertex="${et}" cx="${k}" cy="${W}" r="${R}" stroke-width="${1.5*x}">
            <title>Ziehen = Ecke verschieben · Doppelklick = Ecke entfernen</title></circle>`).join("");return C+z}function Ut(f){const x=[...v.points,...v.hover?[v.hover]:[]],[S,R]=v.points[0],C=v.points.at(-1),z=v.hover,k=z&&Math.hypot(z[0]-C[0],z[1]-C[1]);return`
      <g class="draft-poly">
        ${x.length>=3?`<polygon class="draft" points="${x.join(" ")}" stroke="none"/>`:""}
        <polyline class="draft-line" points="${x.join(" ")}" stroke-width="${2*f}" stroke-dasharray="${6*f} ${4*f}"/>
        ${v.points.map(([W,et])=>`<circle class="draft-pt" cx="${W}" cy="${et}" r="${3*f}"/>`).join("")}
        <circle class="draft-start" cx="${S}" cy="${R}" r="${7*f}" stroke-width="${1.5*f}"/>
        ${k>.05?`<text class="dim" x="${(z[0]+C[0])/2}" y="${(z[1]+C[1])/2-12*f}" font-size="${11*f}">${Xe(k,2)} m</text>`:""}
      </g>`}function bt(){if(!v)return;const f=wl(v.points);if(!(f.length<3)){if(!Ks(f)){alert("Der Umriss überschneidet sich selbst. Bitte die letzten Punkte mit Rücktaste entfernen und anders zeichnen.");return}v=null,l.tool="select",si(Js(f)),$t()}}function Wt(f,x,S=!1){const R=f.id&&f.id===l.selectedWallId,C=`M ${f.x1} ${f.z1} L ${f.x2} ${f.z2}`,z=R?[["a",f.x1,f.z1],["b",f.x2,f.z2]].map(([et,ot,Et])=>`<circle class="handle fw-handle" data-whandle="${et}" cx="${ot}" cy="${Et}" r="${4.5*x}" stroke-width="${1.5*x}"/>`).join(""):"",k=_o(f),W=R||S?`<text class="dim" x="${(f.x1+f.x2)/2}" y="${(f.z1+f.z2)/2-12*x}" font-size="${11*x}">${Xe(k,2)} m</text>`:"";return`
      <g class="fwall${R?" selected":""}${S?" draft-op":""}" ${f.id?`data-wall="${f.id}"`:""}>
        <path class="fw-body" d="${C}" stroke-width="${Math.max(kn,3*x)}"/>
        <path class="fw-hit" d="${C}" stroke-width="${14*x}"/>
        ${z}
        ${W}
      </g>`}function Lt(f){const x=zl(f);wt.mutate(S=>{const R=S.floors.find(C=>C.id===l.floorId);(R.walls??(R.walls=[])).push(x)}),D(x.id)}function D(f){l.selectedWallId=f,l.selectedOpeningId=null,l.selectedRoomId=null,l.selectedTankId=null,l.selectedPrinterId=null,w.setSelectedRoom(null),w.setSelectedTank(null),w.setSelectedPrinter(null),L(),nt(),ve()}const y=(f,x)=>(f.openings??[]).filter(S=>To(S,x));function V(f,x){const S=j(f);if(!S)return;const R=Math.min(Zu,S.len),C=st(S.t,x,On),z=bn(C-R/2,0,S.len-R),[k,W]=Ci(S,z),[et,ot]=Ci(S,z+R);tt({type:"door",x1:he(k),z1:he(W),x2:he(et),z2:he(ot)})}function tt(f){const x=ql(f);wt.mutate(S=>{const R=S.floors.find(C=>C.id===l.floorId);(R.openings??(R.openings=[])).push(x)}),ct(x.id)}function ct(f){l.selectedOpeningId=f,l.selectedWallId=null,l.selectedRoomId=null,l.selectedTankId=null,l.selectedPrinterId=null,w.setSelectedRoom(null),w.setSelectedTank(null),w.setSelectedPrinter(null),L(),nt(),ve()}const Q=(f,x)=>(f.openings??[]).filter(S=>wo(S,x));function kt(f,x,S,R){var C;for(const z of x){const k=(C=f.openings)==null?void 0:C.find(yt=>yt.id===z.id);if(!k)continue;const[W,et]=Pi([z.x1,z.z1],S,R),[ot,Et]=Pi([z.x2,z.z2],S,R);Object.assign(k,{x1:he(W),z1:he(et),x2:he(ot),z2:he(Et)})}}function Rt(f){const x=f.underlay;o.style.display=x!=null&&x.visible?"":"none",x!=null&&x.visible&&(a!==x.src&&(o.setAttribute("href",x.src),a=x.src),o.setAttribute("x",x.x),o.setAttribute("y",x.z),o.setAttribute("width",x.width),o.setAttribute("height",x.width*x.ratio),o.setAttribute("opacity",x.opacity))}async function It(f){const x=URL.createObjectURL(f);try{const S=new Image;S.src=x,await S.decode();const R=S.naturalWidth||1600,C=S.naturalHeight||1200,z=Math.min(1,V0/Math.max(R,C)),k=document.createElement("canvas");k.width=Math.max(1,Math.round(R*z)),k.height=Math.max(1,Math.round(C*z));const W=k.getContext("2d");W.fillStyle="#fff",W.fillRect(0,0,k.width,k.height),W.drawImage(S,0,0,k.width,k.height);let et=k.toDataURL("image/webp",.7);return et.startsWith("data:image/webp")||(et=k.toDataURL("image/jpeg",.75)),{src:et,ratio:k.height/k.width}}finally{URL.revokeObjectURL(x)}}async function re(f){let x;try{x=await It(f)}catch{alert("Das Bild konnte nicht gelesen werden. Unterstützt werden Bilddateien wie PNG, JPG, WebP oder SVG – PDF-Pläne bitte vorher als Bild exportieren.");return}const S=F().underlay;let R=S&&{x:S.x,z:S.z,width:S.width};if(!R){const C=(e.clientWidth||600)/c.scale,z=(e.clientHeight||400)/c.scale,k=at(.8*Math.min(C,z/x.ratio));R={x:at(c.cx-k/2),z:at(c.cz-k*x.ratio/2),width:k}}wt.mutate(C=>{C.floors.find(z=>z.id===l.floorId).underlay={...x,...R,opacity:(S==null?void 0:S.opacity)??W0,visible:!0}})}function mt(){const[f,x]=d.a,[S,R]=d.b,C=Math.hypot(S-f,R-x);L();const z=C>.05?prompt(`Wie lang ist diese Strecke in Wirklichkeit (in m)?
Im Moment: ${Xe(C,2)} m`,Xe(C,2)):null;d=null;const k=parseFloat(String(z??"").replace(",","."));if(!(k>0))return L();const W=k/C,et=ot=>Math.round(ot*1e3)/1e3;wt.mutate(ot=>{const Et=ot.floors.find(yt=>yt.id===l.floorId).underlay;Et.x=et(f-(f-Et.x)*W),Et.z=et(x-(x-Et.z)*W),Et.width=et(Et.width*W)}),pe("select")}function zt(f,x,S){const{steps:R,landings:C,path:z}=Ms(f,x),k=[...R,...C].map(ee=>`<rect x="${ee.x}" y="${ee.z}" width="${ee.w}" height="${ee.d}"/>`).join(""),[W,et]=z.at(-1),[ot,Et]=z.at(-2),yt=Math.hypot(W-ot,et-Et)||1,[ut,pt]=[(W-ot)/yt,(et-Et)/yt],Nt=Math.min(.35,yt/2),ce=`M ${W-ut*Nt-pt*Nt*.6} ${et-pt*Nt+ut*Nt*.6} L ${W} ${et}
      L ${W-ut*Nt+pt*Nt*.6} ${et-pt*Nt-ut*Nt*.6}`,[me,Se]=z[0];return`
      <g class="stair" stroke-width="${S}">
        ${k}
        <circle cx="${me}" cy="${Se}" r="${Math.max(.08,3*S)}"/>
        <path class="stair-arrow" d="M ${z.map(ee=>ee.join(" ")).join(" L ")} ${ce}" stroke-width="${1.5*S}"/>
      </g>`}function qt(f,x,S){const R=Ms(f,x).elevator;if(!R)return"";const{x:C,z,w:k,d:W}=R.shaft,et=R.walls.map(Et=>`<rect x="${Et.x}" y="${Et.z}" width="${Et.w}" height="${Et.d}"/>`).join(""),ot=R.door;return`
      <g class="lift" stroke-width="${S}">
        <rect class="lift-shaft" x="${C}" y="${z}" width="${k}" height="${W}"/>
        <path class="lift-cross" d="M ${C} ${z} L ${C+k} ${z+W} M ${C+k} ${z} L ${C} ${z+W}"/>
        <g class="lift-walls">${et}</g>
        <rect class="lift-door" x="${ot.x}" y="${ot.z}" width="${ot.w}" height="${ot.d}"/>
        ${k*c.scale>40?`<text x="${C+k/2}" y="${z+W/2}" font-size="${10*S}">Aufzug</text>`:""}
      </g>`}function $t(){t("#e-floor").innerHTML=[...M()].reverse().map(x=>`<option value="${x.id}" ${x.id===l.floorId?"selected":""}>${se(x.name)}</option>`).join("");const f=M().findIndex(x=>x.id===l.floorId);n.querySelector('[data-act="floor-del"]').disabled=M().length<=1,n.querySelector('[data-act="floor-up"]').disabled=f>=M().length-1,n.querySelector('[data-act="floor-down"]').disabled=f<=0,n.querySelector('[data-act="undo"]').disabled=!wt.canUndo,n.querySelector('[data-act="redo"]').disabled=!wt.canRedo,n.querySelectorAll("[data-tool]").forEach(x=>x.classList.toggle("active",x.dataset.tool===l.tool)),t("#e-help").textContent={draw:"Raum zeichnen: Rechteck mit gedrückter Maustaste aufziehen · Esc zum Beenden",stairs:"Treppenhaus zeichnen: Rechteck aufziehen · Form und Laufrichtung rechts einstellen · Esc zum Beenden",tank:"Bodentank setzen: in einen Raum klicken · Esc zum Beenden",door:"Tür setzen: auf eine Wand klicken (auch zwischen zwei Räumen) · Alt = ohne Raster · Esc zum Beenden",glass:"Glaswand: an einer Wand entlang ziehen (Klick = 2 m) · Alt = ohne Raster · Esc zum Beenden",poly:"Polygon-Raum: Ecke für Ecke klicken · auf den Startpunkt klicken, Doppelklick oder Enter = fertig · Rücktaste = letzte Ecke weg · Shift = waagerecht/senkrecht · Alt = ohne Raster · Esc = abbrechen",wall:"Wand: von Punkt zu Punkt ziehen · fängt Raumecken und Wandenden · Shift = waagerecht/senkrecht · Alt = ohne Raster · Esc zum Beenden",printer:"Drucker setzen: in einen Raum oder Flur klicken · Esc zum Beenden",calibrate:"Maßstab setzen: Anfang und Ende einer bekannten Strecke im Hintergrundbild anklicken, dann die echte Länge eingeben · Esc zum Beenden",underlay:"Hintergrundbild verschieben: im Grundriss ziehen · Esc zum Beenden",select:"Klicken = auswählen · Ziehen = verschieben · Griffe = Größe ändern · Kreis = drehen · Raute = Aussparung/Schräge · Doppelklick auf Bodentank = Ports bearbeiten · P = Drucker setzen · Alt = ohne Raster"}[l.tool]}function Ot(f){const x=f.ports.filter(S=>cu(S)).length;return`
      <section class="panel panel-tank">
        <h2 class="panel-title">Bodentank</h2>
        <div class="tank-summary">
          <span class="tank-icon-lg"></span>
          <div>
            <div class="tank-summary-name">${se(f.name)}</div>
            <div class="muted">${f.ports.length} Ports · ${x} am Switch</div>
          </div>
        </div>
        <button class="btn btn-block btn-primary" data-act="tank-edit">Ports bearbeiten …</button>
        <div class="btn-row">
          <button class="btn sm" data-act="tank-dup">Duplizieren</button>
          <button class="btn sm danger" data-act="tank-del">Löschen</button>
        </div>
        <span class="hint-text">Tipp: Doppelklick auf den Tank oder Enter öffnet den Editor.</span>
      </section>`}function le(f,x){const S=Object.entries(Xl).map(([R,C])=>`<button class="btn sm${f.type===R?" active":""}" data-act="opening-type" data-type="${R}">${se(C)}</button>`).join("");return`
      <section class="panel">
        <h2 class="panel-title">${se(Xl[f.type])}</h2>
        <div class="field"><span>Art</span><div class="seg seg-fill">${S}</div></div>
        <label class="field"><span>Breite (m)</span>
          <input class="input" type="number" step="0.1" min="${bs}" data-bind="opening:width" value="${at(ws(f))}">
        </label>
        ${f.type==="door"?'<button class="btn sm" data-act="opening-swing" title="Anschlag und Öffnungsrichtung wechseln">Aufschlag drehen</button>':""}
        ${cr(f,x)?'<span class="hint-text">Ziehen = entlang der Wand verschieben · Enden ziehen = Breite ändern</span>':'<span class="field-warn">Liegt auf keiner Wand und wird in 3D nicht dargestellt. Auf eine Wand ziehen oder löschen.</span>'}
        <div class="btn-row">
          <button class="btn sm danger" data-act="opening-del">Löschen</button>
        </div>
      </section>`}function Qt(f){return`
      <section class="panel">
        <h2 class="panel-title">Wand</h2>
        <label class="field"><span>Länge (m)</span>
          <input class="input" type="number" step="0.1" min="${er}" data-bind="wall:length" value="${at(_o(f))}">
        </label>
        <span class="hint-text">Ziehen = verschieben · Enden ziehen = Länge und Richtung ändern · Türen und Glaswände lassen sich daraufsetzen</span>
        <div class="btn-row">
          <button class="btn sm" data-act="wall-dup">Duplizieren</button>
          <button class="btn sm danger" data-act="wall-del">Löschen</button>
        </div>
      </section>`}function xe(f){const x=f.ip&&!Fl(f.ip);return`
      <section class="panel panel-printer">
        <h2 class="panel-title">Drucker</h2>
        <label class="field"><span>Name</span><input class="input" data-bind="printer:name" value="${se(f.name)}"></label>
        <label class="field"><span>IP-Adresse</span>
          <input class="input mono" data-bind="printer:ip" value="${se(f.ip)}" placeholder="z. B. 192.168.10.50" inputmode="decimal" spellcheck="false">
        </label>
        <span class="field-warn" data-out="ip-warn" ${x?"":"hidden"}>Das ist keine gültige IPv4-Adresse.</span>
        <div class="btn-row">
          <button class="btn sm" data-act="printer-dup">Duplizieren</button>
          <button class="btn sm danger" data-act="printer-del">Löschen</button>
        </div>
      </section>`}function B(){var et,ot,Et,yt;const f=t("#e-modal"),x=l.tankModal&&I();if(!x){l.tankModal=!1,f.hidden=!0,f.innerHTML="";return}const S=T(),R=ps((et=x.ports[0])==null?void 0:et.name)??{panel:1,port:1},C=((ot=x.ports.find(ut=>ut.switch))==null?void 0:ot.switch)??"",z=new Set;for(const ut of M())for(const pt of ut.rooms)for(const Nt of pt.tanks)for(const ce of Nt.ports)ce.switch&&z.add(ce.switch);const k=((Et=f.querySelector(".port-table-wrap"))==null?void 0:Et.scrollTop)??0;f.hidden=!1,f.innerHTML=`
      <div class="modal modal-wide" role="dialog" aria-modal="true" aria-labelledby="e-modal-title">
        <div class="modal-head">
          <span class="tank-icon-lg"></span>
          <div>
            <div class="modal-title" id="e-modal-title">Bodentank bearbeiten</div>
            <div class="modal-sub">${se(S.name)} · ${se(F().name)}</div>
          </div>
          <button class="icon-btn" data-act="modal-close" title="Schließen (Esc)">✕</button>
        </div>
        <div class="modal-body">
          <div class="modal-fields">
            <label class="field"><span>Name</span><input class="input" data-bind="tank:name" value="${se(x.name)}"></label>
            <label class="field"><span>Anzahl Ports</span>
              <input class="input" type="number" min="0" max="${xl}" step="1" data-bind="tank:count" value="${x.ports.length}">
            </label>
          </div>

          <div class="bulk-tools">
            <div class="bulk-tool">
              <span class="bulk-title">Patchfeld-Ports fortlaufend benennen</span>
              <div class="bulk-row">
                <span class="prefix">ab P</span>
                <input class="input" type="number" min="1" step="1" id="e-start-panel" value="${R.panel}" title="Patchfeld">
                <span class="prefix">/</span>
                <input class="input" type="number" min="1" max="24" step="1" id="e-start-port" value="${R.port}" title="Port (1–24)">
                <button class="btn sm" data-act="ports-renumber">Übernehmen</button>
              </div>
              <span class="hint-text">Nach Port 24 geht es mit dem nächsten Patchfeld weiter.</span>
            </div>
            <div class="bulk-tool">
              <span class="bulk-title">Switch fortlaufend zuweisen</span>
              <div class="bulk-row">
                <input class="input input-switch" id="e-bulk-switch" list="e-switches" placeholder="Switch, z. B. Switch P1" value="${se(C)}">
                <span class="prefix">ab Port</span>
                <input class="input" id="e-bulk-switch-port" value="${se(((yt=x.ports.find(ut=>ut.switchPort))==null?void 0:yt.switchPort)??"1")}" title="Erster Switch-Port">
                <button class="btn sm" data-act="switch-assign">Übernehmen</button>
              </div>
              <span class="hint-text">Weist allen Ports der Reihe nach Switch-Ports zu. Einzelne Ports kannst du unten ändern.</span>
            </div>
          </div>

          <div class="port-table-wrap">
            ${x.ports.length?`<table class="port-table">
                <thead>
                  <tr><th>#</th><th>Patchfeld-Port</th><th>Switch</th><th>Switch-Port</th><th></th></tr>
                </thead>
                <tbody>
                  ${x.ports.map((ut,pt)=>`
                  <tr>
                    <td class="pt-idx">${pt+1}</td>
                    <td><input class="input sm" data-bind="port:${pt}:name" value="${se(ut.name)}" placeholder="P01/01"></td>
                    <td><input class="input sm" data-bind="port:${pt}:switch" list="e-switches" value="${se(ut.switch)}" placeholder="—"></td>
                    <td><input class="input sm pt-swport" data-bind="port:${pt}:switchPort" value="${se(ut.switchPort)}" placeholder="—"></td>
                    <td><button class="icon-btn sm" data-act="port-del" data-index="${pt}" title="Port entfernen">✕</button></td>
                  </tr>`).join("")}
                </tbody>
              </table>`:'<div class="empty">Keine Ports. Lege über „Anzahl Ports“ oder „+ Port“ welche an.</div>'}
          </div>
          <datalist id="e-switches">${[...z].map(ut=>`<option value="${se(ut)}">`).join("")}</datalist>
        </div>
        <div class="modal-foot">
          <button class="btn sm" data-act="port-add">+ Port</button>
          <button class="btn sm" data-act="tank-dup">Tank duplizieren</button>
          <button class="btn sm danger" data-act="tank-del">Tank löschen</button>
          <button class="btn btn-primary" data-act="modal-close">Fertig</button>
        </div>
      </div>`;const W=f.querySelector(".port-table-wrap");W&&(W.scrollTop=k)}function Tt(){var f;I()&&(l.tankModal=!0,B(),(f=t('#e-modal [data-bind="tank:name"]'))==null||f.focus())}function K(){l.tankModal=!1,B()}function nt(){const f=T(),x=I(),S=b(),R=F(),C=wt.building,z=Object.entries(Ys).map(([W,et])=>`<option value="${W}" ${(f==null?void 0:f.type)===W?"selected":""}>${se(et.label)}</option>`).join(""),k=f?`
      <section class="panel">
        <h2 class="panel-title">Raum</h2>
        <label class="field"><span>Name</span><input class="input" data-bind="room:name" value="${se(f.name)}"></label>
        <label class="field"><span>Typ</span><select class="input" data-bind="room:type">${z}</select></label>
        <div class="field">
          <span>Farbe</span>
          <div class="color-row">
            <input type="color" data-bind="room:color" value="${Zs(f)}">
            ${f.color?'<button class="btn sm" data-act="color-reset">Typfarbe</button>':'<span class="muted">Typfarbe</span>'}
          </div>
        </div>
        ${f.type!=="stairs"?Jt(f):""}
        ${f.type==="stairs"?`<label class="field"><span>Treppenform</span><select class="input" data-bind="room:stairShape">${Object.entries(Cl).map(([W,et])=>`<option value="${W}" ${f.stairShape===W?"selected":""}>${se(et)}</option>`).join("")}</select></label>
        <div class="field">
          <span>Laufrichtung (aufwärts)</span>
          <div class="color-row">
            <select class="input" data-bind="room:stairDir">${Object.entries(Dl).map(([W,et])=>`<option value="${W}" ${f.stairDir===W?"selected":""}>${se(et)}</option>`).join("")}</select>
            <button class="btn sm" data-act="stairs-rotate" title="Um 90° drehen">↻</button>
          </div>
          ${M().indexOf(R)===M().length-1?'<span class="hint-text">Oberste Etage: Hier führt keine Treppe weiter nach oben.</span>':""}
        </div>
        <label class="check"><input type="checkbox" data-bind="room:elevator" ${f.elevator?"checked":""}> Aufzug in der Mitte</label>
        ${f.elevator?Pt(f):""}`:""}
        <label class="field"><span>Nutzer / Team</span><input class="input" data-bind="room:occupant" value="${se(f.occupant)}" placeholder="z. B. Team Vertrieb"></label>
        <label class="field"><span>Beschreibung</span><textarea class="input" rows="2" data-bind="room:description">${se(f.description)}</textarea></label>
        <div class="field-grid">
          <label class="field"><span>X (m)</span><input class="input" type="number" step="0.1" data-bind="room:x" value="${at(f.x)}"></label>
          <label class="field"><span>Z (m)</span><input class="input" type="number" step="0.1" data-bind="room:z" value="${at(f.z)}"></label>
          <label class="field"><span>Breite (m)</span><input class="input" type="number" step="0.1" min="0.5" data-bind="room:width" value="${at(f.width)}"></label>
          <label class="field"><span>Tiefe (m)</span><input class="input" type="number" step="0.1" min="0.5" data-bind="room:depth" value="${at(f.depth)}"></label>
        </div>
        <div class="field">
          <span>Drehung (°)</span>
          <div class="color-row">
            <input class="input" type="number" step="1" data-bind="room:rotation" value="${ye(f)}">
            <button class="btn sm" data-act="room-rotate" data-deg="-15" title="15° gegen den Uhrzeigersinn">↺</button>
            <button class="btn sm" data-act="room-rotate" data-deg="15" title="15° im Uhrzeigersinn">↻</button>
          </div>
          <span class="hint-text">Auch am Kreis-Griff über dem Raum (Raster 15°, Alt = frei). X/Z ist die linke obere Ecke vor dem Drehen.</span>
        </div>
        <div class="area-row"><span>Fläche</span><strong data-out="room-area">${ie(vs(f))}</strong></div>
        <div class="field">
          <span>Bodentanks</span>
          <div class="tank-list">
            ${f.tanks.length?f.tanks.map(W=>`<button class="tank-chip ${W.id===l.selectedTankId?"active":""}" data-act="tank-edit" data-tank="${W.id}" title="Ports bearbeiten">
                        <span class="tl-icon"></span>${se(W.name)}<span class="tc-count">${W.ports.length} Ports</span>
                      </button>`).join(""):'<span class="muted">Keine Bodentanks.</span>'}
          </div>
          <button class="btn sm" data-act="tank-add">+ Bodentank</button>
        </div>
        <div class="field">
          <span>Drucker</span>
          <div class="tank-list">
            ${f.printers.length?f.printers.map(W=>`<button class="tank-chip ${W.id===l.selectedPrinterId?"active":""}" data-act="printer-select" data-printer="${W.id}">
                        <span class="pl-icon"></span>${se(W.name)}<span class="tc-count mono">${se(W.ip||"–")}</span>
                      </button>`).join(""):'<span class="muted">Keine Drucker.</span>'}
          </div>
          <button class="btn sm" data-act="printer-add">+ Drucker</button>
        </div>
        <div class="btn-row">
          <button class="btn sm" data-act="room-dup">Duplizieren</button>
          <button class="btn sm danger" data-act="room-del">Löschen</button>
        </div>
      </section>`:`
      <section class="panel">
        <h2 class="panel-title">Raum</h2>
        <div class="empty">Kein Raum ausgewählt. Klicke einen Raum im Grundriss an oder zeichne einen neuen (R).</div>
      </section>`;t("#e-props").innerHTML=`
      ${$()?le($(),R):""}
      ${X()?Qt(X()):""}
      ${x?Ot(x):""}
      ${S?xe(S):""}
      ${k}
      <section class="panel">
        <h2 class="panel-title">Etage</h2>
        <label class="field"><span>Name</span><input class="input" data-bind="floor:name" value="${se(R.name)}"></label>
        <label class="field"><span>Geschosshöhe (m)</span><input class="input" type="number" step="0.1" min="2" max="10" data-bind="floor:height" value="${R.height}"></label>
        <div class="area-row"><span>Fläche aller Räume</span><strong data-out="floor-area">${ie(lt(R))}</strong></div>
        ${Dt(R)}
        ${R.id===C.groundFloorId?'<span class="hint-text">Erdgeschoss (Geländehöhe). Etagen darunter sind Untergeschosse.</span>':'<button class="btn sm" data-act="floor-ground" title="Diese Etage liegt auf Geländehöhe; alle darunter werden Untergeschosse">Als Erdgeschoss festlegen</button>'}
      </section>
      <section class="panel">
        <h2 class="panel-title">Gebäude</h2>
        <label class="field"><span>Name</span><input class="input" data-bind="building:name" value="${se(C.name)}"></label>
      </section>`}function Dt(f){const x=f.underlay;return x?`
        <div class="field underlay-fields">
          <span>Hintergrundbild <span class="muted">· ${Math.round(x.src.length*.75/1024)} kB</span></span>
          <label class="check"><input type="checkbox" data-bind="underlay:visible" ${x.visible?"checked":""}> anzeigen</label>
          <label class="range"><span>Deckkraft</span>
            <input type="range" min="0.05" max="0.6" step="0.05" data-bind="underlay:opacity" value="${x.opacity}">
          </label>
          <div class="field-grid">
            <label class="field"><span>Breite (m)</span><input class="input" type="number" step="0.1" min="0.5" data-bind="underlay:width" value="${at(x.width)}"></label>
            <span></span>
            <label class="field"><span>X (m)</span><input class="input" type="number" step="0.1" data-bind="underlay:x" value="${at(x.x)}"></label>
            <label class="field"><span>Z (m)</span><input class="input" type="number" step="0.1" data-bind="underlay:z" value="${at(x.z)}"></label>
          </div>
          <div class="btn-row">
            <button class="btn sm${l.tool==="calibrate"?" active":""}" data-act="underlay-calibrate" title="Zwei Punkte einer bekannten Strecke anklicken">Maßstab setzen</button>
            <button class="btn sm${l.tool==="underlay"?" active":""}" data-act="underlay-move">Verschieben</button>
          </div>
          <div class="btn-row">
            <button class="btn sm" data-act="underlay-load">Ersetzen …</button>
            <button class="btn sm danger" data-act="underlay-del">Entfernen</button>
          </div>
        </div>`:`
        <div class="field">
          <span>Hintergrundbild</span>
          <button class="btn sm" data-act="underlay-load">Bild laden …</button>
          <span class="hint-text">Grundriss-Zeichnung als schwache Vorlage zum Nachzeichnen. Nur im Editor sichtbar.</span>
        </div>`}function Pt(f){return f.stairShape==="straight"?'<span class="field-warn">Der Aufzug sitzt im Treppenauge – dafür eine zweiläufige Treppenform wählen.</span>':Nl(f)?'<span class="hint-text">Der Schacht steht zwischen den Läufen, die Tür zeigt zum Geschosspodest. Er wird auf jeder Etage gezeichnet.</span>':`<span class="field-warn">Zu schmal für einen Aufzug: quer zur Laufrichtung mindestens ${Xe(Ul+kn*2,2)} m nötig.</span>`}function Jt(f){const x=Fe(f),S={chamfer:"Schräge"},C=`<div class="field"><span>Form</span><div class="seg seg-fill">${Object.entries(yl).map(([et,ot])=>`<button class="btn sm${x===et?" active":""}" data-act="room-shape" data-shape="${et}" title="${se(ot)}">${se(S[et]??ot)}</button>`).join("")}</div></div>`;if(x==="rect")return C;if(x==="poly")return`${C}
        <span class="hint-text">${f.points.length} Ecken · Ecken im Grundriss ziehen · „+“ auf einer Kante ziehen = neue Ecke · Doppelklick auf eine Ecke = entfernen</span>`;const z=Object.entries(lo).map(([et,ot])=>`<option value="${et}" ${f.cutCorner===et?"selected":""}>${se(ot)}</option>`).join(""),[k,W]=x==="l"?["Aussparung Breite","Aussparung Tiefe"]:["Schräge in X","Schräge in Z"];return`
        ${C}
        <div class="field">
          <span>${x==="l"?"Aussparung an Ecke":"Schräge an Ecke"}</span>
          <div class="color-row">
            <select class="input" data-bind="room:cutCorner">${z}</select>
            <button class="btn sm" data-act="cut-rotate" title="Zur nächsten Ecke (im Uhrzeigersinn)">↻</button>
          </div>
        </div>
        <div class="field-grid">
          <label class="field"><span>${k} (m)</span><input class="input" type="number" step="0.1" min="0.5" data-bind="room:cutW" value="${at(f.cutW)}"></label>
          <label class="field"><span>${W} (m)</span><input class="input" type="number" step="0.1" min="0.5" data-bind="room:cutD" value="${at(f.cutD)}"></label>
        </div>
        <span class="hint-text">Größe auch über den Rauten-Griff im Grundriss änderbar.</span>`}function ve(){const f=[...F().rooms].sort((x,S)=>x.name.localeCompare(S.name,"de",{numeric:!0}));t("#e-rooms").innerHTML=f.length?f.map(x=>`
        <button class="room-item ${x.id===l.selectedRoomId?"active":""}" data-room="${x.id}">
          <span class="swatch" style="background:${Zs(x)}"></span>
          <span class="ri-text"><span class="ri-name">${se(x.name)}</span><span class="ri-sub">${ie(vs(x))}</span></span>
          ${x.printers.length?`<span class="ri-meta" title="Drucker">${x.printers.length} DR</span>`:""}
          ${x.tanks.length?`<span class="ri-meta" title="Bodentanks">${x.tanks.length} BT</span>`:""}
        </button>`).join(""):'<div class="empty">Noch keine Räume.</div>'}function Ie(f){h.t1=f;const[x,S]=Ci(h.wall,Math.min(h.t0,f)),[R,C]=Ci(h.wall,Math.max(h.t0,f));g={x1:x,z1:S,x2:R,z2:C},L()}function fe(){const f=T(),x=n.querySelector('[data-out="room-area"]');f&&x&&(x.textContent=ie(vs(f)));const S=n.querySelector('[data-out="floor-area"]');S&&(S.textContent=ie(lt(F())))}function $e(){$t(),L(),nt(),ve()}function rn(){w.setBuilding(wt.building),w.setFocusFloor(l.floorId),w.setSelectedRoom(l.selectedRoomId),w.setSelectedTank(l.selectedTankId),w.setSelectedPrinter(l.selectedPrinterId)}function Ue(f,x=null,S=null){l.selectedRoomId===f&&l.selectedTankId===x&&l.selectedPrinterId===S&&!l.selectedOpeningId&&!l.selectedWallId||(l.selectedOpeningId=null,l.selectedWallId=null,l.selectedRoomId=f,l.selectedTankId=f?x:null,l.selectedPrinterId=f?S:null,w.setSelectedRoom(f),w.setSelectedTank(l.selectedTankId),w.setSelectedPrinter(l.selectedPrinterId),L(),nt(),ve())}function fn(f,{fit:x=!1}={}){l.floorId=f,l.selectedOpeningId=null,l.selectedWallId=null,l.selectedRoomId=null,l.selectedTankId=null,l.selectedPrinterId=null,w.setFocusFloor(f),w.setSelectedRoom(null),w.setSelectedTank(null),w.setSelectedPrinter(null),w.fitAll(),x&&it(),$e()}function pe(f){const x=[l.tool,f].some(S=>S==="calibrate"||S==="underlay");f!=="calibrate"&&(d=null),g=null,_=null,v=null,l.tool=f,$t(),L(),x&&nt()}function si(f){const x=F(),S=Uu({name:`Raum ${x.rooms.length+1}`,...f}),R=!x.rooms.length;wt.mutate(C=>C.floors.find(z=>z.id===x.id).rooms.push(S)),R&&w.fitAll(),Ue(S.id)}function io(){let f=null;for(const x of M())for(const S of x.rooms)for(const R of S.tanks)for(const C of R.ports){const z=ps(C.name);z&&(!f||z.panel*1e3+z.port>f.panel*1e3+f.port)&&(f=z)}return f}function us(f,x,S={}){const R=io(),C=Nu({name:zu(f),x:at(x.x),z:at(x.z),ports:qs(R?Xs(R):{panel:1,port:1},4),...S});wt.mutate(z=>{const k=N(z,f.id);k.tanks.push(C),wn(k)}),Ue(f.id,C.id)}function ri(f,x,S={}){const R=Ou({name:Fu(wt.building),x:at(x.x),z:at(x.z),...S});wt.mutate(C=>{const z=N(C,f.id);z.printers.push(R),wn(z)}),Ue(f.id,null,R.id)}function Fn(){if(l.selectedWallId){const x=l.selectedWallId;l.selectedWallId=null,wt.mutate(S=>{const R=S.floors.find(z=>z.id===l.floorId),C=R.walls.find(z=>z.id===x);R.walls=R.walls.filter(z=>z.id!==x),R.openings&&(R.openings=R.openings.filter(z=>!To(z,C)||cr(z,R)))});return}if(l.selectedOpeningId){const x=l.selectedOpeningId;l.selectedOpeningId=null,wt.mutate(S=>{const R=S.floors.find(C=>C.id===l.floorId);R.openings=R.openings.filter(C=>C.id!==x)});return}if(l.selectedPrinterId){const x=l.selectedPrinterId;l.selectedPrinterId=null,wt.mutate(S=>{const R=N(S,l.selectedRoomId);R.printers=R.printers.filter(C=>C.id!==x)});return}if(l.selectedTankId){const x=l.selectedTankId;l.selectedTankId=null,wt.mutate(S=>{const R=N(S,l.selectedRoomId);R.tanks=R.tanks.filter(C=>C.id!==x)});return}const f=l.selectedRoomId;f&&(l.selectedRoomId=null,wt.mutate(x=>{const S=x.floors.find(C=>C.id===l.floorId),R=S.rooms.find(C=>C.id===f);S.rooms=S.rooms.filter(C=>C.id!==f),S.openings&&(S.openings=S.openings.filter(C=>!wo(C,R)||cr(C,S)))}))}function yn(){const f=X();if(f){const{id:C,...z}=f;Lt({...z,x1:f.x1+.5,z1:f.z1+.5,x2:f.x2+.5,z2:f.z2+.5});return}const x=T();if(!x)return;const S=I();if(S){us(x,{x:S.x+.6,z:S.z},{ports:S.ports.map(C=>({...C}))});return}const R=b();if(R){ri(x,{x:R.x+.8,z:R.z},{ip:""});return}si(kl(x,{name:`${x.name} (Kopie)`,x:x.x+1,z:x.z+1}))}function so(f,x){if(X()){wt.mutate(S=>{const R=ht(S),C=S.floors.find(z=>z.id===l.floorId);for(const z of y(C,R))Gn(z,f,x);Gn(R,f,x)});return}T()&&wt.mutate(S=>{const R=A(S)??U(S);if(R){const[z,k]=uo(N(S,l.selectedRoomId),[f,x]);R.x=at(R.x+z),R.z=at(R.z+k),wn(N(S,l.selectedRoomId));return}const C=N(S,l.selectedRoomId);for(const z of Q(S.floors.find(k=>k.id===l.floorId),C))Gn(z,f,x);C.x=at(C.x+f),C.z=at(C.z+x)})}function ro(){const f=new Blob([JSON.stringify(wt.building,null,2)],{type:"application/json"}),x=document.createElement("a");x.href=URL.createObjectURL(f),x.download=wt.config.standard.split("/").pop(),x.click(),setTimeout(()=>URL.revokeObjectURL(x.href),1e3)}const ds={"floor-add":()=>{var S;const f=M().length-vo(wt.building),x=ir({name:sr(f),height:((S=F())==null?void 0:S.height)??3});wt.mutate(R=>R.floors.push(x)),fn(x.id)},"floor-add-below":()=>{var S;const f=-vo(wt.building)-1,x=ir({name:sr(f),height:((S=F())==null?void 0:S.height)??3});wt.mutate(R=>R.floors.unshift(x)),fn(x.id)},"underlay-load":()=>t("#e-underlay-file").click(),"underlay-del":()=>{wt.mutate(f=>delete f.floors.find(x=>x.id===l.floorId).underlay),(l.tool==="calibrate"||l.tool==="underlay")&&pe("select")},"underlay-calibrate":()=>{d=null,pe(l.tool==="calibrate"?"select":"calibrate")},"underlay-move":()=>pe(l.tool==="underlay"?"select":"underlay"),"floor-ground":()=>{wt.mutate(f=>f.groundFloorId=l.floorId)},"floor-dup":()=>{var R,C;const f=F(),x=M().indexOf(f),S=ir({name:`${f.name} (Kopie)`,height:f.height,rooms:f.rooms.map(z=>kl(z)),...f.underlay?{underlay:{...f.underlay}}:{},...(R=f.openings)!=null&&R.length?{openings:f.openings.map(({id:z,...k})=>ql(k))}:{},...(C=f.walls)!=null&&C.length?{walls:f.walls.map(({id:z,...k})=>zl(k))}:{}});wt.mutate(z=>z.floors.splice(x+1,0,S)),fn(S.id)},"floor-up":()=>ao(1),"floor-down":()=>ao(-1),"floor-del":()=>{const f=F();if(M().length<=1||!confirm(`Etage „${f.name}“ mit ${f.rooms.length} Räumen löschen?`))return;const x=M().indexOf(f);wt.mutate(S=>{S.floors.splice(x,1),S.groundFloorId===f.id&&(S.groundFloorId=(S.floors[x]??S.floors[x-1]).id)}),fn(M()[Math.max(0,x-1)].id)},"tool-select":()=>pe("select"),"tool-draw":()=>pe("draw"),"tool-stairs":()=>pe("stairs"),"tool-door":()=>pe("door"),"tool-glass":()=>pe("glass"),"tool-wall":()=>pe("wall"),"tool-poly":()=>pe("poly"),"wall-dup":yn,"wall-del":Fn,"room-rotate":f=>oo(ye(T())+Number(f.dataset.deg)),"opening-type":f=>{wt.mutate(x=>Z(x).type=f.dataset.type)},"opening-swing":()=>{wt.mutate(f=>{const x=Z(f);x.swing=(x.swing+1)%4})},"opening-del":Fn,"stairs-rotate":()=>{wt.mutate(f=>{const x=N(f,l.selectedRoomId);x.stairDir=wu(x.stairDir)})},"room-shape":f=>{const x=f.dataset.shape;wt.mutate(S=>{const R=N(S,l.selectedRoomId);if(x==="poly"){Fe(R)!=="poly"&&Object.assign(R,Js(En(R)));return}Fe(R)==="poly"&&delete R.points,(Fe(R)==="rect"||Fe(R)==="poly")&&x!=="rect"&&Object.assign(R,fu(R)),R.shape=x,_s(R),wn(R)})},"cut-rotate":()=>{const f=Object.keys(lo);wt.mutate(x=>{const S=N(x,l.selectedRoomId);S.cutCorner=f[(f.indexOf(S.cutCorner)+1)%f.length],wn(S)})},"tool-tank":()=>pe("tank"),"tool-printer":()=>pe("printer"),"printer-add":()=>{const f=T();f&&ri(f,{x:f.width/2,z:f.depth/2})},"printer-select":f=>Ue(l.selectedRoomId,null,f.dataset.printer),"printer-dup":yn,"printer-del":Fn,"room-add":()=>{si({x:st(c.cx-4/2),z:st(c.cz-4/2),width:4,depth:4})},"room-dup":yn,"room-del":Fn,"color-reset":()=>{wt.mutate(f=>N(f,l.selectedRoomId).color=null)},"tank-add":()=>{const f=T();f&&us(f,{x:f.width/2,z:f.depth/2})},"tank-edit":f=>{f.dataset.tank&&Ue(l.selectedRoomId,f.dataset.tank),Tt()},"modal-close":K,"switch-assign":()=>{const f=t("#e-bulk-switch").value.trim(),x=t("#e-bulk-switch-port").value.trim()||"1";wt.mutate(S=>{A(S).ports.forEach((R,C)=>{R.switch=f,R.switchPort=lu(x,C)})})},"tank-dup":yn,"tank-del":Fn,"port-add":()=>{wt.mutate(f=>{const x=A(f);x.ports=Ml(x.ports,Math.min(xl,x.ports.length+1))})},"port-del":f=>{const x=Number(f.dataset.index);wt.mutate(S=>A(S).ports.splice(x,1))},"ports-renumber":()=>{const f=Math.max(1,parseInt(t("#e-start-panel").value,10)||1),x=bn(parseInt(t("#e-start-port").value,10)||1,1,24);wt.mutate(S=>{const R=A(S),C=qs({panel:f,port:x},R.ports.length);R.ports=R.ports.map((z,k)=>({...z,name:C[k].name}))})},undo:()=>wt.undo(),redo:()=>wt.redo(),export:ro,import:()=>t("#e-file").click(),standard:async()=>{!wt.matchesStandard&&!confirm("Entwurf verwerfen und den Standard laden? (Rückgängig ist möglich)")||(await wt.discardDraft(),fn(wt.building.groundFloorId,{fit:!0}))},reset:()=>{confirm("Aktuelles Gebäude durch das Testgebäude ersetzen? (Rückgängig ist möglich)")&&(wt.replace(ms()),fn(wt.building.groundFloorId,{fit:!0}))},"zoom-in":()=>_t(1.25),"zoom-out":()=>_t(.8),"zoom-fit":()=>{it(),L()}};function oo(f){const x=T();if(!x)return;const S=ho(f),R=S-ye(x);if(!R)return nt();const C=Q(F(),x).map(z=>({...z}));wt.mutate(z=>{const k=N(z,l.selectedRoomId);k.rotation=S,kt(z.floors.find(W=>W.id===l.floorId),C,Ri(k),R)})}function ao(f){const x=M().findIndex(R=>R.id===l.floorId),S=x+f;S<0||S>=M().length||wt.mutate(R=>{const[C]=R.floors.splice(x,1);R.floors.splice(S,0,C)})}n.addEventListener("click",f=>{var S;const x=f.target.closest("[data-act]");x&&!x.disabled&&((S=ds[x.dataset.act])==null||S.call(ds,x))}),t("#e-floor").addEventListener("change",f=>fn(f.target.value)),t("#e-snap").addEventListener("change",f=>l.snap=Number(f.target.value)),t("#e-rooms").addEventListener("click",f=>{const x=f.target.closest("[data-room]");x&&Ue(x.dataset.room)}),t("#e-underlay-file").addEventListener("change",f=>{const x=f.target.files[0];f.target.value="",x&&re(x)}),t("#e-props").addEventListener("input",f=>{f.target.dataset.bind==="underlay:opacity"&&o.setAttribute("opacity",f.target.value)}),t("#e-file").addEventListener("change",async f=>{const x=f.target.files[0];if(f.target.value="",!!x)try{wt.replace(JSON.parse(await x.text())),fn(wt.building.groundFloorId,{fit:!0})}catch(S){alert(`Import fehlgeschlagen: ${S.message}`)}});const E=f=>x=>{const S=x.target.closest("[data-bind]");if(!S)return;const[R,C,z]=S.dataset.bind.split(":");let k=S.type==="checkbox"?S.checked:S.value;if(R==="port"){p=f,wt.mutate(W=>A(W).ports[Number(C)][z]=k.trim()),p=null;return}if(R==="opening"&&C==="width"){const W=parseFloat(String(k).replace(",","."));if(!(W>=bs))return nt();wt.mutate(et=>{const ot=Z(et),[Et,yt]=lr(ot),ut=(ot.x1+ot.x2)/2,pt=(ot.z1+ot.z2)/2;Object.assign(ot,{x1:he(ut-Et*W/2),z1:he(pt-yt*W/2),x2:he(ut+Et*W/2),z2:he(pt+yt*W/2)})});return}if(R==="wall"&&C==="length"){const W=parseFloat(String(k).replace(",","."));if(!(W>=er))return nt();wt.mutate(et=>{const ot=ht(et),[Et,yt]=lr(ot);ot.x2=he(ot.x1+Et*W),ot.z2=he(ot.z1+yt*W)});return}if(R==="room"&&C==="rotation"){const W=parseFloat(String(k).replace(",","."));return Number.isFinite(W)?oo(W):nt()}if(R==="tank"&&C==="count"){const W=bn(parseInt(k,10)||0,0,xl);wt.mutate(et=>{const ot=A(et);ot.ports=Ml(ot.ports,W)});return}if(["x","z","width","depth","height","cutW","cutD","opacity"].includes(C)){if(k=parseFloat(String(k).replace(",",".")),!Number.isFinite(k))return nt();(C==="width"||C==="depth")&&(k=Math.max(.5,k)),C==="height"&&(k=bn(k,2,10)),k=at(k)}if(p=["type","elevator","stairShape"].includes(C)?null:f,R==="printer"&&(k=k.trim()),wt.mutate(W=>{var yt;const et=R==="tank"?A(W):R==="printer"?U(W):R==="room"?N(W,l.selectedRoomId):R==="underlay"?(yt=W.floors.find(ut=>ut.id===l.floorId))==null?void 0:yt.underlay:R==="floor"?W.floors.find(ut=>ut.id===l.floorId):W;if(!et)return;if(R==="room"&&(C==="x"||C==="z")){const ut=k-et[C],pt=W.floors.find(Nt=>Nt.id===l.floorId);for(const Nt of Q(pt,et))Gn(Nt,C==="x"?ut:0,C==="z"?ut:0)}const ot=R==="room"&&(C==="width"||C==="depth")&&Bn(et,[et.x,et.z]);if(et[C]=k,ot&&Fe(et)==="poly"){const ut=C==="width"?0:1,pt=Math.max(...et.points.map(Nt=>Nt[ut]))||1;et.points=et.points.map(Nt=>Nt.map((ce,me)=>me===ut?he(ce*k/pt):ce))}ot&&ye(et)&&Gt(et,ot);const Et=N(W,l.selectedRoomId);R==="room"&&["width","depth","cutW","cutD"].includes(C)&&_s(Et),Et&&(R==="tank"||["width","depth","cutW","cutD","cutCorner"].includes(C))&&wn(Et)}),p=null,R==="printer"&&C==="ip"){const W=n.querySelector('[data-out="ip-warn"]');W&&(W.hidden=!k||Fl(k))}};t("#e-props").addEventListener("change",E("props")),t("#e-modal").addEventListener("change",E("modal")),t("#e-modal").addEventListener("pointerdown",f=>{f.target===f.currentTarget&&K()}),t("#e-modal").addEventListener("keydown",f=>{var C;const x=f.target.closest('[data-bind^="port:"]');if(f.key!=="Enter"||!x)return;f.preventDefault();const[,S,R]=x.dataset.bind.split(":");x.blur(),(C=t(`#e-modal [data-bind="port:${Number(S)+1}:${R}"]`))==null||C.focus()}),e.addEventListener("contextmenu",f=>f.preventDefault()),e.addEventListener("pointerdown",f=>{const x=Kt(f),S=f.target.closest("[data-handle]"),R=f.target.closest("[data-tank]"),C=f.target.closest("[data-printer]"),z=f.target.closest("[data-room]");if(e.setPointerCapture(f.pointerId),f.button===1||f.button===2){h={type:"pan",sx:f.clientX,sy:f.clientY,cx:c.cx,cz:c.cz};return}if(f.button!==0)return;if(l.tool==="calibrate"){if(!d||d.b)d={a:[x.x,x.z],b:null,hover:[x.x,x.z]};else{d.b=[x.x,x.z],mt();return}L();return}if(l.tool==="underlay"){const ut=F().underlay;ut&&(h={type:"underlay",start:x,orig:{x:ut.x,z:ut.z},started:!1});return}if(l.tool==="draw"||l.tool==="stairs"){const ut={x:st(x.x,f.altKey),z:st(x.z,f.altKey)};h={type:"draw",start:ut},u={x:ut.x,z:ut.z,width:0,depth:0};return}if(l.tool==="door"){V(x,f.altKey);return}if(l.tool==="poly"){const ut=v==null?void 0:v.points.at(-1),pt=Ct(x,f.altKey,ut,f.shiftKey);if(!v)v={points:[pt],hover:pt};else{const[Nt,ce]=v.points[0],me=Math.hypot(x.x-Nt,x.z-ce)*c.scale<10&&v.points.length>=3,Se=Math.hypot(pt[0]-ut[0],pt[1]-ut[1])<1e-6;if(me||Se&&v.points.length>=3)return bt();Se||v.points.push(pt)}L();return}if(l.tool==="wall"){const[ut,pt]=Ct(x,f.altKey);h={type:"wall-draw",start:[ut,pt]},_={x1:ut,z1:pt,x2:ut,z2:pt},L();return}if(l.tool==="glass"){const ut=j(x);if(ut){const pt=st(ut.t,f.altKey,On);h={type:"glass",wall:ut,t0:bn(pt,0,ut.len)},Ie(h.t0)}return}if(l.tool==="tank"||l.tool==="printer"){const ut=de(x);if(ut){const[pt,Nt]=gs(ut,[x.x,x.z]),ce={x:st(pt-ut.x,f.altKey,On),z:st(Nt-ut.z,f.altKey,On)};l.tool==="tank"?us(ut,ce):ri(ut,ce)}return}const k=f.target.closest("[data-ohandle]"),W=f.target.closest("[data-opening]");if(k&&$()){h={type:"opening-end",end:k.dataset.ohandle,start:x,orig:{...$()},started:!1};return}if(W){ct(W.dataset.opening),h={type:"opening",start:x,orig:{...$()},started:!1};return}const et=f.target.closest("[data-whandle]");if(et&&X()){h={type:"wall-end",end:et.dataset.whandle,start:x,started:!1};return}if(C){Ue(C.dataset.printerRoom,null,C.dataset.printer);const ut=b();h={type:"printer",start:x,orig:{x:ut.x,z:ut.z},started:!1};return}if(R){const ut=performance.now(),pt=P.id===R.dataset.tank&&ut-P.time<400;if(P={id:R.dataset.tank,time:ut},Ue(R.dataset.tankRoom,R.dataset.tank),pt){h=null,Tt();return}const Nt=I();h={type:"tank",start:x,orig:{x:Nt.x,z:Nt.z},started:!1};return}const ot=f.target.closest("[data-vertex]"),Et=f.target.closest("[data-vadd]");if((ot||Et)&&T()){const ut=T(),pt={...ut,points:ut.points.map(Nt=>[...Nt]),tanks:ut.tanks.map(Nt=>({x:Nt.x,z:Nt.z})),printers:ut.printers.map(Nt=>({x:Nt.x,z:Nt.z}))};if(ot){const Nt=Number(ot.dataset.vertex),ce=performance.now(),me=m.index===Nt&&ce-m.time<400;if(m={index:Nt,time:ce},me)return St(Nt);h={type:"vertex",index:Nt,insert:!1,start:x,orig:pt,started:!1}}else h={type:"vertex",index:Number(Et.dataset.vadd)+1,insert:!0,start:x,orig:pt,started:!1};return}if(S&&T()&&S.dataset.handle==="rotate"){const ut=T();h={type:"rotate",start:x,orig:{rotation:ye(ut),openings:Q(F(),ut).map(pt=>({...pt}))},started:!1};return}if(S&&T()){const ut=T();h={type:"resize",handle:S.dataset.handle,start:x,orig:{...ut,tanks:ut.tanks.map(pt=>({x:pt.x,z:pt.z})),printers:ut.printers.map(pt=>({x:pt.x,z:pt.z}))},started:!1};return}const yt=f.target.closest("[data-wall]");if(yt){D(yt.dataset.wall);const ut=F(),pt=X(),Nt=y(ut,pt).map(ce=>({...ce}));h={type:"wall",start:x,orig:{...pt,openings:Nt},started:!1};return}if(z){Ue(z.dataset.room);const ut=T(),pt=Q(F(),ut).map(Nt=>({...Nt}));h={type:"move",start:x,orig:{x:ut.x,z:ut.z,openings:pt},started:!1};return}Ue(null),h={type:"pan",sx:f.clientX,sy:f.clientY,cx:c.cx,cz:c.cz}}),e.addEventListener("pointermove",f=>{const x=Kt(f);if(t("#e-coords").textContent=`x ${Xe(x.x,2)} · z ${Xe(x.z,2)} m`,d&&!d.b&&(d.hover=[x.x,x.z],L()),v&&(v.hover=Ct(x,f.altKey,v.points.at(-1),f.shiftKey),L()),!h)return;if(h.type==="pan"){c.cx=h.cx-(f.clientX-h.sx)/c.scale,c.cz=h.cz-(f.clientY-h.sy)/c.scale,L();return}if(h.type==="glass"){const{wall:z}=h,k=(x.x-z.p[0])*z.u[0]+(x.z-z.p[1])*z.u[1];Ie(bn(st(k,f.altKey,On),0,z.len));return}if(h.type==="wall-draw"){const[z,k]=Ct(x,f.altKey,h.start,f.shiftKey);_={x1:h.start[0],z1:h.start[1],x2:z,z2:k},L();return}if(h.type==="draw"){const z={x:st(x.x,f.altKey),z:st(x.z,f.altKey)};u={x:Math.min(h.start.x,z.x),z:Math.min(h.start.z,z.z),width:at(Math.abs(z.x-h.start.x)),depth:at(Math.abs(z.z-h.start.z))},L();return}const S=x.x-h.start.x,R=x.z-h.start.z;if(!h.started){if(Math.hypot(S,R)*c.scale<3)return;h.started=!0,wt.checkpoint()}const C=f.altKey;wt.mutate(z=>{if(h.type==="opening"||h.type==="opening-end"){const Ft=Z(z),Vt=h.orig,[dt,gt]=lr(Vt),Zt=st(S*dt+R*gt,C,On);if(h.type==="opening")Object.assign(Ft,{x1:Vt.x1,z1:Vt.z1,x2:Vt.x2,z2:Vt.z2}),Gn(Ft,dt*Zt,gt*Zt);else if(h.end==="a"){const Yt=Math.min(Zt,ws(Vt)-bs);Ft.x1=he(Vt.x1+dt*Yt),Ft.z1=he(Vt.z1+gt*Yt)}else{const Yt=Math.max(Zt,bs-ws(Vt));Ft.x2=he(Vt.x2+dt*Yt),Ft.z2=he(Vt.z2+gt*Yt)}return}if(h.type==="wall"||h.type==="wall-end"){const Ft=ht(z),Vt=z.floors.find(Yt=>Yt.id===l.floorId);if(h.type==="wall-end"){const Yt=h.end==="a"?[Ft.x2,Ft.z2]:[Ft.x1,Ft.z1],[oe,Ae]=Ct(x,C,Yt,f.shiftKey);if(Math.hypot(oe-Yt[0],Ae-Yt[1])<er)return;h.end==="a"?Object.assign(Ft,{x1:oe,z1:Ae}):Object.assign(Ft,{x2:oe,z2:Ae});return}const dt=h.orig,gt=st(S,C),Zt=st(R,C);Object.assign(Ft,{x1:dt.x1,z1:dt.z1,x2:dt.x2,z2:dt.z2}),Gn(Ft,gt,Zt);for(const Yt of dt.openings){const oe=Vt.openings.find(Ae=>Ae.id===Yt.id);oe&&(Object.assign(oe,{x1:Yt.x1,z1:Yt.z1,x2:Yt.x2,z2:Yt.z2}),Gn(oe,gt,Zt))}return}if(h.type==="underlay"){const Ft=z.floors.find(Vt=>Vt.id===l.floorId).underlay;Ft.x=at(h.orig.x+S),Ft.z=at(h.orig.z+R);return}const k=N(z,l.selectedRoomId);if(!k)return;if(h.type==="tank"||h.type==="printer"){const Ft=h.type==="tank"?A(z):U(z),[Vt,dt]=uo(k,[S,R]);Ft.x=st(h.orig.x+Vt,C,On),Ft.z=st(h.orig.z+dt,C,On),wn(k);return}if(h.type==="move"){k.x=at(st(h.orig.x+S,C)),k.z=at(st(h.orig.z+R,C));const Ft=z.floors.find(Vt=>Vt.id===l.floorId);for(const Vt of h.orig.openings){const dt=Ft.openings.find(gt=>gt.id===Vt.id);dt&&(Object.assign(dt,{x1:Vt.x1,z1:Vt.z1,x2:Vt.x2,z2:Vt.z2}),Gn(dt,k.x-h.orig.x,k.z-h.orig.z))}return}if(h.type==="vertex"){const Ft=h.orig,Vt=ye(Ft)?gs(Ft,[x.x,x.z]).map(gt=>st(gt,C)):Ct(x,C,null,!1,Ft.id),dt=En(Ft);if(h.insert?dt.splice(h.index,0,Vt):dt[h.index]=Vt,!Ks(dt))return;Object.assign(k,{x:Ft.x,z:Ft.z,width:Ft.width,depth:Ft.depth}),Tl(k,dt),Bt(k,Ft);return}if(h.type==="rotate"){const[Ft,Vt]=Ri(k),dt=Math.atan2(x.x-Ft,Vt-x.z)*180/Math.PI,gt=ho(C?Math.round(dt):Math.round(dt/15)*15);k.rotation=gt,kt(z.floors.find(Zt=>Zt.id===l.floorId),h.orig.openings,[Ft,Vt],gt-h.orig.rotation);return}const W=h.orig,et=h.handle;if(et==="cut"){const{corner:Ft,east:Vt,north:dt}=Xt(k),[gt,Zt]=gs(k,[x.x,x.z]),Yt=st(gt,C),oe=st(Zt,C);k.cutW=at(Vt?Ft[0]-Yt:Yt-Ft[0]),k.cutD=at(dt?oe-Ft[1]:Ft[1]-oe),_s(k),wn(k);return}const ot=!!ye(W),[Et,yt]=uo(W,[S,R]),ut=(Ft,Vt,dt,gt)=>ot?gt?Ft+Vt-st(Vt-dt,C):Ft+st(Vt+dt,C):st(Ft+(gt?0:Vt)+dt,C);let[pt,Nt,ce,me]=[W.x,W.z,W.x+W.width,W.z+W.depth];et.includes("w")&&(pt=Math.min(ut(W.x,W.width,Et,!0),ce-hs)),et.includes("e")&&(ce=Math.max(ut(W.x,W.width,Et,!1),pt+hs)),et.includes("n")&&(Nt=Math.min(ut(W.z,W.depth,yt,!0),me-hs)),et.includes("s")&&(me=Math.max(ut(W.z,W.depth,yt,!1),Nt+hs)),k.width=at(ce-pt),k.depth=at(me-Nt);const[Se,ee]=Bn(W,[(pt+ce)/2,(Nt+me)/2]);k.x=he(Se-k.width/2),k.z=he(ee-k.depth/2),_s(k),Bt(k,W)},{checkpoint:!1})});const H=()=>{if((h==null?void 0:h.type)==="wall-draw"&&_){const f=_;_=null,h=null,_o(f)>=er?Lt(f):L();return}if((h==null?void 0:h.type)==="glass"&&g){const{wall:f,t0:x}=h;let[S,R]=[x,h.t1??x].sort((et,ot)=>et-ot);if(R-S<bs){const et=Math.min(2,f.len);S=bn(x-et/2,0,f.len-et),R=S+et}g=null,h=null;const[C,z]=Ci(f,S),[k,W]=Ci(f,R);tt({type:"glass",x1:he(C),z1:he(z),x2:he(k),z2:he(W)});return}if((h==null?void 0:h.type)==="draw"&&u){const f=u;if(u=null,f.width>=hs&&f.depth>=hs){const x={x:at(f.x),z:at(f.z),width:f.width,depth:f.depth};if(l.tool==="stairs"){const S=F().rooms.filter(R=>R.type==="stairs").length;Object.assign(x,{type:"stairs",name:`Treppenhaus ${S+1}`,stairDir:f.depth>=f.width?"n":"e"})}l.tool="select",si(x),$t()}L()}h=null};e.addEventListener("pointerup",H),e.addEventListener("pointercancel",H),e.addEventListener("wheel",f=>{f.preventDefault(),_t(Math.exp(-f.deltaY*.0015),f.clientX,f.clientY)},{passive:!1});const q=f=>{var R,C,z;if(l.tankModal){f.key==="Escape"&&(f.preventDefault(),K());return}if((C=(R=f.target).closest)!=null&&C.call(R,"input, textarea, select"))return;const x=f.ctrlKey||f.metaKey,S=f.key.toLowerCase();if(v&&(S==="enter"||S==="backspace"))return f.preventDefault(),S==="enter"?bt():(v.points.pop(),v.points.length||(v=null),L());if(x&&S==="z"&&!f.shiftKey)wt.undo();else if(x&&(S==="y"||S==="z"&&f.shiftKey))wt.redo();else if(x&&S==="d")yn();else if(S==="delete"||S==="backspace")Fn();else if(S==="enter"&&l.selectedTankId)Tt();else if(S==="escape")u=null,g=null,_=null,v=null,d=null,h=null,pe("select"),l.selectedOpeningId||l.selectedWallId?Ue(null):l.selectedTankId||l.selectedPrinterId?Ue(l.selectedRoomId,null):Ue(null);else if(S==="r"&&!x)pe("draw");else if(S==="s"&&!x)pe("stairs");else if(S==="q"&&!x&&((z=T())==null?void 0:z.type)==="stairs")ds["stairs-rotate"]();else if(S==="t"&&!x)pe("tank");else if(S==="p"&&!x)pe("printer");else if(S==="d"&&!x)pe("door");else if(S==="g"&&!x)pe("glass");else if(S==="w"&&!x)pe("wall");else if(S==="f"&&!x)pe("poly");else if(S==="v"&&!x)pe("select");else if(S.startsWith("arrow")&&(l.selectedRoomId||l.selectedWallId)){const k=l.selectedTankId||l.selectedPrinterId?On:l.snap,W=f.shiftKey?1:k,et={arrowleft:[-W,0],arrowright:[W,0],arrowup:[0,-W],arrowdown:[0,W]}[S];so(...et)}else return;f.preventDefault()};window.addEventListener("keydown",q);const Y=wt.subscribe(()=>{M().some(f=>f.id===l.floorId)||(l.floorId=M()[0].id),l.selectedRoomId&&!T()&&(l.selectedRoomId=null),l.selectedTankId&&!I()&&(l.selectedTankId=null),l.selectedPrinterId&&!b()&&(l.selectedPrinterId=null),l.selectedOpeningId&&!$()&&(l.selectedOpeningId=null),l.selectedWallId&&!X()&&(l.selectedWallId=null),rn(),$t(),L(),ve(),p!=="props"?nt():fe(),p!=="modal"&&B()}),G=new ResizeObserver(()=>L());return G.observe(i),rn(),w.fitAll(!1),requestAnimationFrame(()=>{it(),$e()}),$e(),{destroy(){Y(),G.disconnect(),window.removeEventListener("keydown",q),w.dispose()}}}Yu("editor",$0)})();
