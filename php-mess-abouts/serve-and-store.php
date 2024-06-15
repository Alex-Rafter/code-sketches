<?php

$title = 'Serve and Store';

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $title ?></title>
</head>

<body>

    <h1><?= $title ?></h1>
    <h2>hello</h2>

    <form action="./store.php" method="POST">
        <input type="text" name="message">
        <input type="text" name="name">
        <input type="submit">
    </form>

</body>

</html>