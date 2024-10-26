const chatModel = {
  currentNickname: '',
  onlineNicknames: [],
  messages: [],

  isLogin(nickname) {
    if (nickname === '') return
    this.currentNickname = nickname
    if (!this.isNicknameOnline(nickname)) {
      this.onlineNicknames.push(nickname)
      this.addWelcomeMessage()
    }
  },

  isNicknameOnline(nickname) {
    return this.onlineNicknames.includes(nickname)
  },

  addWelcomeMessage() {
    this.messages.push(`{system} ${this.currentNickname} вошел(ла) в чат`)
  },

  addUserMessage(message) {
    this.messages.push(`[${this.currentNickname}]: ${message}`)
  },
}
