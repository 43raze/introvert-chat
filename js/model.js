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
  forbiddenWords: ['банан', 'огурец', 'баклажан'],
  forbiddenUrls: ['https://', 'http://'],

  isNicknameOnline(nickname) {
    return this.onlineNicknames.includes(nickname)
  },

  isUserBanned(nickname) {
    return this.bannedUsers.includes(nickname)
  },

  signIn(nickname) {
    if (nickname && !this.isUserBanned(nickname)) {
      this.currentNickname = nickname
      this.addOnlineNickname(nickname)
    } else if (this.isUserBanned(nickname)) {
      this.addSystemMessage(`Пользователь ${nickname} забанен.`)
    }
  },

  addOnlineNickname(nickname) {
    if (!this.isNicknameOnline(nickname)) {
      this.onlineNicknames.push(nickname)
      this.addSystemMessage(`${nickname} вошел(ла) в чат`)
    }
  },

  addUserMessage(messageText) {
    const message = {
      type: 'user',
      text: messageText,
      nickname: this.currentNickname,
    }

    if (!isTimeValid()) {
      this.addSystemMessage('Не флуди.')
      return
    }

    if (this.bannedWords(messageText)) {
      this.banUser(this.currentNickname)
      this.addSystemMessage(
        `Пользователь ${this.currentNickname} забанен за использование запрещённых слов.`
      )
      return
    }

    if (this.bannedUrl(messageText)) {
      this.addSystemMessage('Запрещено использовать ссылки.')
      return
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

  bannedWords(messageText) {
    return this.forbiddenWords.some(word =>
      messageText.toLowerCase().includes(word)
    )
  },

  bannedUrl(messageText) {
    return this.forbiddenUrls.some(url => messageText.includes(url))
  },

  banUser(nickname) {
    if (!this.isUserBanned(nickname)) {
      this.bannedUsers.push(nickname)
      this.onlineNicknames = this.onlineNicknames.filter(
        user => user !== nickname
      )
    }
  },
}
