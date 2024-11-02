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
  bannedUsers: [],
  censoredWords: ['банан', 'огурец', 'баклажан'],
  spamWords: ['https://', 'http://'],

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

  addUserMessage(messageText) {
    if (this.currentNickname === '') return

    if (!isTimeValid()) {
      this.addSystemMessage('Не флуди.')
      return
    }

    if (this.checkMessageTextByCensoredWords(messageText)) {
      this.banUser(this.currentNickname)
      return
    }

    if (this.checkMessageTextBySpamWords(messageText)) {
      this.addSystemMessage('Запрещено использовать ссылки.')
      this.banUser(this.currentNickname)
      return
    }

    const message = {
      type: 'user',
      text: messageText,
      nickname: this.currentNickname,
    }

    this.messages.push(message)
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
