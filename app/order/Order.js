'use strict';

var _ = require('lodash');
var pg = require('pg');

var url = 'postgres://localhost:5432/Northwind';

function query (sql, paramsOrCb, cb) {
  pg.connect(url, function (err, db, done) {
    if (err) throw err;

    if (typeof paramsOrCb === 'function') {
      db.query(sql, function (err, res) {
        paramsOrCb(err, res.rows);
      });
    } else {
      db.query(sql, paramsOrCb, function (err, res) {
        cb(err, res.rows);
      });
    }

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

Order.create = function (order, cb) {
  query('INSERT INTO orders (OrderID,CustomerID,EmployeeID,OrderDate,RequiredDate,ShippedDate,ShipVia,Freight,ShipName,ShipAddress,ShipCity,ShipRegion,ShipPostalCode,ShipCountry) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);', [order.OrderID,order.CustomerID,order.EmployeeID,order.OrderDate,order.RequiredDate,order.ShippedDate,order.ShipVia,order.Freight,order.ShipName,order.ShipAddress,order.ShipCity,order.ShipRegion,order.ShipPostalCode,order.ShipCountry], cb);
};



module.exports = Order;

function setPrototype(pojo) {
  return _.create(Order.prototype, pojo);
}
