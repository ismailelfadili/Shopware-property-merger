/** Consent Manager start
if (!"gdprAppliesGlobally" in window) {window.gdprAppliesGlobally = true}
if (!("cmp_id" in window) || window.cmp_id < 1) {window.cmp_id = 0}
if (!("cmp_cdid" in window)) {window.cmp_cdid = "2f8546476448"}
if (!("cmp_params" in window)) {window.cmp_params = ""}
if (!("cmp_host" in window)) {window.cmp_host = "c.delivery.consentmanager.net"}
if (!("cmp_cdn" in window)) {window.cmp_cdn = "cdn.consentmanager.net"}
if (!("cmp_proto" in window)) {window.cmp_proto = "https:"}
if (!("cmp_codesrc" in window)) {window.cmp_codesrc = "1"}
window.cmp_getsupportedLangs = function () {
    var b = ["DE", "EN", "FR", "IT", "NO", "DA", "FI", "ES", "PT", "RO", "BG", "ET", "EL", "GA", "HR", "LV", "LT", "MT", "NL", "PL", "SV", "SK", "SL", "CS", "HU", "RU", "SR", "ZH", "TR", "UK", "AR", "BS"];
    if ("cmp_customlanguages" in window) {for (var a = 0; a < window.cmp_customlanguages.length; a++) {b.push(window.cmp_customlanguages[a].l.toUpperCase())}}
    return b
};
window.cmp_getRTLLangs       = function () {
    var a = ["AR"];
    if ("cmp_customlanguages" in window) {for (var b = 0; b < window.cmp_customlanguages.length; b++) {if ("r" in window.cmp_customlanguages[b] && window.cmp_customlanguages[b].r) {a.push(window.cmp_customlanguages[b].l)}}}
    return a
};
window.cmp_getlang           = function (j) {
    if (typeof (j) != "boolean") {j = true}
    if (j && typeof (cmp_getlang.usedlang) == "string" && cmp_getlang.usedlang !== "") {return cmp_getlang.usedlang}
    var g = window.cmp_getsupportedLangs();
    var c = [];
    var f = location.hash;
    var e = location.search;
    var a = "languages" in navigator ? navigator.languages : [];
    if (f.indexOf("cmplang=") != -1) {c.push(f.substr(f.indexOf("cmplang=") + 8, 2).toUpperCase())} else {if (e.indexOf("cmplang=") != -1) {c.push(e.substr(e.indexOf("cmplang=") + 8, 2).toUpperCase())} else {if ("cmp_setlang" in window && window.cmp_setlang != "") {c.push(window.cmp_setlang.toUpperCase())} else {if (a.length > 0) {for (var d = 0; d < a.length; d++) {c.push(a[d])}}}}}
    if ("language" in navigator) {c.push(navigator.language)}
    if ("userLanguage" in navigator) {c.push(navigator.userLanguage)}
    var h = "";
    for (var d = 0; d < c.length; d++) {
        var b = c[d].toUpperCase();
        if (g.indexOf(b) != -1) {
            h = b;
            break
        }
        if (b.indexOf("-") != -1) {b = b.substr(0, 2)}
        if (g.indexOf(b) != -1) {
            h = b;
            break
        }
    }
    if (h == "" && typeof (cmp_getlang.defaultlang) == "string" && cmp_getlang.defaultlang !== "") {return cmp_getlang.defaultlang} else {if (h == "") {h = "EN"}}
    h = h.toUpperCase();
    return h
};
(function () {
    var u = document;
    var v = u.getElementsByTagName;
    var h = window;
    var o = "";
    var b = "_en";
    if ("cmp_getlang" in h) {
        o = h.cmp_getlang().toLowerCase();
        if ("cmp_customlanguages" in h) {
            for (var q = 0; q < h.cmp_customlanguages.length; q++) {
                if (h.cmp_customlanguages[q].l.toUpperCase() == o.toUpperCase()) {
                    o = "en";
                    break
                }
            }
        }
        b = "_" + o
    }

    function x(i, e) {
        var w = "";
        i += "=";
        var s = i.length;
        var d = location;
        if (d.hash.indexOf(i) != -1) {w = d.hash.substr(d.hash.indexOf(i) + s, 9999)} else {if (d.search.indexOf(i) != -1) {w = d.search.substr(d.search.indexOf(i) + s, 9999)} else {return e}}
        if (w.indexOf("&") != -1) {w = w.substr(0, w.indexOf("&"))}
        return w
    }

    var k = ("cmp_proto" in h) ? h.cmp_proto : "https:";
    if (k != "http:" && k != "https:") {k = "https:"}
    var g = ("cmp_ref" in h) ? h.cmp_ref : location.href;
    var j = u.createElement("script");
    j.setAttribute("data-cmp-ab", "1");
    var c   = x("cmpdesign", "cmp_design" in h ? h.cmp_design : "");
    var f   = x("cmpregulationkey", "cmp_regulationkey" in h ? h.cmp_regulationkey : "");
    var r   = x("cmpgppkey", "cmp_gppkey" in h ? h.cmp_gppkey : "");
    var n   = x("cmpatt", "cmp_att" in h ? h.cmp_att : "");
    j.src   = k + "//" + h.cmp_host + "/delivery/cmp.php?" + ("cmp_id" in h && h.cmp_id > 0 ? "id=" + h.cmp_id : "") + ("cmp_cdid" in h ? "&cdid=" + h.cmp_cdid : "") + "&h=" + encodeURIComponent(g) + (c != "" ? "&cmpdesign=" + encodeURIComponent(c) : "") + (f != "" ? "&cmpregulationkey=" + encodeURIComponent(f) : "") + (r != "" ? "&cmpgppkey=" + encodeURIComponent(r) : "") + (n != "" ? "&cmpatt=" + encodeURIComponent(n) : "") + ("cmp_params" in h ? "&" + h.cmp_params : "") + (u.cookie.length > 0 ? "&__cmpfcc=1" : "") + "&l=" + o.toLowerCase() + "&o=" + (new Date()).getTime();
    j.type  = "text/javascript";
    j.async = true;
    if (u.currentScript && u.currentScript.parentElement) {u.currentScript.parentElement.appendChild(j)} else {
        if (u.body) {u.body.appendChild(j)} else {
            var t = v("body");
            if (t.length == 0) {t = v("div")}
            if (t.length == 0) {t = v("span")}
            if (t.length == 0) {t = v("ins")}
            if (t.length == 0) {t = v("script")}
            if (t.length == 0) {t = v("head")}
            if (t.length > 0) {t[0].appendChild(j)}
        }
    }
    var m = "js";
    var p = x("cmpdebugunminimized", "cmpdebugunminimized" in h ? h.cmpdebugunminimized : 0) > 0 ? "" : ".min";
    var a = x("cmpdebugcoverage", "cmp_debugcoverage" in h ? h.cmp_debugcoverage : "");
    if (a == "1") {
        m = "instrumented";
        p = ""
    }
    var j  = u.createElement("script");
    j.src  = k + "//" + h.cmp_cdn + "/delivery/" + m + "/cmp" + b + p + ".js";
    j.type = "text/javascript";
    j.setAttribute("data-cmp-ab", "1");
    j.async = true;
    if (u.currentScript && u.currentScript.parentElement) {u.currentScript.parentElement.appendChild(j)} else {
        if (u.body) {u.body.appendChild(j)} else {
            var t = v("body");
            if (t.length == 0) {t = v("div")}
            if (t.length == 0) {t = v("span")}
            if (t.length == 0) {t = v("ins")}
            if (t.length == 0) {t = v("script")}
            if (t.length == 0) {t = v("head")}
            if (t.length > 0) {t[0].appendChild(j)}
        }
    }
})();
window.cmp_addFrame   = function (b) {
    if (!window.frames[b]) {
        if (document.body) {
            var a           = document.createElement("iframe");
            a.style.cssText = "display:none";
            if ("cmp_cdn" in window && "cmp_ultrablocking" in window && window.cmp_ultrablocking > 0) {a.src = "//" + window.cmp_cdn + "/delivery/empty.html"}
            a.name = b;
            a.setAttribute("title", "Intentionally hidden, please ignore");
            a.setAttribute("role", "none");
            a.setAttribute("tabindex", "-1");
            document.body.appendChild(a)
        } else {window.setTimeout(window.cmp_addFrame, 10, b)}
    }
};
window.cmp_rc         = function (h) {
    var b = document.cookie;
    var f = "";
    var d = 0;
    while (b != "" && d < 100) {
        d++;
        while (b.substr(0, 1) == " ") {b = b.substr(1, b.length)}
        var g = b.substring(0, b.indexOf("="));
        if (b.indexOf(";") != -1) {var c = b.substring(b.indexOf("=") + 1, b.indexOf(";"))} else {var c = b.substr(b.indexOf("=") + 1, b.length)}
        if (h == g) {f = c}
        var e = b.indexOf(";") + 1;
        if (e == 0) {e = b.length}
        b = b.substring(e, b.length)
    }
    return (f)
};
window.cmp_stub       = function () {
    var a   = arguments;
    __cmp.a = __cmp.a || [];
    if (!a.length) {return __cmp.a} else {if (a[0] === "ping") {if (a[1] === 2) {a[2]({gdprApplies : gdprAppliesGlobally, cmpLoaded : false, cmpStatus : "stub", displayStatus : "hidden", apiVersion : "2.2", cmpId : 31}, true)} else {a[2](false, true)}} else {if (a[0] === "getUSPData") {a[2]({version : 1, uspString : window.cmp_rc("")}, true)} else {if (a[0] === "getTCData") {__cmp.a.push([].slice.apply(a))} else {if (a[0] === "addEventListener" || a[0] === "removeEventListener") {__cmp.a.push([].slice.apply(a))} else {if (a.length == 4 && a[3] === false) {a[2]({}, false)} else {__cmp.a.push([].slice.apply(a))}}}}}}
};
window.cmp_gpp_ping   = function () {return {gppVersion : "1.0", cmpStatus : "stub", cmpDisplayStatus : "hidden", supportedAPIs : ["tcfca", "usnat", "usca", "usva", "usco", "usut", "usct"], cmpId : 31}};
window.cmp_gppstub    = function () {
    var a   = arguments;
    __gpp.q = __gpp.q || [];
    if (!a.length) {return __gpp.q}
    var g = a[0];
    var f = a.length > 1 ? a[1] : null;
    var e = a.length > 2 ? a[2] : null;
    if (g === "ping") {return window.cmp_gpp_ping()} else {
        if (g === "addEventListener") {
            __gpp.e = __gpp.e || [];
            if (!("lastId" in __gpp)) {__gpp.lastId = 0}
            __gpp.lastId++;
            var c = __gpp.lastId;
            __gpp.e.push({id : c, callback : f});
            return {eventName : "listenerRegistered", listenerId : c, data : true, pingData : window.cmp_gpp_ping()}
        } else {
            if (g === "removeEventListener") {
                var h   = false;
                __gpp.e = __gpp.e || [];
                for (var d = 0; d < __gpp.e.length; d++) {
                    if (__gpp.e[d].id == e) {
                        __gpp.e[d].splice(d, 1);
                        h = true;
                        break
                    }
                }
                return {eventName : "listenerRemoved", listenerId : e, data : h, pingData : window.cmp_gpp_ping()}
            } else {if (g === "getGPPData") {return {sectionId : 3, gppVersion : 1, sectionList : [], applicableSections : [0], gppString : "", pingData : window.cmp_gpp_ping()}} else {if (g === "hasSection" || g === "getSection" || g === "getField") {return null} else {__gpp.q.push([].slice.apply(a))}}}
        }
    }
};
window.cmp_msghandler = function (d) {
    var a = typeof d.data === "string";
    try {var c = a ? JSON.parse(d.data) : d.data} catch (f) {var c = null}
    if (typeof (c) === "object" && c !== null && "__cmpCall" in c) {
        var b = c.__cmpCall;
        window.__cmp(b.command, b.parameter, function (h, g) {
            var e = {__cmpReturn : {returnValue : h, success : g, callId : b.callId}};
            d.source.postMessage(a ? JSON.stringify(e) : e, "*")
        })
    }
    if (typeof (c) === "object" && c !== null && "__uspapiCall" in c) {
        var b = c.__uspapiCall;
        window.__uspapi(b.command, b.version, function (h, g) {
            var e = {__uspapiReturn : {returnValue : h, success : g, callId : b.callId}};
            d.source.postMessage(a ? JSON.stringify(e) : e, "*")
        })
    }
    if (typeof (c) === "object" && c !== null && "__tcfapiCall" in c) {
        var b = c.__tcfapiCall;
        window.__tcfapi(b.command, b.version, function (h, g) {
            var e = {__tcfapiReturn : {returnValue : h, success : g, callId : b.callId}};
            d.source.postMessage(a ? JSON.stringify(e) : e, "*")
        }, b.parameter)
    }
    if (typeof (c) === "object" && c !== null && "__gppCall" in c) {
        var b = c.__gppCall;
        window.__gpp(b.command, function (h, g) {
            var e = {__gppReturn : {returnValue : h, success : g, callId : b.callId}};
            d.source.postMessage(a ? JSON.stringify(e) : e, "*")
        }, "parameter" in b ? b.parameter : null, "version" in b ? b.version : 1)
    }
};
window.cmp_setStub    = function (a) {
    if (!(a in window) || (typeof (window[a]) !== "function" && typeof (window[a]) !== "object" && (typeof (window[a]) === "undefined" || window[a] !== null))) {
        window[a]            = window.cmp_stub;
        window[a].msgHandler = window.cmp_msghandler;
        window.addEventListener("message", window.cmp_msghandler, false)
    }
};
window.cmp_setGppStub = function (a) {
    if (!(a in window) || (typeof (window[a]) !== "function" && typeof (window[a]) !== "object" && (typeof (window[a]) === "undefined" || window[a] !== null))) {
        window[a]            = window.cmp_gppstub;
        window[a].msgHandler = window.cmp_msghandler;
        window.addEventListener("message", window.cmp_msghandler, false)
    }
};
window.cmp_addFrame("__cmpLocator");
if (!("cmp_disableusp" in window) || !window.cmp_disableusp) {window.cmp_addFrame("__uspapiLocator")}
if (!("cmp_disabletcf" in window) || !window.cmp_disabletcf) {window.cmp_addFrame("__tcfapiLocator")}
if (!("cmp_disablegpp" in window) || !window.cmp_disablegpp) {window.cmp_addFrame("__gppLocator")}
window.cmp_setStub("__cmp");
if (!("cmp_disabletcf" in window) || !window.cmp_disabletcf) {window.cmp_setStub("__tcfapi")}
if (!("cmp_disableusp" in window) || !window.cmp_disableusp) {window.cmp_setStub("__uspapi")}
if (!("cmp_disablegpp" in window) || !window.cmp_disablegpp) {window.cmp_setGppStub("__gpp")}
/* Consent Manager end */
