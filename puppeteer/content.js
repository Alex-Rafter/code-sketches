(function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.getCssUsed = factory());
})(this, function () {
    "use strict";
    function getAugmentedNamespace(n) {
        if (n.__esModule)
            return n;
        var f = n.default;
        if (typeof f == "function") {
            var a = function a2() {
                if (this instanceof a2) {
                    var args = [null];
                    args.push.apply(args, arguments);
                    var Ctor = Function.bind.apply(f, args);
                    return new Ctor();
                }
                return f.apply(this, arguments);
            };
            a.prototype = f.prototype;
        } else
            a = {};
        Object.defineProperty(a, "__esModule", { value: true });
        Object.keys(n).forEach(function (k) {
            var d = Object.getOwnPropertyDescriptor(n, k);
            Object.defineProperty(a, k, d.get ? d : {
                enumerable: true,
                get: function () {
                    return n[k];
                }
            });
        });
        return a;
    }
    var picocolors_browserExports = {};
    var picocolors_browser = {
        get exports() {
            return picocolors_browserExports;
        },
        set exports(v) {
            picocolors_browserExports = v;
        }
    };
    var x = String;
    var create = function () {
        return { isColorSupported: false, reset: x, bold: x, dim: x, italic: x, underline: x, inverse: x, hidden: x, strikethrough: x, black: x, red: x, green: x, yellow: x, blue: x, magenta: x, cyan: x, white: x, gray: x, bgBlack: x, bgRed: x, bgGreen: x, bgYellow: x, bgBlue: x, bgMagenta: x, bgCyan: x, bgWhite: x };
    };
    picocolors_browser.exports = create();
    picocolors_browserExports.createColors = create;
    const __viteBrowserExternal = {};
    const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
        __proto__: null,
        default: __viteBrowserExternal
    }, Symbol.toStringTag, { value: "Module" }));
    const require$$2 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
    let pico = picocolors_browserExports;
    let terminalHighlight$1 = require$$2;
    let CssSyntaxError$4 = class CssSyntaxError extends Error {
        constructor(message, line, column, source, file, plugin2) {
            super(message);
            this.name = "CssSyntaxError";
            this.reason = message;
            if (file) {
                this.file = file;
            }
            if (source) {
                this.source = source;
            }
            if (plugin2) {
                this.plugin = plugin2;
            }
            if (typeof line !== "undefined" && typeof column !== "undefined") {
                if (typeof line === "number") {
                    this.line = line;
                    this.column = column;
                } else {
                    this.line = line.line;
                    this.column = line.column;
                    this.endLine = column.line;
                    this.endColumn = column.column;
                }
            }
            this.setMessage();
            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, CssSyntaxError$4);
            }
        }
        setMessage() {
            this.message = this.plugin ? this.plugin + ": " : "";
            this.message += this.file ? this.file : "<css input>";
            if (typeof this.line !== "undefined") {
                this.message += ":" + this.line + ":" + this.column;
            }
            this.message += ": " + this.reason;
        }
        showSourceCode(color) {
            if (!this.source)
                return "";
            let css = this.source;
            if (color == null)
                color = pico.isColorSupported;
            if (terminalHighlight$1) {
                if (color)
                    css = terminalHighlight$1(css);
            }
            let lines = css.split(/\r?\n/);
            let start = Math.max(this.line - 3, 0);
            let end = Math.min(this.line + 2, lines.length);
            let maxWidth = String(end).length;
            let mark, aside;
            if (color) {
                let { bold, red, gray } = pico.createColors(true);
                mark = (text) => bold(red(text));
                aside = (text) => gray(text);
            } else {
                mark = aside = (str) => str;
            }
            return lines.slice(start, end).map((line, index) => {
                let number = start + 1 + index;
                let gutter = " " + (" " + number).slice(-maxWidth) + " | ";
                if (number === this.line) {
                    let spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, this.column - 1).replace(/[^\t]/g, " ");
                    return mark(">") + aside(gutter) + line + "\n " + spacing + mark("^");
                }
                return " " + aside(gutter) + line;
            }).join("\n");
        }
        toString() {
            let code = this.showSourceCode();
            if (code) {
                code = "\n\n" + code + "\n";
            }
            return this.name + ": " + this.message + code;
        }
    };
    var cssSyntaxError = CssSyntaxError$4;
    CssSyntaxError$4.default = CssSyntaxError$4;
    var symbols = {};
    symbols.isClean = Symbol("isClean");
    symbols.my = Symbol("my");
    const DEFAULT_RAW = {
        colon: ": ",
        indent: "    ",
        beforeDecl: "\n",
        beforeRule: "\n",
        beforeOpen: " ",
        beforeClose: "\n",
        beforeComment: "\n",
        after: "\n",
        emptyBody: "",
        commentLeft: " ",
        commentRight: " ",
        semicolon: false
    };
    function capitalize(str) {
        return str[0].toUpperCase() + str.slice(1);
    }
    let Stringifier$2 = class Stringifier {
        constructor(builder) {
            this.builder = builder;
        }
        stringify(node2, semicolon) {
            if (!this[node2.type]) {
                throw new Error(
                    "Unknown AST node type " + node2.type + ". Maybe you need to change PostCSS stringifier."
                );
            }
            this[node2.type](node2, semicolon);
        }
        document(node2) {
            this.body(node2);
        }
        root(node2) {
            this.body(node2);
            if (node2.raws.after)
                this.builder(node2.raws.after);
        }
        comment(node2) {
            let left = this.raw(node2, "left", "commentLeft");
            let right = this.raw(node2, "right", "commentRight");
            this.builder("/*" + left + node2.text + right + "*/", node2);
        }
        decl(node2, semicolon) {
            let between = this.raw(node2, "between", "colon");
            let string = node2.prop + between + this.rawValue(node2, "value");
            if (node2.important) {
                string += node2.raws.important || " !important";
            }
            if (semicolon)
                string += ";";
            this.builder(string, node2);
        }
        rule(node2) {
            this.block(node2, this.rawValue(node2, "selector"));
            if (node2.raws.ownSemicolon) {
                this.builder(node2.raws.ownSemicolon, node2, "end");
            }
        }
        atrule(node2, semicolon) {
            let name = "@" + node2.name;
            let params = node2.params ? this.rawValue(node2, "params") : "";
            if (typeof node2.raws.afterName !== "undefined") {
                name += node2.raws.afterName;
            } else if (params) {
                name += " ";
            }
            if (node2.nodes) {
                this.block(node2, name + params);
            } else {
                let end = (node2.raws.between || "") + (semicolon ? ";" : "");
                this.builder(name + params + end, node2);
            }
        }
        body(node2) {
            let last = node2.nodes.length - 1;
            while (last > 0) {
                if (node2.nodes[last].type !== "comment")
                    break;
                last -= 1;
            }
            let semicolon = this.raw(node2, "semicolon");
            for (let i = 0; i < node2.nodes.length; i++) {
                let child = node2.nodes[i];
                let before = this.raw(child, "before");
                if (before)
                    this.builder(before);
                this.stringify(child, last !== i || semicolon);
            }
        }
        block(node2, start) {
            let between = this.raw(node2, "between", "beforeOpen");
            this.builder(start + between + "{", node2, "start");
            let after;
            if (node2.nodes && node2.nodes.length) {
                this.body(node2);
                after = this.raw(node2, "after");
            } else {
                after = this.raw(node2, "after", "emptyBody");
            }
            if (after)
                this.builder(after);
            this.builder("}", node2, "end");
        }
        raw(node2, own, detect) {
            let value;
            if (!detect)
                detect = own;
            if (own) {
                value = node2.raws[own];
                if (typeof value !== "undefined")
                    return value;
            }
            let parent = node2.parent;
            if (detect === "before") {
                if (!parent || parent.type === "root" && parent.first === node2) {
                    return "";
                }
                if (parent && parent.type === "document") {
                    return "";
                }
            }
            if (!parent)
                return DEFAULT_RAW[detect];
            let root2 = node2.root();
            if (!root2.rawCache)
                root2.rawCache = {};
            if (typeof root2.rawCache[detect] !== "undefined") {
                return root2.rawCache[detect];
            }
            if (detect === "before" || detect === "after") {
                return this.beforeAfter(node2, detect);
            } else {
                let method = "raw" + capitalize(detect);
                if (this[method]) {
                    value = this[method](root2, node2);
                } else {
                    root2.walk((i) => {
                        value = i.raws[own];
                        if (typeof value !== "undefined")
                            return false;
                    });
                }
            }
            if (typeof value === "undefined")
                value = DEFAULT_RAW[detect];
            root2.rawCache[detect] = value;
            return value;
        }
        rawSemicolon(root2) {
            let value;
            root2.walk((i) => {
                if (i.nodes && i.nodes.length && i.last.type === "decl") {
                    value = i.raws.semicolon;
                    if (typeof value !== "undefined")
                        return false;
                }
            });
            return value;
        }
        rawEmptyBody(root2) {
            let value;
            root2.walk((i) => {
                if (i.nodes && i.nodes.length === 0) {
                    value = i.raws.after;
                    if (typeof value !== "undefined")
                        return false;
                }
            });
            return value;
        }
        rawIndent(root2) {
            if (root2.raws.indent)
                return root2.raws.indent;
            let value;
            root2.walk((i) => {
                let p = i.parent;
                if (p && p !== root2 && p.parent && p.parent === root2) {
                    if (typeof i.raws.before !== "undefined") {
                        let parts = i.raws.before.split("\n");
                        value = parts[parts.length - 1];
                        value = value.replace(/\S/g, "");
                        return false;
                    }
                }
            });
            return value;
        }
        rawBeforeComment(root2, node2) {
            let value;
            root2.walkComments((i) => {
                if (typeof i.raws.before !== "undefined") {
                    value = i.raws.before;
                    if (value.includes("\n")) {
                        value = value.replace(/[^\n]+$/, "");
                    }
                    return false;
                }
            });
            if (typeof value === "undefined") {
                value = this.raw(node2, null, "beforeDecl");
            } else if (value) {
                value = value.replace(/\S/g, "");
            }
            return value;
        }
        rawBeforeDecl(root2, node2) {
            let value;
            root2.walkDecls((i) => {
                if (typeof i.raws.before !== "undefined") {
                    value = i.raws.before;
                    if (value.includes("\n")) {
                        value = value.replace(/[^\n]+$/, "");
                    }
                    return false;
                }
            });
            if (typeof value === "undefined") {
                value = this.raw(node2, null, "beforeRule");
            } else if (value) {
                value = value.replace(/\S/g, "");
            }
            return value;
        }
        rawBeforeRule(root2) {
            let value;
            root2.walk((i) => {
                if (i.nodes && (i.parent !== root2 || root2.first !== i)) {
                    if (typeof i.raws.before !== "undefined") {
                        value = i.raws.before;
                        if (value.includes("\n")) {
                            value = value.replace(/[^\n]+$/, "");
                        }
                        return false;
                    }
                }
            });
            if (value)
                value = value.replace(/\S/g, "");
            return value;
        }
        rawBeforeClose(root2) {
            let value;
            root2.walk((i) => {
                if (i.nodes && i.nodes.length > 0) {
                    if (typeof i.raws.after !== "undefined") {
                        value = i.raws.after;
                        if (value.includes("\n")) {
                            value = value.replace(/[^\n]+$/, "");
                        }
                        return false;
                    }
                }
            });
            if (value)
                value = value.replace(/\S/g, "");
            return value;
        }
        rawBeforeOpen(root2) {
            let value;
            root2.walk((i) => {
                if (i.type !== "decl") {
                    value = i.raws.between;
                    if (typeof value !== "undefined")
                        return false;
                }
            });
            return value;
        }
        rawColon(root2) {
            let value;
            root2.walkDecls((i) => {
                if (typeof i.raws.between !== "undefined") {
                    value = i.raws.between.replace(/[^\s:]/g, "");
                    return false;
                }
            });
            return value;
        }
        beforeAfter(node2, detect) {
            let value;
            if (node2.type === "decl") {
                value = this.raw(node2, null, "beforeDecl");
            } else if (node2.type === "comment") {
                value = this.raw(node2, null, "beforeComment");
            } else if (detect === "before") {
                value = this.raw(node2, null, "beforeRule");
            } else {
                value = this.raw(node2, null, "beforeClose");
            }
            let buf = node2.parent;
            let depth = 0;
            while (buf && buf.type !== "root") {
                depth += 1;
                buf = buf.parent;
            }
            if (value.includes("\n")) {
                let indent = this.raw(node2, null, "indent");
                if (indent.length) {
                    for (let step = 0; step < depth; step++)
                        value += indent;
                }
            }
            return value;
        }
        rawValue(node2, prop) {
            let value = node2[prop];
            let raw = node2.raws[prop];
            if (raw && raw.value === value) {
                return raw.raw;
            }
            return value;
        }
    };
    var stringifier = Stringifier$2;
    Stringifier$2.default = Stringifier$2;
    let Stringifier$1 = stringifier;
    function stringify$5(node2, builder) {
        let str = new Stringifier$1(builder);
        str.stringify(node2);
    }
    var stringify_1 = stringify$5;
    stringify$5.default = stringify$5;
    let { isClean: isClean$2, my: my$2 } = symbols;
    let CssSyntaxError$3 = cssSyntaxError;
    let Stringifier = stringifier;
    let stringify$4 = stringify_1;
    function cloneNode(obj, parent) {
        let cloned = new obj.constructor();
        for (let i in obj) {
            if (!Object.prototype.hasOwnProperty.call(obj, i)) {
                continue;
            }
            if (i === "proxyCache")
                continue;
            let value = obj[i];
            let type = typeof value;
            if (i === "parent" && type === "object") {
                if (parent)
                    cloned[i] = parent;
            } else if (i === "source") {
                cloned[i] = value;
            } else if (Array.isArray(value)) {
                cloned[i] = value.map((j) => cloneNode(j, cloned));
            } else {
                if (type === "object" && value !== null)
                    value = cloneNode(value);
                cloned[i] = value;
            }
        }
        return cloned;
    }
    let Node$5 = class Node {
        constructor(defaults = {}) {
            this.raws = {};
            this[isClean$2] = false;
            this[my$2] = true;
            for (let name in defaults) {
                if (name === "nodes") {
                    this.nodes = [];
                    for (let node2 of defaults[name]) {
                        if (typeof node2.clone === "function") {
                            this.append(node2.clone());
                        } else {
                            this.append(node2);
                        }
                    }
                } else {
                    this[name] = defaults[name];
                }
            }
        }
        error(message, opts = {}) {
            if (this.source) {
                let { start, end } = this.rangeBy(opts);
                return this.source.input.error(
                    message,
                    { line: start.line, column: start.column },
                    { line: end.line, column: end.column },
                    opts
                );
            }
            return new CssSyntaxError$3(message);
        }
        warn(result2, text, opts) {
            let data = { node: this };
            for (let i in opts)
                data[i] = opts[i];
            return result2.warn(text, data);
        }
        remove() {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.parent = void 0;
            return this;
        }
        toString(stringifier2 = stringify$4) {
            if (stringifier2.stringify)
                stringifier2 = stringifier2.stringify;
            let result2 = "";
            stringifier2(this, (i) => {
                result2 += i;
            });
            return result2;
        }
        assign(overrides = {}) {
            for (let name in overrides) {
                this[name] = overrides[name];
            }
            return this;
        }
        clone(overrides = {}) {
            let cloned = cloneNode(this);
            for (let name in overrides) {
                cloned[name] = overrides[name];
            }
            return cloned;
        }
        cloneBefore(overrides = {}) {
            let cloned = this.clone(overrides);
            this.parent.insertBefore(this, cloned);
            return cloned;
        }
        cloneAfter(overrides = {}) {
            let cloned = this.clone(overrides);
            this.parent.insertAfter(this, cloned);
            return cloned;
        }
        replaceWith(...nodes) {
            if (this.parent) {
                let bookmark = this;
                let foundSelf = false;
                for (let node2 of nodes) {
                    if (node2 === this) {
                        foundSelf = true;
                    } else if (foundSelf) {
                        this.parent.insertAfter(bookmark, node2);
                        bookmark = node2;
                    } else {
                        this.parent.insertBefore(bookmark, node2);
                    }
                }
                if (!foundSelf) {
                    this.remove();
                }
            }
            return this;
        }
        next() {
            if (!this.parent)
                return void 0;
            let index = this.parent.index(this);
            return this.parent.nodes[index + 1];
        }
        prev() {
            if (!this.parent)
                return void 0;
            let index = this.parent.index(this);
            return this.parent.nodes[index - 1];
        }
        before(add) {
            this.parent.insertBefore(this, add);
            return this;
        }
        after(add) {
            this.parent.insertAfter(this, add);
            return this;
        }
        root() {
            let result2 = this;
            while (result2.parent && result2.parent.type !== "document") {
                result2 = result2.parent;
            }
            return result2;
        }
        raw(prop, defaultType) {
            let str = new Stringifier();
            return str.raw(this, prop, defaultType);
        }
        cleanRaws(keepBetween) {
            delete this.raws.before;
            delete this.raws.after;
            if (!keepBetween)
                delete this.raws.between;
        }
        toJSON(_, inputs) {
            let fixed = {};
            let emitInputs = inputs == null;
            inputs = inputs || /* @__PURE__ */ new Map();
            let inputsNextIndex = 0;
            for (let name in this) {
                if (!Object.prototype.hasOwnProperty.call(this, name)) {
                    continue;
                }
                if (name === "parent" || name === "proxyCache")
                    continue;
                let value = this[name];
                if (Array.isArray(value)) {
                    fixed[name] = value.map((i) => {
                        if (typeof i === "object" && i.toJSON) {
                            return i.toJSON(null, inputs);
                        } else {
                            return i;
                        }
                    });
                } else if (typeof value === "object" && value.toJSON) {
                    fixed[name] = value.toJSON(null, inputs);
                } else if (name === "source") {
                    let inputId = inputs.get(value.input);
                    if (inputId == null) {
                        inputId = inputsNextIndex;
                        inputs.set(value.input, inputsNextIndex);
                        inputsNextIndex++;
                    }
                    fixed[name] = {
                        inputId,
                        start: value.start,
                        end: value.end
                    };
                } else {
                    fixed[name] = value;
                }
            }
            if (emitInputs) {
                fixed.inputs = [...inputs.keys()].map((input2) => input2.toJSON());
            }
            return fixed;
        }
        positionInside(index) {
            let string = this.toString();
            let column = this.source.start.column;
            let line = this.source.start.line;
            for (let i = 0; i < index; i++) {
                if (string[i] === "\n") {
                    column = 1;
                    line += 1;
                } else {
                    column += 1;
                }
            }
            return { line, column };
        }
        positionBy(opts) {
            let pos = this.source.start;
            if (opts.index) {
                pos = this.positionInside(opts.index);
            } else if (opts.word) {
                let index = this.toString().indexOf(opts.word);
                if (index !== -1)
                    pos = this.positionInside(index);
            }
            return pos;
        }
        rangeBy(opts) {
            let start = {
                line: this.source.start.line,
                column: this.source.start.column
            };
            let end = this.source.end ? {
                line: this.source.end.line,
                column: this.source.end.column + 1
            } : {
                line: start.line,
                column: start.column + 1
            };
            if (opts.word) {
                let index = this.toString().indexOf(opts.word);
                if (index !== -1) {
                    start = this.positionInside(index);
                    end = this.positionInside(index + opts.word.length);
                }
            } else {
                if (opts.start) {
                    start = {
                        line: opts.start.line,
                        column: opts.start.column
                    };
                } else if (opts.index) {
                    start = this.positionInside(opts.index);
                }
                if (opts.end) {
                    end = {
                        line: opts.end.line,
                        column: opts.end.column
                    };
                } else if (opts.endIndex) {
                    end = this.positionInside(opts.endIndex);
                } else if (opts.index) {
                    end = this.positionInside(opts.index + 1);
                }
            }
            if (end.line < start.line || end.line === start.line && end.column <= start.column) {
                end = { line: start.line, column: start.column + 1 };
            }
            return { start, end };
        }
        getProxyProcessor() {
            return {
                set(node2, prop, value) {
                    if (node2[prop] === value)
                        return true;
                    node2[prop] = value;
                    if (prop === "prop" || prop === "value" || prop === "name" || prop === "params" || prop === "important" || /* c8 ignore next */
                        prop === "text") {
                        node2.markDirty();
                    }
                    return true;
                },
                get(node2, prop) {
                    if (prop === "proxyOf") {
                        return node2;
                    } else if (prop === "root") {
                        return () => node2.root().toProxy();
                    } else {
                        return node2[prop];
                    }
                }
            };
        }
        toProxy() {
            if (!this.proxyCache) {
                this.proxyCache = new Proxy(this, this.getProxyProcessor());
            }
            return this.proxyCache;
        }
        addToError(error) {
            error.postcssNode = this;
            if (error.stack && this.source && /\n\s{4}at /.test(error.stack)) {
                let s = this.source;
                error.stack = error.stack.replace(
                    /\n\s{4}at /,
                    `$&${s.input.from}:${s.start.line}:${s.start.column}$&`
                );
            }
            return error;
        }
        markDirty() {
            if (this[isClean$2]) {
                this[isClean$2] = false;
                let next = this;
                while (next = next.parent) {
                    next[isClean$2] = false;
                }
            }
        }
        get proxyOf() {
            return this;
        }
    };
    var node = Node$5;
    Node$5.default = Node$5;
    let Node$4 = node;
    let Declaration$5 = class Declaration extends Node$4 {
        constructor(defaults) {
            if (defaults && typeof defaults.value !== "undefined" && typeof defaults.value !== "string") {
                defaults = { ...defaults, value: String(defaults.value) };
            }
            super(defaults);
            this.type = "decl";
        }
        get variable() {
            return this.prop.startsWith("--") || this.prop[0] === "$";
        }
    };
    var declaration = Declaration$5;
    Declaration$5.default = Declaration$5;
    let urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
    let customAlphabet = (alphabet, defaultSize = 21) => {
        return (size = defaultSize) => {
            let id = "";
            let i = size;
            while (i--) {
                id += alphabet[Math.random() * alphabet.length | 0];
            }
            return id;
        };
    };
    let nanoid$1 = (size = 21) => {
        let id = "";
        let i = size;
        while (i--) {
            id += urlAlphabet[Math.random() * 64 | 0];
        }
        return id;
    };
    const nonSecure = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
        __proto__: null,
        customAlphabet,
        nanoid: nanoid$1
    }, Symbol.toStringTag, { value: "Module" }));
    const require$$3 = /* @__PURE__ */ getAugmentedNamespace(nonSecure);
    let { SourceMapConsumer: SourceMapConsumer$2, SourceMapGenerator: SourceMapGenerator$2 } = require$$2;
    let { existsSync, readFileSync } = require$$2;
    let { dirname: dirname$1, join } = require$$2;
    function fromBase64(str) {
        if (Buffer) {
            return Buffer.from(str, "base64").toString();
        } else {
            return window.atob(str);
        }
    }
    let PreviousMap$2 = class PreviousMap {
        constructor(css, opts) {
            if (opts.map === false)
                return;
            this.loadAnnotation(css);
            this.inline = this.startWith(this.annotation, "data:");
            let prev = opts.map ? opts.map.prev : void 0;
            let text = this.loadMap(opts.from, prev);
            if (!this.mapFile && opts.from) {
                this.mapFile = opts.from;
            }
            if (this.mapFile)
                this.root = dirname$1(this.mapFile);
            if (text)
                this.text = text;
        }
        consumer() {
            if (!this.consumerCache) {
                this.consumerCache = new SourceMapConsumer$2(this.text);
            }
            return this.consumerCache;
        }
        withContent() {
            return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
        }
        startWith(string, start) {
            if (!string)
                return false;
            return string.substr(0, start.length) === start;
        }
        getAnnotationURL(sourceMapString) {
            return sourceMapString.replace(/^\/\*\s*# sourceMappingURL=/, "").trim();
        }
        loadAnnotation(css) {
            let comments = css.match(/\/\*\s*# sourceMappingURL=/gm);
            if (!comments)
                return;
            let start = css.lastIndexOf(comments.pop());
            let end = css.indexOf("*/", start);
            if (start > -1 && end > -1) {
                this.annotation = this.getAnnotationURL(css.substring(start, end));
            }
        }
        decodeInline(text) {
            let baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
            let baseUri = /^data:application\/json;base64,/;
            let charsetUri = /^data:application\/json;charset=utf-?8,/;
            let uri = /^data:application\/json,/;
            if (charsetUri.test(text) || uri.test(text)) {
                return decodeURIComponent(text.substr(RegExp.lastMatch.length));
            }
            if (baseCharsetUri.test(text) || baseUri.test(text)) {
                return fromBase64(text.substr(RegExp.lastMatch.length));
            }
            let encoding = text.match(/data:application\/json;([^,]+),/)[1];
            throw new Error("Unsupported source map encoding " + encoding);
        }
        loadFile(path) {
            this.root = dirname$1(path);
            if (existsSync(path)) {
                this.mapFile = path;
                return readFileSync(path, "utf-8").toString().trim();
            }
        }
        loadMap(file, prev) {
            if (prev === false)
                return false;
            if (prev) {
                if (typeof prev === "string") {
                    return prev;
                } else if (typeof prev === "function") {
                    let prevPath = prev(file);
                    if (prevPath) {
                        let map = this.loadFile(prevPath);
                        if (!map) {
                            throw new Error(
                                "Unable to load previous source map: " + prevPath.toString()
                            );
                        }
                        return map;
                    }
                } else if (prev instanceof SourceMapConsumer$2) {
                    return SourceMapGenerator$2.fromSourceMap(prev).toString();
                } else if (prev instanceof SourceMapGenerator$2) {
                    return prev.toString();
                } else if (this.isMap(prev)) {
                    return JSON.stringify(prev);
                } else {
                    throw new Error(
                        "Unsupported previous source map format: " + prev.toString()
                    );
                }
            } else if (this.inline) {
                return this.decodeInline(this.annotation);
            } else if (this.annotation) {
                let map = this.annotation;
                if (file)
                    map = join(dirname$1(file), map);
                return this.loadFile(map);
            }
        }
        isMap(map) {
            if (typeof map !== "object")
                return false;
            return typeof map.mappings === "string" || typeof map._mappings === "string" || Array.isArray(map.sections);
        }
    };
    var previousMap = PreviousMap$2;
    PreviousMap$2.default = PreviousMap$2;
    let { SourceMapConsumer: SourceMapConsumer$1, SourceMapGenerator: SourceMapGenerator$1 } = require$$2;
    let { fileURLToPath, pathToFileURL: pathToFileURL$1 } = require$$2;
    let { resolve: resolve$1, isAbsolute } = require$$2;
    let { nanoid } = require$$3;
    let terminalHighlight = require$$2;
    let CssSyntaxError$2 = cssSyntaxError;
    let PreviousMap$1 = previousMap;
    let fromOffsetCache = Symbol("fromOffsetCache");
    let sourceMapAvailable$1 = Boolean(SourceMapConsumer$1 && SourceMapGenerator$1);
    let pathAvailable$1 = Boolean(resolve$1 && isAbsolute);
    let Input$6 = class Input {
        constructor(css, opts = {}) {
            if (css === null || typeof css === "undefined" || typeof css === "object" && !css.toString) {
                throw new Error(`PostCSS received ${css} instead of CSS string`);
            }
            this.css = css.toString();
            if (this.css[0] === "\uFEFF" || this.css[0] === "\uFFFE") {
                this.hasBOM = true;
                this.css = this.css.slice(1);
            } else {
                this.hasBOM = false;
            }
            if (opts.from) {
                if (!pathAvailable$1 || /^\w+:\/\//.test(opts.from) || isAbsolute(opts.from)) {
                    this.file = opts.from;
                } else {
                    this.file = resolve$1(opts.from);
                }
            }
            if (pathAvailable$1 && sourceMapAvailable$1) {
                let map = new PreviousMap$1(this.css, opts);
                if (map.text) {
                    this.map = map;
                    let file = map.consumer().file;
                    if (!this.file && file)
                        this.file = this.mapResolve(file);
                }
            }
            if (!this.file) {
                this.id = "<input css " + nanoid(6) + ">";
            }
            if (this.map)
                this.map.file = this.from;
        }
        fromOffset(offset) {
            let lastLine, lineToIndex;
            if (!this[fromOffsetCache]) {
                let lines = this.css.split("\n");
                lineToIndex = new Array(lines.length);
                let prevIndex = 0;
                for (let i = 0, l = lines.length; i < l; i++) {
                    lineToIndex[i] = prevIndex;
                    prevIndex += lines[i].length + 1;
                }
                this[fromOffsetCache] = lineToIndex;
            } else {
                lineToIndex = this[fromOffsetCache];
            }
            lastLine = lineToIndex[lineToIndex.length - 1];
            let min = 0;
            if (offset >= lastLine) {
                min = lineToIndex.length - 1;
            } else {
                let max = lineToIndex.length - 2;
                let mid;
                while (min < max) {
                    mid = min + (max - min >> 1);
                    if (offset < lineToIndex[mid]) {
                        max = mid - 1;
                    } else if (offset >= lineToIndex[mid + 1]) {
                        min = mid + 1;
                    } else {
                        min = mid;
                        break;
                    }
                }
            }
            return {
                line: min + 1,
                col: offset - lineToIndex[min] + 1
            };
        }
        error(message, line, column, opts = {}) {
            let result2, endLine, endColumn;
            if (line && typeof line === "object") {
                let start = line;
                let end = column;
                if (typeof start.offset === "number") {
                    let pos = this.fromOffset(start.offset);
                    line = pos.line;
                    column = pos.col;
                } else {
                    line = start.line;
                    column = start.column;
                }
                if (typeof end.offset === "number") {
                    let pos = this.fromOffset(end.offset);
                    endLine = pos.line;
                    endColumn = pos.col;
                } else {
                    endLine = end.line;
                    endColumn = end.column;
                }
            } else if (!column) {
                let pos = this.fromOffset(line);
                line = pos.line;
                column = pos.col;
            }
            let origin = this.origin(line, column, endLine, endColumn);
            if (origin) {
                result2 = new CssSyntaxError$2(
                    message,
                    origin.endLine === void 0 ? origin.line : { line: origin.line, column: origin.column },
                    origin.endLine === void 0 ? origin.column : { line: origin.endLine, column: origin.endColumn },
                    origin.source,
                    origin.file,
                    opts.plugin
                );
            } else {
                result2 = new CssSyntaxError$2(
                    message,
                    endLine === void 0 ? line : { line, column },
                    endLine === void 0 ? column : { line: endLine, column: endColumn },
                    this.css,
                    this.file,
                    opts.plugin
                );
            }
            result2.input = { line, column, endLine, endColumn, source: this.css };
            if (this.file) {
                if (pathToFileURL$1) {
                    result2.input.url = pathToFileURL$1(this.file).toString();
                }
                result2.input.file = this.file;
            }
            return result2;
        }
        origin(line, column, endLine, endColumn) {
            if (!this.map)
                return false;
            let consumer = this.map.consumer();
            let from = consumer.originalPositionFor({ line, column });
            if (!from.source)
                return false;
            let to;
            if (typeof endLine === "number") {
                to = consumer.originalPositionFor({ line: endLine, column: endColumn });
            }
            let fromUrl;
            if (isAbsolute(from.source)) {
                fromUrl = pathToFileURL$1(from.source);
            } else {
                fromUrl = new URL(
                    from.source,
                    this.map.consumer().sourceRoot || pathToFileURL$1(this.map.mapFile)
                );
            }
            let result2 = {
                url: fromUrl.toString(),
                line: from.line,
                column: from.column,
                endLine: to && to.line,
                endColumn: to && to.column
            };
            if (fromUrl.protocol === "file:") {
                if (fileURLToPath) {
                    result2.file = fileURLToPath(fromUrl);
                } else {
                    throw new Error(`file: protocol is not available in this PostCSS build`);
                }
            }
            let source = consumer.sourceContentFor(from.source);
            if (source)
                result2.source = source;
            return result2;
        }
        mapResolve(file) {
            if (/^\w+:\/\//.test(file)) {
                return file;
            }
            return resolve$1(this.map.consumer().sourceRoot || this.map.root || ".", file);
        }
        get from() {
            return this.file || this.id;
        }
        toJSON() {
            let json = {};
            for (let name of ["hasBOM", "css", "file", "id"]) {
                if (this[name] != null) {
                    json[name] = this[name];
                }
            }
            if (this.map) {
                json.map = { ...this.map };
                if (json.map.consumerCache) {
                    json.map.consumerCache = void 0;
                }
            }
            return json;
        }
    };
    var input = Input$6;
    Input$6.default = Input$6;
    if (terminalHighlight && terminalHighlight.registerInput) {
        terminalHighlight.registerInput(Input$6);
    }
    let { SourceMapConsumer, SourceMapGenerator } = require$$2;
    let { dirname, resolve, relative, sep } = require$$2;
    let { pathToFileURL } = require$$2;
    let Input$5 = input;
    let sourceMapAvailable = Boolean(SourceMapConsumer && SourceMapGenerator);
    let pathAvailable = Boolean(dirname && resolve && relative && sep);
    let MapGenerator$2 = class MapGenerator {
        constructor(stringify2, root2, opts, cssString) {
            this.stringify = stringify2;
            this.mapOpts = opts.map || {};
            this.root = root2;
            this.opts = opts;
            this.css = cssString;
            this.usesFileUrls = !this.mapOpts.from && this.mapOpts.absolute;
        }
        isMap() {
            if (typeof this.opts.map !== "undefined") {
                return !!this.opts.map;
            }
            return this.previous().length > 0;
        }
        previous() {
            if (!this.previousMaps) {
                this.previousMaps = [];
                if (this.root) {
                    this.root.walk((node2) => {
                        if (node2.source && node2.source.input.map) {
                            let map = node2.source.input.map;
                            if (!this.previousMaps.includes(map)) {
                                this.previousMaps.push(map);
                            }
                        }
                    });
                } else {
                    let input2 = new Input$5(this.css, this.opts);
                    if (input2.map)
                        this.previousMaps.push(input2.map);
                }
            }
            return this.previousMaps;
        }
        isInline() {
            if (typeof this.mapOpts.inline !== "undefined") {
                return this.mapOpts.inline;
            }
            let annotation = this.mapOpts.annotation;
            if (typeof annotation !== "undefined" && annotation !== true) {
                return false;
            }
            if (this.previous().length) {
                return this.previous().some((i) => i.inline);
            }
            return true;
        }
        isSourcesContent() {
            if (typeof this.mapOpts.sourcesContent !== "undefined") {
                return this.mapOpts.sourcesContent;
            }
            if (this.previous().length) {
                return this.previous().some((i) => i.withContent());
            }
            return true;
        }
        clearAnnotation() {
            if (this.mapOpts.annotation === false)
                return;
            if (this.root) {
                let node2;
                for (let i = this.root.nodes.length - 1; i >= 0; i--) {
                    node2 = this.root.nodes[i];
                    if (node2.type !== "comment")
                        continue;
                    if (node2.text.indexOf("# sourceMappingURL=") === 0) {
                        this.root.removeChild(i);
                    }
                }
            } else if (this.css) {
                this.css = this.css.replace(/(\n)?\/\*#[\S\s]*?\*\/$/gm, "");
            }
        }
        setSourcesContent() {
            let already = {};
            if (this.root) {
                this.root.walk((node2) => {
                    if (node2.source) {
                        let from = node2.source.input.from;
                        if (from && !already[from]) {
                            already[from] = true;
                            let fromUrl = this.usesFileUrls ? this.toFileUrl(from) : this.toUrl(this.path(from));
                            this.map.setSourceContent(fromUrl, node2.source.input.css);
                        }
                    }
                });
            } else if (this.css) {
                let from = this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>";
                this.map.setSourceContent(from, this.css);
            }
        }
        applyPrevMaps() {
            for (let prev of this.previous()) {
                let from = this.toUrl(this.path(prev.file));
                let root2 = prev.root || dirname(prev.file);
                let map;
                if (this.mapOpts.sourcesContent === false) {
                    map = new SourceMapConsumer(prev.text);
                    if (map.sourcesContent) {
                        map.sourcesContent = map.sourcesContent.map(() => null);
                    }
                } else {
                    map = prev.consumer();
                }
                this.map.applySourceMap(map, from, this.toUrl(this.path(root2)));
            }
        }
        isAnnotation() {
            if (this.isInline()) {
                return true;
            }
            if (typeof this.mapOpts.annotation !== "undefined") {
                return this.mapOpts.annotation;
            }
            if (this.previous().length) {
                return this.previous().some((i) => i.annotation);
            }
            return true;
        }
        toBase64(str) {
            if (Buffer) {
                return Buffer.from(str).toString("base64");
            } else {
                return window.btoa(unescape(encodeURIComponent(str)));
            }
        }
        addAnnotation() {
            let content;
            if (this.isInline()) {
                content = "data:application/json;base64," + this.toBase64(this.map.toString());
            } else if (typeof this.mapOpts.annotation === "string") {
                content = this.mapOpts.annotation;
            } else if (typeof this.mapOpts.annotation === "function") {
                content = this.mapOpts.annotation(this.opts.to, this.root);
            } else {
                content = this.outputFile() + ".map";
            }
            let eol = "\n";
            if (this.css.includes("\r\n"))
                eol = "\r\n";
            this.css += eol + "/*# sourceMappingURL=" + content + " */";
        }
        outputFile() {
            if (this.opts.to) {
                return this.path(this.opts.to);
            } else if (this.opts.from) {
                return this.path(this.opts.from);
            } else {
                return "to.css";
            }
        }
        generateMap() {
            if (this.root) {
                this.generateString();
            } else if (this.previous().length === 1) {
                let prev = this.previous()[0].consumer();
                prev.file = this.outputFile();
                this.map = SourceMapGenerator.fromSourceMap(prev);
            } else {
                this.map = new SourceMapGenerator({ file: this.outputFile() });
                this.map.addMapping({
                    source: this.opts.from ? this.toUrl(this.path(this.opts.from)) : "<no source>",
                    generated: { line: 1, column: 0 },
                    original: { line: 1, column: 0 }
                });
            }
            if (this.isSourcesContent())
                this.setSourcesContent();
            if (this.root && this.previous().length > 0)
                this.applyPrevMaps();
            if (this.isAnnotation())
                this.addAnnotation();
            if (this.isInline()) {
                return [this.css];
            } else {
                return [this.css, this.map];
            }
        }
        path(file) {
            if (file.indexOf("<") === 0)
                return file;
            if (/^\w+:\/\//.test(file))
                return file;
            if (this.mapOpts.absolute)
                return file;
            let from = this.opts.to ? dirname(this.opts.to) : ".";
            if (typeof this.mapOpts.annotation === "string") {
                from = dirname(resolve(from, this.mapOpts.annotation));
            }
            file = relative(from, file);
            return file;
        }
        toUrl(path) {
            if (sep === "\\") {
                path = path.replace(/\\/g, "/");
            }
            return encodeURI(path).replace(/[#?]/g, encodeURIComponent);
        }
        toFileUrl(path) {
            if (pathToFileURL) {
                return pathToFileURL(path).toString();
            } else {
                throw new Error(
                    "`map.absolute` option is not available in this PostCSS build"
                );
            }
        }
        sourcePath(node2) {
            if (this.mapOpts.from) {
                return this.toUrl(this.mapOpts.from);
            } else if (this.usesFileUrls) {
                return this.toFileUrl(node2.source.input.from);
            } else {
                return this.toUrl(this.path(node2.source.input.from));
            }
        }
        generateString() {
            this.css = "";
            this.map = new SourceMapGenerator({ file: this.outputFile() });
            let line = 1;
            let column = 1;
            let noSource = "<no source>";
            let mapping = {
                source: "",
                generated: { line: 0, column: 0 },
                original: { line: 0, column: 0 }
            };
            let lines, last;
            this.stringify(this.root, (str, node2, type) => {
                this.css += str;
                if (node2 && type !== "end") {
                    mapping.generated.line = line;
                    mapping.generated.column = column - 1;
                    if (node2.source && node2.source.start) {
                        mapping.source = this.sourcePath(node2);
                        mapping.original.line = node2.source.start.line;
                        mapping.original.column = node2.source.start.column - 1;
                        this.map.addMapping(mapping);
                    } else {
                        mapping.source = noSource;
                        mapping.original.line = 1;
                        mapping.original.column = 0;
                        this.map.addMapping(mapping);
                    }
                }
                lines = str.match(/\n/g);
                if (lines) {
                    line += lines.length;
                    last = str.lastIndexOf("\n");
                    column = str.length - last;
                } else {
                    column += str.length;
                }
                if (node2 && type !== "start") {
                    let p = node2.parent || { raws: {} };
                    let childless = node2.type === "decl" || node2.type === "atrule" && !node2.nodes;
                    if (!childless || node2 !== p.last || p.raws.semicolon) {
                        if (node2.source && node2.source.end) {
                            mapping.source = this.sourcePath(node2);
                            mapping.original.line = node2.source.end.line;
                            mapping.original.column = node2.source.end.column - 1;
                            mapping.generated.line = line;
                            mapping.generated.column = column - 2;
                            this.map.addMapping(mapping);
                        } else {
                            mapping.source = noSource;
                            mapping.original.line = 1;
                            mapping.original.column = 0;
                            mapping.generated.line = line;
                            mapping.generated.column = column - 1;
                            this.map.addMapping(mapping);
                        }
                    }
                }
            });
        }
        generate() {
            this.clearAnnotation();
            if (pathAvailable && sourceMapAvailable && this.isMap()) {
                return this.generateMap();
            } else {
                let result2 = "";
                this.stringify(this.root, (i) => {
                    result2 += i;
                });
                return [result2];
            }
        }
    };
    var mapGenerator = MapGenerator$2;
    let Node$3 = node;
    let Comment$6 = class Comment extends Node$3 {
        constructor(defaults) {
            super(defaults);
            this.type = "comment";
        }
    };
    var comment$1 = Comment$6;
    Comment$6.default = Comment$6;
    let { isClean: isClean$1, my: my$1 } = symbols;
    let Declaration$4 = declaration;
    let Comment$5 = comment$1;
    let Node$2 = node;
    let parse$5, Rule$5, AtRule$5, Root$7;
    function cleanSource(nodes) {
        return nodes.map((i) => {
            if (i.nodes)
                i.nodes = cleanSource(i.nodes);
            delete i.source;
            return i;
        });
    }
    function markDirtyUp(node2) {
        node2[isClean$1] = false;
        if (node2.proxyOf.nodes) {
            for (let i of node2.proxyOf.nodes) {
                markDirtyUp(i);
            }
        }
    }
    let Container$8 = class Container extends Node$2 {
        push(child) {
            child.parent = this;
            this.proxyOf.nodes.push(child);
            return this;
        }
        each(callback) {
            if (!this.proxyOf.nodes)
                return void 0;
            let iterator = this.getIterator();
            let index, result2;
            while (this.indexes[iterator] < this.proxyOf.nodes.length) {
                index = this.indexes[iterator];
                result2 = callback(this.proxyOf.nodes[index], index);
                if (result2 === false)
                    break;
                this.indexes[iterator] += 1;
            }
            delete this.indexes[iterator];
            return result2;
        }
        walk(callback) {
            return this.each((child, i) => {
                let result2;
                try {
                    result2 = callback(child, i);
                } catch (e) {
                    throw child.addToError(e);
                }
                if (result2 !== false && child.walk) {
                    result2 = child.walk(callback);
                }
                return result2;
            });
        }
        walkDecls(prop, callback) {
            if (!callback) {
                callback = prop;
                return this.walk((child, i) => {
                    if (child.type === "decl") {
                        return callback(child, i);
                    }
                });
            }
            if (prop instanceof RegExp) {
                return this.walk((child, i) => {
                    if (child.type === "decl" && prop.test(child.prop)) {
                        return callback(child, i);
                    }
                });
            }
            return this.walk((child, i) => {
                if (child.type === "decl" && child.prop === prop) {
                    return callback(child, i);
                }
            });
        }
        walkRules(selector, callback) {
            if (!callback) {
                callback = selector;
                return this.walk((child, i) => {
                    if (child.type === "rule") {
                        return callback(child, i);
                    }
                });
            }
            if (selector instanceof RegExp) {
                return this.walk((child, i) => {
                    if (child.type === "rule" && selector.test(child.selector)) {
                        return callback(child, i);
                    }
                });
            }
            return this.walk((child, i) => {
                if (child.type === "rule" && child.selector === selector) {
                    return callback(child, i);
                }
            });
        }
        walkAtRules(name, callback) {
            if (!callback) {
                callback = name;
                return this.walk((child, i) => {
                    if (child.type === "atrule") {
                        return callback(child, i);
                    }
                });
            }
            if (name instanceof RegExp) {
                return this.walk((child, i) => {
                    if (child.type === "atrule" && name.test(child.name)) {
                        return callback(child, i);
                    }
                });
            }
            return this.walk((child, i) => {
                if (child.type === "atrule" && child.name === name) {
                    return callback(child, i);
                }
            });
        }
        walkComments(callback) {
            return this.walk((child, i) => {
                if (child.type === "comment") {
                    return callback(child, i);
                }
            });
        }
        append(...children) {
            for (let child of children) {
                let nodes = this.normalize(child, this.last);
                for (let node2 of nodes)
                    this.proxyOf.nodes.push(node2);
            }
            this.markDirty();
            return this;
        }
        prepend(...children) {
            children = children.reverse();
            for (let child of children) {
                let nodes = this.normalize(child, this.first, "prepend").reverse();
                for (let node2 of nodes)
                    this.proxyOf.nodes.unshift(node2);
                for (let id in this.indexes) {
                    this.indexes[id] = this.indexes[id] + nodes.length;
                }
            }
            this.markDirty();
            return this;
        }
        cleanRaws(keepBetween) {
            super.cleanRaws(keepBetween);
            if (this.nodes) {
                for (let node2 of this.nodes)
                    node2.cleanRaws(keepBetween);
            }
        }
        insertBefore(exist, add) {
            let existIndex = this.index(exist);
            let type = existIndex === 0 ? "prepend" : false;
            let nodes = this.normalize(add, this.proxyOf.nodes[existIndex], type).reverse();
            existIndex = this.index(exist);
            for (let node2 of nodes)
                this.proxyOf.nodes.splice(existIndex, 0, node2);
            let index;
            for (let id in this.indexes) {
                index = this.indexes[id];
                if (existIndex <= index) {
                    this.indexes[id] = index + nodes.length;
                }
            }
            this.markDirty();
            return this;
        }
        insertAfter(exist, add) {
            let existIndex = this.index(exist);
            let nodes = this.normalize(add, this.proxyOf.nodes[existIndex]).reverse();
            existIndex = this.index(exist);
            for (let node2 of nodes)
                this.proxyOf.nodes.splice(existIndex + 1, 0, node2);
            let index;
            for (let id in this.indexes) {
                index = this.indexes[id];
                if (existIndex < index) {
                    this.indexes[id] = index + nodes.length;
                }
            }
            this.markDirty();
            return this;
        }
        removeChild(child) {
            child = this.index(child);
            this.proxyOf.nodes[child].parent = void 0;
            this.proxyOf.nodes.splice(child, 1);
            let index;
            for (let id in this.indexes) {
                index = this.indexes[id];
                if (index >= child) {
                    this.indexes[id] = index - 1;
                }
            }
            this.markDirty();
            return this;
        }
        removeAll() {
            for (let node2 of this.proxyOf.nodes)
                node2.parent = void 0;
            this.proxyOf.nodes = [];
            this.markDirty();
            return this;
        }
        replaceValues(pattern, opts, callback) {
            if (!callback) {
                callback = opts;
                opts = {};
            }
            this.walkDecls((decl2) => {
                if (opts.props && !opts.props.includes(decl2.prop))
                    return;
                if (opts.fast && !decl2.value.includes(opts.fast))
                    return;
                decl2.value = decl2.value.replace(pattern, callback);
            });
            this.markDirty();
            return this;
        }
        every(condition) {
            return this.nodes.every(condition);
        }
        some(condition) {
            return this.nodes.some(condition);
        }
        index(child) {
            if (typeof child === "number")
                return child;
            if (child.proxyOf)
                child = child.proxyOf;
            return this.proxyOf.nodes.indexOf(child);
        }
        get first() {
            if (!this.proxyOf.nodes)
                return void 0;
            return this.proxyOf.nodes[0];
        }
        get last() {
            if (!this.proxyOf.nodes)
                return void 0;
            return this.proxyOf.nodes[this.proxyOf.nodes.length - 1];
        }
        normalize(nodes, sample) {
            if (typeof nodes === "string") {
                nodes = cleanSource(parse$5(nodes).nodes);
            } else if (Array.isArray(nodes)) {
                nodes = nodes.slice(0);
                for (let i of nodes) {
                    if (i.parent)
                        i.parent.removeChild(i, "ignore");
                }
            } else if (nodes.type === "root" && this.type !== "document") {
                nodes = nodes.nodes.slice(0);
                for (let i of nodes) {
                    if (i.parent)
                        i.parent.removeChild(i, "ignore");
                }
            } else if (nodes.type) {
                nodes = [nodes];
            } else if (nodes.prop) {
                if (typeof nodes.value === "undefined") {
                    throw new Error("Value field is missed in node creation");
                } else if (typeof nodes.value !== "string") {
                    nodes.value = String(nodes.value);
                }
                nodes = [new Declaration$4(nodes)];
            } else if (nodes.selector) {
                nodes = [new Rule$5(nodes)];
            } else if (nodes.name) {
                nodes = [new AtRule$5(nodes)];
            } else if (nodes.text) {
                nodes = [new Comment$5(nodes)];
            } else {
                throw new Error("Unknown node type in node creation");
            }
            let processed = nodes.map((i) => {
                if (!i[my$1])
                    Container$8.rebuild(i);
                i = i.proxyOf;
                if (i.parent)
                    i.parent.removeChild(i);
                if (i[isClean$1])
                    markDirtyUp(i);
                if (typeof i.raws.before === "undefined") {
                    if (sample && typeof sample.raws.before !== "undefined") {
                        i.raws.before = sample.raws.before.replace(/\S/g, "");
                    }
                }
                i.parent = this.proxyOf;
                return i;
            });
            return processed;
        }
        getProxyProcessor() {
            return {
                set(node2, prop, value) {
                    if (node2[prop] === value)
                        return true;
                    node2[prop] = value;
                    if (prop === "name" || prop === "params" || prop === "selector") {
                        node2.markDirty();
                    }
                    return true;
                },
                get(node2, prop) {
                    if (prop === "proxyOf") {
                        return node2;
                    } else if (!node2[prop]) {
                        return node2[prop];
                    } else if (prop === "each" || typeof prop === "string" && prop.startsWith("walk")) {
                        return (...args) => {
                            return node2[prop](
                                ...args.map((i) => {
                                    if (typeof i === "function") {
                                        return (child, index) => i(child.toProxy(), index);
                                    } else {
                                        return i;
                                    }
                                })
                            );
                        };
                    } else if (prop === "every" || prop === "some") {
                        return (cb) => {
                            return node2[prop](
                                (child, ...other) => cb(child.toProxy(), ...other)
                            );
                        };
                    } else if (prop === "root") {
                        return () => node2.root().toProxy();
                    } else if (prop === "nodes") {
                        return node2.nodes.map((i) => i.toProxy());
                    } else if (prop === "first" || prop === "last") {
                        return node2[prop].toProxy();
                    } else {
                        return node2[prop];
                    }
                }
            };
        }
        getIterator() {
            if (!this.lastEach)
                this.lastEach = 0;
            if (!this.indexes)
                this.indexes = {};
            this.lastEach += 1;
            let iterator = this.lastEach;
            this.indexes[iterator] = 0;
            return iterator;
        }
    };
    Container$8.registerParse = (dependant) => {
        parse$5 = dependant;
    };
    Container$8.registerRule = (dependant) => {
        Rule$5 = dependant;
    };
    Container$8.registerAtRule = (dependant) => {
        AtRule$5 = dependant;
    };
    Container$8.registerRoot = (dependant) => {
        Root$7 = dependant;
    };
    var container = Container$8;
    Container$8.default = Container$8;
    Container$8.rebuild = (node2) => {
        if (node2.type === "atrule") {
            Object.setPrototypeOf(node2, AtRule$5.prototype);
        } else if (node2.type === "rule") {
            Object.setPrototypeOf(node2, Rule$5.prototype);
        } else if (node2.type === "decl") {
            Object.setPrototypeOf(node2, Declaration$4.prototype);
        } else if (node2.type === "comment") {
            Object.setPrototypeOf(node2, Comment$5.prototype);
        } else if (node2.type === "root") {
            Object.setPrototypeOf(node2, Root$7.prototype);
        }
        node2[my$1] = true;
        if (node2.nodes) {
            node2.nodes.forEach((child) => {
                Container$8.rebuild(child);
            });
        }
    };
    let Container$7 = container;
    let LazyResult$4, Processor$4;
    let Document$4 = class Document extends Container$7 {
        constructor(defaults) {
            super({ type: "document", ...defaults });
            if (!this.nodes) {
                this.nodes = [];
            }
        }
        toResult(opts = {}) {
            let lazy = new LazyResult$4(new Processor$4(), this, opts);
            return lazy.stringify();
        }
    };
    Document$4.registerLazyResult = (dependant) => {
        LazyResult$4 = dependant;
    };
    Document$4.registerProcessor = (dependant) => {
        Processor$4 = dependant;
    };
    var document$2 = Document$4;
    Document$4.default = Document$4;
    let Warning$3 = class Warning {
        constructor(text, opts = {}) {
            this.type = "warning";
            this.text = text;
            if (opts.node && opts.node.source) {
                let range = opts.node.rangeBy(opts);
                this.line = range.start.line;
                this.column = range.start.column;
                this.endLine = range.end.line;
                this.endColumn = range.end.column;
            }
            for (let opt in opts)
                this[opt] = opts[opt];
        }
        toString() {
            if (this.node) {
                return this.node.error(this.text, {
                    plugin: this.plugin,
                    index: this.index,
                    word: this.word
                }).message;
            }
            if (this.plugin) {
                return this.plugin + ": " + this.text;
            }
            return this.text;
        }
    };
    var warning = Warning$3;
    Warning$3.default = Warning$3;
    let Warning$2 = warning;
    let Result$4 = class Result {
        constructor(processor2, root2, opts) {
            this.processor = processor2;
            this.messages = [];
            this.root = root2;
            this.opts = opts;
            this.css = void 0;
            this.map = void 0;
        }
        toString() {
            return this.css;
        }
        warn(text, opts = {}) {
            if (!opts.plugin) {
                if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
                    opts.plugin = this.lastPlugin.postcssPlugin;
                }
            }
            let warning2 = new Warning$2(text, opts);
            this.messages.push(warning2);
            return warning2;
        }
        warnings() {
            return this.messages.filter((i) => i.type === "warning");
        }
        get content() {
            return this.css;
        }
    };
    var result = Result$4;
    Result$4.default = Result$4;
    const SINGLE_QUOTE = "'".charCodeAt(0);
    const DOUBLE_QUOTE = '"'.charCodeAt(0);
    const BACKSLASH = "\\".charCodeAt(0);
    const SLASH = "/".charCodeAt(0);
    const NEWLINE = "\n".charCodeAt(0);
    const SPACE = " ".charCodeAt(0);
    const FEED = "\f".charCodeAt(0);
    const TAB = "	".charCodeAt(0);
    const CR = "\r".charCodeAt(0);
    const OPEN_SQUARE = "[".charCodeAt(0);
    const CLOSE_SQUARE = "]".charCodeAt(0);
    const OPEN_PARENTHESES = "(".charCodeAt(0);
    const CLOSE_PARENTHESES = ")".charCodeAt(0);
    const OPEN_CURLY = "{".charCodeAt(0);
    const CLOSE_CURLY = "}".charCodeAt(0);
    const SEMICOLON = ";".charCodeAt(0);
    const ASTERISK = "*".charCodeAt(0);
    const COLON = ":".charCodeAt(0);
    const AT = "@".charCodeAt(0);
    const RE_AT_END = /[\t\n\f\r "#'()/;[\\\]{}]/g;
    const RE_WORD_END = /[\t\n\f\r !"#'():;@[\\\]{}]|\/(?=\*)/g;
    const RE_BAD_BRACKET = /.[\n"'(/\\]/;
    const RE_HEX_ESCAPE = /[\da-f]/i;
    var tokenize = function tokenizer2(input2, options = {}) {
        let css = input2.css.valueOf();
        let ignore = options.ignoreErrors;
        let code, next, quote, content, escape;
        let escaped, escapePos, prev, n, currentToken;
        let length = css.length;
        let pos = 0;
        let buffer = [];
        let returned = [];
        function position() {
            return pos;
        }
        function unclosed(what) {
            throw input2.error("Unclosed " + what, pos);
        }
        function endOfFile() {
            return returned.length === 0 && pos >= length;
        }
        function nextToken(opts) {
            if (returned.length)
                return returned.pop();
            if (pos >= length)
                return;
            let ignoreUnclosed = opts ? opts.ignoreUnclosed : false;
            code = css.charCodeAt(pos);
            switch (code) {
                case NEWLINE:
                case SPACE:
                case TAB:
                case CR:
                case FEED: {
                    next = pos;
                    do {
                        next += 1;
                        code = css.charCodeAt(next);
                    } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);
                    currentToken = ["space", css.slice(pos, next)];
                    pos = next - 1;
                    break;
                }
                case OPEN_SQUARE:
                case CLOSE_SQUARE:
                case OPEN_CURLY:
                case CLOSE_CURLY:
                case COLON:
                case SEMICOLON:
                case CLOSE_PARENTHESES: {
                    let controlChar = String.fromCharCode(code);
                    currentToken = [controlChar, controlChar, pos];
                    break;
                }
                case OPEN_PARENTHESES: {
                    prev = buffer.length ? buffer.pop()[1] : "";
                    n = css.charCodeAt(pos + 1);
                    if (prev === "url" && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
                        next = pos;
                        do {
                            escaped = false;
                            next = css.indexOf(")", next + 1);
                            if (next === -1) {
                                if (ignore || ignoreUnclosed) {
                                    next = pos;
                                    break;
                                } else {
                                    unclosed("bracket");
                                }
                            }
                            escapePos = next;
                            while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                                escapePos -= 1;
                                escaped = !escaped;
                            }
                        } while (escaped);
                        currentToken = ["brackets", css.slice(pos, next + 1), pos, next];
                        pos = next;
                    } else {
                        next = css.indexOf(")", pos + 1);
                        content = css.slice(pos, next + 1);
                        if (next === -1 || RE_BAD_BRACKET.test(content)) {
                            currentToken = ["(", "(", pos];
                        } else {
                            currentToken = ["brackets", content, pos, next];
                            pos = next;
                        }
                    }
                    break;
                }
                case SINGLE_QUOTE:
                case DOUBLE_QUOTE: {
                    quote = code === SINGLE_QUOTE ? "'" : '"';
                    next = pos;
                    do {
                        escaped = false;
                        next = css.indexOf(quote, next + 1);
                        if (next === -1) {
                            if (ignore || ignoreUnclosed) {
                                next = pos + 1;
                                break;
                            } else {
                                unclosed("string");
                            }
                        }
                        escapePos = next;
                        while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                            escapePos -= 1;
                            escaped = !escaped;
                        }
                    } while (escaped);
                    currentToken = ["string", css.slice(pos, next + 1), pos, next];
                    pos = next;
                    break;
                }
                case AT: {
                    RE_AT_END.lastIndex = pos + 1;
                    RE_AT_END.test(css);
                    if (RE_AT_END.lastIndex === 0) {
                        next = css.length - 1;
                    } else {
                        next = RE_AT_END.lastIndex - 2;
                    }
                    currentToken = ["at-word", css.slice(pos, next + 1), pos, next];
                    pos = next;
                    break;
                }
                case BACKSLASH: {
                    next = pos;
                    escape = true;
                    while (css.charCodeAt(next + 1) === BACKSLASH) {
                        next += 1;
                        escape = !escape;
                    }
                    code = css.charCodeAt(next + 1);
                    if (escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
                        next += 1;
                        if (RE_HEX_ESCAPE.test(css.charAt(next))) {
                            while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
                                next += 1;
                            }
                            if (css.charCodeAt(next + 1) === SPACE) {
                                next += 1;
                            }
                        }
                    }
                    currentToken = ["word", css.slice(pos, next + 1), pos, next];
                    pos = next;
                    break;
                }
                default: {
                    if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
                        next = css.indexOf("*/", pos + 2) + 1;
                        if (next === 0) {
                            if (ignore || ignoreUnclosed) {
                                next = css.length;
                            } else {
                                unclosed("comment");
                            }
                        }
                        currentToken = ["comment", css.slice(pos, next + 1), pos, next];
                        pos = next;
                    } else {
                        RE_WORD_END.lastIndex = pos + 1;
                        RE_WORD_END.test(css);
                        if (RE_WORD_END.lastIndex === 0) {
                            next = css.length - 1;
                        } else {
                            next = RE_WORD_END.lastIndex - 2;
                        }
                        currentToken = ["word", css.slice(pos, next + 1), pos, next];
                        buffer.push(currentToken);
                        pos = next;
                    }
                    break;
                }
            }
            pos++;
            return currentToken;
        }
        function back(token) {
            returned.push(token);
        }
        return {
            back,
            nextToken,
            endOfFile,
            position
        };
    };
    let Container$6 = container;
    let AtRule$4 = class AtRule extends Container$6 {
        constructor(defaults) {
            super(defaults);
            this.type = "atrule";
        }
        append(...children) {
            if (!this.proxyOf.nodes)
                this.nodes = [];
            return super.append(...children);
        }
        prepend(...children) {
            if (!this.proxyOf.nodes)
                this.nodes = [];
            return super.prepend(...children);
        }
    };
    var atRule$1 = AtRule$4;
    AtRule$4.default = AtRule$4;
    Container$6.registerAtRule(AtRule$4);
    let Container$5 = container;
    let LazyResult$3, Processor$3;
    let Root$6 = class Root extends Container$5 {
        constructor(defaults) {
            super(defaults);
            this.type = "root";
            if (!this.nodes)
                this.nodes = [];
        }
        removeChild(child, ignore) {
            let index = this.index(child);
            if (!ignore && index === 0 && this.nodes.length > 1) {
                this.nodes[1].raws.before = this.nodes[index].raws.before;
            }
            return super.removeChild(child);
        }
        normalize(child, sample, type) {
            let nodes = super.normalize(child);
            if (sample) {
                if (type === "prepend") {
                    if (this.nodes.length > 1) {
                        sample.raws.before = this.nodes[1].raws.before;
                    } else {
                        delete sample.raws.before;
                    }
                } else if (this.first !== sample) {
                    for (let node2 of nodes) {
                        node2.raws.before = sample.raws.before;
                    }
                }
            }
            return nodes;
        }
        toResult(opts = {}) {
            let lazy = new LazyResult$3(new Processor$3(), this, opts);
            return lazy.stringify();
        }
    };
    Root$6.registerLazyResult = (dependant) => {
        LazyResult$3 = dependant;
    };
    Root$6.registerProcessor = (dependant) => {
        Processor$3 = dependant;
    };
    var root$1 = Root$6;
    Root$6.default = Root$6;
    Container$5.registerRoot(Root$6);
    let list$3 = {
        split(string, separators, last) {
            let array = [];
            let current = "";
            let split = false;
            let func = 0;
            let inQuote = false;
            let prevQuote = "";
            let escape = false;
            for (let letter of string) {
                if (escape) {
                    escape = false;
                } else if (letter === "\\") {
                    escape = true;
                } else if (inQuote) {
                    if (letter === prevQuote) {
                        inQuote = false;
                    }
                } else if (letter === '"' || letter === "'") {
                    inQuote = true;
                    prevQuote = letter;
                } else if (letter === "(") {
                    func += 1;
                } else if (letter === ")") {
                    if (func > 0)
                        func -= 1;
                } else if (func === 0) {
                    if (separators.includes(letter))
                        split = true;
                }
                if (split) {
                    if (current !== "")
                        array.push(current.trim());
                    current = "";
                    split = false;
                } else {
                    current += letter;
                }
            }
            if (last || current !== "")
                array.push(current.trim());
            return array;
        },
        space(string) {
            let spaces = [" ", "\n", "	"];
            return list$3.split(string, spaces);
        },
        comma(string) {
            return list$3.split(string, [","], true);
        }
    };
    var list_1 = list$3;
    list$3.default = list$3;
    let Container$4 = container;
    let list$2 = list_1;
    let Rule$4 = class Rule extends Container$4 {
        constructor(defaults) {
            super(defaults);
            this.type = "rule";
            if (!this.nodes)
                this.nodes = [];
        }
        get selectors() {
            return list$2.comma(this.selector);
        }
        set selectors(values) {
            let match = this.selector ? this.selector.match(/,\s*/) : null;
            let sep2 = match ? match[0] : "," + this.raw("between", "beforeOpen");
            this.selector = values.join(sep2);
        }
    };
    var rule$1 = Rule$4;
    Rule$4.default = Rule$4;
    Container$4.registerRule(Rule$4);
    let Declaration$3 = declaration;
    let tokenizer$1 = tokenize;
    let Comment$4 = comment$1;
    let AtRule$3 = atRule$1;
    let Root$5 = root$1;
    let Rule$3 = rule$1;
    const SAFE_COMMENT_NEIGHBOR = {
        empty: true,
        space: true
    };
    function findLastWithPosition(tokens) {
        for (let i = tokens.length - 1; i >= 0; i--) {
            let token = tokens[i];
            let pos = token[3] || token[2];
            if (pos)
                return pos;
        }
    }
    let Parser$2 = class Parser {
        constructor(input2) {
            this.input = input2;
            this.root = new Root$5();
            this.current = this.root;
            this.spaces = "";
            this.semicolon = false;
            this.customProperty = false;
            this.createTokenizer();
            this.root.source = { input: input2, start: { offset: 0, line: 1, column: 1 } };
        }
        createTokenizer() {
            this.tokenizer = tokenizer$1(this.input);
        }
        parse() {
            let token;
            while (!this.tokenizer.endOfFile()) {
                token = this.tokenizer.nextToken();
                switch (token[0]) {
                    case "space":
                        this.spaces += token[1];
                        break;
                    case ";":
                        this.freeSemicolon(token);
                        break;
                    case "}":
                        this.end(token);
                        break;
                    case "comment":
                        this.comment(token);
                        break;
                    case "at-word":
                        this.atrule(token);
                        break;
                    case "{":
                        this.emptyRule(token);
                        break;
                    default:
                        this.other(token);
                        break;
                }
            }
            this.endFile();
        }
        comment(token) {
            let node2 = new Comment$4();
            this.init(node2, token[2]);
            node2.source.end = this.getPosition(token[3] || token[2]);
            let text = token[1].slice(2, -2);
            if (/^\s*$/.test(text)) {
                node2.text = "";
                node2.raws.left = text;
                node2.raws.right = "";
            } else {
                let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
                node2.text = match[2];
                node2.raws.left = match[1];
                node2.raws.right = match[3];
            }
        }
        emptyRule(token) {
            let node2 = new Rule$3();
            this.init(node2, token[2]);
            node2.selector = "";
            node2.raws.between = "";
            this.current = node2;
        }
        other(start) {
            let end = false;
            let type = null;
            let colon = false;
            let bracket = null;
            let brackets = [];
            let customProperty = start[1].startsWith("--");
            let tokens = [];
            let token = start;
            while (token) {
                type = token[0];
                tokens.push(token);
                if (type === "(" || type === "[") {
                    if (!bracket)
                        bracket = token;
                    brackets.push(type === "(" ? ")" : "]");
                } else if (customProperty && colon && type === "{") {
                    if (!bracket)
                        bracket = token;
                    brackets.push("}");
                } else if (brackets.length === 0) {
                    if (type === ";") {
                        if (colon) {
                            this.decl(tokens, customProperty);
                            return;
                        } else {
                            break;
                        }
                    } else if (type === "{") {
                        this.rule(tokens);
                        return;
                    } else if (type === "}") {
                        this.tokenizer.back(tokens.pop());
                        end = true;
                        break;
                    } else if (type === ":") {
                        colon = true;
                    }
                } else if (type === brackets[brackets.length - 1]) {
                    brackets.pop();
                    if (brackets.length === 0)
                        bracket = null;
                }
                token = this.tokenizer.nextToken();
            }
            if (this.tokenizer.endOfFile())
                end = true;
            if (brackets.length > 0)
                this.unclosedBracket(bracket);
            if (end && colon) {
                if (!customProperty) {
                    while (tokens.length) {
                        token = tokens[tokens.length - 1][0];
                        if (token !== "space" && token !== "comment")
                            break;
                        this.tokenizer.back(tokens.pop());
                    }
                }
                this.decl(tokens, customProperty);
            } else {
                this.unknownWord(tokens);
            }
        }
        rule(tokens) {
            tokens.pop();
            let node2 = new Rule$3();
            this.init(node2, tokens[0][2]);
            node2.raws.between = this.spacesAndCommentsFromEnd(tokens);
            this.raw(node2, "selector", tokens);
            this.current = node2;
        }
        decl(tokens, customProperty) {
            let node2 = new Declaration$3();
            this.init(node2, tokens[0][2]);
            let last = tokens[tokens.length - 1];
            if (last[0] === ";") {
                this.semicolon = true;
                tokens.pop();
            }
            node2.source.end = this.getPosition(
                last[3] || last[2] || findLastWithPosition(tokens)
            );
            while (tokens[0][0] !== "word") {
                if (tokens.length === 1)
                    this.unknownWord(tokens);
                node2.raws.before += tokens.shift()[1];
            }
            node2.source.start = this.getPosition(tokens[0][2]);
            node2.prop = "";
            while (tokens.length) {
                let type = tokens[0][0];
                if (type === ":" || type === "space" || type === "comment") {
                    break;
                }
                node2.prop += tokens.shift()[1];
            }
            node2.raws.between = "";
            let token;
            while (tokens.length) {
                token = tokens.shift();
                if (token[0] === ":") {
                    node2.raws.between += token[1];
                    break;
                } else {
                    if (token[0] === "word" && /\w/.test(token[1])) {
                        this.unknownWord([token]);
                    }
                    node2.raws.between += token[1];
                }
            }
            if (node2.prop[0] === "_" || node2.prop[0] === "*") {
                node2.raws.before += node2.prop[0];
                node2.prop = node2.prop.slice(1);
            }
            let firstSpaces = [];
            let next;
            while (tokens.length) {
                next = tokens[0][0];
                if (next !== "space" && next !== "comment")
                    break;
                firstSpaces.push(tokens.shift());
            }
            this.precheckMissedSemicolon(tokens);
            for (let i = tokens.length - 1; i >= 0; i--) {
                token = tokens[i];
                if (token[1].toLowerCase() === "!important") {
                    node2.important = true;
                    let string = this.stringFrom(tokens, i);
                    string = this.spacesFromEnd(tokens) + string;
                    if (string !== " !important")
                        node2.raws.important = string;
                    break;
                } else if (token[1].toLowerCase() === "important") {
                    let cache = tokens.slice(0);
                    let str = "";
                    for (let j = i; j > 0; j--) {
                        let type = cache[j][0];
                        if (str.trim().indexOf("!") === 0 && type !== "space") {
                            break;
                        }
                        str = cache.pop()[1] + str;
                    }
                    if (str.trim().indexOf("!") === 0) {
                        node2.important = true;
                        node2.raws.important = str;
                        tokens = cache;
                    }
                }
                if (token[0] !== "space" && token[0] !== "comment") {
                    break;
                }
            }
            let hasWord = tokens.some((i) => i[0] !== "space" && i[0] !== "comment");
            if (hasWord) {
                node2.raws.between += firstSpaces.map((i) => i[1]).join("");
                firstSpaces = [];
            }
            this.raw(node2, "value", firstSpaces.concat(tokens), customProperty);
            if (node2.value.includes(":") && !customProperty) {
                this.checkMissedSemicolon(tokens);
            }
        }
        atrule(token) {
            let node2 = new AtRule$3();
            node2.name = token[1].slice(1);
            if (node2.name === "") {
                this.unnamedAtrule(node2, token);
            }
            this.init(node2, token[2]);
            let type;
            let prev;
            let shift;
            let last = false;
            let open = false;
            let params = [];
            let brackets = [];
            while (!this.tokenizer.endOfFile()) {
                token = this.tokenizer.nextToken();
                type = token[0];
                if (type === "(" || type === "[") {
                    brackets.push(type === "(" ? ")" : "]");
                } else if (type === "{" && brackets.length > 0) {
                    brackets.push("}");
                } else if (type === brackets[brackets.length - 1]) {
                    brackets.pop();
                }
                if (brackets.length === 0) {
                    if (type === ";") {
                        node2.source.end = this.getPosition(token[2]);
                        this.semicolon = true;
                        break;
                    } else if (type === "{") {
                        open = true;
                        break;
                    } else if (type === "}") {
                        if (params.length > 0) {
                            shift = params.length - 1;
                            prev = params[shift];
                            while (prev && prev[0] === "space") {
                                prev = params[--shift];
                            }
                            if (prev) {
                                node2.source.end = this.getPosition(prev[3] || prev[2]);
                            }
                        }
                        this.end(token);
                        break;
                    } else {
                        params.push(token);
                    }
                } else {
                    params.push(token);
                }
                if (this.tokenizer.endOfFile()) {
                    last = true;
                    break;
                }
            }
            node2.raws.between = this.spacesAndCommentsFromEnd(params);
            if (params.length) {
                node2.raws.afterName = this.spacesAndCommentsFromStart(params);
                this.raw(node2, "params", params);
                if (last) {
                    token = params[params.length - 1];
                    node2.source.end = this.getPosition(token[3] || token[2]);
                    this.spaces = node2.raws.between;
                    node2.raws.between = "";
                }
            } else {
                node2.raws.afterName = "";
                node2.params = "";
            }
            if (open) {
                node2.nodes = [];
                this.current = node2;
            }
        }
        end(token) {
            if (this.current.nodes && this.current.nodes.length) {
                this.current.raws.semicolon = this.semicolon;
            }
            this.semicolon = false;
            this.current.raws.after = (this.current.raws.after || "") + this.spaces;
            this.spaces = "";
            if (this.current.parent) {
                this.current.source.end = this.getPosition(token[2]);
                this.current = this.current.parent;
            } else {
                this.unexpectedClose(token);
            }
        }
        endFile() {
            if (this.current.parent)
                this.unclosedBlock();
            if (this.current.nodes && this.current.nodes.length) {
                this.current.raws.semicolon = this.semicolon;
            }
            this.current.raws.after = (this.current.raws.after || "") + this.spaces;
        }
        freeSemicolon(token) {
            this.spaces += token[1];
            if (this.current.nodes) {
                let prev = this.current.nodes[this.current.nodes.length - 1];
                if (prev && prev.type === "rule" && !prev.raws.ownSemicolon) {
                    prev.raws.ownSemicolon = this.spaces;
                    this.spaces = "";
                }
            }
        }
        // Helpers
        getPosition(offset) {
            let pos = this.input.fromOffset(offset);
            return {
                offset,
                line: pos.line,
                column: pos.col
            };
        }
        init(node2, offset) {
            this.current.push(node2);
            node2.source = {
                start: this.getPosition(offset),
                input: this.input
            };
            node2.raws.before = this.spaces;
            this.spaces = "";
            if (node2.type !== "comment")
                this.semicolon = false;
        }
        raw(node2, prop, tokens, customProperty) {
            let token, type;
            let length = tokens.length;
            let value = "";
            let clean = true;
            let next, prev;
            for (let i = 0; i < length; i += 1) {
                token = tokens[i];
                type = token[0];
                if (type === "space" && i === length - 1 && !customProperty) {
                    clean = false;
                } else if (type === "comment") {
                    prev = tokens[i - 1] ? tokens[i - 1][0] : "empty";
                    next = tokens[i + 1] ? tokens[i + 1][0] : "empty";
                    if (!SAFE_COMMENT_NEIGHBOR[prev] && !SAFE_COMMENT_NEIGHBOR[next]) {
                        if (value.slice(-1) === ",") {
                            clean = false;
                        } else {
                            value += token[1];
                        }
                    } else {
                        clean = false;
                    }
                } else {
                    value += token[1];
                }
            }
            if (!clean) {
                let raw = tokens.reduce((all, i) => all + i[1], "");
                node2.raws[prop] = { value, raw };
            }
            node2[prop] = value;
        }
        spacesAndCommentsFromEnd(tokens) {
            let lastTokenType;
            let spaces = "";
            while (tokens.length) {
                lastTokenType = tokens[tokens.length - 1][0];
                if (lastTokenType !== "space" && lastTokenType !== "comment")
                    break;
                spaces = tokens.pop()[1] + spaces;
            }
            return spaces;
        }
        spacesAndCommentsFromStart(tokens) {
            let next;
            let spaces = "";
            while (tokens.length) {
                next = tokens[0][0];
                if (next !== "space" && next !== "comment")
                    break;
                spaces += tokens.shift()[1];
            }
            return spaces;
        }
        spacesFromEnd(tokens) {
            let lastTokenType;
            let spaces = "";
            while (tokens.length) {
                lastTokenType = tokens[tokens.length - 1][0];
                if (lastTokenType !== "space")
                    break;
                spaces = tokens.pop()[1] + spaces;
            }
            return spaces;
        }
        stringFrom(tokens, from) {
            let result2 = "";
            for (let i = from; i < tokens.length; i++) {
                result2 += tokens[i][1];
            }
            tokens.splice(from, tokens.length - from);
            return result2;
        }
        colon(tokens) {
            let brackets = 0;
            let token, type, prev;
            for (let [i, element] of tokens.entries()) {
                token = element;
                type = token[0];
                if (type === "(") {
                    brackets += 1;
                }
                if (type === ")") {
                    brackets -= 1;
                }
                if (brackets === 0 && type === ":") {
                    if (!prev) {
                        this.doubleColon(token);
                    } else if (prev[0] === "word" && prev[1] === "progid") {
                        continue;
                    } else {
                        return i;
                    }
                }
                prev = token;
            }
            return false;
        }
        // Errors
        unclosedBracket(bracket) {
            throw this.input.error(
                "Unclosed bracket",
                { offset: bracket[2] },
                { offset: bracket[2] + 1 }
            );
        }
        unknownWord(tokens) {
            throw this.input.error(
                "Unknown word",
                { offset: tokens[0][2] },
                { offset: tokens[0][2] + tokens[0][1].length }
            );
        }
        unexpectedClose(token) {
            throw this.input.error(
                "Unexpected }",
                { offset: token[2] },
                { offset: token[2] + 1 }
            );
        }
        unclosedBlock() {
            let pos = this.current.source.start;
            throw this.input.error("Unclosed block", pos.line, pos.column);
        }
        doubleColon(token) {
            throw this.input.error(
                "Double colon",
                { offset: token[2] },
                { offset: token[2] + token[1].length }
            );
        }
        unnamedAtrule(node2, token) {
            throw this.input.error(
                "At-rule without name",
                { offset: token[2] },
                { offset: token[2] + token[1].length }
            );
        }
        precheckMissedSemicolon() {
        }
        checkMissedSemicolon(tokens) {
            let colon = this.colon(tokens);
            if (colon === false)
                return;
            let founded = 0;
            let token;
            for (let j = colon - 1; j >= 0; j--) {
                token = tokens[j];
                if (token[0] !== "space") {
                    founded += 1;
                    if (founded === 2)
                        break;
                }
            }
            throw this.input.error(
                "Missed semicolon",
                token[0] === "word" ? token[3] + 1 : token[2]
            );
        }
    };
    var parser = Parser$2;
    let Container$3 = container;
    let Parser$1 = parser;
    let Input$4 = input;
    function parse$4(css, opts) {
        let input2 = new Input$4(css, opts);
        let parser2 = new Parser$1(input2);
        try {
            parser2.parse();
        } catch (e) {
            throw e;
        }
        return parser2.root;
    }
    var parse_1 = parse$4;
    parse$4.default = parse$4;
    Container$3.registerParse(parse$4);
    let { isClean, my } = symbols;
    let MapGenerator$1 = mapGenerator;
    let stringify$3 = stringify_1;
    let Container$2 = container;
    let Document$3 = document$2;
    let Result$3 = result;
    let parse$3 = parse_1;
    let Root$4 = root$1;
    const TYPE_TO_CLASS_NAME = {
        document: "Document",
        root: "Root",
        atrule: "AtRule",
        rule: "Rule",
        decl: "Declaration",
        comment: "Comment"
    };
    const PLUGIN_PROPS = {
        postcssPlugin: true,
        prepare: true,
        Once: true,
        Document: true,
        Root: true,
        Declaration: true,
        Rule: true,
        AtRule: true,
        Comment: true,
        DeclarationExit: true,
        RuleExit: true,
        AtRuleExit: true,
        CommentExit: true,
        RootExit: true,
        DocumentExit: true,
        OnceExit: true
    };
    const NOT_VISITORS = {
        postcssPlugin: true,
        prepare: true,
        Once: true
    };
    const CHILDREN = 0;
    function isPromise(obj) {
        return typeof obj === "object" && typeof obj.then === "function";
    }
    function getEvents(node2) {
        let key = false;
        let type = TYPE_TO_CLASS_NAME[node2.type];
        if (node2.type === "decl") {
            key = node2.prop.toLowerCase();
        } else if (node2.type === "atrule") {
            key = node2.name.toLowerCase();
        }
        if (key && node2.append) {
            return [
                type,
                type + "-" + key,
                CHILDREN,
                type + "Exit",
                type + "Exit-" + key
            ];
        } else if (key) {
            return [type, type + "-" + key, type + "Exit", type + "Exit-" + key];
        } else if (node2.append) {
            return [type, CHILDREN, type + "Exit"];
        } else {
            return [type, type + "Exit"];
        }
    }
    function toStack(node2) {
        let events;
        if (node2.type === "document") {
            events = ["Document", CHILDREN, "DocumentExit"];
        } else if (node2.type === "root") {
            events = ["Root", CHILDREN, "RootExit"];
        } else {
            events = getEvents(node2);
        }
        return {
            node: node2,
            events,
            eventIndex: 0,
            visitors: [],
            visitorIndex: 0,
            iterator: 0
        };
    }
    function cleanMarks(node2) {
        node2[isClean] = false;
        if (node2.nodes)
            node2.nodes.forEach((i) => cleanMarks(i));
        return node2;
    }
    let postcss$2 = {};
    let LazyResult$2 = class LazyResult {
        constructor(processor2, css, opts) {
            this.stringified = false;
            this.processed = false;
            let root2;
            if (typeof css === "object" && css !== null && (css.type === "root" || css.type === "document")) {
                root2 = cleanMarks(css);
            } else if (css instanceof LazyResult$2 || css instanceof Result$3) {
                root2 = cleanMarks(css.root);
                if (css.map) {
                    if (typeof opts.map === "undefined")
                        opts.map = {};
                    if (!opts.map.inline)
                        opts.map.inline = false;
                    opts.map.prev = css.map;
                }
            } else {
                let parser2 = parse$3;
                if (opts.syntax)
                    parser2 = opts.syntax.parse;
                if (opts.parser)
                    parser2 = opts.parser;
                if (parser2.parse)
                    parser2 = parser2.parse;
                try {
                    root2 = parser2(css, opts);
                } catch (error) {
                    this.processed = true;
                    this.error = error;
                }
                if (root2 && !root2[my]) {
                    Container$2.rebuild(root2);
                }
            }
            this.result = new Result$3(processor2, root2, opts);
            this.helpers = { ...postcss$2, result: this.result, postcss: postcss$2 };
            this.plugins = this.processor.plugins.map((plugin2) => {
                if (typeof plugin2 === "object" && plugin2.prepare) {
                    return { ...plugin2, ...plugin2.prepare(this.result) };
                } else {
                    return plugin2;
                }
            });
        }
        get [Symbol.toStringTag]() {
            return "LazyResult";
        }
        get processor() {
            return this.result.processor;
        }
        get opts() {
            return this.result.opts;
        }
        get css() {
            return this.stringify().css;
        }
        get content() {
            return this.stringify().content;
        }
        get map() {
            return this.stringify().map;
        }
        get root() {
            return this.sync().root;
        }
        get messages() {
            return this.sync().messages;
        }
        warnings() {
            return this.sync().warnings();
        }
        toString() {
            return this.css;
        }
        then(onFulfilled, onRejected) {
            return this.async().then(onFulfilled, onRejected);
        }
        catch(onRejected) {
            return this.async().catch(onRejected);
        }
        finally(onFinally) {
            return this.async().then(onFinally, onFinally);
        }
        async() {
            if (this.error)
                return Promise.reject(this.error);
            if (this.processed)
                return Promise.resolve(this.result);
            if (!this.processing) {
                this.processing = this.runAsync();
            }
            return this.processing;
        }
        sync() {
            if (this.error)
                throw this.error;
            if (this.processed)
                return this.result;
            this.processed = true;
            if (this.processing) {
                throw this.getAsyncError();
            }
            for (let plugin2 of this.plugins) {
                let promise = this.runOnRoot(plugin2);
                if (isPromise(promise)) {
                    throw this.getAsyncError();
                }
            }
            this.prepareVisitors();
            if (this.hasListener) {
                let root2 = this.result.root;
                while (!root2[isClean]) {
                    root2[isClean] = true;
                    this.walkSync(root2);
                }
                if (this.listeners.OnceExit) {
                    if (root2.type === "document") {
                        for (let subRoot of root2.nodes) {
                            this.visitSync(this.listeners.OnceExit, subRoot);
                        }
                    } else {
                        this.visitSync(this.listeners.OnceExit, root2);
                    }
                }
            }
            return this.result;
        }
        stringify() {
            if (this.error)
                throw this.error;
            if (this.stringified)
                return this.result;
            this.stringified = true;
            this.sync();
            let opts = this.result.opts;
            let str = stringify$3;
            if (opts.syntax)
                str = opts.syntax.stringify;
            if (opts.stringifier)
                str = opts.stringifier;
            if (str.stringify)
                str = str.stringify;
            let map = new MapGenerator$1(str, this.result.root, this.result.opts);
            let data = map.generate();
            this.result.css = data[0];
            this.result.map = data[1];
            return this.result;
        }
        walkSync(node2) {
            node2[isClean] = true;
            let events = getEvents(node2);
            for (let event of events) {
                if (event === CHILDREN) {
                    if (node2.nodes) {
                        node2.each((child) => {
                            if (!child[isClean])
                                this.walkSync(child);
                        });
                    }
                } else {
                    let visitors = this.listeners[event];
                    if (visitors) {
                        if (this.visitSync(visitors, node2.toProxy()))
                            return;
                    }
                }
            }
        }
        visitSync(visitors, node2) {
            for (let [plugin2, visitor] of visitors) {
                this.result.lastPlugin = plugin2;
                let promise;
                try {
                    promise = visitor(node2, this.helpers);
                } catch (e) {
                    throw this.handleError(e, node2.proxyOf);
                }
                if (node2.type !== "root" && node2.type !== "document" && !node2.parent) {
                    return true;
                }
                if (isPromise(promise)) {
                    throw this.getAsyncError();
                }
            }
        }
        runOnRoot(plugin2) {
            this.result.lastPlugin = plugin2;
            try {
                if (typeof plugin2 === "object" && plugin2.Once) {
                    if (this.result.root.type === "document") {
                        let roots = this.result.root.nodes.map(
                            (root2) => plugin2.Once(root2, this.helpers)
                        );
                        if (isPromise(roots[0])) {
                            return Promise.all(roots);
                        }
                        return roots;
                    }
                    return plugin2.Once(this.result.root, this.helpers);
                } else if (typeof plugin2 === "function") {
                    return plugin2(this.result.root, this.result);
                }
            } catch (error) {
                throw this.handleError(error);
            }
        }
        getAsyncError() {
            throw new Error("Use process(css).then(cb) to work with async plugins");
        }
        handleError(error, node2) {
            let plugin2 = this.result.lastPlugin;
            try {
                if (node2)
                    node2.addToError(error);
                this.error = error;
                if (error.name === "CssSyntaxError" && !error.plugin) {
                    error.plugin = plugin2.postcssPlugin;
                    error.setMessage();
                } else if (plugin2.postcssVersion) {
                    if (false)
                        ;
                }
            } catch (err) {
                if (console && console.error)
                    console.error(err);
            }
            return error;
        }
        async runAsync() {
            this.plugin = 0;
            for (let i = 0; i < this.plugins.length; i++) {
                let plugin2 = this.plugins[i];
                let promise = this.runOnRoot(plugin2);
                if (isPromise(promise)) {
                    try {
                        await promise;
                    } catch (error) {
                        throw this.handleError(error);
                    }
                }
            }
            this.prepareVisitors();
            if (this.hasListener) {
                let root2 = this.result.root;
                while (!root2[isClean]) {
                    root2[isClean] = true;
                    let stack = [toStack(root2)];
                    while (stack.length > 0) {
                        let promise = this.visitTick(stack);
                        if (isPromise(promise)) {
                            try {
                                await promise;
                            } catch (e) {
                                let node2 = stack[stack.length - 1].node;
                                throw this.handleError(e, node2);
                            }
                        }
                    }
                }
                if (this.listeners.OnceExit) {
                    for (let [plugin2, visitor] of this.listeners.OnceExit) {
                        this.result.lastPlugin = plugin2;
                        try {
                            if (root2.type === "document") {
                                let roots = root2.nodes.map(
                                    (subRoot) => visitor(subRoot, this.helpers)
                                );
                                await Promise.all(roots);
                            } else {
                                await visitor(root2, this.helpers);
                            }
                        } catch (e) {
                            throw this.handleError(e);
                        }
                    }
                }
            }
            this.processed = true;
            return this.stringify();
        }
        prepareVisitors() {
            this.listeners = {};
            let add = (plugin2, type, cb) => {
                if (!this.listeners[type])
                    this.listeners[type] = [];
                this.listeners[type].push([plugin2, cb]);
            };
            for (let plugin2 of this.plugins) {
                if (typeof plugin2 === "object") {
                    for (let event in plugin2) {
                        if (!PLUGIN_PROPS[event] && /^[A-Z]/.test(event)) {
                            throw new Error(
                                `Unknown event ${event} in ${plugin2.postcssPlugin}. Try to update PostCSS (${this.processor.version} now).`
                            );
                        }
                        if (!NOT_VISITORS[event]) {
                            if (typeof plugin2[event] === "object") {
                                for (let filter in plugin2[event]) {
                                    if (filter === "*") {
                                        add(plugin2, event, plugin2[event][filter]);
                                    } else {
                                        add(
                                            plugin2,
                                            event + "-" + filter.toLowerCase(),
                                            plugin2[event][filter]
                                        );
                                    }
                                }
                            } else if (typeof plugin2[event] === "function") {
                                add(plugin2, event, plugin2[event]);
                            }
                        }
                    }
                }
            }
            this.hasListener = Object.keys(this.listeners).length > 0;
        }
        visitTick(stack) {
            let visit = stack[stack.length - 1];
            let { node: node2, visitors } = visit;
            if (node2.type !== "root" && node2.type !== "document" && !node2.parent) {
                stack.pop();
                return;
            }
            if (visitors.length > 0 && visit.visitorIndex < visitors.length) {
                let [plugin2, visitor] = visitors[visit.visitorIndex];
                visit.visitorIndex += 1;
                if (visit.visitorIndex === visitors.length) {
                    visit.visitors = [];
                    visit.visitorIndex = 0;
                }
                this.result.lastPlugin = plugin2;
                try {
                    return visitor(node2.toProxy(), this.helpers);
                } catch (e) {
                    throw this.handleError(e, node2);
                }
            }
            if (visit.iterator !== 0) {
                let iterator = visit.iterator;
                let child;
                while (child = node2.nodes[node2.indexes[iterator]]) {
                    node2.indexes[iterator] += 1;
                    if (!child[isClean]) {
                        child[isClean] = true;
                        stack.push(toStack(child));
                        return;
                    }
                }
                visit.iterator = 0;
                delete node2.indexes[iterator];
            }
            let events = visit.events;
            while (visit.eventIndex < events.length) {
                let event = events[visit.eventIndex];
                visit.eventIndex += 1;
                if (event === CHILDREN) {
                    if (node2.nodes && node2.nodes.length) {
                        node2[isClean] = true;
                        visit.iterator = node2.getIterator();
                    }
                    return;
                } else if (this.listeners[event]) {
                    visit.visitors = this.listeners[event];
                    return;
                }
            }
            stack.pop();
        }
    };
    LazyResult$2.registerPostcss = (dependant) => {
        postcss$2 = dependant;
    };
    var lazyResult = LazyResult$2;
    LazyResult$2.default = LazyResult$2;
    Root$4.registerLazyResult(LazyResult$2);
    Document$3.registerLazyResult(LazyResult$2);
    let MapGenerator = mapGenerator;
    let stringify$2 = stringify_1;
    let parse$2 = parse_1;
    const Result$2 = result;
    let NoWorkResult$1 = class NoWorkResult {
        constructor(processor2, css, opts) {
            css = css.toString();
            this.stringified = false;
            this._processor = processor2;
            this._css = css;
            this._opts = opts;
            this._map = void 0;
            let root2;
            let str = stringify$2;
            this.result = new Result$2(this._processor, root2, this._opts);
            this.result.css = css;
            let self2 = this;
            Object.defineProperty(this.result, "root", {
                get() {
                    return self2.root;
                }
            });
            let map = new MapGenerator(str, root2, this._opts, css);
            if (map.isMap()) {
                let [generatedCSS, generatedMap] = map.generate();
                if (generatedCSS) {
                    this.result.css = generatedCSS;
                }
                if (generatedMap) {
                    this.result.map = generatedMap;
                }
            }
        }
        get [Symbol.toStringTag]() {
            return "NoWorkResult";
        }
        get processor() {
            return this.result.processor;
        }
        get opts() {
            return this.result.opts;
        }
        get css() {
            return this.result.css;
        }
        get content() {
            return this.result.css;
        }
        get map() {
            return this.result.map;
        }
        get root() {
            if (this._root) {
                return this._root;
            }
            let root2;
            let parser2 = parse$2;
            try {
                root2 = parser2(this._css, this._opts);
            } catch (error) {
                this.error = error;
            }
            if (this.error) {
                throw this.error;
            } else {
                this._root = root2;
                return root2;
            }
        }
        get messages() {
            return [];
        }
        warnings() {
            return [];
        }
        toString() {
            return this._css;
        }
        then(onFulfilled, onRejected) {
            return this.async().then(onFulfilled, onRejected);
        }
        catch(onRejected) {
            return this.async().catch(onRejected);
        }
        finally(onFinally) {
            return this.async().then(onFinally, onFinally);
        }
        async() {
            if (this.error)
                return Promise.reject(this.error);
            return Promise.resolve(this.result);
        }
        sync() {
            if (this.error)
                throw this.error;
            return this.result;
        }
    };
    var noWorkResult = NoWorkResult$1;
    NoWorkResult$1.default = NoWorkResult$1;
    let NoWorkResult = noWorkResult;
    let LazyResult$1 = lazyResult;
    let Document$2 = document$2;
    let Root$3 = root$1;
    let Processor$2 = class Processor {
        constructor(plugins = []) {
            this.version = "8.4.21";
            this.plugins = this.normalize(plugins);
        }
        use(plugin2) {
            this.plugins = this.plugins.concat(this.normalize([plugin2]));
            return this;
        }
        process(css, opts = {}) {
            if (this.plugins.length === 0 && typeof opts.parser === "undefined" && typeof opts.stringifier === "undefined" && typeof opts.syntax === "undefined") {
                return new NoWorkResult(this, css, opts);
            } else {
                return new LazyResult$1(this, css, opts);
            }
        }
        normalize(plugins) {
            let normalized = [];
            for (let i of plugins) {
                if (i.postcss === true) {
                    i = i();
                } else if (i.postcss) {
                    i = i.postcss;
                }
                if (typeof i === "object" && Array.isArray(i.plugins)) {
                    normalized = normalized.concat(i.plugins);
                } else if (typeof i === "object" && i.postcssPlugin) {
                    normalized.push(i);
                } else if (typeof i === "function") {
                    normalized.push(i);
                } else if (typeof i === "object" && (i.parse || i.stringify))
                    ;
                else {
                    throw new Error(i + " is not a PostCSS plugin");
                }
            }
            return normalized;
        }
    };
    var processor = Processor$2;
    Processor$2.default = Processor$2;
    Root$3.registerProcessor(Processor$2);
    Document$2.registerProcessor(Processor$2);
    let Declaration$2 = declaration;
    let PreviousMap = previousMap;
    let Comment$3 = comment$1;
    let AtRule$2 = atRule$1;
    let Input$3 = input;
    let Root$2 = root$1;
    let Rule$2 = rule$1;
    function fromJSON$2(json, inputs) {
        if (Array.isArray(json))
            return json.map((n) => fromJSON$2(n));
        let { inputs: ownInputs, ...defaults } = json;
        if (ownInputs) {
            inputs = [];
            for (let input2 of ownInputs) {
                let inputHydrated = { ...input2, __proto__: Input$3.prototype };
                if (inputHydrated.map) {
                    inputHydrated.map = {
                        ...inputHydrated.map,
                        __proto__: PreviousMap.prototype
                    };
                }
                inputs.push(inputHydrated);
            }
        }
        if (defaults.nodes) {
            defaults.nodes = json.nodes.map((n) => fromJSON$2(n, inputs));
        }
        if (defaults.source) {
            let { inputId, ...source } = defaults.source;
            defaults.source = source;
            if (inputId != null) {
                defaults.source.input = inputs[inputId];
            }
        }
        if (defaults.type === "root") {
            return new Root$2(defaults);
        } else if (defaults.type === "decl") {
            return new Declaration$2(defaults);
        } else if (defaults.type === "rule") {
            return new Rule$2(defaults);
        } else if (defaults.type === "comment") {
            return new Comment$3(defaults);
        } else if (defaults.type === "atrule") {
            return new AtRule$2(defaults);
        } else {
            throw new Error("Unknown node type: " + json.type);
        }
    }
    var fromJSON_1 = fromJSON$2;
    fromJSON$2.default = fromJSON$2;
    let CssSyntaxError$1 = cssSyntaxError;
    let Declaration$1 = declaration;
    let LazyResult = lazyResult;
    let Container$1 = container;
    let Processor$1 = processor;
    let stringify$1 = stringify_1;
    let fromJSON$1 = fromJSON_1;
    let Document$1 = document$2;
    let Warning$1 = warning;
    let Comment$2 = comment$1;
    let AtRule$1 = atRule$1;
    let Result$1 = result;
    let Input$2 = input;
    let parse$1 = parse_1;
    let list$1 = list_1;
    let Rule$1 = rule$1;
    let Root$1 = root$1;
    let Node$1 = node;
    function postcss$1(...plugins) {
        if (plugins.length === 1 && Array.isArray(plugins[0])) {
            plugins = plugins[0];
        }
        return new Processor$1(plugins);
    }
    postcss$1.plugin = function plugin2(name, initializer) {
        let warningPrinted = false;
        function creator(...args) {
            if (console && console.warn && !warningPrinted) {
                warningPrinted = true;
                console.warn(
                    name + ": postcss.plugin was deprecated. Migration guide:\nhttps://evilmartians.com/chronicles/postcss-8-plugin-migration"
                );
                if ("en_US.UTF-8".startsWith("cn")) {
                    console.warn(
                        name + ": \u91CC\u9762 postcss.plugin \u88AB\u5F03\u7528. \u8FC1\u79FB\u6307\u5357:\nhttps://www.w3ctech.com/topic/2226"
                    );
                }
            }
            let transformer = initializer(...args);
            transformer.postcssPlugin = name;
            transformer.postcssVersion = new Processor$1().version;
            return transformer;
        }
        let cache;
        Object.defineProperty(creator, "postcss", {
            get() {
                if (!cache)
                    cache = creator();
                return cache;
            }
        });
        creator.process = function (css, processOpts, pluginOpts) {
            return postcss$1([creator(pluginOpts)]).process(css, processOpts);
        };
        return creator;
    };
    postcss$1.stringify = stringify$1;
    postcss$1.parse = parse$1;
    postcss$1.fromJSON = fromJSON$1;
    postcss$1.list = list$1;
    postcss$1.comment = (defaults) => new Comment$2(defaults);
    postcss$1.atRule = (defaults) => new AtRule$1(defaults);
    postcss$1.decl = (defaults) => new Declaration$1(defaults);
    postcss$1.rule = (defaults) => new Rule$1(defaults);
    postcss$1.root = (defaults) => new Root$1(defaults);
    postcss$1.document = (defaults) => new Document$1(defaults);
    postcss$1.CssSyntaxError = CssSyntaxError$1;
    postcss$1.Declaration = Declaration$1;
    postcss$1.Container = Container$1;
    postcss$1.Processor = Processor$1;
    postcss$1.Document = Document$1;
    postcss$1.Comment = Comment$2;
    postcss$1.Warning = Warning$1;
    postcss$1.AtRule = AtRule$1;
    postcss$1.Result = Result$1;
    postcss$1.Input = Input$2;
    postcss$1.Rule = Rule$1;
    postcss$1.Root = Root$1;
    postcss$1.Node = Node$1;
    LazyResult.registerPostcss(postcss$1);
    var postcss_1 = postcss$1;
    postcss$1.default = postcss$1;
    const stringify = postcss_1.stringify;
    const fromJSON = postcss_1.fromJSON;
    const plugin = postcss_1.plugin;
    const parse = postcss_1.parse;
    const list = postcss_1.list;
    const document$1 = postcss_1.document;
    const comment = postcss_1.comment;
    const atRule = postcss_1.atRule;
    const rule = postcss_1.rule;
    const decl = postcss_1.decl;
    const root = postcss_1.root;
    const CssSyntaxError = postcss_1.CssSyntaxError;
    const Declaration = postcss_1.Declaration;
    const Container = postcss_1.Container;
    const Processor = postcss_1.Processor;
    const Document = postcss_1.Document;
    const Comment$1 = postcss_1.Comment;
    const Warning = postcss_1.Warning;
    const AtRule = postcss_1.AtRule;
    const Result = postcss_1.Result;
    const Input$1 = postcss_1.Input;
    const Rule = postcss_1.Rule;
    const Root = postcss_1.Root;
    const Node = postcss_1.Node;
    const postcss = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
        __proto__: null,
        AtRule,
        Comment: Comment$1,
        Container,
        CssSyntaxError,
        Declaration,
        Document,
        Input: Input$1,
        Node,
        Processor,
        Result,
        Root,
        Rule,
        Warning,
        atRule,
        comment,
        decl,
        default: postcss_1,
        document: document$1,
        fromJSON,
        list,
        parse,
        plugin,
        root,
        rule,
        stringify
    }, Symbol.toStringTag, { value: "Module" }));
    const require$$0 = /* @__PURE__ */ getAugmentedNamespace(postcss);
    let tokenizer = tokenize;
    let Comment = comment$1;
    let Parser = parser;
    let SafeParser$1 = class SafeParser extends Parser {
        createTokenizer() {
            this.tokenizer = tokenizer(this.input, { ignoreErrors: true });
        }
        comment(token) {
            let node2 = new Comment();
            this.init(node2, token[2]);
            let pos = this.input.fromOffset(token[3]) || this.input.fromOffset(this.input.css.length - 1);
            node2.source.end = {
                offset: token[3],
                line: pos.line,
                column: pos.col
            };
            let text = token[1].slice(2);
            if (text.slice(-2) === "*/")
                text = text.slice(0, -2);
            if (/^\s*$/.test(text)) {
                node2.text = "";
                node2.raws.left = text;
                node2.raws.right = "";
            } else {
                let match = text.match(/^(\s*)([^]*\S)(\s*)$/);
                node2.text = match[2];
                node2.raws.left = match[1];
                node2.raws.right = match[3];
            }
        }
        decl(tokens) {
            if (tokens.length > 1 && tokens.some((i) => i[0] === "word")) {
                super.decl(tokens);
            }
        }
        unclosedBracket() {
        }
        unknownWord(tokens) {
            this.spaces += tokens.map((i) => i[1]).join("");
        }
        unexpectedClose() {
            this.current.raws.after += "}";
        }
        doubleColon() {
        }
        unnamedAtrule(node2) {
            node2.name = "";
        }
        precheckMissedSemicolon(tokens) {
            let colon = this.colon(tokens);
            if (colon === false)
                return;
            let nextStart, prevEnd;
            for (nextStart = colon - 1; nextStart >= 0; nextStart--) {
                if (tokens[nextStart][0] === "word")
                    break;
            }
            if (nextStart === 0)
                return;
            for (prevEnd = nextStart - 1; prevEnd >= 0; prevEnd--) {
                if (tokens[prevEnd][0] !== "space") {
                    prevEnd += 1;
                    break;
                }
            }
            let other = tokens.slice(nextStart);
            let spaces = tokens.slice(prevEnd, nextStart);
            tokens.splice(prevEnd, tokens.length - prevEnd);
            this.spaces = spaces.map((i) => i[1]).join("");
            this.decl(other);
        }
        checkMissedSemicolon() {
        }
        endFile() {
            if (this.current.nodes && this.current.nodes.length) {
                this.current.raws.semicolon = this.semicolon;
            }
            this.current.raws.after = (this.current.raws.after || "") + this.spaces;
            while (this.current.parent) {
                this.current = this.current.parent;
                this.current.raws.after = "";
            }
        }
    };
    var safeParser = SafeParser$1;
    let { Input } = require$$0;
    let SafeParser = safeParser;
    var safeParse = function safeParse2(css, opts) {
        let input2 = new Input(css, opts);
        let parser2 = new SafeParser(input2);
        parser2.parse();
        return parser2.root;
    };
    async function convTextToRules(styleContent, href) {
        const processor2 = postcss_1();
        const result2 = await processor2.process(styleContent, {
            from: href || "cssFromUnknown",
            parser: safeParse
        });
        const returnObj = {
            nodes: result2.root.nodes,
            href
        };
        return returnObj;
    }
    const cssHelper = {
        mergeobjCss: function (a, b) {
            ["normRule", "fontFace", "keyFram"].forEach(function (ele) {
                if (!a[ele] || !b[ele])
                    ;
                a[ele] = a[ele].concat(b[ele]).filter((e) => e);
            });
        },
        normRuleNodeToText: function (node2) {
            var s = "";
            node2.nodes.forEach(function (ele) {
                if (ele.prop && ele.value) {
                    var before = ele.raws.before.replace(/[\s]*/, "");
                    s += before + ele.prop + ":" + ele.value + (ele.important ? "!important;" : ";");
                }
            });
            return s;
        },
        keyFramNodeToText: function (node2) {
            var s = "@" + node2.name + " " + node2.params + "{";
            node2.nodes.forEach(function (_node) {
                s += _node.selector + "{" + cssHelper.normRuleNodeToText(_node) + "}";
            });
            s += "}";
            return s;
        },
        fontFaceNodeToText: function (node2) {
            var s = "@" + node2.name + "{";
            s += cssHelper.normRuleNodeToText(node2);
            s += "}";
            return s;
        },
        textToCss: async function (styleContent) {
            const parsedCss = await convTextToRules(styleContent);
            return parsedCss;
        }
    };
    const PseudoClass = "active|checked|disabled|empty|enabled|focus|hover|in-range|invalid|link|out-of-range|target|valid|visited|focus-within|focus-visible|fullscreen", PseudoElement = "((-(webkit|moz)-)?(scrollbar(-(button|thumb|corner|track(-piece)?))?))|-webkit-(details-marker|resizer)|after|before|first-letter|first-line|placeholder|selection", MaxPossiblePseudoLength = 30, REG0 = new RegExp(
        "^(:(" + PseudoClass + ")|::?(" + PseudoElement + "))+$",
        ""
    ), REG1 = new RegExp(
        "( |^)(:(" + PseudoClass + ")|::?(" + PseudoElement + "))+( |$)",
        "ig"
    ), REG2 = new RegExp(
        "\\((:(" + PseudoClass + ")|::?(" + PseudoElement + "))+\\)",
        "ig"
    ), REG3 = new RegExp(
        "(:(" + PseudoClass + ")|::?(" + PseudoElement + "))+",
        "ig"
    );
    function filterRules($0, objCss, taskTimerRecord) {
        var promises = [];
        var matched = [];
        var keyFramUsed = [];
        var fontFaceUsed = [];
        const descendantsCount = $0.querySelectorAll("*").length;
        return new Promise(function (resolve2, reject) {
            objCss.normRule.forEach(function (rule2, idx) {
                promises.push(
                    new Promise(async function (res) {
                        var timer = setTimeout(function () {
                            if (idx % 1e3 === 0) {
                                let nRule = objCss.normRule.length;
                                chrome.runtime.sendMessage({
                                    action: "inform",
                                    info: `The selected dom has ${descendantsCount} descendants.
  Page rules are about ${nRule}.
  Traversing the ${idx}th rule...`
                                });
                            }
                            if (typeof rule2 === "string") {
                                res(rule2);
                                return;
                            } else {
                                var selMatched = [];
                                var arrSel = rule2.selectors.filter(function (v, i, self2) {
                                    return self2.indexOf(v) === i;
                                });
                                arrSel.forEach(function (sel) {
                                    if (selMatched.indexOf(sel) !== -1) {
                                        return;
                                    }
                                    if (sel.length < MaxPossiblePseudoLength && sel.match(REG0)) {
                                        selMatched.push(sel);
                                    } else {
                                        let replacedSel = sel.replace(REG1, " * ").replace(REG2, "(*)").replace(REG3, "").replace(/:not\(\*\)/ig, "");
                                        try {
                                            if ($0.matches(replacedSel) || $0.querySelectorAll(replacedSel).length !== 0) {
                                                selMatched.push(sel);
                                            }
                                        } catch (e) {
                                        }
                                    }
                                });
                                if (selMatched.length !== 0) {
                                    var cssText = selMatched.filter(function (v, i, self2) {
                                        return self2.indexOf(v) === i;
                                    }).join(",");
                                    cssText += "{" + cssHelper.normRuleNodeToText(rule2) + "}";
                                    res(cssText);
                                    rule2.nodes.forEach(function (ele) {
                                        if (ele.prop && ele.prop.match(/^(-(webkit|moz)-)?animation(-name)?$/i) !== null) {
                                            keyFramUsed = keyFramUsed.concat(
                                                ele.value.split(/ *, */).map(function (ele2) {
                                                    return ele2.split(" ")[0];
                                                })
                                            );
                                        }
                                    });
                                    if (rule2 && rule2.nodes) {
                                        for (let index = 0; index < rule2.nodes.length; index++) {
                                            const declaration2 = rule2.nodes[index];
                                            if (declaration2 && declaration2.prop === "font-family") {
                                                fontFaceUsed = [
                                                    ...fontFaceUsed,
                                                    ...declaration2.value.split(/ *, */).filter((e) => !!e)
                                                ];
                                            }
                                        }
                                    }
                                    return;
                                }
                            }
                            res("");
                        }, 0);
                        taskTimerRecord.push(timer);
                    })
                );
            });
            Promise.all(promises).then(function (result2) {
                keyFramUsed = keyFramUsed.filter(function (v, i, self2) {
                    return self2.indexOf(v) === i;
                });
                fontFaceUsed = fontFaceUsed.filter(function (v, i, self2) {
                    return self2.indexOf(v) === i;
                });
                result2.forEach(function (ele) {
                    if (ele.length > 0) {
                        matched.push(ele);
                    }
                });
                var frameCommentMarkUsed = false;
                keyFramUsed.forEach(function (ele) {
                    objCss.keyFram.forEach(function (e) {
                        if (ele === e.params) {
                            if (!frameCommentMarkUsed) {
                                matched.push("/*! CSS Used keyframes */");
                                frameCommentMarkUsed = true;
                            }
                            matched.push(cssHelper.keyFramNodeToText(e));
                        }
                    });
                });
                var fontCommentMarkUsed = false;
                fontFaceUsed.forEach(function (ele) {
                    objCss.fontFace.forEach(function (e) {
                        e.nodes.forEach(function (n) {
                            if (n.prop === "font-family" && ele.replace(/^(['"])?(.*)\1$/, "$2") === n.value.replace(/^(['"])?(.*)\1$/, "$2")) {
                                if (!fontCommentMarkUsed) {
                                    matched.push("/*! CSS Used fontfaces */");
                                    fontCommentMarkUsed = true;
                                }
                                matched.push(cssHelper.fontFaceNodeToText(e));
                            }
                        });
                    });
                });
                resolve2(matched);
            }).catch(function (err) {
                reject(err);
            });
        });
    }
    function convUrlToAbs(baseURI, url) {
        return new URL(url, baseURI).href;
    }
    const getByChromeAPI = (url) => {
        return new Promise((resolve2, _reject) => {
            chrome.runtime.sendMessage(
                {
                    action: "getResourceContent",
                    url
                },
                (response) => {
                    resolve2(response.content);
                }
            );
        });
    };
    function getFileContent(url) {
        return getByChromeAPI(url);
    }
    function getSavedSettings() {
        return new Promise((resolve2) => {
            if (chrome && chrome.storage) {
                chrome.storage.sync.get(
                    {
                        convUrlToAbsolute: true
                    },
                    function (items) {
                        resolve2(items.convUrlToAbsolute);
                    }
                );
            } else {
                resolve2(true);
            }
        });
    }
    function makeRequest(url) {
        const result2 = { url, cssraw: "" };
        chrome.runtime.sendMessage({
            action: "inform",
            info: "Getting : " + url
        });
        return new Promise(function (resolve2) {
            getFileContent(url).then((data) => {
                result2.cssraw = data;
                getSavedSettings().then((willConvUrlToAbs) => {
                    if (willConvUrlToAbs) {
                        result2.cssraw = result2.cssraw.replace(
                            /url\((['"]?)(.*?)\1\)/g,
                            function (_a, p1, p2) {
                                return `url(${p1}${convUrlToAbs(url, p2)}${p1})`;
                            }
                        );
                    }
                    resolve2(result2);
                    chrome.runtime.sendMessage({
                        action: "inform",
                        info: "Parsing : " + url
                    });
                });
            }).catch((error) => {
                console.log("CSS-Used: Fail to get: " + url, error);
                result2.cssraw = "";
                resolve2(result2);
            });
        });
    }
    function convLinkToText(links) {
        var promises = [];
        return new Promise(function (resolve2, reject) {
            if (links.length === 0) {
                resolve2([]);
            } else {
                for (var i = 0; i < links.length; i++) {
                    promises.push(makeRequest(links[i]));
                }
                Promise.all(promises).then((result2) => {
                    resolve2(result2);
                }).catch(function (err) {
                    reject(err);
                });
            }
        });
    }
    function traversalCSSRuleList(doc, externalCssCache2, cssNodeObj) {
        var promises = [];
        var objCss = {
            normRule: [],
            keyFram: [],
            fontFace: []
        };
        return new Promise(function (resolve2, reject) {
            if (cssNodeObj === void 0 || cssNodeObj.nodes.length === 0) {
                resolve2(objCss);
            } else if (cssNodeObj.nodes.length > 0) {
                let strMediaText = "";
                if (cssNodeObj.media && cssNodeObj.media.length > 0) {
                    strMediaText = `; media=${cssNodeObj.media.mediaText} `;
                }
                if (cssNodeObj.href === doc.location.href) {
                    objCss.normRule.push(`/*! CSS Used from: Embedded ${strMediaText}*/`);
                } else if (cssNodeObj.href && !cssNodeObj.parentHref) {
                    objCss.normRule.push(
                        `/*! CSS Used from: ${cssNodeObj.href} ${strMediaText}*/`
                    );
                }
            }
            for (var i = 0; i < cssNodeObj.nodes.length; i++) {
                (function (CSSRuleListItem, i2) {
                    promises.push(
                        new Promise(function (res) {
                            var _objCss = {
                                normRule: [],
                                keyFram: [],
                                fontFace: []
                            };
                            if (CSSRuleListItem.type === "atrule" && CSSRuleListItem.name.match(/^(-(webkit|moz)-)?keyframes$/)) {
                                _objCss.keyFram.push(CSSRuleListItem);
                                res(_objCss);
                            } else if (CSSRuleListItem.type === "atrule" && CSSRuleListItem.name === "font-face") {
                                _objCss.fontFace.push(CSSRuleListItem);
                                res(_objCss);
                            } else if (CSSRuleListItem.type === "atrule" && CSSRuleListItem.name === "media") {
                                traversalCSSRuleList(doc, externalCssCache2, {
                                    nodes: CSSRuleListItem.nodes
                                }).then(function (obj) {
                                    _objCss.normRule.push(
                                        "\n@media " + CSSRuleListItem.params + "{"
                                    );
                                    cssHelper.mergeobjCss(_objCss, obj);
                                    _objCss.normRule.push("}");
                                    res(_objCss);
                                });
                            } else if (CSSRuleListItem.type === "atrule" && CSSRuleListItem.name === "import") {
                                let isValidImport = true;
                                for (let j = 0; j < i2; j++) {
                                    let rule2 = cssNodeObj.nodes[j];
                                    if (rule2.type === "rule" || rule2.type === "atrule" && rule2.name.match(/^charset|import$/) === null) {
                                        isValidImport = false;
                                        break;
                                    }
                                }
                                if (!cssNodeObj.href) {
                                    isValidImport = false;
                                }
                                let importParamsMatch = CSSRuleListItem.params.match(
                                    /^(url\((['"]?)(.*?)\2\)|(['"])(.*?)\4)\s*(.*)$/
                                );
                                let href = importParamsMatch[3] || importParamsMatch[5] || "";
                                let media = importParamsMatch[6];
                                if (isValidImport && (href = convUrlToAbs(cssNodeObj.href, href)) && href !== cssNodeObj.parentHref) {
                                    new Promise((resolve22) => {
                                        if (externalCssCache2[href] !== void 0) {
                                            resolve22(externalCssCache2[href]);
                                        } else {
                                            convLinkToText([href]).then(function (result2) {
                                                return convTextToRules(result2[0].cssraw);
                                            }).then(function (nodeArr) {
                                                nodeArr.href = href;
                                                nodeArr.parentHref = cssNodeObj.href;
                                                externalCssCache2[href] = nodeArr;
                                                resolve22(nodeArr);
                                            });
                                        }
                                    }).then(function (nodeArr) {
                                        return traversalCSSRuleList(doc, externalCssCache2, nodeArr);
                                    }).then(function (obj) {
                                        if (obj.normRule.length > 0) {
                                            _objCss.normRule.push(
                                                ["/*! @import", href, media, "*/"].join(" ").replace(/ {2,}/g, " ")
                                            );
                                            media.length && _objCss.normRule.push("\n@media " + media + "{");
                                            cssHelper.mergeobjCss(_objCss, obj);
                                            media.length && _objCss.normRule.push("}");
                                            _objCss.normRule.push("/*! end @import */");
                                        } else {
                                            cssHelper.mergeobjCss(_objCss, obj);
                                        }
                                        res(_objCss);
                                    });
                                } else {
                                    res(_objCss);
                                }
                            } else if (CSSRuleListItem.type === "rule" && CSSRuleListItem.selector !== "") {
                                _objCss.normRule.push(CSSRuleListItem);
                                res(_objCss);
                            } else {
                                res(_objCss);
                            }
                        })
                    );
                })(cssNodeObj.nodes[i], i);
            }
            Promise.all(promises).then(function (result2) {
                result2.forEach(function (ele) {
                    cssHelper.mergeobjCss(objCss, ele);
                });
                if (cssNodeObj.media && cssNodeObj.media.length > 0) {
                    objCss.normRule.splice(1, 0, `@media ${cssNodeObj.media.mediaText}{`);
                    objCss.normRule.push("}");
                }
                resolve2(objCss);
            }).catch(function (err) {
                reject(err);
            });
        });
    }
    function generateRulesAll(doc, externalCssCache2) {
        var x2;
        var objCss = {
            normRule: [],
            fontFace: [],
            keyFram: []
        };
        var promises = [];
        return new Promise(function (resolve2, reject) {
            for (x2 = 0; x2 < doc.styleSheets.length; x2++) {
                const styleSheet = doc.styleSheets[x2];
                promises.push(
                    new Promise(function (res) {
                        var cssNodeArr;
                        if (styleSheet.href !== null) {
                            cssNodeArr = externalCssCache2[styleSheet.href];
                            cssNodeArr.media = doc.styleSheets[x2].media;
                            traversalCSSRuleList(doc, externalCssCache2, cssNodeArr).then(res);
                        } else if (styleSheet.ownerNode instanceof Element) {
                            let html = styleSheet.ownerNode.innerHTML;
                            if (html === "") {
                                for (let index = 0; index < doc.styleSheets[x2].cssRules.length; index++) {
                                    const rule2 = doc.styleSheets[x2].cssRules[index];
                                    html += rule2.cssText;
                                }
                            }
                            html = html.replace(
                                /url\((['"]?)(.*?)\1\)/g,
                                function (_a, p1, p2) {
                                    return "url(" + p1 + convUrlToAbs(doc.location.href, p2) + p1 + ")";
                                }
                            );
                            let _x = x2;
                            convTextToRules(html, doc.location.href).then((cssNodeObj) => {
                                cssNodeObj.media = doc.styleSheets[_x].media;
                                traversalCSSRuleList(doc, externalCssCache2, cssNodeObj).then(res);
                            });
                        } else {
                            res({});
                        }
                    })
                );
            }
            Promise.all(promises).then(function (result2) {
                result2.forEach(function (ele) {
                    cssHelper.mergeobjCss(objCss, ele);
                });
                resolve2(objCss);
            }).catch(function (err) {
                reject(err);
            });
        });
    }
    const externalCssCache = {};
    const arrTimerOfTestingIfMatched = [];
    async function getC($0) {
        if ($0 === null || typeof $0 === "undefined" || typeof $0.nodeName === "undefined") {
            return;
        }
        let isInSameOrigin = true;
        try {
            $0.ownerDocument.defaultView.parent.document;
        } catch (e) {
            isInSameOrigin = false;
        }
        if (isInSameOrigin) {
            if ($0.ownerDocument.defaultView.parent.document !== document) {
                return;
            }
        }
        let doc = $0.ownerDocument;
        const links = [];
        $0.ownerDocument.querySelectorAll('link[rel~="stylesheet"][href]').forEach((ele) => {
            const current = externalCssCache[ele.href];
            if (ele.getAttribute("href") && (current === void 0 || current.nodes.length === 0)) {
                links.push(ele.href);
            }
        });
        convLinkToText(links).then(async (result2) => {
            var promises = [];
            for (var i = 0; i < result2.length; i++) {
                let ele = result2[i], idx = i;
                const rulesObj = await convTextToRules(ele.cssraw, links[idx]);
                promises.push(rulesObj);
            }
            return promises;
        }).catch(function (err) {
            console.error("CSS-Used: ", err);
            chrome.runtime.sendMessage({
                action: "inform",
                info: "convLinkToText error, see detail in console"
            });
        }).then(function (result2) {
            if (Array.isArray(result2)) {
                result2.forEach(function (rulesObj) {
                    externalCssCache[rulesObj.href] = rulesObj;
                });
            }
        }).then(function () {
            return generateRulesAll(doc, externalCssCache);
        }).then(function (objCss) {
            return filterRules($0, objCss, arrTimerOfTestingIfMatched);
        }).then(function (data) {
            console.log("data", data);
        });
    }
    return getC;
});
