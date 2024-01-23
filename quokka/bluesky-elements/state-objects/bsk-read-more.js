export const bskReadMore = {
  showFullText: true,
  triggerToggle() {
    const elOfText = document.querySelector(`${this.target}`);
    const fullText = elOfText.dataset.initialText;
    const charsToTruncateTo = this.chars || 150;
    const truncateTextContent = `${fullText.substring(
      0,
      charsToTruncateTo
    )}...`;
    const toggleState = () => (this.showFullText = !this.showFullText);
    const toggleText = () =>
      (elOfText.textContent = this.showFullText
        ? fullText
        : truncateTextContent);

    toggleState();
    toggleText();
  },
  mounted() {
    const el = document.querySelector(`${this.target}`);
    el.dataset.initialText = el.textContent;
    if (window.innerWidth < 992) this.triggerToggle();
  }
};
