(() => {
  // node_modules/itty-router/index.mjs
  var e = ({ base: e2 = "", routes: t = [] } = {}) => ({ __proto__: new Proxy({}, { get: (o2, s2, r, n) => (o3, ...a) => t.push([s2.toUpperCase(), RegExp(`^${(n = (e2 + o3).replace(/\/+(\/|$)/g, "$1")).replace(/(\/?\.?):(\w+)\+/g, "($1(?<$2>*))").replace(/(\/?\.?):(\w+)/g, "($1(?<$2>[^$1/]+?))").replace(/\./g, "\\.").replace(/(\/?)\*/g, "($1.*)?")}/*$`), a, n]) && r }), routes: t, async handle(e3, ...o2) {
    let s2, r, n = new URL(e3.url), a = e3.query = { __proto__: null };
    for (let [e4, t2] of n.searchParams)
      a[e4] = void 0 === a[e4] ? t2 : [a[e4], t2].flat();
    for (let [a2, c2, l2, i2] of t)
      if ((a2 === e3.method || "ALL" === a2) && (r = n.pathname.match(c2))) {
        e3.params = r.groups || {}, e3.route = i2;
        for (let t2 of l2)
          if (void 0 !== (s2 = await t2(e3.proxy || e3, ...o2)))
            return s2;
      }
  } });
  var o = (e2 = "text/plain; charset=utf-8", t) => (o2, s2) => {
    const { headers: r = {}, ...n } = s2 || {};
    return "Response" === o2?.constructor.name ? o2 : new Response(t ? t(o2) : o2, { headers: { "content-type": e2, ...r }, ...n });
  };
  var s = o("application/json; charset=utf-8", JSON.stringify);
  var c = o("text/plain; charset=utf-8", String);
  var l = o("text/html");
  var i = o("image/jpeg");
  var p = o("image/png");
  var d = o("image/webp");

  // src/message.js
  var message = "Hello World";

  // src/worker.js
  var router = e();
  router.get("/links", () => {
    return new Response("GET /links");
  });
  router.get("/tester", () => {
    return new Response(`GET /tester ${message}`);
  });
  router.get("*", () => {
    return new Response("GET *");
  });
  addEventListener("fetch", (event) => {
    event.respondWith(router.handle(event.request));
  });
})();
//# sourceMappingURL=worker.js.map
