<?php

    session_start();
    include 'database.php';

    $uid = $_SESSION['id'];
    $class = $_POST['class'];

    $cmd = $conn->prepare("INSERT INTO enrollment(uid,class) VALUES(?,?)");
    $cmd->bind_param("ii");
    if($cmd->execute() && $cmd->affected_rows > 0)
    {
        echo "SUCCESS";
    }
    else
    {
        echo $conn->errno;
    }