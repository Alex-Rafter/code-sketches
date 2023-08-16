<!-- minify : START -->
<?php include 'ob-start.php'; ?>

<!-- php -->
<?php
include "cli-read.php";
$dataArray = cliRead();
$arrayOfUserNames = json_encode(array_map(fn($value) => $value['username'], $dataArray));
$msg = $dataArray["username"];
// $para = var_dump($dataArray);
?>

<!-- js -->
<script type="module">
import { createApp, reactive } from 'https://unpkg.com/petite-vue?module'
import { rmOuter } from '/js/directives/rm-outer.js'
import { Funktion } from '/js/components/Funktion.js'
import { CompButton } from '/js/components/CompButton.js'

createApp({Funktion, CompButton}).directive('rm-outer', rmOuter).mount();

</script>

<!-- html -->
<section v-scope="Funktion()" v-cloak @vue:mounted="mounted"
class="grid grid-cols-3 grid-rows-2 gap-4 h-screen w-full px-24 md:px-64 py-20">

    <h1 class="text-6xl text-white xl:bg-red-400 bg-green-400 col-span-3 text-center uppercase font-bold flex flex-col justify-center w-full h-full">
        test
    </h1>

    <ul v-scope='{list : <?=$arrayOfUserNames?>}'>
        <li v-for="li in list">{{li}}</li>
    </ul>

    <p class="col-span-3 row-start-2"><?=$para; ?></p>
    
    <button class="text-red-400 bg-gray-800 p-8 lowercase" @click="log" hx-get="/components/form.php" hx-swap="outerHTML">Form</button>

    <div v-scope="CompButton()" v-rm-outer></div>
</section>


<!-- styles -->
<style></style>

<!-- minify : END -->
<?php include 'ob-end.php' ?>
