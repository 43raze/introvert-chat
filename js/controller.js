const buttonEnter = document.querySelector('#btn_enter')
const elInputTextNickname = document.querySelector('#input_nickname')
const elInputMessage = document.querySelector('#input_msg')
const buttonSendMessage = document.querySelector('#btn_send_msg')

let lastMessageTime = 0

buttonEnter.addEventListener('click', onClickButtonLogin)
buttonSendMessage.addEventListener('click', onClickButtonSendMessage)
elInputMessage.addEventListener('keydown', onKeyDownInput)

function onClickButtonLogin() {
  const nickname = elInputTextNickname.value.trim()
  if (!nickname) return
  handleLogin(nickname)
  elInputTextNickname.value = ''
}

function onClickButtonSendMessage() {
  const message = elInputMessage.value.trim()
  handleSendMessage(message)
}

function onKeyDownInput(e) {
  if (e.key === 'Enter') {
    e.preventDefault()
    const message = elInputMessage.value.trim()
    handleSendMessage(message)
  }
}

function handleLogin(nickname) {
  if (chatModel.isLogin(nickname)) {
    renderOnlineNicknames(chatModel.onlineNicknames)
    renderMessages(chatModel.messages)
  }
}

function handleSendMessage(message) {
  const currentTime = Date.now()
  if (currentTime - lastMessageTime < 500) {
    chatModel.addSystemMessage(
      'Сообщения можно отправлять не чаще одного раза в секунду.'
    )
    renderMessages(chatModel.messages)
    return
  }

  if (!message) return

  chatModel.addUserMessage(message)
  renderMessages(chatModel.messages)
  elInputMessage.value = ''
  lastMessageTime = currentTime
}
