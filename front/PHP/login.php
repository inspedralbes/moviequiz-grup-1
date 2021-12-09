<?php
    require_once("controller_MQ.php");
    $controller = new controller();
    $resposta = $controller->login();
    $res = json_encode($resposta);
    echo $res;
?>