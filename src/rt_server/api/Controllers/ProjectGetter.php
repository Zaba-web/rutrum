<?php

    $login = $_GET['login'];
    $password = $_GET['password'];
    $project_name = $_GET['project'];

    require_once "../database.php";
    require_once "../Classes/User.php";

    $user = new User($login, null, $password, null, null);

    if($user->isUserExist($db)) {
        /*
        header("Content-Disposition: attachment; filename=" . $project_name . ".zip" . "\r\n");
        header("Content-Type: application/octet-stream\r\n");
        header("Content-Type: application/force-download\r\n");
        header("Content-Type: application/download\r\n");
        header("Content-Transfer-Encoding: binary\r\n");
        header("Content-Length: " . filesize($_SERVER['DOCUMENT_ROOT'] . "/users/" . $login . "/" . $project_name . ".zip"));
        */
        $file_path = $_SERVER['DOCUMENT_ROOT'] . "/users/" . $login . "/" . $project_name . ".zip";

        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="'.basename($file_path).'"');
        header('Expires: 0');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file_path));
        // Clear output buffer
        flush();
        readfile($file_path);
        exit();
    }
