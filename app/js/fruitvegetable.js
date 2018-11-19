require(["config"],function(){
	require(["jquery","template","cookie","header","footer","prolist"],function($,template,cookie,header,footer,prolist){
		$("#header").load("/html/component/header.html #headerTop",function(){
			header.nav();
			header.cookie();
			header.shopNum();
		});
		$("#footer").load("/html/component/footer.html");
		$("#container").load("/html/component/prolist.html",function(){
			$.ajax({
				method: "post",
				dataType: "json",
				url: "http://localhost/EGu365/api/fruitvegetable.php",
				success: function(res){
					//console.log(res);

					//console.log(res.product);
					var html=template("pro-template",{products: res.product});
					//console.log(html);
					$("#prolist").html(html);
					$("#prolist li .proId").css({"display":"none"});
					prolist.init();
				}
			});
		});

	});
});