<?php
// create a user in an associative array from form input
$user = [
    'id' => $_GET['id'],
    'username' => $_GET['username']
];

$userJson = json_encode($user);

// insert the user into the users table
$pdo = new PDO("sqlite:../db/users.db");
$pdo->exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT)');
$statement = $pdo->prepare('INSERT INTO users (id, username) VALUES (:id, :username)');
$statement->execute($user);
