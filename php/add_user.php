<?php

    include 'database.php';
    
    if(isset($_POST['name']) && isset($_POST['mobile']) && isset($_POST['password']) && isset($_POST['type']) && isset($_POST['otp']))
    {
        session_start();
        if(md5($_POST['otp']) == $_SESSION['hash'])
        {
            $name = $_POST['name'];
            $mobile = $_POST['mobile'];
            $password = md5($_POST['password']);
            $type = $_POST['type'];

            $cmd = $conn->prepare("INSERT INTO users(name , mobile , password , type) VALUES(?,?,?,?)");
            $cmd->bind_param("sssi",$name , $mobile , $password , $type);
            if($cmd->execute())
            {
                echo "SUCCESS";
                exit();
            }
            else
            {
                if($cmd->errno == 1062)
                {
                    echo "ALRDEXI";
                    exit();
                }
            }
        }
        else
        {
            echo "OTPERR";
            exit();
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
    //ALRDEXI  -> USER ALREADY EXISTS.
    //OTPERR   -> OTP CODE WRONG.