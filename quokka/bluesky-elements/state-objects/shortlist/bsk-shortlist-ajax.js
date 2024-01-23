export const bskShortlistAjax = {
    rmDelayTime: 500,
    listenAndTrigger(el) {
        document.addEventListener("removedFromShortlist", (e) => {
            this.hideThenRemoveFromList(el, e.detail.stockId);
        });
    },
    hideThenRemoveFromList(el, stockId) {
        const elToFadeOut = document.querySelector(`#car_${stockId}`);
        elToFadeOut.classList.add("opacity-0");
        setTimeout(() => elToFadeOut.remove(), this.rmDelayTime);
    },
    async getUsedCarsForShortlist(el) {
        const stockIds = store.sl.cars.map(
            (item) => `cogstock_id=${item.stockId}`
        );
        let currentList;
        traverseChildren(el.children[0]);

        function traverseChildren(element) {
            if (element.children.length === 0) {
                currentList = element;
            }

            for (let i = 0; i < element.children.length; i++) {
                traverseChildren(element.children[i]);
            }
        }

        if (stockIds.length === 0) {
            this.noItems(currentList, el);
        } else {
            this.withItems(currentList, stockIds, el);
        }
        return;
    },
    noItems(currentList, el) {
        currentList.insertAdjacentHTML(
            "afterbegin",
            /*html*/ `
            <h2 class="display-5 py-5 text-center">Sorry, no shortlist items found</h2>
            `
        );
        this.setAndDispatchEvent(el);
    },
    async withItems(currentList, stockIds, el) {
        store.sl.isShortlistPage = true;
        let queryStringJoin = stockIds.join("&");
        const response = await fetch(
            `/inc/modules/used-list/ajax.aspx?no_head=true&${queryStringJoin}`
        );
        0;
        const data = await response.text();
        this.setAndDispatchEvent(el);
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");
        const usedListItems = doc.querySelectorAll(
            `div[id*="RepeaterUpdatePanel"] :is(bsk-vehicle-card, .grid-item)`
        );
        usedListItems.forEach((item) =>
            currentList.insertAdjacentHTML("afterbegin", item.outerHTML)
        );

        $("bsk-vehicle-card-titles").matchHeight();
        this.listenAndTrigger(el);
    },
    setAndDispatchEvent(el) {
        const event = new Event("shortlistLoaded", {
            bubbles: true,
            cancelable: true,
        });
        el.dispatchEvent(event);
    },
    mounted(el) {
        setTimeout(() => this.getUsedCarsForShortlist(el), 0);
    },
};
