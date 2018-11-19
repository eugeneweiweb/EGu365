define(["jquery","header"],function($,header){
	function Prolist(){}

	Prolist.prototype.init=function(){
		$("#prolist").on("click",".to-cart input",function(e){
			var arrcookie=new Array();
			var arrold=new Array();
			var arrnew=new Array();
			
			var $proid=$(this).parent().parent().find(".proId").html(),
				$img=$(this).parent().parent().find(".proImg a img").attr("src"),
				$name=$(this).parent().parent().find(".proName").html(),
				$info=$(this).parent().parent().find(".proInfo").html(),
				$price=$(this).parent().parent().find(".bazaarprice").html();
			//console.log($proid);
			//console.log(typeof($proid));
			var proid=parseInt($proid);
			//console.log(proid);

			var cookieold=$.cookie('cart');

			if(cookieold!=undefined){
				var jsonold=JSON.parse(cookieold);
				//console.log("!!!")
				//console.log(jsonold);
				//console.log(jsonold.length);
				for(var i=0; i<jsonold.length; i++){
					var objold={
						id: jsonold[i].id,
						img: jsonold[i].img,
						name: jsonold[i].name,
						info: jsonold[i].info,
						price: jsonold[i].price,
						num: jsonold[i].num
					};
					arrold.push(objold);
				}
			}

			for(var j=0; j<arrold.length; j++){
				if(arrold[j].id==proid){
					//console.log("arrold:"+arrold);
					//console.log("arrold["+j+"]num:"+arrold[j].num);
					arrold[j].num++;
					//console.log("added:"+arrold[j].num);
					//console.log("j:"+j);
					break;
				}
			}
			if(j>=arrold.length){
				//console.log("不一样");
				//console.log("arrcookie.length:"+arrcookie.length);
				var objnow={
					id: $proid,
					img: $img,
					name: $name,
					info: $info,
					price: $price,
					num: 1
				};
				arrnew.push(objnow);
				//console.log("nosame");
				//console.log(arr);
				arrold=arrold.concat(arrnew);
			}
			//console.log("concat前arrcookie:"+arrcookie);
			arrcookie=arrcookie.concat(arrold);
			var str=JSON.stringify(arrcookie);
			//console.log("str:"+str);
			$.cookie('cart',str,{path:'/',expires:1});
			$("#header").load("/html/component/header.html #headerTop",function(){
				header.nav();
				header.cookie();
				header.shopNum();
			});
		});
	};
	
	return new Prolist();
});