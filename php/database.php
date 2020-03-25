<?php

    include('config.php');
    $conn = mysqli_connect(MYSQL_HOST,MYSQL_USER,MYSQL_PASS,MYSQL_DB,MYSQL_PORT);
    if($conn)
    {
        //echo "<script>console.log('Connected!')</script>";
    }
    else
    {
        echo "<script>console.log('Not Connected!')</script>";
        exit();
    }

    //ONLINE MCQ
    //Property of Codeoven.lk
    //Coded by Chamod Priyamal
    //chammaofficial@gmail.com
