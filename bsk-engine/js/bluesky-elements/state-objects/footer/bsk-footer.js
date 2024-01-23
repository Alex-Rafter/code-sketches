export const bskFooter = {
  slotThreeIsUnused : false,
  init(el) {
    setTimeout(() => {
      if (this.is == 'centered') return
      // slots are replaced by default in make-component.js via the slots() method
      // If they are still present, it means that slot wasn't used by dev in their footer set up
      // We use this to determine whether or not to update classes for slot four content eg the el with attr [slot="four"]
      const slotThree = el.querySelector('slot[name="three"]')
      const slotFour = el.querySelector('slot[name="four"]')
      // we only want to update the col classes if slot three is unused and slot four is used, otherwise return early
      if (slotFour || ! slotThree) return
      this.slotThreeIsUnused = true
    },0)

  },
};
