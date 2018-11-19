require(["config"],function(){
	require(["jquery","cookie","header","footer"],function($,cookie,header,footer){
		$("#header").load("/html/component/header.html",function(){
			header.nav();
			header.banner();
			header.cookie();
			header.shopNum();
		});
		$("#footer").load("/html/component/footer.html");
		$("#fruitVegetable").load("/html/component/indexList1.html");
		
		var imgs=$("#thisWeek div artical ul li");
		var tabimgs=$("#thisWeek div aside ul li");
		var index=0;
		var flag=false;

		tabimgs.click(function(){
			//console.log(111);
			if(!flag){
				//console.log(111);
				flag=true;
				$(this).addClass("ac").siblings().removeClass("ac");
				imgs.eq(index).fadeOut();
				index=$(this).index();
				imgs.eq(index).fadeIn(function(){
					flag=false;
				});
			}
			
		});
	});
});