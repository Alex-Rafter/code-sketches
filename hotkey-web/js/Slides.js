export function Slides() {
    return {
        $template: /*html*/ `
        <div v-scope="objsArr" v-cloak v-for="(obj, index) in objsArr" class="carousel-item h-100"
        :class="index == 1 && 'active'">

        <div class="d-flex flex-column justify-content-center align-items-center gap-4 vw-100 h-100">
          <!-- Prompt -->
          <h2 :data-hotkey="obj.hotKey" class="display-1 text-center d-flex align-items-center justify-content-center"
            :class="{'red' : obj.toggle}" @click="obj.togg" style="pointer-events: none;">
            {{obj.name}}
          </h2>
          <!-- Hint -->
          <p class="w-100 text-center h2 d-flex justify-content-center text-lowercase" :class="{'visually-hidden' : ! store.hints}">
            {{obj.hotKey}}
          </p>

          <!-- Checkmark -->
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#228B22" class="bi bi-check-square-fill"
            :class="{'visually-hidden' : ! obj.toggle}" viewBox="0 0 16 16">
            <path
            d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
          </svg>

        </div>
      </div>
 `,
    }
}