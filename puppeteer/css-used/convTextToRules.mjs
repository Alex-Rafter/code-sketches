import postcss from 'postcss';
import safe from 'postcss-safe-parser';

async function convTextToRules(styleContent, href) {
    const processor = postcss();
    // console.log('processor',processor);
    const result = await processor.process(styleContent, {
        from: href || 'cssFromUnknown',
        parser: safe,
    });

    const returnObj = {
        nodes: result.root.nodes,
        href,
    };

    return returnObj;
}

export default convTextToRules;
