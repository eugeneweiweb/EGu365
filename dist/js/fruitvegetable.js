"use strict";require(["config"],function(){require(["jquery","template","cookie","header","footer","prolist"],function(o,e,t,n,r,i){o("#header").load("/html/component/header.html #headerTop",function(){n.nav(),n.cookie(),n.shopNum(),n.fixTop()}),o("#footer").load("/html/component/footer.html"),o("#container").load("/html/component/prolist.html",function(){new Promise(function(o,e){i.ajax("fruitvegetable"),o()}).then(function(){i.addToCart()})})})});