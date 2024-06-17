const bskSlotter = {
    init(el) {
        console.log('bsk-slotter init', el);
    },
    $template: /*html*/`
      <div @vue:mounted="init($el)">
        <slot name="panel"></slot>
        <h2>{{store.count}}</h2>
      </div>`,
}

export { bskSlotter }