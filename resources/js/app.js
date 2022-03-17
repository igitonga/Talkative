const { default: axios } = require('axios');

require('./bootstrap');

const messages_el = document.getElementById("message-box")
const username = document.getElementById("username")
const message_input = document.getElementById("message-input")
const message_form = document.getElementById("message-form")

message_form.addEventListener('submit', function(e){

    e.preventDefault()

    let has_error = false;

    if(username == ''){
        alert('Username is empty')
        has_error = true
    }

    if(message_input == ''){
        alert('Message is empty')
        has_error = true
    }

    if(has_error){
        return
    }

    const option = {
        method: 'post',
        url: '/send_message',
        data: {
            username: username.value,
             message: message_input.value,
        }
    }

    axios(option)
})

window.Echo.channel('chat')
        .listen('.message', (e) => {
            messages_el.innerHTML += '<div><strong>' + e.username + ':</strong>' + e.message +
                '</div>'
        })