export const Button = {
    template: /*html*/`<button :class="btnProp" @click="inc">{{ counter }}</button>`,
    props: ['btnProp'],
    data() {
        return {
            counter: 0
        }
    },
    methods: {
        inc() {
            this.counter++;
        }
    },

}