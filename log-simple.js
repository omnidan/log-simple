// log-simple v0.1.3 - Super Simple JavaScript Logging

/* TODO
 * Write tests
 * Write examples
 * More configuration
 * More log levels
 * Log to files
 */

function Logs(component, config) {
  // set component name
  if (component) this.component = component;

  // default values
  this.DEBUG = true;
  this.TIME = true;
  var init = false;

  // config
  if (config) {
    if (config.hasOwnProperty('debug')) this.setDebug(config.debug);
    if (config.hasOwnProperty('time')) this.setTime(config.time);
    if (config.hasOwnProperty('init')) init = !!config.init;
  }

  // show init message
  if (init) this.debug('init');
}

// configuration functions
Logs.prototype.setDebug = function setDebug(value) {
  this.DEBUG = !!value;
};

Logs.prototype.setTime = function setTime(value) {
  this.TIME = !!value;
};

// internal functions
Logs.prototype._component = function _component(args) {
  if (this.component) {
    var append_space = "";
    for (var i=0; i < (8 - this.component.length); i++) append_space += " ";
    args.unshift("[" + this.component + append_space + "]");
  }
  return args;
};

Logs.prototype._time = function _time(args) {
  if (this.TIME) args.unshift("[" + new Date().toISOString() + "]");
  return args;
};

// log functions
Logs.prototype.info = function info() {
  var args = Array.prototype.slice.call(arguments);
  args = this._component(args);
  args.unshift("[\033[1;32mINFO    \033[0;0m]");
  args = this._time(args);
  console.info.apply(this, args);
};

Logs.prototype.log = Logs.prototype.info; // alias

Logs.prototype.warn = function warn() {
  var args = Array.prototype.slice.call(arguments);
  args = this._component(args);
  args.unshift("[\033[1;33mWARN    \033[0;0m]");
  args = this._time(args);
  console.warn.apply(this, args);
};

Logs.prototype.warning = Logs.prototype.warn; // alias

Logs.prototype.error = function error() {
  var args = Array.prototype.slice.call(arguments);
  args = this._component(args);
  args.unshift("[\033[1;31mERROR   \033[0;0m]");
  args = this._time(args);
  console.error.apply(this, args);
};

Logs.prototype.err = Logs.prototype.error; // alias

Logs.prototype.critical = function critical() {
  var args = Array.prototype.slice.call(arguments);
  args = this._component(args);
  args.unshift("[\033[1;31mCRITICAL\033[0;0m]");
  args = this._time(args);
  console.error.apply(this, args);
};

Logs.prototype.crit = Logs.prototype.critical; // alias

Logs.prototype.debug = function debug() {
  if (this.DEBUG) {
    var args = Array.prototype.slice.call(arguments);
    args = this._component(args);
    args.unshift("[\033[1;34mDEBUG   \033[0;0m]");
    args = this._time(args);
    console.log.apply(this, args);
  }
};

// minimalistic log function aliases
Logs.prototype.i = Logs.prototype.info;
Logs.prototype.w = Logs.prototype.warn;
Logs.prototype.e = Logs.prototype.error;
Logs.prototype.c = Logs.prototype.critical;
Logs.prototype.d = Logs.prototype.debug;

// export Logs object constructor
module.exports = function initLogs(component, config) {
  if (typeof component == "string")
    return new Logs(component, config);
  else
    return new Logs(undefined, component);
};
