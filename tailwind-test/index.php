<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <!-- js head -->
    <script src="https://unpkg.com/htmx.org@1.8.4"></script>    
    <script type="module">
    import { createApp } from 'https://unpkg.com/petite-vue?module'
    createApp().mount()
    </script>

    <!-- css head -->
    <link rel="stylesheet" href="/css/style.css">
    <style>
        [v-cloak] {
            display: none;
        }
    </style>

</head>

<body v-scope v-cloak class="font-sans text-black text-base">

    <button class="text-white bg-blue-500 py-7 px-14 rounded" hx-get="/components/component.php" hx-swap="outerHTML">
        Click Me
    </button>

</body>

</html>