# Botium Connector for Botkit over websockets

[![NPM](https://nodei.co/npm/botium-connector-botkit-websocket.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/botium-connector-botkit-websocket/)

[![Build Status](https://travis-ci.org/Naktibalda/botium-connector-botkit-websocket.svg?branch=master)](https://travis-ci.org/Naktibalda/botium-connector-botkit-websocket)
[![npm version](https://badge.fury.io/js/botium-connector-botkit-websocket.svg)](https://badge.fury.io/js/botium-connector-watson)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]() 

This is a [Botium](https://github.com/codeforequity-at/botium-core) connector for testing your Botkit chatbot over websockets.

__Did you read the [Botium in a Nutshell](https://medium.com/@floriantreml/botium-in-a-nutshell-part-1-overview-f8d0ceaf8fb4) articles ? Be warned, without prior knowledge of Botium you won't be able to properly use this library!__

## How it works ?
This connector connects to websocket endpoint of Botkit web adapter.

It can be used as any other Botium connector with all Botium Stack components:
* [Botium CLI](https://github.com/codeforequity-at/botium-cli/)
* [Botium Bindings](https://github.com/codeforequity-at/botium-bindings/)
* [Botium Box](https://www.botium.at)

## Requirements

* __Node.js and NPM__
* a __Botkit web socket Server__
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
      "CONTAINERMODE": "botkit-websocket",
      "BOTKIT_SERVER_URL": "..."
    }
  }
}
```
Botium setup is ready, you can begin to write your [BotiumScript](https://botium.atlassian.net/wiki/spaces/BOTIUM/pages/491664/Botium+Scripting) files.

## Quick replies

When using BotiumScript, you can assert quick replies visible texts and use a quick reply to respond with corresponding payload.

### Asserting quick replies

For asserting quick replies use [BUTTONS Asserter](https://botium.atlassian.net/wiki/spaces/BOTIUM/pages/17399914/Buttons+Asserter):
```
#bot
Here are some quick replies
BUTTONS Foo|Bar
```

### Using quick reply

BUTTON takes quick reply visible text as a parameter and sends payload as user input
```
#me
BUTTON Foo
```


## Message fields

### Setting websocket message fields

For setting websocket message fields, you have to use the [UPDATE_CUSTOM logic hook](https://botium.atlassian.net/wiki/spaces/BOTIUM/pages/48660497/Integrated+Logic+Hooks). This example changes message type to hello and adds custom name field:
```
#me

UPDATE_CUSTOM SET_FIELD|type|hello
UPDATE_CUSTOM SET_FIELD|name|John
```

### Asserting websocket message fields

For asserting existence and values of websocket message fields, you can use the [JSON_PATH asserter](https://botium.atlassian.net/wiki/spaces/BOTIUM/pages/59113473/JSONPath+Asserter):

```
#bot
Please wait until I transfer you to someone who can help
JSON_PATH $.frontend_action|talk_to_agent
```

## Examples

More examples can be found in [tests/spec](tests/spec) directory

## Supported Capabilities

Set the capability __CONTAINERMODE__ to __botium-connector-botkit-websocket__ to activate this connector.

### BOTKIT_SERVER_URL
The Botkit server url (without any path, just http/https, servername, port)
