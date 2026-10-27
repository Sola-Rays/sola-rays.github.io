(()=>{
const DEFAULT_SHEET="1jQj_Or2LacAQaQfj39y7PnXWtNRmQzKSgijXe-3o2uA";
const ICONS={
  home:'<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  clients:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5c1.9.6 3.1 2.4 3.5 5.5"/>',
  projects:'<path d="M4 4h16l-2 10H6z"/><path d="M5 9h14M10 4l-1 10M14 4l1 10M12 14v4M8 20h8"/>',
  calendar:'<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2"/>',
  suppliers:'<path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z"/><path d="M3 7.5 12 12l9-4.5M12 12v9"/>',
  calc:'<rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M8 6.5h8v3H8zM8.5 13h.01M12 13h.01M15.5 13h.01M8.5 17h.01M12 17h.01M15.5 17h.01"/>'
};
const ico=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k]}</svg>`;
const SVG=p=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const UI={
  edit:SVG('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/>'),
  plus:SVG('<path d="M12 5v14M5 12h14"/>'),
  x:SVG('<path d="M6 6l12 12M18 6 6 18"/>'),
  left:SVG('<path d="M15 6l-6 6 6 6"/>'),
  right:SVG('<path d="M9 6l6 6-6 6"/>'),
  grip:SVG('<circle cx="9" cy="6" r="1.2"/><circle cx="15" cy="6" r="1.2"/><circle cx="9" cy="12" r="1.2"/><circle cx="15" cy="12" r="1.2"/><circle cx="9" cy="18" r="1.2"/><circle cx="15" cy="18" r="1.2"/>'),
  phone:SVG('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>'),
  msg:SVG('<path d="M4 5h16v11H8l-4 4z"/>'),
  pin:SVG('<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>'),
  cal:SVG('<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),
  bolt:SVG('<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>'),
  back:SVG('<path d="M15 5l-7 7 7 7"/>'),
  reset:SVG('<path d="M4 4v6h6"/><path d="M5 15a7 7 0 1 0 1.6-7.4L4 10"/>'),
  search:SVG('<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4-4"/>'),
  fb:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21z"/></svg>'
};
const SUN='<svg class="sun" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.6" fill="#FFB612"/><path stroke="#FFB612" d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M4.9 19.1l1.7-1.7M17.4 6.6l1.7-1.7"/></svg>';
const VIEWS=[["home","Dashboard"],["clients","Clients"],["projects","Projects"],["calendar","Calendar"],["suppliers","Suppliers"],["calc","Calculator"]];
const SHORT={home:"Home",calc:"Calc"};
const SOURCES=["Facebook page","Facebook ad","Facebook Marketplace","Messenger inquiry","Personal visit (I went to the client)","Walk-in (client came to us)","Referral · past client","Referral · friend or family","Referral · supplier or partner","Phone call or text","GSIS / government office","Seminar or event","Flyer or tarpaulin","Website / Google","TikTok or YouTube","Repeat client","Other"];

/* Each section maps to a tab of the Google Sheet. Field keys are the sheet's column headers, exactly as written there.
   New columns (Source, Package Costs, Job Cost) are added to the sheet automatically the first time v2 loads. */
const TABS={
 Clients:{sheet:"CRM Dashboard",key:"clients",title:"Client",idField:"S.N.",idMode:"serial",filterField:"Consulted (Y/N)",filterOpts:["Yes","No"],fields:[
  ["S.N.","No.","hidden"],["Client","Client name","text"],["Phone","Phone","text"],["Facebook","Facebook","link","fb"],
  ["Address","Address","text"],["GPS Coodinates","GPS coordinates","link","map"],
  ["DU","Utility","text"],
  ["Type","Type","select",["Residence","Business","Under Construction - Business","Under Construction - Residence","Farm","Government"]],
  ["Source","Lead source","select",SOURCES],
  ["kWh","Monthly kWh","number"],["Amount","Monthly bill (₱)","number"],["Rate per kWh","Rate per kWh (₱)","number"],
  ["Consulted (Y/N)","Consulted","select",["Yes","No"]],["Consultation Date","Consultation date","date"],
  ["Quotation","Quotation","select",["Not sent","Sent","Revised","Accepted","Declined"]],["Quoted Price","Quoted price","quoted"],["Quote Date","Quote date","date"],
  ["Packages","Packages","packages"],["Chosen Package","Chosen package","hidden"],["Package Costs","Package costs","hidden"],
  ["Notes","Notes","textarea"],["Photos","Photos","photos"]]},
 Projects:{sheet:"Projects",key:"projects",title:"Project",idField:"ID",idMode:"prefix",prefix:"PR",filterField:"Status",fields:[
  ["ID","ID","hidden"],["Client No.","Client No.","hidden"],["Client","Client","clientpick"],["System (kWp)","System (kWp)","number"],["Panels","Panels","text"],
  ["Inverter","Inverter","text"],["Battery","Battery","text"],["Contract Price","Contract price (₱)","number"],["Job Cost","Job cost (₱) · internal","number"],["Contract Date","Contract date","date"],
  ["Payment","Payment","select",["Cash","GSIS loan"]],["Amount Received","Amount received (₱)","paid"],["Payments","Payments","hidden"],
  ["Status","Status","select",["Downpayment","Ordering","Scheduled","Installing","Awaiting loan release","Completed"]],
  ["Start Date","Start date","date"],["Completion Date","Completion date","date"],["Notes","Notes","textarea"],["Photos","Photos","photos"]]},
 Suppliers:{sheet:"Suppliers",key:"suppliers",title:"Supplier item",idField:null,filterField:"Item",filterOpts:["PV Module","Inverter","Battery","Accessories"],fields:[
  ["Supplier","Supplier","text"],["Item","Category","select",["PV Module","Inverter","Battery","Accessories"]],
  ["Brand","Brand","text"],["Specs / Description","Specs / description","textarea"],["SRP","Price (₱)","number"],["Photos","Photos","photos"]]},
 Calendar:{sheet:"Calendar",key:"calendar",title:"Event",idField:"ID",idMode:"prefix",prefix:"EV",filterField:"Type",filterOpts:[],fields:[
  ["ID","ID","hidden"],["Title","Title","text"],["Type","Type","select",[]],["Status","Status","select",["Scheduled","Done","Cancelled"]],
  ["Date","Date","date"],["Start Time","Start time","time"],["End Time","End time","time"],
  ["Client No.","Client No.","hidden"],["Client","Client","clientpick"],["Project","Project","projpick"],
  ["Location","Location","text"],["Notes","Notes","textarea"],["Created","Created","hidden"]]},
 Settings:{sheet:"Settings",key:"settings",title:"Setting",idField:null,filterField:null,filterOpts:[],fields:[["Key","Key","text"],["Value","Value","textarea"],["Updated","Updated","text"]]}
};
Object.values(TABS).forEach(t=>{if(!t.filterOpts)t.filterOpts=t.fields.find(f=>f[0]===t.filterField)[3]});
queueMicrotask(()=>{TABS.Calendar.fields.find(f=>f[0]==="Type")[3]=EVENT_TYPES.map(x=>x[0])});

const state={view:"home",sheetId:null,data:{Clients:[],Projects:[],Suppliers:[],Calendar:[],Settings:[]},heads:{},loaded:false,
  filter:{clients:"All",projects:"All",suppliers:"All"},q:{clients:"",projects:"",suppliers:""},
  error:null,sheetIds:{},period:"12",pview:"list",cal:{month:"",sel:"",hidden:[]},
  supplier:"",edit:false,cb:"type",sel:null,detail:false,cached:false,settingsOK:true};

const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const num=v=>{if(v===""||v==null)return 0;const n=parseFloat(String(v).replace(/[^0-9.\-]/g,""));return isNaN(n)?0:n};
const peso=v=>"₱"+Math.round(num(v)).toLocaleString("en-PH");
const MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const pad=n=>String(n).padStart(2,"0");
const today=()=>{const d=new Date();return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`};
function toISO(s){
  s=String(s||"").trim();if(!s)return "";
  let m=s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);if(m)return `${m[1]}-${pad(m[2])}-${pad(m[3])}`;
  m=s.match(/^(\d{1,2})[-\s]([A-Za-z]{3})[A-Za-z]*[-\s,]+(\d{4})$/);if(m){const i=MON.findIndex(x=>x.toLowerCase()===m[2].toLowerCase());if(i>=0)return `${m[3]}-${pad(i+1)}-${pad(m[1])}`}
  m=s.match(/^([A-Za-z]{3})[A-Za-z]*\s+(\d{1,2}),?\s+(\d{4})$/);if(m){const i=MON.findIndex(x=>x.toLowerCase()===m[1].toLowerCase());if(i>=0)return `${m[3]}-${pad(i+1)}-${pad(m[2])}`}
  m=s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);if(m)return `${m[3]}-${pad(m[1])}-${pad(m[2])}`;
  return "";
}
const sheetDate=iso=>{if(!iso)return "";const [y,mo,d]=iso.split("-");return `${+d}-${MON[+mo-1]}-${y}`};
const fmtDate=s=>{const i=toISO(s);if(!i)return s||"";const [y,mo,d]=i.split("-");return `${MON[+mo-1]} ${+d}, ${y}`};
const qs=n=>`'${n.replace(/'/g,"''")}'`;
const lsGet=k=>{try{return localStorage.getItem(k)}catch(e){return null}};
const lsSet=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};

function setSync(s,text){const d=$("#dot");d.className="dot "+(s==="ok"?"ok":s==="busy"?"busy":s==="err"?"err":"");$("#syncText").textContent=text}
function toast(t){const el=document.createElement("div");el.className="toast";el.textContent=t;document.body.appendChild(el);setTimeout(()=>el.remove(),2200)}

/* ---------- Google Sheets via the SolaRays Apps Script ---------- */
const cfg={api:lsGet("solarays.api")||"",key:lsGet("solarays.key")||""};
function errMsg(e){
  const c=e&&e.code;
  if(c==="offline")return "You're offline. Connect to Wi-Fi or mobile data, then tap Try again.";
  if(c==="network")return "Couldn't reach your Google Sheet. Check your internet connection and the Web app URL under Database.";
  if(c==="bad_key")return "The access key doesn't match the one in your Apps Script. Check it under Database.";
  if(c==="bad_response")return "The Web app URL didn't answer like the SolaRays script. Copy the Web app URL that ends in /exec, and check that access is set to Anyone.";
  if(c==="bad_row")return (e.message||"That row no longer exists.")+" Tap Try again to reload.";
  if(c==="setup")return "Add your Web app URL and access key under Database.";
  if(c==="unsaved")return (e.message||"Couldn't save a change")+". "+errMsg(e.inner||{})+" Your change is kept on this device; tap Try again.";
  if(c==="bad_sheet")return "Your Apps Script is an older version that doesn't know the Calendar tab. Paste the new Code.gs and deploy a new version.";
  return (e&&e.message)||"Something went wrong talking to Google Sheets. Tap Try again.";
}
async function api(body){
  if(!cfg.api||!cfg.key)throw {code:"setup"};
  if(navigator.onLine===false)throw {code:"offline"};
  let res;
  try{res=await fetch(cfg.api,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify({...body,key:cfg.key}),redirect:"follow"})}
  catch(e){throw {code:navigator.onLine===false?"offline":"network"}}
  let j;try{j=await res.json()}catch(e){throw {code:"bad_response"}}
  if(!j||!j.ok)throw {code:(j&&j.error)||"bad_response",message:j&&j.message};
  return j;
}
/* ---------- a saved copy of the last data on this device: the app opens instantly, then refreshes ---------- */
const IDB=(()=>{
  let dbp=null;
  const open=()=>dbp||(dbp=new Promise((res,rej)=>{try{const r=indexedDB.open("solarays-v2",1);r.onupgradeneeded=()=>r.result.createObjectStore("kv");r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}catch(e){rej(e)}}));
  const run=(mode,fn)=>open().then(db=>new Promise((res,rej)=>{const t=db.transaction("kv",mode);const q=fn(t.objectStore("kv"));t.oncomplete=()=>res(q&&q.result);t.onerror=()=>rej(t.error);t.onabort=()=>rej(t.error)}));
  return {get:k=>run("readonly",s=>s.get(k)).catch(()=>null),set:(k,v)=>run("readwrite",s=>s.put(v,k)).catch(()=>{})};
})();
let cacheT=0;
const stripPending=list=>list.map(o=>{const c={...o};delete c._pending;return c});
function saveCache(){clearTimeout(cacheT);cacheT=setTimeout(()=>{const d={};Object.keys(state.data).forEach(k=>d[k]=stripPending(state.data[k]));IDB.set("data",{data:d,heads:state.heads,at:Date.now()})},400)}
async function loadCache(){
  const c=await IDB.get("data");
  if(!c||!c.data||state.loaded)return false;
  Object.keys(state.data).forEach(k=>{if(Array.isArray(c.data[k]))state.data[k]=c.data[k]});
  state.heads=c.heads||{};state.cached=c.at||Date.now();
  applyLayoutFromSheet();
  return true;
}
const hhmm=t=>new Date(t).toLocaleTimeString("en-PH",{hour:"numeric",minute:"2-digit"});

/* Re-draw unless you are typing in a field: then wait until you leave it, so nothing jumps under your finger. */
let renderWaiting=false;
function typing(){const a=document.activeElement;return a&&a.closest&&a.closest("#main")&&/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)&&a.type!=="range"}
function safeRender(){if(typing()){renderWaiting=true;return}renderWaiting=false;render()}
document.addEventListener("focusout",()=>setTimeout(()=>{if(renderWaiting&&!typing())safeRender()},60));

let loading=null;
function loadAll(opts={}){
  if(!cfg.api||!cfg.key)return Promise.resolve();
  if(loading)return loading;
  loading=(async()=>{
    if(!opts.silent)setSync("busy",state.cached?"Updating…":"Syncing…");
    try{
      if(pendingWrites)await writeQ;
      const tabs={};Object.values(TABS).forEach(t=>tabs[t.sheet]=t.fields.map(f=>f[0]));
      const j=await api({action:"read",tabs});
      if(pendingWrites&&opts.silent)return; /* a save started meanwhile: keep what is on screen */
      for(const [name,t] of Object.entries(TABS)){
        const got=j.tabs[t.sheet];
        if(name==="Settings"&&!got){state.settingsOK=false;continue}
        if(name==="Settings")state.settingsOK=true;
        const vals=(got&&got.values)||[];
        const head=(vals[0]&&vals[0].some(Boolean)?vals[0]:t.fields.map(f=>f[0])).map(h=>String(h).trim());
        state.heads[name]=head;
        state.data[name]=vals.slice(1).map((r,i)=>{const o={_row:i+2};head.forEach((h,k)=>o[h]=r[k]??"");return o})
          .filter(o=>head.some(h=>h!==t.idField&&String(o[h]).trim()!==""));
        if(name==="Suppliers")state.data[name]=state.data[name].filter(o=>o.Item||o.SRP);
      }
      state.loaded=true;state.cached=false;state.error=null;
      applyLayoutFromSheet();saveCache();
      setSync("ok","Synced "+hhmm(Date.now()));
    }catch(e){
      if(!opts.silent||!state.loaded)state.error=e;
      setSync("err",state.cached?"Offline · saved "+hhmm(state.cached):"Sync failed");
    }finally{loading=null}
    safeRender();
  })();
  return loading;
}
function cellValue(type,v){
  if(type==="date")return sheetDate(v);
  if(type==="number")return v===""?"":num(v);
  return v;
}

