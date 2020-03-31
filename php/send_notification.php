<?php

    session_start();
    include 'database.php';

    if(isset($_POST['receiver']) && isset($_POST['text']))
    {
        $from = $_SESSION['id'];
        $to = $_POST['receiver'];
        $text = $_POST['text'];
        $viewed = 0;
        $cmd = $conn->prepare("INSERT INTO `notification` (`from_id`, `to_id`, `text` , `viewed`) VALUES (?,?,?,?)");
        $cmd->bind_param("iisi",$from,$to,$text,$viewed);
        if($cmd->execute() && $cmd->afffected_rows > 0)
        {
            echo "Notification Sent!";
        }
        else
        {
            echo 'Notification Sent Error : '.$conn->errno;
        }
    }
