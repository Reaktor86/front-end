<?php

$dep = 300; // сколько положили на депозит
$years = 20; // на сколько лет
$proc = 20; // процентов годовых

$end = $dep;
$result = [];

for ($i = 1; $i <= $years; $i++) {
    $temp = [];
    $temp["start"] = round($end, 2);
    $profit = $end;
    $end = $end + $end * $proc / 100;
    $temp["end" ] = round($end, 2);
    $profit = $end - $profit;
    $temp["profit"] = round($profit, 2);

    $result[] = $temp;
}

?>

<table>
    <thead>
    <tr>
        <td>Год</td>
        <td>Нач.сумма</td>
        <td>Конеч.сумма</td>
        <td>Разница</td>
    </tr>
    </thead>
    <tbody>
        <?php foreach ($result as $k => $item): ?>
            <tr>
                <td><?=$k + 1?></td>
                <td><?=$item["start"]?></td>
                <td><?=$item["end"]?></td>
                <td><?=$item["profit" ]?></td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>

<?php
die();
for ($i = 2; $i < 10; $i++) {
    for ($k = 2; $k < 10; $k++) {
        echo $i . " x " . $k . " = " . $i * $k . "<br>";
    }
}

$sessionId = 0;
?>

<!--так делается проверка-->
<!--если 0, то форма. если 1, то вы авторизованы-->

<?php if ($sessionId == 1): ?>
    <div>Вы авторизованы!</div>
<?php else: ?>
    <form>
        <input type="text" placeholder="логин">
        <input type="text" placeholder="пароль">
        <input type="submit" value="Войти">
    </form>
<?php endif; ?>


<?php


$y = 2020;
$m = 3;

var_dump(date("Y-M-d H:m:s")); // вывести дату по маске

$date = date("t", strtotime($y . "-" . $m));
echo "<br>";
var_dump($date);

?>
<p>Выбранная дата: <?=$y?> </p>
<?php

$first = 6;
$second = 4;

if ($first % $second == 0) {
    echo "Верно";
} else {
    echo "Не верно";
}



