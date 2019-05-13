const debug = require('debug')('botium-connector-botkit-websocket')
var io = require('socket.io-client')

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
    this.socket = io.connect(this.caps[Capabilities.BOTKIT_SERVER_URL], {reconnect: true})
    this.socket.on('message', (encodedMessage) => {
      const message = JSON.parse(encodedMessage)
      this.queueBotSays({ sender: 'bot', messageText: message.text })
    })
    return Promise.resolve()
  }

  Start () {
    debug('Start called')

    return Promise.resolve()
  }

  UserSays ({messageText}) {
    debug('UserSays called')
    const message = {
      type: 'message',
      text: messageText,
      user: 'me',
      channel: 'socket'
    }
    this.socket.emit('message', JSON.stringify(message))

    return Promise.resolve()
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
