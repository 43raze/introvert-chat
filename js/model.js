let lastTimestamp = Date.now()
function isTimeValid() {
  const timestamp = Date.now()
  const deltaTimestamp = timestamp - lastTimestamp
  lastTimestamp = timestamp
  if (deltaTimestamp > 1500) return true
  return false
}

const chatModel = {
  currentNickname: '',
  onlineNicknames: [],
  messages: [],

  isNicknameOnline(nickname) {
    return this.onlineNicknames.includes(nickname)
  },

  signIn(nickname) {
    if (nickname) {
      this.currentNickname = nickname
      this.addOnlineNickname(nickname)
    }
  },

  addOnlineNickname(nickname) {
    if (!this.isNicknameOnline(nickname)) {
      this.onlineNicknames.push(nickname)
      this.addSystemMessage(`вошел(ла) в чат`)
    }
  },

  addUserMessage(messageText) {
    const message = {
      type: 'user',
      text: messageText,
      nickname: this.currentNickname,
    }
    if (isTimeValid()) {
      this.messages.push(message)
    } else {
      this.addSystemMessage('Не флуди.')
    }
  },

  addSystemMessage(messageText) {
    const systemMessage = {
      type: 'system',
      text: messageText,
      nickname: this.currentNickname,
    }
    this.messages.push(systemMessage)
  },
}
