const workerLoadingStatusChannel = new BroadcastChannel("worker-loading-status");

self.addEventListener("message", (event) => {
  const [message, ref] = event.data;
  if (message === "ref found") {
    getData(ref);
  }
});

class Message {
  constructor(message = null, cmsRef = null, gridContent = null) {
    this.message = message
    this.cmsRef = cmsRef
    this.gridContent = gridContent
  }
}

const clientCountChannel = new BroadcastChannel("client-count");
let clients = 0

workerLoadingStatusChannel.postMessage({message : 'loaded', clients : clients})

clientCountChannel.onmessage = ({ data, origin }) => {
  if (data === 'add client') {
    clients++
    console.log(data);
    console.log('clients : ', clients);
  }

};

async function getData(ref) {
  // const data = await caches
  //   .open("data")
  //   .then((cache) => cache.match("/data/cms.json"));
  // const json = await data.json();

  const data = await fetch("/data/cms.json");
  const json = await data.json();

  const { cmsRef, gridContent } = json;
  const refAndCmsMatchStatus = ref === cmsRef;
  if (refAndCmsMatchStatus) {
    self.postMessage(new Message("add to dom", cmsRef, gridContent));
  }
}
