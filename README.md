# Botium Connector for Botkit over websockets 

This is a [Botium](https://github.com/codeforequity-at/botium-core) connector for testing your Botkit chatbot over websockets.


## How it works ?
Botium uses the [Botkit Anywhere](https://github.com/howdyai/botkit-starter-web) to connect to your chatbot.

It can be used as any other Botium connector with all Botium Stack components:
* [Botium CLI](https://github.com/codeforequity-at/botium-cli/)
* [Botium Bindings](https://github.com/codeforequity-at/botium-bindings/)
* [Botium Box](https://www.botium.at)

## Requirements

* __Node.js and NPM__
* a __Botkit Anywhere Server__
* a __project directory__ on your workstation to hold test cases and Botium configuration

## Install Botium and Botkit Connector

When using __Botium CLI__:

```
> npm install -g botium-cli
> npm install -g botium-connector-botkit-websocket
> botium-cli init
> botium-cli run
```

When using __Botium Bindings__:

```
> npm install -g botium-bindings
> npm install -g botium-connector-botkit-websocket
> botium-bindings init mocha
> npm install && npm run mocha
```

When using __Botium Box__:

TODO

## Connecting your Botkit server to Botium

Open the file _botium.json_ in your working directory and add the Botkit chatbot connection settings.

```
{
  "botium": {
    "Capabilities": {
      "PROJECTNAME": "<whatever>",
      "CONTAINERMODE": "botium-connector-botkit-websocket",
      "BOTKIT_SERVER_URL": "..."
    }
  }
}
```
Botium setup is ready, you can begin to write your [BotiumScript](https://github.com/codeforequity-at/botium-core/wiki/Botium-Scripting) files.

## Supported Capabilities

Set the capability __CONTAINERMODE__ to __botium-connector-botkit-websocket__ to activate this connector.

### BOTKIT_SERVER_URL
The Botkit server url (without any path, just http/https, servername, port)
