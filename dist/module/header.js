"use strict";define(["jquery"],function(i){function e(){}return e.prototype.nav=function(){i("#selectNav").mouseenter(function(){i("#selectNav ul").css({display:"block","z-index":5})}).mouseleave(function(){i("#selectNav ul").css({display:"none"})})},e.prototype.banner=function(){i(function(){var e=i("#headerBanner ul li"),n=i("#headerBanner ol li"),o=0,c=!1,s=null;n.click(function(){c||(c=!0,i(this).addClass("ac").siblings().removeClass("ac"),e.eq(o).fadeOut(),o=i(this).index(),e.eq(o).fadeIn(function(){c=!1}))}),i("#goPrev").click(function(){c||(c=!0,e.eq(o).fadeOut(),--o<0&&(o=e.length-1),n.eq(o).addClass("ac").siblings().removeClass("ac"),e.eq(o).fadeIn(function(){c=!1}))}),i("#goNext").click(function(){c||(c=!0,e.eq(o).fadeOut(),++o>=e.length&&(o=0),n.eq(o).addClass("ac").siblings().removeClass("ac"),e.eq(o).fadeIn(function(){c=!1}))}),i("#headerBanner").hover(function(){clearInterval(s)},function e(){return s=setInterval(function(){i("#goNext").trigger("click")},2e3),e}())})},e.prototype.cookie=function(){var e=i.cookie("username");null!=e&&i("#welcome").text(function(){return"欢迎您，"+e}),i("#unlog").click(function(){i.cookie("login","",{expires:-1,path:"/"}),i.cookie("username","",{expires:-1,path:"/"}),i("#log,#reg").css({display:"block"}),i("#welcome,#username,#unlog").css({display:"none"})}),i.cookie("login")?(i("#log,#reg").css({display:"none"}),i("#welcome,#username,#unlog").css({display:"block"})):(i("#log,#reg").css({display:"block"}),i("#welcome,#username,#unlog").css({display:"none"}))},e.prototype.shopNum=function(){var e=i.cookie("cart");if(null!=e){var n=JSON.parse(e).reduce(function(e,n){return e+n.num},0);i("#shoppingCount").html(n)}},new e});