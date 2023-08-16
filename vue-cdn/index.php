<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css">
    <title>Document</title>
    <style>
        [v-cloak] {
            display: none;
        }
    </style>
</head>

<body>

    <div v-cloak id="app">
        <h1>Testing using Includes with Vue</h1>
        <?php include('./inc/include.php') ?>


        <my-main></my-main>

    </div>


    <script type="module">
        import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        import { Main} from './js/main.js'
        import { Button } from './js/button.js'

        const app = createApp({})
        app
        .component("my-main", Main)
        .component("my-button", Button)
        app.mount('#app')


</script>

</body>

</html>