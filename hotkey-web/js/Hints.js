export function Hints() {
    return {
        $template: /*html*/`
        <div v-scope="" v-cloak @change="store.toggleHints()" class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
            style="cursor: pointer;">
            <label class="form-check-label" for="flexSwitchCheckDefault">
            {{store.hints ? 'Hide' : 'Show'}} Hints
            </label>
      </div>`,
    }
}