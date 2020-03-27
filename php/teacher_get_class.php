<?php

    $cmd = $conn->prepare("SELECT class.id AS id , subject.name AS subject_name , grade.name AS grade_name , institute.name AS institute_name ,class.enroll_key as ekey , class.visible_enroll_key as ekey_visibile FROM class , subject , grade , institute WHERE class.subject = subject.id AND class.grade = grade.id AND class.institute = institute.id AND class.owner = ?");
    $uid = $_SESSION['id'];
    $cmd->bind_param("i",$uid);
    $cmd->execute();
    $result = $cmd->get_result();
    if($result->num_rows > 0)
    {
        while($row = $result->fetch_assoc())
        {
            echo '<tr id='.$row['id'].'>';
            echo '<td>'.$row['id'].'</td>';
            echo '<td>'.$row['grade_name'].'</td>';
            echo '<td>'.$row['subject_name'].'</td>';
            echo '<td>'.$row['institute_name'].'</td>';
            echo '<td>'.$row['ekey'].'</td>';

            if($row['ekey_visibile'] == 1)
            {
                echo "<td><input name='ekey_visible' onchange='update_visibility(this);' type='checkbox' value='".$row['id']."'name='my-checkbox' checked data-bootstrap-switch data-off-color='danger' data-on-color='success'></td>";
            }
            else
            {
                echo "<td><input name='ekey_visible' onchange='update_visibility(this);' type='checkbox' value='".$row['id']."' name='my-checkbox' data-bootstrap-switch data-off-color='danger' data-on-color='success'></td>";
            }
            echo "<td class='text-center'>";
            echo "<button type='button' id='".$row['id']."' rel='tooltip' data-placement='left' title='View Class' class='btn btn-link btn-icon'><i class='fa fa-eye'></i></button>";
            echo "<button type='button' id='".$row['id']."' onclick='prepare_update_class(this);' rel='tooltip' data-placement='left' title='Edit Class Info' class='btn btn-link btn-icon'data-toggle='modal' data-target='#modal-default'><i class='fa fa-edit'></i></button>";
            echo "<button type='button' id='".$row['id']."' onclick='delete_class(this);' rel='tooltip' data-placement='left' title='Remove Class' class='btn btn-link btn-icon'><i class='fa fa-trash-alt'></i></button>";
            echo "</tr>";
        }
    }
    else
    {

    }


