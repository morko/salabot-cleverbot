const Cleverbot = require('cleverbot.io')

module.exports = function createCleverbotPluginModule(user, apikey) {

  const cbot = new Cleverbot(user, apikey);

  return {
    cleverbot: {
      type: 'command',
      name: 'cleverbot',
      category: 'fun',
      description: 'Talk to cleverbot!',
      arguments: ['text u want to send to cleverbot'],
      aliases: ['chat', 'cb', 'talk'],
      run: cleverbot
    },

    cbotfilter: {
      type: 'filter',
      hook: 'preParse',
      run: filter
    }
  }

  async function cleverbot(msg, bot, msgToCbot) {
    return new Promise((resolve, reject) => {
      let sessionName = msg.channel.id;
      cbot.setNick(sessionName);

      cbot.create((err, session) => {
        if (err) {
          return reject(new Error(
            'Could not create cleverbot session: ' + err
          ));
        }
        msg.channel.startTyping();
        cbot.ask(msgToCbot, (err, response) => {
          msg.channel.stopTyping();
          if (err) {
            return reject(new Error('No answer from cleverbot: ' + e));
          }
          resolve(msg.channel.send(response));
        });
      });
    });
  }

  function filter(msg, bot) {
    // if message begins with mention of the bot then replace the mention
    // with cleverbot command
    if (
      msg.content.startsWith('<@!' + bot.client.user.id + '>')
      || msg.content.startsWith('<@' + bot.client.user.id + '>')
    ) {
      msg.content = msg.content.replace(/^\S+/g, prefix + 'cleverbot');
    }
  }
}

