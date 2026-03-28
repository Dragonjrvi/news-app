const urlBase = "https://api.thenewsapi.com/v1/news";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

document.addEventListener("DOMContentLoaded", () => {
    topNews();
});

function showResults(data) {

    const results = document.getElementById("results");
    results.innerHTML = "";

    if (!data || !data.data || data.data.length === 0) {
        results.innerHTML = "<h2>No hay resultados</h2>";
        return;
    }

    data.data.forEach(noticia => {
        results.innerHTML += `
            <div class="card">
                <h3>${noticia.title}</h3>
                <img src="${noticia.image_url || 'icon.png'}">
                <p>${noticia.description || "Sin descripción"}</p>
                <a href="${noticia.url}" target="_blank">Leer más</a>
            </div>
        `;
    });
}

function showError(msg) {
    document.getElementById("results").innerHTML = `<h2>${msg}</h2>`;
}

function clearInputs() {
    document.getElementById("inputs").innerHTML = "";
}

function topNews() {
    clearInputs();
    document.getElementById("results").innerHTML = "Cargando noticias...";

    fetch(`${urlBase}/all?api_token=${API_KEY}&limit=6`)
        .then(r => r.json())
        .then(showResults)
        .catch(() => showError("Error"));
}

function politicsNews() {
    clearInputs();
    document.getElementById("results").innerHTML = "Cargando...";

    fetch(`${urlBase}/all?api_token=${API_KEY}&categories=politics&limit=6`)
        .then(r => r.json())
        .then(showResults)
        .catch(() => showError("Error"));
}

function searchNews() {
    document.getElementById("inputs").innerHTML = `
        <input id="search" placeholder="Buscar">
        <button onclick="doSearch()">OK</button>
    `;
}

function doSearch() {
    const word = document.getElementById("search").value;
    if (!word) return showError("Escribe algo");

    document.getElementById("results").innerHTML = "Buscando...";

    fetch(`${urlBase}/all?api_token=${API_KEY}&search=${word}&limit=6`)
        .then(r => r.json())
        .then(showResults)
        .catch(() => showError("Error"));
}

function newsByDate() {
    document.getElementById("inputs").innerHTML = `
        <input type="date" id="date">
        <button onclick="doDate()">OK</button>
    `;
}

function doDate() {
    const date = document.getElementById("date").value;
    if (!date) return showError("Fecha inválida");

    document.getElementById("results").innerHTML = "Cargando...";

    fetch(`${urlBase}/all?api_token=${API_KEY}&published_on=${date}&limit=6`)
        .then(r => r.json())
        .then(showResults)
        .catch(() => showError("Error"));
}

function newsByLanguage() {
    document.getElementById("inputs").innerHTML = `
        <input id="lang" placeholder="en, es">
        <button onclick="doLang()">OK</button>
    `;
}

function doLang() {
    const lang = document.getElementById("lang").value;
    if (!lang) return showError("Idioma inválido");

    document.getElementById("results").innerHTML = "Cargando...";

    fetch(`${urlBase}/all?api_token=${API_KEY}&language=${lang}&limit=6`)
        .then(r => r.json())
        .then(showResults)
        .catch(() => showError("Error"));
}

function latestNews() {
    clearInputs();
    document.getElementById("results").innerHTML = "Cargando...";

    fetch(`${urlBase}/all?api_token=${API_KEY}&sort=published_desc&limit=6`)
        .then(r => r.json())
        .then(showResults)
        .catch(() => showError("Error"));
}
