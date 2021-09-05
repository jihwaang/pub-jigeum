const header = document.querySelector('header');
const messageList = document.querySelector('.message-list-container');
const inputMessage = document.querySelector('.input-chat-text');
const chatContainer = document.querySelector('.chat-input-container');
const userInfo = document.querySelector('.chat-other-user-info');

// event for showing member list 
header.addEventListener('click', (event) => {
    const element = event.target;
    if (element.classList.contains('chat-member-list')) {
        const currentMembers = document.querySelector('.chat-current-member-list ')
        currentMembers.style.left = currentMembers.style.left == '0px' ? '100%' : 0;
    } else {
        return;
    }
});

// on click to profile image event function
messageList.addEventListener('click', (event) => {
   const element = event.target;
   const classNames = Array.from(element.classList);

   if (classNames.some(className => /profile-image.*/.test(className))) {
        const parentElement = element.closest('.message-wrapper');
        // get user id to query user information here
        //const userName = parentElement.querySelector('.user-name').textContent;
        userInfo.classList.remove('display-none');
   } else {
       return;
   }
});

// event for hididing user info 
userInfo.addEventListener('click', (event) => {
    const element = event.target;
    console.log(element);
    if (!element.classList.contains('other-user') && !element.closest('.other-user')) {
        userInfo.classList.add('display-none');
    }else {
        return;
    }
})

// on input event function
inputMessage.addEventListener('input', (event) => {
    const chatButton = chatContainer.querySelector('.button-chat');
    if (event.target.value.length < 1) {
        if (!chatButton.classList.contains('display-none')) {
            chatButton.classList.add('display-none');
        }
    } else {
        if (chatButton.classList.contains('display-none')) {
            chatButton.classList.remove('display-none');
        }
    }
    
})
// chatContainer.addEventListener('click', (event) => {
//     const element = event.target;
//     const chatButton = chatContainer.querySelector('.button-chat');
//     console.log(element);
//     if (element.classList.contains('input-chat-text')) {
//         chatButton.classList.remove('display-none');
//     } else {
//         return;
//     }
// });