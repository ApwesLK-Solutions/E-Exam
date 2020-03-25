<?php

    include 'database.php';
    if(isset($_POST['name']) && isset($_POST['mobile']) && isset($_POST['password']) && isset($_POST['id']))
    {
        $name = $_POST['name'];
        $mobile = $_POST['mobile'];
        $password = md5($_POST['password']);
        $id = $_POST['id'];
        $cmd = $conn->prepare("UPDATE users SET name = ? , mobile  = ? , password = ? WHERE id = ?) VALUES(?,?,?,?)");
        $cmd->bind_param("sssi",$name , $mobile , $password , $id);
        if($cmd->execute() && $cmd->affected_rows > 0)
        {
            echo "SUCCESS";
            exit();
        }
        else
        {
            echo "ERROR";
        }
    }
    else
    {
        echo "POSTERR";
        exit();
    }

    //ONLINE MCQ
    //Property of Codeoven.lk
    //Coded by Chamod Priyamal
    //chammaofficial@gmail.com
    
    //POSTERR  -> POST REQUEST FAILED.
    //SUCCESS  -> USER ADD SUCCESS.
    //ERROR    -> USER ALREADY EXISTS.