<script setup>
import SocialNav from "../components/SocialNav.vue";
import InfoBullets from "../components/InfoBullets.vue";
import Header from "../components/Header.vue";
import HeroSubHeader from "../components/HeroSubHeader.vue";
import Footer from "../components/Footer.vue";
import Divider from "../components/Divider.vue";
</script>

<template>
  <!DOCTYPE html>
  <html
    xmlns="https://www.w3.org/1999/xhtml"
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
  >
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <title>Portfolio - Responsive Email Template</title>

      <!--[if gte mso 9
        ]><xml>
          <o:OfficeDocumentSettings> <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings>
        </xml><!
      [endif]-->
    </head>

    <body style="padding: 0; margin: 0" bgcolor="#eeeeee">
      <!-- / Full width container -->
      <table
        class="full-width-container"
        border="0"
        cellpadding="0"
        cellspacing="0"
        height="100%"
        width="100%"
        bgcolor="#eeeeee"
        style="width: 100%; height: 100%; padding: 30px 0 30px 0"
      >
        <tr>
          <td align="center" valign="top">
            <!-- / 700px container -->
            <table
              class="container"
              border="0"
              cellpadding="0"
              cellspacing="0"
              width="700"
              bgcolor="#ffffff"
              style="width: 700px"
            >
              <tr>
                <td align="center" valign="top">
                  <Header />
                  <HeroSubHeader />
                  <Divider />
                  <InfoBullets />
                  <SocialNav />
                  <Footer />
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
</template>

<style type="text/css">
/* ----- Custom Font Import ----- */
@import url(https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin,latin-ext);

/* ----- Text Styles ----- */
table {
  font-family: "Lato", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
}

@media only screen and (max-width: 700px) {
  /* ----- Base styles ----- */
  .full-width-container {
    padding: 0 !important;
  }

  .container {
    width: 100% !important;
  }

  /* ----- Header ----- */
  .header td {
    padding: 30px 15px 30px 15px !important;
  }

  /* ----- Projects list ----- */
  .projects-list {
    display: block !important;
  }

  .projects-list tr {
    display: block !important;
  }

  .projects-list td {
    display: block !important;
  }

  .projects-list tbody {
    display: block !important;
  }

  .projects-list img {
    margin: 0 auto 25px auto;
  }

  /* ----- Half block ----- */
  .half-block {
    display: block !important;
  }

  .half-block tr {
    display: block !important;
  }

  .half-block td {
    display: block !important;
  }

  .half-block__image {
    width: 100% !important;
    background-size: cover;
  }

  .half-block__content {
    width: 100% !important;
    box-sizing: border-box;
    padding: 25px 15px 25px 15px !important;
  }

  /* ----- Hero subheader ----- */
  .hero-subheader__title {
    padding: 80px 15px 15px 15px !important;
    font-size: 35px !important;
  }

  .hero-subheader__content {
    padding: 0 15px 90px 15px !important;
  }

  /* ----- Title block ----- */
  .title-block {
    padding: 0 15px 0 15px;
  }

  /* ----- Paragraph block ----- */
  .paragraph-block__content {
    padding: 25px 15px 18px 15px !important;
  }

  /* ----- Info bullets ----- */
  .info-bullets {
    display: block !important;
  }

  .info-bullets tr {
    display: block !important;
  }

  .info-bullets td {
    display: block !important;
  }

  .info-bullets tbody {
    display: block;
  }

  .info-bullets__icon {
    text-align: center;
    padding: 0 0 15px 0 !important;
  }

  .info-bullets__content {
    text-align: center;
  }

  .info-bullets__block {
    padding: 25px !important;
  }

  /* ----- CTA block ----- */
  .cta-block__title {
    padding: 35px 15px 0 15px !important;
  }

  .cta-block__content {
    padding: 20px 15px 27px 15px !important;
  }

  .cta-block__button {
    padding: 0 15px 0 15px !important;
  }
}
</style>
