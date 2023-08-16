<ul>
<?php


$array = array(
    "foo" => "bar",
    "bar" => "foo",
);

// for each loop and render list item
foreach ($array as $key => $value) {

?>


<li><?php echo $key; ?> = <?php echo $value; ?></li>

<?php

}
?>
</ul>

