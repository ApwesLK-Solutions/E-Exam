<?php

    session_start();
    include('database.php');
    if(isset($_POST['id']))
    {
        $cmd = $conn->prepare("SELECT description , enroll_key FROM class WHERE id = ? and owner = ?");
        $id = $_POST['id'];
        $uid = $_SESSION['id'];

        $cmd->bind_param("ii",$id,$uid);
        $cmd->execute();
        $result = $cmd->get_result();
        $class = array();
        if($result->num_rows > 0)
        {
            while($row = $result->fetch_assoc())
            {
                array_push($class,$row);    
            }
            echo json_encode($class);
        }
        else
        {
            
        }
    }
    


