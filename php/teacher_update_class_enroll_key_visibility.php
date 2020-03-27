<?php

    include 'database.php';
    if(isset($_POST['id']) && isset($_POST['visibility']))
    {
        $uid = $_SESSION['id'];
        $cmd = $conn->prepare("UPDATE class SET visible_enroll_key = ? WHERE id = ? and owner = ?");
        $cmd->bind_param("iii", $visibility , $id , $uid);
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
        echo "FAILED";
    }
    