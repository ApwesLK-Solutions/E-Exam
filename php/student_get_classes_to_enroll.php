<?php

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

    $cmd = $conn->prepare("SELECT grade.name as GRADE , subject.name as SUBJECT , users.name as NAME , enroll_key as EKEY , visible_enroll_key as EKEYV , class.address AS ADDRESS  FROM class , grade , subject , users WHERE subject = ? and grade = ? and owner LIKE ? and grade.id = class.grade and subject.id = class.subject and class.owner = users.id");
    $cmd->bind_param("iis",$subject , $grade , $teacher);
    $cmd->execute();
    $classes = array();
    $result = $cmd->get_result();
    while($row = $result->fetch_assoc())
    {
        array_push($classes , $row);
    }
    echo json_encode($classes);