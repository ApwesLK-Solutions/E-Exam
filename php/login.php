<?php

    include('database.php');
    if(isset($_POST['username']) && isset($_POST['password']))
    {
        $username = $_POST['username'];
        $password = md5($_POST['password']);
        $cmd = $conn->prepare('SELECT * FROM `users` WHERE mobile = ?');
        $cmd->bind_param("s",$username);
        $cmd->execute();
        $result = $cmd->get_result();
        if($result->num_rows > 0)
        {
            $row = $result->fetch_assoc();
            if($row['password'] == $password)
            {
                if(session_start())
                {
                    $_SESSION['id'] = $row['id'];
                    $_SESSION['mobile'] = $row['mobile'];
                    $_SESSION['type'] = $row['type'];
                    $_SESSION['hash'] = $row['password'];
                    $_SESSION['name'] = $row['name'];
                    if($row['type'] == 1)
                    {
                        echo 'ADMIN';
                    }
                    elseif($row['type'] == 2)
                    {
                        echo 'TEACHER';
                    }
                    elseif($row['type'] == 3)
                    {
                        echo 'STUDENT';
                    }
                    else
                    {
                        echo 'TYPEERR';
                        exit();
                    }
                }
                else
                {
                    echo "SESSERR";
                    exit();
                }
            }
            else
            {
                echo "CREDERR";
                exit();
            }
        }
        else
        {
            echo "NOUSER";
            exit();
        }
    }
    else
    {
        echo "POSTERR";
        exit();
    }

    //ONLINE MCQ
    //Property of Codeoven.lk
    //Coded by Chamod Priyamal
    //chammaofficial@gmail.com
    
    //POSTERR -> POST REQUEST FAILED.
    //NOUSER  -> NO VALID USER.
    //CREDERR -> CREDENTIAL NOT MATCH.
    //ADMIN   -> ADMIN LOGIN SUCCESS.
    //TEACHER -> TEACHER LOGIN SUCCESS.
    //STUDENT -> STUDENT LOGIN SUCCESS.
    //TYPEERR -> USER TYPE ERROR.
    //SESSERR -> SESSION CREATION ERROR.