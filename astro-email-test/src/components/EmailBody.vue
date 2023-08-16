<script setup>
import { ref } from "vue";
import SocialNav from "../components/SocialNav.vue";
import InfoBullets from "../components/InfoBullets.vue";
import Header from "../components/Header.vue";
import HeroSubHeader from "../components/HeroSubHeader.vue";
import Footer from "../components/Footer.vue";
import Divider from "../components/Divider.vue";
import FullWidthContainer from "../components/FullWidthContainer.vue";
import InnerContainer from "../components/InnerContainer.vue";
import MjmlTest from "../components/MjmlTest.vue";
import MjmlTestButton from "../components/MjmlTestButton.vue";
</script>

<template>
  <body style="padding: 0; margin: 0" bgcolor="#eeeeee">
    <FullWidthContainer>
      <InnerContainer>
        <template #components>
          <MjmlTest />
          <Header />
          <HeroSubHeader />
          <Divider />
          <InfoBullets />
          <MjmlTestButton btn-text="Arg Button" />
          <SocialNav />
          <Footer />
        </template>
      </InnerContainer>
    </FullWidthContainer>
  </body>
</template>
