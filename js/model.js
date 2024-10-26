const chatModel = {
  currentNickname: '',
  onlineNicknames: [],
  messages: [],

  isLogin(nickname) {
    if (nickname === '' || this.isNicknameOnline(nickname)) return false
    this.currentNickname = nickname
    this.onlineNicknames.push(nickname)
    this.addWelcomeMessage()
    return true
  },

  isNicknameOnline(nickname) {
    return this.onlineNicknames.includes(nickname)
  },

  addWelcomeMessage() {
    const message = {
      type: 'system',
      text: `${this.currentNickname} вошел(ла) в чат`,
    }

    this.messages.push(message)
  },

  addUserMessage(message) {
    const userMessage = {
      type: 'user',
      text: message,
      nickname: this.currentNickname,
    }

    this.messages.push(userMessage)
  },

  addSystemMessage(text) {
    const systemMessage = {
      type: 'system',
      text: text,
    }

    this.messages.push(systemMessage)
  },
}
