const socket = io()

let username = "Hari";
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')

do{
    username = prompt('Please enter your name')
}while(!username)

textarea.addEventListener('keyup', (e) => {
    if(e.key === "Enter") {
        if(e.target.value.length - 1)
            sendMessage(e.target.value)
        textarea.value = ''
    }
})

function sendMessage(message) {
    let msg = {
        user: username,
        message: message.trim()
    }
    //Append
    appendMessage(msg, 'outgoing')
    scrollToBottom()
    

    //Send to Server
    socket.emit('message', {msg})
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

//Receive New messages

socket.on('message', (msg) => {
    // console.log(msg)

    appendMessage(msg.msg, 'incoming')
    scrollToBottom();
})


function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}