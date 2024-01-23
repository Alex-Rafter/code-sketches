export const bskSpecsTable = {
    specs: [],
    specsObj: {},
    tableClass : null,
    rowCols : null,
    init(el) {
        this.specsObj = {};
        Object.assign(this.specsObj, this.tryJsonParse(this.specs));
    },
    tryJsonParse(specs) {
        try {
            JSON.parse(specs);
        } catch (e) {
            console.warn(`bskSpecsTable: JSON.parse(this.specs) failed!
            You probably have malformed json in the specs attribute. Check your markup.`)
            return
        }
        return JSON.parse(specs);
    }
};
