<?php

    include 'database.php';

    if(isset($_POST['type']) == false)
    {
        echo "POSTERR";
        exit();
    }
    else
    {
        $type = $_POST['type'];
        $data = array();
        $cmd = $conn->prepare("SELECT * FROM users WHERE type = ?");
        $cmd->bind_param("i",$type);
        $cmd->execute();
        $result = $cmd->get_result();
        if($result->num_rows == 0)
        {
            echo "NODATA";
        }
        else
        {
            while($row = $result->fetch_assoc())
            {
                array_push($data,$row);
            }
            echo json_encode($data);
        }
    }
    
    //ONLINE MCQ
    //Property of Codeoven.lk
    //Coded by Chamod Priyamal
    //chammaofficial@gmail.com

    //POSTERR    -> POST REQUEST FAILED;