define(["jquery","template"],function($,template){
	function Prolist(){}


	Prolist.prototype.ajax=function(phpname){

		var count=5;//每页的数据条数
		var index=1;//当前页
		var allPage;//总页数

		//页面一加载就获取第一页的数据
		getData(1);

		$("#pageBtn").on("click","input",function(){
			//console.log($(this).attr("class"));
			if($(this).attr("class")==="homepage"){
				//设置index为1，将页面跳转到第一页
				index=1;
				getData(index);
			}
			if($(this).attr("class")==="prevpage"){
				//当index为1时，就在当前页，否则index--，页面跳转到上一页
				if(index===1) return;
				else getData(--index);
			}
			if($(this).attr("class")==="nextpage"){
				//当index为总页面数时，index不再增加就在最后一页，否则index++，跳转到下一页
				if(index===allPage) return;
				else getData(++index);
			}
			if($(this).attr("class")==="endpage"){
				index=allPage;
				getData(index);
			}
		});

		function getData(pageIndex){
			$.ajax({
				method: "post",
				data: {pageIndex:pageIndex,count:count},
				dataType: "json",
				url: "http://localhost/EGu365/api/"+phpname+".php",
				success: function(res){
					//console.log(res);
					allPage=res.allPage;

					//console.log(res.product);
					var html=template("pro-template",{products: res.data});
					//console.log(html);
					$("#prolist").html(html);
					$("#prolist li .proId").css({"display":"none"});
					$("#pageBtn i em").html(index);
					$("#pageBtn i span").html(allPage);
				}
			});
		}

	}



	Prolist.prototype.addToCart=function(){

		//绑定加入购物车事件
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


			//+1动画
			var _top=6;
			var _opacity=100;
			//创建+1span让其进行向下移动
			var span=document.createElement("span");
			span.innerHTML="+1";
			$(this).parent().append(span);
			//初始化+1span的位置
			span.style.top=_top+"px";

			var timer=setInterval(function(){
				_top++;
				span.style.top=_top+"px";
				if(_top>=30){
					clearInterval(timer);
					span.remove();
				}
			},30);


			//抛物线
			
		});
	};


	return new Prolist();
});
