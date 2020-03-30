<?php

    $dashboard_data = array();
    $cmd = $conn->prepare("SELECT COUNT(*) AS CLASSES FROM class WHERE owner = ?");
    $cmd->bind_param("i" , $_SESSION['id']);
    $cmd->execute();
    $result = $cmd->get_result();
    $row = $result->fetch_assoc();
    $dashboard_data['CLASSES'] = $row['CLASSES'];
    
