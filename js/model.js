let lastTimestamp = Date.now()
function isTimeValid() {
  const timestamp = Date.now()
  const deltaTimestamp = timestamp - lastTimestamp
  lastTimestamp = timestamp
  if (deltaTimestamp > 1500) return true
  return false
}

const chatModel = {
  currentMessage: '',
  currentNickname: '',
  onlineNicknames: [],
  messages: [],
  bannedUsers: [],
  censoredWords: ['банан', 'огурец', 'баклажан'],
  spamWords: ['https://', 'http://'],

  pingNickname(nickname) {
    this.currentMessage = `@${nickname} ${this.currentMessage}`
  },

  isNicknameOnline(nickname) {
    return this.onlineNicknames.includes(nickname)
  },

  isUserBanned(nickname) {
    return this.bannedUsers.includes(nickname)
  },

  signIn(nickname) {
    if (nickname === '') return
    if (this.isUserBanned(nickname)) {
      this.addSystemMessage(`Пользователь ${nickname} забанен.`)
      return
    }
    this.currentNickname = nickname
    this.addOnlineNickname(nickname)
  },

  addOnlineNickname(nickname) {
    if (!this.isNicknameOnline(nickname)) {
      this.onlineNicknames.push(nickname)
      this.addSystemMessage(`${nickname} вошел(ла) в чат`)
    }
  },

  addUserMessage() {
    if (this.currentNickname === '') return

    if (!isTimeValid()) {
      this.addSystemMessage('Не флуди.')
      return
    }

    if (this.checkMessageTextByCensoredWords(this.currentMessage)) {
      this.banUser(this.currentNickname)
      return
    }

    if (this.checkMessageTextBySpamWords(this.currentMessage)) {
      this.addSystemMessage('Запрещено использовать ссылки.')
      this.banUser(this.currentNickname)
      return
    }

    const message = {
      type: 'user',
      text: this.currentMessage,
      nickname: this.currentNickname,
    }

    this.updateCurrentMessage('')

    this.messages.push(message)
  },

  updateCurrentMessage(currentMessage) {
    this.currentMessage = currentMessage
  },

  addSystemMessage(messageText, nickname) {
    const systemMessage = {
      type: 'system',
      text: messageText,
      nickname: nickname || this.currentNickname,
    }
    this.messages.push(systemMessage)
  },

  checkMessageTextByCensoredWords(messageText) {
    return this.censoredWords.some(word =>
      messageText.toLowerCase().includes(word)
    )
  },

  checkMessageTextBySpamWords(messageText) {
    return this.spamWords.some(url => messageText.toLowerCase().includes(url))
  },

  banUser(nickname) {
    if (!this.isUserBanned(nickname)) this.bannedUsers.push(nickname)
    this.currentNickname = ''
    this.onlineNicknames = this.onlineNicknames.filter(n => n !== nickname)
    this.addSystemMessage(
      `Пользователь ${nickname} забанен за использование запрещённых слов.`
    )
  },
}

chatModel.signIn('Bond')
chatModel.updateCurrentMessage('')
console.log(chatModel.currentMessage)
chatModel.updateCurrentMessage('п')
console.log(chatModel.currentMessage)
chatModel.updateCurrentMessage('пр')
console.log(chatModel.currentMessage)
chatModel.updateCurrentMessage('при')
console.log(chatModel.currentMessage)
chatModel.updateCurrentMessage('прив')
console.log(chatModel.currentMessage)
chatModel.updateCurrentMessage('приве')
console.log(chatModel.currentMessage)
chatModel.updateCurrentMessage('привет')
console.log(chatModel.currentMessage)
chatModel.updateCurrentMessage('привет!')
console.log(chatModel.currentMessage)
chatModel.updateCurrentMessage('привет!!')
console.log(chatModel.currentMessage)
chatModel.pingNickname('James')
console.log(chatModel.currentMessage)

chatModel.addUserMessage()
console.log(chatModel.currentMessage)
console.log(chatModel.messages)
