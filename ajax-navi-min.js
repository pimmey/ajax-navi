!function(){"use strict";function e(e){n.removeClass("current-page");for(var o=0,r=n.length;o<r;o++){var t=$(n[o]);t.attr("href")===e&&t.addClass("current-page")}}function o(r,n,l){var i=r,u=i.replace(/#\//,"");return Logger.debug("fullHref",i),Logger.debug("noHashHref",u),i===t?void Logger.warn("Same page, not loading anything."):(t=i,0===u.length&&(u="home"),e(i),void $.ajax({url:"pages/"+u+".html"}).done(function(e){l?window.history.pushState(null,null,i):window.history.replaceState(null,null,i),document.title=u.charAt(0).toUpperCase()+u.slice(1),a.html(e),$("body").css("background",n)}).fail(function(e){Logger.error("ajax.fail",e),o("#/404",g["#/404"],!0)}))}function r(){var e=window.location,r=e.hash;Logger.debug("location",e),r.length>0?(Logger.debug("hash",r),o(r,g[r],!1)):(r="#/",o(r,g[r],!1))}for(var t,a=$("#main"),n=$(".ajax-link"),g={"#/404":"lightgray"},l=0,i=n.length;l<i;l++){var u=$(n[l]);g[u.attr("href")]=u.data("bg-color")}Logger.debug("linkColors",g),n.on("click",function(e){e.preventDefault(),Logger.debug("#",$(this).attr("href").indexOf("#"));var r,t=$(this).attr("href");t.indexOf("#")!==-1&&(r=$(this).data("bg-color"),Logger.debug("bg-color",r),o(t,r,!0))}),$(window).on("load popstate",function(e){Logger.info("popstate",e),r()})}();