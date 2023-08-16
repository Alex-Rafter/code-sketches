<script setup>
import { ref } from 'vue'
import shell from 'shelljs';
// import "../styles/email-head.css";

// Use shelljs to read the contents of a stylesheet
const stylesheetContent = shell.cat('../styles/email-head.css').stdout
console.log(stylesheetContent)
</script>

<template>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>Portfolio - Responsive Email Template</title>
    <style>
    {{stylesheetContent}}
    </style>
    <!--[if gte mso 9
      ]><xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml><!
    [endif]-->
  </head>
</template>
