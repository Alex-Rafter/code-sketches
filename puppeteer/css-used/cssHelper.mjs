import convTextToRules from './convTextToRules.mjs';

const cssHelper = {
    mergeobjCss: function (a, b) {
        ['normRule', 'fontFace', 'keyFram'].forEach(function (ele) {
            if (!a[ele] || !b[ele]) {
                // console.log('NO '+ele);
            }
            a[ele] = a[ele].concat(b[ele]).filter(e => e);
        });
    },
    normRuleNodeToText: function (node) {
        var s = '';
        node.nodes.forEach(function (ele) {
            if (ele.prop && ele.value) {
                var before = ele.raws.before.replace(/[\s]*/, '');
                s +=
                    before +
                    ele.prop +
                    ':' +
                    ele.value +
                    (ele.important ? '!important;' : ';');
            }
        });
        return s;
    },
    keyFramNodeToText: function (node) {
        var s = '@' + node.name + ' ' + node.params + '{';
        node.nodes.forEach(function (_node) {
            s += _node.selector + '{' + cssHelper.normRuleNodeToText(_node) + '}';
        });
        s += '}';
        return s;
    },
    fontFaceNodeToText: function (node) {
        var s = '@' + node.name + '{';
        s += cssHelper.normRuleNodeToText(node);
        s += '}';
        return s;
    },
    textToCss: async function (styleContent) {
        const parsedCss = await convTextToRules(styleContent);
        return parsedCss;
    },
};

export { cssHelper };
