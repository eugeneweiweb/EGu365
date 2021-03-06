define(["jquery"],function($){
	function Header(){}

	Header.prototype.nav=function(){
		$("#selectNav").mouseenter(function(){
			$("#selectNav ul").css({"display":"block","z-index":5});
		})
		.mouseleave(function(){
			$("#selectNav ul").css({"display":"none"});
		})
	};

	Header.prototype.banner=function(){
		$(function(){
			var $imgs=$("#headerBanner ul li");
			var $btns=$("#headerBanner ol li");

			var index=0;
			var flag=false;
			var timer=null;

			$btns.click(function(){
				if(!flag){
					flag=true;
					$(this).addClass("ac").siblings().removeClass("ac");
					$imgs.eq(index).fadeOut();
					index=$(this).index();
					$imgs.eq(index).fadeIn(function(){
						flag=false;
					});
				}
			});

			$("#goPrev").click(function(){
				if(!flag){
					flag=true;
					$imgs.eq(index).fadeOut();
					if(--index<0){
						index=$imgs.length-1;
					}
					$btns.eq(index).addClass("ac").siblings().removeClass("ac");
					$imgs.eq(index).fadeIn(function(){
						flag=false;
					});
				}
			});

			$("#goNext").click(function(){
				if(!flag){
					flag=true;
					$imgs.eq(index).fadeOut();
					if(++index>=$imgs.length){
							index=0;
					}
					$btns.eq(index).addClass("ac").siblings().removeClass("ac");
					$imgs.eq(index).fadeIn(function(){
						flag=false;
					});
				}
			});

			$("#headerBanner").hover(function(){
				clearInterval(timer);
			},(function autoPlay(){
				timer=setInterval(function(){
					$("#goNext").trigger("click");
				},2000);
				return autoPlay;
			})());
		});
	};

	Header.prototype.cookie=function(){
		var $username=$.cookie('username');
		if($username!=undefined){
			$("#welcome").text(function(){
				return "欢迎您，"+$username;
			});
		}
		
		$("#unlog").click(function(){
			//console.log(111);
			$.cookie('login','',{expires:-1,path:"/"});
			$.cookie('username','',{expires:-1,path:"/"});
			$("#log,#reg").css({"display":"block"});
			$("#welcome,#username,#unlog").css({"display":"none"});
		});
		if($.cookie('login')){
			$("#log,#reg").css({"display":"none"});
			$("#welcome,#username,#unlog").css({"display":"block"});
		}else{
			$("#log,#reg").css({"display":"block"});
			$("#welcome,#username,#unlog").css({"display":"none"});
		}
	};

	Header.prototype.shopNum=function(){
		var str=$.cookie('cart');
		if(str!=undefined){
			var json=JSON.parse(str);
			//商品总数量
			var count=json.reduce(function(count,curr){
				//console.log(curr.num);
				return count+curr.num;
			},0);
			$("#shoppingCount").html(count);
		}
		
	};

	//吸顶效果
	Header.prototype.fixTop=function(){
		var search=$("#logoSearch"),
			nav=$("#nav");
		$(window).scroll(function(){
			if($(window).scrollTop()>200){
				search.css({"position":"fixed","z-index":8,"top":5});
				nav.css({"position":"fixed","z-index":8,"top":95});
			}else{
				search.css({"position":"static","z-index":8});
				nav.css({"position":"static","z-index":8});
			}
		});
	};

	return new Header();
});