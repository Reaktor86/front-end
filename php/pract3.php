<?php

// задание 1

$nums = [];
echo "<b>Числа: </b>";
for ($i = 0; $i < 10; $i++) {
    $num = rand(10, 100);
    $nums[] = $num;
    echo $num . " ";
}

echo "<br><br><b>Переворот: </b>";

for ($i = 0; $i < 11; $i++) {
    echo $nums[count($nums) - $i] . " ";
}

// задание 3

$images = [];
$files = scandir("pract3img");
for ($i = 2; $i < count($files); $i++) {
    $images[] = "/pract3img/" . $files[$i];
}

$index = rand(0, count($images) - 1);
echo "<br><br>";
?>

<img src="<?=$images[$index]?>"><br><br>

<?php

// задание 4

$digits = [];
echo "<b>Оригинал: </b><br>";

for ($i = 0; $i < 5; $i++) {
    $row = [];

    for ($k = 0; $k < 5; $k++) {
        $num = rand(10, 100);
        $row[] = $num;
        echo $num . "&nbsp;&nbsp;";
    }

    $digits[] = $row;
    echo "<br>";
}

echo "<br><b>Сортировка: </b><br>";

$sort = [];

// сливаем все числа в один массив
for ($i = 0; $i < count($digits); $i++) {
    $sort = array_merge($sort, $digits[$i]);
}

// сортируем новый массив
sort($sort);

// выводим на экран
for ($i = 0; $i < count($sort); $i++) {
    echo $sort[$i] . "&nbsp;&nbsp;";
    if (($i + 1) % 5 == 0) {
        echo "<br>";
    }
}

// задание 6

/*
Создать массив из 10 элементов вида X, Y. Дополнительно создать массив цветов. Вывести на страницу
10 div, разместить их в координатах X, Y и закрасить
случайным цветом из массива цветов.
 */

$coorX = [];
$coorY = [];
for ($i = 0; $i < 10; $i++) {
    $coorX[] = rand(0, 200) . "px";
    $coorY[] = rand(0, 200) . "px";
}
$colors = ["yellow", "black", "blue", "red", "green", "orange", "brown", "grey", "pink", "violet"];
$colorIndex = [];
for ($i = 0; $i < 10; $i++) {
    $colorIndex[] = rand(0, count($colors) - 1);
}

?>

<style>
    .cont {
        border: 2px solid black;
        width: 220px;
        height: 220px;
        margin: 20px;
        position: relative;
    }
    .cont > div {
        width: 20px;
        height: 20px;
        position: absolute;
    }
</style>

<div class="cont">
    <? for ($i = 0; $i < 10; $i++): ?>
        <div style="left: <?=$coorX[$i]?>; top: <?=$coorY[$i]?>; background: <?=$colors[$colorIndex[$i]]?>"></div>
    <? endfor; ?>
</div>