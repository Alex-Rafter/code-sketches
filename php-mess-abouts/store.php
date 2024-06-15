<?php

$file_contents = file_get_contents("data_2.json");
$decoded_json = json_decode($file_contents, true);
$name = $_POST["name"];
$ts = date("Y_m_d_H:i:s");

$decoded_json["{$name}_{$ts}"] = [];

foreach($_POST as $key => $value) {
    $decoded_json["{$name}_{$ts}"][$key] = $value;
}

// timestamp

var_dump($decoded_json);

file_put_contents("data_2.json", json_encode($decoded_json));

?>