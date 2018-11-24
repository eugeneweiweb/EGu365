require(["config"],function(){
	require(["jquery","template","cookie","header","footer"],function($,template,cookie,header,footer){
		$("#header").load("/html/component/header.html #headerTop",function(){
			header.nav();
			header.cookie();
			header.shopNum();
			header.fixTop();
		});
		$("#footer").load("/html/component/footer.html");

		function prodisplay(){
			//数据显示
			var tbody=$("#shopTable tbody");

			var str=$.cookie('cart');
			if(str!=undefined){
				var json=JSON.parse(str);
				var trhtml=template("trtemp",{tr: json});
				$("#tbody").html(trhtml);
			}
			
		}
		
		prodisplay();


		function listdel(){
			//物品删除
			$("tbody").on("click","#delBtn",function(){

				var delId=$(this).parent().parent().find("#Id").html();
				delId=parseInt(delId);
				var toDel=$.cookie('cart');
				var jsonCart=JSON.parse(toDel);
				//查找与删除商品id相同的对象的index并删除该对象
				for(var i=0; i<jsonCart.length; i++){
					if(jsonCart[i].id==delId){
						console.log(jsonCart[i]);
						jsonCart.splice(i,1);
					}
				}
				
				var deled=JSON.stringify(jsonCart);
				$.cookie('cart',deled,{path:'/',expires:1});
				prodisplay();
				header.shopNum();
				selectctrl();
				account();
			});
		}

		listdel();
		
		

		function selectctrl(){
			//全选反选
			var scount=0;//单选计数
			var allSelect=$("#allSelect input")[0];
			var selects=$("#tbody #select input");

			//全选绑事件
			allSelect.onchange=function(){
				if(this.checked){
					for(var j=0; j<selects.length; j++){
						selects[j].checked=true;
					}
					scount=selects.length;
				}else{
					for(var j=0; j<selects.length; j++){
						selects[j].checked=false;
					}
					scount=0;
				}

				account();
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

					account();
				}
			}
		}

		selectctrl();

		//总价计算
		function account(){
			var accounts=0;
			var selects=$("#tbody #select input");
			var str=$.cookie('cart');
			var json=JSON.parse(str);
			//遍历json计算每种商品的合计之和
			for(var i=0; i<json.length; i++){
				if(selects[i].checked==true){
					accounts=accounts+(json[i].price*json[i].num);
				}
			}

			$("#accounts em").html(accounts);
		}

		account();

		//加减按钮
		function proNumCtrl(){
			var tbody=$("#tbody");
			tbody.on("click",".add-btn",function(e){
				var pronum=$(this).prev().val();
				var changeId=$(this).parent().parent().find("#Id").html();
				var singleAccount=$(this).parent().parent().find("#singleAccount");
				var str=$.cookie('cart');
				var json=JSON.parse(str);

				//查找id相同的商品并增加该商品的数量
				pronum++;
				$(this).prev().val(pronum);
				
				for(var i=0; i<json.length; i++){
					if(json[i].id==changeId){
						json[i].num=pronum;
						singleAccount.html(pronum*json[i].price);
						break;
					}
				}
				var cookie=JSON.stringify(json);
				$.cookie('cart',cookie,{path:'/',expires:1});
				
				header.shopNum();
				selectctrl();
				account();
			});


			tbody.on("click",".sub-btn",function(e){
				var pronum=$(this).next().val();
				var changeId=$(this).parent().parent().find("#Id").html();
				var singleAccount=$(this).parent().parent().find("#singleAccount");
				var str=$.cookie('cart');
				var json=JSON.parse(str);
				if(pronum==0){
					pronum=0;
				}else{
					
					//查找id相同的商品并减少该商品的数量
					pronum--;
					$(this).next().val(pronum);

					for(var i=0; i<json.length; i++){
						if(json[i].id==changeId){
							json[i].num=pronum;
							singleAccount.html(pronum*json[i].price);
							break;
						}
					}
					
					var cookie=JSON.stringify(json);
					$.cookie('cart',cookie,{path:'/',expires:1});
					
					header.shopNum();
					selectctrl();
					account();
				}
			});

		}
		proNumCtrl();
	});
})