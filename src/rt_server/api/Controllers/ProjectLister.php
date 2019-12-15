<?php
    $login = $_POST['login'];
    $password = $_POST['password'];

    require_once "../database.php";
    require_once "../Classes/User.php";

    $user = new User($login, null, $password, null, null);

    if($user->isUserExist($db)){

        $path = $_SERVER['DOCUMENT_ROOT']."/users/".$login;
        $projects = scandir($path);

        unset($projects[0]);
        unset($projects[1]);

        sort($projects);

        for($i = 0; $i<count($projects);$i++){
            $projects[$i] = substr($projects[$i],0,strlen($projects[$i])-4);
        }

        if(count($projects)>0) {
            echo implode(";", $projects);
        }else{
            echo 1;
        }

    }else{
        echo 0;
    }