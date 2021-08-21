// declaration to dom element

const navigation = document.querySelector('.navigation');
const searchContainer = document.querySelector('search-container');
const map = document.querySelector('.map');
const currentLocation = document.querySelector('.current-location');









function initMap() {
    map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 15,
    });
};

initMap();

