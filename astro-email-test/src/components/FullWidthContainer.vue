<script setup>
import { ref } from 'vue'
</script>

<template>
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
          <slot></slot>
        </td>
      </tr>
    </table>
</template>