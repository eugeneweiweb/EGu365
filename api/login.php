<?php
    include("../config/connect.php");
    header("Access-Control-Allow-Origin:*");
    $username=$_POST["username"];
    $pwd=$_POST["pwd"];

    $sql="select * from logintable";
    $res=mysql_query($sql);

    $md5pwd=md5($pwd);

    $arr=array();
    while($row=mysql_fetch_assoc($res))
    {
        if($username==$row["username"]){
            if($md5pwd==$row["pwd"]){
                //登录成功
                $log=2;
                break;
            }else{
                //用户名或密码错误
                $log=1;
                break;
            }
        }else{
            //没有该用户
            $log=0;
        }
    }
    
    if($log==2){
            //登录成功
            echo '{"code":2,"username":"$username"}';
            die();
    }else if($log==1){
            //用户名或密码错误
            echo '{"code":1}';
            die();
    }else if($log==0){
        //没有该用户
        echo '{"code":0}';
        die();
    }

    mysql_close();
?>