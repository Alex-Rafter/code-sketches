export function Button(props) {
    return {
      $template : /*html*/`<button v-transition:show="!show" v-transition:enter="duration-1000" v-transition:enter-from="opacity-a" v-transition:enter-to="opacity-b" class="btn btn-primary" @click="inc">{{text}}</button>`,
      text: props.text,
      show : false,
      inc() {
        // console.log("hello")
        // this.text = "clicked";
        this.show = true;
      },
      mounted() {
        console.log(`I'm mounted!`)
      }
    }
  }