(self.webpackChunk=self.webpackChunk||[]).push([["fh-weka-theme"],{8619:()=>{!1 in window&&(window.gdprAppliesGlobally=!0),(!("cmp_id"in window)||window.cmp_id<1)&&(window.cmp_id=0),"cmp_cdid"in window||(window.cmp_cdid="2f8546476448"),"cmp_params"in window||(window.cmp_params=""),"cmp_host"in window||(window.cmp_host="c.delivery.consentmanager.net"),"cmp_cdn"in window||(window.cmp_cdn="cdn.consentmanager.net"),"cmp_proto"in window||(window.cmp_proto="https:"),"cmp_codesrc"in window||(window.cmp_codesrc="1"),window.cmp_getsupportedLangs=function(){var n=["DE","EN","FR","IT","NO","DA","FI","ES","PT","RO","BG","ET","EL","GA","HR","LV","LT","MT","NL","PL","SV","SK","SL","CS","HU","RU","SR","ZH","TR","UK","AR","BS"];if("cmp_customlanguages"in window)for(var e=0;e<window.cmp_customlanguages.length;e++)n.push(window.cmp_customlanguages[e].l.toUpperCase());return n},window.cmp_getRTLLangs=function(){var n=["AR"];if("cmp_customlanguages"in window)for(var e=0;e<window.cmp_customlanguages.length;e++)"r"in window.cmp_customlanguages[e]&&window.cmp_customlanguages[e].r&&n.push(window.cmp_customlanguages[e].l);return n},window.cmp_getlang=function(n){if("boolean"!=typeof n&&(n=!0),n&&"string"==typeof cmp_getlang.usedlang&&""!==cmp_getlang.usedlang)return cmp_getlang.usedlang;var e=window.cmp_getsupportedLangs(),p=[],i=location.hash,t=location.search,a="languages"in navigator?navigator.languages:[];if(-1!=i.indexOf("cmplang="))p.push(i.substr(i.indexOf("cmplang=")+8,2).toUpperCase());else if(-1!=t.indexOf("cmplang="))p.push(t.substr(t.indexOf("cmplang=")+8,2).toUpperCase());else if("cmp_setlang"in window&&""!=window.cmp_setlang)p.push(window.cmp_setlang.toUpperCase());else if(a.length>0)for(var c=0;c<a.length;c++)p.push(a[c]);"language"in navigator&&p.push(navigator.language),"userLanguage"in navigator&&p.push(navigator.userLanguage);var d="";for(c=0;c<p.length;c++){var o=p[c].toUpperCase();if(-1!=e.indexOf(o)){d=o;break}if(-1!=o.indexOf("-")&&(o=o.substr(0,2)),-1!=e.indexOf(o)){d=o;break}}return""==d&&"string"==typeof cmp_getlang.defaultlang&&""!==cmp_getlang.defaultlang?cmp_getlang.defaultlang:(""==d&&(d="EN"),d=d.toUpperCase())},function(){var n=document,e=n.getElementsByTagName,p=window,i="",t="_en";if("cmp_getlang"in p){if(i=p.cmp_getlang().toLowerCase(),"cmp_customlanguages"in p)for(var a=0;a<p.cmp_customlanguages.length;a++)if(p.cmp_customlanguages[a].l.toUpperCase()==i.toUpperCase()){i="en";break}t="_"+i}function c(n,e){var p="",i=(n+="=").length,t=location;if(-1!=t.hash.indexOf(n))p=t.hash.substr(t.hash.indexOf(n)+i,9999);else{if(-1==t.search.indexOf(n))return e;p=t.search.substr(t.search.indexOf(n)+i,9999)}return-1!=p.indexOf("&")&&(p=p.substr(0,p.indexOf("&"))),p}var d="cmp_proto"in p?p.cmp_proto:"https:";"http:"!=d&&"https:"!=d&&(d="https:");var o="cmp_ref"in p?p.cmp_ref:location.href;(g=n.createElement("script")).setAttribute("data-cmp-ab","1");var s=c("cmpdesign","cmp_design"in p?p.cmp_design:""),r=c("cmpregulationkey","cmp_regulationkey"in p?p.cmp_regulationkey:""),l=c("cmpgppkey","cmp_gppkey"in p?p.cmp_gppkey:""),m=c("cmpatt","cmp_att"in p?p.cmp_att:"");(g.src=d+"//"+p.cmp_host+"/delivery/cmp.php?"+("cmp_id"in p&&p.cmp_id>0?"id="+p.cmp_id:"")+("cmp_cdid"in p?"&cdid="+p.cmp_cdid:"")+"&h="+encodeURIComponent(o)+(""!=s?"&cmpdesign="+encodeURIComponent(s):"")+(""!=r?"&cmpregulationkey="+encodeURIComponent(r):"")+(""!=l?"&cmpgppkey="+encodeURIComponent(l):"")+(""!=m?"&cmpatt="+encodeURIComponent(m):"")+("cmp_params"in p?"&"+p.cmp_params:"")+(n.cookie.length>0?"&__cmpfcc=1":"")+"&l="+i.toLowerCase()+"&o="+(new Date).getTime(),g.type="text/javascript",g.async=!0,n.currentScript&&n.currentScript.parentElement)?n.currentScript.parentElement.appendChild(g):n.body?n.body.appendChild(g):(0==(_=e("body")).length&&(_=e("div")),0==_.length&&(_=e("span")),0==_.length&&(_=e("ins")),0==_.length&&(_=e("script")),0==_.length&&(_=e("head")),_.length>0&&_[0].appendChild(g));var g,_,w="js",u=c("cmpdebugunminimized","cmpdebugunminimized"in p?p.cmpdebugunminimized:0)>0?"":".min";("1"==c("cmpdebugcoverage","cmp_debugcoverage"in p?p.cmp_debugcoverage:"")&&(w="instrumented",u=""),(g=n.createElement("script")).src=d+"//"+p.cmp_cdn+"/delivery/"+w+"/cmp"+t+u+".js",g.type="text/javascript",g.setAttribute("data-cmp-ab","1"),g.async=!0,n.currentScript&&n.currentScript.parentElement)?n.currentScript.parentElement.appendChild(g):n.body?n.body.appendChild(g):(0==(_=e("body")).length&&(_=e("div")),0==_.length&&(_=e("span")),0==_.length&&(_=e("ins")),0==_.length&&(_=e("script")),0==_.length&&(_=e("head")),_.length>0&&_[0].appendChild(g))}(),window.cmp_addFrame=function(n){if(!window.frames[n])if(document.body){var e=document.createElement("iframe");e.style.cssText="display:none","cmp_cdn"in window&&"cmp_ultrablocking"in window&&window.cmp_ultrablocking>0&&(e.src="//"+window.cmp_cdn+"/delivery/empty.html"),e.name=n,e.setAttribute("title","Intentionally hidden, please ignore"),e.setAttribute("role","none"),e.setAttribute("tabindex","-1"),document.body.appendChild(e)}else window.setTimeout(window.cmp_addFrame,10,n)},window.cmp_rc=function(n){for(var e=document.cookie,p="",i=0;""!=e&&i<100;){for(i++;" "==e.substr(0,1);)e=e.substr(1,e.length);var t=e.substring(0,e.indexOf("="));if(-1!=e.indexOf(";"))var a=e.substring(e.indexOf("=")+1,e.indexOf(";"));else a=e.substr(e.indexOf("=")+1,e.length);n==t&&(p=a);var c=e.indexOf(";")+1;0==c&&(c=e.length),e=e.substring(c,e.length)}return p},window.cmp_stub=function(){var n=arguments;if(__cmp.a=__cmp.a||[],!n.length)return __cmp.a;"ping"===n[0]?2===n[1]?n[2]({gdprApplies:gdprAppliesGlobally,cmpLoaded:!1,cmpStatus:"stub",displayStatus:"hidden",apiVersion:"2.2",cmpId:31},!0):n[2](!1,!0):"getUSPData"===n[0]?n[2]({version:1,uspString:window.cmp_rc("")},!0):"getTCData"===n[0]||"addEventListener"===n[0]||"removeEventListener"===n[0]?__cmp.a.push([].slice.apply(n)):4==n.length&&!1===n[3]?n[2]({},!1):__cmp.a.push([].slice.apply(n))},window.cmp_gpp_ping=function(){return{gppVersion:"1.0",cmpStatus:"stub",cmpDisplayStatus:"hidden",supportedAPIs:["tcfca","usnat","usca","usva","usco","usut","usct"],cmpId:31}},window.cmp_gppstub=function(){var n=arguments;if(__gpp.q=__gpp.q||[],!n.length)return __gpp.q;var e=n[0],p=n.length>1?n[1]:null,i=n.length>2?n[2]:null;if("ping"===e)return window.cmp_gpp_ping();if("addEventListener"===e){__gpp.e=__gpp.e||[],"lastId"in __gpp||(__gpp.lastId=0),__gpp.lastId++;var t=__gpp.lastId;return __gpp.e.push({id:t,callback:p}),{eventName:"listenerRegistered",listenerId:t,data:!0,pingData:window.cmp_gpp_ping()}}if("removeEventListener"===e){var a=!1;__gpp.e=__gpp.e||[];for(var c=0;c<__gpp.e.length;c++)if(__gpp.e[c].id==i){__gpp.e[c].splice(c,1),a=!0;break}return{eventName:"listenerRemoved",listenerId:i,data:a,pingData:window.cmp_gpp_ping()}}return"getGPPData"===e?{sectionId:3,gppVersion:1,sectionList:[],applicableSections:[0],gppString:"",pingData:window.cmp_gpp_ping()}:"hasSection"===e||"getSection"===e||"getField"===e?null:void __gpp.q.push([].slice.apply(n))},window.cmp_msghandler=function(n){var e="string"==typeof n.data;try{var p=e?JSON.parse(n.data):n.data}catch(n){p=null}if("object"==typeof p&&null!==p&&"__cmpCall"in p){var i=p.__cmpCall;window.__cmp(i.command,i.parameter,(function(p,t){var a={__cmpReturn:{returnValue:p,success:t,callId:i.callId}};n.source.postMessage(e?JSON.stringify(a):a,"*")}))}if("object"==typeof p&&null!==p&&"__uspapiCall"in p){i=p.__uspapiCall;window.__uspapi(i.command,i.version,(function(p,t){var a={__uspapiReturn:{returnValue:p,success:t,callId:i.callId}};n.source.postMessage(e?JSON.stringify(a):a,"*")}))}if("object"==typeof p&&null!==p&&"__tcfapiCall"in p){i=p.__tcfapiCall;window.__tcfapi(i.command,i.version,(function(p,t){var a={__tcfapiReturn:{returnValue:p,success:t,callId:i.callId}};n.source.postMessage(e?JSON.stringify(a):a,"*")}),i.parameter)}if("object"==typeof p&&null!==p&&"__gppCall"in p){i=p.__gppCall;window.__gpp(i.command,(function(p,t){var a={__gppReturn:{returnValue:p,success:t,callId:i.callId}};n.source.postMessage(e?JSON.stringify(a):a,"*")}),"parameter"in i?i.parameter:null,"version"in i?i.version:1)}},window.cmp_setStub=function(n){n in window&&("function"==typeof window[n]||"object"==typeof window[n]||void 0!==window[n]&&null===window[n])||(window[n]=window.cmp_stub,window[n].msgHandler=window.cmp_msghandler,window.addEventListener("message",window.cmp_msghandler,!1))},window.cmp_setGppStub=function(n){n in window&&("function"==typeof window[n]||"object"==typeof window[n]||void 0!==window[n]&&null===window[n])||(window[n]=window.cmp_gppstub,window[n].msgHandler=window.cmp_msghandler,window.addEventListener("message",window.cmp_msghandler,!1))},window.cmp_addFrame("__cmpLocator"),"cmp_disableusp"in window&&window.cmp_disableusp||window.cmp_addFrame("__uspapiLocator"),"cmp_disabletcf"in window&&window.cmp_disabletcf||window.cmp_addFrame("__tcfapiLocator"),"cmp_disablegpp"in window&&window.cmp_disablegpp||window.cmp_addFrame("__gppLocator"),window.cmp_setStub("__cmp"),"cmp_disabletcf"in window&&window.cmp_disabletcf||window.cmp_setStub("__tcfapi"),"cmp_disableusp"in window&&window.cmp_disableusp||window.cmp_setStub("__uspapi"),"cmp_disablegpp"in window&&window.cmp_disablegpp||window.cmp_setGppStub("__gpp")}},n=>{var e;e=8619,n(n.s=e)}]);