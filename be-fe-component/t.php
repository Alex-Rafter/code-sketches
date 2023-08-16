<?php

$yup = 'yup';
$nope = 'nope';

// create random boolean
$bool = rand(0, 1);
echo $bool ? $yup : $nope;
//create array wth five animals
$animals = ['dog', 'cat', 'bird', 'fish', 'lizard'];
//create random index
$index = rand(0, 4);
//print random animal
echo $animals[$index];
