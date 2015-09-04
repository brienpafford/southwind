"use strict"

var Order = require('./Order');

module.exports.index = function (req, res){
  Order.findAll (function (err, orders){
    if (err) throw err;
    res.format ({
      json: function (){
        res.send({orders : orders});
      }
    });
/*
    res.render('order/index', {orders : orders})
*/

  });
};
