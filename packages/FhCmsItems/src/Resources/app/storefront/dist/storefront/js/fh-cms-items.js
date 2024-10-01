/* Webpack Push */
(window.webpackJsonp=window.webpackJsonp||[]).push([["fh-cms-items"],{n7ZG:function(n,w){}},[["n7ZG","runtime"]]]);

/* Headline SVG rendering */
supportsSVG = !!document.createElementNS || !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect;

if (supportsSVG) {
    if (document.querySelector("#fallback-title") !== null) {

        fallback_title = document.querySelector("#fallback-title");
        fallback_title.setAttribute("style", "display:none;");

        title_text = fallback_title.childNodes[0].nodeValue;
        page_title = document.querySelector("#wk-page-title");

        svgDoc = document.querySelector("#svg-title");

        title = document.createElementNS('http://www.w3.org/2000/svg', "text");
        title.setAttributeNS(null, "x", '0');
        title.setAttributeNS(null, "y", '0');
        title.setAttributeNS(null, "text-anchor",  'start');

        textNode = document.createTextNode(title_text);
        svgDoc.appendChild(title);
        title.appendChild(textNode);
    }
}
