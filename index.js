const debug = require('debug')('botium-connector-botkit-websocket')
const WebSocket = require('ws')

const Capabilities = {
  BOTKIT_SERVER_URL: 'BOTKIT_SERVER_URL'
}

class BotiumConnectorBotkitWebsocket {
  constructor ({ queueBotSays, caps }) {
    this.queueBotSays = queueBotSays
    this.caps = caps
    this.counter = 1
    this.sessionIdPrefix = 'test' + new Date().getTime()
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
  }

  Start () {
    debug('Start called')
    this.sessionId = this.sessionIdPrefix + this.counter
    this.counter++

    const socket = new WebSocket(this.caps[Capabilities.BOTKIT_SERVER_URL])
    this.socket = socket

    socket.on('message', (encodedMessage) => {
      const message = JSON.parse(encodedMessage)
      if (message.text) {
        debug('Bot says ' + message.text)
        this.queueBotSays({ sender: 'bot', messageText: message.text })
      } else {
        debug('Received Websocket Message without text: ' + encodedMessage)
      }
    })

    return new Promise((resolve, reject) => {
      socket.on('open', function () {
        resolve()
      })
      socket.on('error', function (err) {
        reject(err)
      })
    })
  }

  UserSays ({ messageText }) {
    debug('User says ' + messageText)
    const message = {
      type: 'message',
      text: messageText,
      user: this.sessionId,
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

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          this.socket.terminate()
          resolve()
        } catch (err) {
          reject(err)
        }
      }, 1000)
    })
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
