function handleLogin(nickname) {
  nickname = nickname.trim()
  if (!nickname) return
  chatModel.signIn(nickname)
  renderMessages(chatModel.messages)
  renderBannedNicknames(chatModel.bannedUsers)
  renderOnlineNicknames(chatModel.onlineNicknames)
}

function handleSendMessage(message) {
  message = message.trim()
  if (!message) return
  chatModel.addUserMessage(message)
  renderMessages(chatModel.messages)
  renderBannedNicknames(chatModel.bannedUsers)
  renderOnlineNicknames(chatModel.onlineNicknames)
}
