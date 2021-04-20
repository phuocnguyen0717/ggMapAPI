
const pOfficeHCM = { lat: 10.779921129348793, lng: 106.69986458135881 };
const templeHN = { lat: 21.027567501782475, lng: 105.8354824121619 };
const radius = 13;
let pOfficeHCMLatLag;
let templeHNLatLng;


const cirlePOffice = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "red",
    fillOpacity: 0.3,
    map,
    center: pOfficeHCM,
    radius,
});

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: pOfficeHCM,
        zoom: 20,
    });

    const cirleTemple = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "red",
        fillOpacity: 0.3,
        map,
        center: templeHN,
        radius,
    });

    pOfficeHCMLatLag = new google.maps.LatLng(pOfficeHCM.lat, pOfficeHCM.lng);
    const radiusX2 = radius * 2;
    var p1 = google.maps.geometry.spherical.computeOffset(pOfficeHCMLatLag, radiusX2, 120);
    var p2 = google.maps.geometry.spherical.computeOffset(pOfficeHCMLatLag, radiusX2, 0);
    var p3 = google.maps.geometry.spherical.computeOffset(pOfficeHCMLatLag, radiusX2, -120);

    templeHNLatLng = new google.maps.LatLng(templeHN.lat, templeHN.lng);
    var p1 = google.maps.geometry.spherical.computeOffset(templeHNLatLng, radiusX2, 120);
    var p2 = google.maps.geometry.spherical.computeOffset(templeHNLatLng, radiusX2, 0);
    var p3 = google.maps.geometry.spherical.computeOffset(templeHNLatLng, radiusX2, -120);

    const templeO = new google.maps.Polygon({
        path: [p1, p2, p3],
        strokeColor: '#FDFDFD',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#00000',
        fillOpacity: 0.3,
        map
    });
    const pOfficeO = new google.maps.Polygon({
        path: [p1, p2, p3],
        strokeColor: '#FDFDFD',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#00000',
        fillOpacity: 0.3,
        map
    });


    var p1 = google.maps.geometry.spherical.computeOffset(pOfficeHCMLatLag, radius, 120);
    var p2 = google.maps.geometry.spherical.computeOffset(pOfficeHCMLatLag, radius, 0);
    var p3 = google.maps.geometry.spherical.computeOffset(pOfficeHCMLatLag, radius, -120);

    var p1 = google.maps.geometry.spherical.computeOffset(templeHNLatLng, radius, 120);
    var p2 = google.maps.geometry.spherical.computeOffset(templeHNLatLng, radius, 0);
    var p3 = google.maps.geometry.spherical.computeOffset(templeHNLatLng, radius, -120);



    const templeI = new google.maps.Polygon({
        path: [p1, p2, p3],
        strokeColor: 'green',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'green',
        fillOpacity: 0.35,
        map
    });
    const pOfficeI = new google.maps.Polygon({
        path: [p1, p2, p3],
        strokeColor: 'green',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'green',
        fillOpacity: 0.35,
        map
    });
    markersAndInforWindows();
    directionsService();
}

function markersAndInforWindows() {
    let postMarker = new google.maps.Marker({
        position: pOfficeHCM,
        map
    });

    let quocTuGiamMarker = new google.maps.Marker({
        position: templeHN,
        map
    });

    const postInfoWindow = new google.maps.InfoWindow({
        content: "Bưu điện trung tâm Sài Gòn là một trong những công trình kiến trúc tiêu biểu tại Thành phố Hồ Chí Minh, tọa lạc tại số 2, Công trường Công xã Paris, Quận 1.",
        position: pOfficeHCM,
    });

    const quocTuGiamInfoWindow = new google.maps.InfoWindow({
        content: "Văn Miếu Quốc Tử Giám – Di tích văn hóa lịch sử tại Hà Nội",
        position: templeHN,
    });

    postMarker.addListener('click', () => {
        postInfoWindow.open(map);
    });

    quocTuGiamMarker.addListener('click', () => {
        quocTuGiamInfoWindow.open(map);
    });
}

function directionsService() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    directionsRenderer.setMap(map);
    directionsService.route({
            origin: templeHNLatLng,
            destination: pOfficeHCMLatLag,
            travelMode: google.maps.TravelMode.WALKING
        },

        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
            } else {
                window.alert("Direction fail " + status);
            }
        }
    );
}