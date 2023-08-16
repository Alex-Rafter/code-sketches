import {createApp } from 'https://unpkg.com/petite-vue?module'
import {install} from 'https://cdn.skypack.dev/@github/hotkey';
import {Start} from './Start.js';
import {Hints} from './Hints.js';
import {Slides} from './Slides.js';
import {HotKeyQ} from './HotKey.js';
import {store} from './store.js';

export function mainCreate(json) {
    const objsArr = []
    // const jsonNowArr = JSON.parse(json)
    json.forEach(obj => objsArr.push(new HotKeyQ(obj.name, obj.hotKey)))

    createApp({Start, Hints, Slides, objsArr, store}).mount()

        // Install all the hotkeys on the page
        setTimeout(() => {
      for (const el of document.querySelectorAll('[data-hotkey]')) {
        install(el)
      }
    })
}
