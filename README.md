# Description

Cleverbot plugin for salabot, the discord bot framework.

# Installation

```
npm install https://github.com/morko/salabot-cleverbot
```

# Usage

```js
const Bot = require('salabot').Bot;
const cleverbot = require('salabot-cleverbot')(your_username, your_apikey);

let bot = new Bot(your_config);
bot.init()
.then(() => bot.addModule(cleverbot))
.then(() => bot.start(your_bot_token))
.catch((err) => console.log(err));
```
