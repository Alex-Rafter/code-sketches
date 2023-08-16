<!-- minify : START -->
<?php include 'ob-start.php'; ?>

<!-- php -->
<?php
// include "cli-read.php";
// $dataArray = cliRead();
// $msg = $dataArray["username"];
// $para = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.';
?>

<!-- js -->
<script type="module">
import { createApp, reactive } from 'https://unpkg.com/petite-vue?module'
import { rmOuter } from '/js/directives/rm-outer.js'

createApp().directive('rm-outer', rmOuter).mount();

</script>

<!-- html -->
<fieldset>
    <legend>Form</legend>
    <form hx-get="/components/submit.php" hx-swap="outerHTML">
        <label for="id">ID</label>
        <input type="text" name="id" id="id">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" >
        <label for="username">Username</label>
        <input type="text" name="username" id="username">
        <button type="submit">Submit</button>
    </form>
</fieldset>


<!-- styles -->
<style></style>

<!-- minify : END -->
<?php include 'ob-end.php' ?>
