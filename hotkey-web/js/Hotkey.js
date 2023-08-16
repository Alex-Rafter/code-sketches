export class HotKeyQ {
    constructor(name, hotKey) {
      this.name = name;
      this.hotKey = hotKey;
      this.hash = (Math.random() + 1).toString(36).substring(7);
      this.toggle = false;
      this.hints = false;
    }

    // togg() {this.toggle = !this.toggle}
    togg() {
      console.log("activated")
      this.toggle = true
    }
    showHints() {this.hints = !this.hints}

  }
