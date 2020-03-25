<?php

    include 'database.php';

    $username = $_POST['username'];
    $otp = $_POST['otp'];
    $password = md5($_POST['password']);

    if(session_start())
    {
        if($_SESSION['hash'] == md5($otp))
        {
            $cmd = $conn->prepare("UPDATE users SET password = ? WHERE mobile = ?");
            $cmd->bind_param("ss",$password,$username);
            if($cmd->execute() && $cmd->affected_rows > 0)
            {
                echo "SUCCESS";
                exit();
            }
            else
            {
                echo "FAILED";
                exit();
            }
        }
        else
        {
            echo "OTPERR";
            exit();
        }
    }
    