/* ---------- saving: the change shows at once; the sheet is updated in the background, one change at a time ---------- */
let writeQ=Promise.resolve(),pendingWrites=0,reconcileT=0;const failed=[];
function syncLabel(){
  if(pendingWrites)setSync("busy",`Saving${pendingWrites>1?" "+pendingWrites+" changes":""}…`);
  else if(failed.length)setSync("err",`${failed.length} change${failed.length>1?"s":""} not saved`);
  else setSync("ok","Saved "+hhmm(Date.now()));
}
function enqueue(job){
  pendingWrites++;syncLabel();
  const p=writeQ.then(()=>job.run());
  writeQ=p.catch(()=>{});
  return p.then(r=>{pendingWrites--;syncLabel();return r},e=>{pendingWrites--;
    if(job.quiet){job.quiet(e)}else{failed.push(job);state.error={code:"unsaved",message:job.label,inner:e}}
    syncLabel();safeRender();throw e});
}
function scheduleReconcile(ms=6000){clearTimeout(reconcileT);reconcileT=setTimeout(()=>{if(!pendingWrites)loadAll({silent:true})},ms)}
function retryFailed(){
  const jobs=failed.splice(0);state.error=null;render();
  jobs.forEach(j=>enqueue(j).then(()=>{toast(j.label.replace(/^Couldn't save/,"Saved"));scheduleReconcile()}).catch(()=>{}));
}
function rowValues(name,rec,isNew,orig){
  const t=TABS[name];const head=state.heads[name]||t.fields.map(f=>f[0]);
  const type=h=>(t.fields.find(f=>f[0]===h)||[,,"text"])[2];
  if(isNew)return head.map(h=>h in rec?cellValue(type(h),rec[h]):"");
  return head.map(h=>{
    if(!(h in rec))return null;
    const ty=type(h),a=rec[h],b=orig[h];
    const same=ty==="date"?toISO(a)===toISO(b):ty==="number"?(String(a).trim()===""?String(b).trim()==="":num(a)===num(b)&&String(b).trim()!==""):String(a)===String(b);
    return same?null:cellValue(ty,a);
  });
}
async function saveRecord(name,rec,isNew,orig,opt={}){
  const t=TABS[name];
  const values=rowValues(name,rec,isNew,orig);
  let target;
  if(isNew){target={...rec,_row:null,_pending:true};state.data[name].push(target)}
  else{target=orig;if(!values.some(v=>v!==null)){return true}Object.assign(orig,rec,{_row:orig._row})}
  saveCache();if(!opt.noRender)safeRender();
  if(!opt.silent)toast(isNew?t.title+" added":t.title+" saved");
  const label=`Couldn't save ${t.title.toLowerCase()}${rec.Client?" for "+rec.Client:""}`;
  const job={label,quiet:opt.quiet,run:async()=>{
    if(isNew){const j=await api({action:"append",sheet:t.sheet,values});
      if(j.row){target._row=j.row;delete target._pending;saveCache()}else scheduleReconcile(1200);return j}
    if(!target._row)throw {code:"bad_row",message:"This record is still being added. Wait a moment, then tap Try again."};
    return api({action:"update",sheet:t.sheet,row:target._row,values});
  }};
  enqueue(job).then(()=>scheduleReconcile()).catch(()=>{});
  return true;
}
async function deleteRecord(name,rec){
  const t=TABS[name];
  const list=state.data[name];const i=list.indexOf(rec);if(i>=0)list.splice(i,1);
  saveCache();safeRender();toast(t.title+" deleted");
  const job={label:`Couldn't delete ${t.title.toLowerCase()}`,run:async()=>{
    if(!rec._row)throw {code:"bad_row",message:"This record was still being added. Tap Try again."};
    const j=await api({action:"delete",sheet:t.sheet,row:rec._row});
    state.data[name].forEach(o=>{if(o._row>rec._row)o._row--});saveCache();return j}};
  enqueue(job).then(()=>scheduleReconcile()).catch(()=>{});
  return true;
}
/* small helper for the Settings tab (dashboard layout) */
function saveSetting(key,value){
  const row=state.data.Settings.find(r=>r.Key===key);
  const rec={Key:key,Value:value,Updated:new Date().toISOString().slice(0,16).replace("T"," ")};
  const quiet=()=>{state.settingsOK=false;toast("Layout kept on this device. Update the Apps Script to share it with your other devices.")};
  if(row)return saveRecord("Settings",{...row,...rec},false,row,{silent:true,noRender:true,quiet});
  return saveRecord("Settings",rec,true,null,{silent:true,noRender:true,quiet});
}

/* ---------- status pills ---------- */
const PILL={Lead:"",Accepted:"good",Signed:"good",Consulted:"info",Yes:"good",No:"",Scheduled:"info",Done:"",Quoted:"warn",Won:"good",Lost:"bad",
  Downpayment:"warn",Ordering:"info",Installing:"warn",Completed:"good","Awaiting loan release":"info"};
const pill=s=>s?`<span class="pill ${PILL[s]||""}">${esc(s)}</span>`:"";

/* ---------- render ---------- */
function renderNav(){
  $("#nav").innerHTML=VIEWS.map(([k,l])=>`<button type="button" class="nav-link${state.view===k?" active":""}" data-view="${k}" ${state.view===k?'aria-current="page"':""}>${ico(k)}<span>${l}</span></button>`).join("");
  $("#tabs").innerHTML=VIEWS.map(([k,l])=>`<button type="button" class="${state.view===k?"active":""}" data-view="${k}" ${state.view===k?'aria-current="page"':""}>${ico(k)}<span>${SHORT[k]||l}</span></button>`).join("");
}
function banner(){
  const e=state.error;if(!e)return "";
  const note=state.cached&&e.code!=="unsaved"?` Showing the data saved on this device at ${hhmm(state.cached)}.`:"";
  const act=e.code==="unsaved"?`<button class="btn btn-sol btn-sm" type="button" data-act="retry">Try again</button>`:`<button class="btn btn-line btn-sm" type="button" data-act="refresh">Try again</button>`;
  return `<div class="banner" role="alert"><span>${esc(errMsg(e))}${note}</span>${act}</div>`;
}
function render(){
  renderNav();
  const m=$("#main");
  if(!cfg.api||!cfg.key)state.view="settings";
  document.body.dataset.screen=state.view;
  if(state.view==="settings"){m.className="view v-settings";m.innerHTML=settingsView();bindSettings();return}
  const keep={};m.querySelectorAll("[data-keep]").forEach(el=>keep[el.dataset.keep]=el.scrollTop);
  const loading=!state.loaded&&!state.cached&&!state.error?`<div class="loading"><span class="spin"></span>Loading your Google Sheet…</div>`:"";
  const v={home:homeView,clients:clientsView,projects:projectsView,suppliers:()=>listView("Suppliers"),calc:calcView,calendar:calendarView}[state.view]||homeView;
  CHARTS={};chartSeq=0;
  m.className="view v-"+state.view;
  m.innerHTML=banner()+loading+v();
  m.querySelectorAll("[data-keep]").forEach(el=>{if(keep[el.dataset.keep])el.scrollTop=keep[el.dataset.keep]});
  if(state.view==="calc")bindCalc();
  if(state.view==="home")requestAnimationFrame(()=>{drawCharts(true);countUp();fitLists()});
  if(state.view==="suppliers"||state.view==="clients")hydrateThumbs();
  if(state.view==="clients"){const d=m.querySelector(".cfiles");if(d)hydrateTiles(d)}
}
function header(title,sub,actions=""){
  return `<div class="vhead"><div class="vt"><h1>${title}</h1><div class="sub">${sub}</div></div><div class="acts">${actions}</div></div>`;
}
function settingsView(){
  const sheet=`https://docs.google.com/spreadsheets/d/${DEFAULT_SHEET}/edit`;
  const standalone=matchMedia("(display-mode: standalone)").matches||navigator.standalone;
  return `<div class="vw setup-wrap"><div class="card setup"><div class="card-body">
  <div class="brand big"><span class="bn"><span class="s">Sola</span>Rays</span><small>Business Dashboard</small></div>
  <h1>Database</h1>
  <p class="sub">Connect this device to your Google Sheet through the SolaRays Apps Script. Enter both once per device; they stay saved on this device only.</p>
  <div class="row g-3">
    <div class="col-12"><label class="form-label" for="apiUrl">Web app URL</label><input class="form-control" id="apiUrl" value="${esc(cfg.api)}" placeholder="https://script.google.com/macros/s/…/exec" autocomplete="off" autocapitalize="off" spellcheck="false"></div>
    <div class="col-12"><label class="form-label" for="apiKey">Access key</label><input class="form-control" id="apiKey" type="password" value="${esc(cfg.key)}" placeholder="The ACCESS_KEY from your script" autocomplete="off" autocapitalize="off" spellcheck="false"></div>
  </div>
  <div id="setupErr" class="err"></div>
  <div class="actions"><a class="btn btn-line" href="${sheet}" target="_blank" rel="noopener">Open Google Sheet</a><button class="btn btn-sol" id="connectBtn" type="button">${cfg.api?"Save and reconnect":"Connect"}</button></div>
  ${cfg.api?`<div class="setnote"><b>Layout sync</b><span>${state.settingsOK?"Your dashboard layout is shared with your other devices through the Settings tab.":"Update the Apps Script (Code.gs version 2) to share your dashboard layout across devices. Until then it stays on this device."}</span></div>`:""}
  ${standalone?"":`<div class="setnote"><b>Install as an app</b><span>On iPad or iPhone: tap Share, then Add to Home Screen. On Android Chrome: tap ⋮, then Install app. It then opens full screen and loads instantly.</span></div>`}
  ${cfg.api?`<div class="actions"><button class="btn btn-line btn-sm" type="button" data-view="home">Back to dashboard</button><button class="btn btn-line btn-sm" type="button" id="clearCache">Clear saved data on this device</button></div>`:""}
  </div></div></div>`;
}
function bindSettings(){
  $("#connectBtn").onclick=async()=>{
    const url=$("#apiUrl").value.trim(),key=$("#apiKey").value.trim();
    if(!/^https:\/\/script\.google(usercontent)?\.com\/.+/.test(url)){$("#setupErr").textContent="Paste the Web app URL from Apps Script. It starts with https://script.google.com/macros/s/ and ends with /exec.";return}
    if(!key){$("#setupErr").textContent="Enter the access key you set in the script.";return}
    const prev={...cfg};cfg.api=url;cfg.key=key;
    $("#connectBtn").disabled=true;$("#connectBtn").textContent="Connecting…";
    try{await api({action:"read",tabs:{}});lsSet("solarays.api",url);lsSet("solarays.key",key);state.view="home";toast("Connected to Google Sheets");await loadAll()}
    catch(e){Object.assign(cfg,prev);$("#setupErr").textContent=errMsg(e);$("#connectBtn").disabled=false;$("#connectBtn").textContent="Connect"}
  };
  const cc=$("#clearCache");if(cc)cc.onclick=async()=>{await IDB.set("data",null);try{Object.keys(localStorage).filter(k=>k.startsWith(TKEY)).forEach(k=>localStorage.removeItem(k))}catch(e){}toast("Saved data cleared. Reloading from your sheet…");state.cached=false;loadAll()};
}

/* Show only the rows that fit fully in a dashboard list, so nothing is cut in half */
function fitLists(){
  document.querySelectorAll(".v-home .plist").forEach(box=>{
    const kids=[...box.children];kids.forEach(k=>k.style.display="");
    const bottom=box.getBoundingClientRect().bottom+1;
    kids.forEach((k,i)=>{if(i&&k.getBoundingClientRect().bottom>bottom)k.style.display="none"});
  });
}

/* ---------- links between clients, projects and events ---------- */
const clientByNo=no=>no===""||no==null?null:state.data.Clients.find(c=>String(c["S.N."]).trim()===String(no).trim())||null;
const clientFor=r=>clientByNo(r["Client No."])||(r.Client?state.data.Clients.find(c=>String(c.Client).trim().toLowerCase()===String(r.Client).trim().toLowerCase()):null)||null;
const projectsFor=c=>state.data.Projects.filter(p=>clientFor(p)===c);
const projectById=id=>state.data.Projects.find(p=>String(p.ID)===String(id))||null;

/* ---------- calendar ---------- */
const EVENT_TYPES=[
  ["Installation","#FFB612"],["Site visit / Consultation","#6CB4FF"],["Client meeting","#4FD18B"],["Contract signing","#B9A6FF"],
  ["Payment collection","#FF7A59"],["Supplier pickup / Delivery","#3DD6C6"],["Follow-up call","#F59AD8"],["Maintenance / After-sales","#C9A66B"],["Other","#8FA1B7"]];
const typeColor=t=>(EVENT_TYPES.find(x=>x[0]===t)||EVENT_TYPES[EVENT_TYPES.length-1])[1];
function parseTime(s){
  s=String(s||"").trim();if(!s)return "";
  const m=s.match(/^(\d{1,2})(?::(\d{2}))?(?::\d{2})?\s*([AaPp][Mm])?$/);if(!m)return "";
  let h=+m[1];const mi=m[2]||"00",ap=(m[3]||"").toLowerCase();
  if(ap==="pm"&&h<12)h+=12;if(ap==="am"&&h===12)h=0;if(h>23)return "";
  return pad(h)+":"+mi;
}
const fmtTime=t=>{if(!t)return "";let [h,m]=t.split(":").map(Number);const ap=h>=12?"PM":"AM";h=h%12||12;return `${h}:${pad(m)} ${ap}`};
function allEvents(){
  const ev=[];
  state.data.Calendar.forEach(e=>{const iso=toISO(e.Date);if(!iso)return;const c=clientFor(e);
    ev.push({iso,start:parseTime(e["Start Time"]),end:parseTime(e["End Time"]),type:e.Type||"Other",title:e.Title||((e.Type||"Event")+(e.Client?": "+e.Client:"")),client:e.Client||"",clientRef:c,loc:e.Location||(c&&c.Address)||"",status:e.Status||"Scheduled",src:"Calendar",row:e._row})});
  const has=(iso,type,c)=>ev.some(x=>x.src==="Calendar"&&x.iso===iso&&x.type===type&&c&&x.clientRef===c);
  state.data.Projects.forEach(p=>{const iso=toISO(p["Start Date"]);if(!iso)return;const c=clientFor(p);if(has(iso,"Installation",c))return;
    ev.push({iso,start:"",end:"",type:"Installation",title:"Installation: "+(p.Client||"Project"),client:p.Client||"",clientRef:c,loc:(c&&c.Address)||"",status:p.Status==="Completed"?"Done":"Scheduled",src:"Projects",row:p._row,auto:true})});
  state.data.Clients.forEach(c=>{const iso=toISO(c["Consultation Date"]);if(!iso)return;if(has(iso,"Site visit / Consultation",c))return;
    ev.push({iso,start:"",end:"",type:"Site visit / Consultation",title:"Consultation: "+(c.Client||"Client"),client:c.Client||"",clientRef:c,loc:c.Address||"",status:c["Consulted (Y/N)"]==="Yes"?"Done":"Scheduled",src:"Clients",row:c._row,auto:true})});
  return ev.sort((a,b)=>a.iso.localeCompare(b.iso)||(a.start||"99").localeCompare(b.start||"99"));
}
function evButton(e,compact){
  const col=typeColor(e.type);
  if(compact)return `<button type="button" class="chipev ${e.status==="Cancelled"?"cx":""}" data-edit="${e.src}" data-row="${e.row}" style="--c:${col}" title="${esc(e.title)}">${e.start?`<b>${esc(fmtTime(e.start).replace(":00","").replace(" ",""))}</b> `:""}${esc(e.title)}</button>`;
  const when=e.start?fmtTime(e.start)+(e.end?" – "+fmtTime(e.end):""):"All day";
  return `<button type="button" class="evrow ${e.status==="Cancelled"?"cx":""}" data-edit="${e.src}" data-row="${e.row}" style="--c:${col}"><span class="evbar"></span><span class="evt">${esc(when)}</span><span class="evm"><b>${esc(e.title)}</b><span>${esc([e.type,e.loc?String(e.loc).split(",").slice(0,2).join(","):""].filter(Boolean).join(" · "))}</span></span>${e.status!=="Scheduled"?pill(e.status):e.auto?`<span class="pill">From ${e.src==="Projects"?"project":"client"}</span>`:""}</button>`;
}
function calendarView(){
  const cal=state.cal;const t=today();
  const [Y,M]=cal.month.split("-").map(Number);
  const first=new Date(Y,M-1,1),days=new Date(Y,M,0).getDate(),lead=first.getDay();
  const rows=Math.ceil((lead+days)/7);
  const all=allEvents().filter(e=>!cal.hidden.includes(e.type));
  const byDay={};all.forEach(e=>(byDay[e.iso]=byDay[e.iso]||[]).push(e));
  let cells="";
  for(let i=0;i<rows*7;i++){
    const d=new Date(Y,M-1,1-lead+i),iso=isoOf(d),out=d.getMonth()!==M-1,list=byDay[iso]||[];
    const shown=list.slice(0,3),more=list.length-shown.length;
    cells+=`<div class="day${out?" out":""}${iso===t?" today":""}${iso===cal.sel?" sel":""}" role="gridcell" tabindex="0" data-cal-day="${iso}" aria-label="${esc(fmtDate(iso))}, ${list.length} event${list.length===1?"":"s"}"><span class="dn">${d.getDate()}</span><div class="evs">${shown.map(e=>evButton(e,true)).join("")}${more>0?`<span class="more">+${more} more</span>`:""}</div><div class="dots">${list.slice(0,4).map(e=>`<i style="background:${typeColor(e.type)}"></i>`).join("")}</div></div>`;
  }
  const selList=byDay[cal.sel]||[];
  const upcoming=all.filter(e=>e.iso>cal.sel&&e.iso>=t&&e.status!=="Cancelled").slice(0,10);
  const monthName=first.toLocaleDateString("en-PH",{month:"long",year:"numeric"});
  const selName=new Date(+cal.sel.slice(0,4),+cal.sel.slice(5,7)-1,+cal.sel.slice(8,10)).toLocaleDateString("en-PH",{weekday:"long",month:"long",day:"numeric"});
  const monthEvents=all.filter(e=>e.iso.slice(0,7)===cal.month);
  const counts=EVENT_TYPES.map(([n])=>allEvents().filter(e=>e.iso.slice(0,7)===cal.month&&e.type===n).length);
  return `<div class="vw v-cal">
  ${header("Calendar",`${monthEvents.length} event${monthEvents.length===1?"":"s"} in ${esc(monthName)}`,
    `<div class="mnav"><button type="button" class="iconbtn" data-cal-nav="-1" aria-label="Previous month">${UI.left}</button><b>${esc(monthName)}</b><button type="button" class="iconbtn" data-cal-nav="1" aria-label="Next month">${UI.right}</button></div>
    <button type="button" class="btn btn-line" data-cal-nav="0">Today</button><button type="button" class="btn btn-sol" data-new="Calendar" data-date="${cal.sel}">${UI.plus}<span class="lbl">Add event</span></button>`)}
  <div class="tfilter hscroll">${EVENT_TYPES.map(([n,c],i)=>`<button type="button" class="chip tchip" data-cal-type="${esc(n)}" aria-pressed="${!cal.hidden.includes(n)}" style="--c:${c}"><i></i>${esc(n)}${counts[i]?` <span>${counts[i]}</span>`:""}</button>`).join("")}</div>
  <div class="calwrap">
    <section class="card month"><div class="wk">${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=>`<span>${d}</span>`).join("")}</div><div class="mgrid" role="grid" style="--rows:${rows}">${cells}</div></section>
    <section class="card agenda"><div class="ch"><h2>${esc(selName)}</h2><span>${selList.length} event${selList.length===1?"":"s"}</span></div>
      <div class="agscroll" data-keep="agenda">
        <div class="evlist">${selList.length?selList.map(e=>evButton(e)).join(""):`<div class="empty">Nothing scheduled.</div>`}</div>
        <button type="button" class="btn btn-line w-100" data-new="Calendar" data-date="${cal.sel}">+ Add event on ${esc(fmtDate(cal.sel).replace(/, \d{4}$/,""))}</button>
        <h3 class="agh">Coming up</h3>
        <div class="evlist">${upcoming.length?upcoming.map(e=>`<div class="update">${esc(fmtDate(e.iso).replace(/, \d{4}$/,""))}</div>${evButton(e)}`).join(""):`<div class="empty">No upcoming events.</div>`}</div>
      </div></section>
  </div></div>`;
}


/* ---------- dashboard home: charts ---------- */
const COL={sol:"#FFB612",blue:"#6CB4FF",sky:"#8CC4FF",green:"#4FD18B",coral:"#FF7A59",lav:"#B9A6FF",slate:"#5E7590",grid:"#2B3D52",muted:"#8FA1B7"};
let CHARTS={},chartSeq=0;
const chartSlot=(fn,label)=>{const id="ch"+(++chartSeq);CHARTS[id]=fn;return `<div class="cbody chart" data-chart="${id}" role="img" aria-label="${esc(label)}"></div>`};
let chartAnim=false;
function drawCharts(anim){
  chartAnim=!!anim&&!matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("[data-chart]").forEach(el=>{
    const fn=CHARTS[el.dataset.chart];if(!fn)return;
    const w=Math.floor(el.clientWidth),h=Math.floor(el.clientHeight);if(w<40||h<40)return;
    el.innerHTML=fn(w,h);
  });
}
const shortPeso=v=>{v=Math.round(v);const a=Math.abs(v);return a>=1e6?"₱"+(v/1e6).toFixed(a>=1e7?1:2).replace(/\.?0+$/,"")+"M":a>=1e3?"₱"+Math.round(v/1e3)+"k":"₱"+v};
function niceMax(v){if(!(v>0))return 1;const p=Math.pow(10,Math.floor(Math.log10(v)));for(const m of [1,1.2,1.5,2,2.5,3,4,5,6,8,10])if(m*p>=v)return m*p;return 10*p}
const isoOf=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;

function buckets(per,dates){
  const now=new Date();const keys=[],labels=[];let keyOf,start,prevStart;
  if(per==="30"){
    for(let i=29;i>=0;i--){const d=new Date(now.getFullYear(),now.getMonth(),now.getDate()-i);keys.push(isoOf(d));labels.push(d.getDate()===1||i===29?MON[d.getMonth()]+" "+d.getDate():String(d.getDate()))}
    keyOf=iso=>iso;start=keys[0];prevStart=isoOf(new Date(now.getFullYear(),now.getMonth(),now.getDate()-59));
  }else if(per==="12"){
    for(let i=11;i>=0;i--){const d=new Date(now.getFullYear(),now.getMonth()-i,1);keys.push(`${d.getFullYear()}-${pad(d.getMonth()+1)}`);labels.push(MON[d.getMonth()])}
    keyOf=iso=>iso.slice(0,7);start=keys[0]+"-01";const p=new Date(now.getFullYear(),now.getMonth()-23,1);prevStart=isoOf(p);
  }else{
    const valid=dates.filter(Boolean).sort();
    const first=valid.length?new Date(+valid[0].slice(0,4),+valid[0].slice(5,7)-1,1):new Date(now.getFullYear(),now.getMonth()-11,1);
    const months=(now.getFullYear()-first.getFullYear())*12+now.getMonth()-first.getMonth()+1;
    if(months>24){for(let y=first.getFullYear();y<=now.getFullYear();y++){keys.push(String(y));labels.push(String(y))}keyOf=iso=>iso.slice(0,4)}
    else{const n=Math.max(months,6);for(let i=n-1;i>=0;i--){const d=new Date(now.getFullYear(),now.getMonth()-i,1);keys.push(`${d.getFullYear()}-${pad(d.getMonth()+1)}`);labels.push(MON[d.getMonth()]+(d.getMonth()===0?" "+String(d.getFullYear()).slice(2):""))}keyOf=iso=>iso.slice(0,7)}
    start="0000-00-00";prevStart=null;
  }
  return {keys,labels,keyOf,start,prevStart,end:today()};
}
function series(B,items,dateOf,valOf){
  const idx=new Map(B.keys.map((k,i)=>[k,i]));const out=B.keys.map(()=>0);
  items.forEach(it=>{const iso=dateOf(it);if(!iso||iso<B.start||iso>B.end)return;const i=idx.get(B.keyOf(iso));if(i!=null)out[i]+=valOf(it)});
  return out;
}
const cumulate=a=>{let s=0;return a.map(v=>s+=v)};

function spark(vals,color){
  if(vals.length<2)vals=[vals[0]||0,vals[0]||0];
  const w=100,h=30,mx=Math.max(...vals),mn=Math.min(...vals),rg=mx-mn||1;
  const pts=vals.map((v,i)=>[i*w/(vals.length-1),h-3-(v-mn)/rg*(h-7)]);
  const line=pts.map(p=>p[0].toFixed(1)+","+p[1].toFixed(1)).join(" ");
  const [lx,ly]=pts[pts.length-1];
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><path d="M0,${h} L${line.replace(/ /g," L")} L${w},${h} Z" fill="${color}" fill-opacity=".16"></path><polyline class="ln" pathLength="1" points="${line}" fill="none" stroke="${color}" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"></polyline><circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="2.4" fill="${color}" vector-effect="non-scaling-stroke"></circle></svg>`;
}

/* Bars with an optional line. o: {labels,bars,line,barColor,lineColor,fmt,lineFmt,lineOwnScale,callout} */
function barLine(o){
  return (w,h)=>{
    const fs=11,L=o.lineOwnScale?30:48,R=o.lineOwnScale?40:12,T=26,Bm=22;
    const pw=Math.max(10,w-L-R),phh=Math.max(10,h-T-Bm),n=o.labels.length,step=pw/n;
    const bmax=niceMax(Math.max(...o.bars,...(o.line&&!o.lineOwnScale?o.line:[0])));
    const lmax=o.lineOwnScale?niceMax(Math.max(...o.line)):bmax;
    const y=(v,m)=>T+phh-(v/m)*phh;let s="";
    for(let i=0;i<=4;i++){const v=bmax*i/4,yy=y(v,bmax);s+=`<line x1="${L}" x2="${L+pw}" y1="${yy.toFixed(1)}" y2="${yy.toFixed(1)}" stroke="${COL.grid}"></line><text x="${L-6}" y="${(yy+3.5).toFixed(1)}" text-anchor="end" font-size="${fs-1}" fill="${COL.muted}">${i?o.fmt(v):"0"}</text>`}
    const every=Math.max(1,Math.ceil(n/(pw/36)));
    o.bars.forEach((v,i)=>{const bw=Math.min(step*.62,46),x=L+i*step+(step-bw)/2,yy=y(v,bmax);
      if(v>0)s+=`<rect class="bar" style="animation-delay:${Math.min(i*28,600)}ms" x="${x.toFixed(1)}" y="${yy.toFixed(1)}" width="${bw.toFixed(1)}" height="${(T+phh-yy).toFixed(1)}" rx="${Math.min(4,bw/4).toFixed(1)}" fill="${o.barColor}" fill-opacity="${i===n-1?1:.82}"><title>${esc(o.labels[i])}: ${esc(o.fmt(v))}</title></rect>`;
      if(i%every===0||i===n-1)s+=`<text x="${(L+i*step+step/2).toFixed(1)}" y="${h-6}" text-anchor="middle" font-size="${fs-1}" fill="${COL.muted}">${esc(o.labels[i])}</text>`});
    if(o.line){
      const pts=o.line.map((v,i)=>[L+i*step+step/2,y(v,lmax)]);
      if(o.lineOwnScale){[0,lmax/2,lmax].forEach(v=>{s+=`<text x="${L+pw+6}" y="${(y(v,lmax)+3.5).toFixed(1)}" font-size="${fs-1}" fill="${o.lineColor}">${o.fmt(v)}</text>`});
        s+=`<path d="M${pts[0][0].toFixed(1)},${T+phh} L${pts.map(p=>p[0].toFixed(1)+","+p[1].toFixed(1)).join(" L")} L${pts[pts.length-1][0].toFixed(1)},${T+phh} Z" fill="${o.lineColor}" fill-opacity=".10"></path>`}
      s+=`<polyline class="ln" pathLength="1" points="${pts.map(p=>p[0].toFixed(1)+","+p[1].toFixed(1)).join(" ")}" fill="none" stroke="${o.lineColor}" stroke-width="2.4" stroke-linejoin="round"></polyline>`;
      if(n<=31&&!o.lineOwnScale)s+=pts.map((p,i)=>`<circle class="pt" style="animation-delay:${300+i*30}ms" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3" fill="#16212E" stroke="${o.lineColor}" stroke-width="2"><title>${esc(o.labels[i])}: ${esc((o.lineFmt||o.fmt)(o.line[i]))}</title></circle>`).join("");
      const [lx,ly]=pts[pts.length-1],lv=o.line[o.line.length-1];
      if(lv>0){const txt=(o.lineFmt||o.fmt)(lv),tw=txt.length*7+14,bx=Math.min(Math.max(lx-tw/2,L),L+pw-tw),by=Math.max(ly-28,2);
        s+=`<circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="3.6" fill="${o.lineColor}"></circle><rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${tw}" height="20" rx="6" fill="${o.lineColor}"></rect><text x="${(bx+tw/2).toFixed(1)}" y="${(by+14).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="#16212E">${esc(txt)}</text>`}
    }
    const empty=!o.bars.some(v=>v>0)&&!(o.line||[]).some(v=>v>0);
    if(empty)s+=`<text x="${L+pw/2}" y="${T+phh/2}" text-anchor="middle" font-size="13" fill="${COL.muted}">${esc(o.emptyText||"No data for this period yet")}</text>`;
    return `<svg class="${chartAnim?"anim":""}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" font-family="Inter, system-ui, sans-serif">${s}</svg>`;
  };
}
function donutHTML(parts,big,small){
  const tot=parts.reduce((a,p)=>a+p[1],0),r=56,c=2*Math.PI*r;let off=0,segs="";
  if(tot)parts.forEach(([n,v,col])=>{if(!v)return;const L=c*v/tot;segs+=`<circle class="seg" style="animation-delay:${Math.round(off/c*500)}ms" cx="80" cy="80" r="${r}" fill="none" stroke="${col}" stroke-width="22" stroke-dasharray="${Math.max(L-(parts.filter(p=>p[1]).length>1?2.5:0),0).toFixed(2)} ${c.toFixed(2)}" stroke-dashoffset="${(-off).toFixed(2)}" transform="rotate(-90 80 80)"></circle>`;off+=L});
  const leg=parts.map(([n,v,col])=>`<div class="lg"><i style="background:${col}"></i><span>${esc(n)}</span><b>${v}</b><em>${tot?Math.round(v/tot*100):0}%</em></div>`).join("");
  return `<div class="cbody donut"><svg viewBox="0 0 160 160" role="img" aria-label="${esc(small)}"><circle cx="80" cy="80" r="${r}" fill="none" stroke="#26374B" stroke-width="22"></circle>${segs}<text x="80" y="84" text-anchor="middle" font-size="28" font-weight="800" fill="#fff" font-family="Inter, sans-serif">${big}</text><text x="80" y="103" text-anchor="middle" font-size="11" fill="${COL.muted}" font-family="Inter, sans-serif">${esc(small)}</text></svg><div class="legend">${leg}</div></div>`;
}
const COUNT_FMT={int:v=>String(Math.round(v)),peso:v=>peso(v),short:v=>shortPeso(v),kwp:v=>(Math.round(v*10)/10).toLocaleString("en-PH"),pct:v=>Math.round(v)+"%"};
function countUp(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  document.querySelectorAll("[data-count]").forEach(el=>{
    const to=+el.dataset.count,f=COUNT_FMT[el.dataset.fmt]||COUNT_FMT.int;if(!(to>0))return;
    const t0=performance.now(),dur=900;
    const step=now=>{const k=Math.min(1,(now-t0)/dur),e=1-Math.pow(1-k,3);el.textContent=f(to*e);if(k<1)requestAnimationFrame(step);else el.textContent=f(to)};
    requestAnimationFrame(step);
  });
}
const legendHTML=items=>`<div class="ckey">${items.map(([c,t])=>`<span><i style="background:${c}"></i>${esc(t)}</span>`).join("")}</div>`;
const townOf=c=>{const parts=String(c.Address||"").split(",").map(s=>s.trim().replace(/\s*\b\d{4}\b\s*$/,"")).filter(x=>x&&!/^philippines$/i.test(x));if(!parts.length)return "";if(parts.length>=3)return parts[parts.length-2];if(parts.length===2)return /davao|oro|norte|sur|province/i.test(parts[1])?parts[0]:parts[1];return parts[0]};
const typeGroup=t=>{t=String(t||"");if(/under construction/i.test(t))return "Under construction";if(/^residen/i.test(t))return "Residence";if(/^business/i.test(t))return "Business";return t?"Other":"Not set"};

/* ---------- dashboard home: KPI and panel catalogue, a layout you can edit, pages sized to the screen ---------- */
const dayMs=864e5;
const isoDate=iso=>new Date(+iso.slice(0,4),+iso.slice(5,7)-1,+iso.slice(8,10));
const daysBetween=(a,b)=>Math.round((isoDate(b)-isoDate(a))/dayMs);
function workDays(a,b){let n=0;for(let d=isoDate(a),e=isoDate(b);d<=e;d=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1))if(d.getDay()!==0)n++;return n}
function quoteValue(c){
  const pk=parsePackages(c.Packages).filter(p=>p.price>0);
  const ch=c["Chosen Package"]&&pk.find(p=>p.name===c["Chosen Package"]);
  if(ch)return ch.price;if(pk.length)return Math.min(...pk.map(p=>p.price));return num(c["Quoted Price"]);
}
COUNT_FMT.days=v=>Math.round(v)+(Math.round(v)===1?" day":" days");

function dashCalc(){
  const {Clients,Projects}=state.data;const t=today();const per=state.period;
  const pDate=p=>toISO(p["Contract Date"])||toISO(p["Start Date"]);
  const cDate=p=>toISO(p["Completion Date"]);
  const vDate=c=>toISO(c["Consultation Date"]);
  const qDate=c=>toISO(c["Quote Date"]);
  const B=buckets(per,[...Projects.map(pDate),...Projects.map(cDate),...Clients.map(vDate)]);
  const inR=iso=>!!iso&&iso>=B.start&&iso<=t;
  const inPrev=iso=>B.prevStart&&iso&&iso>=B.prevStart&&iso<B.start;
  const perLabel={"30":"last 30 days","12":"last 12 months","all":"all time"}[per];
  const signed=series(B,Projects,pDate,p=>num(p["Contract Price"]));
  const payItems=Projects.flatMap(p=>{const logs=paymentLines(p);const logged=logs.reduce((a,x)=>a+x.amt,0);const rest=num(p["Amount Received"])-logged;return [...logs.map(x=>({iso:x.iso,amt:x.amt})),...(rest>0?[{iso:pDate(p),amt:rest}]:[])]});
  const collected=series(B,payItems,x=>x.iso,x=>x.amt);
  const done=Projects.filter(p=>p.Status==="Completed");
  const kwpSeries=series(B,done,cDate,p=>num(p["System (kWp)"]));
  const kwpCum=cumulate(kwpSeries);
  const visits=series(B,Clients.filter(c=>c["Consulted (Y/N)"]==="Yes"),vDate,()=>1);
  const started=series(B,Projects,pDate,()=>1);
  const active=Projects.filter(p=>p.Status!=="Completed");
  const pipeline=active.reduce((s,p)=>s+num(p["Contract Price"]),0);
  const collect=active.reduce((s,p)=>s+balanceOf(p),0);
  const projIn=Projects.filter(p=>inR(pDate(p)));
  const revenue=projIn.reduce((s,p)=>s+num(p["Contract Price"]),0);
  const prevRev=Projects.filter(p=>inPrev(pDate(p))).reduce((s,p)=>s+num(p["Contract Price"]),0);
  const recv=projIn.reduce((s,p)=>s+num(p["Amount Received"]),0);
  const rate=revenue?recv/revenue*100:null;
  const doneIn=done.filter(p=>inR(cDate(p)));
  const kwpIn=doneIn.reduce((s,p)=>s+num(p["System (kWp)"]),0);
  const consultedIn=Clients.filter(c=>c["Consulted (Y/N)"]==="Yes"&&inR(vDate(c))).length;
  const owed=cumulate(signed.map((v,i)=>v-collected[i]));
  const rateSeries=(()=>{const a=cumulate(signed),b=cumulate(collected);return a.map((v,i)=>v?b[i]/v*100:0)})();
  const revDelta=B.prevStart&&prevRev?Math.round((revenue-prevRev)/prevRev*100):null;
  const stg=new Map(Clients.map(c=>[c,stageOf(c)]));const st=c=>stg.get(c);
  const QUOTED=["Quoted","Accepted","Signed","Lost"];
  const quotedIn=Clients.filter(c=>QUOTED.includes(st(c))&&(per==="all"||inR(qDate(c)||vDate(c))));
  const signedIn=quotedIn.filter(c=>st(c)==="Signed");
  const pending=Clients.filter(c=>st(c)==="Quoted"||st(c)==="Accepted");
  const pendingVal=pending.reduce((s,c)=>s+quoteValue(c),0);
  const gsisWait=Projects.filter(p=>p.Status==="Awaiting loan release");
  const gsisWaitBal=gsisWait.reduce((s,p)=>s+balanceOf(p),0);
  const withCost=projIn.filter(p=>num(p["Job Cost"])>0);
  const gp=withCost.reduce((s,p)=>s+num(p["Contract Price"])-num(p["Job Cost"]),0);
  const gpBase=withCost.reduce((s,p)=>s+num(p["Contract Price"]),0);
  const gpSeries=series(B,Projects.filter(p=>num(p["Job Cost"])>0),pDate,p=>num(p["Contract Price"])-num(p["Job Cost"]));
  const dts=projIn.map(p=>{const c=clientFor(p);const a=c&&vDate(c),b=pDate(p);return a&&b?daysBetween(a,b):null}).filter(v=>v!=null&&v>=0);
  const gsisN=projIn.filter(p=>p.Payment==="GSIS loan").length,cashN=projIn.filter(p=>p.Payment==="Cash").length;
  const inst=doneIn.map(p=>{const a=toISO(p["Start Date"]),b=cDate(p);return a&&b&&b>=a?workDays(a,b):null}).filter(v=>v!=null);
  const evs=allEvents();const wkEnd=isoOf(new Date(Date.now()+6*dayMs));
  const week=evs.filter(e=>e.iso>=t&&e.iso<=wkEnd&&e.status==="Scheduled"&&e.type!=="Follow-up call");
  const weekDays=Array.from({length:7},(_,i)=>{const d=isoOf(new Date(Date.now()+i*dayMs));return week.filter(e=>e.iso===d).length});
  const src={};Clients.forEach(c=>{const s=String(c.Source||"").trim();if(!s)return;src[s]=src[s]||{n:0,signed:0};src[s].n++;if(st(c)==="Signed")src[s].signed++});
  const srcList=Object.entries(src).sort((a,b)=>b[1].n-a[1].n);
  const tagged=srcList.reduce((a,x)=>a+x[1].n,0);
  return {Clients,Projects,t,per,B,perLabel,pDate,cDate,vDate,qDate,inR,signed,collected,done,kwpSeries,kwpCum,visits,started,active,pipeline,collect,projIn,revenue,recv,rate,doneIn,kwpIn,consultedIn,owed,rateSeries,revDelta,st,
    quotedIn,signedIn,pending,pendingVal,gsisWait,gsisWaitBal,withCost,gp,gpBase,gpSeries,dts,gsisN,cashN,inst,evs,week,weekDays,srcList,tagged};
}

/* KPI catalogue. go = where a tap takes you. */
const KPI_META={
  revenue:["Money","Revenue","Contract value signed in the period"],
  collect:["Money","To collect","Balance still owed on active jobs"],
  collectRate:["Money","Collection rate","Received vs contract value"],
  avgDeal:["Money","Average deal size","Average contract price"],
  profit:["Money","Gross profit","Contract price minus job cost"],
  margin:["Money","Average margin","Profit as a share of price"],
  clients:["Sales","Clients","All clients and recent consultations"],
  quoteRate:["Sales","Quote to signed","Out of the quotes you sent, how many signed"],
  daysToSign:["Sales","Days to sign","Consultation to contract, on average"],
  pending:["Sales","Pending quotations","Quoted, no answer yet: your follow-ups"],
  gsisShare:["Sales","GSIS vs cash","Share of contracts on a GSIS loan"],
  active:["Operations","Active projects","Jobs not yet completed"],
  kwp:["Operations","kWp installed","Solar capacity completed"],
  installDays:["Operations","Install days per job","Working days from start to finish"],
  gsisWait:["Operations","Waiting on GSIS release","Jobs and amounts at loan release"],
  jobsWeek:["Operations","Jobs this week","Installs and site visits, next 7 days"],
  topSource:["Marketing","Top lead source","Where most of your clients come from"]
};
function kpiDefs(D){
  const ip=D.per==="all"?"Revenue, all time":D.per==="30"?"Revenue, 30 days":"Revenue, 12 mo";
  const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:null;
  const top=D.srcList[0];
  const iD=avg(D.inst);
  return {
    revenue:{label:ip,n:D.revenue,fmt:"short",hint:D.revDelta==null?"Contract value signed":(D.revDelta>=0?"+":"")+D.revDelta+"% vs prior period",hc:D.revDelta==null?"":D.revDelta>=0?COL.green:COL.coral,vals:D.signed,color:COL.green,go:"projects:All"},
    collect:{label:"To collect",n:D.collect,fmt:"peso",hint:"Balance on active jobs",vals:D.owed,color:COL.sol,vcls:"y",go:"projects:Balance"},
    collectRate:{label:"Collection rate",n:D.rate,fmt:"pct",hint:"Collected vs contract",hc:D.rate!=null&&D.rate>=80?COL.green:"",vals:D.rateSeries,color:COL.coral,go:"projects:Balance"},
    avgDeal:{label:"Average deal size",n:D.projIn.length?D.revenue/D.projIn.length:null,fmt:"short",hint:`${D.projIn.length} contract${D.projIn.length===1?"":"s"}, ${D.perLabel}`,vals:D.signed,color:COL.sol,go:"projects:All"},
    profit:{label:"Gross profit",n:D.withCost.length?D.gp:null,fmt:"short",hint:D.withCost.length?`${D.withCost.length} of ${D.projIn.length} projects have a job cost`:"Add the job cost to your projects",vals:D.gpSeries,color:COL.green,vcls:"g",go:"projects:All"},
    margin:{label:"Average margin",n:D.gpBase?D.gp/D.gpBase*100:null,fmt:"pct",hint:D.withCost.length?"Projects with a job cost":"Add the job cost to your projects",hc:D.gpBase&&D.gp/D.gpBase<0.2?COL.coral:"",vals:D.gpSeries,color:COL.lav,go:"projects:All"},
    clients:{label:"Clients",n:D.Clients.length,fmt:"int",hint:`${D.consultedIn} consulted, ${D.perLabel}`,hc:COL.green,vals:cumulate(D.visits),color:COL.blue,go:"clients"},
    quoteRate:{label:"Quote to signed",n:D.quotedIn.length?D.signedIn.length/D.quotedIn.length*100:null,fmt:"pct",hint:D.quotedIn.length?`${D.signedIn.length} of ${D.quotedIn.length} quotes signed`:"No quotes in this period",vals:D.started,color:COL.blue,go:"clients:Signed"},
    daysToSign:{label:"Days to sign",n:avg(D.dts),fmt:"days",hint:D.dts.length?`Consultation to contract · ${D.dts.length} deal${D.dts.length===1?"":"s"}`:"Needs consultation and contract dates",vals:D.dts.length>1?D.dts:[0,0],color:COL.sky,go:"projects:All"},
    pending:{label:"Pending quotations",n:D.pending.length,fmt:"int",hint:D.pending.length?shortPeso(D.pendingVal)+" waiting for an answer":"No quotes waiting",vcls:D.pending.length?"y":"",vals:cumulate(series(D.B,D.pending,D.qDate,()=>1)),color:COL.sol,go:"clients:Quoted"},
    gsisShare:{label:"GSIS vs cash",n:D.projIn.length?D.gsisN/D.projIn.length*100:null,fmt:"pct",hint:`${D.gsisN} GSIS · ${D.cashN} cash, ${D.perLabel}`,vals:series(D.B,D.Projects.filter(p=>p.Payment==="GSIS loan"),D.pDate,()=>1),color:COL.coral,go:"projects:All"},
    active:{label:"Active projects",n:D.active.length,fmt:"int",hint:`${shortPeso(D.pipeline)} contract value`,vals:D.started,color:COL.sol,go:"projects:Active"},
    kwp:{label:"kWp installed",n:D.kwpIn,fmt:"kwp",hint:`${D.doneIn.length} system${D.doneIn.length===1?"":"s"} completed`,vals:D.kwpCum,color:COL.lav,go:"projects:Completed"},
    installDays:{label:"Install days per job",n:iD,fmt:"days",hint:iD==null?"Needs start and completion dates":iD<=10?"Within your 5–10 day promise":"Over your 5–10 day promise",hc:iD==null?"":iD<=10?COL.green:COL.coral,vals:D.inst.length>1?D.inst:[0,0],color:COL.teal||"#3DD6C6",go:"projects:Completed"},
    gsisWait:{label:"Waiting on GSIS release",n:D.gsisWait.length,fmt:"int",hint:D.gsisWait.length?shortPeso(D.gsisWaitBal)+" to be released":"Nothing waiting",vcls:D.gsisWait.length?"y":"",vals:D.started,color:"#3DD6C6",go:"projects:Awaiting loan release"},
    jobsWeek:{label:"Jobs this week",n:D.week.length,fmt:"int",hint:`${D.week.filter(e=>e.type==="Installation").length} installs · ${D.week.filter(e=>e.type==="Site visit / Consultation").length} site visits`,vals:D.weekDays,color:COL.blue,go:"calendar"},
    topSource:{label:"Top lead source",text:top?top[0]:null,hint:top?`${top[1].n} of ${D.tagged} tagged clients · ${top[1].signed} signed`:"Add a lead source to your clients",vals:D.srcList.map(x=>x[1].n).reverse(),color:COL.green,go:"clients"}
  };
}

/* Panel catalogue */
const PANEL_META={
  contracts:["Contracts vs collections","Money signed and collected over time",true],
  pipeline:["Installation pipeline","Active jobs by stage and the next install",false],
  upnext:["Up next","Your next site visits, installs and meetings",false],
  pendingList:["Pending quotations","Clients to follow up, oldest first",false],
  funnel:["Client funnel","From client to completed system",false],
  gsisList:["Waiting on GSIS release","Projects at loan release",false],
  clientsBy:["Clients by","Type, town, payment and lead source",false],
  kwpChart:["kWp installed","Capacity completed over time",true],
  sources:["Leads by source","Which source brings clients who sign",false],
  balances:["Balances to collect","Active jobs with money still owed",false]
};
const KPI_DEFAULT=["revenue","collect","quoteRate","pending","gsisWait","active","profit","jobsWeek"];
const PANEL_DEFAULT=["contracts","pipeline","upnext","pendingList","funnel","gsisList","clientsBy"];
const LKEY="srv2.layout.one";const SKEY="dashboard.layout.one";
function cleanLayout(L){
  const k=Array.isArray(L&&L.kpis)?L.kpis.filter((id,i,a)=>KPI_META[id]&&a.indexOf(id)===i):KPI_DEFAULT.slice();
  const p=Array.isArray(L&&L.panels)?L.panels.filter((id,i,a)=>PANEL_META[id]&&a.indexOf(id)===i):PANEL_DEFAULT.slice();
  const sz={};Object.keys(PANEL_META).forEach(id=>{const w=L&&L.sizes&&+L.sizes[id];sz[id]=w>=1&&w<=4?Math.round(w):(PANEL_META[id][2]?2:1)});
  return {kpis:k,panels:p,sizes:sz,at:(L&&L.at)||0};
}
state.layout=(()=>{try{return cleanLayout(JSON.parse(lsGet(LKEY)||"null"))}catch(e){return cleanLayout(null)}})();
function applyLayoutFromSheet(){
  if(state.edit)return;
  const row=(state.data.Settings||[]).find(r=>r.Key===SKEY);if(!row)return;
  try{const L=cleanLayout(JSON.parse(row.Value));if((L.at||0)>=(state.layout.at||0)){state.layout=L;lsSet(LKEY,JSON.stringify(L))}}catch(e){}
}
function storeLayout(sync){
  state.layout.at=Date.now();lsSet(LKEY,JSON.stringify(state.layout));
  if(sync&&cfg.api)saveSetting(SKEY,JSON.stringify(state.layout));
}

/* Everything on one screen, packed in rows that always fill the full width.
   Each panel has a width of 1 to 4 parts; a row holds up to "cols" parts and its panels stretch to fill it. */
const panelW=id=>(state.layout.sizes&&state.layout.sizes[id])||(PANEL_META[id][2]?2:1);
function packRows(ids,cols){
  const rows=[];let cur=[],used=0;
  ids.forEach(id=>{const w=Math.min(cols,panelW(id));if(cur.length&&used+w>cols){rows.push(cur);cur=[];used=0}cur.push({id,w});used+=w});
  if(cur.length)rows.push(cur);return rows;
}
function splitEven(list,rows){const out=[];let i=0;for(let r=0;r<rows;r++){const n=Math.ceil((list.length-i)/(rows-r));out.push(list.slice(i,i+n));i+=n}return out}
function dashFit(kpis,panels){
  const m=$("#main"),phone=innerWidth<700;
  const W=(m&&m.clientWidth?m.clientWidth:innerWidth)-(phone?24:36);
  const H=(m&&m.clientHeight?m.clientHeight:innerHeight)-(phone?20:30);
  if(phone||H<430){const cols=phone?1:2;return {phone:true,cols,krows:splitEven(kpis,Math.ceil(kpis.length/(phone?2:4))),rows:packRows(panels,cols),tight:false}}
  const cols=W>=1150?4:W>=640?3:2;
  const kmax=Math.max(2,Math.min(8,Math.floor((W+10)/150)));
  const kr=kpis.length?Math.ceil(kpis.length/kmax):0;
  const rows=packRows(panels,cols);
  const kh=kr>1?(H<760?66:74):(H<760?80:92);
  const ph=H-50-12-(kr?kr*kh+(kr-1)*8+12:0);
  const rowH=rows.length?(ph-(rows.length-1)*12)/rows.length:ph;
  return {phone:false,cols,krows:splitEven(kpis,kr),rows,tight:rowH<165,rowH};
}

function ectl(kind,id,w,cols){
  if(!state.edit)return "";
  const size=kind==="panel"?`<button type="button" data-size="${id}:-1" ${w<=1?"disabled":""} aria-label="Make narrower" title="Narrower">−</button><span class="wtag" aria-hidden="true">${w}/${cols}</span><button type="button" data-size="${id}:1" ${w>=cols?"disabled":""} aria-label="Make wider" title="Wider">+</button>`:"";
  return `<div class="ectl"><span class="grip" title="Drag to move" aria-hidden="true">${UI.grip}</span><button type="button" data-move="${kind}:${id}:-1" aria-label="Move earlier">${UI.left}</button><button type="button" data-move="${kind}:${id}:1" aria-label="Move later">${UI.right}</button>${size}<button type="button" class="rm" data-remove="${kind}:${id}" aria-label="Remove">${UI.x}</button></div>${kind==="panel"?`<span class="rsz" data-rsz="${id}" title="Drag to resize" aria-hidden="true"></span>`:""}`;
}
function kpiHTML(id,k){
  const go=state.edit?"":k.go;
  const val=k.text!==undefined?(k.text==null?"–":esc(k.text)):(k.n==null?"–":COUNT_FMT[k.fmt](k.n));
  const cnt=k.text===undefined&&k.n!=null&&!state.edit?`data-count="${k.n}" data-fmt="${k.fmt}"`:"";
  return `<div class="kpi${go?" tap":""}${k.text!==undefined?" txt":""}" data-lid="kpi:${id}" ${go?`data-goto="${go}" tabindex="0" role="button" aria-label="${esc(k.label)}: open details"`:""}>${ectl("kpi",id,1,1)}<div class="l">${esc(k.label)}</div><div class="v ${k.vcls||""}" ${cnt}>${val}</div><div class="h" ${k.hc?`style="color:${k.hc}"`:""}>${esc(k.hint)}</div>${spark(k.vals&&k.vals.length?k.vals:[0,0],k.color||COL.sol)}</div>`;
}
const relDays=iso=>{if(!iso)return "";const d=daysBetween(iso,today());return d<=0?"today":d===1?"1 day ago":d+" days ago"};
function panelBody(id,D){
  const t=D.t;
  if(id==="contracts")return {sub:D.perLabel[0].toUpperCase()+D.perLabel.slice(1)+" · ₱",go:"projects:All",body:legendHTML([[COL.sol,"Contracts signed"],[COL.blue,"Collected"]])+chartSlot(barLine({labels:D.B.labels,bars:D.signed,line:D.collected,barColor:COL.sol,lineColor:COL.blue,fmt:shortPeso,emptyText:"Add projects with a contract date to see this chart"}),"Contracts signed and amounts collected, "+D.perLabel)};
  if(id==="kwpChart")return {sub:"Completed systems",go:"projects:Completed",body:legendHTML([[COL.lav,"kWp per period"],[COL.sol,"Running total"]])+chartSlot(barLine({labels:D.B.labels,bars:D.kwpSeries,line:D.kwpCum,barColor:COL.lav,lineColor:COL.sol,fmt:v=>String(Math.round(v*10)/10),lineFmt:v=>(Math.round(v*10)/10)+" kWp",lineOwnScale:true,emptyText:"Completed projects show here"}),"kWp installed per period with running total")};
  if(id==="pipeline"){
    const stages=[["Downpayment",COL.coral],["Ordering",COL.lav],["Scheduled",COL.blue],["Installing",COL.sol],["Awaiting loan release","#3DD6C6"]].map(([n,c])=>[n,D.active.filter(p=>p.Status===n).length,c]);
    const next=D.evs.find(e=>e.type==="Installation"&&e.iso>=t&&e.status==="Scheduled");
    return {sub:`${D.active.length} active`,go:"projects:Active",body:`<div class="cbody pipe2"><div class="stackbar">${D.active.length?stages.filter(s=>s[1]).map(([n,v,c])=>`<i style="flex:${v};background:${c}" title="${n}: ${v}"></i>`).join(""):'<i style="flex:1;background:#32465E"></i>'}</div>
      <div class="slist">${stages.map(([n,v,c])=>`<button type="button" class="lg lgb" data-goto="projects:${esc(n)}"><i style="background:${c}"></i><span>${n==="Awaiting loan release"?"Loan release":n}</span><b>${v}</b></button>`).join("")}</div>
      <button type="button" class="nextbox" ${next?`data-edit="${next.src}" data-row="${next.row}"`:'data-view="calendar"'}><span>Next install</span><b>${next?esc(next.client||next.title)+" · "+fmtDate(next.iso).replace(/, \d{4}$/,""):"None scheduled"}</b></button></div>`};
  }
  if(id==="funnel"){
    const at=list=>D.Clients.filter(c=>list.includes(D.st(c))).length;
    const fun=[["Clients",D.Clients.length,COL.blue],["Consulted",at(["Consulted","Quoted","Accepted","Signed","Lost"]),COL.sky],["Quoted",at(["Quoted","Accepted","Signed","Lost"]),COL.lav],["Signed",at(["Signed"]),COL.sol],["Completed",D.done.length,COL.green]];
    const mx=Math.max(1,fun[0][1]);
    return {sub:"Conversion",go:"clients",body:`<div class="cbody hbars fun">${fun.map(([n,v,c],i)=>{const pct=i&&fun[i-1][1]?Math.round(v/fun[i-1][1]*100):null;return `<div class="hb"><span>${n}</span><div><i style="animation-delay:${i*70}ms;width:${(v/mx*100).toFixed(0)}%;background:${c}"></i></div><b>${v}</b><em>${pct!=null?pct+"%":""}</em></div>`}).join("")}</div>`};
  }
  if(id==="clientsBy"){
    const tabs=[["type","Type"],["town","Town"],["pay","Payment"],["source","Source"]];
    const tb=`<div class="mtabs" role="tablist">${tabs.map(([k,l])=>`<button type="button" role="tab" data-cb="${k}" aria-selected="${state.cb===k}">${l}</button>`).join("")}</div>`;
    let body="";
    if(state.cb==="town"||state.cb==="source"){
      const cnt={};D.Clients.forEach(c=>{const k=state.cb==="town"?townOf(c):String(c.Source||"").trim();if(k)cnt[k]=(cnt[k]||0)+1});
      const list=Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,7),mx=Math.max(1,...list.map(x=>x[1]));
      body=list.length?`<div class="cbody hbars">${list.map(([n,v],i)=>`<div class="hb"><span>${esc(n)}</span><div><i style="animation-delay:${i*60}ms;width:${(v/mx*100).toFixed(0)}%;background:${i?COL.blue:COL.sol}"></i></div><b>${v}</b></div>`).join("")}</div>`
        :`<div class="cbody"><div class="empty">${state.cb==="town"?'Add addresses like "Poblacion, Monkayo, Davao de Oro" and towns show here.':"Pick a lead source on each client and it shows here."}</div></div>`;
    }else if(state.cb==="pay"){
      const pays=[["Cash",D.Projects.filter(p=>p.Payment==="Cash").length,COL.green],["GSIS loan",D.Projects.filter(p=>p.Payment==="GSIS loan").length,COL.coral]];
      const no=D.Projects.length-pays[0][1]-pays[1][1];if(no)pays.push(["Not set",no,COL.slate]);
      body=donutHTML(pays,D.Projects.length,"projects");
    }else{
      const types=["Residence","Business","Under construction","Other","Not set"].map((n,i)=>[n,D.Clients.filter(c=>typeGroup(c.Type)===n).length,[COL.sol,COL.blue,COL.lav,COL.green,COL.slate][i]]).filter(p=>p[1]||["Residence","Business"].includes(p[0]));
      body=donutHTML(types,D.Clients.length,"clients");
    }
    return {title:"Clients by",sub:"",go:"clients",body:tb+body};
  }
  if(id==="upnext"){
    const list=D.evs.filter(e=>e.iso>=t&&e.status==="Scheduled").slice(0,6);
    return {sub:"From Calendar",go:"calendar",body:`<div class="cbody plist">${list.length?list.map((e,i)=>{const d=isoDate(e.iso);return `<button type="button" class="ev${i===0?" next":""}" data-edit="${e.src}" data-row="${e.row}" style="--c:${typeColor(e.type)}"><span class="dt"><span>${d.toLocaleDateString("en-PH",{weekday:"short"})}</span><b>${d.getDate()}</b></span><span class="m"><b>${esc(e.title)}</b><span>${esc([e.start?fmtTime(e.start):"",e.type,e.loc?String(e.loc).split(",")[0]:""].filter(Boolean).join(" · "))}</span></span></button>`}).join(""):`<div class="empty">Nothing scheduled. Add site visits and installs in Calendar.</div>`}</div>`};
  }
  if(id==="pendingList"){
    const list=[...D.pending].sort((a,b)=>(D.qDate(a)||"9").localeCompare(D.qDate(b)||"9")).slice(0,8);
    return {sub:`${D.pending.length} · ${shortPeso(D.pendingVal)}`,go:"clients:Quoted",body:`<div class="cbody plist">${list.length?list.map(c=>{const q=quoteSummary(c);return `<button type="button" class="prow" data-client="${c._row}"><span class="m"><b>${esc(c.Client||"Unnamed")}</b><span>${esc([D.qDate(c)?"Quoted "+relDays(D.qDate(c)):"No quote date",townOf(c)].filter(Boolean).join(" · "))}</span></span><span class="r">${pill(D.st(c))}<b>${q?esc(q.text):""}</b></span></button>`}).join(""):`<div class="empty">No quotations waiting for an answer.</div>`}</div>`};
  }
  if(id==="gsisList"){
    const list=[...D.gsisWait].sort((a,b)=>(D.pDate(a)||"9").localeCompare(D.pDate(b)||"9"));
    return {sub:`${list.length} · ${shortPeso(D.gsisWaitBal)}`,go:"projects:Awaiting loan release",body:`<div class="cbody plist">${list.length?list.map(p=>{const c=clientFor(p);return `<button type="button" class="prow" data-edit="Projects" data-row="${p._row}"><span class="m"><b>${esc((c&&c.Client)||p.Client||"Project")}</b><span>${esc([p["System (kWp)"]?p["System (kWp)"]+" kWp":"",D.pDate(p)?"Signed "+relDays(D.pDate(p)):""].filter(Boolean).join(" · "))}</span></span><span class="r"><b class="y">${shortPeso(balanceOf(p))}</b><span class="sub">to release</span></span></button>`}).join(""):`<div class="empty">No projects waiting for a GSIS loan release.</div>`}</div>`};
  }
  if(id==="balances"){
    const list=D.active.filter(p=>balanceOf(p)>0).sort((a,b)=>balanceOf(b)-balanceOf(a)).slice(0,8);
    return {sub:shortPeso(D.collect)+" total",go:"projects:Balance",body:`<div class="cbody plist">${list.length?list.map(p=>{const c=clientFor(p),pct=paidPct(p);return `<button type="button" class="prow" data-edit="Projects" data-row="${p._row}"><span class="m"><b>${esc((c&&c.Client)||p.Client||"Project")}</b><span class="paybar wide"><i style="width:${pct}%"></i></span></span><span class="r"><b>${shortPeso(balanceOf(p))}</b><span class="sub">${pct}% paid</span></span></button>`}).join(""):`<div class="empty">Nothing left to collect on active jobs.</div>`}</div>`};
  }
  if(id==="sources"){
    const mx=Math.max(1,...D.srcList.map(x=>x[1].n));
    return {sub:"All clients",go:"clients",body:D.srcList.length?`<div class="cbody hbars">${D.srcList.slice(0,6).map(([n,o],i)=>`<div class="hb src"><span>${esc(n)}</span><div><i style="width:${(o.n/mx*100).toFixed(0)}%;background:${i?COL.blue:COL.sol}"></i><i class="sg" style="width:${(o.signed/mx*100).toFixed(0)}%"></i></div><b>${o.n}</b><em>${o.n?Math.round(o.signed/o.n*100):0}% signed</em></div>`).join("")}</div>`:`<div class="cbody"><div class="empty">Pick a lead source on each client (Facebook page, Facebook ad, Referral, Walk-in) and you'll see which one brings clients who sign.</div></div>`};
  }
  return {sub:"",body:""};
}
function panelHTML(it,D,cols){
  const P=panelBody(it.id,D);const title=P.title||PANEL_META[it.id][0];const go=state.edit?"":P.go;
  return `<section class="card pnl p-${it.id}${go?" tap":""}" data-lid="panel:${it.id}" ${go?`data-goto="${go}" tabindex="0"`:""} style="--w:${it.w}">${ectl("panel",it.id,it.w,cols)}<div class="ch"><h2>${esc(title)}</h2><span>${esc(P.sub||"")}</span></div>${P.body}</section>`;
}
function homeView(){
  const D=dashCalc(),K=kpiDefs(D),L=state.layout,F=dashFit(L.kpis,L.panels);
  const hr=new Date().getHours();const greet=hr<12?"Good morning":hr<18?"Good afternoon":"Good evening";
  const date=new Date().toLocaleDateString("en-PH",{weekday:"short",month:"short",day:"numeric"});
  const seg=[["30","30 days"],["12","12 mo"],["all","All"]].map(([k,l])=>`<button type="button" class="btn${state.period===k?" on":""}" data-period="${k}" aria-pressed="${state.period===k}">${l}</button>`).join("");
  const acts=state.edit
    ?`<span class="edithint">Drag a widget to move it · drag its right edge or use − + to resize · × to remove</span><button type="button" class="btn btn-line" data-dact="add">${UI.plus}<span class="lbl">Add widget</span></button><button type="button" class="btn btn-line" data-dact="reset">${UI.reset}<span class="lbl">Reset</span></button><button type="button" class="btn btn-sol" data-dact="done">Done</button>`
    :`<div class="seg" role="group" aria-label="Period">${seg}</div><button type="button" class="iconbtn" data-dact="edit" aria-label="Edit dashboard widgets" title="Edit widgets">${UI.edit}</button><button class="btn btn-line hide-sm" type="button" data-new="Projects">+ Project</button><button class="btn btn-sol hide-sm" type="button" data-new="Clients">+ Client</button>`;
  const empty=!L.kpis.length&&!L.panels.length?`<div class="empty big">Your dashboard is empty. Tap the pencil, then Add widget.</div>`:"";
  const panels=F.rows.map(r=>`<div class="drow">${r.map(it=>panelHTML(it,D,F.cols)).join("")}</div>`).join("");
  return `<div class="vw v-home${state.edit?" editing":""}${F.phone?" phone":""}${F.tight?" tight":""}" id="dash">
    <div class="dhead"><div class="dh-l"><h1><span class="gl">${greet}</span><span class="gs">Hi</span>, Raymund</h1><span class="sub">${date}</span></div><div class="acts">${acts}</div></div>
    ${state.edit&&F.tight?`<div class="fitnote">Your screen is full, so the widgets are getting small. Remove one or two for more room.</div>`:""}
    ${L.kpis.length?`<div class="kgrid${F.krows.length>1?" multi":""}">${F.krows.map(r=>`<div class="krow">${r.map(id=>kpiHTML(id,K[id])).join("")}</div>`).join("")}</div>`:""}
    ${L.panels.length?`<div class="pgrid">${panels}</div>`:""}
    ${empty}
  </div>`;
}

/* ---------- editing the dashboard ---------- */
function moveItem(kind,id,dir){
  const arr=state.layout[kind==="kpi"?"kpis":"panels"];const i=arr.indexOf(id),j=i+dir;
  if(i<0||j<0||j>=arr.length)return;[arr[i],arr[j]]=[arr[j],arr[i]];storeLayout(false);render();
}
function moveBefore(kind,id,targetId,after){
  const arr=state.layout[kind==="kpi"?"kpis":"panels"];const i=arr.indexOf(id);if(i<0||id===targetId)return;
  arr.splice(i,1);let j=arr.indexOf(targetId);if(j<0)return;if(after)j++;arr.splice(j,0,id);storeLayout(false);render();
}
function removeItem(kind,id){const k=kind==="kpi"?"kpis":"panels";state.layout[k]=state.layout[k].filter(x=>x!==id);storeLayout(false);render()}
function openAddPanel(){
  const sw=(kind,id,label,desc,on)=>`<label class="addrow"><span class="m"><b>${esc(label)}</b><span>${esc(desc)}</span></span><span class="form-check form-switch"><input class="form-check-input" type="checkbox" role="switch" data-add="${kind}:${id}" ${on?"checked":""} aria-label="Show ${esc(label)}"></span></label>`;
  const cats=["Money","Sales","Operations","Marketing"];
  const L=state.layout;
  $("#modalRoot").innerHTML=`<div class="sheet" id="sheet"><div class="box" role="dialog" aria-modal="true" aria-labelledby="addTitle">
   <div class="hd"><div><h2 id="addTitle">Dashboard widgets</h2><div class="idl">Switch on what you want to see. Everything stays on one screen, so the more you switch on, the smaller each widget gets. New ones are added at the end.</div></div><button class="x" type="button" data-close aria-label="Close">×</button></div>
   <div class="addlist">${cats.map(c=>`<h3>${c} KPIs</h3>${Object.entries(KPI_META).filter(([,m])=>m[0]===c).map(([id,m])=>sw("kpi",id,m[1],m[2],L.kpis.includes(id))).join("")}`).join("")}
   <h3>Panels</h3>${Object.entries(PANEL_META).map(([id,m])=>sw("panel",id,m[0],m[1]+(m[2]?" · wide":""),L.panels.includes(id))).join("")}</div>
   <div class="actions"><div></div><button class="btn btn-sol" type="button" data-close>Done</button></div></div></div>`;
  document.documentElement.classList.add("modal-open");
  const close=()=>{closeModal=null;$("#modalRoot").innerHTML="";document.documentElement.classList.remove("modal-open");render()};closeModal=close;
  $("#sheet").addEventListener("click",e=>{if(e.target.id==="sheet"||e.target.closest("[data-close]"))close()});
  $("#sheet").addEventListener("change",e=>{const a=e.target.dataset.add;if(!a)return;const [kind,id]=a.split(":");const k=kind==="kpi"?"kpis":"panels";
    if(e.target.checked){if(!state.layout[k].includes(id))state.layout[k].push(id)}else state.layout[k]=state.layout[k].filter(x=>x!==id);storeLayout(false)});
}
function setSize(id,d){const c=dashFit(state.layout.kpis,state.layout.panels).cols;const w=Math.max(1,Math.min(c,panelW(id)+d));state.layout.sizes[id]=w;storeLayout(false);render()}
/* drag a widget to move it, or drag a panel's right edge to resize it: works with a finger on iPad and with a mouse */
let drag=null,pend=null,rsz=null;
document.addEventListener("pointerdown",e=>{
  if(!state.edit||e.button>0)return;
  const r=e.target.closest&&e.target.closest("[data-rsz]");
  if(r){e.preventDefault();const el=r.closest("[data-lid]"),row=el.parentElement;const cols=dashFit(state.layout.kpis,state.layout.panels).cols;
    rsz={id:r.dataset.rsz,el,x:e.clientX,w:panelW(r.dataset.rsz),unit:(row.parentElement.getBoundingClientRect().width+12)/cols,cols,nw:panelW(r.dataset.rsz)};el.classList.add("resizing");return}
  const el=e.target.closest&&e.target.closest(".editing [data-lid]");
  if(!el||e.target.closest(".ectl button,input,select,[data-rsz]"))return;
  pend={el,x:e.clientX,y:e.clientY};
});
document.addEventListener("pointermove",e=>{
  if(rsz){e.preventDefault();const nw=Math.max(1,Math.min(rsz.cols,Math.round(rsz.w+(e.clientX-rsz.x)/rsz.unit)));if(nw!==rsz.nw){rsz.nw=nw;rsz.el.style.setProperty("--w",nw);const t=rsz.el.querySelector(".wtag");if(t)t.textContent=nw+"/"+rsz.cols}return}
  if(pend&&!drag&&Math.hypot(e.clientX-pend.x,e.clientY-pend.y)>6){
    const el=pend.el,[kind,id]=el.dataset.lid.split(":"),r=el.getBoundingClientRect(),ghost=el.cloneNode(true);ghost.classList.add("ghost");
    Object.assign(ghost.style,{position:"fixed",left:r.left+"px",top:r.top+"px",width:r.width+"px",height:r.height+"px",margin:0,zIndex:90,pointerEvents:"none"});
    document.body.appendChild(ghost);el.classList.add("dragging");drag={kind,id,el,ghost,dx:pend.x-r.left,dy:pend.y-r.top,target:null,after:false};pend=null;
  }
  if(!drag)return;e.preventDefault();
  drag.ghost.style.left=(e.clientX-drag.dx)+"px";drag.ghost.style.top=(e.clientY-drag.dy)+"px";
  document.querySelectorAll(".droptarget").forEach(x=>x.classList.remove("droptarget","after"));
  const under=document.elementsFromPoint(e.clientX,e.clientY).find(x=>x.dataset&&x.dataset.lid&&x.dataset.lid.startsWith(drag.kind+":")&&x!==drag.el&&!x.classList.contains("ghost"));
  if(under){const r=under.getBoundingClientRect();drag.after=e.clientX>r.left+r.width/2;drag.target=under.dataset.lid.split(":")[1];under.classList.add("droptarget");if(drag.after)under.classList.add("after")}else drag.target=null;
},{passive:false});
const endDrag=()=>{
  pend=null;
  if(rsz){const r=rsz;rsz=null;r.el.classList.remove("resizing");if(r.nw!==r.w){state.layout.sizes[r.id]=r.nw;storeLayout(false)}render();return}
  if(!drag)return;const d=drag;drag=null;d.ghost.remove();d.el.classList.remove("dragging");if(d.target)moveBefore(d.kind,d.id,d.target,d.after);else render()};
document.addEventListener("pointerup",endDrag);document.addEventListener("pointercancel",endDrag);

const PROJECT_STAGES=["Downpayment","Ordering","Scheduled","Installing","Awaiting loan release","Completed"];
const STAGE_COLOR={"Downpayment":"#FF7A59","Ordering":"#B9A6FF","Scheduled":"#6CB4FF","Installing":"#FFB612","Awaiting loan release":"#3DD6C6","Completed":"#4FD18B"};
const shortStage=s=>s==="Awaiting loan release"?"Loan release":s;
const balanceOf=p=>Math.max(0,num(p["Contract Price"])-num(p["Amount Received"]));
const paidPct=p=>{const c=num(p["Contract Price"]);return c?Math.min(100,Math.round(num(p["Amount Received"])/c*100)):0};

function itemHTML(name,r){
  let t="",d="",right="",lead="";
  if(name==="Clients"){
    t=r.Client||"Unnamed";d=[r.Address,r.Phone,r.DU,r.kWh?num(r.kWh)+" kWh/mo":""].filter(Boolean).join(" · ");
    const st=stageOf(r),pj=projectsFor(r),q=quoteSummary(r);
    right=pill(st==="Signed"&&pj.length?"Signed · "+shortStage(pj[pj.length-1].Status||"Open"):st)
      +(q?`<span class="amt">${esc(q.text)}</span><span class="sub">${esc(q.sub)}</span>`:r.Amount?`<span class="amt">${peso(r.Amount)}/mo</span><span class="sub">bill</span>`:"");
  }
  if(name==="Projects")return projItemHTML(r);
  if(name==="Suppliers"){
    const ids=photoIds(r.Photos);
    lead=`<span class="sthumb" ${ids.length?`data-thumb="${esc(ids[ids.length-1])}"`:""}>${FICON.image}</span>`;
    t=[r.Brand&&r.Brand!=="-"?r.Brand:"",String(r["Specs / Description"]).split(",")[0]].filter(Boolean).join(" · ")||"Item";
    d=[r.Supplier,r["Specs / Description"]].filter(Boolean).join(" · ");
    right=`<span class="amt">${peso(r.SRP)}</span><span class="pill">${esc(r.Item)}</span>`;
  }
  const pc=photoIds(r.Photos).length;
  return `<button type="button" class="item" data-edit="${name}" data-row="${r._row}">${lead}<div class="m"><div class="t">${esc(t)}</div><div class="d">${esc(d)}</div></div>${pc?`<span class="pcount" title="${pc} file${pc>1?"s":""}">${CAM}${pc}</span>`:""}<div class="r">${right}</div></button>`;
}
function stepsHTML(status){
  const idx=PROJECT_STAGES.indexOf(status);
  return `<span class="steps" aria-label="Stage: ${esc(status||"not set")}">${PROJECT_STAGES.map((s,i)=>`<i class="${i<idx?"done":i===idx?"cur":""}" style="--c:${STAGE_COLOR[status]||"#5E7590"}" title="${esc(s)}"></i>`).join("")}</span>`;
}
function projItemHTML(p){
  const cl=clientFor(p),pct=paidPct(p),bal=balanceOf(p);
  const d=[cl?townOf(cl):"",p["System (kWp)"]?p["System (kWp)"]+" kWp":"",p.Inverter,p.Payment].filter(Boolean).join(" · ");
  const pc=photoIds(p.Photos).length;
  return `<button type="button" class="item proj" data-edit="Projects" data-row="${p._row}"><div class="m"><div class="t">${esc((cl&&cl.Client)||p.Client||"No client")}</div><div class="d">${esc(d)}</div>${stepsHTML(p.Status)}</div>
    ${pc?`<span class="pcount" title="${pc} file${pc>1?"s":""}">${CAM}${pc}</span>`:""}
    <div class="r">${pill(p.Status)}<span class="amt">${peso(p["Contract Price"])}</span><span class="paybar" title="${pct}% paid"><i style="width:${pct}%" class="${pct>=100?"full":""}"></i></span><span class="sub">${pct>=100?"Fully paid":"Bal "+peso(bal)}</span></div></button>`;
}
function jobCard(p){
  const cl=clientFor(p),pct=paidPct(p);
  return `<button type="button" class="job" data-edit="Projects" data-row="${p._row}" style="--c:${STAGE_COLOR[p.Status]||"#5E7590"}"><span class="t">${esc((cl&&cl.Client)||p.Client||"No client")}</span><span class="d">${esc([p["System (kWp)"]?p["System (kWp)"]+" kWp":"",p.Inverter].filter(Boolean).join(" · ")||"No system details yet")}</span>
    <span class="row2"><b>${shortPeso(num(p["Contract Price"]))}</b><em>${pct>=100?"Paid":pct+"% paid"}</em></span><span class="paybar"><i style="width:${pct}%" class="${pct>=100?"full":""}"></i></span>${p["Start Date"]?`<span class="d">Install ${esc(fmtDate(p["Start Date"]).replace(/, \d{4}$/,""))}</span>`:""}</button>`;
}

function chipsHTML(k,opts,all,groupOf){
  return `<div class="chips hscroll">${["All",...opts].map(o=>`<button type="button" class="chip" data-filter="${k}" data-val="${esc(o)}" aria-pressed="${state.filter[k]===o}">${esc(o)} <span>${o==="All"?all.length:all.filter(r=>groupOf(r)===o).length}</span></button>`).join("")}</div>`;
}
function searchHTML(k,ph){
  return `<div class="search">${UI.search}<input type="search" class="form-control" id="q-${k}" placeholder="${esc(ph)}" value="${esc(state.q[k])}" data-search="${k}" autocomplete="off"></div>`;
}
function listView(name){
  if(name==="Projects")return projectsView();
  if(name==="Clients")return clientsView();
  const t=TABS[name],k=t.key;
  const q=state.q[k].toLowerCase();
  const all=state.data[name];
  const groupOf=r=>r[t.filterField];
  const names=[...new Set(all.map(r=>String(r.Supplier||"").trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
  if(state.supplier&&!names.includes(state.supplier))state.supplier="";
  const bySup=state.supplier?all.filter(r=>String(r.Supplier||"").trim()===state.supplier):all;
  let rows=bySup.filter(r=>(state.filter[k]==="All"||groupOf(r)===state.filter[k])&&(!q||Object.values(r).join(" ").toLowerCase().includes(q)));
  const supSel=`<label class="supsel"><span>Supplier</span><select class="form-select" data-supfilter aria-label="Supplier"><option value="">All suppliers · ${all.length}</option>${names.map(n=>`<option value="${esc(n)}" ${n===state.supplier?"selected":""}>${esc(n)} · ${all.filter(r=>String(r.Supplier||"").trim()===n).length}</option>`).join("")}</select></label>`;
  rows.sort((a,b)=>String(a.Item).localeCompare(String(b.Item))||num(a.SRP)-num(b.SRP));
  return `<div class="vw v-list v-${k}">`+header(name,state.supplier?`${bySup.length} items from ${esc(state.supplier)}`:`${all.length} items from ${names.length} suppliers · Your buying prices`,`${supSel}<button class="btn btn-sol" type="button" data-new="${name}">${UI.plus}<span class="lbl">Add item</span></button>`)+
  `<div class="toolbar">${searchHTML(k,"Search brand, spec or supplier")}</div>
   ${chipsHTML(k,t.filterOpts,bySup,groupOf)}
   <div class="vscroll" data-keep="${k}"><div class="list grid2">${rows.length?rows.map(r=>itemHTML(name,r)).join(""):`<div class="empty">${all.length?"Nothing matches this search or filter.":`No ${name.toLowerCase()} yet. Tap Add to create the first one; it is saved to the ${t.sheet} tab of your sheet.`}</div>`}</div></div></div>`;
}

/* ---------- Clients: list on the left, the chosen client's details on the right ---------- */
const initials=s=>String(s||"?").trim().split(/\s+/).filter(Boolean).slice(0,2).map(w=>w[0]).join("").toUpperCase()||"?";
function clientRow(c,on){
  const st=stageOf(c),q=quoteSummary(c);
  const d=[townOf(c),c.kWh?num(c.kWh)+" kWh":"",c.Phone].filter(Boolean).join(" · ");
  return `<button type="button" class="crow${on?" on":""}" data-pick-client="${c._row}" ${on?'aria-current="true"':""}><span class="avatar sm">${esc(initials(c.Client))}</span><span class="m"><b>${esc(c.Client||"Unnamed")}</b><span>${esc(d||"No details yet")}</span></span><span class="r">${pill(st)}${q?`<em>${esc(q.text)}</em>`:""}</span></button>`;
}
function projectPrefill(c){
  const pks=parsePackages(c.Packages),ch=pks.find(p=>p.name===c["Chosen Package"])||(pks.length===1?pks[0]:null);
  const costs=parsePackages(c["Package Costs"]);const cost=ch&&costs.find(p=>p.name===ch.name);
  const notes=[ch?`Package: ${ch.name}`:"",c.kWh?`Client uses ${num(c.kWh)} kWh/month`+(c.Amount?`, bill ${peso(c.Amount)}`:""):""].filter(Boolean).join(". ");
  return {Client:c.Client,"Client No.":c["S.N."],"Contract Price":ch&&ch.price?ch.price:"","Job Cost":cost&&cost.price?cost.price:"",Notes:notes};
}
function clientDetail(c){
  const st=stageOf(c),pj=projectsFor(c);
  const evAll=allEvents().filter(e=>e.clientRef===c);
  const up=evAll.filter(e=>e.iso>=today()).slice(0,4),past=evAll.filter(e=>e.iso<today()).slice(-3).reverse();
  const tel=String(c.Phone||"").replace(/[^\d+]/g,"");
  const fb=c.Facebook?fbURL(c.Facebook):"",map=mapURL(c["GPS Coodinates"],c.Address);
  const kv=(l,v)=>String(v??"").trim()?`<div><span>${l}</span><b>${esc(v)}</b></div>`:"";
  const pk=parsePackages(c.Packages);
  const ids=photoIds(c.Photos),recent=ids.slice(-7).reverse();
  const qa=(href,icon,label,attr="")=>href?`<a class="qa" href="${esc(href)}" ${attr}>${icon}<span>${label}</span></a>`:`<span class="qa off" aria-disabled="true">${icon}<span>${label}</span></span>`;
  const evRow=e=>`<button type="button" class="ev" data-edit="${e.src}" data-row="${e.row}" style="--c:${typeColor(e.type)}"><span class="dt"><span>${isoDate(e.iso).toLocaleDateString("en-PH",{month:"short"})}</span><b>${isoDate(e.iso).getDate()}</b></span><span class="m"><b>${esc(e.type)}</b><span>${esc([e.start?fmtTime(e.start):"",e.status!=="Scheduled"?e.status:""].filter(Boolean).join(" · ")||"Scheduled")}</span></span></button>`;
  return `<div class="cdh">
    <button type="button" class="iconbtn back" data-act="back" aria-label="Back to the client list">${UI.back}</button>
    <span class="avatar">${esc(initials(c.Client))}</span>
    <div class="cdt"><h2>${esc(c.Client||"Unnamed")}</h2><div class="sub">No. ${esc(c["S.N."])} ${pill(st)}${c.Source?` <span class="src">${esc(c.Source)}</span>`:""}</div></div>
    <div class="acts"><button type="button" class="btn btn-line" data-calc-client="${esc(c["S.N."])}">${ico("calc")}<span class="lbl">Calculator</span></button><button type="button" class="btn btn-sol" data-edit="Clients" data-row="${c._row}">${UI.edit}<span class="lbl">Edit</span></button></div>
  </div>
  <div class="quick">
    ${qa(tel&&"tel:"+tel,UI.phone,"Call")}${qa(tel&&"sms:"+tel,UI.msg,"Text")}${qa(fb,UI.fb,"Facebook",'target="_blank" rel="noopener"')}${qa(map,UI.pin,"Map",'target="_blank" rel="noopener"')}
    <button type="button" class="qa" data-client-go="event" data-row="${c._row}">${UI.cal}<span>Schedule</span></button>
    <button type="button" class="qa hl" data-client-go="project" data-row="${c._row}">${UI.bolt}<span>${pj.length?"New project":"Signed? Project"}</span></button>
  </div>
  <div class="cgrid">
    <section class="cbox"><h3>Contact and site</h3><div class="kv">${kv("Phone",c.Phone)}${kv("Address",c.Address)}${kv("GPS",c["GPS Coodinates"])}${kv("Utility",c.DU)}${kv("Type",c.Type)}${kv("Lead source",c.Source)}</div>${!c.Phone&&!c.Address?'<div class="none">No contact details yet.</div>':""}</section>
    <section class="cbox"><h3>Energy use</h3><div class="big3"><div><span>Monthly kWh</span><b>${c.kWh?num(c.kWh).toLocaleString("en-PH"):"–"}</b></div><div><span>Monthly bill</span><b>${c.Amount?peso(c.Amount):"–"}</b></div><div><span>Rate</span><b>${c["Rate per kWh"]?"₱"+num(c["Rate per kWh"]).toFixed(2):"–"}</b></div></div></section>
    <section class="cbox"><h3>Consultation and quote</h3><div class="kv">${kv("Consulted",c["Consulted (Y/N)"])}${kv("Consultation",fmtDate(c["Consultation Date"]))}${kv("Quotation",c.Quotation)}${kv("Quote date",fmtDate(c["Quote Date"]))}</div>
      ${pk.length?`<div class="pklist">${pk.map(p=>`<div class="${p.name===c["Chosen Package"]?"chosen":""}"><span>${esc(p.name)}</span><b>${p.price?peso(p.price):""}</b></div>`).join("")}</div>`:'<div class="none">No packages quoted yet. Open the Calculator to make them.</div>'}</section>
    <section class="cbox"><h3>Projects</h3>${pj.length?pj.map(p=>`<button type="button" class="lb-item" data-edit="Projects" data-row="${p._row}"><span>${esc(p["System (kWp)"]?p["System (kWp)"]+" kWp":"Project")} · ${esc(peso(p["Contract Price"]))}<span class="paybar wide"><i style="width:${paidPct(p)}%" class="${paidPct(p)>=100?"full":""}"></i></span></span>${pill(p.Status)}</button>`).join(""):`<div class="none">No project yet. When this client signs, tap Signed? Project and their details carry over.</div>`}</section>
    <section class="cbox"><h3>Schedule</h3>${up.length||past.length?`<div class="plist">${up.map(evRow).join("")}${past.length?`<div class="update">Earlier</div>${past.map(evRow).join("")}`:""}</div>`:'<div class="none">Nothing scheduled. Tap Schedule to book a site visit.</div>'}</section>
    <section class="cbox"><h3>Notes</h3>${c.Notes?`<p class="notes">${esc(c.Notes)}</p>`:'<div class="none">No notes.</div>'}</section>
    <section class="cbox full"><h3>Photos and files <span>${ids.length||""}</span></h3>${ids.length?`<div class="cfiles fstrip">${recent.map(id=>fileTile(id,false)).join("")}${ids.length>recent.length?`<button type="button" class="ph more" data-edit="Clients" data-row="${c._row}"><b>+${ids.length-recent.length}</b><span>View all</span></button>`:""}</div>`:'<div class="none">No photos yet. Tap Edit to add site photos, bills or quotations.</div>'}</section>
  </div>`;
}
function clientsView(){
  const all=state.data.Clients,q=state.q.clients.toLowerCase(),f=state.filter.clients;
  const rows=all.filter(r=>(f==="All"||stageOf(r)===f)&&(!q||Object.values(r).join(" ").toLowerCase().includes(q)))
    .sort((a,b)=>num(b["S.N."])-num(a["S.N."])||b._row-a._row);
  const narrow=innerWidth<700;
  let sel=all.find(c=>c._row===state.sel)||null;
  if(!sel&&!narrow&&rows.length)sel=rows[0];
  const showDetail=narrow&&state.detail&&sel;
  return `<div class="vw v-clients${showDetail?" show-detail":""}">
    <section class="card clist">
      <div class="clhead"><div><h1>Clients</h1><div class="sub">${all.length} clients · ${rows.length} shown</div></div><button class="btn btn-sol" type="button" data-new="Clients">${UI.plus}<span class="lbl">Add</span></button></div>
      ${searchHTML("clients","Search name, phone, town")}
      ${chipsHTML("clients",CLIENT_STAGES,all,stageOf)}
      <div class="clrows" data-keep="clist">${rows.length?rows.map(c=>clientRow(c,sel===c)).join(""):`<div class="empty">${all.length?"Nothing matches this search or filter.":"No clients yet. Tap Add to create the first one."}</div>`}</div>
    </section>
    <section class="card cdetail" data-keep="cdetail">${sel?clientDetail(sel):`<div class="empty big">Pick a client on the left to see their details.</div>`}</section>
  </div>`;
}

function projectsView(){
  const all=state.data.Projects,f=state.filter.projects,q=state.q.projects.toLowerCase();
  const active=all.filter(p=>p.Status!=="Completed"),done=all.filter(p=>p.Status==="Completed");
  const contract=all.reduce((s,p)=>s+num(p["Contract Price"]),0),recv=all.reduce((s,p)=>s+num(p["Amount Received"]),0);
  const collect=all.reduce((s,p)=>s+balanceOf(p),0),kwp=done.reduce((s,p)=>s+num(p["System (kWp)"]),0);
  const rate=contract?Math.round(recv/contract*100):null;
  const match=p=>f==="All"||(f==="Active"&&p.Status!=="Completed")||(f==="Balance"&&balanceOf(p)>0)||p.Status===f;
  const rows=all.filter(p=>match(p)&&(!q||Object.values(p).join(" ").toLowerCase().includes(q)));
  const stat=(l,v,s,flt,cls="")=>`<button type="button" class="pstat ${f===flt&&flt!=="All"?"on":""}" data-filter="projects" data-val="${flt}"><span class="l">${l}</span><b class="${cls}">${v}</b><span class="s">${s}</span></button>`;
  const board=state.pview==="board";
  const pipe=`<div class="pipeline hscroll" role="group" aria-label="Installation pipeline">${PROJECT_STAGES.map(s=>{const n=all.filter(p=>p.Status===s).length;return `<button type="button" class="pstep ${f===s?"on":""}" data-filter="projects" data-val="${esc(s)}" style="--c:${STAGE_COLOR[s]}"><i></i><span>${esc(shortStage(s))}</span><b>${n}</b></button>`}).join("")}</div>`;
  const body=board
    ?`<div class="board">${PROJECT_STAGES.filter(s=>f==="All"||f==="Active"||f==="Balance"||f===s).map(s=>{const list=rows.filter(p=>p.Status===s);return `<section class="bcol" style="--c:${STAGE_COLOR[s]}"><div class="bh"><i></i><b>${esc(shortStage(s))}</b><span>${list.length}</span></div>${list.map(jobCard).join("")||'<div class="bempty">None</div>'}</section>`}).join("")}</div>`
    :`<div class="list">${rows.length?rows.map(projItemHTML).join(""):`<div class="empty">${all.length?"No projects match this filter.":"No projects yet. Open a client and tap Signed? Project when they sign."}</div>`}</div>`;
  return `<div class="vw v-projects">`+header("Projects",`${all.length} project${all.length===1?"":"s"} · From downpayment to switch-on`,
    `<div class="seg" role="group" aria-label="View"><button type="button" class="btn${!board?" on":""}" data-pview="list" aria-pressed="${!board}">List</button><button type="button" class="btn${board?" on":""}" data-pview="board" aria-pressed="${board}">Board</button></div><button class="btn btn-sol" type="button" data-new="Projects">${UI.plus}<span class="lbl">Add project</span></button>`)+
  `<div class="pstats hscroll">
     ${stat("Active jobs",active.length,shortPeso(active.reduce((s,p)=>s+num(p["Contract Price"]),0))+" contract value","Active")}
     ${stat("Received",shortPeso(recv),"Payments logged","All","g")}
     ${stat("To collect",shortPeso(collect),all.filter(p=>balanceOf(p)>0).length+" with balance","Balance","y")}
     ${stat("kWp installed",(Math.round(kwp*10)/10).toLocaleString("en-PH"),done.length+" completed","Completed")}
     ${stat("Collection rate",rate==null?"–":rate+"%","Received vs contract","Balance",rate!=null&&rate>=80?"g":"")}
   </div>
   ${pipe}
   <div class="toolbar">${searchHTML("projects","Search projects")}
     <div class="chips inline">${[["All","All"],["Active","Active"],["Balance","Balance due"]].map(([v,l])=>`<button type="button" class="chip" data-filter="projects" data-val="${v}" aria-pressed="${f===v}">${l}</button>`).join("")}</div></div>
   <div class="vscroll" data-keep="plist">${body}</div></div>`;
}

function hydrateThumbs(){
  const els=[...document.querySelectorAll("[data-thumb]:not([data-h])")];if(!els.length)return;
  const load=el=>{el.dataset.h="1";thumbInfo(el.dataset.thumb).then(i=>{if(i.url)el.innerHTML=`<img src="${i.url}" alt="">`;else el.innerHTML=FICON[kindOf(i.mime)]}).catch(()=>{})};
  if(!("IntersectionObserver" in window)){els.forEach(load);return}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){io.unobserve(e.target);load(e.target)}}),{rootMargin:"200px"});
  els.forEach(el=>io.observe(el));
}

/* ---------- files: photos, videos, PDF and Excel, saved to Google Drive by the Apps Script ---------- */
const photoCache={},thumbCache={};
const photoIds=v=>String(v||"").split(/[\s,;]+/).filter(x=>/^[A-Za-z0-9_-]{10,}$/.test(x));
const CAM='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>';
const FICON={
  pdf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2.5h8l4 4V21a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 21z"/><path d="M14 2.5V7h4"/><path d="M8.5 16.5h7M8.5 13h7"/></svg>',
  sheet:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 9h16M4 15h16M10 3v18"/></svg>',
  video:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/></svg>',
  image:CAM,
  file:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2.5h8l4 4V21a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 21z"/><path d="M14 2.5V7h4"/></svg>'
};
const PLAY='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>';
const kindOf=mime=>/^image\//.test(mime||"")?"image":/^video\//.test(mime||"")?"video":/pdf/.test(mime||"")?"pdf":/sheet|excel|csv/.test(mime||"")?"sheet":"file";
const driveURL=id=>`https://drive.google.com/file/d/${encodeURIComponent(id)}/view`;
const b64ToURL=(data,mime)=>{const bin=atob(data);const arr=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)arr[i]=bin.charCodeAt(i);return URL.createObjectURL(new Blob([arr],{type:mime||"image/jpeg"}))};
function photoURL(id){
  if(photoCache[id])return photoCache[id];
  const p=api({action:"photo",id}).then(j=>b64ToURL(j.data,j.mime));
  photoCache[id]=p;p.catch(()=>{delete photoCache[id]});return p;
}
/* Small previews: asked for in batches, kept in memory and saved on this device, so lists and forms open fast.
   The full-size file is only downloaded when it is opened. */
const TKEY="sr.thumb.";
const thumbPending=new Map();let thumbTimer=null;
const thumbLocal=id=>{try{const v=localStorage.getItem(TKEY+id);return v?JSON.parse(v):null}catch(e){return null}};
function thumbSave(id,info){
  if(!info||!info.url||!info.url.startsWith("data:")||info.url.length>120000)return;
  try{localStorage.setItem(TKEY+id,JSON.stringify(info))}catch(e){
    try{Object.keys(localStorage).filter(k=>k.startsWith(TKEY)).slice(0,40).forEach(k=>localStorage.removeItem(k));localStorage.setItem(TKEY+id,JSON.stringify(info))}catch(e2){}
  }
}
function seedThumb(id,info){thumbCache[id]=Promise.resolve(info);thumbSave(id,info)}
function flushThumbs(){
  thumbTimer=null;
  const batch=[...thumbPending.entries()].slice(0,12);batch.forEach(([id])=>thumbPending.delete(id));
  if(thumbPending.size)thumbTimer=setTimeout(flushThumbs,0);
  if(!batch.length)return;
  api({action:"thumbs",ids:batch.map(b=>b[0])}).then(j=>{
    const byId={};(j.items||[]).forEach(it=>{if(it&&it.id)byId[it.id]=it});
    batch.forEach(([id,cb])=>{const it=byId[id];
      if(!it||it.ok===false){cb.rej({code:"thumb_failed"});return}
      const info={mime:it.mime,name:it.name,size:it.size,url:it.data?`data:${it.thumbMime||"image/jpeg"};base64,${it.data}`:null};
      thumbSave(id,info);cb.res(info)});
  }).catch(e=>batch.forEach(([,cb])=>cb.rej(e)));
}
function thumbInfo(id){
  if(thumbCache[id])return thumbCache[id];
  const saved=thumbLocal(id);
  if(saved){thumbCache[id]=Promise.resolve(saved);return thumbCache[id]}
  const p=new Promise((res,rej)=>{thumbPending.set(id,{res,rej});if(!thumbTimer)thumbTimer=setTimeout(flushThumbs,30)});
  thumbCache[id]=p;p.catch(()=>{delete thumbCache[id]});return p;
}
/* Makes a small preview on the device from a photo the user just picked. */
function previewFromImage(img){
  const s=Math.min(1,320/Math.max(img.naturalWidth,img.naturalHeight));
  const c=document.createElement("canvas");c.width=Math.max(1,Math.round(img.naturalWidth*s));c.height=Math.max(1,Math.round(img.naturalHeight*s));
  const x=c.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,c.width,c.height);x.drawImage(img,0,0,c.width,c.height);
  return c.toDataURL("image/jpeg",0.7);
}
const EXT_MIME={heic:"image/heic",heif:"image/heif",jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",webp:"image/webp",gif:"image/gif",mov:"video/quicktime",mp4:"video/mp4",m4v:"video/mp4",webm:"video/webm",pdf:"application/pdf",xls:"application/vnd.ms-excel",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",csv:"text/csv",doc:"application/msword",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document"};
const guessMime=f=>f.type||EXT_MIME[String(f.name||"").split(".").pop().toLowerCase()]||"application/octet-stream";
const readB64=f=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>{const s=String(r.result);res(s.slice(s.indexOf(",")+1))};r.onerror=()=>rej({code:"bad_file",message:"That file couldn't be read."});r.readAsDataURL(f)});
const FILE_ACCEPT="image/*,video/*,.heic,.heif,.pdf,.xls,.xlsx,.csv,.doc,.docx,application/pdf";
async function shrinkPhoto(file){
  const url=URL.createObjectURL(file);
  try{
    const img=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=()=>rej({code:"bad_image"});i.src=url});
    const max=1600,s=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight));
    const w=Math.max(1,Math.round(img.naturalWidth*s)),h=Math.max(1,Math.round(img.naturalHeight*s));
    const c=document.createElement("canvas");c.width=w;c.height=h;
    const ctx=c.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,w,h);ctx.drawImage(img,0,0,w,h);
    const d=c.toDataURL("image/jpeg",0.8);
    return {data:d.slice(d.indexOf(",")+1),mime:"image/jpeg",name:String(file.name||"photo").replace(/\.[^.]+$/,"").slice(0,60)+".jpg",preview:previewFromImage(img)};
  }finally{URL.revokeObjectURL(url)}
}
async function prepareUpload(f){
  const mime=guessMime(f);
  if(/^image\//.test(mime)&&!/gif|svg/.test(mime)){try{return await shrinkPhoto(f)}catch(e){/* not decodable here (for example HEIC on Chrome): upload the original */}}
  if(f.size>25*1024*1024)throw {code:"too_big",message:`${f.name} is larger than 25 MB.`};
  return {data:await readB64(f),mime,name:String(f.name||"file").slice(0,80)};
}
function fileTile(id,removable){
  return `<div class="ph"><button type="button" class="ph-img" data-open-file="${esc(id)}" aria-label="Open file"><span class="ph-load"></span></button>${removable?`<button type="button" class="ph-x" data-rm="${esc(id)}" aria-label="Remove file">×</button>`:""}</div>`;
}
function hydrateTiles(root){
  root.querySelectorAll("[data-open-file]:not([data-h])").forEach(b=>{
    b.dataset.h="1";const id=b.dataset.openFile;
    thumbInfo(id).then(info=>{
      const k=kindOf(info.mime);b.dataset.kind=k;b.title=info.name||"";b.setAttribute("aria-label",(k==="image"?"View ":"Open ")+(info.name||"file"));
      b.innerHTML=(info.url?`<img src="${info.url}" alt="">`:`<span class="ficon">${FICON[k]}</span><span class="fname">${esc(info.name||"")}</span>`)
        +(k==="video"?`<span class="fbadge play">${PLAY}</span>`:k!=="image"?`<span class="fbadge">${k==="pdf"?"PDF":k==="sheet"?"Excel":"File"}</span>`:"");
    }).catch(e=>{b.dataset.kind="file";b.title="Open in Google Drive";b.setAttribute("aria-label","Open file in Google Drive");b.innerHTML=`<span class="ficon">${FICON.file}</span><span class="fname">Open in Drive</span>`});
  });
}
function openFile(id,kind){
  if(kind&&kind!=="image"){window.open(driveURL(id),"_blank","noopener");return}
  openViewer(id);
}
function openViewer(id){
  const v=document.createElement("div");v.className="viewer";v.setAttribute("role","dialog");v.setAttribute("aria-label","Photo");
  v.innerHTML=`<div class="vimg"><div class="empty">Loading photo…</div></div><div class="hrow"><a class="btn btn-line" href="${driveURL(id)}" target="_blank" rel="noopener">Open in Google Drive</a><button class="btn btn-sol" type="button" data-vclose>Close</button></div>`;
  document.body.appendChild(v);
  v.addEventListener("click",e=>{if(e.target===v||e.target.closest("[data-vclose]"))v.remove()});
  const box=v.querySelector(".vimg");
  thumbInfo(id).then(i=>{if(i.url&&!box.querySelector("img.full"))box.innerHTML=`<img class="lowres" src="${i.url}" alt="Photo preview"><span class="vload">Loading full size…</span>`}).catch(()=>{});
  photoURL(id).then(u=>{box.innerHTML=`<img class="full" src="${u}" alt="Photo">`;
    box.querySelector("img").onerror=()=>thumbInfo(id).then(i=>{box.innerHTML=i.url?`<img src="${i.url}" alt="Photo">`:`<div class="empty">This photo type can't be shown here. Open it in Google Drive.</div>`});
  }).catch(e=>{box.innerHTML=`<div class="empty">This file couldn't be loaded here (${esc(errMsg(e))}). Tap Open in Google Drive to see it.</div>`});
}
let closeModal=null;

/* ---------- quotation packages ---------- */
const MAX_PACKAGES=6;
function parsePackages(text){
  return String(text||"").split(/\n|\s\|\s/).map(s=>s.trim()).filter(Boolean).map(line=>{
    const m=line.match(/^(.*?)\s*(?:—|–|-|:|=)\s*₱?\s*([\d,]+(?:\.\d+)?)\s*$/);
    return m?{name:m[1].trim(),price:num(m[2])}:{name:line,price:0};
  });
}
const serializePackages=pk=>pk.filter(p=>p.name||p.price).map((p,i)=>`${p.name||"Package "+(i+1)} — ${p.price?"₱"+Math.round(p.price).toLocaleString("en-PH"):"₱0"}`).join("\n");
function quoteSummary(c){
  const pk=parsePackages(c.Packages).filter(p=>p.price>0);
  const chosen=c["Chosen Package"]&&pk.find(p=>p.name===c["Chosen Package"]);
  if(chosen)return {text:shortPeso(chosen.price),sub:"chosen"};
  if(!pk.length)return num(c["Quoted Price"])?{text:shortPeso(num(c["Quoted Price"])),sub:"quoted"}:null;
  const lo=Math.min(...pk.map(p=>p.price)),hi=Math.max(...pk.map(p=>p.price));
  return {text:lo===hi?shortPeso(lo):`${shortPeso(lo)}–${shortPeso(hi)}`,sub:`${pk.length} package${pk.length>1?"s":""}`};
}

/* ---------- client stage, worked out from what is already recorded ---------- */
const CLIENT_STAGES=["Lead","Consulted","Quoted","Accepted","Signed","Lost"];
function stageOf(c){
  if(projectsFor(c).length)return "Signed";
  const q=c.Quotation;
  if(q==="Declined")return "Lost";
  if(q==="Accepted"||c["Chosen Package"])return "Accepted";
  if(q==="Sent"||q==="Revised"||(parsePackages(c.Packages).length&&q!=="Not sent"))return "Quoted";
  if(c["Consulted (Y/N)"]==="Yes")return "Consulted";
  return "Lead";
}

/* ---------- links on form fields ---------- */
const ICON_LINK={
  fb:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21z"/></svg>',
  map:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/></svg>'
};
function fbURL(v){v=String(v||"").trim();if(!v)return "";if(/^https?:\/\//i.test(v))return v;if(/(^|\.)facebook\.com|fb\.com|fb\.me/i.test(v))return "https://"+v.replace(/^\/+/,"");return "https://www.facebook.com/"+encodeURIComponent(v.replace(/^@/,""))}
function mapURL(v,fallback){const q=String(v||"").trim()||String(fallback||"").trim();return q?`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`:""}

/* ---------- payments log on projects ---------- */
function paymentLines(p){
  return String(p.Payments||"").split(/\n/).map(l=>{const m=l.match(/(\d{1,2}-[A-Za-z]{3}-\d{4}|\d{4}-\d{2}-\d{2})\s*[—–-]?\s*₱?\s*([\d,]+(?:\.\d+)?)/);return m?{iso:toISO(m[1]),amt:num(m[2]),line:l.trim()}:null}).filter(Boolean);
}

/* ---------- modal form ---------- */
function openForm(name,rec,prefill){
  const t=TABS[name];const isNew=!rec;const r=rec?{...rec}:{...prefill};
  if(isNew){
    if(t.idMode==="serial")r[t.idField]=Math.max(0,...state.data[name].map(x=>num(x[t.idField])))+1;
    if(t.idMode==="prefix")r[t.idField]=t.prefix+"-"+Date.now().toString(36).toUpperCase();
    if(name==="Clients"){r["Consulted (Y/N)"]=r["Consulted (Y/N)"]||"No";r.Quotation=r.Quotation||"Not sent"}
    if(name==="Projects"){r.Status=r.Status||"Downpayment";r["Contract Date"]=r["Contract Date"]||today()}
    if(name==="Calendar"){r.Status=r.Status||"Scheduled";r.Date=r.Date||state.cal.sel||today();r.Type=r.Type||"Site visit / Consultation";r.Created=sheetDate(today())}
  }
  const ph={ids:photoIds(r.Photos),added:[],removed:[],busy:0};
  const pk=parsePackages(r.Packages);let chosen=pk.findIndex(p=>p.name&&p.name===r["Chosen Package"]);
  const newPays=[];
  const fieldHTML=([key,label,type,opts])=>{
    const id="fld-"+key.replace(/[^A-Za-z0-9]/g,"_");const raw=r[key]??"";
    if(type==="hidden")return "";
    if(type==="photos")return `<div class="f full"><label>Photos &amp; files <span class="hint">Optional · photos, videos, PDF, Excel · saved to Google Drive</span></label><div class="fstrip" id="fileStrip"></div><input type="file" id="fileInput" accept="${FILE_ACCEPT}" multiple hidden></div>`;
    if(type==="textarea")return `<div class="f full"><label for="${id}">${label}</label><textarea class="form-control" id="${id}" data-k="${esc(key)}">${esc(raw)}</textarea></div>`;
    if(type==="select"){const list=raw&&!opts.includes(raw)?[...opts,raw]:opts;return `<div class="f"><label for="${id}">${label}</label><select class="form-select" id="${id}" data-k="${esc(key)}"><option value=""></option>${list.map(o=>`<option ${raw===o?"selected":""}>${esc(o)}</option>`).join("")}</select></div>`}
    if(type==="date")return `<div class="f"><label for="${id}">${label}</label><input class="form-control" id="${id}" data-k="${esc(key)}" type="date" value="${esc(toISO(raw))}"></div>`;
    if(type==="time")return `<div class="f"><label for="${id}">${label}</label><input class="form-control" id="${id}" data-k="${esc(key)}" type="time" step="300" value="${esc(parseTime(raw))}"></div>`;
    if(type==="link"){
      const kind=opts;const href=kind==="fb"?fbURL(raw):mapURL(raw,r.Address);
      return `<div class="f ${kind==="fb"?"full":""}"><label for="${id}">${label}</label><div class="linkin"><input class="form-control" id="${id}" data-k="${esc(key)}" type="text" ${kind==="fb"?'inputmode="url" autocapitalize="off" spellcheck="false"':'inputmode="decimal"'} value="${esc(raw)}" placeholder="${kind==="fb"?"facebook.com/username":"7.8255, 126.0485"}"><a class="lbtn ${kind}" data-link="${kind}" data-for="${id}" href="${esc(href||"#")}" target="_blank" rel="noopener" aria-label="${kind==="fb"?"Open Facebook profile":"Open in Google Maps"}" ${href?"":'aria-disabled="true"'}>${ICON_LINK[kind]}</a></div></div>`;
    }
    if(type==="quoted")return `<div class="f"><label for="${id}">Quoted price <span class="hint">From packages</span></label><input class="form-control ro" id="${id}" type="text" readonly tabindex="-1" value=""></div>`;
    if(type==="packages")return `<div class="f full"><label>Packages quoted <span class="hint">Up to ${MAX_PACKAGES} · tap the circle on the package the client chose</span></label><div class="pkgs" id="pkgs"></div></div>`;
    if(type==="paid"){
      const v=raw!==""?num(raw):"";
      return `<div class="f full"><label for="${id}">${label}</label><div class="payrow"><input class="form-control" id="${id}" data-k="${esc(key)}" type="text" inputmode="decimal" value="${esc(v)}"><div class="payadd"><input id="payAmt" type="text" inputmode="decimal" placeholder="Add payment ₱" aria-label="Payment amount"><input id="payDate" type="date" value="${today()}" aria-label="Payment date"><button type="button" class="btn btn-sol btn-sm" id="payBtn">Add</button></div></div><div class="paylog" id="payLog"></div></div>`;
    }
    if(type==="clientpick"){
      const cur=clientFor(r);const list=[...state.data.Clients].sort((a,b)=>String(a.Client).localeCompare(String(b.Client)));
      const opt=c=>`<option value="${esc(c["S.N."])}" data-name="${esc(c.Client)}" ${c===cur?"selected":""}>${esc(c.Client)}${c["S.N."]?" · No. "+esc(c["S.N."]):""}</option>`;
      const orphan=!cur&&r.Client?`<option value="" data-name="${esc(r.Client)}" selected>${esc(r.Client)} (not in client list)</option>`:"";
      return `<div class="f full"><label for="${id}">${label}${name==="Projects"?"":' <span class="hint">Optional</span>'}</label><select class="form-select" id="${id}" data-k="Client No." data-name-target="Client"><option value="" data-name="">${name==="Projects"?"Choose a client…":"No client"}</option>${orphan}${list.map(opt).join("")}</select><div class="clientcard" id="clientCard"></div></div>`;
    }
    if(type==="projpick"){
      const list=state.data.Projects.filter(p=>p.ID);
      return `<div class="f"><label for="${id}">${label} <span class="hint">Optional</span></label><select class="form-select" id="${id}" data-k="Project"><option value="">None</option>${list.map(p=>`<option value="${esc(p.ID)}" ${String(raw)===String(p.ID)?"selected":""}>${esc(p.Client||p.ID)} · ${esc(p["System (kWp)"]?p["System (kWp)"]+" kWp":p.ID)}</option>`).join("")}</select></div>`;
    }
    const v=type==="number"&&raw!==""?num(raw):raw;
    const full=["Client","Address","Specs / Description"].includes(key)?"full":"";
    return `<div class="f ${full}"><label for="${id}">${label}</label><input class="form-control" id="${id}" data-k="${esc(key)}" type="text" ${type==="number"?'inputmode="decimal"':""} value="${esc(v)}"></div>`;
  };
  const idLine=!isNew&&t.idField&&name!=="Calendar"?`<span class="sub">${t.idField==="S.N."?"No. ":""}${esc(r[t.idField])}${name==="Clients"?" · "+stageOf(rec):""}</span>`:"";
  let linkBox="";
  if(name==="Clients"&&!isNew){
    const pj=projectsFor(rec);const evs=allEvents().filter(e=>e.clientRef===rec&&e.iso>=today()&&e.status==="Scheduled").slice(0,3);
    linkBox=`<div class="linkbox"><div class="lb-h"><b>Projects</b><div class="hrow"><button type="button" class="btn btn-line btn-sm" data-go="event">+ Schedule</button><button type="button" class="btn btn-sol btn-sm" data-go="project">${pj.length?"+ Another project":"Signed? Create project"}</button></div></div>
      ${pj.length?pj.map(p=>`<button type="button" class="lb-item" data-go-project="${p._row}"><span>${esc(p["System (kWp)"]?p["System (kWp)"]+" kWp":"Project")} · ${esc(peso(p["Contract Price"]))}</span>${pill(p.Status)}</button>`).join(""):`<div class="lb-empty">No project yet. When this client signs the contract, create the project here and their details carry over.</div>`}
      ${evs.length?`<div class="lb-ev">${evs.map(e=>`<span><i style="background:${typeColor(e.type)}"></i>${esc(fmtDate(e.iso).replace(/, \d{4}$/,""))}${e.start?" "+esc(fmtTime(e.start)):""} · ${esc(e.type)}</span>`).join("")}</div>`:""}</div>`;
  }
  $("#modalRoot").innerHTML=`<div class="sheet" id="sheet"><div class="box" role="dialog" aria-modal="true" aria-labelledby="mTitle">
    <div class="hd"><div><h2 id="mTitle">${isNew?"New "+t.title.toLowerCase():"Edit "+t.title.toLowerCase()}</h2>${idLine}</div><button class="x" type="button" data-close aria-label="Close">×</button></div>
    ${linkBox}<form class="form" id="recForm">${t.fields.map(fieldHTML).join("")}</form>
    <div class="actions"><div id="delWrap">${isNew?"":'<button class="btn btn-danger-line" type="button" id="delBtn">Delete</button>'}</div>
    <div class="hrow"><button class="btn btn-line" type="button" data-close>Cancel</button><button class="btn btn-sol" type="button" id="saveBtn">${isNew?"Add":"Save"}</button></div></div>
  </div></div>`;
  document.documentElement.classList.add("modal-open");
  const form=$("#recForm");

  /* client picker */
  const pickName=()=>{const el=form.querySelector("[data-name-target]");return el&&el.selectedOptions[0]?el.selectedOptions[0].dataset.name||"":""};
  const label=()=>{const el=form.querySelector('[data-k="Client"]');return pickName()||(el&&el.value)||[r.Brand,r["Specs / Description"]].filter(Boolean).join(" ").slice(0,50)||""};
  const pick=form.querySelector("[data-name-target]");
  const showCard=()=>{const card=$("#clientCard");if(!card||!pick)return;const c=clientByNo(pick.value);
    if(!c){card.innerHTML="";return}
    card.innerHTML=`<span>${esc([c.Address,c.Phone,c.DU,c.kWh?num(c.kWh)+" kWh/mo":"",c.Amount?peso(c.Amount)+"/mo bill":""].filter(Boolean).join(" · ")||"No details saved for this client yet")}</span>`;
    const loc=form.querySelector('[data-k="Location"]');if(loc&&!loc.value&&c.Address)loc.value=c.Address;};
  if(pick){pick.addEventListener("change",showCard);showCard()}
  const proj=form.querySelector('[data-k="Project"]');
  if(proj&&pick)proj.addEventListener("change",()=>{const p=projectById(proj.value);const c=p&&clientFor(p);if(c&&!pick.value){pick.value=c["S.N."];showCard()}});

  /* rate per kWh = monthly bill ÷ monthly kWh, worked out as you type (2 decimals) */
  {const kw=form.querySelector('[data-k="kWh"]'),bl=form.querySelector('[data-k="Amount"]'),rt=form.querySelector('[data-k="Rate per kWh"]');
   if(kw&&bl&&rt){const upd=()=>{const k=num(kw.value),b=num(bl.value);if(k>0&&b>0)rt.value=(Math.round(b/k*100)/100).toFixed(2)};kw.addEventListener("input",upd);bl.addEventListener("input",upd);if(!String(rt.value).trim())upd();rt.placeholder="Bill ÷ kWh"}}
  /* Facebook and map buttons follow what is typed */
  form.querySelectorAll("[data-link]").forEach(a=>{
    const inp=document.getElementById(a.dataset.for);
    const upd=()=>{const href=a.dataset.link==="fb"?fbURL(inp.value):mapURL(inp.value,(form.querySelector('[data-k="Address"]')||{}).value);
      if(href){a.href=href;a.removeAttribute("aria-disabled")}else{a.href="#";a.setAttribute("aria-disabled","true")}};
    inp.addEventListener("input",upd);
    a.addEventListener("click",e=>{if(a.getAttribute("aria-disabled")==="true"){e.preventDefault();toast(a.dataset.link==="fb"?"Add the Facebook link first":"Add GPS coordinates or an address first")}});
  });

  /* quotation packages */
  const pkBox=$("#pkgs"),qInput=form.querySelector("input.ro");
  const quoted=()=>{const prices=pk.filter(p=>p.price>0).map(p=>p.price);if(chosen>=0&&pk[chosen]&&pk[chosen].price)return pk[chosen].price;return prices.length?Math.min(...prices):0};
  const updQuoted=()=>{if(!qInput)return;const prices=pk.filter(p=>p.price>0).map(p=>p.price);
    qInput.value=chosen>=0&&pk[chosen]&&pk[chosen].price?peso(pk[chosen].price)+" (chosen)":prices.length?(prices.length>1?peso(Math.min(...prices))+" – "+peso(Math.max(...prices)):peso(prices[0])):"–"};
  const renderPk=()=>{
    if(!pkBox)return;
    pkBox.innerHTML=pk.map((p,i)=>`<div class="pkg"><button type="button" class="pk-pick" data-pk-pick="${i}" aria-pressed="${i===chosen}" aria-label="Client chose package ${i+1}"></button>
      <input type="text" class="pk-name" data-pk-name="${i}" value="${esc(p.name)}" placeholder="Package ${i+1}, e.g. 8kW Sungrow + 16kWh" aria-label="Package ${i+1} description">
      <div class="pk-price"><span>₱</span><input type="text" inputmode="decimal" data-pk-price="${i}" value="${p.price?Math.round(p.price):""}" placeholder="Price" aria-label="Package ${i+1} price"></div>
      <button type="button" class="pk-x" data-pk-rm="${i}" aria-label="Remove package ${i+1}">×</button></div>`).join("")
      +(pk.length<MAX_PACKAGES?`<button type="button" class="pk-add" data-pk-add>+ Add package <span>${pk.length}/${MAX_PACKAGES}</span></button>`:"");
    updQuoted();
  };
  if(pkBox){
    renderPk();
    pkBox.addEventListener("input",e=>{const n=e.target.dataset.pkName,p=e.target.dataset.pkPrice;if(n!=null)pk[n].name=e.target.value;if(p!=null)pk[p].price=num(e.target.value);updQuoted()});
    pkBox.addEventListener("click",e=>{
      const a=e.target.closest("[data-pk-add]");if(a){pk.push({name:"",price:0});renderPk();const ins=pkBox.querySelectorAll(".pk-name");ins[ins.length-1].focus();return}
      const rm=e.target.closest("[data-pk-rm]");if(rm){const i=+rm.dataset.pkRm;pk.splice(i,1);if(chosen===i)chosen=-1;else if(chosen>i)chosen--;renderPk();return}
      const pc=e.target.closest("[data-pk-pick]");if(pc){const i=+pc.dataset.pkPick;chosen=chosen===i?-1:i;renderPk();
        const q=form.querySelector('[data-k="Quotation"]');if(q&&chosen>=0&&q.value!=="Accepted")q.value="Accepted"}
    });
  }

  /* payments */
  const payBtn=$("#payBtn");
  const renderPays=()=>{const log=$("#payLog");if(!log)return;const lines=[...paymentLines(r),...newPays.map(x=>({line:x,fresh:true}))];
    log.innerHTML=lines.length?lines.slice(-6).map(l=>`<span class="${l.fresh?"fresh":""}">${esc(l.line)}</span>`).join(""):`<span class="none">No payments logged yet. Add each payment here and the dashboard tracks collections by date.</span>`};
  if(payBtn){
    renderPays();
    payBtn.addEventListener("click",()=>{
      const amtEl=$("#payAmt"),amt=num(amtEl.value),d=$("#payDate").value||today();
      if(!(amt>0)){toast("Enter the payment amount");amtEl.focus();return}
      const rec=form.querySelector('[data-k="Amount Received"]');rec.value=String(Math.round((num(rec.value)+amt)*100)/100);
      newPays.push(`${sheetDate(d)} — ₱${Math.round(amt).toLocaleString("en-PH")}`);amtEl.value="";renderPays();
    });
  }

  /* links from a client to a project or event */
  const go=(fn)=>{if(ph.added.length||ph.busy){toast("Save this client first, then continue");return}close(false);fn()};
  document.querySelectorAll("[data-go],[data-go-project]").forEach(b=>b.addEventListener("click",()=>{
    if(b.dataset.goProject){const p=state.data.Projects.find(x=>x._row==b.dataset.goProject);go(()=>openForm("Projects",p));return}
    const base={Client:rec.Client,"Client No.":rec["S.N."]};
    if(b.dataset.go==="project"){
      const pks=parsePackages(rec.Packages),ch=pks.find(p=>p.name===rec["Chosen Package"])||(pks.length===1?pks[0]:null);
      const notes=[ch?`Package: ${ch.name}`:"",rec.kWh?`Client uses ${num(rec.kWh)} kWh/month`+(rec.Amount?`, bill ${peso(rec.Amount)}`:""):""].filter(Boolean).join(". ");
      go(()=>openForm("Projects",null,projectPrefill(rec)));
    }else go(()=>openForm("Calendar",null,{...base,Location:rec.Address||"",Date:today()}));
  }));

  /* photos and files */
  const strip=$("#fileStrip"),input=$("#fileInput");let allBox=null;
  const removeFile=id=>{ph.ids=ph.ids.filter(x=>x!==id);
    if(ph.added.includes(id)){ph.added=ph.added.filter(x=>x!==id);api({action:"trash",id}).catch(()=>{})}else ph.removed.push(id);renderFiles()};
  const renderFiles=()=>{
    if(!strip)return;
    const recent=ph.ids.slice(-5).reverse(),extra=ph.ids.length-recent.length;
    strip.innerHTML=`<button type="button" class="ph add" data-add-file>${CAM}<span>Add files</span></button>`
      +Array.from({length:ph.busy},()=>`<div class="ph busy"><span class="spin" aria-label="Uploading"></span></div>`).join("")
      +recent.map(id=>fileTile(id,true)).join("")
      +(extra>0?`<button type="button" class="ph more" data-all-files><b>+${extra}</b><span>View all ${ph.ids.length}</span></button>`:"");
    hydrateTiles(strip);
    if(allBox){const g=allBox.querySelector(".allgrid");g.innerHTML=[...ph.ids].reverse().map(id=>fileTile(id,true)).join("")||'<div class="empty">No files.</div>';hydrateTiles(g)}
  };
  const fileClick=e=>{
    if(e.target.closest("[data-add-file]")){input.click();return}
    if(e.target.closest("[data-all-files]")){showAll();return}
    const rm=e.target.closest("[data-rm]");if(rm){removeFile(rm.dataset.rm);return}
    const of=e.target.closest("[data-open-file]");if(of)openFile(of.dataset.openFile,of.dataset.kind);
  };
  const showAll=()=>{
    allBox=document.createElement("div");allBox.className="viewer files";allBox.setAttribute("role","dialog");allBox.setAttribute("aria-label","All files");
    allBox.innerHTML=`<div class="allwrap"><div class="hd"><h2>All files</h2><button type="button" class="btn btn-sol" data-vclose>Done</button></div><div class="allgrid"></div></div>`;
    document.body.appendChild(allBox);
    allBox.addEventListener("click",e=>{if(e.target===allBox||e.target.closest("[data-vclose]")){allBox.remove();allBox=null;return}fileClick(e)});
    renderFiles();
  };
  if(strip){
    renderFiles();
    strip.addEventListener("click",fileClick);
    input.addEventListener("change",async()=>{
      const files=[...input.files];input.value="";
      ph.busy+=files.length;renderFiles();
      const one=async f=>{
        try{const s=await prepareUpload(f);const {preview,...body}=s;
          const j=await api({action:"upload",sheet:t.sheet,label:label(),...body});
          seedThumb(j.id,{mime:s.mime,name:s.name,size:f.size,url:preview||null});
          ph.ids.push(j.id);ph.added.push(j.id)}
        catch(e){toast(e&&(e.code==="too_big"||e.code==="bad_file")?e.message:"Upload failed: "+errMsg(e))}
        finally{ph.busy--;renderFiles()}
      };
      const queue=[...files];await Promise.all(Array.from({length:Math.min(3,queue.length)},async()=>{while(queue.length)await one(queue.shift())}));
    });
  }

  const close=(saved)=>{
    if(!saved)ph.added.forEach(id=>api({action:"trash",id}).catch(()=>{}));
    if(allBox){allBox.remove();allBox=null}
    closeModal=null;$("#modalRoot").innerHTML="";document.documentElement.classList.remove("modal-open");
  };
  closeModal=()=>close(false);
  $("#sheet").addEventListener("click",e=>{if(e.target.id==="sheet"||e.target.closest("[data-close]"))close(false)});
  form.addEventListener("submit",e=>e.preventDefault());
  $("#saveBtn").onclick=async()=>{
    if(ph.busy){toast("Wait for the files to finish uploading");return}
    form.querySelectorAll("[data-k]").forEach(el=>{r[el.dataset.k]=el.value.trim();if(el.dataset.nameTarget)r[el.dataset.nameTarget]=el.selectedOptions[0]?el.selectedOptions[0].dataset.name||"":""});
    if(name==="Projects"&&!r.Client){toast("Choose the client for this project");return}
    if(name==="Calendar"&&!r.Date){toast("Choose a date");return}
    if(name==="Calendar"&&!r.Title)r.Title=(r.Type||"Event")+(r.Client?": "+r.Client:"");
    if(pkBox){
      const clean=pk.filter(p=>p.name||p.price);chosen=chosen>=0&&pk[chosen]?clean.indexOf(pk[chosen]):-1;
      r.Packages=serializePackages(clean);r["Chosen Package"]=chosen>=0?(clean[chosen].name||"Package "+(chosen+1)):"";
      const qp=quoted();r["Quoted Price"]=qp?qp:"";
      if(clean.length&&(!r.Quotation||r.Quotation==="Not sent"))r.Quotation="Sent";
      if(chosen>=0&&r.Quotation!=="Declined")r.Quotation="Accepted";
      if(clean.length&&!r["Quote Date"])r["Quote Date"]=today();
    }
    if(newPays.length)r.Payments=[String(r.Payments||"").trim(),...newPays].filter(Boolean).join("\n");
    if(t.fields.some(f=>f[2]==="photos"))r.Photos=ph.ids.join(", ");
    const b=$("#saveBtn");b.disabled=true;b.textContent="Saving…";
    if(await saveRecord(name,r,isNew,rec)){ph.removed.forEach(id=>api({action:"trash",id}).catch(()=>{}));close(true)}
    else{b.disabled=false;b.textContent=isNew?"Add":"Save"}
  };
  const del=$("#delBtn");
  const askDelete=()=>{
    $("#delWrap").innerHTML=`<div class="confirm">Delete this row from the sheet? <button class="btn btn-danger-line" type="button" id="delYes">Yes, delete</button><button class="btn btn-line" type="button" id="delNo">Keep</button></div>`;
    $("#delNo").onclick=()=>{$("#delWrap").innerHTML='<button class="btn btn-danger-line" type="button" id="delBtn">Delete</button>';$("#delBtn").onclick=askDelete};
    $("#delYes").onclick=async()=>{$("#delYes").disabled=true;if(await deleteRecord(name,rec))close(true)};
  };
  if(del)del.onclick=askDelete;
}

/* ---------- calculator ---------- */
const specOf=s=>String(s["Specs / Description"]||"")+" "+String(s.Brand||"");
/* Sizes are read from the Brand and Specs / Description columns, in the ways suppliers usually write them */
const kwOf=s=>{const t=specOf(s);let m=t.match(/(\d+(?:\.\d+)?)\s*kw(?!h)/i);if(m)return parseFloat(m[1]);
  m=t.match(/(\d+(?:\.\d+)?)\s*k(?![a-z])/i);if(m&&+m[1]<=30)return parseFloat(m[1]);
  m=t.match(/(?:SH|SUN-?|GW|S6-EH1P|MG|MG\D*)(\d+(?:\.\d+)?)/i);if(m){const v=parseFloat(m[1]);return v>=1000?v/1000:v<=30?v:0}
  m=t.match(/(\d{4,5})\s*w\b/i);return m?parseInt(m[1])/1000:0};
const kwhOf=s=>{const t=specOf(s);let m=t.match(/(\d+(?:\.\d+)?)\s*kwh/i);if(m)return parseFloat(m[1]);
  const v=t.match(/(\d+(?:\.\d+)?)\s*v\b/i),ah=t.match(/(\d+(?:\.\d+)?)\s*ah\b/i);
  return v&&ah?Math.round(parseFloat(v[1])*parseFloat(ah[1])/10)/100:0};
const wOf=s=>{const m=specOf(s).match(/(\d{3})\s*w(?:p)?\b/i);return m?parseInt(m[1]):0};
const batVolt=s=>{const m=specOf(s).match(/(\d+(?:\.\d+)?)\s*v\b/i);return m?parseFloat(m[1]):0};
/* Which part of the system a supplier row is, even if the Category is written a little differently */
function kindOfItem(s){
  const it=String(s.Item||"").toLowerCase(),t=specOf(s).toLowerCase();
  if(/inverter/.test(it))return "inv";if(/batt/.test(it))return "bat";if(/pv|panel|module/.test(it))return "pv";if(/acc/.test(it))return "acc";
  if(/inverter|hybrid/.test(t))return "inv";if(/lifepo|lithium|battery/.test(t))return "bat";if(wOf(s)>=200&&/mono|panel|module|bifacial|n-?type|half.?cell/.test(t))return "pv";
  return "acc";
}
/* ---------- Solar calculator v2: sizing, costing, packages, quotation ---------- */
const SEASON=[0.93,1.0,1.1,1.14,1.06,0.96,0.95,0.99,0.98,0.97,0.94,0.9]; /* estimated monthly sun pattern for Mindanao (relative to the yearly average) */
const MDAYS=[31,28,31,30,31,30,31,31,30,31,30,31];
const SUN_PRESETS=[["Davao Region typical",4.5],["Very sunny, open site",4.8],["Cloudier or mountain site",4.2],["Custom",null]];
const FACING={"South":1,"East or West":0.93,"North":0.86,"Flat or mixed":0.95};
const SHADE={"None":1,"Light (trees part of day)":0.95,"Moderate":0.87,"Heavy":0.75};
const ROOFS=["Metal (rib type)","Tile","Concrete flat"];
const CALC_KEYS_EQUIP=["panel","panelQty","inverter","battery","batQty","goal","backupHrs","priceBy","mult","margin","profit","manual"];
const CALC_DEFAULT={view:"size",lt:"usage",ct:"labor",client:"",
  mode:"kwh",kwh:500,bill:"",rate:"",utility:"",hist:Array(12).fill(""),histBasis:"avg",dayShare:40,goal:"night",backupHrs:12,growth:0,
  sunPreset:"Davao Region typical",psh:4.5,roof:"Metal (rib type)",facing:"South",shade:"None",otherLoss:16,roofArea:"",
  panel:"auto",panelQty:"",inverter:"auto",battery:"auto",batQty:"",usable:90,cable:50,enclosure:"Yes",
  headRate:0,installers:1,instRate:1000,helpers:2,helpRate:650,days:"",km:15,nights:0,fuel:68,kmL:8,vehKm:6,lodging:1500,meals:400,mobMode:"Free",
  priceBy:"margin",mult:1.6,margin:30,profit:100000,manual:"",round:1000,smallParts:3000,misc:0,warranty:2,
  payment:"Cash",gsisLoan:"",escalate:0,aging:0.5,maxOffset:95};
let C=JSON.parse(JSON.stringify(CALC_DEFAULT));C.editing=null;
let PKGS=[];
const pkKey=()=>"solarays.pk."+(C.client||"none");
const saveCalc=()=>{lsSet("solarays.calc2",JSON.stringify(C));lsSet(pkKey(),JSON.stringify(PKGS))};
function loadCalc(){try{const s=JSON.parse(lsGet("solarays.calc2")||"null");if(s)C=Object.assign(JSON.parse(JSON.stringify(CALC_DEFAULT)),s)}catch(e){}loadPkgs()}
function loadPkgs(){try{const p=JSON.parse(lsGet(pkKey())||"[]");PKGS=Array.isArray(p)?p:[]}catch(e){PKGS=[]}}

/* supplier catalogue */
const warrantyOf=s=>{const m=String(s["Specs / Description"]||"").match(/(\d+)\s*-?\s*yr/i);return m?+m[1]:0};
const supId=s=>"r"+s._row;
/* Every priced row in your Suppliers tab, read fresh each time: add an item there and it shows here at once */
let CAT_CACHE=null,CAT_KEY="";
function catalogue(){
  const S=state.data.Suppliers;
  const key=S.length+":"+S.map(s=>s._row+"|"+s.SRP+"|"+s.Item+"|"+s.Brand+"|"+s["Specs / Description"]+"|"+s.Supplier).join("~");
  if(CAT_CACHE&&key===CAT_KEY)return CAT_CACHE;
  const priced=S.filter(s=>num(s.SRP)>0),skipped=[];
  const pv=[],inv=[],bat=[],acc=[];
  priced.forEach(s=>{const k=kindOfItem(s),b=brandOf(s);
    if(k==="pv"){const w=wOf(s);if(w>=150)pv.push({id:supId(s),s,w,price:num(s.SRP),wy:warrantyOf(s),label:`${b?b+" ":""}${w}W`});else skipped.push([s,"panel watts (e.g. 580W)"])}
    else if(k==="inv"){const kw=kwOf(s);if(kw>0)inv.push({id:supId(s),s,kw,price:num(s.SRP),wy:warrantyOf(s),label:`${b?b+" ":""}${kw}kW`});else skipped.push([s,"inverter size (e.g. 6kW)"])}
    else if(k==="bat"){const kwh=kwhOf(s),v=batVolt(s);if(v&&v<40)skipped.push([s,"a 48V/51.2V battery (this one is "+v+"V)"]);else if(kwh>=1)bat.push({id:supId(s),s,kwh,price:num(s.SRP),wy:warrantyOf(s),label:`${b?b+" ":""}${kwh} kWh`});else skipped.push([s,"battery size (e.g. 5.12kWh or 51.2V 100Ah)"])}
    else acc.push(s)});
  CAT_KEY=key;CAT_CACHE={pv,inv,bat,acc,skipped};return CAT_CACHE;
}
const modelName=s=>{const sp=String(s["Specs / Description"]||"");const m=sp.match(/(?:Hybrid,\s*)?([A-Z][A-Za-z]+\s+[A-Z0-9][\w\-\/]+)/);return (s.Brand&&s.Brand!=="-"?s.Brand+" ":"")+sp.split(",").slice(0,2).join(",").replace(/^Hybrid,\s*/,"").replace(/^LiFePO4,?\s*/,"")};
const optLabel=x=>`${x.label}${x.wy?" · "+x.wy+"-yr":""} · ${String(x.s["Specs / Description"]||"").split(",").slice(0,2).join(",").slice(0,38)} · ${peso(x.price)} · ${x.s.Supplier||"no supplier"}`;

/* accessory price lookup: cheapest supplier row whose description matches */
function accPick(acc,re){const m=acc.filter(s=>re.test(String(s["Specs / Description"])+" "+String(s.Brand||"")));return m.sort((a,b)=>num(a.SRP)-num(b.SRP))[0]||null}

function calcRun(input){
  const c=input||C,cat=catalogue();
  const rate0=num(c.rate);
  const hist=(c.hist||[]).map(num).filter(v=>v>0);
  let monthlyKWh=c.mode==="bill"?(rate0?num(c.bill)/rate0:0):c.mode==="history"?(hist.length?(c.histBasis==="max"?Math.max(...hist):hist.reduce((a,b)=>a+b,0)/hist.length):0):num(c.kwh);
  const rate=rate0||(num(c.bill)&&num(c.kwh)?num(c.bill)/num(c.kwh):12);
  if(c.mode==="bill"&&!rate0)monthlyKWh=num(c.bill)/rate;
  const bill=num(c.bill)||monthlyKWh*rate;
  const daily=monthlyKWh/30.42*(1+num(c.growth)/100);
  const psh=num(c.psh)||4.5;
  const pr=(1-num(c.otherLoss)/100)*(SHADE[c.shade]||1)*(FACING[c.facing]||1);
  const yld=psh*pr;
  const kwpNeed=yld?daily/yld:0;
  /* panels */
  const cheapW=[...cat.pv].sort((a,b)=>a.price/a.w-b.price/b.w)[0];
  let pv=c.panel==="auto"?cheapW:c.panel==="auto-premium"?[...cat.pv].sort((a,b)=>b.wy-a.wy||b.w-a.w||a.price/a.w-b.price/b.w)[0]:cat.pv.find(x=>x.id===c.panel)||cheapW;
  const W=pv?pv.w:620;
  const qty=num(c.panelQty)>0?Math.round(num(c.panelQty)):Math.max(1,Math.ceil(kwpNeed*1000/W));
  const kwp=qty*W/1000;
  /* inverter: smallest that suits the panels (panels up to about 1.2× inverter) */
  const invFit=cat.inv.filter(x=>x.kw>=kwp*0.85).sort((a,b)=>a.kw-b.kw||a.price-b.price);
  let inv=c.inverter==="auto"?(invFit.length?invFit.filter(x=>x.kw===invFit[0].kw).sort((a,b)=>a.price-b.price)[0]:[...cat.inv].sort((a,b)=>b.kw-a.kw)[0]):cat.inv.find(x=>x.id===c.inverter);
  if(c.inverter==="auto-premium"){const pool=(invFit.length?invFit.filter(x=>x.kw===invFit[0].kw):cat.inv);inv=[...pool].sort((a,b)=>b.wy-a.wy||a.price-b.price)[0]}
  /* battery */
  const dayUse=daily*num(c.dayShare)/100,night=daily-dayUse;
  const usable=num(c.usable)/100||0.9;
  const needUsable=c.goal==="full"?daily:c.goal==="custom"?daily*num(c.backupHrs)/24:night;
  const RTE=0.95; /* battery round-trip efficiency */
  const need=needUsable/(usable*RTE);
  let bat=null,batN=0;
  const tryModel=x=>{const n=num(c.batQty)>0?Math.round(num(c.batQty)):Math.max(1,Math.ceil(need/x.kwh-0.02));return {x,n,cost:n*x.price}};
  if(c.battery==="none"||need<=0){bat=null}
  else if(c.battery==="auto"||c.battery==="auto-premium"){const opts=cat.bat.map(tryModel).filter(o=>o.n<=6);
    const best=c.battery==="auto-premium"?opts.sort((a,b)=>b.x.wy-a.x.wy||a.cost-b.cost)[0]:opts.sort((a,b)=>a.cost-b.cost||b.x.wy-a.x.wy)[0];
    if(best){bat=best.x;batN=best.n}}
  else{const x=cat.bat.find(b=>b.id===c.battery);if(x){const o=tryModel(x);bat=x;batN=o.n}}
  const batKWh=bat?bat.kwh*batN:0;
  /* energy on an average day */
  const prodDay=kwp*yld;
  const flow=p=>{const direct=Math.min(dayUse,p),surplus=p-direct,charge=Math.min(surplus,batKWh*usable,night/RTE),out=Math.min(charge*RTE,night);return {direct,charge,out,spare:surplus-charge,grid:Math.max(0,daily-direct-out)}};
  const f=flow(prodDay);
  const offsetRaw=daily?(f.direct+f.out)/daily:0;
  const offset=Math.min(num(c.maxOffset)/100||0.95,offsetRaw);
  const prodM=SEASON.map((s,i)=>kwp*psh*s*pr*MDAYS[i]);
  const useM=c.mode==="history"&&hist.length===12?(c.hist||[]).map(num):MDAYS.map(d=>daily*d);
  const gridM=SEASON.map((s,i)=>flow(prodDay*s).grid*MDAYS[i]);
  /* savings month by month: the sun changes through the year, and energy you don't use is not paid for (no net metering) */
  const capM=num(c.maxOffset)/100||0.95;
  const saveM=SEASON.map((s,i)=>{const use=daily*MDAYS[i],fromSolar=Math.max(0,use-gridM[i]);return Math.min(fromSolar,use*capM)*rate});
  const savings=saveM.reduce((a,b)=>a+b,0)/12;
  const offsetYear=(()=>{const u=MDAYS.reduce((a,d)=>a+daily*d,0);return u?Math.min(capM,MDAYS.reduce((a,d,i)=>a+Math.max(0,daily*d-gridM[i]),0)/u):0})();
  /* roof */
  const areaEach=W/220,areaNeed=qty*areaEach;
  /* materials */
  const L=[];
  const add=(cat_,item,s,qty_,unit,group)=>{if(qty_<=0)return;L.push({cat:cat_,group:group||cat_,item,supplier:s?s.Supplier:"",qty:qty_,unit:s?num(s.SRP):unit||0,missing:!s&&!unit})};
  if(pv)L.push({cat:"PV Module",group:"Panels",item:`${pv.s.Brand&&pv.s.Brand!=="-"?pv.s.Brand+" ":""}${String(pv.s["Specs / Description"]).split(",").slice(0,2).join(",")}`,supplier:pv.s.Supplier,qty,unit:pv.price,ref:pv});
  if(inv)L.push({cat:"Inverter",group:"Inverter",item:String(inv.s["Specs / Description"]).replace(/^Hybrid,\s*/,"").split(",").slice(0,2).join(",")+" hybrid",supplier:inv.s.Supplier,qty:1,unit:inv.price,ref:inv});
  if(bat)L.push({cat:"Battery",group:"Battery",item:(brandOf(bat.s)&&!String(bat.s["Specs / Description"]).includes(brandOf(bat.s))?brandOf(bat.s)+" ":"")+String(bat.s["Specs / Description"]).replace(/^LiFePO4,?\s*/,"").split(",").filter(x=>!/cycles|IP\d/i.test(x)).join(",").trim()+" LiFePO4",supplier:bat.s.Supplier,qty:batN,unit:bat.price,ref:bat});
  const A=cat.acc,tile=/tile/i.test(c.roof);
  const rails=2*Math.ceil(qty*0.55),conn=Math.max(0,2*Math.round(rails*0.35));
  add("Accessories","Mounting rail, 2.4m",accPick(A,/rail(ing)?s?\b.*2\.4/i),rails,0,"Mounting");
  add("Accessories","Rail connector",accPick(A,/rail connector/i),conn,0,"Mounting");
  add("Accessories","Mid clamp",accPick(A,/mid clamp/i),Math.max(2,2*qty-4),0,"Mounting");
  add("Accessories","End clamp",accPick(A,/end clamp/i),qty>=8?8:4,0,"Mounting");
  add("Accessories","L-foot",accPick(A,/l-?foot/i),2*qty,0,"Mounting");
  if(tile)add("Accessories","Tile hook with screw",accPick(A,/tile hook/i),qty,0,"Mounting");
  add("Accessories","Grounding lug",accPick(A,/grounding lug/i),4,0,"Mounting");
  add("Accessories","Grounding clip",accPick(A,/grounding clip/i),qty,0,"Mounting");
  const big=kwp>8.5;
  add("Accessories",`PV cable ${big?"6":"4"}mm², black & red pair (per meter)`,accPick(A,big?/pv cable.*6mm.*per meter/i:/pv cable.*4mm.*per meter/i),num(c.cable)||0,0,"PV cable");
  add("Accessories","DC combiner box 2-in/2-out (fuses, DC MCB, DC SPD)",accPick(A,/combiner box,\s*2 in/i),1,0,"Protection");
  const big8=inv&&inv.kw>=8;
  add("Accessories",`DC MCCB battery breaker ${big8?"200":"160"}A`,accPick(A,big8?/MCCB.*200A/i:/MCCB.*160A/i),bat?1:0,0,"Protection");
  add("Accessories","ATS 2P 63A",accPick(A,/ATS 2P 63A/i),1,0,"Protection");
  add("Accessories","AC MCB 2P 63A",accPick(A,/AC MCB 2P.*,\s*63A/i),2,0,"Protection");
  add("Accessories","AC SPD 2P",accPick(A,/AC SPD 2P/i),1,0,"Protection");
  add("Accessories","Voltage protector 63A",accPick(A,/voltage protector/i),1,0,"Protection");
  add("Accessories","Distribution box HT-12, waterproof",accPick(A,/HT-12/i),1,0,"Protection");
  if(c.enclosure==="Yes")add("Accessories","Safety metal enclosure, glass window, 50×40×20cm",accPick(A,/enclosure.*50cm/i),1,0,"Protection");
  add("Accessories","PVC cable tray with cover 5×10cm, 2m",accPick(A,/cable tray.*5cm\s*\*\s*10cm/i),Math.max(2,Math.ceil((num(c.cable)||0)/12)),0,"Protection");
  add("Accessories",`Hot aerosol fire extinguishing device ${big8?"20":"10"}g`,accPick(A,big8?/aerosol.*20 grams/i:/aerosol.*10 grams/i),1,0,"Fire safety");
  L.forEach(l=>l.total=l.qty*l.unit);
  const material=L.reduce((a,l)=>a+l.total,0);
  /* labor and mobilization */
  const days=num(c.days)>0?num(c.days):kwp<=4?4:kwp<=8?5:kwp<=12?6:7;
  const crew=num(c.installers)+num(c.helpers)+1;
  const labor=(num(c.headRate)+num(c.installers)*num(c.instRate)+num(c.helpers)*num(c.helpRate))*days;
  const trips=num(c.nights)>0?1:days;
  const kmDriven=2*num(c.km)*trips*1.1;
  const fuel=num(c.kmL)?kmDriven/num(c.kmL)*num(c.fuel):0,vehicle=kmDriven*num(c.vehKm);
  const lodging=num(c.nights)*num(c.lodging),meals=num(c.nights)>0?crew*days*num(c.meals):0;
  const mobCost=fuel+vehicle+lodging+meals;
  const mobFee=c.mobMode==="Charge client"?Math.ceil(mobCost/1000)*1000:0;
  const warrantyRes=material*num(c.warranty)/100;
  const other=num(c.smallParts)+num(c.misc)+warrantyRes;
  const totalCost=material+labor+mobCost+other;
  const basis=totalCost-(mobFee?mobCost:0);
  let price=c.priceBy==="mult"?material*num(c.mult):c.priceBy==="profit"?basis+num(c.profit):c.priceBy==="manual"?num(c.manual):basis/(1-Math.min(0.9,num(c.margin)/100));
  const rnd=num(c.round)||1;price=c.priceBy==="manual"?price:Math.ceil(price/rnd)*rnd;
  const contract=price+mobFee,profit=contract-totalCost,margin=contract?profit/contract:0;
  /* savings */
  const esc=num(c.escalate)/100,age=num(c.aging)/100;
  const cum=[0];for(let y=0;y<25;y++)cum.push(cum[y]+savings*12*Math.pow(1+esc,y)*Math.pow(1-age,y));
  /* payback from the yearly savings, including rate increases and panel aging */
  let payback=0;if(savings>0){for(let y=1;y<=25;y++){if(cum[y]>=contract){payback=y-1+(contract-cum[y-1])/(cum[y]-cum[y-1]);break}}if(!payback)payback=26}
  const lo=Math.min(...SEASON),hi=Math.max(...SEASON);
  const checks=[];
  if(inv){const r=kwp/inv.kw;checks.push(r>1.3?["warn",`Panels (${kwp.toFixed(2)} kWp) are ${Math.round(r*100)}% of the ${inv.kw} kW inverter: some midday power will be clipped`]:r<0.7?["warn",`The ${inv.kw} kW inverter is larger than the ${kwp.toFixed(2)} kWp of panels needs`]:["ok",`Inverter ${inv.kw} kW suits ${kwp.toFixed(2)} kWp of panels (${Math.round(r*100)}%)`])}else checks.push(["bad","No inverter prices found in Suppliers"]);
  if(needUsable>0){const cov=batKWh?Math.min(1,batKWh*usable*0.95/needUsable):0;checks.push(cov>=0.95?["ok",`Battery covers ${Math.round(cov*100)}% of the ${c.goal==="full"?"full-day":c.goal==="custom"?num(c.backupHrs)+"-hour":"night"} need (${batKWh.toFixed(2)} kWh, ${Math.round(usable*100)}% usable)`]:["warn",`Battery covers ${Math.round(cov*100)}% of the ${c.goal==="night"?"night":"backup"} need; add ${Math.max(0,need-batKWh).toFixed(1)} kWh for full coverage`])}
  const lowM=gridM.map((g,i)=>[g,i]).filter(x=>x[0]>daily*2).map(x=>MON[x[1]]);
  checks.push(lowM.length?["warn",`Lower sun in ${lowM.slice(0,3).join(", ")}: about ${Math.round(Math.max(...gridM))} kWh/month from the grid then`]:["ok","Production covers usage in every month"]);
  if(num(c.roofArea))checks.push(areaNeed<=num(c.roofArea)?["ok",`Fits the roof: ${Math.round(areaNeed)} m² of ${num(c.roofArea)} m²`]:["bad",`Needs ${Math.round(areaNeed)} m² but the roof has ${num(c.roofArea)} m²`]);
  const missing=L.filter(l=>l.missing).map(l=>l.item);
  if(missing.length)checks.push(["warn",`No supplier price for: ${missing.slice(0,2).join(", ")}${missing.length>2?"…":""}`]);
  const goalText=offset>=0.9?"90–100% (near-zero bill)":offset>=0.8?"80–90% savings":`${Math.floor(offset*20)*5}–${Math.floor(offset*20)*5+5}% savings`;
  if(cat.skipped&&cat.skipped.length)checks.push(["warn",`${cat.skipped.length} supplier item${cat.skipped.length>1?"s":""} can't be used yet: add ${cat.skipped[0][1]} to "${(brandOf(cat.skipped[0][0])+" "+String(cat.skipped[0][0]["Specs / Description"]||"")).trim().slice(0,40)}"${cat.skipped.length>1?" and others":""} in Suppliers`]);
  return {c,cat,monthlyKWh,daily,rate,bill,psh,pr,yld,kwpNeed,pv,W,qty,kwp,inv,bat,batN,batKWh,dayUse,night,need,usable,prodDay,f,offset:offsetYear,offsetRaw,prodM,useM,gridM,savings,saveM,areaNeed,areaEach,
    lines:L,material,days,crew,labor,fuel,vehicle,lodging,meals,mobCost,mobFee,warrantyRes,other,totalCost,price,contract,profit,margin,cum,payback,
    harvestLo:kwp*psh*pr*lo,harvestHi:kwp*psh*pr*hi,checks,goalText,annual:prodM.reduce((a,b)=>a+b,0),mult:material?price/material:0};
}
const sysText=r=>`${r.kwp.toFixed(2)} kWp Solar · ${r.inv?r.inv.kw+" kW Hybrid":"no inverter"}${r.batKWh?" · "+(Math.round(r.batKWh*100)/100)+" kWh Battery":""}`;


/* ---------- calculator screens ---------- */
const cfield=(k,label,opts={})=>{
  const v=opts.value!==undefined?opts.value:C[k];const id="c2-"+k;
  const hint=opts.hint?`<span class="c2h">${esc(opts.hint)}</span>`:"";
  const span=opts.span?` style="grid-column:span ${opts.span}"`:"";
  if(opts.select)return `<label class="c2f"${span} for="${id}"><span>${label}${hint}</span><select class="form-select" id="${id}" data-c2="${k}">${opts.select.map(o=>{const [val,lab]=Array.isArray(o)?o:[o,o];return `<option value="${esc(val)}" ${String(val)===String(v)?"selected":""}>${esc(lab)}</option>`}).join("")}</select></label>`;
  return `<label class="c2f"${span} for="${id}"><span>${label}${hint}</span><span class="c2in"><input class="form-control" id="${id}" data-c2="${k}" type="text" inputmode="${opts.text?"text":"decimal"}" value="${esc(v)}" placeholder="${esc(opts.ph||"")}" style="padding-right:${opts.unit?14+String(opts.unit).length*6.5:11}px">${opts.unit?`<em>${esc(opts.unit)}</em>`:""}</span></label>`;
};
const cseg=(k,label,items,span=2)=>`<div class="c2f" style="grid-column:span ${span}"><span>${label}</span><div class="c2seg" role="group" aria-label="${esc(label)}">${items.map(([v,l])=>`<button type="button" data-c2seg="${k}" data-v="${esc(v)}" aria-pressed="${String(C[k])===String(v)}">${esc(l)}</button>`).join("")}</div></div>`;
const csec=t=>`<div class="c2sec">${t}</div>`;
function c2tiles(r){
  const t=(l,v,s,cls="",tc="xtra")=>`<div class="c2tile ${tc}"><span class="l">${l}</span><b class="${cls}">${v}</b><span class="s">${esc(s)}</span></div>`;
  return t("PV system",r.kwp.toFixed(2)+" kWp",`${r.qty} × ${r.pv?r.pv.label:"—"}`,"","key")
    +t("Inverter",r.inv?r.inv.kw+" kW":"–",r.inv?`${r.inv.label} · ${Math.round(r.kwp/r.inv.kw*100)}% load`:"Add inverter prices")
    +t("Battery",r.batKWh?(Math.round(r.batKWh*100)/100)+" kWh":"None",r.bat?`${r.batN} × ${r.bat.label}`:"No battery")
    +t("Solar offset",Math.round(r.offset*100)+"%",Math.round(r.annual).toLocaleString("en-PH")+" kWh/yr")
    +t("Savings",shortPeso(r.savings)+"/mo",`Bill ${shortPeso(r.bill)} → ${shortPeso(r.bill-r.savings)}`,"g","key")
    +t("Payback",r.payback?r.payback.toFixed(1)+" yrs":"–",`10-yr savings ${shortPeso(r.cum[10])}`)
    +t("Selling price",peso(r.contract),`${Math.round(r.margin*100)}% margin · ${r.mult.toFixed(2)}× material`,"","key hero");
}
function c2left(r){
  const cat=r.cat;
  if(C.view==="size"){
    const tabs=[["usage","Usage"],["site","Site"],["equip","Equipment"]];
    let body="";
    if(C.lt==="usage"){
      body=cseg("mode","Enter usage by",[["kwh","kWh"],["bill","Bill"],["history","12 months"]])
       +(C.mode==="history"?`<div class="c2f" style="grid-column:span 2"><span>Monthly kWh, Jan to Dec <span class="c2h">${C.histBasis==="max"?"sized for highest month":"sized for the average"}</span></span><div class="c2hist">${MON.map((m,i)=>`<label><em>${m}</em><input type="text" inputmode="decimal" data-c2h="${i}" value="${esc(C.hist[i]||"")}" aria-label="${m} kWh"></label>`).join("")}</div></div>`+cseg("histBasis","Size for",[["avg","Average month"],["max","Highest month"]])
         :cfield("kwh","Monthly kWh",{unit:"kWh",hint:C.mode==="bill"?"from bill ÷ rate":""})+cfield("bill","Monthly bill",{unit:"₱"}))
       +cfield("utility","Utility",{text:true,ph:"NORDECO"})+cfield("rate","Rate",{unit:"₱/kWh",ph:r.rate.toFixed(2),hint:num(C.rate)?"":"auto: bill ÷ kWh"})
       +`<div class="c2f" style="grid-column:span 2"><span>When power is used <span class="c2h">day ${C.dayShare}% · night ${100-C.dayShare}%</span></span><div class="c2day" style="--d:${C.dayShare}%"><input type="range" min="0" max="100" step="5" value="${C.dayShare}" data-c2="dayShare" aria-label="Share of power used in daytime"><span class="dl">Day ${C.dayShare}%</span><span class="nl">Night ${100-C.dayShare}%</span></div></div>`
       +cfield("goal","Battery goal",{select:[["night","Cover night use"],["full","Full-day backup"],["custom","Custom backup hours"]]})
       +(C.goal==="custom"?cfield("backupHrs","Backup hours",{unit:"hrs"}):cfield("growth","Future load growth",{unit:"%",hint:"new aircon etc."}));
    }else if(C.lt==="site"){
      body=csec("Sun and roof")+cfield("sunPreset","Location",{select:SUN_PRESETS.map(p=>[p[0],p[1]?`${p[0]} · ${p[1]} sun hrs`:"Custom"])})+cfield("psh","Peak sun hours",{unit:"hrs/day"})
       +cfield("roof","Roof type",{select:ROOFS})+cfield("facing","Roof facing",{select:Object.keys(FACING)})
       +cfield("shade","Shading",{select:Object.keys(SHADE)})+cfield("otherLoss","Other losses",{unit:"%",hint:"heat, wiring, dust"})
       +cfield("roofArea","Roof area available",{unit:"m²",ph:"optional"})+cfield("cable","PV cable run",{unit:"m"})
       +`<div class="c2note" style="grid-column:span 2">Net yield: ${r.yld.toFixed(2)} kWh per kWp per day (${Math.round(r.pr*100)}% of ideal). Monthly output follows an estimated Mindanao sun pattern.</div>`;
    }else{
      body=csec("Main components")
       +cfield("panel","Panels",{select:[["auto","Auto · lowest ₱ per watt"],["auto-premium","Auto · longest warranty"],...cat.pv.map(x=>[x.id,optLabel(x)])],span:2})
       +cfield("panelQty","Panel quantity",{ph:`auto: ${Math.max(1,Math.ceil(r.kwpNeed*1000/r.W))}`,unit:"pcs"})+cfield("enclosure","Metal enclosure",{select:["Yes","No"]})
       +cfield("inverter","Inverter",{select:[["auto","Auto · lowest price that fits"],["auto-premium","Auto · longest warranty that fits"],...cat.inv.map(x=>[x.id,optLabel(x)])],span:2})
       +cfield("battery","Battery",{select:[["auto","Auto · lowest total cost"],["auto-premium","Auto · longest warranty"],["none","No battery"],...cat.bat.map(x=>[x.id,optLabel(x)])],span:2})
       +cfield("batQty","Battery quantity",{ph:`auto: ${r.batN||0}`,unit:"pcs"})+cfield("usable","Battery usable",{unit:"%"});
    }
    return `<section class="card c2left inputs"><div class="c2tabs" role="tablist">${tabs.map(([k,l])=>`<button type="button" role="tab" data-c2lt="${k}" aria-selected="${C.lt===k}">${l}</button>`).join("")}</div><div class="c2form">${body}</div></section>`;
  }
  const tabs=[["labor","Labor"],["travel","Travel"],["pricing","Pricing"],["savings","Savings"]];
  let body="";
  if(C.ct==="labor"){
    body=csec("Crew")+cfield("installers","Installers",{unit:"pax"})+cfield("instRate","Installer rate",{unit:"₱/day"})
     +cfield("helpers","Helpers",{unit:"pax"})+cfield("helpRate","Helper rate",{unit:"₱/day"})
     +cfield("headRate","Installer head rate",{unit:"₱/day"})+cfield("days","Job days",{ph:`auto: ${r.days}`,unit:"days"})
     +`<div class="c2note" style="grid-column:span 2">Labor: ${peso(r.labor)} for ${r.days} days (${peso(r.days?r.labor/r.days:0)} per day). Job days are worked out from the system size unless you type a number.</div>`;
  }else if(C.ct==="travel"){
    body=csec("Mobilization")+cfield("km","Distance, one way",{unit:"km"})+cfield("nights","Overnight stays",{unit:"nights"})
     +cfield("fuel","Diesel",{unit:"₱/L"})+cfield("kmL","Vehicle mileage",{unit:"km/L"})
     +cfield("lodging","Lodging",{unit:"₱/night"})+cfield("meals","Meals (overnight jobs)",{unit:"₱/pax/day"})
     +cseg("mobMode","Mobilization fee",[["Free","Free (absorbed)"],["Charge client","Charge client"]])
     +`<div class="c2note" style="grid-column:span 2">Trip cost ${peso(r.mobCost)}${r.mobFee?` · client pays ${peso(r.mobFee)} (rounded up to ₱1,000)`:" · absorbed in the package price"}.</div>`;
  }else if(C.ct==="pricing"){
    const pv={mult:["mult","Material ×",""],margin:["margin","Target margin","%"],profit:["profit","Profit amount","₱"],manual:["manual","Package price","₱"]}[C.priceBy];
    body=cseg("priceBy","Price by",[["mult","Multiplier"],["margin","Margin"],["profit","Profit"],["manual","Manual"]])
     +cfield(pv[0],pv[1],{unit:pv[2]})+cfield("round","Round up to",{select:[["100","₱100"],["1000","₱1,000"],["5000","₱5,000"]]})
     +cfield("smallParts","Small parts allowance",{unit:"₱",hint:"AC wire, conduit, MC4, ground rod"})+cfield("misc","Permits & misc",{unit:"₱"})
     +cfield("warranty","Warranty reserve",{unit:"% of material"})+cfield("payment","Payment",{select:["Cash","GSIS loan"]})
     +(C.payment==="GSIS loan"?cfield("gsisLoan","Client's tentative GSIS loan",{unit:"₱",span:2}):"");
  }else{
    body=csec("Savings assumptions")+cfield("escalate","Electric rate increase",{unit:"%/yr",hint:"0 = today's rate"})+cfield("aging","Panel aging",{unit:"%/yr"})
     +cfield("maxOffset","Max bill offset",{unit:"%",hint:"fixed charges, cloudy days"})
     +`<div class="c2f"><span>Bill after solar</span><span class="c2in ro"><input type="text" readonly tabindex="-1" value="${esc(peso(r.bill-r.savings))} / month"></span></div>`
     +`<div class="c2note" style="grid-column:span 2">Quotation figures use the same numbers: harvest ${r.harvestLo.toFixed(0)}–${r.harvestHi.toFixed(0)} kWh/day, savings ${peso(r.savings)}/month, payback ${r.payback.toFixed(1)} years, 10-year savings ${peso(r.cum[10])}.</div>`;
  }
  return `<section class="card c2left inputs"><div class="c2tabs" role="tablist">${tabs.map(([k,l])=>`<button type="button" role="tab" data-c2ct="${k}" aria-selected="${C.ct===k}">${l}</button>`).join("")}</div><div class="c2form">${body}</div></section>`;
}
function lineVsPrice(o){
  return (w,h)=>{
    const L=50,R=12,T=14,B=22,pw=w-L-R,ph=h-T-B,n=o.vals.length-1;
    const max=niceMax(Math.max(o.price*1.15,...o.vals));const y=v=>T+ph-v/max*ph,x=i=>L+i/n*pw;let s="";
    for(let i=0;i<=4;i++){const v=max*i/4;s+=`<line x1="${L}" x2="${L+pw}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}" stroke="${COL.grid}"></line><text x="${L-6}" y="${(y(v)+3.5).toFixed(1)}" text-anchor="end" font-size="10" fill="${COL.muted}">${i?shortPeso(v):"0"}</text>`}
    const stepX=pw/n<34?2:1;o.vals.forEach((_,i)=>{if(i%stepX===0)s+=`<text x="${x(i).toFixed(1)}" y="${h-6}" text-anchor="${i===0?"start":i===n?"end":"middle"}" font-size="10" fill="${COL.muted}">${i===0?"Now":i===n?"Yr "+i:i}</text>`});
    const pts=o.vals.map((v,i)=>x(i).toFixed(1)+","+y(v).toFixed(1));
    s+=`<path d="M${L},${T+ph} L${pts.join(" L")} L${x(n).toFixed(1)},${T+ph} Z" fill="${COL.green}" fill-opacity=".14"></path><polyline class="ln" pathLength="1" points="${pts.join(" ")}" fill="none" stroke="${COL.green}" stroke-width="2.4"></polyline>`;
    s+=`<line x1="${L}" x2="${L+pw}" y1="${y(o.price).toFixed(1)}" y2="${y(o.price).toFixed(1)}" stroke="${COL.sol}" stroke-width="2" stroke-dasharray="5 4"></line><text x="${L+pw}" y="${(y(o.price)-6).toFixed(1)}" text-anchor="end" font-size="10.5" font-weight="700" fill="${COL.sol}">Price ${esc(shortPeso(o.price))}</text>`;
    if(o.pb>0&&o.pb<=n){const bx=x(o.pb);s+=`<line x1="${bx.toFixed(1)}" x2="${bx.toFixed(1)}" y1="${T}" y2="${T+ph}" stroke="#fff" stroke-opacity=".3" stroke-dasharray="3 3"></line><circle cx="${bx.toFixed(1)}" cy="${y(o.price).toFixed(1)}" r="5" fill="#fff"></circle>`;
      const tw=118,tx=Math.min(bx+8,L+pw-tw);s+=`<rect x="${tx.toFixed(1)}" y="${(y(o.price)+8).toFixed(1)}" width="${tw}" height="20" rx="6" fill="#fff"></rect><text x="${(tx+tw/2).toFixed(1)}" y="${(y(o.price)+22).toFixed(1)}" text-anchor="middle" font-size="10.5" font-weight="800" fill="#16212E">Paid back in ${o.pb.toFixed(1)} yrs</text>`}
    return `<svg class="${chartAnim?"anim":""}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" font-family="Inter, system-ui, sans-serif">${s}</svg>`;
  };
}
function c2right(r){
  const PANE={"Production vs usage":"r-a","Daily energy flow":"r-b","Sizing checks":"r-c","Roof fit":"r-c","Materials":"r-a","Job cost and price":"r-b","Savings vs price":"r-c"};
  const card=(t,s,b,cls="")=>`<section class="card ${cls} ${PANE[t]||""}"><div class="ch"><h2>${t}</h2><span>${esc(s)}</span></div>${b}</section>`;
  if(C.view==="size"){
    const flowRow=(parts)=>`<div class="stackbar">${parts.filter(p=>p[1]>0.05).map(([n,v,c])=>`<i style="flex:${v.toFixed(2)};background:${c}"></i>`).join("")||'<i style="flex:1;background:#26374B"></i>'}</div><div class="slist">${parts.map(([n,v,c])=>`<div class="lg"><i style="background:${c}"></i><span>${n}</span><b>${v.toFixed(1)} kWh</b></div>`).join("")}</div>`;
    const flow=`<div class="c2flow"><div><span class="c2k">Daytime · solar makes ${r.prodDay.toFixed(1)} kWh</span>${flowRow([["Used by home in daytime",r.f.direct,COL.sol],["Charges battery",r.f.charge,COL.lav],["Spare (not used)",r.f.spare,COL.slate]])}</div>
      <div><span class="c2k">Night · home needs ${r.night.toFixed(1)} kWh</span>${flowRow([["From battery",r.f.out,COL.lav],["From grid",Math.max(0,r.night-r.f.out),COL.coral]])}</div></div>`;
    const checks=`<div class="c2checks">${r.checks.map(([k,t])=>`<div class="ck ${k}"><i aria-hidden="true">${k==="ok"?"✓":"!"}</i><span>${esc(t)}</span></div>`).join("")}</div>`;
    const cols=Math.min(7,Math.max(1,Math.ceil(Math.sqrt(r.qty*2))));
    const roof=`<div class="c2roof"><div class="panels" style="--cols:${cols}">${Array.from({length:Math.min(r.qty,40)},()=>"<i></i>").join("")}</div><div class="rt"><b>${Math.round(r.areaNeed)} m²</b><span>needed for ${r.qty} panels (${r.areaEach.toFixed(1)} m² each)</span>${num(C.roofArea)?`<span class="${r.areaNeed<=num(C.roofArea)?"okc":"badc"}">${r.areaNeed<=num(C.roofArea)?"Fits, "+Math.round(num(C.roofArea)-r.areaNeed)+" m² to spare":"Too small by "+Math.round(r.areaNeed-num(C.roofArea))+" m²"}</span>`:'<span class="c2h">Add roof area under Site to check the fit</span>'}</div></div>
      <div class="c2mini">${[["kWh/month",Math.round(r.monthlyKWh)],["Sun hours",r.psh],["Yield/kWp",r.yld.toFixed(2)]].map(([a,b])=>`<div><span>${a}</span><b>${b}</b></div>`).join("")}</div>`;
    return `<div class="c2right size">${card("Production vs usage","Monthly · kWh",legendHTML([[COL.sol,"Solar production"],[COL.blue,"Client usage"]])+chartSlot(barLine({labels:MON.map(m=>m[0]),bars:r.prodM.map(v=>Math.round(v)),line:r.useM.map(v=>Math.round(v)),barColor:COL.sol,lineColor:COL.blue,fmt:v=>String(Math.round(v))}),"Monthly production compared with usage"))}
      ${card("Daily energy flow","Average day",flow)}${card("Sizing checks","Updated as you change inputs",checks)}${card("Roof fit",`${r.qty} panels`,roof)}</div>`;
  }
  const groups={},GMAP={"Mounting":"Mounting & cable","PV cable":"Mounting & cable","Protection":"Protection & safety","Fire safety":"Protection & safety"};r.lines.forEach(l=>{const g=GMAP[l.group]||l.group;(groups[g]=groups[g]||[]).push(l)});
  const gRow=(g,list)=>{const tot=list.reduce((a,l)=>a+l.total,0),one=list.length===1?list[0]:null;
    const det=one?`${one.qty} × ${one.item}`:g==="Mounting & cable"?`${/tile/i.test(C.roof)?"Tile":/concrete/i.test(C.roof)?"Concrete":"Metal"} roof mounting, ${list.length} items · ${num(C.cable)} m PV cable`:list.map(l=>l.item.replace(/,.*$/,"").replace(/\s*\(.*$/,"")).slice(0,4).join(", ")+(list.length>4?"…":"");
    return `<div class="mrow"><b>${esc(g)}</b><span>${esc(det)}${list.some(l=>l.missing)?' <em class="badc">price missing</em>':""}</span><span>${one?peso(one.unit):""}</span><span>${peso(tot)}</span></div>`};
  const mats=`<div class="mtable"><div class="mrow mh"><span>Item</span><span>Details</span><span>Unit</span><span>Total</span></div>${["Panels","Inverter","Battery","Mounting & cable","Protection & safety"].filter(g=>groups[g]).map(g=>gRow(g,groups[g])).join("")}</div><button type="button" class="linkbtn" data-c2act="items">View all ${r.lines.length} items with suppliers</button>`;
  const sum=[["Material cost",r.material],[`Labor · ${r.days} days`,r.labor],[`Mobilization · ${C.km} km${num(C.nights)?" · "+C.nights+" nights":""}`,r.mobCost],[`Small parts, permits, ${C.warranty}% warranty reserve`,r.other]];
  const sumHTML=`<div class="kv c2kv">${sum.map(([a,b])=>`<div><span>${esc(a)}</span><span>${peso(b)}</span></div>`).join("")}<div class="b"><span>Total job cost</span><span>${peso(r.totalCost)}</span></div><div class="g"><span>Gross profit · ${Math.round(r.margin*100)}% margin</span><span>${peso(r.profit)}</span></div>${r.mobFee?`<div><span>Package price</span><span>${peso(r.price)}</span></div><div><span>Mobilization fee to client</span><span>${peso(r.mobFee)}</span></div>`:""}<div class="tot"><span>${r.mobFee?"Total contract price":"Selling price"}</span><span>${peso(r.contract)}</span></div></div>`;
  const mini=`<div class="c2mini">${[["10-yr savings",shortPeso(r.cum[10]),"g"],["25-yr savings",shortPeso(r.cum[25]),"g"],["25-yr return",(r.contract?(r.cum[25]/r.contract).toFixed(1):"0")+"×",""]].map(([a,b,c])=>`<div><span>${a}</span><b class="${c}">${b}</b></div>`).join("")}</div>`;
  return `<div class="c2right cost">${card("Materials","From your Suppliers tab",mats,"c2mat")}${card("Job cost and price","Internal only",sumHTML)}${card("Savings vs price","10 years",legendHTML([[COL.green,"Cumulative savings"],[COL.sol,"Contract price"]])+chartSlot(lineVsPrice({vals:r.cum.slice(0,11),price:r.contract,pb:r.payback}),"Cumulative savings over 10 years against the price")+mini)}</div>`;
}
const TIER_COLORS=["#B9A6FF","#FFB612","#6CB4FF","#4FD18B","#FF7A59","#3DD6C6"];
function pkgRun(p){return calcRun({...C,...p.cfg})}
function c2packages(){
  const runs=PKGS.map(p=>({p,r:pkgRun(p)}));const cat=catalogue();
  const opt=(list,cur,auto)=>auto.map(([v,l])=>`<option value="${v}" ${String(cur)===v?"selected":""}>${esc(l)}</option>`).join("")+list.map(x=>`<option value="${esc(x.id)}" ${String(cur)===x.id?"selected":""}>${esc(optLabel(x))}</option>`).join("");
  const many=PKGS.length>3;
  const card=({p,r},i)=>{const col=TIER_COLORS[i%6],c=p.cfg||{};
    const bq=c.batQty!==""&&c.batQty!=null?c.batQty:"";
    return `<section class="pkcard ${p.sel===false?"off":""}" style="--c:${col}">
      <div class="pkh"><span class="pkdot"></span><input class="pkname" data-pkname="${i}" value="${esc(p.label)}" aria-label="Package ${i+1} name"><button type="button" class="pksel" data-pksel="${i}" aria-pressed="${p.sel!==false}" aria-label="Include in quotation"></button></div>
      <div class="pkbody">
        <label class="pkf"><span>Panels <em>${r.qty} pcs · ${r.kwp.toFixed(2)} kWp</em></span><select class="form-select" data-pkf="${i}:panel">${opt(cat.pv,c.panel||"auto",[["auto","Auto · lowest ₱ per watt"],["auto-premium","Auto · longest warranty"]])}</select></label>
        <label class="pkf"><span>Inverter <em>${r.inv?r.inv.kw+" kW · "+Math.round(r.kwp/r.inv.kw*100)+"% load":"none fits"}</em></span><select class="form-select" data-pkf="${i}:inverter">${opt(cat.inv,c.inverter||"auto",[["auto","Auto · lowest price that fits"],["auto-premium","Auto · longest warranty that fits"]])}</select></label>
        <div class="pkf2"><label class="pkf"><span>Battery <em>${r.batKWh?(Math.round(r.batKWh*100)/100)+" kWh":"none"}</em></span><select class="form-select" data-pkf="${i}:battery">${opt(cat.bat,c.battery||"auto",[["auto","Auto · lowest total cost"],["auto-premium","Auto · longest warranty"]])}</select></label>
        <label class="pkf qty"><span>Qty</span><select class="form-select" data-pkf="${i}:batQty"><option value="" ${bq===""?"selected":""}>Auto ${r.batN||""}</option>${[1,2,3,4,5,6].map(n=>`<option value="${n}" ${String(bq)===String(n)?"selected":""}>${n}</option>`).join("")}</select></label></div>
        <div class="pkstats">${[["Offset",Math.round(r.offset*100)+"%"],["Savings",shortPeso(r.savings)+"/mo"],["Payback",r.payback>25?"25+ yrs":r.payback.toFixed(1)+" yrs"],["Margin",Math.round(r.margin*100)+"%"]].map(([a,b])=>`<div><span>${a}</span><b>${b}</b></div>`).join("")}</div>
      </div>
      <div class="pkfoot"><div class="pkprice"><span>${r.mobFee?"Total contract price":"Selling price"}</span><b>${peso(r.contract)}</b></div>
        <div class="pkact"><button type="button" class="btn btn-line btn-sm" data-pkedit="${i}" title="Open in Sizing to change more">Edit</button><button type="button" class="btn btn-line btn-sm" data-pkup="${i}" ${i?"":"disabled"} aria-label="Move left">←</button><button type="button" class="btn btn-line btn-sm" data-pkrm="${i}" aria-label="Remove package">×</button></div></div>
    </section>`};
  const dupes=new Set();const keys=runs.map(x=>pkgKey(x.r));keys.forEach((k,i)=>{if(keys.indexOf(k)!==i)dupes.add(i)});
  const cards=runs.map(card).join("")+(PKGS.length<6?`<button type="button" class="pkadd" data-c2act="pkadd"><b>+</b><span>Add current setup</span><em>${PKGS.length} of 6</em></button>`:"");
  const empty=!PKGS.length?`<div class="pkempty"><b>No packages yet</b><span>Let the calculator suggest packages from everything in your Suppliers tab, or set up a system in Sizing and tap Add current setup.</span><div class="hrow"><label class="sugn"><select class="form-select" data-sugn aria-label="How many packages">${[3,4,5,6].map(n=>`<option ${n===3?"selected":""}>${n}</option>`).join("")}</select></label><button type="button" class="btn btn-sol" data-c2act="suggest">Suggest packages</button></div></div>`:"";
  const sel=runs.filter(x=>x.p.sel!==false);
  const cnt=Math.max(3,PKGS.length);
  return `<div class="c2pk ${many?"many":""}">${empty||`<div class="pkgrid" style="--n:${Math.min(PKGS.length+(PKGS.length<6?1:0),4)}">${cards}</div>`}
    <section class="card pkbar"><div class="pkinfo"><b>${sel.length} of ${PKGS.length} package${PKGS.length===1?"":"s"} in the quotation</b><span>${dupes.size?`<em class="warnc">Some packages have the same components. Change their panels, inverter or battery.</em>`:"Tap the circle on a package to include or leave it out."}</span></div>
      <div class="pkgo"><div class="hrow"><label class="sugn"><span>Suggest</span><select class="form-select" data-sugn aria-label="How many packages to suggest">${[3,4,5,6].map(n=>`<option ${n===cnt?"selected":""}>${n}</option>`).join("")}</select></label><button type="button" class="btn btn-line btn-sm" data-c2act="suggest" title="Make different packages from your supplier list">Suggest</button><button type="button" class="btn btn-sol" data-c2act="quote">Send ${sel.length>1?sel.length+" packages":"to quotation"}${sel.length>1?" to quotation":""}</button></div></div></section></div>`;
}
function calcView(){
  const r=calcRun();
  const clients=[...state.data.Clients].sort((a,b)=>String(a.Client).localeCompare(String(b.Client)));
  const view=[["size","Sizing","Size"],["cost","Costing","Cost"],["pkg","Packages","Pkgs"]];
  const editing=C.editing!=null&&PKGS[C.editing];
  const acts=editing?`<button type="button" class="btn btn-line" data-c2act="pkcancel">Cancel</button><button type="button" class="btn btn-sol" data-c2act="pkupdate">Update ${esc(PKGS[C.editing].label)}</button>`
    :`${C.view!=="pkg"?`<button type="button" class="btn btn-line" data-c2act="pkadd" ${PKGS.length>=6?"disabled":""} aria-label="Add as package">${UI.plus}<span class="lbl">Package</span></button>`:""}<button type="button" class="btn btn-line" data-c2act="saveclient" aria-label="Save to client">${ico("clients")}<span class="lbl">Save to client</span></button><button type="button" class="btn btn-sol" data-c2act="quote"><span class="q-long">Send to quotation</span><span class="q-short">Quote</span></button>`;
  const pane=["inputs","a","b","c"].includes(C.pane)?C.pane:"inputs";
  const panes=C.view==="cost"?[["inputs","Inputs"],["a","Materials"],["b","Cost"],["c","Savings"]]:[["inputs","Inputs"],["a","Output"],["b","Energy"],["c","Checks"]];
  return `<div class="vw v-calc pn-${C.view==="pkg"?"all":pane}">
  <div class="c2head"><div class="c2t"><h1>Solar Calculator</h1><label class="c2client"><span>Client</span><select class="form-select" data-c2="client" aria-label="Client"><option value="">No client selected</option>${clients.map(c=>`<option value="${esc(c["S.N."])}" ${String(c["S.N."])===String(C.client)?"selected":""}>${esc(c.Client)}</option>`).join("")}</select></label></div>
    <div class="c2acts"><div class="seg sol c2views" role="tablist">${view.map(([k,l,sh])=>`<button type="button" role="tab" class="btn${C.view===k?" on":""}" data-c2view="${k}" aria-selected="${C.view===k}"><span class="lf">${l}</span><span class="ls">${sh}</span>${k==="pkg"&&PKGS.length?` <em>${PKGS.length}</em>`:""}</button>`).join("")}</div>${acts}</div></div>
  <div class="c2tiles" id="c2tiles">${c2tiles(r)}</div>
  ${C.view!=="pkg"?`<div class="seg pane-seg" role="tablist" aria-label="Show">${panes.map(([k,l])=>`<button type="button" role="tab" class="btn${pane===k?" on":""}" data-c2pane="${k}" aria-selected="${pane===k}">${l}</button>`).join("")}</div>`:""}
  <div class="c2body v-${C.view}" id="c2body">${C.view==="pkg"?c2packages():c2left(r)+`<div id="c2r" class="c2rwrap">${c2right(r)}</div>`}</div></div>`;
}
function calcRefresh(){
  const r=calcRun();const t=$("#c2tiles");if(t)t.innerHTML=c2tiles(r);
  const rr=$("#c2r");if(rr){CHARTS={};chartSeq=0;rr.innerHTML=c2right(r);requestAnimationFrame(()=>drawCharts(false))}
  saveCalc();
}
function bindCalc(){requestAnimationFrame(()=>drawCharts(true))}

function applyClient(no){
  saveCalc();C.client=no;loadPkgs();
  const c=clientByNo(no);
  if(c){if(num(c.kWh)){C.kwh=num(c.kWh);C.mode="kwh"}if(num(c.Amount))C.bill=Math.round(num(c.Amount)*100)/100;if(num(c["Rate per kWh"]))C.rate=num(c["Rate per kWh"]);if(c.DU)C.utility=c.DU}
  saveCalc();
}
/* Suggest 3 to 6 packages that really differ: panels, inverter brand or warranty, and battery size are mixed
   from everything in your Suppliers tab, then spread from the most complete (Premium) to the lowest price (Value). */
const TIER_NAMES={3:["Premium","Standard","Value"],4:["Premium","Plus","Standard","Value"],5:["Premium","Plus","Standard","Basic","Value"],6:["Premium","Plus","Standard","Smart","Basic","Value"]};
function pkgKey(r){return [r.pv&&r.pv.id,r.qty,r.inv&&r.inv.id,r.bat&&r.bat.id,r.batN].join("|")}
function suggestPackages(n){
  n=Math.max(3,Math.min(6,n||3));
  const cat=catalogue();
  const base={goal:C.goal,backupHrs:C.backupHrs,priceBy:C.priceBy,mult:C.mult,margin:C.margin,profit:C.profit,manual:"",panelQty:""};
  const ref=calcRun({...C,...base,panel:"auto",inverter:"auto",battery:"auto",batQty:""});
  if(!ref.pv||!ref.inv){PKGS=[{label:"Standard",cfg:{...base,panel:"auto",inverter:"auto",battery:"auto",batQty:""},sel:true}];saveCalc();return}
  const byBrand=(list,score)=>{const m=new Map();[...list].sort(score).forEach(x=>{const k=(brandOf(x.s)||x.s.Supplier||"")+"|"+(x.w||x.kw||x.kwh);if(!m.has(k))m.set(k,x)});return [...m.values()]};
  const pvs=byBrand(cat.pv,(a,b)=>a.price/a.w-b.price/b.w).slice(0,4);
  const kwp=ref.kwp;
  let invs=cat.inv.filter(x=>x.kw>=kwp*0.8&&x.kw<=Math.max(kwp*1.5,kwp+2));if(!invs.length)invs=[ref.inv];
  invs=byBrand(invs,(a,b)=>a.kw-b.kw||a.price-b.price).slice(0,6);
  const need=ref.need||0;
  const batOpts=[];
  cat.bat.forEach(b=>{const full=Math.max(1,Math.ceil(need/b.kwh-0.02));if(full<=6)batOpts.push({id:b.id,n:full,b});const half=Math.max(1,Math.round(full/2));if(half!==full)batOpts.push({id:b.id,n:half,b})});
  const cands=[],seen=new Set();
  pvs.forEach(pv=>invs.forEach(inv=>(batOpts.length?batOpts:[{id:"none",n:""}]).forEach(bo=>{
    const cfg={...base,panel:pv.id,inverter:inv.id,battery:bo.id,batQty:bo.n};let r=calcRun({...C,...cfg});
    if(!r.inv||!r.pv)return;
    /* inverter sized to the panels, no oversizing: add up to 3 panels to reach at least 80% inverter load */
    if(r.kwp/r.inv.kw<0.8){const q=Math.ceil(0.8*r.inv.kw*1000/r.W);if(q-r.qty>3)return;cfg.panelQty=q;r=calcRun({...C,...cfg})}
    const ratio=r.kwp/r.inv.kw;if(ratio<0.8||ratio>1.3)return;
    const k=pkgKey(r);if(seen.has(k))return;seen.add(k);
    const cover=r.need?Math.min(1,r.batKWh/r.need):0;
    const quality=(r.pv.wy||0)*0.6+(r.inv.wy||0)*1+(r.bat?r.bat.wy||0:0)*1+cover*8+r.batKWh*0.3;
    cands.push({cfg,r,price:r.contract,quality});
  })));
  if(!cands.length){suggestPackagesSimple();return}
  cands.sort((a,b)=>a.price-b.price);
  const picks=[];const add=c=>{if(c&&!picks.includes(c))picks.push(c)};
  add([...cands].sort((a,b)=>b.quality-a.quality||b.price-a.price)[0]);           /* Premium: longest warranties, full backup */
  add(cands[0]);                                                                   /* Value: lowest price */
  const lo=cands[0].price,hi=picks[0].price;
  for(let k=1;picks.length<n&&k<n;k++){                                            /* the rest: spread between Value and Premium, best quality near each price */
    const target=lo+(hi-lo)*k/(n-1);
    const near=cands.filter(c=>!picks.includes(c)).sort((a,b)=>Math.abs(a.price-target)-Math.abs(b.price-target)).slice(0,4).sort((a,b)=>b.quality-a.quality)[0];add(near);
  }
  while(picks.length<n){const c=cands.find(x=>!picks.includes(x));if(!c)break;add(c)}
  picks.sort((a,b)=>b.price-a.price);
  const names=TIER_NAMES[picks.length]||TIER_NAMES[3].concat(["Option 4","Option 5","Option 6"]).slice(0,picks.length);
  PKGS=picks.map((c,i)=>({label:names[i]||"Package "+(i+1),cfg:c.cfg,sel:true}));
  saveCalc();
  if(picks.length<n)toast(`${picks.length} different packages fit this client with your current supplier items`);
}
function suggestPackagesSimple(){
  const base={goal:C.goal,backupHrs:C.backupHrs,priceBy:C.priceBy,mult:C.mult,margin:C.margin,profit:C.profit,manual:"",panelQty:""};
  PKGS=[{label:"Premium",cfg:{...base,panel:"auto-premium",inverter:"auto-premium",battery:"auto-premium",batQty:""},sel:true},{label:"Value",cfg:{...base,panel:"auto",inverter:"auto",battery:"auto",batQty:""},sel:true}];saveCalc();
}
function showItems(){
  const r=calcRun();
  const v=document.createElement("div");v.className="viewer files";v.setAttribute("role","dialog");v.setAttribute("aria-label","All items");
  v.innerHTML=`<div class="allwrap"><div class="hd"><h2>All materials · ${peso(r.material)}</h2><button type="button" class="btn btn-sol" data-vclose>Done</button></div>
  <div class="mtable full"><div class="mrow mh"><span>Item</span><span>Supplier</span><span>Qty × unit</span><span>Total</span></div>${r.lines.map(l=>`<div class="mrow"><b>${esc(l.item)}</b><span>${esc(l.supplier||"no price in Suppliers")}</span><span>${l.qty} × ${peso(l.unit)}</span><span>${peso(l.total)}</span></div>`).join("")}</div>
  <p class="note">Quantities are worked out from the panel count, roof type and cable run. Edit prices in your Suppliers tab; the calculator always uses the cheapest matching item.</p></div>`;
  document.body.appendChild(v);v.addEventListener("click",e=>{if(e.target===v||e.target.closest("[data-vclose]"))v.remove()});
}
async function saveCalcToClient(){
  const r=calcRun();
  const c=clientByNo(C.client);
  const pk=PKGS.length?PKGS.map((p,i)=>{const x=pkgRun(p);return {name:`Package ${i+1} — ${p.label}: ${sysText(x)}`,price:x.contract}}):[];
  const pkc=PKGS.map((p,i)=>({name:pk[i].name,price:Math.round(pkgRun(p).totalCost)}));
  if(!c){openForm("Clients",null,{"kWh":Math.round(r.monthlyKWh),"Amount":Math.round(r.bill),"Rate per kWh":Math.round(r.rate*100)/100,DU:C.utility,"Consulted (Y/N)":"Yes","Consultation Date":today(),
    Notes:`Calculator: ${sysText(r)}, ${r.qty} × ${r.pv?r.pv.label:""}. Suggested price ${peso(r.contract)}.`,Packages:serializePackages(pk),"Package Costs":serializePackages(pkc)});return}
  const rec={...c,"kWh":Math.round(r.monthlyKWh),"Amount":Math.round(r.bill*100)/100,"Rate per kWh":Math.round(r.rate*100)/100,"Consulted (Y/N)":"Yes"};
  if(C.utility)rec.DU=C.utility;if(!toISO(c["Consultation Date"]))rec["Consultation Date"]=today();
  if(pk.length){rec.Packages=serializePackages(pk);rec["Package Costs"]=serializePackages(pkc);rec["Quoted Price"]=Math.min(...pk.map(p=>p.price))}
  if(await saveRecord("Clients",rec,false,c))toast("Saved to "+c.Client);
}


/* ---------- tiny .xlsx writer (no outside library: works on the iPad without extra downloads) ---------- */
const MiniXLSX=(()=>{
  const xe=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,"");
  const colNum=s=>s.split("").reduce((a,c)=>a*26+c.charCodeAt(0)-64,0);
  const colName=n=>{let s="";while(n>0){const m=(n-1)%26;s=String.fromCharCode(65+m)+s;n=Math.floor((n-1)/26)}return s};
  const parse=a=>{const m=/^([A-Z]+)(\d+)$/.exec(a);return {c:colNum(m[1]),r:+m[2]}};
  class Cell{constructor(){this.value=null}}
  class Row{constructor(ws,r){this.ws=ws;this.r=r;this.height=undefined}getCell(i){return this.ws._cell(this.r,i)}}
  class Sheet{
    constructor(name,opt){this.name=name;this.rows=new Map();this.cells=new Map();this.merges=[];this.columns=[];this.pageSetup={};this.grid=!(opt&&opt.views&&opt.views[0]&&opt.views[0].showGridLines===false)}
    _cell(r,c){const k=r+":"+c;let x=this.cells.get(k);if(!x){x=new Cell();this.cells.set(k,x)}return x}
    getCell(a){const p=parse(a);return this._cell(p.r,p.c)}
    getRow(r){let x=this.rows.get(r);if(!x){x=new Row(this,r);this.rows.set(r,x)}return x}
    mergeCells(rng){this.merges.push(rng)}
  }
  function crcTable(){const t=new Uint32Array(256);for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xEDB88320^(c>>>1):c>>>1;t[n]=c>>>0}return t}
  let CT=null;const crc32=b=>{CT=CT||crcTable();let c=0xFFFFFFFF;for(let i=0;i<b.length;i++)c=CT[(c^b[i])&255]^(c>>>8);return (c^0xFFFFFFFF)>>>0};
  function zip(files){/* stored (no compression) zip */
    const enc=new TextEncoder(),parts=[],central=[];let off=0;
    const u16=v=>[v&255,(v>>>8)&255],u32=v=>[v&255,(v>>>8)&255,(v>>>16)&255,(v>>>24)&255];
    for(const [name,str] of files){const data=enc.encode(str),nm=enc.encode(name),crc=crc32(data);
      const head=new Uint8Array([...u32(0x04034b50),...u16(20),...u16(0x0800),...u16(0),...u16(0),...u16(0x21),...u32(crc),...u32(data.length),...u32(data.length),...u16(nm.length),...u16(0)]);
      parts.push(head,nm,data);
      central.push(new Uint8Array([...u32(0x02014b50),...u16(20),...u16(20),...u16(0x0800),...u16(0),...u16(0),...u16(0x21),...u32(crc),...u32(data.length),...u32(data.length),...u16(nm.length),...u16(0),...u16(0),...u16(0),...u16(0),...u32(0),...u32(off)]),nm);
      off+=head.length+nm.length+data.length}
    const csize=central.reduce((a,b)=>a+b.length,0);
    const end=new Uint8Array([...u32(0x06054b50),...u16(0),...u16(0),...u16(files.length),...u16(files.length),...u32(csize),...u32(off),...u16(0)]);
    const all=[...parts,...central,end],out=new Uint8Array(all.reduce((a,b)=>a+b.length,0));let p=0;for(const a of all){out.set(a,p);p+=a.length}return out}
  class Workbook{
    constructor(){this.sheets=[];const wb=this;this.xlsx={writeBuffer:async()=>wb._build()}}
    addWorksheet(name,opt){const s=new Sheet(name,opt);this.sheets.push(s);return s}
    _build(){
      const fonts=[],fills=['<fill><patternFill patternType="none"/></fill>','<fill><patternFill patternType="gray125"/></fill>'],borders=['<border><left/><right/><top/><bottom/><diagonal/></border>'],numFmts=[],xfs=[];
      const idx=(arr,x)=>{let i=arr.indexOf(x);if(i<0){arr.push(x);i=arr.length-1}return i};
      const fontXml=f=>{f=f||{};return `<font>${f.bold?"<b/>":""}${f.italic?"<i/>":""}<sz val="${f.size||10}"/><color rgb="${(f.color&&f.color.argb)||"FF000000"}"/><name val="${xe(f.name||"Arial")}"/></font>`};
      idx(fonts,fontXml({}));
      const side=(n,s)=>s&&s.style?`<${n} style="${s.style}"><color rgb="${(s.color&&s.color.argb)||"FF000000"}"/></${n}>`:`<${n}/>`;
      const styleOf=c=>{
        const f=idx(fonts,fontXml(c.font));
        const fi=c.fill&&c.fill.fgColor?idx(fills,`<fill><patternFill patternType="solid"><fgColor rgb="${c.fill.fgColor.argb}"/><bgColor indexed="64"/></patternFill></fill>`):0;
        const b=c.border?idx(borders,`<border>${side("left",c.border.left)}${side("right",c.border.right)}${side("top",c.border.top)}${side("bottom",c.border.bottom)}<diagonal/></border>`):0;
        const nf=c.numFmt?164+idx(numFmts,c.numFmt):0;
        const a=c.alignment||{};const al=Object.keys(a).length?`<alignment${a.horizontal?` horizontal="${a.horizontal}"`:""}${a.vertical?` vertical="${a.vertical==="middle"?"center":a.vertical}"`:""}${a.wrapText?' wrapText="1"':""}${a.indent?` indent="${a.indent}"`:""}/>`:"";
        return idx(xfs,`<xf numFmtId="${nf}" fontId="${f}" fillId="${fi}" borderId="${b}" xfId="0"${nf?' applyNumberFormat="1"':""} applyFont="1"${fi?' applyFill="1"':""}${b?' applyBorder="1"':""}${al?' applyAlignment="1">'+al+"</xf>":"/>"}`)};
      idx(xfs,'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>');
      const defined=[];
      const sheetXml=(s,si)=>{
        const byRow=new Map();for(const [k,c] of s.cells){const [r,col]=k.split(":").map(Number);if(!byRow.has(r))byRow.set(r,[]);byRow.get(r).push([col,c])}
        for(const r of s.rows.keys())if(!byRow.has(r))byRow.set(r,[]);
        const rows=[...byRow.keys()].sort((a,b)=>a-b).map(r=>{const R=s.rows.get(r);const cells=byRow.get(r).sort((a,b)=>a[0]-b[0]).map(([col,c])=>{
            const ref=colName(col)+r,st=styleOf(c),v=c.value;const sa=st?` s="${st}"`:"";
            if(v===null||v===undefined||v==="")return `<c r="${ref}"${sa}/>`;
            if(typeof v==="number")return isFinite(v)?`<c r="${ref}"${sa}><v>${v}</v></c>`:`<c r="${ref}"${sa}/>`;
            if(typeof v==="object"&&v.formula!==undefined){const res=v.result;
              if(typeof res==="number")return `<c r="${ref}"${sa}><f>${xe(v.formula)}</f><v>${isFinite(res)?res:0}</v></c>`;
              return `<c r="${ref}"${sa} t="str"><f>${xe(v.formula)}</f><v>${xe(res??"")}</v></c>`}
            return `<c r="${ref}"${sa} t="inlineStr"><is><t xml:space="preserve">${xe(v)}</t></is></c>`}).join("");
          return `<row r="${r}"${R&&R.height?` ht="${R.height}" customHeight="1"`:""}>${cells}</row>`}).join("");
        const cols=s.columns.length?`<cols>${s.columns.map((c,i)=>`<col min="${i+1}" max="${i+1}" width="${c.width||9}" customWidth="1"/>`).join("")}</cols>`:"";
        const ps=s.pageSetup||{},m=ps.margins||{};
        if(ps.printArea){const [a,b]=ps.printArea.split(":"),pa=parse(a),pb=parse(b);defined.push(`<definedName name="_xlnm.Print_Area" localSheetId="${si}">'${xe(s.name.replace(/'/g,"''"))}'!$${colName(pa.c)}$${pa.r}:$${colName(pb.c)}$${pb.r}</definedName>`)}
        return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">`
          +`<sheetPr>${ps.fitToPage?'<pageSetUpPr fitToPage="1"/>':""}</sheetPr><sheetViews><sheetView workbookViewId="0"${s.grid?"":' showGridLines="0"'}${si===0?' tabSelected="1"':""}/></sheetViews><sheetFormatPr defaultRowHeight="15"/>${cols}<sheetData>${rows}</sheetData>`
          +(s.merges.length?`<mergeCells count="${s.merges.length}">${s.merges.map(x=>`<mergeCell ref="${x}"/>`).join("")}</mergeCells>`:"")
          +(ps.horizontalCentered?'<printOptions horizontalCentered="1"/>':"")
          +`<pageMargins left="${m.left??0.5}" right="${m.right??0.5}" top="${m.top??0.5}" bottom="${m.bottom??0.5}" header="${m.header??0.3}" footer="${m.footer??0.3}"/>`
          +`<pageSetup paperSize="${ps.paperSize||9}" orientation="${ps.orientation||"portrait"}"${ps.fitToPage?` fitToWidth="${ps.fitToWidth??1}" fitToHeight="${ps.fitToHeight??0}"`:""}/></worksheet>`};
      const sheets=this.sheets.map(sheetXml);
      const styles=`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">${numFmts.length?`<numFmts count="${numFmts.length}">${numFmts.map((f,i)=>`<numFmt numFmtId="${164+i}" formatCode="${xe(f)}"/>`).join("")}</numFmts>`:""}<fonts count="${fonts.length}">${fonts.join("")}</fonts><fills count="${fills.length}">${fills.join("")}</fills><borders count="${borders.length}">${borders.join("")}</borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="${xfs.length}">${xfs.join("")}</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`;
      const files=[
        ["[Content_Types].xml",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>${this.sheets.map((s,i)=>`<Override PartName="/xl/worksheets/sheet${i+1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`],
        ["_rels/.rels",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`],
        ["docProps/core.xml",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:creator>SolaRays</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString().replace(/\.\d+Z$/,"Z")}</dcterms:created></cp:coreProperties>`],
        ["xl/workbook.xml",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><bookViews><workbookView activeTab="0"/></bookViews><sheets>${this.sheets.map((s,i)=>`<sheet name="${xe(s.name)}" sheetId="${i+1}" r:id="rId${i+1}"/>`).join("")}</sheets>${defined.length?`<definedNames>${defined.join("")}</definedNames>`:""}<calcPr calcId="191029" fullCalcOnLoad="1"/></workbook>`],
        ["xl/_rels/workbook.xml.rels",`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${this.sheets.map((s,i)=>`<Relationship Id="rId${i+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i+1}.xml"/>`).join("")}<Relationship Id="rId${this.sheets.length+1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`],
        ["xl/styles.xml",styles],
        ...sheets.map((x,i)=>[`xl/worksheets/sheet${i+1}.xml`,x])];
      return zip(files);
    }
  }
  return {Workbook};
})();

/* ---------- quotation (.xlsx in the SolaRays template) ---------- */
const loadExcel=()=>Promise.resolve(MiniXLSX);
const brandOf=s=>s&&s.Brand&&s.Brand!=="-"?String(s.Brand).replace(/^SunGrow$/i,"Sungrow"):"";
function pvText(r){if(!r.pv)return "—";const sp=String(r.pv.s["Specs / Description"]);const type=/n-?type/i.test(sp)?(/bifacial/i.test(sp)?" N-Type Bifacial":" N-Type"):"";const series=(sp.match(/^(\w+)\s+Series/i)||[])[1];
  return `${r.qty} pcs ${brandOf(r.pv.s)}${series?" "+series:""} ${r.W}W${type} (${r.kwp.toFixed(2)} kWp)${r.pv.wy?`, ${r.pv.wy}-yr product warranty`:""}`}
function invText(r){if(!r.inv)return "—";const sp=String(r.inv.s["Specs / Description"]).replace(/^Hybrid,\s*/i,"");const model=sp.split(",")[0].trim();
  return `${/^[A-Z]/.test(model)&&model.toLowerCase().startsWith(brandOf(r.inv.s).toLowerCase())?model:(brandOf(r.inv.s)+" "+model).trim()} ${r.inv.kw}kW Hybrid${r.inv.wy?`, ${r.inv.wy}-yr warranty`:""}`}
function batText(r){if(!r.bat)return "None (can be added later)";const b=brandOf(r.bat.s),k=r.bat.kwh;
  return `${r.batN} ${r.batN>1?"pcs":"pc"} ${b} LiFePO4 ${k} kWh${r.batN>1?` (${(Math.round(r.batKWh*100)/100)} kWh total)`:""}${r.bat.wy?`, ${r.bat.wy}-yr warranty`:""}`}
const townFrom=a=>{const parts=String(a||"").split(",").map(x=>x.trim().replace(/\s*\b\d{4}\b\s*$/,"")).filter(x=>x&&!/^philippines$/i.test(x));const city=parts.find(x=>/\bcity\b/i.test(x));return city||townOf({Address:a||""})||""};
const ymd=d=>`${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}`;
const dmy=iso=>{const d=new Date(iso+"T00:00:00");return `${pad(d.getDate())}-${MON[d.getMonth()]}-${d.getFullYear()}`};
function nextQuoteNo(){const d=new Date(),k="solarays.qseq."+ymd(d);const n=num(lsGet(k))+1;return {no:`SR-${d.getFullYear()}-${pad(d.getMonth()+1)}${pad(d.getDate())}-${pad(n)}`,k,n}}

function openQuote(){
  const c=clientByNo(C.client);
  const list=PKGS.length?PKGS.map((p,i)=>({label:p.label,cfg:p.cfg,sel:p.sel!==false})):[{label:"Solar Package",cfg:{},sel:true}];
  const sel=list.filter(x=>x.sel);if(!sel.length){toast("Pick at least one package");return}
  const qn=nextQuoteNo();
  const prevSent=c&&/Sent|Revised/.test(c.Quotation||"");
  const f=(id,label,val,extra="")=>`<div class="f"><label for="${id}">${label}</label><input id="${id}" value="${esc(val??"")}" ${extra}></div>`;
  $("#modalRoot").innerHTML=`<div class="sheet" id="sheet"><div class="box" role="dialog" aria-modal="true" aria-labelledby="qTitle">
    <div class="hd"><div><h2 id="qTitle">Create quotation</h2><div class="idl">${sel.length} package${sel.length>1?"s":""} · SolaRays template · Excel file</div></div><button class="x" type="button" data-close aria-label="Close">×</button></div>
    <form class="form" id="qForm">
      ${f("q-no","Quotation no.",qn.no+(prevSent?"-R2":""))}${f("q-date","Date",today(),'type="date"')}
      <div class="f"><label for="q-pay">Payment</label><select id="q-pay"><option ${C.payment!=="GSIS loan"?"selected":""}>Cash</option><option value="GSIS" ${C.payment==="GSIS loan"?"selected":""}>GSIS loan (100%)</option></select></div>
      ${f("q-valid","Valid for (days)",C.payment==="GSIS loan"?60:30,'inputmode="numeric"')}
      ${f("q-name","Client name",c?c.Client:"")}${f("q-phone","Contact no.",c?c.Phone:"")}
      <div class="f full">${`<label for="q-addr">Installation address</label><input id="q-addr" value="${esc(c?c.Address:"")}">`}</div>
      ${f("q-du","Electric utility",C.utility||(c&&c.DU)||"")}<div class="f q-gsis"><label for="q-loan">Tentative GSIS loan (₱)</label><input id="q-loan" inputmode="decimal" value="${esc(C.gsisLoan||"")}" placeholder="optional"></div>
      <div class="f full"><label>Packages in this quotation</label><div class="qpk">${list.map((p,i)=>{const r=calcRun({...C,...p.cfg});return `<div class="qpkrow"><input type="checkbox" data-qsel="${i}" ${p.sel?"checked":""} aria-label="Include ${esc(p.label)}"><input type="text" data-qlab="${i}" value="${esc(p.label)}" aria-label="Package name"><span>${esc(sysText(r))}</span><b>${peso(r.contract)}</b></div>`}).join("")}</div></div>
      <div class="f full"><label class="chk"><input type="checkbox" id="q-drive" ${c&&cfg.api?"checked":""} ${c?"":"disabled"}> Save a copy to the client's files in Google Drive and mark the client as Quoted</label></div>
      <p class="note full">The client page shows equipment, estimates and prices only. Supplier names and your costs stay on the Internal Costing sheet.</p>
    </form>
    <div class="actions"><div></div><div class="hrow"><button class="btn btn-line" type="button" data-close>Cancel</button><button class="btn btn-sol" type="button" id="qGo">Download Excel</button></div></div></div></div>`;
  document.documentElement.classList.add("modal-open");
  const close=()=>{closeModal=null;$("#modalRoot").innerHTML="";document.documentElement.classList.remove("modal-open")};closeModal=close;
  const sync=()=>{const g=$("#q-pay").value==="GSIS";document.querySelectorAll(".q-gsis").forEach(x=>x.style.display=g?"":"none")};
  $("#q-pay").addEventListener("change",()=>{const g=$("#q-pay").value==="GSIS";$("#q-valid").value=g?60:30;sync()});sync();
  $("#sheet").addEventListener("click",e=>{if(e.target.id==="sheet"||e.target.closest("[data-close]"))close()});
  $("#qGo").onclick=async()=>{
    const btn=$("#qGo");
    const chosen=list.map((p,i)=>({...p,label:(document.querySelector(`[data-qlab="${i}"]`).value||p.label).trim(),sel:document.querySelector(`[data-qsel="${i}"]`).checked})).filter(p=>p.sel);
    if(!chosen.length){toast("Pick at least one package");return}
    const q={no:$("#q-no").value.trim()||qn.no,date:$("#q-date").value||today(),valid:Math.max(1,num($("#q-valid").value)||30),gsis:$("#q-pay").value==="GSIS",
      name:$("#q-name").value.trim(),phone:$("#q-phone").value.trim(),addr:$("#q-addr").value.trim(),du:$("#q-du").value.trim(),loan:num($("#q-loan").value)};
    btn.disabled=true;btn.textContent="Building…";
    try{
      const runs=chosen.map(p=>({label:p.label,r:calcRun({...C,...p.cfg})}));
      const blob=await buildQuotation(q,runs);
      const fname=`SolaRays_Quotation_${(q.name||"Client").replace(/[^\w]+/g,"_").replace(/^_|_$/g,"")}_${q.no}.xlsx`;
      const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=fname;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},4000);
      if(q.no.startsWith(qn.no))lsSet(qn.k,String(qn.n));
      if(c&&$("#q-drive")&&$("#q-drive").checked){
        btn.textContent="Saving to Drive…";
        try{const data=await new Promise((res,rej)=>{const fr=new FileReader();fr.onload=()=>res(String(fr.result).split(",")[1]);fr.onerror=rej;fr.readAsDataURL(blob)});
          const j=await api({action:"upload",sheet:TABS.Clients.sheet,label:c.Client||"",data,mime:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",name:fname});
          const pk=runs.map((x,i)=>({name:`Package ${i+1} — ${x.label}: ${sysText(x.r)}`,price:x.r.contract}));
          const rec={...c,Photos:[...photoIds(c.Photos),j.id].join(","),Quotation:prevSent?"Revised":"Sent","Quote Date":q.date,Packages:serializePackages(pk),"Package Costs":serializePackages(runs.map((x,i)=>({name:pk[i].name,price:Math.round(x.r.totalCost)}))),"Quoted Price":pk.length===1?pk[0].price:Math.min(...pk.map(p=>p.price))};
          if(rec["Chosen Package"]&&!pk.some(p=>p.name===rec["Chosen Package"]))rec["Chosen Package"]="";
          await saveRecord("Clients",rec,false,c);toast("Quotation saved to "+(c.Client||"client"))}
        catch(e){toast("Downloaded, but saving to Drive failed: "+errMsg(e))}
      }else toast("Quotation downloaded");
      close();
    }catch(e){toast(e.message||"Could not build the quotation");btn.disabled=false;btn.textContent="Download Excel"}
  };
}

async function buildQuotation(q,runs){
  const ExcelJS=await loadExcel();
  const wb=new ExcelJS.Workbook();wb.creator="SolaRays";wb.created=new Date();
  const NAVY="FF1D2A3A",GOLD="FFFFB612",SOFT="FFF3F5F8",SLATE="FF26374B",GREEN="FF1B7F3B";
  const thin={style:"thin",color:{argb:"FFBFC6D1"}},box={top:thin,left:thin,bottom:thin,right:thin};
  const font=(o={})=>({name:"Arial",size:10,color:{argb:"FF1D2A3A"},...o});
  const fill=c=>({type:"pattern",pattern:"solid",fgColor:{argb:c}});
  const n=runs.length,gsis=q.gsis,IC="Internal Costing";
  const anyMob=runs.some(x=>x.r.mobFee>0);
  const town=townFrom(q.addr)||"the site";
  const bill=runs[0].r.bill,kwh=runs[0].r.monthlyKWh;
  const validDate=(()=>{const d=new Date(q.date+"T00:00:00");d.setDate(d.getDate()+q.valid-1);return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`})();
  const PESO='"₱"#,##0.00',PESO0='"₱"#,##0';

  /* ---------- Internal Costing (built first so the client page can point at its cells) ---------- */
  const ws=wb.addWorksheet("Quotation",{views:[{showGridLines:false}]});
  const ic=wb.addWorksheet(IC,{views:[{showGridLines:false}]});
  ic.columns=[{width:16},{width:50},{width:26},{width:7},{width:14},{width:16},{width:16},{width:16}];
  ic.mergeCells("A1:H1");Object.assign(ic.getCell("A1"),{value:`Internal Costing · ${q.no} · ${q.name||"Client"} · not for the client`});
  ic.getCell("A1").font=font({size:14,bold:true,color:{argb:"FFFFFFFF"}});ic.getCell("A1").fill=fill(NAVY);ic.getRow(1).height=26;ic.getCell("A1").alignment={vertical:"middle",indent:1};
  const input=(cell,v,fmt)=>{const x=ic.getCell(cell);x.value=v;x.fill=fill("FFFFFF00");x.font=font({bold:true,color:{argb:"FF0000FF"}});if(fmt)x.numFmt=fmt;x.border=box};
  const lab=(cell,t,o)=>{const x=ic.getCell(cell);x.value=t;x.font=font(o)};
  lab("B3","Inputs (yellow cells can be changed)",{bold:true});
  const IN={kwh:"F4",bill:"F5",yl:"F6",yh:"F7",loan:"F8",rate:"F9",months:"F10"};
  const yLo=runs[0].r.psh*runs[0].r.pr*Math.min(...SEASON),yHi=runs[0].r.psh*runs[0].r.pr*Math.max(...SEASON);
  [["Monthly consumption (kWh)",IN.kwh,Math.round(kwh),"#,##0"],["Monthly bill (₱)",IN.bill,Math.round(bill*100)/100,PESO],["Yield, low month (kWh per kWp per day)",IN.yl,Math.round(yLo*100)/100,"0.00"],["Yield, high month (kWh per kWp per day)",IN.yh,Math.round(yHi*100)/100,"0.00"]]
    .forEach(([t,cell,v,f])=>{lab("B"+cell.slice(1),t);input(cell,v,f)});
  if(gsis){[["Client's tentative GSIS loan (₱, blank if unknown)",IN.loan,q.loan||null,PESO],["GSIS interest per year",IN.rate,0.05,"0%"],["GSIS term (months)",IN.months,60,"0"]].forEach(([t,cell,v,f])=>{lab("B"+cell.slice(1),t);input(cell,v,f)})}
  let row=12;const P=[];
  runs.forEach(({label,r},i)=>{
    const t=row;ic.mergeCells(`A${t}:H${t}`);const tc=ic.getCell("A"+t);tc.value=`Package ${i+1} — ${label} · ${sysText(r)}`;tc.font=font({bold:true,size:11});tc.fill=fill(GOLD);ic.getRow(t).height=20;tc.alignment={vertical:"middle",indent:1};
    const h=ic.getRow(t+1);["Category","Item / specs","Supplier","Qty","Unit cost","Direct cost","Client price","SolaRays profit"].forEach((x,k)=>{const cl=h.getCell(k+1);cl.value=x;cl.font=font({bold:true,color:{argb:"FFFFFFFF"}});cl.fill=fill(SLATE);cl.border=box;cl.alignment={horizontal:k>2?"center":"left",vertical:"middle"}});
    const lines=[...r.lines.map(l=>[l.cat,l.item,l.supplier||"no price in Suppliers",l.qty,l.unit]),
      ["Labor",`Crew ${num(r.c.installers)} installer + ${num(r.c.helpers)} helpers${num(r.c.headRate)?" + head":""}, ${r.days} days`,"",r.days,r.days?r.labor/r.days:0],
      ["Mobilization",`Fuel, vehicle${r.lodging?", lodging":""}${r.meals?", meals":""} · ${num(r.c.km)} km one way${r.mobFee?" (billed to client separately)":" (absorbed)"}`,"",1,Math.round(r.mobCost)],
      ["Other","Small parts allowance (AC wire, conduit, MC4, grounding rod)","",1,num(r.c.smallParts)],
      ["Other","Permits & misc","",1,num(r.c.misc)],
      ["Other",`Warranty reserve (${num(r.c.warranty)}% of materials)`,"",1,Math.round(r.warrantyRes)]].filter(x=>x[4]>0||x[0]!=="Other");
    const first=t+2,last=first+lines.length-1,totR=last+1,priceR=last+2;
    lines.forEach((l,k)=>{const rr=first+k,R=ic.getRow(rr);
      l.forEach((v,j)=>{const cl=R.getCell(j+1);cl.value=v;cl.font=font();cl.border=box;if(j===4)cl.numFmt=PESO;if(j===3)cl.alignment={horizontal:"center"}});
      R.getCell(6).value={formula:`D${rr}*E${rr}`,result:l[3]*l[4]};
      R.getCell(7).value={formula:`F${rr}*$G$${priceR}/$F$${totR}`,result:r.totalCost?l[3]*l[4]*r.price/r.totalCost:0};
      R.getCell(8).value={formula:`G${rr}-F${rr}`,result:r.totalCost?l[3]*l[4]*(r.price/r.totalCost-1):0};
      [6,7,8].forEach(j=>{R.getCell(j).numFmt=PESO;R.getCell(j).font=font();R.getCell(j).border=box});
      if(r.lines[k]&&r.lines[k].missing)R.getCell(3).font=font({color:{argb:"FFC0392B"},italic:true});
    });
    const T=ic.getRow(totR);T.getCell(2).value="Total job cost (materials, labor, mobilization, other)";
    T.getCell(6).value={formula:`SUM(F${first}:F${last})`,result:r.totalCost};T.getCell(7).value={formula:`SUM(G${first}:G${last})`,result:r.price};T.getCell(8).value={formula:`SUM(H${first}:H${last})`,result:r.price-r.totalCost};
    for(let j=1;j<=8;j++){const cl=T.getCell(j);cl.fill=fill(SOFT);cl.font=font({bold:true});cl.border=box;if(j>5)cl.numFmt=PESO}
    const PR=ic.getRow(priceR);PR.getCell(2).value="PACKAGE PRICE TO CLIENT (set here)";PR.getCell(2).font=font({bold:true});input("G"+priceR,r.price,PESO);
    /* summary for this package */
    let s=priceR+2;const S={};
    const put=(key,t,formula,result,fmt)=>{lab("B"+s,t);const cl=ic.getCell("F"+s);cl.value=formula?{formula,result}:result;cl.numFmt=fmt;cl.font=font({bold:key==="contract"||key==="profit"});cl.border=box;S[key]="F"+s;s++};
    put("kwp","PV system (kWp)",null,Math.round(r.kwp*100)/100,"0.00");
    put("bat","Battery (kWh)",null,Math.round(r.batKWh*100)/100,"0.00");
    put("lo","Est. daily harvest, low (kWh)",`F${s-2}*${IN.yl}`,r.kwp*yLo,"0.0");
    put("hi","Est. daily harvest, high (kWh)",`F${s-3}*${IN.yh}`,r.kwp*yHi,"0.0");
    put("off","Est. bill offset (energy model, capped)",null,Math.round(r.offset*1000)/1000,"0%");
    put("sav","Est. monthly savings",`${S.off}*${IN.bill}`,r.savings,PESO);
    put("mob","Mobilization fee to client",null,r.mobFee,PESO);
    put("contract","Total contract price",`G${priceR}+${S.mob}`,r.contract,PESO);
    put("profit","Gross profit",`${S.contract}-F${totR}`,r.profit,PESO);
    put("margin","Margin",`IF(${S.contract}=0,0,${S.profit}/${S.contract})`,r.margin,"0.0%");
    put("pay","Payback (years)",`IF(${S.sav}=0,0,${S.contract}/(${S.sav}*12))`,r.payback,"0.0");
    const k10=r.savings?r.cum[10]/r.savings:120;
    put("s10","Est. 10-year savings",`${S.sav}*${k10.toFixed(4)}`,r.cum[10],PESO);
    put("roi","10-year ROI",`IF(${S.contract}=0,0,(${S.s10}-${S.contract})/${S.contract})`,r.contract?(r.cum[10]-r.contract)/r.contract:0,"0%");
    if(gsis){const L=q.loan||r.contract;put("amort","Est. monthly amortization (GSIS)",`IF(${IN.loan}="",${S.contract},${IN.loan})*(1+${IN.rate}*${IN.months}/12)/${IN.months}`,L*(1+0.05*60/12)/60,PESO)}
    P.push({S,priceR,r,label});row=s+2;
  });
  lab("B"+row,"Notes",{bold:true});
  ["Savings use the energy model: daytime use is covered first, then the battery covers the night; the result is capped at the max bill offset for fixed charges and cloudy days.",
   "Changing a yellow price recalculates profit, payback and the client page. Changing equipment needs a new quotation from the calculator.",
   `Rate increase assumed: ${num(C.escalate)}%/yr. Panel aging: ${num(C.aging)}%/yr.`].forEach((t,k)=>{ic.mergeCells(`B${row+1+k}:H${row+1+k}`);lab("B"+(row+1+k),t,{italic:true,color:{argb:"FF777777"},size:9})});
  ic.pageSetup={orientation:"landscape",fitToPage:true,fitToWidth:1,fitToHeight:0,paperSize:9,margins:{left:0.4,right:0.4,top:0.4,bottom:0.4,header:0.2,footer:0.2}};

  /* ---------- Quotation (client page) ---------- */
  ws.columns=[{width:26},{width:30},{width:30},{width:30},{width:2}];
  const merge=(r,a="A",b="D")=>ws.mergeCells(`${a}${r}:${b}${r}`);
  const band=(r,h,o)=>{for(const c of"ABCD")ws.getCell(c+r).fill=fill(o||NAVY);if(h)ws.getRow(r).height=h};
  band(1,40);band(2,16);band(3,16);merge(1);merge(2);merge(3);
  Object.assign(ws.getCell("A1"),{value:"SolaRays"});ws.getCell("A1").font=font({size:30,bold:true,color:{argb:GOLD}});ws.getCell("A1").alignment={vertical:"middle",indent:1};
  ws.getCell("A2").value="Solar Supply & Installation  ·  Purok 2A, Brgy. Poblacion, Monkayo, Davao de Oro 8805";
  ws.getCell("A3").value="0962 603 3092  ·  solarays@outlook.ph  ·  facebook.com/SolaRaysDavao";
  ["A2","A3"].forEach(a=>{ws.getCell(a).font=font({color:{argb:"FFFFFFFF"}});ws.getCell(a).alignment={indent:1,vertical:"middle"}});
  let r=6;merge(r);ws.getCell("A"+r).value=gsis?"OFFICIAL SOLAR SYSTEM QUOTATION":"SOLAR SYSTEM QUOTATION";ws.getCell("A"+r).font=font({size:16,bold:true});ws.getRow(r).height=22;r++;
  if(gsis){merge(r);ws.getCell("A"+r).value="For GSIS Ginhawa Solar Energy Loan (GSEL) application";ws.getCell("A"+r).font=font({bold:true,color:{argb:GREEN}});r++}
  r++;
  const info=(a,b,c,d,wide)=>{const R=ws.getRow(r);R.getCell(1).value=a;R.getCell(1).font=font({bold:true});
    if(wide){merge(r,"B","D");R.getCell(2).value=b}else{R.getCell(2).value=b;R.getCell(3).value=c;R.getCell(3).font=font({bold:true});R.getCell(3).alignment={horizontal:"right",indent:1};R.getCell(4).value=d}
    for(const k of wide?[2,3,4]:[2,4]){R.getCell(k).border={bottom:thin};if(!R.getCell(k).font||!R.getCell(k).font.bold)R.getCell(k).font=font()}
    R.height=18;r++};
  const kwhTxt=`${Math.round(kwh).toLocaleString("en-PH")} kWh`,billTxt=peso(bill);
  info("Quotation No.",q.no,"Date",dmy(q.date));
  info("Client name",q.name,"Valid until",dmy(validDate));
  if(gsis){info("Mobile no.",q.phone,"Payment","GSIS Loan (100%)");info("Installation address",q.addr,0,0,true);info("Electric utility",q.du,0,0,true);info("Monthly consumption",kwhTxt,"Latest bill",billTxt)}
  else{info("Address",q.addr,"Contact no.",q.phone);info("Monthly consumption",kwhTxt,"Monthly bill",billTxt)}
  r++;
  const ref=(i,k)=>`'${IC}'!${P[i].S[k]}`;
  const txtH=(t,w)=>Math.max(21.75,Math.ceil(String(t).length*1.08/w)*13+8);
  const spansFor=k=>k===1?[["B","D"]]:k===2?[["B","B"],["C","D"]]:[["B","B"],["C","C"],["D","D"]];
  const chunks=[];for(let i=0;i<n;i+=3)chunks.push(runs.slice(i,i+3).map((x,j)=>({...x,i:i+j})));
  chunks.forEach((ch,ci)=>{
    if(ci>0){r++;merge(r);const smaller=ch.every(x=>x.r.contract<Math.min(...chunks[0].map(y=>y.r.contract)));ws.getCell("A"+r).value=smaller?"Smaller systems — lower upfront cost":"More package options";ws.getCell("A"+r).font=font({size:12,bold:true});ws.getRow(r).height=20;r++}
    const sp=spansFor(ch.length),wChars=ch.length===1?88:ch.length===2?(j=>j?60:30):30;
    const W=j=>typeof wChars==="function"?wChars(j):wChars;
    const rowOf=(label,vals,o={})=>{const R=ws.getRow(r);const a=R.getCell(1);a.value=label;a.font=font({bold:true,...(o.labFont||{})});a.fill=fill(o.labFill||SOFT);a.border=box;a.alignment={vertical:"middle",wrapText:true,indent:1};
      let hmax=o.h||21.75;
      vals.forEach((v,j)=>{const [s1,s2]=sp[j];if(s1!==s2)ws.mergeCells(`${s1}${r}:${s2}${r}`);const cl=ws.getCell(s1+r);cl.value=v;cl.font=font(o.font||{});if(o.fill)cl.fill=fill(o.fill);cl.alignment={vertical:"middle",horizontal:o.align||"center",wrapText:true};if(o.fmt)cl.numFmt=o.fmt;
        for(const c of"BCD".slice("BCD".indexOf(s1),"BCD".indexOf(s2)+1))ws.getCell(c+r).border=box;
        const shown=typeof v==="object"&&v?String(v.result??""):String(v??"");hmax=Math.max(hmax,txtH(shown,W(j)))});
      R.height=hmax;r++};
    rowOf(ch.length===1?"Item":"",ch.map(x=>n===1?`${x.label} — ${sysText(x.r)}`:`Package ${x.i+1} — ${x.label}`),{h:30,font:{size:12,bold:true,color:{argb:GOLD}},fill:NAVY,labFill:NAVY,labFont:{color:{argb:GOLD},size:12}});
    rowOf("System size",ch.map(x=>sysText(x.r)),{font:{bold:true}});
    rowOf("Savings goal",ch.map(x=>x.r.goalText));
    rowOf("PV Module",ch.map(x=>pvText(x.r)));
    rowOf("Inverter",ch.map(x=>invText(x.r)));
    rowOf("Battery",ch.map(x=>batText(x.r)));
    rowOf("Accessories",ch.map(()=>"Complete mounting, wiring & safety protection set"));
    rowOf("Installation",ch.map(()=>n===1?"Included — installation, testing, commissioning and monitoring app setup":"Included"));
    if(!anyMob)rowOf("Mobilization fee",ch.map(()=>"FREE"),{font:{bold:true,color:{argb:GREEN}}});
    rowOf("Est. daily harvest",ch.map(x=>({formula:`TEXT(${ref(x.i,"lo")},"0")&" – "&TEXT(${ref(x.i,"hi")},"0")&" kWh/day"`,result:`${Math.round(x.r.kwp*yLo)} – ${Math.round(x.r.kwp*yHi)} kWh/day`})));
    rowOf("Est. monthly harvest",ch.map(x=>({formula:`TEXT(${ref(x.i,"lo")}*30,"#,##0")&" – "&TEXT(${ref(x.i,"hi")}*30,"#,##0")&" kWh/month"`,result:`${Math.round(x.r.kwp*yLo*30).toLocaleString("en-PH")} – ${Math.round(x.r.kwp*yHi*30).toLocaleString("en-PH")} kWh/month`})));
    rowOf("Est. monthly savings",ch.map(x=>({formula:`"₱"&TEXT(${ref(x.i,"sav")},"#,##0")&" / month ("&TEXT(${ref(x.i,"off")},"0%")&" of bill)"`,result:`₱${Math.round(x.r.savings).toLocaleString("en-PH")} / month (${Math.round(x.r.offset*100)}% of bill)`})));
    rowOf(gsis?"Payback period":"Payback period (ROI)",ch.map(x=>({formula:`TEXT(${ref(x.i,"pay")},"0.0")&" years"`,result:`${x.r.payback.toFixed(1)} years`})));
    rowOf("Est. 10-year savings",ch.map(x=>({formula:`"₱"&TEXT(${ref(x.i,"s10")},"#,##0")&"  (ROI "&TEXT(${ref(x.i,"roi")},"0%")&")"`,result:`₱${Math.round(x.r.cum[10]).toLocaleString("en-PH")}  (ROI ${Math.round(x.r.contract?(x.r.cum[10]-x.r.contract)/x.r.contract*100:0)}%)`})));
    if(anyMob){
      rowOf("Package price",ch.map(x=>({formula:`'${IC}'!G${P[x.i].priceR}`,result:x.r.price})),{fmt:PESO,font:{bold:true}});
      rowOf("Mobilization fee",ch.map(x=>x.r.mobFee?{formula:ref(x.i,"mob"),result:x.r.mobFee}:"FREE"),{fmt:PESO});
      rowOf("",ch.map(x=>x.r.mobFee?`Covers crew transport, equipment hauling${x.r.lodging?", lodging":""}${x.r.meals?" and meals":""} to ${town} and return`:"No mobilization fee"),{font:{italic:true,size:8.5,color:{argb:"FF777777"}},labFill:"FFFFFFFF"});
      rowOf("TOTAL CONTRACT PRICE",ch.map(x=>({formula:ref(x.i,"contract"),result:x.r.contract})),{h:31.5,fmt:PESO,fill:GOLD,font:{size:13,bold:true},labFill:GOLD,labFont:{size:11}});
    }else rowOf("PACKAGE PRICE",ch.map(x=>({formula:ref(x.i,"contract"),result:x.r.contract})),{h:31.5,fmt:PESO,fill:GOLD,font:{size:13,bold:true},labFill:GOLD,labFont:{size:11}});
  });
  r++;
  const sect=t=>{r++;merge(r);band(r,22);const cl=ws.getCell("A"+r);cl.value=t;cl.font=font({size:12,bold:true,color:{argb:"FFFFFFFF"}});cl.alignment={vertical:"middle",indent:1};r++};
  const para=(a,t,o={})=>{const R=ws.getRow(r);R.getCell(1).value=a;R.getCell(1).font=font({bold:true});R.getCell(1).alignment={vertical:"top",wrapText:true};merge(r,"B","D");const cl=ws.getCell("B"+r);cl.value=t;cl.font=font(o);cl.alignment={vertical:"top",wrapText:true};
    const len=typeof t==="object"&&t?String(t.result):String(t);R.height=Math.max(21.75,Math.ceil(len*1.1/88)*13+8,Math.ceil(String(a).length/24)*13+8);r++};
  const utility=q.du||"the electric utility";
  if(gsis){
    sect("GSIS Ginhawa Solar Energy Loan (GSEL)");
    para("Maximum allowable loan","Up to ₱500,000 under the GSEL program · 5% interest per year · payable up to 5 years (60 monthly installments) · no service fee. The actual loanable amount per member is set by GSIS.");
    para("Client's tentative loan",q.loan?{formula:`"₱"&TEXT('${IC}'!${IN.loan},"#,##0")&" applied loan amount (per GSIS Touch tentative computation)"`,result:`₱${Math.round(q.loan).toLocaleString("en-PH")} applied loan amount (per GSIS Touch tentative computation)`}:"To be confirmed through the client's GSIS Touch tentative computation.");
    if(q.loan){
      const parts=runs.map((x,i)=>{const c=ref(i,"contract"),L=`'${IC}'!${IN.loan}`,pre=n>1?`"Package ${i+1}: "&`:"";
        return {f:`${pre}IF(${c}<=${L},"Within the client's tentative GSIS loan amount (₱"&TEXT(${L}-${c},"#,##0")&" below)","Exceeds the client's tentative loan amount by ₱"&TEXT(${c}-${L},"#,##0"))`,
          res:(n>1?`Package ${i+1}: `:"")+(x.r.contract<=q.loan?`Within the client's tentative GSIS loan amount (₱${Math.round(q.loan-x.r.contract).toLocaleString("en-PH")} below)`:`Exceeds the client's tentative loan amount by ₱${Math.round(x.r.contract-q.loan).toLocaleString("en-PH")}`)}});
      para("This quotation vs. loan",{formula:parts.map(p=>p.f).join(`&CHAR(10)&`),result:parts.map(p=>p.res).join("\n")});
      para("Est. monthly amortization",{formula:`"₱"&TEXT(${ref(0,"amort")},"#,##0")&" / month for 60 months (estimate only; final amount per GSIS loan disclosure)"`,result:`₱${Math.round(q.loan*1.25/60).toLocaleString("en-PH")} / month for 60 months (estimate only; final amount per GSIS loan disclosure)`});
    }else{
      const parts=runs.map((x,i)=>({f:`${n>1?`"Package ${i+1}: "&`:""}"₱"&TEXT(${ref(i,"amort")},"#,##0")&" / month"`,res:`${n>1?`Package ${i+1}: `:""}₱${Math.round(x.r.contract*1.25/60).toLocaleString("en-PH")} / month`}));
      para("Est. monthly amortization",{formula:parts.map(p=>p.f).join(`&"   ·   "&`)+`&" for 60 months if the full price is borrowed (estimate only; final amount per GSIS loan disclosure)"`,result:parts.map(p=>p.res).join("   ·   ")+" for 60 months if the full price is borrowed (estimate only; final amount per GSIS loan disclosure)"});
    }
    para("Who may apply","Qualified GSIS pensioners (Pensioner GSEL) and active GSIS members with at least 3 years of government service — subject to GSIS eligibility rules and loan evaluation (existing GSIS loans may be deducted from the loan proceeds).");
    para("Free GSIS insurance","The financed solar system is insured for 3 years against fire, earthquake, lightning and typhoon at no extra cost, once proof of completed installation is submitted to GSIS.");
    sect("GSIS Loan and Installation Process");
    [["Step 1 · Quotation",`SolaRays issues this official quotation based on the client's ${utility} bill. Client signs the Conforme below.`],
     ["Step 2 · Apply in GSIS Touch","Client files the GSEL application in the GSIS Touch mobile app and uploads this signed quotation and the other documents GSIS requires."],
     ["Step 3 · GSIS approval","GSIS evaluates and approves the loan. Approved proceeds are released by GSIS directly to the client (member's registered account)."],
     ["Step 4 · 100% payment","Client pays SolaRays 100% of the Total Contract Price from the loan proceeds. SolaRays issues an official receipt."],
     ["Step 5 · Immediate mobilization",`Once payment is received, SolaRays immediately confirms stock and mobilizes the installation crew and equipment to the site${town!=="the site"?" in "+town:""}.`],
     ["Step 6 · Installation & turnover","Installation, testing, commissioning, monitoring app setup and owner orientation — 5–10 working days from mobilization to turnover, depending on weather."],
     ["Step 7 · Proof to GSIS","SolaRays provides the certificate of completion, official receipt and installation photos. Client submits these to GSIS as proof of completed installation (this activates the free insurance)."],
     ["Step 8 · Loan repayment","Client repays GSIS through monthly amortization (salary or pension deduction) as set by GSIS."]].forEach(([a,t])=>para(a,t));
  }
  /* warranty sentence from the brands actually quoted */
  const uniq=a=>[...new Map(a.filter(Boolean).map(x=>[x[0],x])).values()];
  const pvW=uniq(runs.map(x=>x.r.pv&&x.r.pv.wy?[brandOf(x.r.pv.s),x.r.pv.wy]:null));
  const invW=uniq(runs.map(x=>x.r.inv&&x.r.inv.wy?[brandOf(x.r.inv.s),x.r.inv.wy]:null));
  const batW=uniq(runs.map(x=>x.r.bat&&x.r.bat.wy?[brandOf(x.r.bat.s),x.r.bat.wy]:null));
  const yrs=(list,unit)=>list.map(([b,y])=>`${b} ${y} years`).join("; ");
  const warranty=`PV modules: ${pvW.length?"manufacturer product warranty ("+pvW.map(([b,y])=>`${b} up to ${y} years`).join("; ")+")":"manufacturer product warranty"}. Inverter: ${invW.length?yrs(invW):"manufacturer warranty"}.${batW.length?" Batteries: "+yrs(batW)+".":""} Workmanship/installation warranty: 1 year from turnover. Warranty does not cover damage from misuse, unauthorized repairs, flooding, fire, lightning or other force majeure.`;
  const tile=runs.some(x=>/tile/i.test(x.r.c.roof));
  const excl=`Roof repair or structural reinforcement, PV cable runs beyond 30 meters,${tile?"":" tile-roof mounting hardware,"} and net-metering application fees${q.du?" with "+q.du:""} (assistance available on request).`;
  const est=`Savings, payback and ROI use the latest bill (${kwhTxt}, ${billTxt}) at current rates, with ${num(C.escalate)?num(C.escalate)+"% yearly rate increase":"no rate increase"} assumed and savings capped at ${num(C.maxOffset)}% for fixed charges and cloudy days. Harvest figures are estimates; actual output varies with weather, shading and panel orientation.`;
  sect("Terms, Warranty and Disclaimer");
  if(gsis){
    para("Payment terms","100% of the Total Contract Price, paid by the client from the GSIS loan proceeds once released. No downpayment is required before GSIS approval. Mobilization starts immediately after payment is received.");
    para("Warranty",warranty);
    para("Installation period","5–10 working days from mobilization until turnover, starting once payment is received and stock is confirmed. Actual days depend on weather (rain and typhoon days are not counted), roof type and condition, and site access; roof work stops during rain for safety.");
    para("Sizing basis",`The system size and quoted price are based on the client's consumption of ${kwhTxt} per month. Additional loads added in the future (e.g., more air-conditioners, freezers, water heaters or equipment) will raise consumption and lower the percentage of savings; the system can be expanded with more panels or battery at additional cost.`);
    para("Inclusions",`Site assessment, supply and delivery of all listed equipment${town!=="the site"?" to "+town:""}, mounting and wiring, grounding and surge protection, testing and commissioning, monitoring app setup, owner orientation, and completion documents for GSIS.`);
    para("Exclusions",excl);
    para("Estimates",est+" GSIS loan terms are as published by GSIS and may change; GSIS decides final approval, loan amount and amortization.");
    para("Validity",`This quotation is valid for ${q.valid} days from the quotation date to allow for GSIS processing. If loan release goes beyond this date, SolaRays will reconfirm equipment prices and stock before mobilization.`);
  }else{
    para("Warranty",warranty);
    para("Installation period","5–10 working days after downpayment and stock confirmation. Actual days depend on system size, roof type and condition, site access, and weather; roof work stops during rain for safety.");
    para("Inclusions","Free site inspection, supply and delivery of all listed equipment, mounting and wiring, grounding and surge protection, testing and commissioning, monitoring app setup, and owner orientation.");
    para("Exclusions",excl);
    para("Payment terms","Cash or GSIS Solar Loan (government employees). Cash: 50% downpayment upon acceptance of the agreement; remaining 50% upon completion, testing and turnover.");
    para("Estimates",est+` Prices are valid for ${q.valid} days from the quotation date.`);
  }
  r+=2;
  const sig=ws.getRow(r);sig.getCell(1).value="Conforme:";sig.getCell(1).font=font({bold:true});sig.getCell(2).value="______________________________";sig.getCell(3).value="Prepared by:";sig.getCell(3).font=font({bold:true});sig.getCell(3).alignment={horizontal:"right",indent:1};sig.getCell(4).value="______________________________";
  r++;ws.getCell("B"+r).value=q.name||"";ws.getCell("B"+r).font=font({bold:true});ws.getCell("D"+r).value="Raymund Reyes";ws.getCell("D"+r).font=font({bold:true});
  r++;ws.getCell("B"+r).value="Client signature over printed name / Date";ws.getCell("B"+r).font=font({size:8.5,color:{argb:"FF777777"}});ws.getCell("D"+r).value="General Manager, SolaRays";ws.getCell("D"+r).font=font({size:8.5,color:{argb:"FF777777"}});
  r+=2;merge(r);band(r,20,GOLD);ws.getCell("A"+r).value="SolaRays  ·  0962 603 3092  ·  solarays@outlook.ph  ·  Free consultation  ·  GSIS loan accepted";ws.getCell("A"+r).font=font({bold:true,size:9});ws.getCell("A"+r).alignment={horizontal:"center",vertical:"middle"};
  ws.pageSetup={orientation:"portrait",paperSize:9,fitToPage:true,fitToWidth:1,fitToHeight:!gsis&&n<=3?1:0,printArea:`A1:D${r}`,horizontalCentered:true,margins:{left:0.4,right:0.4,top:0.4,bottom:0.4,header:0.2,footer:0.2}};
  const buf=await wb.xlsx.writeBuffer();
  return new Blob([buf],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
}

/* calculator events */
const PK_NAMES=["Premium","Standard","Value","Starter","Basic","Option 6"];
const C_RERENDER=new Set(["mode","goal","priceBy","payment","sunPreset","client","histBasis","panel","inverter","battery","mobMode"]);
const pkCfg=()=>{const o={};CALC_KEYS_EQUIP.forEach(k=>o[k]=C[k]);return o};
document.addEventListener("input",e=>{
  const el=e.target;if(!el.closest||!el.closest("#main"))return;
  if(el.dataset.c2h!==undefined){C.hist[+el.dataset.c2h]=el.value;calcRefresh();return}
  if(el.dataset.pkname!==undefined){const p=PKGS[+el.dataset.pkname];if(p){p.label=el.value;saveCalc()}return}
  const k=el.dataset.c2;if(!k||el.tagName==="SELECT")return;
  C[k]=el.value;
  if(k==="dayShare"){const w=el.closest(".c2day");w.style.setProperty("--d",el.value+"%");w.querySelector(".dl").textContent=`Day ${el.value}%`;w.querySelector(".nl").textContent=`Night ${100-el.value}%`;const h=w.parentElement.querySelector(".c2h");if(h)h.textContent=`day ${el.value}% · night ${100-el.value}%`}
  if(k==="psh")C.sunPreset=(SUN_PRESETS.find(p=>p[1]===num(el.value))||["Custom"])[0];
  calcRefresh();
});
document.addEventListener("change",e=>{
  const el=e.target;if(el.tagName!=="SELECT"||!el.dataset.c2||!el.closest("#main"))return;
  const k=el.dataset.c2;
  if(k==="client"){applyClient(el.value);C.editing=null;render();return}
  C[k]=el.value;
  if(k==="sunPreset"){const p=SUN_PRESETS.find(x=>x[0]===el.value);if(p&&p[1])C.psh=p[1]}
  if(k==="panel")C.panelQty="";if(k==="battery")C.batQty="";
  saveCalc();if(C_RERENDER.has(k))render();else calcRefresh();
});
document.addEventListener("click",e=>{
  const t=e.target.closest("[data-c2view],[data-c2pane],[data-c2lt],[data-c2ct],[data-c2seg],[data-c2act],[data-pksel],[data-pkedit],[data-pkup],[data-pkrm]");if(!t||!t.closest("#main"))return;
  const d=t.dataset;
  if(d.c2view){C.view=d.c2view;saveCalc();render();return}
  if(d.c2pane){C.pane=d.c2pane;saveCalc();render();return}
  if(d.c2lt){C.lt=d.c2lt;saveCalc();render();return}
  if(d.c2ct){C.ct=d.c2ct;saveCalc();render();return}
  if(d.c2seg){C[d.c2seg]=d.v;saveCalc();render();return}
  if(d.pksel){const p=PKGS[+d.pksel];p.sel=p.sel===false;saveCalc();render();return}
  if(d.pkedit){const i=+d.pkedit,p=PKGS[i];Object.assign(C,p.cfg);C.editing=i;C.view="size";C.lt="equip";saveCalc();render();toast(`Editing ${p.label}. Tap Update package when done.`);return}
  if(d.pkup){const i=+d.pkup;if(i>0){[PKGS[i-1],PKGS[i]]=[PKGS[i],PKGS[i-1]];saveCalc();render()}return}
  if(d.pkrm){const i=+d.pkrm;PKGS.splice(i,1);if(C.editing===i)C.editing=null;saveCalc();render();return}
  const a=d.c2act;
  if(a==="pkadd"){if(PKGS.length>=6){toast("Up to 6 packages");return}{const nk=pkgKey(calcRun({...C,...pkCfg()}));const same=PKGS.find(p=>pkgKey(pkgRun(p))===nk);if(same){toast(`Same panels, inverter and battery as ${same.label}. Change a component first.`);return}}const used=new Set(PKGS.map(p=>p.label));PKGS.push({label:PK_NAMES.find(x=>!used.has(x))||"Package "+(PKGS.length+1),cfg:pkCfg(),sel:true});saveCalc();if(C.view!=="pkg")toast(`Added as package ${PKGS.length}`);render();return}
  if(a==="pkupdate"){const p=PKGS[C.editing];if(p){p.cfg=pkCfg();toast(p.label+" updated")}C.editing=null;C.view="pkg";saveCalc();render();return}
  if(a==="pkcancel"){C.editing=null;saveCalc();render();return}
  if(a==="suggest"){if(PKGS.length&&!confirmReplace())return;suggestPackages(+((document.querySelector("[data-sugn]")||{}).value)||Math.max(3,PKGS.length));C.view="pkg";render();return}
  if(a==="items"){showItems();return}
  if(a==="saveclient"){saveCalcToClient();return}
  if(a==="quote"){openQuote();return}
});
let pkConfirmT=0;
function confirmReplace(){const now=Date.now();if(now-pkConfirmT<4000)return true;pkConfirmT=now;toast("Tap Suggest again to replace your packages");return false}

/* ---------- events ---------- */
function finishEdit(){state.edit=false;storeLayout(true);toast(state.settingsOK&&cfg.api?"Dashboard saved":"Dashboard saved on this device")}
function openClient(row){state.view="clients";state.sel=row;state.detail=true;lsSet("solarays.view","clients");render()}
document.addEventListener("click",async e=>{
  const T=e.target;
  /* dashboard editing */
  const da=T.closest("[data-dact]");
  if(da){const a=da.dataset.dact;
    if(a==="edit"){state.edit=true;render();return}
    if(a==="done"){finishEdit();render();return}
    if(a==="add"){openAddPanel();return}
    if(a==="reset"){state.layout=cleanLayout(null);state.page=0;storeLayout(false);render();toast("Back to the default layout");return}}
  const sz=T.closest("[data-size]");if(sz){const [id,d]=sz.dataset.size.split(":");setSize(id,+d);return}
  const mv=T.closest("[data-move]");if(mv){const [k,id,d]=mv.dataset.move.split(":");moveItem(k,id,+d);return}
  const rm=T.closest("[data-remove]");if(rm){const [k,id]=rm.dataset.remove.split(":");removeItem(k,id);return}
  if(state.edit&&T.closest("#dash")&&!T.closest("[data-period]"))return;
  const cb=T.closest("[data-cb]");if(cb){e.stopPropagation();state.cb=cb.dataset.cb;lsSet("srv2.cb",state.cb);render();return}
  /* clients */
  const pc=T.closest("[data-pick-client]");if(pc){state.sel=+pc.dataset.pickClient;state.detail=true;render();const d=$(".cdetail");if(d)d.scrollTop=0;return}
  const oc=T.closest("[data-client]");if(oc){openClient(+oc.dataset.client);return}
  const cg=T.closest("[data-client-go]");if(cg){const c=state.data.Clients.find(x=>x._row==cg.dataset.row);if(!c)return;
    if(cg.dataset.clientGo==="project")openForm("Projects",null,projectPrefill(c));
    else openForm("Calendar",null,{Client:c.Client,"Client No.":c["S.N."],Location:c.Address||"",Date:today()});return}
  const cc=T.closest("[data-calc-client]");if(cc){applyClient(cc.dataset.calcClient);C.editing=null;C.view="size";C.pane="inputs";saveCalc();state.view="calc";lsSet("solarays.view","calc");render();return}
  const of=T.closest("[data-open-file]");if(of&&!T.closest(".sheet,.viewer")){openFile(of.dataset.openFile,of.dataset.kind);return}
  /* navigation and lists */
  const v=T.closest("[data-view]");if(v){if(state.edit)finishEdit();state.view=v.dataset.view;if(state.view==="clients")state.detail=false;lsSet("solarays.view",state.view);render();return}
  const n=T.closest("[data-new]");if(n){const pre=n.dataset.date?{Date:n.dataset.date}:n.dataset.new==="Suppliers"&&state.supplier?{Supplier:state.supplier}:undefined;openForm(n.dataset.new,null,pre);return}
  const ed=T.closest("[data-edit]");if(ed){const rec=state.data[ed.dataset.edit].find(r=>r._row==ed.dataset.row);if(rec)openForm(ed.dataset.edit,rec);return}
  const g=T.closest("[data-goto]");if(g&&g.dataset.goto){const i=g.dataset.goto.indexOf(":");const vw=i<0?g.dataset.goto:g.dataset.goto.slice(0,i),fl=i<0?"":g.dataset.goto.slice(i+1);
    state.view=vw;if(fl&&["clients","projects","suppliers"].includes(vw))state.filter[vw]=fl;if(vw==="clients"){state.detail=false;state.sel=null}lsSet("solarays.view",vw);render();return}
  const pv=T.closest("[data-pview]");if(pv){state.pview=pv.dataset.pview;lsSet("solarays.pview",state.pview);render();return}
  const f=T.closest("[data-filter]");if(f){state.filter[f.dataset.filter]=f.dataset.val;render();return}
  const cn=T.closest("[data-cal-nav]");if(cn){const d=+cn.dataset.calNav;if(!d){state.cal.sel=today();state.cal.month=today().slice(0,7)}else{const [y,m]=state.cal.month.split("-").map(Number);const nd=new Date(y,m-1+d,1);state.cal.month=`${nd.getFullYear()}-${pad(nd.getMonth()+1)}`;state.cal.sel=state.cal.month+"-01"}render();return}
  const ct=T.closest("[data-cal-type]");if(ct){const ty=ct.dataset.calType,h=state.cal.hidden;state.cal.hidden=h.includes(ty)?h.filter(x=>x!==ty):[...h,ty];lsSet("solarays.calHidden",JSON.stringify(state.cal.hidden));render();return}
  const cd=T.closest("[data-cal-day]");if(cd&&!T.closest("[data-edit]")){state.cal.sel=cd.dataset.calDay;if(cd.dataset.calDay.slice(0,7)!==state.cal.month)state.cal.month=cd.dataset.calDay.slice(0,7);render();return}
  const pr=T.closest("[data-period]");if(pr){state.period=pr.dataset.period;lsSet("solarays.period",state.period);render();return}
  const a=T.closest("[data-act]");
  if(a&&a.dataset.act==="refresh"){state.sheetIds={};state.error=null;loadAll();return}
  if(a&&a.dataset.act==="retry"){retryFailed();return}
  if(a&&a.dataset.act==="back"){state.detail=false;render();return}
  if(a&&a.dataset.act==="reload"){navigator.serviceWorker&&navigator.serviceWorker.getRegistration().then(r=>{if(r&&r.waiting)r.waiting.postMessage({type:"skip"});else location.reload()});return}
});
document.addEventListener("change",e=>{const f=e.target.closest&&e.target.closest("[data-pkf]");if(!f)return;const [i,k]=f.dataset.pkf.split(":");const p=PKGS[+i];if(!p)return;p.cfg=Object.assign({},p.cfg,{[k]:f.value});if(k==="battery")p.cfg.batQty="";if(k==="panel")p.cfg.panelQty="";saveCalc();render()});
document.addEventListener("change",e=>{const s=e.target.closest&&e.target.closest("[data-supfilter]");if(!s)return;state.supplier=s.value;lsSet("srv2.supplier",state.supplier);render()});
document.addEventListener("input",e=>{
  const s=e.target.closest("[data-search]");if(!s)return;
  const k=s.dataset.search;state.q[k]=s.value;const pos=s.selectionStart;render();const el=document.getElementById("q-"+k);if(el){el.focus();try{el.setSelectionRange(pos,pos)}catch(x){}}
});
document.addEventListener("keydown",e=>{const gt=e.target.matches&&e.target.matches("[data-goto][tabindex]");if(gt&&(e.key==="Enter"||e.key===" ")){e.preventDefault();e.target.click();return}const day=e.target.closest&&e.target.closest("[data-cal-day]");if(day&&(e.key==="Enter"||e.key===" ")){e.preventDefault();day.click();return}if(e.key!=="Escape")return;const v=document.querySelector(".viewer");if(v){v.remove();return}if(closeModal)closeModal();else if(state.edit){finishEdit();render()}else $("#modalRoot").innerHTML=""});
/* Dashboard and Calculator never zoom: block pinch and trackpad zoom there (forms and photos can still zoom). */
const lockedNow=()=>state.view==="home"||state.view==="calc";
["gesturestart","gesturechange"].forEach(t=>document.addEventListener(t,e=>{if(lockedNow()&&!e.target.closest(".sheet,.viewer"))e.preventDefault()},{passive:false}));
document.addEventListener("touchmove",e=>{if(e.touches&&e.touches.length>1&&lockedNow()&&!e.target.closest(".sheet,.viewer"))e.preventDefault()},{passive:false});
window.addEventListener("wheel",e=>{if(e.ctrlKey&&lockedNow())e.preventDefault()},{passive:false});
/* Re-fit when the screen turns or the window changes size */
const setVH=()=>document.documentElement.style.setProperty("--vh",(window.visualViewport?visualViewport.height:innerHeight)+"px");
let lastGrid="",lastNarrow=innerWidth<700,resizeT;
window.addEventListener("resize",()=>{setVH();clearTimeout(resizeT);resizeT=setTimeout(()=>{
  const gNow=innerWidth+"x"+innerHeight,nNow=innerWidth<700;
  if(state.view==="home"&&gNow!==lastGrid){lastGrid=gNow;if(!drag)render();return}
  if(state.view==="clients"&&nNow!==lastNarrow){lastNarrow=nNow;render();return}
  lastGrid=gNow;lastNarrow=nNow;
  if(state.view==="home"||state.view==="calc")drawCharts(false);if(state.view==="home")fitLists()},150)});
$("#refreshBtn").onclick=()=>{state.sheetIds={};state.error=null;loadAll()};
$("#settingsBtn").onclick=()=>{if(state.edit)finishEdit();state.view="settings";render()};

/* ---------- boot: show the saved copy at once, then refresh from the sheet ---------- */
setVH();
loadCalc();
{const p=lsGet("solarays.period");if(["30","12","all"].includes(p))state.period=p;if(lsGet("solarays.pview")==="board")state.pview="board";const cbv=lsGet("srv2.cb");state.supplier=lsGet("srv2.supplier")||"";if(["type","town","pay","source"].includes(cbv))state.cb=cbv}
state.cal.sel=today();state.cal.month=today().slice(0,7);try{const h=JSON.parse(lsGet("solarays.calHidden")||"[]");if(Array.isArray(h))state.cal.hidden=h}catch(e){}
const sv=lsGet("solarays.view");if(sv&&VIEWS.some(x=>x[0]===sv))state.view=sv;
if(location.hash&&VIEWS.some(x=>x[0]===location.hash.slice(1)))state.view=location.hash.slice(1);
lastGrid=innerWidth+"x"+innerHeight;
(async()=>{
  if(cfg.api&&cfg.key){await loadCache();if(state.cached)setSync("busy","Updating…")}
  render();
  if(cfg.api&&cfg.key)loadAll();
})();
window.addEventListener("online",()=>{if(cfg.api&&cfg.key&&(state.error||state.cached))loadAll()});
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"&&cfg.api&&cfg.key&&state.loaded&&!pendingWrites&&!$("#modalRoot").innerHTML)loadAll({silent:true})});

/* ---------- installable app: works from the home screen and opens instantly ---------- */
if("serviceWorker" in navigator&&location.protocol==="https:"){
  window.addEventListener("load",()=>{
    navigator.serviceWorker.register("sw.js").then(reg=>{
      const offer=()=>{if(document.querySelector(".updbar"))return;const b=document.createElement("div");b.className="updbar";b.innerHTML=`<span>A new version of the dashboard is ready.</span><button class="btn btn-sol btn-sm" type="button" data-act="reload">Reload</button>`;document.body.appendChild(b)};
      if(reg.waiting&&navigator.serviceWorker.controller)offer();
      reg.addEventListener("updatefound",()=>{const w=reg.installing;if(w)w.addEventListener("statechange",()=>{if(w.state==="installed"&&navigator.serviceWorker.controller)offer()})});
    }).catch(()=>{});
    let reloaded=false;navigator.serviceWorker.addEventListener("controllerchange",()=>{if(reloaded)return;reloaded=true;location.reload()});
  });
}
})();
