<?php

//$info = file_get_contents('http://ddred.ru/users.php');
//file_put_contents('user.json.txt', $info);
$decode = json_decode(file_get_contents('user.json.txt'), 1);
print_r($decode);
echo "<br><br>";
/*
- написать функцию, которая возвращает всех однофамильцев
- написать функцию, которая находит полных тезок
- написать функцию, которая возвращает всех пользователей, которые старше 31 года
- написать функцию, которая вычисляет средний возраст пользователей
- написать функцию, которая определяет сколько в компании сотрудников с одинаковой должностью
- написать функцию рандомного увольнения - если возраст кратен 3 или его зовут Bob Proper. Т.е. функция должна вернуть массив без сотрудников, которые подверглись увольнению
- написать функцию, которая выдает зарплату сотруднику.
Зарплата считается следующим образом должности 'Cleaner', 'Director', 'Clerk'  (случайное число от 1000 до 3000 умножить на 3.2 минус возраст сотрудника) , все остальные должности (случайное число от 1000 до 3000 умножить на 0.98 минус возраст сотрудника). На выходе должен получиться массив, в котором для каждого пользователя будет указана зп
Значение зп округляем до целого числа вниз.
 */

//$test = $decode[0];
//print_r($test);
//Array ( [userId] => B-0992 [name] => Bob Store [position] => Clerk [age] => 54 )

//- написать функцию, которая возвращает всех однофамильцев

function getNamesakes($decode, $full)
{
    // вбиваем все фамилии в массив
    $surnames = [];
    foreach ($decode as $k => $val) {
        $name = $val["name"];
        if ($full) {
            // если требуется найти полных тёзок, то вбиваем всё имя целиком
            $surnames[] = $name;
        } else {
            $surnames[] = stristr($name, " ");
        }
    }

    // считаем кол-во вхождений каждой фамилии
    $counter = [];
    foreach ($surnames as $k => $val) {
        if (array_key_exists($val, $counter)) {
            $counter[$val]++;
        } else {
            $counter[$val] = 1;
        }
    }

    // выводим результат
    $namesakes = [];
    foreach ($counter as $k => $val) {
        if ($val > 1) $namesakes[] = $k;
    }
    if (!$full) print_r($namesakes);
    return $namesakes;
}
getNamesakes($decode, false);

//- написать функцию, которая находит полных тезок
echo "<br><br>";

function getFullNamesakes($decode)
{
    $namesakes = getNamesakes($decode, true);
    print_r($namesakes);
    return $namesakes;
}

getFullNamesakes($decode);

//- написать функцию, которая возвращает всех пользователей, которые старше 31 года
echo "<br><br>";

function getUsersOlder31($decode)
{
    $result = [];
    foreach ($decode as $k => $val) {
        if ($val["age"] > 31) $result[] = $val["name"];
    }
    print_r($result);
    return $result;
}

getUsersOlder31($decode);

//- написать функцию, которая вычисляет средний возраст пользователей
echo "<br><br>";

function getAverageAge($decode)
{
    $count = 0;
    $ageArray = [];
    foreach ($decode as $k => $val) {
        $count++;
        $ageArray[] = $val["age"];
    }
    $result = round(array_sum($ageArray) / $count, 0);
    echo "Средний возраст: " . $result;
    return $result;
}

getAverageAge($decode);

//- написать функцию, которая определяет сколько в компании сотрудников с одинаковой должностью
echo "<br><br>";

function getCommonPositionsCount($decode, $position)
{
    $result = 0;
    foreach ($decode as $k => $val) {
        if ($val["position"] === $position) $result++;
    }
    echo "Сотрудников с должностью " . $position . ": " . $result;
    return $result;
}

getCommonPositionsCount($decode, "Developer");

//- написать функцию рандомного увольнения - если возраст кратен 3 или его зовут Bob Proper.
//Т.е. функция должна вернуть массив без сотрудников, которые подверглись увольнению
echo "<br><br>";

function firing($decode)
{
    $result = [];
    foreach ($decode as $k => $val) {
        if ( ! ($val["age"] % 3 == 0 || $val["name"] === "Bob Potter") ) {
            $result[] = $val;
        }
    }
    print_r($result);
    return $result;
}

firing($decode);

//- написать функцию, которая выдает зарплату сотруднику.
//Зарплата считается следующим образом должности 'Cleaner', 'Director', 'Clerk'  (случайное число от 1000 до 3000 умножить на 3.2 минус возраст сотрудника) ,
//все остальные должности (случайное число от 1000 до 3000 умножить на 0.98 минус возраст сотрудника). На выходе должен получиться массив,
//в котором для каждого пользователя будет указана зп
//Значение зп округляем до целого числа вниз.
echo "<br><br>";

function salaryCharge($decode)
{
    $result = $decode;
    foreach ($decode as $k => $val) {
        if ($val["position"] === "Cleaner" || $val["position"] === "Director" || $val["position"] === "Clerk") {
            $money = rand(1000, 3000) * 3.2 - $val["age"];
        } else {
            $money = rand(1000, 3000) * 0.98 - $val["age"];
        }
        $money = floor($money);
        $result[$k]["salary"] = $money;
    }
    print_r($result);
    return $result;
}

salaryCharge($decode);

// генератор юзеров


function generateUsers()
{
    $namesMale = [
        "Олег",
        "Иван",
        "Сергей",
        "Николай",
        "Дмитрий",
    ];

    $namesFemale = [
        "Татьяна",
        "Юля",
        "Виктория",
    ];

    $surnames = [
        "Кузнецов",
        
    ];
}