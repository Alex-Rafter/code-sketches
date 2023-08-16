export function Start() {
    return {
        $template: `<button v-cloak @click="store.togglePlay" class="btn btn-secondary btn-sm px-3">Start</button>`,
    }
}