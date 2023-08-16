<script setup>
import { ref } from 'vue'
import {socials} from '../shared/socials.js'

const basePadding = ref({
  padding: '30px 0 30px 0'
})

const containerStyles = {
  borderTop: '1px solid #eeeeee',
  width: '620px'
}

</script>

<template>
  <!-- / Social nav -->
  <table
    class="container"
    border="0"
    cellpadding="0"
    cellspacing="0"
    width="100%"
    align="center"
  >
    <tr>
      <td align="center">
        <table
          class="container"
          border="0"
          cellpadding="0"
          cellspacing="0"
          width="620"
          align="center"
          :style="containerStyles"
        >
          <tr>
            <td v-for="social in socials" align="center" :style="basePadding">
                <a :href="social.url">
                  <img
                    :src="social.img"
                    :alt="social.name"
                    border="0"
                  />
                </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <!-- /// Social nav -->
</template>
