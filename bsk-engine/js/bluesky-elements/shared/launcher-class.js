import { unsetStylesWhenIconsOnly } from './unset-styles-when-icons-only.js'
import { watchAttributeUpdatesAndUpdateState } from './watch-attribute-updates.js'

export class Launcher {
    constructor({ btnText }) {
        this.btnText = btnText;
        this.unsetStylesWhenIconsOnly = unsetStylesWhenIconsOnly;
        this.watchAttributeUpdatesAndUpdateState = watchAttributeUpdatesAndUpdateState;
        this.init = function (el) {
            if (this.is == 'buttons') {
                this.unsetStylesWhenIconsOnly = null
            }
            this.watchAttributeUpdatesAndUpdateState(el);
        }
    }

}