<?php

include "conn.php";


if(isset($_POST['tel']) && isset($_POST['password'])){
    $tel=$_POST['tel'];
    $password = sha1($_POST['password']);
    $result=$conn->query("SELECT * FROM user_list WHERE tel='$tel' and password='$password'");
    if($result->fetch_assoc()){
        echo "true";
    }else {
        echo "false";
    }
}