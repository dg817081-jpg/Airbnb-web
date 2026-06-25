document.addEventListener("DOMContentLoaded", () => {
    const lat = Number(window.mapToken1);
    const lng = Number(window.mapToken2);

    const mapDiv = document.getElementById("map");
    if (!mapDiv) return;

    if (!isNaN(lat) && !isNaN(lng)) {
        const map = L.map("map").setView([lat, lng], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        L.marker([lat, lng])
            .addTo(map)
            .bindPopup("Location")
            .openPopup();
    } else {
        mapDiv.innerHTML = "<p>Location not available</p>";
    }
});