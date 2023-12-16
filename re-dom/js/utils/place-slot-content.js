function placeSlotContent() {
    const slots = [...this.base.querySelectorAll('slot')]
    const slotContent = [...this.base.parentElement.querySelectorAll('[slot]')]
    if (slots.length > 0 && slotContent.length > 0) {
        slotContent.forEach(el => slots.find(slot => el.getAttribute('slot') === slot.getAttribute('name')).appendChild(el))
    }
}

export { placeSlotContent }