'use strict';

var _ = require('lodash');
var pg = require('pg');

var url = 'postgres://localhost:5432/Northwind';

function query (sql, cb) {
  pg.connect(url, function (err, db, done) {
    if (err) throw err;

    db.query(sql, function (err, res) {
      if (err) throw err;

      cb(err, res.rows);
    });

    done();

  });
};

function Order() {};

Order.findAll = function (cb) {
  query('SELECT * FROM orders LIMIT 20;', function (err, orders) {
    if (err) throw err;
    var prototypedOrders = orders.map(function (order) {
      return setPrototype(order);
    });

    cb(err, prototypedOrders);
  });
};



module.exports = Order;

function setPrototype(pojo) {
  return _.create(Order.prototype, pojo);
}
