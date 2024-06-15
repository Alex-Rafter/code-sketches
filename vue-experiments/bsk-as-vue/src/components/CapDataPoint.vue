<style>
    bsk-cap-data-point[is="card"] .card {
      display: flex !important;
      align-items: center;
      justify-content: center;
      width: 10rem;
      height: 9rem;
    }

    @media only screen and (min-width: 1200px) {
      bsk-cap-data-point[is="card"] .card {
        width: 9rem;
        height: 8rem;
      }
    }

    bsk-cap-data-point[is="grid"] .card {
      background-color: transparent;
    }

    bsk-cap-data-point[is="grid"] .card-body {
      grid-template-columns: auto 1fr;
      grid-template-rows: 1fr 1fr;
      column-gap: 1rem;
      row-gap: 0.25rem;
      align-items: center;
    }

    bsk-cap-data-point[is="grid"] span:has(svg, img) {
      grid-column: 1;
      grid-row: 1 / span 2;
    }

    bsk-cap-data-point[is="grid"] .card-title {
      grid-column: 2;
    }

    bsk-cap-data-point[is="grid"] p {
      grid-column: 2;
      grid-row: 2;
    }

    bsk-cap-data-point img {
      object-fit: contain;
    }
  </style>



<template>
  <!-- CAP Data Point : START  -->
  <div
    v-if="is == 'card'"
    class="card align-items-center justify-content-evenly bg-light"
    >
    <span class="flex-c-col text-center">
      <span
        v-if="faIcon"
        class="mb-2">
        <i
          class="h1 mb-0 text-muted"
          :class="faIcon"></i>
      </span>
      <span
        v-else
        class="mb-2">
        <img
          :src="imgSrc"
          :alt="dataTitle"
          width="40px"
          height="40px" />
      </span>
      <h5 class="card-title mb-0 h6">{{dataTitle}}</h5>
    </span>
    <h6 class="card-subtitle mb-0">
      <span
        class="h6"
        ref="subtitle"
        >{{dataValue}}</span
      >
      <span>{{dataUnit}}</span>
    </h6>
  </div>

  <div
    v-else-if="is == 'grid'"
    class="card border-0 col-12 col-md-auto">
    <div class="card-body text-start d-grid">
      <span v-if="faIcon">
        <i
          class="h3 mb-0 text-muted"
          :class="faIcon"></i>
      </span>
      <span v-else>
        <img
          :src="imgSrc"
          :alt="dataTitle"
          class="mb-0"
          width="35px"
          height="35px" />
      </span>

      <h6 class="card-title mb-0">{{dataTitle}}</h6>
      <p class="card-text mb-0">{{dataValue}} <span>{{dataUnit}}</span></p>
    </div>
  </div>

  <div
    v-else
    class="d-flex align-items-center gap-2">
    <span v-if="faIcon">
      <i
        class="h5 mb-0 text-muted"
        :class="faIcon"></i>
    </span>
    <span v-else>
      <img
        :src="imgSrc"
        :alt="dataTitle"
        width="30px"
        height="30px" />
    </span>
    <h5 class="card-title mb-0 h6">{{dataValue}} <span>{{dataUnit}}</span></h5>
  </div>
  <!-- CAP Data Point : END  -->
</template>


<script setup>
import { ref, reactive, onMounted } from 'vue'

defineProps({
  is : String,
  dataTitle : String,
  imgSrc : String,
  dataValue : String,
  dataUnit : String,
  animate : Boolean,
  faIcon : String,
})

const count = ref(0)

function init() {
  console.log('Component initialized x', count.value)
}

onMounted(() => {
  init()
})
</script>
