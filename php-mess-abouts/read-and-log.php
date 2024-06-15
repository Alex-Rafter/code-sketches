<?php

$name_from_readline = readline("Enter your name: ");
$list_of_files_in_current_dir = scandir(".");
echo "Hello, $name_from_readline!\n";
echo "Here are the filtered files in the current directory:\n";

function test_path($file) {
    if ($file == "." || $file == "..") {
        return false;
    }
    return true;
}

$filtered_files = array_filter($list_of_files_in_current_dir, "test_path");


foreach ($filtered_files as $file) {
    echo "$file\n";
}