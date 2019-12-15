<?php
    $login = $_POST['login'];
    $password = $_POST['password'];
    $projectName =  $_POST['projectName'];

    require_once "../database.php";
    require_once "../Classes/User.php";

    $user = new User($login, null, $password, null, null);

    if($user->isUserExist($db)){
        $path = $_SERVER['DOCUMENT_ROOT']."/users/".$login."/".$projectName.".zip";
        if(file_exists($path)){
            if(unlink($path)){
                echo "Проект удален.";
            }else{
                echo "Не удалось удалить проект.";
            }
        }else{
            echo "Не удалось удалить файл";
        }
    }else{
        echo "Не удалось проверить подлинность соеденения.";
    }