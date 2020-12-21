<?php

// 4 дива с разными цветами

$colors = ["red", "yellow", "blue", "black", "green", "pink", "orange"];
$selected = [];

for ($i = 1; $i < 5; $i++) {
    do {
        $color = $colors[rand(0, count($colors) - 1)];
        $test = false;
        if ($i != 1) {
            $test = in_array($color, $selected);
        }
    } while ($test);
    $selected["color" . $i] = $color;
}
?>

<style>
    .color {
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
    }
    .color1 {
        background: <?=$selected["color1"]?>;
    }
    .color2 {
        background: <?=$selected["color2"]?>;
    }
    .color3 {
        background: <?=$selected["color3"]?>;
    }
    .color4 {
        background: <?=$selected["color4"]?>;
    }
</style>

<div class="color color1"></div>
<div class="color color2"></div>
<div class="color color3"></div>
<div class="color color4"></div>
