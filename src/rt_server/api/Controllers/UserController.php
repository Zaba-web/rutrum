<?php
    require_once "../Classes/User.php";
    require_once "../Classes/UserRegistrar.php";
    require_once "../database.php";




    if($_POST['code'] == "register"){

        $login = $_POST['login'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $password_re = $_POST['password_re'];
        $first_name = $_POST['first_name'];
        $second_name = $_POST['second_name'];

        $reg = new UserRegistrar($login, $email, $password, $password_re, $first_name, $second_name, $db);
        $result = $reg->registerAccount();

        if($result){
            if(mkdir($_SERVER['DOCUMENT_ROOT']."/users/".$login, 0777)){
                echo "Вітаємо вас з успішною реєстрацією, ".$first_name.".";
            }else{
                echo "Нажаль не вдалося створити аккаунт.";
            }

        }else{
            echo "Нажаль не вдалося створити аккаунт.";
        }

    }else if($_POST['code'] == "login"){

        $login = $_POST['login'];
        $password = md5($_POST['password']);

        $user = new User($login, null, $password, null, null);
        $result = $user->isUserExist($db);

        if($result){
            $user_data_raw = $db->query("SELECT * FROM users WHERE login='$login' AND password='$password'");
            $user_data = $user_data_raw->fetch_array(MYSQLI_NUM);
            $user_data_result = implode(";",$user_data);

            echo $user_data_result;

        }else{
            echo 0;
        }

    }

