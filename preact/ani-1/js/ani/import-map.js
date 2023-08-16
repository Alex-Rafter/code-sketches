function createImportMap(imports) {
    console.log("createImportMap")
    const importMap = { imports };
    const im = document.createElement('script');
    im.type = 'importmap';
    im.textContent = JSON.stringify(importMap);
    document.currentScript.after(im);
}

const imports = {
    "anime": "https://esm.sh/animejs/lib/anime.es.js",
    "preact": "https://esm.sh/preact",
    "hooks": "https://esm.sh/preact/hooks",
    "htm": "https://esm.sh/htm",
    "preact-custom-element": "https://esm.sh/preact-custom-element"
}


createImportMap(imports);