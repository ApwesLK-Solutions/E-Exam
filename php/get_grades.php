<?php

    include 'database.php';

    $cmd = $conn->prepare("SELECT * FROM grade");
    $cmd->execute();
    $result = $cmd->get_result();
    if($result->num_rows > 0)
    {
        $data =array();
        while($row = $result->fetch_assoc())
        {
            array_push($data,$row);
        }
        echo json_encode($data);
    }
    else
    {
        echo "EMPTY";
    }
    
    