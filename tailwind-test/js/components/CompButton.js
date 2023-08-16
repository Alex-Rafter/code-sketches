export function CompButton() {
    return {
        toggle: false,
        $template :/*html*/`<button v-transition:show="!toggle" @click="newVue" class="text-white py-7 px-14 rounded" :class=" toggle ? 'bg-green-700' : 'bg-blue-500' ">New button Component</button>`,
        newVue() {
            console.log('new vue');
            this.toggle = !this.toggle;
        },
        log() {
            console.log('test');
        }
    }
}