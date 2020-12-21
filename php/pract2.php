<?php

// ТЕМА: ФУНКЦИИ, запросы

$request = $_REQUEST;
$array = [];
foreach ($request as $k => $val) {
    $val = trim(strip_tags($val));
    $array[$k] = $val;
}
//var_dump($array);
//file_put_contents("save.txt", $array, FILE_APPEND);
$userData = json_encode($array);
echo $userData;
die();

// теория

$k = 2;

function myFunc()
{
    global $k; // так обозначаются глобальные переменные внутри функции
    $res = 1 + $k;
    echo ($GLOBALS);
    return $res;
}

echo myFunc();

// передаваемые аргументы не должны быть пустыми


PHP_EOL; // универсальный переход на другую строку
FILE_APPEND; // записать в конец файла

$array = [];
$test = json_encode($array); // кодирование массивов для сохранения данных в файле
json_decode($test); // декодирование массивов