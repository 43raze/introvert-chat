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

  signIn(nickname) {
    if (nickname === '') return
    if (this.isUserBanned(nickname)) {
      this.addSystemMessage(`Пользователь ${nickname} забанен.`)
      return
    }
    this.currentNickname = nickname
    this.addOnlineNickname(nickname)
  },

  isNicknameOnline(nickname) {
    return this.onlineNicknames.includes(nickname)
  },

  isUserBanned(nickname) {
    return this.bannedUsers.includes(nickname)
  },

  addSystemMessage(messageText, nickname) {
    const systemMessage = {
      type: 'system',
      text: messageText,
      nickname: nickname || this.currentNickname,
    }
    this.messages.push(systemMessage)
  },

  addOnlineNickname(nickname) {
    if (!this.isNicknameOnline(nickname)) {
      this.onlineNicknames.push(nickname)
      this.addSystemMessage(`${nickname} вошел(ла) в чат`)
    }
  },

  addUserMessage() {
    if (this.currentNickname === '') return

    const validationText = this.validateMessage()

    if (!validationText.isValid) {
      this.addSystemMessage(validationText.message)
      this.updateCurrentMessage('')
      return
    }

    const message = {
      type: 'user',
      text: this.currentMessage,
      nickname: this.currentNickname,
    }

    this.messages.push(message)

    this.updateCurrentMessage('')
  },

  validateMessage() {
    if (this.checkFlood()) {
      return { isValid: false, message: 'Не флуди!' }
    }

    if (this.checkCensoredWords()) {
      const o = {
        isValid: false,
        message: 'Пользователь забанен за цензурные слова.',
      }

      this.banUser(this.currentNickname)

      return o
    }

    if (this.checkSpamWords()) {
      this.banUser(this.currentNickname)
      return { isValid: false, message: 'Запрещено использовать ссылки.' }
    }

    return { isValid: true, message: '' }
  },

  updateCurrentMessage(currentMessage) {
    this.currentMessage = currentMessage
  },

  checkMessageTextByCensoredWords(messageText) {
    return this.censoredWords.some(word =>
      messageText.toLowerCase().includes(word)
    )
  },

  checkMessageTextBySpamWords(messageText) {
    return this.spamWords.some(url => messageText.toLowerCase().includes(url))
  },

  checkFlood() {
    return !isTimeValid()
  },

  checkCensoredWords() {
    return this.checkMessageTextByCensoredWords(this.currentMessage)
  },

  checkSpamWords() {
    return this.checkMessageTextBySpamWords(this.currentMessage)
  },

  pingNickname(nickname) {
    this.currentMessage = `@${nickname} ${this.currentMessage}`
  },

  banUser(nickname) {
    if (!this.isUserBanned(nickname)) this.bannedUsers.push(nickname)
    this.currentNickname = ''
    this.onlineNicknames = this.onlineNicknames.filter(n => n !== nickname)
  },
}

chatModel.signIn('Bond')
chatModel.signIn('James')
chatModel.signIn('Piter')
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
