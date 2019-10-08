module.exports = function (controller) {

  controller.on('hello', async (bot, message) => {
    console.log(message);
    const name = message.name || 'Unknown Person'
    await bot.reply(message, 'Hi, ' + name)
  })
}
