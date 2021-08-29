/** table of content 
 * 1. DOM variable declaration
 * 2. DOM events defined
 * 3. Initialize default values for view
 * 4. customized functions 
*/

// DOM variable
const planForm = document.querySelector('.container-plan');
const title = document.querySelector('.title');
const private = document.querySelector('.setting-private');
const password = document.querySelector('.setting-password');
const place = document.querySelector('.setting-place');
const people = document.querySelector('.setting-people');
const peopleOptions = document.querySelector('.options');
const date = document.querySelector('.setting-date');
const alarmBefore = document.querySelector('.setting-alarm-before');
const alarmAfter = document.querySelector('.setting-alarm-after');
const alarmTimeFrom = document.querySelector('.time-before-detail-container');
const alarmTimeTo = document.querySelector('.time-after-detail-container');
// const submitButton = document.querySelector('.button-container-submit');
//const editButton = document.querySelector('.button-container-edit');
const joinButton = document.querySelector('.button-container-join');
const overlay = document.querySelector('.overlay');

// flag
let isToggleOn = false;

// events
// private.addEventListener('click', (event) => {
//     const element = event.target;

//     if (element.classList.contains('toggle-fill')) {
//         const isPrivate = private.querySelector('#isPrivate');
//         const label = private.querySelector('span');

//         if (!isToggleOn) {
//             isPrivate.value = 'on';
//             label.textContent = '비밀 약속 On';
//             isToggleOn = !isToggleOn;
//         } else {
//             isPrivate.value = 'off';
//             label.textContent = '비밀 약속 Off';
//             isToggleOn = !isToggleOn;
//         }

//         // toggle password input
//         password.classList.toggle('display-none');
        
//     } else {
//         return;
//     }
// });

people.addEventListener('click', (event) => {
    const element = event.target;
    const selectBox = people.querySelector('#select-check');

    if (element.classList.contains('select-box')) {
        peopleOptions.classList.toggle('display-none');
    } else if(element.classList.contains('arrow-mark')){
        peopleOptions.classList.toggle('display-none');
    } else if (element.classList.contains('input-text')) {
        peopleOptions.classList.toggle('display-none');
        selectBox.checked = selectBox.checked ? false : true;
    } else {
        return;
    }
});

peopleOptions.addEventListener('click', (event) => {
    const element = event.target;
    const selectBox = people.querySelector('#select-check');

    if (element.classList.contains('option-item')) {
        const peopleNumber = people.querySelector('#people');
        const selectedValue = element.textContent;
        peopleNumber.value = selectedValue;

        selectBox.checked = selectBox.checked ? false : true;
        peopleOptions.classList.toggle('display-none');
    } else {
        return;
    }
});

date.addEventListener('change', (event) => {
    const element = event.target;
    if (element.classList.contains('input-text')) {
        const inputDate = new Date(element.value);
        const inputLocalDate = inputDate.toLocaleString();
        let inputTime = inputLocalDate.slice(12, 21);
        
        if (!inputTime) {
            document.querySelectorAll('.selected-time')[0].textContent = '';
            document.querySelectorAll('.selected-time')[1].textContent = '';
            return;
        }

        let inputTimeArray = inputTime.split(':');
        let inputHour = inputTimeArray[0];
        let inputMinute = inputTimeArray[1];
        
        document.querySelectorAll('.selected-time').forEach((span, idx) => {
            let result = '';
            if (idx == 0) {
                result = getBeforeTime(inputHour, inputMinute, 15);
            } else {
                result = getAfterTime(inputHour, inputMinute, 15);
            }
            console.log('changed time==>'+ result);
            span.textContent = result;
            //span.textContent = inputTime.join(':');
        });

    } else {
        return;
    }
});

const calendarValue = document.querySelector('#calendar').value;

alarmBefore.addEventListener('click', (event) => {
    const element = event.target;

    if (element.tagName == 'INPUT') {
        const value = element.value;
        const calendarValue = document.querySelector('#calendar').value;        
        let timeInput = new Date(calendarValue).toLocaleString().slice(12, 21);

        if (!timeInput) return;

        console.log(`timeInput==>${timeInput}`);
        let inputTime = timeInput.split(':');
        let inputHour = inputTime[0];
        let inputMinute = inputTime[1];

        
        let alarmTime = getBeforeTime(inputHour, inputMinute, value);
        
        let selectedTime = alarmBefore.nextElementSibling.querySelector('.selected-time');
        selectedTime.textContent = alarmTime;
    } else {
        return;
    }
});

