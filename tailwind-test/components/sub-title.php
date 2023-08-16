<?php include 'ob-start.php'; ?>

<?php
$text = "just some text to include in the component";
?>

<script type="module">
import { createApp } from 'https://unpkg.com/petite-vue?module'

createApp({}).mount()

</script>

<!-- Component -->
<h2 class="bg-red-700 text-white p-4"><?= $text; ?></h2>

<style>
    
</style>
<?php include 'ob-end.php' ?>
