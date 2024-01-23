export async function fetchRepeaterJson(url) {
    // For use with repeater items that render json inside script tags with the type application/json.
    // Not needed for details pages as these can be sent without any wrapping html.
    const req = await fetch(url);
    const data = await req.text();
    // Parse repeater DOM, grab the json from within the script tag of each repeater item and return as array.
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");
    const repeaterJsonScriptTags = Array.from(
        doc.querySelectorAll(
            `div[id*="RepeaterUpdatePanel"] script[type="application/json"]`
        )
    );
    let arrayFromJson = repeaterJsonScriptTags.map((item) =>
        JSON.parse(item.textContent)
    );
    return arrayFromJson;
}
