<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script src="https://cdn.rawgit.com/blowsie/Pure-JavaScript-HTML5-Parser/master/htmlparser.js"></script> 
    <script src="/js/h.js"></script>
    <title>Document</title>
</head>
<body>

    <div id="formParent" v-scope="FormParent()" class="container mt-5">
        <h1>Form Here</h1>
        <p>Pressing the button below will send a request to the server for the form. The form will then be converted form json into html. In this example the html also includes vue directies and is mounted as a petite vue component after it is loaded into the dom. This gives opens up lost of possibilities for interactivty but more imprtantly it enables us to bundle the form data using the brower's fromData() api with encapsulated logic that 'just works' and doesn't need any addiotnal scripting for set up.</p>
        <button class="btn btn-primary" @click.prevent="getForms('/contact.json')">Get Contact</button>
        <button class="btn btn-primary" @click.prevent="getForms('/sign-up.json')">Get Sign Up</button>
        <div id="formLocation"></div>
    </div>

    <script type="module">
        import { createApp } from 'https://unpkg.com/petite-vue?module'

        function FormParent() {
        return {
            async getForms(url) {
                console.log(`getting form ${url}`)
            const response = await fetch(url);
            const dataToBeEdited = await response.text();
            const data = JSON.parse(dataToBeEdited.replace(/_at/g, "@"))
            const formEls = json2html(data.forms[0])
            const formLocation = document.getElementById('formLocation')
            formLocation.innerHTML = ''
            formLocation.insertAdjacentHTML('beforeend', formEls)
            createApp({FormLogic}).mount()
            }
        }
    }

        function FormLogic() {
                return {
                    async submitForm() {
                        console.log('submitting form')
                        const form = document.getElementById('bskTestForm');
                        const formInputs = form.querySelectorAll(':is(input:not([type="submit"]), select)')
                        const formData = new FormData();
                        formInputs.forEach(input => formData.append(input.name, input.value))                          

                        const formObj = {}

                        for (const [key, value] of formData) {
                            formObj[`${key}`] = value
                        }

                        const response = await fetch('/submit.php', {
                            method: 'POST', // or 'PUT'
                            body: JSON.stringify(formObj),
                        });
                        const data = await response.json();
                        console.log(data);
                    }
                }
            }

        createApp({FormParent}).mount()

    </script>
    
</body>
</html>