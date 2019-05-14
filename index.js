const debug = require('debug')('botium-connector-botkit-websocket')
const WebSocket = require('ws')

const Capabilities = {
  BOTKIT_SERVER_URL: 'BOTKIT_SERVER_URL'
}

class BotiumConnectorBotkitWebsocket {
  constructor ({ queueBotSays, caps }) {
    this.queueBotSays = queueBotSays
    this.caps = caps
  }

  Validate () {
    debug('Validate called')

    if (!this.caps[Capabilities.BOTKIT_SERVER_URL]) {
      throw new Error('BOTKIT_SERVER_URL capability required')
    }
    return Promise.resolve()
  }

  Build () {
    debug('Build called')
    const socket = new WebSocket(this.caps[Capabilities.BOTKIT_SERVER_URL])
    this.socket = socket

    socket.onmessage((encodedMessage) => {
      const message = JSON.parse(encodedMessage)
      debug('Bot says ' + message.text)
      this.queueBotSays({ sender: 'bot', messageText: message.text })
    })

    return new Promise((resolve, reject) => {
      socket.onopen(function () {
        resolve()
      })
      socket.onerror(function (err) {
        reject(err)
      })
    })
  }

  Start () {
    debug('Start called')

    return Promise.resolve()
  }

  UserSays ({messageText}) {
    debug('User says ' + messageText)
    const message = {
      type: 'message',
      text: messageText,
      user: 'me',
      channel: 'socket'
    }

    return new Promise((resolve, reject) => {
      this.socket.send(JSON.stringify(message), {}, (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  }

  Stop () {
    debug('Stop called')
    return Promise.resolve()
  }

  Clean () {
    debug('Clean called')

    return Promise.resolve()
  }
}

module.exports = {
  PluginVersion: 1,
  PluginClass: BotiumConnectorBotkitWebsocket
}
