async function loadItems(filepath) {
    const response = await fetch(filepath);
    return await response.json();
}
