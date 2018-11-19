require(["config"],function(){
	require(["jquery","template","cookie","header","footer"],function($,template,cookie,header,footer){
		$("#header").load("/html/component/header.html #headerTop",function(){
			header.nav();
			header.cookie();
			header.shopNum();
		});
		$("#footer").load("/html/component/footer.html");

		function prodisplay(){
			//数据显示
			var tbody=$("#shopTable tbody");

			var str=$.cookie('cart');
			var json=JSON.parse(str);
			//console.log(json);
			//console.log(json.length);
			var trhtml=template("trtemp",{tr: json});
			//console.log(trhtml);
			$("#tbody").html(trhtml);
		}
		
		prodisplay();


		function listdel(){
			//物品删除
			$("tbody").on("click","#delBtn",function(){

				var delId=$(this).parent().parent().find("#Id").html();
				delId=parseInt(delId);
				//console.log(delId);
				//console.log(typeof(delId));
				var toDel=$.cookie('cart');
				var jsonCart=JSON.parse(toDel);
				//console.log(jsonCart.length);
				//console.log("todeljson:"+jsonCart);
				for(var i=0; i<jsonCart.length; i++){
					if(jsonCart[i].id==delId){
						console.log(jsonCart[i]);
						jsonCart.splice(i,1);
					}
				}
				
				//console.log(m);
				//console.log(jsonCart);
				var deled=JSON.stringify(jsonCart);
				//console.log("deled:"+deled);
				$.cookie('cart',deled,{path:'/',expires:1});
				prodisplay();
				$("#header").load("/html/component/header.html #headerTop",function(){
					header.nav();
					header.cookie();
					header.shopNum();
				});
			});
		}

		listdel();
		
		

		function selectctrl(){
			//全选反选
			var scount=0;//单选计数
			var allSelect=$("#allSelect input")[0];
			//console.log(allSelect[0]);
			var selects=$("#tbody #select input");
			//console.log(selects);

			//全选绑事件
			allSelect.onchange=function(){
				if(this.checked){
					for(var j=0; j<selects.length; j++){
						selects[j].checked=true;
					}
					scount=selects.length;
				}else{
					//console.log("uncheck");
					for(var j=0; j<selects.length; j++){
						selects[j].checked=false;
					}
					scount=0;
				}

				//总价计算
				var accounts=0;
				for(var i=0; i<json.length; i++){
					//console.log(json[i].price);
					if(selects[i].checked==true){
						accounts=accounts+(json[i].price*json[i].num);
					}
				}

				$("#accounts em").html(accounts);
			}

			//所有单选绑事件
			for(var j=0; j<selects.length; j++){
				selects[j].onchange=function(){
					this.checked?scount++:scount--;
					if(scount===selects.length){
						allSelect.checked=true;
					}else{
						allSelect.checked=false;
					}

					//总价计算
					var accounts=0;
					for(var i=0; i<json.length; i++){
						//console.log(json[i].price);
						if(selects[i].checked==true){
							accounts=accounts+(json[i].price*json[i].num);
						}
					}

					$("#accounts em").html(accounts);

				}
			}
		}

		selectctrl();


	});
})