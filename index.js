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
    // buttons returned by the last bot response
    this.activeButtons = {}
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
      const messageText = message.text
      const buttons = message.quick_replies && message.quick_replies.map(r => {
        return {
          text: r.title,
          payload: r.payload
        }
      })
      this.activeButtons = buttons
      if (messageText || buttons) {
        if (messageText) {
          debug('Bot says ' + messageText)
        }
        if (buttons) {
          const buttonText = buttons && buttons.map(b => {
            return b.text
          }).join(',')
          debug('Bot displays buttons ' + buttonText)
        }
        const botMsg = { sender: 'bot', sourceData: message, messageText, buttons }
        this.queueBotSays(botMsg)
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

  UserSays ({ messageText, buttons, SET_FIELD }) {
    if (buttons && buttons.length > 0) {
      const buttonText = buttons[0].text.toLowerCase()

      const matchingButton = this.activeButtons.find(button => {
        return button.text.toLowerCase() === buttonText
      })
      if (matchingButton === undefined) {
        return Promise.reject(new Error('There is no button ' + buttonText))
      }
      messageText = matchingButton.payload
      debug('User clicked button "' + buttons[0].text + '" which sends text ' + messageText)
    } else {
      debug('User says ' + messageText)
    }
    const message = {
      type: 'message',
      text: messageText,
      user: this.sessionId,
      channel: 'socket'
    }

    if (typeof SET_FIELD === 'object') {
      debug('User sets message fields ' + JSON.stringify(SET_FIELD))
      Object.assign(message, SET_FIELD)
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
