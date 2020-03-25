<?php

    include 'database.php';

    if(isset($_POST['id']) == false)
    {
        echo "POSTERR";
        exit();
    }
    else
    {
        $id = $_POST['id'];
        $cmd = $conn->prepare("SELECT * FROM users WHERE id = ?");
        $cmd->bind_param("i",$id);
        $cmd->execute();
        $result = $cmd->get_result();
        if($result->num_rows == 0)
        {
            echo "NODATA";
        }
        else
        {
            echo json_encode($result->fetch_assoc());
        }
    }
    
    //ONLINE MCQ
    //Property of Codeoven.lk
    //Coded by Chamod Priyamal
    //chammaofficial@gmail.com

    //POSTERR    -> POST REQUEST FAILED;