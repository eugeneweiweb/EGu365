require(["config"],function(){
	require(["jquery","template","cookie","header","footer"],function($,template,cookie,header,footer){
		$("#header").load("/html/component/header.html #headerTop",function(){
			header.nav();
			header.cookie();
			header.shopNum();
		});
		$("#footer").load("/html/component/footer.html");
		var str=location.search.slice(1);
		var arr=str.split("=");
		var obj={};
		obj[arr[0]]=arr[1];
		$.ajax({
			url:"http://localhost/EGu365/api/detail.php",
			data: obj,
			method:"POST",
			dataType:"json",
			success:function(res){

				//console.log(res);
				if(res.code==1){
					var str=template("detail-template",{product:res.product});
					$("#container").html(str);
				}
				$("#container").find("#proId").css({"display":"none"});

				//数量控制
				proNumCtrl();

				//放大镜
				var bigImg=$("#container").find("#bigImg"),
					magnify=$("#container").find("#magnify"),
					enlarged=$("#container").find("#enlarged"),
					enlargeimg=$("#container").find("#enlarged img");
					enlarged.css({"display":"none"});


				bigImg.mousemove(function(e){


					var _left=e.clientX-bigImg.offset().left-magnify.width()/2,
					_top=e.clientY-(bigImg.offset().top-$(window).scrollTop())-magnify.height()/2;

					//console.log(bigImg.offset().top);

					if(_left<0) _left=0;
					if(_top<0) _top=0;
					if(_left>bigImg.width()-magnify.width()) _left=bigImg.width()-magnify.width();
					if(_top>bigImg.height()-magnify.height()) _top=bigImg.height()-magnify.height();

					//console.log(_top);

					magnify.css({"display":"block"});
					enlarged.css({"display":"block"});

					magnify.css({"left":_left});
					magnify.css({"top":_top});

					enlargeimg.css({"left":-2*_left});
					enlargeimg.css({"top":-2*_top});

				});

				bigImg.mouseleave(function(e){
					magnify.css({"display":"none"});
					enlarged.css({"display":"none"});
				});
			}
		});

		function addToCart(){
			$("#container").on("click","#addToCart",function(){
				var arrcookie=new Array();
				var arrold=new Array();
				var arrnew=new Array();

				var $proid=$(this).parent().parent().parent().find("#proId").html(),
				$img=$(this).parent().parent().parent().find("#bigImg img").attr("src"),
				$name=$(this).parent().parent().parent().find("#proname").html(),
				$price=$(this).parent().parent().parent().find("#bazaarprice").html(),
				$num=$(this).parent().parent().parent().find("#numCount input").val();
				//console.log($proid);
				//console.log(typeof($proid));
				var proid=parseInt($proid);
				var num=parseInt($num);
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
						arrold[j].num=num;
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
						price: $price,
						num: $num
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
			});
		}
		addToCart();


		//数量控制
		function proNumCtrl(){
			//console.log(111);
			var num=$("#container #proDetail #numCount input");
			//console.log(num.val());
			var checkId=$("#container #proId").html();
			var str=$.cookie('cart');
			//通过cookie初始化商品数量
			if(str!=undefined){
				var json=JSON.parse(str);
				for(var i=0; i<json.length; i++){
					if(json[i].id==checkId){
						num.val(json[i].num);
					}
				}
			}

			//+按钮点击一次，商品数量加1
			$("#container #num").on("click",".add-btn",function(e){
				//console.log("++");
				var pronum=num.val();
				console.log("++前："+pronum);
				pronum++;
				console.log("++后："+pronum);
				num.val(pronum);
			});

			//-按钮点击一次，商品数量减1
			$("#container #num").on("click",".sub-btn",function(e){
				//console.log("--");
				var pronum=num.val();
				if(pronum==0){
					pronum=0;
					num.val(pronum);
				}else{
					pronum--;
					num.val(pronum);
				}
			});

		}



	});
});
