const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const alertBox = document.getElementById("alert");
const loader = document.getElementById("loader");
const favoritesBox = document.getElementById("favorites");

function showLoader(on = true) {
    loader.classList.toggle("d-none", !on);
}
function showAlert(message, type = "danger") {
    alertBox.innerHTML = `
    <div class="alert alert-${type} my-3" role="alert">
    ${message}
</div>
    `;
}
function clearAlert() {
    alertBox.innerHTML = '';
}

async function geocode(city) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=uk`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Geocode error!');
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
        throw new Error("City not found!");
    }
    const r = data.results[0];
    return {
        name: r.name,
        country: r.country,
        latitude: r.latitude,
        longitude: r.longitude,
    };
}
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearAlert();
    const city = cityInput.value.trim();
    if (!city) return;
    try {
        showLoader(true);
        const place = await geocode(city);
        const weather = await getWeather(place);
        console.log('WEATHER RESULT:', weather);
        console.log('GEOCODE RESULT:', place);
        showAlert(`Weather for ${place.name}, ${place.country}`, 'success');
        renderWeather(place, weather);
    } catch (err) {
        showAlert(err.message || 'Something went wrong!', 'danger');
    } finally {
        showLoader(false);
    }
});

async function getWeather({latitude, longitude}) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
    console.log('Fetch url:', url);
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather error!');
    const data = await response.json();
    const current = {
        temperature: data.current_weather?.temperature ?? null,
        windspeed: data.current_weather?.windspeed ?? null,
    };
    const days = (data.daily?.time || []).map((date, i) => ({
        date,
        tmin: data.daily.temperature_2m_min?.[i] ?? null,
        tmax: data.daily.temperature_2m_max?.[i] ?? null,
    }));
    return {current, days: days.slice(0, 5) };
}
function renderWeather(place, weather){
    const currentBox = document.getElementById('current');
    const dailyBox = document.getElementById('daily');

    currentBox.innerHTML = `
    <div class="card my-3">
    <div class="card-body">
    <div class="d-flex justify-content-between align-items-start">
    <div>
    <h4 class="mb-2">${place.name}, ${place.country}</h4>
    <p>🌡Temperature: ${weather.current.temperature ?? '—'} °C</p>
    <p>💨Wind: ${weather.current.windspeed ?? '—'} km/h</p>
    </div>
    <button id="fav-add" class="btn btn-outline-secondary"
    data-name="${place.name}" data-country="${place.country}" 
    data-latitude="${place.latitude}" data-longitude="${place.longitude}">
    ★ Add to Favorites
    </button>
    </div>
    </div>
    </div>
    `;

    document.getElementById('fav-add').onclick = () => addFavorite(place);

    dailyBox.innerHTML = `
    <h5 class="mt-3">Weather forecast for few days</h5>
    <ul class="list-group">
    ${weather.days.map((d) => `
    <li class="list-group-item d-flex justify-content-between">
    <span>${d.date}</span>
    <span>min: ${d.tmin}° / max: ${d.tmax}°</span>
</li>`
    ).join('')}
</ul>
    `;
}

function loadFavorites() {
    try {
        return JSON.parse(localStorage.getItem('favorite-cities') || '[]');
    } catch { return [];}
}
function saveFavorites(items) {
    try { localStorage.setItem('favorite-cities', JSON.stringify(items)); } catch {}
}
let favorites = loadFavorites();
renderFavorites();

function makeFavKey(p) {
    return `${p.name} | ${p.country} | ${p.latitude} | ${p.longitude}`;
}
function addFavorite(place){
    const key = makeFavKey(place);
    if (!favorites.some(f => makeFavKey(f) === key)){
        favorites.push(place);
        saveFavorites(favorites);
        renderFavorites();
        showAlert(`Added to favorites: ${place.name}`, `success`);
    } else {
        showAlert(`Already in favorites: ${place.name}`, `warning`);
    }
}

function renderFavorites(){
    if (!favorites.length) {
        favoritesBox.innerHTML = `<span class="text-muted">Empty</span>`;
        return;
    }
    favoritesBox.innerHTML = favorites.map(f => `
    <button class="btn btn-outline-secondary btn-sm" 
    data-latitude="${f.latitude}" data-longitude="${f.longitude}"
    data-name="${f.name}" data-country="${f.country}">${f.name}</button>
    `).join('');
}

favoritesBox.addEventListener('click', async (e) => {
    const btn = e.target.closest('button[data-lat]');
    if (!btn) return;
    clearAlert();
    const place = {
        name: btn.dataset.name,
        country: btn.dataset.country,
        latitude: Number(btn.dataset.lat),
        longitude: Number(btn.dataset.lon),
    };
    try{
        showLoader(true);
        const weather = await getWeather(place);
        showAlert(`Weather for ${place.name}, ${place.country}`, 'success');
        renderWeather(place, weather);
    } catch(err){
        showAlert(err.message || 'Error', 'danger');
    } finally{
        showLoader(false);
    }
});