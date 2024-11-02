const elButtonEnter = document.querySelector('#btn_enter')
const elInputTextNickname = document.querySelector('#input_nickname')
const elInputMessage = document.querySelector('#input_msg')
const elButtonSendMessage = document.querySelector('#btn_send_msg')

elButtonEnter.addEventListener('click', onClickButtonLogin)
elButtonSendMessage.addEventListener('click', onSendMessage)
elInputMessage.addEventListener('keydown', onSendMessage)

function onClickButtonLogin() {
  if (!elInputTextNickname.value) return
  handleLogin(elInputTextNickname.value)
  elInputTextNickname.value = ''
}

function onSendMessage(e) {
  if (e.key === 'Enter' || e.type === 'click') {
    handleSendMessage(elInputMessage.value)
    elInputMessage.value = ''
  }
}

function renderOnlineNicknames(nicknames) {
  const elNicknameList = document.querySelector('.nickname-list')
  elNicknameList.innerHTML = ''
  nicknames.forEach(nickname => {
    const elNickname = generateOnlineNickname(nickname)
    elNicknameList.appendChild(elNickname)
  })
}

function renderBannedNicknames(nicknames) {
  const elBannedUsersList = document.querySelector('.banned-users-list')
  elBannedUsersList.innerHTML = ''
  nicknames.forEach(nickname => {
    const elBannedUser = generateBannedNickname(nickname)
    elBannedUsersList.appendChild(elBannedUser)
  })
}

function renderMessages(messages) {
  const elChatFlow = document.querySelector('.chat-flow')
  elChatFlow.innerHTML = ''
  messages.forEach(message => {
    const elMessage = generateMessageElement(message)
    elChatFlow.appendChild(elMessage)
  })
  scrollToBottom(elChatFlow)
}

function generateOnlineNickname(nickname) {
  const elDiv = document.createElement('div')
  const elSpan = document.createElement('span')
  elDiv.classList.add('wrap-span')
  elSpan.textContent = nickname
  elDiv.appendChild(elSpan)
  return elDiv
}

function generateBannedNickname(nickname) {
  const elP = document.createElement('p')
  elP.textContent = nickname
  return elP
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

function scrollToBottom(elem) {
  elem.scrollTop = elem.scrollHeight
}
