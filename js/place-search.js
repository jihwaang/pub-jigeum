// declaration to dom element

const navigation = document.querySelector('.navigation');
const searchContainer = document.querySelector('.search-container');
const mapContainer = document.querySelector('.map');
const currentLocation = document.querySelector('.current-location');
const queryContainer = document.querySelector('.query-container');
const searchResultContainer = document.querySelector(
    '.search-result-container'
);

// event listeners
// 검색창 클릭시
searchContainer.addEventListener('click', (event) => {
    const element = event.target;

    if (element.classList.contains('input-search')) {
        queryContainer.classList.remove('display-none');
        mapContainer.classList.add('display-none');
        currentLocation.classList.add('display-none');    

        if (!searchResultContainer.classList.contains('display-none')) {
            searchResultContainer.classList.add('display-none');
        }

    } else if (element.classList.contains('search-cancel-icon')) {
        queryContainer.classList.add('display-none');
        mapContainer.classList.remove('display-none');
        currentLocation.classList.remove('display-none');
        
        searchContainer.querySelector('.search-cancel-icon').classList.add('display-none');
        
        if (!searchResultContainer.classList.contains('display-none')) {
            searchResultContainer.classList.add('display-none');
        }

        currentLocation.style.bottom = '10%';

        searchContainer.querySelector('.input-search').value = '';


    } else {
        return;
    }
});

searchContainer.addEventListener('keyup', (event) => {
    searchContainer.querySelector('.search-cancel-icon').classList.remove('display-none');
});

// 검색 추천 키워드 클릭시
queryContainer.addEventListener('click', (event) => {
    const element = event.target;

    if (element.classList.contains('query-item')) {
        queryContainer.classList.add('display-none');
        mapContainer.classList.remove('display-none');
        currentLocation.classList.remove('display-none');

        searchResultContainer.classList.remove('display-none');

        const arrowCheckBox =
            searchResultContainer.querySelector('#arrow-down');
        arrowCheckBox.checked = false;

        const searchResultHeight = window
            .getComputedStyle(searchResultContainer, null)
            .getPropertyValue('height');
        const currentLocationBottom = window
            .getComputedStyle(currentLocation, null)
            .getPropertyValue('bottom');

        if (parseInt(currentLocationBottom) < parseInt(searchResultHeight)) {
            currentLocation.style.bottom = `calc(${currentLocationBottom} + ${searchResultHeight})`;
        }
    } else {
        return;
    }
});

// 검색결과 클릭시
searchResultContainer.addEventListener('click', (event) => {
    const element = event.target;
    const arrowCheckBox = searchResultContainer.querySelector('#arrow-down');
    
    if (element.classList.contains('arrow-checkbox')) {
        const currentLocationBottom = window
                .getComputedStyle(currentLocation, null)
                .getPropertyValue('bottom');
        
        const searchResultHeight = window
                .getComputedStyle(searchResultContainer, null)
                .getPropertyValue('height');
        
        currentLocation.style.bottom = `calc(10% + ${searchResultHeight})`;
        
    } else {
        return;
    }
});

function initMap() {
    map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 15,
    });
}

initMap();

