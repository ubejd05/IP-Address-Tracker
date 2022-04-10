const ipAddressDisplay = document.querySelector("#ip");
const locationDisplay = document.querySelector("#location");
const timezoneDisplay = document.querySelector("#timezone");
const ispDisplay = document.querySelector("#isp");


const IPapiKey = "at_btHIX6OfI49h7StFhthNkCrSTaNA6";
const mapboxApiKey = "pk.eyJ1IjoidWJpMTIzIiwiYSI6ImNrbjAzcW1yMDBqeW0ydnBrY3g1bmF4dGQifQ.RzVYxko64eFrxMDequGUlA";

let data;
let lng;
let lat;

async function getData() {
  let res = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${IPapiKey}`
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
  })
    .setLngLat([lng, lat])
    .setPopup(new mapboxgl.Popup().setText("Hello World!")) // add popup
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
  locationDisplay.textContent = data.location.city;
  timezoneDisplay.textContent = data.location.timezone;
  ispDisplay.textContent = data.isp;
}

getData();
