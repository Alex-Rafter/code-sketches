<!-- minify : START -->
<?php include 'ob-start.php'; ?>

<!-- php -->
<?php include "cli-args.php";?>

<!-- js -->
<script type="module">
import { createApp } from 'https://unpkg.com/petite-vue?module'

createApp().mount();

</script>

<!-- html -->
<p v-scope='<?= $userJson; ?>'>
    Details you submitted : <br>
    The Id : {{id}} <br>
    The Username : {{username}} <br>
</p>
<!-- styles -->
<style></style>

<!-- minify : END -->

<?php include 'ob-end.php' ?>
