import { reactive} from 'https://unpkg.com/petite-vue?module'
export const store = reactive({
    hints: false,
    playing : false,
    toggleHints() {
      this.hints = ! this.hints
    },
    togglePlay() {
      this.playing = ! this.playing
      // this.playing && window.myCarousel.cycle()
    }
  })
