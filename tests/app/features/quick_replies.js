/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
module.exports = function (controller) {
  controller.hears(new RegExp('quick'), 'message', async (bot, message) => {
    await bot.reply(message, {
      text: 'Here are some quick replies',
      quick_replies: [
        {
          title: 'Foo',
          payload: 'foo'
        },
        {
          title: 'Bar',
          payload: 'bar'
        }
      ]
    })
  })
}
