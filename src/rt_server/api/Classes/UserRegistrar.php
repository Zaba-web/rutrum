<?php


class UserRegistrar
{

    protected $user;
    protected $db;

    public function __construct($login, $email, $password, $password_repeat,$first_name,$second_name,$db)
    {
        $this->db = $db;
        if($login != null AND $email != NULL AND $password != NULL and $password_repeat != null){
            if($password == $password_repeat){
                $this->user = new User($login, $email,  md5($password), $first_name, $second_name);
            }
        }
    }

    public function registerAccount(){

        if($this->user != null){

            $login = $this->db->real_escape_string($this->user->login);
            $email = $this->db->real_escape_string($this->user->email);
            $password = $this->db->real_escape_string($this->user->password);
            $first_name = $this->db->real_escape_string($this->user->first_name);
            $second_name = $this->db->real_escape_string($this->user->second_name);

            if($this->db->query("INSERT INTO users (login, password, email, first_name, second_name) VALUES ('$login', '$password', '$email', '$first_name', '$second_name')")){
                return true;
            }else{
                return false;
            }
        }
    }

}
