const { Botkit } = require('botkit')
const { WebAdapter } = require('botbuilder-adapter-web')
const path = require('path')

const adapter = new WebAdapter({})

const controller = new Botkit({
  adapter: adapter
})

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {
  // load traditional developer-created local custom feature modules
  controller.loadModules(path.join(__dirname, '/features'))
})
