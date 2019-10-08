const path = require('path')
const BotiumBindings = require('botium-bindings')
const bb = new BotiumBindings({
  convodirs: ['./tests/spec/convo'],
  botiumConfig: {
    Capabilities: {
      CONTAINERMODE: function (args) {
        const ConnectorClass = require(path.join(__dirname, '../../index.js')).PluginClass
        return new ConnectorClass(args)
      }
    }
  }
})
BotiumBindings.helper.mocha().setupMochaTestSuite({ bb })
