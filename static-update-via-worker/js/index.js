const worker = new Worker("/js/worker/worker.js");
const clientCountChannel = new BroadcastChannel("client-count");
const workerLoadingStatusChannel = new BroadcastChannel("worker-loading-status");

workerLoadingStatusChannel.onmessage = ({ data }) => data.message === "loaded" && broadcastToWorker();

window.addEventListener("DOMContentLoaded", (event) => {
  passAllCmsDomNodesToWorker();
});

window.addEventListener("beforeunload", () => {
  caches.delete("data");
});


worker.addEventListener("message", (event) => {
  const { message, cmsRef, gridContent } = event.data;
  if (message !== "add to dom") return;
  updateDomWithGridContent(cmsRef, gridContent);
});

// Funcs : START

function broadcastToWorker() {
  clientCountChannel.postMessage("add client");
}

async function passAllCmsDomNodesToWorker() {
  const cmsElements = Array.from(
    document.querySelectorAll("[data-cogcms-ref]")
  );
  if (cmsElements.length < 1) return;
  cmsElements.forEach((el) => {
    passDataRefToWorker(el.dataset.cogcmsRef);
    setTimeout(() => el.classList.remove("d-none"));
  });
}

function passDataRefToWorker(ref) {
  worker.postMessage(["ref found", ref]);
}

function updateDomWithGridContent(cmsRef, gridContent) {
  const cmsDomElToUpdate = document.querySelector(
    `[data-cogcms-ref="${cmsRef}"]`
  );
  cmsDomElToUpdate.innerHTML = gridContent;
}

// Funcs : END
