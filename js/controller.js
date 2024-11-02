function handleLogin(nickname) {
  nickname = nickname.trim()
  if (!nickname) return
  chatModel.signIn(nickname)
  renderOnlineNicknames(chatModel.onlineNicknames)
  renderMessages(chatModel.messages)
  elInputTextNickname.value = ''
}

function handleSendMessage(message) {
  message = message.trim()
  if (!message) return
  chatModel.addUserMessage(message)
  renderMessages(chatModel.messages)
  renderBannedNickname(chatModel.bannedUsers)
  elInputMessage.value = ''
}
