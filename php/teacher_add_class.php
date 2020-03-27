<?php

    include 'database.php';

    if(isset($_POST['subject']) && isset($_POST['grade']) && isset($_POST['institute']) && isset($_POST['description']) && isset($_POST['ekey']) && isset($_POST['ekeyvisible']) && session_start())
    {
        $subject = $_POST['subject'];
        $grade = $_POST['grade'];
        $institute = $_POST['institute'];
        $description = $_POST['description'];
        $ekey = $_POST['ekey'];
        $ekeyvisible = $_POST['ekeyvisible'];
        $uid = $_SESSION['id'];

        $cmd = $conn->prepare("INSERT INTO `class` (`subject`, `grade`, `institute`, `description`, `enroll_key`, `visible_enroll_key`, `owner`) VALUES (?,?,?,?,?,?,?)");
        $cmd->bind_param("iiissii",$subject,$grade,$institute,$description,$ekey,$ekeyvisible,$uid);
        if($cmd->execute() && $cmd->affected_rows > 0)
        {
            echo "SUCCESS";
        }
        else
        {
            echo $conn->errno;
        }
    }
    else
    {
        echo "POSTERR"; // Error in Post Request
    }