export const bskVehicleCardSpecs = {
    specs : null,
    is : null,
    icons : null,
    classArray: [
       this.specs.split('|').length > 3 ? 'd-grid' : 'd-flex flex-wrap',
       this.is == 'pills' ? 'px-xl-1 px-xxl-2 justify-content-around' : 'p-2 justify-content-between',
       this.is == 'default' && icons == false ? 'border-1 border-top border-bottom' : '',
        store.ucr.gridType == 'list' ? 'list-view mx-auto' : '',
    ]
  };
