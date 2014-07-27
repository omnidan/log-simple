log-simple
==========

_Super Simple JavaScript Logging based on console.log with unix terminal colors
and iso timestamps_

_No external dependencies, super lightweight!_

![log-simple example](http://i.imgur.com/S6m68K6.png) 


Installation
------------

```
npm install log-simple --save
```


Usage
-----

log-simple is component-based, this makes it easy to figure out where logs are
coming from. To get started with log-simple, do this:
```
var log = require('log-simple')('component-name');
log.info("Hello World!");
```

You don't need to specify a component name (only recommended when you have a
small, single file project):
```
var log = require('log-simple')({init: false});
log.info("Hello World!");
```

*Note*: If you specify an object as the first argument, it's interpreted as the
config, not the component name. I'm setting init to false here, because we don't
 need to see the init message if we only have one component.


Configuration
-------------

log-simple can also be configured. The values in the example below are the
default values. This should be self-explanatory:
```
var log = require('log-simple')('component-name', {
    debug: true, // show debug messages
    time: true, // show time
    init: true // show component init message
  });
```


Log levels
----------

There are the following log levels:
`log.debug() log.info() log.warn() log.error() log.critical()`

log-simple also has minimalistic log levels, for the lazy (or minimalistic)
ones:
`log.d() log.i() log.w() log.e() log.c()`

If you want to make your code especially short (and unreadable), you can require
log-simple as `l` and then do `l.i('Hello World!')`.


Logging objects
---------------

log-simple is basically a wrapper for `console.log`. This means you can use it
just like `console.log`. To log an object, simply do:
```
var log = require('log-simple')({init: false});
var test = {hello: 'world'};
log.debug('Testing object logging', test);
```
