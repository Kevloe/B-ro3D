(function(){"use strict";const ll=n=>String(n).padStart(2,"0"),Zh=(n="",t={})=>({name:n,switch:"",switchPort:"",...t});function jh(n,t){const e=/^(.*?)(\d+)(\D*)$/.exec(String(n));if(!e)return String(n);const i=String(Number(e[2])+t).padStart(e[2].length,"0");return`${e[1]}${i}${e[3]}`}function Kh(n){return!n.switch&&!n.switchPort?"":[n.switch,n.switchPort&&`Port ${n.switchPort}`].filter(Boolean).join(" · ")}const Jh=(n,t)=>`P${ll(n)}/${ll(t)}`;function rs(n){const t=/^\s*P(\d+)\s*\/\s*(\d+)\s*$/i.exec(n??"");return t?{panel:Number(t[1]),port:Number(t[2])}:null}function Bs({panel:n,port:t}){return t>=24?{panel:n+1,port:1}:{panel:n,port:t+1}}function ks(n,t){const e=[];let i={panel:Math.max(1,n.panel),port:Math.min(Math.max(1,n.port),24)};for(let s=0;s<t;s++)e.push(Zh(Jh(i.panel,i.port))),i=Bs(i);return e}function cl(n,t){if(t<=n.length)return n.slice(0,t);const e=[...n].reverse().map(s=>rs(s.name)).find(Boolean),i=e?Bs(e):{panel:1,port:1};return[...n,...ks(i,t-n.length)]}function os(){const l={name:"Testbüro",floors:[{id:"f-eg",name:"Erdgeschoss",height:3,rooms:[{id:"r-flur",name:"Flur",type:"corridor",x:0,z:5.5,width:30,depth:2.2,color:null,occupant:"",description:"Hauptflur"},{id:"r-101",name:"Büro 101",type:"office",x:1.5,z:0,width:9,depth:5.5,color:null,occupant:"Team Vertrieb",description:"4 Arbeitsplätze"},{id:"r-102",name:"Büro 102",type:"office",x:10.5,z:0,width:9,depth:5.5,color:null,occupant:"Team Marketing",description:"4 Arbeitsplätze"},{id:"r-103",name:"Büro 103",type:"office",x:19.5,z:0,width:9,depth:5.5,color:null,occupant:"Geschäftsleitung",description:"2 Arbeitsplätze"},{id:"r-104",name:"Büro 104",type:"office",x:1.5,z:7.7,width:9,depth:5.5,color:null,occupant:"Team IT",description:"5 Arbeitsplätze"},{id:"r-105",name:"Besprechung 105",type:"meeting",x:10.5,z:7.7,width:9,depth:5.5,color:null,occupant:"",description:"12 Sitzplätze, Beamer"},{id:"r-106",name:"Teeküche 106",type:"kitchen",x:19.5,z:7.7,width:9,depth:5.5,color:null,occupant:"",description:"Kaffee, Kühlschrank, Spülmaschine"}]}]},a={"r-101":[6,6],"r-102":[6,6],"r-103":[6,6],"r-104":[6,6],"r-105":[4,4],"r-106":[2]};let c={panel:1,port:1};for(const f of l.floors[0].rooms){const m=a[f.id]??[];f.tanks=m.map((_,M)=>{const g=ks(c,_);return c=Bs(rs(g[g.length-1].name)),{id:`t-${f.id.slice(2)}-${M+1}`,name:`BT ${M+1}`,x:Math.round(f.width*(M+1)/(m.length+1)*100)/100,z:Math.round(f.depth/2*100)/100,ports:g}})}for(const f of l.floors[0].rooms)for(const m of f.tanks)for(const _ of m.ports){const{panel:M,port:g}=rs(_.name);_.switch=`Switch ${Math.ceil(M/2)}`,_.switchPort=String((M-1)%2*24+g)}const h=1;l.floors[0].openings=l.floors[0].rooms.filter(f=>f.type!=="corridor").map(f=>{const m=f.x+f.width/2,_=f.z===0?5.5:7.7;return{id:`o-${f.id.slice(2)}`,type:"door",swing:f.z===0?2:0,x1:m-h/2,z1:_,x2:m+h/2,z2:_}});const d=Object.fromEntries(l.floors[0].rooms.map(f=>[f.id,f]));for(const f of l.floors[0].rooms)f.printers=[];return d["r-flur"].printers.push({id:"p-flur",name:"Drucker Flur",ip:"192.168.10.50",x:15,z:.45}),d["r-102"].printers.push({id:"p-102",name:"Drucker Marketing",ip:"192.168.10.51",x:8.3,z:.5}),l}const Hs={office:{label:"Büro",color:"#7fa8d6"},meeting:{label:"Besprechung",color:"#e5a55f"},corridor:{label:"Flur",color:"#cfc9bf"},kitchen:{label:"Küche",color:"#8fc28a"},wc:{label:"WC",color:"#9fcbd4"},stairs:{label:"Treppenhaus",color:"#aab3bf"},storage:{label:"Lager / Technik",color:"#b7a8cc"},other:{label:"Sonstiges",color:"#d8d2c6"}},Gs=n=>{var t;return n.color||((t=Hs[n.type])==null?void 0:t.color)||Hs.other.color},Qh={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ee=n=>String(n??"").replace(/[&<>"']/g,t=>Qh[t]),Ge=(n,t=1)=>Number(n).toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}),fn=(n,t,e)=>Math.min(e,Math.max(t,n));function Ue(n="id"){var e,i;const t=((i=(e=globalThis.crypto)==null?void 0:e.randomUUID)==null?void 0:i.call(e))??Math.random().toString(36).slice(2)+Date.now().toString(36);return`${n}-${t.slice(0,8)}`}const hl={rect:"Rechteck",l:"L-Form",chamfer:"Schräge Wand"},to={nw:"oben links",ne:"oben rechts",se:"unten rechts",sw:"unten links"},Mi=["nw","ne","se","sw"],eo=.5,tu=.5,on=1e-6,me=n=>{const t=Number(n.rotation)||0;return Math.abs(t)<1e-9?0:t};function no(n){let t=((Number(n)||0)%360+360)%360;return t>180&&(t-=360),Math.round(t*10)/10||0}const Si=n=>[n.x+n.width/2,n.z+n.depth/2];function yi([n,t],[e,i],s){if(!s)return[n,t];const r=s*Math.PI/180,o=Math.cos(r),l=Math.sin(r),a=n-e,c=t-i;return[e+a*o-c*l,i+a*l+c*o]}const jn=(n,t)=>yi(t,Si(n),me(n)),Vs=(n,t)=>yi(t,Si(n),-me(n)),io=(n,t)=>yi(t,[0,0],-me(n)),pn=n=>n.type!=="stairs"&&(n.shape==="l"||n.shape==="chamfer")?n.shape:"rect";function as(n){const t=n.shape==="l"?tu:0,e=(i,s)=>{const r=Math.max(eo,s-t);return Math.round(Math.min(Math.max(Number(i)||0,Math.min(eo,r)),r)*100)/100};n.cutW=e(n.cutW,n.width),n.cutD=e(n.cutD,n.depth)}function eu(n){const t=e=>Math.max(eo,Math.round(e/2/.5)*.5);return{cutW:t(n.width),cutD:t(n.depth)}}function mn(n){const t=Ws(n);return me(n)?t.map(e=>jn(n,e)):t}function Ws(n){const t=n.x,e=n.z,i=n.x+n.width,s=n.z+n.depth,r={nw:[t,e],ne:[i,e],se:[i,s],sw:[t,s]},o=pn(n);if(o==="rect")return Mi.map(g=>r[g]);const l=Math.max(0,Mi.indexOf(n.cutCorner)),a=r[Mi[l]],c=r[Mi[(l+3)%4]],h=r[Mi[(l+1)%4]],d=g=>{const p=g[1]===a[1],R=p?n.cutW:n.cutD;return p?[Math.sign(g[0]-a[0])*R,0]:[0,Math.sign(g[1]-a[1])*R]},f=d(c),m=d(h),_=[[a[0]+f[0],a[1]+f[1]]];o==="l"&&_.push([a[0]+f[0]+m[0],a[1]+f[1]+m[1]]),_.push([a[0]+m[0],a[1]+m[1]]);const M=[];for(let g=0;g<4;g++){const p=Mi[(l+g)%4];g===0?M.push(..._):M.push(r[p])}return M.filter((g,p)=>{const R=M[(p+1)%M.length];return Math.abs(g[0]-R[0])>on||Math.abs(g[1]-R[1])>on})}function $s(n){const t=nu(n);return me(n)?t.map(e=>e.map(i=>jn(n,i))):t}function nu(n){if(pn(n)!=="l")return[Ws(n)];const{x:t,z:e,width:i,depth:s,cutW:r,cutD:o}=n,l=n.cutCorner,a=(m,_,M,g)=>[[m,_],[m+M,_],[m+M,_+g],[m,_+g]],c=l==="ne"||l==="se",h=l==="nw"||l==="ne",d=a(c?t:t+r,e,i-r,s),f=a(c?t+i-r:t,h?e+o:e,r,s-o);return[d,f]}function Xs(n){let t=0;for(let e=0;e<n.length;e++){const[i,s]=n[e],[r,o]=n[(e+1)%n.length];t+=i*o-r*s}return Math.abs(t)/2}const ls=n=>Xs(mn(n));function iu(n){let t=0,e=0,i=0;for(let s=0;s<n.length;s++){const[r,o]=n[s],[l,a]=n[(s+1)%n.length],c=r*a-l*o;t+=c,e+=(r+l)*c,i+=(o+a)*c}return Math.abs(t)<on?n[0]:[e/(3*t),i/(3*t)]}function ul(n){const t=$s(n),e=t.reduce((i,s)=>Xs(s)>Xs(i)?s:i,t[0]);return iu(e)}function dl([n,t],e){let i=!1;for(let s=0,r=e.length-1;s<e.length;r=s++){const[o,l]=e[s],[a,c]=e[r];l>t!=c>t&&n<(a-o)*(t-l)/(c-l)+o&&(i=!i)}return i}function su(n,t){const e=Vs(n,t);if(e[0]<n.x-on||e[0]>n.x+n.width+on||e[1]<n.z-on||e[1]>n.z+n.depth+on)return!1;if(pn(n)==="rect")return!0;const i=Ws(n);return dl(e,i)||bi(i,e).dist<.001}function bi(n,[t,e]){let i=null;for(let s=0;s<n.length;s++){const[r,o]=n[s],[l,a]=n[(s+1)%n.length],c=l-r,h=a-o,d=c*c+h*h||1,f=Math.min(1,Math.max(0,((t-r)*c+(e-o)*h)/d)),m=r+c*f,_=o+h*f,M=Math.hypot(t-m,e-_);if(!i||M<i.dist){const g=Math.sqrt(d);i={point:[m,_],normal:[-h/g,c/g],dist:M}}}return i}function ru(n,t,e){for(const i of[n,t])for(let s=0;s<i.length;s++){const[r,o]=i[s],[l,a]=i[(s+1)%i.length],c=Math.hypot(l-r,a-o)||1,h=-(a-o)/c,d=(l-r)/c,f=M=>M.map(([g,p])=>g*h+p*d),m=f(n),_=f(t);if(Math.max(...m)<=Math.min(..._)+e||Math.max(..._)<=Math.min(...m)+e)return!0}return!1}function so(n){if(!me(n))return{minX:n.x,minZ:n.z,maxX:n.x+n.width,maxZ:n.z+n.depth};const t=mn(n),e=t.map(s=>s[0]),i=t.map(s=>s[1]);return{minX:Math.min(...e),minZ:Math.min(...i),maxX:Math.max(...e),maxZ:Math.max(...i)}}function ou(n,t,e=.01){const i=so(n),s=so(t),r=Math.min(i.maxX,s.maxX)-Math.max(i.minX,s.minX),o=Math.min(i.maxZ,s.maxZ)-Math.max(i.minZ,s.minZ);return r<=e||o<=e?!1:$s(n).some(l=>$s(t).some(a=>!ru(l,a,e)))}function au(n,t){let e=0;for(let o=0;o<t.length;o++){const[l,a]=t[o],[c,h]=t[(o+1)%t.length];e+=l*h-c*a}const i=e<0?[...t].reverse():t,s=[];let r=n;for(let o=0;o<i.length&&r;o++){const l=i[o],a=i[(o+1)%i.length],c=fl(r,a,l);c&&s.push(c),r=fl(r,l,a)}return s}function fl(n,t,e){const i=-(e[1]-t[1]),s=e[0]-t[0],r=([l,a])=>(l-t[0])*i+(a-t[1])*s,o=[];for(let l=0;l<n.length;l++){const a=n[l],c=n[(l+1)%n.length],h=r(a),d=r(c);if(h>=-on&&o.push(a),h>=-on!=d>=-on){const f=h/(h-d);o.push([a[0]+(c[0]-a[0])*f,a[1]+(c[1]-a[1])*f])}}return o.length>=3&&Xs(o)>1e-6?o:null}const Dn=.12,lu=.04,Ve=.001;function pl(n){return n.map((t,e)=>{const i=n[(e+1)%n.length],s=Math.hypot(i[0]-t[0],i[1]-t[1])||1,r=[(i[0]-t[0])/s,(i[1]-t[1])/s];return{p:t,len:s,u:r,n:[-r[1],r[0]]}})}function cu(n,t){if(n.u[0]*t.u[0]+n.u[1]*t.u[1]>-1+1e-6)return null;const e=(t.p[0]-n.p[0])*n.n[0]+(t.p[1]-n.p[1])*n.n[1];if(Math.abs(e)>Ve)return null;const s=(a=>(a[0]-n.p[0])*n.u[0]+(a[1]-n.p[1])*n.u[1])(t.p),r=s-t.len,o=Math.max(0,Math.min(s,r)),l=Math.min(n.len,Math.max(s,r));return l-o>Ve?[o,l]:null}function ml(n,t){const e=t.x2-t.x1,i=t.z2-t.z1,s=Math.hypot(e,i);if(s<Ve||Math.abs((e*n.u[1]-i*n.u[0])/s)>.001)return null;const r=(t.x1-n.p[0])*n.n[0]+(t.z1-n.p[1])*n.n[1];if(Math.abs(r)>.02)return null;const o=(d,f)=>(d-n.p[0])*n.u[0]+(f-n.p[1])*n.u[1],l=o(t.x1,t.z1),a=o(t.x2,t.z2),c=Math.max(0,Math.min(l,a)),h=Math.min(n.len,Math.max(l,a));return h-c>Ve?[c,h]:null}const gl=(n,t,e)=>n[1]>t+Ve&&n[0]<e-Ve;function qs(n,t){let e=n;for(const[i,s]of t){const r=[];for(const[o,l]of e){if(s<=o+Ve||i>=l-Ve){r.push([o,l]);continue}i>o+Ve&&r.push([o,i]),s<l-Ve&&r.push([s,l])}e=r}return e.filter(([i,s])=>s-i>Ve)}function hu(n,t=[],e=[]){const i=[],s=d=>d.type==="corridor",r=n.map(d=>({room:d,edges:pl(mn(d))})),o=Dn,l=lu;function a(d,f,m,_,M=[[0,d.len]]){const g=f.filter(P=>P.type==="door").map(P=>P.range),p=f.filter(P=>P.type==="glass").map(P=>P.range),R=P=>p.some(L=>gl(L,P[0],P[1])),T=g.filter(P=>!R(P)),b=g.filter(R),k=qs(p,g);for(const P of qs(M,[...g,...p]))i.push({quad:m(P),len:P[1]-P[0],kind:"wall"});for(const P of T)i.push({quad:m(P),len:P[1]-P[0],kind:"lintel"});for(const P of k){const L=_(P);L&&i.push({quad:L,len:P[1]-P[0],kind:"glass"})}for(const P of b){const L=_(P);L&&i.push({quad:L,len:P[1]-P[0],kind:"transom"})}}const c=(d,f)=>[d.p[0]+d.u[0]*f,d.p[1]+d.u[1]*f],h=(d,f,m)=>{const[_,M]=c(d,f);return[_+d.n[0]*m,M+d.n[1]*m]};for(const{room:d,edges:f}of r){const m=f.map((_,M)=>{const g=f[(M+f.length-1)%f.length],p=o/(1+g.n[0]*_.n[0]+g.n[1]*_.n[1]);return[_.p[0]+(g.n[0]+_.n[0])*p,_.p[1]+(g.n[1]+_.n[1])*p]});f.forEach((_,M)=>{const g=[];for(const P of r)if(P.room!==d)for(const L of P.edges){const O=cu(_,L);O&&g.push({a:O[0],b:O[1],corridor:s(P.room),id:P.room.id})}let p=t.map(P=>({type:P.type,range:ml(_,P)})).filter(P=>P.range),R=[[0,_.len]];if(s(d)){const P=g.map(L=>[L.a,L.b]);R=qs(R,P),p=p.flatMap(L=>qs([L.range],P).map(O=>({type:L.type,range:O})))}const T=P=>P<Ve?m[M]:P>_.len-Ve?m[(M+1)%f.length]:h(_,P,o);a(_,p,([P,L])=>[c(_,P),c(_,L),T(L),T(P)],([P,L])=>{const O=g.find(U=>!U.corridor&&gl([P,L],U.a,U.b));if(O&&O.id<d.id)return null;const[C,w]=O?[-l/2,l/2]:[o/2-l/2,o/2+l/2];return[h(_,P,C),h(_,L,C),h(_,L,w),h(_,P,w)]},R)})}for(const d of e){const[f]=pl([[d.x1,d.z1],[d.x2,d.z2]]),m=t.map(M=>({type:M.type,range:ml(f,M)})).filter(M=>M.range),_=(M,g)=>([p,R])=>[h(f,p,M),h(f,R,M),h(f,R,g),h(f,p,g)];a(f,m,_(-o/2,o/2),_(-l/2,l/2))}return i}const _l={"u-left":"Zweiläufig, Antritt links","u-right":"Zweiläufig, Antritt rechts",straight:"Einläufig (gerade)"},xl={n:"nach oben (Norden)",e:"nach rechts (Osten)",s:"nach unten (Süden)",w:"nach links (Westen)"},ro=["n","e","s","w"],uu=n=>ro[(ro.indexOf(n)+1)%4]??"n",du=.18,fu=.15,pu=.15,mu=1.1,gu=1.8,_u=1.8,Ys=.1,xu=.12,vl=.9,Ml=.8,Sl=2*Ml+mu+2*Ys;function yl(n){return!n.elevator||n.stairShape==="straight"?!1:(n.stairDir==="n"||n.stairDir==="s"?n.width:n.depth)-Dn*2>=Sl-1e-6}function cs(n,t){const e=ro.includes(n.stairDir)?n.stairDir:"n",i=e==="n"||e==="s",s=n.x+Dn,r=n.z+Dn,o=Math.max(.2,n.width-Dn*2),l=Math.max(.2,n.depth-Dn*2),a=i?o:l,c=i?l:o,h=n.stairShape==="u-right",d=(b,k)=>{const P=h?a-b:b;switch(e){case"s":return[s+o-P,r+k];case"n":return[s+P,r+l-k];case"e":return[s+k,r+P];default:return[s+o-k,r+l-P]}},f=(b,k,P,L,O)=>{const[C,w]=d(b,k),[U,Y]=d(b+P,k+L);return{x:Math.min(C,U),z:Math.min(w,Y),w:Math.abs(U-C),d:Math.abs(Y-w),top:O}},m=Math.max(2,Math.round(t/du)),_=t/m,M=[],g=[];let p,R,T=null;if(n.stairShape==="straight"){const b=Math.min(1,c*.2),k=c-b,P=k/m;for(let L=0;L<m;L++)M.push(f(0,L*P,a,P,(L+1)*_));p=[[a/2,pu],[a/2,k+b/2]],R=f(0,0,a,k)}else{const b=yl(n),k=b?Math.min(gu,a-2*Ml-2*Ys):0,P=b?k+2*Ys:fu,L=Math.max(.3,(a-P)/2),O=Math.min(Math.max(L,.8),c*.3),C=c-O*2,w=Math.ceil(m/2),U=m-w,Y=C/w;for(let W=0;W<w;W++)M.push(f(0,O+W*Y,L,Y,(W+1)*_));const V=w*_;g.push(f(0,c-O,a,O,V));const X=C/U;for(let W=0;W<U;W++)M.push(f(a-L,c-O-(W+1)*X,L,X,V+(W+1)*_));const et=c-O/2;if(p=[[L/2,O/2],[L/2,et],[a-L/2,et],[a-L/2,O/2]],R=f(0,O,a,c-O),b){const W=L+Ys,K=O,H=Math.min(_u,C),ct=xu,Mt=(k-vl)/2;T={shaft:f(W,K,k,H),walls:[f(W,K+H-ct,k,ct),f(W,K+ct,ct,H-2*ct),f(W+k-ct,K+ct,ct,H-2*ct),f(W,K,Mt,ct),f(W+k-Mt,K,Mt,ct)],door:f(W+Mt,K,vl,ct)};for(const It of[T.shaft,...T.walls,T.door])delete It.top}}return delete R.top,{steps:M,landings:g,opening:R,elevator:T,path:p.map(([b,k])=>d(b,k))}}const Zs=.3;function bl(n={}){return{id:Ue("w"),x1:0,z1:0,x2:1,z2:0,...n}}function vu(n){const t=[n==null?void 0:n.x1,n==null?void 0:n.z1,n==null?void 0:n.x2,n==null?void 0:n.z2].map(Number);return!t.every(Number.isFinite)||Math.hypot(t[2]-t[0],t[3]-t[1])<.05?null:{id:n.id||Ue("w"),x1:t[0],z1:t[1],x2:t[2],z2:t[3]}}const oo=n=>Math.hypot(n.x2-n.x1,n.z2-n.z1);function El(n,[t,e]){const i=n.x2-n.x1,s=n.z2-n.z1,r=i*i+s*s||1,o=Math.min(1,Math.max(0,((t-n.x1)*i+(e-n.z1)*s)/r));return Math.hypot(t-(n.x1+i*o),e-(n.z1+s*o))}const De=(n,t)=>Number.isFinite(Number(n))?Number(n):t;function Mu(n={}){return{id:Ue("r"),name:"Raum",type:"office",x:0,z:0,width:4,depth:4,rotation:0,shape:"rect",cutCorner:"ne",cutW:2,cutD:2,color:null,occupant:"",description:"",tanks:[],printers:[],stairShape:"u-left",stairDir:"n",elevator:!1,...n}}const hs=(n,t)=>jn(n,[n.x+t.x,n.z+t.z]),Kn=.4;function Su(n={}){return{id:Ue("t"),name:"BT 1",x:1,z:1,ports:[],...n}}function yu(n){const t=n.tanks.map(e=>{var i;return Number(((i=/(\d+)\s*$/.exec(e.name))==null?void 0:i[1])??0)});return`BT ${Math.max(0,...t)+1}`}const Jn=.6,us=.5;function bu(n={}){return{id:Ue("p"),name:"Drucker",ip:"",x:1,z:1,...n}}function Eu(n){const t=n.floors.flatMap(e=>e.rooms.flatMap(i=>i.printers.map(s=>{var r;return Number(((r=/^Drucker (\d+)$/.exec(s.name))==null?void 0:r[1])??0)})));return`Drucker ${Math.max(0,...t)+1}`}const wl=n=>/^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/.test(String(n).trim()),js=(n,t,e)=>Math.round(Math.min(Math.max(n,t),Math.max(t,e-t))*100)/100;function Tl(n,t,e,i){const s=[t.x+n.x,t.z+n.z];if(dl(s,e)){const{dist:r,normal:o}=bi(e,s);if(r>=i)return;n.x+=o[0]*(i-r),n.z+=o[1]*(i-r)}else{const{point:r,normal:o}=bi(e,s);n.x=r[0]+o[0]*i-t.x,n.z=r[1]+o[1]*i-t.z}n.x=Math.round(n.x*100)/100,n.z=Math.round(n.z*100)/100}function gn(n){const t=pn(n)==="rect"?null:Ws(n);for(const e of n.tanks)t&&Tl(e,n,t,Kn/2),e.x=js(e.x,Kn/2,n.width),e.z=js(e.z,Kn/2,n.depth);for(const e of n.printers)t&&Tl(e,n,t,Jn/2),e.x=js(e.x,Jn/2,n.width),e.z=js(e.z,us/2,n.depth)}function Al(n,t={}){return{...n,id:Ue("r"),tanks:n.tanks.map(e=>({...e,id:Ue("t"),ports:e.ports.map(i=>({...i}))})),printers:n.printers.map(e=>({...e,id:Ue("p")})),...t}}function Ks(n={}){return{id:Ue("f"),name:"Etage",height:3,rooms:[],...n}}function Rl(n){return!n||typeof n.src!="string"||!n.src?null:{src:n.src,x:De(n.x,0),z:De(n.z,0),width:Math.max(.5,De(n.width,20)),ratio:Math.max(.01,De(n.ratio,.75)),opacity:Math.min(1,Math.max(.02,De(n.opacity,.15))),visible:n.visible!==!1}}function wu(n){const t=[n==null?void 0:n.x1,n==null?void 0:n.z1,n==null?void 0:n.x2,n==null?void 0:n.z2].map(Number);return!t.every(Number.isFinite)||Math.hypot(t[2]-t[0],t[3]-t[1])<.05?null:{id:n.id||Ue("o"),type:n.type==="glass"?"glass":"door",x1:t[0],z1:t[1],x2:t[2],z2:t[3],swing:[0,1,2,3].includes(n.swing)?n.swing:0}}function Js(n){return n===0?"Erdgeschoss":n>0?`${n}. Obergeschoss`:`${-n}. Untergeschoss`}function ao(n){return Math.max(0,n.floors.findIndex(t=>t.id===n.groundFloorId))}function lo(n){var e;if(!n.rooms.length&&!((e=n.walls)!=null&&e.length))return null;const t={minX:1/0,minZ:1/0,maxX:-1/0,maxZ:-1/0};for(const i of n.rooms){const s=so(i);t.minX=Math.min(t.minX,s.minX),t.minZ=Math.min(t.minZ,s.minZ),t.maxX=Math.max(t.maxX,s.maxX),t.maxZ=Math.max(t.maxZ,s.maxZ)}for(const i of n.walls??[])t.minX=Math.min(t.minX,i.x1,i.x2),t.minZ=Math.min(t.minZ,i.z1,i.z2),t.maxX=Math.max(t.maxX,i.x1,i.x2),t.maxZ=Math.max(t.maxZ,i.z1,i.z2);return t}function Ln(n){if(!n||!Array.isArray(n.floors))throw new Error('Ungültige Gebäudedatei: Feld "floors" fehlt.');const t=n.floors.map((i,s)=>({id:i.id||Ue("f"),name:String(i.name??Js(s)),height:Math.max(2,De(i.height,3)),...Rl(i.underlay)?{underlay:Rl(i.underlay)}:{},...Array.isArray(i.openings)&&i.openings.length?{openings:i.openings.map(wu).filter(Boolean)}:{},...Array.isArray(i.walls)&&i.walls.length?{walls:i.walls.map(vu).filter(Boolean)}:{},rooms:(Array.isArray(i.rooms)?i.rooms:[]).map(r=>({id:r.id||Ue("r"),name:String(r.name??"Raum"),type:Hs[r.type]?r.type:"other",x:De(r.x,0),z:De(r.z,0),width:Math.max(.5,De(r.width,4)),depth:Math.max(.5,De(r.depth,4)),rotation:no(r.rotation),shape:hl[r.shape]?r.shape:"rect",cutCorner:to[r.cutCorner]?r.cutCorner:"ne",cutW:De(r.cutW,2),cutD:De(r.cutD,2),color:r.color||null,occupant:String(r.occupant??""),description:String(r.description??""),stairShape:_l[r.stairShape]?r.stairShape:"u-left",stairDir:xl[r.stairDir]?r.stairDir:"n",elevator:!!r.elevator,tanks:(Array.isArray(r.tanks)?r.tanks:[]).map((o,l)=>({id:o.id||Ue("t"),name:String(o.name??`BT ${l+1}`),x:De(o.x,1),z:De(o.z,1),ports:(Array.isArray(o.ports)?o.ports:[]).map(a=>({name:String(typeof a=="string"?a:(a==null?void 0:a.name)??""),switch:String((a==null?void 0:a.switch)??""),switchPort:String((a==null?void 0:a.switchPort)??"")}))})),printers:(Array.isArray(r.printers)?r.printers:[]).map((o,l)=>({id:o.id||Ue("p"),name:String(o.name??`Drucker ${l+1}`),ip:String(o.ip??""),x:De(o.x,1),z:De(o.z,1)}))}))}));for(const i of t)for(const s of i.rooms)as(s);t.length||t.push(Ks({name:Js(0)}));const e=t.some(i=>i.id===n.groundFloorId)?n.groundFloorId:t[0].id;return{name:String(n.name??"Gebäude"),groundFloorId:e,floors:t}}const Tu={standard:"standard.json"},Au={name:"Testbüro",floors:[{id:"f-eg",name:"Erdgeschoss",height:3,rooms:[{id:"r-flur",name:"Flur",type:"corridor",x:0,z:5.5,width:30,depth:2.2,color:null,occupant:"",description:"Hauptflur",tanks:[],printers:[{id:"p-flur",name:"Drucker Flur",ip:"192.168.10.50",x:15,z:.45}]},{id:"r-101",name:"Büro 101",type:"office",x:1.5,z:0,width:9,depth:5.5,color:null,occupant:"Team Vertrieb",description:"4 Arbeitsplätze",tanks:[{id:"t-101-1",name:"BT 1",x:3,z:2.75,ports:[{name:"P01/01",switch:"Switch 1",switchPort:"1"},{name:"P01/02",switch:"Switch 1",switchPort:"2"},{name:"P01/03",switch:"Switch 1",switchPort:"3"},{name:"P01/04",switch:"Switch 1",switchPort:"4"},{name:"P01/05",switch:"Switch 1",switchPort:"5"},{name:"P01/06",switch:"Switch 1",switchPort:"6"}]},{id:"t-101-2",name:"BT 2",x:6,z:2.75,ports:[{name:"P01/07",switch:"Switch 1",switchPort:"7"},{name:"P01/08",switch:"Switch 1",switchPort:"8"},{name:"P01/09",switch:"Switch 1",switchPort:"9"},{name:"P01/10",switch:"Switch 1",switchPort:"10"},{name:"P01/11",switch:"Switch 1",switchPort:"11"},{name:"P01/12",switch:"Switch 1",switchPort:"12"}]}],printers:[]},{id:"r-102",name:"Büro 102",type:"office",x:10.5,z:0,width:9,depth:5.5,color:null,occupant:"Team Marketing",description:"4 Arbeitsplätze",tanks:[{id:"t-102-1",name:"BT 1",x:3,z:2.75,ports:[{name:"P01/13",switch:"Switch 1",switchPort:"13"},{name:"P01/14",switch:"Switch 1",switchPort:"14"},{name:"P01/15",switch:"Switch 1",switchPort:"15"},{name:"P01/16",switch:"Switch 1",switchPort:"16"},{name:"P01/17",switch:"Switch 1",switchPort:"17"},{name:"P01/18",switch:"Switch 1",switchPort:"18"}]},{id:"t-102-2",name:"BT 2",x:6,z:2.75,ports:[{name:"P01/19",switch:"Switch 1",switchPort:"19"},{name:"P01/20",switch:"Switch 1",switchPort:"20"},{name:"P01/21",switch:"Switch 1",switchPort:"21"},{name:"P01/22",switch:"Switch 1",switchPort:"22"},{name:"P01/23",switch:"Switch 1",switchPort:"23"},{name:"P01/24",switch:"Switch 1",switchPort:"24"}]}],printers:[{id:"p-102",name:"Drucker Marketing",ip:"192.168.10.51",x:8.3,z:.5}]},{id:"r-103",name:"Büro 103",type:"office",x:19.5,z:0,width:9,depth:5.5,color:null,occupant:"Geschäftsleitung",description:"2 Arbeitsplätze",tanks:[{id:"t-103-1",name:"BT 1",x:3,z:2.75,ports:[{name:"P02/01",switch:"Switch 1",switchPort:"25"},{name:"P02/02",switch:"Switch 1",switchPort:"26"},{name:"P02/03",switch:"Switch 1",switchPort:"27"},{name:"P02/04",switch:"Switch 1",switchPort:"28"},{name:"P02/05",switch:"Switch 1",switchPort:"29"},{name:"P02/06",switch:"Switch 1",switchPort:"30"}]},{id:"t-103-2",name:"BT 2",x:6,z:2.75,ports:[{name:"P02/07",switch:"Switch 1",switchPort:"31"},{name:"P02/08",switch:"Switch 1",switchPort:"32"},{name:"P02/09",switch:"Switch 1",switchPort:"33"},{name:"P02/10",switch:"Switch 1",switchPort:"34"},{name:"P02/11",switch:"Switch 1",switchPort:"35"},{name:"P02/12",switch:"Switch 1",switchPort:"36"}]}],printers:[]},{id:"r-104",name:"Büro 104",type:"office",x:1.5,z:7.7,width:9,depth:5.5,color:null,occupant:"Team IT",description:"5 Arbeitsplätze",tanks:[{id:"t-104-1",name:"BT 1",x:3,z:2.75,ports:[{name:"P02/13",switch:"Switch 1",switchPort:"37"},{name:"P02/14",switch:"Switch 1",switchPort:"38"},{name:"P02/15",switch:"Switch 1",switchPort:"39"},{name:"P02/16",switch:"Switch 1",switchPort:"40"},{name:"P02/17",switch:"Switch 1",switchPort:"41"},{name:"P02/18",switch:"Switch 1",switchPort:"42"}]},{id:"t-104-2",name:"BT 2",x:6,z:2.75,ports:[{name:"P02/19",switch:"Switch 1",switchPort:"43"},{name:"P02/20",switch:"Switch 1",switchPort:"44"},{name:"P02/21",switch:"Switch 1",switchPort:"45"},{name:"P02/22",switch:"Switch 1",switchPort:"46"},{name:"P02/23",switch:"Switch 1",switchPort:"47"},{name:"P02/24",switch:"Switch 1",switchPort:"48"}]}],printers:[]},{id:"r-105",name:"Besprechung 105",type:"meeting",x:10.5,z:7.7,width:9,depth:5.5,color:null,occupant:"",description:"12 Sitzplätze, Beamer",tanks:[{id:"t-105-1",name:"BT 1",x:3,z:2.75,ports:[{name:"P03/01",switch:"Switch 2",switchPort:"1"},{name:"P03/02",switch:"Switch 2",switchPort:"2"},{name:"P03/03",switch:"Switch 2",switchPort:"3"},{name:"P03/04",switch:"Switch 2",switchPort:"4"}]},{id:"t-105-2",name:"BT 2",x:6,z:2.75,ports:[{name:"P03/05",switch:"Switch 2",switchPort:"5"},{name:"P03/06",switch:"Switch 2",switchPort:"6"},{name:"P03/07",switch:"Switch 2",switchPort:"7"},{name:"P03/08",switch:"Switch 2",switchPort:"8"}]}],printers:[]},{id:"r-106",name:"Teeküche 106",type:"kitchen",x:19.5,z:7.7,width:9,depth:5.5,color:null,occupant:"",description:"Kaffee, Kühlschrank, Spülmaschine",tanks:[{id:"t-106-1",name:"BT 1",x:4.5,z:2.75,ports:[{name:"P03/09",switch:"Switch 2",switchPort:"9"},{name:"P03/10",switch:"Switch 2",switchPort:"10"}]}],printers:[]}],openings:[{id:"o-101",type:"door",swing:2,x1:5.5,z1:5.5,x2:6.5,z2:5.5},{id:"o-102",type:"door",swing:2,x1:14.5,z1:5.5,x2:15.5,z2:5.5},{id:"o-103",type:"door",swing:2,x1:23.5,z1:5.5,x2:24.5,z2:5.5},{id:"o-104",type:"door",swing:0,x1:5.5,z1:7.7,x2:6.5,z2:7.7},{id:"o-105",type:"door",swing:0,x1:14.5,z1:7.7,x2:15.5,z2:7.7},{id:"o-106",type:"door",swing:0,x1:23.5,z1:7.7,x2:24.5,z2:7.7}]}]},Ru=100,Pu=300,Pl="config.json",co={standard:"standard.json"},Qs="buero3d.building.v2",Cu=location.protocol==="file:",tr=n=>JSON.stringify(n),er=new Map,Cl=new Map,ho=n=>JSON.stringify(n,(t,e)=>{if(t!=="src"||typeof e!="string"||!e.startsWith("data:"))return e;let i=Cl.get(e);return i||(i=`pool:${er.size+1}`,er.set(i,e),Cl.set(e,i)),i}),Dl=n=>JSON.parse(n,(t,e)=>t==="src"&&er.has(e)?er.get(e):e);function uo(){try{const n=localStorage.getItem(Qs);if(!n)return null;const t=JSON.parse(n);return t.building?t:{building:t,basedOn:null}}catch{return null}}async function Ll(n){if(Cu){if(n===Pl)return Tu;if(n===co.standard)return Au;throw new Error(`${n}: über file:// nicht ladbar, nur die beim Build eingebettete standard.json`)}const t=await fetch(n,{cache:"no-store"});if(!t.ok)throw new Error(`${n}: HTTP ${t.status}`);return t.json()}class Du extends EventTarget{constructor(){super(),this.config={...co},this.building=Ln(os()),this.standard=null,this.standardError=null,this.isDraft=!1,this.draftOutdated=!1,this.undoStack=[],this.redoStack=[],this.saveTimer=null,this.status={state:"loading"}}async init(){try{this.config={...co,...await Ll(Pl)}}catch{}await this.loadStandard();const t=uo();t?(this.building=Ln(t.building),this.isDraft=!0,this.draftOutdated=!!this.standard&&t.basedOn!==tr(this.standard)):this.building=structuredClone(this.standard??Ln(os())),this.updateStatus(),window.addEventListener("storage",e=>{e.key===Qs&&this.reloadFromStorage()})}async loadStandard(){try{const t=await Ll(this.config.standard);this.standard=Ln(t.building??t),this.standardError=null}catch(t){this.standard=null,this.standardError=t.message}}reloadFromStorage(){const t=uo();this.isDraft=!!t,this.building=t?Ln(t.building):structuredClone(this.standard??Ln(os())),this.undoStack=[],this.redoStack=[],this.updateStatus(),this.emit("remote")}get canUndo(){return this.undoStack.length>0}get canRedo(){return this.redoStack.length>0}checkpoint(){this.undoStack.push(ho(this.building)),this.undoStack.length>Ru&&this.undoStack.shift(),this.redoStack=[]}mutate(t,{checkpoint:e=!0}={}){e&&this.checkpoint(),t(this.building),this.commit("mutate")}replace(t){const e=Ln(t);this.checkpoint(),this.building=e,this.commit("replace")}undo(){this.canUndo&&(this.redoStack.push(ho(this.building)),this.building=Dl(this.undoStack.pop()),this.commit("undo"))}redo(){this.canRedo&&(this.undoStack.push(ho(this.building)),this.building=Dl(this.redoStack.pop()),this.commit("redo"))}commit(t){this.isDraft||(this.isDraft=!0,this.draftOutdated=!1,this.updateStatus()),this.emit(t),clearTimeout(this.saveTimer),this.saveTimer=setTimeout(()=>this.saveDraft(),Pu)}saveDraft(){var e;if(clearTimeout(this.saveTimer),!this.isDraft)return;const t=((e=uo())==null?void 0:e.basedOn)??(this.standard?tr(this.standard):null);try{localStorage.setItem(Qs,JSON.stringify({basedOn:t,savedAt:new Date().toISOString(),building:this.building})),this.updateStatus()}catch(i){this.setStatus("error",`Entwurf konnte nicht gespeichert werden: ${i.message}`)}}async discardDraft(){clearTimeout(this.saveTimer),await this.loadStandard();try{localStorage.removeItem(Qs)}catch{}this.checkpoint(),this.building=structuredClone(this.standard??Ln(os())),this.isDraft=!1,this.draftOutdated=!1,this.updateStatus(),this.emit("replace")}get matchesStandard(){return!!this.standard&&tr(this.building)===tr(this.standard)}updateStatus(){this.isDraft?this.setStatus("draft"):this.standardError?this.setStatus("fallback",this.standardError):this.setStatus("standard")}setStatus(t,e=""){this.status={state:t,message:e},this.dispatchEvent(new CustomEvent("status",{detail:this.status}))}emit(t){this.dispatchEvent(new CustomEvent("change",{detail:{source:t}}))}subscribe(t){const e=i=>t(i.detail);return this.addEventListener("change",e),()=>this.removeEventListener("change",e)}on(t,e){const i=s=>e(s.detail);return this.addEventListener(t,i),()=>this.removeEventListener(t,i)}}const vt=new Du,Lu={loading:"Lädt …",standard:"Standard",draft:"Entwurf (nur in diesem Browser)",fallback:"Testgebäude",error:"Entwurf nicht gespeichert"},fo={standard:()=>`Veröffentlichter Stand aus ${vt.config.standard}`,draft:()=>"Änderungen sind nur in diesem Browser gespeichert. Zum Veröffentlichen im Editor exportieren.",fallback:()=>`Standard-Datei nicht gefunden (${vt.config.standard}) – es wird das Testgebäude gezeigt.`};async function Iu(n,t){const e=document.getElementById("app"),i=document.getElementById("banner");function s(){document.getElementById("building-name").textContent=vt.building.name}function r(){var h;const l=document.getElementById("sync-status"),{state:a,message:c}=vt.status;l.className=`sync-status is-${a}`,l.textContent=Lu[a]??a,l.title=[(h=fo[a])==null?void 0:h.call(fo),c].filter(Boolean).join(`
`)}function o(){const l=[];vt.isDraft&&vt.draftOutdated?l.push(`
        <div class="banner banner-warn">
          <span>Der <strong>Standard wurde geändert</strong>, seit dein Entwurf begonnen wurde. Dein Entwurf enthält diese Änderungen nicht.</span>
          <button class="btn sm" data-banner="discard">Neuen Standard laden</button>
          <button class="btn sm" data-banner="dismiss">Entwurf behalten</button>
        </div>`):vt.isDraft,vt.status.state==="fallback"&&n==="editor"&&l.push(`
        <div class="banner banner-warn">
          <span>Standard-Datei <strong>${ee(vt.config.standard)}</strong> nicht gefunden – es wird das Testgebäude gezeigt.</span>
        </div>`),i.innerHTML=l.join(""),i.hidden=!l.length}i.addEventListener("click",async l=>{var c;const a=(c=l.target.closest("[data-banner]"))==null?void 0:c.dataset.banner;if(a==="discard"){if(!vt.matchesStandard&&!confirm("Entwurf verwerfen und den Standard laden? (Rückgängig ist im Editor möglich)"))return;await vt.discardDraft()}a==="dismiss"&&(vt.draftOutdated=!1),o()}),vt.subscribe(s),vt.on("status",()=>{r(),o()}),e.innerHTML='<div class="app-loading">Lädt …</div>',r(),await vt.init(),s(),r(),e.innerHTML="",t(e),o()}const Il={door:"Tür",glass:"Glaswand"},Uu=1,ds=.3,fs=.02;function Ul(n={}){return{id:Ue("o"),type:"door",x1:0,z1:0,x2:1,z2:0,swing:0,...n}}const ps=n=>Math.hypot(n.x2-n.x1,n.z2-n.z1);function nr(n){const t=ps(n)||1;return[(n.x2-n.x1)/t,(n.z2-n.z1)/t]}function Nu(n,[t,e],i,s=[]){let r=null;const o=(l,a,c)=>{var M;const h=Math.hypot(a[0]-l[0],a[1]-l[1]);if(h<1e-6)return;const d=[(a[0]-l[0])/h,(a[1]-l[1])/h],f=Math.min(h,Math.max(0,(t-l[0])*d[0]+(e-l[1])*d[1])),m=Math.hypot(t-(l[0]+d[0]*f),e-(l[1]+d[1]*f)),_=!r||m<r.dist-1e-6||m<r.dist+1e-6&&((M=r.room)==null?void 0:M.type)==="corridor";m<=i&&_&&(r={room:c,p:l,u:d,len:h,t:f,dist:m})};for(const l of n){const a=mn(l);a.forEach((c,h)=>o(c,a[(h+1)%a.length],l))}for(const l of s)o([l.x1,l.z1],[l.x2,l.z2],null);return r}const Ei=(n,t)=>[n.p[0]+n.u[0]*t,n.p[1]+n.u[1]*t];function po(n,t){const e=mn(t);return bi(e,[n.x1,n.z1]).dist<fs&&bi(e,[n.x2,n.z2]).dist<fs&&bi(e,[(n.x1+n.x2)/2,(n.z1+n.z2)/2]).dist<fs}const mo=(n,t)=>El(t,[n.x1,n.z1])<fs&&El(t,[n.x2,n.z2])<fs,ir=(n,t)=>t.rooms.some(e=>po(n,e))||(t.walls??[]).some(e=>mo(n,e));function In(n,t,e){n.x1=le(n.x1+t),n.z1=le(n.z1+e),n.x2=le(n.x2+t),n.z2=le(n.z2+e)}const le=n=>Math.round(n*1e3)/1e3;/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const go="170",wi={ROTATE:0,DOLLY:1,PAN:2},Ti={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ou=0,Nl=1,Fu=2,Ol=1,Fl=2,_n=3,Un=0,Be=1,xn=2,Nn=0,Ai=1,zl=2,Bl=3,kl=4,zu=5,Qn=100,Bu=101,ku=102,Hu=103,Gu=104,Vu=200,Wu=201,$u=202,Xu=203,_o=204,xo=205,qu=206,Yu=207,Zu=208,ju=209,Ku=210,Ju=211,Qu=212,td=213,ed=214,vo=0,Mo=1,So=2,Ri=3,yo=4,bo=5,Eo=6,wo=7,Hl=0,nd=1,id=2,On=0,sd=1,rd=2,od=3,ad=4,ld=5,cd=6,hd=7,Gl=300,Pi=301,Ci=302,To=303,Ao=304,sr=306,Ro=1e3,ti=1001,Po=1002,Je=1003,ud=1004,rr=1005,an=1006,Co=1007,ei=1008,vn=1009,Vl=1010,Wl=1011,ms=1012,Do=1013,ni=1014,Mn=1015,gs=1016,Lo=1017,Io=1018,Di=1020,$l=35902,Xl=1021,ql=1022,Qe=1023,Yl=1024,Zl=1025,Li=1026,Ii=1027,jl=1028,Uo=1029,Kl=1030,No=1031,Oo=1033,or=33776,ar=33777,lr=33778,cr=33779,Fo=35840,zo=35841,Bo=35842,ko=35843,Ho=36196,Go=37492,Vo=37496,Wo=37808,$o=37809,Xo=37810,qo=37811,Yo=37812,Zo=37813,jo=37814,Ko=37815,Jo=37816,Qo=37817,ta=37818,ea=37819,na=37820,ia=37821,hr=36492,sa=36494,ra=36495,Jl=36283,oa=36284,aa=36285,la=36286,dd=3200,fd=3201,Ql=0,pd=1,Fn="",Ye="srgb",Ui="srgb-linear",ur="linear",he="srgb",Ni=7680,tc=519,md=512,gd=513,_d=514,ec=515,xd=516,vd=517,Md=518,Sd=519,nc=35044,ic="300 es",Sn=2e3,dr=2001;class ii{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let sc=1234567;const Oi=Math.PI/180,_s=180/Math.PI;function si(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]).toLowerCase()}function Re(n,t,e){return Math.max(t,Math.min(e,n))}function ca(n,t){return(n%t+t)%t}function yd(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function bd(n,t,e){return n!==t?(e-n)/(t-n):0}function xs(n,t,e){return(1-e)*n+e*t}function Ed(n,t,e,i){return xs(n,t,1-Math.exp(-e*i))}function wd(n,t=1){return t-Math.abs(ca(n,t*2)-t)}function Td(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Ad(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Rd(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Pd(n,t){return n+Math.random()*(t-n)}function Cd(n){return n*(.5-Math.random())}function Dd(n){n!==void 0&&(sc=n);let t=sc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ld(n){return n*Oi}function Id(n){return n*_s}function Ud(n){return(n&n-1)===0&&n!==0}function Nd(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Od(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Fd(n,t,e,i,s){const r=Math.cos,o=Math.sin,l=r(e/2),a=o(e/2),c=r((t+i)/2),h=o((t+i)/2),d=r((t-i)/2),f=o((t-i)/2),m=r((i-t)/2),_=o((i-t)/2);switch(s){case"XYX":n.set(l*h,a*d,a*f,l*c);break;case"YZY":n.set(a*f,l*h,a*d,l*c);break;case"ZXZ":n.set(a*d,a*f,l*h,l*c);break;case"XZX":n.set(l*h,a*_,a*m,l*c);break;case"YXY":n.set(a*m,l*h,a*_,l*c);break;case"ZYZ":n.set(a*_,a*m,l*h,l*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Fi(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ne(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const vs={DEG2RAD:Oi,RAD2DEG:_s,generateUUID:si,clamp:Re,euclideanModulo:ca,mapLinear:yd,inverseLerp:bd,lerp:xs,damp:Ed,pingpong:wd,smoothstep:Td,smootherstep:Ad,randInt:Rd,randFloat:Pd,randFloatSpread:Cd,seededRandom:Dd,degToRad:Ld,radToDeg:Id,isPowerOfTwo:Ud,ceilPowerOfTwo:Nd,floorPowerOfTwo:Od,setQuaternionFromProperEuler:Fd,normalize:Ne,denormalize:Fi};class ft{constructor(t=0,e=0){ft.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Re(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Jt{constructor(t,e,i,s,r,o,l,a,c){Jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,l,a,c)}set(t,e,i,s,r,o,l,a,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=l,h[3]=e,h[4]=r,h[5]=a,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],l=i[3],a=i[6],c=i[1],h=i[4],d=i[7],f=i[2],m=i[5],_=i[8],M=s[0],g=s[3],p=s[6],R=s[1],T=s[4],b=s[7],k=s[2],P=s[5],L=s[8];return r[0]=o*M+l*R+a*k,r[3]=o*g+l*T+a*P,r[6]=o*p+l*b+a*L,r[1]=c*M+h*R+d*k,r[4]=c*g+h*T+d*P,r[7]=c*p+h*b+d*L,r[2]=f*M+m*R+_*k,r[5]=f*g+m*T+_*P,r[8]=f*p+m*b+_*L,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],l=t[5],a=t[6],c=t[7],h=t[8];return e*o*h-e*l*c-i*r*h+i*l*a+s*r*c-s*o*a}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],l=t[5],a=t[6],c=t[7],h=t[8],d=h*o-l*c,f=l*a-h*r,m=c*r-o*a,_=e*d+i*f+s*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/_;return t[0]=d*M,t[1]=(s*c-h*i)*M,t[2]=(l*i-s*o)*M,t[3]=f*M,t[4]=(h*e-s*a)*M,t[5]=(s*r-l*e)*M,t[6]=m*M,t[7]=(i*a-c*e)*M,t[8]=(o*e-i*r)*M,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,l){const a=Math.cos(r),c=Math.sin(r);return this.set(i*a,i*c,-i*(a*o+c*l)+o+t,-s*c,s*a,-s*(-c*o+a*l)+l+e,0,0,1),this}scale(t,e){return this.premultiply(ha.makeScale(t,e)),this}rotate(t){return this.premultiply(ha.makeRotation(-t)),this}translate(t,e){return this.premultiply(ha.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ha=new Jt;function rc(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function fr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function zd(){const n=fr("canvas");return n.style.display="block",n}const oc={};function Ms(n){n in oc||(oc[n]=!0,console.warn(n))}function Bd(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function kd(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Hd(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ae={enabled:!0,workingColorSpace:Ui,spaces:{},convert:function(n,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===he&&(n.r=yn(n.r),n.g=yn(n.g),n.b=yn(n.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(n.applyMatrix3(this.spaces[t].toXYZ),n.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===he&&(n.r=zi(n.r),n.g=zi(n.g),n.b=zi(n.b))),n},fromWorkingColorSpace:function(n,t){return this.convert(n,this.workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Fn?ur:this.spaces[n].transfer},getLuminanceCoefficients:function(n,t=this.workingColorSpace){return n.fromArray(this.spaces[t].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,t,e){return n.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function yn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function zi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const ac=[.64,.33,.3,.6,.15,.06],lc=[.2126,.7152,.0722],cc=[.3127,.329],hc=new Jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),uc=new Jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ae.define({[Ui]:{primaries:ac,whitePoint:cc,transfer:ur,toXYZ:hc,fromXYZ:uc,luminanceCoefficients:lc,workingColorSpaceConfig:{unpackColorSpace:Ye},outputColorSpaceConfig:{drawingBufferColorSpace:Ye}},[Ye]:{primaries:ac,whitePoint:cc,transfer:he,toXYZ:hc,fromXYZ:uc,luminanceCoefficients:lc,outputColorSpaceConfig:{drawingBufferColorSpace:Ye}}});let Bi;class Gd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Bi===void 0&&(Bi=fr("canvas")),Bi.width=t.width,Bi.height=t.height;const i=Bi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Bi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=fr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=yn(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(yn(e[i]/255)*255):e[i]=yn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Vd=0;class dc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vd++}),this.uuid=si(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,l=s.length;o<l;o++)s[o].isDataTexture?r.push(ua(s[o].image)):r.push(ua(s[o]))}else r=ua(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function ua(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Gd.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Wd=0;class ke extends ii{constructor(t=ke.DEFAULT_IMAGE,e=ke.DEFAULT_MAPPING,i=ti,s=ti,r=an,o=ei,l=Qe,a=vn,c=ke.DEFAULT_ANISOTROPY,h=Fn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wd++}),this.uuid=si(),this.name="",this.source=new dc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=l,this.internalFormat=null,this.type=a,this.offset=new ft(0,0),this.repeat=new ft(1,1),this.center=new ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Gl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ro:t.x=t.x-Math.floor(t.x);break;case ti:t.x=t.x<0?0:1;break;case Po:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ro:t.y=t.y-Math.floor(t.y);break;case ti:t.y=t.y<0?0:1;break;case Po:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ke.DEFAULT_IMAGE=null,ke.DEFAULT_MAPPING=Gl,ke.DEFAULT_ANISOTROPY=1;class Me{constructor(t=0,e=0,i=0,s=1){Me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const a=t.elements,c=a[0],h=a[4],d=a[8],f=a[1],m=a[5],_=a[9],M=a[2],g=a[6],p=a[10];if(Math.abs(h-f)<.01&&Math.abs(d-M)<.01&&Math.abs(_-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(d+M)<.1&&Math.abs(_+g)<.1&&Math.abs(c+m+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(c+1)/2,b=(m+1)/2,k=(p+1)/2,P=(h+f)/4,L=(d+M)/4,O=(_+g)/4;return T>b&&T>k?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=P/i,r=L/i):b>k?b<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),i=P/s,r=O/s):k<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(k),i=L/r,s=O/r),this.set(i,s,r,e),this}let R=Math.sqrt((g-_)*(g-_)+(d-M)*(d-M)+(f-h)*(f-h));return Math.abs(R)<.001&&(R=1),this.x=(g-_)/R,this.y=(d-M)/R,this.z=(f-h)/R,this.w=Math.acos((c+m+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $d extends ii{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Me(0,0,t,e),this.scissorTest=!1,this.viewport=new Me(0,0,t,e);const s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new ke(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let l=0;l<o;l++)this.textures[l]=r.clone(),this.textures[l].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new dc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ri extends $d{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class fc extends ke{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Xd extends ke{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class oi{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,l){let a=i[s+0],c=i[s+1],h=i[s+2],d=i[s+3];const f=r[o+0],m=r[o+1],_=r[o+2],M=r[o+3];if(l===0){t[e+0]=a,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(l===1){t[e+0]=f,t[e+1]=m,t[e+2]=_,t[e+3]=M;return}if(d!==M||a!==f||c!==m||h!==_){let g=1-l;const p=a*f+c*m+h*_+d*M,R=p>=0?1:-1,T=1-p*p;if(T>Number.EPSILON){const k=Math.sqrt(T),P=Math.atan2(k,p*R);g=Math.sin(g*P)/k,l=Math.sin(l*P)/k}const b=l*R;if(a=a*g+f*b,c=c*g+m*b,h=h*g+_*b,d=d*g+M*b,g===1-l){const k=1/Math.sqrt(a*a+c*c+h*h+d*d);a*=k,c*=k,h*=k,d*=k}}t[e]=a,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,s,r,o){const l=i[s],a=i[s+1],c=i[s+2],h=i[s+3],d=r[o],f=r[o+1],m=r[o+2],_=r[o+3];return t[e]=l*_+h*d+a*m-c*f,t[e+1]=a*_+h*f+c*d-l*m,t[e+2]=c*_+h*m+l*f-a*d,t[e+3]=h*_-l*d-a*f-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,l=Math.cos,a=Math.sin,c=l(i/2),h=l(s/2),d=l(r/2),f=a(i/2),m=a(s/2),_=a(r/2);switch(o){case"XYZ":this._x=f*h*d+c*m*_,this._y=c*m*d-f*h*_,this._z=c*h*_+f*m*d,this._w=c*h*d-f*m*_;break;case"YXZ":this._x=f*h*d+c*m*_,this._y=c*m*d-f*h*_,this._z=c*h*_-f*m*d,this._w=c*h*d+f*m*_;break;case"ZXY":this._x=f*h*d-c*m*_,this._y=c*m*d+f*h*_,this._z=c*h*_+f*m*d,this._w=c*h*d-f*m*_;break;case"ZYX":this._x=f*h*d-c*m*_,this._y=c*m*d+f*h*_,this._z=c*h*_-f*m*d,this._w=c*h*d+f*m*_;break;case"YZX":this._x=f*h*d+c*m*_,this._y=c*m*d+f*h*_,this._z=c*h*_-f*m*d,this._w=c*h*d-f*m*_;break;case"XZY":this._x=f*h*d-c*m*_,this._y=c*m*d-f*h*_,this._z=c*h*_+f*m*d,this._w=c*h*d+f*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],l=e[5],a=e[9],c=e[2],h=e[6],d=e[10],f=i+l+d;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-a)*m,this._y=(r-c)*m,this._z=(o-s)*m}else if(i>l&&i>d){const m=2*Math.sqrt(1+i-l-d);this._w=(h-a)/m,this._x=.25*m,this._y=(s+o)/m,this._z=(r+c)/m}else if(l>d){const m=2*Math.sqrt(1+l-i-d);this._w=(r-c)/m,this._x=(s+o)/m,this._y=.25*m,this._z=(a+h)/m}else{const m=2*Math.sqrt(1+d-i-l);this._w=(o-s)/m,this._x=(r+c)/m,this._y=(a+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Re(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,l=e._x,a=e._y,c=e._z,h=e._w;return this._x=i*h+o*l+s*c-r*a,this._y=s*h+o*a+r*l-i*c,this._z=r*h+o*c+i*a-s*l,this._w=o*h-i*l-s*a-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let l=o*t._w+i*t._x+s*t._y+r*t._z;if(l<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,l=-l):this.copy(t),l>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const a=1-l*l;if(a<=Number.EPSILON){const m=1-e;return this._w=m*o+e*this._w,this._x=m*i+e*this._x,this._y=m*s+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}const c=Math.sqrt(a),h=Math.atan2(c,l),d=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*d+this._w*f,this._x=i*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(t=0,e=0,i=0){F.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(pc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(pc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,l=t.z,a=t.w,c=2*(o*s-l*i),h=2*(l*e-r*s),d=2*(r*i-o*e);return this.x=e+a*c+o*d-l*h,this.y=i+a*h+l*c-r*d,this.z=s+a*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,l=e.y,a=e.z;return this.x=s*a-r*l,this.y=r*o-i*a,this.z=i*l-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return da.copy(this).projectOnVector(t),this.sub(da)}reflect(t){return this.sub(da.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Re(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const da=new F,pc=new oi;class ai{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(tn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(tn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=tn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,l=r.count;o<l;o++)t.isMesh===!0?t.getVertexPosition(o,tn):tn.fromBufferAttribute(r,o),tn.applyMatrix4(t.matrixWorld),this.expandByPoint(tn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),pr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),pr.copy(i.boundingBox)),pr.applyMatrix4(t.matrixWorld),this.union(pr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,tn),tn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ss),mr.subVectors(this.max,Ss),ki.subVectors(t.a,Ss),Hi.subVectors(t.b,Ss),Gi.subVectors(t.c,Ss),zn.subVectors(Hi,ki),Bn.subVectors(Gi,Hi),li.subVectors(ki,Gi);let e=[0,-zn.z,zn.y,0,-Bn.z,Bn.y,0,-li.z,li.y,zn.z,0,-zn.x,Bn.z,0,-Bn.x,li.z,0,-li.x,-zn.y,zn.x,0,-Bn.y,Bn.x,0,-li.y,li.x,0];return!fa(e,ki,Hi,Gi,mr)||(e=[1,0,0,0,1,0,0,0,1],!fa(e,ki,Hi,Gi,mr))?!1:(gr.crossVectors(zn,Bn),e=[gr.x,gr.y,gr.z],fa(e,ki,Hi,Gi,mr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,tn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(tn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(bn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const bn=[new F,new F,new F,new F,new F,new F,new F,new F],tn=new F,pr=new ai,ki=new F,Hi=new F,Gi=new F,zn=new F,Bn=new F,li=new F,Ss=new F,mr=new F,gr=new F,ci=new F;function fa(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){ci.fromArray(n,r);const l=s.x*Math.abs(ci.x)+s.y*Math.abs(ci.y)+s.z*Math.abs(ci.z),a=t.dot(ci),c=e.dot(ci),h=i.dot(ci);if(Math.max(-Math.max(a,c,h),Math.min(a,c,h))>l)return!1}return!0}const qd=new ai,ys=new F,pa=new F;class _r{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):qd.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ys.subVectors(t,this.center);const e=ys.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(ys,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(pa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ys.copy(t.center).add(pa)),this.expandByPoint(ys.copy(t.center).sub(pa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const En=new F,ma=new F,xr=new F,kn=new F,ga=new F,vr=new F,_a=new F;class Mr{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,En)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=En.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(En.copy(this.origin).addScaledVector(this.direction,e),En.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){ma.copy(t).add(e).multiplyScalar(.5),xr.copy(e).sub(t).normalize(),kn.copy(this.origin).sub(ma);const r=t.distanceTo(e)*.5,o=-this.direction.dot(xr),l=kn.dot(this.direction),a=-kn.dot(xr),c=kn.lengthSq(),h=Math.abs(1-o*o);let d,f,m,_;if(h>0)if(d=o*a-l,f=o*l-a,_=r*h,d>=0)if(f>=-_)if(f<=_){const M=1/h;d*=M,f*=M,m=d*(d+o*f+2*l)+f*(o*d+f+2*a)+c}else f=r,d=Math.max(0,-(o*f+l)),m=-d*d+f*(f+2*a)+c;else f=-r,d=Math.max(0,-(o*f+l)),m=-d*d+f*(f+2*a)+c;else f<=-_?(d=Math.max(0,-(-o*r+l)),f=d>0?-r:Math.min(Math.max(-r,-a),r),m=-d*d+f*(f+2*a)+c):f<=_?(d=0,f=Math.min(Math.max(-r,-a),r),m=f*(f+2*a)+c):(d=Math.max(0,-(o*r+l)),f=d>0?r:Math.min(Math.max(-r,-a),r),m=-d*d+f*(f+2*a)+c);else f=o>0?-r:r,d=Math.max(0,-(o*f+l)),m=-d*d+f*(f+2*a)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ma).addScaledVector(xr,f),m}intersectSphere(t,e){En.subVectors(t.center,this.origin);const i=En.dot(this.direction),s=En.dot(En)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),l=i-o,a=i+o;return a<0?null:l<0?this.at(a,e):this.at(l,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,l,a;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(l=(t.min.z-f.z)*d,a=(t.max.z-f.z)*d):(l=(t.max.z-f.z)*d,a=(t.min.z-f.z)*d),i>a||l>s)||((l>i||i!==i)&&(i=l),(a<s||s!==s)&&(s=a),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,En)!==null}intersectTriangle(t,e,i,s,r){ga.subVectors(e,t),vr.subVectors(i,t),_a.crossVectors(ga,vr);let o=this.direction.dot(_a),l;if(o>0){if(s)return null;l=1}else if(o<0)l=-1,o=-o;else return null;kn.subVectors(this.origin,t);const a=l*this.direction.dot(vr.crossVectors(kn,vr));if(a<0)return null;const c=l*this.direction.dot(ga.cross(kn));if(c<0||a+c>o)return null;const h=-l*kn.dot(_a);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class fe{constructor(t,e,i,s,r,o,l,a,c,h,d,f,m,_,M,g){fe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,l,a,c,h,d,f,m,_,M,g)}set(t,e,i,s,r,o,l,a,c,h,d,f,m,_,M,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=l,p[13]=a,p[2]=c,p[6]=h,p[10]=d,p[14]=f,p[3]=m,p[7]=_,p[11]=M,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new fe().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/Vi.setFromMatrixColumn(t,0).length(),r=1/Vi.setFromMatrixColumn(t,1).length(),o=1/Vi.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),l=Math.sin(i),a=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const f=o*h,m=o*d,_=l*h,M=l*d;e[0]=a*h,e[4]=-a*d,e[8]=c,e[1]=m+_*c,e[5]=f-M*c,e[9]=-l*a,e[2]=M-f*c,e[6]=_+m*c,e[10]=o*a}else if(t.order==="YXZ"){const f=a*h,m=a*d,_=c*h,M=c*d;e[0]=f+M*l,e[4]=_*l-m,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-l,e[2]=m*l-_,e[6]=M+f*l,e[10]=o*a}else if(t.order==="ZXY"){const f=a*h,m=a*d,_=c*h,M=c*d;e[0]=f-M*l,e[4]=-o*d,e[8]=_+m*l,e[1]=m+_*l,e[5]=o*h,e[9]=M-f*l,e[2]=-o*c,e[6]=l,e[10]=o*a}else if(t.order==="ZYX"){const f=o*h,m=o*d,_=l*h,M=l*d;e[0]=a*h,e[4]=_*c-m,e[8]=f*c+M,e[1]=a*d,e[5]=M*c+f,e[9]=m*c-_,e[2]=-c,e[6]=l*a,e[10]=o*a}else if(t.order==="YZX"){const f=o*a,m=o*c,_=l*a,M=l*c;e[0]=a*h,e[4]=M-f*d,e[8]=_*d+m,e[1]=d,e[5]=o*h,e[9]=-l*h,e[2]=-c*h,e[6]=m*d+_,e[10]=f-M*d}else if(t.order==="XZY"){const f=o*a,m=o*c,_=l*a,M=l*c;e[0]=a*h,e[4]=-d,e[8]=c*h,e[1]=f*d+M,e[5]=o*h,e[9]=m*d-_,e[2]=_*d-m,e[6]=l*h,e[10]=M*d+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Yd,t,Zd)}lookAt(t,e,i){const s=this.elements;return We.subVectors(t,e),We.lengthSq()===0&&(We.z=1),We.normalize(),Hn.crossVectors(i,We),Hn.lengthSq()===0&&(Math.abs(i.z)===1?We.x+=1e-4:We.z+=1e-4,We.normalize(),Hn.crossVectors(i,We)),Hn.normalize(),Sr.crossVectors(We,Hn),s[0]=Hn.x,s[4]=Sr.x,s[8]=We.x,s[1]=Hn.y,s[5]=Sr.y,s[9]=We.y,s[2]=Hn.z,s[6]=Sr.z,s[10]=We.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],l=i[4],a=i[8],c=i[12],h=i[1],d=i[5],f=i[9],m=i[13],_=i[2],M=i[6],g=i[10],p=i[14],R=i[3],T=i[7],b=i[11],k=i[15],P=s[0],L=s[4],O=s[8],C=s[12],w=s[1],U=s[5],Y=s[9],V=s[13],X=s[2],et=s[6],W=s[10],K=s[14],H=s[3],ct=s[7],Mt=s[11],It=s[15];return r[0]=o*P+l*w+a*X+c*H,r[4]=o*L+l*U+a*et+c*ct,r[8]=o*O+l*Y+a*W+c*Mt,r[12]=o*C+l*V+a*K+c*It,r[1]=h*P+d*w+f*X+m*H,r[5]=h*L+d*U+f*et+m*ct,r[9]=h*O+d*Y+f*W+m*Mt,r[13]=h*C+d*V+f*K+m*It,r[2]=_*P+M*w+g*X+p*H,r[6]=_*L+M*U+g*et+p*ct,r[10]=_*O+M*Y+g*W+p*Mt,r[14]=_*C+M*V+g*K+p*It,r[3]=R*P+T*w+b*X+k*H,r[7]=R*L+T*U+b*et+k*ct,r[11]=R*O+T*Y+b*W+k*Mt,r[15]=R*C+T*V+b*K+k*It,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],l=t[5],a=t[9],c=t[13],h=t[2],d=t[6],f=t[10],m=t[14],_=t[3],M=t[7],g=t[11],p=t[15];return _*(+r*a*d-s*c*d-r*l*f+i*c*f+s*l*m-i*a*m)+M*(+e*a*m-e*c*f+r*o*f-s*o*m+s*c*h-r*a*h)+g*(+e*c*d-e*l*m-r*o*d+i*o*m+r*l*h-i*c*h)+p*(-s*l*h-e*a*d+e*l*f+s*o*d-i*o*f+i*a*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],l=t[5],a=t[6],c=t[7],h=t[8],d=t[9],f=t[10],m=t[11],_=t[12],M=t[13],g=t[14],p=t[15],R=d*g*c-M*f*c+M*a*m-l*g*m-d*a*p+l*f*p,T=_*f*c-h*g*c-_*a*m+o*g*m+h*a*p-o*f*p,b=h*M*c-_*d*c+_*l*m-o*M*m-h*l*p+o*d*p,k=_*d*a-h*M*a-_*l*f+o*M*f+h*l*g-o*d*g,P=e*R+i*T+s*b+r*k;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/P;return t[0]=R*L,t[1]=(M*f*r-d*g*r-M*s*m+i*g*m+d*s*p-i*f*p)*L,t[2]=(l*g*r-M*a*r+M*s*c-i*g*c-l*s*p+i*a*p)*L,t[3]=(d*a*r-l*f*r-d*s*c+i*f*c+l*s*m-i*a*m)*L,t[4]=T*L,t[5]=(h*g*r-_*f*r+_*s*m-e*g*m-h*s*p+e*f*p)*L,t[6]=(_*a*r-o*g*r-_*s*c+e*g*c+o*s*p-e*a*p)*L,t[7]=(o*f*r-h*a*r+h*s*c-e*f*c-o*s*m+e*a*m)*L,t[8]=b*L,t[9]=(_*d*r-h*M*r-_*i*m+e*M*m+h*i*p-e*d*p)*L,t[10]=(o*M*r-_*l*r+_*i*c-e*M*c-o*i*p+e*l*p)*L,t[11]=(h*l*r-o*d*r-h*i*c+e*d*c+o*i*m-e*l*m)*L,t[12]=k*L,t[13]=(h*M*s-_*d*s+_*i*f-e*M*f-h*i*g+e*d*g)*L,t[14]=(_*l*s-o*M*s-_*i*a+e*M*a+o*i*g-e*l*g)*L,t[15]=(o*d*s-h*l*s+h*i*a-e*d*a-o*i*f+e*l*f)*L,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,l=t.y,a=t.z,c=r*o,h=r*l;return this.set(c*o+i,c*l-s*a,c*a+s*l,0,c*l+s*a,h*l+i,h*a-s*o,0,c*a-s*l,h*a+s*o,r*a*a+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,l=e._z,a=e._w,c=r+r,h=o+o,d=l+l,f=r*c,m=r*h,_=r*d,M=o*h,g=o*d,p=l*d,R=a*c,T=a*h,b=a*d,k=i.x,P=i.y,L=i.z;return s[0]=(1-(M+p))*k,s[1]=(m+b)*k,s[2]=(_-T)*k,s[3]=0,s[4]=(m-b)*P,s[5]=(1-(f+p))*P,s[6]=(g+R)*P,s[7]=0,s[8]=(_+T)*L,s[9]=(g-R)*L,s[10]=(1-(f+M))*L,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=Vi.set(s[0],s[1],s[2]).length();const o=Vi.set(s[4],s[5],s[6]).length(),l=Vi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],en.copy(this);const c=1/r,h=1/o,d=1/l;return en.elements[0]*=c,en.elements[1]*=c,en.elements[2]*=c,en.elements[4]*=h,en.elements[5]*=h,en.elements[6]*=h,en.elements[8]*=d,en.elements[9]*=d,en.elements[10]*=d,e.setFromRotationMatrix(en),i.x=r,i.y=o,i.z=l,this}makePerspective(t,e,i,s,r,o,l=Sn){const a=this.elements,c=2*r/(e-t),h=2*r/(i-s),d=(e+t)/(e-t),f=(i+s)/(i-s);let m,_;if(l===Sn)m=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(l===dr)m=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return a[0]=c,a[4]=0,a[8]=d,a[12]=0,a[1]=0,a[5]=h,a[9]=f,a[13]=0,a[2]=0,a[6]=0,a[10]=m,a[14]=_,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(t,e,i,s,r,o,l=Sn){const a=this.elements,c=1/(e-t),h=1/(i-s),d=1/(o-r),f=(e+t)*c,m=(i+s)*h;let _,M;if(l===Sn)_=(o+r)*d,M=-2*d;else if(l===dr)_=r*d,M=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return a[0]=2*c,a[4]=0,a[8]=0,a[12]=-f,a[1]=0,a[5]=2*h,a[9]=0,a[13]=-m,a[2]=0,a[6]=0,a[10]=M,a[14]=-_,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Vi=new F,en=new fe,Yd=new F(0,0,0),Zd=new F(1,1,1),Hn=new F,Sr=new F,We=new F,mc=new fe,gc=new oi;class ln{constructor(t=0,e=0,i=0,s=ln.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],l=s[8],a=s[1],c=s[5],h=s[9],d=s[2],f=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Re(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Re(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(l,m),this._z=Math.atan2(a,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Re(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(a,r));break;case"ZYX":this._y=Math.asin(-Re(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(a,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Re(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(l,m));break;case"XZY":this._z=Math.asin(-Re(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(l,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return mc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(mc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return gc.setFromEuler(this),this.setFromQuaternion(gc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ln.DEFAULT_ORDER="XYZ";class xa{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let jd=0;const _c=new F,Wi=new oi,wn=new fe,yr=new F,bs=new F,Kd=new F,Jd=new oi,xc=new F(1,0,0),vc=new F(0,1,0),Mc=new F(0,0,1),Sc={type:"added"},Qd={type:"removed"},$i={type:"childadded",child:null},va={type:"childremoved",child:null};class Ee extends ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=si(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ee.DEFAULT_UP.clone();const t=new F,e=new ln,i=new oi,s=new F(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new fe},normalMatrix:{value:new Jt}}),this.matrix=new fe,this.matrixWorld=new fe,this.matrixAutoUpdate=Ee.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Wi.setFromAxisAngle(t,e),this.quaternion.multiply(Wi),this}rotateOnWorldAxis(t,e){return Wi.setFromAxisAngle(t,e),this.quaternion.premultiply(Wi),this}rotateX(t){return this.rotateOnAxis(xc,t)}rotateY(t){return this.rotateOnAxis(vc,t)}rotateZ(t){return this.rotateOnAxis(Mc,t)}translateOnAxis(t,e){return _c.copy(t).applyQuaternion(this.quaternion),this.position.add(_c.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(xc,t)}translateY(t){return this.translateOnAxis(vc,t)}translateZ(t){return this.translateOnAxis(Mc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(wn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?yr.copy(t):yr.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wn.lookAt(bs,yr,this.up):wn.lookAt(yr,bs,this.up),this.quaternion.setFromRotationMatrix(wn),s&&(wn.extractRotation(s.matrixWorld),Wi.setFromRotationMatrix(wn),this.quaternion.premultiply(Wi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Sc),$i.child=t,this.dispatchEvent($i),$i.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Qd),va.child=t,this.dispatchEvent(va),va.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),wn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),wn.multiply(t.parent.matrixWorld)),t.applyMatrix4(wn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Sc),$i.child=t,this.dispatchEvent($i),$i.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,t,Kd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bs,Jd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(l,a){return l[a.uuid]===void 0&&(l[a.uuid]=a.toJSON(t)),a.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const a=l.shapes;if(Array.isArray(a))for(let c=0,h=a.length;c<h;c++){const d=a[c];r(t.shapes,d)}else r(t.shapes,a)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let a=0,c=this.material.length;a<c;a++)l.push(r(t.materials,this.material[a]));s.material=l}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let l=0;l<this.children.length;l++)s.children.push(this.children[l].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let l=0;l<this.animations.length;l++){const a=this.animations[l];s.animations.push(r(t.animations,a))}}if(e){const l=o(t.geometries),a=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),f=o(t.skeletons),m=o(t.animations),_=o(t.nodes);l.length>0&&(i.geometries=l),a.length>0&&(i.materials=a),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),m.length>0&&(i.animations=m),_.length>0&&(i.nodes=_)}return i.object=s,i;function o(l){const a=[];for(const c in l){const h=l[c];delete h.metadata,a.push(h)}return a}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Ee.DEFAULT_UP=new F(0,1,0),Ee.DEFAULT_MATRIX_AUTO_UPDATE=!0,Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const nn=new F,Tn=new F,Ma=new F,An=new F,Xi=new F,qi=new F,yc=new F,Sa=new F,ya=new F,ba=new F,Ea=new Me,wa=new Me,Ta=new Me;class Ze{constructor(t=new F,e=new F,i=new F){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),nn.subVectors(t,e),s.cross(nn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){nn.subVectors(s,e),Tn.subVectors(i,e),Ma.subVectors(t,e);const o=nn.dot(nn),l=nn.dot(Tn),a=nn.dot(Ma),c=Tn.dot(Tn),h=Tn.dot(Ma),d=o*c-l*l;if(d===0)return r.set(0,0,0),null;const f=1/d,m=(c*a-l*h)*f,_=(o*h-l*a)*f;return r.set(1-m-_,_,m)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,An)===null?!1:An.x>=0&&An.y>=0&&An.x+An.y<=1}static getInterpolation(t,e,i,s,r,o,l,a){return this.getBarycoord(t,e,i,s,An)===null?(a.x=0,a.y=0,"z"in a&&(a.z=0),"w"in a&&(a.w=0),null):(a.setScalar(0),a.addScaledVector(r,An.x),a.addScaledVector(o,An.y),a.addScaledVector(l,An.z),a)}static getInterpolatedAttribute(t,e,i,s,r,o){return Ea.setScalar(0),wa.setScalar(0),Ta.setScalar(0),Ea.fromBufferAttribute(t,e),wa.fromBufferAttribute(t,i),Ta.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Ea,r.x),o.addScaledVector(wa,r.y),o.addScaledVector(Ta,r.z),o}static isFrontFacing(t,e,i,s){return nn.subVectors(i,e),Tn.subVectors(t,e),nn.cross(Tn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return nn.subVectors(this.c,this.b),Tn.subVectors(this.a,this.b),nn.cross(Tn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ze.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ze.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return Ze.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return Ze.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ze.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,l;Xi.subVectors(s,i),qi.subVectors(r,i),Sa.subVectors(t,i);const a=Xi.dot(Sa),c=qi.dot(Sa);if(a<=0&&c<=0)return e.copy(i);ya.subVectors(t,s);const h=Xi.dot(ya),d=qi.dot(ya);if(h>=0&&d<=h)return e.copy(s);const f=a*d-h*c;if(f<=0&&a>=0&&h<=0)return o=a/(a-h),e.copy(i).addScaledVector(Xi,o);ba.subVectors(t,r);const m=Xi.dot(ba),_=qi.dot(ba);if(_>=0&&m<=_)return e.copy(r);const M=m*c-a*_;if(M<=0&&c>=0&&_<=0)return l=c/(c-_),e.copy(i).addScaledVector(qi,l);const g=h*_-m*d;if(g<=0&&d-h>=0&&m-_>=0)return yc.subVectors(r,s),l=(d-h)/(d-h+(m-_)),e.copy(s).addScaledVector(yc,l);const p=1/(g+M+f);return o=M*p,l=f*p,e.copy(i).addScaledVector(Xi,o).addScaledVector(qi,l)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const bc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gn={h:0,s:0,l:0},br={h:0,s:0,l:0};function Aa(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class ie{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ye){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=ae.workingColorSpace){return this.r=t,this.g=e,this.b=i,ae.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=ae.workingColorSpace){if(t=ca(t,1),e=Re(e,0,1),i=Re(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=Aa(o,r,t+1/3),this.g=Aa(o,r,t),this.b=Aa(o,r,t-1/3)}return ae.toWorkingColorSpace(this,s),this}setStyle(t,e=Ye){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],l=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ye){const i=bc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=yn(t.r),this.g=yn(t.g),this.b=yn(t.b),this}copyLinearToSRGB(t){return this.r=zi(t.r),this.g=zi(t.g),this.b=zi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ye){return ae.fromWorkingColorSpace(Ie.copy(this),t),Math.round(Re(Ie.r*255,0,255))*65536+Math.round(Re(Ie.g*255,0,255))*256+Math.round(Re(Ie.b*255,0,255))}getHexString(t=Ye){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.fromWorkingColorSpace(Ie.copy(this),e);const i=Ie.r,s=Ie.g,r=Ie.b,o=Math.max(i,s,r),l=Math.min(i,s,r);let a,c;const h=(l+o)/2;if(l===o)a=0,c=0;else{const d=o-l;switch(c=h<=.5?d/(o+l):d/(2-o-l),o){case i:a=(s-r)/d+(s<r?6:0);break;case s:a=(r-i)/d+2;break;case r:a=(i-s)/d+4;break}a/=6}return t.h=a,t.s=c,t.l=h,t}getRGB(t,e=ae.workingColorSpace){return ae.fromWorkingColorSpace(Ie.copy(this),e),t.r=Ie.r,t.g=Ie.g,t.b=Ie.b,t}getStyle(t=Ye){ae.fromWorkingColorSpace(Ie.copy(this),t);const e=Ie.r,i=Ie.g,s=Ie.b;return t!==Ye?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Gn),this.setHSL(Gn.h+t,Gn.s+e,Gn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Gn),t.getHSL(br);const i=xs(Gn.h,br.h,e),s=xs(Gn.s,br.s,e),r=xs(Gn.l,br.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ie=new ie;ie.NAMES=bc;let tf=0;class Yi extends ii{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tf++}),this.uuid=si(),this.name="",this.blending=Ai,this.side=Un,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_o,this.blendDst=xo,this.blendEquation=Qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ie(0,0,0),this.blendAlpha=0,this.depthFunc=Ri,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=tc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ni,this.stencilZFail=Ni,this.stencilZPass=Ni,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ai&&(i.blending=this.blending),this.side!==Un&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==_o&&(i.blendSrc=this.blendSrc),this.blendDst!==xo&&(i.blendDst=this.blendDst),this.blendEquation!==Qn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ri&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==tc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ni&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ni&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ni&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const l in r){const a=r[l];delete a.metadata,o.push(a)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ra extends Yi{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.combine=Hl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ye=new F,Er=new ft;class sn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=nc,this.updateRanges=[],this.gpuType=Mn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Er.fromBufferAttribute(this,e),Er.applyMatrix3(t),this.setXY(e,Er.x,Er.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix3(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyMatrix4(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.applyNormalMatrix(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)ye.fromBufferAttribute(this,e),ye.transformDirection(t),this.setXYZ(e,ye.x,ye.y,ye.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Fi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ne(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Fi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Fi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Fi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Fi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),i=Ne(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),i=Ne(i,this.array),s=Ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),i=Ne(i,this.array),s=Ne(s,this.array),r=Ne(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==nc&&(t.usage=this.usage),t}}class Ec extends sn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class wc extends sn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class Ce extends sn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let ef=0;const je=new fe,Pa=new Ee,Zi=new F,$e=new ai,Es=new ai,Pe=new F;class Xe extends ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ef++}),this.uuid=si(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(rc(t)?wc:Ec)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Jt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return je.makeRotationFromQuaternion(t),this.applyMatrix4(je),this}rotateX(t){return je.makeRotationX(t),this.applyMatrix4(je),this}rotateY(t){return je.makeRotationY(t),this.applyMatrix4(je),this}rotateZ(t){return je.makeRotationZ(t),this.applyMatrix4(je),this}translate(t,e,i){return je.makeTranslation(t,e,i),this.applyMatrix4(je),this}scale(t,e,i){return je.makeScale(t,e,i),this.applyMatrix4(je),this}lookAt(t){return Pa.lookAt(t),Pa.updateMatrix(),this.applyMatrix4(Pa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zi).negate(),this.translate(Zi.x,Zi.y,Zi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ce(i,3))}else{for(let i=0,s=e.count;i<s;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ai);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];$e.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,$e.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,$e.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint($e.min),this.boundingBox.expandByPoint($e.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _r);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const i=this.boundingSphere.center;if($e.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const l=e[r];Es.setFromBufferAttribute(l),this.morphTargetsRelative?(Pe.addVectors($e.min,Es.min),$e.expandByPoint(Pe),Pe.addVectors($e.max,Es.max),$e.expandByPoint(Pe)):($e.expandByPoint(Es.min),$e.expandByPoint(Es.max))}$e.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Pe.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Pe));if(e)for(let r=0,o=e.length;r<o;r++){const l=e[r],a=this.morphTargetsRelative;for(let c=0,h=l.count;c<h;c++)Pe.fromBufferAttribute(l,c),a&&(Zi.fromBufferAttribute(t,c),Pe.add(Zi)),s=Math.max(s,i.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new sn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),l=[],a=[];for(let O=0;O<i.count;O++)l[O]=new F,a[O]=new F;const c=new F,h=new F,d=new F,f=new ft,m=new ft,_=new ft,M=new F,g=new F;function p(O,C,w){c.fromBufferAttribute(i,O),h.fromBufferAttribute(i,C),d.fromBufferAttribute(i,w),f.fromBufferAttribute(r,O),m.fromBufferAttribute(r,C),_.fromBufferAttribute(r,w),h.sub(c),d.sub(c),m.sub(f),_.sub(f);const U=1/(m.x*_.y-_.x*m.y);isFinite(U)&&(M.copy(h).multiplyScalar(_.y).addScaledVector(d,-m.y).multiplyScalar(U),g.copy(d).multiplyScalar(m.x).addScaledVector(h,-_.x).multiplyScalar(U),l[O].add(M),l[C].add(M),l[w].add(M),a[O].add(g),a[C].add(g),a[w].add(g))}let R=this.groups;R.length===0&&(R=[{start:0,count:t.count}]);for(let O=0,C=R.length;O<C;++O){const w=R[O],U=w.start,Y=w.count;for(let V=U,X=U+Y;V<X;V+=3)p(t.getX(V+0),t.getX(V+1),t.getX(V+2))}const T=new F,b=new F,k=new F,P=new F;function L(O){k.fromBufferAttribute(s,O),P.copy(k);const C=l[O];T.copy(C),T.sub(k.multiplyScalar(k.dot(C))).normalize(),b.crossVectors(P,C);const U=b.dot(a[O])<0?-1:1;o.setXYZW(O,T.x,T.y,T.z,U)}for(let O=0,C=R.length;O<C;++O){const w=R[O],U=w.start,Y=w.count;for(let V=U,X=U+Y;V<X;V+=3)L(t.getX(V+0)),L(t.getX(V+1)),L(t.getX(V+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new sn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,m=i.count;f<m;f++)i.setXYZ(f,0,0,0);const s=new F,r=new F,o=new F,l=new F,a=new F,c=new F,h=new F,d=new F;if(t)for(let f=0,m=t.count;f<m;f+=3){const _=t.getX(f+0),M=t.getX(f+1),g=t.getX(f+2);s.fromBufferAttribute(e,_),r.fromBufferAttribute(e,M),o.fromBufferAttribute(e,g),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),l.fromBufferAttribute(i,_),a.fromBufferAttribute(i,M),c.fromBufferAttribute(i,g),l.add(h),a.add(h),c.add(h),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(M,a.x,a.y,a.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,m=e.count;f<m;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(l,a){const c=l.array,h=l.itemSize,d=l.normalized,f=new c.constructor(a.length*h);let m=0,_=0;for(let M=0,g=a.length;M<g;M++){l.isInterleavedBufferAttribute?m=a[M]*l.data.stride+l.offset:m=a[M]*h;for(let p=0;p<h;p++)f[_++]=c[m++]}return new sn(f,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Xe,i=this.index.array,s=this.attributes;for(const l in s){const a=s[l],c=t(a,i);e.setAttribute(l,c)}const r=this.morphAttributes;for(const l in r){const a=[],c=r[l];for(let h=0,d=c.length;h<d;h++){const f=c[h],m=t(f,i);a.push(m)}e.morphAttributes[l]=a}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let l=0,a=o.length;l<a;l++){const c=o[l];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const a=this.parameters;for(const c in a)a[c]!==void 0&&(t[c]=a[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const a in i){const c=i[a];t.data.attributes[a]=c.toJSON(t.data)}const s={};let r=!1;for(const a in this.morphAttributes){const c=this.morphAttributes[a],h=[];for(let d=0,f=c.length;d<f;d++){const m=c[d];h.push(m.toJSON(t.data))}h.length>0&&(s[a]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const l=this.boundingSphere;return l!==null&&(t.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let f=0,m=d.length;f<m;f++)h.push(d[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const l=t.boundingBox;l!==null&&(this.boundingBox=l.clone());const a=t.boundingSphere;return a!==null&&(this.boundingSphere=a.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Tc=new fe,hi=new Mr,wr=new _r,Ac=new F,Tr=new F,Ar=new F,Rr=new F,Ca=new F,Pr=new F,Rc=new F,Cr=new F;class ge extends Ee{constructor(t=new Xe,e=new Ra){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const l=this.morphTargetInfluences;if(r&&l){Pr.set(0,0,0);for(let a=0,c=r.length;a<c;a++){const h=l[a],d=r[a];h!==0&&(Ca.fromBufferAttribute(d,t),o?Pr.addScaledVector(Ca,h):Pr.addScaledVector(Ca.sub(e),h))}e.add(Pr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),wr.copy(i.boundingSphere),wr.applyMatrix4(r),hi.copy(t.ray).recast(t.near),!(wr.containsPoint(hi.origin)===!1&&(hi.intersectSphere(wr,Ac)===null||hi.origin.distanceToSquared(Ac)>(t.far-t.near)**2))&&(Tc.copy(r).invert(),hi.copy(t.ray).applyMatrix4(Tc),!(i.boundingBox!==null&&hi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,hi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,l=r.index,a=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,f=r.groups,m=r.drawRange;if(l!==null)if(Array.isArray(o))for(let _=0,M=f.length;_<M;_++){const g=f[_],p=o[g.materialIndex],R=Math.max(g.start,m.start),T=Math.min(l.count,Math.min(g.start+g.count,m.start+m.count));for(let b=R,k=T;b<k;b+=3){const P=l.getX(b),L=l.getX(b+1),O=l.getX(b+2);s=Dr(this,p,t,i,c,h,d,P,L,O),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const _=Math.max(0,m.start),M=Math.min(l.count,m.start+m.count);for(let g=_,p=M;g<p;g+=3){const R=l.getX(g),T=l.getX(g+1),b=l.getX(g+2);s=Dr(this,o,t,i,c,h,d,R,T,b),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(a!==void 0)if(Array.isArray(o))for(let _=0,M=f.length;_<M;_++){const g=f[_],p=o[g.materialIndex],R=Math.max(g.start,m.start),T=Math.min(a.count,Math.min(g.start+g.count,m.start+m.count));for(let b=R,k=T;b<k;b+=3){const P=b,L=b+1,O=b+2;s=Dr(this,p,t,i,c,h,d,P,L,O),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const _=Math.max(0,m.start),M=Math.min(a.count,m.start+m.count);for(let g=_,p=M;g<p;g+=3){const R=g,T=g+1,b=g+2;s=Dr(this,o,t,i,c,h,d,R,T,b),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function nf(n,t,e,i,s,r,o,l){let a;if(t.side===Be?a=i.intersectTriangle(o,r,s,!0,l):a=i.intersectTriangle(s,r,o,t.side===Un,l),a===null)return null;Cr.copy(l),Cr.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Cr);return c<e.near||c>e.far?null:{distance:c,point:Cr.clone(),object:n}}function Dr(n,t,e,i,s,r,o,l,a,c){n.getVertexPosition(l,Tr),n.getVertexPosition(a,Ar),n.getVertexPosition(c,Rr);const h=nf(n,t,e,i,Tr,Ar,Rr,Rc);if(h){const d=new F;Ze.getBarycoord(Rc,Tr,Ar,Rr,d),s&&(h.uv=Ze.getInterpolatedAttribute(s,l,a,c,d,new ft)),r&&(h.uv1=Ze.getInterpolatedAttribute(r,l,a,c,d,new ft)),o&&(h.normal=Ze.getInterpolatedAttribute(o,l,a,c,d,new F),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a:l,b:a,c,normal:new F,materialIndex:0};Ze.getNormal(Tr,Ar,Rr,f.normal),h.face=f,h.barycoord=d}return h}class rn extends Xe{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const l=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const a=[],c=[],h=[],d=[];let f=0,m=0;_("z","y","x",-1,-1,i,e,t,o,r,0),_("z","y","x",1,-1,i,e,-t,o,r,1),_("x","z","y",1,1,t,i,e,s,o,2),_("x","z","y",1,-1,t,i,-e,s,o,3),_("x","y","z",1,-1,t,e,i,s,r,4),_("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(a),this.setAttribute("position",new Ce(c,3)),this.setAttribute("normal",new Ce(h,3)),this.setAttribute("uv",new Ce(d,2));function _(M,g,p,R,T,b,k,P,L,O,C){const w=b/L,U=k/O,Y=b/2,V=k/2,X=P/2,et=L+1,W=O+1;let K=0,H=0;const ct=new F;for(let Mt=0;Mt<W;Mt++){const It=Mt*U-V;for(let Xt=0;Xt<et;Xt++){const oe=Xt*w-Y;ct[M]=oe*R,ct[g]=It*T,ct[p]=X,c.push(ct.x,ct.y,ct.z),ct[M]=0,ct[g]=0,ct[p]=P>0?1:-1,h.push(ct.x,ct.y,ct.z),d.push(Xt/L),d.push(1-Mt/O),K+=1}}for(let Mt=0;Mt<O;Mt++)for(let It=0;It<L;It++){const Xt=f+It+et*Mt,oe=f+It+et*(Mt+1),tt=f+(It+1)+et*(Mt+1),pt=f+(It+1)+et*Mt;a.push(Xt,oe,pt),a.push(oe,tt,pt),H+=6}l.addGroup(m,H,C),m+=H,f+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ji(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Oe(n){const t={};for(let e=0;e<n.length;e++){const i=ji(n[e]);for(const s in i)t[s]=i[s]}return t}function sf(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Pc(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ae.workingColorSpace}const rf={clone:ji,merge:Oe};var of=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,af=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vn extends Yi{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=of,this.fragmentShader=af,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ji(t.uniforms),this.uniformsGroups=sf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class Cc extends Ee{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new fe,this.projectionMatrix=new fe,this.projectionMatrixInverse=new fe,this.coordinateSystem=Sn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Wn=new F,Dc=new ft,Lc=new ft;class Ke extends Cc{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=_s*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Oi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return _s*2*Math.atan(Math.tan(Oi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Wn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Wn.x,Wn.y).multiplyScalar(-t/Wn.z),Wn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Wn.x,Wn.y).multiplyScalar(-t/Wn.z)}getViewSize(t,e){return this.getViewBounds(t,Dc,Lc),e.subVectors(Lc,Dc)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Oi*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const a=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/a,e-=o.offsetY*i/c,s*=o.width/a,i*=o.height/c}const l=this.filmOffset;l!==0&&(r+=t*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ki=-90,Ji=1;class lf extends Ee{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ke(Ki,Ji,t,e);s.layers=this.layers,this.add(s);const r=new Ke(Ki,Ji,t,e);r.layers=this.layers,this.add(r);const o=new Ke(Ki,Ji,t,e);o.layers=this.layers,this.add(o);const l=new Ke(Ki,Ji,t,e);l.layers=this.layers,this.add(l);const a=new Ke(Ki,Ji,t,e);a.layers=this.layers,this.add(a);const c=new Ke(Ki,Ji,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,l,a]=e;for(const c of e)this.remove(c);if(t===Sn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),a.up.set(0,1,0),a.lookAt(0,0,-1);else if(t===dr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),a.up.set(0,-1,0),a.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,l,a,c,h]=this.children,d=t.getRenderTarget(),f=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,l),t.setRenderTarget(i,3,s),t.render(e,a),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=M,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(d,f,m),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Ic extends ke{constructor(t,e,i,s,r,o,l,a,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Pi,super(t,e,i,s,r,o,l,a,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class cf extends ri{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Ic(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:an}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new rn(5,5,5),r=new Vn({name:"CubemapFromEquirect",uniforms:ji(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Be,blending:Nn});r.uniforms.tEquirect.value=e;const o=new ge(s,r),l=e.minFilter;return e.minFilter===ei&&(e.minFilter=an),new lf(1,10,this).update(t,o),e.minFilter=l,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}const Da=new F,hf=new F,uf=new Jt;class $n{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Da.subVectors(i,e).cross(hf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Da),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||uf.getNormalMatrix(t),s=this.coplanarPoint(Da).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ui=new _r,Lr=new F;class La{constructor(t=new $n,e=new $n,i=new $n,s=new $n,r=new $n,o=new $n){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const l=this.planes;return l[0].copy(t),l[1].copy(e),l[2].copy(i),l[3].copy(s),l[4].copy(r),l[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Sn){const i=this.planes,s=t.elements,r=s[0],o=s[1],l=s[2],a=s[3],c=s[4],h=s[5],d=s[6],f=s[7],m=s[8],_=s[9],M=s[10],g=s[11],p=s[12],R=s[13],T=s[14],b=s[15];if(i[0].setComponents(a-r,f-c,g-m,b-p).normalize(),i[1].setComponents(a+r,f+c,g+m,b+p).normalize(),i[2].setComponents(a+o,f+h,g+_,b+R).normalize(),i[3].setComponents(a-o,f-h,g-_,b-R).normalize(),i[4].setComponents(a-l,f-d,g-M,b-T).normalize(),e===Sn)i[5].setComponents(a+l,f+d,g+M,b+T).normalize();else if(e===dr)i[5].setComponents(l,d,M,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ui.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ui.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ui)}intersectsSprite(t){return ui.center.set(0,0,0),ui.radius=.7071067811865476,ui.applyMatrix4(t.matrixWorld),this.intersectsSphere(ui)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Lr.x=s.normal.x>0?t.max.x:t.min.x,Lr.y=s.normal.y>0?t.max.y:t.min.y,Lr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Lr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Uc(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function df(n){const t=new WeakMap;function e(l,a){const c=l.array,h=l.usage,d=c.byteLength,f=n.createBuffer();n.bindBuffer(a,f),n.bufferData(a,c,h),l.onUploadCallback();let m;if(c instanceof Float32Array)m=n.FLOAT;else if(c instanceof Uint16Array)l.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=n.SHORT;else if(c instanceof Uint32Array)m=n.UNSIGNED_INT;else if(c instanceof Int32Array)m=n.INT;else if(c instanceof Int8Array)m=n.BYTE;else if(c instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:l.version,size:d}}function i(l,a,c){const h=a.array,d=a.updateRanges;if(n.bindBuffer(c,l),d.length===0)n.bufferSubData(c,0,h);else{d.sort((m,_)=>m.start-_.start);let f=0;for(let m=1;m<d.length;m++){const _=d[f],M=d[m];M.start<=_.start+_.count+1?_.count=Math.max(_.count,M.start+M.count-_.start):(++f,d[f]=M)}d.length=f+1;for(let m=0,_=d.length;m<_;m++){const M=d[m];n.bufferSubData(c,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}a.clearUpdateRanges()}a.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),t.get(l)}function r(l){l.isInterleavedBufferAttribute&&(l=l.data);const a=t.get(l);a&&(n.deleteBuffer(a.buffer),t.delete(l))}function o(l,a){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const h=t.get(l);(!h||h.version<l.version)&&t.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const c=t.get(l);if(c===void 0)t.set(l,e(l,a));else if(c.version<l.version){if(c.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,l,a),c.version=l.version}}return{get:s,remove:r,update:o}}class Xn extends Xe{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,l=Math.floor(i),a=Math.floor(s),c=l+1,h=a+1,d=t/l,f=e/a,m=[],_=[],M=[],g=[];for(let p=0;p<h;p++){const R=p*f-o;for(let T=0;T<c;T++){const b=T*d-r;_.push(b,-R,0),M.push(0,0,1),g.push(T/l),g.push(1-p/a)}}for(let p=0;p<a;p++)for(let R=0;R<l;R++){const T=R+c*p,b=R+c*(p+1),k=R+1+c*(p+1),P=R+1+c*p;m.push(T,b,P),m.push(b,k,P)}this.setIndex(m),this.setAttribute("position",new Ce(_,3)),this.setAttribute("normal",new Ce(M,3)),this.setAttribute("uv",new Ce(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xn(t.width,t.height,t.widthSegments,t.heightSegments)}}var ff=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pf=`#ifdef USE_ALPHAHASH
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
#endif`,mf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_f=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,xf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vf=`#ifdef USE_AOMAP
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
#endif`,Mf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Sf=`#ifdef USE_BATCHING
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
#endif`,yf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ef=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Tf=`#ifdef USE_IRIDESCENCE
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
#endif`,Af=`#ifdef USE_BUMPMAP
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
#endif`,Rf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Pf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Cf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Df=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,If=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Uf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Nf=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Of=`#define PI 3.141592653589793
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
} // validated`,Ff=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,zf=`vec3 transformedNormal = objectNormal;
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
#endif`,Bf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Vf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$f=`#ifdef USE_ENVMAP
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
#endif`,Xf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,qf=`#ifdef USE_ENVMAP
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
#endif`,Yf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zf=`#ifdef USE_ENVMAP
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
#endif`,jf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Kf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tp=`#ifdef USE_GRADIENTMAP
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
}`,ep=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,np=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ip=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sp=`uniform bool receiveShadow;
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
#endif`,rp=`#ifdef USE_ENVMAP
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
#endif`,op=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ap=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hp=`PhysicalMaterial material;
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
#endif`,up=`struct PhysicalMaterial {
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
}`,dp=`
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
#endif`,fp=`#if defined( RE_IndirectDiffuse )
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
#endif`,pp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,mp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_p=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Mp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Sp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,yp=`#if defined( USE_POINTS_UV )
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
#endif`,bp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ep=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Tp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ap=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rp=`#ifdef USE_MORPHTARGETS
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
#endif`,Pp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Dp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Lp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ip=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Up=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Np=`#ifdef USE_NORMALMAP
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
#endif`,Op=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Gp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Vp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$p=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Xp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Yp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Zp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Kp=`float getShadowMask() {
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
}`,Jp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qp=`#ifdef USE_SKINNING
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
#endif`,tm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,em=`#ifdef USE_SKINNING
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
#endif`,nm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,im=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,om=`#ifdef USE_TRANSMISSION
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
#endif`,am=`#ifdef USE_TRANSMISSION
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
#endif`,lm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,um=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qt={alphahash_fragment:ff,alphahash_pars_fragment:pf,alphamap_fragment:mf,alphamap_pars_fragment:gf,alphatest_fragment:_f,alphatest_pars_fragment:xf,aomap_fragment:vf,aomap_pars_fragment:Mf,batching_pars_vertex:Sf,batching_vertex:yf,begin_vertex:bf,beginnormal_vertex:Ef,bsdfs:wf,iridescence_fragment:Tf,bumpmap_pars_fragment:Af,clipping_planes_fragment:Rf,clipping_planes_pars_fragment:Pf,clipping_planes_pars_vertex:Cf,clipping_planes_vertex:Df,color_fragment:Lf,color_pars_fragment:If,color_pars_vertex:Uf,color_vertex:Nf,common:Of,cube_uv_reflection_fragment:Ff,defaultnormal_vertex:zf,displacementmap_pars_vertex:Bf,displacementmap_vertex:kf,emissivemap_fragment:Hf,emissivemap_pars_fragment:Gf,colorspace_fragment:Vf,colorspace_pars_fragment:Wf,envmap_fragment:$f,envmap_common_pars_fragment:Xf,envmap_pars_fragment:qf,envmap_pars_vertex:Yf,envmap_physical_pars_fragment:rp,envmap_vertex:Zf,fog_vertex:jf,fog_pars_vertex:Kf,fog_fragment:Jf,fog_pars_fragment:Qf,gradientmap_pars_fragment:tp,lightmap_pars_fragment:ep,lights_lambert_fragment:np,lights_lambert_pars_fragment:ip,lights_pars_begin:sp,lights_toon_fragment:op,lights_toon_pars_fragment:ap,lights_phong_fragment:lp,lights_phong_pars_fragment:cp,lights_physical_fragment:hp,lights_physical_pars_fragment:up,lights_fragment_begin:dp,lights_fragment_maps:fp,lights_fragment_end:pp,logdepthbuf_fragment:mp,logdepthbuf_pars_fragment:gp,logdepthbuf_pars_vertex:_p,logdepthbuf_vertex:xp,map_fragment:vp,map_pars_fragment:Mp,map_particle_fragment:Sp,map_particle_pars_fragment:yp,metalnessmap_fragment:bp,metalnessmap_pars_fragment:Ep,morphinstance_vertex:wp,morphcolor_vertex:Tp,morphnormal_vertex:Ap,morphtarget_pars_vertex:Rp,morphtarget_vertex:Pp,normal_fragment_begin:Cp,normal_fragment_maps:Dp,normal_pars_fragment:Lp,normal_pars_vertex:Ip,normal_vertex:Up,normalmap_pars_fragment:Np,clearcoat_normal_fragment_begin:Op,clearcoat_normal_fragment_maps:Fp,clearcoat_pars_fragment:zp,iridescence_pars_fragment:Bp,opaque_fragment:kp,packing:Hp,premultiplied_alpha_fragment:Gp,project_vertex:Vp,dithering_fragment:Wp,dithering_pars_fragment:$p,roughnessmap_fragment:Xp,roughnessmap_pars_fragment:qp,shadowmap_pars_fragment:Yp,shadowmap_pars_vertex:Zp,shadowmap_vertex:jp,shadowmask_pars_fragment:Kp,skinbase_vertex:Jp,skinning_pars_vertex:Qp,skinning_vertex:tm,skinnormal_vertex:em,specularmap_fragment:nm,specularmap_pars_fragment:im,tonemapping_fragment:sm,tonemapping_pars_fragment:rm,transmission_fragment:om,transmission_pars_fragment:am,uv_pars_fragment:lm,uv_pars_vertex:cm,uv_vertex:hm,worldpos_vertex:um,background_vert:`varying vec2 vUv;
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
}`},St={common:{diffuse:{value:new ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Jt}},envmap:{envMap:{value:null},envMapRotation:{value:new Jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Jt},normalScale:{value:new ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0},uvTransform:{value:new Jt}},sprite:{diffuse:{value:new ie(16777215)},opacity:{value:1},center:{value:new ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}}},cn={basic:{uniforms:Oe([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.fog]),vertexShader:Qt.meshbasic_vert,fragmentShader:Qt.meshbasic_frag},lambert:{uniforms:Oe([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new ie(0)}}]),vertexShader:Qt.meshlambert_vert,fragmentShader:Qt.meshlambert_frag},phong:{uniforms:Oe([St.common,St.specularmap,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.fog,St.lights,{emissive:{value:new ie(0)},specular:{value:new ie(1118481)},shininess:{value:30}}]),vertexShader:Qt.meshphong_vert,fragmentShader:Qt.meshphong_frag},standard:{uniforms:Oe([St.common,St.envmap,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.roughnessmap,St.metalnessmap,St.fog,St.lights,{emissive:{value:new ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag},toon:{uniforms:Oe([St.common,St.aomap,St.lightmap,St.emissivemap,St.bumpmap,St.normalmap,St.displacementmap,St.gradientmap,St.fog,St.lights,{emissive:{value:new ie(0)}}]),vertexShader:Qt.meshtoon_vert,fragmentShader:Qt.meshtoon_frag},matcap:{uniforms:Oe([St.common,St.bumpmap,St.normalmap,St.displacementmap,St.fog,{matcap:{value:null}}]),vertexShader:Qt.meshmatcap_vert,fragmentShader:Qt.meshmatcap_frag},points:{uniforms:Oe([St.points,St.fog]),vertexShader:Qt.points_vert,fragmentShader:Qt.points_frag},dashed:{uniforms:Oe([St.common,St.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qt.linedashed_vert,fragmentShader:Qt.linedashed_frag},depth:{uniforms:Oe([St.common,St.displacementmap]),vertexShader:Qt.depth_vert,fragmentShader:Qt.depth_frag},normal:{uniforms:Oe([St.common,St.bumpmap,St.normalmap,St.displacementmap,{opacity:{value:1}}]),vertexShader:Qt.meshnormal_vert,fragmentShader:Qt.meshnormal_frag},sprite:{uniforms:Oe([St.sprite,St.fog]),vertexShader:Qt.sprite_vert,fragmentShader:Qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qt.background_vert,fragmentShader:Qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Jt}},vertexShader:Qt.backgroundCube_vert,fragmentShader:Qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qt.cube_vert,fragmentShader:Qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qt.equirect_vert,fragmentShader:Qt.equirect_frag},distanceRGBA:{uniforms:Oe([St.common,St.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qt.distanceRGBA_vert,fragmentShader:Qt.distanceRGBA_frag},shadow:{uniforms:Oe([St.lights,St.fog,{color:{value:new ie(0)},opacity:{value:1}}]),vertexShader:Qt.shadow_vert,fragmentShader:Qt.shadow_frag}};cn.physical={uniforms:Oe([cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Jt},clearcoatNormalScale:{value:new ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Jt},sheen:{value:0},sheenColor:{value:new ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Jt},transmissionSamplerSize:{value:new ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Jt},attenuationDistance:{value:0},attenuationColor:{value:new ie(0)},specularColor:{value:new ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Jt},anisotropyVector:{value:new ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Jt}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag};const Ir={r:0,b:0,g:0},di=new ln,dm=new fe;function fm(n,t,e,i,s,r,o){const l=new ie(0);let a=r===!0?0:1,c,h,d=null,f=0,m=null;function _(R){let T=R.isScene===!0?R.background:null;return T&&T.isTexture&&(T=(R.backgroundBlurriness>0?e:t).get(T)),T}function M(R){let T=!1;const b=_(R);b===null?p(l,a):b&&b.isColor&&(p(b,1),T=!0);const k=n.xr.getEnvironmentBlendMode();k==="additive"?i.buffers.color.setClear(0,0,0,1,o):k==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||T)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(R,T){const b=_(T);b&&(b.isCubeTexture||b.mapping===sr)?(h===void 0&&(h=new ge(new rn(1,1,1),new Vn({name:"BackgroundCubeMaterial",uniforms:ji(cn.backgroundCube.uniforms),vertexShader:cn.backgroundCube.vertexShader,fragmentShader:cn.backgroundCube.fragmentShader,side:Be,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(k,P,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),di.copy(T.backgroundRotation),di.x*=-1,di.y*=-1,di.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(di.y*=-1,di.z*=-1),h.material.uniforms.envMap.value=b,h.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(dm.makeRotationFromEuler(di)),h.material.toneMapped=ae.getTransfer(b.colorSpace)!==he,(d!==b||f!==b.version||m!==n.toneMapping)&&(h.material.needsUpdate=!0,d=b,f=b.version,m=n.toneMapping),h.layers.enableAll(),R.unshift(h,h.geometry,h.material,0,0,null)):b&&b.isTexture&&(c===void 0&&(c=new ge(new Xn(2,2),new Vn({name:"BackgroundMaterial",uniforms:ji(cn.background.uniforms),vertexShader:cn.background.vertexShader,fragmentShader:cn.background.fragmentShader,side:Un,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=b,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=ae.getTransfer(b.colorSpace)!==he,b.matrixAutoUpdate===!0&&b.updateMatrix(),c.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||f!==b.version||m!==n.toneMapping)&&(c.material.needsUpdate=!0,d=b,f=b.version,m=n.toneMapping),c.layers.enableAll(),R.unshift(c,c.geometry,c.material,0,0,null))}function p(R,T){R.getRGB(Ir,Pc(n)),i.buffers.color.setClear(Ir.r,Ir.g,Ir.b,T,o)}return{getClearColor:function(){return l},setClearColor:function(R,T=1){l.set(R),a=T,p(l,a)},getClearAlpha:function(){return a},setClearAlpha:function(R){a=R,p(l,a)},render:M,addToRenderList:g}}function pm(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function l(w,U,Y,V,X){let et=!1;const W=d(V,Y,U);r!==W&&(r=W,c(r.object)),et=m(w,V,Y,X),et&&_(w,V,Y,X),X!==null&&t.update(X,n.ELEMENT_ARRAY_BUFFER),(et||o)&&(o=!1,b(w,U,Y,V),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function a(){return n.createVertexArray()}function c(w){return n.bindVertexArray(w)}function h(w){return n.deleteVertexArray(w)}function d(w,U,Y){const V=Y.wireframe===!0;let X=i[w.id];X===void 0&&(X={},i[w.id]=X);let et=X[U.id];et===void 0&&(et={},X[U.id]=et);let W=et[V];return W===void 0&&(W=f(a()),et[V]=W),W}function f(w){const U=[],Y=[],V=[];for(let X=0;X<e;X++)U[X]=0,Y[X]=0,V[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:Y,attributeDivisors:V,object:w,attributes:{},index:null}}function m(w,U,Y,V){const X=r.attributes,et=U.attributes;let W=0;const K=Y.getAttributes();for(const H in K)if(K[H].location>=0){const Mt=X[H];let It=et[H];if(It===void 0&&(H==="instanceMatrix"&&w.instanceMatrix&&(It=w.instanceMatrix),H==="instanceColor"&&w.instanceColor&&(It=w.instanceColor)),Mt===void 0||Mt.attribute!==It||It&&Mt.data!==It.data)return!0;W++}return r.attributesNum!==W||r.index!==V}function _(w,U,Y,V){const X={},et=U.attributes;let W=0;const K=Y.getAttributes();for(const H in K)if(K[H].location>=0){let Mt=et[H];Mt===void 0&&(H==="instanceMatrix"&&w.instanceMatrix&&(Mt=w.instanceMatrix),H==="instanceColor"&&w.instanceColor&&(Mt=w.instanceColor));const It={};It.attribute=Mt,Mt&&Mt.data&&(It.data=Mt.data),X[H]=It,W++}r.attributes=X,r.attributesNum=W,r.index=V}function M(){const w=r.newAttributes;for(let U=0,Y=w.length;U<Y;U++)w[U]=0}function g(w){p(w,0)}function p(w,U){const Y=r.newAttributes,V=r.enabledAttributes,X=r.attributeDivisors;Y[w]=1,V[w]===0&&(n.enableVertexAttribArray(w),V[w]=1),X[w]!==U&&(n.vertexAttribDivisor(w,U),X[w]=U)}function R(){const w=r.newAttributes,U=r.enabledAttributes;for(let Y=0,V=U.length;Y<V;Y++)U[Y]!==w[Y]&&(n.disableVertexAttribArray(Y),U[Y]=0)}function T(w,U,Y,V,X,et,W){W===!0?n.vertexAttribIPointer(w,U,Y,X,et):n.vertexAttribPointer(w,U,Y,V,X,et)}function b(w,U,Y,V){M();const X=V.attributes,et=Y.getAttributes(),W=U.defaultAttributeValues;for(const K in et){const H=et[K];if(H.location>=0){let ct=X[K];if(ct===void 0&&(K==="instanceMatrix"&&w.instanceMatrix&&(ct=w.instanceMatrix),K==="instanceColor"&&w.instanceColor&&(ct=w.instanceColor)),ct!==void 0){const Mt=ct.normalized,It=ct.itemSize,Xt=t.get(ct);if(Xt===void 0)continue;const oe=Xt.buffer,tt=Xt.type,pt=Xt.bytesPerElement,Ot=tt===n.INT||tt===n.UNSIGNED_INT||ct.gpuType===Do;if(ct.isInterleavedBufferAttribute){const mt=ct.data,Bt=mt.stride,qt=ct.offset;if(mt.isInstancedInterleavedBuffer){for(let Pt=0;Pt<H.locationSize;Pt++)p(H.location+Pt,mt.meshPerAttribute);w.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let Pt=0;Pt<H.locationSize;Pt++)g(H.location+Pt);n.bindBuffer(n.ARRAY_BUFFER,oe);for(let Pt=0;Pt<H.locationSize;Pt++)T(H.location+Pt,It/H.locationSize,tt,Mt,Bt*pt,(qt+It/H.locationSize*Pt)*pt,Ot)}else{if(ct.isInstancedBufferAttribute){for(let mt=0;mt<H.locationSize;mt++)p(H.location+mt,ct.meshPerAttribute);w.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let mt=0;mt<H.locationSize;mt++)g(H.location+mt);n.bindBuffer(n.ARRAY_BUFFER,oe);for(let mt=0;mt<H.locationSize;mt++)T(H.location+mt,It/H.locationSize,tt,Mt,It*pt,It/H.locationSize*mt*pt,Ot)}}else if(W!==void 0){const Mt=W[K];if(Mt!==void 0)switch(Mt.length){case 2:n.vertexAttrib2fv(H.location,Mt);break;case 3:n.vertexAttrib3fv(H.location,Mt);break;case 4:n.vertexAttrib4fv(H.location,Mt);break;default:n.vertexAttrib1fv(H.location,Mt)}}}}R()}function k(){O();for(const w in i){const U=i[w];for(const Y in U){const V=U[Y];for(const X in V)h(V[X].object),delete V[X];delete U[Y]}delete i[w]}}function P(w){if(i[w.id]===void 0)return;const U=i[w.id];for(const Y in U){const V=U[Y];for(const X in V)h(V[X].object),delete V[X];delete U[Y]}delete i[w.id]}function L(w){for(const U in i){const Y=i[U];if(Y[w.id]===void 0)continue;const V=Y[w.id];for(const X in V)h(V[X].object),delete V[X];delete Y[w.id]}}function O(){C(),o=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:l,reset:O,resetDefaultState:C,dispose:k,releaseStatesOfGeometry:P,releaseStatesOfProgram:L,initAttributes:M,enableAttribute:g,disableUnusedAttributes:R}}function mm(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function o(c,h,d){d!==0&&(n.drawArraysInstanced(i,c,h,d),e.update(h,i,d))}function l(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,d);let m=0;for(let _=0;_<d;_++)m+=h[_];e.update(m,i,1)}function a(c,h,d,f){if(d===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<c.length;_++)o(c[_],h[_],f[_]);else{m.multiDrawArraysInstancedWEBGL(i,c,0,h,0,f,0,d);let _=0;for(let M=0;M<d;M++)_+=h[M]*f[M];e.update(_,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=l,this.renderMultiDrawInstances=a}function gm(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const L=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(L){return!(L!==Qe&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(L){const O=L===gs&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(L!==vn&&i.convert(L)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==Mn&&!O)}function a(L){if(L==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=a(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),R=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),k=_>0,P=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:a,textureFormatReadable:o,textureTypeReadable:l,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:m,maxVertexTextures:_,maxTextureSize:M,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:R,maxVaryings:T,maxFragmentUniforms:b,vertexTextures:k,maxSamples:P}}function _m(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new $n,l=new Jt,a={value:null,needsUpdate:!1};this.uniform=a,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const m=d.length!==0||f||i!==0||s;return s=f,i=d.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){e=h(d,f,0)},this.setState=function(d,f,m){const _=d.clippingPlanes,M=d.clipIntersection,g=d.clipShadows,p=n.get(d);if(!s||_===null||_.length===0||r&&!g)r?h(null):c();else{const R=r?0:i,T=R*4;let b=p.clippingState||null;a.value=b,b=h(_,f,T,m);for(let k=0;k!==T;++k)b[k]=e[k];p.clippingState=b,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=R}};function c(){a.value!==e&&(a.value=e,a.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,f,m,_){const M=d!==null?d.length:0;let g=null;if(M!==0){if(g=a.value,_!==!0||g===null){const p=m+M*4,R=f.matrixWorldInverse;l.getNormalMatrix(R),(g===null||g.length<p)&&(g=new Float32Array(p));for(let T=0,b=m;T!==M;++T,b+=4)o.copy(d[T]).applyMatrix4(R,l),o.normal.toArray(g,b),g[b+3]=o.constant}a.value=g,a.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,g}}function xm(n){let t=new WeakMap;function e(o,l){return l===To?o.mapping=Pi:l===Ao&&(o.mapping=Ci),o}function i(o){if(o&&o.isTexture){const l=o.mapping;if(l===To||l===Ao)if(t.has(o)){const a=t.get(o).texture;return e(a,o.mapping)}else{const a=o.image;if(a&&a.height>0){const c=new cf(a.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const l=o.target;l.removeEventListener("dispose",s);const a=t.get(l);a!==void 0&&(t.delete(l),a.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class Nc extends Cc{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,l=s+e,a=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,l-=h*this.view.offsetY,a=l-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,l,a,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Qi=4,Oc=[.125,.215,.35,.446,.526,.582],fi=20,Ia=new Nc,Fc=new ie;let Ua=null,Na=0,Oa=0,Fa=!1;const pi=(1+Math.sqrt(5))/2,ts=1/pi,zc=[new F(-pi,ts,0),new F(pi,ts,0),new F(-ts,0,pi),new F(ts,0,pi),new F(0,pi,-ts),new F(0,pi,ts),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)];class Bc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){Ua=this._renderer.getRenderTarget(),Na=this._renderer.getActiveCubeFace(),Oa=this._renderer.getActiveMipmapLevel(),Fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ua,Na,Oa),this._renderer.xr.enabled=Fa,t.scissorTest=!1,Ur(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Pi||t.mapping===Ci?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ua=this._renderer.getRenderTarget(),Na=this._renderer.getActiveCubeFace(),Oa=this._renderer.getActiveMipmapLevel(),Fa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:an,minFilter:an,generateMipmaps:!1,type:gs,format:Qe,colorSpace:Ui,depthBuffer:!1},s=kc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=kc(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=vm(r)),this._blurMaterial=Mm(r,t,e)}return s}_compileMaterial(t){const e=new ge(this._lodPlanes[0],t);this._renderer.compile(e,Ia)}_sceneToCubeUV(t,e,i,s){const l=new Ke(90,1,e,i),a=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Fc),h.toneMapping=On,h.autoClear=!1;const m=new Ra({name:"PMREM.Background",side:Be,depthWrite:!1,depthTest:!1}),_=new ge(new rn,m);let M=!1;const g=t.background;g?g.isColor&&(m.color.copy(g),t.background=null,M=!0):(m.color.copy(Fc),M=!0);for(let p=0;p<6;p++){const R=p%3;R===0?(l.up.set(0,a[p],0),l.lookAt(c[p],0,0)):R===1?(l.up.set(0,0,a[p]),l.lookAt(0,c[p],0)):(l.up.set(0,a[p],0),l.lookAt(0,0,c[p]));const T=this._cubeSize;Ur(s,R*T,p>2?T:0,T,T),h.setRenderTarget(s),M&&h.render(_,l),h.render(t,l)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=f,h.autoClear=d,t.background=g}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Pi||t.mapping===Ci;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ge(this._lodPlanes[0],r),l=r.uniforms;l.envMap.value=t;const a=this._cubeSize;Ur(e,0,0,3*a,2*a),i.setRenderTarget(e),i.render(o,Ia)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),l=zc[(s-r-1)%zc.length];this._blur(t,r-1,r,o,l)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,l){const a=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new ge(this._lodPlanes[s],c),f=c.uniforms,m=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*fi-1),M=r/_,g=isFinite(r)?1+Math.floor(h*M):fi;g>fi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${fi}`);const p=[];let R=0;for(let L=0;L<fi;++L){const O=L/M,C=Math.exp(-O*O/2);p.push(C),L===0?R+=C:L<g&&(R+=2*C)}for(let L=0;L<p.length;L++)p[L]=p[L]/R;f.envMap.value=t.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=o==="latitudinal",l&&(f.poleAxis.value=l);const{_lodMax:T}=this;f.dTheta.value=_,f.mipInt.value=T-i;const b=this._sizeLods[s],k=3*b*(s>T-Qi?s-T+Qi:0),P=4*(this._cubeSize-b);Ur(e,k,P,3*b,2*b),a.setRenderTarget(e),a.render(d,Ia)}}function vm(n){const t=[],e=[],i=[];let s=n;const r=n-Qi+1+Oc.length;for(let o=0;o<r;o++){const l=Math.pow(2,s);e.push(l);let a=1/l;o>n-Qi?a=Oc[o-n+Qi-1]:o===0&&(a=0),i.push(a);const c=1/(l-2),h=-c,d=1+c,f=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,_=6,M=3,g=2,p=1,R=new Float32Array(M*_*m),T=new Float32Array(g*_*m),b=new Float32Array(p*_*m);for(let P=0;P<m;P++){const L=P%3*2/3-1,O=P>2?0:-1,C=[L,O,0,L+2/3,O,0,L+2/3,O+1,0,L,O,0,L+2/3,O+1,0,L,O+1,0];R.set(C,M*_*P),T.set(f,g*_*P);const w=[P,P,P,P,P,P];b.set(w,p*_*P)}const k=new Xe;k.setAttribute("position",new sn(R,M)),k.setAttribute("uv",new sn(T,g)),k.setAttribute("faceIndex",new sn(b,p)),t.push(k),s>Qi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function kc(n,t,e){const i=new ri(n,t,e);return i.texture.mapping=sr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ur(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Mm(n,t,e){const i=new Float32Array(fi),s=new F(0,1,0);return new Vn({name:"SphericalGaussianBlur",defines:{n:fi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:za(),fragmentShader:`

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
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function Hc(){return new Vn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:za(),fragmentShader:`

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
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function Gc(){return new Vn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function za(){return`

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
	`}function Sm(n){let t=new WeakMap,e=null;function i(l){if(l&&l.isTexture){const a=l.mapping,c=a===To||a===Ao,h=a===Pi||a===Ci;if(c||h){let d=t.get(l);const f=d!==void 0?d.texture.pmremVersion:0;if(l.isRenderTargetTexture&&l.pmremVersion!==f)return e===null&&(e=new Bc(n)),d=c?e.fromEquirectangular(l,d):e.fromCubemap(l,d),d.texture.pmremVersion=l.pmremVersion,t.set(l,d),d.texture;if(d!==void 0)return d.texture;{const m=l.image;return c&&m&&m.height>0||h&&m&&s(m)?(e===null&&(e=new Bc(n)),d=c?e.fromEquirectangular(l):e.fromCubemap(l),d.texture.pmremVersion=l.pmremVersion,t.set(l,d),l.addEventListener("dispose",r),d.texture):null}}}return l}function s(l){let a=0;const c=6;for(let h=0;h<c;h++)l[h]!==void 0&&a++;return a===c}function r(l){const a=l.target;a.removeEventListener("dispose",r);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function ym(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&Ms("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function bm(n,t,e,i){const s={},r=new WeakMap;function o(d){const f=d.target;f.index!==null&&t.remove(f.index);for(const _ in f.attributes)t.remove(f.attributes[_]);for(const _ in f.morphAttributes){const M=f.morphAttributes[_];for(let g=0,p=M.length;g<p;g++)t.remove(M[g])}f.removeEventListener("dispose",o),delete s[f.id];const m=r.get(f);m&&(t.remove(m),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function l(d,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function a(d){const f=d.attributes;for(const _ in f)t.update(f[_],n.ARRAY_BUFFER);const m=d.morphAttributes;for(const _ in m){const M=m[_];for(let g=0,p=M.length;g<p;g++)t.update(M[g],n.ARRAY_BUFFER)}}function c(d){const f=[],m=d.index,_=d.attributes.position;let M=0;if(m!==null){const R=m.array;M=m.version;for(let T=0,b=R.length;T<b;T+=3){const k=R[T+0],P=R[T+1],L=R[T+2];f.push(k,P,P,L,L,k)}}else if(_!==void 0){const R=_.array;M=_.version;for(let T=0,b=R.length/3-1;T<b;T+=3){const k=T+0,P=T+1,L=T+2;f.push(k,P,P,L,L,k)}}else return;const g=new(rc(f)?wc:Ec)(f,1);g.version=M;const p=r.get(d);p&&t.remove(p),r.set(d,g)}function h(d){const f=r.get(d);if(f){const m=d.index;m!==null&&f.version<m.version&&c(d)}else c(d);return r.get(d)}return{get:l,update:a,getWireframeAttribute:h}}function Em(n,t,e){let i;function s(f){i=f}let r,o;function l(f){r=f.type,o=f.bytesPerElement}function a(f,m){n.drawElements(i,m,r,f*o),e.update(m,i,1)}function c(f,m,_){_!==0&&(n.drawElementsInstanced(i,m,r,f*o,_),e.update(m,i,_))}function h(f,m,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,r,f,0,_);let g=0;for(let p=0;p<_;p++)g+=m[p];e.update(g,i,1)}function d(f,m,_,M){if(_===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<f.length;p++)c(f[p]/o,m[p],M[p]);else{g.multiDrawElementsInstancedWEBGL(i,m,0,r,f,0,M,0,_);let p=0;for(let R=0;R<_;R++)p+=m[R]*M[R];e.update(p,i,1)}}this.setMode=s,this.setIndex=l,this.render=a,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function wm(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,l){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=l*(r/3);break;case n.LINES:e.lines+=l*(r/2);break;case n.LINE_STRIP:e.lines+=l*(r-1);break;case n.LINE_LOOP:e.lines+=l*r;break;case n.POINTS:e.points+=l*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Tm(n,t,e){const i=new WeakMap,s=new Me;function r(o,l,a){const c=o.morphTargetInfluences,h=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,d=h!==void 0?h.length:0;let f=i.get(l);if(f===void 0||f.count!==d){let C=function(){L.dispose(),i.delete(l),l.removeEventListener("dispose",C)};f!==void 0&&f.texture.dispose();const m=l.morphAttributes.position!==void 0,_=l.morphAttributes.normal!==void 0,M=l.morphAttributes.color!==void 0,g=l.morphAttributes.position||[],p=l.morphAttributes.normal||[],R=l.morphAttributes.color||[];let T=0;m===!0&&(T=1),_===!0&&(T=2),M===!0&&(T=3);let b=l.attributes.position.count*T,k=1;b>t.maxTextureSize&&(k=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);const P=new Float32Array(b*k*4*d),L=new fc(P,b,k,d);L.type=Mn,L.needsUpdate=!0;const O=T*4;for(let w=0;w<d;w++){const U=g[w],Y=p[w],V=R[w],X=b*k*4*w;for(let et=0;et<U.count;et++){const W=et*O;m===!0&&(s.fromBufferAttribute(U,et),P[X+W+0]=s.x,P[X+W+1]=s.y,P[X+W+2]=s.z,P[X+W+3]=0),_===!0&&(s.fromBufferAttribute(Y,et),P[X+W+4]=s.x,P[X+W+5]=s.y,P[X+W+6]=s.z,P[X+W+7]=0),M===!0&&(s.fromBufferAttribute(V,et),P[X+W+8]=s.x,P[X+W+9]=s.y,P[X+W+10]=s.z,P[X+W+11]=V.itemSize===4?s.w:1)}}f={count:d,texture:L,size:new ft(b,k)},i.set(l,f),l.addEventListener("dispose",C)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)a.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let m=0;for(let M=0;M<c.length;M++)m+=c[M];const _=l.morphTargetsRelative?1:1-m;a.getUniforms().setValue(n,"morphTargetBaseInfluence",_),a.getUniforms().setValue(n,"morphTargetInfluences",c)}a.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),a.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function Am(n,t,e,i){let s=new WeakMap;function r(a){const c=i.render.frame,h=a.geometry,d=t.get(a,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),a.isInstancedMesh&&(a.hasEventListener("dispose",l)===!1&&a.addEventListener("dispose",l),s.get(a)!==c&&(e.update(a.instanceMatrix,n.ARRAY_BUFFER),a.instanceColor!==null&&e.update(a.instanceColor,n.ARRAY_BUFFER),s.set(a,c))),a.isSkinnedMesh){const f=a.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return d}function o(){s=new WeakMap}function l(a){const c=a.target;c.removeEventListener("dispose",l),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class Vc extends ke{constructor(t,e,i,s,r,o,l,a,c,h=Li){if(h!==Li&&h!==Ii)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Li&&(i=ni),i===void 0&&h===Ii&&(i=Di),super(null,s,r,o,l,a,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=l!==void 0?l:Je,this.minFilter=a!==void 0?a:Je,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Wc=new ke,$c=new Vc(1,1),Xc=new fc,qc=new Xd,Yc=new Ic,Zc=[],jc=[],Kc=new Float32Array(16),Jc=new Float32Array(9),Qc=new Float32Array(4);function es(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=Zc[s];if(r===void 0&&(r=new Float32Array(s),Zc[s]=r),t!==0){i.toArray(r,0);for(let o=1,l=0;o!==t;++o)l+=e,n[o].toArray(r,l)}return r}function we(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Te(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Nr(n,t){let e=jc[t];e===void 0&&(e=new Int32Array(t),jc[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Rm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function Pm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2fv(this.addr,t),Te(e,t)}}function Cm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;n.uniform3fv(this.addr,t),Te(e,t)}}function Dm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4fv(this.addr,t),Te(e,t)}}function Lm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Te(e,t)}else{if(we(e,i))return;Qc.set(i),n.uniformMatrix2fv(this.addr,!1,Qc),Te(e,i)}}function Im(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Te(e,t)}else{if(we(e,i))return;Jc.set(i),n.uniformMatrix3fv(this.addr,!1,Jc),Te(e,i)}}function Um(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(we(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Te(e,t)}else{if(we(e,i))return;Kc.set(i),n.uniformMatrix4fv(this.addr,!1,Kc),Te(e,i)}}function Nm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Om(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2iv(this.addr,t),Te(e,t)}}function Fm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;n.uniform3iv(this.addr,t),Te(e,t)}}function zm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4iv(this.addr,t),Te(e,t)}}function Bm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function km(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;n.uniform2uiv(this.addr,t),Te(e,t)}}function Hm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;n.uniform3uiv(this.addr,t),Te(e,t)}}function Gm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;n.uniform4uiv(this.addr,t),Te(e,t)}}function Vm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?($c.compareFunction=ec,r=$c):r=Wc,e.setTexture2D(t||r,s)}function Wm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||qc,s)}function $m(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Yc,s)}function Xm(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Xc,s)}function qm(n){switch(n){case 5126:return Rm;case 35664:return Pm;case 35665:return Cm;case 35666:return Dm;case 35674:return Lm;case 35675:return Im;case 35676:return Um;case 5124:case 35670:return Nm;case 35667:case 35671:return Om;case 35668:case 35672:return Fm;case 35669:case 35673:return zm;case 5125:return Bm;case 36294:return km;case 36295:return Hm;case 36296:return Gm;case 35678:case 36198:case 36298:case 36306:case 35682:return Vm;case 35679:case 36299:case 36307:return Wm;case 35680:case 36300:case 36308:case 36293:return $m;case 36289:case 36303:case 36311:case 36292:return Xm}}function Ym(n,t){n.uniform1fv(this.addr,t)}function Zm(n,t){const e=es(t,this.size,2);n.uniform2fv(this.addr,e)}function jm(n,t){const e=es(t,this.size,3);n.uniform3fv(this.addr,e)}function Km(n,t){const e=es(t,this.size,4);n.uniform4fv(this.addr,e)}function Jm(n,t){const e=es(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Qm(n,t){const e=es(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function tg(n,t){const e=es(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function eg(n,t){n.uniform1iv(this.addr,t)}function ng(n,t){n.uniform2iv(this.addr,t)}function ig(n,t){n.uniform3iv(this.addr,t)}function sg(n,t){n.uniform4iv(this.addr,t)}function rg(n,t){n.uniform1uiv(this.addr,t)}function og(n,t){n.uniform2uiv(this.addr,t)}function ag(n,t){n.uniform3uiv(this.addr,t)}function lg(n,t){n.uniform4uiv(this.addr,t)}function cg(n,t,e){const i=this.cache,s=t.length,r=Nr(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Te(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Wc,r[o])}function hg(n,t,e){const i=this.cache,s=t.length,r=Nr(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Te(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||qc,r[o])}function ug(n,t,e){const i=this.cache,s=t.length,r=Nr(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Te(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Yc,r[o])}function dg(n,t,e){const i=this.cache,s=t.length,r=Nr(e,s);we(i,r)||(n.uniform1iv(this.addr,r),Te(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Xc,r[o])}function fg(n){switch(n){case 5126:return Ym;case 35664:return Zm;case 35665:return jm;case 35666:return Km;case 35674:return Jm;case 35675:return Qm;case 35676:return tg;case 5124:case 35670:return eg;case 35667:case 35671:return ng;case 35668:case 35672:return ig;case 35669:case 35673:return sg;case 5125:return rg;case 36294:return og;case 36295:return ag;case 36296:return lg;case 35678:case 36198:case 36298:case 36306:case 35682:return cg;case 35679:case 36299:case 36307:return hg;case 35680:case 36300:case 36308:case 36293:return ug;case 36289:case 36303:case 36311:case 36292:return dg}}class pg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=qm(e.type)}}class mg{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=fg(e.type)}}class gg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const l=s[r];l.setValue(t,e[l.id],i)}}}const Ba=/(\w+)(\])?(\[|\.)?/g;function th(n,t){n.seq.push(t),n.map[t.id]=t}function _g(n,t,e){const i=n.name,s=i.length;for(Ba.lastIndex=0;;){const r=Ba.exec(i),o=Ba.lastIndex;let l=r[1];const a=r[2]==="]",c=r[3];if(a&&(l=l|0),c===void 0||c==="["&&o+2===s){th(e,c===void 0?new pg(l,n,t):new mg(l,n,t));break}else{let d=e.map[l];d===void 0&&(d=new gg(l),th(e,d)),e=d}}}class Or{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);_g(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const l=e[r],a=i[l.id];a.needsUpdate!==!1&&l.setValue(t,a.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function eh(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const xg=37297;let vg=0;function Mg(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const l=o+1;i.push(`${l===t?">":" "} ${l}: ${e[o]}`)}return i.join(`
`)}const nh=new Jt;function Sg(n){ae._getMatrix(nh,ae.workingColorSpace,n);const t=`mat3( ${nh.elements.map(e=>e.toFixed(4))} )`;switch(ae.getTransfer(n)){case ur:return[t,"LinearTransferOETF"];case he:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function ih(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Mg(n.getShaderSource(t),o)}else return s}function yg(n,t){const e=Sg(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function bg(n,t){let e;switch(t){case sd:e="Linear";break;case rd:e="Reinhard";break;case od:e="Cineon";break;case ad:e="ACESFilmic";break;case cd:e="AgX";break;case hd:e="Neutral";break;case ld:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Fr=new F;function Eg(){ae.getLuminanceCoefficients(Fr);const n=Fr.x.toFixed(4),t=Fr.y.toFixed(4),e=Fr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function wg(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ws).join(`
`)}function Tg(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Ag(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let l=1;r.type===n.FLOAT_MAT2&&(l=2),r.type===n.FLOAT_MAT3&&(l=3),r.type===n.FLOAT_MAT4&&(l=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:l}}return e}function ws(n){return n!==""}function sh(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function rh(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Rg=/^[ \t]*#include +<([\w\d./]+)>/gm;function ka(n){return n.replace(Rg,Cg)}const Pg=new Map;function Cg(n,t){let e=Qt[t];if(e===void 0){const i=Pg.get(t);if(i!==void 0)e=Qt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return ka(e)}const Dg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function oh(n){return n.replace(Dg,Lg)}function Lg(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ah(n){let t=`precision ${n.precision} float;
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
#define LOW_PRECISION`),t}function Ig(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Ol?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Fl?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===_n&&(t="SHADOWMAP_TYPE_VSM"),t}function Ug(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Pi:case Ci:t="ENVMAP_TYPE_CUBE";break;case sr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Ng(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Ci:t="ENVMAP_MODE_REFRACTION";break}return t}function Og(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Hl:t="ENVMAP_BLENDING_MULTIPLY";break;case nd:t="ENVMAP_BLENDING_MIX";break;case id:t="ENVMAP_BLENDING_ADD";break}return t}function Fg(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function zg(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,l=e.fragmentShader;const a=Ig(e),c=Ug(e),h=Ng(e),d=Og(e),f=Fg(e),m=wg(e),_=Tg(r),M=s.createProgram();let g,p,R=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ws).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(ws).join(`
`),p.length>0&&(p+=`
`)):(g=[ah(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+a:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ws).join(`
`),p=[ah(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+a:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==On?"#define TONE_MAPPING":"",e.toneMapping!==On?Qt.tonemapping_pars_fragment:"",e.toneMapping!==On?bg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Qt.colorspace_pars_fragment,yg("linearToOutputTexel",e.outputColorSpace),Eg(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ws).join(`
`)),o=ka(o),o=sh(o,e),o=rh(o,e),l=ka(l),l=sh(l,e),l=rh(l,e),o=oh(o),l=oh(l),e.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===ic?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ic?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const T=R+g+o,b=R+p+l,k=eh(s,s.VERTEX_SHADER,T),P=eh(s,s.FRAGMENT_SHADER,b);s.attachShader(M,k),s.attachShader(M,P),e.index0AttributeName!==void 0?s.bindAttribLocation(M,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function L(U){if(n.debug.checkShaderErrors){const Y=s.getProgramInfoLog(M).trim(),V=s.getShaderInfoLog(k).trim(),X=s.getShaderInfoLog(P).trim();let et=!0,W=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(et=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,M,k,P);else{const K=ih(s,k,"vertex"),H=ih(s,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+Y+`
`+K+`
`+H)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(V===""||X==="")&&(W=!1);W&&(U.diagnostics={runnable:et,programLog:Y,vertexShader:{log:V,prefix:g},fragmentShader:{log:X,prefix:p}})}s.deleteShader(k),s.deleteShader(P),O=new Or(s,M),C=Ag(s,M)}let O;this.getUniforms=function(){return O===void 0&&L(this),O};let C;this.getAttributes=function(){return C===void 0&&L(this),C};let w=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=s.getProgramParameter(M,xg)),w},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=vg++,this.cacheKey=t,this.usedTimes=1,this.program=M,this.vertexShader=k,this.fragmentShader=P,this}let Bg=0;class kg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Hg(t),e.set(t,i)),i}}class Hg{constructor(t){this.id=Bg++,this.code=t,this.usedTimes=0}}function Gg(n,t,e,i,s,r,o){const l=new xa,a=new kg,c=new Set,h=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures;let m=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(C){return c.add(C),C===0?"uv":`uv${C}`}function g(C,w,U,Y,V){const X=Y.fog,et=V.geometry,W=C.isMeshStandardMaterial?Y.environment:null,K=(C.isMeshStandardMaterial?e:t).get(C.envMap||W),H=K&&K.mapping===sr?K.image.height:null,ct=_[C.type];C.precision!==null&&(m=s.getMaxPrecision(C.precision),m!==C.precision&&console.warn("THREE.WebGLProgram.getParameters:",C.precision,"not supported, using",m,"instead."));const Mt=et.morphAttributes.position||et.morphAttributes.normal||et.morphAttributes.color,It=Mt!==void 0?Mt.length:0;let Xt=0;et.morphAttributes.position!==void 0&&(Xt=1),et.morphAttributes.normal!==void 0&&(Xt=2),et.morphAttributes.color!==void 0&&(Xt=3);let oe,tt,pt,Ot;if(ct){const ce=cn[ct];oe=ce.vertexShader,tt=ce.fragmentShader}else oe=C.vertexShader,tt=C.fragmentShader,a.update(C),pt=a.getVertexShaderID(C),Ot=a.getFragmentShaderID(C);const mt=n.getRenderTarget(),Bt=n.state.buffers.depth.getReversed(),qt=V.isInstancedMesh===!0,Pt=V.isBatchedMesh===!0,se=!!C.map,it=!!C.matcap,dt=!!K,I=!!C.aoMap,zt=!!C.lightMap,lt=!!C.bumpMap,Ct=!!C.normalMap,_t=!!C.displacementMap,kt=!!C.emissiveMap,Rt=!!C.metalnessMap,D=!!C.roughnessMap,E=C.anisotropy>0,G=C.clearcoat>0,J=C.dispersion>0,rt=C.iridescence>0,Q=C.sheen>0,Nt=C.transmission>0,yt=E&&!!C.anisotropyMap,Dt=G&&!!C.clearcoatMap,te=G&&!!C.clearcoatNormalMap,ut=G&&!!C.clearcoatRoughnessMap,Lt=rt&&!!C.iridescenceMap,Ht=rt&&!!C.iridescenceThicknessMap,Wt=Q&&!!C.sheenColorMap,bt=Q&&!!C.sheenRoughnessMap,re=!!C.specularMap,jt=!!C.specularColorMap,de=!!C.specularIntensityMap,B=Nt&&!!C.transmissionMap,Et=Nt&&!!C.thicknessMap,Z=!!C.gradientMap,nt=!!C.alphaMap,Tt=C.alphaTest>0,gt=!!C.alphaHash,Vt=!!C.extensions;let Yt=On;C.toneMapped&&(mt===null||mt.isXRRenderTarget===!0)&&(Yt=n.toneMapping);const be={shaderID:ct,shaderType:C.type,shaderName:C.name,vertexShader:oe,fragmentShader:tt,defines:C.defines,customVertexShaderID:pt,customFragmentShaderID:Ot,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:m,batching:Pt,batchingColor:Pt&&V._colorsTexture!==null,instancing:qt,instancingColor:qt&&V.instanceColor!==null,instancingMorph:qt&&V.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:mt===null?n.outputColorSpace:mt.isXRRenderTarget===!0?mt.texture.colorSpace:Ui,alphaToCoverage:!!C.alphaToCoverage,map:se,matcap:it,envMap:dt,envMapMode:dt&&K.mapping,envMapCubeUVHeight:H,aoMap:I,lightMap:zt,bumpMap:lt,normalMap:Ct,displacementMap:f&&_t,emissiveMap:kt,normalMapObjectSpace:Ct&&C.normalMapType===pd,normalMapTangentSpace:Ct&&C.normalMapType===Ql,metalnessMap:Rt,roughnessMap:D,anisotropy:E,anisotropyMap:yt,clearcoat:G,clearcoatMap:Dt,clearcoatNormalMap:te,clearcoatRoughnessMap:ut,dispersion:J,iridescence:rt,iridescenceMap:Lt,iridescenceThicknessMap:Ht,sheen:Q,sheenColorMap:Wt,sheenRoughnessMap:bt,specularMap:re,specularColorMap:jt,specularIntensityMap:de,transmission:Nt,transmissionMap:B,thicknessMap:Et,gradientMap:Z,opaque:C.transparent===!1&&C.blending===Ai&&C.alphaToCoverage===!1,alphaMap:nt,alphaTest:Tt,alphaHash:gt,combine:C.combine,mapUv:se&&M(C.map.channel),aoMapUv:I&&M(C.aoMap.channel),lightMapUv:zt&&M(C.lightMap.channel),bumpMapUv:lt&&M(C.bumpMap.channel),normalMapUv:Ct&&M(C.normalMap.channel),displacementMapUv:_t&&M(C.displacementMap.channel),emissiveMapUv:kt&&M(C.emissiveMap.channel),metalnessMapUv:Rt&&M(C.metalnessMap.channel),roughnessMapUv:D&&M(C.roughnessMap.channel),anisotropyMapUv:yt&&M(C.anisotropyMap.channel),clearcoatMapUv:Dt&&M(C.clearcoatMap.channel),clearcoatNormalMapUv:te&&M(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ut&&M(C.clearcoatRoughnessMap.channel),iridescenceMapUv:Lt&&M(C.iridescenceMap.channel),iridescenceThicknessMapUv:Ht&&M(C.iridescenceThicknessMap.channel),sheenColorMapUv:Wt&&M(C.sheenColorMap.channel),sheenRoughnessMapUv:bt&&M(C.sheenRoughnessMap.channel),specularMapUv:re&&M(C.specularMap.channel),specularColorMapUv:jt&&M(C.specularColorMap.channel),specularIntensityMapUv:de&&M(C.specularIntensityMap.channel),transmissionMapUv:B&&M(C.transmissionMap.channel),thicknessMapUv:Et&&M(C.thicknessMap.channel),alphaMapUv:nt&&M(C.alphaMap.channel),vertexTangents:!!et.attributes.tangent&&(Ct||E),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!et.attributes.color&&et.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!et.attributes.uv&&(se||nt),fog:!!X,useFog:C.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:C.flatShading===!0,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Bt,skinning:V.isSkinnedMesh===!0,morphTargets:et.morphAttributes.position!==void 0,morphNormals:et.morphAttributes.normal!==void 0,morphColors:et.morphAttributes.color!==void 0,morphTargetsCount:It,morphTextureStride:Xt,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:C.dithering,shadowMapEnabled:n.shadowMap.enabled&&U.length>0,shadowMapType:n.shadowMap.type,toneMapping:Yt,decodeVideoTexture:se&&C.map.isVideoTexture===!0&&ae.getTransfer(C.map.colorSpace)===he,decodeVideoTextureEmissive:kt&&C.emissiveMap.isVideoTexture===!0&&ae.getTransfer(C.emissiveMap.colorSpace)===he,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===xn,flipSided:C.side===Be,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionClipCullDistance:Vt&&C.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Vt&&C.extensions.multiDraw===!0||Pt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()};return be.vertexUv1s=c.has(1),be.vertexUv2s=c.has(2),be.vertexUv3s=c.has(3),c.clear(),be}function p(C){const w=[];if(C.shaderID?w.push(C.shaderID):(w.push(C.customVertexShaderID),w.push(C.customFragmentShaderID)),C.defines!==void 0)for(const U in C.defines)w.push(U),w.push(C.defines[U]);return C.isRawShaderMaterial===!1&&(R(w,C),T(w,C),w.push(n.outputColorSpace)),w.push(C.customProgramCacheKey),w.join()}function R(C,w){C.push(w.precision),C.push(w.outputColorSpace),C.push(w.envMapMode),C.push(w.envMapCubeUVHeight),C.push(w.mapUv),C.push(w.alphaMapUv),C.push(w.lightMapUv),C.push(w.aoMapUv),C.push(w.bumpMapUv),C.push(w.normalMapUv),C.push(w.displacementMapUv),C.push(w.emissiveMapUv),C.push(w.metalnessMapUv),C.push(w.roughnessMapUv),C.push(w.anisotropyMapUv),C.push(w.clearcoatMapUv),C.push(w.clearcoatNormalMapUv),C.push(w.clearcoatRoughnessMapUv),C.push(w.iridescenceMapUv),C.push(w.iridescenceThicknessMapUv),C.push(w.sheenColorMapUv),C.push(w.sheenRoughnessMapUv),C.push(w.specularMapUv),C.push(w.specularColorMapUv),C.push(w.specularIntensityMapUv),C.push(w.transmissionMapUv),C.push(w.thicknessMapUv),C.push(w.combine),C.push(w.fogExp2),C.push(w.sizeAttenuation),C.push(w.morphTargetsCount),C.push(w.morphAttributeCount),C.push(w.numDirLights),C.push(w.numPointLights),C.push(w.numSpotLights),C.push(w.numSpotLightMaps),C.push(w.numHemiLights),C.push(w.numRectAreaLights),C.push(w.numDirLightShadows),C.push(w.numPointLightShadows),C.push(w.numSpotLightShadows),C.push(w.numSpotLightShadowsWithMaps),C.push(w.numLightProbes),C.push(w.shadowMapType),C.push(w.toneMapping),C.push(w.numClippingPlanes),C.push(w.numClipIntersection),C.push(w.depthPacking)}function T(C,w){l.disableAll(),w.supportsVertexTextures&&l.enable(0),w.instancing&&l.enable(1),w.instancingColor&&l.enable(2),w.instancingMorph&&l.enable(3),w.matcap&&l.enable(4),w.envMap&&l.enable(5),w.normalMapObjectSpace&&l.enable(6),w.normalMapTangentSpace&&l.enable(7),w.clearcoat&&l.enable(8),w.iridescence&&l.enable(9),w.alphaTest&&l.enable(10),w.vertexColors&&l.enable(11),w.vertexAlphas&&l.enable(12),w.vertexUv1s&&l.enable(13),w.vertexUv2s&&l.enable(14),w.vertexUv3s&&l.enable(15),w.vertexTangents&&l.enable(16),w.anisotropy&&l.enable(17),w.alphaHash&&l.enable(18),w.batching&&l.enable(19),w.dispersion&&l.enable(20),w.batchingColor&&l.enable(21),C.push(l.mask),l.disableAll(),w.fog&&l.enable(0),w.useFog&&l.enable(1),w.flatShading&&l.enable(2),w.logarithmicDepthBuffer&&l.enable(3),w.reverseDepthBuffer&&l.enable(4),w.skinning&&l.enable(5),w.morphTargets&&l.enable(6),w.morphNormals&&l.enable(7),w.morphColors&&l.enable(8),w.premultipliedAlpha&&l.enable(9),w.shadowMapEnabled&&l.enable(10),w.doubleSided&&l.enable(11),w.flipSided&&l.enable(12),w.useDepthPacking&&l.enable(13),w.dithering&&l.enable(14),w.transmission&&l.enable(15),w.sheen&&l.enable(16),w.opaque&&l.enable(17),w.pointsUvs&&l.enable(18),w.decodeVideoTexture&&l.enable(19),w.decodeVideoTextureEmissive&&l.enable(20),w.alphaToCoverage&&l.enable(21),C.push(l.mask)}function b(C){const w=_[C.type];let U;if(w){const Y=cn[w];U=rf.clone(Y.uniforms)}else U=C.uniforms;return U}function k(C,w){let U;for(let Y=0,V=h.length;Y<V;Y++){const X=h[Y];if(X.cacheKey===w){U=X,++U.usedTimes;break}}return U===void 0&&(U=new zg(n,w,C,r),h.push(U)),U}function P(C){if(--C.usedTimes===0){const w=h.indexOf(C);h[w]=h[h.length-1],h.pop(),C.destroy()}}function L(C){a.remove(C)}function O(){a.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:b,acquireProgram:k,releaseProgram:P,releaseShaderCache:L,programs:h,dispose:O}}function Vg(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let l=n.get(o);return l===void 0&&(l={},n.set(o,l)),l}function i(o){n.delete(o)}function s(o,l,a){n.get(o)[l]=a}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Wg(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function lh(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function ch(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(d,f,m,_,M,g){let p=n[t];return p===void 0?(p={id:d.id,object:d,geometry:f,material:m,groupOrder:_,renderOrder:d.renderOrder,z:M,group:g},n[t]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=m,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=M,p.group=g),t++,p}function l(d,f,m,_,M,g){const p=o(d,f,m,_,M,g);m.transmission>0?i.push(p):m.transparent===!0?s.push(p):e.push(p)}function a(d,f,m,_,M,g){const p=o(d,f,m,_,M,g);m.transmission>0?i.unshift(p):m.transparent===!0?s.unshift(p):e.unshift(p)}function c(d,f){e.length>1&&e.sort(d||Wg),i.length>1&&i.sort(f||lh),s.length>1&&s.sort(f||lh)}function h(){for(let d=t,f=n.length;d<f;d++){const m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:l,unshift:a,finish:h,sort:c}}function $g(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new ch,n.set(i,[o])):s>=r.length?(o=new ch,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function Xg(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new ie};break;case"SpotLight":e={position:new F,direction:new F,color:new ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new ie,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new ie,groundColor:new ie};break;case"RectAreaLight":e={color:new ie,position:new F,halfWidth:new F,halfHeight:new F};break}return n[t.id]=e,e}}}function qg(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let Yg=0;function Zg(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function jg(n){const t=new Xg,e=qg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new F);const s=new F,r=new fe,o=new fe;function l(c){let h=0,d=0,f=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let m=0,_=0,M=0,g=0,p=0,R=0,T=0,b=0,k=0,P=0,L=0;c.sort(Zg);for(let C=0,w=c.length;C<w;C++){const U=c[C],Y=U.color,V=U.intensity,X=U.distance,et=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)h+=Y.r*V,d+=Y.g*V,f+=Y.b*V;else if(U.isLightProbe){for(let W=0;W<9;W++)i.probe[W].addScaledVector(U.sh.coefficients[W],V);L++}else if(U.isDirectionalLight){const W=t.get(U);if(W.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const K=U.shadow,H=e.get(U);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,i.directionalShadow[m]=H,i.directionalShadowMap[m]=et,i.directionalShadowMatrix[m]=U.shadow.matrix,R++}i.directional[m]=W,m++}else if(U.isSpotLight){const W=t.get(U);W.position.setFromMatrixPosition(U.matrixWorld),W.color.copy(Y).multiplyScalar(V),W.distance=X,W.coneCos=Math.cos(U.angle),W.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),W.decay=U.decay,i.spot[M]=W;const K=U.shadow;if(U.map&&(i.spotLightMap[k]=U.map,k++,K.updateMatrices(U),U.castShadow&&P++),i.spotLightMatrix[M]=K.matrix,U.castShadow){const H=e.get(U);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,i.spotShadow[M]=H,i.spotShadowMap[M]=et,b++}M++}else if(U.isRectAreaLight){const W=t.get(U);W.color.copy(Y).multiplyScalar(V),W.halfWidth.set(U.width*.5,0,0),W.halfHeight.set(0,U.height*.5,0),i.rectArea[g]=W,g++}else if(U.isPointLight){const W=t.get(U);if(W.color.copy(U.color).multiplyScalar(U.intensity),W.distance=U.distance,W.decay=U.decay,U.castShadow){const K=U.shadow,H=e.get(U);H.shadowIntensity=K.intensity,H.shadowBias=K.bias,H.shadowNormalBias=K.normalBias,H.shadowRadius=K.radius,H.shadowMapSize=K.mapSize,H.shadowCameraNear=K.camera.near,H.shadowCameraFar=K.camera.far,i.pointShadow[_]=H,i.pointShadowMap[_]=et,i.pointShadowMatrix[_]=U.shadow.matrix,T++}i.point[_]=W,_++}else if(U.isHemisphereLight){const W=t.get(U);W.skyColor.copy(U.color).multiplyScalar(V),W.groundColor.copy(U.groundColor).multiplyScalar(V),i.hemi[p]=W,p++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=St.LTC_FLOAT_1,i.rectAreaLTC2=St.LTC_FLOAT_2):(i.rectAreaLTC1=St.LTC_HALF_1,i.rectAreaLTC2=St.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=f;const O=i.hash;(O.directionalLength!==m||O.pointLength!==_||O.spotLength!==M||O.rectAreaLength!==g||O.hemiLength!==p||O.numDirectionalShadows!==R||O.numPointShadows!==T||O.numSpotShadows!==b||O.numSpotMaps!==k||O.numLightProbes!==L)&&(i.directional.length=m,i.spot.length=M,i.rectArea.length=g,i.point.length=_,i.hemi.length=p,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=R,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=b+k-P,i.spotLightMap.length=k,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=L,O.directionalLength=m,O.pointLength=_,O.spotLength=M,O.rectAreaLength=g,O.hemiLength=p,O.numDirectionalShadows=R,O.numPointShadows=T,O.numSpotShadows=b,O.numSpotMaps=k,O.numLightProbes=L,i.version=Yg++)}function a(c,h){let d=0,f=0,m=0,_=0,M=0;const g=h.matrixWorldInverse;for(let p=0,R=c.length;p<R;p++){const T=c[p];if(T.isDirectionalLight){const b=i.directional[d];b.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(g),d++}else if(T.isSpotLight){const b=i.spot[m];b.position.setFromMatrixPosition(T.matrixWorld),b.position.applyMatrix4(g),b.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(g),m++}else if(T.isRectAreaLight){const b=i.rectArea[_];b.position.setFromMatrixPosition(T.matrixWorld),b.position.applyMatrix4(g),o.identity(),r.copy(T.matrixWorld),r.premultiply(g),o.extractRotation(r),b.halfWidth.set(T.width*.5,0,0),b.halfHeight.set(0,T.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),_++}else if(T.isPointLight){const b=i.point[f];b.position.setFromMatrixPosition(T.matrixWorld),b.position.applyMatrix4(g),f++}else if(T.isHemisphereLight){const b=i.hemi[M];b.direction.setFromMatrixPosition(T.matrixWorld),b.direction.transformDirection(g),M++}}}return{setup:l,setupView:a,state:i}}function hh(n){const t=new jg(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function o(h){i.push(h)}function l(){t.setup(e)}function a(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:l,setupLightsView:a,pushLight:r,pushShadow:o}}function Kg(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let l;return o===void 0?(l=new hh(n),t.set(s,[l])):r>=o.length?(l=new hh(n),o.push(l)):l=o[r],l}function i(){t=new WeakMap}return{get:e,dispose:i}}class Jg extends Yi{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=dd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Qg extends Yi{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const t_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,e_=`uniform sampler2D shadow_pass;
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
}`;function n_(n,t,e){let i=new La;const s=new ft,r=new ft,o=new Me,l=new Jg({depthPacking:fd}),a=new Qg,c={},h=e.maxTextureSize,d={[Un]:Be,[Be]:Un,[xn]:xn},f=new Vn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ft},radius:{value:4}},vertexShader:t_,fragmentShader:e_}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const _=new Xe;_.setAttribute("position",new sn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new ge(_,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ol;let p=this.type;this.render=function(P,L,O){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||P.length===0)return;const C=n.getRenderTarget(),w=n.getActiveCubeFace(),U=n.getActiveMipmapLevel(),Y=n.state;Y.setBlending(Nn),Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);const V=p!==_n&&this.type===_n,X=p===_n&&this.type!==_n;for(let et=0,W=P.length;et<W;et++){const K=P[et],H=K.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const ct=H.getFrameExtents();if(s.multiply(ct),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ct.x),s.x=r.x*ct.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ct.y),s.y=r.y*ct.y,H.mapSize.y=r.y)),H.map===null||V===!0||X===!0){const It=this.type!==_n?{minFilter:Je,magFilter:Je}:{};H.map!==null&&H.map.dispose(),H.map=new ri(s.x,s.y,It),H.map.texture.name=K.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const Mt=H.getViewportCount();for(let It=0;It<Mt;It++){const Xt=H.getViewport(It);o.set(r.x*Xt.x,r.y*Xt.y,r.x*Xt.z,r.y*Xt.w),Y.viewport(o),H.updateMatrices(K,It),i=H.getFrustum(),b(L,O,H.camera,K,this.type)}H.isPointLightShadow!==!0&&this.type===_n&&R(H,O),H.needsUpdate=!1}p=this.type,g.needsUpdate=!1,n.setRenderTarget(C,w,U)};function R(P,L){const O=t.update(M);f.defines.VSM_SAMPLES!==P.blurSamples&&(f.defines.VSM_SAMPLES=P.blurSamples,m.defines.VSM_SAMPLES=P.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new ri(s.x,s.y)),f.uniforms.shadow_pass.value=P.map.texture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,n.setRenderTarget(P.mapPass),n.clear(),n.renderBufferDirect(L,null,O,f,M,null),m.uniforms.shadow_pass.value=P.mapPass.texture,m.uniforms.resolution.value=P.mapSize,m.uniforms.radius.value=P.radius,n.setRenderTarget(P.map),n.clear(),n.renderBufferDirect(L,null,O,m,M,null)}function T(P,L,O,C){let w=null;const U=O.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(U!==void 0)w=U;else if(w=O.isPointLight===!0?a:l,n.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0){const Y=w.uuid,V=L.uuid;let X=c[Y];X===void 0&&(X={},c[Y]=X);let et=X[V];et===void 0&&(et=w.clone(),X[V]=et,L.addEventListener("dispose",k)),w=et}if(w.visible=L.visible,w.wireframe=L.wireframe,C===_n?w.side=L.shadowSide!==null?L.shadowSide:L.side:w.side=L.shadowSide!==null?L.shadowSide:d[L.side],w.alphaMap=L.alphaMap,w.alphaTest=L.alphaTest,w.map=L.map,w.clipShadows=L.clipShadows,w.clippingPlanes=L.clippingPlanes,w.clipIntersection=L.clipIntersection,w.displacementMap=L.displacementMap,w.displacementScale=L.displacementScale,w.displacementBias=L.displacementBias,w.wireframeLinewidth=L.wireframeLinewidth,w.linewidth=L.linewidth,O.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const Y=n.properties.get(w);Y.light=O}return w}function b(P,L,O,C,w){if(P.visible===!1)return;if(P.layers.test(L.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&w===_n)&&(!P.frustumCulled||i.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,P.matrixWorld);const V=t.update(P),X=P.material;if(Array.isArray(X)){const et=V.groups;for(let W=0,K=et.length;W<K;W++){const H=et[W],ct=X[H.materialIndex];if(ct&&ct.visible){const Mt=T(P,ct,C,w);P.onBeforeShadow(n,P,L,O,V,Mt,H),n.renderBufferDirect(O,null,V,Mt,P,H),P.onAfterShadow(n,P,L,O,V,Mt,H)}}}else if(X.visible){const et=T(P,X,C,w);P.onBeforeShadow(n,P,L,O,V,et,null),n.renderBufferDirect(O,null,V,et,P,null),P.onAfterShadow(n,P,L,O,V,et,null)}}const Y=P.children;for(let V=0,X=Y.length;V<X;V++)b(Y[V],L,O,C,w)}function k(P){P.target.removeEventListener("dispose",k);for(const O in c){const C=c[O],w=P.target.uuid;w in C&&(C[w].dispose(),delete C[w])}}}const i_={[vo]:Mo,[So]:Eo,[yo]:wo,[Ri]:bo,[Mo]:vo,[Eo]:So,[wo]:yo,[bo]:Ri};function s_(n,t){function e(){let B=!1;const Et=new Me;let Z=null;const nt=new Me(0,0,0,0);return{setMask:function(Tt){Z!==Tt&&!B&&(n.colorMask(Tt,Tt,Tt,Tt),Z=Tt)},setLocked:function(Tt){B=Tt},setClear:function(Tt,gt,Vt,Yt,be){be===!0&&(Tt*=Yt,gt*=Yt,Vt*=Yt),Et.set(Tt,gt,Vt,Yt),nt.equals(Et)===!1&&(n.clearColor(Tt,gt,Vt,Yt),nt.copy(Et))},reset:function(){B=!1,Z=null,nt.set(-1,0,0,0)}}}function i(){let B=!1,Et=!1,Z=null,nt=null,Tt=null;return{setReversed:function(gt){if(Et!==gt){const Vt=t.get("EXT_clip_control");Et?Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.ZERO_TO_ONE_EXT):Vt.clipControlEXT(Vt.LOWER_LEFT_EXT,Vt.NEGATIVE_ONE_TO_ONE_EXT);const Yt=Tt;Tt=null,this.setClear(Yt)}Et=gt},getReversed:function(){return Et},setTest:function(gt){gt?mt(n.DEPTH_TEST):Bt(n.DEPTH_TEST)},setMask:function(gt){Z!==gt&&!B&&(n.depthMask(gt),Z=gt)},setFunc:function(gt){if(Et&&(gt=i_[gt]),nt!==gt){switch(gt){case vo:n.depthFunc(n.NEVER);break;case Mo:n.depthFunc(n.ALWAYS);break;case So:n.depthFunc(n.LESS);break;case Ri:n.depthFunc(n.LEQUAL);break;case yo:n.depthFunc(n.EQUAL);break;case bo:n.depthFunc(n.GEQUAL);break;case Eo:n.depthFunc(n.GREATER);break;case wo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}nt=gt}},setLocked:function(gt){B=gt},setClear:function(gt){Tt!==gt&&(Et&&(gt=1-gt),n.clearDepth(gt),Tt=gt)},reset:function(){B=!1,Z=null,nt=null,Tt=null,Et=!1}}}function s(){let B=!1,Et=null,Z=null,nt=null,Tt=null,gt=null,Vt=null,Yt=null,be=null;return{setTest:function(ce){B||(ce?mt(n.STENCIL_TEST):Bt(n.STENCIL_TEST))},setMask:function(ce){Et!==ce&&!B&&(n.stencilMask(ce),Et=ce)},setFunc:function(ce,Fe,qe){(Z!==ce||nt!==Fe||Tt!==qe)&&(n.stencilFunc(ce,Fe,qe),Z=ce,nt=Fe,Tt=qe)},setOp:function(ce,Fe,qe){(gt!==ce||Vt!==Fe||Yt!==qe)&&(n.stencilOp(ce,Fe,qe),gt=ce,Vt=Fe,Yt=qe)},setLocked:function(ce){B=ce},setClear:function(ce){be!==ce&&(n.clearStencil(ce),be=ce)},reset:function(){B=!1,Et=null,Z=null,nt=null,Tt=null,gt=null,Vt=null,Yt=null,be=null}}}const r=new e,o=new i,l=new s,a=new WeakMap,c=new WeakMap;let h={},d={},f=new WeakMap,m=[],_=null,M=!1,g=null,p=null,R=null,T=null,b=null,k=null,P=null,L=new ie(0,0,0),O=0,C=!1,w=null,U=null,Y=null,V=null,X=null;const et=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,K=0;const H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(H)[1]),W=K>=1):H.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),W=K>=2);let ct=null,Mt={};const It=n.getParameter(n.SCISSOR_BOX),Xt=n.getParameter(n.VIEWPORT),oe=new Me().fromArray(It),tt=new Me().fromArray(Xt);function pt(B,Et,Z,nt){const Tt=new Uint8Array(4),gt=n.createTexture();n.bindTexture(B,gt),n.texParameteri(B,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(B,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Vt=0;Vt<Z;Vt++)B===n.TEXTURE_3D||B===n.TEXTURE_2D_ARRAY?n.texImage3D(Et,0,n.RGBA,1,1,nt,0,n.RGBA,n.UNSIGNED_BYTE,Tt):n.texImage2D(Et+Vt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Tt);return gt}const Ot={};Ot[n.TEXTURE_2D]=pt(n.TEXTURE_2D,n.TEXTURE_2D,1),Ot[n.TEXTURE_CUBE_MAP]=pt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ot[n.TEXTURE_2D_ARRAY]=pt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ot[n.TEXTURE_3D]=pt(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),l.setClear(0),mt(n.DEPTH_TEST),o.setFunc(Ri),lt(!1),Ct(Nl),mt(n.CULL_FACE),I(Nn);function mt(B){h[B]!==!0&&(n.enable(B),h[B]=!0)}function Bt(B){h[B]!==!1&&(n.disable(B),h[B]=!1)}function qt(B,Et){return d[B]!==Et?(n.bindFramebuffer(B,Et),d[B]=Et,B===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=Et),B===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=Et),!0):!1}function Pt(B,Et){let Z=m,nt=!1;if(B){Z=f.get(Et),Z===void 0&&(Z=[],f.set(Et,Z));const Tt=B.textures;if(Z.length!==Tt.length||Z[0]!==n.COLOR_ATTACHMENT0){for(let gt=0,Vt=Tt.length;gt<Vt;gt++)Z[gt]=n.COLOR_ATTACHMENT0+gt;Z.length=Tt.length,nt=!0}}else Z[0]!==n.BACK&&(Z[0]=n.BACK,nt=!0);nt&&n.drawBuffers(Z)}function se(B){return _!==B?(n.useProgram(B),_=B,!0):!1}const it={[Qn]:n.FUNC_ADD,[Bu]:n.FUNC_SUBTRACT,[ku]:n.FUNC_REVERSE_SUBTRACT};it[Hu]=n.MIN,it[Gu]=n.MAX;const dt={[Vu]:n.ZERO,[Wu]:n.ONE,[$u]:n.SRC_COLOR,[_o]:n.SRC_ALPHA,[Ku]:n.SRC_ALPHA_SATURATE,[Zu]:n.DST_COLOR,[qu]:n.DST_ALPHA,[Xu]:n.ONE_MINUS_SRC_COLOR,[xo]:n.ONE_MINUS_SRC_ALPHA,[ju]:n.ONE_MINUS_DST_COLOR,[Yu]:n.ONE_MINUS_DST_ALPHA,[Ju]:n.CONSTANT_COLOR,[Qu]:n.ONE_MINUS_CONSTANT_COLOR,[td]:n.CONSTANT_ALPHA,[ed]:n.ONE_MINUS_CONSTANT_ALPHA};function I(B,Et,Z,nt,Tt,gt,Vt,Yt,be,ce){if(B===Nn){M===!0&&(Bt(n.BLEND),M=!1);return}if(M===!1&&(mt(n.BLEND),M=!0),B!==zu){if(B!==g||ce!==C){if((p!==Qn||b!==Qn)&&(n.blendEquation(n.FUNC_ADD),p=Qn,b=Qn),ce)switch(B){case Ai:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case zl:n.blendFunc(n.ONE,n.ONE);break;case Bl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case kl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Ai:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case zl:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Bl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case kl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}R=null,T=null,k=null,P=null,L.set(0,0,0),O=0,g=B,C=ce}return}Tt=Tt||Et,gt=gt||Z,Vt=Vt||nt,(Et!==p||Tt!==b)&&(n.blendEquationSeparate(it[Et],it[Tt]),p=Et,b=Tt),(Z!==R||nt!==T||gt!==k||Vt!==P)&&(n.blendFuncSeparate(dt[Z],dt[nt],dt[gt],dt[Vt]),R=Z,T=nt,k=gt,P=Vt),(Yt.equals(L)===!1||be!==O)&&(n.blendColor(Yt.r,Yt.g,Yt.b,be),L.copy(Yt),O=be),g=B,C=!1}function zt(B,Et){B.side===xn?Bt(n.CULL_FACE):mt(n.CULL_FACE);let Z=B.side===Be;Et&&(Z=!Z),lt(Z),B.blending===Ai&&B.transparent===!1?I(Nn):I(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);const nt=B.stencilWrite;l.setTest(nt),nt&&(l.setMask(B.stencilWriteMask),l.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),l.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),kt(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?mt(n.SAMPLE_ALPHA_TO_COVERAGE):Bt(n.SAMPLE_ALPHA_TO_COVERAGE)}function lt(B){w!==B&&(B?n.frontFace(n.CW):n.frontFace(n.CCW),w=B)}function Ct(B){B!==Ou?(mt(n.CULL_FACE),B!==U&&(B===Nl?n.cullFace(n.BACK):B===Fu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Bt(n.CULL_FACE),U=B}function _t(B){B!==Y&&(W&&n.lineWidth(B),Y=B)}function kt(B,Et,Z){B?(mt(n.POLYGON_OFFSET_FILL),(V!==Et||X!==Z)&&(n.polygonOffset(Et,Z),V=Et,X=Z)):Bt(n.POLYGON_OFFSET_FILL)}function Rt(B){B?mt(n.SCISSOR_TEST):Bt(n.SCISSOR_TEST)}function D(B){B===void 0&&(B=n.TEXTURE0+et-1),ct!==B&&(n.activeTexture(B),ct=B)}function E(B,Et,Z){Z===void 0&&(ct===null?Z=n.TEXTURE0+et-1:Z=ct);let nt=Mt[Z];nt===void 0&&(nt={type:void 0,texture:void 0},Mt[Z]=nt),(nt.type!==B||nt.texture!==Et)&&(ct!==Z&&(n.activeTexture(Z),ct=Z),n.bindTexture(B,Et||Ot[B]),nt.type=B,nt.texture=Et)}function G(){const B=Mt[ct];B!==void 0&&B.type!==void 0&&(n.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function J(){try{n.compressedTexImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function rt(){try{n.compressedTexImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Q(){try{n.texSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Nt(){try{n.texSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function yt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Dt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function te(){try{n.texStorage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ut(){try{n.texStorage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Lt(){try{n.texImage2D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ht(){try{n.texImage3D.apply(n,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Wt(B){oe.equals(B)===!1&&(n.scissor(B.x,B.y,B.z,B.w),oe.copy(B))}function bt(B){tt.equals(B)===!1&&(n.viewport(B.x,B.y,B.z,B.w),tt.copy(B))}function re(B,Et){let Z=c.get(Et);Z===void 0&&(Z=new WeakMap,c.set(Et,Z));let nt=Z.get(B);nt===void 0&&(nt=n.getUniformBlockIndex(Et,B.name),Z.set(B,nt))}function jt(B,Et){const nt=c.get(Et).get(B);a.get(Et)!==nt&&(n.uniformBlockBinding(Et,nt,B.__bindingPointIndex),a.set(Et,nt))}function de(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},ct=null,Mt={},d={},f=new WeakMap,m=[],_=null,M=!1,g=null,p=null,R=null,T=null,b=null,k=null,P=null,L=new ie(0,0,0),O=0,C=!1,w=null,U=null,Y=null,V=null,X=null,oe.set(0,0,n.canvas.width,n.canvas.height),tt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),l.reset()}return{buffers:{color:r,depth:o,stencil:l},enable:mt,disable:Bt,bindFramebuffer:qt,drawBuffers:Pt,useProgram:se,setBlending:I,setMaterial:zt,setFlipSided:lt,setCullFace:Ct,setLineWidth:_t,setPolygonOffset:kt,setScissorTest:Rt,activeTexture:D,bindTexture:E,unbindTexture:G,compressedTexImage2D:J,compressedTexImage3D:rt,texImage2D:Lt,texImage3D:Ht,updateUBOMapping:re,uniformBlockBinding:jt,texStorage2D:te,texStorage3D:ut,texSubImage2D:Q,texSubImage3D:Nt,compressedTexSubImage2D:yt,compressedTexSubImage3D:Dt,scissor:Wt,viewport:bt,reset:de}}function uh(n,t,e,i){const s=r_(i);switch(e){case Xl:return n*t;case Yl:return n*t;case Zl:return n*t*2;case jl:return n*t/s.components*s.byteLength;case Uo:return n*t/s.components*s.byteLength;case Kl:return n*t*2/s.components*s.byteLength;case No:return n*t*2/s.components*s.byteLength;case ql:return n*t*3/s.components*s.byteLength;case Qe:return n*t*4/s.components*s.byteLength;case Oo:return n*t*4/s.components*s.byteLength;case or:case ar:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case lr:case cr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case zo:case ko:return Math.max(n,16)*Math.max(t,8)/4;case Fo:case Bo:return Math.max(n,8)*Math.max(t,8)/2;case Ho:case Go:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Vo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Wo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case $o:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Xo:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case qo:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Yo:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Zo:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case jo:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Ko:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Jo:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Qo:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case ta:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case ea:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case na:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case ia:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case hr:case sa:case ra:return Math.ceil(n/4)*Math.ceil(t/4)*16;case Jl:case oa:return Math.ceil(n/4)*Math.ceil(t/4)*8;case aa:case la:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function r_(n){switch(n){case vn:case Vl:return{byteLength:1,components:1};case ms:case Wl:case gs:return{byteLength:2,components:1};case Lo:case Io:return{byteLength:2,components:4};case ni:case Do:case Mn:return{byteLength:4,components:1};case $l:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function o_(n,t,e,i,s,r,o){const l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,a=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ft,h=new WeakMap;let d;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(D,E){return m?new OffscreenCanvas(D,E):fr("canvas")}function M(D,E,G){let J=1;const rt=Rt(D);if((rt.width>G||rt.height>G)&&(J=G/Math.max(rt.width,rt.height)),J<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const Q=Math.floor(J*rt.width),Nt=Math.floor(J*rt.height);d===void 0&&(d=_(Q,Nt));const yt=E?_(Q,Nt):d;return yt.width=Q,yt.height=Nt,yt.getContext("2d").drawImage(D,0,0,Q,Nt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+rt.width+"x"+rt.height+") to ("+Q+"x"+Nt+")."),yt}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+rt.width+"x"+rt.height+")."),D;return D}function g(D){return D.generateMipmaps}function p(D){n.generateMipmap(D)}function R(D){return D.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?n.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(D,E,G,J,rt=!1){if(D!==null){if(n[D]!==void 0)return n[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let Q=E;if(E===n.RED&&(G===n.FLOAT&&(Q=n.R32F),G===n.HALF_FLOAT&&(Q=n.R16F),G===n.UNSIGNED_BYTE&&(Q=n.R8)),E===n.RED_INTEGER&&(G===n.UNSIGNED_BYTE&&(Q=n.R8UI),G===n.UNSIGNED_SHORT&&(Q=n.R16UI),G===n.UNSIGNED_INT&&(Q=n.R32UI),G===n.BYTE&&(Q=n.R8I),G===n.SHORT&&(Q=n.R16I),G===n.INT&&(Q=n.R32I)),E===n.RG&&(G===n.FLOAT&&(Q=n.RG32F),G===n.HALF_FLOAT&&(Q=n.RG16F),G===n.UNSIGNED_BYTE&&(Q=n.RG8)),E===n.RG_INTEGER&&(G===n.UNSIGNED_BYTE&&(Q=n.RG8UI),G===n.UNSIGNED_SHORT&&(Q=n.RG16UI),G===n.UNSIGNED_INT&&(Q=n.RG32UI),G===n.BYTE&&(Q=n.RG8I),G===n.SHORT&&(Q=n.RG16I),G===n.INT&&(Q=n.RG32I)),E===n.RGB_INTEGER&&(G===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),G===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),G===n.UNSIGNED_INT&&(Q=n.RGB32UI),G===n.BYTE&&(Q=n.RGB8I),G===n.SHORT&&(Q=n.RGB16I),G===n.INT&&(Q=n.RGB32I)),E===n.RGBA_INTEGER&&(G===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),G===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),G===n.UNSIGNED_INT&&(Q=n.RGBA32UI),G===n.BYTE&&(Q=n.RGBA8I),G===n.SHORT&&(Q=n.RGBA16I),G===n.INT&&(Q=n.RGBA32I)),E===n.RGB&&G===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),E===n.RGBA){const Nt=rt?ur:ae.getTransfer(J);G===n.FLOAT&&(Q=n.RGBA32F),G===n.HALF_FLOAT&&(Q=n.RGBA16F),G===n.UNSIGNED_BYTE&&(Q=Nt===he?n.SRGB8_ALPHA8:n.RGBA8),G===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),G===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function b(D,E){let G;return D?E===null||E===ni||E===Di?G=n.DEPTH24_STENCIL8:E===Mn?G=n.DEPTH32F_STENCIL8:E===ms&&(G=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===ni||E===Di?G=n.DEPTH_COMPONENT24:E===Mn?G=n.DEPTH_COMPONENT32F:E===ms&&(G=n.DEPTH_COMPONENT16),G}function k(D,E){return g(D)===!0||D.isFramebufferTexture&&D.minFilter!==Je&&D.minFilter!==an?Math.log2(Math.max(E.width,E.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?E.mipmaps.length:1}function P(D){const E=D.target;E.removeEventListener("dispose",P),O(E),E.isVideoTexture&&h.delete(E)}function L(D){const E=D.target;E.removeEventListener("dispose",L),w(E)}function O(D){const E=i.get(D);if(E.__webglInit===void 0)return;const G=D.source,J=f.get(G);if(J){const rt=J[E.__cacheKey];rt.usedTimes--,rt.usedTimes===0&&C(D),Object.keys(J).length===0&&f.delete(G)}i.remove(D)}function C(D){const E=i.get(D);n.deleteTexture(E.__webglTexture);const G=D.source,J=f.get(G);delete J[E.__cacheKey],o.memory.textures--}function w(D){const E=i.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),i.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(E.__webglFramebuffer[J]))for(let rt=0;rt<E.__webglFramebuffer[J].length;rt++)n.deleteFramebuffer(E.__webglFramebuffer[J][rt]);else n.deleteFramebuffer(E.__webglFramebuffer[J]);E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer[J])}else{if(Array.isArray(E.__webglFramebuffer))for(let J=0;J<E.__webglFramebuffer.length;J++)n.deleteFramebuffer(E.__webglFramebuffer[J]);else n.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&n.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let J=0;J<E.__webglColorRenderbuffer.length;J++)E.__webglColorRenderbuffer[J]&&n.deleteRenderbuffer(E.__webglColorRenderbuffer[J]);E.__webglDepthRenderbuffer&&n.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const G=D.textures;for(let J=0,rt=G.length;J<rt;J++){const Q=i.get(G[J]);Q.__webglTexture&&(n.deleteTexture(Q.__webglTexture),o.memory.textures--),i.remove(G[J])}i.remove(D)}let U=0;function Y(){U=0}function V(){const D=U;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),U+=1,D}function X(D){const E=[];return E.push(D.wrapS),E.push(D.wrapT),E.push(D.wrapR||0),E.push(D.magFilter),E.push(D.minFilter),E.push(D.anisotropy),E.push(D.internalFormat),E.push(D.format),E.push(D.type),E.push(D.generateMipmaps),E.push(D.premultiplyAlpha),E.push(D.flipY),E.push(D.unpackAlignment),E.push(D.colorSpace),E.join()}function et(D,E){const G=i.get(D);if(D.isVideoTexture&&_t(D),D.isRenderTargetTexture===!1&&D.version>0&&G.__version!==D.version){const J=D.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{tt(G,D,E);return}}e.bindTexture(n.TEXTURE_2D,G.__webglTexture,n.TEXTURE0+E)}function W(D,E){const G=i.get(D);if(D.version>0&&G.__version!==D.version){tt(G,D,E);return}e.bindTexture(n.TEXTURE_2D_ARRAY,G.__webglTexture,n.TEXTURE0+E)}function K(D,E){const G=i.get(D);if(D.version>0&&G.__version!==D.version){tt(G,D,E);return}e.bindTexture(n.TEXTURE_3D,G.__webglTexture,n.TEXTURE0+E)}function H(D,E){const G=i.get(D);if(D.version>0&&G.__version!==D.version){pt(G,D,E);return}e.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+E)}const ct={[Ro]:n.REPEAT,[ti]:n.CLAMP_TO_EDGE,[Po]:n.MIRRORED_REPEAT},Mt={[Je]:n.NEAREST,[ud]:n.NEAREST_MIPMAP_NEAREST,[rr]:n.NEAREST_MIPMAP_LINEAR,[an]:n.LINEAR,[Co]:n.LINEAR_MIPMAP_NEAREST,[ei]:n.LINEAR_MIPMAP_LINEAR},It={[md]:n.NEVER,[Sd]:n.ALWAYS,[gd]:n.LESS,[ec]:n.LEQUAL,[_d]:n.EQUAL,[Md]:n.GEQUAL,[xd]:n.GREATER,[vd]:n.NOTEQUAL};function Xt(D,E){if(E.type===Mn&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===an||E.magFilter===Co||E.magFilter===rr||E.magFilter===ei||E.minFilter===an||E.minFilter===Co||E.minFilter===rr||E.minFilter===ei)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(D,n.TEXTURE_WRAP_S,ct[E.wrapS]),n.texParameteri(D,n.TEXTURE_WRAP_T,ct[E.wrapT]),(D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY)&&n.texParameteri(D,n.TEXTURE_WRAP_R,ct[E.wrapR]),n.texParameteri(D,n.TEXTURE_MAG_FILTER,Mt[E.magFilter]),n.texParameteri(D,n.TEXTURE_MIN_FILTER,Mt[E.minFilter]),E.compareFunction&&(n.texParameteri(D,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(D,n.TEXTURE_COMPARE_FUNC,It[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Je||E.minFilter!==rr&&E.minFilter!==ei||E.type===Mn&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");n.texParameterf(D,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function oe(D,E){let G=!1;D.__webglInit===void 0&&(D.__webglInit=!0,E.addEventListener("dispose",P));const J=E.source;let rt=f.get(J);rt===void 0&&(rt={},f.set(J,rt));const Q=X(E);if(Q!==D.__cacheKey){rt[Q]===void 0&&(rt[Q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,G=!0),rt[Q].usedTimes++;const Nt=rt[D.__cacheKey];Nt!==void 0&&(rt[D.__cacheKey].usedTimes--,Nt.usedTimes===0&&C(E)),D.__cacheKey=Q,D.__webglTexture=rt[Q].texture}return G}function tt(D,E,G){let J=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(J=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(J=n.TEXTURE_3D);const rt=oe(D,E),Q=E.source;e.bindTexture(J,D.__webglTexture,n.TEXTURE0+G);const Nt=i.get(Q);if(Q.version!==Nt.__version||rt===!0){e.activeTexture(n.TEXTURE0+G);const yt=ae.getPrimaries(ae.workingColorSpace),Dt=E.colorSpace===Fn?null:ae.getPrimaries(E.colorSpace),te=E.colorSpace===Fn||yt===Dt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let ut=M(E.image,!1,s.maxTextureSize);ut=kt(E,ut);const Lt=r.convert(E.format,E.colorSpace),Ht=r.convert(E.type);let Wt=T(E.internalFormat,Lt,Ht,E.colorSpace,E.isVideoTexture);Xt(J,E);let bt;const re=E.mipmaps,jt=E.isVideoTexture!==!0,de=Nt.__version===void 0||rt===!0,B=Q.dataReady,Et=k(E,ut);if(E.isDepthTexture)Wt=b(E.format===Ii,E.type),de&&(jt?e.texStorage2D(n.TEXTURE_2D,1,Wt,ut.width,ut.height):e.texImage2D(n.TEXTURE_2D,0,Wt,ut.width,ut.height,0,Lt,Ht,null));else if(E.isDataTexture)if(re.length>0){jt&&de&&e.texStorage2D(n.TEXTURE_2D,Et,Wt,re[0].width,re[0].height);for(let Z=0,nt=re.length;Z<nt;Z++)bt=re[Z],jt?B&&e.texSubImage2D(n.TEXTURE_2D,Z,0,0,bt.width,bt.height,Lt,Ht,bt.data):e.texImage2D(n.TEXTURE_2D,Z,Wt,bt.width,bt.height,0,Lt,Ht,bt.data);E.generateMipmaps=!1}else jt?(de&&e.texStorage2D(n.TEXTURE_2D,Et,Wt,ut.width,ut.height),B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ut.width,ut.height,Lt,Ht,ut.data)):e.texImage2D(n.TEXTURE_2D,0,Wt,ut.width,ut.height,0,Lt,Ht,ut.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){jt&&de&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Et,Wt,re[0].width,re[0].height,ut.depth);for(let Z=0,nt=re.length;Z<nt;Z++)if(bt=re[Z],E.format!==Qe)if(Lt!==null)if(jt){if(B)if(E.layerUpdates.size>0){const Tt=uh(bt.width,bt.height,E.format,E.type);for(const gt of E.layerUpdates){const Vt=bt.data.subarray(gt*Tt/bt.data.BYTES_PER_ELEMENT,(gt+1)*Tt/bt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,gt,bt.width,bt.height,1,Lt,Vt)}E.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,0,bt.width,bt.height,ut.depth,Lt,bt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,Z,Wt,bt.width,bt.height,ut.depth,0,bt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else jt?B&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,Z,0,0,0,bt.width,bt.height,ut.depth,Lt,Ht,bt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,Z,Wt,bt.width,bt.height,ut.depth,0,Lt,Ht,bt.data)}else{jt&&de&&e.texStorage2D(n.TEXTURE_2D,Et,Wt,re[0].width,re[0].height);for(let Z=0,nt=re.length;Z<nt;Z++)bt=re[Z],E.format!==Qe?Lt!==null?jt?B&&e.compressedTexSubImage2D(n.TEXTURE_2D,Z,0,0,bt.width,bt.height,Lt,bt.data):e.compressedTexImage2D(n.TEXTURE_2D,Z,Wt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):jt?B&&e.texSubImage2D(n.TEXTURE_2D,Z,0,0,bt.width,bt.height,Lt,Ht,bt.data):e.texImage2D(n.TEXTURE_2D,Z,Wt,bt.width,bt.height,0,Lt,Ht,bt.data)}else if(E.isDataArrayTexture)if(jt){if(de&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Et,Wt,ut.width,ut.height,ut.depth),B)if(E.layerUpdates.size>0){const Z=uh(ut.width,ut.height,E.format,E.type);for(const nt of E.layerUpdates){const Tt=ut.data.subarray(nt*Z/ut.data.BYTES_PER_ELEMENT,(nt+1)*Z/ut.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,nt,ut.width,ut.height,1,Lt,Ht,Tt)}E.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,Lt,Ht,ut.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,Wt,ut.width,ut.height,ut.depth,0,Lt,Ht,ut.data);else if(E.isData3DTexture)jt?(de&&e.texStorage3D(n.TEXTURE_3D,Et,Wt,ut.width,ut.height,ut.depth),B&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,Lt,Ht,ut.data)):e.texImage3D(n.TEXTURE_3D,0,Wt,ut.width,ut.height,ut.depth,0,Lt,Ht,ut.data);else if(E.isFramebufferTexture){if(de)if(jt)e.texStorage2D(n.TEXTURE_2D,Et,Wt,ut.width,ut.height);else{let Z=ut.width,nt=ut.height;for(let Tt=0;Tt<Et;Tt++)e.texImage2D(n.TEXTURE_2D,Tt,Wt,Z,nt,0,Lt,Ht,null),Z>>=1,nt>>=1}}else if(re.length>0){if(jt&&de){const Z=Rt(re[0]);e.texStorage2D(n.TEXTURE_2D,Et,Wt,Z.width,Z.height)}for(let Z=0,nt=re.length;Z<nt;Z++)bt=re[Z],jt?B&&e.texSubImage2D(n.TEXTURE_2D,Z,0,0,Lt,Ht,bt):e.texImage2D(n.TEXTURE_2D,Z,Wt,Lt,Ht,bt);E.generateMipmaps=!1}else if(jt){if(de){const Z=Rt(ut);e.texStorage2D(n.TEXTURE_2D,Et,Wt,Z.width,Z.height)}B&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Lt,Ht,ut)}else e.texImage2D(n.TEXTURE_2D,0,Wt,Lt,Ht,ut);g(E)&&p(J),Nt.__version=Q.version,E.onUpdate&&E.onUpdate(E)}D.__version=E.version}function pt(D,E,G){if(E.image.length!==6)return;const J=oe(D,E),rt=E.source;e.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+G);const Q=i.get(rt);if(rt.version!==Q.__version||J===!0){e.activeTexture(n.TEXTURE0+G);const Nt=ae.getPrimaries(ae.workingColorSpace),yt=E.colorSpace===Fn?null:ae.getPrimaries(E.colorSpace),Dt=E.colorSpace===Fn||Nt===yt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);const te=E.isCompressedTexture||E.image[0].isCompressedTexture,ut=E.image[0]&&E.image[0].isDataTexture,Lt=[];for(let nt=0;nt<6;nt++)!te&&!ut?Lt[nt]=M(E.image[nt],!0,s.maxCubemapSize):Lt[nt]=ut?E.image[nt].image:E.image[nt],Lt[nt]=kt(E,Lt[nt]);const Ht=Lt[0],Wt=r.convert(E.format,E.colorSpace),bt=r.convert(E.type),re=T(E.internalFormat,Wt,bt,E.colorSpace),jt=E.isVideoTexture!==!0,de=Q.__version===void 0||J===!0,B=rt.dataReady;let Et=k(E,Ht);Xt(n.TEXTURE_CUBE_MAP,E);let Z;if(te){jt&&de&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Et,re,Ht.width,Ht.height);for(let nt=0;nt<6;nt++){Z=Lt[nt].mipmaps;for(let Tt=0;Tt<Z.length;Tt++){const gt=Z[Tt];E.format!==Qe?Wt!==null?jt?B&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Tt,0,0,gt.width,gt.height,Wt,gt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Tt,re,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):jt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Tt,0,0,gt.width,gt.height,Wt,bt,gt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Tt,re,gt.width,gt.height,0,Wt,bt,gt.data)}}}else{if(Z=E.mipmaps,jt&&de){Z.length>0&&Et++;const nt=Rt(Lt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Et,re,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(ut){jt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Lt[nt].width,Lt[nt].height,Wt,bt,Lt[nt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,re,Lt[nt].width,Lt[nt].height,0,Wt,bt,Lt[nt].data);for(let Tt=0;Tt<Z.length;Tt++){const Vt=Z[Tt].image[nt].image;jt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Tt+1,0,0,Vt.width,Vt.height,Wt,bt,Vt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Tt+1,re,Vt.width,Vt.height,0,Wt,bt,Vt.data)}}else{jt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Wt,bt,Lt[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,re,Wt,bt,Lt[nt]);for(let Tt=0;Tt<Z.length;Tt++){const gt=Z[Tt];jt?B&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Tt+1,0,0,Wt,bt,gt.image[nt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+nt,Tt+1,re,Wt,bt,gt.image[nt])}}}g(E)&&p(n.TEXTURE_CUBE_MAP),Q.__version=rt.version,E.onUpdate&&E.onUpdate(E)}D.__version=E.version}function Ot(D,E,G,J,rt,Q){const Nt=r.convert(G.format,G.colorSpace),yt=r.convert(G.type),Dt=T(G.internalFormat,Nt,yt,G.colorSpace),te=i.get(E),ut=i.get(G);if(ut.__renderTarget=E,!te.__hasExternalTextures){const Lt=Math.max(1,E.width>>Q),Ht=Math.max(1,E.height>>Q);rt===n.TEXTURE_3D||rt===n.TEXTURE_2D_ARRAY?e.texImage3D(rt,Q,Dt,Lt,Ht,E.depth,0,Nt,yt,null):e.texImage2D(rt,Q,Dt,Lt,Ht,0,Nt,yt,null)}e.bindFramebuffer(n.FRAMEBUFFER,D),Ct(E)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,J,rt,ut.__webglTexture,0,lt(E)):(rt===n.TEXTURE_2D||rt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&rt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,J,rt,ut.__webglTexture,Q),e.bindFramebuffer(n.FRAMEBUFFER,null)}function mt(D,E,G){if(n.bindRenderbuffer(n.RENDERBUFFER,D),E.depthBuffer){const J=E.depthTexture,rt=J&&J.isDepthTexture?J.type:null,Q=b(E.stencilBuffer,rt),Nt=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,yt=lt(E);Ct(E)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,yt,Q,E.width,E.height):G?n.renderbufferStorageMultisample(n.RENDERBUFFER,yt,Q,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,Q,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Nt,n.RENDERBUFFER,D)}else{const J=E.textures;for(let rt=0;rt<J.length;rt++){const Q=J[rt],Nt=r.convert(Q.format,Q.colorSpace),yt=r.convert(Q.type),Dt=T(Q.internalFormat,Nt,yt,Q.colorSpace),te=lt(E);G&&Ct(E)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,te,Dt,E.width,E.height):Ct(E)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,te,Dt,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,Dt,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Bt(D,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,D),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=i.get(E.depthTexture);J.__renderTarget=E,(!J.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),et(E.depthTexture,0);const rt=J.__webglTexture,Q=lt(E);if(E.depthTexture.format===Li)Ct(E)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,rt,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,rt,0);else if(E.depthTexture.format===Ii)Ct(E)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,rt,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,rt,0);else throw new Error("Unknown depthTexture format")}function qt(D){const E=i.get(D),G=D.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==D.depthTexture){const J=D.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),J){const rt=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,J.removeEventListener("dispose",rt)};J.addEventListener("dispose",rt),E.__depthDisposeCallback=rt}E.__boundDepthTexture=J}if(D.depthTexture&&!E.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Bt(E.__webglFramebuffer,D)}else if(G){E.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[J]),E.__webglDepthbuffer[J]===void 0)E.__webglDepthbuffer[J]=n.createRenderbuffer(),mt(E.__webglDepthbuffer[J],D,!1);else{const rt=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Q=E.__webglDepthbuffer[J];n.bindRenderbuffer(n.RENDERBUFFER,Q),n.framebufferRenderbuffer(n.FRAMEBUFFER,rt,n.RENDERBUFFER,Q)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=n.createRenderbuffer(),mt(E.__webglDepthbuffer,D,!1);else{const J=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,rt=E.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,rt),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,rt)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Pt(D,E,G){const J=i.get(D);E!==void 0&&Ot(J.__webglFramebuffer,D,D.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),G!==void 0&&qt(D)}function se(D){const E=D.texture,G=i.get(D),J=i.get(E);D.addEventListener("dispose",L);const rt=D.textures,Q=D.isWebGLCubeRenderTarget===!0,Nt=rt.length>1;if(Nt||(J.__webglTexture===void 0&&(J.__webglTexture=n.createTexture()),J.__version=E.version,o.memory.textures++),Q){G.__webglFramebuffer=[];for(let yt=0;yt<6;yt++)if(E.mipmaps&&E.mipmaps.length>0){G.__webglFramebuffer[yt]=[];for(let Dt=0;Dt<E.mipmaps.length;Dt++)G.__webglFramebuffer[yt][Dt]=n.createFramebuffer()}else G.__webglFramebuffer[yt]=n.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){G.__webglFramebuffer=[];for(let yt=0;yt<E.mipmaps.length;yt++)G.__webglFramebuffer[yt]=n.createFramebuffer()}else G.__webglFramebuffer=n.createFramebuffer();if(Nt)for(let yt=0,Dt=rt.length;yt<Dt;yt++){const te=i.get(rt[yt]);te.__webglTexture===void 0&&(te.__webglTexture=n.createTexture(),o.memory.textures++)}if(D.samples>0&&Ct(D)===!1){G.__webglMultisampledFramebuffer=n.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let yt=0;yt<rt.length;yt++){const Dt=rt[yt];G.__webglColorRenderbuffer[yt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,G.__webglColorRenderbuffer[yt]);const te=r.convert(Dt.format,Dt.colorSpace),ut=r.convert(Dt.type),Lt=T(Dt.internalFormat,te,ut,Dt.colorSpace,D.isXRRenderTarget===!0),Ht=lt(D);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ht,Lt,D.width,D.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+yt,n.RENDERBUFFER,G.__webglColorRenderbuffer[yt])}n.bindRenderbuffer(n.RENDERBUFFER,null),D.depthBuffer&&(G.__webglDepthRenderbuffer=n.createRenderbuffer(),mt(G.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Q){e.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),Xt(n.TEXTURE_CUBE_MAP,E);for(let yt=0;yt<6;yt++)if(E.mipmaps&&E.mipmaps.length>0)for(let Dt=0;Dt<E.mipmaps.length;Dt++)Ot(G.__webglFramebuffer[yt][Dt],D,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+yt,Dt);else Ot(G.__webglFramebuffer[yt],D,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0);g(E)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Nt){for(let yt=0,Dt=rt.length;yt<Dt;yt++){const te=rt[yt],ut=i.get(te);e.bindTexture(n.TEXTURE_2D,ut.__webglTexture),Xt(n.TEXTURE_2D,te),Ot(G.__webglFramebuffer,D,te,n.COLOR_ATTACHMENT0+yt,n.TEXTURE_2D,0),g(te)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let yt=n.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(yt=D.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(yt,J.__webglTexture),Xt(yt,E),E.mipmaps&&E.mipmaps.length>0)for(let Dt=0;Dt<E.mipmaps.length;Dt++)Ot(G.__webglFramebuffer[Dt],D,E,n.COLOR_ATTACHMENT0,yt,Dt);else Ot(G.__webglFramebuffer,D,E,n.COLOR_ATTACHMENT0,yt,0);g(E)&&p(yt),e.unbindTexture()}D.depthBuffer&&qt(D)}function it(D){const E=D.textures;for(let G=0,J=E.length;G<J;G++){const rt=E[G];if(g(rt)){const Q=R(D),Nt=i.get(rt).__webglTexture;e.bindTexture(Q,Nt),p(Q),e.unbindTexture()}}}const dt=[],I=[];function zt(D){if(D.samples>0){if(Ct(D)===!1){const E=D.textures,G=D.width,J=D.height;let rt=n.COLOR_BUFFER_BIT;const Q=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Nt=i.get(D),yt=E.length>1;if(yt)for(let Dt=0;Dt<E.length;Dt++)e.bindFramebuffer(n.FRAMEBUFFER,Nt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Dt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Nt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Dt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Nt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Nt.__webglFramebuffer);for(let Dt=0;Dt<E.length;Dt++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(rt|=n.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(rt|=n.STENCIL_BUFFER_BIT)),yt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Nt.__webglColorRenderbuffer[Dt]);const te=i.get(E[Dt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,te,0)}n.blitFramebuffer(0,0,G,J,0,0,G,J,rt,n.NEAREST),a===!0&&(dt.length=0,I.length=0,dt.push(n.COLOR_ATTACHMENT0+Dt),D.depthBuffer&&D.resolveDepthBuffer===!1&&(dt.push(Q),I.push(Q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,I)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,dt))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),yt)for(let Dt=0;Dt<E.length;Dt++){e.bindFramebuffer(n.FRAMEBUFFER,Nt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Dt,n.RENDERBUFFER,Nt.__webglColorRenderbuffer[Dt]);const te=i.get(E[Dt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Nt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Dt,n.TEXTURE_2D,te,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Nt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&a){const E=D.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[E])}}}function lt(D){return Math.min(s.maxSamples,D.samples)}function Ct(D){const E=i.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function _t(D){const E=o.render.frame;h.get(D)!==E&&(h.set(D,E),D.update())}function kt(D,E){const G=D.colorSpace,J=D.format,rt=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||G!==Ui&&G!==Fn&&(ae.getTransfer(G)===he?(J!==Qe||rt!==vn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),E}function Rt(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=Y,this.setTexture2D=et,this.setTexture2DArray=W,this.setTexture3D=K,this.setTextureCube=H,this.rebindTextures=Pt,this.setupRenderTarget=se,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=zt,this.setupDepthRenderbuffer=qt,this.setupFrameBufferTexture=Ot,this.useMultisampledRTT=Ct}function a_(n,t){function e(i,s=Fn){let r;const o=ae.getTransfer(s);if(i===vn)return n.UNSIGNED_BYTE;if(i===Lo)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Io)return n.UNSIGNED_SHORT_5_5_5_1;if(i===$l)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Vl)return n.BYTE;if(i===Wl)return n.SHORT;if(i===ms)return n.UNSIGNED_SHORT;if(i===Do)return n.INT;if(i===ni)return n.UNSIGNED_INT;if(i===Mn)return n.FLOAT;if(i===gs)return n.HALF_FLOAT;if(i===Xl)return n.ALPHA;if(i===ql)return n.RGB;if(i===Qe)return n.RGBA;if(i===Yl)return n.LUMINANCE;if(i===Zl)return n.LUMINANCE_ALPHA;if(i===Li)return n.DEPTH_COMPONENT;if(i===Ii)return n.DEPTH_STENCIL;if(i===jl)return n.RED;if(i===Uo)return n.RED_INTEGER;if(i===Kl)return n.RG;if(i===No)return n.RG_INTEGER;if(i===Oo)return n.RGBA_INTEGER;if(i===or||i===ar||i===lr||i===cr)if(o===he)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===or)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===or)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ar)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===lr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===cr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Fo||i===zo||i===Bo||i===ko)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Fo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===zo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Bo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ko)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ho||i===Go||i===Vo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Ho||i===Go)return o===he?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Vo)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Wo||i===$o||i===Xo||i===qo||i===Yo||i===Zo||i===jo||i===Ko||i===Jo||i===Qo||i===ta||i===ea||i===na||i===ia)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Wo)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===$o)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Xo)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===qo)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Yo)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Zo)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===jo)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ko)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Jo)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Qo)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===ta)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ea)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===na)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ia)return o===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===hr||i===sa||i===ra)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===hr)return o===he?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===sa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ra)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Jl||i===oa||i===aa||i===la)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===hr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===oa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===aa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===la)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Di?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class l_ extends Ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class hn extends Ee{constructor(){super(),this.isGroup=!0,this.type="Group"}}const c_={type:"move"};class Ha{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new hn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new hn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new hn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const l=this._targetRay,a=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const M of t.hand.values()){const g=e.getJointPose(M,i),p=this._getHandJoint(c,M);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=h.position.distanceTo(d.position),m=.02,_=.005;c.inputState.pinching&&f>m+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=m-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else a!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1));l!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(c_)))}return l!==null&&(l.visible=s!==null),a!==null&&(a.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new hn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}const h_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,u_=`
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

}`;class d_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const s=new ke,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=i.depthNear||e.depthFar!=i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Vn({vertexShader:h_,fragmentShader:u_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ge(new Xn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class f_ extends ii{constructor(t,e){super();const i=this;let s=null,r=1,o=null,l="local-floor",a=1,c=null,h=null,d=null,f=null,m=null,_=null;const M=new d_,g=e.getContextAttributes();let p=null,R=null;const T=[],b=[],k=new ft;let P=null;const L=new Ke;L.viewport=new Me;const O=new Ke;O.viewport=new Me;const C=[L,O],w=new l_;let U=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(tt){let pt=T[tt];return pt===void 0&&(pt=new Ha,T[tt]=pt),pt.getTargetRaySpace()},this.getControllerGrip=function(tt){let pt=T[tt];return pt===void 0&&(pt=new Ha,T[tt]=pt),pt.getGripSpace()},this.getHand=function(tt){let pt=T[tt];return pt===void 0&&(pt=new Ha,T[tt]=pt),pt.getHandSpace()};function V(tt){const pt=b.indexOf(tt.inputSource);if(pt===-1)return;const Ot=T[pt];Ot!==void 0&&(Ot.update(tt.inputSource,tt.frame,c||o),Ot.dispatchEvent({type:tt.type,data:tt.inputSource}))}function X(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",et);for(let tt=0;tt<T.length;tt++){const pt=b[tt];pt!==null&&(b[tt]=null,T[tt].disconnect(pt))}U=null,Y=null,M.reset(),t.setRenderTarget(p),m=null,f=null,d=null,s=null,R=null,oe.stop(),i.isPresenting=!1,t.setPixelRatio(P),t.setSize(k.width,k.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(tt){r=tt,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(tt){l=tt,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(tt){c=tt},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(tt){if(s=tt,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",X),s.addEventListener("inputsourceschange",et),g.xrCompatible!==!0&&await e.makeXRCompatible(),P=t.getPixelRatio(),t.getSize(k),s.renderState.layers===void 0){const pt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,pt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),R=new ri(m.framebufferWidth,m.framebufferHeight,{format:Qe,type:vn,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let pt=null,Ot=null,mt=null;g.depth&&(mt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=g.stencil?Ii:Li,Ot=g.stencil?Di:ni);const Bt={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:r};d=new XRWebGLBinding(s,e),f=d.createProjectionLayer(Bt),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),R=new ri(f.textureWidth,f.textureHeight,{format:Qe,type:vn,depthTexture:new Vc(f.textureWidth,f.textureHeight,Ot,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}R.isXRRenderTarget=!0,this.setFoveation(a),c=null,o=await s.requestReferenceSpace(l),oe.setContext(s),oe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function et(tt){for(let pt=0;pt<tt.removed.length;pt++){const Ot=tt.removed[pt],mt=b.indexOf(Ot);mt>=0&&(b[mt]=null,T[mt].disconnect(Ot))}for(let pt=0;pt<tt.added.length;pt++){const Ot=tt.added[pt];let mt=b.indexOf(Ot);if(mt===-1){for(let qt=0;qt<T.length;qt++)if(qt>=b.length){b.push(Ot),mt=qt;break}else if(b[qt]===null){b[qt]=Ot,mt=qt;break}if(mt===-1)break}const Bt=T[mt];Bt&&Bt.connect(Ot)}}const W=new F,K=new F;function H(tt,pt,Ot){W.setFromMatrixPosition(pt.matrixWorld),K.setFromMatrixPosition(Ot.matrixWorld);const mt=W.distanceTo(K),Bt=pt.projectionMatrix.elements,qt=Ot.projectionMatrix.elements,Pt=Bt[14]/(Bt[10]-1),se=Bt[14]/(Bt[10]+1),it=(Bt[9]+1)/Bt[5],dt=(Bt[9]-1)/Bt[5],I=(Bt[8]-1)/Bt[0],zt=(qt[8]+1)/qt[0],lt=Pt*I,Ct=Pt*zt,_t=mt/(-I+zt),kt=_t*-I;if(pt.matrixWorld.decompose(tt.position,tt.quaternion,tt.scale),tt.translateX(kt),tt.translateZ(_t),tt.matrixWorld.compose(tt.position,tt.quaternion,tt.scale),tt.matrixWorldInverse.copy(tt.matrixWorld).invert(),Bt[10]===-1)tt.projectionMatrix.copy(pt.projectionMatrix),tt.projectionMatrixInverse.copy(pt.projectionMatrixInverse);else{const Rt=Pt+_t,D=se+_t,E=lt-kt,G=Ct+(mt-kt),J=it*se/D*Rt,rt=dt*se/D*Rt;tt.projectionMatrix.makePerspective(E,G,J,rt,Rt,D),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert()}}function ct(tt,pt){pt===null?tt.matrixWorld.copy(tt.matrix):tt.matrixWorld.multiplyMatrices(pt.matrixWorld,tt.matrix),tt.matrixWorldInverse.copy(tt.matrixWorld).invert()}this.updateCamera=function(tt){if(s===null)return;let pt=tt.near,Ot=tt.far;M.texture!==null&&(M.depthNear>0&&(pt=M.depthNear),M.depthFar>0&&(Ot=M.depthFar)),w.near=O.near=L.near=pt,w.far=O.far=L.far=Ot,(U!==w.near||Y!==w.far)&&(s.updateRenderState({depthNear:w.near,depthFar:w.far}),U=w.near,Y=w.far),L.layers.mask=tt.layers.mask|2,O.layers.mask=tt.layers.mask|4,w.layers.mask=L.layers.mask|O.layers.mask;const mt=tt.parent,Bt=w.cameras;ct(w,mt);for(let qt=0;qt<Bt.length;qt++)ct(Bt[qt],mt);Bt.length===2?H(w,L,O):w.projectionMatrix.copy(L.projectionMatrix),Mt(tt,w,mt)};function Mt(tt,pt,Ot){Ot===null?tt.matrix.copy(pt.matrixWorld):(tt.matrix.copy(Ot.matrixWorld),tt.matrix.invert(),tt.matrix.multiply(pt.matrixWorld)),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.updateMatrixWorld(!0),tt.projectionMatrix.copy(pt.projectionMatrix),tt.projectionMatrixInverse.copy(pt.projectionMatrixInverse),tt.isPerspectiveCamera&&(tt.fov=_s*2*Math.atan(1/tt.projectionMatrix.elements[5]),tt.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(f===null&&m===null))return a},this.setFoveation=function(tt){a=tt,f!==null&&(f.fixedFoveation=tt),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=tt)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(w)};let It=null;function Xt(tt,pt){if(h=pt.getViewerPose(c||o),_=pt,h!==null){const Ot=h.views;m!==null&&(t.setRenderTargetFramebuffer(R,m.framebuffer),t.setRenderTarget(R));let mt=!1;Ot.length!==w.cameras.length&&(w.cameras.length=0,mt=!0);for(let qt=0;qt<Ot.length;qt++){const Pt=Ot[qt];let se=null;if(m!==null)se=m.getViewport(Pt);else{const dt=d.getViewSubImage(f,Pt);se=dt.viewport,qt===0&&(t.setRenderTargetTextures(R,dt.colorTexture,f.ignoreDepthValues?void 0:dt.depthStencilTexture),t.setRenderTarget(R))}let it=C[qt];it===void 0&&(it=new Ke,it.layers.enable(qt),it.viewport=new Me,C[qt]=it),it.matrix.fromArray(Pt.transform.matrix),it.matrix.decompose(it.position,it.quaternion,it.scale),it.projectionMatrix.fromArray(Pt.projectionMatrix),it.projectionMatrixInverse.copy(it.projectionMatrix).invert(),it.viewport.set(se.x,se.y,se.width,se.height),qt===0&&(w.matrix.copy(it.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),mt===!0&&w.cameras.push(it)}const Bt=s.enabledFeatures;if(Bt&&Bt.includes("depth-sensing")){const qt=d.getDepthInformation(Ot[0]);qt&&qt.isValid&&qt.texture&&M.init(t,qt,s.renderState)}}for(let Ot=0;Ot<T.length;Ot++){const mt=b[Ot],Bt=T[Ot];mt!==null&&Bt!==void 0&&Bt.update(mt,pt,c||o)}It&&It(tt,pt),pt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:pt}),_=null}const oe=new Uc;oe.setAnimationLoop(Xt),this.setAnimationLoop=function(tt){It=tt},this.dispose=function(){}}}const mi=new ln,p_=new fe;function m_(n,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,Pc(n)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,R,T,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&m(g,p,b)):p.isMeshMatcapMaterial?(r(g,p),_(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),M(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&l(g,p)):p.isPointsMaterial?a(g,p,R,T):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Be&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Be&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const R=t.get(p),T=R.envMap,b=R.envMapRotation;T&&(g.envMap.value=T,mi.copy(b),mi.x*=-1,mi.y*=-1,mi.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),g.envMapRotation.value.setFromMatrix4(p_.makeRotationFromEuler(mi)),g.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function l(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function a(g,p,R,T){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*R,g.scale.value=T*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function m(g,p,R){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Be&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=R.texture,g.transmissionSamplerSize.value.set(R.width,R.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,p){p.matcap&&(g.matcap.value=p.matcap)}function M(g,p){const R=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(R.matrixWorld),g.nearDistance.value=R.shadow.camera.near,g.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function g_(n,t,e,i){let s={},r={},o=[];const l=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function a(R,T){const b=T.program;i.uniformBlockBinding(R,b)}function c(R,T){let b=s[R.id];b===void 0&&(_(R),b=h(R),s[R.id]=b,R.addEventListener("dispose",g));const k=T.program;i.updateUBOMapping(R,k);const P=t.render.frame;r[R.id]!==P&&(f(R),r[R.id]=P)}function h(R){const T=d();R.__bindingPointIndex=T;const b=n.createBuffer(),k=R.__size,P=R.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,k,P),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,b),b}function d(){for(let R=0;R<l;R++)if(o.indexOf(R)===-1)return o.push(R),R;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(R){const T=s[R.id],b=R.uniforms,k=R.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let P=0,L=b.length;P<L;P++){const O=Array.isArray(b[P])?b[P]:[b[P]];for(let C=0,w=O.length;C<w;C++){const U=O[C];if(m(U,P,C,k)===!0){const Y=U.__offset,V=Array.isArray(U.value)?U.value:[U.value];let X=0;for(let et=0;et<V.length;et++){const W=V[et],K=M(W);typeof W=="number"||typeof W=="boolean"?(U.__data[0]=W,n.bufferSubData(n.UNIFORM_BUFFER,Y+X,U.__data)):W.isMatrix3?(U.__data[0]=W.elements[0],U.__data[1]=W.elements[1],U.__data[2]=W.elements[2],U.__data[3]=0,U.__data[4]=W.elements[3],U.__data[5]=W.elements[4],U.__data[6]=W.elements[5],U.__data[7]=0,U.__data[8]=W.elements[6],U.__data[9]=W.elements[7],U.__data[10]=W.elements[8],U.__data[11]=0):(W.toArray(U.__data,X),X+=K.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,Y,U.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(R,T,b,k){const P=R.value,L=T+"_"+b;if(k[L]===void 0)return typeof P=="number"||typeof P=="boolean"?k[L]=P:k[L]=P.clone(),!0;{const O=k[L];if(typeof P=="number"||typeof P=="boolean"){if(O!==P)return k[L]=P,!0}else if(O.equals(P)===!1)return O.copy(P),!0}return!1}function _(R){const T=R.uniforms;let b=0;const k=16;for(let L=0,O=T.length;L<O;L++){const C=Array.isArray(T[L])?T[L]:[T[L]];for(let w=0,U=C.length;w<U;w++){const Y=C[w],V=Array.isArray(Y.value)?Y.value:[Y.value];for(let X=0,et=V.length;X<et;X++){const W=V[X],K=M(W),H=b%k,ct=H%K.boundary,Mt=H+ct;b+=ct,Mt!==0&&k-Mt<K.storage&&(b+=k-Mt),Y.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=b,b+=K.storage}}}const P=b%k;return P>0&&(b+=k-P),R.__size=b,R.__cache={},this}function M(R){const T={boundary:0,storage:0};return typeof R=="number"||typeof R=="boolean"?(T.boundary=4,T.storage=4):R.isVector2?(T.boundary=8,T.storage=8):R.isVector3||R.isColor?(T.boundary=16,T.storage=12):R.isVector4?(T.boundary=16,T.storage=16):R.isMatrix3?(T.boundary=48,T.storage=48):R.isMatrix4?(T.boundary=64,T.storage=64):R.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",R),T}function g(R){const T=R.target;T.removeEventListener("dispose",g);const b=o.indexOf(T.__bindingPointIndex);o.splice(b,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function p(){for(const R in s)n.deleteBuffer(s[R]);o=[],s={},r={}}return{bind:a,update:c,dispose:p}}class __{constructor(t={}){const{canvas:e=zd(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:l=!1,premultipliedAlpha:a=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const _=new Uint32Array(4),M=new Int32Array(4);let g=null,p=null;const R=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ye,this.toneMapping=On,this.toneMappingExposure=1;const b=this;let k=!1,P=0,L=0,O=null,C=-1,w=null;const U=new Me,Y=new Me;let V=null;const X=new ie(0);let et=0,W=e.width,K=e.height,H=1,ct=null,Mt=null;const It=new Me(0,0,W,K),Xt=new Me(0,0,W,K);let oe=!1;const tt=new La;let pt=!1,Ot=!1;const mt=new fe,Bt=new fe,qt=new F,Pt=new Me,se={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let it=!1;function dt(){return O===null?H:1}let I=i;function zt(u,v){return e.getContext(u,v)}try{const u={alpha:!0,depth:s,stencil:r,antialias:l,premultipliedAlpha:a,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${go}`),e.addEventListener("webglcontextlost",nt,!1),e.addEventListener("webglcontextrestored",Tt,!1),e.addEventListener("webglcontextcreationerror",gt,!1),I===null){const v="webgl2";if(I=zt(v,u),I===null)throw zt(v)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(u){throw console.error("THREE.WebGLRenderer: "+u.message),u}let lt,Ct,_t,kt,Rt,D,E,G,J,rt,Q,Nt,yt,Dt,te,ut,Lt,Ht,Wt,bt,re,jt,de,B;function Et(){lt=new ym(I),lt.init(),jt=new a_(I,lt),Ct=new gm(I,lt,t,jt),_t=new s_(I,lt),Ct.reverseDepthBuffer&&f&&_t.buffers.depth.setReversed(!0),kt=new wm(I),Rt=new Vg,D=new o_(I,lt,_t,Rt,Ct,jt,kt),E=new xm(b),G=new Sm(b),J=new df(I),de=new pm(I,J),rt=new bm(I,J,kt,de),Q=new Am(I,rt,J,kt),Wt=new Tm(I,Ct,D),ut=new _m(Rt),Nt=new Gg(b,E,G,lt,Ct,de,ut),yt=new m_(b,Rt),Dt=new $g,te=new Kg(lt),Ht=new fm(b,E,G,_t,Q,m,a),Lt=new n_(b,Q,Ct),B=new g_(I,kt,Ct,_t),bt=new mm(I,lt,kt),re=new Em(I,lt,kt),kt.programs=Nt.programs,b.capabilities=Ct,b.extensions=lt,b.properties=Rt,b.renderLists=Dt,b.shadowMap=Lt,b.state=_t,b.info=kt}Et();const Z=new f_(b,I);this.xr=Z,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const u=lt.get("WEBGL_lose_context");u&&u.loseContext()},this.forceContextRestore=function(){const u=lt.get("WEBGL_lose_context");u&&u.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(u){u!==void 0&&(H=u,this.setSize(W,K,!1))},this.getSize=function(u){return u.set(W,K)},this.setSize=function(u,v,S=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=u,K=v,e.width=Math.floor(u*H),e.height=Math.floor(v*H),S===!0&&(e.style.width=u+"px",e.style.height=v+"px"),this.setViewport(0,0,u,v)},this.getDrawingBufferSize=function(u){return u.set(W*H,K*H).floor()},this.setDrawingBufferSize=function(u,v,S){W=u,K=v,H=S,e.width=Math.floor(u*S),e.height=Math.floor(v*S),this.setViewport(0,0,u,v)},this.getCurrentViewport=function(u){return u.copy(U)},this.getViewport=function(u){return u.copy(It)},this.setViewport=function(u,v,S,y){u.isVector4?It.set(u.x,u.y,u.z,u.w):It.set(u,v,S,y),_t.viewport(U.copy(It).multiplyScalar(H).round())},this.getScissor=function(u){return u.copy(Xt)},this.setScissor=function(u,v,S,y){u.isVector4?Xt.set(u.x,u.y,u.z,u.w):Xt.set(u,v,S,y),_t.scissor(Y.copy(Xt).multiplyScalar(H).round())},this.getScissorTest=function(){return oe},this.setScissorTest=function(u){_t.setScissorTest(oe=u)},this.setOpaqueSort=function(u){ct=u},this.setTransparentSort=function(u){Mt=u},this.getClearColor=function(u){return u.copy(Ht.getClearColor())},this.setClearColor=function(){Ht.setClearColor.apply(Ht,arguments)},this.getClearAlpha=function(){return Ht.getClearAlpha()},this.setClearAlpha=function(){Ht.setClearAlpha.apply(Ht,arguments)},this.clear=function(u=!0,v=!0,S=!0){let y=0;if(u){let A=!1;if(O!==null){const N=O.texture.format;A=N===Oo||N===No||N===Uo}if(A){const N=O.texture.type,z=N===vn||N===ni||N===ms||N===Di||N===Lo||N===Io,$=Ht.getClearColor(),q=Ht.getClearAlpha(),j=$.r,ht=$.g,st=$.b;z?(_[0]=j,_[1]=ht,_[2]=st,_[3]=q,I.clearBufferuiv(I.COLOR,0,_)):(M[0]=j,M[1]=ht,M[2]=st,M[3]=q,I.clearBufferiv(I.COLOR,0,M))}else y|=I.COLOR_BUFFER_BIT}v&&(y|=I.DEPTH_BUFFER_BIT),S&&(y|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",nt,!1),e.removeEventListener("webglcontextrestored",Tt,!1),e.removeEventListener("webglcontextcreationerror",gt,!1),Dt.dispose(),te.dispose(),Rt.dispose(),E.dispose(),G.dispose(),Q.dispose(),de.dispose(),B.dispose(),Nt.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",Pn),Z.removeEventListener("sessionend",Zn),Cn.stop()};function nt(u){u.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),k=!0}function Tt(){console.log("THREE.WebGLRenderer: Context Restored."),k=!1;const u=kt.autoReset,v=Lt.enabled,S=Lt.autoUpdate,y=Lt.needsUpdate,A=Lt.type;Et(),kt.autoReset=u,Lt.enabled=v,Lt.autoUpdate=S,Lt.needsUpdate=y,Lt.type=A}function gt(u){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",u.statusMessage)}function Vt(u){const v=u.target;v.removeEventListener("dispose",Vt),Yt(v)}function Yt(u){be(u),Rt.remove(u)}function be(u){const v=Rt.get(u).programs;v!==void 0&&(v.forEach(function(S){Nt.releaseProgram(S)}),u.isShaderMaterial&&Nt.releaseShaderCache(u))}this.renderBufferDirect=function(u,v,S,y,A,N){v===null&&(v=se);const z=A.isMesh&&A.matrixWorld.determinant()<0,$=Jr(u,v,S,y,A);_t.setMaterial(y,z);let q=S.index,j=1;if(y.wireframe===!0){if(q=rt.getWireframeAttribute(S),q===void 0)return;j=2}const ht=S.drawRange,st=S.attributes.position;let Ut=ht.start*j,Gt=(ht.start+ht.count)*j;N!==null&&(Ut=Math.max(Ut,N.start*j),Gt=Math.min(Gt,(N.start+N.count)*j)),q!==null?(Ut=Math.max(Ut,0),Gt=Math.min(Gt,q.count)):st!=null&&(Ut=Math.max(Ut,0),Gt=Math.min(Gt,st.count));const Kt=Gt-Ut;if(Kt<0||Kt===1/0)return;de.setup(A,y,$,S,q);let pe,$t=bt;if(q!==null&&(pe=J.get(q),$t=re,$t.setIndex(pe)),A.isMesh)y.wireframe===!0?(_t.setLineWidth(y.wireframeLinewidth*dt()),$t.setMode(I.LINES)):$t.setMode(I.TRIANGLES);else if(A.isLine){let At=y.linewidth;At===void 0&&(At=1),_t.setLineWidth(At*dt()),A.isLineSegments?$t.setMode(I.LINES):A.isLineLoop?$t.setMode(I.LINE_LOOP):$t.setMode(I.LINE_STRIP)}else A.isPoints?$t.setMode(I.POINTS):A.isSprite&&$t.setMode(I.TRIANGLES);if(A.isBatchedMesh)if(A._multiDrawInstances!==null)$t.renderMultiDrawInstances(A._multiDrawStarts,A._multiDrawCounts,A._multiDrawCount,A._multiDrawInstances);else if(lt.get("WEBGL_multi_draw"))$t.renderMultiDraw(A._multiDrawStarts,A._multiDrawCounts,A._multiDrawCount);else{const At=A._multiDrawStarts,Se=A._multiDrawCounts,xt=A._multiDrawCount,ot=q?J.get(q).bytesPerElement:1,at=Rt.get(y).currentProgram.getUniforms();for(let Ft=0;Ft<xt;Ft++)at.setValue(I,"_gl_DrawID",Ft),$t.render(At[Ft]/ot,Se[Ft])}else if(A.isInstancedMesh)$t.renderInstances(Ut,Kt,A.count);else if(S.isInstancedBufferGeometry){const At=S._maxInstanceCount!==void 0?S._maxInstanceCount:1/0,Se=Math.min(S.instanceCount,At);$t.renderInstances(Ut,Kt,Se)}else $t.render(Ut,Kt)};function ce(u,v,S){u.transparent===!0&&u.side===xn&&u.forceSinglePass===!1?(u.side=Be,u.needsUpdate=!0,vi(u,v,S),u.side=Un,u.needsUpdate=!0,vi(u,v,S),u.side=xn):vi(u,v,S)}this.compile=function(u,v,S=null){S===null&&(S=u),p=te.get(S),p.init(v),T.push(p),S.traverseVisible(function(A){A.isLight&&A.layers.test(v.layers)&&(p.pushLight(A),A.castShadow&&p.pushShadow(A))}),u!==S&&u.traverseVisible(function(A){A.isLight&&A.layers.test(v.layers)&&(p.pushLight(A),A.castShadow&&p.pushShadow(A))}),p.setupLights();const y=new Set;return u.traverse(function(A){if(!(A.isMesh||A.isPoints||A.isLine||A.isSprite))return;const N=A.material;if(N)if(Array.isArray(N))for(let z=0;z<N.length;z++){const $=N[z];ce($,S,A),y.add($)}else ce(N,S,A),y.add(N)}),T.pop(),p=null,y},this.compileAsync=function(u,v,S=null){const y=this.compile(u,v,S);return new Promise(A=>{function N(){if(y.forEach(function(z){Rt.get(z).currentProgram.isReady()&&y.delete(z)}),y.size===0){A(u);return}setTimeout(N,10)}lt.get("KHR_parallel_shader_compile")!==null?N():setTimeout(N,10)})};let Fe=null;function qe(u){Fe&&Fe(u)}function Pn(){Cn.stop()}function Zn(){Cn.start()}const Cn=new Uc;Cn.setAnimationLoop(qe),typeof self<"u"&&Cn.setContext(self),this.setAnimationLoop=function(u){Fe=u,Z.setAnimationLoop(u),u===null?Cn.stop():Cn.start()},Z.addEventListener("sessionstart",Pn),Z.addEventListener("sessionend",Zn),this.render=function(u,v){if(v!==void 0&&v.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;if(u.matrixWorldAutoUpdate===!0&&u.updateMatrixWorld(),v.parent===null&&v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(v),v=Z.getCamera()),u.isScene===!0&&u.onBeforeRender(b,u,v,O),p=te.get(u,T.length),p.init(v),T.push(p),Bt.multiplyMatrices(v.projectionMatrix,v.matrixWorldInverse),tt.setFromProjectionMatrix(Bt),Ot=this.localClippingEnabled,pt=ut.init(this.clippingPlanes,Ot),g=Dt.get(u,R.length),g.init(),R.push(g),Z.enabled===!0&&Z.isPresenting===!0){const N=b.xr.getDepthSensingMesh();N!==null&&Ns(N,v,-1/0,b.sortObjects)}Ns(u,v,0,b.sortObjects),g.finish(),b.sortObjects===!0&&g.sort(ct,Mt),it=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,it&&Ht.addToRenderList(g,u),this.info.render.frame++,pt===!0&&ut.beginShadows();const S=p.state.shadowsArray;Lt.render(S,u,v),pt===!0&&ut.endShadows(),this.info.autoReset===!0&&this.info.reset();const y=g.opaque,A=g.transmissive;if(p.setupLights(),v.isArrayCamera){const N=v.cameras;if(A.length>0)for(let z=0,$=N.length;z<$;z++){const q=N[z];Os(y,A,u,q)}it&&Ht.render(u);for(let z=0,$=N.length;z<$;z++){const q=N[z];_i(g,u,q,q.viewport)}}else A.length>0&&Os(y,A,u,v),it&&Ht.render(u),_i(g,u,v);O!==null&&(D.updateMultisampleRenderTarget(O),D.updateRenderTargetMipmap(O)),u.isScene===!0&&u.onAfterRender(b,u,v),de.resetDefaultState(),C=-1,w=null,T.pop(),T.length>0?(p=T[T.length-1],pt===!0&&ut.setGlobalState(b.clippingPlanes,p.state.camera)):p=null,R.pop(),R.length>0?g=R[R.length-1]:g=null};function Ns(u,v,S,y){if(u.visible===!1)return;if(u.layers.test(v.layers)){if(u.isGroup)S=u.renderOrder;else if(u.isLOD)u.autoUpdate===!0&&u.update(v);else if(u.isLight)p.pushLight(u),u.castShadow&&p.pushShadow(u);else if(u.isSprite){if(!u.frustumCulled||tt.intersectsSprite(u)){y&&Pt.setFromMatrixPosition(u.matrixWorld).applyMatrix4(Bt);const z=Q.update(u),$=u.material;$.visible&&g.push(u,z,$,S,Pt.z,null)}}else if((u.isMesh||u.isLine||u.isPoints)&&(!u.frustumCulled||tt.intersectsObject(u))){const z=Q.update(u),$=u.material;if(y&&(u.boundingSphere!==void 0?(u.boundingSphere===null&&u.computeBoundingSphere(),Pt.copy(u.boundingSphere.center)):(z.boundingSphere===null&&z.computeBoundingSphere(),Pt.copy(z.boundingSphere.center)),Pt.applyMatrix4(u.matrixWorld).applyMatrix4(Bt)),Array.isArray($)){const q=z.groups;for(let j=0,ht=q.length;j<ht;j++){const st=q[j],Ut=$[st.materialIndex];Ut&&Ut.visible&&g.push(u,z,Ut,S,Pt.z,st)}}else $.visible&&g.push(u,z,$,S,Pt.z,null)}}const N=u.children;for(let z=0,$=N.length;z<$;z++)Ns(N[z],v,S,y)}function _i(u,v,S,y){const A=u.opaque,N=u.transmissive,z=u.transparent;p.setupLightsView(S),pt===!0&&ut.setGlobalState(b.clippingPlanes,S),y&&_t.viewport(U.copy(y)),A.length>0&&xi(A,v,S),N.length>0&&xi(N,v,S),z.length>0&&xi(z,v,S),_t.buffers.depth.setTest(!0),_t.buffers.depth.setMask(!0),_t.buffers.color.setMask(!0),_t.setPolygonOffset(!1)}function Os(u,v,S,y){if((S.isScene===!0?S.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[y.id]===void 0&&(p.state.transmissionRenderTarget[y.id]=new ri(1,1,{generateMipmaps:!0,type:lt.has("EXT_color_buffer_half_float")||lt.has("EXT_color_buffer_float")?gs:vn,minFilter:ei,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ae.workingColorSpace}));const N=p.state.transmissionRenderTarget[y.id],z=y.viewport||U;N.setSize(z.z,z.w);const $=b.getRenderTarget();b.setRenderTarget(N),b.getClearColor(X),et=b.getClearAlpha(),et<1&&b.setClearColor(16777215,.5),b.clear(),it&&Ht.render(S);const q=b.toneMapping;b.toneMapping=On;const j=y.viewport;if(y.viewport!==void 0&&(y.viewport=void 0),p.setupLightsView(y),pt===!0&&ut.setGlobalState(b.clippingPlanes,y),xi(u,S,y),D.updateMultisampleRenderTarget(N),D.updateRenderTargetMipmap(N),lt.has("WEBGL_multisampled_render_to_texture")===!1){let ht=!1;for(let st=0,Ut=v.length;st<Ut;st++){const Gt=v[st],Kt=Gt.object,pe=Gt.geometry,$t=Gt.material,At=Gt.group;if($t.side===xn&&Kt.layers.test(y.layers)){const Se=$t.side;$t.side=Be,$t.needsUpdate=!0,Fs(Kt,S,y,pe,$t,At),$t.side=Se,$t.needsUpdate=!0,ht=!0}}ht===!0&&(D.updateMultisampleRenderTarget(N),D.updateRenderTargetMipmap(N))}b.setRenderTarget($),b.setClearColor(X,et),j!==void 0&&(y.viewport=j),b.toneMapping=q}function xi(u,v,S){const y=v.isScene===!0?v.overrideMaterial:null;for(let A=0,N=u.length;A<N;A++){const z=u[A],$=z.object,q=z.geometry,j=y===null?z.material:y,ht=z.group;$.layers.test(S.layers)&&Fs($,v,S,q,j,ht)}}function Fs(u,v,S,y,A,N){u.onBeforeRender(b,v,S,y,A,N),u.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,u.matrixWorld),u.normalMatrix.getNormalMatrix(u.modelViewMatrix),A.onBeforeRender(b,v,S,y,u,N),A.transparent===!0&&A.side===xn&&A.forceSinglePass===!1?(A.side=Be,A.needsUpdate=!0,b.renderBufferDirect(S,v,y,A,u,N),A.side=Un,A.needsUpdate=!0,b.renderBufferDirect(S,v,y,A,u,N),A.side=xn):b.renderBufferDirect(S,v,y,A,u,N),u.onAfterRender(b,v,S,y,A,N)}function vi(u,v,S){v.isScene!==!0&&(v=se);const y=Rt.get(u),A=p.state.lights,N=p.state.shadowsArray,z=A.state.version,$=Nt.getParameters(u,A.state,N,v,S),q=Nt.getProgramCacheKey($);let j=y.programs;y.environment=u.isMeshStandardMaterial?v.environment:null,y.fog=v.fog,y.envMap=(u.isMeshStandardMaterial?G:E).get(u.envMap||y.environment),y.envMapRotation=y.environment!==null&&u.envMap===null?v.environmentRotation:u.envMapRotation,j===void 0&&(u.addEventListener("dispose",Vt),j=new Map,y.programs=j);let ht=j.get(q);if(ht!==void 0){if(y.currentProgram===ht&&y.lightsStateVersion===z)return Kr(u,$),ht}else $.uniforms=Nt.getUniforms(u),u.onBeforeCompile($,b),ht=Nt.acquireProgram($,q),j.set(q,ht),y.uniforms=$.uniforms;const st=y.uniforms;return(!u.isShaderMaterial&&!u.isRawShaderMaterial||u.clipping===!0)&&(st.clippingPlanes=ut.uniform),Kr(u,$),y.needsLights=x(u),y.lightsStateVersion=z,y.needsLights&&(st.ambientLightColor.value=A.state.ambient,st.lightProbe.value=A.state.probe,st.directionalLights.value=A.state.directional,st.directionalLightShadows.value=A.state.directionalShadow,st.spotLights.value=A.state.spot,st.spotLightShadows.value=A.state.spotShadow,st.rectAreaLights.value=A.state.rectArea,st.ltc_1.value=A.state.rectAreaLTC1,st.ltc_2.value=A.state.rectAreaLTC2,st.pointLights.value=A.state.point,st.pointLightShadows.value=A.state.pointShadow,st.hemisphereLights.value=A.state.hemi,st.directionalShadowMap.value=A.state.directionalShadowMap,st.directionalShadowMatrix.value=A.state.directionalShadowMatrix,st.spotShadowMap.value=A.state.spotShadowMap,st.spotLightMatrix.value=A.state.spotLightMatrix,st.spotLightMap.value=A.state.spotLightMap,st.pointShadowMap.value=A.state.pointShadowMap,st.pointShadowMatrix.value=A.state.pointShadowMatrix),y.currentProgram=ht,y.uniformsList=null,ht}function zs(u){if(u.uniformsList===null){const v=u.currentProgram.getUniforms();u.uniformsList=Or.seqWithValue(v.seq,u.uniforms)}return u.uniformsList}function Kr(u,v){const S=Rt.get(u);S.outputColorSpace=v.outputColorSpace,S.batching=v.batching,S.batchingColor=v.batchingColor,S.instancing=v.instancing,S.instancingColor=v.instancingColor,S.instancingMorph=v.instancingMorph,S.skinning=v.skinning,S.morphTargets=v.morphTargets,S.morphNormals=v.morphNormals,S.morphColors=v.morphColors,S.morphTargetsCount=v.morphTargetsCount,S.numClippingPlanes=v.numClippingPlanes,S.numIntersection=v.numClipIntersection,S.vertexAlphas=v.vertexAlphas,S.vertexTangents=v.vertexTangents,S.toneMapping=v.toneMapping}function Jr(u,v,S,y,A){v.isScene!==!0&&(v=se),D.resetTextureUnits();const N=v.fog,z=y.isMeshStandardMaterial?v.environment:null,$=O===null?b.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:Ui,q=(y.isMeshStandardMaterial?G:E).get(y.envMap||z),j=y.vertexColors===!0&&!!S.attributes.color&&S.attributes.color.itemSize===4,ht=!!S.attributes.tangent&&(!!y.normalMap||y.anisotropy>0),st=!!S.morphAttributes.position,Ut=!!S.morphAttributes.normal,Gt=!!S.morphAttributes.color;let Kt=On;y.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Kt=b.toneMapping);const pe=S.morphAttributes.position||S.morphAttributes.normal||S.morphAttributes.color,$t=pe!==void 0?pe.length:0,At=Rt.get(y),Se=p.state.lights;if(pt===!0&&(Ot===!0||u!==w)){const ve=u===w&&y.id===C;ut.setState(y,u,ve)}let xt=!1;y.version===At.__version?(At.needsLights&&At.lightsStateVersion!==Se.state.version||At.outputColorSpace!==$||A.isBatchedMesh&&At.batching===!1||!A.isBatchedMesh&&At.batching===!0||A.isBatchedMesh&&At.batchingColor===!0&&A.colorTexture===null||A.isBatchedMesh&&At.batchingColor===!1&&A.colorTexture!==null||A.isInstancedMesh&&At.instancing===!1||!A.isInstancedMesh&&At.instancing===!0||A.isSkinnedMesh&&At.skinning===!1||!A.isSkinnedMesh&&At.skinning===!0||A.isInstancedMesh&&At.instancingColor===!0&&A.instanceColor===null||A.isInstancedMesh&&At.instancingColor===!1&&A.instanceColor!==null||A.isInstancedMesh&&At.instancingMorph===!0&&A.morphTexture===null||A.isInstancedMesh&&At.instancingMorph===!1&&A.morphTexture!==null||At.envMap!==q||y.fog===!0&&At.fog!==N||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==ut.numPlanes||At.numIntersection!==ut.numIntersection)||At.vertexAlphas!==j||At.vertexTangents!==ht||At.morphTargets!==st||At.morphNormals!==Ut||At.morphColors!==Gt||At.toneMapping!==Kt||At.morphTargetsCount!==$t)&&(xt=!0):(xt=!0,At.__version=y.version);let ot=At.currentProgram;xt===!0&&(ot=vi(y,v,A));let at=!1,Ft=!1,Zt=!1;const wt=ot.getUniforms(),ne=At.uniforms;if(_t.useProgram(ot.program)&&(at=!0,Ft=!0,Zt=!0),y.id!==C&&(C=y.id,Ft=!0),at||w!==u){_t.buffers.depth.getReversed()?(mt.copy(u.projectionMatrix),kd(mt),Hd(mt),wt.setValue(I,"projectionMatrix",mt)):wt.setValue(I,"projectionMatrix",u.projectionMatrix),wt.setValue(I,"viewMatrix",u.matrixWorldInverse);const ze=wt.map.cameraPosition;ze!==void 0&&ze.setValue(I,qt.setFromMatrixPosition(u.matrixWorld)),Ct.logarithmicDepthBuffer&&wt.setValue(I,"logDepthBufFC",2/(Math.log(u.far+1)/Math.LN2)),(y.isMeshPhongMaterial||y.isMeshToonMaterial||y.isMeshLambertMaterial||y.isMeshBasicMaterial||y.isMeshStandardMaterial||y.isShaderMaterial)&&wt.setValue(I,"isOrthographic",u.isOrthographicCamera===!0),w!==u&&(w=u,Ft=!0,Zt=!0)}if(A.isSkinnedMesh){wt.setOptional(I,A,"bindMatrix"),wt.setOptional(I,A,"bindMatrixInverse");const ve=A.skeleton;ve&&(ve.boneTexture===null&&ve.computeBoneTexture(),wt.setValue(I,"boneTexture",ve.boneTexture,D))}A.isBatchedMesh&&(wt.setOptional(I,A,"batchingTexture"),wt.setValue(I,"batchingTexture",A._matricesTexture,D),wt.setOptional(I,A,"batchingIdTexture"),wt.setValue(I,"batchingIdTexture",A._indirectTexture,D),wt.setOptional(I,A,"batchingColorTexture"),A._colorsTexture!==null&&wt.setValue(I,"batchingColorTexture",A._colorsTexture,D));const xe=S.morphAttributes;if((xe.position!==void 0||xe.normal!==void 0||xe.color!==void 0)&&Wt.update(A,S,ot),(Ft||At.receiveShadow!==A.receiveShadow)&&(At.receiveShadow=A.receiveShadow,wt.setValue(I,"receiveShadow",A.receiveShadow)),y.isMeshGouraudMaterial&&y.envMap!==null&&(ne.envMap.value=q,ne.flipEnvMap.value=q.isCubeTexture&&q.isRenderTargetTexture===!1?-1:1),y.isMeshStandardMaterial&&y.envMap===null&&v.environment!==null&&(ne.envMapIntensity.value=v.environmentIntensity),Ft&&(wt.setValue(I,"toneMappingExposure",b.toneMappingExposure),At.needsLights&&Qr(ne,Zt),N&&y.fog===!0&&yt.refreshFogUniforms(ne,N),yt.refreshMaterialUniforms(ne,y,H,K,p.state.transmissionRenderTarget[u.id]),Or.upload(I,zs(At),ne,D)),y.isShaderMaterial&&y.uniformsNeedUpdate===!0&&(Or.upload(I,zs(At),ne,D),y.uniformsNeedUpdate=!1),y.isSpriteMaterial&&wt.setValue(I,"center",A.center),wt.setValue(I,"modelViewMatrix",A.modelViewMatrix),wt.setValue(I,"normalMatrix",A.normalMatrix),wt.setValue(I,"modelMatrix",A.matrixWorld),y.isShaderMaterial||y.isRawShaderMaterial){const ve=y.uniformsGroups;for(let ze=0,dn=ve.length;ze<dn;ze++){const Yh=ve[ze];B.update(Yh,ot),B.bind(Yh,ot)}}return ot}function Qr(u,v){u.ambientLightColor.needsUpdate=v,u.lightProbe.needsUpdate=v,u.directionalLights.needsUpdate=v,u.directionalLightShadows.needsUpdate=v,u.pointLights.needsUpdate=v,u.pointLightShadows.needsUpdate=v,u.spotLights.needsUpdate=v,u.spotLightShadows.needsUpdate=v,u.rectAreaLights.needsUpdate=v,u.hemisphereLights.needsUpdate=v}function x(u){return u.isMeshLambertMaterial||u.isMeshToonMaterial||u.isMeshPhongMaterial||u.isMeshStandardMaterial||u.isShadowMaterial||u.isShaderMaterial&&u.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(u,v,S){Rt.get(u.texture).__webglTexture=v,Rt.get(u.depthTexture).__webglTexture=S;const y=Rt.get(u);y.__hasExternalTextures=!0,y.__autoAllocateDepthBuffer=S===void 0,y.__autoAllocateDepthBuffer||lt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),y.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(u,v){const S=Rt.get(u);S.__webglFramebuffer=v,S.__useDefaultFramebuffer=v===void 0},this.setRenderTarget=function(u,v=0,S=0){O=u,P=v,L=S;let y=!0,A=null,N=!1,z=!1;if(u){const q=Rt.get(u);if(q.__useDefaultFramebuffer!==void 0)_t.bindFramebuffer(I.FRAMEBUFFER,null),y=!1;else if(q.__webglFramebuffer===void 0)D.setupRenderTarget(u);else if(q.__hasExternalTextures)D.rebindTextures(u,Rt.get(u.texture).__webglTexture,Rt.get(u.depthTexture).__webglTexture);else if(u.depthBuffer){const st=u.depthTexture;if(q.__boundDepthTexture!==st){if(st!==null&&Rt.has(st)&&(u.width!==st.image.width||u.height!==st.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(u)}}const j=u.texture;(j.isData3DTexture||j.isDataArrayTexture||j.isCompressedArrayTexture)&&(z=!0);const ht=Rt.get(u).__webglFramebuffer;u.isWebGLCubeRenderTarget?(Array.isArray(ht[v])?A=ht[v][S]:A=ht[v],N=!0):u.samples>0&&D.useMultisampledRTT(u)===!1?A=Rt.get(u).__webglMultisampledFramebuffer:Array.isArray(ht)?A=ht[S]:A=ht,U.copy(u.viewport),Y.copy(u.scissor),V=u.scissorTest}else U.copy(It).multiplyScalar(H).floor(),Y.copy(Xt).multiplyScalar(H).floor(),V=oe;if(_t.bindFramebuffer(I.FRAMEBUFFER,A)&&y&&_t.drawBuffers(u,A),_t.viewport(U),_t.scissor(Y),_t.setScissorTest(V),N){const q=Rt.get(u.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+v,q.__webglTexture,S)}else if(z){const q=Rt.get(u.texture),j=v||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,q.__webglTexture,S||0,j)}C=-1},this.readRenderTargetPixels=function(u,v,S,y,A,N,z){if(!(u&&u.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let $=Rt.get(u).__webglFramebuffer;if(u.isWebGLCubeRenderTarget&&z!==void 0&&($=$[z]),$){_t.bindFramebuffer(I.FRAMEBUFFER,$);try{const q=u.texture,j=q.format,ht=q.type;if(!Ct.textureFormatReadable(j)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Ct.textureTypeReadable(ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}v>=0&&v<=u.width-y&&S>=0&&S<=u.height-A&&I.readPixels(v,S,y,A,jt.convert(j),jt.convert(ht),N)}finally{const q=O!==null?Rt.get(O).__webglFramebuffer:null;_t.bindFramebuffer(I.FRAMEBUFFER,q)}}},this.readRenderTargetPixelsAsync=async function(u,v,S,y,A,N,z){if(!(u&&u.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let $=Rt.get(u).__webglFramebuffer;if(u.isWebGLCubeRenderTarget&&z!==void 0&&($=$[z]),$){const q=u.texture,j=q.format,ht=q.type;if(!Ct.textureFormatReadable(j))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Ct.textureTypeReadable(ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(v>=0&&v<=u.width-y&&S>=0&&S<=u.height-A){_t.bindFramebuffer(I.FRAMEBUFFER,$);const st=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,st),I.bufferData(I.PIXEL_PACK_BUFFER,N.byteLength,I.STREAM_READ),I.readPixels(v,S,y,A,jt.convert(j),jt.convert(ht),0);const Ut=O!==null?Rt.get(O).__webglFramebuffer:null;_t.bindFramebuffer(I.FRAMEBUFFER,Ut);const Gt=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await Bd(I,Gt,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,st),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,N),I.deleteBuffer(st),I.deleteSync(Gt),N}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(u,v=null,S=0){u.isTexture!==!0&&(Ms("WebGLRenderer: copyFramebufferToTexture function signature has changed."),v=arguments[0]||null,u=arguments[1]);const y=Math.pow(2,-S),A=Math.floor(u.image.width*y),N=Math.floor(u.image.height*y),z=v!==null?v.x:0,$=v!==null?v.y:0;D.setTexture2D(u,0),I.copyTexSubImage2D(I.TEXTURE_2D,S,0,0,z,$,A,N),_t.unbindTexture()},this.copyTextureToTexture=function(u,v,S=null,y=null,A=0){u.isTexture!==!0&&(Ms("WebGLRenderer: copyTextureToTexture function signature has changed."),y=arguments[0]||null,u=arguments[1],v=arguments[2],A=arguments[3]||0,S=null);let N,z,$,q,j,ht,st,Ut,Gt;const Kt=u.isCompressedTexture?u.mipmaps[A]:u.image;S!==null?(N=S.max.x-S.min.x,z=S.max.y-S.min.y,$=S.isBox3?S.max.z-S.min.z:1,q=S.min.x,j=S.min.y,ht=S.isBox3?S.min.z:0):(N=Kt.width,z=Kt.height,$=Kt.depth||1,q=0,j=0,ht=0),y!==null?(st=y.x,Ut=y.y,Gt=y.z):(st=0,Ut=0,Gt=0);const pe=jt.convert(v.format),$t=jt.convert(v.type);let At;v.isData3DTexture?(D.setTexture3D(v,0),At=I.TEXTURE_3D):v.isDataArrayTexture||v.isCompressedArrayTexture?(D.setTexture2DArray(v,0),At=I.TEXTURE_2D_ARRAY):(D.setTexture2D(v,0),At=I.TEXTURE_2D),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,v.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,v.unpackAlignment);const Se=I.getParameter(I.UNPACK_ROW_LENGTH),xt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),ot=I.getParameter(I.UNPACK_SKIP_PIXELS),at=I.getParameter(I.UNPACK_SKIP_ROWS),Ft=I.getParameter(I.UNPACK_SKIP_IMAGES);I.pixelStorei(I.UNPACK_ROW_LENGTH,Kt.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,Kt.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,q),I.pixelStorei(I.UNPACK_SKIP_ROWS,j),I.pixelStorei(I.UNPACK_SKIP_IMAGES,ht);const Zt=u.isDataArrayTexture||u.isData3DTexture,wt=v.isDataArrayTexture||v.isData3DTexture;if(u.isRenderTargetTexture||u.isDepthTexture){const ne=Rt.get(u),xe=Rt.get(v),ve=Rt.get(ne.__renderTarget),ze=Rt.get(xe.__renderTarget);_t.bindFramebuffer(I.READ_FRAMEBUFFER,ve.__webglFramebuffer),_t.bindFramebuffer(I.DRAW_FRAMEBUFFER,ze.__webglFramebuffer);for(let dn=0;dn<$;dn++)Zt&&I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Rt.get(u).__webglTexture,A,ht+dn),u.isDepthTexture?(wt&&I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Rt.get(v).__webglTexture,A,Gt+dn),I.blitFramebuffer(q,j,N,z,st,Ut,N,z,I.DEPTH_BUFFER_BIT,I.NEAREST)):wt?I.copyTexSubImage3D(At,A,st,Ut,Gt+dn,q,j,N,z):I.copyTexSubImage2D(At,A,st,Ut,Gt+dn,q,j,N,z);_t.bindFramebuffer(I.READ_FRAMEBUFFER,null),_t.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else wt?u.isDataTexture||u.isData3DTexture?I.texSubImage3D(At,A,st,Ut,Gt,N,z,$,pe,$t,Kt.data):v.isCompressedArrayTexture?I.compressedTexSubImage3D(At,A,st,Ut,Gt,N,z,$,pe,Kt.data):I.texSubImage3D(At,A,st,Ut,Gt,N,z,$,pe,$t,Kt):u.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,A,st,Ut,N,z,pe,$t,Kt.data):u.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,A,st,Ut,Kt.width,Kt.height,pe,Kt.data):I.texSubImage2D(I.TEXTURE_2D,A,st,Ut,N,z,pe,$t,Kt);I.pixelStorei(I.UNPACK_ROW_LENGTH,Se),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,xt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,ot),I.pixelStorei(I.UNPACK_SKIP_ROWS,at),I.pixelStorei(I.UNPACK_SKIP_IMAGES,Ft),A===0&&v.generateMipmaps&&I.generateMipmap(At),_t.unbindTexture()},this.copyTextureToTexture3D=function(u,v,S=null,y=null,A=0){return u.isTexture!==!0&&(Ms("WebGLRenderer: copyTextureToTexture3D function signature has changed."),S=arguments[0]||null,y=arguments[1]||null,u=arguments[2],v=arguments[3],A=arguments[4]||0),Ms('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(u,v,S,y,A)},this.initRenderTarget=function(u){Rt.get(u).__webglFramebuffer===void 0&&D.setupRenderTarget(u)},this.initTexture=function(u){u.isCubeTexture?D.setTextureCube(u,0):u.isData3DTexture?D.setTexture3D(u,0):u.isDataArrayTexture||u.isCompressedArrayTexture?D.setTexture2DArray(u,0):D.setTexture2D(u,0),_t.unbindTexture()},this.resetState=function(){P=0,L=0,O=null,_t.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ae._getDrawingBufferColorSpace(t),e.unpackColorSpace=ae._getUnpackColorSpace()}}class x_ extends Ee{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ln,this.environmentIntensity=1,this.environmentRotation=new ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Ga extends Yi{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const zr=new F,Br=new F,dh=new fe,Ts=new Mr,kr=new _r,Va=new F,fh=new F;class v_ extends Ee{constructor(t=new Xe,e=new Ga){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)zr.fromBufferAttribute(e,s-1),Br.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=zr.distanceTo(Br);t.setAttribute("lineDistance",new Ce(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),kr.copy(i.boundingSphere),kr.applyMatrix4(s),kr.radius+=r,t.ray.intersectsSphere(kr)===!1)return;dh.copy(s).invert(),Ts.copy(t.ray).applyMatrix4(dh);const l=r/((this.scale.x+this.scale.y+this.scale.z)/3),a=l*l,c=this.isLineSegments?2:1,h=i.index,f=i.attributes.position;if(h!==null){const m=Math.max(0,o.start),_=Math.min(h.count,o.start+o.count);for(let M=m,g=_-1;M<g;M+=c){const p=h.getX(M),R=h.getX(M+1),T=Hr(this,t,Ts,a,p,R);T&&e.push(T)}if(this.isLineLoop){const M=h.getX(_-1),g=h.getX(m),p=Hr(this,t,Ts,a,M,g);p&&e.push(p)}}else{const m=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let M=m,g=_-1;M<g;M+=c){const p=Hr(this,t,Ts,a,M,M+1);p&&e.push(p)}if(this.isLineLoop){const M=Hr(this,t,Ts,a,_-1,m);M&&e.push(M)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const l=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=r}}}}}function Hr(n,t,e,i,s,r){const o=n.geometry.attributes.position;if(zr.fromBufferAttribute(o,s),Br.fromBufferAttribute(o,r),e.distanceSqToSegment(zr,Br,Va,fh)>i)return;Va.applyMatrix4(n.matrixWorld);const a=t.ray.origin.distanceTo(Va);if(!(a<t.near||a>t.far))return{distance:a,point:fh.clone().applyMatrix4(n.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:n}}const ph=new F,mh=new F;class gh extends v_{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)ph.fromBufferAttribute(e,s),mh.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+ph.distanceTo(mh);t.setAttribute("lineDistance",new Ce(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class un{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const i=this.getLengths();let s=0;const r=i.length;let o;e?o=e:o=t*i[r-1];let l=0,a=r-1,c;for(;l<=a;)if(s=Math.floor(l+(a-l)/2),c=i[s]-o,c<0)l=s+1;else if(c>0)a=s-1;else{a=s;break}if(s=a,i[s]===o)return s/(r-1);const h=i[s],f=i[s+1]-h,m=(o-h)/f;return(s+m)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),l=this.getPoint(r),a=e||(o.isVector2?new ft:new F);return a.copy(l).sub(o).normalize(),a}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){const i=new F,s=[],r=[],o=[],l=new F,a=new fe;for(let m=0;m<=t;m++){const _=m/t;s[m]=this.getTangentAt(_,new F)}r[0]=new F,o[0]=new F;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),f<=c&&i.set(0,0,1),l.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],l),o[0].crossVectors(s[0],r[0]);for(let m=1;m<=t;m++){if(r[m]=r[m-1].clone(),o[m]=o[m-1].clone(),l.crossVectors(s[m-1],s[m]),l.length()>Number.EPSILON){l.normalize();const _=Math.acos(Re(s[m-1].dot(s[m]),-1,1));r[m].applyMatrix4(a.makeRotationAxis(l,_))}o[m].crossVectors(s[m],r[m])}if(e===!0){let m=Math.acos(Re(r[0].dot(r[t]),-1,1));m/=t,s[0].dot(l.crossVectors(r[0],r[t]))>0&&(m=-m);for(let _=1;_<=t;_++)r[_].applyMatrix4(a.makeRotationAxis(s[_],m*_)),o[_].crossVectors(s[_],r[_])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Wa extends un{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,l=!1,a=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=l,this.aRotation=a}getPoint(t,e=new ft){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const l=this.aStartAngle+t*r;let a=this.aX+this.xRadius*Math.cos(l),c=this.aY+this.yRadius*Math.sin(l);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=a-this.aX,m=c-this.aY;a=f*h-m*d+this.aX,c=f*d+m*h+this.aY}return i.set(a,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class M_ extends Wa{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function $a(){let n=0,t=0,e=0,i=0;function s(r,o,l,a){n=r,t=l,e=-3*r+3*o-2*l-a,i=2*r-2*o+l+a}return{initCatmullRom:function(r,o,l,a,c){s(o,l,c*(l-r),c*(a-o))},initNonuniformCatmullRom:function(r,o,l,a,c,h,d){let f=(o-r)/c-(l-r)/(c+h)+(l-o)/h,m=(l-o)/h-(a-o)/(h+d)+(a-l)/d;f*=h,m*=h,s(o,l,f,m)},calc:function(r){const o=r*r,l=o*r;return n+t*r+e*o+i*l}}}const Gr=new F,Xa=new $a,qa=new $a,Ya=new $a;class S_ extends un{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new F){const i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let l=Math.floor(o),a=o-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/r)+1)*r:a===0&&l===r-1&&(l=r-2,a=1);let c,h;this.closed||l>0?c=s[(l-1)%r]:(Gr.subVectors(s[0],s[1]).add(s[0]),c=Gr);const d=s[l%r],f=s[(l+1)%r];if(this.closed||l+2<r?h=s[(l+2)%r]:(Gr.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Gr),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let _=Math.pow(c.distanceToSquared(d),m),M=Math.pow(d.distanceToSquared(f),m),g=Math.pow(f.distanceToSquared(h),m);M<1e-4&&(M=1),_<1e-4&&(_=M),g<1e-4&&(g=M),Xa.initNonuniformCatmullRom(c.x,d.x,f.x,h.x,_,M,g),qa.initNonuniformCatmullRom(c.y,d.y,f.y,h.y,_,M,g),Ya.initNonuniformCatmullRom(c.z,d.z,f.z,h.z,_,M,g)}else this.curveType==="catmullrom"&&(Xa.initCatmullRom(c.x,d.x,f.x,h.x,this.tension),qa.initCatmullRom(c.y,d.y,f.y,h.y,this.tension),Ya.initCatmullRom(c.z,d.z,f.z,h.z,this.tension));return i.set(Xa.calc(a),qa.calc(a),Ya.calc(a)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new F().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function _h(n,t,e,i,s){const r=(i-t)*.5,o=(s-e)*.5,l=n*n,a=n*l;return(2*e-2*i+r+o)*a+(-3*e+3*i-2*r-o)*l+r*n+e}function y_(n,t){const e=1-n;return e*e*t}function b_(n,t){return 2*(1-n)*n*t}function E_(n,t){return n*n*t}function As(n,t,e,i){return y_(n,t)+b_(n,e)+E_(n,i)}function w_(n,t){const e=1-n;return e*e*e*t}function T_(n,t){const e=1-n;return 3*e*e*n*t}function A_(n,t){return 3*(1-n)*n*n*t}function R_(n,t){return n*n*n*t}function Rs(n,t,e,i,s){return w_(n,t)+T_(n,e)+A_(n,i)+R_(n,s)}class xh extends un{constructor(t=new ft,e=new ft,i=new ft,s=new ft){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new ft){const i=e,s=this.v0,r=this.v1,o=this.v2,l=this.v3;return i.set(Rs(t,s.x,r.x,o.x,l.x),Rs(t,s.y,r.y,o.y,l.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class P_ extends un{constructor(t=new F,e=new F,i=new F,s=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new F){const i=e,s=this.v0,r=this.v1,o=this.v2,l=this.v3;return i.set(Rs(t,s.x,r.x,o.x,l.x),Rs(t,s.y,r.y,o.y,l.y),Rs(t,s.z,r.z,o.z,l.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class vh extends un{constructor(t=new ft,e=new ft){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ft){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ft){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class C_ extends un{constructor(t=new F,e=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new F){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new F){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Mh extends un{constructor(t=new ft,e=new ft,i=new ft){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new ft){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(As(t,s.x,r.x,o.x),As(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class D_ extends un{constructor(t=new F,e=new F,i=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new F){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(As(t,s.x,r.x,o.x),As(t,s.y,r.y,o.y),As(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Sh extends un{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ft){const i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),l=r-o,a=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return i.set(_h(l,a.x,c.x,h.x,d.x),_h(l,a.y,c.y,h.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new ft().fromArray(s))}return this}}var Za=Object.freeze({__proto__:null,ArcCurve:M_,CatmullRomCurve3:S_,CubicBezierCurve:xh,CubicBezierCurve3:P_,EllipseCurve:Wa,LineCurve:vh,LineCurve3:C_,QuadraticBezierCurve:Mh,QuadraticBezierCurve3:D_,SplineCurve:Sh});class L_ extends un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Za[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,l=this.curves[r],a=l.getLength(),c=a===0?0:1-o/a;return l.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],l=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,a=o.getPoints(l);for(let c=0;c<a.length;c++){const h=a[c];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new Za[s.type]().fromJSON(s))}return this}}class yh extends L_{constructor(t){super(),this.type="Path",this.currentPoint=new ft,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new vh(this.currentPoint.clone(),new ft(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new Mh(this.currentPoint.clone(),new ft(t,e),new ft(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){const l=new xh(this.currentPoint.clone(),new ft(t,e),new ft(i,s),new ft(r,o));return this.curves.push(l),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new Sh(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){const l=this.currentPoint.x,a=this.currentPoint.y;return this.absarc(t+l,e+a,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,l,a){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,i,s,r,o,l,a),this}absellipse(t,e,i,s,r,o,l,a){const c=new Wa(t,e,i,s,r,o,l,a);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}const Vr=new F,Wr=new F,ja=new F,$r=new Ze;class I_ extends Xe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(Oi*e),o=t.getIndex(),l=t.getAttribute("position"),a=o?o.count:l.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),f={},m=[];for(let _=0;_<a;_+=3){o?(c[0]=o.getX(_),c[1]=o.getX(_+1),c[2]=o.getX(_+2)):(c[0]=_,c[1]=_+1,c[2]=_+2);const{a:M,b:g,c:p}=$r;if(M.fromBufferAttribute(l,c[0]),g.fromBufferAttribute(l,c[1]),p.fromBufferAttribute(l,c[2]),$r.getNormal(ja),d[0]=`${Math.round(M.x*s)},${Math.round(M.y*s)},${Math.round(M.z*s)}`,d[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,d[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let R=0;R<3;R++){const T=(R+1)%3,b=d[R],k=d[T],P=$r[h[R]],L=$r[h[T]],O=`${b}_${k}`,C=`${k}_${b}`;C in f&&f[C]?(ja.dot(f[C].normal)<=r&&(m.push(P.x,P.y,P.z),m.push(L.x,L.y,L.z)),f[C]=null):O in f||(f[O]={index0:c[R],index1:c[T],normal:ja.clone()})}}for(const _ in f)if(f[_]){const{index0:M,index1:g}=f[_];Vr.fromBufferAttribute(l,M),Wr.fromBufferAttribute(l,g),m.push(Vr.x,Vr.y,Vr.z),m.push(Wr.x,Wr.y,Wr.z)}this.setAttribute("position",new Ce(m,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Ka extends yh{constructor(t){super(t),this.uuid=si(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(new yh().fromJSON(s))}return this}}const U_={triangulate:function(n,t,e=2){const i=t&&t.length,s=i?t[0]*e:n.length;let r=bh(n,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let l,a,c,h,d,f,m;if(i&&(r=B_(n,t,r,e)),n.length>80*e){l=c=n[0],a=h=n[1];for(let _=e;_<s;_+=e)d=n[_],f=n[_+1],d<l&&(l=d),f<a&&(a=f),d>c&&(c=d),f>h&&(h=f);m=Math.max(c-l,h-a),m=m!==0?32767/m:0}return Ps(r,o,e,l,a,m,0),o}};function bh(n,t,e,i,s){let r,o;if(s===j_(n,t,e,i)>0)for(r=t;r<e;r+=i)o=Th(r,n[r],n[r+1],o);else for(r=e-i;r>=t;r-=i)o=Th(r,n[r],n[r+1],o);return o&&Xr(o,o.next)&&(Ds(o),o=o.next),o}function gi(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Xr(e,e.next)||_e(e.prev,e,e.next)===0)){if(Ds(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Ps(n,t,e,i,s,r,o){if(!n)return;!o&&r&&W_(n,i,s,r);let l=n,a,c;for(;n.prev!==n.next;){if(a=n.prev,c=n.next,r?O_(n,i,s,r):N_(n)){t.push(a.i/e|0),t.push(n.i/e|0),t.push(c.i/e|0),Ds(n),n=c.next,l=c.next;continue}if(n=c,n===l){o?o===1?(n=F_(gi(n),t,e),Ps(n,t,e,i,s,r,2)):o===2&&z_(n,t,e,i,s,r):Ps(gi(n),t,e,i,s,r,1);break}}}function N_(n){const t=n.prev,e=n,i=n.next;if(_e(t,e,i)>=0)return!1;const s=t.x,r=e.x,o=i.x,l=t.y,a=e.y,c=i.y,h=s<r?s<o?s:o:r<o?r:o,d=l<a?l<c?l:c:a<c?a:c,f=s>r?s>o?s:o:r>o?r:o,m=l>a?l>c?l:c:a>c?a:c;let _=i.next;for(;_!==t;){if(_.x>=h&&_.x<=f&&_.y>=d&&_.y<=m&&ns(s,l,r,a,o,c,_.x,_.y)&&_e(_.prev,_,_.next)>=0)return!1;_=_.next}return!0}function O_(n,t,e,i){const s=n.prev,r=n,o=n.next;if(_e(s,r,o)>=0)return!1;const l=s.x,a=r.x,c=o.x,h=s.y,d=r.y,f=o.y,m=l<a?l<c?l:c:a<c?a:c,_=h<d?h<f?h:f:d<f?d:f,M=l>a?l>c?l:c:a>c?a:c,g=h>d?h>f?h:f:d>f?d:f,p=Ja(m,_,t,e,i),R=Ja(M,g,t,e,i);let T=n.prevZ,b=n.nextZ;for(;T&&T.z>=p&&b&&b.z<=R;){if(T.x>=m&&T.x<=M&&T.y>=_&&T.y<=g&&T!==s&&T!==o&&ns(l,h,a,d,c,f,T.x,T.y)&&_e(T.prev,T,T.next)>=0||(T=T.prevZ,b.x>=m&&b.x<=M&&b.y>=_&&b.y<=g&&b!==s&&b!==o&&ns(l,h,a,d,c,f,b.x,b.y)&&_e(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;T&&T.z>=p;){if(T.x>=m&&T.x<=M&&T.y>=_&&T.y<=g&&T!==s&&T!==o&&ns(l,h,a,d,c,f,T.x,T.y)&&_e(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;b&&b.z<=R;){if(b.x>=m&&b.x<=M&&b.y>=_&&b.y<=g&&b!==s&&b!==o&&ns(l,h,a,d,c,f,b.x,b.y)&&_e(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function F_(n,t,e){let i=n;do{const s=i.prev,r=i.next.next;!Xr(s,r)&&Eh(s,i,i.next,r)&&Cs(s,r)&&Cs(r,s)&&(t.push(s.i/e|0),t.push(i.i/e|0),t.push(r.i/e|0),Ds(i),Ds(i.next),i=n=r),i=i.next}while(i!==n);return gi(i)}function z_(n,t,e,i,s,r){let o=n;do{let l=o.next.next;for(;l!==o.prev;){if(o.i!==l.i&&q_(o,l)){let a=wh(o,l);o=gi(o,o.next),a=gi(a,a.next),Ps(o,t,e,i,s,r,0),Ps(a,t,e,i,s,r,0);return}l=l.next}o=o.next}while(o!==n)}function B_(n,t,e,i){const s=[];let r,o,l,a,c;for(r=0,o=t.length;r<o;r++)l=t[r]*i,a=r<o-1?t[r+1]*i:n.length,c=bh(n,l,a,i,!1),c===c.next&&(c.steiner=!0),s.push(X_(c));for(s.sort(k_),r=0;r<s.length;r++)e=H_(s[r],e);return e}function k_(n,t){return n.x-t.x}function H_(n,t){const e=G_(n,t);if(!e)return t;const i=wh(e,n);return gi(i,i.next),gi(e,e.next)}function G_(n,t){let e=t,i=-1/0,s;const r=n.x,o=n.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>i&&(i=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;const l=s,a=s.x,c=s.y;let h=1/0,d;e=s;do r>=e.x&&e.x>=a&&r!==e.x&&ns(o<c?r:i,o,a,c,o<c?i:r,o,e.x,e.y)&&(d=Math.abs(o-e.y)/(r-e.x),Cs(e,n)&&(d<h||d===h&&(e.x>s.x||e.x===s.x&&V_(s,e)))&&(s=e,h=d)),e=e.next;while(e!==l);return s}function V_(n,t){return _e(n.prev,n,t.prev)<0&&_e(t.next,n,n.next)<0}function W_(n,t,e,i){let s=n;do s.z===0&&(s.z=Ja(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,$_(s)}function $_(n){let t,e,i,s,r,o,l,a,c=1;do{for(e=n,n=null,r=null,o=0;e;){for(o++,i=e,l=0,t=0;t<c&&(l++,i=i.nextZ,!!i);t++);for(a=c;l>0||a>0&&i;)l!==0&&(a===0||!i||e.z<=i.z)?(s=e,e=e.nextZ,l--):(s=i,i=i.nextZ,a--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;e=i}r.nextZ=null,c*=2}while(o>1);return n}function Ja(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function X_(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function ns(n,t,e,i,s,r,o,l){return(s-o)*(t-l)>=(n-o)*(r-l)&&(n-o)*(i-l)>=(e-o)*(t-l)&&(e-o)*(r-l)>=(s-o)*(i-l)}function q_(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!Y_(n,t)&&(Cs(n,t)&&Cs(t,n)&&Z_(n,t)&&(_e(n.prev,n,t.prev)||_e(n,t.prev,t))||Xr(n,t)&&_e(n.prev,n,n.next)>0&&_e(t.prev,t,t.next)>0)}function _e(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Xr(n,t){return n.x===t.x&&n.y===t.y}function Eh(n,t,e,i){const s=Yr(_e(n,t,e)),r=Yr(_e(n,t,i)),o=Yr(_e(e,i,n)),l=Yr(_e(e,i,t));return!!(s!==r&&o!==l||s===0&&qr(n,e,t)||r===0&&qr(n,i,t)||o===0&&qr(e,n,i)||l===0&&qr(e,t,i))}function qr(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function Yr(n){return n>0?1:n<0?-1:0}function Y_(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Eh(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Cs(n,t){return _e(n.prev,n,n.next)<0?_e(n,t,n.next)>=0&&_e(n,n.prev,t)>=0:_e(n,t,n.prev)<0||_e(n,n.next,t)<0}function Z_(n,t){let e=n,i=!1;const s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function wh(n,t){const e=new Qa(n.i,n.x,n.y),i=new Qa(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function Th(n,t,e,i){const s=new Qa(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Ds(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Qa(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function j_(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}class qn{static area(t){const e=t.length;let i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return qn.area(t)<0}static triangulateShape(t,e){const i=[],s=[],r=[];Ah(t),Rh(i,t);let o=t.length;e.forEach(Ah);for(let a=0;a<e.length;a++)s.push(o),o+=e[a].length,Rh(i,e[a]);const l=U_.triangulate(i,s);for(let a=0;a<l.length;a+=3)r.push(l.slice(a,a+3));return r}}function Ah(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function Rh(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class tl extends Xe{constructor(t=new Ka([new ft(.5,.5),new ft(-.5,.5),new ft(-.5,-.5),new ft(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const i=this,s=[],r=[];for(let l=0,a=t.length;l<a;l++){const c=t[l];o(c)}this.setAttribute("position",new Ce(s,3)),this.setAttribute("uv",new Ce(r,2)),this.computeVertexNormals();function o(l){const a=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,m=e.bevelThickness!==void 0?e.bevelThickness:.2,_=e.bevelSize!==void 0?e.bevelSize:m-.1,M=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,R=e.UVGenerator!==void 0?e.UVGenerator:K_;let T,b=!1,k,P,L,O;p&&(T=p.getSpacedPoints(h),b=!0,f=!1,k=p.computeFrenetFrames(h,!1),P=new F,L=new F,O=new F),f||(g=0,m=0,_=0,M=0);const C=l.extractPoints(c);let w=C.shape;const U=C.holes;if(!qn.isClockWise(w)){w=w.reverse();for(let it=0,dt=U.length;it<dt;it++){const I=U[it];qn.isClockWise(I)&&(U[it]=I.reverse())}}const V=qn.triangulateShape(w,U),X=w;for(let it=0,dt=U.length;it<dt;it++){const I=U[it];w=w.concat(I)}function et(it,dt,I){return dt||console.error("THREE.ExtrudeGeometry: vec does not exist"),it.clone().addScaledVector(dt,I)}const W=w.length,K=V.length;function H(it,dt,I){let zt,lt,Ct;const _t=it.x-dt.x,kt=it.y-dt.y,Rt=I.x-it.x,D=I.y-it.y,E=_t*_t+kt*kt,G=_t*D-kt*Rt;if(Math.abs(G)>Number.EPSILON){const J=Math.sqrt(E),rt=Math.sqrt(Rt*Rt+D*D),Q=dt.x-kt/J,Nt=dt.y+_t/J,yt=I.x-D/rt,Dt=I.y+Rt/rt,te=((yt-Q)*D-(Dt-Nt)*Rt)/(_t*D-kt*Rt);zt=Q+_t*te-it.x,lt=Nt+kt*te-it.y;const ut=zt*zt+lt*lt;if(ut<=2)return new ft(zt,lt);Ct=Math.sqrt(ut/2)}else{let J=!1;_t>Number.EPSILON?Rt>Number.EPSILON&&(J=!0):_t<-Number.EPSILON?Rt<-Number.EPSILON&&(J=!0):Math.sign(kt)===Math.sign(D)&&(J=!0),J?(zt=-kt,lt=_t,Ct=Math.sqrt(E)):(zt=_t,lt=kt,Ct=Math.sqrt(E/2))}return new ft(zt/Ct,lt/Ct)}const ct=[];for(let it=0,dt=X.length,I=dt-1,zt=it+1;it<dt;it++,I++,zt++)I===dt&&(I=0),zt===dt&&(zt=0),ct[it]=H(X[it],X[I],X[zt]);const Mt=[];let It,Xt=ct.concat();for(let it=0,dt=U.length;it<dt;it++){const I=U[it];It=[];for(let zt=0,lt=I.length,Ct=lt-1,_t=zt+1;zt<lt;zt++,Ct++,_t++)Ct===lt&&(Ct=0),_t===lt&&(_t=0),It[zt]=H(I[zt],I[Ct],I[_t]);Mt.push(It),Xt=Xt.concat(It)}for(let it=0;it<g;it++){const dt=it/g,I=m*Math.cos(dt*Math.PI/2),zt=_*Math.sin(dt*Math.PI/2)+M;for(let lt=0,Ct=X.length;lt<Ct;lt++){const _t=et(X[lt],ct[lt],zt);mt(_t.x,_t.y,-I)}for(let lt=0,Ct=U.length;lt<Ct;lt++){const _t=U[lt];It=Mt[lt];for(let kt=0,Rt=_t.length;kt<Rt;kt++){const D=et(_t[kt],It[kt],zt);mt(D.x,D.y,-I)}}}const oe=_+M;for(let it=0;it<W;it++){const dt=f?et(w[it],Xt[it],oe):w[it];b?(L.copy(k.normals[0]).multiplyScalar(dt.x),P.copy(k.binormals[0]).multiplyScalar(dt.y),O.copy(T[0]).add(L).add(P),mt(O.x,O.y,O.z)):mt(dt.x,dt.y,0)}for(let it=1;it<=h;it++)for(let dt=0;dt<W;dt++){const I=f?et(w[dt],Xt[dt],oe):w[dt];b?(L.copy(k.normals[it]).multiplyScalar(I.x),P.copy(k.binormals[it]).multiplyScalar(I.y),O.copy(T[it]).add(L).add(P),mt(O.x,O.y,O.z)):mt(I.x,I.y,d/h*it)}for(let it=g-1;it>=0;it--){const dt=it/g,I=m*Math.cos(dt*Math.PI/2),zt=_*Math.sin(dt*Math.PI/2)+M;for(let lt=0,Ct=X.length;lt<Ct;lt++){const _t=et(X[lt],ct[lt],zt);mt(_t.x,_t.y,d+I)}for(let lt=0,Ct=U.length;lt<Ct;lt++){const _t=U[lt];It=Mt[lt];for(let kt=0,Rt=_t.length;kt<Rt;kt++){const D=et(_t[kt],It[kt],zt);b?mt(D.x,D.y+T[h-1].y,T[h-1].x+I):mt(D.x,D.y,d+I)}}}tt(),pt();function tt(){const it=s.length/3;if(f){let dt=0,I=W*dt;for(let zt=0;zt<K;zt++){const lt=V[zt];Bt(lt[2]+I,lt[1]+I,lt[0]+I)}dt=h+g*2,I=W*dt;for(let zt=0;zt<K;zt++){const lt=V[zt];Bt(lt[0]+I,lt[1]+I,lt[2]+I)}}else{for(let dt=0;dt<K;dt++){const I=V[dt];Bt(I[2],I[1],I[0])}for(let dt=0;dt<K;dt++){const I=V[dt];Bt(I[0]+W*h,I[1]+W*h,I[2]+W*h)}}i.addGroup(it,s.length/3-it,0)}function pt(){const it=s.length/3;let dt=0;Ot(X,dt),dt+=X.length;for(let I=0,zt=U.length;I<zt;I++){const lt=U[I];Ot(lt,dt),dt+=lt.length}i.addGroup(it,s.length/3-it,1)}function Ot(it,dt){let I=it.length;for(;--I>=0;){const zt=I;let lt=I-1;lt<0&&(lt=it.length-1);for(let Ct=0,_t=h+g*2;Ct<_t;Ct++){const kt=W*Ct,Rt=W*(Ct+1),D=dt+zt+kt,E=dt+lt+kt,G=dt+lt+Rt,J=dt+zt+Rt;qt(D,E,G,J)}}}function mt(it,dt,I){a.push(it),a.push(dt),a.push(I)}function Bt(it,dt,I){Pt(it),Pt(dt),Pt(I);const zt=s.length/3,lt=R.generateTopUV(i,s,zt-3,zt-2,zt-1);se(lt[0]),se(lt[1]),se(lt[2])}function qt(it,dt,I,zt){Pt(it),Pt(dt),Pt(zt),Pt(dt),Pt(I),Pt(zt);const lt=s.length/3,Ct=R.generateSideWallUV(i,s,lt-6,lt-3,lt-2,lt-1);se(Ct[0]),se(Ct[1]),se(Ct[3]),se(Ct[1]),se(Ct[2]),se(Ct[3])}function Pt(it){s.push(a[it*3+0]),s.push(a[it*3+1]),s.push(a[it*3+2])}function se(it){r.push(it.x),r.push(it.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return J_(e,i,t)}static fromJSON(t,e){const i=[];for(let r=0,o=t.shapes.length;r<o;r++){const l=e[t.shapes[r]];i.push(l)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Za[s.type]().fromJSON(s)),new tl(i,t.options)}}const K_={generateTopUV:function(n,t,e,i,s){const r=t[e*3],o=t[e*3+1],l=t[i*3],a=t[i*3+1],c=t[s*3],h=t[s*3+1];return[new ft(r,o),new ft(l,a),new ft(c,h)]},generateSideWallUV:function(n,t,e,i,s,r){const o=t[e*3],l=t[e*3+1],a=t[e*3+2],c=t[i*3],h=t[i*3+1],d=t[i*3+2],f=t[s*3],m=t[s*3+1],_=t[s*3+2],M=t[r*3],g=t[r*3+1],p=t[r*3+2];return Math.abs(l-h)<Math.abs(o-c)?[new ft(o,1-a),new ft(c,1-d),new ft(f,1-_),new ft(M,1-p)]:[new ft(l,1-a),new ft(h,1-d),new ft(m,1-_),new ft(g,1-p)]}};function J_(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){const r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class el extends Xe{constructor(t=new Ka([new ft(0,.5),new ft(-.5,-.5),new ft(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const i=[],s=[],r=[],o=[];let l=0,a=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(l,a,h),l+=a,a=0;this.setIndex(i),this.setAttribute("position",new Ce(s,3)),this.setAttribute("normal",new Ce(r,3)),this.setAttribute("uv",new Ce(o,2));function c(h){const d=s.length/3,f=h.extractPoints(e);let m=f.shape;const _=f.holes;qn.isClockWise(m)===!1&&(m=m.reverse());for(let g=0,p=_.length;g<p;g++){const R=_[g];qn.isClockWise(R)===!0&&(_[g]=R.reverse())}const M=qn.triangulateShape(m,_);for(let g=0,p=_.length;g<p;g++){const R=_[g];m=m.concat(R)}for(let g=0,p=m.length;g<p;g++){const R=m[g];s.push(R.x,R.y,0),r.push(0,0,1),o.push(R.x,R.y)}for(let g=0,p=M.length;g<p;g++){const R=M[g],T=R[0]+d,b=R[1]+d,k=R[2]+d;i.push(T,b,k),a+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return Q_(e,t)}static fromJSON(t,e){const i=[];for(let s=0,r=t.shapes.length;s<r;s++){const o=e[t.shapes[s]];i.push(o)}return new el(i,t.curveSegments)}}function Q_(n,t){if(t.shapes=[],Array.isArray(n))for(let e=0,i=n.length;e<i;e++){const s=n[e];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t}class Ph extends Yi{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ql,this.normalScale=new ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ln,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ch extends Ee{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ie(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class t0 extends Ch{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ie(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const nl=new fe,Dh=new F,Lh=new F;class e0{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ft(512,512),this.map=null,this.mapPass=null,this.matrix=new fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new La,this._frameExtents=new ft(1,1),this._viewportCount=1,this._viewports=[new Me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;Dh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Dh),Lh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Lh),e.updateMatrixWorld(),nl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(nl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(nl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class n0 extends e0{constructor(){super(new Nc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class i0 extends Ch{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.target=new Ee,this.shadow=new n0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Ih=new fe;class s0{constructor(t,e,i=0,s=1/0){this.ray=new Mr(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new xa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ih.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ih),this}intersectObject(t,e=!0,i=[]){return il(t,this,i,e),i.sort(Uh),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)il(t[s],this,i,e);return i.sort(Uh),i}}function Uh(n,t){return n.distance-t.distance}function il(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,l=r.length;o<l;o++)il(r[o],t,e,!0)}}class Nh{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(Re(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class r0 extends gh{constructor(t=10,e=10,i=4473924,s=8947848){i=new ie(i),s=new ie(s);const r=e/2,o=t/e,l=t/2,a=[],c=[];for(let f=0,m=0,_=-l;f<=e;f++,_+=o){a.push(-l,0,_,l,0,_),a.push(_,0,-l,_,0,l);const M=f===r?i:s;M.toArray(c,m),m+=3,M.toArray(c,m),m+=3,M.toArray(c,m),m+=3,M.toArray(c,m),m+=3}const h=new Xe;h.setAttribute("position",new Ce(a,3)),h.setAttribute("color",new Ce(c,3));const d=new Ga({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class o0 extends ii{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:go}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=go);const Oh={type:"change"},sl={type:"start"},Fh={type:"end"},Zr=new Mr,zh=new $n,a0=Math.cos(70*vs.DEG2RAD),Ae=new F,He=2*Math.PI,ue={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},rl=1e-6;class l0 extends o0{constructor(t,e=null){super(t,e),this.state=ue.NONE,this.enabled=!0,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:wi.ROTATE,MIDDLE:wi.DOLLY,RIGHT:wi.PAN},this.touches={ONE:Ti.ROTATE,TWO:Ti.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new oi,this._lastTargetPosition=new F,this._quat=new oi().setFromUnitVectors(t.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Nh,this._sphericalDelta=new Nh,this._scale=1,this._panOffset=new F,this._rotateStart=new ft,this._rotateEnd=new ft,this._rotateDelta=new ft,this._panStart=new ft,this._panEnd=new ft,this._panDelta=new ft,this._dollyStart=new ft,this._dollyEnd=new ft,this._dollyDelta=new ft,this._dollyDirection=new F,this._mouse=new ft,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=h0.bind(this),this._onPointerDown=c0.bind(this),this._onPointerUp=u0.bind(this),this._onContextMenu=x0.bind(this),this._onMouseWheel=p0.bind(this),this._onKeyDown=m0.bind(this),this._onTouchStart=g0.bind(this),this._onTouchMove=_0.bind(this),this._onMouseDown=d0.bind(this),this._onMouseMove=f0.bind(this),this._interceptControlDown=v0.bind(this),this._interceptControlUp=M0.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Oh),this.update(),this.state=ue.NONE}update(t=null){const e=this.object.position;Ae.copy(e).sub(this.target),Ae.applyQuaternion(this._quat),this._spherical.setFromVector3(Ae),this.autoRotate&&this.state===ue.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=He:i>Math.PI&&(i-=He),s<-Math.PI?s+=He:s>Math.PI&&(s-=He),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ae.setFromSpherical(this._spherical),Ae.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ae),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const l=Ae.length();o=this._clampDistance(l*this._scale);const a=l-o;this.object.position.addScaledVector(this._dollyDirection,a),this.object.updateMatrixWorld(),r=!!a}else if(this.object.isOrthographicCamera){const l=new F(this._mouse.x,this._mouse.y,0);l.unproject(this.object);const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=a!==this.object.zoom;const c=new F(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(l),this.object.updateMatrixWorld(),o=Ae.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Zr.origin.copy(this.object.position),Zr.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Zr.direction))<a0?this.object.lookAt(this.target):(zh.setFromNormalAndCoplanarPoint(this.object.up,this.target),Zr.intersectPlane(zh,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>rl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>rl||this._lastTargetPosition.distanceToSquared(this.target)>rl?(this.dispatchEvent(Oh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?He/60*this.autoRotateSpeed*t:He/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ae.setFromMatrixColumn(e,0),Ae.multiplyScalar(-t),this._panOffset.add(Ae)}_panUp(t,e){this.screenSpacePanning===!0?Ae.setFromMatrixColumn(e,1):(Ae.setFromMatrixColumn(e,0),Ae.crossVectors(this.object.up,Ae)),Ae.multiplyScalar(t),this._panOffset.add(Ae)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Ae.copy(s).sub(this.target);let r=Ae.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,l=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/l)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(He*this._rotateDelta.x/e.clientHeight),this._rotateUp(He*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(He*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-He*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(He*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-He*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(He*this._rotateDelta.x/e.clientHeight),this._rotateUp(He*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,l=(t.pageY+e.y)*.5;this._updateZoomParameters(o,l)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new ft,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function c0(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function h0(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function u0(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Fh),this.state=ue.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function d0(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case wi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ue.DOLLY;break;case wi.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ue.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ue.ROTATE}break;case wi.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ue.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ue.PAN}break;default:this.state=ue.NONE}this.state!==ue.NONE&&this.dispatchEvent(sl)}function f0(n){switch(this.state){case ue.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ue.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ue.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function p0(n){this.enabled===!1||this.enableZoom===!1||this.state!==ue.NONE||(n.preventDefault(),this.dispatchEvent(sl),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Fh))}function m0(n){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(n)}function g0(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Ti.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ue.TOUCH_ROTATE;break;case Ti.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ue.TOUCH_PAN;break;default:this.state=ue.NONE}break;case 2:switch(this.touches.TWO){case Ti.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ue.TOUCH_DOLLY_PAN;break;case Ti.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ue.TOUCH_DOLLY_ROTATE;break;default:this.state=ue.NONE}break;default:this.state=ue.NONE}this.state!==ue.NONE&&this.dispatchEvent(sl)}function _0(n){switch(this._trackPointer(n),this.state){case ue.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ue.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ue.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ue.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ue.NONE}}function x0(n){this.enabled!==!1&&n.preventDefault()}function v0(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function M0(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class jr extends Ee{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new ft(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const is=new F,Bh=new fe,kh=new fe,Hh=new F,Gh=new F;class S0{constructor(t={}){const e=this;let i,s,r,o;const l={objects:new WeakMap},a=t.element!==void 0?t.element:document.createElement("div");a.style.overflow="hidden",this.domElement=a,this.getSize=function(){return{width:i,height:s}},this.render=function(_,M){_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),M.parent===null&&M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),Bh.copy(M.matrixWorldInverse),kh.multiplyMatrices(M.projectionMatrix,Bh),h(_,_,M),m(_)},this.setSize=function(_,M){i=_,s=M,r=i/2,o=s/2,a.style.width=_+"px",a.style.height=M+"px"};function c(_){_.isCSS2DObject&&(_.element.style.display="none");for(let M=0,g=_.children.length;M<g;M++)c(_.children[M])}function h(_,M,g){if(_.visible===!1){c(_);return}if(_.isCSS2DObject){is.setFromMatrixPosition(_.matrixWorld),is.applyMatrix4(kh);const p=is.z>=-1&&is.z<=1&&_.layers.test(g.layers)===!0,R=_.element;R.style.display=p===!0?"":"none",p===!0&&(_.onBeforeRender(e,M,g),R.style.transform="translate("+-100*_.center.x+"%,"+-100*_.center.y+"%)translate("+(is.x*r+r)+"px,"+(-is.y*o+o)+"px)",R.parentNode!==a&&a.appendChild(R),_.onAfterRender(e,M,g));const T={distanceToCameraSquared:d(g,_)};l.objects.set(_,T)}for(let p=0,R=_.children.length;p<R;p++)h(_.children[p],M,g)}function d(_,M){return Hh.setFromMatrixPosition(_.matrixWorld),Gh.setFromMatrixPosition(M.matrixWorld),Hh.distanceToSquared(Gh)}function f(_){const M=[];return _.traverseVisible(function(g){g.isCSS2DObject&&M.push(g)}),M}function m(_){const M=f(_).sort(function(p,R){if(p.renderOrder!==R.renderOrder)return R.renderOrder-p.renderOrder;const T=l.objects.get(p).distanceToCameraSquared,b=l.objects.get(R).distanceToCameraSquared;return T-b}),g=M.length;for(let p=0,R=M.length;p<R;p++)M[p].element.style.zIndex=g-p}}}function Vh(n,t=!1){const e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},l=n[0].morphTargetsRelative,a=new Xe;let c=0;for(let h=0;h<n.length;++h){const d=n[h];let f=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const m in d.attributes){if(!i.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;r[m]===void 0&&(r[m]=[]),r[m].push(d.attributes[m]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(l!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const m in d.morphAttributes){if(!s.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[m]===void 0&&(o[m]=[]),o[m].push(d.morphAttributes[m])}if(t){let m;if(e)m=d.index.count;else if(d.attributes.position!==void 0)m=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;a.addGroup(c,m,h),c+=m}}if(e){let h=0;const d=[];for(let f=0;f<n.length;++f){const m=n[f].index;for(let _=0;_<m.count;++_)d.push(m.getX(_)+h);h+=n[f].attributes.position.count}a.setIndex(d)}for(const h in r){const d=Wh(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;a.setAttribute(h,d)}for(const h in o){const d=o[h][0].length;if(d===0)break;a.morphAttributes=a.morphAttributes||{},a.morphAttributes[h]=[];for(let f=0;f<d;++f){const m=[];for(let M=0;M<o[h].length;++M)m.push(o[h][M][f]);const _=Wh(m);if(!_)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;a.morphAttributes[h].push(_)}}return a}function Wh(n){let t,e,i,s=-1,r=0;for(let c=0;c<n.length;++c){const h=n[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const o=new t(r),l=new sn(o,e,i);let a=0;for(let c=0;c<n.length;++c){const h=n[c];if(h.isInterleavedBufferAttribute){const d=a/e;for(let f=0,m=h.count;f<m;f++)for(let _=0;_<e;_++){const M=h.getComponent(f,_);l.setComponent(f+d,_,M)}}else o.set(h.array,a);a+=h.count*e}return s!==void 0&&(l.gpuType=s),l}const Yn=.2,Ls=2.1,y0=1.1,Is="#e2001a";function ol(n,t){const e=n.map(s=>(t?new rn(s.w,t,s.d):new Xn(s.w,s.d).rotateX(-Math.PI/2)).translate(s.x+s.w/2,0,s.z+s.d/2));if(!e.length)return new Xn(0,0);if(e.length===1)return e[0];const i=Vh(e);return e.forEach(s=>s.dispose()),i}const $h=n=>new Ka(n.map(([t,e])=>new ft(t,-e)));function Us(n,t){return new tl($h(n),{depth:t,bevelEnabled:!1}).rotateX(-Math.PI/2)}function Xh(n,t){let e=n;for(const i of t)e=e.flatMap(s=>au(s,i));return e}function qh(n,t){if(!n.length)return new Xn(0,0);const e=n.map(s=>t?Us(s,t):new el($h(s)).rotateX(-Math.PI/2));if(e.length===1)return e[0];const i=Vh(e);return e.forEach(s=>s.dispose()),i}function b0(n,t){const{x:e,z:i,w:s,d:r}=cs(n,t).opening;return[[e,i],[e+s,i],[e+s,i+r],[e,i+r]].map(o=>jn(n,o))}function E0(n){const t=new hn,[e,i]=Si(n);t.position.set(e,0,i),t.rotation.y=-vs.degToRad(me(n));const s=new hn;return s.position.set(-e,0,-i),t.add(s),{frame:t,inner:s}}const w0=n=>n<.5?4*n*n*n:1-Math.pow(-2*n+2,3)/2;class T0{constructor(t,e={}){this.container=t,this.options={wallMode:"full",explode:0,labels:!0,background:"#eef1f5",onRoomClick:null,onTankClick:null,onPrinterClick:null,...e},this.building=null,this.focusFloorId=null,this.selectedRoomId=null,this.hoverRoomId=null,this.selectedTankId=null,this.hoverTankId=null,this.selectedPrinterId=null,this.hoverPrinterId=null,this.rooms=new Map,this.tanks=new Map,this.printers=new Map,this.floors=new Map,this.selectionObj=null,this.anim=null,this.hasFitted=!1;const i=t.clientWidth||1,s=t.clientHeight||1,r=this.renderer=new __({antialias:!0});r.setPixelRatio(Math.min(window.devicePixelRatio,2)),r.setSize(i,s),r.shadowMap.enabled=!0,r.shadowMap.type=Fl,t.appendChild(r.domElement),this.labelRenderer=new S0,this.labelRenderer.setSize(i,s),this.labelRenderer.domElement.className="label-layer",t.appendChild(this.labelRenderer.domElement),this.scene=new x_,this.scene.background=new ie(this.options.background),this.camera=new Ke(45,i/s,.1,2e3),this.camera.position.set(30,28,38);const o=this.controls=new l0(this.camera,r.domElement);o.enableDamping=!0,o.dampingFactor=.08,o.maxPolarAngle=Math.PI*.48,o.minDistance=3,o.maxDistance=400,o.addEventListener("start",()=>this.anim=null),this.scene.add(new t0(16777215,11121599,1.5));const l=this.sun=new i0(16777215,2.2);l.castShadow=!0,l.shadow.mapSize.set(2048,2048),l.shadow.bias=-4e-4,l.shadow.normalBias=.03,this.scene.add(l,l.target),this.ground=new ge(new Xn(1e3,1e3),new Ph({color:14672873,roughness:1,opacity:.55})),this.ground.rotation.x=-Math.PI/2,this.ground.position.y=-Yn-.01,this.ground.receiveShadow=!0,this.scene.add(this.ground),this.grid=new r0(300,300,13225943,14015200),this.grid.position.y=-Yn-.005,this.scene.add(this.grid),this.buildingGroup=new hn,this.scene.add(this.buildingGroup),this.raycaster=new s0,this.bindPointer(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(t),this.tick=this.tick.bind(this),this.raf=requestAnimationFrame(this.tick)}setBuilding(t){this.building=t,this.clear();const e=ao(t);let i=-t.floors.slice(0,e).reduce((s,r)=>s+r.height,0);t.floors.forEach((s,r)=>{const o=t.floors[r-1],l={hasFloorAbove:r<t.floors.length-1,openings:o?o.rooms.filter(c=>c.type==="stairs").map(c=>b0(c,o.height)):[]},a=this.buildFloor(s,l);a.userData.elevation=i,a.userData.index=r-e,this.floors.set(s.id,a),this.buildingGroup.add(a),i+=s.height}),this.layoutFloors(),this.applyFocus(),this.applyHighlight(),this.hasFitted||(this.fitAll(!1),this.hasFitted=!0)}setFocusFloor(t){this.focusFloorId=t,this.applyFocus(),this.applyHighlight()}setSelectedRoom(t){this.selectedRoomId=t,this.applyHighlight()}setSelectedPrinter(t){this.selectedPrinterId=t,this.applyHighlight()}setSelectedTank(t){this.selectedTankId=t,this.applyHighlight()}setWallMode(t){this.options.wallMode=t,this.building&&this.setBuilding(this.building)}setExplode(t){this.options.explode=t,this.layoutFloors()}setLabels(t){this.options.labels=t,this.applyFocus()}focusRoom(t){const e=this.rooms.get(t);if(!e)return;const i=this.floors.get(e.floorId),s=e.room,r=new F(s.x+s.width/2,i.position.y+.5,s.z+s.depth/2),o=this.camera.position.clone().sub(this.controls.target).normalize();o.y=Math.max(o.y,.75),o.normalize();const l=Math.max(s.width,s.depth)*1.5+8;this.flyTo(r.clone().addScaledVector(o,l),r)}fitAll(t=!0){var a;const e=new ai;for(const c of this.floors.values()){const{state:h,bounds:d,height:f}=c.userData;!d||h==="hidden"||h==="ghost"&&this.focusFloorId||(e.expandByPoint(new F(d.minX,c.position.y,d.minZ)),e.expandByPoint(new F(d.maxX,c.position.y+f,d.maxZ)))}if(e.isEmpty()){const c=((a=this.floors.get(this.focusFloorId))==null?void 0:a.position.y)??0;e.set(new F(-5,c,-5),new F(5,c+3,5))}const i=e.getCenter(new F),s=e.getSize(new F).length()/2,r=vs.degToRad(this.camera.fov/2),o=s/Math.sin(r)*Math.max(.85,.85/this.camera.aspect),l=new F(.45,.8,1).normalize();this.flyTo(i.clone().addScaledVector(l,o),i,t)}dispose(){cancelAnimationFrame(this.raf),this.resizeObserver.disconnect(),this.controls.dispose(),this.clear(),this.ground.geometry.dispose(),this.ground.material.dispose(),this.grid.geometry.dispose(),this.grid.material.dispose(),this.renderer.dispose(),this.renderer.domElement.remove(),this.labelRenderer.domElement.remove()}buildFloor(t,{hasFloorAbove:e=!1,openings:i=[]}={}){const s=new hn,r=[],o=g=>{const p=new Ph(g);return r.push(p),p},l=[],a=lo(t),c=this.options.wallMode==="low",h=t.height-Yn,d=c?Math.min(y0,h):h,f=[];if(a){const[p,R,T,b]=[a.minX-.15,a.minZ-.15,a.maxX+.15,a.maxZ+.15],k=[[p,R],[T,R],[T,b],[p,b]],P=new ge(qh(Xh([k],i),Yn),o({color:13883615,roughness:.9}));P.position.y=-Yn,P.receiveShadow=!0,P.castShadow=!0,s.add(P);const L=document.createElement("div");L.className="floor-tag",L.textContent=t.name;const O=new jr(L);O.position.set(a.minX-.4,0,a.maxZ+.4),s.add(O),l.push(O)}for(const g of t.rooms){const p=new ge(qh(Xh($s(g),i),0),o({color:Gs(g),roughness:.85}));p.position.y=.01,p.receiveShadow=!0,p.userData={roomId:g.id,floorId:t.id},s.add(p);const R=document.createElement("div");R.className="room-label"+(g.type==="corridor"?" is-corridor":""),R.innerHTML=`<span class="rl-name">${ee(g.name)}</span>`+(g.occupant?`<span class="rl-sub">${ee(g.occupant)}</span>`:"");const T=new jr(R),[b,k]=ul(g);if(T.position.set(b,1.2,k),s.add(T),l.push(T),this.rooms.set(g.id,{mesh:p,label:T,floorId:t.id,room:g}),g.type==="stairs"){const{frame:P,inner:L}=E0(g);s.add(P),e&&f.push(...this.buildStairs(L,g,t,o,d)),this.buildElevator(L,g,t,o,d)}for(const P of g.tanks){const[L,O]=hs(g,P),C=new ge(new rn(Kn,.03,Kn),o({color:7305090,roughness:.35,metalness:.6}));C.position.set(L,.025,O),C.rotation.y=-vs.degToRad(me(g)),C.castShadow=!0,C.userData={tankId:P.id,roomId:g.id,floorId:t.id},s.add(C);const w=document.createElement("button");w.type="button",w.className="tank-label",w.title=`${P.name} – ${P.ports.length} Ports`,w.innerHTML=`<span class="tl-icon"></span>${ee(P.name)}<span class="tl-count">${P.ports.length}</span>`,w.addEventListener("click",Y=>{var V,X;Y.stopPropagation(),(X=(V=this.options).onTankClick)==null||X.call(V,P.id,g.id,t.id)});const U=new jr(w);U.position.set(L,.35,O),s.add(U),l.push(U),this.tanks.set(P.id,{mesh:C,label:U,floorId:t.id,roomId:g.id})}for(const P of g.printers){const[L,O]=hs(g,P),C=.42,w=new hn;w.position.set(L,0,O),w.rotation.y=-vs.degToRad(me(g));const U=new ge(new rn(Jn*.9,C,us*.9),o({color:15330544,roughness:.6}));U.position.set(0,C/2,0),U.castShadow=!0,U.receiveShadow=!0,U.userData={printerId:P.id,roomId:g.id,floorId:t.id};const Y=new ge(new rn(Jn*.9,.06,us*.9),o({color:3883858,roughness:.5}));Y.position.set(0,C+.03,0),Y.castShadow=!0;const V=new ge(new rn(Jn*.6,.02,.12),o({color:16777215,roughness:.9}));V.position.set(0,C*.55,us*.45+.05),w.add(U,Y,V),s.add(w);const X=document.createElement("button");X.type="button",X.className="printer-label",X.title=`${P.name}${P.ip?` – ${P.ip}`:""}`,X.innerHTML=`<span class="pl-icon"></span>${ee(P.name)}`,X.addEventListener("click",W=>{var K,H;W.stopPropagation(),(H=(K=this.options).onPrinterClick)==null||H.call(K,P.id,g.id,t.id)});const et=new jr(X);et.position.set(L,.85,O),s.add(et),l.push(et),this.printers.set(P.id,{mesh:U,label:et,floorId:t.id,roomId:g.id})}}const m=o({color:16514041,roughness:.7});let _=null,M=null;for(const g of hu(t.rooms,t.openings??[],t.walls??[])){if(g.len<.01)continue;if(g.kind==="glass"||g.kind==="transom"){const T=g.kind==="transom"?Math.min(Ls,d):0;if(d-T<.02)continue;_??(_=o({color:10274784,roughness:.05,metalness:.1,transparent:!0,opacity:.32,depthWrite:!1})),M??(M=o({color:5989747,roughness:.5,metalness:.4}));const b=Math.min(.05,(d-T)/4),k=new ge(Us(g.quad,d-T-b*2),_);k.position.y=T+b,s.add(k);for(const P of[T,d-b]){const L=new ge(Us(g.quad,b),M);L.position.y=P,L.castShadow=!0,s.add(L)}continue}if(g.kind==="lintel"&&(c||d<=Ls+.05))continue;const p=g.kind==="wall"?d:d-Ls,R=new ge(Us(g.quad,p),m);R.position.y=g.kind==="wall"?0:Ls,R.castShadow=!0,R.receiveShadow=!0,s.add(R)}return s.userData={floorId:t.id,mats:r,labels:l,bounds:a,stairTops:f,height:t.height,state:"full"},s}buildStairs(t,e,i,s,r){const{steps:o,landings:l}=cs(e,i.height),a=[s({color:12896720,roughness:.8}),s({color:12107462,roughness:.8})],c=[],h=(d,f)=>{const m=new ge(new rn(d.w,d.top,d.d),f);m.position.set(d.x+d.w/2,d.top/2+.01,d.z+d.d/2),m.castShadow=!0,m.receiveShadow=!0,t.add(m),d.top>r+.01&&c.push(m)};return o.forEach((d,f)=>h(d,a[f%2])),l.forEach(d=>h(d,a[0])),c}buildElevator(t,e,i,s,r){const o=cs(e,i.height).elevator;if(!o)return;const l=new ge(ol(o.walls,r),s({color:14278114,roughness:.8})),a=Math.min(Ls,r),c=new ge(ol([o.door],a),s({color:10134445,roughness:.3,metalness:.7}));l.position.y=r/2,c.position.y=a/2;for(const h of[l,c])h.castShadow=!0,h.receiveShadow=!0,t.add(h);if(r>a+.01){const h=new ge(ol([o.door],r-a),l.material);h.position.y=a+(r-a)/2,t.add(h)}}clear(){this.clearSelection();for(const t of this.floors.values())t.traverse(e=>{var i;e.isCSS2DObject&&e.element.remove(),(i=e.geometry)==null||i.dispose()}),t.userData.mats.forEach(e=>e.dispose()),this.buildingGroup.remove(t);this.floors.clear(),this.rooms.clear(),this.tanks.clear(),this.printers.clear()}layoutFloors(){for(const t of this.floors.values())t.position.y=t.userData.elevation+t.userData.index*this.options.explode;this.fitShadow(),this.applyGround()}applyFocus(){if(!this.building)return;const t=this.building.floors,e=this.focusFloorId?t.findIndex(i=>i.id===this.focusFloorId):-1;t.forEach((i,s)=>{var l;const r=this.floors.get(i.id);if(!r)return;let o="full";e>=0&&(o=s===e?"full":s<e?"ghost":"hidden"),r.userData.state=o,r.visible=o!=="hidden";for(const a of r.userData.mats){const c=o==="ghost";(l=a.userData).base??(l.base={opacity:a.opacity,transparent:a.transparent,depthWrite:a.depthWrite});const h=a.userData.base,d=c||h.transparent;a.transparent!==d&&(a.needsUpdate=!0),a.transparent=d,a.opacity=c?Math.min(.14,h.opacity):h.opacity,a.depthWrite=!c&&h.depthWrite}for(const a of r.userData.labels)a.visible=o==="full"&&this.options.labels}),this.applyGround(),t.forEach((i,s)=>{var o;const r=t[s+1]&&this.floors.get(t[s+1].id);for(const l of((o=this.floors.get(i.id))==null?void 0:o.userData.stairTops)??[])l.visible=!!(r!=null&&r.visible)})}applyGround(){if(!this.building)return;const t=this.building.floors.map(l=>this.floors.get(l.id)).filter(Boolean),e=t.find(l=>l.userData.floorId===this.focusFloorId),i=e&&e.userData.index<0,s=i?e.position.y-Yn-.01:-Yn-.01,r=!i&&t.some(l=>l.userData.index<0&&l.visible);this.ground.position.y=s,this.grid.position.y=s+.005;const o=this.ground.material;o.transparent!==r&&(o.needsUpdate=!0),o.transparent=r,o.depthWrite=!r}applyHighlight(){for(const[t,e]of this.rooms){const i=e.mesh.material;t===this.selectedRoomId?(i.emissive.set(Is),i.emissiveIntensity=.25):t===this.hoverRoomId?(i.emissive.set(16777215),i.emissiveIntensity=.2):i.emissive.set(0),e.label.element.classList.toggle("is-selected",t===this.selectedRoomId)}for(const[t,e]of this.tanks){const i=e.mesh.material,s=t===this.selectedTankId;s?(i.emissive.set(Is),i.emissiveIntensity=.8):t===this.hoverTankId?(i.emissive.set(16777215),i.emissiveIntensity=.35):i.emissive.set(0),e.label.element.classList.toggle("is-selected",s)}for(const[t,e]of this.printers){const i=e.mesh.material,s=t===this.selectedPrinterId;s?(i.emissive.set(Is),i.emissiveIntensity=.45):t===this.hoverPrinterId?(i.emissive.set(16777215),i.emissiveIntensity=.25):i.emissive.set(0),e.label.element.classList.toggle("is-selected",s)}this.updateSelection()}updateSelection(){this.clearSelection();const t=this.rooms.get(this.selectedRoomId);if(!t)return;const e=this.floors.get(t.floorId);if(e.userData.state!=="full")return;const i=t.room,s=e.userData.height-Yn,r=Us(mn(i),s),o=new ge(r,new Ra({color:Is,transparent:!0,opacity:.1,depthWrite:!1})),l=new gh(new I_(r),new Ga({color:Is})),a=new hn;a.add(o,l),a.position.y=.02,e.add(a),this.selectionObj=a}clearSelection(){this.selectionObj&&(this.selectionObj.traverse(t=>{var e,i;(e=t.geometry)==null||e.dispose(),(i=t.material)==null||i.dispose()}),this.selectionObj.removeFromParent(),this.selectionObj=null)}fitShadow(){const t=new ai;for(const r of this.floors.values()){const o=r.userData.bounds;o&&(t.expandByPoint(new F(o.minX,r.position.y,o.minZ)),t.expandByPoint(new F(o.maxX,r.position.y+r.userData.height,o.maxZ)))}if(t.isEmpty())return;const e=t.getCenter(new F),i=Math.max(10,t.getSize(new F).length()/2);this.sun.position.copy(e).add(new F(i*.7,i*1.6,i*.5)),this.sun.target.position.copy(e);const s=this.sun.shadow.camera;s.left=s.bottom=-i*1.3,s.right=s.top=i*1.3,s.near=.5,s.far=i*5,s.updateProjectionMatrix()}bindPointer(){const t=this.renderer.domElement;let e=null;t.addEventListener("pointerdown",i=>e={x:i.clientX,y:i.clientY}),t.addEventListener("pointerup",i=>{var o,l,a,c,h,d;if(!e||i.button!==0)return;const s=Math.hypot(i.clientX-e.x,i.clientY-e.y);if(e=null,s>5)return;const r=this.pick(i);r!=null&&r.tankId?(l=(o=this.options).onTankClick)==null||l.call(o,r.tankId,r.roomId,r.floorId):r!=null&&r.printerId?(c=(a=this.options).onPrinterClick)==null||c.call(a,r.printerId,r.roomId,r.floorId):(d=(h=this.options).onRoomClick)==null||d.call(h,(r==null?void 0:r.roomId)??null,(r==null?void 0:r.floorId)??null)}),t.addEventListener("pointermove",i=>{if(i.buttons)return;const s=this.pick(i),r=(s==null?void 0:s.tankId)??null,o=(s==null?void 0:s.printerId)??null,l=r||o?null:(s==null?void 0:s.roomId)??null;t.style.cursor=s?"pointer":"",(l!==this.hoverRoomId||r!==this.hoverTankId||o!==this.hoverPrinterId)&&(this.hoverRoomId=l,this.hoverTankId=r,this.hoverPrinterId=o,this.applyHighlight())}),t.addEventListener("pointerleave",()=>{(this.hoverRoomId||this.hoverTankId||this.hoverPrinterId)&&(this.hoverRoomId=null,this.hoverTankId=null,this.hoverPrinterId=null,this.applyHighlight())})}pick(t){const e=this.renderer.domElement.getBoundingClientRect(),i=new ft((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1);this.raycaster.setFromCamera(i,this.camera);const s=h=>{var d;return((d=this.floors.get(h.floorId))==null?void 0:d.userData.state)==="full"},r=[...[...this.tanks.values()].filter(s).map(h=>({mesh:h.mesh,size:Kn})),...[...this.printers.values()].filter(s).map(h=>({mesh:h.mesh,size:Jn}))],o=this.raycaster.ray;let l=null;for(const{mesh:h,size:d}of r){const f=h.getWorldPosition(new F),m=o.distanceToPoint(f),_=Math.max(d*.7,o.origin.distanceTo(f)*.012);m<_&&(!l||m<l.dist)&&(l={dist:m,mesh:h})}if(l)return l.mesh.userData;const a=[...this.rooms.values()].filter(s).map(h=>h.mesh),c=this.raycaster.intersectObjects(a,!1)[0];return c?c.object.userData:null}flyTo(t,e,i=!0){if(!i){this.camera.position.copy(t),this.controls.target.copy(e),this.anim=null;return}this.anim={p0:this.camera.position.clone(),p1:t,t0:this.controls.target.clone(),t1:e,start:performance.now(),duration:750}}resize(){const t=this.container.clientWidth,e=this.container.clientHeight;!t||!e||(this.renderer.setSize(t,e),this.labelRenderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix())}tick(){if(this.raf=requestAnimationFrame(this.tick),this.anim){const t=Math.min(1,(performance.now()-this.anim.start)/this.anim.duration),e=w0(t);this.camera.position.lerpVectors(this.anim.p0,this.anim.p1,e),this.controls.target.lerpVectors(this.anim.t0,this.anim.t1,e),t>=1&&(this.anim=null)}this.controls.update(),this.renderer.render(this.scene,this.camera),this.labelRenderer.render(this.scene,this.camera)}}const ss=1,A0=["nw","n","ne","e","se","s","sw","w"],Rn=.1,al=96,R0=2400,P0=.15;function C0(n){var Qr;n.innerHTML=`
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
    </div>`;const t=x=>n.querySelector(x),e=t("#e-plan"),i=t("#e-plan-wrap"),s=t("#e-plan-bg"),r=t("#e-plan-fg"),o=t("#e-plan-underlay");let l=null;const a={floorId:vt.building.groundFloorId??((Qr=vt.building.floors[0])==null?void 0:Qr.id),selectedRoomId:null,selectedTankId:null,selectedPrinterId:null,selectedOpeningId:null,selectedWallId:null,tool:"select",snap:.5,tankModal:!1},c={cx:15,cz:6,scale:30};let h=null,d=null,f=null,m=null,_=null,M=null,g={id:null,time:0};const p=new T0(t("#e-3d"),{background:"#f2f4f7",onRoomClick:(x,u)=>{x&&u===a.floorId&&gt(x)},onTankClick:(x,u,v)=>{v===a.floorId&&(gt(u,x),Ht())},onPrinterClick:(x,u,v)=>{v===a.floorId&&gt(u,null,x)}}),R=()=>vt.building.floors,T=()=>R().find(x=>x.id===a.floorId)??R()[0],b=()=>{var x;return((x=T())==null?void 0:x.rooms.find(u=>u.id===a.selectedRoomId))??null},k=()=>{var x;return((x=b())==null?void 0:x.tanks.find(u=>u.id===a.selectedTankId))??null},P=(x,u)=>{var v;return(v=x.floors.find(S=>S.id===a.floorId))==null?void 0:v.rooms.find(S=>S.id===u)},L=x=>{var u;return(u=P(x,a.selectedRoomId))==null?void 0:u.tanks.find(v=>v.id===a.selectedTankId)},O=()=>{var x;return((x=b())==null?void 0:x.printers.find(u=>u.id===a.selectedPrinterId))??null},C=x=>{var u;return(u=P(x,a.selectedRoomId))==null?void 0:u.printers.find(v=>v.id===a.selectedPrinterId)},w=()=>{var x;return((x=T())==null?void 0:x.openings)??[]},U=()=>w().find(x=>x.id===a.selectedOpeningId)??null,Y=x=>{var u,v;return(v=(u=x.floors.find(S=>S.id===a.floorId))==null?void 0:u.openings)==null?void 0:v.find(S=>S.id===a.selectedOpeningId)},V=()=>{var x;return((x=T())==null?void 0:x.walls)??[]},X=()=>V().find(x=>x.id===a.selectedWallId)??null,et=x=>{var u,v;return(v=(u=x.floors.find(S=>S.id===a.floorId))==null?void 0:u.walls)==null?void 0:v.find(S=>S.id===a.selectedWallId)},W=x=>Nu(T().rooms,[x.x,x.z],Math.max(.25,14/c.scale),V()),K=(x,u,v=a.snap)=>u?Math.round(x*100)/100:Math.round(x/v)*v,H=x=>Math.round(x*100)/100;function ct(x,u,v=null,S=!1){let y=[K(x.x,u),K(x.z,u)];if(!u){const A=10/c.scale,N=[...T().rooms.flatMap($=>mn($)),...V().flatMap($=>[[$.x1,$.z1],[$.x2,$.z2]])];let z=A;for(const $ of N){const q=Math.hypot($[0]-x.x,$[1]-x.z);q<z&&(z=q,y=[le($[0]),le($[1])])}}return v&&S&&(Math.abs(y[0]-v[0])>=Math.abs(y[1]-v[1])?y[1]=v[1]:y[0]=v[0]),y}function Mt(x){const u=e.getBoundingClientRect();return{x:c.cx+(x.clientX-u.left-u.width/2)/c.scale,z:c.cz+(x.clientY-u.top-u.height/2)/c.scale}}function It(x){const u=T().rooms.filter(v=>su(v,[x.x,x.z]));return u.find(v=>v.type!=="corridor")??u[0]??null}function Xt(){const x=T();let u=x&&lo(x);if(!u){const A=R().map(lo).filter(Boolean);u=A.length?{minX:Math.min(...A.map(N=>N.minX)),minZ:Math.min(...A.map(N=>N.minZ)),maxX:Math.max(...A.map(N=>N.maxX)),maxZ:Math.max(...A.map(N=>N.maxZ))}:{minX:0,minZ:0,maxX:20,maxZ:12}}const v=e.clientWidth||600,S=e.clientHeight||400,y=3;c.scale=fn(Math.min(v/(u.maxX-u.minX+y*2),S/(u.maxZ-u.minZ+y*2)),4,200),c.cx=(u.minX+u.maxX)/2,c.cz=(u.minZ+u.maxZ)/2}function oe(x,u,v){const S=e.getBoundingClientRect(),y=(u??S.left+S.width/2)-S.left-S.width/2,A=(v??S.top+S.height/2)-S.top-S.height/2,N=c.cx+y/c.scale,z=c.cz+A/c.scale;c.scale=fn(c.scale*x,4,300),c.cx=N-y/c.scale,c.cz=z-A/c.scale,Pt()}function tt(x,u){const[v,S]=yi([-x.width/2,-x.depth/2],[0,0],me(x));x.x=le(u[0]-v-x.width/2),x.z=le(u[1]-S-x.depth/2)}const pt=x=>{const u=me(x);if(!u)return"";const[v,S]=Si(x);return`transform="rotate(${u} ${v} ${S})"`};function Ot(x){const u=x.cutCorner==="ne"||x.cutCorner==="se",v=x.cutCorner==="nw"||x.cutCorner==="ne",S=[u?x.x+x.width:x.x,v?x.z:x.z+x.depth],y=[S[0]+(u?-x.cutW:x.cutW),S[1]+(v?x.cutD:-x.cutD)];return{corner:S,point:y,east:u,north:v}}const mt=x=>`${Ge(x,2)} m²`,Bt=x=>x.rooms.reduce((u,v)=>u+ls(v),0);function qt(x){const u=new Set;for(let v=0;v<x.length;v++)for(let S=v+1;S<x.length;S++)ou(x[v],x[S])&&u.add(x[v].id).add(x[S].id);return u}function Pt(){const x=T(),u=e.clientWidth,v=e.clientHeight;if(!x||!u||!v)return;const S=c.scale,y=1/S,A=c.cx-u/2/S,N=c.cz-v/2/S;e.setAttribute("viewBox",`${A} ${N} ${u/S} ${v/S}`);const z=S<10?5:1,$=S<10?25:5,q=[],j=`
      <defs>
        <pattern id="g-minor" width="${z}" height="${z}" patternUnits="userSpaceOnUse">
          <path d="M ${z} 0 L 0 0 0 ${z}" fill="none" stroke="#e4e8ee" stroke-width="${y}"/>
        </pattern>
        <pattern id="g-major" width="${$}" height="${$}" patternUnits="userSpaceOnUse">
          <path d="M ${$} 0 L 0 0 0 ${$}" fill="none" stroke="#cdd3dc" stroke-width="${y}"/>
        </pattern>
      </defs>
      <rect x="${A}" y="${N}" width="${u/S}" height="${v/S}" fill="url(#g-minor)"/>
      <rect x="${A}" y="${N}" width="${u/S}" height="${v/S}" fill="url(#g-major)"/>
      <path d="M ${A} 0 H ${A+u/S} M 0 ${N} V ${N+v/S}" stroke="#aeb7c3" stroke-width="${y}"/>`,ht=R().indexOf(x),st=R()[ht-1];if(st)for(const at of st.rooms)q.push(`<polygon class="ref-room" points="${mn(at).join(" ")}"
            stroke-width="${y}" stroke-dasharray="${4*y} ${3*y}"/>`);const Ut=ht<R().length-1,Gt=qt(x.rooms),Kt=[...x.rooms].sort((at,Ft)=>(at.type==="corridor"?-1:0)-(Ft.type==="corridor"?-1:0));for(const at of Kt){const Ft=at.id===a.selectedRoomId,Zt=at.width*S>44&&at.depth*S>26,[wt,ne]=pn(at)==="rect"?jn(at,[at.x+at.width/2,at.z+(me(at)?at.depth/2-7*y:16*y)]):ul(at).map((xe,ve)=>xe-(ve?7*y:0));q.push(`
        <g class="room${Ft?" selected":""}${Gt.has(at.id)?" overlap":""}" data-room="${at.id}">
          <polygon class="room-shape" points="${mn(at).join(" ")}"
            fill="${Gs(at)}" fill-opacity="${at.type==="corridor"?.35:.55}"
            stroke-width="${(Ft?2.5:1.25)*y}" stroke-linejoin="round"/>
          ${at.type==="stairs"?`<g ${pt(at)}>${Ut?rt(at,x.height,y):""}${Q(at,x.height,y)}</g>`:""}
          ${Zt?`<text x="${wt}" y="${ne}" font-size="${13*y}" class="room-name">${ee(at.name)}</text>
                 <text x="${wt}" y="${ne+15*y}" font-size="${11*y}" class="room-area">${mt(ls(at))}</text>`:""}
        </g>`)}for(const at of V())q.push(it(at,y));_&&q.push(it({..._,id:""},y,!0));const pe=[...w()].sort((at,Ft)=>(at.type==="glass"?0:1)-(Ft.type==="glass"?0:1));for(const at of pe)q.push(se(at,x,y));m&&q.push(se({...m,id:"",type:"glass"},x,y,!0));const $t=Math.max(Kn,12*y),At=S>18;for(const at of x.rooms)for(const Ft of at.tanks){const[Zt,wt]=hs(at,Ft),ne=Ft.id===a.selectedTankId,xe=me(at)?`transform="rotate(${me(at)} ${Zt} ${wt})"`:"";q.push(`
          <g class="tank${ne?" selected":""}" data-tank="${Ft.id}" data-tank-room="${at.id}">
            <rect x="${Zt-$t/2}" y="${wt-$t/2}" width="${$t}" height="${$t}" rx="${2*y}"
              stroke-width="${(ne?2:1.25)*y}" ${xe}/>
            <path d="M ${Zt-$t/4} ${wt} H ${Zt+$t/4} M ${Zt} ${wt-$t/4} V ${wt+$t/4}" stroke-width="${1.25*y}" ${xe}/>
            ${At?`<text x="${Zt}" y="${wt+$t/2+9*y}" font-size="${10*y}">${ee(Ft.name)} · ${Ft.ports.length}</text>`:""}
          </g>`)}const Se=Math.max(Jn,16*y),xt=Math.max(us,13*y);for(const at of x.rooms)for(const Ft of at.printers){const[Zt,wt]=hs(at,Ft),ne=Ft.id===a.selectedPrinterId,xe=me(at)?`transform="rotate(${me(at)} ${Zt} ${wt})"`:"";q.push(`
          <g class="printer${ne?" selected":""}" data-printer="${Ft.id}" data-printer-room="${at.id}">
            <rect x="${Zt-Se/2}" y="${wt-xt/2}" width="${Se}" height="${xt}" rx="${3*y}"
              stroke-width="${(ne?2:1.25)*y}" ${xe}/>
            <rect class="paper" x="${Zt-Se*.28}" y="${wt-xt*.18}" width="${Se*.56}" height="${xt*.36}" ${xe}/>
            ${At?`<text x="${Zt}" y="${wt+xt/2+9*y}" font-size="${10*y}">${ee(Ft.name)}</text>`:""}
          </g>`)}const ot=b();if(ot&&!a.selectedTankId&&!a.selectedPrinterId&&a.tool==="select"){const at=9*y,Ft={nw:[ot.x,ot.z],n:[ot.x+ot.width/2,ot.z],ne:[ot.x+ot.width,ot.z],e:[ot.x+ot.width,ot.z+ot.depth/2],se:[ot.x+ot.width,ot.z+ot.depth],s:[ot.x+ot.width/2,ot.z+ot.depth],sw:[ot.x,ot.z+ot.depth],w:[ot.x,ot.z+ot.depth/2]},Zt=ot.x+ot.width/2,wt=ot.z-26*y;q.push(`<g ${pt(ot)}>
        <path class="rot-guide" d="M ${Zt} ${ot.z} V ${wt}" stroke-width="${y}"/>
        <circle class="handle handle-rot" data-handle="rotate" cx="${Zt}" cy="${wt}" r="${5.5*y}" stroke-width="${1.5*y}">
          <title>Drehen (Raster 15°, Alt = frei)</title></circle>
        <text class="dim" x="${ot.x+ot.width/2}" y="${ot.z-10*y}" font-size="${11*y}">${Ge(ot.width,2)} m</text>
        <text class="dim" x="${ot.x-10*y}" y="${ot.z+ot.depth/2}" font-size="${11*y}"
          transform="rotate(-90 ${ot.x-10*y} ${ot.z+ot.depth/2})">${Ge(ot.depth,2)} m</text>`);for(const ne of A0){const[xe,ve]=Ft[ne];q.push(`<rect class="handle h-${ne}" data-handle="${ne}" x="${xe-at/2}" y="${ve-at/2}"
            width="${at}" height="${at}" stroke-width="${1.5*y}"/>`)}if(pn(ot)!=="rect"){const{corner:ne,point:xe}=Ot(ot),[ve,ze]=xe,dn=pn(ot)==="chamfer"?`<path class="cut-guide" d="M ${ve} ${ne[1]} L ${ve} ${ze} L ${ne[0]} ${ze}"
                stroke-width="${y}" stroke-dasharray="${4*y} ${3*y}"/>`:"";q.push(`
          ${dn}
          <path class="handle handle-cut" data-handle="cut"
            d="M ${ve} ${ze-at*.75} L ${ve+at*.75} ${ze} L ${ve} ${ze+at*.75} L ${ve-at*.75} ${ze} Z"
            stroke-width="${1.5*y}"/>`)}me(ot)&&q.push(`<text class="dim" x="${Zt}" y="${wt-13*y}" font-size="${11*y}">${Ge(me(ot),1)}°</text>`),q.push("</g>")}if(d){const{x:at,z:Ft,width:Zt,depth:wt}=d;q.push(`
        <rect class="draft" x="${at}" y="${Ft}" width="${Zt}" height="${wt}"
          stroke-width="${2*y}" stroke-dasharray="${6*y} ${4*y}"/>
        <text class="dim" x="${at+Zt/2}" y="${Ft+wt/2}" font-size="${12*y}">
          ${Ge(Zt,2)} × ${Ge(wt,2)} m</text>`)}if(f){const[at,Ft]=f.a,[Zt,wt]=f.b??f.hover;q.push(`
        <g class="calib">
          <path d="M ${at} ${Ft} L ${Zt} ${wt}" stroke-width="${2*y}"/>
          <circle cx="${at}" cy="${Ft}" r="${4*y}" stroke-width="${1.5*y}"/>
          <circle cx="${Zt}" cy="${wt}" r="${4*y}" stroke-width="${1.5*y}"/>
          <text class="dim" x="${(at+Zt)/2}" y="${(Ft+wt)/2-12*y}" font-size="${12*y}">${Ge(Math.hypot(Zt-at,wt-Ft),2)} m</text>
        </g>`)}s.innerHTML=j,r.innerHTML=q.join(""),D(x),i.dataset.tool=a.tool}function se(x,u,v,S=!1){const y=x.id&&x.id===a.selectedOpeningId,A=!S&&!ir(x,u),N=`M ${x.x1} ${x.z1} L ${x.x2} ${x.z2}`;let z;if(x.type==="door"){const q=ps(x),[j,ht]=nr(x),st=x.swing&2?-1:1,Ut=x.swing&1,[Gt,Kt]=Ut?[x.x2,x.z2]:[x.x1,x.z1],[pe,$t]=Ut?[x.x1,x.z1]:[x.x2,x.z2],At=Gt-ht*st*q,Se=Kt+j*st*q,xt=(At-Gt)*($t-Kt)-(Se-Kt)*(pe-Gt);z=`
        <path class="op-gap" d="${N}" stroke-width="${5*v}"/>
        <path class="op-leaf" d="M ${Gt} ${Kt} L ${At} ${Se}" stroke-width="${2*v}"/>
        <path class="op-swing" d="M ${At} ${Se} A ${q} ${q} 0 0 ${xt>0?1:0} ${pe} ${$t}"
          stroke-width="${v}" stroke-dasharray="${3*v} ${2*v}"/>`}else z=`
        <path class="op-gap" d="${N}" stroke-width="${5*v}"/>
        <path class="op-glass" d="${N}" stroke-width="${3.5*v}"/>`;const $=y?[["a",x.x1,x.z1],["b",x.x2,x.z2]].map(([q,j,ht])=>`<circle class="handle op-handle" data-ohandle="${q}" cx="${j}" cy="${ht}" r="${4.5*v}" stroke-width="${1.5*v}"/>`).join(""):"";return`
      <g class="opening op-${x.type}${y?" selected":""}${A?" detached":""}${S?" draft-op":""}"
        ${x.id?`data-opening="${x.id}"`:""}>
        ${z}
        <path class="op-hit" d="${N}" stroke-width="${14*v}"/>
        ${$}
      </g>`}function it(x,u,v=!1){const S=x.id&&x.id===a.selectedWallId,y=`M ${x.x1} ${x.z1} L ${x.x2} ${x.z2}`,A=S?[["a",x.x1,x.z1],["b",x.x2,x.z2]].map(([$,q,j])=>`<circle class="handle fw-handle" data-whandle="${$}" cx="${q}" cy="${j}" r="${4.5*u}" stroke-width="${1.5*u}"/>`).join(""):"",N=oo(x),z=S||v?`<text class="dim" x="${(x.x1+x.x2)/2}" y="${(x.z1+x.z2)/2-12*u}" font-size="${11*u}">${Ge(N,2)} m</text>`:"";return`
      <g class="fwall${S?" selected":""}${v?" draft-op":""}" ${x.id?`data-wall="${x.id}"`:""}>
        <path class="fw-body" d="${y}" stroke-width="${Math.max(Dn,3*u)}"/>
        <path class="fw-hit" d="${y}" stroke-width="${14*u}"/>
        ${A}
        ${z}
      </g>`}function dt(x){const u=bl(x);vt.mutate(v=>{const S=v.floors.find(y=>y.id===a.floorId);(S.walls??(S.walls=[])).push(u)}),I(u.id)}function I(x){a.selectedWallId=x,a.selectedOpeningId=null,a.selectedRoomId=null,a.selectedTankId=null,a.selectedPrinterId=null,p.setSelectedRoom(null),p.setSelectedTank(null),p.setSelectedPrinter(null),Pt(),bt(),B()}const zt=(x,u)=>(x.openings??[]).filter(v=>mo(v,u));function lt(x,u){const v=W(x);if(!v)return;const S=Math.min(Uu,v.len),y=K(v.t,u,Rn),A=fn(y-S/2,0,v.len-S),[N,z]=Ei(v,A),[$,q]=Ei(v,A+S);Ct({type:"door",x1:le(N),z1:le(z),x2:le($),z2:le(q)})}function Ct(x){const u=Ul(x);vt.mutate(v=>{const S=v.floors.find(y=>y.id===a.floorId);(S.openings??(S.openings=[])).push(u)}),_t(u.id)}function _t(x){a.selectedOpeningId=x,a.selectedWallId=null,a.selectedRoomId=null,a.selectedTankId=null,a.selectedPrinterId=null,p.setSelectedRoom(null),p.setSelectedTank(null),p.setSelectedPrinter(null),Pt(),bt(),B()}const kt=(x,u)=>(x.openings??[]).filter(v=>po(v,u));function Rt(x,u,v,S){var y;for(const A of u){const N=(y=x.openings)==null?void 0:y.find(ht=>ht.id===A.id);if(!N)continue;const[z,$]=yi([A.x1,A.z1],v,S),[q,j]=yi([A.x2,A.z2],v,S);Object.assign(N,{x1:le(z),z1:le($),x2:le(q),z2:le(j)})}}function D(x){const u=x.underlay;o.style.display=u!=null&&u.visible?"":"none",u!=null&&u.visible&&(l!==u.src&&(o.setAttribute("href",u.src),l=u.src),o.setAttribute("x",u.x),o.setAttribute("y",u.z),o.setAttribute("width",u.width),o.setAttribute("height",u.width*u.ratio),o.setAttribute("opacity",u.opacity))}async function E(x){const u=URL.createObjectURL(x);try{const v=new Image;v.src=u,await v.decode();const S=v.naturalWidth||1600,y=v.naturalHeight||1200,A=Math.min(1,R0/Math.max(S,y)),N=document.createElement("canvas");N.width=Math.max(1,Math.round(S*A)),N.height=Math.max(1,Math.round(y*A));const z=N.getContext("2d");z.fillStyle="#fff",z.fillRect(0,0,N.width,N.height),z.drawImage(v,0,0,N.width,N.height);let $=N.toDataURL("image/webp",.7);return $.startsWith("data:image/webp")||($=N.toDataURL("image/jpeg",.75)),{src:$,ratio:N.height/N.width}}finally{URL.revokeObjectURL(u)}}async function G(x){let u;try{u=await E(x)}catch{alert("Das Bild konnte nicht gelesen werden. Unterstützt werden Bilddateien wie PNG, JPG, WebP oder SVG – PDF-Pläne bitte vorher als Bild exportieren.");return}const v=T().underlay;let S=v&&{x:v.x,z:v.z,width:v.width};if(!S){const y=(e.clientWidth||600)/c.scale,A=(e.clientHeight||400)/c.scale,N=H(.8*Math.min(y,A/u.ratio));S={x:H(c.cx-N/2),z:H(c.cz-N*u.ratio/2),width:N}}vt.mutate(y=>{y.floors.find(A=>A.id===a.floorId).underlay={...u,...S,opacity:(v==null?void 0:v.opacity)??P0,visible:!0}})}function J(){const[x,u]=f.a,[v,S]=f.b,y=Math.hypot(v-x,S-u);Pt();const A=y>.05?prompt(`Wie lang ist diese Strecke in Wirklichkeit (in m)?
Im Moment: ${Ge(y,2)} m`,Ge(y,2)):null;f=null;const N=parseFloat(String(A??"").replace(",","."));if(!(N>0))return Pt();const z=N/y,$=q=>Math.round(q*1e3)/1e3;vt.mutate(q=>{const j=q.floors.find(ht=>ht.id===a.floorId).underlay;j.x=$(x-(x-j.x)*z),j.z=$(u-(u-j.z)*z),j.width=$(j.width*z)}),Yt("select")}function rt(x,u,v){const{steps:S,landings:y,path:A}=cs(x,u),N=[...S,...y].map(At=>`<rect x="${At.x}" y="${At.z}" width="${At.w}" height="${At.d}"/>`).join(""),[z,$]=A.at(-1),[q,j]=A.at(-2),ht=Math.hypot(z-q,$-j)||1,[st,Ut]=[(z-q)/ht,($-j)/ht],Gt=Math.min(.35,ht/2),Kt=`M ${z-st*Gt-Ut*Gt*.6} ${$-Ut*Gt+st*Gt*.6} L ${z} ${$}
      L ${z-st*Gt+Ut*Gt*.6} ${$-Ut*Gt-st*Gt*.6}`,[pe,$t]=A[0];return`
      <g class="stair" stroke-width="${v}">
        ${N}
        <circle cx="${pe}" cy="${$t}" r="${Math.max(.08,3*v)}"/>
        <path class="stair-arrow" d="M ${A.map(At=>At.join(" ")).join(" L ")} ${Kt}" stroke-width="${1.5*v}"/>
      </g>`}function Q(x,u,v){const S=cs(x,u).elevator;if(!S)return"";const{x:y,z:A,w:N,d:z}=S.shaft,$=S.walls.map(j=>`<rect x="${j.x}" y="${j.z}" width="${j.w}" height="${j.d}"/>`).join(""),q=S.door;return`
      <g class="lift" stroke-width="${v}">
        <rect class="lift-shaft" x="${y}" y="${A}" width="${N}" height="${z}"/>
        <path class="lift-cross" d="M ${y} ${A} L ${y+N} ${A+z} M ${y+N} ${A} L ${y} ${A+z}"/>
        <g class="lift-walls">${$}</g>
        <rect class="lift-door" x="${q.x}" y="${q.z}" width="${q.w}" height="${q.d}"/>
        ${N*c.scale>40?`<text x="${y+N/2}" y="${A+z/2}" font-size="${10*v}">Aufzug</text>`:""}
      </g>`}function Nt(){t("#e-floor").innerHTML=[...R()].reverse().map(u=>`<option value="${u.id}" ${u.id===a.floorId?"selected":""}>${ee(u.name)}</option>`).join("");const x=R().findIndex(u=>u.id===a.floorId);n.querySelector('[data-act="floor-del"]').disabled=R().length<=1,n.querySelector('[data-act="floor-up"]').disabled=x>=R().length-1,n.querySelector('[data-act="floor-down"]').disabled=x<=0,n.querySelector('[data-act="undo"]').disabled=!vt.canUndo,n.querySelector('[data-act="redo"]').disabled=!vt.canRedo,n.querySelectorAll("[data-tool]").forEach(u=>u.classList.toggle("active",u.dataset.tool===a.tool)),t("#e-help").textContent={draw:"Raum zeichnen: Rechteck mit gedrückter Maustaste aufziehen · Esc zum Beenden",stairs:"Treppenhaus zeichnen: Rechteck aufziehen · Form und Laufrichtung rechts einstellen · Esc zum Beenden",tank:"Bodentank setzen: in einen Raum klicken · Esc zum Beenden",door:"Tür setzen: auf eine Wand klicken (auch zwischen zwei Räumen) · Alt = ohne Raster · Esc zum Beenden",glass:"Glaswand: an einer Wand entlang ziehen (Klick = 2 m) · Alt = ohne Raster · Esc zum Beenden",wall:"Wand: von Punkt zu Punkt ziehen · fängt Raumecken und Wandenden · Shift = waagerecht/senkrecht · Alt = ohne Raster · Esc zum Beenden",printer:"Drucker setzen: in einen Raum oder Flur klicken · Esc zum Beenden",calibrate:"Maßstab setzen: Anfang und Ende einer bekannten Strecke im Hintergrundbild anklicken, dann die echte Länge eingeben · Esc zum Beenden",underlay:"Hintergrundbild verschieben: im Grundriss ziehen · Esc zum Beenden",select:"Klicken = auswählen · Ziehen = verschieben · Griffe = Größe ändern · Kreis = drehen · Raute = Aussparung/Schräge · Doppelklick auf Bodentank = Ports bearbeiten · P = Drucker setzen · Alt = ohne Raster"}[a.tool]}function yt(x){const u=x.ports.filter(v=>Kh(v)).length;return`
      <section class="panel panel-tank">
        <h2 class="panel-title">Bodentank</h2>
        <div class="tank-summary">
          <span class="tank-icon-lg"></span>
          <div>
            <div class="tank-summary-name">${ee(x.name)}</div>
            <div class="muted">${x.ports.length} Ports · ${u} am Switch</div>
          </div>
        </div>
        <button class="btn btn-block btn-primary" data-act="tank-edit">Ports bearbeiten …</button>
        <div class="btn-row">
          <button class="btn sm" data-act="tank-dup">Duplizieren</button>
          <button class="btn sm danger" data-act="tank-del">Löschen</button>
        </div>
        <span class="hint-text">Tipp: Doppelklick auf den Tank oder Enter öffnet den Editor.</span>
      </section>`}function Dt(x,u){const v=Object.entries(Il).map(([S,y])=>`<button class="btn sm${x.type===S?" active":""}" data-act="opening-type" data-type="${S}">${ee(y)}</button>`).join("");return`
      <section class="panel">
        <h2 class="panel-title">${ee(Il[x.type])}</h2>
        <div class="field"><span>Art</span><div class="seg seg-fill">${v}</div></div>
        <label class="field"><span>Breite (m)</span>
          <input class="input" type="number" step="0.1" min="${ds}" data-bind="opening:width" value="${H(ps(x))}">
        </label>
        ${x.type==="door"?'<button class="btn sm" data-act="opening-swing" title="Anschlag und Öffnungsrichtung wechseln">Aufschlag drehen</button>':""}
        ${ir(x,u)?'<span class="hint-text">Ziehen = entlang der Wand verschieben · Enden ziehen = Breite ändern</span>':'<span class="field-warn">Liegt auf keiner Wand und wird in 3D nicht dargestellt. Auf eine Wand ziehen oder löschen.</span>'}
        <div class="btn-row">
          <button class="btn sm danger" data-act="opening-del">Löschen</button>
        </div>
      </section>`}function te(x){return`
      <section class="panel">
        <h2 class="panel-title">Wand</h2>
        <label class="field"><span>Länge (m)</span>
          <input class="input" type="number" step="0.1" min="${Zs}" data-bind="wall:length" value="${H(oo(x))}">
        </label>
        <span class="hint-text">Ziehen = verschieben · Enden ziehen = Länge und Richtung ändern · Türen und Glaswände lassen sich daraufsetzen</span>
        <div class="btn-row">
          <button class="btn sm" data-act="wall-dup">Duplizieren</button>
          <button class="btn sm danger" data-act="wall-del">Löschen</button>
        </div>
      </section>`}function ut(x){const u=x.ip&&!wl(x.ip);return`
      <section class="panel panel-printer">
        <h2 class="panel-title">Drucker</h2>
        <label class="field"><span>Name</span><input class="input" data-bind="printer:name" value="${ee(x.name)}"></label>
        <label class="field"><span>IP-Adresse</span>
          <input class="input mono" data-bind="printer:ip" value="${ee(x.ip)}" placeholder="z. B. 192.168.10.50" inputmode="decimal" spellcheck="false">
        </label>
        <span class="field-warn" data-out="ip-warn" ${u?"":"hidden"}>Das ist keine gültige IPv4-Adresse.</span>
        <div class="btn-row">
          <button class="btn sm" data-act="printer-dup">Duplizieren</button>
          <button class="btn sm danger" data-act="printer-del">Löschen</button>
        </div>
      </section>`}function Lt(){var $,q,j,ht;const x=t("#e-modal"),u=a.tankModal&&k();if(!u){a.tankModal=!1,x.hidden=!0,x.innerHTML="";return}const v=b(),S=rs(($=u.ports[0])==null?void 0:$.name)??{panel:1,port:1},y=((q=u.ports.find(st=>st.switch))==null?void 0:q.switch)??"",A=new Set;for(const st of R())for(const Ut of st.rooms)for(const Gt of Ut.tanks)for(const Kt of Gt.ports)Kt.switch&&A.add(Kt.switch);const N=((j=x.querySelector(".port-table-wrap"))==null?void 0:j.scrollTop)??0;x.hidden=!1,x.innerHTML=`
      <div class="modal modal-wide" role="dialog" aria-modal="true" aria-labelledby="e-modal-title">
        <div class="modal-head">
          <span class="tank-icon-lg"></span>
          <div>
            <div class="modal-title" id="e-modal-title">Bodentank bearbeiten</div>
            <div class="modal-sub">${ee(v.name)} · ${ee(T().name)}</div>
          </div>
          <button class="icon-btn" data-act="modal-close" title="Schließen (Esc)">✕</button>
        </div>
        <div class="modal-body">
          <div class="modal-fields">
            <label class="field"><span>Name</span><input class="input" data-bind="tank:name" value="${ee(u.name)}"></label>
            <label class="field"><span>Anzahl Ports</span>
              <input class="input" type="number" min="0" max="${al}" step="1" data-bind="tank:count" value="${u.ports.length}">
            </label>
          </div>

          <div class="bulk-tools">
            <div class="bulk-tool">
              <span class="bulk-title">Patchfeld-Ports fortlaufend benennen</span>
              <div class="bulk-row">
                <span class="prefix">ab P</span>
                <input class="input" type="number" min="1" step="1" id="e-start-panel" value="${S.panel}" title="Patchfeld">
                <span class="prefix">/</span>
                <input class="input" type="number" min="1" max="24" step="1" id="e-start-port" value="${S.port}" title="Port (1–24)">
                <button class="btn sm" data-act="ports-renumber">Übernehmen</button>
              </div>
              <span class="hint-text">Nach Port 24 geht es mit dem nächsten Patchfeld weiter.</span>
            </div>
            <div class="bulk-tool">
              <span class="bulk-title">Switch fortlaufend zuweisen</span>
              <div class="bulk-row">
                <input class="input input-switch" id="e-bulk-switch" list="e-switches" placeholder="Switch, z. B. Switch P1" value="${ee(y)}">
                <span class="prefix">ab Port</span>
                <input class="input" id="e-bulk-switch-port" value="${ee(((ht=u.ports.find(st=>st.switchPort))==null?void 0:ht.switchPort)??"1")}" title="Erster Switch-Port">
                <button class="btn sm" data-act="switch-assign">Übernehmen</button>
              </div>
              <span class="hint-text">Weist allen Ports der Reihe nach Switch-Ports zu. Einzelne Ports kannst du unten ändern.</span>
            </div>
          </div>

          <div class="port-table-wrap">
            ${u.ports.length?`<table class="port-table">
                <thead>
                  <tr><th>#</th><th>Patchfeld-Port</th><th>Switch</th><th>Switch-Port</th><th></th></tr>
                </thead>
                <tbody>
                  ${u.ports.map((st,Ut)=>`
                  <tr>
                    <td class="pt-idx">${Ut+1}</td>
                    <td><input class="input sm" data-bind="port:${Ut}:name" value="${ee(st.name)}" placeholder="P01/01"></td>
                    <td><input class="input sm" data-bind="port:${Ut}:switch" list="e-switches" value="${ee(st.switch)}" placeholder="—"></td>
                    <td><input class="input sm pt-swport" data-bind="port:${Ut}:switchPort" value="${ee(st.switchPort)}" placeholder="—"></td>
                    <td><button class="icon-btn sm" data-act="port-del" data-index="${Ut}" title="Port entfernen">✕</button></td>
                  </tr>`).join("")}
                </tbody>
              </table>`:'<div class="empty">Keine Ports. Lege über „Anzahl Ports“ oder „+ Port“ welche an.</div>'}
          </div>
          <datalist id="e-switches">${[...A].map(st=>`<option value="${ee(st)}">`).join("")}</datalist>
        </div>
        <div class="modal-foot">
          <button class="btn sm" data-act="port-add">+ Port</button>
          <button class="btn sm" data-act="tank-dup">Tank duplizieren</button>
          <button class="btn sm danger" data-act="tank-del">Tank löschen</button>
          <button class="btn btn-primary" data-act="modal-close">Fertig</button>
        </div>
      </div>`;const z=x.querySelector(".port-table-wrap");z&&(z.scrollTop=N)}function Ht(){var x;k()&&(a.tankModal=!0,Lt(),(x=t('#e-modal [data-bind="tank:name"]'))==null||x.focus())}function Wt(){a.tankModal=!1,Lt()}function bt(){const x=b(),u=k(),v=O(),S=T(),y=vt.building,A=Object.entries(Hs).map(([z,$])=>`<option value="${z}" ${(x==null?void 0:x.type)===z?"selected":""}>${ee($.label)}</option>`).join(""),N=x?`
      <section class="panel">
        <h2 class="panel-title">Raum</h2>
        <label class="field"><span>Name</span><input class="input" data-bind="room:name" value="${ee(x.name)}"></label>
        <label class="field"><span>Typ</span><select class="input" data-bind="room:type">${A}</select></label>
        <div class="field">
          <span>Farbe</span>
          <div class="color-row">
            <input type="color" data-bind="room:color" value="${Gs(x)}">
            ${x.color?'<button class="btn sm" data-act="color-reset">Typfarbe</button>':'<span class="muted">Typfarbe</span>'}
          </div>
        </div>
        ${x.type!=="stairs"?de(x):""}
        ${x.type==="stairs"?`<label class="field"><span>Treppenform</span><select class="input" data-bind="room:stairShape">${Object.entries(_l).map(([z,$])=>`<option value="${z}" ${x.stairShape===z?"selected":""}>${ee($)}</option>`).join("")}</select></label>
        <div class="field">
          <span>Laufrichtung (aufwärts)</span>
          <div class="color-row">
            <select class="input" data-bind="room:stairDir">${Object.entries(xl).map(([z,$])=>`<option value="${z}" ${x.stairDir===z?"selected":""}>${ee($)}</option>`).join("")}</select>
            <button class="btn sm" data-act="stairs-rotate" title="Um 90° drehen">↻</button>
          </div>
          ${R().indexOf(S)===R().length-1?'<span class="hint-text">Oberste Etage: Hier führt keine Treppe weiter nach oben.</span>':""}
        </div>
        <label class="check"><input type="checkbox" data-bind="room:elevator" ${x.elevator?"checked":""}> Aufzug in der Mitte</label>
        ${x.elevator?jt(x):""}`:""}
        <label class="field"><span>Nutzer / Team</span><input class="input" data-bind="room:occupant" value="${ee(x.occupant)}" placeholder="z. B. Team Vertrieb"></label>
        <label class="field"><span>Beschreibung</span><textarea class="input" rows="2" data-bind="room:description">${ee(x.description)}</textarea></label>
        <div class="field-grid">
          <label class="field"><span>X (m)</span><input class="input" type="number" step="0.1" data-bind="room:x" value="${H(x.x)}"></label>
          <label class="field"><span>Z (m)</span><input class="input" type="number" step="0.1" data-bind="room:z" value="${H(x.z)}"></label>
          <label class="field"><span>Breite (m)</span><input class="input" type="number" step="0.1" min="0.5" data-bind="room:width" value="${H(x.width)}"></label>
          <label class="field"><span>Tiefe (m)</span><input class="input" type="number" step="0.1" min="0.5" data-bind="room:depth" value="${H(x.depth)}"></label>
        </div>
        <div class="field">
          <span>Drehung (°)</span>
          <div class="color-row">
            <input class="input" type="number" step="1" data-bind="room:rotation" value="${me(x)}">
            <button class="btn sm" data-act="room-rotate" data-deg="-15" title="15° gegen den Uhrzeigersinn">↺</button>
            <button class="btn sm" data-act="room-rotate" data-deg="15" title="15° im Uhrzeigersinn">↻</button>
          </div>
          <span class="hint-text">Auch am Kreis-Griff über dem Raum (Raster 15°, Alt = frei). X/Z ist die linke obere Ecke vor dem Drehen.</span>
        </div>
        <div class="area-row"><span>Fläche</span><strong data-out="room-area">${mt(ls(x))}</strong></div>
        <div class="field">
          <span>Bodentanks</span>
          <div class="tank-list">
            ${x.tanks.length?x.tanks.map(z=>`<button class="tank-chip ${z.id===a.selectedTankId?"active":""}" data-act="tank-edit" data-tank="${z.id}" title="Ports bearbeiten">
                        <span class="tl-icon"></span>${ee(z.name)}<span class="tc-count">${z.ports.length} Ports</span>
                      </button>`).join(""):'<span class="muted">Keine Bodentanks.</span>'}
          </div>
          <button class="btn sm" data-act="tank-add">+ Bodentank</button>
        </div>
        <div class="field">
          <span>Drucker</span>
          <div class="tank-list">
            ${x.printers.length?x.printers.map(z=>`<button class="tank-chip ${z.id===a.selectedPrinterId?"active":""}" data-act="printer-select" data-printer="${z.id}">
                        <span class="pl-icon"></span>${ee(z.name)}<span class="tc-count mono">${ee(z.ip||"–")}</span>
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
      ${U()?Dt(U(),S):""}
      ${X()?te(X()):""}
      ${u?yt(u):""}
      ${v?ut(v):""}
      ${N}
      <section class="panel">
        <h2 class="panel-title">Etage</h2>
        <label class="field"><span>Name</span><input class="input" data-bind="floor:name" value="${ee(S.name)}"></label>
        <label class="field"><span>Geschosshöhe (m)</span><input class="input" type="number" step="0.1" min="2" max="10" data-bind="floor:height" value="${S.height}"></label>
        <div class="area-row"><span>Fläche aller Räume</span><strong data-out="floor-area">${mt(Bt(S))}</strong></div>
        ${re(S)}
        ${S.id===y.groundFloorId?'<span class="hint-text">Erdgeschoss (Geländehöhe). Etagen darunter sind Untergeschosse.</span>':'<button class="btn sm" data-act="floor-ground" title="Diese Etage liegt auf Geländehöhe; alle darunter werden Untergeschosse">Als Erdgeschoss festlegen</button>'}
      </section>
      <section class="panel">
        <h2 class="panel-title">Gebäude</h2>
        <label class="field"><span>Name</span><input class="input" data-bind="building:name" value="${ee(y.name)}"></label>
      </section>`}function re(x){const u=x.underlay;return u?`
        <div class="field underlay-fields">
          <span>Hintergrundbild <span class="muted">· ${Math.round(u.src.length*.75/1024)} kB</span></span>
          <label class="check"><input type="checkbox" data-bind="underlay:visible" ${u.visible?"checked":""}> anzeigen</label>
          <label class="range"><span>Deckkraft</span>
            <input type="range" min="0.05" max="0.6" step="0.05" data-bind="underlay:opacity" value="${u.opacity}">
          </label>
          <div class="field-grid">
            <label class="field"><span>Breite (m)</span><input class="input" type="number" step="0.1" min="0.5" data-bind="underlay:width" value="${H(u.width)}"></label>
            <span></span>
            <label class="field"><span>X (m)</span><input class="input" type="number" step="0.1" data-bind="underlay:x" value="${H(u.x)}"></label>
            <label class="field"><span>Z (m)</span><input class="input" type="number" step="0.1" data-bind="underlay:z" value="${H(u.z)}"></label>
          </div>
          <div class="btn-row">
            <button class="btn sm${a.tool==="calibrate"?" active":""}" data-act="underlay-calibrate" title="Zwei Punkte einer bekannten Strecke anklicken">Maßstab setzen</button>
            <button class="btn sm${a.tool==="underlay"?" active":""}" data-act="underlay-move">Verschieben</button>
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
        </div>`}function jt(x){return x.stairShape==="straight"?'<span class="field-warn">Der Aufzug sitzt im Treppenauge – dafür eine zweiläufige Treppenform wählen.</span>':yl(x)?'<span class="hint-text">Der Schacht steht zwischen den Läufen, die Tür zeigt zum Geschosspodest. Er wird auf jeder Etage gezeichnet.</span>':`<span class="field-warn">Zu schmal für einen Aufzug: quer zur Laufrichtung mindestens ${Ge(Sl+Dn*2,2)} m nötig.</span>`}function de(x){const u=pn(x),S=`<div class="field"><span>Form</span><div class="seg seg-fill">${Object.entries(hl).map(([z,$])=>`<button class="btn sm${u===z?" active":""}" data-act="room-shape" data-shape="${z}">${ee($)}</button>`).join("")}</div></div>`;if(u==="rect")return S;const y=Object.entries(to).map(([z,$])=>`<option value="${z}" ${x.cutCorner===z?"selected":""}>${ee($)}</option>`).join(""),[A,N]=u==="l"?["Aussparung Breite","Aussparung Tiefe"]:["Schräge in X","Schräge in Z"];return`
        ${S}
        <div class="field">
          <span>${u==="l"?"Aussparung an Ecke":"Schräge an Ecke"}</span>
          <div class="color-row">
            <select class="input" data-bind="room:cutCorner">${y}</select>
            <button class="btn sm" data-act="cut-rotate" title="Zur nächsten Ecke (im Uhrzeigersinn)">↻</button>
          </div>
        </div>
        <div class="field-grid">
          <label class="field"><span>${A} (m)</span><input class="input" type="number" step="0.1" min="0.5" data-bind="room:cutW" value="${H(x.cutW)}"></label>
          <label class="field"><span>${N} (m)</span><input class="input" type="number" step="0.1" min="0.5" data-bind="room:cutD" value="${H(x.cutD)}"></label>
        </div>
        <span class="hint-text">Größe auch über den Rauten-Griff im Grundriss änderbar.</span>`}function B(){const x=[...T().rooms].sort((u,v)=>u.name.localeCompare(v.name,"de",{numeric:!0}));t("#e-rooms").innerHTML=x.length?x.map(u=>`
        <button class="room-item ${u.id===a.selectedRoomId?"active":""}" data-room="${u.id}">
          <span class="swatch" style="background:${Gs(u)}"></span>
          <span class="ri-text"><span class="ri-name">${ee(u.name)}</span><span class="ri-sub">${mt(ls(u))}</span></span>
          ${u.printers.length?`<span class="ri-meta" title="Drucker">${u.printers.length} DR</span>`:""}
          ${u.tanks.length?`<span class="ri-meta" title="Bodentanks">${u.tanks.length} BT</span>`:""}
        </button>`).join(""):'<div class="empty">Noch keine Räume.</div>'}function Et(x){h.t1=x;const[u,v]=Ei(h.wall,Math.min(h.t0,x)),[S,y]=Ei(h.wall,Math.max(h.t0,x));m={x1:u,z1:v,x2:S,z2:y},Pt()}function Z(){const x=b(),u=n.querySelector('[data-out="room-area"]');x&&u&&(u.textContent=mt(ls(x)));const v=n.querySelector('[data-out="floor-area"]');v&&(v.textContent=mt(Bt(T())))}function nt(){Nt(),Pt(),bt(),B()}function Tt(){p.setBuilding(vt.building),p.setFocusFloor(a.floorId),p.setSelectedRoom(a.selectedRoomId),p.setSelectedTank(a.selectedTankId),p.setSelectedPrinter(a.selectedPrinterId)}function gt(x,u=null,v=null){a.selectedRoomId===x&&a.selectedTankId===u&&a.selectedPrinterId===v&&!a.selectedOpeningId&&!a.selectedWallId||(a.selectedOpeningId=null,a.selectedWallId=null,a.selectedRoomId=x,a.selectedTankId=x?u:null,a.selectedPrinterId=x?v:null,p.setSelectedRoom(x),p.setSelectedTank(a.selectedTankId),p.setSelectedPrinter(a.selectedPrinterId),Pt(),bt(),B())}function Vt(x,{fit:u=!1}={}){a.floorId=x,a.selectedOpeningId=null,a.selectedWallId=null,a.selectedRoomId=null,a.selectedTankId=null,a.selectedPrinterId=null,p.setFocusFloor(x),p.setSelectedRoom(null),p.setSelectedTank(null),p.setSelectedPrinter(null),p.fitAll(),u&&Xt(),nt()}function Yt(x){const u=[a.tool,x].some(v=>v==="calibrate"||v==="underlay");x!=="calibrate"&&(f=null),m=null,_=null,a.tool=x,Nt(),Pt(),u&&bt()}function be(x){const u=T(),v=Mu({name:`Raum ${u.rooms.length+1}`,...x}),S=!u.rooms.length;vt.mutate(y=>y.floors.find(A=>A.id===u.id).rooms.push(v)),S&&p.fitAll(),gt(v.id)}function ce(){let x=null;for(const u of R())for(const v of u.rooms)for(const S of v.tanks)for(const y of S.ports){const A=rs(y.name);A&&(!x||A.panel*1e3+A.port>x.panel*1e3+x.port)&&(x=A)}return x}function Fe(x,u,v={}){const S=ce(),y=Su({name:yu(x),x:H(u.x),z:H(u.z),ports:ks(S?Bs(S):{panel:1,port:1},4),...v});vt.mutate(A=>{const N=P(A,x.id);N.tanks.push(y),gn(N)}),gt(x.id,y.id)}function qe(x,u,v={}){const S=bu({name:Eu(vt.building),x:H(u.x),z:H(u.z),...v});vt.mutate(y=>{const A=P(y,x.id);A.printers.push(S),gn(A)}),gt(x.id,null,S.id)}function Pn(){if(a.selectedWallId){const u=a.selectedWallId;a.selectedWallId=null,vt.mutate(v=>{const S=v.floors.find(A=>A.id===a.floorId),y=S.walls.find(A=>A.id===u);S.walls=S.walls.filter(A=>A.id!==u),S.openings&&(S.openings=S.openings.filter(A=>!mo(A,y)||ir(A,S)))});return}if(a.selectedOpeningId){const u=a.selectedOpeningId;a.selectedOpeningId=null,vt.mutate(v=>{const S=v.floors.find(y=>y.id===a.floorId);S.openings=S.openings.filter(y=>y.id!==u)});return}if(a.selectedPrinterId){const u=a.selectedPrinterId;a.selectedPrinterId=null,vt.mutate(v=>{const S=P(v,a.selectedRoomId);S.printers=S.printers.filter(y=>y.id!==u)});return}if(a.selectedTankId){const u=a.selectedTankId;a.selectedTankId=null,vt.mutate(v=>{const S=P(v,a.selectedRoomId);S.tanks=S.tanks.filter(y=>y.id!==u)});return}const x=a.selectedRoomId;x&&(a.selectedRoomId=null,vt.mutate(u=>{const v=u.floors.find(y=>y.id===a.floorId),S=v.rooms.find(y=>y.id===x);v.rooms=v.rooms.filter(y=>y.id!==x),v.openings&&(v.openings=v.openings.filter(y=>!po(y,S)||ir(y,v)))}))}function Zn(){const x=X();if(x){const{id:y,...A}=x;dt({...A,x1:x.x1+.5,z1:x.z1+.5,x2:x.x2+.5,z2:x.z2+.5});return}const u=b();if(!u)return;const v=k();if(v){Fe(u,{x:v.x+.6,z:v.z},{ports:v.ports.map(y=>({...y}))});return}const S=O();if(S){qe(u,{x:S.x+.8,z:S.z},{ip:""});return}be(Al(u,{name:`${u.name} (Kopie)`,x:u.x+1,z:u.z+1}))}function Cn(x,u){if(X()){vt.mutate(v=>{const S=et(v),y=v.floors.find(A=>A.id===a.floorId);for(const A of zt(y,S))In(A,x,u);In(S,x,u)});return}b()&&vt.mutate(v=>{const S=L(v)??C(v);if(S){const[A,N]=io(P(v,a.selectedRoomId),[x,u]);S.x=H(S.x+A),S.z=H(S.z+N),gn(P(v,a.selectedRoomId));return}const y=P(v,a.selectedRoomId);for(const A of kt(v.floors.find(N=>N.id===a.floorId),y))In(A,x,u);y.x=H(y.x+x),y.z=H(y.z+u)})}function Ns(){const x=new Blob([JSON.stringify(vt.building,null,2)],{type:"application/json"}),u=document.createElement("a");u.href=URL.createObjectURL(x),u.download=vt.config.standard.split("/").pop(),u.click(),setTimeout(()=>URL.revokeObjectURL(u.href),1e3)}const _i={"floor-add":()=>{var v;const x=R().length-ao(vt.building),u=Ks({name:Js(x),height:((v=T())==null?void 0:v.height)??3});vt.mutate(S=>S.floors.push(u)),Vt(u.id)},"floor-add-below":()=>{var v;const x=-ao(vt.building)-1,u=Ks({name:Js(x),height:((v=T())==null?void 0:v.height)??3});vt.mutate(S=>S.floors.unshift(u)),Vt(u.id)},"underlay-load":()=>t("#e-underlay-file").click(),"underlay-del":()=>{vt.mutate(x=>delete x.floors.find(u=>u.id===a.floorId).underlay),(a.tool==="calibrate"||a.tool==="underlay")&&Yt("select")},"underlay-calibrate":()=>{f=null,Yt(a.tool==="calibrate"?"select":"calibrate")},"underlay-move":()=>Yt(a.tool==="underlay"?"select":"underlay"),"floor-ground":()=>{vt.mutate(x=>x.groundFloorId=a.floorId)},"floor-dup":()=>{var S,y;const x=T(),u=R().indexOf(x),v=Ks({name:`${x.name} (Kopie)`,height:x.height,rooms:x.rooms.map(A=>Al(A)),...x.underlay?{underlay:{...x.underlay}}:{},...(S=x.openings)!=null&&S.length?{openings:x.openings.map(({id:A,...N})=>Ul(N))}:{},...(y=x.walls)!=null&&y.length?{walls:x.walls.map(({id:A,...N})=>bl(N))}:{}});vt.mutate(A=>A.floors.splice(u+1,0,v)),Vt(v.id)},"floor-up":()=>xi(1),"floor-down":()=>xi(-1),"floor-del":()=>{const x=T();if(R().length<=1||!confirm(`Etage „${x.name}“ mit ${x.rooms.length} Räumen löschen?`))return;const u=R().indexOf(x);vt.mutate(v=>{v.floors.splice(u,1),v.groundFloorId===x.id&&(v.groundFloorId=(v.floors[u]??v.floors[u-1]).id)}),Vt(R()[Math.max(0,u-1)].id)},"tool-select":()=>Yt("select"),"tool-draw":()=>Yt("draw"),"tool-stairs":()=>Yt("stairs"),"tool-door":()=>Yt("door"),"tool-glass":()=>Yt("glass"),"tool-wall":()=>Yt("wall"),"wall-dup":Zn,"wall-del":Pn,"room-rotate":x=>Os(me(b())+Number(x.dataset.deg)),"opening-type":x=>{vt.mutate(u=>Y(u).type=x.dataset.type)},"opening-swing":()=>{vt.mutate(x=>{const u=Y(x);u.swing=(u.swing+1)%4})},"opening-del":Pn,"stairs-rotate":()=>{vt.mutate(x=>{const u=P(x,a.selectedRoomId);u.stairDir=uu(u.stairDir)})},"room-shape":x=>{const u=x.dataset.shape;vt.mutate(v=>{const S=P(v,a.selectedRoomId);pn(S)==="rect"&&u!=="rect"&&Object.assign(S,eu(S)),S.shape=u,as(S),gn(S)})},"cut-rotate":()=>{const x=Object.keys(to);vt.mutate(u=>{const v=P(u,a.selectedRoomId);v.cutCorner=x[(x.indexOf(v.cutCorner)+1)%x.length],gn(v)})},"tool-tank":()=>Yt("tank"),"tool-printer":()=>Yt("printer"),"printer-add":()=>{const x=b();x&&qe(x,{x:x.width/2,z:x.depth/2})},"printer-select":x=>gt(a.selectedRoomId,null,x.dataset.printer),"printer-dup":Zn,"printer-del":Pn,"room-add":()=>{be({x:K(c.cx-4/2),z:K(c.cz-4/2),width:4,depth:4})},"room-dup":Zn,"room-del":Pn,"color-reset":()=>{vt.mutate(x=>P(x,a.selectedRoomId).color=null)},"tank-add":()=>{const x=b();x&&Fe(x,{x:x.width/2,z:x.depth/2})},"tank-edit":x=>{x.dataset.tank&&gt(a.selectedRoomId,x.dataset.tank),Ht()},"modal-close":Wt,"switch-assign":()=>{const x=t("#e-bulk-switch").value.trim(),u=t("#e-bulk-switch-port").value.trim()||"1";vt.mutate(v=>{L(v).ports.forEach((S,y)=>{S.switch=x,S.switchPort=jh(u,y)})})},"tank-dup":Zn,"tank-del":Pn,"port-add":()=>{vt.mutate(x=>{const u=L(x);u.ports=cl(u.ports,Math.min(al,u.ports.length+1))})},"port-del":x=>{const u=Number(x.dataset.index);vt.mutate(v=>L(v).ports.splice(u,1))},"ports-renumber":()=>{const x=Math.max(1,parseInt(t("#e-start-panel").value,10)||1),u=fn(parseInt(t("#e-start-port").value,10)||1,1,24);vt.mutate(v=>{const S=L(v),y=ks({panel:x,port:u},S.ports.length);S.ports=S.ports.map((A,N)=>({...A,name:y[N].name}))})},undo:()=>vt.undo(),redo:()=>vt.redo(),export:Ns,import:()=>t("#e-file").click(),standard:async()=>{!vt.matchesStandard&&!confirm("Entwurf verwerfen und den Standard laden? (Rückgängig ist möglich)")||(await vt.discardDraft(),Vt(vt.building.groundFloorId,{fit:!0}))},reset:()=>{confirm("Aktuelles Gebäude durch das Testgebäude ersetzen? (Rückgängig ist möglich)")&&(vt.replace(os()),Vt(vt.building.groundFloorId,{fit:!0}))},"zoom-in":()=>oe(1.25),"zoom-out":()=>oe(.8),"zoom-fit":()=>{Xt(),Pt()}};function Os(x){const u=b();if(!u)return;const v=no(x),S=v-me(u);if(!S)return bt();const y=kt(T(),u).map(A=>({...A}));vt.mutate(A=>{const N=P(A,a.selectedRoomId);N.rotation=v,Rt(A.floors.find(z=>z.id===a.floorId),y,Si(N),S)})}function xi(x){const u=R().findIndex(S=>S.id===a.floorId),v=u+x;v<0||v>=R().length||vt.mutate(S=>{const[y]=S.floors.splice(u,1);S.floors.splice(v,0,y)})}n.addEventListener("click",x=>{var v;const u=x.target.closest("[data-act]");u&&!u.disabled&&((v=_i[u.dataset.act])==null||v.call(_i,u))}),t("#e-floor").addEventListener("change",x=>Vt(x.target.value)),t("#e-snap").addEventListener("change",x=>a.snap=Number(x.target.value)),t("#e-rooms").addEventListener("click",x=>{const u=x.target.closest("[data-room]");u&&gt(u.dataset.room)}),t("#e-underlay-file").addEventListener("change",x=>{const u=x.target.files[0];x.target.value="",u&&G(u)}),t("#e-props").addEventListener("input",x=>{x.target.dataset.bind==="underlay:opacity"&&o.setAttribute("opacity",x.target.value)}),t("#e-file").addEventListener("change",async x=>{const u=x.target.files[0];if(x.target.value="",!!u)try{vt.replace(JSON.parse(await u.text())),Vt(vt.building.groundFloorId,{fit:!0})}catch(v){alert(`Import fehlgeschlagen: ${v.message}`)}});const Fs=x=>u=>{const v=u.target.closest("[data-bind]");if(!v)return;const[S,y,A]=v.dataset.bind.split(":");let N=v.type==="checkbox"?v.checked:v.value;if(S==="port"){M=x,vt.mutate(z=>L(z).ports[Number(y)][A]=N.trim()),M=null;return}if(S==="opening"&&y==="width"){const z=parseFloat(String(N).replace(",","."));if(!(z>=ds))return bt();vt.mutate($=>{const q=Y($),[j,ht]=nr(q),st=(q.x1+q.x2)/2,Ut=(q.z1+q.z2)/2;Object.assign(q,{x1:le(st-j*z/2),z1:le(Ut-ht*z/2),x2:le(st+j*z/2),z2:le(Ut+ht*z/2)})});return}if(S==="wall"&&y==="length"){const z=parseFloat(String(N).replace(",","."));if(!(z>=Zs))return bt();vt.mutate($=>{const q=et($),[j,ht]=nr(q);q.x2=le(q.x1+j*z),q.z2=le(q.z1+ht*z)});return}if(S==="room"&&y==="rotation"){const z=parseFloat(String(N).replace(",","."));return Number.isFinite(z)?Os(z):bt()}if(S==="tank"&&y==="count"){const z=fn(parseInt(N,10)||0,0,al);vt.mutate($=>{const q=L($);q.ports=cl(q.ports,z)});return}if(["x","z","width","depth","height","cutW","cutD","opacity"].includes(y)){if(N=parseFloat(String(N).replace(",",".")),!Number.isFinite(N))return bt();(y==="width"||y==="depth")&&(N=Math.max(.5,N)),y==="height"&&(N=fn(N,2,10)),N=H(N)}if(M=["type","elevator","stairShape"].includes(y)?null:x,S==="printer"&&(N=N.trim()),vt.mutate(z=>{var ht;const $=S==="tank"?L(z):S==="printer"?C(z):S==="room"?P(z,a.selectedRoomId):S==="underlay"?(ht=z.floors.find(st=>st.id===a.floorId))==null?void 0:ht.underlay:S==="floor"?z.floors.find(st=>st.id===a.floorId):z;if(!$)return;if(S==="room"&&(y==="x"||y==="z")){const st=N-$[y],Ut=z.floors.find(Gt=>Gt.id===a.floorId);for(const Gt of kt(Ut,$))In(Gt,y==="x"?st:0,y==="z"?st:0)}const q=S==="room"&&(y==="width"||y==="depth")&&jn($,[$.x,$.z]);$[y]=N,q&&me($)&&tt($,q);const j=P(z,a.selectedRoomId);S==="room"&&["width","depth","cutW","cutD"].includes(y)&&as(j),j&&(S==="tank"||["width","depth","cutW","cutD","cutCorner"].includes(y))&&gn(j)}),M=null,S==="printer"&&y==="ip"){const z=n.querySelector('[data-out="ip-warn"]');z&&(z.hidden=!N||wl(N))}};t("#e-props").addEventListener("change",Fs("props")),t("#e-modal").addEventListener("change",Fs("modal")),t("#e-modal").addEventListener("pointerdown",x=>{x.target===x.currentTarget&&Wt()}),t("#e-modal").addEventListener("keydown",x=>{var y;const u=x.target.closest('[data-bind^="port:"]');if(x.key!=="Enter"||!u)return;x.preventDefault();const[,v,S]=u.dataset.bind.split(":");u.blur(),(y=t(`#e-modal [data-bind="port:${Number(v)+1}:${S}"]`))==null||y.focus()}),e.addEventListener("contextmenu",x=>x.preventDefault()),e.addEventListener("pointerdown",x=>{const u=Mt(x),v=x.target.closest("[data-handle]"),S=x.target.closest("[data-tank]"),y=x.target.closest("[data-printer]"),A=x.target.closest("[data-room]");if(e.setPointerCapture(x.pointerId),x.button===1||x.button===2){h={type:"pan",sx:x.clientX,sy:x.clientY,cx:c.cx,cz:c.cz};return}if(x.button!==0)return;if(a.tool==="calibrate"){if(!f||f.b)f={a:[u.x,u.z],b:null,hover:[u.x,u.z]};else{f.b=[u.x,u.z],J();return}Pt();return}if(a.tool==="underlay"){const j=T().underlay;j&&(h={type:"underlay",start:u,orig:{x:j.x,z:j.z},started:!1});return}if(a.tool==="draw"||a.tool==="stairs"){const j={x:K(u.x,x.altKey),z:K(u.z,x.altKey)};h={type:"draw",start:j},d={x:j.x,z:j.z,width:0,depth:0};return}if(a.tool==="door"){lt(u,x.altKey);return}if(a.tool==="wall"){const[j,ht]=ct(u,x.altKey);h={type:"wall-draw",start:[j,ht]},_={x1:j,z1:ht,x2:j,z2:ht},Pt();return}if(a.tool==="glass"){const j=W(u);if(j){const ht=K(j.t,x.altKey,Rn);h={type:"glass",wall:j,t0:fn(ht,0,j.len)},Et(h.t0)}return}if(a.tool==="tank"||a.tool==="printer"){const j=It(u);if(j){const[ht,st]=Vs(j,[u.x,u.z]),Ut={x:K(ht-j.x,x.altKey,Rn),z:K(st-j.z,x.altKey,Rn)};a.tool==="tank"?Fe(j,Ut):qe(j,Ut)}return}const N=x.target.closest("[data-ohandle]"),z=x.target.closest("[data-opening]");if(N&&U()){h={type:"opening-end",end:N.dataset.ohandle,start:u,orig:{...U()},started:!1};return}if(z){_t(z.dataset.opening),h={type:"opening",start:u,orig:{...U()},started:!1};return}const $=x.target.closest("[data-whandle]");if($&&X()){h={type:"wall-end",end:$.dataset.whandle,start:u,started:!1};return}if(y){gt(y.dataset.printerRoom,null,y.dataset.printer);const j=O();h={type:"printer",start:u,orig:{x:j.x,z:j.z},started:!1};return}if(S){const j=performance.now(),ht=g.id===S.dataset.tank&&j-g.time<400;if(g={id:S.dataset.tank,time:j},gt(S.dataset.tankRoom,S.dataset.tank),ht){h=null,Ht();return}const st=k();h={type:"tank",start:u,orig:{x:st.x,z:st.z},started:!1};return}if(v&&b()&&v.dataset.handle==="rotate"){const j=b();h={type:"rotate",start:u,orig:{rotation:me(j),openings:kt(T(),j).map(ht=>({...ht}))},started:!1};return}if(v&&b()){const j=b();h={type:"resize",handle:v.dataset.handle,start:u,orig:{...j,tanks:j.tanks.map(ht=>({x:ht.x,z:ht.z})),printers:j.printers.map(ht=>({x:ht.x,z:ht.z}))},started:!1};return}const q=x.target.closest("[data-wall]");if(q){I(q.dataset.wall);const j=T(),ht=X(),st=zt(j,ht).map(Ut=>({...Ut}));h={type:"wall",start:u,orig:{...ht,openings:st},started:!1};return}if(A){gt(A.dataset.room);const j=b(),ht=kt(T(),j).map(st=>({...st}));h={type:"move",start:u,orig:{x:j.x,z:j.z,openings:ht},started:!1};return}gt(null),h={type:"pan",sx:x.clientX,sy:x.clientY,cx:c.cx,cz:c.cz}}),e.addEventListener("pointermove",x=>{const u=Mt(x);if(t("#e-coords").textContent=`x ${Ge(u.x,2)} · z ${Ge(u.z,2)} m`,f&&!f.b&&(f.hover=[u.x,u.z],Pt()),!h)return;if(h.type==="pan"){c.cx=h.cx-(x.clientX-h.sx)/c.scale,c.cz=h.cz-(x.clientY-h.sy)/c.scale,Pt();return}if(h.type==="glass"){const{wall:A}=h,N=(u.x-A.p[0])*A.u[0]+(u.z-A.p[1])*A.u[1];Et(fn(K(N,x.altKey,Rn),0,A.len));return}if(h.type==="wall-draw"){const[A,N]=ct(u,x.altKey,h.start,x.shiftKey);_={x1:h.start[0],z1:h.start[1],x2:A,z2:N},Pt();return}if(h.type==="draw"){const A={x:K(u.x,x.altKey),z:K(u.z,x.altKey)};d={x:Math.min(h.start.x,A.x),z:Math.min(h.start.z,A.z),width:H(Math.abs(A.x-h.start.x)),depth:H(Math.abs(A.z-h.start.z))},Pt();return}const v=u.x-h.start.x,S=u.z-h.start.z;if(!h.started){if(Math.hypot(v,S)*c.scale<3)return;h.started=!0,vt.checkpoint()}const y=x.altKey;vt.mutate(A=>{if(h.type==="opening"||h.type==="opening-end"){const xt=Y(A),ot=h.orig,[at,Ft]=nr(ot),Zt=K(v*at+S*Ft,y,Rn);if(h.type==="opening")Object.assign(xt,{x1:ot.x1,z1:ot.z1,x2:ot.x2,z2:ot.z2}),In(xt,at*Zt,Ft*Zt);else if(h.end==="a"){const wt=Math.min(Zt,ps(ot)-ds);xt.x1=le(ot.x1+at*wt),xt.z1=le(ot.z1+Ft*wt)}else{const wt=Math.max(Zt,ds-ps(ot));xt.x2=le(ot.x2+at*wt),xt.z2=le(ot.z2+Ft*wt)}return}if(h.type==="wall"||h.type==="wall-end"){const xt=et(A),ot=A.floors.find(wt=>wt.id===a.floorId);if(h.type==="wall-end"){const wt=h.end==="a"?[xt.x2,xt.z2]:[xt.x1,xt.z1],[ne,xe]=ct(u,y,wt,x.shiftKey);if(Math.hypot(ne-wt[0],xe-wt[1])<Zs)return;h.end==="a"?Object.assign(xt,{x1:ne,z1:xe}):Object.assign(xt,{x2:ne,z2:xe});return}const at=h.orig,Ft=K(v,y),Zt=K(S,y);Object.assign(xt,{x1:at.x1,z1:at.z1,x2:at.x2,z2:at.z2}),In(xt,Ft,Zt);for(const wt of at.openings){const ne=ot.openings.find(xe=>xe.id===wt.id);ne&&(Object.assign(ne,{x1:wt.x1,z1:wt.z1,x2:wt.x2,z2:wt.z2}),In(ne,Ft,Zt))}return}if(h.type==="underlay"){const xt=A.floors.find(ot=>ot.id===a.floorId).underlay;xt.x=H(h.orig.x+v),xt.z=H(h.orig.z+S);return}const N=P(A,a.selectedRoomId);if(!N)return;if(h.type==="tank"||h.type==="printer"){const xt=h.type==="tank"?L(A):C(A),[ot,at]=io(N,[v,S]);xt.x=K(h.orig.x+ot,y,Rn),xt.z=K(h.orig.z+at,y,Rn),gn(N);return}if(h.type==="move"){N.x=H(K(h.orig.x+v,y)),N.z=H(K(h.orig.z+S,y));const xt=A.floors.find(ot=>ot.id===a.floorId);for(const ot of h.orig.openings){const at=xt.openings.find(Ft=>Ft.id===ot.id);at&&(Object.assign(at,{x1:ot.x1,z1:ot.z1,x2:ot.x2,z2:ot.z2}),In(at,N.x-h.orig.x,N.z-h.orig.z))}return}if(h.type==="rotate"){const[xt,ot]=Si(N),at=Math.atan2(u.x-xt,ot-u.z)*180/Math.PI,Ft=no(y?Math.round(at):Math.round(at/15)*15);N.rotation=Ft,Rt(A.floors.find(Zt=>Zt.id===a.floorId),h.orig.openings,[xt,ot],Ft-h.orig.rotation);return}const z=h.orig,$=h.handle;if($==="cut"){const{corner:xt,east:ot,north:at}=Ot(N),[Ft,Zt]=Vs(N,[u.x,u.z]),wt=K(Ft,y),ne=K(Zt,y);N.cutW=H(ot?xt[0]-wt:wt-xt[0]),N.cutD=H(at?ne-xt[1]:xt[1]-ne),as(N),gn(N);return}const q=!!me(z),[j,ht]=io(z,[v,S]),st=(xt,ot,at,Ft)=>q?Ft?xt+ot-K(ot-at,y):xt+K(ot+at,y):K(xt+(Ft?0:ot)+at,y);let[Ut,Gt,Kt,pe]=[z.x,z.z,z.x+z.width,z.z+z.depth];$.includes("w")&&(Ut=Math.min(st(z.x,z.width,j,!0),Kt-ss)),$.includes("e")&&(Kt=Math.max(st(z.x,z.width,j,!1),Ut+ss)),$.includes("n")&&(Gt=Math.min(st(z.z,z.depth,ht,!0),pe-ss)),$.includes("s")&&(pe=Math.max(st(z.z,z.depth,ht,!1),Gt+ss)),N.width=H(Kt-Ut),N.depth=H(pe-Gt);const[$t,At]=jn(z,[(Ut+Kt)/2,(Gt+pe)/2]);N.x=le($t-N.width/2),N.z=le(At-N.depth/2),as(N);const Se=(xt,ot)=>{const[at,Ft]=Vs(N,hs(z,ot));xt.x=H(at-N.x),xt.z=H(Ft-N.z)};N.tanks.forEach((xt,ot)=>Se(xt,z.tanks[ot])),N.printers.forEach((xt,ot)=>Se(xt,z.printers[ot])),gn(N)},{checkpoint:!1})});const vi=()=>{if((h==null?void 0:h.type)==="wall-draw"&&_){const x=_;_=null,h=null,oo(x)>=Zs?dt(x):Pt();return}if((h==null?void 0:h.type)==="glass"&&m){const{wall:x,t0:u}=h;let[v,S]=[u,h.t1??u].sort(($,q)=>$-q);if(S-v<ds){const $=Math.min(2,x.len);v=fn(u-$/2,0,x.len-$),S=v+$}m=null,h=null;const[y,A]=Ei(x,v),[N,z]=Ei(x,S);Ct({type:"glass",x1:le(y),z1:le(A),x2:le(N),z2:le(z)});return}if((h==null?void 0:h.type)==="draw"&&d){const x=d;if(d=null,x.width>=ss&&x.depth>=ss){const u={x:H(x.x),z:H(x.z),width:x.width,depth:x.depth};if(a.tool==="stairs"){const v=T().rooms.filter(S=>S.type==="stairs").length;Object.assign(u,{type:"stairs",name:`Treppenhaus ${v+1}`,stairDir:x.depth>=x.width?"n":"e"})}a.tool="select",be(u),Nt()}Pt()}h=null};e.addEventListener("pointerup",vi),e.addEventListener("pointercancel",vi),e.addEventListener("wheel",x=>{x.preventDefault(),oe(Math.exp(-x.deltaY*.0015),x.clientX,x.clientY)},{passive:!1});const zs=x=>{var S,y,A;if(a.tankModal){x.key==="Escape"&&(x.preventDefault(),Wt());return}if((y=(S=x.target).closest)!=null&&y.call(S,"input, textarea, select"))return;const u=x.ctrlKey||x.metaKey,v=x.key.toLowerCase();if(u&&v==="z"&&!x.shiftKey)vt.undo();else if(u&&(v==="y"||v==="z"&&x.shiftKey))vt.redo();else if(u&&v==="d")Zn();else if(v==="delete"||v==="backspace")Pn();else if(v==="enter"&&a.selectedTankId)Ht();else if(v==="escape")d=null,m=null,_=null,f=null,h=null,Yt("select"),a.selectedOpeningId||a.selectedWallId?gt(null):a.selectedTankId||a.selectedPrinterId?gt(a.selectedRoomId,null):gt(null);else if(v==="r"&&!u)Yt("draw");else if(v==="s"&&!u)Yt("stairs");else if(v==="q"&&!u&&((A=b())==null?void 0:A.type)==="stairs")_i["stairs-rotate"]();else if(v==="t"&&!u)Yt("tank");else if(v==="p"&&!u)Yt("printer");else if(v==="d"&&!u)Yt("door");else if(v==="g"&&!u)Yt("glass");else if(v==="w"&&!u)Yt("wall");else if(v==="v"&&!u)Yt("select");else if(v.startsWith("arrow")&&(a.selectedRoomId||a.selectedWallId)){const N=a.selectedTankId||a.selectedPrinterId?Rn:a.snap,z=x.shiftKey?1:N,$={arrowleft:[-z,0],arrowright:[z,0],arrowup:[0,-z],arrowdown:[0,z]}[v];Cn(...$)}else return;x.preventDefault()};window.addEventListener("keydown",zs);const Kr=vt.subscribe(()=>{R().some(x=>x.id===a.floorId)||(a.floorId=R()[0].id),a.selectedRoomId&&!b()&&(a.selectedRoomId=null),a.selectedTankId&&!k()&&(a.selectedTankId=null),a.selectedPrinterId&&!O()&&(a.selectedPrinterId=null),a.selectedOpeningId&&!U()&&(a.selectedOpeningId=null),a.selectedWallId&&!X()&&(a.selectedWallId=null),Tt(),Nt(),Pt(),B(),M!=="props"?bt():Z(),M!=="modal"&&Lt()}),Jr=new ResizeObserver(()=>Pt());return Jr.observe(i),Tt(),p.fitAll(!1),requestAnimationFrame(()=>{Xt(),nt()}),nt(),{destroy(){Kr(),Jr.disconnect(),window.removeEventListener("keydown",zs),p.dispose()}}}Iu("editor",C0)})();
