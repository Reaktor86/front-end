<?php
// 1. Вывести имя, компанию, должность

$array = [
    ["name" => "Иван", "company" => "Рога и копыта", "position" => "Уборщик"],
    ["name" => "Олег", "company" => "Икс-ком", "position" => "Слесарь"],
    ["name" => "Сергей", "company" => "Икс-ком", "position" => "Менеджер"],
    ["name" => "Саша", "company" => "Закусочная", "position" => "Повар"],
    ["name" => "Маша", "company" => "Закусочная", "position" => "Техник"],
    ["name" => "Даша", "company" => "Хорошая компания", "position" => "Упаковщик"],
    ["name" => "Ирина", "company" => "Секта вейперов", "position" => "Дегустатор"],
    ["name" => "Вадим", "company" => "Рога и копыта", "position" => "Охранник"],
    ["name" => "Игорь", "company" => "Майкрософт", "position" => "Секретарь Билла Гейтса"],
    ["name" => "Елена", "company" => "Икс-ком", "position" => "Переводчик"],
];
?>
<div>
<? foreach ($array as $k => $val): ?>
    <p><?=$val["name"]?> работает в &quot;<?=$val["company"]?>&quot; в должности: <?=$val["position"]?></p>
<?php endforeach; ?>
</div>

<?php
echo "<br><br>";

// 2. Вывести имена из предыдущего задания списком, сортировав по компаниям

$arraySort = [];
foreach ($array as $k => $val) {
    $arraySort[$val["company"]][] = $val["name"];
}
// здесь получен список вида Array ( [Рога и копыта] => Array ( [0] => Иван [1] => Вадим ) ... )
?>

<ul>
    <? foreach ($arraySort as $k => $val): ?>
        <li><?=$k?><ul>
            <? foreach ($val as $item): ?>
                <li><?=$item?></li>
            <? endforeach; ?>
        </ul></li><br>
    <? endforeach; ?>
</ul>

<?php
echo "<br><br>";

// 3. Последовательная генерация чисел.

$nums = [1];
for ($i = 0; $i < 9; $i++) {
    // число запишется, если оно больше предыдущего, и если разница между ними не больше 20
    $new = 0;
    do {
        $new = rand(2, 92 + $i); // если будет выбрано максимальное число, пока цикл не закончился, то программа повиснет, для этого здесь + $i
    } while ($new <= $nums[$i] || $new - $nums[$i] > 20);
    $nums[] = $new;
}
print_r($nums);
?>

<p>
<? foreach ($nums as $k => $val): ?>
<?=$val.($k != 9 ? ', ' : '')?>
<? endforeach; ?>
</p>

<?php
echo "<br><br>";

// 4. округление числа

// генерируем случайное число с плавающей точкой
for ($i = 0; $i < 10; $i++) {
    $num = rand(0,100);
    $float = rand(0,99999999);
    $numsOriginal[] = $num + $float / (10 ** strlen($float));
}

// округляем
/*for ($i = 0; $i < ; $i++) {

}*/