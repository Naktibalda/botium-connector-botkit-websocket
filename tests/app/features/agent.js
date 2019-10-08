module.exports = function (controller) {

  controller.hears('human', 'message', async (bot, message) => {
    await bot.reply(message, {
      text: 'Please wait until I transfer you to someone who can help',
      frontend_action: 'talk_to_agent'
    })
  })
}
