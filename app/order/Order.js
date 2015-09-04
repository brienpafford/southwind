'use strict';

var pg = require('pg');

var url = 'postgress://localhost:5050/Northwind';

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


Order.findAll = function (cb) {
  query('SELECT * FROM Categories;', function (err, orders) {
    if (err) throw err;
    console.log(orders);
  });
};



module.exports = Order;
