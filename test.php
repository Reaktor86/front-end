<?php
$name = "Oleg";
$number = 1;
$double = 1.2;
$array1 = [1, "test", "test2"];

echo "<pre>"; // распечатать html-тег
print_r($array1); // распечатать массив или объект
echo $name; // распечатать переменную
echo "</pre>";

var_dump($double); // распечатать тип переменной

$concat = "1" . "2" . "3"; // конкатинация
$concat .= "4";

$x = (int)$concat; // преобразовать в число

class MyClass
{

}

$obj = new MyClass();

$null = null;
var_dump($null);

/*
elseif пишется слитно

 */
$newOleg = "Oleg $number"; // в двойные кавычки можно вставлять переменные, в одинарные нельзя

echo "<br>";

// перебор массива
foreach ($array1 as $k => $val) {
    echo $k;
    echo "--";
    echo $val;
    echo "<br>";
}

die(); // прерывает выполнение скрипта (все, что дальше - не выполнится)
