(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // node_modules/@octokit/endpoint/node_modules/is-plain-object/dist/is-plain-object.js
  var require_is_plain_object = __commonJS({
    "node_modules/@octokit/endpoint/node_modules/is-plain-object/dist/is-plain-object.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function isObject(o) {
        return Object.prototype.toString.call(o) === "[object Object]";
      }
      function isPlainObject(o) {
        var ctor, prot;
        if (isObject(o) === false)
          return false;
        ctor = o.constructor;
        if (ctor === void 0)
          return true;
        prot = ctor.prototype;
        if (isObject(prot) === false)
          return false;
        if (prot.hasOwnProperty("isPrototypeOf") === false) {
          return false;
        }
        return true;
      }
      exports.isPlainObject = isPlainObject;
    }
  });

  // node_modules/universal-user-agent/dist-node/index.js
  var require_dist_node = __commonJS({
    "node_modules/universal-user-agent/dist-node/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function getUserAgent() {
        if (typeof navigator === "object" && "userAgent" in navigator) {
          return navigator.userAgent;
        }
        if (typeof process === "object" && "version" in process) {
          return `Node.js/${process.version.substr(1)} (${process.platform}; ${process.arch})`;
        }
        return "<environment undetectable>";
      }
      exports.getUserAgent = getUserAgent;
    }
  });

  // node_modules/@octokit/endpoint/dist-node/index.js
  var require_dist_node2 = __commonJS({
    "node_modules/@octokit/endpoint/dist-node/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var isPlainObject = require_is_plain_object();
      var universalUserAgent = require_dist_node();
      function lowercaseKeys(object) {
        if (!object) {
          return {};
        }
        return Object.keys(object).reduce((newObj, key) => {
          newObj[key.toLowerCase()] = object[key];
          return newObj;
        }, {});
      }
      function mergeDeep(defaults, options) {
        const result = Object.assign({}, defaults);
        Object.keys(options).forEach((key) => {
          if (isPlainObject.isPlainObject(options[key])) {
            if (!(key in defaults))
              Object.assign(result, {
                [key]: options[key]
              });
            else
              result[key] = mergeDeep(defaults[key], options[key]);
          } else {
            Object.assign(result, {
              [key]: options[key]
            });
          }
        });
        return result;
      }
      function removeUndefinedProperties(obj) {
        for (const key in obj) {
          if (obj[key] === void 0) {
            delete obj[key];
          }
        }
        return obj;
      }
      function merge(defaults, route, options) {
        if (typeof route === "string") {
          let [method, url] = route.split(" ");
          options = Object.assign(url ? {
            method,
            url
          } : {
            url: method
          }, options);
        } else {
          options = Object.assign({}, route);
        }
        options.headers = lowercaseKeys(options.headers);
        removeUndefinedProperties(options);
        removeUndefinedProperties(options.headers);
        const mergedOptions = mergeDeep(defaults || {}, options);
        if (defaults && defaults.mediaType.previews.length) {
          mergedOptions.mediaType.previews = defaults.mediaType.previews.filter((preview) => !mergedOptions.mediaType.previews.includes(preview)).concat(mergedOptions.mediaType.previews);
        }
        mergedOptions.mediaType.previews = mergedOptions.mediaType.previews.map((preview) => preview.replace(/-preview/, ""));
        return mergedOptions;
      }
      function addQueryParameters(url, parameters) {
        const separator = /\?/.test(url) ? "&" : "?";
        const names = Object.keys(parameters);
        if (names.length === 0) {
          return url;
        }
        return url + separator + names.map((name) => {
          if (name === "q") {
            return "q=" + parameters.q.split("+").map(encodeURIComponent).join("+");
          }
          return `${name}=${encodeURIComponent(parameters[name])}`;
        }).join("&");
      }
      var urlVariableRegex = /\{[^}]+\}/g;
      function removeNonChars(variableName) {
        return variableName.replace(/^\W+|\W+$/g, "").split(/,/);
      }
      function extractUrlVariableNames(url) {
        const matches = url.match(urlVariableRegex);
        if (!matches) {
          return [];
        }
        return matches.map(removeNonChars).reduce((a, b) => a.concat(b), []);
      }
      function omit(object, keysToOmit) {
        return Object.keys(object).filter((option) => !keysToOmit.includes(option)).reduce((obj, key) => {
          obj[key] = object[key];
          return obj;
        }, {});
      }
      function encodeReserved(str) {
        return str.split(/(%[0-9A-Fa-f]{2})/g).map(function(part) {
          if (!/%[0-9A-Fa-f]/.test(part)) {
            part = encodeURI(part).replace(/%5B/g, "[").replace(/%5D/g, "]");
          }
          return part;
        }).join("");
      }
      function encodeUnreserved(str) {
        return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
          return "%" + c.charCodeAt(0).toString(16).toUpperCase();
        });
      }
      function encodeValue(operator, value, key) {
        value = operator === "+" || operator === "#" ? encodeReserved(value) : encodeUnreserved(value);
        if (key) {
          return encodeUnreserved(key) + "=" + value;
        } else {
          return value;
        }
      }
      function isDefined(value) {
        return value !== void 0 && value !== null;
      }
      function isKeyOperator(operator) {
        return operator === ";" || operator === "&" || operator === "?";
      }
      function getValues(context, operator, key, modifier) {
        var value = context[key], result = [];
        if (isDefined(value) && value !== "") {
          if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            value = value.toString();
            if (modifier && modifier !== "*") {
              value = value.substring(0, parseInt(modifier, 10));
            }
            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : ""));
          } else {
            if (modifier === "*") {
              if (Array.isArray(value)) {
                value.filter(isDefined).forEach(function(value2) {
                  result.push(encodeValue(operator, value2, isKeyOperator(operator) ? key : ""));
                });
              } else {
                Object.keys(value).forEach(function(k) {
                  if (isDefined(value[k])) {
                    result.push(encodeValue(operator, value[k], k));
                  }
                });
              }
            } else {
              const tmp = [];
              if (Array.isArray(value)) {
                value.filter(isDefined).forEach(function(value2) {
                  tmp.push(encodeValue(operator, value2));
                });
              } else {
                Object.keys(value).forEach(function(k) {
                  if (isDefined(value[k])) {
                    tmp.push(encodeUnreserved(k));
                    tmp.push(encodeValue(operator, value[k].toString()));
                  }
                });
              }
              if (isKeyOperator(operator)) {
                result.push(encodeUnreserved(key) + "=" + tmp.join(","));
              } else if (tmp.length !== 0) {
                result.push(tmp.join(","));
              }
            }
          }
        } else {
          if (operator === ";") {
            if (isDefined(value)) {
              result.push(encodeUnreserved(key));
            }
          } else if (value === "" && (operator === "&" || operator === "?")) {
            result.push(encodeUnreserved(key) + "=");
          } else if (value === "") {
            result.push("");
          }
        }
        return result;
      }
      function parseUrl(template) {
        return {
          expand: expand.bind(null, template)
        };
      }
      function expand(template, context) {
        var operators = ["+", "#", ".", "/", ";", "?", "&"];
        return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function(_, expression, literal) {
          if (expression) {
            let operator = "";
            const values = [];
            if (operators.indexOf(expression.charAt(0)) !== -1) {
              operator = expression.charAt(0);
              expression = expression.substr(1);
            }
            expression.split(/,/g).forEach(function(variable) {
              var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
              values.push(getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
            });
            if (operator && operator !== "+") {
              var separator = ",";
              if (operator === "?") {
                separator = "&";
              } else if (operator !== "#") {
                separator = operator;
              }
              return (values.length !== 0 ? operator : "") + values.join(separator);
            } else {
              return values.join(",");
            }
          } else {
            return encodeReserved(literal);
          }
        });
      }
      function parse(options) {
        let method = options.method.toUpperCase();
        let url = (options.url || "/").replace(/:([a-z]\w+)/g, "{$1}");
        let headers = Object.assign({}, options.headers);
        let body;
        let parameters = omit(options, ["method", "baseUrl", "url", "headers", "request", "mediaType"]);
        const urlVariableNames = extractUrlVariableNames(url);
        url = parseUrl(url).expand(parameters);
        if (!/^http/.test(url)) {
          url = options.baseUrl + url;
        }
        const omittedParameters = Object.keys(options).filter((option) => urlVariableNames.includes(option)).concat("baseUrl");
        const remainingParameters = omit(parameters, omittedParameters);
        const isBinaryRequest = /application\/octet-stream/i.test(headers.accept);
        if (!isBinaryRequest) {
          if (options.mediaType.format) {
            headers.accept = headers.accept.split(/,/).map((preview) => preview.replace(/application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/, `application/vnd$1$2.${options.mediaType.format}`)).join(",");
          }
          if (options.mediaType.previews.length) {
            const previewsFromAcceptHeader = headers.accept.match(/[\w-]+(?=-preview)/g) || [];
            headers.accept = previewsFromAcceptHeader.concat(options.mediaType.previews).map((preview) => {
              const format = options.mediaType.format ? `.${options.mediaType.format}` : "+json";
              return `application/vnd.github.${preview}-preview${format}`;
            }).join(",");
          }
        }
        if (["GET", "HEAD"].includes(method)) {
          url = addQueryParameters(url, remainingParameters);
        } else {
          if ("data" in remainingParameters) {
            body = remainingParameters.data;
          } else {
            if (Object.keys(remainingParameters).length) {
              body = remainingParameters;
            } else {
              headers["content-length"] = 0;
            }
          }
        }
        if (!headers["content-type"] && typeof body !== "undefined") {
          headers["content-type"] = "application/json; charset=utf-8";
        }
        if (["PATCH", "PUT"].includes(method) && typeof body === "undefined") {
          body = "";
        }
        return Object.assign({
          method,
          url,
          headers
        }, typeof body !== "undefined" ? {
          body
        } : null, options.request ? {
          request: options.request
        } : null);
      }
      function endpointWithDefaults(defaults, route, options) {
        return parse(merge(defaults, route, options));
      }
      function withDefaults(oldDefaults, newDefaults) {
        const DEFAULTS2 = merge(oldDefaults, newDefaults);
        const endpoint2 = endpointWithDefaults.bind(null, DEFAULTS2);
        return Object.assign(endpoint2, {
          DEFAULTS: DEFAULTS2,
          defaults: withDefaults.bind(null, DEFAULTS2),
          merge: merge.bind(null, DEFAULTS2),
          parse
        });
      }
      var VERSION = "6.0.12";
      var userAgent = `octokit-endpoint.js/${VERSION} ${universalUserAgent.getUserAgent()}`;
      var DEFAULTS = {
        method: "GET",
        baseUrl: "https://api.github.com",
        headers: {
          accept: "application/vnd.github.v3+json",
          "user-agent": userAgent
        },
        mediaType: {
          format: "",
          previews: []
        }
      };
      var endpoint = withDefaults(null, DEFAULTS);
      exports.endpoint = endpoint;
    }
  });

  // node_modules/@octokit/request/node_modules/is-plain-object/dist/is-plain-object.js
  var require_is_plain_object2 = __commonJS({
    "node_modules/@octokit/request/node_modules/is-plain-object/dist/is-plain-object.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function isObject(o) {
        return Object.prototype.toString.call(o) === "[object Object]";
      }
      function isPlainObject(o) {
        var ctor, prot;
        if (isObject(o) === false)
          return false;
        ctor = o.constructor;
        if (ctor === void 0)
          return true;
        prot = ctor.prototype;
        if (isObject(prot) === false)
          return false;
        if (prot.hasOwnProperty("isPrototypeOf") === false) {
          return false;
        }
        return true;
      }
      exports.isPlainObject = isPlainObject;
    }
  });

  // node_modules/node-fetch/browser.js
  var require_browser = __commonJS({
    "node_modules/node-fetch/browser.js"(exports, module) {
      "use strict";
      var getGlobal = function() {
        if (typeof self !== "undefined") {
          return self;
        }
        if (typeof window !== "undefined") {
          return window;
        }
        if (typeof global !== "undefined") {
          return global;
        }
        throw new Error("unable to locate global object");
      };
      var global = getGlobal();
      module.exports = exports = global.fetch;
      if (global.fetch) {
        exports.default = global.fetch.bind(global);
      }
      exports.Headers = global.Headers;
      exports.Request = global.Request;
      exports.Response = global.Response;
    }
  });

  // node_modules/deprecation/dist-node/index.js
  var require_dist_node3 = __commonJS({
    "node_modules/deprecation/dist-node/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Deprecation = class extends Error {
        constructor(message) {
          super(message);
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }
          this.name = "Deprecation";
        }
      };
      exports.Deprecation = Deprecation;
    }
  });

  // node_modules/wrappy/wrappy.js
  var require_wrappy = __commonJS({
    "node_modules/wrappy/wrappy.js"(exports, module) {
      module.exports = wrappy;
      function wrappy(fn, cb) {
        if (fn && cb)
          return wrappy(fn)(cb);
        if (typeof fn !== "function")
          throw new TypeError("need wrapper function");
        Object.keys(fn).forEach(function(k) {
          wrapper[k] = fn[k];
        });
        return wrapper;
        function wrapper() {
          var args = new Array(arguments.length);
          for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
          }
          var ret = fn.apply(this, args);
          var cb2 = args[args.length - 1];
          if (typeof ret === "function" && ret !== cb2) {
            Object.keys(cb2).forEach(function(k) {
              ret[k] = cb2[k];
            });
          }
          return ret;
        }
      }
    }
  });

  // node_modules/once/once.js
  var require_once = __commonJS({
    "node_modules/once/once.js"(exports, module) {
      var wrappy = require_wrappy();
      module.exports = wrappy(once);
      module.exports.strict = wrappy(onceStrict);
      once.proto = once(function() {
        Object.defineProperty(Function.prototype, "once", {
          value: function() {
            return once(this);
          },
          configurable: true
        });
        Object.defineProperty(Function.prototype, "onceStrict", {
          value: function() {
            return onceStrict(this);
          },
          configurable: true
        });
      });
      function once(fn) {
        var f = function() {
          if (f.called)
            return f.value;
          f.called = true;
          return f.value = fn.apply(this, arguments);
        };
        f.called = false;
        return f;
      }
      function onceStrict(fn) {
        var f = function() {
          if (f.called)
            throw new Error(f.onceError);
          f.called = true;
          return f.value = fn.apply(this, arguments);
        };
        var name = fn.name || "Function wrapped with `once`";
        f.onceError = name + " shouldn't be called more than once";
        f.called = false;
        return f;
      }
    }
  });

  // node_modules/@octokit/request-error/dist-node/index.js
  var require_dist_node4 = __commonJS({
    "node_modules/@octokit/request-error/dist-node/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _interopDefault(ex) {
        return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
      }
      var deprecation = require_dist_node3();
      var once = _interopDefault(require_once());
      var logOnceCode = once((deprecation2) => console.warn(deprecation2));
      var logOnceHeaders = once((deprecation2) => console.warn(deprecation2));
      var RequestError = class extends Error {
        constructor(message, statusCode, options) {
          super(message);
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }
          this.name = "HttpError";
          this.status = statusCode;
          let headers;
          if ("headers" in options && typeof options.headers !== "undefined") {
            headers = options.headers;
          }
          if ("response" in options) {
            this.response = options.response;
            headers = options.response.headers;
          }
          const requestCopy = Object.assign({}, options.request);
          if (options.request.headers.authorization) {
            requestCopy.headers = Object.assign({}, options.request.headers, {
              authorization: options.request.headers.authorization.replace(/ .*$/, " [REDACTED]")
            });
          }
          requestCopy.url = requestCopy.url.replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]").replace(/\baccess_token=\w+/g, "access_token=[REDACTED]");
          this.request = requestCopy;
          Object.defineProperty(this, "code", {
            get() {
              logOnceCode(new deprecation.Deprecation("[@octokit/request-error] `error.code` is deprecated, use `error.status`."));
              return statusCode;
            }
          });
          Object.defineProperty(this, "headers", {
            get() {
              logOnceHeaders(new deprecation.Deprecation("[@octokit/request-error] `error.headers` is deprecated, use `error.response.headers`."));
              return headers || {};
            }
          });
        }
      };
      exports.RequestError = RequestError;
    }
  });

  // node_modules/@octokit/request/dist-node/index.js
  var require_dist_node5 = __commonJS({
    "node_modules/@octokit/request/dist-node/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _interopDefault(ex) {
        return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
      }
      var endpoint = require_dist_node2();
      var universalUserAgent = require_dist_node();
      var isPlainObject = require_is_plain_object2();
      var nodeFetch = _interopDefault(require_browser());
      var requestError = require_dist_node4();
      var VERSION = "5.6.3";
      function getBufferResponse(response) {
        return response.arrayBuffer();
      }
      function fetchWrapper(requestOptions) {
        const log = requestOptions.request && requestOptions.request.log ? requestOptions.request.log : console;
        if (isPlainObject.isPlainObject(requestOptions.body) || Array.isArray(requestOptions.body)) {
          requestOptions.body = JSON.stringify(requestOptions.body);
        }
        let headers = {};
        let status;
        let url;
        const fetch = UrlFetchApp.fetch;
        return fetch(requestOptions.url, Object.assign({
          method: requestOptions.method,
          body: requestOptions.body,
          headers: requestOptions.headers,
          redirect: requestOptions.redirect
        }, requestOptions.request)).then(async (response) => {
          url = response.url;
          status = response.status;
          for (const keyAndValue of response.headers) {
            headers[keyAndValue[0]] = keyAndValue[1];
          }
          if ("deprecation" in headers) {
            const matches = headers.link && headers.link.match(/<([^>]+)>; rel="deprecation"/);
            const deprecationLink = matches && matches.pop();
            log.warn(`[@octokit/request] "${requestOptions.method} ${requestOptions.url}" is deprecated. It is scheduled to be removed on ${headers.sunset}${deprecationLink ? `. See ${deprecationLink}` : ""}`);
          }
          if (status === 204 || status === 205) {
            return;
          }
          if (requestOptions.method === "HEAD") {
            if (status < 400) {
              return;
            }
            throw new requestError.RequestError(response.statusText, status, {
              response: {
                url,
                status,
                headers,
                data: void 0
              },
              request: requestOptions
            });
          }
          if (status === 304) {
            throw new requestError.RequestError("Not modified", status, {
              response: {
                url,
                status,
                headers,
                data: await getResponseData(response)
              },
              request: requestOptions
            });
          }
          if (status >= 400) {
            const data = await getResponseData(response);
            const error = new requestError.RequestError(toErrorMessage(data), status, {
              response: {
                url,
                status,
                headers,
                data
              },
              request: requestOptions
            });
            throw error;
          }
          return getResponseData(response);
        }).then((data) => {
          return {
            status,
            url,
            headers,
            data
          };
        }).catch((error) => {
          if (error instanceof requestError.RequestError)
            throw error;
          throw new requestError.RequestError(error.message, 500, {
            request: requestOptions
          });
        });
      }
      async function getResponseData(response) {
        const contentType = response.headers.get("content-type");
        if (/application\/json/.test(contentType)) {
          return response.json();
        }
        if (!contentType || /^text\/|charset=utf-8$/.test(contentType)) {
          return response.text();
        }
        return getBufferResponse(response);
      }
      function toErrorMessage(data) {
        if (typeof data === "string")
          return data;
        if ("message" in data) {
          if (Array.isArray(data.errors)) {
            return `${data.message}: ${data.errors.map(JSON.stringify).join(", ")}`;
          }
          return data.message;
        }
        return `Unknown error: ${JSON.stringify(data)}`;
      }
      function withDefaults(oldEndpoint, newDefaults) {
        const endpoint2 = oldEndpoint.defaults(newDefaults);
        const newApi = function(route, parameters) {
          const endpointOptions = endpoint2.merge(route, parameters);
          if (!endpointOptions.request || !endpointOptions.request.hook) {
            return fetchWrapper(endpoint2.parse(endpointOptions));
          }
          const request3 = (route2, parameters2) => {
            return fetchWrapper(endpoint2.parse(endpoint2.merge(route2, parameters2)));
          };
          Object.assign(request3, {
            endpoint: endpoint2,
            defaults: withDefaults.bind(null, endpoint2)
          });
          return endpointOptions.request.hook(request3, endpointOptions);
        };
        return Object.assign(newApi, {
          endpoint: endpoint2,
          defaults: withDefaults.bind(null, endpoint2)
        });
      }
      var request2 = withDefaults(endpoint.endpoint, {
        headers: {
          "user-agent": `octokit-request.js/${VERSION} ${universalUserAgent.getUserAgent()}`
        }
      });
      exports.request = request2;
    }
  });

  // apps-script/index.js
  var { request } = require_dist_node5();
})();
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
