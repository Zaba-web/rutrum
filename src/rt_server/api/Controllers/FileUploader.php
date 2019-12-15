<?php
    $login = $_POST['login'];
    $password = $_POST['password'];

    require_once "../database.php";
    require_once "../Classes/User.php";

    $user = new User($login, null, $password, null, null);

    if($user->isUserExist($db)){
        $filename = $_FILES['file']['name'];

        $old_path = $_FILES['file']['tmp_name'];
        $new_path = $_SERVER['DOCUMENT_ROOT']."/users/".$login."/".$filename;

        if(file_exists($new_path)){
            unlink($new_path);
        }

        if(copy($old_path,$new_path)){
            echo "Проект загружен в облако.";
        }else{
            echo "Не удалось загрузить проект.";
        }
    }else{
        echo "Не удалось проверить подлинность соеденения.";
    }
