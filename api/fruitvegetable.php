<?php
    include("../config/connect.php");
    header("Access-Control-Allow-Origin:*");

    $sql="select * from prolist";

    $res=mysql_query($sql);

    $arr=array();

    while($row=mysql_fetch_assoc($res)){
        array_push($arr,$row);
    }
    $product["product"] = $arr;

    if($product["product"]){
		$product["code"] = 1;
	}else{
		$product["code"] = 0;
	}

    echo json_encode($product);
    mysql_close();
?>