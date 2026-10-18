(function(){"use strict";const ka=i=>String(i).padStart(2,"0"),rc=(i="",t={})=>({name:i,switch:"",switchPort:"",...t});function ac(i,t){const e=/^(.*?)(\d+)(\D*)$/.exec(String(i));if(!e)return String(i);const n=String(Number(e[2])+t).padStart(e[2].length,"0");return`${e[1]}${n}${e[3]}`}function oc(i){return!i.switch&&!i.switchPort?"":[i.switch,i.switchPort&&`Port ${i.switchPort}`].filter(Boolean).join(" · ")}const lc=(i,t)=>`P${ka(i)}/${ka(t)}`;function Ii(i){const t=/^\s*P(\d+)\s*\/\s*(\d+)\s*$/i.exec(i??"");return t?{panel:Number(t[1]),port:Number(t[2])}:null}function Ki({panel:i,port:t}){return t>=24?{panel:i+1,port:1}:{panel:i,port:t+1}}function Ji(i,t){const e=[];let n={panel:Math.max(1,i.panel),port:Math.min(Math.max(1,i.port),24)};for(let s=0;s<t;s++)e.push(rc(lc(n.panel,n.port))),n=Ki(n);return e}function Ha(i,t){if(t<=i.length)return i.slice(0,t);const e=[...i].reverse().map(s=>Ii(s.name)).find(Boolean),n=e?Ki(e):{panel:1,port:1};return[...i,...Ji(n,t-i.length)]}function Ui(){const o={name:"Testbüro",floors:[{id:"f-eg",name:"Erdgeschoss",height:3,rooms:[{id:"r-flur",name:"Flur",type:"corridor",x:0,z:5.5,width:30,depth:2.2,color:null,occupant:"",description:"Hauptflur"},{id:"r-101",name:"Büro 101",type:"office",x:1.5,z:0,width:9,depth:5.5,color:null,occupant:"Team Vertrieb",description:"4 Arbeitsplätze"},{id:"r-102",name:"Büro 102",type:"office",x:10.5,z:0,width:9,depth:5.5,color:null,occupant:"Team Marketing",description:"4 Arbeitsplätze"},{id:"r-103",name:"Büro 103",type:"office",x:19.5,z:0,width:9,depth:5.5,color:null,occupant:"Geschäftsleitung",description:"2 Arbeitsplätze"},{id:"r-104",name:"Büro 104",type:"office",x:1.5,z:7.7,width:9,depth:5.5,color:null,occupant:"Team IT",description:"5 Arbeitsplätze"},{id:"r-105",name:"Besprechung 105",type:"meeting",x:10.5,z:7.7,width:9,depth:5.5,color:null,occupant:"",description:"12 Sitzplätze, Beamer"},{id:"r-106",name:"Teeküche 106",type:"kitchen",x:19.5,z:7.7,width:9,depth:5.5,color:null,occupant:"",description:"Kaffee, Kühlschrank, Spülmaschine"}]}]},l={"r-101":[6,6],"r-102":[6,6],"r-103":[6,6],"r-104":[6,6],"r-105":[4,4],"r-106":[2]};let c={panel:1,port:1};for(const d of o.floors[0].rooms){const m=l[d.id]??[];d.tanks=m.map((g,x)=>{const v=Ji(c,g);return c=Ki(Ii(v[v.length-1].name)),{id:`t-${d.id.slice(2)}-${x+1}`,name:`BT ${x+1}`,x:Math.round(d.width*(x+1)/(m.length+1)*100)/100,z:Math.round(d.depth/2*100)/100,ports:v}})}for(const d of o.floors[0].rooms)for(const m of d.tanks)for(const g of m.ports){const{panel:x,port:v}=Ii(g.name);g.switch=`Switch ${Math.ceil(x/2)}`,g.switchPort=String((x-1)%2*24+v)}const h=Object.fromEntries(o.floors[0].rooms.map(d=>[d.id,d]));for(const d of o.floors[0].rooms)d.printers=[];return h["r-flur"].printers.push({id:"p-flur",name:"Drucker Flur",ip:"192.168.10.50",x:15,z:.45}),h["r-102"].printers.push({id:"p-102",name:"Drucker Marketing",ip:"192.168.10.51",x:8.3,z:.5}),o}const Qi={office:{label:"Büro",color:"#7fa8d6"},meeting:{label:"Besprechung",color:"#e5a55f"},corridor:{label:"Flur",color:"#cfc9bf"},kitchen:{label:"Küche",color:"#8fc28a"},wc:{label:"WC",color:"#9fcbd4"},stairs:{label:"Treppenhaus",color:"#aab3bf"},storage:{label:"Lager / Technik",color:"#b7a8cc"},other:{label:"Sonstiges",color:"#d8d2c6"}},ts=i=>{var t;return i.color||((t=Qi[i.type])==null?void 0:t.color)||Qi.other.color},cc={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Vt=i=>String(i??"").replace(/[&<>"']/g,t=>cc[t]),Yn=(i,t=1)=>Number(i).toLocaleString("de-DE",{minimumFractionDigits:t,maximumFractionDigits:t}),Ni=(i,t,e)=>Math.min(e,Math.max(t,i));function Ne(i="id"){var e,n;const t=((n=(e=globalThis.crypto)==null?void 0:e.randomUUID)==null?void 0:n.call(e))??Math.random().toString(36).slice(2)+Date.now().toString(36);return`${i}-${t.slice(0,8)}`}const Tn=.12,wn=.001;function Ga(i){return[{axis:"x",fixed:i.z,a:i.x,b:i.x+i.width,side:-1},{axis:"x",fixed:i.z+i.depth,a:i.x,b:i.x+i.width,side:1},{axis:"z",fixed:i.x,a:i.z,b:i.z+i.depth,side:-1},{axis:"z",fixed:i.x+i.width,a:i.z,b:i.z+i.depth,side:1}]}function Va(i,t){let e=i;for(const[n,s]of t){const r=[];for(const[a,o]of e){if(s<=a+wn||n>=o-wn){r.push([a,o]);continue}n>a+wn&&r.push([a,n]),s<o-wn&&r.push([s,o])}e=r}return e.filter(([n,s])=>s-n>wn)}function hc(i,t=1){const e=[],n=s=>s.type==="corridor";for(const s of i)for(const r of Ga(s)){const a=[];for(const h of i)if(h!==s)for(const d of Ga(h)){if(d.axis!==r.axis||d.side!==-r.side||Math.abs(d.fixed-r.fixed)>wn)continue;const m=Math.max(r.a,d.a),g=Math.min(r.b,d.b);g-m>wn&&a.push({a:m,b:g,corridor:n(h)})}let o=[[r.a,r.b]],l=[];n(s)?o=Va(o,a.map(h=>[h.a,h.b])):(l=a.filter(h=>h.corridor&&h.b-h.a>=t+.3).map(h=>{const d=(h.a+h.b)/2;return[d-t/2,d+t/2]}),o=Va(o,l));const c=r.fixed-r.side*Tn/2;for(const[h,d]of o)e.push({axis:r.axis,pos:c,a:h,b:d,kind:"wall"});for(const[h,d]of l)e.push({axis:r.axis,pos:c,a:h,b:d,kind:"lintel"})}return e}const Wa={"u-left":"Zweiläufig, Antritt links","u-right":"Zweiläufig, Antritt rechts",straight:"Einläufig (gerade)"},Xa={n:"nach oben (Norden)",e:"nach rechts (Osten)",s:"nach unten (Süden)",w:"nach links (Westen)"},Zs=["n","e","s","w"],dc=i=>Zs[(Zs.indexOf(i)+1)%4]??"n",uc=.18,fc=.15,pc=.15;function Ks(i,t){const e=Zs.includes(i.stairDir)?i.stairDir:"n",n=e==="n"||e==="s",s=i.x+Tn,r=i.z+Tn,a=Math.max(.2,i.width-Tn*2),o=Math.max(.2,i.depth-Tn*2),l=n?a:o,c=n?o:a,h=i.stairShape==="u-right",d=(T,M)=>{const H=h?l-T:T;switch(e){case"s":return[s+a-H,r+M];case"n":return[s+H,r+o-M];case"e":return[s+M,r+H];default:return[s+a-M,r+o-H]}},m=(T,M,H,R,P)=>{const[I,b]=d(T,M),[E,D]=d(T+H,M+R);return{x:Math.min(I,E),z:Math.min(b,D),w:Math.abs(E-I),d:Math.abs(D-b),top:P}},g=Math.max(2,Math.round(t/uc)),x=t/g,v=[],_=[];let f,w;if(i.stairShape==="straight"){const T=Math.min(1,c*.2),M=c-T,H=M/g;for(let R=0;R<g;R++)v.push(m(0,R*H,l,H,(R+1)*x));f=[[l/2,pc],[l/2,M+T/2]],w=m(0,0,l,M)}else{const T=Math.max(.3,(l-fc)/2),M=Math.min(Math.max(T,.8),c*.3),H=c-M*2,R=Math.ceil(g/2),P=g-R,I=H/R;for(let $=0;$<R;$++)v.push(m(0,M+$*I,T,I,($+1)*x));const b=R*x;_.push(m(0,c-M,l,M,b));const E=H/P;for(let $=0;$<P;$++)v.push(m(l-T,c-M-($+1)*E,T,E,b+($+1)*x));const D=c-M/2;f=[[T/2,M/2],[T/2,D],[l-T/2,D],[l-T/2,M/2]],w=m(0,M,l,c-M)}return delete w.top,{steps:v,landings:_,opening:w,path:f.map(([T,M])=>d(T,M))}}const es=1e-4;function $a(i,t){const e=i.x+i.w,n=i.z+i.d,s=t.filter(c=>c.x<e-es&&c.x+c.w>i.x+es&&c.z<n-es&&c.z+c.d>i.z+es);if(!s.length)return[i];const r=(c,h,d)=>[...new Set([h,d,...c.filter(m=>m>h&&m<d)])].sort((m,g)=>m-g),a=r(s.flatMap(c=>[c.x,c.x+c.w]),i.x,e),o=r(s.flatMap(c=>[c.z,c.z+c.d]),i.z,n),l=[];for(let c=0;c<o.length-1;c++){let h=null;for(let d=0;d<a.length-1;d++){const m=(a[d]+a[d+1])/2,g=(o[c]+o[c+1])/2;s.some(v=>m>v.x&&m<v.x+v.w&&g>v.z&&g<v.z+v.d)?h=null:h?h.w=a[d+1]-h.x:(h={x:a[d],z:o[c],w:a[d+1]-a[d],d:o[c+1]-o[c]},l.push(h))}}return l}const je=(i,t)=>Number.isFinite(Number(i))?Number(i):t;function mc(i={}){return{id:Ne("r"),name:"Raum",type:"office",x:0,z:0,width:4,depth:4,color:null,occupant:"",description:"",tanks:[],printers:[],stairShape:"u-left",stairDir:"n",...i}}const qn=.4;function gc(i={}){return{id:Ne("t"),name:"BT 1",x:1,z:1,ports:[],...i}}function _c(i){const t=i.tanks.map(e=>{var n;return Number(((n=/(\d+)\s*$/.exec(e.name))==null?void 0:n[1])??0)});return`BT ${Math.max(0,...t)+1}`}const jn=.6,Fi=.5;function xc(i={}){return{id:Ne("p"),name:"Drucker",ip:"",x:1,z:1,...i}}function vc(i){const t=i.floors.flatMap(e=>e.rooms.flatMap(n=>n.printers.map(s=>{var r;return Number(((r=/^Drucker (\d+)$/.exec(s.name))==null?void 0:r[1])??0)})));return`Drucker ${Math.max(0,...t)+1}`}const Ya=i=>/^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/.test(String(i).trim()),ns=(i,t,e)=>Math.round(Math.min(Math.max(i,t),Math.max(t,e-t))*100)/100;function Zn(i){for(const t of i.tanks)t.x=ns(t.x,qn/2,i.width),t.z=ns(t.z,qn/2,i.depth);for(const t of i.printers)t.x=ns(t.x,jn/2,i.width),t.z=ns(t.z,Fi/2,i.depth)}function qa(i,t={}){return{...i,id:Ne("r"),tanks:i.tanks.map(e=>({...e,id:Ne("t"),ports:e.ports.map(n=>({...n}))})),printers:i.printers.map(e=>({...e,id:Ne("p")})),...t}}function Js(i={}){return{id:Ne("f"),name:"Etage",height:3,rooms:[],...i}}function Qs(i){return i===0?"Erdgeschoss":`${i}. Obergeschoss`}function tr(i){if(!i.rooms.length)return null;const t={minX:1/0,minZ:1/0,maxX:-1/0,maxZ:-1/0};for(const e of i.rooms)t.minX=Math.min(t.minX,e.x),t.minZ=Math.min(t.minZ,e.z),t.maxX=Math.max(t.maxX,e.x+e.width),t.maxZ=Math.max(t.maxZ,e.z+e.depth);return t}function hn(i){if(!i||!Array.isArray(i.floors))throw new Error('Ungültige Gebäudedatei: Feld "floors" fehlt.');const t=i.floors.map((e,n)=>({id:e.id||Ne("f"),name:String(e.name??Qs(n)),height:Math.max(2,je(e.height,3)),rooms:(Array.isArray(e.rooms)?e.rooms:[]).map(s=>({id:s.id||Ne("r"),name:String(s.name??"Raum"),type:Qi[s.type]?s.type:"other",x:je(s.x,0),z:je(s.z,0),width:Math.max(.5,je(s.width,4)),depth:Math.max(.5,je(s.depth,4)),color:s.color||null,occupant:String(s.occupant??""),description:String(s.description??""),stairShape:Wa[s.stairShape]?s.stairShape:"u-left",stairDir:Xa[s.stairDir]?s.stairDir:"n",tanks:(Array.isArray(s.tanks)?s.tanks:[]).map((r,a)=>({id:r.id||Ne("t"),name:String(r.name??`BT ${a+1}`),x:je(r.x,1),z:je(r.z,1),ports:(Array.isArray(r.ports)?r.ports:[]).map(o=>({name:String(typeof o=="string"?o:(o==null?void 0:o.name)??""),switch:String((o==null?void 0:o.switch)??""),switchPort:String((o==null?void 0:o.switchPort)??"")}))})),printers:(Array.isArray(s.printers)?s.printers:[]).map((r,a)=>({id:r.id||Ne("p"),name:String(r.name??`Drucker ${a+1}`),ip:String(r.ip??""),x:je(r.x,1),z:je(r.z,1)}))}))}));return t.length||t.push(Js({name:Qs(0)})),{name:String(i.name??"Gebäude"),floors:t}}const Mc={standard:"standard.json"},Sc={name:"Testbüro",floors:[{id:"f-eg",name:"Erdgeschoss",height:3,rooms:[{id:"r-flur",name:"Flur",type:"corridor",x:0,z:5.5,width:30,depth:2.2,color:null,occupant:"",description:"Hauptflur",tanks:[],printers:[{id:"p-flur",name:"Drucker Flur",ip:"192.168.10.50",x:15,z:.45}]},{id:"r-101",name:"Büro 101",type:"office",x:1.5,z:0,width:9,depth:5.5,color:null,occupant:"Team Vertrieb",description:"4 Arbeitsplätze",tanks:[{id:"t-101-1",name:"BT 1",x:3,z:2.75,ports:[{name:"P01/01",switch:"Switch 1",switchPort:"1"},{name:"P01/02",switch:"Switch 1",switchPort:"2"},{name:"P01/03",switch:"Switch 1",switchPort:"3"},{name:"P01/04",switch:"Switch 1",switchPort:"4"},{name:"P01/05",switch:"Switch 1",switchPort:"5"},{name:"P01/06",switch:"Switch 1",switchPort:"6"}]},{id:"t-101-2",name:"BT 2",x:6,z:2.75,ports:[{name:"P01/07",switch:"Switch 1",switchPort:"7"},{name:"P01/08",switch:"Switch 1",switchPort:"8"},{name:"P01/09",switch:"Switch 1",switchPort:"9"},{name:"P01/10",switch:"Switch 1",switchPort:"10"},{name:"P01/11",switch:"Switch 1",switchPort:"11"},{name:"P01/12",switch:"Switch 1",switchPort:"12"}]}],printers:[]},{id:"r-102",name:"Büro 102",type:"office",x:10.5,z:0,width:9,depth:5.5,color:null,occupant:"Team Marketing",description:"4 Arbeitsplätze",tanks:[{id:"t-102-1",name:"BT 1",x:3,z:2.75,ports:[{name:"P01/13",switch:"Switch 1",switchPort:"13"},{name:"P01/14",switch:"Switch 1",switchPort:"14"},{name:"P01/15",switch:"Switch 1",switchPort:"15"},{name:"P01/16",switch:"Switch 1",switchPort:"16"},{name:"P01/17",switch:"Switch 1",switchPort:"17"},{name:"P01/18",switch:"Switch 1",switchPort:"18"}]},{id:"t-102-2",name:"BT 2",x:6,z:2.75,ports:[{name:"P01/19",switch:"Switch 1",switchPort:"19"},{name:"P01/20",switch:"Switch 1",switchPort:"20"},{name:"P01/21",switch:"Switch 1",switchPort:"21"},{name:"P01/22",switch:"Switch 1",switchPort:"22"},{name:"P01/23",switch:"Switch 1",switchPort:"23"},{name:"P01/24",switch:"Switch 1",switchPort:"24"}]}],printers:[{id:"p-102",name:"Drucker Marketing",ip:"192.168.10.51",x:8.3,z:.5}]},{id:"r-103",name:"Büro 103",type:"office",x:19.5,z:0,width:9,depth:5.5,color:null,occupant:"Geschäftsleitung",description:"2 Arbeitsplätze",tanks:[{id:"t-103-1",name:"BT 1",x:3,z:2.75,ports:[{name:"P02/01",switch:"Switch 1",switchPort:"25"},{name:"P02/02",switch:"Switch 1",switchPort:"26"},{name:"P02/03",switch:"Switch 1",switchPort:"27"},{name:"P02/04",switch:"Switch 1",switchPort:"28"},{name:"P02/05",switch:"Switch 1",switchPort:"29"},{name:"P02/06",switch:"Switch 1",switchPort:"30"}]},{id:"t-103-2",name:"BT 2",x:6,z:2.75,ports:[{name:"P02/07",switch:"Switch 1",switchPort:"31"},{name:"P02/08",switch:"Switch 1",switchPort:"32"},{name:"P02/09",switch:"Switch 1",switchPort:"33"},{name:"P02/10",switch:"Switch 1",switchPort:"34"},{name:"P02/11",switch:"Switch 1",switchPort:"35"},{name:"P02/12",switch:"Switch 1",switchPort:"36"}]}],printers:[]},{id:"r-104",name:"Büro 104",type:"office",x:1.5,z:7.7,width:9,depth:5.5,color:null,occupant:"Team IT",description:"5 Arbeitsplätze",tanks:[{id:"t-104-1",name:"BT 1",x:3,z:2.75,ports:[{name:"P02/13",switch:"Switch 1",switchPort:"37"},{name:"P02/14",switch:"Switch 1",switchPort:"38"},{name:"P02/15",switch:"Switch 1",switchPort:"39"},{name:"P02/16",switch:"Switch 1",switchPort:"40"},{name:"P02/17",switch:"Switch 1",switchPort:"41"},{name:"P02/18",switch:"Switch 1",switchPort:"42"}]},{id:"t-104-2",name:"BT 2",x:6,z:2.75,ports:[{name:"P02/19",switch:"Switch 1",switchPort:"43"},{name:"P02/20",switch:"Switch 1",switchPort:"44"},{name:"P02/21",switch:"Switch 1",switchPort:"45"},{name:"P02/22",switch:"Switch 1",switchPort:"46"},{name:"P02/23",switch:"Switch 1",switchPort:"47"},{name:"P02/24",switch:"Switch 1",switchPort:"48"}]}],printers:[]},{id:"r-105",name:"Besprechung 105",type:"meeting",x:10.5,z:7.7,width:9,depth:5.5,color:null,occupant:"",description:"12 Sitzplätze, Beamer",tanks:[{id:"t-105-1",name:"BT 1",x:3,z:2.75,ports:[{name:"P03/01",switch:"Switch 2",switchPort:"1"},{name:"P03/02",switch:"Switch 2",switchPort:"2"},{name:"P03/03",switch:"Switch 2",switchPort:"3"},{name:"P03/04",switch:"Switch 2",switchPort:"4"}]},{id:"t-105-2",name:"BT 2",x:6,z:2.75,ports:[{name:"P03/05",switch:"Switch 2",switchPort:"5"},{name:"P03/06",switch:"Switch 2",switchPort:"6"},{name:"P03/07",switch:"Switch 2",switchPort:"7"},{name:"P03/08",switch:"Switch 2",switchPort:"8"}]}],printers:[]},{id:"r-106",name:"Teeküche 106",type:"kitchen",x:19.5,z:7.7,width:9,depth:5.5,color:null,occupant:"",description:"Kaffee, Kühlschrank, Spülmaschine",tanks:[{id:"t-106-1",name:"BT 1",x:4.5,z:2.75,ports:[{name:"P03/09",switch:"Switch 2",switchPort:"9"},{name:"P03/10",switch:"Switch 2",switchPort:"10"}]}],printers:[]}]}]},Ec=100,yc=300,ja="config.json",er={standard:"standard.json"},is="buero3d.building.v2",bc=location.protocol==="file:",ss=i=>JSON.stringify(i);function nr(){try{const i=localStorage.getItem(is);if(!i)return null;const t=JSON.parse(i);return t.building?t:{building:t,basedOn:null}}catch{return null}}async function Za(i){if(bc){if(i===ja)return Mc;if(i===er.standard)return Sc;throw new Error(`${i}: über file:// nicht ladbar, nur die beim Build eingebettete standard.json`)}const t=await fetch(i,{cache:"no-store"});if(!t.ok)throw new Error(`${i}: HTTP ${t.status}`);return t.json()}class Tc extends EventTarget{constructor(){super(),this.config={...er},this.building=hn(Ui()),this.standard=null,this.standardError=null,this.isDraft=!1,this.draftOutdated=!1,this.undoStack=[],this.redoStack=[],this.saveTimer=null,this.status={state:"loading"}}async init(){try{this.config={...er,...await Za(ja)}}catch{}await this.loadStandard();const t=nr();t?(this.building=hn(t.building),this.isDraft=!0,this.draftOutdated=!!this.standard&&t.basedOn!==ss(this.standard)):this.building=structuredClone(this.standard??hn(Ui())),this.updateStatus(),window.addEventListener("storage",e=>{e.key===is&&this.reloadFromStorage()})}async loadStandard(){try{const t=await Za(this.config.standard);this.standard=hn(t.building??t),this.standardError=null}catch(t){this.standard=null,this.standardError=t.message}}reloadFromStorage(){const t=nr();this.isDraft=!!t,this.building=t?hn(t.building):structuredClone(this.standard??hn(Ui())),this.undoStack=[],this.redoStack=[],this.updateStatus(),this.emit("remote")}get canUndo(){return this.undoStack.length>0}get canRedo(){return this.redoStack.length>0}checkpoint(){this.undoStack.push(JSON.stringify(this.building)),this.undoStack.length>Ec&&this.undoStack.shift(),this.redoStack=[]}mutate(t,{checkpoint:e=!0}={}){e&&this.checkpoint(),t(this.building),this.commit("mutate")}replace(t){const e=hn(t);this.checkpoint(),this.building=e,this.commit("replace")}undo(){this.canUndo&&(this.redoStack.push(JSON.stringify(this.building)),this.building=JSON.parse(this.undoStack.pop()),this.commit("undo"))}redo(){this.canRedo&&(this.undoStack.push(JSON.stringify(this.building)),this.building=JSON.parse(this.redoStack.pop()),this.commit("redo"))}commit(t){this.isDraft||(this.isDraft=!0,this.draftOutdated=!1,this.updateStatus()),this.emit(t),clearTimeout(this.saveTimer),this.saveTimer=setTimeout(()=>this.saveDraft(),yc)}saveDraft(){var e;if(clearTimeout(this.saveTimer),!this.isDraft)return;const t=((e=nr())==null?void 0:e.basedOn)??(this.standard?ss(this.standard):null);try{localStorage.setItem(is,JSON.stringify({basedOn:t,savedAt:new Date().toISOString(),building:this.building})),this.updateStatus()}catch(n){this.setStatus("error",`Entwurf konnte nicht gespeichert werden: ${n.message}`)}}async discardDraft(){clearTimeout(this.saveTimer),await this.loadStandard();try{localStorage.removeItem(is)}catch{}this.checkpoint(),this.building=structuredClone(this.standard??hn(Ui())),this.isDraft=!1,this.draftOutdated=!1,this.updateStatus(),this.emit("replace")}get matchesStandard(){return!!this.standard&&ss(this.building)===ss(this.standard)}updateStatus(){this.isDraft?this.setStatus("draft"):this.standardError?this.setStatus("fallback",this.standardError):this.setStatus("standard")}setStatus(t,e=""){this.status={state:t,message:e},this.dispatchEvent(new CustomEvent("status",{detail:this.status}))}emit(t){this.dispatchEvent(new CustomEvent("change",{detail:{source:t}}))}subscribe(t){const e=n=>t(n.detail);return this.addEventListener("change",e),()=>this.removeEventListener("change",e)}on(t,e){const n=s=>e(s.detail);return this.addEventListener(t,n),()=>this.removeEventListener(t,n)}}const yt=new Tc,wc={loading:"Lädt …",standard:"Standard",draft:"Entwurf (nur in diesem Browser)",fallback:"Testgebäude",error:"Entwurf nicht gespeichert"},ir={standard:()=>`Veröffentlichter Stand aus ${yt.config.standard}`,draft:()=>"Änderungen sind nur in diesem Browser gespeichert. Zum Veröffentlichen im Editor exportieren.",fallback:()=>`Standard-Datei nicht gefunden (${yt.config.standard}) – es wird das Testgebäude gezeigt.`};async function Ac(i,t){const e=document.getElementById("app"),n=document.getElementById("banner");function s(){document.getElementById("building-name").textContent=yt.building.name}function r(){var h;const o=document.getElementById("sync-status"),{state:l,message:c}=yt.status;o.className=`sync-status is-${l}`,o.textContent=wc[l]??l,o.title=[(h=ir[l])==null?void 0:h.call(ir),c].filter(Boolean).join(`
`)}function a(){const o=[];yt.isDraft&&yt.draftOutdated?o.push(`
        <div class="banner banner-warn">
          <span>Der <strong>Standard wurde geändert</strong>, seit dein Entwurf begonnen wurde. Dein Entwurf enthält diese Änderungen nicht.</span>
          <button class="btn sm" data-banner="discard">Neuen Standard laden</button>
          <button class="btn sm" data-banner="dismiss">Entwurf behalten</button>
        </div>`):yt.isDraft,yt.status.state==="fallback"&&i==="editor"&&o.push(`
        <div class="banner banner-warn">
          <span>Standard-Datei <strong>${Vt(yt.config.standard)}</strong> nicht gefunden – es wird das Testgebäude gezeigt.</span>
        </div>`),n.innerHTML=o.join(""),n.hidden=!o.length}n.addEventListener("click",async o=>{var c;const l=(c=o.target.closest("[data-banner]"))==null?void 0:c.dataset.banner;if(l==="discard"){if(!yt.matchesStandard&&!confirm("Entwurf verwerfen und den Standard laden? (Rückgängig ist im Editor möglich)"))return;await yt.discardDraft()}l==="dismiss"&&(yt.draftOutdated=!1),a()}),yt.subscribe(s),yt.on("status",()=>{r(),a()}),e.innerHTML='<div class="app-loading">Lädt …</div>',r(),await yt.init(),s(),r(),e.innerHTML="",t(e),a()}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const sr="170",Kn={ROTATE:0,DOLLY:1,PAN:2},Jn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Rc=0,Ka=1,Cc=2,Ja=1,Qa=2,Ze=3,dn=0,Se=1,Ke=2,un=0,Qn=1,to=2,eo=3,no=4,Pc=5,An=100,Dc=101,Lc=102,Ic=103,Uc=104,Nc=200,Fc=201,Oc=202,zc=203,rr=204,ar=205,Bc=206,kc=207,Hc=208,Gc=209,Vc=210,Wc=211,Xc=212,$c=213,Yc=214,or=0,lr=1,cr=2,ti=3,hr=4,dr=5,ur=6,fr=7,io=0,qc=1,jc=2,fn=0,Zc=1,Kc=2,Jc=3,Qc=4,th=5,eh=6,nh=7,so=300,ei=301,ni=302,pr=303,mr=304,rs=306,gr=1e3,Rn=1001,_r=1002,Fe=1003,ih=1004,as=1005,Xe=1006,xr=1007,Cn=1008,Je=1009,ro=1010,ao=1011,Oi=1012,vr=1013,Pn=1014,Qe=1015,zi=1016,Mr=1017,Sr=1018,ii=1020,oo=35902,lo=1021,co=1022,Oe=1023,ho=1024,uo=1025,si=1026,ri=1027,fo=1028,Er=1029,po=1030,yr=1031,br=1033,os=33776,ls=33777,cs=33778,hs=33779,Tr=35840,wr=35841,Ar=35842,Rr=35843,Cr=36196,Pr=37492,Dr=37496,Lr=37808,Ir=37809,Ur=37810,Nr=37811,Fr=37812,Or=37813,zr=37814,Br=37815,kr=37816,Hr=37817,Gr=37818,Vr=37819,Wr=37820,Xr=37821,ds=36492,$r=36494,Yr=36495,mo=36283,qr=36284,jr=36285,Zr=36286,sh=3200,rh=3201,go=0,ah=1,pn="",Ce="srgb",ai="srgb-linear",us="linear",Zt="srgb",oi=7680,_o=519,oh=512,lh=513,ch=514,xo=515,hh=516,dh=517,uh=518,fh=519,vo=35044,Mo="300 es",tn=2e3,fs=2001;class Dn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const pe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let So=1234567;const li=Math.PI/180,Bi=180/Math.PI;function ci(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(pe[i&255]+pe[i>>8&255]+pe[i>>16&255]+pe[i>>24&255]+"-"+pe[t&255]+pe[t>>8&255]+"-"+pe[t>>16&15|64]+pe[t>>24&255]+"-"+pe[e&63|128]+pe[e>>8&255]+"-"+pe[e>>16&255]+pe[e>>24&255]+pe[n&255]+pe[n>>8&255]+pe[n>>16&255]+pe[n>>24&255]).toLowerCase()}function me(i,t,e){return Math.max(t,Math.min(e,i))}function Kr(i,t){return(i%t+t)%t}function ph(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function mh(i,t,e){return i!==t?(e-i)/(t-i):0}function ki(i,t,e){return(1-e)*i+e*t}function gh(i,t,e,n){return ki(i,t,1-Math.exp(-e*n))}function _h(i,t=1){return t-Math.abs(Kr(i,t*2)-t)}function xh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function vh(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Mh(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Sh(i,t){return i+Math.random()*(t-i)}function Eh(i){return i*(.5-Math.random())}function yh(i){i!==void 0&&(So=i);let t=So+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function bh(i){return i*li}function Th(i){return i*Bi}function wh(i){return(i&i-1)===0&&i!==0}function Ah(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Rh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ch(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),d=r((t-n)/2),m=a((t-n)/2),g=r((n-t)/2),x=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*d,l*m,o*c);break;case"YZY":i.set(l*m,o*h,l*d,o*c);break;case"ZXZ":i.set(l*d,l*m,o*h,o*c);break;case"XZX":i.set(o*h,l*x,l*g,o*c);break;case"YXY":i.set(l*g,o*h,l*x,o*c);break;case"ZYZ":i.set(l*x,l*g,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function hi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function xe(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Eo={DEG2RAD:li,RAD2DEG:Bi,generateUUID:ci,clamp:me,euclideanModulo:Kr,mapLinear:ph,inverseLerp:mh,lerp:ki,damp:gh,pingpong:_h,smoothstep:xh,smootherstep:vh,randInt:Mh,randFloat:Sh,randFloatSpread:Eh,seededRandom:yh,degToRad:bh,radToDeg:Th,isPowerOfTwo:wh,ceilPowerOfTwo:Ah,floorPowerOfTwo:Rh,setQuaternionFromProperEuler:Ch,normalize:xe,denormalize:hi};class It{constructor(t=0,e=0){It.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Nt{constructor(t,e,n,s,r,a,o,l,c){Nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],m=n[2],g=n[5],x=n[8],v=s[0],_=s[3],f=s[6],w=s[1],T=s[4],M=s[7],H=s[2],R=s[5],P=s[8];return r[0]=a*v+o*w+l*H,r[3]=a*_+o*T+l*R,r[6]=a*f+o*M+l*P,r[1]=c*v+h*w+d*H,r[4]=c*_+h*T+d*R,r[7]=c*f+h*M+d*P,r[2]=m*v+g*w+x*H,r[5]=m*_+g*T+x*R,r[8]=m*f+g*M+x*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*a-o*c,m=o*l-h*r,g=c*r-a*l,x=e*d+n*m+s*g;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/x;return t[0]=d*v,t[1]=(s*c-h*n)*v,t[2]=(o*n-s*a)*v,t[3]=m*v,t[4]=(h*e-s*l)*v,t[5]=(s*r-o*e)*v,t[6]=g*v,t[7]=(n*l-c*e)*v,t[8]=(a*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Jr.makeScale(t,e)),this}rotate(t){return this.premultiply(Jr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Jr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Jr=new Nt;function yo(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ps(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ph(){const i=ps("canvas");return i.style.display="block",i}const bo={};function Hi(i){i in bo||(bo[i]=!0,console.warn(i))}function Dh(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Lh(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Ih(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Wt={enabled:!0,workingColorSpace:ai,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===Zt&&(i.r=en(i.r),i.g=en(i.g),i.b=en(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===Zt&&(i.r=di(i.r),i.g=di(i.g),i.b=di(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===pn?us:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function en(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function di(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const To=[.64,.33,.3,.6,.15,.06],wo=[.2126,.7152,.0722],Ao=[.3127,.329],Ro=new Nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Co=new Nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Wt.define({[ai]:{primaries:To,whitePoint:Ao,transfer:us,toXYZ:Ro,fromXYZ:Co,luminanceCoefficients:wo,workingColorSpaceConfig:{unpackColorSpace:Ce},outputColorSpaceConfig:{drawingBufferColorSpace:Ce}},[Ce]:{primaries:To,whitePoint:Ao,transfer:Zt,toXYZ:Ro,fromXYZ:Co,luminanceCoefficients:wo,outputColorSpaceConfig:{drawingBufferColorSpace:Ce}}});let ui;class Uh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ui===void 0&&(ui=ps("canvas")),ui.width=t.width,ui.height=t.height;const n=ui.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ui}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ps("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=en(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(en(e[n]/255)*255):e[n]=en(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Nh=0;class Po{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Nh++}),this.uuid=ci(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Qr(s[a].image)):r.push(Qr(s[a]))}else r=Qr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Qr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Uh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fh=0;class Ee extends Dn{constructor(t=Ee.DEFAULT_IMAGE,e=Ee.DEFAULT_MAPPING,n=Rn,s=Rn,r=Xe,a=Cn,o=Oe,l=Je,c=Ee.DEFAULT_ANISOTROPY,h=pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fh++}),this.uuid=ci(),this.name="",this.source=new Po(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new It(0,0),this.repeat=new It(1,1),this.center=new It(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==so)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case gr:t.x=t.x-Math.floor(t.x);break;case Rn:t.x=t.x<0?0:1;break;case _r:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case gr:t.y=t.y-Math.floor(t.y);break;case Rn:t.y=t.y<0?0:1;break;case _r:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ee.DEFAULT_IMAGE=null,Ee.DEFAULT_MAPPING=so,Ee.DEFAULT_ANISOTROPY=1;class re{constructor(t=0,e=0,n=0,s=1){re.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],d=l[8],m=l[1],g=l[5],x=l[9],v=l[2],_=l[6],f=l[10];if(Math.abs(h-m)<.01&&Math.abs(d-v)<.01&&Math.abs(x-_)<.01){if(Math.abs(h+m)<.1&&Math.abs(d+v)<.1&&Math.abs(x+_)<.1&&Math.abs(c+g+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(c+1)/2,M=(g+1)/2,H=(f+1)/2,R=(h+m)/4,P=(d+v)/4,I=(x+_)/4;return T>M&&T>H?T<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(T),s=R/n,r=P/n):M>H?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=R/s,r=I/s):H<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(H),n=P/r,s=I/r),this.set(n,s,r,e),this}let w=Math.sqrt((_-x)*(_-x)+(d-v)*(d-v)+(m-h)*(m-h));return Math.abs(w)<.001&&(w=1),this.x=(_-x)/w,this.y=(d-v)/w,this.z=(m-h)/w,this.w=Math.acos((c+g+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Oh extends Dn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new re(0,0,t,e),this.scissorTest=!1,this.viewport=new re(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ee(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Po(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ln extends Oh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Do extends Ee{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class zh extends Ee{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Fe,this.minFilter=Fe,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class In{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3];const m=r[a+0],g=r[a+1],x=r[a+2],v=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=m,t[e+1]=g,t[e+2]=x,t[e+3]=v;return}if(d!==v||l!==m||c!==g||h!==x){let _=1-o;const f=l*m+c*g+h*x+d*v,w=f>=0?1:-1,T=1-f*f;if(T>Number.EPSILON){const H=Math.sqrt(T),R=Math.atan2(H,f*w);_=Math.sin(_*R)/H,o=Math.sin(o*R)/H}const M=o*w;if(l=l*_+m*M,c=c*_+g*M,h=h*_+x*M,d=d*_+v*M,_===1-o){const H=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=H,c*=H,h*=H,d*=H}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[a],m=r[a+1],g=r[a+2],x=r[a+3];return t[e]=o*x+h*d+l*g-c*m,t[e+1]=l*x+h*m+c*d-o*g,t[e+2]=c*x+h*g+o*m-l*d,t[e+3]=h*x-o*d-l*m-c*g,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(r/2),m=l(n/2),g=l(s/2),x=l(r/2);switch(a){case"XYZ":this._x=m*h*d+c*g*x,this._y=c*g*d-m*h*x,this._z=c*h*x+m*g*d,this._w=c*h*d-m*g*x;break;case"YXZ":this._x=m*h*d+c*g*x,this._y=c*g*d-m*h*x,this._z=c*h*x-m*g*d,this._w=c*h*d+m*g*x;break;case"ZXY":this._x=m*h*d-c*g*x,this._y=c*g*d+m*h*x,this._z=c*h*x+m*g*d,this._w=c*h*d-m*g*x;break;case"ZYX":this._x=m*h*d-c*g*x,this._y=c*g*d+m*h*x,this._z=c*h*x-m*g*d,this._w=c*h*d+m*g*x;break;case"YZX":this._x=m*h*d+c*g*x,this._y=c*g*d+m*h*x,this._z=c*h*x-m*g*d,this._w=c*h*d-m*g*x;break;case"XZY":this._x=m*h*d-c*g*x,this._y=c*g*d-m*h*x,this._z=c*h*x+m*g*d,this._w=c*h*d+m*g*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],m=n+o+d;if(m>0){const g=.5/Math.sqrt(m+1);this._w=.25/g,this._x=(h-l)*g,this._y=(r-c)*g,this._z=(a-s)*g}else if(n>o&&n>d){const g=2*Math.sqrt(1+n-o-d);this._w=(h-l)/g,this._x=.25*g,this._y=(s+a)/g,this._z=(r+c)/g}else if(o>d){const g=2*Math.sqrt(1+o-n-d);this._w=(r-c)/g,this._x=(s+a)/g,this._y=.25*g,this._z=(l+h)/g}else{const g=2*Math.sqrt(1+d-n-o);this._w=(a-s)/g,this._x=(r+c)/g,this._y=(l+h)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(me(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const g=1-e;return this._w=g*a+e*this._w,this._x=g*n+e*this._x,this._y=g*s+e*this._y,this._z=g*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,m=Math.sin(e*h)/c;return this._w=a*d+this._w*m,this._x=n*d+this._x*m,this._y=s*d+this._y*m,this._z=r*d+this._z*m,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(t=0,e=0,n=0){N.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Lo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Lo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=s+l*d+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ta.copy(this).projectOnVector(t),this.sub(ta)}reflect(t){return this.sub(ta.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ta=new N,Lo=new In;class Un{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ze.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ze.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ze.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ze):ze.fromBufferAttribute(r,a),ze.applyMatrix4(t.matrixWorld),this.expandByPoint(ze);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ms.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ms.copy(n.boundingBox)),ms.applyMatrix4(t.matrixWorld),this.union(ms)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ze),ze.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Gi),gs.subVectors(this.max,Gi),fi.subVectors(t.a,Gi),pi.subVectors(t.b,Gi),mi.subVectors(t.c,Gi),mn.subVectors(pi,fi),gn.subVectors(mi,pi),Nn.subVectors(fi,mi);let e=[0,-mn.z,mn.y,0,-gn.z,gn.y,0,-Nn.z,Nn.y,mn.z,0,-mn.x,gn.z,0,-gn.x,Nn.z,0,-Nn.x,-mn.y,mn.x,0,-gn.y,gn.x,0,-Nn.y,Nn.x,0];return!ea(e,fi,pi,mi,gs)||(e=[1,0,0,0,1,0,0,0,1],!ea(e,fi,pi,mi,gs))?!1:(_s.crossVectors(mn,gn),e=[_s.x,_s.y,_s.z],ea(e,fi,pi,mi,gs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ze).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ze).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(nn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const nn=[new N,new N,new N,new N,new N,new N,new N,new N],ze=new N,ms=new Un,fi=new N,pi=new N,mi=new N,mn=new N,gn=new N,Nn=new N,Gi=new N,gs=new N,_s=new N,Fn=new N;function ea(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Fn.fromArray(i,r);const o=s.x*Math.abs(Fn.x)+s.y*Math.abs(Fn.y)+s.z*Math.abs(Fn.z),l=t.dot(Fn),c=e.dot(Fn),h=n.dot(Fn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Bh=new Un,Vi=new N,na=new N;class xs{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Bh.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Vi.subVectors(t,this.center);const e=Vi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Vi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(na.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Vi.copy(t.center).add(na)),this.expandByPoint(Vi.copy(t.center).sub(na))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const sn=new N,ia=new N,vs=new N,_n=new N,sa=new N,Ms=new N,ra=new N;class Ss{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,sn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=sn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(sn.copy(this.origin).addScaledVector(this.direction,e),sn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ia.copy(t).add(e).multiplyScalar(.5),vs.copy(e).sub(t).normalize(),_n.copy(this.origin).sub(ia);const r=t.distanceTo(e)*.5,a=-this.direction.dot(vs),o=_n.dot(this.direction),l=-_n.dot(vs),c=_n.lengthSq(),h=Math.abs(1-a*a);let d,m,g,x;if(h>0)if(d=a*l-o,m=a*o-l,x=r*h,d>=0)if(m>=-x)if(m<=x){const v=1/h;d*=v,m*=v,g=d*(d+a*m+2*o)+m*(a*d+m+2*l)+c}else m=r,d=Math.max(0,-(a*m+o)),g=-d*d+m*(m+2*l)+c;else m=-r,d=Math.max(0,-(a*m+o)),g=-d*d+m*(m+2*l)+c;else m<=-x?(d=Math.max(0,-(-a*r+o)),m=d>0?-r:Math.min(Math.max(-r,-l),r),g=-d*d+m*(m+2*l)+c):m<=x?(d=0,m=Math.min(Math.max(-r,-l),r),g=m*(m+2*l)+c):(d=Math.max(0,-(a*r+o)),m=d>0?r:Math.min(Math.max(-r,-l),r),g=-d*d+m*(m+2*l)+c);else m=a>0?-r:r,d=Math.max(0,-(a*m+o)),g=-d*d+m*(m+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ia).addScaledVector(vs,m),g}intersectSphere(t,e){sn.subVectors(t.center,this.origin);const n=sn.dot(this.direction),s=sn.dot(sn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,m=this.origin;return c>=0?(n=(t.min.x-m.x)*c,s=(t.max.x-m.x)*c):(n=(t.max.x-m.x)*c,s=(t.min.x-m.x)*c),h>=0?(r=(t.min.y-m.y)*h,a=(t.max.y-m.y)*h):(r=(t.max.y-m.y)*h,a=(t.min.y-m.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-m.z)*d,l=(t.max.z-m.z)*d):(o=(t.max.z-m.z)*d,l=(t.min.z-m.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,sn)!==null}intersectTriangle(t,e,n,s,r){sa.subVectors(e,t),Ms.subVectors(n,t),ra.crossVectors(sa,Ms);let a=this.direction.dot(ra),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;_n.subVectors(this.origin,t);const l=o*this.direction.dot(Ms.crossVectors(_n,Ms));if(l<0)return null;const c=o*this.direction.dot(sa.cross(_n));if(c<0||l+c>a)return null;const h=-o*_n.dot(ra);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qt{constructor(t,e,n,s,r,a,o,l,c,h,d,m,g,x,v,_){Qt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,d,m,g,x,v,_)}set(t,e,n,s,r,a,o,l,c,h,d,m,g,x,v,_){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=m,f[3]=g,f[7]=x,f[11]=v,f[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Qt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/gi.setFromMatrixColumn(t,0).length(),r=1/gi.setFromMatrixColumn(t,1).length(),a=1/gi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const m=a*h,g=a*d,x=o*h,v=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=g+x*c,e[5]=m-v*c,e[9]=-o*l,e[2]=v-m*c,e[6]=x+g*c,e[10]=a*l}else if(t.order==="YXZ"){const m=l*h,g=l*d,x=c*h,v=c*d;e[0]=m+v*o,e[4]=x*o-g,e[8]=a*c,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=g*o-x,e[6]=v+m*o,e[10]=a*l}else if(t.order==="ZXY"){const m=l*h,g=l*d,x=c*h,v=c*d;e[0]=m-v*o,e[4]=-a*d,e[8]=x+g*o,e[1]=g+x*o,e[5]=a*h,e[9]=v-m*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const m=a*h,g=a*d,x=o*h,v=o*d;e[0]=l*h,e[4]=x*c-g,e[8]=m*c+v,e[1]=l*d,e[5]=v*c+m,e[9]=g*c-x,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const m=a*l,g=a*c,x=o*l,v=o*c;e[0]=l*h,e[4]=v-m*d,e[8]=x*d+g,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=g*d+x,e[10]=m-v*d}else if(t.order==="XZY"){const m=a*l,g=a*c,x=o*l,v=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=m*d+v,e[5]=a*h,e[9]=g*d-x,e[2]=x*d-g,e[6]=o*h,e[10]=v*d+m}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(kh,t,Hh)}lookAt(t,e,n){const s=this.elements;return we.subVectors(t,e),we.lengthSq()===0&&(we.z=1),we.normalize(),xn.crossVectors(n,we),xn.lengthSq()===0&&(Math.abs(n.z)===1?we.x+=1e-4:we.z+=1e-4,we.normalize(),xn.crossVectors(n,we)),xn.normalize(),Es.crossVectors(we,xn),s[0]=xn.x,s[4]=Es.x,s[8]=we.x,s[1]=xn.y,s[5]=Es.y,s[9]=we.y,s[2]=xn.z,s[6]=Es.z,s[10]=we.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],m=n[9],g=n[13],x=n[2],v=n[6],_=n[10],f=n[14],w=n[3],T=n[7],M=n[11],H=n[15],R=s[0],P=s[4],I=s[8],b=s[12],E=s[1],D=s[5],$=s[9],X=s[13],K=s[2],tt=s[6],Z=s[10],it=s[14],Y=s[3],ct=s[7],pt=s[11],St=s[15];return r[0]=a*R+o*E+l*K+c*Y,r[4]=a*P+o*D+l*tt+c*ct,r[8]=a*I+o*$+l*Z+c*pt,r[12]=a*b+o*X+l*it+c*St,r[1]=h*R+d*E+m*K+g*Y,r[5]=h*P+d*D+m*tt+g*ct,r[9]=h*I+d*$+m*Z+g*pt,r[13]=h*b+d*X+m*it+g*St,r[2]=x*R+v*E+_*K+f*Y,r[6]=x*P+v*D+_*tt+f*ct,r[10]=x*I+v*$+_*Z+f*pt,r[14]=x*b+v*X+_*it+f*St,r[3]=w*R+T*E+M*K+H*Y,r[7]=w*P+T*D+M*tt+H*ct,r[11]=w*I+T*$+M*Z+H*pt,r[15]=w*b+T*X+M*it+H*St,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],m=t[10],g=t[14],x=t[3],v=t[7],_=t[11],f=t[15];return x*(+r*l*d-s*c*d-r*o*m+n*c*m+s*o*g-n*l*g)+v*(+e*l*g-e*c*m+r*a*m-s*a*g+s*c*h-r*l*h)+_*(+e*c*d-e*o*g-r*a*d+n*a*g+r*o*h-n*c*h)+f*(-s*o*h-e*l*d+e*o*m+s*a*d-n*a*m+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],m=t[10],g=t[11],x=t[12],v=t[13],_=t[14],f=t[15],w=d*_*c-v*m*c+v*l*g-o*_*g-d*l*f+o*m*f,T=x*m*c-h*_*c-x*l*g+a*_*g+h*l*f-a*m*f,M=h*v*c-x*d*c+x*o*g-a*v*g-h*o*f+a*d*f,H=x*d*l-h*v*l-x*o*m+a*v*m+h*o*_-a*d*_,R=e*w+n*T+s*M+r*H;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/R;return t[0]=w*P,t[1]=(v*m*r-d*_*r-v*s*g+n*_*g+d*s*f-n*m*f)*P,t[2]=(o*_*r-v*l*r+v*s*c-n*_*c-o*s*f+n*l*f)*P,t[3]=(d*l*r-o*m*r-d*s*c+n*m*c+o*s*g-n*l*g)*P,t[4]=T*P,t[5]=(h*_*r-x*m*r+x*s*g-e*_*g-h*s*f+e*m*f)*P,t[6]=(x*l*r-a*_*r-x*s*c+e*_*c+a*s*f-e*l*f)*P,t[7]=(a*m*r-h*l*r+h*s*c-e*m*c-a*s*g+e*l*g)*P,t[8]=M*P,t[9]=(x*d*r-h*v*r-x*n*g+e*v*g+h*n*f-e*d*f)*P,t[10]=(a*v*r-x*o*r+x*n*c-e*v*c-a*n*f+e*o*f)*P,t[11]=(h*o*r-a*d*r-h*n*c+e*d*c+a*n*g-e*o*g)*P,t[12]=H*P,t[13]=(h*v*s-x*d*s+x*n*m-e*v*m-h*n*_+e*d*_)*P,t[14]=(x*o*s-a*v*s-x*n*l+e*v*l+a*n*_-e*o*_)*P,t[15]=(a*d*s-h*o*s+h*n*l-e*d*l-a*n*m+e*o*m)*P,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,d=o+o,m=r*c,g=r*h,x=r*d,v=a*h,_=a*d,f=o*d,w=l*c,T=l*h,M=l*d,H=n.x,R=n.y,P=n.z;return s[0]=(1-(v+f))*H,s[1]=(g+M)*H,s[2]=(x-T)*H,s[3]=0,s[4]=(g-M)*R,s[5]=(1-(m+f))*R,s[6]=(_+w)*R,s[7]=0,s[8]=(x+T)*P,s[9]=(_-w)*P,s[10]=(1-(m+v))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=gi.set(s[0],s[1],s[2]).length();const a=gi.set(s[4],s[5],s[6]).length(),o=gi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Be.copy(this);const c=1/r,h=1/a,d=1/o;return Be.elements[0]*=c,Be.elements[1]*=c,Be.elements[2]*=c,Be.elements[4]*=h,Be.elements[5]*=h,Be.elements[6]*=h,Be.elements[8]*=d,Be.elements[9]*=d,Be.elements[10]*=d,e.setFromRotationMatrix(Be),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=tn){const l=this.elements,c=2*r/(e-t),h=2*r/(n-s),d=(e+t)/(e-t),m=(n+s)/(n-s);let g,x;if(o===tn)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===fs)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=tn){const l=this.elements,c=1/(e-t),h=1/(n-s),d=1/(a-r),m=(e+t)*c,g=(n+s)*h;let x,v;if(o===tn)x=(a+r)*d,v=-2*d;else if(o===fs)x=r*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-m,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-g,l[2]=0,l[6]=0,l[10]=v,l[14]=-x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const gi=new N,Be=new Qt,kh=new N(0,0,0),Hh=new N(1,1,1),xn=new N,Es=new N,we=new N,Io=new Qt,Uo=new In;class $e{constructor(t=0,e=0,n=0,s=$e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],m=s[6],g=s[10];switch(e){case"XYZ":this._y=Math.asin(me(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,g),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(m,c),this._z=0);break;case"YXZ":this._x=Math.asin(-me(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(me(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-d,g),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-me(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(m,g),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(me(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,g));break;case"XZY":this._z=Math.asin(-me(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(m,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Io.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Io,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Uo.setFromEuler(this),this.setFromQuaternion(Uo,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}$e.DEFAULT_ORDER="XYZ";class aa{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Gh=0;const No=new N,_i=new In,rn=new Qt,ys=new N,Wi=new N,Vh=new N,Wh=new In,Fo=new N(1,0,0),Oo=new N(0,1,0),zo=new N(0,0,1),Bo={type:"added"},Xh={type:"removed"},xi={type:"childadded",child:null},oa={type:"childremoved",child:null};class le extends Dn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gh++}),this.uuid=ci(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=le.DEFAULT_UP.clone();const t=new N,e=new $e,n=new In,s=new N(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Qt},normalMatrix:{value:new Nt}}),this.matrix=new Qt,this.matrixWorld=new Qt,this.matrixAutoUpdate=le.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new aa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return _i.setFromAxisAngle(t,e),this.quaternion.multiply(_i),this}rotateOnWorldAxis(t,e){return _i.setFromAxisAngle(t,e),this.quaternion.premultiply(_i),this}rotateX(t){return this.rotateOnAxis(Fo,t)}rotateY(t){return this.rotateOnAxis(Oo,t)}rotateZ(t){return this.rotateOnAxis(zo,t)}translateOnAxis(t,e){return No.copy(t).applyQuaternion(this.quaternion),this.position.add(No.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Fo,t)}translateY(t){return this.translateOnAxis(Oo,t)}translateZ(t){return this.translateOnAxis(zo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(rn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ys.copy(t):ys.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Wi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?rn.lookAt(Wi,ys,this.up):rn.lookAt(ys,Wi,this.up),this.quaternion.setFromRotationMatrix(rn),s&&(rn.extractRotation(s.matrixWorld),_i.setFromRotationMatrix(rn),this.quaternion.premultiply(_i.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Bo),xi.child=t,this.dispatchEvent(xi),xi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Xh),oa.child=t,this.dispatchEvent(oa),oa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(rn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Bo),xi.child=t,this.dispatchEvent(xi),xi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,t,Vh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wi,Wh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),d=a(t.shapes),m=a(t.skeletons),g=a(t.animations),x=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),m.length>0&&(n.skeletons=m),g.length>0&&(n.animations=g),x.length>0&&(n.nodes=x)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}le.DEFAULT_UP=new N(0,1,0),le.DEFAULT_MATRIX_AUTO_UPDATE=!0,le.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ke=new N,an=new N,la=new N,on=new N,vi=new N,Mi=new N,ko=new N,ca=new N,ha=new N,da=new N,ua=new re,fa=new re,pa=new re;class Pe{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),ke.subVectors(t,e),s.cross(ke);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){ke.subVectors(s,e),an.subVectors(n,e),la.subVectors(t,e);const a=ke.dot(ke),o=ke.dot(an),l=ke.dot(la),c=an.dot(an),h=an.dot(la),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const m=1/d,g=(c*l-o*h)*m,x=(a*h-o*l)*m;return r.set(1-g-x,x,g)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,on)===null?!1:on.x>=0&&on.y>=0&&on.x+on.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,on)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,on.x),l.addScaledVector(a,on.y),l.addScaledVector(o,on.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return ua.setScalar(0),fa.setScalar(0),pa.setScalar(0),ua.fromBufferAttribute(t,e),fa.fromBufferAttribute(t,n),pa.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(ua,r.x),a.addScaledVector(fa,r.y),a.addScaledVector(pa,r.z),a}static isFrontFacing(t,e,n,s){return ke.subVectors(n,e),an.subVectors(t,e),ke.cross(an).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ke.subVectors(this.c,this.b),an.subVectors(this.a,this.b),ke.cross(an).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Pe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Pe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Pe.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Pe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Pe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;vi.subVectors(s,n),Mi.subVectors(r,n),ca.subVectors(t,n);const l=vi.dot(ca),c=Mi.dot(ca);if(l<=0&&c<=0)return e.copy(n);ha.subVectors(t,s);const h=vi.dot(ha),d=Mi.dot(ha);if(h>=0&&d<=h)return e.copy(s);const m=l*d-h*c;if(m<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(vi,a);da.subVectors(t,r);const g=vi.dot(da),x=Mi.dot(da);if(x>=0&&g<=x)return e.copy(r);const v=g*c-l*x;if(v<=0&&c>=0&&x<=0)return o=c/(c-x),e.copy(n).addScaledVector(Mi,o);const _=h*x-g*d;if(_<=0&&d-h>=0&&g-x>=0)return ko.subVectors(r,s),o=(d-h)/(d-h+(g-x)),e.copy(s).addScaledVector(ko,o);const f=1/(_+v+m);return a=v*f,o=m*f,e.copy(n).addScaledVector(vi,a).addScaledVector(Mi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Ho={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},vn={h:0,s:0,l:0},bs={h:0,s:0,l:0};function ma(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class kt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ce){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Wt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Wt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Wt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Wt.workingColorSpace){if(t=Kr(t,1),e=me(e,0,1),n=me(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=ma(a,r,t+1/3),this.g=ma(a,r,t),this.b=ma(a,r,t-1/3)}return Wt.toWorkingColorSpace(this,s),this}setStyle(t,e=Ce){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ce){const n=Ho[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=en(t.r),this.g=en(t.g),this.b=en(t.b),this}copyLinearToSRGB(t){return this.r=di(t.r),this.g=di(t.g),this.b=di(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ce){return Wt.fromWorkingColorSpace(ge.copy(this),t),Math.round(me(ge.r*255,0,255))*65536+Math.round(me(ge.g*255,0,255))*256+Math.round(me(ge.b*255,0,255))}getHexString(t=Ce){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Wt.workingColorSpace){Wt.fromWorkingColorSpace(ge.copy(this),e);const n=ge.r,s=ge.g,r=ge.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Wt.workingColorSpace){return Wt.fromWorkingColorSpace(ge.copy(this),e),t.r=ge.r,t.g=ge.g,t.b=ge.b,t}getStyle(t=Ce){Wt.fromWorkingColorSpace(ge.copy(this),t);const e=ge.r,n=ge.g,s=ge.b;return t!==Ce?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(vn),this.setHSL(vn.h+t,vn.s+e,vn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(vn),t.getHSL(bs);const n=ki(vn.h,bs.h,e),s=ki(vn.s,bs.s,e),r=ki(vn.l,bs.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ge=new kt;kt.NAMES=Ho;let $h=0;class Si extends Dn{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$h++}),this.uuid=ci(),this.name="",this.blending=Qn,this.side=dn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=rr,this.blendDst=ar,this.blendEquation=An,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new kt(0,0,0),this.blendAlpha=0,this.depthFunc=ti,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_o,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=oi,this.stencilZFail=oi,this.stencilZPass=oi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Qn&&(n.blending=this.blending),this.side!==dn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==rr&&(n.blendSrc=this.blendSrc),this.blendDst!==ar&&(n.blendDst=this.blendDst),this.blendEquation!==An&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ti&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_o&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==oi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==oi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==oi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ga extends Si{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $e,this.combine=io,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const oe=new N,Ts=new It;class He{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=vo,this.updateRanges=[],this.gpuType=Qe,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ts.fromBufferAttribute(this,e),Ts.applyMatrix3(t),this.setXY(e,Ts.x,Ts.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)oe.fromBufferAttribute(this,e),oe.applyMatrix3(t),this.setXYZ(e,oe.x,oe.y,oe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)oe.fromBufferAttribute(this,e),oe.applyMatrix4(t),this.setXYZ(e,oe.x,oe.y,oe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)oe.fromBufferAttribute(this,e),oe.applyNormalMatrix(t),this.setXYZ(e,oe.x,oe.y,oe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)oe.fromBufferAttribute(this,e),oe.transformDirection(t),this.setXYZ(e,oe.x,oe.y,oe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=hi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=xe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=hi(e,this.array)),e}setX(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=hi(e,this.array)),e}setY(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=hi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=hi(e,this.array)),e}setW(t,e){return this.normalized&&(e=xe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),n=xe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),n=xe(n,this.array),s=xe(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=xe(e,this.array),n=xe(n,this.array),s=xe(s,this.array),r=xe(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==vo&&(t.usage=this.usage),t}}class Go extends He{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Vo extends He{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class De extends He{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Yh=0;const Le=new Qt,_a=new le,Ei=new N,Ae=new Un,Xi=new Un,fe=new N;class Ge extends Dn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yh++}),this.uuid=ci(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(yo(t)?Vo:Go)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Nt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Le.makeRotationFromQuaternion(t),this.applyMatrix4(Le),this}rotateX(t){return Le.makeRotationX(t),this.applyMatrix4(Le),this}rotateY(t){return Le.makeRotationY(t),this.applyMatrix4(Le),this}rotateZ(t){return Le.makeRotationZ(t),this.applyMatrix4(Le),this}translate(t,e,n){return Le.makeTranslation(t,e,n),this.applyMatrix4(Le),this}scale(t,e,n){return Le.makeScale(t,e,n),this.applyMatrix4(Le),this}lookAt(t){return _a.lookAt(t),_a.updateMatrix(),this.applyMatrix4(_a.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ei).negate(),this.translate(Ei.x,Ei.y,Ei.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new De(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Un);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Ae.setFromBufferAttribute(r),this.morphTargetsRelative?(fe.addVectors(this.boundingBox.min,Ae.min),this.boundingBox.expandByPoint(fe),fe.addVectors(this.boundingBox.max,Ae.max),this.boundingBox.expandByPoint(fe)):(this.boundingBox.expandByPoint(Ae.min),this.boundingBox.expandByPoint(Ae.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){const n=this.boundingSphere.center;if(Ae.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Xi.setFromBufferAttribute(o),this.morphTargetsRelative?(fe.addVectors(Ae.min,Xi.min),Ae.expandByPoint(fe),fe.addVectors(Ae.max,Xi.max),Ae.expandByPoint(fe)):(Ae.expandByPoint(Xi.min),Ae.expandByPoint(Xi.max))}Ae.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)fe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(fe));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)fe.fromBufferAttribute(o,c),l&&(Ei.fromBufferAttribute(t,c),fe.add(Ei)),s=Math.max(s,n.distanceToSquared(fe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new He(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<n.count;I++)o[I]=new N,l[I]=new N;const c=new N,h=new N,d=new N,m=new It,g=new It,x=new It,v=new N,_=new N;function f(I,b,E){c.fromBufferAttribute(n,I),h.fromBufferAttribute(n,b),d.fromBufferAttribute(n,E),m.fromBufferAttribute(r,I),g.fromBufferAttribute(r,b),x.fromBufferAttribute(r,E),h.sub(c),d.sub(c),g.sub(m),x.sub(m);const D=1/(g.x*x.y-x.x*g.y);isFinite(D)&&(v.copy(h).multiplyScalar(x.y).addScaledVector(d,-g.y).multiplyScalar(D),_.copy(d).multiplyScalar(g.x).addScaledVector(h,-x.x).multiplyScalar(D),o[I].add(v),o[b].add(v),o[E].add(v),l[I].add(_),l[b].add(_),l[E].add(_))}let w=this.groups;w.length===0&&(w=[{start:0,count:t.count}]);for(let I=0,b=w.length;I<b;++I){const E=w[I],D=E.start,$=E.count;for(let X=D,K=D+$;X<K;X+=3)f(t.getX(X+0),t.getX(X+1),t.getX(X+2))}const T=new N,M=new N,H=new N,R=new N;function P(I){H.fromBufferAttribute(s,I),R.copy(H);const b=o[I];T.copy(b),T.sub(H.multiplyScalar(H.dot(b))).normalize(),M.crossVectors(R,b);const D=M.dot(l[I])<0?-1:1;a.setXYZW(I,T.x,T.y,T.z,D)}for(let I=0,b=w.length;I<b;++I){const E=w[I],D=E.start,$=E.count;for(let X=D,K=D+$;X<K;X+=3)P(t.getX(X+0)),P(t.getX(X+1)),P(t.getX(X+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new He(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let m=0,g=n.count;m<g;m++)n.setXYZ(m,0,0,0);const s=new N,r=new N,a=new N,o=new N,l=new N,c=new N,h=new N,d=new N;if(t)for(let m=0,g=t.count;m<g;m+=3){const x=t.getX(m+0),v=t.getX(m+1),_=t.getX(m+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,v),a.fromBufferAttribute(e,_),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,x),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,_),o.add(h),l.add(h),c.add(h),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(_,c.x,c.y,c.z)}else for(let m=0,g=e.count;m<g;m+=3)s.fromBufferAttribute(e,m+0),r.fromBufferAttribute(e,m+1),a.fromBufferAttribute(e,m+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(m+0,h.x,h.y,h.z),n.setXYZ(m+1,h.x,h.y,h.z),n.setXYZ(m+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)fe.fromBufferAttribute(t,e),fe.normalize(),t.setXYZ(e,fe.x,fe.y,fe.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,d=o.normalized,m=new c.constructor(l.length*h);let g=0,x=0;for(let v=0,_=l.length;v<_;v++){o.isInterleavedBufferAttribute?g=l[v]*o.data.stride+o.offset:g=l[v]*h;for(let f=0;f<h;f++)m[x++]=c[g++]}return new He(m,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ge,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){const m=c[h],g=t(m,n);l.push(g)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,m=c.length;d<m;d++){const g=c[d];h.push(g.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],d=r[c];for(let m=0,g=d.length;m<g;m++)h.push(d[m].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wo=new Qt,On=new Ss,ws=new xs,Xo=new N,As=new N,Rs=new N,Cs=new N,xa=new N,Ps=new N,$o=new N,Ds=new N;class ce extends le{constructor(t=new Ge,e=new ga){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Ps.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],d=r[l];h!==0&&(xa.fromBufferAttribute(d,t),a?Ps.addScaledVector(xa,h):Ps.addScaledVector(xa.sub(e),h))}e.add(Ps)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ws.copy(n.boundingSphere),ws.applyMatrix4(r),On.copy(t.ray).recast(t.near),!(ws.containsPoint(On.origin)===!1&&(On.intersectSphere(ws,Xo)===null||On.origin.distanceToSquared(Xo)>(t.far-t.near)**2))&&(Wo.copy(r).invert(),On.copy(t.ray).applyMatrix4(Wo),!(n.boundingBox!==null&&On.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,On)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,m=r.groups,g=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,v=m.length;x<v;x++){const _=m[x],f=a[_.materialIndex],w=Math.max(_.start,g.start),T=Math.min(o.count,Math.min(_.start+_.count,g.start+g.count));for(let M=w,H=T;M<H;M+=3){const R=o.getX(M),P=o.getX(M+1),I=o.getX(M+2);s=Ls(this,f,t,n,c,h,d,R,P,I),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=_.materialIndex,e.push(s))}}else{const x=Math.max(0,g.start),v=Math.min(o.count,g.start+g.count);for(let _=x,f=v;_<f;_+=3){const w=o.getX(_),T=o.getX(_+1),M=o.getX(_+2);s=Ls(this,a,t,n,c,h,d,w,T,M),s&&(s.faceIndex=Math.floor(_/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,v=m.length;x<v;x++){const _=m[x],f=a[_.materialIndex],w=Math.max(_.start,g.start),T=Math.min(l.count,Math.min(_.start+_.count,g.start+g.count));for(let M=w,H=T;M<H;M+=3){const R=M,P=M+1,I=M+2;s=Ls(this,f,t,n,c,h,d,R,P,I),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=_.materialIndex,e.push(s))}}else{const x=Math.max(0,g.start),v=Math.min(l.count,g.start+g.count);for(let _=x,f=v;_<f;_+=3){const w=_,T=_+1,M=_+2;s=Ls(this,a,t,n,c,h,d,w,T,M),s&&(s.faceIndex=Math.floor(_/3),e.push(s))}}}}function qh(i,t,e,n,s,r,a,o){let l;if(t.side===Se?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===dn,o),l===null)return null;Ds.copy(o),Ds.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Ds);return c<e.near||c>e.far?null:{distance:c,point:Ds.clone(),object:i}}function Ls(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,As),i.getVertexPosition(l,Rs),i.getVertexPosition(c,Cs);const h=qh(i,t,e,n,As,Rs,Cs,$o);if(h){const d=new N;Pe.getBarycoord($o,As,Rs,Cs,d),s&&(h.uv=Pe.getInterpolatedAttribute(s,o,l,c,d,new It)),r&&(h.uv1=Pe.getInterpolatedAttribute(r,o,l,c,d,new It)),a&&(h.normal=Pe.getInterpolatedAttribute(a,o,l,c,d,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const m={a:o,b:l,c,normal:new N,materialIndex:0};Pe.getNormal(As,Rs,Cs,m.normal),h.face=m,h.barycoord=d}return h}class ye extends Ge{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],d=[];let m=0,g=0;x("z","y","x",-1,-1,n,e,t,a,r,0),x("z","y","x",1,-1,n,e,-t,a,r,1),x("x","z","y",1,1,t,n,e,s,a,2),x("x","z","y",1,-1,t,n,-e,s,a,3),x("x","y","z",1,-1,t,e,n,s,r,4),x("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new De(c,3)),this.setAttribute("normal",new De(h,3)),this.setAttribute("uv",new De(d,2));function x(v,_,f,w,T,M,H,R,P,I,b){const E=M/P,D=H/I,$=M/2,X=H/2,K=R/2,tt=P+1,Z=I+1;let it=0,Y=0;const ct=new N;for(let pt=0;pt<Z;pt++){const St=pt*D-X;for(let bt=0;bt<tt;bt++){const Ht=bt*E-$;ct[v]=Ht*w,ct[_]=St*T,ct[f]=K,c.push(ct.x,ct.y,ct.z),ct[v]=0,ct[_]=0,ct[f]=R>0?1:-1,h.push(ct.x,ct.y,ct.z),d.push(bt/P),d.push(1-pt/I),it+=1}}for(let pt=0;pt<I;pt++)for(let St=0;St<P;St++){const bt=m+St+tt*pt,Ht=m+St+tt*(pt+1),j=m+(St+1)+tt*(pt+1),st=m+(St+1)+tt*pt;l.push(bt,Ht,st),l.push(Ht,j,st),Y+=6}o.addGroup(g,Y,b),g+=Y,m+=it}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ye(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function yi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function ve(i){const t={};for(let e=0;e<i.length;e++){const n=yi(i[e]);for(const s in n)t[s]=n[s]}return t}function jh(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Yo(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Wt.workingColorSpace}const Zh={clone:yi,merge:ve};var Kh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mn extends Si{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Kh,this.fragmentShader=Jh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=yi(t.uniforms),this.uniformsGroups=jh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class qo extends le{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Qt,this.projectionMatrix=new Qt,this.projectionMatrixInverse=new Qt,this.coordinateSystem=tn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Sn=new N,jo=new It,Zo=new It;class Ie extends qo{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Bi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(li*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Bi*2*Math.atan(Math.tan(li*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Sn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Sn.x,Sn.y).multiplyScalar(-t/Sn.z),Sn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Sn.x,Sn.y).multiplyScalar(-t/Sn.z)}getViewSize(t,e){return this.getViewBounds(t,jo,Zo),e.subVectors(Zo,jo)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(li*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const bi=-90,Ti=1;class Qh extends le{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ie(bi,Ti,t,e);s.layers=this.layers,this.add(s);const r=new Ie(bi,Ti,t,e);r.layers=this.layers,this.add(r);const a=new Ie(bi,Ti,t,e);a.layers=this.layers,this.add(a);const o=new Ie(bi,Ti,t,e);o.layers=this.layers,this.add(o);const l=new Ie(bi,Ti,t,e);l.layers=this.layers,this.add(l);const c=new Ie(bi,Ti,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===tn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===fs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,d=t.getRenderTarget(),m=t.getActiveCubeFace(),g=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,m,g),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class Ko extends Ee{constructor(t,e,n,s,r,a,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:ei,super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class td extends Ln{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Ko(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Xe}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ye(5,5,5),r=new Mn({name:"CubemapFromEquirect",uniforms:yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Se,blending:un});r.uniforms.tEquirect.value=e;const a=new ce(s,r),o=e.minFilter;return e.minFilter===Cn&&(e.minFilter=Xe),new Qh(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const va=new N,ed=new N,nd=new Nt;class En{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=va.subVectors(n,e).cross(ed.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(va),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||nd.getNormalMatrix(t),s=this.coplanarPoint(va).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zn=new xs,Is=new N;class Ma{constructor(t=new En,e=new En,n=new En,s=new En,r=new En,a=new En){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=tn){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],d=s[6],m=s[7],g=s[8],x=s[9],v=s[10],_=s[11],f=s[12],w=s[13],T=s[14],M=s[15];if(n[0].setComponents(l-r,m-c,_-g,M-f).normalize(),n[1].setComponents(l+r,m+c,_+g,M+f).normalize(),n[2].setComponents(l+a,m+h,_+x,M+w).normalize(),n[3].setComponents(l-a,m-h,_-x,M-w).normalize(),n[4].setComponents(l-o,m-d,_-v,M-T).normalize(),e===tn)n[5].setComponents(l+o,m+d,_+v,M+T).normalize();else if(e===fs)n[5].setComponents(o,d,v,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),zn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),zn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(zn)}intersectsSprite(t){return zn.center.set(0,0,0),zn.radius=.7071067811865476,zn.applyMatrix4(t.matrixWorld),this.intersectsSphere(zn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Is.x=s.normal.x>0?t.max.x:t.min.x,Is.y=s.normal.y>0?t.max.y:t.min.y,Is.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Is)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Jo(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function id(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,d=c.byteLength,m=i.createBuffer();i.bindBuffer(l,m),i.bufferData(l,c,h),o.onUploadCallback();let g;if(c instanceof Float32Array)g=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?g=i.HALF_FLOAT:g=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=i.SHORT;else if(c instanceof Uint32Array)g=i.UNSIGNED_INT;else if(c instanceof Int32Array)g=i.INT;else if(c instanceof Int8Array)g=i.BYTE;else if(c instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:m,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((g,x)=>g.start-x.start);let m=0;for(let g=1;g<d.length;g++){const x=d[m],v=d[g];v.start<=x.start+x.count+1?x.count=Math.max(x.count,v.start+v.count-x.start):(++m,d[m]=v)}d.length=m+1;for(let g=0,x=d.length;g<x;g++){const v=d[g];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class Bn extends Ge{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=t/o,m=e/l,g=[],x=[],v=[],_=[];for(let f=0;f<h;f++){const w=f*m-a;for(let T=0;T<c;T++){const M=T*d-r;x.push(M,-w,0),v.push(0,0,1),_.push(T/o),_.push(1-f/l)}}for(let f=0;f<l;f++)for(let w=0;w<o;w++){const T=w+c*f,M=w+c*(f+1),H=w+1+c*(f+1),R=w+1+c*f;g.push(T,M,R),g.push(M,H,R)}this.setIndex(g),this.setAttribute("position",new De(x,3)),this.setAttribute("normal",new De(v,3)),this.setAttribute("uv",new De(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bn(t.width,t.height,t.widthSegments,t.heightSegments)}}var sd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,rd=`#ifdef USE_ALPHAHASH
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
#endif`,ad=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,od=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ld=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,cd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hd=`#ifdef USE_AOMAP
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
#endif`,dd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ud=`#ifdef USE_BATCHING
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
#endif`,fd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,pd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,md=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,_d=`#ifdef USE_IRIDESCENCE
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
#endif`,xd=`#ifdef USE_BUMPMAP
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
#endif`,vd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Md=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ed=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,bd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Td=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,wd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ad=`#define PI 3.141592653589793
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
} // validated`,Rd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Cd=`vec3 transformedNormal = objectNormal;
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
#endif`,Pd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Dd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ld=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Id=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ud="gl_FragColor = linearToOutputTexel( gl_FragColor );",Nd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Fd=`#ifdef USE_ENVMAP
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
#endif`,Od=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,zd=`#ifdef USE_ENVMAP
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
#endif`,Bd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,kd=`#ifdef USE_ENVMAP
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
#endif`,Hd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xd=`#ifdef USE_GRADIENTMAP
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
}`,$d=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Yd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,jd=`uniform bool receiveShadow;
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
#endif`,Zd=`#ifdef USE_ENVMAP
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
#endif`,Kd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,tu=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,eu=`PhysicalMaterial material;
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
#endif`,nu=`struct PhysicalMaterial {
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
}`,iu=`
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
#endif`,su=`#if defined( RE_IndirectDiffuse )
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
#endif`,ru=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,au=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ou=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lu=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cu=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,du=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,fu=`#if defined( USE_POINTS_UV )
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
#endif`,pu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_u=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vu=`#ifdef USE_MORPHTARGETS
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
#endif`,Mu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Su=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Eu=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,yu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wu=`#ifdef USE_NORMALMAP
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
#endif`,Au=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ru=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Cu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Pu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Du=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Lu=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Iu=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Uu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Nu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Fu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ou=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,zu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bu=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ku=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Hu=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Gu=`float getShadowMask() {
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
}`,Vu=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Wu=`#ifdef USE_SKINNING
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
#endif`,Xu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$u=`#ifdef USE_SKINNING
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
#endif`,Yu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qu=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ju=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zu=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ku=`#ifdef USE_TRANSMISSION
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
#endif`,Ju=`#ifdef USE_TRANSMISSION
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
#endif`,Qu=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ef=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ot={alphahash_fragment:sd,alphahash_pars_fragment:rd,alphamap_fragment:ad,alphamap_pars_fragment:od,alphatest_fragment:ld,alphatest_pars_fragment:cd,aomap_fragment:hd,aomap_pars_fragment:dd,batching_pars_vertex:ud,batching_vertex:fd,begin_vertex:pd,beginnormal_vertex:md,bsdfs:gd,iridescence_fragment:_d,bumpmap_pars_fragment:xd,clipping_planes_fragment:vd,clipping_planes_pars_fragment:Md,clipping_planes_pars_vertex:Sd,clipping_planes_vertex:Ed,color_fragment:yd,color_pars_fragment:bd,color_pars_vertex:Td,color_vertex:wd,common:Ad,cube_uv_reflection_fragment:Rd,defaultnormal_vertex:Cd,displacementmap_pars_vertex:Pd,displacementmap_vertex:Dd,emissivemap_fragment:Ld,emissivemap_pars_fragment:Id,colorspace_fragment:Ud,colorspace_pars_fragment:Nd,envmap_fragment:Fd,envmap_common_pars_fragment:Od,envmap_pars_fragment:zd,envmap_pars_vertex:Bd,envmap_physical_pars_fragment:Zd,envmap_vertex:kd,fog_vertex:Hd,fog_pars_vertex:Gd,fog_fragment:Vd,fog_pars_fragment:Wd,gradientmap_pars_fragment:Xd,lightmap_pars_fragment:$d,lights_lambert_fragment:Yd,lights_lambert_pars_fragment:qd,lights_pars_begin:jd,lights_toon_fragment:Kd,lights_toon_pars_fragment:Jd,lights_phong_fragment:Qd,lights_phong_pars_fragment:tu,lights_physical_fragment:eu,lights_physical_pars_fragment:nu,lights_fragment_begin:iu,lights_fragment_maps:su,lights_fragment_end:ru,logdepthbuf_fragment:au,logdepthbuf_pars_fragment:ou,logdepthbuf_pars_vertex:lu,logdepthbuf_vertex:cu,map_fragment:hu,map_pars_fragment:du,map_particle_fragment:uu,map_particle_pars_fragment:fu,metalnessmap_fragment:pu,metalnessmap_pars_fragment:mu,morphinstance_vertex:gu,morphcolor_vertex:_u,morphnormal_vertex:xu,morphtarget_pars_vertex:vu,morphtarget_vertex:Mu,normal_fragment_begin:Su,normal_fragment_maps:Eu,normal_pars_fragment:yu,normal_pars_vertex:bu,normal_vertex:Tu,normalmap_pars_fragment:wu,clearcoat_normal_fragment_begin:Au,clearcoat_normal_fragment_maps:Ru,clearcoat_pars_fragment:Cu,iridescence_pars_fragment:Pu,opaque_fragment:Du,packing:Lu,premultiplied_alpha_fragment:Iu,project_vertex:Uu,dithering_fragment:Nu,dithering_pars_fragment:Fu,roughnessmap_fragment:Ou,roughnessmap_pars_fragment:zu,shadowmap_pars_fragment:Bu,shadowmap_pars_vertex:ku,shadowmap_vertex:Hu,shadowmask_pars_fragment:Gu,skinbase_vertex:Vu,skinning_pars_vertex:Wu,skinning_vertex:Xu,skinnormal_vertex:$u,specularmap_fragment:Yu,specularmap_pars_fragment:qu,tonemapping_fragment:ju,tonemapping_pars_fragment:Zu,transmission_fragment:Ku,transmission_pars_fragment:Ju,uv_pars_fragment:Qu,uv_pars_vertex:tf,uv_vertex:ef,worldpos_vertex:nf,background_vert:`varying vec2 vUv;
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
}`},lt={common:{diffuse:{value:new kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new It(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new kt(16777215)},opacity:{value:1},center:{value:new It(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},Ye={basic:{uniforms:ve([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.fog]),vertexShader:Ot.meshbasic_vert,fragmentShader:Ot.meshbasic_frag},lambert:{uniforms:ve([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new kt(0)}}]),vertexShader:Ot.meshlambert_vert,fragmentShader:Ot.meshlambert_frag},phong:{uniforms:ve([lt.common,lt.specularmap,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,lt.lights,{emissive:{value:new kt(0)},specular:{value:new kt(1118481)},shininess:{value:30}}]),vertexShader:Ot.meshphong_vert,fragmentShader:Ot.meshphong_frag},standard:{uniforms:ve([lt.common,lt.envmap,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.roughnessmap,lt.metalnessmap,lt.fog,lt.lights,{emissive:{value:new kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag},toon:{uniforms:ve([lt.common,lt.aomap,lt.lightmap,lt.emissivemap,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.gradientmap,lt.fog,lt.lights,{emissive:{value:new kt(0)}}]),vertexShader:Ot.meshtoon_vert,fragmentShader:Ot.meshtoon_frag},matcap:{uniforms:ve([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,lt.fog,{matcap:{value:null}}]),vertexShader:Ot.meshmatcap_vert,fragmentShader:Ot.meshmatcap_frag},points:{uniforms:ve([lt.points,lt.fog]),vertexShader:Ot.points_vert,fragmentShader:Ot.points_frag},dashed:{uniforms:ve([lt.common,lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ot.linedashed_vert,fragmentShader:Ot.linedashed_frag},depth:{uniforms:ve([lt.common,lt.displacementmap]),vertexShader:Ot.depth_vert,fragmentShader:Ot.depth_frag},normal:{uniforms:ve([lt.common,lt.bumpmap,lt.normalmap,lt.displacementmap,{opacity:{value:1}}]),vertexShader:Ot.meshnormal_vert,fragmentShader:Ot.meshnormal_frag},sprite:{uniforms:ve([lt.sprite,lt.fog]),vertexShader:Ot.sprite_vert,fragmentShader:Ot.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ot.background_vert,fragmentShader:Ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:Ot.backgroundCube_vert,fragmentShader:Ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ot.cube_vert,fragmentShader:Ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ot.equirect_vert,fragmentShader:Ot.equirect_frag},distanceRGBA:{uniforms:ve([lt.common,lt.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ot.distanceRGBA_vert,fragmentShader:Ot.distanceRGBA_frag},shadow:{uniforms:ve([lt.lights,lt.fog,{color:{value:new kt(0)},opacity:{value:1}}]),vertexShader:Ot.shadow_vert,fragmentShader:Ot.shadow_frag}};Ye.physical={uniforms:ve([Ye.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new It(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new It},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new kt(0)},specularColor:{value:new kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new It},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:Ot.meshphysical_vert,fragmentShader:Ot.meshphysical_frag};const Us={r:0,b:0,g:0},kn=new $e,sf=new Qt;function rf(i,t,e,n,s,r,a){const o=new kt(0);let l=r===!0?0:1,c,h,d=null,m=0,g=null;function x(w){let T=w.isScene===!0?w.background:null;return T&&T.isTexture&&(T=(w.backgroundBlurriness>0?e:t).get(T)),T}function v(w){let T=!1;const M=x(w);M===null?f(o,l):M&&M.isColor&&(f(M,1),T=!0);const H=i.xr.getEnvironmentBlendMode();H==="additive"?n.buffers.color.setClear(0,0,0,1,a):H==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||T)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(w,T){const M=x(T);M&&(M.isCubeTexture||M.mapping===rs)?(h===void 0&&(h=new ce(new ye(1,1,1),new Mn({name:"BackgroundCubeMaterial",uniforms:yi(Ye.backgroundCube.uniforms),vertexShader:Ye.backgroundCube.vertexShader,fragmentShader:Ye.backgroundCube.fragmentShader,side:Se,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(H,R,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),kn.copy(T.backgroundRotation),kn.x*=-1,kn.y*=-1,kn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(kn.y*=-1,kn.z*=-1),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(sf.makeRotationFromEuler(kn)),h.material.toneMapped=Wt.getTransfer(M.colorSpace)!==Zt,(d!==M||m!==M.version||g!==i.toneMapping)&&(h.material.needsUpdate=!0,d=M,m=M.version,g=i.toneMapping),h.layers.enableAll(),w.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new ce(new Bn(2,2),new Mn({name:"BackgroundMaterial",uniforms:yi(Ye.background.uniforms),vertexShader:Ye.background.vertexShader,fragmentShader:Ye.background.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=Wt.getTransfer(M.colorSpace)!==Zt,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||m!==M.version||g!==i.toneMapping)&&(c.material.needsUpdate=!0,d=M,m=M.version,g=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function f(w,T){w.getRGB(Us,Yo(i)),n.buffers.color.setClear(Us.r,Us.g,Us.b,T,a)}return{getClearColor:function(){return o},setClearColor:function(w,T=1){o.set(w),l=T,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,f(o,l)},render:v,addToRenderList:_}}function af(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=m(null);let r=s,a=!1;function o(E,D,$,X,K){let tt=!1;const Z=d(X,$,D);r!==Z&&(r=Z,c(r.object)),tt=g(E,X,$,K),tt&&x(E,X,$,K),K!==null&&t.update(K,i.ELEMENT_ARRAY_BUFFER),(tt||a)&&(a=!1,M(E,D,$,X),K!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(K).buffer))}function l(){return i.createVertexArray()}function c(E){return i.bindVertexArray(E)}function h(E){return i.deleteVertexArray(E)}function d(E,D,$){const X=$.wireframe===!0;let K=n[E.id];K===void 0&&(K={},n[E.id]=K);let tt=K[D.id];tt===void 0&&(tt={},K[D.id]=tt);let Z=tt[X];return Z===void 0&&(Z=m(l()),tt[X]=Z),Z}function m(E){const D=[],$=[],X=[];for(let K=0;K<e;K++)D[K]=0,$[K]=0,X[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:$,attributeDivisors:X,object:E,attributes:{},index:null}}function g(E,D,$,X){const K=r.attributes,tt=D.attributes;let Z=0;const it=$.getAttributes();for(const Y in it)if(it[Y].location>=0){const pt=K[Y];let St=tt[Y];if(St===void 0&&(Y==="instanceMatrix"&&E.instanceMatrix&&(St=E.instanceMatrix),Y==="instanceColor"&&E.instanceColor&&(St=E.instanceColor)),pt===void 0||pt.attribute!==St||St&&pt.data!==St.data)return!0;Z++}return r.attributesNum!==Z||r.index!==X}function x(E,D,$,X){const K={},tt=D.attributes;let Z=0;const it=$.getAttributes();for(const Y in it)if(it[Y].location>=0){let pt=tt[Y];pt===void 0&&(Y==="instanceMatrix"&&E.instanceMatrix&&(pt=E.instanceMatrix),Y==="instanceColor"&&E.instanceColor&&(pt=E.instanceColor));const St={};St.attribute=pt,pt&&pt.data&&(St.data=pt.data),K[Y]=St,Z++}r.attributes=K,r.attributesNum=Z,r.index=X}function v(){const E=r.newAttributes;for(let D=0,$=E.length;D<$;D++)E[D]=0}function _(E){f(E,0)}function f(E,D){const $=r.newAttributes,X=r.enabledAttributes,K=r.attributeDivisors;$[E]=1,X[E]===0&&(i.enableVertexAttribArray(E),X[E]=1),K[E]!==D&&(i.vertexAttribDivisor(E,D),K[E]=D)}function w(){const E=r.newAttributes,D=r.enabledAttributes;for(let $=0,X=D.length;$<X;$++)D[$]!==E[$]&&(i.disableVertexAttribArray($),D[$]=0)}function T(E,D,$,X,K,tt,Z){Z===!0?i.vertexAttribIPointer(E,D,$,K,tt):i.vertexAttribPointer(E,D,$,X,K,tt)}function M(E,D,$,X){v();const K=X.attributes,tt=$.getAttributes(),Z=D.defaultAttributeValues;for(const it in tt){const Y=tt[it];if(Y.location>=0){let ct=K[it];if(ct===void 0&&(it==="instanceMatrix"&&E.instanceMatrix&&(ct=E.instanceMatrix),it==="instanceColor"&&E.instanceColor&&(ct=E.instanceColor)),ct!==void 0){const pt=ct.normalized,St=ct.itemSize,bt=t.get(ct);if(bt===void 0)continue;const Ht=bt.buffer,j=bt.type,st=bt.bytesPerElement,_t=j===i.INT||j===i.UNSIGNED_INT||ct.gpuType===vr;if(ct.isInterleavedBufferAttribute){const ht=ct.data,wt=ht.stride,Pt=ct.offset;if(ht.isInstancedInterleavedBuffer){for(let Ut=0;Ut<Y.locationSize;Ut++)f(Y.location+Ut,ht.meshPerAttribute);E.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let Ut=0;Ut<Y.locationSize;Ut++)_(Y.location+Ut);i.bindBuffer(i.ARRAY_BUFFER,Ht);for(let Ut=0;Ut<Y.locationSize;Ut++)T(Y.location+Ut,St/Y.locationSize,j,pt,wt*st,(Pt+St/Y.locationSize*Ut)*st,_t)}else{if(ct.isInstancedBufferAttribute){for(let ht=0;ht<Y.locationSize;ht++)f(Y.location+ht,ct.meshPerAttribute);E.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let ht=0;ht<Y.locationSize;ht++)_(Y.location+ht);i.bindBuffer(i.ARRAY_BUFFER,Ht);for(let ht=0;ht<Y.locationSize;ht++)T(Y.location+ht,St/Y.locationSize,j,pt,St*st,St/Y.locationSize*ht*st,_t)}}else if(Z!==void 0){const pt=Z[it];if(pt!==void 0)switch(pt.length){case 2:i.vertexAttrib2fv(Y.location,pt);break;case 3:i.vertexAttrib3fv(Y.location,pt);break;case 4:i.vertexAttrib4fv(Y.location,pt);break;default:i.vertexAttrib1fv(Y.location,pt)}}}}w()}function H(){I();for(const E in n){const D=n[E];for(const $ in D){const X=D[$];for(const K in X)h(X[K].object),delete X[K];delete D[$]}delete n[E]}}function R(E){if(n[E.id]===void 0)return;const D=n[E.id];for(const $ in D){const X=D[$];for(const K in X)h(X[K].object),delete X[K];delete D[$]}delete n[E.id]}function P(E){for(const D in n){const $=n[D];if($[E.id]===void 0)continue;const X=$[E.id];for(const K in X)h(X[K].object),delete X[K];delete $[E.id]}}function I(){b(),a=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:I,resetDefaultState:b,dispose:H,releaseStatesOfGeometry:R,releaseStatesOfProgram:P,initAttributes:v,enableAttribute:_,disableUnusedAttributes:w}}function of(i,t,e){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function a(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function o(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let g=0;for(let x=0;x<d;x++)g+=h[x];e.update(g,n,1)}function l(c,h,d,m){if(d===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let x=0;x<c.length;x++)a(c[x],h[x],m[x]);else{g.multiDrawArraysInstancedWEBGL(n,c,0,h,0,m,0,d);let x=0;for(let v=0;v<d;v++)x+=h[v]*m[v];e.update(x,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function lf(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==Oe&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const I=P===zi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==Je&&n.convert(P)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Qe&&!I)}function l(P){if(P==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,m=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),g=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),H=x>0,R=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:m,maxTextures:g,maxVertexTextures:x,maxTextureSize:v,maxCubemapSize:_,maxAttributes:f,maxVertexUniforms:w,maxVaryings:T,maxFragmentUniforms:M,vertexTextures:H,maxSamples:R}}function cf(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new En,o=new Nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,m){const g=d.length!==0||m||n!==0||s;return s=m,n=d.length,g},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,m){e=h(d,m,0)},this.setState=function(d,m,g){const x=d.clippingPlanes,v=d.clipIntersection,_=d.clipShadows,f=i.get(d);if(!s||x===null||x.length===0||r&&!_)r?h(null):c();else{const w=r?0:n,T=w*4;let M=f.clippingState||null;l.value=M,M=h(x,m,T,g);for(let H=0;H!==T;++H)M[H]=e[H];f.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,m,g,x){const v=d!==null?d.length:0;let _=null;if(v!==0){if(_=l.value,x!==!0||_===null){const f=g+v*4,w=m.matrixWorldInverse;o.getNormalMatrix(w),(_===null||_.length<f)&&(_=new Float32Array(f));for(let T=0,M=g;T!==v;++T,M+=4)a.copy(d[T]).applyMatrix4(w,o),a.normal.toArray(_,M),_[M+3]=a.constant}l.value=_,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,_}}function hf(i){let t=new WeakMap;function e(a,o){return o===pr?a.mapping=ei:o===mr&&(a.mapping=ni),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===pr||o===mr)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new td(l.height);return c.fromEquirectangularTexture(i,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Qo extends qo{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const wi=4,tl=[.125,.215,.35,.446,.526,.582],Hn=20,Sa=new Qo,el=new kt;let Ea=null,ya=0,ba=0,Ta=!1;const Gn=(1+Math.sqrt(5))/2,Ai=1/Gn,nl=[new N(-Gn,Ai,0),new N(Gn,Ai,0),new N(-Ai,0,Gn),new N(Ai,0,Gn),new N(0,Gn,-Ai),new N(0,Gn,Ai),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class il{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Ea=this._renderer.getRenderTarget(),ya=this._renderer.getActiveCubeFace(),ba=this._renderer.getActiveMipmapLevel(),Ta=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=al(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ea,ya,ba),this._renderer.xr.enabled=Ta,t.scissorTest=!1,Ns(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ei||t.mapping===ni?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ea=this._renderer.getRenderTarget(),ya=this._renderer.getActiveCubeFace(),ba=this._renderer.getActiveMipmapLevel(),Ta=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Xe,minFilter:Xe,generateMipmaps:!1,type:zi,format:Oe,colorSpace:ai,depthBuffer:!1},s=sl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=df(r)),this._blurMaterial=uf(r,t,e)}return s}_compileMaterial(t){const e=new ce(this._lodPlanes[0],t);this._renderer.compile(e,Sa)}_sceneToCubeUV(t,e,n,s){const o=new Ie(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,m=h.toneMapping;h.getClearColor(el),h.toneMapping=fn,h.autoClear=!1;const g=new ga({name:"PMREM.Background",side:Se,depthWrite:!1,depthTest:!1}),x=new ce(new ye,g);let v=!1;const _=t.background;_?_.isColor&&(g.color.copy(_),t.background=null,v=!0):(g.color.copy(el),v=!0);for(let f=0;f<6;f++){const w=f%3;w===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):w===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));const T=this._cubeSize;Ns(s,w*T,f>2?T:0,T,T),h.setRenderTarget(s),v&&h.render(x,o),h.render(t,o)}x.geometry.dispose(),x.material.dispose(),h.toneMapping=m,h.autoClear=d,t.background=_}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===ei||t.mapping===ni;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=al()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rl());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new ce(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Ns(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,Sa)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=nl[(s-r-1)%nl.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new ce(this._lodPlanes[s],c),m=c.uniforms,g=this._sizeLods[n]-1,x=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*Hn-1),v=r/x,_=isFinite(r)?1+Math.floor(h*v):Hn;_>Hn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${Hn}`);const f=[];let w=0;for(let P=0;P<Hn;++P){const I=P/v,b=Math.exp(-I*I/2);f.push(b),P===0?w+=b:P<_&&(w+=2*b)}for(let P=0;P<f.length;P++)f[P]=f[P]/w;m.envMap.value=t.texture,m.samples.value=_,m.weights.value=f,m.latitudinal.value=a==="latitudinal",o&&(m.poleAxis.value=o);const{_lodMax:T}=this;m.dTheta.value=x,m.mipInt.value=T-n;const M=this._sizeLods[s],H=3*M*(s>T-wi?s-T+wi:0),R=4*(this._cubeSize-M);Ns(e,H,R,3*M,2*M),l.setRenderTarget(e),l.render(d,Sa)}}function df(i){const t=[],e=[],n=[];let s=i;const r=i-wi+1+tl.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>i-wi?l=tl[a-i+wi-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,m=[h,h,d,h,d,d,h,h,d,d,h,d],g=6,x=6,v=3,_=2,f=1,w=new Float32Array(v*x*g),T=new Float32Array(_*x*g),M=new Float32Array(f*x*g);for(let R=0;R<g;R++){const P=R%3*2/3-1,I=R>2?0:-1,b=[P,I,0,P+2/3,I,0,P+2/3,I+1,0,P,I,0,P+2/3,I+1,0,P,I+1,0];w.set(b,v*x*R),T.set(m,_*x*R);const E=[R,R,R,R,R,R];M.set(E,f*x*R)}const H=new Ge;H.setAttribute("position",new He(w,v)),H.setAttribute("uv",new He(T,_)),H.setAttribute("faceIndex",new He(M,f)),t.push(H),s>wi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function sl(i,t,e){const n=new Ln(i,t,e);return n.texture.mapping=rs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ns(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function uf(i,t,e){const n=new Float32Array(Hn),s=new N(0,1,0);return new Mn({name:"SphericalGaussianBlur",defines:{n:Hn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:wa(),fragmentShader:`

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
		`,blending:un,depthTest:!1,depthWrite:!1})}function rl(){return new Mn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wa(),fragmentShader:`

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
		`,blending:un,depthTest:!1,depthWrite:!1})}function al(){return new Mn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:un,depthTest:!1,depthWrite:!1})}function wa(){return`

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
	`}function ff(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===pr||l===mr,h=l===ei||l===ni;if(c||h){let d=t.get(o);const m=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==m)return e===null&&(e=new il(i)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const g=o.image;return c&&g&&g.height>0||h&&g&&s(g)?(e===null&&(e=new il(i)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function pf(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Hi("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function mf(i,t,e,n){const s={},r=new WeakMap;function a(d){const m=d.target;m.index!==null&&t.remove(m.index);for(const x in m.attributes)t.remove(m.attributes[x]);for(const x in m.morphAttributes){const v=m.morphAttributes[x];for(let _=0,f=v.length;_<f;_++)t.remove(v[_])}m.removeEventListener("dispose",a),delete s[m.id];const g=r.get(m);g&&(t.remove(g),r.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,e.memory.geometries--}function o(d,m){return s[m.id]===!0||(m.addEventListener("dispose",a),s[m.id]=!0,e.memory.geometries++),m}function l(d){const m=d.attributes;for(const x in m)t.update(m[x],i.ARRAY_BUFFER);const g=d.morphAttributes;for(const x in g){const v=g[x];for(let _=0,f=v.length;_<f;_++)t.update(v[_],i.ARRAY_BUFFER)}}function c(d){const m=[],g=d.index,x=d.attributes.position;let v=0;if(g!==null){const w=g.array;v=g.version;for(let T=0,M=w.length;T<M;T+=3){const H=w[T+0],R=w[T+1],P=w[T+2];m.push(H,R,R,P,P,H)}}else if(x!==void 0){const w=x.array;v=x.version;for(let T=0,M=w.length/3-1;T<M;T+=3){const H=T+0,R=T+1,P=T+2;m.push(H,R,R,P,P,H)}}else return;const _=new(yo(m)?Vo:Go)(m,1);_.version=v;const f=r.get(d);f&&t.remove(f),r.set(d,_)}function h(d){const m=r.get(d);if(m){const g=d.index;g!==null&&m.version<g.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function gf(i,t,e){let n;function s(m){n=m}let r,a;function o(m){r=m.type,a=m.bytesPerElement}function l(m,g){i.drawElements(n,g,r,m*a),e.update(g,n,1)}function c(m,g,x){x!==0&&(i.drawElementsInstanced(n,g,r,m*a,x),e.update(g,n,x))}function h(m,g,x){if(x===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,g,0,r,m,0,x);let _=0;for(let f=0;f<x;f++)_+=g[f];e.update(_,n,1)}function d(m,g,x,v){if(x===0)return;const _=t.get("WEBGL_multi_draw");if(_===null)for(let f=0;f<m.length;f++)c(m[f]/a,g[f],v[f]);else{_.multiDrawElementsInstancedWEBGL(n,g,0,r,m,0,v,0,x);let f=0;for(let w=0;w<x;w++)f+=g[w]*v[w];e.update(f,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function _f(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function xf(i,t,e){const n=new WeakMap,s=new re;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let m=n.get(o);if(m===void 0||m.count!==d){let b=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",b)};m!==void 0&&m.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,_=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let T=0;g===!0&&(T=1),x===!0&&(T=2),v===!0&&(T=3);let M=o.attributes.position.count*T,H=1;M>t.maxTextureSize&&(H=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);const R=new Float32Array(M*H*4*d),P=new Do(R,M,H,d);P.type=Qe,P.needsUpdate=!0;const I=T*4;for(let E=0;E<d;E++){const D=_[E],$=f[E],X=w[E],K=M*H*4*E;for(let tt=0;tt<D.count;tt++){const Z=tt*I;g===!0&&(s.fromBufferAttribute(D,tt),R[K+Z+0]=s.x,R[K+Z+1]=s.y,R[K+Z+2]=s.z,R[K+Z+3]=0),x===!0&&(s.fromBufferAttribute($,tt),R[K+Z+4]=s.x,R[K+Z+5]=s.y,R[K+Z+6]=s.z,R[K+Z+7]=0),v===!0&&(s.fromBufferAttribute(X,tt),R[K+Z+8]=s.x,R[K+Z+9]=s.y,R[K+Z+10]=s.z,R[K+Z+11]=X.itemSize===4?s.w:1)}}m={count:d,texture:P,size:new It(M,H)},n.set(o,m),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let g=0;for(let v=0;v<c.length;v++)g+=c[v];const x=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",m.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",m.size)}return{update:r}}function vf(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const m=l.skeleton;s.get(m)!==c&&(m.update(),s.set(m,c))}return d}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}class ol extends Ee{constructor(t,e,n,s,r,a,o,l,c,h=si){if(h!==si&&h!==ri)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===si&&(n=Pn),n===void 0&&h===ri&&(n=ii),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Fe,this.minFilter=l!==void 0?l:Fe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const ll=new Ee,cl=new ol(1,1),hl=new Do,dl=new zh,ul=new Ko,fl=[],pl=[],ml=new Float32Array(16),gl=new Float32Array(9),_l=new Float32Array(4);function Ri(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=fl[s];if(r===void 0&&(r=new Float32Array(s),fl[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function he(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function de(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Fs(i,t){let e=pl[t];e===void 0&&(e=new Int32Array(t),pl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Mf(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Sf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(he(e,t))return;i.uniform2fv(this.addr,t),de(e,t)}}function Ef(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(he(e,t))return;i.uniform3fv(this.addr,t),de(e,t)}}function yf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(he(e,t))return;i.uniform4fv(this.addr,t),de(e,t)}}function bf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(he(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),de(e,t)}else{if(he(e,n))return;_l.set(n),i.uniformMatrix2fv(this.addr,!1,_l),de(e,n)}}function Tf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(he(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),de(e,t)}else{if(he(e,n))return;gl.set(n),i.uniformMatrix3fv(this.addr,!1,gl),de(e,n)}}function wf(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(he(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),de(e,t)}else{if(he(e,n))return;ml.set(n),i.uniformMatrix4fv(this.addr,!1,ml),de(e,n)}}function Af(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Rf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(he(e,t))return;i.uniform2iv(this.addr,t),de(e,t)}}function Cf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(he(e,t))return;i.uniform3iv(this.addr,t),de(e,t)}}function Pf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(he(e,t))return;i.uniform4iv(this.addr,t),de(e,t)}}function Df(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Lf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(he(e,t))return;i.uniform2uiv(this.addr,t),de(e,t)}}function If(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(he(e,t))return;i.uniform3uiv(this.addr,t),de(e,t)}}function Uf(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(he(e,t))return;i.uniform4uiv(this.addr,t),de(e,t)}}function Nf(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(cl.compareFunction=xo,r=cl):r=ll,e.setTexture2D(t||r,s)}function Ff(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||dl,s)}function Of(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||ul,s)}function zf(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||hl,s)}function Bf(i){switch(i){case 5126:return Mf;case 35664:return Sf;case 35665:return Ef;case 35666:return yf;case 35674:return bf;case 35675:return Tf;case 35676:return wf;case 5124:case 35670:return Af;case 35667:case 35671:return Rf;case 35668:case 35672:return Cf;case 35669:case 35673:return Pf;case 5125:return Df;case 36294:return Lf;case 36295:return If;case 36296:return Uf;case 35678:case 36198:case 36298:case 36306:case 35682:return Nf;case 35679:case 36299:case 36307:return Ff;case 35680:case 36300:case 36308:case 36293:return Of;case 36289:case 36303:case 36311:case 36292:return zf}}function kf(i,t){i.uniform1fv(this.addr,t)}function Hf(i,t){const e=Ri(t,this.size,2);i.uniform2fv(this.addr,e)}function Gf(i,t){const e=Ri(t,this.size,3);i.uniform3fv(this.addr,e)}function Vf(i,t){const e=Ri(t,this.size,4);i.uniform4fv(this.addr,e)}function Wf(i,t){const e=Ri(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Xf(i,t){const e=Ri(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function $f(i,t){const e=Ri(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Yf(i,t){i.uniform1iv(this.addr,t)}function qf(i,t){i.uniform2iv(this.addr,t)}function jf(i,t){i.uniform3iv(this.addr,t)}function Zf(i,t){i.uniform4iv(this.addr,t)}function Kf(i,t){i.uniform1uiv(this.addr,t)}function Jf(i,t){i.uniform2uiv(this.addr,t)}function Qf(i,t){i.uniform3uiv(this.addr,t)}function tp(i,t){i.uniform4uiv(this.addr,t)}function ep(i,t,e){const n=this.cache,s=t.length,r=Fs(e,s);he(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||ll,r[a])}function np(i,t,e){const n=this.cache,s=t.length,r=Fs(e,s);he(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||dl,r[a])}function ip(i,t,e){const n=this.cache,s=t.length,r=Fs(e,s);he(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||ul,r[a])}function sp(i,t,e){const n=this.cache,s=t.length,r=Fs(e,s);he(n,r)||(i.uniform1iv(this.addr,r),de(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||hl,r[a])}function rp(i){switch(i){case 5126:return kf;case 35664:return Hf;case 35665:return Gf;case 35666:return Vf;case 35674:return Wf;case 35675:return Xf;case 35676:return $f;case 5124:case 35670:return Yf;case 35667:case 35671:return qf;case 35668:case 35672:return jf;case 35669:case 35673:return Zf;case 5125:return Kf;case 36294:return Jf;case 36295:return Qf;case 36296:return tp;case 35678:case 36198:case 36298:case 36306:case 35682:return ep;case 35679:case 36299:case 36307:return np;case 35680:case 36300:case 36308:case 36293:return ip;case 36289:case 36303:case 36311:case 36292:return sp}}class ap{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Bf(e.type)}}class op{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=rp(e.type)}}class lp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const Aa=/(\w+)(\])?(\[|\.)?/g;function xl(i,t){i.seq.push(t),i.map[t.id]=t}function cp(i,t,e){const n=i.name,s=n.length;for(Aa.lastIndex=0;;){const r=Aa.exec(n),a=Aa.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){xl(e,c===void 0?new ap(o,i,t):new op(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new lp(o),xl(e,d)),e=d}}}class Os{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);cp(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function vl(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const hp=37297;let dp=0;function up(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Ml=new Nt;function fp(i){Wt._getMatrix(Ml,Wt.workingColorSpace,i);const t=`mat3( ${Ml.elements.map(e=>e.toFixed(4))} )`;switch(Wt.getTransfer(i)){case us:return[t,"LinearTransferOETF"];case Zt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Sl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+up(i.getShaderSource(t),a)}else return s}function pp(i,t){const e=fp(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function mp(i,t){let e;switch(t){case Zc:e="Linear";break;case Kc:e="Reinhard";break;case Jc:e="Cineon";break;case Qc:e="ACESFilmic";break;case eh:e="AgX";break;case nh:e="Neutral";break;case th:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const zs=new N;function gp(){Wt.getLuminanceCoefficients(zs);const i=zs.x.toFixed(4),t=zs.y.toFixed(4),e=zs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _p(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($i).join(`
`)}function xp(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function vp(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function $i(i){return i!==""}function El(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function yl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Mp=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ra(i){return i.replace(Mp,Ep)}const Sp=new Map;function Ep(i,t){let e=Ot[t];if(e===void 0){const n=Sp.get(t);if(n!==void 0)e=Ot[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ra(e)}const yp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bl(i){return i.replace(yp,bp)}function bp(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Tl(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Tp(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ja?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Qa?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ze&&(t="SHADOWMAP_TYPE_VSM"),t}function wp(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ei:case ni:t="ENVMAP_TYPE_CUBE";break;case rs:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Ap(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ni:t="ENVMAP_MODE_REFRACTION";break}return t}function Rp(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case io:t="ENVMAP_BLENDING_MULTIPLY";break;case qc:t="ENVMAP_BLENDING_MIX";break;case jc:t="ENVMAP_BLENDING_ADD";break}return t}function Cp(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Pp(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Tp(e),c=wp(e),h=Ap(e),d=Rp(e),m=Cp(e),g=_p(e),x=xp(r),v=s.createProgram();let _,f,w=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter($i).join(`
`),_.length>0&&(_+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter($i).join(`
`),f.length>0&&(f+=`
`)):(_=[Tl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($i).join(`
`),f=[Tl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==fn?"#define TONE_MAPPING":"",e.toneMapping!==fn?Ot.tonemapping_pars_fragment:"",e.toneMapping!==fn?mp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ot.colorspace_pars_fragment,pp("linearToOutputTexel",e.outputColorSpace),gp(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter($i).join(`
`)),a=Ra(a),a=El(a,e),a=yl(a,e),o=Ra(o),o=El(o,e),o=yl(o,e),a=bl(a),o=bl(o),e.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,_=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,f=["#define varying in",e.glslVersion===Mo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Mo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const T=w+_+a,M=w+f+o,H=vl(s,s.VERTEX_SHADER,T),R=vl(s,s.FRAGMENT_SHADER,M);s.attachShader(v,H),s.attachShader(v,R),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function P(D){if(i.debug.checkShaderErrors){const $=s.getProgramInfoLog(v).trim(),X=s.getShaderInfoLog(H).trim(),K=s.getShaderInfoLog(R).trim();let tt=!0,Z=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(tt=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,H,R);else{const it=Sl(s,H,"vertex"),Y=Sl(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+$+`
`+it+`
`+Y)}else $!==""?console.warn("THREE.WebGLProgram: Program Info Log:",$):(X===""||K==="")&&(Z=!1);Z&&(D.diagnostics={runnable:tt,programLog:$,vertexShader:{log:X,prefix:_},fragmentShader:{log:K,prefix:f}})}s.deleteShader(H),s.deleteShader(R),I=new Os(s,v),b=vp(s,v)}let I;this.getUniforms=function(){return I===void 0&&P(this),I};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(v,hp)),E},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=dp++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=H,this.fragmentShader=R,this}let Dp=0;class Lp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Ip(t),e.set(t,n)),n}}class Ip{constructor(t){this.id=Dp++,this.code=t,this.usedTimes=0}}function Up(i,t,e,n,s,r,a){const o=new aa,l=new Lp,c=new Set,h=[],d=s.logarithmicDepthBuffer,m=s.vertexTextures;let g=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return c.add(b),b===0?"uv":`uv${b}`}function _(b,E,D,$,X){const K=$.fog,tt=X.geometry,Z=b.isMeshStandardMaterial?$.environment:null,it=(b.isMeshStandardMaterial?e:t).get(b.envMap||Z),Y=it&&it.mapping===rs?it.image.height:null,ct=x[b.type];b.precision!==null&&(g=s.getMaxPrecision(b.precision),g!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",g,"instead."));const pt=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,St=pt!==void 0?pt.length:0;let bt=0;tt.morphAttributes.position!==void 0&&(bt=1),tt.morphAttributes.normal!==void 0&&(bt=2),tt.morphAttributes.color!==void 0&&(bt=3);let Ht,j,st,_t;if(ct){const jt=Ye[ct];Ht=jt.vertexShader,j=jt.fragmentShader}else Ht=b.vertexShader,j=b.fragmentShader,l.update(b),st=l.getVertexShaderID(b),_t=l.getFragmentShaderID(b);const ht=i.getRenderTarget(),wt=i.state.buffers.depth.getReversed(),Pt=X.isInstancedMesh===!0,Ut=X.isBatchedMesh===!0,ne=!!b.map,Gt=!!b.matcap,te=!!it,F=!!b.aoMap,Me=!!b.lightMap,zt=!!b.bumpMap,Bt=!!b.normalMap,At=!!b.displacementMap,Jt=!!b.emissiveMap,Tt=!!b.metalnessMap,p=!!b.roughnessMap,u=b.anisotropy>0,y=b.clearcoat>0,A=b.dispersion>0,C=b.iridescence>0,z=b.sheen>0,G=b.transmission>0,k=u&&!!b.anisotropyMap,et=y&&!!b.clearcoatMap,ut=y&&!!b.clearcoatNormalMap,Q=y&&!!b.clearcoatRoughnessMap,dt=C&&!!b.iridescenceMap,mt=C&&!!b.iridescenceThicknessMap,gt=z&&!!b.sheenColorMap,ot=z&&!!b.sheenRoughnessMap,Rt=!!b.specularMap,Dt=!!b.specularColorMap,Xt=!!b.specularIntensityMap,L=G&&!!b.transmissionMap,J=G&&!!b.thicknessMap,B=!!b.gradientMap,q=!!b.alphaMap,nt=b.alphaTest>0,rt=!!b.alphaHash,Ct=!!b.extensions;let ae=fn;b.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(ae=i.toneMapping);const _e={shaderID:ct,shaderType:b.type,shaderName:b.name,vertexShader:Ht,fragmentShader:j,defines:b.defines,customVertexShaderID:st,customFragmentShaderID:_t,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:g,batching:Ut,batchingColor:Ut&&X._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&X.instanceColor!==null,instancingMorph:Pt&&X.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:ht===null?i.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:ai,alphaToCoverage:!!b.alphaToCoverage,map:ne,matcap:Gt,envMap:te,envMapMode:te&&it.mapping,envMapCubeUVHeight:Y,aoMap:F,lightMap:Me,bumpMap:zt,normalMap:Bt,displacementMap:m&&At,emissiveMap:Jt,normalMapObjectSpace:Bt&&b.normalMapType===ah,normalMapTangentSpace:Bt&&b.normalMapType===go,metalnessMap:Tt,roughnessMap:p,anisotropy:u,anisotropyMap:k,clearcoat:y,clearcoatMap:et,clearcoatNormalMap:ut,clearcoatRoughnessMap:Q,dispersion:A,iridescence:C,iridescenceMap:dt,iridescenceThicknessMap:mt,sheen:z,sheenColorMap:gt,sheenRoughnessMap:ot,specularMap:Rt,specularColorMap:Dt,specularIntensityMap:Xt,transmission:G,transmissionMap:L,thicknessMap:J,gradientMap:B,opaque:b.transparent===!1&&b.blending===Qn&&b.alphaToCoverage===!1,alphaMap:q,alphaTest:nt,alphaHash:rt,combine:b.combine,mapUv:ne&&v(b.map.channel),aoMapUv:F&&v(b.aoMap.channel),lightMapUv:Me&&v(b.lightMap.channel),bumpMapUv:zt&&v(b.bumpMap.channel),normalMapUv:Bt&&v(b.normalMap.channel),displacementMapUv:At&&v(b.displacementMap.channel),emissiveMapUv:Jt&&v(b.emissiveMap.channel),metalnessMapUv:Tt&&v(b.metalnessMap.channel),roughnessMapUv:p&&v(b.roughnessMap.channel),anisotropyMapUv:k&&v(b.anisotropyMap.channel),clearcoatMapUv:et&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:ut&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:dt&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:gt&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:ot&&v(b.sheenRoughnessMap.channel),specularMapUv:Rt&&v(b.specularMap.channel),specularColorMapUv:Dt&&v(b.specularColorMap.channel),specularIntensityMapUv:Xt&&v(b.specularIntensityMap.channel),transmissionMapUv:L&&v(b.transmissionMap.channel),thicknessMapUv:J&&v(b.thicknessMap.channel),alphaMapUv:q&&v(b.alphaMap.channel),vertexTangents:!!tt.attributes.tangent&&(Bt||u),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,pointsUvs:X.isPoints===!0&&!!tt.attributes.uv&&(ne||q),fog:!!K,useFog:b.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:wt,skinning:X.isSkinnedMesh===!0,morphTargets:tt.morphAttributes.position!==void 0,morphNormals:tt.morphAttributes.normal!==void 0,morphColors:tt.morphAttributes.color!==void 0,morphTargetsCount:St,morphTextureStride:bt,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:ae,decodeVideoTexture:ne&&b.map.isVideoTexture===!0&&Wt.getTransfer(b.map.colorSpace)===Zt,decodeVideoTextureEmissive:Jt&&b.emissiveMap.isVideoTexture===!0&&Wt.getTransfer(b.emissiveMap.colorSpace)===Zt,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ke,flipSided:b.side===Se,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ct&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ct&&b.extensions.multiDraw===!0||Ut)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return _e.vertexUv1s=c.has(1),_e.vertexUv2s=c.has(2),_e.vertexUv3s=c.has(3),c.clear(),_e}function f(b){const E=[];if(b.shaderID?E.push(b.shaderID):(E.push(b.customVertexShaderID),E.push(b.customFragmentShaderID)),b.defines!==void 0)for(const D in b.defines)E.push(D),E.push(b.defines[D]);return b.isRawShaderMaterial===!1&&(w(E,b),T(E,b),E.push(i.outputColorSpace)),E.push(b.customProgramCacheKey),E.join()}function w(b,E){b.push(E.precision),b.push(E.outputColorSpace),b.push(E.envMapMode),b.push(E.envMapCubeUVHeight),b.push(E.mapUv),b.push(E.alphaMapUv),b.push(E.lightMapUv),b.push(E.aoMapUv),b.push(E.bumpMapUv),b.push(E.normalMapUv),b.push(E.displacementMapUv),b.push(E.emissiveMapUv),b.push(E.metalnessMapUv),b.push(E.roughnessMapUv),b.push(E.anisotropyMapUv),b.push(E.clearcoatMapUv),b.push(E.clearcoatNormalMapUv),b.push(E.clearcoatRoughnessMapUv),b.push(E.iridescenceMapUv),b.push(E.iridescenceThicknessMapUv),b.push(E.sheenColorMapUv),b.push(E.sheenRoughnessMapUv),b.push(E.specularMapUv),b.push(E.specularColorMapUv),b.push(E.specularIntensityMapUv),b.push(E.transmissionMapUv),b.push(E.thicknessMapUv),b.push(E.combine),b.push(E.fogExp2),b.push(E.sizeAttenuation),b.push(E.morphTargetsCount),b.push(E.morphAttributeCount),b.push(E.numDirLights),b.push(E.numPointLights),b.push(E.numSpotLights),b.push(E.numSpotLightMaps),b.push(E.numHemiLights),b.push(E.numRectAreaLights),b.push(E.numDirLightShadows),b.push(E.numPointLightShadows),b.push(E.numSpotLightShadows),b.push(E.numSpotLightShadowsWithMaps),b.push(E.numLightProbes),b.push(E.shadowMapType),b.push(E.toneMapping),b.push(E.numClippingPlanes),b.push(E.numClipIntersection),b.push(E.depthPacking)}function T(b,E){o.disableAll(),E.supportsVertexTextures&&o.enable(0),E.instancing&&o.enable(1),E.instancingColor&&o.enable(2),E.instancingMorph&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),E.dispersion&&o.enable(20),E.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reverseDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),b.push(o.mask)}function M(b){const E=x[b.type];let D;if(E){const $=Ye[E];D=Zh.clone($.uniforms)}else D=b.uniforms;return D}function H(b,E){let D;for(let $=0,X=h.length;$<X;$++){const K=h[$];if(K.cacheKey===E){D=K,++D.usedTimes;break}}return D===void 0&&(D=new Pp(i,E,b,r),h.push(D)),D}function R(b){if(--b.usedTimes===0){const E=h.indexOf(b);h[E]=h[h.length-1],h.pop(),b.destroy()}}function P(b){l.remove(b)}function I(){l.dispose()}return{getParameters:_,getProgramCacheKey:f,getUniforms:M,acquireProgram:H,releaseProgram:R,releaseShaderCache:P,programs:h,dispose:I}}function Np(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Fp(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function wl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Al(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d,m,g,x,v,_){let f=i[t];return f===void 0?(f={id:d.id,object:d,geometry:m,material:g,groupOrder:x,renderOrder:d.renderOrder,z:v,group:_},i[t]=f):(f.id=d.id,f.object=d,f.geometry=m,f.material=g,f.groupOrder=x,f.renderOrder=d.renderOrder,f.z=v,f.group=_),t++,f}function o(d,m,g,x,v,_){const f=a(d,m,g,x,v,_);g.transmission>0?n.push(f):g.transparent===!0?s.push(f):e.push(f)}function l(d,m,g,x,v,_){const f=a(d,m,g,x,v,_);g.transmission>0?n.unshift(f):g.transparent===!0?s.unshift(f):e.unshift(f)}function c(d,m){e.length>1&&e.sort(d||Fp),n.length>1&&n.sort(m||wl),s.length>1&&s.sort(m||wl)}function h(){for(let d=t,m=i.length;d<m;d++){const g=i[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function Op(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new Al,i.set(n,[a])):s>=r.length?(a=new Al,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function zp(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new kt};break;case"SpotLight":e={position:new N,direction:new N,color:new kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new kt,groundColor:new kt};break;case"RectAreaLight":e={color:new kt,position:new N,halfWidth:new N,halfHeight:new N};break}return i[t.id]=e,e}}}function Bp(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new It,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let kp=0;function Hp(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Gp(i){const t=new zp,e=Bp(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new N);const s=new N,r=new Qt,a=new Qt;function o(c){let h=0,d=0,m=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let g=0,x=0,v=0,_=0,f=0,w=0,T=0,M=0,H=0,R=0,P=0;c.sort(Hp);for(let b=0,E=c.length;b<E;b++){const D=c[b],$=D.color,X=D.intensity,K=D.distance,tt=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=$.r*X,d+=$.g*X,m+=$.b*X;else if(D.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(D.sh.coefficients[Z],X);P++}else if(D.isDirectionalLight){const Z=t.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const it=D.shadow,Y=e.get(D);Y.shadowIntensity=it.intensity,Y.shadowBias=it.bias,Y.shadowNormalBias=it.normalBias,Y.shadowRadius=it.radius,Y.shadowMapSize=it.mapSize,n.directionalShadow[g]=Y,n.directionalShadowMap[g]=tt,n.directionalShadowMatrix[g]=D.shadow.matrix,w++}n.directional[g]=Z,g++}else if(D.isSpotLight){const Z=t.get(D);Z.position.setFromMatrixPosition(D.matrixWorld),Z.color.copy($).multiplyScalar(X),Z.distance=K,Z.coneCos=Math.cos(D.angle),Z.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Z.decay=D.decay,n.spot[v]=Z;const it=D.shadow;if(D.map&&(n.spotLightMap[H]=D.map,H++,it.updateMatrices(D),D.castShadow&&R++),n.spotLightMatrix[v]=it.matrix,D.castShadow){const Y=e.get(D);Y.shadowIntensity=it.intensity,Y.shadowBias=it.bias,Y.shadowNormalBias=it.normalBias,Y.shadowRadius=it.radius,Y.shadowMapSize=it.mapSize,n.spotShadow[v]=Y,n.spotShadowMap[v]=tt,M++}v++}else if(D.isRectAreaLight){const Z=t.get(D);Z.color.copy($).multiplyScalar(X),Z.halfWidth.set(D.width*.5,0,0),Z.halfHeight.set(0,D.height*.5,0),n.rectArea[_]=Z,_++}else if(D.isPointLight){const Z=t.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity),Z.distance=D.distance,Z.decay=D.decay,D.castShadow){const it=D.shadow,Y=e.get(D);Y.shadowIntensity=it.intensity,Y.shadowBias=it.bias,Y.shadowNormalBias=it.normalBias,Y.shadowRadius=it.radius,Y.shadowMapSize=it.mapSize,Y.shadowCameraNear=it.camera.near,Y.shadowCameraFar=it.camera.far,n.pointShadow[x]=Y,n.pointShadowMap[x]=tt,n.pointShadowMatrix[x]=D.shadow.matrix,T++}n.point[x]=Z,x++}else if(D.isHemisphereLight){const Z=t.get(D);Z.skyColor.copy(D.color).multiplyScalar(X),Z.groundColor.copy(D.groundColor).multiplyScalar(X),n.hemi[f]=Z,f++}}_>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=lt.LTC_FLOAT_1,n.rectAreaLTC2=lt.LTC_FLOAT_2):(n.rectAreaLTC1=lt.LTC_HALF_1,n.rectAreaLTC2=lt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=m;const I=n.hash;(I.directionalLength!==g||I.pointLength!==x||I.spotLength!==v||I.rectAreaLength!==_||I.hemiLength!==f||I.numDirectionalShadows!==w||I.numPointShadows!==T||I.numSpotShadows!==M||I.numSpotMaps!==H||I.numLightProbes!==P)&&(n.directional.length=g,n.spot.length=v,n.rectArea.length=_,n.point.length=x,n.hemi.length=f,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=M+H-R,n.spotLightMap.length=H,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=P,I.directionalLength=g,I.pointLength=x,I.spotLength=v,I.rectAreaLength=_,I.hemiLength=f,I.numDirectionalShadows=w,I.numPointShadows=T,I.numSpotShadows=M,I.numSpotMaps=H,I.numLightProbes=P,n.version=kp++)}function l(c,h){let d=0,m=0,g=0,x=0,v=0;const _=h.matrixWorldInverse;for(let f=0,w=c.length;f<w;f++){const T=c[f];if(T.isDirectionalLight){const M=n.directional[d];M.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(_),d++}else if(T.isSpotLight){const M=n.spot[g];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(_),M.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(_),g++}else if(T.isRectAreaLight){const M=n.rectArea[x];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(_),a.identity(),r.copy(T.matrixWorld),r.premultiply(_),a.extractRotation(r),M.halfWidth.set(T.width*.5,0,0),M.halfHeight.set(0,T.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),x++}else if(T.isPointLight){const M=n.point[m];M.position.setFromMatrixPosition(T.matrixWorld),M.position.applyMatrix4(_),m++}else if(T.isHemisphereLight){const M=n.hemi[v];M.direction.setFromMatrixPosition(T.matrixWorld),M.direction.transformDirection(_),v++}}}return{setup:o,setupView:l,state:n}}function Rl(i){const t=new Gp(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function a(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function Vp(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Rl(i),t.set(s,[o])):r>=a.length?(o=new Rl(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Wp extends Si{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=sh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Xp extends Si{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const $p=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Yp=`uniform sampler2D shadow_pass;
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
}`;function qp(i,t,e){let n=new Ma;const s=new It,r=new It,a=new re,o=new Wp({depthPacking:rh}),l=new Xp,c={},h=e.maxTextureSize,d={[dn]:Se,[Se]:dn,[Ke]:Ke},m=new Mn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new It},radius:{value:4}},vertexShader:$p,fragmentShader:Yp}),g=m.clone();g.defines.HORIZONTAL_PASS=1;const x=new Ge;x.setAttribute("position",new He(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new ce(x,m),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ja;let f=this.type;this.render=function(R,P,I){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||R.length===0)return;const b=i.getRenderTarget(),E=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),$=i.state;$.setBlending(un),$.buffers.color.setClear(1,1,1,1),$.buffers.depth.setTest(!0),$.setScissorTest(!1);const X=f!==Ze&&this.type===Ze,K=f===Ze&&this.type!==Ze;for(let tt=0,Z=R.length;tt<Z;tt++){const it=R[tt],Y=it.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const ct=Y.getFrameExtents();if(s.multiply(ct),r.copy(Y.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ct.x),s.x=r.x*ct.x,Y.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ct.y),s.y=r.y*ct.y,Y.mapSize.y=r.y)),Y.map===null||X===!0||K===!0){const St=this.type!==Ze?{minFilter:Fe,magFilter:Fe}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Ln(s.x,s.y,St),Y.map.texture.name=it.name+".shadowMap",Y.camera.updateProjectionMatrix()}i.setRenderTarget(Y.map),i.clear();const pt=Y.getViewportCount();for(let St=0;St<pt;St++){const bt=Y.getViewport(St);a.set(r.x*bt.x,r.y*bt.y,r.x*bt.z,r.y*bt.w),$.viewport(a),Y.updateMatrices(it,St),n=Y.getFrustum(),M(P,I,Y.camera,it,this.type)}Y.isPointLightShadow!==!0&&this.type===Ze&&w(Y,I),Y.needsUpdate=!1}f=this.type,_.needsUpdate=!1,i.setRenderTarget(b,E,D)};function w(R,P){const I=t.update(v);m.defines.VSM_SAMPLES!==R.blurSamples&&(m.defines.VSM_SAMPLES=R.blurSamples,g.defines.VSM_SAMPLES=R.blurSamples,m.needsUpdate=!0,g.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Ln(s.x,s.y)),m.uniforms.shadow_pass.value=R.map.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(P,null,I,m,v,null),g.uniforms.shadow_pass.value=R.mapPass.texture,g.uniforms.resolution.value=R.mapSize,g.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(P,null,I,g,v,null)}function T(R,P,I,b){let E=null;const D=I.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(D!==void 0)E=D;else if(E=I.isPointLight===!0?l:o,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const $=E.uuid,X=P.uuid;let K=c[$];K===void 0&&(K={},c[$]=K);let tt=K[X];tt===void 0&&(tt=E.clone(),K[X]=tt,P.addEventListener("dispose",H)),E=tt}if(E.visible=P.visible,E.wireframe=P.wireframe,b===Ze?E.side=P.shadowSide!==null?P.shadowSide:P.side:E.side=P.shadowSide!==null?P.shadowSide:d[P.side],E.alphaMap=P.alphaMap,E.alphaTest=P.alphaTest,E.map=P.map,E.clipShadows=P.clipShadows,E.clippingPlanes=P.clippingPlanes,E.clipIntersection=P.clipIntersection,E.displacementMap=P.displacementMap,E.displacementScale=P.displacementScale,E.displacementBias=P.displacementBias,E.wireframeLinewidth=P.wireframeLinewidth,E.linewidth=P.linewidth,I.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const $=i.properties.get(E);$.light=I}return E}function M(R,P,I,b,E){if(R.visible===!1)return;if(R.layers.test(P.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&E===Ze)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,R.matrixWorld);const X=t.update(R),K=R.material;if(Array.isArray(K)){const tt=X.groups;for(let Z=0,it=tt.length;Z<it;Z++){const Y=tt[Z],ct=K[Y.materialIndex];if(ct&&ct.visible){const pt=T(R,ct,b,E);R.onBeforeShadow(i,R,P,I,X,pt,Y),i.renderBufferDirect(I,null,X,pt,R,Y),R.onAfterShadow(i,R,P,I,X,pt,Y)}}}else if(K.visible){const tt=T(R,K,b,E);R.onBeforeShadow(i,R,P,I,X,tt,null),i.renderBufferDirect(I,null,X,tt,R,null),R.onAfterShadow(i,R,P,I,X,tt,null)}}const $=R.children;for(let X=0,K=$.length;X<K;X++)M($[X],P,I,b,E)}function H(R){R.target.removeEventListener("dispose",H);for(const I in c){const b=c[I],E=R.target.uuid;E in b&&(b[E].dispose(),delete b[E])}}}const jp={[or]:lr,[cr]:ur,[hr]:fr,[ti]:dr,[lr]:or,[ur]:cr,[fr]:hr,[dr]:ti};function Zp(i,t){function e(){let L=!1;const J=new re;let B=null;const q=new re(0,0,0,0);return{setMask:function(nt){B!==nt&&!L&&(i.colorMask(nt,nt,nt,nt),B=nt)},setLocked:function(nt){L=nt},setClear:function(nt,rt,Ct,ae,_e){_e===!0&&(nt*=ae,rt*=ae,Ct*=ae),J.set(nt,rt,Ct,ae),q.equals(J)===!1&&(i.clearColor(nt,rt,Ct,ae),q.copy(J))},reset:function(){L=!1,B=null,q.set(-1,0,0,0)}}}function n(){let L=!1,J=!1,B=null,q=null,nt=null;return{setReversed:function(rt){if(J!==rt){const Ct=t.get("EXT_clip_control");J?Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.ZERO_TO_ONE_EXT):Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.NEGATIVE_ONE_TO_ONE_EXT);const ae=nt;nt=null,this.setClear(ae)}J=rt},getReversed:function(){return J},setTest:function(rt){rt?ht(i.DEPTH_TEST):wt(i.DEPTH_TEST)},setMask:function(rt){B!==rt&&!L&&(i.depthMask(rt),B=rt)},setFunc:function(rt){if(J&&(rt=jp[rt]),q!==rt){switch(rt){case or:i.depthFunc(i.NEVER);break;case lr:i.depthFunc(i.ALWAYS);break;case cr:i.depthFunc(i.LESS);break;case ti:i.depthFunc(i.LEQUAL);break;case hr:i.depthFunc(i.EQUAL);break;case dr:i.depthFunc(i.GEQUAL);break;case ur:i.depthFunc(i.GREATER);break;case fr:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}q=rt}},setLocked:function(rt){L=rt},setClear:function(rt){nt!==rt&&(J&&(rt=1-rt),i.clearDepth(rt),nt=rt)},reset:function(){L=!1,B=null,q=null,nt=null,J=!1}}}function s(){let L=!1,J=null,B=null,q=null,nt=null,rt=null,Ct=null,ae=null,_e=null;return{setTest:function(jt){L||(jt?ht(i.STENCIL_TEST):wt(i.STENCIL_TEST))},setMask:function(jt){J!==jt&&!L&&(i.stencilMask(jt),J=jt)},setFunc:function(jt,Ve,ln){(B!==jt||q!==Ve||nt!==ln)&&(i.stencilFunc(jt,Ve,ln),B=jt,q=Ve,nt=ln)},setOp:function(jt,Ve,ln){(rt!==jt||Ct!==Ve||ae!==ln)&&(i.stencilOp(jt,Ve,ln),rt=jt,Ct=Ve,ae=ln)},setLocked:function(jt){L=jt},setClear:function(jt){_e!==jt&&(i.clearStencil(jt),_e=jt)},reset:function(){L=!1,J=null,B=null,q=null,nt=null,rt=null,Ct=null,ae=null,_e=null}}}const r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap;let h={},d={},m=new WeakMap,g=[],x=null,v=!1,_=null,f=null,w=null,T=null,M=null,H=null,R=null,P=new kt(0,0,0),I=0,b=!1,E=null,D=null,$=null,X=null,K=null;const tt=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,it=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(Y)[1]),Z=it>=1):Y.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),Z=it>=2);let ct=null,pt={};const St=i.getParameter(i.SCISSOR_BOX),bt=i.getParameter(i.VIEWPORT),Ht=new re().fromArray(St),j=new re().fromArray(bt);function st(L,J,B,q){const nt=new Uint8Array(4),rt=i.createTexture();i.bindTexture(L,rt),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ct=0;Ct<B;Ct++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(J,0,i.RGBA,1,1,q,0,i.RGBA,i.UNSIGNED_BYTE,nt):i.texImage2D(J+Ct,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,nt);return rt}const _t={};_t[i.TEXTURE_2D]=st(i.TEXTURE_2D,i.TEXTURE_2D,1),_t[i.TEXTURE_CUBE_MAP]=st(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),_t[i.TEXTURE_2D_ARRAY]=st(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),_t[i.TEXTURE_3D]=st(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ht(i.DEPTH_TEST),a.setFunc(ti),zt(!1),Bt(Ka),ht(i.CULL_FACE),F(un);function ht(L){h[L]!==!0&&(i.enable(L),h[L]=!0)}function wt(L){h[L]!==!1&&(i.disable(L),h[L]=!1)}function Pt(L,J){return d[L]!==J?(i.bindFramebuffer(L,J),d[L]=J,L===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=J),L===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=J),!0):!1}function Ut(L,J){let B=g,q=!1;if(L){B=m.get(J),B===void 0&&(B=[],m.set(J,B));const nt=L.textures;if(B.length!==nt.length||B[0]!==i.COLOR_ATTACHMENT0){for(let rt=0,Ct=nt.length;rt<Ct;rt++)B[rt]=i.COLOR_ATTACHMENT0+rt;B.length=nt.length,q=!0}}else B[0]!==i.BACK&&(B[0]=i.BACK,q=!0);q&&i.drawBuffers(B)}function ne(L){return x!==L?(i.useProgram(L),x=L,!0):!1}const Gt={[An]:i.FUNC_ADD,[Dc]:i.FUNC_SUBTRACT,[Lc]:i.FUNC_REVERSE_SUBTRACT};Gt[Ic]=i.MIN,Gt[Uc]=i.MAX;const te={[Nc]:i.ZERO,[Fc]:i.ONE,[Oc]:i.SRC_COLOR,[rr]:i.SRC_ALPHA,[Vc]:i.SRC_ALPHA_SATURATE,[Hc]:i.DST_COLOR,[Bc]:i.DST_ALPHA,[zc]:i.ONE_MINUS_SRC_COLOR,[ar]:i.ONE_MINUS_SRC_ALPHA,[Gc]:i.ONE_MINUS_DST_COLOR,[kc]:i.ONE_MINUS_DST_ALPHA,[Wc]:i.CONSTANT_COLOR,[Xc]:i.ONE_MINUS_CONSTANT_COLOR,[$c]:i.CONSTANT_ALPHA,[Yc]:i.ONE_MINUS_CONSTANT_ALPHA};function F(L,J,B,q,nt,rt,Ct,ae,_e,jt){if(L===un){v===!0&&(wt(i.BLEND),v=!1);return}if(v===!1&&(ht(i.BLEND),v=!0),L!==Pc){if(L!==_||jt!==b){if((f!==An||M!==An)&&(i.blendEquation(i.FUNC_ADD),f=An,M=An),jt)switch(L){case Qn:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case to:i.blendFunc(i.ONE,i.ONE);break;case eo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case no:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Qn:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case to:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case eo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case no:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}w=null,T=null,H=null,R=null,P.set(0,0,0),I=0,_=L,b=jt}return}nt=nt||J,rt=rt||B,Ct=Ct||q,(J!==f||nt!==M)&&(i.blendEquationSeparate(Gt[J],Gt[nt]),f=J,M=nt),(B!==w||q!==T||rt!==H||Ct!==R)&&(i.blendFuncSeparate(te[B],te[q],te[rt],te[Ct]),w=B,T=q,H=rt,R=Ct),(ae.equals(P)===!1||_e!==I)&&(i.blendColor(ae.r,ae.g,ae.b,_e),P.copy(ae),I=_e),_=L,b=!1}function Me(L,J){L.side===Ke?wt(i.CULL_FACE):ht(i.CULL_FACE);let B=L.side===Se;J&&(B=!B),zt(B),L.blending===Qn&&L.transparent===!1?F(un):F(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const q=L.stencilWrite;o.setTest(q),q&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Jt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ht(i.SAMPLE_ALPHA_TO_COVERAGE):wt(i.SAMPLE_ALPHA_TO_COVERAGE)}function zt(L){E!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),E=L)}function Bt(L){L!==Rc?(ht(i.CULL_FACE),L!==D&&(L===Ka?i.cullFace(i.BACK):L===Cc?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):wt(i.CULL_FACE),D=L}function At(L){L!==$&&(Z&&i.lineWidth(L),$=L)}function Jt(L,J,B){L?(ht(i.POLYGON_OFFSET_FILL),(X!==J||K!==B)&&(i.polygonOffset(J,B),X=J,K=B)):wt(i.POLYGON_OFFSET_FILL)}function Tt(L){L?ht(i.SCISSOR_TEST):wt(i.SCISSOR_TEST)}function p(L){L===void 0&&(L=i.TEXTURE0+tt-1),ct!==L&&(i.activeTexture(L),ct=L)}function u(L,J,B){B===void 0&&(ct===null?B=i.TEXTURE0+tt-1:B=ct);let q=pt[B];q===void 0&&(q={type:void 0,texture:void 0},pt[B]=q),(q.type!==L||q.texture!==J)&&(ct!==B&&(i.activeTexture(B),ct=B),i.bindTexture(L,J||_t[L]),q.type=L,q.texture=J)}function y(){const L=pt[ct];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function A(){try{i.compressedTexImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function C(){try{i.compressedTexImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function z(){try{i.texSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function G(){try{i.texSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function k(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function et(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ut(){try{i.texStorage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{i.texStorage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function dt(){try{i.texImage2D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function mt(){try{i.texImage3D.apply(i,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function gt(L){Ht.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),Ht.copy(L))}function ot(L){j.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),j.copy(L))}function Rt(L,J){let B=c.get(J);B===void 0&&(B=new WeakMap,c.set(J,B));let q=B.get(L);q===void 0&&(q=i.getUniformBlockIndex(J,L.name),B.set(L,q))}function Dt(L,J){const q=c.get(J).get(L);l.get(J)!==q&&(i.uniformBlockBinding(J,q,L.__bindingPointIndex),l.set(J,q))}function Xt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},ct=null,pt={},d={},m=new WeakMap,g=[],x=null,v=!1,_=null,f=null,w=null,T=null,M=null,H=null,R=null,P=new kt(0,0,0),I=0,b=!1,E=null,D=null,$=null,X=null,K=null,Ht.set(0,0,i.canvas.width,i.canvas.height),j.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ht,disable:wt,bindFramebuffer:Pt,drawBuffers:Ut,useProgram:ne,setBlending:F,setMaterial:Me,setFlipSided:zt,setCullFace:Bt,setLineWidth:At,setPolygonOffset:Jt,setScissorTest:Tt,activeTexture:p,bindTexture:u,unbindTexture:y,compressedTexImage2D:A,compressedTexImage3D:C,texImage2D:dt,texImage3D:mt,updateUBOMapping:Rt,uniformBlockBinding:Dt,texStorage2D:ut,texStorage3D:Q,texSubImage2D:z,texSubImage3D:G,compressedTexSubImage2D:k,compressedTexSubImage3D:et,scissor:gt,viewport:ot,reset:Xt}}function Cl(i,t,e,n){const s=Kp(n);switch(e){case lo:return i*t;case ho:return i*t;case uo:return i*t*2;case fo:return i*t/s.components*s.byteLength;case Er:return i*t/s.components*s.byteLength;case po:return i*t*2/s.components*s.byteLength;case yr:return i*t*2/s.components*s.byteLength;case co:return i*t*3/s.components*s.byteLength;case Oe:return i*t*4/s.components*s.byteLength;case br:return i*t*4/s.components*s.byteLength;case os:case ls:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case cs:case hs:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case wr:case Rr:return Math.max(i,16)*Math.max(t,8)/4;case Tr:case Ar:return Math.max(i,8)*Math.max(t,8)/2;case Cr:case Pr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Dr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Lr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ir:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ur:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Nr:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Fr:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Or:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case zr:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Br:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case kr:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Hr:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Gr:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Vr:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Wr:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Xr:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ds:case $r:case Yr:return Math.ceil(i/4)*Math.ceil(t/4)*16;case mo:case qr:return Math.ceil(i/4)*Math.ceil(t/4)*8;case jr:case Zr:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Kp(i){switch(i){case Je:case ro:return{byteLength:1,components:1};case Oi:case ao:case zi:return{byteLength:2,components:1};case Mr:case Sr:return{byteLength:2,components:4};case Pn:case vr:case Qe:return{byteLength:4,components:1};case oo:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Jp(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new It,h=new WeakMap;let d;const m=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(p,u){return g?new OffscreenCanvas(p,u):ps("canvas")}function v(p,u,y){let A=1;const C=Tt(p);if((C.width>y||C.height>y)&&(A=y/Math.max(C.width,C.height)),A<1)if(typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&p instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&p instanceof ImageBitmap||typeof VideoFrame<"u"&&p instanceof VideoFrame){const z=Math.floor(A*C.width),G=Math.floor(A*C.height);d===void 0&&(d=x(z,G));const k=u?x(z,G):d;return k.width=z,k.height=G,k.getContext("2d").drawImage(p,0,0,z,G),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+C.width+"x"+C.height+") to ("+z+"x"+G+")."),k}else return"data"in p&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+C.width+"x"+C.height+")."),p;return p}function _(p){return p.generateMipmaps}function f(p){i.generateMipmap(p)}function w(p){return p.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:p.isWebGL3DRenderTarget?i.TEXTURE_3D:p.isWebGLArrayRenderTarget||p.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(p,u,y,A,C=!1){if(p!==null){if(i[p]!==void 0)return i[p];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+p+"'")}let z=u;if(u===i.RED&&(y===i.FLOAT&&(z=i.R32F),y===i.HALF_FLOAT&&(z=i.R16F),y===i.UNSIGNED_BYTE&&(z=i.R8)),u===i.RED_INTEGER&&(y===i.UNSIGNED_BYTE&&(z=i.R8UI),y===i.UNSIGNED_SHORT&&(z=i.R16UI),y===i.UNSIGNED_INT&&(z=i.R32UI),y===i.BYTE&&(z=i.R8I),y===i.SHORT&&(z=i.R16I),y===i.INT&&(z=i.R32I)),u===i.RG&&(y===i.FLOAT&&(z=i.RG32F),y===i.HALF_FLOAT&&(z=i.RG16F),y===i.UNSIGNED_BYTE&&(z=i.RG8)),u===i.RG_INTEGER&&(y===i.UNSIGNED_BYTE&&(z=i.RG8UI),y===i.UNSIGNED_SHORT&&(z=i.RG16UI),y===i.UNSIGNED_INT&&(z=i.RG32UI),y===i.BYTE&&(z=i.RG8I),y===i.SHORT&&(z=i.RG16I),y===i.INT&&(z=i.RG32I)),u===i.RGB_INTEGER&&(y===i.UNSIGNED_BYTE&&(z=i.RGB8UI),y===i.UNSIGNED_SHORT&&(z=i.RGB16UI),y===i.UNSIGNED_INT&&(z=i.RGB32UI),y===i.BYTE&&(z=i.RGB8I),y===i.SHORT&&(z=i.RGB16I),y===i.INT&&(z=i.RGB32I)),u===i.RGBA_INTEGER&&(y===i.UNSIGNED_BYTE&&(z=i.RGBA8UI),y===i.UNSIGNED_SHORT&&(z=i.RGBA16UI),y===i.UNSIGNED_INT&&(z=i.RGBA32UI),y===i.BYTE&&(z=i.RGBA8I),y===i.SHORT&&(z=i.RGBA16I),y===i.INT&&(z=i.RGBA32I)),u===i.RGB&&y===i.UNSIGNED_INT_5_9_9_9_REV&&(z=i.RGB9_E5),u===i.RGBA){const G=C?us:Wt.getTransfer(A);y===i.FLOAT&&(z=i.RGBA32F),y===i.HALF_FLOAT&&(z=i.RGBA16F),y===i.UNSIGNED_BYTE&&(z=G===Zt?i.SRGB8_ALPHA8:i.RGBA8),y===i.UNSIGNED_SHORT_4_4_4_4&&(z=i.RGBA4),y===i.UNSIGNED_SHORT_5_5_5_1&&(z=i.RGB5_A1)}return(z===i.R16F||z===i.R32F||z===i.RG16F||z===i.RG32F||z===i.RGBA16F||z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),z}function M(p,u){let y;return p?u===null||u===Pn||u===ii?y=i.DEPTH24_STENCIL8:u===Qe?y=i.DEPTH32F_STENCIL8:u===Oi&&(y=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):u===null||u===Pn||u===ii?y=i.DEPTH_COMPONENT24:u===Qe?y=i.DEPTH_COMPONENT32F:u===Oi&&(y=i.DEPTH_COMPONENT16),y}function H(p,u){return _(p)===!0||p.isFramebufferTexture&&p.minFilter!==Fe&&p.minFilter!==Xe?Math.log2(Math.max(u.width,u.height))+1:p.mipmaps!==void 0&&p.mipmaps.length>0?p.mipmaps.length:p.isCompressedTexture&&Array.isArray(p.image)?u.mipmaps.length:1}function R(p){const u=p.target;u.removeEventListener("dispose",R),I(u),u.isVideoTexture&&h.delete(u)}function P(p){const u=p.target;u.removeEventListener("dispose",P),E(u)}function I(p){const u=n.get(p);if(u.__webglInit===void 0)return;const y=p.source,A=m.get(y);if(A){const C=A[u.__cacheKey];C.usedTimes--,C.usedTimes===0&&b(p),Object.keys(A).length===0&&m.delete(y)}n.remove(p)}function b(p){const u=n.get(p);i.deleteTexture(u.__webglTexture);const y=p.source,A=m.get(y);delete A[u.__cacheKey],a.memory.textures--}function E(p){const u=n.get(p);if(p.depthTexture&&(p.depthTexture.dispose(),n.remove(p.depthTexture)),p.isWebGLCubeRenderTarget)for(let A=0;A<6;A++){if(Array.isArray(u.__webglFramebuffer[A]))for(let C=0;C<u.__webglFramebuffer[A].length;C++)i.deleteFramebuffer(u.__webglFramebuffer[A][C]);else i.deleteFramebuffer(u.__webglFramebuffer[A]);u.__webglDepthbuffer&&i.deleteRenderbuffer(u.__webglDepthbuffer[A])}else{if(Array.isArray(u.__webglFramebuffer))for(let A=0;A<u.__webglFramebuffer.length;A++)i.deleteFramebuffer(u.__webglFramebuffer[A]);else i.deleteFramebuffer(u.__webglFramebuffer);if(u.__webglDepthbuffer&&i.deleteRenderbuffer(u.__webglDepthbuffer),u.__webglMultisampledFramebuffer&&i.deleteFramebuffer(u.__webglMultisampledFramebuffer),u.__webglColorRenderbuffer)for(let A=0;A<u.__webglColorRenderbuffer.length;A++)u.__webglColorRenderbuffer[A]&&i.deleteRenderbuffer(u.__webglColorRenderbuffer[A]);u.__webglDepthRenderbuffer&&i.deleteRenderbuffer(u.__webglDepthRenderbuffer)}const y=p.textures;for(let A=0,C=y.length;A<C;A++){const z=n.get(y[A]);z.__webglTexture&&(i.deleteTexture(z.__webglTexture),a.memory.textures--),n.remove(y[A])}n.remove(p)}let D=0;function $(){D=0}function X(){const p=D;return p>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+p+" texture units while this GPU supports only "+s.maxTextures),D+=1,p}function K(p){const u=[];return u.push(p.wrapS),u.push(p.wrapT),u.push(p.wrapR||0),u.push(p.magFilter),u.push(p.minFilter),u.push(p.anisotropy),u.push(p.internalFormat),u.push(p.format),u.push(p.type),u.push(p.generateMipmaps),u.push(p.premultiplyAlpha),u.push(p.flipY),u.push(p.unpackAlignment),u.push(p.colorSpace),u.join()}function tt(p,u){const y=n.get(p);if(p.isVideoTexture&&At(p),p.isRenderTargetTexture===!1&&p.version>0&&y.__version!==p.version){const A=p.image;if(A===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(A.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(y,p,u);return}}e.bindTexture(i.TEXTURE_2D,y.__webglTexture,i.TEXTURE0+u)}function Z(p,u){const y=n.get(p);if(p.version>0&&y.__version!==p.version){j(y,p,u);return}e.bindTexture(i.TEXTURE_2D_ARRAY,y.__webglTexture,i.TEXTURE0+u)}function it(p,u){const y=n.get(p);if(p.version>0&&y.__version!==p.version){j(y,p,u);return}e.bindTexture(i.TEXTURE_3D,y.__webglTexture,i.TEXTURE0+u)}function Y(p,u){const y=n.get(p);if(p.version>0&&y.__version!==p.version){st(y,p,u);return}e.bindTexture(i.TEXTURE_CUBE_MAP,y.__webglTexture,i.TEXTURE0+u)}const ct={[gr]:i.REPEAT,[Rn]:i.CLAMP_TO_EDGE,[_r]:i.MIRRORED_REPEAT},pt={[Fe]:i.NEAREST,[ih]:i.NEAREST_MIPMAP_NEAREST,[as]:i.NEAREST_MIPMAP_LINEAR,[Xe]:i.LINEAR,[xr]:i.LINEAR_MIPMAP_NEAREST,[Cn]:i.LINEAR_MIPMAP_LINEAR},St={[oh]:i.NEVER,[fh]:i.ALWAYS,[lh]:i.LESS,[xo]:i.LEQUAL,[ch]:i.EQUAL,[uh]:i.GEQUAL,[hh]:i.GREATER,[dh]:i.NOTEQUAL};function bt(p,u){if(u.type===Qe&&t.has("OES_texture_float_linear")===!1&&(u.magFilter===Xe||u.magFilter===xr||u.magFilter===as||u.magFilter===Cn||u.minFilter===Xe||u.minFilter===xr||u.minFilter===as||u.minFilter===Cn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(p,i.TEXTURE_WRAP_S,ct[u.wrapS]),i.texParameteri(p,i.TEXTURE_WRAP_T,ct[u.wrapT]),(p===i.TEXTURE_3D||p===i.TEXTURE_2D_ARRAY)&&i.texParameteri(p,i.TEXTURE_WRAP_R,ct[u.wrapR]),i.texParameteri(p,i.TEXTURE_MAG_FILTER,pt[u.magFilter]),i.texParameteri(p,i.TEXTURE_MIN_FILTER,pt[u.minFilter]),u.compareFunction&&(i.texParameteri(p,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(p,i.TEXTURE_COMPARE_FUNC,St[u.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(u.magFilter===Fe||u.minFilter!==as&&u.minFilter!==Cn||u.type===Qe&&t.has("OES_texture_float_linear")===!1)return;if(u.anisotropy>1||n.get(u).__currentAnisotropy){const y=t.get("EXT_texture_filter_anisotropic");i.texParameterf(p,y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(u.anisotropy,s.getMaxAnisotropy())),n.get(u).__currentAnisotropy=u.anisotropy}}}function Ht(p,u){let y=!1;p.__webglInit===void 0&&(p.__webglInit=!0,u.addEventListener("dispose",R));const A=u.source;let C=m.get(A);C===void 0&&(C={},m.set(A,C));const z=K(u);if(z!==p.__cacheKey){C[z]===void 0&&(C[z]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,y=!0),C[z].usedTimes++;const G=C[p.__cacheKey];G!==void 0&&(C[p.__cacheKey].usedTimes--,G.usedTimes===0&&b(u)),p.__cacheKey=z,p.__webglTexture=C[z].texture}return y}function j(p,u,y){let A=i.TEXTURE_2D;(u.isDataArrayTexture||u.isCompressedArrayTexture)&&(A=i.TEXTURE_2D_ARRAY),u.isData3DTexture&&(A=i.TEXTURE_3D);const C=Ht(p,u),z=u.source;e.bindTexture(A,p.__webglTexture,i.TEXTURE0+y);const G=n.get(z);if(z.version!==G.__version||C===!0){e.activeTexture(i.TEXTURE0+y);const k=Wt.getPrimaries(Wt.workingColorSpace),et=u.colorSpace===pn?null:Wt.getPrimaries(u.colorSpace),ut=u.colorSpace===pn||k===et?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,u.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,u.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,u.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ut);let Q=v(u.image,!1,s.maxTextureSize);Q=Jt(u,Q);const dt=r.convert(u.format,u.colorSpace),mt=r.convert(u.type);let gt=T(u.internalFormat,dt,mt,u.colorSpace,u.isVideoTexture);bt(A,u);let ot;const Rt=u.mipmaps,Dt=u.isVideoTexture!==!0,Xt=G.__version===void 0||C===!0,L=z.dataReady,J=H(u,Q);if(u.isDepthTexture)gt=M(u.format===ri,u.type),Xt&&(Dt?e.texStorage2D(i.TEXTURE_2D,1,gt,Q.width,Q.height):e.texImage2D(i.TEXTURE_2D,0,gt,Q.width,Q.height,0,dt,mt,null));else if(u.isDataTexture)if(Rt.length>0){Dt&&Xt&&e.texStorage2D(i.TEXTURE_2D,J,gt,Rt[0].width,Rt[0].height);for(let B=0,q=Rt.length;B<q;B++)ot=Rt[B],Dt?L&&e.texSubImage2D(i.TEXTURE_2D,B,0,0,ot.width,ot.height,dt,mt,ot.data):e.texImage2D(i.TEXTURE_2D,B,gt,ot.width,ot.height,0,dt,mt,ot.data);u.generateMipmaps=!1}else Dt?(Xt&&e.texStorage2D(i.TEXTURE_2D,J,gt,Q.width,Q.height),L&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Q.width,Q.height,dt,mt,Q.data)):e.texImage2D(i.TEXTURE_2D,0,gt,Q.width,Q.height,0,dt,mt,Q.data);else if(u.isCompressedTexture)if(u.isCompressedArrayTexture){Dt&&Xt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,J,gt,Rt[0].width,Rt[0].height,Q.depth);for(let B=0,q=Rt.length;B<q;B++)if(ot=Rt[B],u.format!==Oe)if(dt!==null)if(Dt){if(L)if(u.layerUpdates.size>0){const nt=Cl(ot.width,ot.height,u.format,u.type);for(const rt of u.layerUpdates){const Ct=ot.data.subarray(rt*nt/ot.data.BYTES_PER_ELEMENT,(rt+1)*nt/ot.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,B,0,0,rt,ot.width,ot.height,1,dt,Ct)}u.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,B,0,0,0,ot.width,ot.height,Q.depth,dt,ot.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,B,gt,ot.width,ot.height,Q.depth,0,ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Dt?L&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,B,0,0,0,ot.width,ot.height,Q.depth,dt,mt,ot.data):e.texImage3D(i.TEXTURE_2D_ARRAY,B,gt,ot.width,ot.height,Q.depth,0,dt,mt,ot.data)}else{Dt&&Xt&&e.texStorage2D(i.TEXTURE_2D,J,gt,Rt[0].width,Rt[0].height);for(let B=0,q=Rt.length;B<q;B++)ot=Rt[B],u.format!==Oe?dt!==null?Dt?L&&e.compressedTexSubImage2D(i.TEXTURE_2D,B,0,0,ot.width,ot.height,dt,ot.data):e.compressedTexImage2D(i.TEXTURE_2D,B,gt,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Dt?L&&e.texSubImage2D(i.TEXTURE_2D,B,0,0,ot.width,ot.height,dt,mt,ot.data):e.texImage2D(i.TEXTURE_2D,B,gt,ot.width,ot.height,0,dt,mt,ot.data)}else if(u.isDataArrayTexture)if(Dt){if(Xt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,J,gt,Q.width,Q.height,Q.depth),L)if(u.layerUpdates.size>0){const B=Cl(Q.width,Q.height,u.format,u.type);for(const q of u.layerUpdates){const nt=Q.data.subarray(q*B/Q.data.BYTES_PER_ELEMENT,(q+1)*B/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,q,Q.width,Q.height,1,dt,mt,nt)}u.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,dt,mt,Q.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,gt,Q.width,Q.height,Q.depth,0,dt,mt,Q.data);else if(u.isData3DTexture)Dt?(Xt&&e.texStorage3D(i.TEXTURE_3D,J,gt,Q.width,Q.height,Q.depth),L&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,dt,mt,Q.data)):e.texImage3D(i.TEXTURE_3D,0,gt,Q.width,Q.height,Q.depth,0,dt,mt,Q.data);else if(u.isFramebufferTexture){if(Xt)if(Dt)e.texStorage2D(i.TEXTURE_2D,J,gt,Q.width,Q.height);else{let B=Q.width,q=Q.height;for(let nt=0;nt<J;nt++)e.texImage2D(i.TEXTURE_2D,nt,gt,B,q,0,dt,mt,null),B>>=1,q>>=1}}else if(Rt.length>0){if(Dt&&Xt){const B=Tt(Rt[0]);e.texStorage2D(i.TEXTURE_2D,J,gt,B.width,B.height)}for(let B=0,q=Rt.length;B<q;B++)ot=Rt[B],Dt?L&&e.texSubImage2D(i.TEXTURE_2D,B,0,0,dt,mt,ot):e.texImage2D(i.TEXTURE_2D,B,gt,dt,mt,ot);u.generateMipmaps=!1}else if(Dt){if(Xt){const B=Tt(Q);e.texStorage2D(i.TEXTURE_2D,J,gt,B.width,B.height)}L&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,dt,mt,Q)}else e.texImage2D(i.TEXTURE_2D,0,gt,dt,mt,Q);_(u)&&f(A),G.__version=z.version,u.onUpdate&&u.onUpdate(u)}p.__version=u.version}function st(p,u,y){if(u.image.length!==6)return;const A=Ht(p,u),C=u.source;e.bindTexture(i.TEXTURE_CUBE_MAP,p.__webglTexture,i.TEXTURE0+y);const z=n.get(C);if(C.version!==z.__version||A===!0){e.activeTexture(i.TEXTURE0+y);const G=Wt.getPrimaries(Wt.workingColorSpace),k=u.colorSpace===pn?null:Wt.getPrimaries(u.colorSpace),et=u.colorSpace===pn||G===k?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,u.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,u.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,u.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);const ut=u.isCompressedTexture||u.image[0].isCompressedTexture,Q=u.image[0]&&u.image[0].isDataTexture,dt=[];for(let q=0;q<6;q++)!ut&&!Q?dt[q]=v(u.image[q],!0,s.maxCubemapSize):dt[q]=Q?u.image[q].image:u.image[q],dt[q]=Jt(u,dt[q]);const mt=dt[0],gt=r.convert(u.format,u.colorSpace),ot=r.convert(u.type),Rt=T(u.internalFormat,gt,ot,u.colorSpace),Dt=u.isVideoTexture!==!0,Xt=z.__version===void 0||A===!0,L=C.dataReady;let J=H(u,mt);bt(i.TEXTURE_CUBE_MAP,u);let B;if(ut){Dt&&Xt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,J,Rt,mt.width,mt.height);for(let q=0;q<6;q++){B=dt[q].mipmaps;for(let nt=0;nt<B.length;nt++){const rt=B[nt];u.format!==Oe?gt!==null?Dt?L&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,nt,0,0,rt.width,rt.height,gt,rt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,nt,Rt,rt.width,rt.height,0,rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Dt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,nt,0,0,rt.width,rt.height,gt,ot,rt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,nt,Rt,rt.width,rt.height,0,gt,ot,rt.data)}}}else{if(B=u.mipmaps,Dt&&Xt){B.length>0&&J++;const q=Tt(dt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,J,Rt,q.width,q.height)}for(let q=0;q<6;q++)if(Q){Dt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,dt[q].width,dt[q].height,gt,ot,dt[q].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Rt,dt[q].width,dt[q].height,0,gt,ot,dt[q].data);for(let nt=0;nt<B.length;nt++){const Ct=B[nt].image[q].image;Dt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,nt+1,0,0,Ct.width,Ct.height,gt,ot,Ct.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,nt+1,Rt,Ct.width,Ct.height,0,gt,ot,Ct.data)}}else{Dt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,0,0,gt,ot,dt[q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0,Rt,gt,ot,dt[q]);for(let nt=0;nt<B.length;nt++){const rt=B[nt];Dt?L&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,nt+1,0,0,gt,ot,rt.image[q]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+q,nt+1,Rt,gt,ot,rt.image[q])}}}_(u)&&f(i.TEXTURE_CUBE_MAP),z.__version=C.version,u.onUpdate&&u.onUpdate(u)}p.__version=u.version}function _t(p,u,y,A,C,z){const G=r.convert(y.format,y.colorSpace),k=r.convert(y.type),et=T(y.internalFormat,G,k,y.colorSpace),ut=n.get(u),Q=n.get(y);if(Q.__renderTarget=u,!ut.__hasExternalTextures){const dt=Math.max(1,u.width>>z),mt=Math.max(1,u.height>>z);C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY?e.texImage3D(C,z,et,dt,mt,u.depth,0,G,k,null):e.texImage2D(C,z,et,dt,mt,0,G,k,null)}e.bindFramebuffer(i.FRAMEBUFFER,p),Bt(u)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,A,C,Q.__webglTexture,0,zt(u)):(C===i.TEXTURE_2D||C>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&C<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,A,C,Q.__webglTexture,z),e.bindFramebuffer(i.FRAMEBUFFER,null)}function ht(p,u,y){if(i.bindRenderbuffer(i.RENDERBUFFER,p),u.depthBuffer){const A=u.depthTexture,C=A&&A.isDepthTexture?A.type:null,z=M(u.stencilBuffer,C),G=u.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,k=zt(u);Bt(u)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,k,z,u.width,u.height):y?i.renderbufferStorageMultisample(i.RENDERBUFFER,k,z,u.width,u.height):i.renderbufferStorage(i.RENDERBUFFER,z,u.width,u.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,G,i.RENDERBUFFER,p)}else{const A=u.textures;for(let C=0;C<A.length;C++){const z=A[C],G=r.convert(z.format,z.colorSpace),k=r.convert(z.type),et=T(z.internalFormat,G,k,z.colorSpace),ut=zt(u);y&&Bt(u)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ut,et,u.width,u.height):Bt(u)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ut,et,u.width,u.height):i.renderbufferStorage(i.RENDERBUFFER,et,u.width,u.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function wt(p,u){if(u&&u.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,p),!(u.depthTexture&&u.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const A=n.get(u.depthTexture);A.__renderTarget=u,(!A.__webglTexture||u.depthTexture.image.width!==u.width||u.depthTexture.image.height!==u.height)&&(u.depthTexture.image.width=u.width,u.depthTexture.image.height=u.height,u.depthTexture.needsUpdate=!0),tt(u.depthTexture,0);const C=A.__webglTexture,z=zt(u);if(u.depthTexture.format===si)Bt(u)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,C,0,z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,C,0);else if(u.depthTexture.format===ri)Bt(u)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,C,0,z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,C,0);else throw new Error("Unknown depthTexture format")}function Pt(p){const u=n.get(p),y=p.isWebGLCubeRenderTarget===!0;if(u.__boundDepthTexture!==p.depthTexture){const A=p.depthTexture;if(u.__depthDisposeCallback&&u.__depthDisposeCallback(),A){const C=()=>{delete u.__boundDepthTexture,delete u.__depthDisposeCallback,A.removeEventListener("dispose",C)};A.addEventListener("dispose",C),u.__depthDisposeCallback=C}u.__boundDepthTexture=A}if(p.depthTexture&&!u.__autoAllocateDepthBuffer){if(y)throw new Error("target.depthTexture not supported in Cube render targets");wt(u.__webglFramebuffer,p)}else if(y){u.__webglDepthbuffer=[];for(let A=0;A<6;A++)if(e.bindFramebuffer(i.FRAMEBUFFER,u.__webglFramebuffer[A]),u.__webglDepthbuffer[A]===void 0)u.__webglDepthbuffer[A]=i.createRenderbuffer(),ht(u.__webglDepthbuffer[A],p,!1);else{const C=p.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,z=u.__webglDepthbuffer[A];i.bindRenderbuffer(i.RENDERBUFFER,z),i.framebufferRenderbuffer(i.FRAMEBUFFER,C,i.RENDERBUFFER,z)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,u.__webglFramebuffer),u.__webglDepthbuffer===void 0)u.__webglDepthbuffer=i.createRenderbuffer(),ht(u.__webglDepthbuffer,p,!1);else{const A=p.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,C=u.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,C),i.framebufferRenderbuffer(i.FRAMEBUFFER,A,i.RENDERBUFFER,C)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(p,u,y){const A=n.get(p);u!==void 0&&_t(A.__webglFramebuffer,p,p.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),y!==void 0&&Pt(p)}function ne(p){const u=p.texture,y=n.get(p),A=n.get(u);p.addEventListener("dispose",P);const C=p.textures,z=p.isWebGLCubeRenderTarget===!0,G=C.length>1;if(G||(A.__webglTexture===void 0&&(A.__webglTexture=i.createTexture()),A.__version=u.version,a.memory.textures++),z){y.__webglFramebuffer=[];for(let k=0;k<6;k++)if(u.mipmaps&&u.mipmaps.length>0){y.__webglFramebuffer[k]=[];for(let et=0;et<u.mipmaps.length;et++)y.__webglFramebuffer[k][et]=i.createFramebuffer()}else y.__webglFramebuffer[k]=i.createFramebuffer()}else{if(u.mipmaps&&u.mipmaps.length>0){y.__webglFramebuffer=[];for(let k=0;k<u.mipmaps.length;k++)y.__webglFramebuffer[k]=i.createFramebuffer()}else y.__webglFramebuffer=i.createFramebuffer();if(G)for(let k=0,et=C.length;k<et;k++){const ut=n.get(C[k]);ut.__webglTexture===void 0&&(ut.__webglTexture=i.createTexture(),a.memory.textures++)}if(p.samples>0&&Bt(p)===!1){y.__webglMultisampledFramebuffer=i.createFramebuffer(),y.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,y.__webglMultisampledFramebuffer);for(let k=0;k<C.length;k++){const et=C[k];y.__webglColorRenderbuffer[k]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,y.__webglColorRenderbuffer[k]);const ut=r.convert(et.format,et.colorSpace),Q=r.convert(et.type),dt=T(et.internalFormat,ut,Q,et.colorSpace,p.isXRRenderTarget===!0),mt=zt(p);i.renderbufferStorageMultisample(i.RENDERBUFFER,mt,dt,p.width,p.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+k,i.RENDERBUFFER,y.__webglColorRenderbuffer[k])}i.bindRenderbuffer(i.RENDERBUFFER,null),p.depthBuffer&&(y.__webglDepthRenderbuffer=i.createRenderbuffer(),ht(y.__webglDepthRenderbuffer,p,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(z){e.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture),bt(i.TEXTURE_CUBE_MAP,u);for(let k=0;k<6;k++)if(u.mipmaps&&u.mipmaps.length>0)for(let et=0;et<u.mipmaps.length;et++)_t(y.__webglFramebuffer[k][et],p,u,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+k,et);else _t(y.__webglFramebuffer[k],p,u,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+k,0);_(u)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(G){for(let k=0,et=C.length;k<et;k++){const ut=C[k],Q=n.get(ut);e.bindTexture(i.TEXTURE_2D,Q.__webglTexture),bt(i.TEXTURE_2D,ut),_t(y.__webglFramebuffer,p,ut,i.COLOR_ATTACHMENT0+k,i.TEXTURE_2D,0),_(ut)&&f(i.TEXTURE_2D)}e.unbindTexture()}else{let k=i.TEXTURE_2D;if((p.isWebGL3DRenderTarget||p.isWebGLArrayRenderTarget)&&(k=p.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(k,A.__webglTexture),bt(k,u),u.mipmaps&&u.mipmaps.length>0)for(let et=0;et<u.mipmaps.length;et++)_t(y.__webglFramebuffer[et],p,u,i.COLOR_ATTACHMENT0,k,et);else _t(y.__webglFramebuffer,p,u,i.COLOR_ATTACHMENT0,k,0);_(u)&&f(k),e.unbindTexture()}p.depthBuffer&&Pt(p)}function Gt(p){const u=p.textures;for(let y=0,A=u.length;y<A;y++){const C=u[y];if(_(C)){const z=w(p),G=n.get(C).__webglTexture;e.bindTexture(z,G),f(z),e.unbindTexture()}}}const te=[],F=[];function Me(p){if(p.samples>0){if(Bt(p)===!1){const u=p.textures,y=p.width,A=p.height;let C=i.COLOR_BUFFER_BIT;const z=p.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,G=n.get(p),k=u.length>1;if(k)for(let et=0;et<u.length;et++)e.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+et,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,G.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+et,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,G.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,G.__webglFramebuffer);for(let et=0;et<u.length;et++){if(p.resolveDepthBuffer&&(p.depthBuffer&&(C|=i.DEPTH_BUFFER_BIT),p.stencilBuffer&&p.resolveStencilBuffer&&(C|=i.STENCIL_BUFFER_BIT)),k){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,G.__webglColorRenderbuffer[et]);const ut=n.get(u[et]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ut,0)}i.blitFramebuffer(0,0,y,A,0,0,y,A,C,i.NEAREST),l===!0&&(te.length=0,F.length=0,te.push(i.COLOR_ATTACHMENT0+et),p.depthBuffer&&p.resolveDepthBuffer===!1&&(te.push(z),F.push(z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,F)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,te))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),k)for(let et=0;et<u.length;et++){e.bindFramebuffer(i.FRAMEBUFFER,G.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+et,i.RENDERBUFFER,G.__webglColorRenderbuffer[et]);const ut=n.get(u[et]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,G.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+et,i.TEXTURE_2D,ut,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,G.__webglMultisampledFramebuffer)}else if(p.depthBuffer&&p.resolveDepthBuffer===!1&&l){const u=p.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[u])}}}function zt(p){return Math.min(s.maxSamples,p.samples)}function Bt(p){const u=n.get(p);return p.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&u.__useRenderToTexture!==!1}function At(p){const u=a.render.frame;h.get(p)!==u&&(h.set(p,u),p.update())}function Jt(p,u){const y=p.colorSpace,A=p.format,C=p.type;return p.isCompressedTexture===!0||p.isVideoTexture===!0||y!==ai&&y!==pn&&(Wt.getTransfer(y)===Zt?(A!==Oe||C!==Je)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",y)),u}function Tt(p){return typeof HTMLImageElement<"u"&&p instanceof HTMLImageElement?(c.width=p.naturalWidth||p.width,c.height=p.naturalHeight||p.height):typeof VideoFrame<"u"&&p instanceof VideoFrame?(c.width=p.displayWidth,c.height=p.displayHeight):(c.width=p.width,c.height=p.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=$,this.setTexture2D=tt,this.setTexture2DArray=Z,this.setTexture3D=it,this.setTextureCube=Y,this.rebindTextures=Ut,this.setupRenderTarget=ne,this.updateRenderTargetMipmap=Gt,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=Pt,this.setupFrameBufferTexture=_t,this.useMultisampledRTT=Bt}function Qp(i,t){function e(n,s=pn){let r;const a=Wt.getTransfer(s);if(n===Je)return i.UNSIGNED_BYTE;if(n===Mr)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Sr)return i.UNSIGNED_SHORT_5_5_5_1;if(n===oo)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ro)return i.BYTE;if(n===ao)return i.SHORT;if(n===Oi)return i.UNSIGNED_SHORT;if(n===vr)return i.INT;if(n===Pn)return i.UNSIGNED_INT;if(n===Qe)return i.FLOAT;if(n===zi)return i.HALF_FLOAT;if(n===lo)return i.ALPHA;if(n===co)return i.RGB;if(n===Oe)return i.RGBA;if(n===ho)return i.LUMINANCE;if(n===uo)return i.LUMINANCE_ALPHA;if(n===si)return i.DEPTH_COMPONENT;if(n===ri)return i.DEPTH_STENCIL;if(n===fo)return i.RED;if(n===Er)return i.RED_INTEGER;if(n===po)return i.RG;if(n===yr)return i.RG_INTEGER;if(n===br)return i.RGBA_INTEGER;if(n===os||n===ls||n===cs||n===hs)if(a===Zt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===os)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ls)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===cs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===hs)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===os)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ls)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===cs)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===hs)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Tr||n===wr||n===Ar||n===Rr)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Tr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===wr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ar)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Rr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Cr||n===Pr||n===Dr)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Cr||n===Pr)return a===Zt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Dr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Lr||n===Ir||n===Ur||n===Nr||n===Fr||n===Or||n===zr||n===Br||n===kr||n===Hr||n===Gr||n===Vr||n===Wr||n===Xr)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Lr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ir)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ur)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Nr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Fr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Or)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===zr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Br)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===kr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Hr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Gr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Vr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Wr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xr)return a===Zt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ds||n===$r||n===Yr)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ds)return a===Zt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===$r)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Yr)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===mo||n===qr||n===jr||n===Zr)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ds)return r.COMPRESSED_RED_RGTC1_EXT;if(n===qr)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===jr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Zr)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ii?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class tm extends Ie{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Vn extends le{constructor(){super(),this.isGroup=!0,this.type="Group"}}const em={type:"move"};class Ca{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const v of t.hand.values()){const _=e.getJointPose(v,n),f=this._getHandJoint(c,v);_!==null&&(f.matrix.fromArray(_.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=_.radius),f.visible=_!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],m=h.position.distanceTo(d.position),g=.02,x=.005;c.inputState.pinching&&m>g+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&m<=g-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(em)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Vn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const nm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,im=`
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

}`;class sm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Ee,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Mn({vertexShader:nm,fragmentShader:im,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ce(new Bn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class rm extends Dn{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,m=null,g=null,x=null;const v=new sm,_=e.getContextAttributes();let f=null,w=null;const T=[],M=[],H=new It;let R=null;const P=new Ie;P.viewport=new re;const I=new Ie;I.viewport=new re;const b=[P,I],E=new tm;let D=null,$=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let st=T[j];return st===void 0&&(st=new Ca,T[j]=st),st.getTargetRaySpace()},this.getControllerGrip=function(j){let st=T[j];return st===void 0&&(st=new Ca,T[j]=st),st.getGripSpace()},this.getHand=function(j){let st=T[j];return st===void 0&&(st=new Ca,T[j]=st),st.getHandSpace()};function X(j){const st=M.indexOf(j.inputSource);if(st===-1)return;const _t=T[st];_t!==void 0&&(_t.update(j.inputSource,j.frame,c||a),_t.dispatchEvent({type:j.type,data:j.inputSource}))}function K(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",tt);for(let j=0;j<T.length;j++){const st=M[j];st!==null&&(M[j]=null,T[j].disconnect(st))}D=null,$=null,v.reset(),t.setRenderTarget(f),g=null,m=null,d=null,s=null,w=null,Ht.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(H.width,H.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return m!==null?m:g},this.getBinding=function(){return d},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",K),s.addEventListener("inputsourceschange",tt),_.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(H),s.renderState.layers===void 0){const st={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,e,st),s.updateRenderState({baseLayer:g}),t.setPixelRatio(1),t.setSize(g.framebufferWidth,g.framebufferHeight,!1),w=new Ln(g.framebufferWidth,g.framebufferHeight,{format:Oe,type:Je,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let st=null,_t=null,ht=null;_.depth&&(ht=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=_.stencil?ri:si,_t=_.stencil?ii:Pn);const wt={colorFormat:e.RGBA8,depthFormat:ht,scaleFactor:r};d=new XRWebGLBinding(s,e),m=d.createProjectionLayer(wt),s.updateRenderState({layers:[m]}),t.setPixelRatio(1),t.setSize(m.textureWidth,m.textureHeight,!1),w=new Ln(m.textureWidth,m.textureHeight,{format:Oe,type:Je,depthTexture:new ol(m.textureWidth,m.textureHeight,_t,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Ht.setContext(s),Ht.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function tt(j){for(let st=0;st<j.removed.length;st++){const _t=j.removed[st],ht=M.indexOf(_t);ht>=0&&(M[ht]=null,T[ht].disconnect(_t))}for(let st=0;st<j.added.length;st++){const _t=j.added[st];let ht=M.indexOf(_t);if(ht===-1){for(let Pt=0;Pt<T.length;Pt++)if(Pt>=M.length){M.push(_t),ht=Pt;break}else if(M[Pt]===null){M[Pt]=_t,ht=Pt;break}if(ht===-1)break}const wt=T[ht];wt&&wt.connect(_t)}}const Z=new N,it=new N;function Y(j,st,_t){Z.setFromMatrixPosition(st.matrixWorld),it.setFromMatrixPosition(_t.matrixWorld);const ht=Z.distanceTo(it),wt=st.projectionMatrix.elements,Pt=_t.projectionMatrix.elements,Ut=wt[14]/(wt[10]-1),ne=wt[14]/(wt[10]+1),Gt=(wt[9]+1)/wt[5],te=(wt[9]-1)/wt[5],F=(wt[8]-1)/wt[0],Me=(Pt[8]+1)/Pt[0],zt=Ut*F,Bt=Ut*Me,At=ht/(-F+Me),Jt=At*-F;if(st.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Jt),j.translateZ(At),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),wt[10]===-1)j.projectionMatrix.copy(st.projectionMatrix),j.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{const Tt=Ut+At,p=ne+At,u=zt-Jt,y=Bt+(ht-Jt),A=Gt*ne/p*Tt,C=te*ne/p*Tt;j.projectionMatrix.makePerspective(u,y,A,C,Tt,p),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ct(j,st){st===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(st.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let st=j.near,_t=j.far;v.texture!==null&&(v.depthNear>0&&(st=v.depthNear),v.depthFar>0&&(_t=v.depthFar)),E.near=I.near=P.near=st,E.far=I.far=P.far=_t,(D!==E.near||$!==E.far)&&(s.updateRenderState({depthNear:E.near,depthFar:E.far}),D=E.near,$=E.far),P.layers.mask=j.layers.mask|2,I.layers.mask=j.layers.mask|4,E.layers.mask=P.layers.mask|I.layers.mask;const ht=j.parent,wt=E.cameras;ct(E,ht);for(let Pt=0;Pt<wt.length;Pt++)ct(wt[Pt],ht);wt.length===2?Y(E,P,I):E.projectionMatrix.copy(P.projectionMatrix),pt(j,E,ht)};function pt(j,st,_t){_t===null?j.matrix.copy(st.matrixWorld):(j.matrix.copy(_t.matrixWorld),j.matrix.invert(),j.matrix.multiply(st.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(st.projectionMatrix),j.projectionMatrixInverse.copy(st.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Bi*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(m===null&&g===null))return l},this.setFoveation=function(j){l=j,m!==null&&(m.fixedFoveation=j),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=j)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(E)};let St=null;function bt(j,st){if(h=st.getViewerPose(c||a),x=st,h!==null){const _t=h.views;g!==null&&(t.setRenderTargetFramebuffer(w,g.framebuffer),t.setRenderTarget(w));let ht=!1;_t.length!==E.cameras.length&&(E.cameras.length=0,ht=!0);for(let Pt=0;Pt<_t.length;Pt++){const Ut=_t[Pt];let ne=null;if(g!==null)ne=g.getViewport(Ut);else{const te=d.getViewSubImage(m,Ut);ne=te.viewport,Pt===0&&(t.setRenderTargetTextures(w,te.colorTexture,m.ignoreDepthValues?void 0:te.depthStencilTexture),t.setRenderTarget(w))}let Gt=b[Pt];Gt===void 0&&(Gt=new Ie,Gt.layers.enable(Pt),Gt.viewport=new re,b[Pt]=Gt),Gt.matrix.fromArray(Ut.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(Ut.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(ne.x,ne.y,ne.width,ne.height),Pt===0&&(E.matrix.copy(Gt.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),ht===!0&&E.cameras.push(Gt)}const wt=s.enabledFeatures;if(wt&&wt.includes("depth-sensing")){const Pt=d.getDepthInformation(_t[0]);Pt&&Pt.isValid&&Pt.texture&&v.init(t,Pt,s.renderState)}}for(let _t=0;_t<T.length;_t++){const ht=M[_t],wt=T[_t];ht!==null&&wt!==void 0&&wt.update(ht,st,c||a)}St&&St(j,st),st.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:st}),x=null}const Ht=new Jo;Ht.setAnimationLoop(bt),this.setAnimationLoop=function(j){St=j},this.dispose=function(){}}}const Wn=new $e,am=new Qt;function om(i,t){function e(_,f){_.matrixAutoUpdate===!0&&_.updateMatrix(),f.value.copy(_.matrix)}function n(_,f){f.color.getRGB(_.fogColor.value,Yo(i)),f.isFog?(_.fogNear.value=f.near,_.fogFar.value=f.far):f.isFogExp2&&(_.fogDensity.value=f.density)}function s(_,f,w,T,M){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(_,f):f.isMeshToonMaterial?(r(_,f),d(_,f)):f.isMeshPhongMaterial?(r(_,f),h(_,f)):f.isMeshStandardMaterial?(r(_,f),m(_,f),f.isMeshPhysicalMaterial&&g(_,f,M)):f.isMeshMatcapMaterial?(r(_,f),x(_,f)):f.isMeshDepthMaterial?r(_,f):f.isMeshDistanceMaterial?(r(_,f),v(_,f)):f.isMeshNormalMaterial?r(_,f):f.isLineBasicMaterial?(a(_,f),f.isLineDashedMaterial&&o(_,f)):f.isPointsMaterial?l(_,f,w,T):f.isSpriteMaterial?c(_,f):f.isShadowMaterial?(_.color.value.copy(f.color),_.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(_,f){_.opacity.value=f.opacity,f.color&&_.diffuse.value.copy(f.color),f.emissive&&_.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(_.map.value=f.map,e(f.map,_.mapTransform)),f.alphaMap&&(_.alphaMap.value=f.alphaMap,e(f.alphaMap,_.alphaMapTransform)),f.bumpMap&&(_.bumpMap.value=f.bumpMap,e(f.bumpMap,_.bumpMapTransform),_.bumpScale.value=f.bumpScale,f.side===Se&&(_.bumpScale.value*=-1)),f.normalMap&&(_.normalMap.value=f.normalMap,e(f.normalMap,_.normalMapTransform),_.normalScale.value.copy(f.normalScale),f.side===Se&&_.normalScale.value.negate()),f.displacementMap&&(_.displacementMap.value=f.displacementMap,e(f.displacementMap,_.displacementMapTransform),_.displacementScale.value=f.displacementScale,_.displacementBias.value=f.displacementBias),f.emissiveMap&&(_.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,_.emissiveMapTransform)),f.specularMap&&(_.specularMap.value=f.specularMap,e(f.specularMap,_.specularMapTransform)),f.alphaTest>0&&(_.alphaTest.value=f.alphaTest);const w=t.get(f),T=w.envMap,M=w.envMapRotation;T&&(_.envMap.value=T,Wn.copy(M),Wn.x*=-1,Wn.y*=-1,Wn.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Wn.y*=-1,Wn.z*=-1),_.envMapRotation.value.setFromMatrix4(am.makeRotationFromEuler(Wn)),_.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=f.reflectivity,_.ior.value=f.ior,_.refractionRatio.value=f.refractionRatio),f.lightMap&&(_.lightMap.value=f.lightMap,_.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,_.lightMapTransform)),f.aoMap&&(_.aoMap.value=f.aoMap,_.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,_.aoMapTransform))}function a(_,f){_.diffuse.value.copy(f.color),_.opacity.value=f.opacity,f.map&&(_.map.value=f.map,e(f.map,_.mapTransform))}function o(_,f){_.dashSize.value=f.dashSize,_.totalSize.value=f.dashSize+f.gapSize,_.scale.value=f.scale}function l(_,f,w,T){_.diffuse.value.copy(f.color),_.opacity.value=f.opacity,_.size.value=f.size*w,_.scale.value=T*.5,f.map&&(_.map.value=f.map,e(f.map,_.uvTransform)),f.alphaMap&&(_.alphaMap.value=f.alphaMap,e(f.alphaMap,_.alphaMapTransform)),f.alphaTest>0&&(_.alphaTest.value=f.alphaTest)}function c(_,f){_.diffuse.value.copy(f.color),_.opacity.value=f.opacity,_.rotation.value=f.rotation,f.map&&(_.map.value=f.map,e(f.map,_.mapTransform)),f.alphaMap&&(_.alphaMap.value=f.alphaMap,e(f.alphaMap,_.alphaMapTransform)),f.alphaTest>0&&(_.alphaTest.value=f.alphaTest)}function h(_,f){_.specular.value.copy(f.specular),_.shininess.value=Math.max(f.shininess,1e-4)}function d(_,f){f.gradientMap&&(_.gradientMap.value=f.gradientMap)}function m(_,f){_.metalness.value=f.metalness,f.metalnessMap&&(_.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,_.metalnessMapTransform)),_.roughness.value=f.roughness,f.roughnessMap&&(_.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,_.roughnessMapTransform)),f.envMap&&(_.envMapIntensity.value=f.envMapIntensity)}function g(_,f,w){_.ior.value=f.ior,f.sheen>0&&(_.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),_.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(_.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,_.sheenColorMapTransform)),f.sheenRoughnessMap&&(_.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,_.sheenRoughnessMapTransform))),f.clearcoat>0&&(_.clearcoat.value=f.clearcoat,_.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(_.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,_.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(_.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Se&&_.clearcoatNormalScale.value.negate())),f.dispersion>0&&(_.dispersion.value=f.dispersion),f.iridescence>0&&(_.iridescence.value=f.iridescence,_.iridescenceIOR.value=f.iridescenceIOR,_.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(_.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,_.iridescenceMapTransform)),f.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),f.transmission>0&&(_.transmission.value=f.transmission,_.transmissionSamplerMap.value=w.texture,_.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap&&(_.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,_.transmissionMapTransform)),_.thickness.value=f.thickness,f.thicknessMap&&(_.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=f.attenuationDistance,_.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(_.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(_.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=f.specularIntensity,_.specularColor.value.copy(f.specularColor),f.specularColorMap&&(_.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,_.specularColorMapTransform)),f.specularIntensityMap&&(_.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,_.specularIntensityMapTransform))}function x(_,f){f.matcap&&(_.matcap.value=f.matcap)}function v(_,f){const w=t.get(f).light;_.referencePosition.value.setFromMatrixPosition(w.matrixWorld),_.nearDistance.value=w.shadow.camera.near,_.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function lm(i,t,e,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(w,T){const M=T.program;n.uniformBlockBinding(w,M)}function c(w,T){let M=s[w.id];M===void 0&&(x(w),M=h(w),s[w.id]=M,w.addEventListener("dispose",_));const H=T.program;n.updateUBOMapping(w,H);const R=t.render.frame;r[w.id]!==R&&(m(w),r[w.id]=R)}function h(w){const T=d();w.__bindingPointIndex=T;const M=i.createBuffer(),H=w.__size,R=w.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,H,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,M),M}function d(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(w){const T=s[w.id],M=w.uniforms,H=w.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let R=0,P=M.length;R<P;R++){const I=Array.isArray(M[R])?M[R]:[M[R]];for(let b=0,E=I.length;b<E;b++){const D=I[b];if(g(D,R,b,H)===!0){const $=D.__offset,X=Array.isArray(D.value)?D.value:[D.value];let K=0;for(let tt=0;tt<X.length;tt++){const Z=X[tt],it=v(Z);typeof Z=="number"||typeof Z=="boolean"?(D.__data[0]=Z,i.bufferSubData(i.UNIFORM_BUFFER,$+K,D.__data)):Z.isMatrix3?(D.__data[0]=Z.elements[0],D.__data[1]=Z.elements[1],D.__data[2]=Z.elements[2],D.__data[3]=0,D.__data[4]=Z.elements[3],D.__data[5]=Z.elements[4],D.__data[6]=Z.elements[5],D.__data[7]=0,D.__data[8]=Z.elements[6],D.__data[9]=Z.elements[7],D.__data[10]=Z.elements[8],D.__data[11]=0):(Z.toArray(D.__data,K),K+=it.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,$,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function g(w,T,M,H){const R=w.value,P=T+"_"+M;if(H[P]===void 0)return typeof R=="number"||typeof R=="boolean"?H[P]=R:H[P]=R.clone(),!0;{const I=H[P];if(typeof R=="number"||typeof R=="boolean"){if(I!==R)return H[P]=R,!0}else if(I.equals(R)===!1)return I.copy(R),!0}return!1}function x(w){const T=w.uniforms;let M=0;const H=16;for(let P=0,I=T.length;P<I;P++){const b=Array.isArray(T[P])?T[P]:[T[P]];for(let E=0,D=b.length;E<D;E++){const $=b[E],X=Array.isArray($.value)?$.value:[$.value];for(let K=0,tt=X.length;K<tt;K++){const Z=X[K],it=v(Z),Y=M%H,ct=Y%it.boundary,pt=Y+ct;M+=ct,pt!==0&&H-pt<it.storage&&(M+=H-pt),$.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=M,M+=it.storage}}}const R=M%H;return R>0&&(M+=H-R),w.__size=M,w.__cache={},this}function v(w){const T={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(T.boundary=4,T.storage=4):w.isVector2?(T.boundary=8,T.storage=8):w.isVector3||w.isColor?(T.boundary=16,T.storage=12):w.isVector4?(T.boundary=16,T.storage=16):w.isMatrix3?(T.boundary=48,T.storage=48):w.isMatrix4?(T.boundary=64,T.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),T}function _(w){const T=w.target;T.removeEventListener("dispose",_);const M=a.indexOf(T.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function f(){for(const w in s)i.deleteBuffer(s[w]);a=[],s={},r={}}return{bind:l,update:c,dispose:f}}class cm{constructor(t={}){const{canvas:e=Ph(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:m=!1}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const x=new Uint32Array(4),v=new Int32Array(4);let _=null,f=null;const w=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ce,this.toneMapping=fn,this.toneMappingExposure=1;const M=this;let H=!1,R=0,P=0,I=null,b=-1,E=null;const D=new re,$=new re;let X=null;const K=new kt(0);let tt=0,Z=e.width,it=e.height,Y=1,ct=null,pt=null;const St=new re(0,0,Z,it),bt=new re(0,0,Z,it);let Ht=!1;const j=new Ma;let st=!1,_t=!1;const ht=new Qt,wt=new Qt,Pt=new N,Ut=new re,ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function te(){return I===null?Y:1}let F=n;function Me(S,U){return e.getContext(S,U)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${sr}`),e.addEventListener("webglcontextlost",q,!1),e.addEventListener("webglcontextrestored",nt,!1),e.addEventListener("webglcontextcreationerror",rt,!1),F===null){const U="webgl2";if(F=Me(U,S),F===null)throw Me(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let zt,Bt,At,Jt,Tt,p,u,y,A,C,z,G,k,et,ut,Q,dt,mt,gt,ot,Rt,Dt,Xt,L;function J(){zt=new pf(F),zt.init(),Dt=new Qp(F,zt),Bt=new lf(F,zt,t,Dt),At=new Zp(F,zt),Bt.reverseDepthBuffer&&m&&At.buffers.depth.setReversed(!0),Jt=new _f(F),Tt=new Np,p=new Jp(F,zt,At,Tt,Bt,Dt,Jt),u=new hf(M),y=new ff(M),A=new id(F),Xt=new af(F,A),C=new mf(F,A,Jt,Xt),z=new vf(F,C,A,Jt),gt=new xf(F,Bt,p),Q=new cf(Tt),G=new Up(M,u,y,zt,Bt,Xt,Q),k=new om(M,Tt),et=new Op,ut=new Vp(zt),mt=new rf(M,u,y,At,z,g,l),dt=new qp(M,z,Bt),L=new lm(F,Jt,Bt,At),ot=new of(F,zt,Jt),Rt=new gf(F,zt,Jt),Jt.programs=G.programs,M.capabilities=Bt,M.extensions=zt,M.properties=Tt,M.renderLists=et,M.shadowMap=dt,M.state=At,M.info=Jt}J();const B=new rm(M,F);this.xr=B,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const S=zt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=zt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(S){S!==void 0&&(Y=S,this.setSize(Z,it,!1))},this.getSize=function(S){return S.set(Z,it)},this.setSize=function(S,U,V=!0){if(B.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=S,it=U,e.width=Math.floor(S*Y),e.height=Math.floor(U*Y),V===!0&&(e.style.width=S+"px",e.style.height=U+"px"),this.setViewport(0,0,S,U)},this.getDrawingBufferSize=function(S){return S.set(Z*Y,it*Y).floor()},this.setDrawingBufferSize=function(S,U,V){Z=S,it=U,Y=V,e.width=Math.floor(S*V),e.height=Math.floor(U*V),this.setViewport(0,0,S,U)},this.getCurrentViewport=function(S){return S.copy(D)},this.getViewport=function(S){return S.copy(St)},this.setViewport=function(S,U,V,W){S.isVector4?St.set(S.x,S.y,S.z,S.w):St.set(S,U,V,W),At.viewport(D.copy(St).multiplyScalar(Y).round())},this.getScissor=function(S){return S.copy(bt)},this.setScissor=function(S,U,V,W){S.isVector4?bt.set(S.x,S.y,S.z,S.w):bt.set(S,U,V,W),At.scissor($.copy(bt).multiplyScalar(Y).round())},this.getScissorTest=function(){return Ht},this.setScissorTest=function(S){At.setScissorTest(Ht=S)},this.setOpaqueSort=function(S){ct=S},this.setTransparentSort=function(S){pt=S},this.getClearColor=function(S){return S.copy(mt.getClearColor())},this.setClearColor=function(){mt.setClearColor.apply(mt,arguments)},this.getClearAlpha=function(){return mt.getClearAlpha()},this.setClearAlpha=function(){mt.setClearAlpha.apply(mt,arguments)},this.clear=function(S=!0,U=!0,V=!0){let W=0;if(S){let O=!1;if(I!==null){const at=I.texture.format;O=at===br||at===yr||at===Er}if(O){const at=I.texture.type,ft=at===Je||at===Pn||at===Oi||at===ii||at===Mr||at===Sr,xt=mt.getClearColor(),vt=mt.getClearAlpha(),Lt=xt.r,Ft=xt.g,Mt=xt.b;ft?(x[0]=Lt,x[1]=Ft,x[2]=Mt,x[3]=vt,F.clearBufferuiv(F.COLOR,0,x)):(v[0]=Lt,v[1]=Ft,v[2]=Mt,v[3]=vt,F.clearBufferiv(F.COLOR,0,v))}else W|=F.COLOR_BUFFER_BIT}U&&(W|=F.DEPTH_BUFFER_BIT),V&&(W|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",q,!1),e.removeEventListener("webglcontextrestored",nt,!1),e.removeEventListener("webglcontextcreationerror",rt,!1),et.dispose(),ut.dispose(),Tt.dispose(),u.dispose(),y.dispose(),z.dispose(),Xt.dispose(),L.dispose(),G.dispose(),B.dispose(),B.removeEventListener("sessionstart",Kl),B.removeEventListener("sessionend",Jl),$n.stop()};function q(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),H=!0}function nt(){console.log("THREE.WebGLRenderer: Context Restored."),H=!1;const S=Jt.autoReset,U=dt.enabled,V=dt.autoUpdate,W=dt.needsUpdate,O=dt.type;J(),Jt.autoReset=S,dt.enabled=U,dt.autoUpdate=V,dt.needsUpdate=W,dt.type=O}function rt(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ct(S){const U=S.target;U.removeEventListener("dispose",Ct),ae(U)}function ae(S){_e(S),Tt.remove(S)}function _e(S){const U=Tt.get(S).programs;U!==void 0&&(U.forEach(function(V){G.releaseProgram(V)}),S.isShaderMaterial&&G.releaseShaderCache(S))}this.renderBufferDirect=function(S,U,V,W,O,at){U===null&&(U=ne);const ft=O.isMesh&&O.matrixWorld.determinant()<0,xt=Hm(S,U,V,W,O);At.setMaterial(W,ft);let vt=V.index,Lt=1;if(W.wireframe===!0){if(vt=C.getWireframeAttribute(V),vt===void 0)return;Lt=2}const Ft=V.drawRange,Mt=V.attributes.position;let $t=Ft.start*Lt,ee=(Ft.start+Ft.count)*Lt;at!==null&&($t=Math.max($t,at.start*Lt),ee=Math.min(ee,(at.start+at.count)*Lt)),vt!==null?($t=Math.max($t,0),ee=Math.min(ee,vt.count)):Mt!=null&&($t=Math.max($t,0),ee=Math.min(ee,Mt.count));const ie=ee-$t;if(ie<0||ie===1/0)return;Xt.setup(O,W,xt,V,vt);let Te,Yt=ot;if(vt!==null&&(Te=A.get(vt),Yt=Rt,Yt.setIndex(Te)),O.isMesh)W.wireframe===!0?(At.setLineWidth(W.wireframeLinewidth*te()),Yt.setMode(F.LINES)):Yt.setMode(F.TRIANGLES);else if(O.isLine){let Et=W.linewidth;Et===void 0&&(Et=1),At.setLineWidth(Et*te()),O.isLineSegments?Yt.setMode(F.LINES):O.isLineLoop?Yt.setMode(F.LINE_LOOP):Yt.setMode(F.LINE_STRIP)}else O.isPoints?Yt.setMode(F.POINTS):O.isSprite&&Yt.setMode(F.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Yt.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(zt.get("WEBGL_multi_draw"))Yt.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Et=O._multiDrawStarts,cn=O._multiDrawCounts,qt=O._multiDrawCount,We=vt?A.get(vt).bytesPerElement:1,Li=Tt.get(W).currentProgram.getUniforms();for(let Re=0;Re<qt;Re++)Li.setValue(F,"_gl_DrawID",Re),Yt.render(Et[Re]/We,cn[Re])}else if(O.isInstancedMesh)Yt.renderInstances($t,ie,O.count);else if(V.isInstancedBufferGeometry){const Et=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,cn=Math.min(V.instanceCount,Et);Yt.renderInstances($t,ie,cn)}else Yt.render($t,ie)};function jt(S,U,V){S.transparent===!0&&S.side===Ke&&S.forceSinglePass===!1?(S.side=Se,S.needsUpdate=!0,js(S,U,V),S.side=dn,S.needsUpdate=!0,js(S,U,V),S.side=Ke):js(S,U,V)}this.compile=function(S,U,V=null){V===null&&(V=S),f=ut.get(V),f.init(U),T.push(f),V.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),S!==V&&S.traverseVisible(function(O){O.isLight&&O.layers.test(U.layers)&&(f.pushLight(O),O.castShadow&&f.pushShadow(O))}),f.setupLights();const W=new Set;return S.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const at=O.material;if(at)if(Array.isArray(at))for(let ft=0;ft<at.length;ft++){const xt=at[ft];jt(xt,V,O),W.add(xt)}else jt(at,V,O),W.add(at)}),T.pop(),f=null,W},this.compileAsync=function(S,U,V=null){const W=this.compile(S,U,V);return new Promise(O=>{function at(){if(W.forEach(function(ft){Tt.get(ft).currentProgram.isReady()&&W.delete(ft)}),W.size===0){O(S);return}setTimeout(at,10)}zt.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let Ve=null;function ln(S){Ve&&Ve(S)}function Kl(){$n.stop()}function Jl(){$n.start()}const $n=new Jo;$n.setAnimationLoop(ln),typeof self<"u"&&$n.setContext(self),this.setAnimationLoop=function(S){Ve=S,B.setAnimationLoop(S),S===null?$n.stop():$n.start()},B.addEventListener("sessionstart",Kl),B.addEventListener("sessionend",Jl),this.render=function(S,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(H===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),B.enabled===!0&&B.isPresenting===!0&&(B.cameraAutoUpdate===!0&&B.updateCamera(U),U=B.getCamera()),S.isScene===!0&&S.onBeforeRender(M,S,U,I),f=ut.get(S,T.length),f.init(U),T.push(f),wt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),j.setFromProjectionMatrix(wt),_t=this.localClippingEnabled,st=Q.init(this.clippingPlanes,_t),_=et.get(S,w.length),_.init(),w.push(_),B.enabled===!0&&B.isPresenting===!0){const at=M.xr.getDepthSensingMesh();at!==null&&Ba(at,U,-1/0,M.sortObjects)}Ba(S,U,0,M.sortObjects),_.finish(),M.sortObjects===!0&&_.sort(ct,pt),Gt=B.enabled===!1||B.isPresenting===!1||B.hasDepthSensing()===!1,Gt&&mt.addToRenderList(_,S),this.info.render.frame++,st===!0&&Q.beginShadows();const V=f.state.shadowsArray;dt.render(V,S,U),st===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=_.opaque,O=_.transmissive;if(f.setupLights(),U.isArrayCamera){const at=U.cameras;if(O.length>0)for(let ft=0,xt=at.length;ft<xt;ft++){const vt=at[ft];tc(W,O,S,vt)}Gt&&mt.render(S);for(let ft=0,xt=at.length;ft<xt;ft++){const vt=at[ft];Ql(_,S,vt,vt.viewport)}}else O.length>0&&tc(W,O,S,U),Gt&&mt.render(S),Ql(_,S,U);I!==null&&(p.updateMultisampleRenderTarget(I),p.updateRenderTargetMipmap(I)),S.isScene===!0&&S.onAfterRender(M,S,U),Xt.resetDefaultState(),b=-1,E=null,T.pop(),T.length>0?(f=T[T.length-1],st===!0&&Q.setGlobalState(M.clippingPlanes,f.state.camera)):f=null,w.pop(),w.length>0?_=w[w.length-1]:_=null};function Ba(S,U,V,W){if(S.visible===!1)return;if(S.layers.test(U.layers)){if(S.isGroup)V=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(U);else if(S.isLight)f.pushLight(S),S.castShadow&&f.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||j.intersectsSprite(S)){W&&Ut.setFromMatrixPosition(S.matrixWorld).applyMatrix4(wt);const ft=z.update(S),xt=S.material;xt.visible&&_.push(S,ft,xt,V,Ut.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||j.intersectsObject(S))){const ft=z.update(S),xt=S.material;if(W&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Ut.copy(S.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Ut.copy(ft.boundingSphere.center)),Ut.applyMatrix4(S.matrixWorld).applyMatrix4(wt)),Array.isArray(xt)){const vt=ft.groups;for(let Lt=0,Ft=vt.length;Lt<Ft;Lt++){const Mt=vt[Lt],$t=xt[Mt.materialIndex];$t&&$t.visible&&_.push(S,ft,$t,V,Ut.z,Mt)}}else xt.visible&&_.push(S,ft,xt,V,Ut.z,null)}}const at=S.children;for(let ft=0,xt=at.length;ft<xt;ft++)Ba(at[ft],U,V,W)}function Ql(S,U,V,W){const O=S.opaque,at=S.transmissive,ft=S.transparent;f.setupLightsView(V),st===!0&&Q.setGlobalState(M.clippingPlanes,V),W&&At.viewport(D.copy(W)),O.length>0&&qs(O,U,V),at.length>0&&qs(at,U,V),ft.length>0&&qs(ft,U,V),At.buffers.depth.setTest(!0),At.buffers.depth.setMask(!0),At.buffers.color.setMask(!0),At.setPolygonOffset(!1)}function tc(S,U,V,W){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[W.id]===void 0&&(f.state.transmissionRenderTarget[W.id]=new Ln(1,1,{generateMipmaps:!0,type:zt.has("EXT_color_buffer_half_float")||zt.has("EXT_color_buffer_float")?zi:Je,minFilter:Cn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Wt.workingColorSpace}));const at=f.state.transmissionRenderTarget[W.id],ft=W.viewport||D;at.setSize(ft.z,ft.w);const xt=M.getRenderTarget();M.setRenderTarget(at),M.getClearColor(K),tt=M.getClearAlpha(),tt<1&&M.setClearColor(16777215,.5),M.clear(),Gt&&mt.render(V);const vt=M.toneMapping;M.toneMapping=fn;const Lt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),f.setupLightsView(W),st===!0&&Q.setGlobalState(M.clippingPlanes,W),qs(S,V,W),p.updateMultisampleRenderTarget(at),p.updateRenderTargetMipmap(at),zt.has("WEBGL_multisampled_render_to_texture")===!1){let Ft=!1;for(let Mt=0,$t=U.length;Mt<$t;Mt++){const ee=U[Mt],ie=ee.object,Te=ee.geometry,Yt=ee.material,Et=ee.group;if(Yt.side===Ke&&ie.layers.test(W.layers)){const cn=Yt.side;Yt.side=Se,Yt.needsUpdate=!0,ec(ie,V,W,Te,Yt,Et),Yt.side=cn,Yt.needsUpdate=!0,Ft=!0}}Ft===!0&&(p.updateMultisampleRenderTarget(at),p.updateRenderTargetMipmap(at))}M.setRenderTarget(xt),M.setClearColor(K,tt),Lt!==void 0&&(W.viewport=Lt),M.toneMapping=vt}function qs(S,U,V){const W=U.isScene===!0?U.overrideMaterial:null;for(let O=0,at=S.length;O<at;O++){const ft=S[O],xt=ft.object,vt=ft.geometry,Lt=W===null?ft.material:W,Ft=ft.group;xt.layers.test(V.layers)&&ec(xt,U,V,vt,Lt,Ft)}}function ec(S,U,V,W,O,at){S.onBeforeRender(M,U,V,W,O,at),S.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),O.onBeforeRender(M,U,V,W,S,at),O.transparent===!0&&O.side===Ke&&O.forceSinglePass===!1?(O.side=Se,O.needsUpdate=!0,M.renderBufferDirect(V,U,W,O,S,at),O.side=dn,O.needsUpdate=!0,M.renderBufferDirect(V,U,W,O,S,at),O.side=Ke):M.renderBufferDirect(V,U,W,O,S,at),S.onAfterRender(M,U,V,W,O,at)}function js(S,U,V){U.isScene!==!0&&(U=ne);const W=Tt.get(S),O=f.state.lights,at=f.state.shadowsArray,ft=O.state.version,xt=G.getParameters(S,O.state,at,U,V),vt=G.getProgramCacheKey(xt);let Lt=W.programs;W.environment=S.isMeshStandardMaterial?U.environment:null,W.fog=U.fog,W.envMap=(S.isMeshStandardMaterial?y:u).get(S.envMap||W.environment),W.envMapRotation=W.environment!==null&&S.envMap===null?U.environmentRotation:S.envMapRotation,Lt===void 0&&(S.addEventListener("dispose",Ct),Lt=new Map,W.programs=Lt);let Ft=Lt.get(vt);if(Ft!==void 0){if(W.currentProgram===Ft&&W.lightsStateVersion===ft)return ic(S,xt),Ft}else xt.uniforms=G.getUniforms(S),S.onBeforeCompile(xt,M),Ft=G.acquireProgram(xt,vt),Lt.set(vt,Ft),W.uniforms=xt.uniforms;const Mt=W.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Mt.clippingPlanes=Q.uniform),ic(S,xt),W.needsLights=Vm(S),W.lightsStateVersion=ft,W.needsLights&&(Mt.ambientLightColor.value=O.state.ambient,Mt.lightProbe.value=O.state.probe,Mt.directionalLights.value=O.state.directional,Mt.directionalLightShadows.value=O.state.directionalShadow,Mt.spotLights.value=O.state.spot,Mt.spotLightShadows.value=O.state.spotShadow,Mt.rectAreaLights.value=O.state.rectArea,Mt.ltc_1.value=O.state.rectAreaLTC1,Mt.ltc_2.value=O.state.rectAreaLTC2,Mt.pointLights.value=O.state.point,Mt.pointLightShadows.value=O.state.pointShadow,Mt.hemisphereLights.value=O.state.hemi,Mt.directionalShadowMap.value=O.state.directionalShadowMap,Mt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Mt.spotShadowMap.value=O.state.spotShadowMap,Mt.spotLightMatrix.value=O.state.spotLightMatrix,Mt.spotLightMap.value=O.state.spotLightMap,Mt.pointShadowMap.value=O.state.pointShadowMap,Mt.pointShadowMatrix.value=O.state.pointShadowMatrix),W.currentProgram=Ft,W.uniformsList=null,Ft}function nc(S){if(S.uniformsList===null){const U=S.currentProgram.getUniforms();S.uniformsList=Os.seqWithValue(U.seq,S.uniforms)}return S.uniformsList}function ic(S,U){const V=Tt.get(S);V.outputColorSpace=U.outputColorSpace,V.batching=U.batching,V.batchingColor=U.batchingColor,V.instancing=U.instancing,V.instancingColor=U.instancingColor,V.instancingMorph=U.instancingMorph,V.skinning=U.skinning,V.morphTargets=U.morphTargets,V.morphNormals=U.morphNormals,V.morphColors=U.morphColors,V.morphTargetsCount=U.morphTargetsCount,V.numClippingPlanes=U.numClippingPlanes,V.numIntersection=U.numClipIntersection,V.vertexAlphas=U.vertexAlphas,V.vertexTangents=U.vertexTangents,V.toneMapping=U.toneMapping}function Hm(S,U,V,W,O){U.isScene!==!0&&(U=ne),p.resetTextureUnits();const at=U.fog,ft=W.isMeshStandardMaterial?U.environment:null,xt=I===null?M.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:ai,vt=(W.isMeshStandardMaterial?y:u).get(W.envMap||ft),Lt=W.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Ft=!!V.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Mt=!!V.morphAttributes.position,$t=!!V.morphAttributes.normal,ee=!!V.morphAttributes.color;let ie=fn;W.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ie=M.toneMapping);const Te=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Yt=Te!==void 0?Te.length:0,Et=Tt.get(W),cn=f.state.lights;if(st===!0&&(_t===!0||S!==E)){const Ue=S===E&&W.id===b;Q.setState(W,S,Ue)}let qt=!1;W.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==cn.state.version||Et.outputColorSpace!==xt||O.isBatchedMesh&&Et.batching===!1||!O.isBatchedMesh&&Et.batching===!0||O.isBatchedMesh&&Et.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Et.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Et.instancing===!1||!O.isInstancedMesh&&Et.instancing===!0||O.isSkinnedMesh&&Et.skinning===!1||!O.isSkinnedMesh&&Et.skinning===!0||O.isInstancedMesh&&Et.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Et.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Et.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Et.instancingMorph===!1&&O.morphTexture!==null||Et.envMap!==vt||W.fog===!0&&Et.fog!==at||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==Q.numPlanes||Et.numIntersection!==Q.numIntersection)||Et.vertexAlphas!==Lt||Et.vertexTangents!==Ft||Et.morphTargets!==Mt||Et.morphNormals!==$t||Et.morphColors!==ee||Et.toneMapping!==ie||Et.morphTargetsCount!==Yt)&&(qt=!0):(qt=!0,Et.__version=W.version);let We=Et.currentProgram;qt===!0&&(We=js(W,U,O));let Li=!1,Re=!1,ji=!1;const se=We.getUniforms(),qe=Et.uniforms;if(At.useProgram(We.program)&&(Li=!0,Re=!0,ji=!0),W.id!==b&&(b=W.id,Re=!0),Li||E!==S){At.buffers.depth.getReversed()?(ht.copy(S.projectionMatrix),Lh(ht),Ih(ht),se.setValue(F,"projectionMatrix",ht)):se.setValue(F,"projectionMatrix",S.projectionMatrix),se.setValue(F,"viewMatrix",S.matrixWorldInverse);const yn=se.map.cameraPosition;yn!==void 0&&yn.setValue(F,Pt.setFromMatrixPosition(S.matrixWorld)),Bt.logarithmicDepthBuffer&&se.setValue(F,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&se.setValue(F,"isOrthographic",S.isOrthographicCamera===!0),E!==S&&(E=S,Re=!0,ji=!0)}if(O.isSkinnedMesh){se.setOptional(F,O,"bindMatrix"),se.setOptional(F,O,"bindMatrixInverse");const Ue=O.skeleton;Ue&&(Ue.boneTexture===null&&Ue.computeBoneTexture(),se.setValue(F,"boneTexture",Ue.boneTexture,p))}O.isBatchedMesh&&(se.setOptional(F,O,"batchingTexture"),se.setValue(F,"batchingTexture",O._matricesTexture,p),se.setOptional(F,O,"batchingIdTexture"),se.setValue(F,"batchingIdTexture",O._indirectTexture,p),se.setOptional(F,O,"batchingColorTexture"),O._colorsTexture!==null&&se.setValue(F,"batchingColorTexture",O._colorsTexture,p));const Zi=V.morphAttributes;if((Zi.position!==void 0||Zi.normal!==void 0||Zi.color!==void 0)&&gt.update(O,V,We),(Re||Et.receiveShadow!==O.receiveShadow)&&(Et.receiveShadow=O.receiveShadow,se.setValue(F,"receiveShadow",O.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(qe.envMap.value=vt,qe.flipEnvMap.value=vt.isCubeTexture&&vt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&U.environment!==null&&(qe.envMapIntensity.value=U.environmentIntensity),Re&&(se.setValue(F,"toneMappingExposure",M.toneMappingExposure),Et.needsLights&&Gm(qe,ji),at&&W.fog===!0&&k.refreshFogUniforms(qe,at),k.refreshMaterialUniforms(qe,W,Y,it,f.state.transmissionRenderTarget[S.id]),Os.upload(F,nc(Et),qe,p)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Os.upload(F,nc(Et),qe,p),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&se.setValue(F,"center",O.center),se.setValue(F,"modelViewMatrix",O.modelViewMatrix),se.setValue(F,"normalMatrix",O.normalMatrix),se.setValue(F,"modelMatrix",O.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Ue=W.uniformsGroups;for(let yn=0,bn=Ue.length;yn<bn;yn++){const sc=Ue[yn];L.update(sc,We),L.bind(sc,We)}}return We}function Gm(S,U){S.ambientLightColor.needsUpdate=U,S.lightProbe.needsUpdate=U,S.directionalLights.needsUpdate=U,S.directionalLightShadows.needsUpdate=U,S.pointLights.needsUpdate=U,S.pointLightShadows.needsUpdate=U,S.spotLights.needsUpdate=U,S.spotLightShadows.needsUpdate=U,S.rectAreaLights.needsUpdate=U,S.hemisphereLights.needsUpdate=U}function Vm(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(S,U,V){Tt.get(S.texture).__webglTexture=U,Tt.get(S.depthTexture).__webglTexture=V;const W=Tt.get(S);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=V===void 0,W.__autoAllocateDepthBuffer||zt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,U){const V=Tt.get(S);V.__webglFramebuffer=U,V.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(S,U=0,V=0){I=S,R=U,P=V;let W=!0,O=null,at=!1,ft=!1;if(S){const vt=Tt.get(S);if(vt.__useDefaultFramebuffer!==void 0)At.bindFramebuffer(F.FRAMEBUFFER,null),W=!1;else if(vt.__webglFramebuffer===void 0)p.setupRenderTarget(S);else if(vt.__hasExternalTextures)p.rebindTextures(S,Tt.get(S.texture).__webglTexture,Tt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Mt=S.depthTexture;if(vt.__boundDepthTexture!==Mt){if(Mt!==null&&Tt.has(Mt)&&(S.width!==Mt.image.width||S.height!==Mt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");p.setupDepthRenderbuffer(S)}}const Lt=S.texture;(Lt.isData3DTexture||Lt.isDataArrayTexture||Lt.isCompressedArrayTexture)&&(ft=!0);const Ft=Tt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ft[U])?O=Ft[U][V]:O=Ft[U],at=!0):S.samples>0&&p.useMultisampledRTT(S)===!1?O=Tt.get(S).__webglMultisampledFramebuffer:Array.isArray(Ft)?O=Ft[V]:O=Ft,D.copy(S.viewport),$.copy(S.scissor),X=S.scissorTest}else D.copy(St).multiplyScalar(Y).floor(),$.copy(bt).multiplyScalar(Y).floor(),X=Ht;if(At.bindFramebuffer(F.FRAMEBUFFER,O)&&W&&At.drawBuffers(S,O),At.viewport(D),At.scissor($),At.setScissorTest(X),at){const vt=Tt.get(S.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+U,vt.__webglTexture,V)}else if(ft){const vt=Tt.get(S.texture),Lt=U||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,vt.__webglTexture,V||0,Lt)}b=-1},this.readRenderTargetPixels=function(S,U,V,W,O,at,ft){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xt=Tt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ft!==void 0&&(xt=xt[ft]),xt){At.bindFramebuffer(F.FRAMEBUFFER,xt);try{const vt=S.texture,Lt=vt.format,Ft=vt.type;if(!Bt.textureFormatReadable(Lt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Bt.textureTypeReadable(Ft)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=S.width-W&&V>=0&&V<=S.height-O&&F.readPixels(U,V,W,O,Dt.convert(Lt),Dt.convert(Ft),at)}finally{const vt=I!==null?Tt.get(I).__webglFramebuffer:null;At.bindFramebuffer(F.FRAMEBUFFER,vt)}}},this.readRenderTargetPixelsAsync=async function(S,U,V,W,O,at,ft){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xt=Tt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ft!==void 0&&(xt=xt[ft]),xt){const vt=S.texture,Lt=vt.format,Ft=vt.type;if(!Bt.textureFormatReadable(Lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Bt.textureTypeReadable(Ft))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=S.width-W&&V>=0&&V<=S.height-O){At.bindFramebuffer(F.FRAMEBUFFER,xt);const Mt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Mt),F.bufferData(F.PIXEL_PACK_BUFFER,at.byteLength,F.STREAM_READ),F.readPixels(U,V,W,O,Dt.convert(Lt),Dt.convert(Ft),0);const $t=I!==null?Tt.get(I).__webglFramebuffer:null;At.bindFramebuffer(F.FRAMEBUFFER,$t);const ee=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Dh(F,ee,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Mt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,at),F.deleteBuffer(Mt),F.deleteSync(ee),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,U=null,V=0){S.isTexture!==!0&&(Hi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,S=arguments[1]);const W=Math.pow(2,-V),O=Math.floor(S.image.width*W),at=Math.floor(S.image.height*W),ft=U!==null?U.x:0,xt=U!==null?U.y:0;p.setTexture2D(S,0),F.copyTexSubImage2D(F.TEXTURE_2D,V,0,0,ft,xt,O,at),At.unbindTexture()},this.copyTextureToTexture=function(S,U,V=null,W=null,O=0){S.isTexture!==!0&&(Hi("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,S=arguments[1],U=arguments[2],O=arguments[3]||0,V=null);let at,ft,xt,vt,Lt,Ft,Mt,$t,ee;const ie=S.isCompressedTexture?S.mipmaps[O]:S.image;V!==null?(at=V.max.x-V.min.x,ft=V.max.y-V.min.y,xt=V.isBox3?V.max.z-V.min.z:1,vt=V.min.x,Lt=V.min.y,Ft=V.isBox3?V.min.z:0):(at=ie.width,ft=ie.height,xt=ie.depth||1,vt=0,Lt=0,Ft=0),W!==null?(Mt=W.x,$t=W.y,ee=W.z):(Mt=0,$t=0,ee=0);const Te=Dt.convert(U.format),Yt=Dt.convert(U.type);let Et;U.isData3DTexture?(p.setTexture3D(U,0),Et=F.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(p.setTexture2DArray(U,0),Et=F.TEXTURE_2D_ARRAY):(p.setTexture2D(U,0),Et=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,U.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,U.unpackAlignment);const cn=F.getParameter(F.UNPACK_ROW_LENGTH),qt=F.getParameter(F.UNPACK_IMAGE_HEIGHT),We=F.getParameter(F.UNPACK_SKIP_PIXELS),Li=F.getParameter(F.UNPACK_SKIP_ROWS),Re=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,ie.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ie.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,vt),F.pixelStorei(F.UNPACK_SKIP_ROWS,Lt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ft);const ji=S.isDataArrayTexture||S.isData3DTexture,se=U.isDataArrayTexture||U.isData3DTexture;if(S.isRenderTargetTexture||S.isDepthTexture){const qe=Tt.get(S),Zi=Tt.get(U),Ue=Tt.get(qe.__renderTarget),yn=Tt.get(Zi.__renderTarget);At.bindFramebuffer(F.READ_FRAMEBUFFER,Ue.__webglFramebuffer),At.bindFramebuffer(F.DRAW_FRAMEBUFFER,yn.__webglFramebuffer);for(let bn=0;bn<xt;bn++)ji&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Tt.get(S).__webglTexture,O,Ft+bn),S.isDepthTexture?(se&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Tt.get(U).__webglTexture,O,ee+bn),F.blitFramebuffer(vt,Lt,at,ft,Mt,$t,at,ft,F.DEPTH_BUFFER_BIT,F.NEAREST)):se?F.copyTexSubImage3D(Et,O,Mt,$t,ee+bn,vt,Lt,at,ft):F.copyTexSubImage2D(Et,O,Mt,$t,ee+bn,vt,Lt,at,ft);At.bindFramebuffer(F.READ_FRAMEBUFFER,null),At.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else se?S.isDataTexture||S.isData3DTexture?F.texSubImage3D(Et,O,Mt,$t,ee,at,ft,xt,Te,Yt,ie.data):U.isCompressedArrayTexture?F.compressedTexSubImage3D(Et,O,Mt,$t,ee,at,ft,xt,Te,ie.data):F.texSubImage3D(Et,O,Mt,$t,ee,at,ft,xt,Te,Yt,ie):S.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,O,Mt,$t,at,ft,Te,Yt,ie.data):S.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,O,Mt,$t,ie.width,ie.height,Te,ie.data):F.texSubImage2D(F.TEXTURE_2D,O,Mt,$t,at,ft,Te,Yt,ie);F.pixelStorei(F.UNPACK_ROW_LENGTH,cn),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,qt),F.pixelStorei(F.UNPACK_SKIP_PIXELS,We),F.pixelStorei(F.UNPACK_SKIP_ROWS,Li),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Re),O===0&&U.generateMipmaps&&F.generateMipmap(Et),At.unbindTexture()},this.copyTextureToTexture3D=function(S,U,V=null,W=null,O=0){return S.isTexture!==!0&&(Hi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),V=arguments[0]||null,W=arguments[1]||null,S=arguments[2],U=arguments[3],O=arguments[4]||0),Hi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(S,U,V,W,O)},this.initRenderTarget=function(S){Tt.get(S).__webglFramebuffer===void 0&&p.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?p.setTextureCube(S,0):S.isData3DTexture?p.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?p.setTexture2DArray(S,0):p.setTexture2D(S,0),At.unbindTexture()},this.resetState=function(){R=0,P=0,I=null,At.reset(),Xt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Wt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Wt._getUnpackColorSpace()}}class hm extends le{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new $e,this.environmentIntensity=1,this.environmentRotation=new $e,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Pa extends Si{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Bs=new N,ks=new N,Pl=new Qt,Yi=new Ss,Hs=new xs,Da=new N,Dl=new N;class dm extends le{constructor(t=new Ge,e=new Pa){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Bs.fromBufferAttribute(e,s-1),ks.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Bs.distanceTo(ks);t.setAttribute("lineDistance",new De(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hs.copy(n.boundingSphere),Hs.applyMatrix4(s),Hs.radius+=r,t.ray.intersectsSphere(Hs)===!1)return;Pl.copy(s).invert(),Yi.copy(t.ray).applyMatrix4(Pl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,m=n.attributes.position;if(h!==null){const g=Math.max(0,a.start),x=Math.min(h.count,a.start+a.count);for(let v=g,_=x-1;v<_;v+=c){const f=h.getX(v),w=h.getX(v+1),T=Gs(this,t,Yi,l,f,w);T&&e.push(T)}if(this.isLineLoop){const v=h.getX(x-1),_=h.getX(g),f=Gs(this,t,Yi,l,v,_);f&&e.push(f)}}else{const g=Math.max(0,a.start),x=Math.min(m.count,a.start+a.count);for(let v=g,_=x-1;v<_;v+=c){const f=Gs(this,t,Yi,l,v,v+1);f&&e.push(f)}if(this.isLineLoop){const v=Gs(this,t,Yi,l,x-1,g);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Gs(i,t,e,n,s,r){const a=i.geometry.attributes.position;if(Bs.fromBufferAttribute(a,s),ks.fromBufferAttribute(a,r),e.distanceSqToSegment(Bs,ks,Da,Dl)>n)return;Da.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Da);if(!(l<t.near||l>t.far))return{distance:l,point:Dl.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const Ll=new N,Il=new N;class Ul extends dm{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Ll.fromBufferAttribute(e,s),Il.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Ll.distanceTo(Il);t.setAttribute("lineDistance",new De(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}const Vs=new N,Ws=new N,La=new N,Xs=new Pe;class um extends Ge{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(li*e),a=t.getIndex(),o=t.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),m={},g=[];for(let x=0;x<l;x+=3){a?(c[0]=a.getX(x),c[1]=a.getX(x+1),c[2]=a.getX(x+2)):(c[0]=x,c[1]=x+1,c[2]=x+2);const{a:v,b:_,c:f}=Xs;if(v.fromBufferAttribute(o,c[0]),_.fromBufferAttribute(o,c[1]),f.fromBufferAttribute(o,c[2]),Xs.getNormal(La),d[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,d[1]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,d[2]=`${Math.round(f.x*s)},${Math.round(f.y*s)},${Math.round(f.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let w=0;w<3;w++){const T=(w+1)%3,M=d[w],H=d[T],R=Xs[h[w]],P=Xs[h[T]],I=`${M}_${H}`,b=`${H}_${M}`;b in m&&m[b]?(La.dot(m[b].normal)<=r&&(g.push(R.x,R.y,R.z),g.push(P.x,P.y,P.z)),m[b]=null):I in m||(m[I]={index0:c[w],index1:c[T],normal:La.clone()})}}for(const x in m)if(m[x]){const{index0:v,index1:_}=m[x];Vs.fromBufferAttribute(o,v),Ws.fromBufferAttribute(o,_),g.push(Vs.x,Vs.y,Vs.z),g.push(Ws.x,Ws.y,Ws.z)}this.setAttribute("position",new De(g,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Nl extends Si{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=go,this.normalScale=new It(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new $e,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Fl extends le{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class fm extends Fl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(le.DEFAULT_UP),this.updateMatrix(),this.groundColor=new kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ia=new Qt,Ol=new N,zl=new N;class pm{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new It(512,512),this.map=null,this.mapPass=null,this.matrix=new Qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ma,this._frameExtents=new It(1,1),this._viewportCount=1,this._viewports=[new re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ol.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ol),zl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(zl),e.updateMatrixWorld(),Ia.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ia),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ia)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class mm extends pm{constructor(){super(new Qo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class gm extends Fl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(le.DEFAULT_UP),this.updateMatrix(),this.target=new le,this.shadow=new mm}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Bl=new Qt;class _m{constructor(t,e,n=0,s=1/0){this.ray=new Ss(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new aa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Bl.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Bl),this}intersectObject(t,e=!0,n=[]){return Ua(t,this,n,e),n.sort(kl),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Ua(t[s],this,n,e);return n.sort(kl),n}}function kl(i,t){return i.distance-t.distance}function Ua(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)Ua(r[a],t,e,!0)}}class Hl{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(me(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class xm extends Ul{constructor(t=10,e=10,n=4473924,s=8947848){n=new kt(n),s=new kt(s);const r=e/2,a=t/e,o=t/2,l=[],c=[];for(let m=0,g=0,x=-o;m<=e;m++,x+=a){l.push(-o,0,x,o,0,x),l.push(x,0,-o,x,0,o);const v=m===r?n:s;v.toArray(c,g),g+=3,v.toArray(c,g),g+=3,v.toArray(c,g),g+=3,v.toArray(c,g),g+=3}const h=new Ge;h.setAttribute("position",new De(l,3)),h.setAttribute("color",new De(c,3));const d=new Pa({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class vm extends Dn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:sr}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=sr);const Gl={type:"change"},Na={type:"start"},Vl={type:"end"},$s=new Ss,Wl=new En,Mm=Math.cos(70*Eo.DEG2RAD),ue=new N,be=2*Math.PI,Kt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Fa=1e-6;class Sm extends vm{constructor(t,e=null){super(t,e),this.state=Kt.NONE,this.enabled=!0,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Kn.ROTATE,MIDDLE:Kn.DOLLY,RIGHT:Kn.PAN},this.touches={ONE:Jn.ROTATE,TWO:Jn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new In,this._lastTargetPosition=new N,this._quat=new In().setFromUnitVectors(t.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Hl,this._sphericalDelta=new Hl,this._scale=1,this._panOffset=new N,this._rotateStart=new It,this._rotateEnd=new It,this._rotateDelta=new It,this._panStart=new It,this._panEnd=new It,this._panDelta=new It,this._dollyStart=new It,this._dollyEnd=new It,this._dollyDelta=new It,this._dollyDirection=new N,this._mouse=new It,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ym.bind(this),this._onPointerDown=Em.bind(this),this._onPointerUp=bm.bind(this),this._onContextMenu=Dm.bind(this),this._onMouseWheel=Am.bind(this),this._onKeyDown=Rm.bind(this),this._onTouchStart=Cm.bind(this),this._onTouchMove=Pm.bind(this),this._onMouseDown=Tm.bind(this),this._onMouseMove=wm.bind(this),this._interceptControlDown=Lm.bind(this),this._interceptControlUp=Im.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Gl),this.update(),this.state=Kt.NONE}update(t=null){const e=this.object.position;ue.copy(e).sub(this.target),ue.applyQuaternion(this._quat),this._spherical.setFromVector3(ue),this.autoRotate&&this.state===Kt.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=be:n>Math.PI&&(n-=be),s<-Math.PI?s+=be:s>Math.PI&&(s-=be),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(ue.setFromSpherical(this._spherical),ue.applyQuaternion(this._quatInverse),e.copy(this.target).add(ue),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=ue.length();a=this._clampDistance(o*this._scale);const l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const o=new N(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new N(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=ue.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):($s.origin.copy(this.object.position),$s.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot($s.direction))<Mm?this.object.lookAt(this.target):(Wl.setFromNormalAndCoplanarPoint(this.object.up,this.target),$s.intersectPlane(Wl,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Fa||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Fa||this._lastTargetPosition.distanceToSquared(this.target)>Fa?(this.dispatchEvent(Gl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?be/60*this.autoRotateSpeed*t:be/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){ue.setFromMatrixColumn(e,0),ue.multiplyScalar(-t),this._panOffset.add(ue)}_panUp(t,e){this.screenSpacePanning===!0?ue.setFromMatrixColumn(e,1):(ue.setFromMatrixColumn(e,0),ue.crossVectors(this.object.up,ue)),ue.multiplyScalar(t),this._panOffset.add(ue)}_pan(t,e){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;ue.copy(s).sub(this.target);let r=ue.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/n.clientHeight,this.object.matrix),this._panUp(2*e*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=t-n.left,r=e-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(be*this._rotateDelta.x/e.clientHeight),this._rotateUp(be*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(be*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateUp(-be*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(be*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this._rotateLeft(-be*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(n,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const n=this._getSecondPointerPosition(t),s=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(be*this._rotateDelta.x/e.clientHeight),this._rotateUp(be*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),n=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),n=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new It,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,n={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function Em(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function ym(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function bm(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Vl),this.state=Kt.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function Tm(i){let t;switch(i.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Kn.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=Kt.DOLLY;break;case Kn.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Kt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Kt.ROTATE}break;case Kn.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=Kt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=Kt.PAN}break;default:this.state=Kt.NONE}this.state!==Kt.NONE&&this.dispatchEvent(Na)}function wm(i){switch(this.state){case Kt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case Kt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case Kt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Am(i){this.enabled===!1||this.enableZoom===!1||this.state!==Kt.NONE||(i.preventDefault(),this.dispatchEvent(Na),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Vl))}function Rm(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function Cm(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Jn.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=Kt.TOUCH_ROTATE;break;case Jn.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=Kt.TOUCH_PAN;break;default:this.state=Kt.NONE}break;case 2:switch(this.touches.TWO){case Jn.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=Kt.TOUCH_DOLLY_PAN;break;case Jn.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=Kt.TOUCH_DOLLY_ROTATE;break;default:this.state=Kt.NONE}break;default:this.state=Kt.NONE}this.state!==Kt.NONE&&this.dispatchEvent(Na)}function Pm(i){switch(this._trackPointer(i),this.state){case Kt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case Kt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case Kt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case Kt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=Kt.NONE}}function Dm(i){this.enabled!==!1&&i.preventDefault()}function Lm(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Im(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Ys extends le{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new It(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const Ci=new N,Xl=new Qt,$l=new Qt,Yl=new N,ql=new N;class Um{constructor(t={}){const e=this;let n,s,r,a;const o={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:n,height:s}},this.render=function(x,v){x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),v.parent===null&&v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),Xl.copy(v.matrixWorldInverse),$l.multiplyMatrices(v.projectionMatrix,Xl),h(x,x,v),g(x)},this.setSize=function(x,v){n=x,s=v,r=n/2,a=s/2,l.style.width=x+"px",l.style.height=v+"px"};function c(x){x.isCSS2DObject&&(x.element.style.display="none");for(let v=0,_=x.children.length;v<_;v++)c(x.children[v])}function h(x,v,_){if(x.visible===!1){c(x);return}if(x.isCSS2DObject){Ci.setFromMatrixPosition(x.matrixWorld),Ci.applyMatrix4($l);const f=Ci.z>=-1&&Ci.z<=1&&x.layers.test(_.layers)===!0,w=x.element;w.style.display=f===!0?"":"none",f===!0&&(x.onBeforeRender(e,v,_),w.style.transform="translate("+-100*x.center.x+"%,"+-100*x.center.y+"%)translate("+(Ci.x*r+r)+"px,"+(-Ci.y*a+a)+"px)",w.parentNode!==l&&l.appendChild(w),x.onAfterRender(e,v,_));const T={distanceToCameraSquared:d(_,x)};o.objects.set(x,T)}for(let f=0,w=x.children.length;f<w;f++)h(x.children[f],v,_)}function d(x,v){return Yl.setFromMatrixPosition(x.matrixWorld),ql.setFromMatrixPosition(v.matrixWorld),Yl.distanceToSquared(ql)}function m(x){const v=[];return x.traverseVisible(function(_){_.isCSS2DObject&&v.push(_)}),v}function g(x){const v=m(x).sort(function(f,w){if(f.renderOrder!==w.renderOrder)return w.renderOrder-f.renderOrder;const T=o.objects.get(f).distanceToCameraSquared,M=o.objects.get(w).distanceToCameraSquared;return T-M}),_=v.length;for(let f=0,w=v.length;f<w;f++)v[f].element.style.zIndex=_-f}}}function Nm(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new Ge;let c=0;for(let h=0;h<i.length;++h){const d=i[h];let m=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const g in d.attributes){if(!n.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+g+'" attribute exists among all geometries, or in none of them.'),null;r[g]===void 0&&(r[g]=[]),r[g].push(d.attributes[g]),m++}if(m!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const g in d.morphAttributes){if(!s.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[g]===void 0&&(a[g]=[]),a[g].push(d.morphAttributes[g])}if(t){let g;if(e)g=d.index.count;else if(d.attributes.position!==void 0)g=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,g,h),c+=g}}if(e){let h=0;const d=[];for(let m=0;m<i.length;++m){const g=i[m].index;for(let x=0;x<g.count;++x)d.push(g.getX(x)+h);h+=i[m].attributes.position.count}l.setIndex(d)}for(const h in r){const d=jl(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(const h in a){const d=a[h][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let m=0;m<d;++m){const g=[];for(let v=0;v<a[h].length;++v)g.push(a[h][v][m]);const x=jl(g);if(!x)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(x)}}return l}function jl(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new He(a,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const d=l/e;for(let m=0,g=h.count;m<g;m++)for(let x=0;x<e;x++){const v=h.getComponent(m,x);o.setComponent(m+d,x,v)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}const Pi=.2,Oa=2.1,Fm=1.1,qi="#e2001a";function Zl(i,t){const e=i.map(s=>(t?new ye(s.w,t,s.d):new Bn(s.w,s.d).rotateX(-Math.PI/2)).translate(s.x+s.w/2,0,s.z+s.d/2));if(!e.length)return new Bn(0,0);if(e.length===1)return e[0];const n=Nm(e);return e.forEach(s=>s.dispose()),n}const Om=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2;class zm{constructor(t,e={}){this.container=t,this.options={wallMode:"full",explode:0,labels:!0,background:"#eef1f5",onRoomClick:null,onTankClick:null,onPrinterClick:null,...e},this.building=null,this.focusFloorId=null,this.selectedRoomId=null,this.hoverRoomId=null,this.selectedTankId=null,this.hoverTankId=null,this.selectedPrinterId=null,this.hoverPrinterId=null,this.rooms=new Map,this.tanks=new Map,this.printers=new Map,this.floors=new Map,this.selectionObj=null,this.anim=null,this.hasFitted=!1;const n=t.clientWidth||1,s=t.clientHeight||1,r=this.renderer=new cm({antialias:!0});r.setPixelRatio(Math.min(window.devicePixelRatio,2)),r.setSize(n,s),r.shadowMap.enabled=!0,r.shadowMap.type=Qa,t.appendChild(r.domElement),this.labelRenderer=new Um,this.labelRenderer.setSize(n,s),this.labelRenderer.domElement.className="label-layer",t.appendChild(this.labelRenderer.domElement),this.scene=new hm,this.scene.background=new kt(this.options.background),this.camera=new Ie(45,n/s,.1,2e3),this.camera.position.set(30,28,38);const a=this.controls=new Sm(this.camera,r.domElement);a.enableDamping=!0,a.dampingFactor=.08,a.maxPolarAngle=Math.PI*.48,a.minDistance=3,a.maxDistance=400,a.addEventListener("start",()=>this.anim=null),this.scene.add(new fm(16777215,11121599,1.5));const o=this.sun=new gm(16777215,2.2);o.castShadow=!0,o.shadow.mapSize.set(2048,2048),o.shadow.bias=-4e-4,o.shadow.normalBias=.03,this.scene.add(o,o.target),this.ground=new ce(new Bn(1e3,1e3),new Nl({color:14672873,roughness:1})),this.ground.rotation.x=-Math.PI/2,this.ground.position.y=-Pi-.01,this.ground.receiveShadow=!0,this.scene.add(this.ground),this.grid=new xm(300,300,13225943,14015200),this.grid.position.y=-Pi-.005,this.scene.add(this.grid),this.buildingGroup=new Vn,this.scene.add(this.buildingGroup),this.raycaster=new _m,this.bindPointer(),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(t),this.tick=this.tick.bind(this),this.raf=requestAnimationFrame(this.tick)}setBuilding(t){this.building=t,this.clear();let e=0;t.floors.forEach((n,s)=>{const r=t.floors[s-1],a={hasFloorAbove:s<t.floors.length-1,openings:r?r.rooms.filter(l=>l.type==="stairs").map(l=>Ks(l,r.height).opening):[]},o=this.buildFloor(n,a);o.userData.elevation=e,o.userData.index=s,this.floors.set(n.id,o),this.buildingGroup.add(o),e+=n.height}),this.layoutFloors(),this.applyFocus(),this.applyHighlight(),this.hasFitted||(this.fitAll(!1),this.hasFitted=!0)}setFocusFloor(t){this.focusFloorId=t,this.applyFocus(),this.applyHighlight()}setSelectedRoom(t){this.selectedRoomId=t,this.applyHighlight()}setSelectedPrinter(t){this.selectedPrinterId=t,this.applyHighlight()}setSelectedTank(t){this.selectedTankId=t,this.applyHighlight()}setWallMode(t){this.options.wallMode=t,this.building&&this.setBuilding(this.building)}setExplode(t){this.options.explode=t,this.layoutFloors()}setLabels(t){this.options.labels=t,this.applyFocus()}focusRoom(t){const e=this.rooms.get(t);if(!e)return;const n=this.floors.get(e.floorId),s=e.room,r=new N(s.x+s.width/2,n.position.y+.5,s.z+s.depth/2),a=this.camera.position.clone().sub(this.controls.target).normalize();a.y=Math.max(a.y,.75),a.normalize();const o=Math.max(s.width,s.depth)*1.5+8;this.flyTo(r.clone().addScaledVector(a,o),r)}fitAll(t=!0){const e=new Un;for(const l of this.floors.values()){const{state:c,bounds:h,height:d}=l.userData;!h||c==="hidden"||c==="ghost"&&this.focusFloorId||(e.expandByPoint(new N(h.minX,l.position.y,h.minZ)),e.expandByPoint(new N(h.maxX,l.position.y+d,h.maxZ)))}e.isEmpty()&&e.set(new N(-5,0,-5),new N(5,3,5));const n=e.getCenter(new N),s=e.getSize(new N).length()/2,r=Eo.degToRad(this.camera.fov/2),a=s/Math.sin(r)*Math.max(.85,.85/this.camera.aspect),o=new N(.45,.8,1).normalize();this.flyTo(n.clone().addScaledVector(o,a),n,t)}dispose(){cancelAnimationFrame(this.raf),this.resizeObserver.disconnect(),this.controls.dispose(),this.clear(),this.ground.geometry.dispose(),this.ground.material.dispose(),this.grid.geometry.dispose(),this.grid.material.dispose(),this.renderer.dispose(),this.renderer.domElement.remove(),this.labelRenderer.domElement.remove()}buildFloor(t,{hasFloorAbove:e=!1,openings:n=[]}={}){const s=new Vn,r=[],a=x=>{const v=new Nl(x);return r.push(v),v},o=[],l=tr(t),c=this.options.wallMode==="low",h=t.height-Pi,d=c?Math.min(Fm,h):h,m=[];if(l){const v={x:l.minX-.15,z:l.minZ-.15,w:l.maxX-l.minX+.3,d:l.maxZ-l.minZ+.3},_=new ce(Zl($a(v,n),Pi),a({color:13883615,roughness:.9}));_.position.y=-Pi/2,_.receiveShadow=!0,_.castShadow=!0,s.add(_);const f=document.createElement("div");f.className="floor-tag",f.textContent=t.name;const w=new Ys(f);w.position.set(l.minX-.4,0,l.maxZ+.4),s.add(w),o.push(w)}for(const x of t.rooms){const v={x:x.x+.01,z:x.z+.01,w:Math.max(x.width-.02,.01),d:Math.max(x.depth-.02,.01)},_=Zl($a(v,n),0);_.translate(-(x.x+x.width/2),0,-(x.z+x.depth/2));const f=new ce(_,a({color:ts(x),roughness:.85}));f.position.set(x.x+x.width/2,.01,x.z+x.depth/2),f.receiveShadow=!0,f.userData={roomId:x.id,floorId:t.id},s.add(f);const w=document.createElement("div");w.className="room-label"+(x.type==="corridor"?" is-corridor":""),w.innerHTML=`<span class="rl-name">${Vt(x.name)}</span>`+(x.occupant?`<span class="rl-sub">${Vt(x.occupant)}</span>`:"");const T=new Ys(w);T.position.set(f.position.x,1.2,f.position.z),s.add(T),o.push(T),this.rooms.set(x.id,{mesh:f,label:T,floorId:t.id,room:x}),x.type==="stairs"&&e&&m.push(...this.buildStairs(s,x,t,a,d));for(const M of x.tanks){const H=x.x+M.x,R=x.z+M.z,P=new ce(new ye(qn,.03,qn),a({color:7305090,roughness:.35,metalness:.6}));P.position.set(H,.025,R),P.castShadow=!0,P.userData={tankId:M.id,roomId:x.id,floorId:t.id},s.add(P);const I=document.createElement("button");I.type="button",I.className="tank-label",I.title=`${M.name} – ${M.ports.length} Ports`,I.innerHTML=`<span class="tl-icon"></span>${Vt(M.name)}<span class="tl-count">${M.ports.length}</span>`,I.addEventListener("click",E=>{var D,$;E.stopPropagation(),($=(D=this.options).onTankClick)==null||$.call(D,M.id,x.id,t.id)});const b=new Ys(I);b.position.set(H,.35,R),s.add(b),o.push(b),this.tanks.set(M.id,{mesh:P,label:b,floorId:t.id,roomId:x.id})}for(const M of x.printers){const H=x.x+M.x,R=x.z+M.z,P=.42,I=new ce(new ye(jn*.9,P,Fi*.9),a({color:15330544,roughness:.6}));I.position.set(H,P/2,R),I.castShadow=!0,I.receiveShadow=!0,I.userData={printerId:M.id,roomId:x.id,floorId:t.id};const b=new ce(new ye(jn*.9,.06,Fi*.9),a({color:3883858,roughness:.5}));b.position.set(H,P+.03,R),b.castShadow=!0;const E=new ce(new ye(jn*.6,.02,.12),a({color:16777215,roughness:.9}));E.position.set(H,P*.55,R+Fi*.45+.05),s.add(I,b,E);const D=document.createElement("button");D.type="button",D.className="printer-label",D.title=`${M.name}${M.ip?` – ${M.ip}`:""}`,D.innerHTML=`<span class="pl-icon"></span>${Vt(M.name)}`,D.addEventListener("click",X=>{var K,tt;X.stopPropagation(),(tt=(K=this.options).onPrinterClick)==null||tt.call(K,M.id,x.id,t.id)});const $=new Ys(D);$.position.set(H,.85,R),s.add($),o.push($),this.printers.set(M.id,{mesh:I,label:$,floorId:t.id,roomId:x.id})}}const g=a({color:16514041,roughness:.7});for(const x of hc(t.rooms)){const v=x.b-x.a;if(v<.01||x.kind==="lintel"&&(c||d<=Oa+.05))continue;const _=x.kind==="wall"?d:d-Oa,f=x.kind==="wall"?_/2:Oa+_/2,w=(x.a+x.b)/2,T=x.axis==="x"?new ye(v,_,Tn):new ye(Tn,_,v),M=new ce(T,g);x.axis==="x"?M.position.set(w,f,x.pos):M.position.set(x.pos,f,w),M.castShadow=!0,M.receiveShadow=!0,s.add(M)}return s.userData={floorId:t.id,mats:r,labels:o,bounds:l,stairTops:m,height:t.height,state:"full"},s}buildStairs(t,e,n,s,r){const{steps:a,landings:o}=Ks(e,n.height),l=[s({color:12896720,roughness:.8}),s({color:12107462,roughness:.8})],c=[],h=(d,m)=>{const g=new ce(new ye(d.w,d.top,d.d),m);g.position.set(d.x+d.w/2,d.top/2+.01,d.z+d.d/2),g.castShadow=!0,g.receiveShadow=!0,t.add(g),d.top>r+.01&&c.push(g)};return a.forEach((d,m)=>h(d,l[m%2])),o.forEach(d=>h(d,l[0])),c}clear(){this.clearSelection();for(const t of this.floors.values())t.traverse(e=>{var n;e.isCSS2DObject&&e.element.remove(),(n=e.geometry)==null||n.dispose()}),t.userData.mats.forEach(e=>e.dispose()),this.buildingGroup.remove(t);this.floors.clear(),this.rooms.clear(),this.tanks.clear(),this.printers.clear()}layoutFloors(){for(const t of this.floors.values())t.position.y=t.userData.elevation+t.userData.index*this.options.explode;this.fitShadow()}applyFocus(){if(!this.building)return;const t=this.building.floors,e=this.focusFloorId?t.findIndex(n=>n.id===this.focusFloorId):-1;t.forEach((n,s)=>{const r=this.floors.get(n.id);if(!r)return;let a="full";e>=0&&(a=s===e?"full":s<e?"ghost":"hidden"),r.userData.state=a,r.visible=a!=="hidden";for(const o of r.userData.mats){const l=a==="ghost";o.transparent!==l&&(o.needsUpdate=!0),o.transparent=l,o.opacity=l?.14:1,o.depthWrite=!l}for(const o of r.userData.labels)o.visible=a==="full"&&this.options.labels}),t.forEach((n,s)=>{var a;const r=t[s+1]&&this.floors.get(t[s+1].id);for(const o of((a=this.floors.get(n.id))==null?void 0:a.userData.stairTops)??[])o.visible=!!(r!=null&&r.visible)})}applyHighlight(){for(const[t,e]of this.rooms){const n=e.mesh.material;t===this.selectedRoomId?(n.emissive.set(qi),n.emissiveIntensity=.25):t===this.hoverRoomId?(n.emissive.set(16777215),n.emissiveIntensity=.2):n.emissive.set(0),e.label.element.classList.toggle("is-selected",t===this.selectedRoomId)}for(const[t,e]of this.tanks){const n=e.mesh.material,s=t===this.selectedTankId;s?(n.emissive.set(qi),n.emissiveIntensity=.8):t===this.hoverTankId?(n.emissive.set(16777215),n.emissiveIntensity=.35):n.emissive.set(0),e.label.element.classList.toggle("is-selected",s)}for(const[t,e]of this.printers){const n=e.mesh.material,s=t===this.selectedPrinterId;s?(n.emissive.set(qi),n.emissiveIntensity=.45):t===this.hoverPrinterId?(n.emissive.set(16777215),n.emissiveIntensity=.25):n.emissive.set(0),e.label.element.classList.toggle("is-selected",s)}this.updateSelection()}updateSelection(){this.clearSelection();const t=this.rooms.get(this.selectedRoomId);if(!t)return;const e=this.floors.get(t.floorId);if(e.userData.state!=="full")return;const n=t.room,s=e.userData.height-Pi,r=new ye(n.width,s,n.depth),a=new ce(r,new ga({color:qi,transparent:!0,opacity:.1,depthWrite:!1})),o=new Ul(new um(r),new Pa({color:qi})),l=new Vn;l.add(a,o),l.position.set(n.x+n.width/2,s/2+.02,n.z+n.depth/2),e.add(l),this.selectionObj=l}clearSelection(){this.selectionObj&&(this.selectionObj.traverse(t=>{var e,n;(e=t.geometry)==null||e.dispose(),(n=t.material)==null||n.dispose()}),this.selectionObj.removeFromParent(),this.selectionObj=null)}fitShadow(){const t=new Un;for(const r of this.floors.values()){const a=r.userData.bounds;a&&(t.expandByPoint(new N(a.minX,r.position.y,a.minZ)),t.expandByPoint(new N(a.maxX,r.position.y+r.userData.height,a.maxZ)))}if(t.isEmpty())return;const e=t.getCenter(new N),n=Math.max(10,t.getSize(new N).length()/2);this.sun.position.copy(e).add(new N(n*.7,n*1.6,n*.5)),this.sun.target.position.copy(e);const s=this.sun.shadow.camera;s.left=s.bottom=-n*1.3,s.right=s.top=n*1.3,s.near=.5,s.far=n*5,s.updateProjectionMatrix()}bindPointer(){const t=this.renderer.domElement;let e=null;t.addEventListener("pointerdown",n=>e={x:n.clientX,y:n.clientY}),t.addEventListener("pointerup",n=>{var a,o,l,c,h,d;if(!e||n.button!==0)return;const s=Math.hypot(n.clientX-e.x,n.clientY-e.y);if(e=null,s>5)return;const r=this.pick(n);r!=null&&r.tankId?(o=(a=this.options).onTankClick)==null||o.call(a,r.tankId,r.roomId,r.floorId):r!=null&&r.printerId?(c=(l=this.options).onPrinterClick)==null||c.call(l,r.printerId,r.roomId,r.floorId):(d=(h=this.options).onRoomClick)==null||d.call(h,(r==null?void 0:r.roomId)??null,(r==null?void 0:r.floorId)??null)}),t.addEventListener("pointermove",n=>{if(n.buttons)return;const s=this.pick(n),r=(s==null?void 0:s.tankId)??null,a=(s==null?void 0:s.printerId)??null,o=r||a?null:(s==null?void 0:s.roomId)??null;t.style.cursor=s?"pointer":"",(o!==this.hoverRoomId||r!==this.hoverTankId||a!==this.hoverPrinterId)&&(this.hoverRoomId=o,this.hoverTankId=r,this.hoverPrinterId=a,this.applyHighlight())}),t.addEventListener("pointerleave",()=>{(this.hoverRoomId||this.hoverTankId||this.hoverPrinterId)&&(this.hoverRoomId=null,this.hoverTankId=null,this.hoverPrinterId=null,this.applyHighlight())})}pick(t){const e=this.renderer.domElement.getBoundingClientRect(),n=new It((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1);this.raycaster.setFromCamera(n,this.camera);const s=h=>{var d;return((d=this.floors.get(h.floorId))==null?void 0:d.userData.state)==="full"},r=[...[...this.tanks.values()].filter(s).map(h=>({mesh:h.mesh,size:qn})),...[...this.printers.values()].filter(s).map(h=>({mesh:h.mesh,size:jn}))],a=this.raycaster.ray;let o=null;for(const{mesh:h,size:d}of r){const m=h.getWorldPosition(new N),g=a.distanceToPoint(m),x=Math.max(d*.7,a.origin.distanceTo(m)*.012);g<x&&(!o||g<o.dist)&&(o={dist:g,mesh:h})}if(o)return o.mesh.userData;const l=[...this.rooms.values()].filter(s).map(h=>h.mesh),c=this.raycaster.intersectObjects(l,!1)[0];return c?c.object.userData:null}flyTo(t,e,n=!0){if(!n){this.camera.position.copy(t),this.controls.target.copy(e),this.anim=null;return}this.anim={p0:this.camera.position.clone(),p1:t,t0:this.controls.target.clone(),t1:e,start:performance.now(),duration:750}}resize(){const t=this.container.clientWidth,e=this.container.clientHeight;!t||!e||(this.renderer.setSize(t,e),this.labelRenderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix())}tick(){if(this.raf=requestAnimationFrame(this.tick),this.anim){const t=Math.min(1,(performance.now()-this.anim.start)/this.anim.duration),e=Om(t);this.camera.position.lerpVectors(this.anim.p0,this.anim.p1,e),this.controls.target.lerpVectors(this.anim.t0,this.anim.t1,e),t>=1&&(this.anim=null)}this.controls.update(),this.renderer.render(this.scene,this.camera),this.labelRenderer.render(this.scene,this.camera)}}const Di=1,Bm=["nw","n","ne","e","se","s","sw","w"],Xn=.1,za=96;function km(i){var Tt;i.innerHTML=`
    <div class="editor-layout">
      <div class="toolbar">
        <div class="tb-group">
          <span class="tb-label">Etage</span>
          <select id="e-floor" class="input sm"></select>
          <button class="btn sm" data-act="floor-add" title="Neue Etage oben anlegen">+ Etage</button>
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
          <svg id="e-plan" xmlns="http://www.w3.org/2000/svg"></svg>
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
    </div>`;const t=p=>i.querySelector(p),e=t("#e-plan"),n=t("#e-plan-wrap"),s={floorId:(Tt=yt.building.floors[0])==null?void 0:Tt.id,selectedRoomId:null,selectedTankId:null,selectedPrinterId:null,tool:"select",snap:.5,tankModal:!1},r={cx:15,cz:6,scale:30};let a=null,o=null,l=null,c={id:null,time:0};const h=new zm(t("#e-3d"),{background:"#f2f4f7",onRoomClick:(p,u)=>{p&&u===s.floorId&&bt(p)},onTankClick:(p,u,y)=>{y===s.floorId&&(bt(u,p),Z())},onPrinterClick:(p,u,y)=>{y===s.floorId&&bt(u,null,p)}}),d=()=>yt.building.floors,m=()=>d().find(p=>p.id===s.floorId)??d()[0],g=()=>{var p;return((p=m())==null?void 0:p.rooms.find(u=>u.id===s.selectedRoomId))??null},x=()=>{var p;return((p=g())==null?void 0:p.tanks.find(u=>u.id===s.selectedTankId))??null},v=(p,u)=>{var y;return(y=p.floors.find(A=>A.id===s.floorId))==null?void 0:y.rooms.find(A=>A.id===u)},_=p=>{var u;return(u=v(p,s.selectedRoomId))==null?void 0:u.tanks.find(y=>y.id===s.selectedTankId)},f=()=>{var p;return((p=g())==null?void 0:p.printers.find(u=>u.id===s.selectedPrinterId))??null},w=p=>{var u;return(u=v(p,s.selectedRoomId))==null?void 0:u.printers.find(y=>y.id===s.selectedPrinterId)},T=(p,u,y=s.snap)=>u?Math.round(p*100)/100:Math.round(p/y)*y,M=p=>Math.round(p*100)/100;function H(p){const u=e.getBoundingClientRect();return{x:r.cx+(p.clientX-u.left-u.width/2)/r.scale,z:r.cz+(p.clientY-u.top-u.height/2)/r.scale}}function R(p){const u=m().rooms.filter(y=>p.x>=y.x&&p.x<=y.x+y.width&&p.z>=y.z&&p.z<=y.z+y.depth);return u.find(y=>y.type!=="corridor")??u[0]??null}function P(){const p=m();let u=p&&tr(p);if(!u){const z=d().map(tr).filter(Boolean);u=z.length?{minX:Math.min(...z.map(G=>G.minX)),minZ:Math.min(...z.map(G=>G.minZ)),maxX:Math.max(...z.map(G=>G.maxX)),maxZ:Math.max(...z.map(G=>G.maxZ))}:{minX:0,minZ:0,maxX:20,maxZ:12}}const y=e.clientWidth||600,A=e.clientHeight||400,C=3;r.scale=Ni(Math.min(y/(u.maxX-u.minX+C*2),A/(u.maxZ-u.minZ+C*2)),4,200),r.cx=(u.minX+u.maxX)/2,r.cz=(u.minZ+u.maxZ)/2}function I(p,u,y){const A=e.getBoundingClientRect(),C=(u??A.left+A.width/2)-A.left-A.width/2,z=(y??A.top+A.height/2)-A.top-A.height/2,G=r.cx+C/r.scale,k=r.cz+z/r.scale;r.scale=Ni(r.scale*p,4,300),r.cx=G-C/r.scale,r.cz=k-z/r.scale,E()}function b(p){const u=new Set;for(let y=0;y<p.length;y++)for(let A=y+1;A<p.length;A++){const C=p[y],z=p[A],G=Math.min(C.x+C.width,z.x+z.width)-Math.max(C.x,z.x),k=Math.min(C.z+C.depth,z.z+z.depth)-Math.max(C.z,z.z);G>.01&&k>.01&&u.add(C.id).add(z.id)}return u}function E(){const p=m(),u=e.clientWidth,y=e.clientHeight;if(!p||!u||!y)return;const A=r.scale,C=1/A,z=r.cx-u/2/A,G=r.cz-y/2/A;e.setAttribute("viewBox",`${z} ${G} ${u/A} ${y/A}`);const k=A<10?5:1,et=A<10?25:5,ut=[];ut.push(`
      <defs>
        <pattern id="g-minor" width="${k}" height="${k}" patternUnits="userSpaceOnUse">
          <path d="M ${k} 0 L 0 0 0 ${k}" fill="none" stroke="#e4e8ee" stroke-width="${C}"/>
        </pattern>
        <pattern id="g-major" width="${et}" height="${et}" patternUnits="userSpaceOnUse">
          <path d="M ${et} 0 L 0 0 0 ${et}" fill="none" stroke="#cdd3dc" stroke-width="${C}"/>
        </pattern>
      </defs>
      <rect x="${z}" y="${G}" width="${u/A}" height="${y/A}" fill="url(#g-minor)"/>
      <rect x="${z}" y="${G}" width="${u/A}" height="${y/A}" fill="url(#g-major)"/>
      <path d="M ${z} 0 H ${z+u/A} M 0 ${G} V ${G+y/A}" stroke="#aeb7c3" stroke-width="${C}"/>`);const Q=d().indexOf(p),dt=d()[Q-1];if(dt)for(const B of dt.rooms)ut.push(`<rect class="ref-room" x="${B.x}" y="${B.z}" width="${B.width}" height="${B.depth}"
            stroke-width="${C}" stroke-dasharray="${4*C} ${3*C}"/>`);const mt=Q<d().length-1,gt=b(p.rooms),ot=[...p.rooms].sort((B,q)=>(B.type==="corridor"?-1:0)-(q.type==="corridor"?-1:0));for(const B of ot){const q=B.id===s.selectedRoomId,nt=B.width*A>44&&B.depth*A>26;ut.push(`
        <g class="room${q?" selected":""}${gt.has(B.id)?" overlap":""}" data-room="${B.id}">
          <rect x="${B.x}" y="${B.z}" width="${B.width}" height="${B.depth}"
            fill="${ts(B)}" fill-opacity="${B.type==="corridor"?.35:.55}"
            stroke-width="${(q?2.5:1.25)*C}"/>
          ${B.type==="stairs"&&mt?D(B,p.height,C):""}
          ${nt?`<text x="${B.x+B.width/2}" y="${B.z+16*C}" font-size="${13*C}" class="room-name">${Vt(B.name)}</text>`:""}
        </g>`)}const Rt=Math.max(qn,12*C),Dt=A>18;for(const B of p.rooms)for(const q of B.tanks){const nt=B.x+q.x,rt=B.z+q.z,Ct=q.id===s.selectedTankId;ut.push(`
          <g class="tank${Ct?" selected":""}" data-tank="${q.id}" data-tank-room="${B.id}">
            <rect x="${nt-Rt/2}" y="${rt-Rt/2}" width="${Rt}" height="${Rt}" rx="${2*C}"
              stroke-width="${(Ct?2:1.25)*C}"/>
            <path d="M ${nt-Rt/4} ${rt} H ${nt+Rt/4} M ${nt} ${rt-Rt/4} V ${rt+Rt/4}" stroke-width="${1.25*C}"/>
            ${Dt?`<text x="${nt}" y="${rt+Rt/2+9*C}" font-size="${10*C}">${Vt(q.name)} · ${q.ports.length}</text>`:""}
          </g>`)}const Xt=Math.max(jn,16*C),L=Math.max(Fi,13*C);for(const B of p.rooms)for(const q of B.printers){const nt=B.x+q.x,rt=B.z+q.z,Ct=q.id===s.selectedPrinterId;ut.push(`
          <g class="printer${Ct?" selected":""}" data-printer="${q.id}" data-printer-room="${B.id}">
            <rect x="${nt-Xt/2}" y="${rt-L/2}" width="${Xt}" height="${L}" rx="${3*C}"
              stroke-width="${(Ct?2:1.25)*C}"/>
            <rect class="paper" x="${nt-Xt*.28}" y="${rt-L*.18}" width="${Xt*.56}" height="${L*.36}"/>
            ${Dt?`<text x="${nt}" y="${rt+L/2+9*C}" font-size="${10*C}">${Vt(q.name)}</text>`:""}
          </g>`)}const J=g();if(J&&!s.selectedTankId&&!s.selectedPrinterId&&s.tool==="select"){const B=9*C,q={nw:[J.x,J.z],n:[J.x+J.width/2,J.z],ne:[J.x+J.width,J.z],e:[J.x+J.width,J.z+J.depth/2],se:[J.x+J.width,J.z+J.depth],s:[J.x+J.width/2,J.z+J.depth],sw:[J.x,J.z+J.depth],w:[J.x,J.z+J.depth/2]};ut.push(`
        <text class="dim" x="${J.x+J.width/2}" y="${J.z-10*C}" font-size="${11*C}">${Yn(J.width,2)} m</text>
        <text class="dim" x="${J.x-10*C}" y="${J.z+J.depth/2}" font-size="${11*C}"
          transform="rotate(-90 ${J.x-10*C} ${J.z+J.depth/2})">${Yn(J.depth,2)} m</text>`);for(const nt of Bm){const[rt,Ct]=q[nt];ut.push(`<rect class="handle h-${nt}" data-handle="${nt}" x="${rt-B/2}" y="${Ct-B/2}"
            width="${B}" height="${B}" stroke-width="${1.5*C}"/>`)}}if(o){const{x:B,z:q,width:nt,depth:rt}=o;ut.push(`
        <rect class="draft" x="${B}" y="${q}" width="${nt}" height="${rt}"
          stroke-width="${2*C}" stroke-dasharray="${6*C} ${4*C}"/>
        <text class="dim" x="${B+nt/2}" y="${q+rt/2}" font-size="${12*C}">
          ${Yn(nt,2)} × ${Yn(rt,2)} m</text>`)}e.innerHTML=ut.join(""),n.dataset.tool=s.tool}function D(p,u,y){const{steps:A,landings:C,path:z}=Ks(p,u),G=[...A,...C].map(L=>`<rect x="${L.x}" y="${L.z}" width="${L.w}" height="${L.d}"/>`).join(""),[k,et]=z.at(-1),[ut,Q]=z.at(-2),dt=Math.hypot(k-ut,et-Q)||1,[mt,gt]=[(k-ut)/dt,(et-Q)/dt],ot=Math.min(.35,dt/2),Rt=`M ${k-mt*ot-gt*ot*.6} ${et-gt*ot+mt*ot*.6} L ${k} ${et}
      L ${k-mt*ot+gt*ot*.6} ${et-gt*ot-mt*ot*.6}`,[Dt,Xt]=z[0];return`
      <g class="stair" stroke-width="${y}">
        ${G}
        <circle cx="${Dt}" cy="${Xt}" r="${Math.max(.08,3*y)}"/>
        <path class="stair-arrow" d="M ${z.map(L=>L.join(" ")).join(" L ")} ${Rt}" stroke-width="${1.5*y}"/>
      </g>`}function $(){t("#e-floor").innerHTML=[...d()].reverse().map(u=>`<option value="${u.id}" ${u.id===s.floorId?"selected":""}>${Vt(u.name)}</option>`).join("");const p=d().findIndex(u=>u.id===s.floorId);i.querySelector('[data-act="floor-del"]').disabled=d().length<=1,i.querySelector('[data-act="floor-up"]').disabled=p>=d().length-1,i.querySelector('[data-act="floor-down"]').disabled=p<=0,i.querySelector('[data-act="undo"]').disabled=!yt.canUndo,i.querySelector('[data-act="redo"]').disabled=!yt.canRedo,i.querySelectorAll("[data-tool]").forEach(u=>u.classList.toggle("active",u.dataset.tool===s.tool)),t("#e-help").textContent={draw:"Raum zeichnen: Rechteck mit gedrückter Maustaste aufziehen · Esc zum Beenden",stairs:"Treppenhaus zeichnen: Rechteck aufziehen · Form und Laufrichtung rechts einstellen · Esc zum Beenden",tank:"Bodentank setzen: in einen Raum klicken · Esc zum Beenden",printer:"Drucker setzen: in einen Raum oder Flur klicken · Esc zum Beenden",select:"Klicken = auswählen · Ziehen = verschieben · Griffe = Größe ändern · Doppelklick auf Bodentank = Ports bearbeiten · P = Drucker setzen · Alt = ohne Raster"}[s.tool]}function X(p){const u=p.ports.filter(y=>oc(y)).length;return`
      <section class="panel panel-tank">
        <h2 class="panel-title">Bodentank</h2>
        <div class="tank-summary">
          <span class="tank-icon-lg"></span>
          <div>
            <div class="tank-summary-name">${Vt(p.name)}</div>
            <div class="muted">${p.ports.length} Ports · ${u} am Switch</div>
          </div>
        </div>
        <button class="btn btn-block btn-primary" data-act="tank-edit">Ports bearbeiten …</button>
        <div class="btn-row">
          <button class="btn sm" data-act="tank-dup">Duplizieren</button>
          <button class="btn sm danger" data-act="tank-del">Löschen</button>
        </div>
        <span class="hint-text">Tipp: Doppelklick auf den Tank oder Enter öffnet den Editor.</span>
      </section>`}function K(p){const u=p.ip&&!Ya(p.ip);return`
      <section class="panel panel-printer">
        <h2 class="panel-title">Drucker</h2>
        <label class="field"><span>Name</span><input class="input" data-bind="printer:name" value="${Vt(p.name)}"></label>
        <label class="field"><span>IP-Adresse</span>
          <input class="input mono" data-bind="printer:ip" value="${Vt(p.ip)}" placeholder="z. B. 192.168.10.50" inputmode="decimal" spellcheck="false">
        </label>
        <span class="field-warn" data-out="ip-warn" ${u?"":"hidden"}>Das ist keine gültige IPv4-Adresse.</span>
        <div class="btn-row">
          <button class="btn sm" data-act="printer-dup">Duplizieren</button>
          <button class="btn sm danger" data-act="printer-del">Löschen</button>
        </div>
      </section>`}function tt(){var et,ut,Q,dt;const p=t("#e-modal"),u=s.tankModal&&x();if(!u){s.tankModal=!1,p.hidden=!0,p.innerHTML="";return}const y=g(),A=Ii((et=u.ports[0])==null?void 0:et.name)??{panel:1,port:1},C=((ut=u.ports.find(mt=>mt.switch))==null?void 0:ut.switch)??"",z=new Set;for(const mt of d())for(const gt of mt.rooms)for(const ot of gt.tanks)for(const Rt of ot.ports)Rt.switch&&z.add(Rt.switch);const G=((Q=p.querySelector(".port-table-wrap"))==null?void 0:Q.scrollTop)??0;p.hidden=!1,p.innerHTML=`
      <div class="modal modal-wide" role="dialog" aria-modal="true" aria-labelledby="e-modal-title">
        <div class="modal-head">
          <span class="tank-icon-lg"></span>
          <div>
            <div class="modal-title" id="e-modal-title">Bodentank bearbeiten</div>
            <div class="modal-sub">${Vt(y.name)} · ${Vt(m().name)}</div>
          </div>
          <button class="icon-btn" data-act="modal-close" title="Schließen (Esc)">✕</button>
        </div>
        <div class="modal-body">
          <div class="modal-fields">
            <label class="field"><span>Name</span><input class="input" data-bind="tank:name" value="${Vt(u.name)}"></label>
            <label class="field"><span>Anzahl Ports</span>
              <input class="input" type="number" min="0" max="${za}" step="1" data-bind="tank:count" value="${u.ports.length}">
            </label>
          </div>

          <div class="bulk-tools">
            <div class="bulk-tool">
              <span class="bulk-title">Patchfeld-Ports fortlaufend benennen</span>
              <div class="bulk-row">
                <span class="prefix">ab P</span>
                <input class="input" type="number" min="1" step="1" id="e-start-panel" value="${A.panel}" title="Patchfeld">
                <span class="prefix">/</span>
                <input class="input" type="number" min="1" max="24" step="1" id="e-start-port" value="${A.port}" title="Port (1–24)">
                <button class="btn sm" data-act="ports-renumber">Übernehmen</button>
              </div>
              <span class="hint-text">Nach Port 24 geht es mit dem nächsten Patchfeld weiter.</span>
            </div>
            <div class="bulk-tool">
              <span class="bulk-title">Switch fortlaufend zuweisen</span>
              <div class="bulk-row">
                <input class="input input-switch" id="e-bulk-switch" list="e-switches" placeholder="Switch, z. B. Switch P1" value="${Vt(C)}">
                <span class="prefix">ab Port</span>
                <input class="input" id="e-bulk-switch-port" value="${Vt(((dt=u.ports.find(mt=>mt.switchPort))==null?void 0:dt.switchPort)??"1")}" title="Erster Switch-Port">
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
                  ${u.ports.map((mt,gt)=>`
                  <tr>
                    <td class="pt-idx">${gt+1}</td>
                    <td><input class="input sm" data-bind="port:${gt}:name" value="${Vt(mt.name)}" placeholder="P01/01"></td>
                    <td><input class="input sm" data-bind="port:${gt}:switch" list="e-switches" value="${Vt(mt.switch)}" placeholder="—"></td>
                    <td><input class="input sm pt-swport" data-bind="port:${gt}:switchPort" value="${Vt(mt.switchPort)}" placeholder="—"></td>
                    <td><button class="icon-btn sm" data-act="port-del" data-index="${gt}" title="Port entfernen">✕</button></td>
                  </tr>`).join("")}
                </tbody>
              </table>`:'<div class="empty">Keine Ports. Lege über „Anzahl Ports“ oder „+ Port“ welche an.</div>'}
          </div>
          <datalist id="e-switches">${[...z].map(mt=>`<option value="${Vt(mt)}">`).join("")}</datalist>
        </div>
        <div class="modal-foot">
          <button class="btn sm" data-act="port-add">+ Port</button>
          <button class="btn sm" data-act="tank-dup">Tank duplizieren</button>
          <button class="btn sm danger" data-act="tank-del">Tank löschen</button>
          <button class="btn btn-primary" data-act="modal-close">Fertig</button>
        </div>
      </div>`;const k=p.querySelector(".port-table-wrap");k&&(k.scrollTop=G)}function Z(){var p;x()&&(s.tankModal=!0,tt(),(p=t('#e-modal [data-bind="tank:name"]'))==null||p.focus())}function it(){s.tankModal=!1,tt()}function Y(){const p=g(),u=x(),y=f(),A=m(),C=yt.building,z=Object.entries(Qi).map(([k,et])=>`<option value="${k}" ${(p==null?void 0:p.type)===k?"selected":""}>${Vt(et.label)}</option>`).join(""),G=p?`
      <section class="panel">
        <h2 class="panel-title">Raum</h2>
        <label class="field"><span>Name</span><input class="input" data-bind="room:name" value="${Vt(p.name)}"></label>
        <label class="field"><span>Typ</span><select class="input" data-bind="room:type">${z}</select></label>
        <div class="field">
          <span>Farbe</span>
          <div class="color-row">
            <input type="color" data-bind="room:color" value="${ts(p)}">
            ${p.color?'<button class="btn sm" data-act="color-reset">Typfarbe</button>':'<span class="muted">Typfarbe</span>'}
          </div>
        </div>
        ${p.type==="stairs"?`<label class="field"><span>Treppenform</span><select class="input" data-bind="room:stairShape">${Object.entries(Wa).map(([k,et])=>`<option value="${k}" ${p.stairShape===k?"selected":""}>${Vt(et)}</option>`).join("")}</select></label>
        <div class="field">
          <span>Laufrichtung (aufwärts)</span>
          <div class="color-row">
            <select class="input" data-bind="room:stairDir">${Object.entries(Xa).map(([k,et])=>`<option value="${k}" ${p.stairDir===k?"selected":""}>${Vt(et)}</option>`).join("")}</select>
            <button class="btn sm" data-act="stairs-rotate" title="Um 90° drehen">↻</button>
          </div>
          ${d().indexOf(A)===d().length-1?'<span class="hint-text">Oberste Etage: Hier führt keine Treppe weiter nach oben.</span>':""}
        </div>`:""}
        <label class="field"><span>Nutzer / Team</span><input class="input" data-bind="room:occupant" value="${Vt(p.occupant)}" placeholder="z. B. Team Vertrieb"></label>
        <label class="field"><span>Beschreibung</span><textarea class="input" rows="2" data-bind="room:description">${Vt(p.description)}</textarea></label>
        <div class="field-grid">
          <label class="field"><span>X (m)</span><input class="input" type="number" step="0.1" data-bind="room:x" value="${M(p.x)}"></label>
          <label class="field"><span>Z (m)</span><input class="input" type="number" step="0.1" data-bind="room:z" value="${M(p.z)}"></label>
          <label class="field"><span>Breite (m)</span><input class="input" type="number" step="0.1" min="0.5" data-bind="room:width" value="${M(p.width)}"></label>
          <label class="field"><span>Tiefe (m)</span><input class="input" type="number" step="0.1" min="0.5" data-bind="room:depth" value="${M(p.depth)}"></label>
        </div>
        <div class="field">
          <span>Bodentanks</span>
          <div class="tank-list">
            ${p.tanks.length?p.tanks.map(k=>`<button class="tank-chip ${k.id===s.selectedTankId?"active":""}" data-act="tank-edit" data-tank="${k.id}" title="Ports bearbeiten">
                        <span class="tl-icon"></span>${Vt(k.name)}<span class="tc-count">${k.ports.length} Ports</span>
                      </button>`).join(""):'<span class="muted">Keine Bodentanks.</span>'}
          </div>
          <button class="btn sm" data-act="tank-add">+ Bodentank</button>
        </div>
        <div class="field">
          <span>Drucker</span>
          <div class="tank-list">
            ${p.printers.length?p.printers.map(k=>`<button class="tank-chip ${k.id===s.selectedPrinterId?"active":""}" data-act="printer-select" data-printer="${k.id}">
                        <span class="pl-icon"></span>${Vt(k.name)}<span class="tc-count mono">${Vt(k.ip||"–")}</span>
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
      ${u?X(u):""}
      ${y?K(y):""}
      ${G}
      <section class="panel">
        <h2 class="panel-title">Etage</h2>
        <label class="field"><span>Name</span><input class="input" data-bind="floor:name" value="${Vt(A.name)}"></label>
        <label class="field"><span>Geschosshöhe (m)</span><input class="input" type="number" step="0.1" min="2" max="10" data-bind="floor:height" value="${A.height}"></label>
      </section>
      <section class="panel">
        <h2 class="panel-title">Gebäude</h2>
        <label class="field"><span>Name</span><input class="input" data-bind="building:name" value="${Vt(C.name)}"></label>
      </section>`}function ct(){const p=[...m().rooms].sort((u,y)=>u.name.localeCompare(y.name,"de",{numeric:!0}));t("#e-rooms").innerHTML=p.length?p.map(u=>`
        <button class="room-item ${u.id===s.selectedRoomId?"active":""}" data-room="${u.id}">
          <span class="swatch" style="background:${ts(u)}"></span>
          <span class="ri-text"><span class="ri-name">${Vt(u.name)}</span></span>
          ${u.printers.length?`<span class="ri-meta" title="Drucker">${u.printers.length} DR</span>`:""}
          ${u.tanks.length?`<span class="ri-meta" title="Bodentanks">${u.tanks.length} BT</span>`:""}
        </button>`).join(""):'<div class="empty">Noch keine Räume.</div>'}function pt(){$(),E(),Y(),ct()}function St(){h.setBuilding(yt.building),h.setFocusFloor(s.floorId),h.setSelectedRoom(s.selectedRoomId),h.setSelectedTank(s.selectedTankId),h.setSelectedPrinter(s.selectedPrinterId)}function bt(p,u=null,y=null){s.selectedRoomId===p&&s.selectedTankId===u&&s.selectedPrinterId===y||(s.selectedRoomId=p,s.selectedTankId=p?u:null,s.selectedPrinterId=p?y:null,h.setSelectedRoom(p),h.setSelectedTank(s.selectedTankId),h.setSelectedPrinter(s.selectedPrinterId),E(),Y(),ct())}function Ht(p,{fit:u=!1}={}){s.floorId=p,s.selectedRoomId=null,s.selectedTankId=null,s.selectedPrinterId=null,h.setFocusFloor(p),h.setSelectedRoom(null),h.setSelectedTank(null),h.setSelectedPrinter(null),h.fitAll(),u&&P(),pt()}function j(p){s.tool=p,$(),E()}function st(p){const u=m(),y=mc({name:`Raum ${u.rooms.length+1}`,...p});yt.mutate(A=>A.floors.find(C=>C.id===u.id).rooms.push(y)),bt(y.id)}function _t(){let p=null;for(const u of d())for(const y of u.rooms)for(const A of y.tanks)for(const C of A.ports){const z=Ii(C.name);z&&(!p||z.panel*1e3+z.port>p.panel*1e3+p.port)&&(p=z)}return p}function ht(p,u,y={}){const A=_t(),C=gc({name:_c(p),x:M(u.x),z:M(u.z),ports:Ji(A?Ki(A):{panel:1,port:1},4),...y});yt.mutate(z=>{const G=v(z,p.id);G.tanks.push(C),Zn(G)}),bt(p.id,C.id)}function wt(p,u,y={}){const A=xc({name:vc(yt.building),x:M(u.x),z:M(u.z),...y});yt.mutate(C=>{const z=v(C,p.id);z.printers.push(A),Zn(z)}),bt(p.id,null,A.id)}function Pt(){if(s.selectedPrinterId){const u=s.selectedPrinterId;s.selectedPrinterId=null,yt.mutate(y=>{const A=v(y,s.selectedRoomId);A.printers=A.printers.filter(C=>C.id!==u)});return}if(s.selectedTankId){const u=s.selectedTankId;s.selectedTankId=null,yt.mutate(y=>{const A=v(y,s.selectedRoomId);A.tanks=A.tanks.filter(C=>C.id!==u)});return}const p=s.selectedRoomId;p&&(s.selectedRoomId=null,yt.mutate(u=>{const y=u.floors.find(A=>A.id===s.floorId);y.rooms=y.rooms.filter(A=>A.id!==p)}))}function Ut(){const p=g();if(!p)return;const u=x();if(u){ht(p,{x:u.x+.6,z:u.z},{ports:u.ports.map(A=>({...A}))});return}const y=f();if(y){wt(p,{x:y.x+.8,z:y.z},{ip:""});return}st(qa(p,{name:`${p.name} (Kopie)`,x:p.x+1,z:p.z+1}))}function ne(p,u){g()&&yt.mutate(y=>{const A=_(y)??w(y);if(A){A.x=M(A.x+p),A.z=M(A.z+u),Zn(v(y,s.selectedRoomId));return}const C=v(y,s.selectedRoomId);C.x=M(C.x+p),C.z=M(C.z+u)})}function Gt(){const p=new Blob([JSON.stringify(yt.building,null,2)],{type:"application/json"}),u=document.createElement("a");u.href=URL.createObjectURL(p),u.download=yt.config.standard.split("/").pop(),u.click(),setTimeout(()=>URL.revokeObjectURL(u.href),1e3)}const te={"floor-add":()=>{var u;const p=Js({name:Qs(d().length),height:((u=m())==null?void 0:u.height)??3});yt.mutate(y=>y.floors.push(p)),Ht(p.id)},"floor-dup":()=>{const p=m(),u=d().indexOf(p),y=Js({name:`${p.name} (Kopie)`,height:p.height,rooms:p.rooms.map(A=>qa(A))});yt.mutate(A=>A.floors.splice(u+1,0,y)),Ht(y.id)},"floor-up":()=>F(1),"floor-down":()=>F(-1),"floor-del":()=>{const p=m();if(d().length<=1||!confirm(`Etage „${p.name}“ mit ${p.rooms.length} Räumen löschen?`))return;const u=d().indexOf(p);yt.mutate(y=>y.floors.splice(u,1)),Ht(d()[Math.max(0,u-1)].id)},"tool-select":()=>j("select"),"tool-draw":()=>j("draw"),"tool-stairs":()=>j("stairs"),"stairs-rotate":()=>{yt.mutate(p=>{const u=v(p,s.selectedRoomId);u.stairDir=dc(u.stairDir)})},"tool-tank":()=>j("tank"),"tool-printer":()=>j("printer"),"printer-add":()=>{const p=g();p&&wt(p,{x:p.width/2,z:p.depth/2})},"printer-select":p=>bt(s.selectedRoomId,null,p.dataset.printer),"printer-dup":Ut,"printer-del":Pt,"room-add":()=>{st({x:T(r.cx-4/2),z:T(r.cz-4/2),width:4,depth:4})},"room-dup":Ut,"room-del":Pt,"color-reset":()=>{yt.mutate(p=>v(p,s.selectedRoomId).color=null)},"tank-add":()=>{const p=g();p&&ht(p,{x:p.width/2,z:p.depth/2})},"tank-edit":p=>{p.dataset.tank&&bt(s.selectedRoomId,p.dataset.tank),Z()},"modal-close":it,"switch-assign":()=>{const p=t("#e-bulk-switch").value.trim(),u=t("#e-bulk-switch-port").value.trim()||"1";yt.mutate(y=>{_(y).ports.forEach((A,C)=>{A.switch=p,A.switchPort=ac(u,C)})})},"tank-dup":Ut,"tank-del":Pt,"port-add":()=>{yt.mutate(p=>{const u=_(p);u.ports=Ha(u.ports,Math.min(za,u.ports.length+1))})},"port-del":p=>{const u=Number(p.dataset.index);yt.mutate(y=>_(y).ports.splice(u,1))},"ports-renumber":()=>{const p=Math.max(1,parseInt(t("#e-start-panel").value,10)||1),u=Ni(parseInt(t("#e-start-port").value,10)||1,1,24);yt.mutate(y=>{const A=_(y),C=Ji({panel:p,port:u},A.ports.length);A.ports=A.ports.map((z,G)=>({...z,name:C[G].name}))})},undo:()=>yt.undo(),redo:()=>yt.redo(),export:Gt,import:()=>t("#e-file").click(),standard:async()=>{!yt.matchesStandard&&!confirm("Entwurf verwerfen und den Standard laden? (Rückgängig ist möglich)")||(await yt.discardDraft(),Ht(d()[0].id,{fit:!0}))},reset:()=>{confirm("Aktuelles Gebäude durch das Testgebäude ersetzen? (Rückgängig ist möglich)")&&(yt.replace(Ui()),Ht(d()[0].id,{fit:!0}))},"zoom-in":()=>I(1.25),"zoom-out":()=>I(.8),"zoom-fit":()=>{P(),E()}};function F(p){const u=d().findIndex(A=>A.id===s.floorId),y=u+p;y<0||y>=d().length||yt.mutate(A=>{const[C]=A.floors.splice(u,1);A.floors.splice(y,0,C)})}i.addEventListener("click",p=>{var y;const u=p.target.closest("[data-act]");u&&!u.disabled&&((y=te[u.dataset.act])==null||y.call(te,u))}),t("#e-floor").addEventListener("change",p=>Ht(p.target.value)),t("#e-snap").addEventListener("change",p=>s.snap=Number(p.target.value)),t("#e-rooms").addEventListener("click",p=>{const u=p.target.closest("[data-room]");u&&bt(u.dataset.room)}),t("#e-file").addEventListener("change",async p=>{const u=p.target.files[0];if(p.target.value="",!!u)try{yt.replace(JSON.parse(await u.text())),Ht(d()[0].id,{fit:!0})}catch(y){alert(`Import fehlgeschlagen: ${y.message}`)}});const Me=p=>u=>{const y=u.target.closest("[data-bind]");if(!y)return;const[A,C,z]=y.dataset.bind.split(":");let G=y.value;if(A==="port"){l=p,yt.mutate(k=>_(k).ports[Number(C)][z]=G.trim()),l=null;return}if(A==="tank"&&C==="count"){const k=Ni(parseInt(G,10)||0,0,za);yt.mutate(et=>{const ut=_(et);ut.ports=Ha(ut.ports,k)});return}if(["x","z","width","depth","height"].includes(C)){if(G=parseFloat(String(G).replace(",",".")),!Number.isFinite(G))return Y();(C==="width"||C==="depth")&&(G=Math.max(.5,G)),C==="height"&&(G=Ni(G,2,10)),G=M(G)}if(l=C!=="type"?p:null,A==="printer"&&(G=G.trim()),yt.mutate(k=>{const et=A==="tank"?_(k):A==="printer"?w(k):A==="room"?v(k,s.selectedRoomId):A==="floor"?k.floors.find(Q=>Q.id===s.floorId):k;if(!et)return;et[C]=G;const ut=v(k,s.selectedRoomId);ut&&(A==="tank"||C==="width"||C==="depth")&&Zn(ut)}),l=null,A==="printer"&&C==="ip"){const k=i.querySelector('[data-out="ip-warn"]');k&&(k.hidden=!G||Ya(G))}};t("#e-props").addEventListener("change",Me("props")),t("#e-modal").addEventListener("change",Me("modal")),t("#e-modal").addEventListener("pointerdown",p=>{p.target===p.currentTarget&&it()}),t("#e-modal").addEventListener("keydown",p=>{var C;const u=p.target.closest('[data-bind^="port:"]');if(p.key!=="Enter"||!u)return;p.preventDefault();const[,y,A]=u.dataset.bind.split(":");u.blur(),(C=t(`#e-modal [data-bind="port:${Number(y)+1}:${A}"]`))==null||C.focus()}),e.addEventListener("contextmenu",p=>p.preventDefault()),e.addEventListener("pointerdown",p=>{const u=H(p),y=p.target.closest("[data-handle]"),A=p.target.closest("[data-tank]"),C=p.target.closest("[data-printer]"),z=p.target.closest("[data-room]");if(e.setPointerCapture(p.pointerId),p.button===1||p.button===2){a={type:"pan",sx:p.clientX,sy:p.clientY,cx:r.cx,cz:r.cz};return}if(p.button===0){if(s.tool==="draw"||s.tool==="stairs"){const G={x:T(u.x,p.altKey),z:T(u.z,p.altKey)};a={type:"draw",start:G},o={x:G.x,z:G.z,width:0,depth:0};return}if(s.tool==="tank"){const G=R(u);G&&ht(G,{x:T(u.x-G.x,p.altKey,Xn),z:T(u.z-G.z,p.altKey,Xn)});return}if(s.tool==="printer"){const G=R(u);G&&wt(G,{x:T(u.x-G.x,p.altKey,Xn),z:T(u.z-G.z,p.altKey,Xn)});return}if(C){bt(C.dataset.printerRoom,null,C.dataset.printer);const G=f();a={type:"printer",start:u,orig:{x:G.x,z:G.z},started:!1};return}if(A){const G=performance.now(),k=c.id===A.dataset.tank&&G-c.time<400;if(c={id:A.dataset.tank,time:G},bt(A.dataset.tankRoom,A.dataset.tank),k){a=null,Z();return}const et=x();a={type:"tank",start:u,orig:{x:et.x,z:et.z},started:!1};return}if(y&&g()){const G=g();a={type:"resize",handle:y.dataset.handle,start:u,orig:{...G,tanks:G.tanks.map(k=>({x:k.x,z:k.z})),printers:G.printers.map(k=>({x:k.x,z:k.z}))},started:!1};return}if(z){bt(z.dataset.room);const G=g();a={type:"move",start:u,orig:{x:G.x,z:G.z},started:!1};return}bt(null),a={type:"pan",sx:p.clientX,sy:p.clientY,cx:r.cx,cz:r.cz}}}),e.addEventListener("pointermove",p=>{const u=H(p);if(t("#e-coords").textContent=`x ${Yn(u.x,2)} · z ${Yn(u.z,2)} m`,!a)return;if(a.type==="pan"){r.cx=a.cx-(p.clientX-a.sx)/r.scale,r.cz=a.cz-(p.clientY-a.sy)/r.scale,E();return}if(a.type==="draw"){const z={x:T(u.x,p.altKey),z:T(u.z,p.altKey)};o={x:Math.min(a.start.x,z.x),z:Math.min(a.start.z,z.z),width:M(Math.abs(z.x-a.start.x)),depth:M(Math.abs(z.z-a.start.z))},E();return}const y=u.x-a.start.x,A=u.z-a.start.z;if(!a.started){if(Math.hypot(y,A)*r.scale<3)return;a.started=!0,yt.checkpoint()}const C=p.altKey;yt.mutate(z=>{const G=v(z,s.selectedRoomId);if(!G)return;if(a.type==="tank"||a.type==="printer"){const ut=a.type==="tank"?_(z):w(z);ut.x=T(a.orig.x+y,C,Xn),ut.z=T(a.orig.z+A,C,Xn),Zn(G);return}if(a.type==="move"){G.x=M(T(a.orig.x+y,C)),G.z=M(T(a.orig.z+A,C));return}const k=a.orig,et=a.handle;if(et.includes("w")){const ut=Math.min(T(k.x+y,C),k.x+k.width-Di);G.x=M(ut),G.width=M(k.x+k.width-ut)}if(et.includes("e")&&(G.width=M(Math.max(Di,T(k.x+k.width+y,C)-k.x))),et.includes("n")){const ut=Math.min(T(k.z+A,C),k.z+k.depth-Di);G.z=M(ut),G.depth=M(k.z+k.depth-ut)}et.includes("s")&&(G.depth=M(Math.max(Di,T(k.z+k.depth+A,C)-k.z))),G.tanks.forEach((ut,Q)=>{ut.x=k.tanks[Q].x+(k.x-G.x),ut.z=k.tanks[Q].z+(k.z-G.z)}),G.printers.forEach((ut,Q)=>{ut.x=k.printers[Q].x+(k.x-G.x),ut.z=k.printers[Q].z+(k.z-G.z)}),Zn(G)},{checkpoint:!1})});const zt=()=>{if((a==null?void 0:a.type)==="draw"&&o){const p=o;if(o=null,p.width>=Di&&p.depth>=Di){const u={x:M(p.x),z:M(p.z),width:p.width,depth:p.depth};if(s.tool==="stairs"){const y=m().rooms.filter(A=>A.type==="stairs").length;Object.assign(u,{type:"stairs",name:`Treppenhaus ${y+1}`,stairDir:p.depth>=p.width?"n":"e"})}s.tool="select",st(u),$()}E()}a=null};e.addEventListener("pointerup",zt),e.addEventListener("pointercancel",zt),e.addEventListener("wheel",p=>{p.preventDefault(),I(Math.exp(-p.deltaY*.0015),p.clientX,p.clientY)},{passive:!1});const Bt=p=>{var A,C,z;if(s.tankModal){p.key==="Escape"&&(p.preventDefault(),it());return}if((C=(A=p.target).closest)!=null&&C.call(A,"input, textarea, select"))return;const u=p.ctrlKey||p.metaKey,y=p.key.toLowerCase();if(u&&y==="z"&&!p.shiftKey)yt.undo();else if(u&&(y==="y"||y==="z"&&p.shiftKey))yt.redo();else if(u&&y==="d")Ut();else if(y==="delete"||y==="backspace")Pt();else if(y==="enter"&&s.selectedTankId)Z();else if(y==="escape")o=null,a=null,j("select"),s.selectedTankId||s.selectedPrinterId?bt(s.selectedRoomId,null):bt(null);else if(y==="r"&&!u)j("draw");else if(y==="s"&&!u)j("stairs");else if(y==="q"&&!u&&((z=g())==null?void 0:z.type)==="stairs")te["stairs-rotate"]();else if(y==="t"&&!u)j("tank");else if(y==="p"&&!u)j("printer");else if(y==="v"&&!u)j("select");else if(y.startsWith("arrow")&&s.selectedRoomId){const G=s.selectedTankId||s.selectedPrinterId?Xn:s.snap,k=p.shiftKey?1:G,et={arrowleft:[-k,0],arrowright:[k,0],arrowup:[0,-k],arrowdown:[0,k]}[y];ne(...et)}else return;p.preventDefault()};window.addEventListener("keydown",Bt);const At=yt.subscribe(()=>{d().some(p=>p.id===s.floorId)||(s.floorId=d()[0].id),s.selectedRoomId&&!g()&&(s.selectedRoomId=null),s.selectedTankId&&!x()&&(s.selectedTankId=null),s.selectedPrinterId&&!f()&&(s.selectedPrinterId=null),St(),$(),E(),ct(),l!=="props"&&Y(),l!=="modal"&&tt()}),Jt=new ResizeObserver(()=>E());return Jt.observe(n),St(),h.fitAll(!1),requestAnimationFrame(()=>{P(),pt()}),pt(),{destroy(){At(),Jt.disconnect(),window.removeEventListener("keydown",Bt),h.dispose()}}}Ac("editor",km)})();
