require(["config"],function(){
	require(["jquery","template","cookie","header","footer","prolist"],function($,template,cookie,header,footer,prolist){
		//水果蔬菜
		
		$("#header").load("/html/component/header.html #headerTop",function(){
			header.nav();
			header.cookie();
			header.shopNum();
			header.fixTop();
		});
		$("#footer").load("/html/component/footer.html");
		$("#container").load("/html/component/prolist.html",function(){

			var pro=new Promise(function(resolve,reject){
				prolist.ajax("fruitvegetable");
				resolve();
			});
			pro.then(function(){
					prolist.addToCart();
			});

			// $.ajax({
			// 	method: "post",
			// 	dataType: "json",
			// 	url: "http://localhost/EGu365/api/fruitvegetable.php",
			// 	success: function(res){
			// 		//console.log(res);
			//
			// 		//console.log(res.product);
			// 		var html=template("pro-template",{products: res.product});
			// 		//console.log(html);
			// 		$("#prolist").html(html);
			// 		$("#prolist li .proId").css({"display":"none"});
			// 		prolist.addToCart();
			// 	}
			// });
		});

	});
});
