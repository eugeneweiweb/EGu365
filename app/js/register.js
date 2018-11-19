require(["config"],function(){
	require(["jquery","cookie"],function($,cookie){
		$("#register form").submit(function(e){
			var $username=$("#username input").val();
			var $pwd=$("#pwd input").val();
			var $repwd=$("#repwd input").val();
			if($pwd===$repwd){
				$.ajax({
					method:"post",
					data:{
						username:$username,
						pwd:$pwd
					},
					url:"http://localhost/EGu365/api/register.php",
					dataType:"json",
					success:function(res){
						if(res.code==1){
							alert("注册成功");
							location.href="../html/login.html";
						}
						else if(res.code==0){
							alert("注册失败，请重试");
						}else if(res.code==2){
							var log=confirm("用户已存在，是否登录");
							if(log){
								location.href="../html/login.html"
							}
						}
					}
				})
			}else{
				alert("两次输入的密码需一至");
			}
			
			e.preventDefault();
		});
	});
})