<?php
    include("../config/connect.php");
    header("Access-Control-Allow-Origin:*");
    $username=$_POST["username"];
    $pwd=$_POST["pwd"];

    //检查是否已经有用户
    $sql="select * from logintable";
    $res=mysql_query($sql);

    $arr=array();
    while($row=mysql_fetch_assoc($res))
    {
        if($username==$row["username"]){
            echo '{"code":2}';
            die();
        }
    }


    $md5pwd=md5($pwd);
    //注册用户
    $sql="insert into logintable (username,pwd) value ('$username','$md5pwd')";

    $issuc=mysql_query($sql);

    if($issuc){
        echo '{"code":1}';
        die();
    }else{
        echo '{"code":0}';
        die();
    }
    mysql_close();
?>