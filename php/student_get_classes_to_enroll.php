<?php

    session_start();
    $uid = $_SESSION['id'];
    include 'database.php';

    $grade = $_POST['grade'];
    $subject = $_POST['subject'];
    if(isset($_POST['teacher']))
    {
        $teacher = $_POST['teacher'];
    }
    else
    {
        $teacher = '%';
    }

    $cmd = $conn->prepare("SELECT class.id AS ID, grade.name as GRADE , subject.name as SUBJECT , users.name as NAME , enroll_key as EKEY , visible_enroll_key as EKEYV , institute.name as INSTITUTE FROM class , grade , institute, subject , users WHERE subject = ? and grade = ? and owner LIKE ? and grade.id = class.grade and subject.id = class.subject and class.owner = users.id and institute.id = class.institute and class.id NOT IN(SELECT class from enrollment where uid  = ?)");
    $cmd->bind_param("iisi",$subject , $grade , $teacher,$uid);
    $cmd->execute();
    $classes = array();
    $result = $cmd->get_result();
    while($row = $result->fetch_assoc())
    {
        array_push($classes , $row);
    }
    echo json_encode($classes);