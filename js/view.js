const chatFlow = document.querySelector('.chat-flow')
const nicknameList = document.querySelector('.nickname-list')

function renderOnlineNicknames(nicknames) {
  nicknameList.innerHTML = ''
  nicknames.forEach(nickname => {
    const elNickname = generateOnlineNickname(nickname)
    nicknameList.appendChild(elNickname)
  })
}

function renderMessages(messages) {
  chatFlow.innerHTML = ''
  messages.forEach(message => {
    const elMessage = generateMessageElement(message)
    chatFlow.appendChild(elMessage)
  })
  scrollToBottom()
}
function generateOnlineNickname(nickname) {
  const elDiv = document.createElement('div')
  const elSpan = document.createElement('span')

  elDiv.classList.add('wrap-span')
  elSpan.textContent = nickname
  elDiv.appendChild(elSpan)

  return elDiv
}

function generateMessageElement(message) {
  const elMessage = document.createElement('div')
  if (message.type === 'system') {
    elMessage.innerHTML = `<i>{system} <u>${message.text}</u></i>`
  } else {
    elMessage.innerHTML = `<span class="msg-line"><b>[${message.nickname}]</b>: ${message.text}</span>`
  }
  elMessage.classList.add('message')
  return elMessage
}

function scrollToBottom() {
  chatFlow.scrollTop = chatFlow.scrollHeight
}
