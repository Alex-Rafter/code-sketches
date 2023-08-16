<?php

function cliRead() {
    $pdo = new PDO("sqlite:../db/users.db");
    $statement = $pdo->prepare("SELECT * FROM users");
    $statement->execute();
    $users = $statement->fetchAll(PDO::FETCH_ASSOC);
    return $users;
}
    