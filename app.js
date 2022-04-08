let lng;
let lat;
let data;
const apiKey = "at_btHIX6OfI49h7StFhthNkCrSTaNA6";

async function getData() {
  data = await fetch(
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_btHIX6OfI49h7StFhthNkCrSTaNA6"
  );
  data = await data.json();
  lng = data.location.lng;
  lat = data.location.lat;
  renderMap();
}

function renderMap() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoidWJpMTIzIiwiYSI6ImNrbjAzcW1yMDBqeW0ydnBrY3g1bmF4dGQifQ.RzVYxko64eFrxMDequGUlA";
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

getData();
