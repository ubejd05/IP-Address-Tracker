const ipAddressDisplay = document.querySelector("#ip");
const locationDisplay = document.querySelector("#location");
const regionDisplay = document.querySelector("#region");
const timezoneDisplay = document.querySelector("#timezone");
const ispDisplay = document.querySelector("#isp");
const form = document.getElementsByTagName("form")[0];


const IPapiKey = "at_btHIX6OfI49h7StFhthNkCrSTaNA6";
const mapboxApiKey = "pk.eyJ1IjoidWJpMTIzIiwiYSI6ImNrbjAzcW1yMDBqeW0ydnBrY3g1bmF4dGQifQ.RzVYxko64eFrxMDequGUlA";

let data;
let lng;
let lat;

async function getData(ip) {
  let res = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${IPapiKey}&ipAddress=${ip ? ip : ''}`
  );
  data = await res.json();
  lng = data.location.lng;
  lat = data.location.lat;
  populateData();
  renderMap();
}

function renderMap() {
  mapboxgl.accessToken = mapboxApiKey;
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v11", // style URL
    center: [lng, lat], // starting position [lng, lat]
    zoom: 15, // starting zoom
  });
  // Create a new marker.
  const marker = new mapboxgl.Marker({
    anchor: "bottom",
    scale: 2,
  })
    .setLngLat([lng, lat])
    .setPopup(new mapboxgl.Popup().setHTML(`<h3>${data.location.city}</h3>`)) // add popup
    .addTo(map);

  const nav = new mapboxgl.NavigationControl({
    showZoom: true,
    showCompass: true,
    visualizePitch: true,
  });
  map.addControl(nav, "bottom-right");
}

function populateData() {
  ipAddressDisplay.textContent = data.ip;
  locationDisplay.innerHTML = `${data.location.city},<span id="region">${data.location.region}</span>`;
  timezoneDisplay.textContent = data.location.timezone;
  ispDisplay.textContent = data.isp;
}

getData();


form.addEventListener('submit', (e) => {
  e.preventDefault();
  getData(e.target.ipAddress.value);
  e.target.ipAddress.value = "";
});