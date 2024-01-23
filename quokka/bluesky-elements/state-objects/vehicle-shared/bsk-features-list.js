import { watchAttributeUpdatesAndUpdateState } from '../../shared/watch-attribute-updates.js'

export const bskFeaturesList = {
    faIcon: null,
    rowCols: null,
    features: [],
    init(el) {
        this.watchAttributeUpdatesAndUpdateState(el);
    },
    watchAttributeUpdatesAndUpdateState,

};


