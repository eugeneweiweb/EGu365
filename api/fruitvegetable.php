<?php
    include("../config/connect.php");
    header("Access-Control-Allow-Origin:*");

    $pageIndex=$_POST["pageIndex"];
    $count=$_POST["count"];

    $sql1="select * from prolist";
    $res1=mysql_query($sql);
    $rows=mysql_num_rows($sql1);
    $allPage=ceil($rows/$count);

    $start=$pageindex*$count;
    $sql="select * from question limit $start,$count";

    $res=mysql_query($sql);

    $arr=array();
    while($row=mysql_fetch_assoc($res)){
        array_push($arr,$row);
    }

    $data=array(
        "code"=>1,
        "allPage"+>$allPage,
        "data"=>$arr
    );


    echo json_encode($data);
    mysql_close();
?>