
export const bskPageShare = {
    pageUrl: null,
    pageTitle: null,
    showCopyAlert: false,
    init(el) {
        this.pageUrl = window.location.href;
        this.pageTitle = document.title;
    },
    copyFunction(e) {
        console.log("copyFunction", e.target);
        const copyText = this.$refs["url-input"];
        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */
        navigator.clipboard.writeText(copyText.value);
        this.showCopyAlert = true;
    },
    mO(el) {
          // Select the parent element of `el`
          const parent = el.parentElement;
          console.log('parent is' , parent);

          // Create a new MutationObserver
          const observer = new MutationObserver(mutations => {
              mutations.forEach(mutation => {
                  if (mutation.type === "attributes") {
                      console.log(`Attribute ${mutation.attributeName} changed!`);
                      // Do something here when the attribute changes
                  }
              });
          });

          // Start observing the parent element for attribute changes
          observer.observe(parent, { attributes: true });
    }
};