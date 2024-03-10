function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${hours}:${minutes}:${seconds}`;
}

// isUser:boolean, content:string
function appendMessage(isUser, content) {
  const chatboxContainer = document.querySelector('.chat');
  const newMessage = document.createElement('div');
  newMessage.classList.add('message', 'd-flex', 'flex-column', 'mb-2', isUser ? 'align-items-end' : 'align-items-start');
  newMessage.innerHTML = `
          <div class="user">
              ${isUser ? 'You' : 'Jamie'}
          </div>
          <div class="content py-2 px-3 text-break">
              ${content}
          </div>
          <div class="time">
              ${getCurrentTime()}
          </div>
      `;
  chatboxContainer.appendChild(newMessage);
  chatboxContainer.scrollTo(0, chatboxContainer.scrollHeight);
}

function classifyReply(userInput) {
  const input = userInput;
  
  if (input === input.toUpperCase()) {
    if (input.endsWith('?')) {
      return "Please give me some time to resolve the issue.";
    } else {
      return "Please remain calm.";
    }
  }
  
  else if (input.endsWith('?')) {
    return "Yes";
  }

  else if (input.includes("jamie")) {
    return "Can I help you?";
  }

  else {
    return "Sorry, I don't understand.";
  }
}

function init() {
  appendMessage(false, 'Hello! Nice to meet you.');
}

init();

document.querySelector('.chatbox-footer form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  const messageInput = document.getElementById('message_input');
  const message = messageInput.value.trim(); // Get the message and trim whitespace

  if (message !== '') {
    appendMessage(true, message);

    // Clear the message input
    messageInput.value = '';

    appendMessage(false, classifyReply(message));
  }
});