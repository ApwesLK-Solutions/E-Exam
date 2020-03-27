<?php

    include 'database.php';

    $cmd = $conn->prepare("SELECT class.id AS id , subject.name AS subject , grade.name as grade , institute.name as institute ,class.enroll_key as ekey , class.visible_enroll_key as ekey_visibile
                           FROM class , subject , grade , institute
                           WHERE class.subject = subject.id AND class.grade = grade.id AND class.institute = institute.id AND class.owner = ?");
    $uid = $_SESSION['id'];
    $cmd->bind_param("i",$uid);
    $cmd->execute();
    $classes = array();
    $result = $cmd->get_results();
    if($result->num_rows > 0)
    {
        while($row = $result->fetch_assoc());
        {
            array_push($classes , $row);
        }
    }
    else
    {
        
    }


