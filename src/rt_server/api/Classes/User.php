<?php


class User
{
    public $login;
    public $email;
    public $password;
    public $first_name;
    public $second_name;

    public function __construct($login, $email, $password, $first_name, $second_name)
    {
        $this->login = $login;
        $this->email = $email;
        $this->password = $password;
        $this->first_name = $first_name;
        $this->second_name = $second_name;
    }

    public function isUserExist($db){
        $result = $db->query("SELECT * FROM users WHERE login='$this->login' AND password='$this->password'");
        if($result->num_rows>0){
            return true;
        }else{
            return false;
        }
    }
}