<?php

    include 'database.php';

    if(isset($_POST['id']))
    {
        $id = $_POST['id'];
        $cmd = $conn->prepare("DELETE FROM users WHERE id = ?");
        $cmd->bind_param("i",$id);
        $cmd->execute();
        if($cmd->affected_rows > 0)
        {
            echo "SUCCESS";
            exit();
        }
        else
        {
            echo "UNKNOWN";
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

    //POSTERR -> POST REQUEST FAILED.
    //UNKNOWN -> UNKNOWN ERROR.