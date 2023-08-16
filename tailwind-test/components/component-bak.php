<!-- minify : START -->
<?php include 'ob-start.php'; ?>

<!-- php -->
<?php
// get url params
$id = $_GET['id'];
$name = $_GET['name'];
$username = $_GET['username'];


include "cli-read.php";
$dataArray = cliRead();
$msg = $dataArray["username"];
$para = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.';
?>

<!-- js -->
<script type="module">
import { createApp, reactive } from 'https://unpkg.com/petite-vue?module'


function Funktion() {
    return {
        log() {
            console.log('test')
        },
        mounted() {
            console.log(`I'm mounted!`)
        }
    }
}

function CompButton() {
    return {
        $template :/*html*/`<button @click="newVue" class="text-white bg-blue-500 py-7 px-14 rounded">New button Component</button>`,
        newVue() {
            console.log('new vue')
        },
        log() {
            console.log('test')
        },
        rmOuter(el) {
            const thisTemplateHTMLTag = this.$template.match(/^<(\w+)/)[1];
            el.replaceWith(el.querySelector(`${thisTemplateHTMLTag}`))
        }
    }
}

createApp({Funktion, CompButton}).mount()

</script>


<!-- html -->
<section v-scope="Funktion()" v-cloak @vue:mounted="mounted"
class="grid grid-cols-3 grid-rows-2 gap-4 h-screen w-full px-24 md:px-64 py-20">

    <h1 class="text-6xl text-white xl:bg-red-400 bg-green-400 col-span-3 text-center uppercase font-bold flex flex-col justify-center w-full h-full">
        <?= $msg ?>
    </h1>

    <p class="col-span-3 row-start-2"><?=$para?></p>
    
    <button class="text-red-400 bg-gray-800 p-8 lowercase" @click="log" hx-get="/sub-title.php" hx-swap="outerHTML">Log</button>

    <div v-scope="CompButton()" @vue:mounted="rmOuter($el)"></div>
</section>


<!-- styles -->
<style></style>

<!-- minify : END -->
<?php include 'ob-end.php' ?>
