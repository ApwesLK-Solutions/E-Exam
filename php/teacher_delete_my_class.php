<?php 

    session_start();
    include 'database.php';
    if(isset($_POST['id']))
    {
        $class_id = $_POST['id'];
        $uid = $_SESSION['id'];
        $cmd = $conn->prepare("DELETE FROM class WHERE id = ? and owner = ?");
        $cmd->bind_param("ii",$class_id , $uid);
        if($cmd->execute() && $cmd->affected_rows > 0)
        {
            echo "SUCCESS";
        }
        else
        {
            echo "FAILED";
        }
    }