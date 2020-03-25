<?php

    include 'config.php';

    if(session_start())
    {
        $to = $_POST['to'];
        $characters = '0123456789';
        $charactersLength = strlen($characters);
        $otp = '';
        for ($i = 0; $i < 4; $i++) 
        {
            $otp .= $characters[rand(0, $charactersLength - 1)];
        }
        $md5_otp = md5($otp);
        $_SESSION['hash'] = $md5_otp;

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, SITEURL . "php/sms.php");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS,"to=" . $to . "&text=Your E-Exam Verification Code : " . $otp ."&ip=".$_SERVER['SERVER_ADDR']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $server_output = curl_exec($ch);
        curl_close ($ch);
    }
    else
    {
        echo "ERROR";
        exit();
    }
    