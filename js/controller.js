function handleLogin(nickname) {
  nickname = nickname.trim()
  if (!nickname) return
  chatModel.signIn(nickname)
  renderMessages(chatModel.messages)
  renderBannedNicknames(chatModel.bannedUsers)
  renderOnlineNicknames(chatModel.onlineNicknames)
  renderCurrentMessage(chatModel.currentMessage)
}

function handleSendMessage(message) {
  message = message.trim()
  if (!message) return
  chatModel.addUserMessage(message)
  renderMessages(chatModel.messages)
  renderBannedNicknames(chatModel.bannedUsers)
  renderOnlineNicknames(chatModel.onlineNicknames)
  renderCurrentMessage(chatModel.currentMessage)
}

function handleInputCurrentMessage(currentMessage) {
  chatModel.updateCurrentMessage(currentMessage)
  renderCurrentMessage(chatModel.currentMessage)
}

function handlePingUser(nickname) {
  chatModel.pingNickname(nickname)
  renderCurrentMessage(chatModel.currentMessage)
}

renderMessages(chatModel.messages)
renderBannedNicknames(chatModel.bannedUsers)
renderOnlineNicknames(chatModel.onlineNicknames)
renderCurrentMessage(chatModel.currentMessage)
