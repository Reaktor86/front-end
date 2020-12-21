<?php

function getPasswordHash($userPassword)
{
    $sold = 'web2020';
    $hashString = $userPassword . $sold;
    return md5($hashString);
}

function saveResult($req)
{
    $string = '';
    $string .= date('d.m.Y H:i') . PHP_EOL;
    foreach ($req as $k => $val) {
        if ($k === 'pass') {
            $val = getPasswordHash($val);
        }
        $string .= $k . ': ' . $val . PHP_EOL;
    }

    $string .= '================' . PHP_EOL;

    $save = file_put_contents('/asdasd/form.txt', $string, FILE_APPEND);
    return $save;
}

$request = $_REQUEST;
$errors = [];
foreach ($request as $k => $item) {
    $item = trim(strip_tags($item));
    if (empty($item)) {
        $errors[$k] = 'Не заполнили поле ' . $k;
    }
}
if (empty($errors)) {
    $saveResult = saveResult($request);
}

$test = json_encode($errors);
$decode = json_decode($test, 1);
var_dump($decode);

?>
<ul class="<?=(!empty($errors)) ? 'error' : ''?>">
    <?if (!empty($errors)):?>
        <?foreach ($errors as $error):?>
            <li><?=$error?></li>
        <?endforeach;?>
    <?endif;?>
</ul>
<div>
    <?=($saveResult === false) ? 'Ошибка на стороне сервера' : ''?>
</div>
<form method="post" action="handler.php">
    <input placeholder="Имя" name="name" type="text">
    <input placeholder="Фамилия" name="sname" type="text">
    <input placeholder="Возраст" name="age" type="text">
    <input placeholder="Пароль" name="pass" type="password">
    <input type="submit" value="Отправить">
</form>








