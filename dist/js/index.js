"use strict";require(["config"],function(){require(["jquery","cookie","header","footer"],function(e,o,t,i){var n,a,l;e("#header").load("/html/component/header.html",function(){t.nav(),t.banner(),t.cookie(),t.shopNum(),t.fixTop()}),e("#footer").load("/html/component/footer.html"),e("#fruitVegetable").load("/html/component/indexList1.html"),n=e("#thisWeek div artical ul li"),a=e("#thisWeek div aside ul li"),l=0,a.mouseenter(function(){e(this).addClass("ac").siblings().removeClass("ac"),n.eq(l).stop().fadeOut(),l=e(this).index(),n.eq(l).stop().fadeIn()})})});