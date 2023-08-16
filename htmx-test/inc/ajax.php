<?php
    $name = $_GET['name'];
?>
<section class="red" v-scope="{bool : false, msg : 'hello everyone'}">
    <h2 :class="{'red' : bool}">{{msg}}</h2>
    <button @click="bool = ! bool">Click</button>
</section>

<h1 class="green red" v-scope ref="tst">A New Test</h1>
<p class="red" id="info-details">Details Details Details!</p>
<p class="red">Hello <?= $name ?>!</p>