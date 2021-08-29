// naver map api
function initMap() {
    map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.3595704, 127.105399),
        zoom: 15,
    });
}

initMap();

// DOM
const roomNavigation = document.querySelector('.room-navigation');
const memberContainer = document.querySelector('.member-container');
const overlay = document.querySelector('.overlay');
const exitOverlay = overlay.querySelector('.exit');

// DOM Event
roomNavigation.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target.classList.contains('btn-back')) {
        overlay.classList.remove('display-none');
        exitOverlay.classList.remove('display-none');
    } else {
        return;
    }

});

overlay.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target.classList.contains('overlay') || target.classList.contains('cancel')) {
        overlay.classList.add('display-none');
        overlay.querySelectorAll('.popup').forEach((popup) => {
            if (!popup.classList.contains('display-none')) {
                popup.classList.add('display-none');
            }
        })
    } else {
        return;
    }

});


memberContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('arrow-up') || target.classList.contains('arrow-mark')) {
        memberContainer.querySelector('.member-list-container').classList.toggle('display-none');
    } else {
        return;
    };
});