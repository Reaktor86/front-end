<?php

// календарь на текущий месяц
$year = date("Y");
$month = date("M");
$days = date("t", strtotime($year. "-" . $month) );
$calendar = [];

for ($i = 1; $i <= $days; $i++) {
    if ($i < 10) $i = "0" . $i;
    $dayOfWeek = date("D", strtotime($year. "-" . $month. "-" . $i) );
    echo $i. " = " . $dayOfWeek . "<br>";
    $calendar[(int)($i)] = $dayOfWeek;
}

print_r($calendar);
$dw = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

?>

<style>
    td {
        font-family: sans-serif;
    }
    thead {
    }
    thead td {
        font-size: 18px;
        font-weight: bold;
        padding-bottom: 25px;
    }
    thead .weekend {
        color: red;
    }
</style>

<table cellpadding="10px">
    <thead>
    <tr>
        <td>ПН</td>
        <td>ВТ</td>
        <td>СР</td>
        <td>ЧТ</td>
        <td>ПТ</td>
        <td class="weekend">СБ</td>
        <td class="weekend">ВС</td>
    </tr>
    </thead>
    <tbody>
    <?

    ?>
    </tbody>
</table>
