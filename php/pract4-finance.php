<!--
Запись и сохранение данных о доходах и расходах.
1. Форма для занесения данных.
Селектор доход или расход.
Комментарий
Значение денежных единиц
2. Вывести данные в 2 таблицы.
а) данные по затратам б) данные по доходам
+ суммарные данные, фильтр по месяцам
3. Топ3 самых популярных затрат
-->

<?php

?>

<style>
    * {
        box-sizing: border-box;
    }
    form > * {
        display: block;
        margin: 10px;
    }
    form select, form .sum {
        width: 100px;
    }
    form .comment {
        width: 300px;
    }
    form button {
        width: 50px;
    }
    table, h3 {
        font-family: sans-serif;
    }
    table {
        font-size: 14px;
    }
    .table__head th {
        font-weight: bold;
        padding: 10px 15px;
        background: #fdd099;
    }
    .table__body {
        height: 300px;
        width: 520px;
        overflow-x: auto;
        margin-bottom: 20px;
        border-bottom: 1px solid #adadad;
    }
    .table__date, .table__money, .table__body tr td:nth-child(1), .table__body tr td:nth-child(2) {
        width: 100px;
    }
    .table__body tr td:nth-child(3) {
        width: 300px;
    }
    .table__comm {
        width: 315px;
    }
    .table__body tr td {
        padding: 5px 0 5px 10px;
    }
    .table__body tr:nth-child(even){
        background: #ffe7bb;
    }
    ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    }
    ::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    }

</style>

<form>
    <select name="select">
        <option>Расход</option>
        <option>Доход</option>
    </select>
    <input class="comment" name="comment" type="text" placeholder="комментарий">
    <input class="sum" name="sum" type="text" placeholder="сумма">
    <button type="submit">ОК</button>
</form>

<h3>РАСХОДЫ</h3>

<table class="table__head">
    <thead>
    <tr>
        <th class="table__date">Дата</th>
        <th class="table__money">Расход, ₽</th>
        <th class="table__comm">Комментарий</th>
    </tr>
    </thead>
</table>
<div class="table__body js-expense">
    <table>
        <tbody>
        </tbody>
    </table>
</div>

<h3>ДОХОДЫ</h3>

<table class="table__head">
    <thead>
    <tr>
        <th class="table__date">Дата</th>
        <th class="table__money">Доход, ₽</th>
        <th class="table__comm">Комментарий</th>
    </tr>
    </thead>
</table>
<div class="table__body js-revenue">
    <table>
        <tbody>
        </tbody>
    </table>
</div>

<script>

    document.querySelector("form button").addEventListener("click", function (e){
        e.preventDefault();

        let date = new Date();
        let dateStr = date.toString();
        dateStr.substr(11,2);
        date = dateStr.substr(11,4) + " " + dateStr.substr(4,3) + " " + dateStr.substr(8,2);
        let money = document.querySelector(".sum").value;
        let comm = document.querySelector(".comment").value;
        let select = document.querySelector("form select").value;

        let tr = document.createElement("tr");
        let root;
        if (select === "Доход") {
            document.querySelector(".js-revenue tbody").append(tr);
            root = document.querySelector(".js-revenue tbody tr:last-child");
        } else {
            document.querySelector(".js-expense tbody").append(tr);
            root = document.querySelector(".js-expense tbody tr:last-child");
        }

        let td = document.createElement("td");
        td.innerHTML = "" + date;
        root.append(td);

        td = document.createElement("td");
        td.innerHTML = money;
        root.append(td);

        td = document.createElement("td");
        td.innerHTML = comm;
        root.append(td);
    })
</script>