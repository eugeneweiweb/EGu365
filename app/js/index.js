require(["config"],function(){
	require(["jquery","cookie","header","footer"],function($,cookie,header,footer){
		$("#header").load("/html/component/header.html",function(){
			header.nav();
			header.banner();
			header.cookie();
			header.shopNum();
			header.fixTop();
		});
		$("#footer").load("/html/component/footer.html");
		$("#fruitVegetable").load("/html/component/indexList1.html");

		//本周爆品
		function thisWeek(){
			var imgs=$("#thisWeek div artical ul li");
			var tabimgs=$("#thisWeek div aside ul li");
			var index=0;
			var flag=false;

			tabimgs.mouseenter(function(){
				
				$(this).addClass("ac").siblings().removeClass("ac");
				imgs.eq(index).stop().fadeOut();
				index=$(this).index();
				imgs.eq(index).stop().fadeIn();
				
			});
		}
		thisWeek();
	});
});
