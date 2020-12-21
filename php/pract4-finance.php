<?php


?>

<style>
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
