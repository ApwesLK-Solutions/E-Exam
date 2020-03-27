<?php

    session_start();
    include 'database.php';
    
    if(isset($_POST['description']) && isset($_POST['ekey']) && isset($_POST['id']))
    {
        $description = $_POST['description'];
        $ekey = $_POST['ekey'];
        $id = $_POST['id'];
        $uid = $_SESSION['id'];
        $cmd = $conn->prepare("UPDATE class SET description = ? , enroll_key = ? WHERE id = ? and owner = ?");
        $cmd->bind_param("ssii",$description,$ekey,$id,$uid);
        if($cmd->execute() && $cmd->affected_rows > 0)
        {
            echo "SUCCESS";
        }
        else
        {
            echo "FAILED";
        }
    }
    else
    {
        echo "POSTERR";
    }
    