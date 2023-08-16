<?php

// take user in put from the command line for the username. Create a user in an associative array.
$username = readline('Enter a username: ');


// create a user in an associative array
$user = [
    'id' => 2,
    'username' => $username,
];

// var_dump($user);

// get list of files on parent directory

// create sqlite db connection with PDO and create a table called users.

$pdo = new PDO("sqlite:../db/users.db");
$pdo->exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT)');
// insert the user into the users table
$statement = $pdo->prepare('INSERT INTO users (id, username) VALUES (:id, :username)');
$statement->execute($user);
