function handleLogin(nickname) {
  chatModel.signIn(nickname)
  renderOnlineNicknames(chatModel.onlineNicknames)
  renderMessages(chatModel.messages)
}

function handleSendMessage(message) {
  message = message.trim()
  if (!message) return
  chatModel.addUserMessage(message)
  renderMessages(chatModel.messages)
  elInputMessage.value = ''
}
