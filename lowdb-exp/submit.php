<?php
// convert the code below into vb
$body = file_get_contents('php://input');
echo "$body";
file_put_contents('submit.json', $body);
?>