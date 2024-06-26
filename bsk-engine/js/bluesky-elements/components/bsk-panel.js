const bskPanel = {
  linksData: null,
  init(el) {
    console.log('bsk-panel init', el);
    this.linksData = this.queryAndCreateThisProps(el)
    el.style.display = 'block'
    el.querySelector(`[slot="panel"]`).remove()
  },
  queryAndCreateThisProps(el) {
    const linksData = [];
    const linkGroup = el.querySelector('ul.link-group');
    const links = linkGroup.querySelectorAll('li');

    links.forEach(link => {
      const text = link.textContent.trim();
      const href = link.querySelector('a').href;
      linksData.push({ text, href });
    });
    return linksData
  },
  $template: /*html*/`
      <div @vue:mounted="init($el)" style="display: none;">
        <slot name="panel"></slot>
        <ul>
          <li v-for="obj in linksData">{{obj.text}}</li>
        </ul>
      </div>`,
}

export { bskPanel }