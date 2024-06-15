<?php

$names = array('John', 'Paul', 'George', 'Ringo', 'Pete', 'Roger', 'Mick', 'Keith', 'Brian', 'John', 'Paul', 'George');
$el = fn($el, $arg) => "<$el>$arg</$el>";
foreach ($names as $index=>$name) $names[$index] = $el("li", $name);
echo $el("ul", implode("", $names));
echo "this is a test of micro!";
echo "yet another test!";

