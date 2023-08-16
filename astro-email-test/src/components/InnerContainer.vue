<script setup>
import { ref } from "vue";
</script>

<template>
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
        <slot name="components"></slot>
      </td>
    </tr>
  </table>
</template>
