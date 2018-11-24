require(["config"],function(){
	require(["jquery","template","cookie","header","footer","prolist2"],function($,template,cookie,header,footer,prolist2){
		//肉禽奶蛋

		$("#header").load("/html/component/header.html #headerTop",function(){
			header.nav();
			header.cookie();
			header.shopNum();
			header.fixTop();
		});
		$("#footer").load("/html/component/footer.html");

		$("#container").load("/html/component/prolist.html",function(){

			var pro=new Promise(function(resolve,reject){
				prolist2.ajax();
				resolve();
			});
			pro.then(function(){
				prolist2.addToCart();
			});
		});
	});
});
