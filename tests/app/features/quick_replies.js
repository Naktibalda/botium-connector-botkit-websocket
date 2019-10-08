/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
module.exports = function (controller) {
  controller.hears('quick', 'message', async (bot, message) => {
    await bot.reply(message, {
      text: 'Here are some quick replies',
      quick_replies: [
        {
          title: 'Foo',
          payload: 'I want foo'
        },
        {
          title: 'Bar',
          payload: 'I want bar'
        }
      ]
    })
  })

  controller.hears('I want foo', 'message', async (bot, message) => {
    await bot.reply(message, {
      text: 'You chose Foo',
    })
  })

  controller.hears('I want bar', 'message', async (bot, message) => {
    await bot.reply(message, {
      text: 'You chose Bar',
    })
  })
}
