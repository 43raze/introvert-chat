buttonEnter.addEventListener('click', onClickButtonLogin)
elInputTextNickname.addEventListener('keydown', onKeyDownInputNickname)
buttonSendMessage.addEventListener('click', onClickButtonSendMessage)
elInputMessage.addEventListener('keydown', onKeyDownInput)

function onClickButtonLogin() {
  const nickname = elInputTextNickname.value.trim()
  if (!nickname) return
  handleLogin(nickname)
  elInputTextNickname.value = ''
}

function onClickButtonSendMessage() {
  const message = elInputMessage.value
  handleSendMessage(message)
}

function onKeyDownInputNickname(e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    onClickButtonLogin()
  }
}

function onKeyDownInput(e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    const message = elInputMessage.value
    handleSendMessage(message)
  }
}

function renderOnlineNicknames(nicknames) {
  nicknameList.innerHTML = ''
  nicknames.forEach(nickname => {
    const elNickname = generateOnlineNickname(nickname)
    nicknameList.appendChild(elNickname)
  })
}

function renderMessages() {
  chatFlow.innerHTML = ''
  chatModel.messages.forEach(message => {
    const elMessage = document.createElement('div')
    elMessage.textContent = message
    chatFlow.appendChild(elMessage)
  })
}

function generateOnlineNickname(nickname) {
  const elDiv = document.createElement('div')
  const elSpan = document.createElement('span')

  elDiv.classList.add('wrap-span')
  elSpan.textContent = nickname
  elDiv.appendChild(elSpan)

  return elDiv
}
