<?php

    $to = $_POST['to'];
    $text = urlencode($_POST['text']);
    $ip = $_POST['ip'];

    if($ip =! $_SERVER['SERVER_ADDR'])
    {
        exit();
    }
    else
    {
        $user = "94717908311";
        $password = "4203";
        $baseurl ="http://www.textit.biz/sendmsg";
        $url = "$baseurl/?id=$user&pw=$password&to=$to&text=$text";
        $ret = file($url);
        $res= explode(":",$ret[0]);

        if (trim($res[0])=="OK")
        {
            
        }
        else
        {
            echo "Sent Failed - Error : ".$res[1];
            exit();
        }
    }
    
