/**
 * Author: Joseph Sarno
 * Date: 06/23/24
 * File Name: taco-stand
 * Description: taco stand
 */
"use strict";

const EventEmitter = require('events');

class TacoStandEmitter extends EventEmitter {
  serveCustomer(customer) {
    this.emit('serve', customer);
  }

  prepareTaco(taco) {
    this.emit('prepare', taco);
  }

  handleRush(rush) {
    this.emit('rush', rush);
  }
}

module.exports = TacoStandEmitter;
