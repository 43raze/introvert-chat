const buttonEnter = document.querySelector('#btn_enter')
const chatFlow = document.querySelector('.chat-flow')
const nicknameList = document.querySelector('.nickname-list')
const elInputTextNickname = document.querySelector('#input_nickname')
const elInputMessage = document.querySelector('#input_msg')
const buttonSendMessage = document.querySelector('#btn_send_msg')

function handleLogin(nickname) {
  chatModel.isLogin(nickname)
  renderOnlineNicknames(chatModel.onlineNicknames)
  renderMessages()
}

function handleSendMessage(message) {
  if (!message.trim()) return
  chatModel.addUserMessage(message)
  renderMessages()
  elInputMessage.value = ''
}
