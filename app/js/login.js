require(["config"],function(){
	require(["jquery","cookie"],function($,cookie){
		$("#login form").submit(function(e){
			var $username=$("#username input").val();
			var $pwd=$("#pwd input").val();
			var $log=$.cookie('login');
			if($log===true){
				var $unlog=confirm("已登录，是否重新登录");
				if($unlog){
					$.cookie('login','',{expires:-1,path:'/'});
					$("#log,#reg").css({"display":"block"});
					$("#welcome,#username,#unlog").css({"display":"none"});
				}
			}
			$.ajax({
				method:"post",
				data:{
					username:$username,
					pwd:$pwd
				},
				url:"http://localhost/EGu365/api/login.php",
				dataType:"json",
				success:function(res){
					if(res.code==2){
						$.cookie('login','true',{path:'/'});
						$.cookie('username',$username,{path:'/'});
						location.href="../index.html";
					}else if(res.code==1){
						alert("用户名或密码错误");
					}else if(res.code==0){
						var reg=confirm("没有该用户,是否注册");
						if(reg){
							location.href="../html/register.html";
						}
					}
				}
			})
			e.preventDefault();
		});
	});
})