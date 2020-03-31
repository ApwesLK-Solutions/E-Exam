<?php

    session_start();
    include 'database.php';
    $uid = $_SESSION['id'];
    $cmd = $conn->prepare("SELECT * FROM notification WHERE to_id = ?  and viewed = 0");
    $cmd->bind_param("i",$uid);
    $cmd->execute();
    $result = $cmd->get_result();
    $notifications = array();
    while($row = $result->fetch_assoc())
    {
        array_push($notifications,$row);
    }
    echo json_encode($notifications);