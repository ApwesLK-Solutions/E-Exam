<?php

    include 'database.php';

    if(session_start())
    {
        $username = $_SESSION['mobile'];
        $password = $_SESSION['password'];
        $cmd = $conn->prepare('SELECT * FROM `users` WHERE mobile = ?');
        $cmd->bind_param("s",$username);
        $cmd->execute();
        $result = $cmd->get_result();
        if($result->num_rows > 0)
        {
            $row = $result->fetch_assoc();
            if($row['password'] == $password && $_SESSION['type'] == $row['type'] && $_SESSION['id'] == $row['id'])
            {

            }
            else
            {
                session_unset();
                session_destroy();
                header("Location: " . SITEURL);
            }
        }
        else
        {
            session_unset();
            session_destroy();
            header("Location: " . SITEURL);
        }
    }
    else
    {
        session_unset();
        session_destroy();
        header("Location: " . SITEURL);
    }
   

    //ONLINE MCQ
    //Property of Codeoven.lk
    //Coded by Chamod Priyamal
    //chammaofficial@gmail.com

 