alarmAfter.addEventListener('click', (event) => {
    const element = event.target;

    if (element.tagName == 'INPUT') {
        const value = element.value;
        const calendarValue = document.querySelector('#calendar').value;        
        let timeInput = new Date(calendarValue).toLocaleString().slice(12, 21);

        if (!timeInput) return;

        console.log(`timeInput==>${timeInput}`);
        let inputTime = timeInput.split(':');
        let inputHour = inputTime[0];
        let inputMinute = inputTime[1];

        
        let alarmTime = getAfterTime(inputHour, inputMinute, value);
        
        let selectedTime = alarmAfter.nextElementSibling.querySelector('.selected-time');
        selectedTime.textContent = alarmTime;
    } else {
        return;
    }
});

// submitButton.addEventListener('click', (event) => {
//     const isPrivate = private.querySelector('#isPrivate').value;
//     const passwordValue = password.querySelector('#password').value;
//     if (isPrivate === 'on') {
//         if (!passwordValue) {
//             alert('패스워드를 입력해주세요.');
//             return;
//         }
//     }
//     overlay.classList.toggle('display-none');
// });

// editButton.addEventListener('click', (event) => {
//     overlay.classList.toggle('display-none');
//     overlay.querySelector('.confirm').classList.remove('display-none');
// });

joinButton.addEventListener('click', (event) => {
    const isPrivate = private.querySelector('#isPrivate').value;

    if (isPrivate === 'on') {
        overlay.querySelector('.password').classList.remove('display-none');
    }
    overlay.classList.toggle('display-none');
    
});

overlay.addEventListener('click', (event) => {
    const element = event.target;
    
    if (!element.classList.contains('overlay') && !element.classList.contains('cancel') && !element.classList.contains('enter')) {
        return;
    }
    // on enter
    if (element.classList.contains('enter')) {

    }
    
    overlay.classList.toggle('display-none');
    
    overlay.querySelectorAll('.popup').forEach((popup) => {
        if (!popup.classList.contains('display-none')) {
            popup.classList.add('display-none');
        }
    })
})

// 초기 시간 설정
// current data and time
const dateObject = new Date();
const currentDateTime = new Date(
    dateObject.getTime() - dateObject.getTimezoneOffset() * 60000
)
    .toISOString()
    .slice(0, 16);
document.querySelector('#calendar').value = currentDateTime;

document.querySelectorAll('.selected-time').forEach((span, idx) => {
    let timeInput = dateObject.toLocaleTimeString().slice(0, 8);
    
    let inputTime = timeInput.split(':');
    let inputHour = inputTime[0];
    let inputMinute = inputTime[1];
    
    let result = inputTime.join(':');
    if (idx == 0) {
        result = getBeforeTime(inputHour, inputMinute, 15);
    } else {
        result = getAfterTime(inputHour, inputMinute, 15);
    }
    span.textContent = result
});


// functions

function getBeforeTime(inputHour, inputMinute, setMinute) {
    let hourOfTime = inputHour;
    let minuteOfTime = parseInt(inputMinute) - parseInt(setMinute);
    if (minuteOfTime < 0) {
        minuteOfTime += 60;
        hourOfTime = getHour(inputHour, -1);
    }
    if (minuteOfTime.toString().length < 2) minuteOfTime = '0'+minuteOfTime;
    let result = `${hourOfTime}:${minuteOfTime}`;
    return result;
}

function getAfterTime(inputHour, inputMinute, setMinute) {
    let hourOfTime = inputHour;
    let minuteOfTime = parseInt(inputMinute) + parseInt(setMinute);
    if (minuteOfTime > 59) {
        minuteOfTime -= 60;
        hourOfTime = getHour(inputHour, 1);
    }
    if (minuteOfTime.toString().length < 2) minuteOfTime = '0'+minuteOfTime;
    let result = `${hourOfTime}:${minuteOfTime}`;
    return result;
}

function getHour(inputHourStr, setHour) {
    let inputHour = inputHourStr.trim().split(' ');
    
    inputHour[1] = parseInt(inputHour[1]) + parseInt(setHour);
    
    if (11 <= parseInt(inputHour[1]) && parseInt(inputHour[1]) <= 13) {
        inputHour[0] = inputHour[0] === '오전' ? '오후' : '오전';
    }

    if (parseInt(inputHour[1]) == 0) {
        inputHour[1] = 12;
    }
    return inputHour.join(' ');
}
